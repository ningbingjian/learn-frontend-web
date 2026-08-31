# RE-KP165：lazy

> [返回 Chapter 17](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `lazy(load)` 声明按需加载的 React Component。
2. 理解 `lazy` 的 `load` 函数返回 Promise，并最终提供 `default` export Component。
3. 理解 lazy Component 首次尝试 Render 时才触发加载。
4. 使用 Suspense 提供代码加载期间的 fallback。
5. 理解 `lazy` 声明应放在组件外，避免每次 Render 创建新的 Component Type。

> **本节核心代码**：`lazy(() => import('./MarkdownPreview.jsx'))` 与 Suspense Boundary。  
> **实验辅助代码**：`delayForDemo()` 只为了让本地开发环境也能稳定看见 fallback。

## 理论讲解

### 1. 静态 import 会在入口依赖图中直接引用组件

普通写法：

```jsx
import MarkdownPreview from './MarkdownPreview.jsx';
```

应用启动时，Bundler 已知道入口依赖这个模块。

### 2. lazy 把组件代码加载推迟到真正尝试 Render 时

```jsx
const MarkdownPreview = lazy(() => import('./MarkdownPreview.jsx'));
```

这里：

- `lazy` 返回一个可以正常写进 JSX 的 Component Type。
- `load` 函数在第一次尝试 Render 这个 lazy Component 时执行。
- `import()` 返回 Promise。
- Promise resolve 的模块对象需要有 `default` export。

### 3. lazy Component 在代码未准备好时会 suspend

因此需要最近的 Suspense Boundary：

```jsx
<Suspense fallback={<p>Preview code loading…</p>}>
  <MarkdownPreview text={text} />
</Suspense>
```

代码 chunk 没准备好时显示 fallback；准备好后 React 继续 Render lazy Component。

### 4. lazy 会缓存加载结果

同一个 lazy 声明成功加载后，React 会缓存 Promise 与解析结果。

因此：

```text
第一次打开 Preview → 需要加载
关闭 Preview
再次打开 Preview → 通常直接使用已加载模块
```

### 5. 不要在组件函数内部声明 lazy

错误思路：

```jsx
function App() {
  const Preview = lazy(() => import('./MarkdownPreview.jsx'));
}
```

每次 Render 都可能创建新的 Component Type，导致状态重置和身份不稳定。

应写在模块顶层：

```jsx
const Preview = lazy(() => import('./MarkdownPreview.jsx'));

function App() {
  // ...
}
```

### 6. lazy 是代码加载机制，不是数据 fetching API

`lazy` 解决的是：

```text
Component code 什么时候加载
```

不是：

```text
业务数据什么时候请求
```

Suspense 能同时协调代码和 Suspense-enabled 数据，但它们仍是不同问题。

## 动手编码：从 0 到 1

### 第 1 步：先创建独立 Preview Component

创建：

```text
src/MarkdownPreview.jsx
```

```jsx
export default function MarkdownPreview({ text }) {
  return <article>{text}</article>;
}
```

### 第 2 步：在模块顶层声明 lazy Component

```jsx
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.jsx'));
```

此时不要直接静态 import `MarkdownPreview`。

### 第 3 步：只在用户需要时 Render

```jsx
{showPreview && <MarkdownPreview text={text} />}
```

这样首次没有打开 Preview 时，不需要立即执行 lazy load。

### 第 4 步：加入 Suspense fallback

```jsx
<Suspense fallback={<p>Preview code loading…</p>}>
  <MarkdownPreview text={text} />
</Suspense>
```

### 第 5 步：加入可观察延迟

本地模块很小，加载可能快到看不见 fallback，所以最终源码使用：

```jsx
function delayForDemo(promise) {
  return Promise.all([
    promise,
    new Promise(resolve => setTimeout(resolve, 900)),
  ]).then(([module]) => module);
}
```

这不是生产必需代码。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。  
Lazy Component：[`src/MarkdownPreview.jsx`](./src/MarkdownPreview.jsx)。

- **本节核心代码**：`lazy`、dynamic `import()`、Suspense。
- **实验辅助代码**：900ms delay 与 Toggle UI。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./17-suspense-lazy-use-resource-reading/kp165-lazy --config ./vite.config.js
```

## 效果验证

1. 首次打开 Preview 时可以观察到 fallback。
2. 约 900ms 后 `MarkdownPreview` 出现。
3. 关闭再打开时模块已经缓存，通常不会重复等待同样的 lazy load。
4. 能解释为什么 `lazy` 要放在组件外。
5. 能说明 `lazy` 是组件代码加载机制，而不是普通数据 fetching API。

完成后继续 **RE-KP166：组件级代码分割**。
