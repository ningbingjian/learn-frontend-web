# RE-KP205：renderToPipeableStream

> [返回 Chapter 21](../README.md)

## 学习目标

1. 理解 `renderToPipeableStream` 是 Node.js 专用的 React Server Rendering Stream API。
2. 掌握返回值中的 `pipe` / `abort` 与 `onShellReady` 的基本关系。
3. 明确客户端仍需 `hydrateRoot` 才能让 Server HTML 获得 React 交互能力。

## 理论讲解

`renderToPipeableStream` 的核心形态：

```js
const { pipe, abort } = renderToPipeableStream(reactNode, options);
```

它不会一次性返回完整 HTML 字符串，而是让 React 把输出写入 Node.js Writable Stream。

常见服务端顺序：

```text
renderToPipeableStream
        ↓
onShellReady
        ↓
pipe(response)
        ↓
HTML chunks
        ↓
client hydrateRoot
```

本课只建立 API 与 Node Stream 心智模型；RE-KP207 再加入 Suspense 延迟资源，观察真正的渐进 Streaming SSR。

## 动手编码：从 0 到 1

### 第 1 步：创建 Node-only server.mjs

这节不是浏览器 API，因此直接使用 Node 运行，不创建 Vite `main.jsx`。

### 第 2 步：创建一个 React Document

为了让文件不依赖 JSX 转译，使用 `React.createElement`：

```js
function Document() {
  return React.createElement('html', { lang: 'zh-CN' }, ...);
}
```

### 第 3 步：创建 PassThrough 作为教学 Writable Stream

```js
const output = new PassThrough();
```

每收到一个 chunk，就打印到终端。

### 第 4 步：调用 renderToPipeableStream

```js
const { pipe, abort } = renderToPipeableStream(React.createElement(Document), {
  onShellReady() {
    pipe(output);
  },
});
```

预期：Shell 可发送后，React 开始把 HTML 写进 output。

### 第 5 步：保留 abort 兜底

```js
setTimeout(() => abort(), 5000).unref();
```

生产 HTTP Server 通常会结合请求超时或客户端断开来决定何时 abort。

## 运行案例

先在 React 模块根目录安装依赖：

```bash
npm install
```

然后仍在 React 模块根目录执行：

```bash
node 21-ssr-hydration-streaming-static-apis/kp205-render-to-pipeable-stream/src/server.mjs
```

## 效果验证

终端应依次看到：

```text
shell ready
chunk: ...
stream ended
```

chunk 中包含 `<html>`、课程标题和正文。

## 本节核心代码

- `renderToPipeableStream` 只适用于 Node.js Stream 环境。
- `onShellReady` 是“可以开始向普通用户发送 Shell”的常用时机。
- `pipe(destination)` 才真正把 React HTML 写入目标 Stream。
- `abort()` 用于停止尚未完成的服务端 Render。

## 实验辅助代码

- `PassThrough` 用来代替真实 HTTP response，便于只观察 Stream API。
- 本课没有 Suspense 延迟，因此 chunk 数量不代表真实 Streaming SSR 的全部能力。

[查看最终源码](./src/server.mjs)
