# KP078：iframe 懒加载

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 使用 `loading="lazy"` 延迟加载距离视口较远的 iframe。
2. 理解 `eager` 与 `lazy` 的差异，以及浏览器启发式策略带来的不确定性。
3. 判断首屏关键 iframe 与非首屏 iframe 应该采用哪种加载策略。
4. 使用 Network 面板、`load` 事件和子页面消息观察实际加载时机。
5. 避免把 `loading="lazy"` 当成“绝对不会提前请求”的硬性保证。

## 理论讲解

### 1. `loading` 是浏览器加载提示

iframe 支持：

```html
<iframe loading="lazy"></iframe>
```

常用值：

- `eager`：立即加载，适合首屏关键内容。
- `lazy`：当 iframe 接近视口时再加载，适合页面下方的地图、视频、报表等内容。

未写 `loading` 时，浏览器通常按默认策略处理，不应该把默认行为当成明确的性能策略。

### 2. lazy 的“接近视口”距离由浏览器决定

`loading="lazy"` 不是精确到“进入视口那一刻才发请求”。浏览器会根据实现、网络、设备等因素提前加载一定距离内的资源。

所以不能编写类似这样的业务逻辑：

> 只有 iframe 真正进入视口后，内部代码才一定开始执行。

如果业务需要精确的可见性触发，应考虑 `IntersectionObserver` 等显式逻辑；本节只讨论 HTML 原生懒加载。

### 3. 首屏关键内容通常不应该 lazy

如果 iframe 是页面一打开就必须展示的核心支付组件、主视频或首屏地图，把它设为 lazy 可能延迟用户真正需要的内容。

一个简单判断：

- 首屏立即需要 → `eager` 或不使用 lazy。
- 页面下方、用户可能不会滚动到 → `lazy`。

### 4. 懒加载节省的是“未访问区域的成本”

iframe 往往不仅加载一个 HTML，还会继续加载：

- CSS
- JavaScript
- 图片
- 字体
- API 请求

因此推迟 iframe 本身，可能同时推迟一整套子页面资源。

### 5. 验证时要看真实请求，不只看源码属性

看到 DOM 中有 `loading="lazy"` 只代表你声明了策略，不代表当前浏览器一定延迟了请求。

应结合：

- DevTools Network
- iframe `load` 事件
- 子页面加载完成后的消息
- 滚动前后的时间线

来判断实际效果。

## 动手编码：从 0 到 1

### 第 1 步：建立父页面

新建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KP078 iframe 懒加载</title>
</head>
<body>
  <h1>iframe 懒加载</h1>
</body>
</html>
```

**本步目标**：建立最小宿主页面。

**运行后观察**：还没有任何 iframe 请求。

### 第 2 步：创建加载探针页面

新建 `probe.html`：

```html
<p id="message"></p>
<script>
  const slot = new URLSearchParams(location.search).get('slot') ?? 'unknown';
  document.querySelector('#message').textContent = `已加载：${slot}`;

  parent.postMessage({
    type: 'iframe-probe',
    slot,
    childTime: performance.now()
  }, '*');
</script>
```

**本步目标**：让每个 iframe 在真正执行子页面脚本后告诉父页面“我加载了”。

**为什么使用 `*`**：这里只传递无敏感信息的教学时间戳，用于性能观察；生产中的可信跨窗口通信将在 KP080 使用严格 `targetOrigin` 和来源校验。

### 第 3 步：增加首屏 eager iframe

```html
<iframe
  src="./probe.html?slot=eager"
  title="首屏立即加载示例"
  loading="eager"
></iframe>
```

**本步目标**：建立立即加载的对照组。

**运行后观察**：页面打开后，eager 子页面很快报告加载完成。

### 第 4 步：在长距离下方增加 lazy iframe

先放一个足够高的占位区：

```html
<div class="spacer">向下滚动寻找 lazy iframe</div>
```

然后加入：

```html
<iframe
  src="./probe.html?slot=lazy"
  title="非首屏懒加载示例"
  loading="lazy"
></iframe>
```

CSS：

```css
.spacer {
  min-height: 180vh;
}
```

**本步目标**：让 lazy iframe 初始距离视口较远。

**运行后观察**：不同浏览器可能在不同距离开始加载；它不保证一定等到元素真正可见。

### 第 5 步：记录父页面时间线

最终案例监听 `message`：

```js
window.addEventListener('message', event => {
  if (location.protocol !== 'file:' && event.origin !== location.origin) return;
  if (event.data?.type !== 'iframe-probe') return;

  log(`${event.data.slot} 子页面已执行`);
});
```

同时监听两个 iframe 自己的 `load` 事件。

**本步目标**：用两条独立信号观察加载。

**运行后观察**：日志会记录 eager 与 lazy iframe 的加载时点。

### 最终源码

- [父页面 `index.html`](./index.html)
- [探针页面 `probe.html`](./probe.html)

**本节核心代码**：`loading="eager"`、`loading="lazy"` 以及首屏/非首屏的选择原则。

**实验辅助代码**：长占位区、`postMessage`、时间线日志和 `load` 事件监听，只用于观察浏览器何时真正加载 iframe。

## 运行案例

为了让 iframe 具有正常 HTTP origin，并方便 Network 面板观察，推荐在目录中运行：

```bash
python3 -m http.server 8000
```

访问：

```text
http://localhost:8000/
```

打开 DevTools → Network，勾选 Preserve log 后刷新页面，再向下滚动。

## 效果验证

1. 首屏 iframe 是否声明 `loading="eager"`。
2. 页面下方 iframe 是否声明 `loading="lazy"`。
3. 刷新后 eager iframe 是否优先出现加载日志。
4. lazy iframe 的请求时机是否可能随浏览器变化。
5. 滚动接近 lazy iframe 后，它是否最终完成加载。
6. 是否能够解释：lazy 是性能提示，不是精确的业务可见性事件。
7. 是否能说明为什么首屏关键 iframe 不应机械地全部使用 lazy。