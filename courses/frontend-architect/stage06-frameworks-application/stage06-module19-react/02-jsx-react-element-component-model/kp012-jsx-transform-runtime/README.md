# RE-KP012：JSX 转换与 `jsx/jsxs` 运行时直觉

> [返回 Chapter 02](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么浏览器不能把 JSX 原样当作标准 JavaScript 执行。
2. 理解 JSX Transform 发生在工具链阶段，而不是 React 组件运行后才发生。
3. 建立现代 Automatic JSX Runtime 的第一层直觉。
4. 知道生产转换常使用 `react/jsx-runtime` 中的 `jsx` / `jsxs`，开发转换使用 `react/jsx-dev-runtime` 的 `jsxDEV`。
5. 知道这些 Runtime 函数主要供编译器生成代码使用，不应该在普通业务代码里手工调用。
6. 理解为什么现代 JSX 文件不再需要“为了 JSX 本身”写 `import React from 'react'`。

> **本节核心知识**：`JSX source → compiler/plugin transform → jsx/jsxs/jsxDEV runtime call → React Element`。
>
> **实验辅助代码**：`SingleChildExample` 和 `MultipleChildrenExample` 只是为了对应单/多 children 的转换直觉；本节不要求依赖具体构建产物格式写业务逻辑。

## 理论讲解

### 1. 浏览器并不原生认识 JSX

下面代码对 React 开发者很自然：

```jsx
const title = <h1>Hello React</h1>;
```

但标准 JavaScript Parser 并没有“`<h1>` JSX 标签”这一套浏览器运行时语义。

因此现代 React 项目需要：

```text
JSX Source
   ↓
Vite / Babel / TypeScript / 其他编译工具
   ↓
普通 JavaScript
   ↓
Browser
```

JSX Transform 是开发/构建工具链的一部分。

### 2. 经典转换：`React.createElement`

历史上最常见的心智模型是：

```jsx
<h1 className="title">Hello</h1>
```

转换为类似：

```js
React.createElement('h1', { className: 'title' }, 'Hello');
```

这就是为什么旧教程经常要求：

```js
import React from 'react';
```

即使源码中没有显式写 `React.xxx`，转换后的代码也需要 `React.createElement`。

### 3. 现代 Automatic JSX Runtime

React 17 引入新的 JSX Transform；现代工具链可以自动从 React 专用 Runtime 入口引入转换函数。

生产环境概念上会出现：

```js
import { jsx, jsxs } from 'react/jsx-runtime';
```

开发环境则使用：

```js
react/jsx-dev-runtime
```

中的 `jsxDEV`，以便携带更多开发调试信息。

### 4. `jsx` 和 `jsxs` 怎么理解

不要把它们当成需要日常背 API 的函数。

第一层直觉即可：

```text
jsx
常用于生成一个 JSX Element 的 Runtime 调用

jsxs
常用于带多个静态 children 的 JSX 结构

jsxDEV
开发构建的 JSX Runtime 调用，带更多调试信息
```

具体选择由编译器负责。

### 5. 为什么业务代码不要手工调用 `jsx/jsxs`

这些入口是为 JSX Compiler Transform 设计的。

普通业务代码如果真的需要手工创建 React Element，应该使用公开 API：

```js
createElement(...)
```

而不是自己模拟编译器：

```js
jsx(...)
jsxs(...)
```

否则代码会绑定到编译器层的实现约定，失去 JSX 本身提供的可读性。

### 6. 为什么现在 JSX 文件可以不导入 React

本课最终 `src/main.jsx` 没有：

```js
import React from 'react';
```

却仍然可以写：

```jsx
<h1>JSX 需要先被转换</h1>
```

因为当前 `@vitejs/plugin-react` 默认使用 Automatic JSX Runtime，工具链会自己注入所需 Runtime 调用。

但如果组件需要：

```js
useState
useEffect
createElement
```

仍然需要导入你实际使用的 React API。

也就是说：

```text
不再为了 JSX 语法本身导入 React
≠
以后完全不需要从 react 包导入任何东西
```

### 7. JSX Transform 最终得到什么

转换不是为了直接生成 DOM。

更准确的链路是：

```text
JSX
 ↓
jsx/jsxs/createElement 等 Element 创建逻辑
 ↓
React Element 描述
 ↓
React Renderer
 ↓
DOM / 其他宿主
```

所以本节自然连接到下一课 RE-KP013：React Element 到底是什么。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要证明两件事：

1. 源文件可以使用 JSX 而不专门 `import React`。
2. Vite + React 插件会负责把 JSX 转换成浏览器可执行 JavaScript。

### 第 1 步：创建不导入 React 默认对象的 JSX 文件

创建 `src/main.jsx`：

```jsx
import { createRoot } from 'react-dom/client';

function App() {
  return <h1>Hello JSX Runtime</h1>;
}
```

注意没有：

```js
import React from 'react';
```

### 第 2 步：运行源码

```bash
npm run dev -- ./02-jsx-react-element-component-model/kp012-jsx-transform-runtime --config ./vite.config.js
```

如果浏览器能正常显示标题，就已经证明：

```text
源码中的 JSX
没有被浏览器原样解释
而是被开发工具链处理后运行
```

### 第 3 步：加入单 child 示例

加入：

```jsx
function SingleChildExample() {
  return <p>一个子节点的 JSX</p>;
}
```

概念上可以把它理解为最终形成一次 Element Runtime 创建调用。

### 第 4 步：加入多个 children 示例

加入：

```jsx
function MultipleChildrenExample() {
  return (
    <section>
      <h2>多个子节点</h2>
      <p>JSX 会转换为 JavaScript。</p>
    </section>
  );
}
```

现代生产 JSX Transform 对这种静态多 children 结构通常使用 `jsxs`。

### 第 5 步：执行生产构建

```bash
npm run build -- ./02-jsx-react-element-component-model/kp012-jsx-transform-runtime --config ./vite.config.js
```

生产产物会进入 `dist/`。

你可以搜索构建后的 JavaScript，但不要依赖“产物必须长成某一行固定代码”，因为 Vite/Rolldown、插件优化、minify 都可能改变最终文本形态。

### 第 6 步：建立正确的转换模型

把下面链路写在纸上：

```text
<h1>Hello</h1>
      ↓ JSX Transform
jsx/runtime call
      ↓
React Element
```

这比死记某次 build 的 minified 代码更重要。

### 第 7 步：对照最终源码

最终源码见 [`src/main.jsx`](./src/main.jsx)。

- **本节核心知识**：Automatic JSX Runtime、`jsx/jsxs/jsxDEV` 的位置，以及“JSX 必须先转换”。
- **实验辅助代码**：单 child / 多 children 组件和 Vite build 只用于让转换过程可验证。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./02-jsx-react-element-component-model/kp012-jsx-transform-runtime --config ./vite.config.js
```

生产构建：

```bash
npm run build -- ./02-jsx-react-element-component-model/kp012-jsx-transform-runtime --config ./vite.config.js
```

## 效果验证

你应该能够：

1. 解释为什么浏览器不能直接运行 JSX 源码。
2. 说出 Automatic JSX Runtime 相比经典 `React.createElement` 转换的关键变化。
3. 知道 `jsx/jsxs` 来自 `react/jsx-runtime`，`jsxDEV` 用于开发转换。
4. 知道这些 Runtime API 主要供编译器使用，不应成为普通业务写法。
5. 解释为什么当前 JSX 文件不需要为了 JSX 本身导入 `React` 默认对象。
6. 画出 `JSX → Runtime 调用 → React Element` 的链路。
