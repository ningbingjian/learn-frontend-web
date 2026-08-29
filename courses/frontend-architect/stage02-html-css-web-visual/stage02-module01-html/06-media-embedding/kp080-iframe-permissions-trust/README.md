# KP080：iframe allow 与来源信任

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 理解 iframe `allow` 用于声明嵌入内容可以使用哪些受控浏览器能力。
2. 区分 Permissions Policy 与“这个来源是否可信”两个不同问题。
3. 对 iframe `src` 建立明确的来源信任边界。
4. 使用具体 `targetOrigin` 发送 `postMessage`，而不是对敏感数据使用 `*`。
5. 在接收消息时同时验证 `event.origin`、`event.source` 和消息结构。

## 理论讲解

### 1. `allow` 是 iframe 的 Permissions Policy

例如：

```html
<iframe
  src="./trusted-child.html"
  allow="fullscreen; geolocation 'none'; camera 'none'; microphone 'none'"
></iframe>
```

这里表达：

- 允许 iframe 使用 fullscreen（仍要满足用户手势等浏览器要求）。
- 明确不向该 iframe 开放 geolocation。
- 明确不开放 camera / microphone。

`allow` 不是“给页面管理员权限”，它只是浏览器能力策略的一层控制。

### 2. `allow` 不能替代来源信任

即使写了：

```html
allow="camera 'none'; microphone 'none'"
```

一个不可信 iframe 仍然是活动内容，仍可能：

- 展示欺骗性界面
- 发起自己的网络请求
- 向父页面发送消息
- 诱导用户点击链接

所以还需要判断：

> `src` 指向的来源是否允许被嵌入？

生产环境通常会结合来源白名单、CSP `frame-src`、服务端配置等进一步限制。

### 3. `postMessage` 发送方应指定具体 targetOrigin

安全边界错误示例：

```js
frame.contentWindow.postMessage(secret, '*');
```

如果消息包含令牌、用户数据或权限指令，不应该使用 `*`。

同源教学案例可以写：

```js
const trustedOrigin = location.origin;
frame.contentWindow.postMessage(payload, trustedOrigin);
```

这样浏览器只有在目标窗口当前 origin 匹配时才投递消息。

### 4. 接收消息至少验证三件事

父页面：

```js
window.addEventListener('message', event => {
  if (event.origin !== trustedOrigin) return;
  if (event.source !== frame.contentWindow) return;
  if (event.data?.type !== 'trusted-demo') return;

  // 处理通过验证的消息
});
```

三层含义：

1. `event.origin`：消息来自哪个 origin。
2. `event.source`：是不是预期的那个 iframe 窗口。
3. 消息结构：是不是当前协议定义的消息。

只检查其中一项往往不够稳健。

### 5. 不要把 `event.origin` 当成字符串“包含”判断

危险写法：

```js
if (event.origin.includes('example.com')) {
  // trust
}
```

因为类似 `https://example.com.attacker.invalid` 也可能包含目标字符串。

应该和预期完整 origin 做精确比较：

```js
if (event.origin !== 'https://app.example.com') return;
```

### 6. Permissions Policy 只能在上层允许范围内进一步控制

iframe 的 `allow` 不是孤立存在的。服务器响应头、浏览器默认策略和父页面继承策略都可能影响最终能力。

因此“HTML 写了 allow”不等于功能一定可用，还要满足：

- 浏览器支持
- 上层策略允许
- 用户权限允许
- 用户手势等 API 条件满足

## 动手编码：从 0 到 1

### 第 1 步：创建可信子页面

新建 `trusted-child.html`：

```html
<button id="send">向父页面发送消息</button>
<script>
  const parentOrigin = new URL(document.referrer).origin;

  document.querySelector('#send').addEventListener('click', () => {
    parent.postMessage({
      type: 'trusted-demo',
      action: 'request-theme',
      value: 'dark'
    }, parentOrigin);
  });
</script>
```

**本步目标**：让子页面只向它实际嵌入的父页面 origin 发送消息。

**为什么不用 `*`**：本节专门练习明确的跨窗口信任边界。

### 第 2 步：在父页面嵌入并声明 allow

```html
<iframe
  id="trusted-frame"
  src="./trusted-child.html"
  title="受信任组件通信示例"
  allow="fullscreen; geolocation 'none'; camera 'none'; microphone 'none'"
></iframe>
```

**本步目标**：把嵌入来源和浏览器能力策略写在 iframe 声明中。

### 第 3 步：保存明确的 trusted origin

父页面：

```js
const frame = document.querySelector('#trusted-frame');
const trustedOrigin = location.origin;
```

本案例要求通过 HTTP 服务运行，因此 `location.origin` 会得到类似：

```text
http://localhost:8000
```

而不是 `file://` 的特殊来源。

### 第 4 步：严格验证收到的消息

```js
window.addEventListener('message', event => {
  if (event.origin !== trustedOrigin) return;
  if (event.source !== frame.contentWindow) return;
  if (event.data?.type !== 'trusted-demo') return;

  console.log('接受消息', event.data);
});
```

**本步目标**：同时验证来源、窗口和协议。

**运行后观察**：只有 trusted iframe 发出的正确消息会进入“接受”分支。

### 第 5 步：验证 fullscreen allow

子页面增加：

```js
await document.documentElement.requestFullscreen();
```

并把它放在用户点击按钮事件中。

**本步目标**：理解 `allow="fullscreen"` 只是允许使用该能力的一层条件。

**运行后观察**：支持 Fullscreen API 的浏览器会尝试进入全屏；是否成功仍受用户手势和浏览器策略影响。

### 第 6 步：增加父页面主动发送的安全消息

父页面按钮：

```js
frame.contentWindow.postMessage({
  type: 'parent-demo',
  message: '来自可信父页面'
}, trustedOrigin);
```

子页面同样验证 `event.origin`。

**本步目标**：把严格 origin 验证做成双向通信习惯。

### 最终源码

- [父页面 `index.html`](./index.html)
- [可信子页面 `trusted-child.html`](./trusted-child.html)

**本节核心代码**：iframe `allow`、可信 `src` 边界、具体 `targetOrigin`、`event.origin` / `event.source` 精确验证。

**实验辅助代码**：页面日志、全屏按钮和主题消息，只用于让安全边界变得可观察。

## 运行案例

本节必须使用 HTTP 服务，因为需要一个正常的 `origin` 来演示精确来源验证：

```bash
python3 -m http.server 8000
```

访问：

```text
http://localhost:8000/
```

不要用 `file://` 直接打开本节案例来判断 origin 行为。

## 效果验证

1. iframe 是否声明了清晰的 `allow` 策略。
2. geolocation / camera / microphone 是否明确设为 `'none'`。
3. 子页面发送消息是否使用具体父页面 origin，而不是 `*`。
4. 父页面接收消息是否同时验证 `event.origin` 和 `event.source`。
5. 消息处理前是否还检查了 `event.data.type`。
6. 点击“尝试全屏”时是否由用户手势触发。
7. 是否能够解释：`allow` 控制浏览器能力，而来源信任控制“谁值得交互”，两者不能互相替代。
8. 是否能够说明为什么生产代码不应使用 `origin.includes(...)` 做来源白名单判断。