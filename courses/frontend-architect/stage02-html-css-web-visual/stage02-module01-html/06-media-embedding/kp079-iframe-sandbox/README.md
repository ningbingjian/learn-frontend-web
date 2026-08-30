# KP079：iframe sandbox

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 理解 `sandbox` 空属性会对 iframe 应用一组默认限制。
2. 使用 `allow-scripts` 等令牌按需恢复最小能力。
3. 理解不带 `allow-same-origin` 的 sandbox iframe 会被放入 opaque origin。
4. 识别 `allow-scripts` + `allow-same-origin` 在同源内容上的高风险组合。
5. 坚持“默认限制 + 最小权限恢复”，而不是一次性开放大量 sandbox 令牌。

## 理论讲解

### 1. `sandbox` 是 iframe 的限制机制

最严格的声明形式：

```html
<iframe sandbox src="./sandbox-child.html"></iframe>
```

当 `sandbox` 存在但没有许可令牌时，浏览器会对嵌入文档施加多类限制，例如脚本、表单、弹窗、顶层导航以及来源能力等。

它不是“禁止 iframe 显示”，而是让内容在更受约束的环境中运行。

### 2. 许可令牌是“恢复能力”，不是“增加限制”

例如：

```html
<iframe sandbox="allow-scripts"></iframe>
```

表示仍然启用 sandbox，但恢复脚本执行能力。

常见令牌包括：

- `allow-scripts`
- `allow-forms`
- `allow-popups`
- `allow-downloads`
- `allow-same-origin`
- `allow-top-navigation-by-user-activation`

不要因为“可能以后需要”就一次性全部加上。

### 3. 没有 `allow-same-origin` 时，来源会变成 opaque origin

即使父页面和子页面文件都来自同一个站点：

```html
<iframe sandbox="allow-scripts" src="./sandbox-child.html"></iframe>
```

子页面虽然可以执行脚本，但在很多同源能力上会被视为特殊的 opaque origin。

这会影响：

- Cookie / Storage 等来源绑定能力
- DOM 同源访问
- `postMessage` 中看到的 `event.origin`（常见为 `"null"`）

`"null"` 不是一个应该加入“可信 origin 白名单”的正常站点来源。

### 4. `allow-scripts` 与 `allow-same-origin` 要特别谨慎

对于与父页面同源、且 iframe 内脚本能够操作自身元素的内容，同时允许：

```text
allow-scripts + allow-same-origin
```

可能显著削弱 sandbox 的隔离价值；在特定同源场景中，子页面甚至可能移除自身 iframe 上的 sandbox 属性并重新加载，从而逃离限制。

因此不要把这两个令牌当成“iframe 标配”。

### 5. 最小权限原则

选择 sandbox 令牌时逐项问：

- 必须执行脚本吗？
- 必须提交表单吗？
- 必须打开弹窗吗？
- 必须保持原来源身份吗？
- 必须导航顶层页面吗？

只有答案明确为“必须”时，才恢复对应能力。

## 动手编码：从 0 到 1

### 第 1 步：创建子页面

新建 `sandbox-child.html`：

```html
<p id="script-status">脚本未执行（初始文本）</p>
<p id="storage-status">尚未测试 Storage</p>

<script>
  document.querySelector('#script-status').textContent = '脚本已执行';
</script>
```

**本步目标**：制作一个能够明显显示“脚本到底有没有执行”的页面。

### 第 2 步：增加最严格 sandbox iframe

父页面写：

```html
<iframe
  src="./sandbox-child.html"
  title="默认 sandbox 限制示例"
  sandbox
></iframe>
```

**本步目标**：观察空 `sandbox` 的默认限制。

**运行后观察**：子页面初始文本仍会显示，但其中脚本不会正常执行。

### 第 3 步：增加 `allow-scripts` 对照组

```html
<iframe
  src="./sandbox-child.html"
  title="允许脚本的 sandbox 示例"
  sandbox="allow-scripts"
></iframe>
```

**本步目标**：只恢复脚本能力。

**运行后观察**：第二个 iframe 的脚本状态会更新成“脚本已执行”。

### 第 4 步：在子页面测试 Storage

加入：

```js
try {
  localStorage.setItem('sandbox-demo', '1');
  document.querySelector('#storage-status').textContent = 'localStorage 可用';
} catch (error) {
  document.querySelector('#storage-status').textContent = `localStorage 被限制：${error.name}`;
}
```

**本步目标**：观察“允许脚本”并不等于恢复同源身份。

**运行后观察**：`sandbox="allow-scripts"` 下脚本可以运行，但 Storage 仍可能因 opaque origin 被限制。

### 第 5 步：让子页面向父页面发送无敏感消息

子页面：

```js
parent.postMessage({ type: 'sandbox-demo', status: 'script-ran' }, '*');
```

父页面输出：

```js
window.addEventListener('message', event => {
  if (event.data?.type !== 'sandbox-demo') return;
  console.log(event.origin);
});
```

**本步目标**：观察 sandboxed iframe 的消息来源。

**运行后观察**：未授予 `allow-same-origin` 的 iframe 消息来源通常显示为 `null`。

这只是观察实验，不代表生产代码应该信任 `null` 来源。

### 最终源码

- [父页面 `index.html`](./index.html)
- [sandbox 子页面 `sandbox-child.html`](./sandbox-child.html)

**本节核心代码**：`sandbox`、`sandbox="allow-scripts"` 以及最小权限选择原则。

**实验辅助代码**：Storage 测试、`postMessage` 和父页面消息日志，用于观察限制结果。

## 运行案例

推荐：

```bash
python3 -m http.server 8000
```

访问父页面并同时打开浏览器 Console。部分 sandbox 拒绝行为会由浏览器输出安全警告。

## 效果验证

1. 空 `sandbox` iframe 的脚本是否被阻止。
2. `sandbox="allow-scripts"` iframe 的脚本是否能够执行。
3. 允许脚本的 sandbox iframe 是否仍可能无法使用 `localStorage`。
4. 父页面收到的 sandbox 消息 `event.origin` 是否体现 opaque origin 特征。
5. 是否能够解释 `allow-*` 令牌是在恢复能力，而不是继续增加限制。
6. 是否知道 `allow-scripts` + `allow-same-origin` 对同源内容为什么需要特别谨慎。
7. 是否能够按业务需要逐项决定令牌，而不是复制一串宽松配置。