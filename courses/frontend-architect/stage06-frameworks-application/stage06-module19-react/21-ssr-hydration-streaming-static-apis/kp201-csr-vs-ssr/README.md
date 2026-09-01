# RE-KP201：CSR 与 SSR 的差异

> [返回 Chapter 21](../README.md)

## 学习目标

1. 理解 CSR 页面在 JavaScript 执行前通常只有空或很薄的 HTML shell。
2. 理解 SSR/SSG 会预先生成 React 组件的 HTML snapshot。
3. 明确 SSR HTML 仍需要客户端 JavaScript 与 Hydration 才能获得 React 交互能力。

## 理论讲解

CSR（Client-Side Rendering）的常见入口是：

```html
<div id="root"></div>
```

浏览器拿到 HTML 时，主要内容还没有生成；JavaScript 下载、执行后，React 才通过 `createRoot(...).render(...)` 把 UI 写入 DOM。

SSR 则会在服务器阶段把 React Tree 转成 HTML。用户在客户端 JavaScript 执行前就能看到文本、图片和链接等内容。之后再通过 Hydration 把 React 逻辑连接到现有 DOM。

本课使用浏览器里的 `renderToString` **模拟“服务端生成 HTML snapshot”**，只是为了让一个 Vite 小实验同时展示两种初始 HTML。真实 SSR 应在服务器或构建阶段运行。

## 动手编码：从 0 到 1

### 第 1 步：在 index.html 中准备空 CSR root

```html
<div id="root"></div>
```

同时准备两个 `<pre>`，用于观察“CSR 初始 shell”和“SSR snapshot”。

### 第 2 步：在 React 启动前读取 CSR shell

```js
const csrRoot = document.getElementById('root');
document.getElementById('csr-before').textContent = csrRoot.innerHTML || '(empty)';
```

预期：CSR 初始内容是 `(empty)`。

### 第 3 步：生成 SSR HTML snapshot

```jsx
const serverHtml = renderToString(<Article origin="SSR snapshot" />);
```

预期：`serverHtml` 已经包含文章标题和段落 HTML。

### 第 4 步：再启动真正的 CSR

```jsx
createRoot(csrRoot).render(<Article origin="CSR after JavaScript" />);
```

预期：JavaScript 执行后，空 root 中出现真实 React UI。

## 运行案例

在 React 模块根目录执行：

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## 效果验证

1. `CSR 初始 root.innerHTML` 显示 `(empty)`。
2. `SSR HTML snapshot` 在 JavaScript 教学模拟中已经是一段完整 HTML 字符串。
3. 页面下方 CSR React UI 会在脚本运行后出现。
4. 这说明 SSR 的核心收益之一是“首屏 HTML 在客户端 JavaScript 执行前已经存在”，但这并不等于 React 交互已经激活。

## 本节核心代码

- CSR：浏览器端 `createRoot(...).render(...)` 生成 UI。
- SSR：服务端 API 先生成 HTML snapshot。
- SSR + React 交互还需要后续 Hydration，下一课继续。

## 实验辅助代码

- `renderToString` 本课在浏览器中运行仅用于教学对比，不代表生产 SSR 架构。

[查看最终源码](./src/main.jsx)
