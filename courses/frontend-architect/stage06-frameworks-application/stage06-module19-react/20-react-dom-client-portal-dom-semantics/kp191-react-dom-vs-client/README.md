# RE-KP191：react-dom 与 react-dom/client

> [返回 Chapter 20](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

学完本节后，你应该能够：

1. 区分 `react-dom` 与 `react-dom/client` 的职责。
2. 知道 `react-dom` 是 Web DOM 集成包入口。
3. 知道 `react-dom/client` 提供浏览器客户端 Root API。
4. 正确从 `react-dom/client` 导入 `createRoot` / `hydrateRoot`。
5. 知道 Portal、`flushSync` 等 Web DOM API 来自 `react-dom` 本体入口。

> **本节核心代码**：同时导入 `createPortal`、`flushSync` 与 `createRoot`，对照它们来自哪个 entry point。
>
> **实验辅助代码**：页面只展示函数类型，不提前展开 Portal/flushSync 的具体行为。

## 理论讲解

### 1. `react-dom` 是什么

React 本身负责组件、State、Hooks、Reconciliation 等通用模型，而 `react-dom` 把 React 连接到浏览器 DOM 环境。

```jsx
import { createPortal, flushSync } from 'react-dom';
```

这些 API 都是 Web DOM 专用能力，不适用于 React Native。

### 2. `react-dom/client` 是客户端入口

```jsx
import { createRoot, hydrateRoot } from 'react-dom/client';
```

它们通常只在应用入口层出现：

- `createRoot`：接管一个普通浏览器 DOM 容器；
- `hydrateRoot`：接管已经由 React Server/Build 生成 HTML 的容器。

### 3. 为什么要有独立 entry point

因为不同运行阶段需要不同 API：

```text
react-dom/client → browser client roots
react-dom/server → server rendering
react-dom        → web-specific DOM integration APIs
```

业务组件通常不需要直接操作 Root API。

### 4. React 19 已移除旧 render API

旧的：

```jsx
ReactDOM.render(...)
```

在 React 19 中已经移除。现代客户端入口使用：

```jsx
createRoot(domNode).render(<App />);
```

## 动手编码：从 0 到 1

### 第 1 步：从两个入口分别导入

```jsx
import { createPortal, flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
```

### 第 2 步：创建入口职责表

```jsx
const apiRows = [
  ['react-dom', 'createPortal', typeof createPortal],
  ['react-dom', 'flushSync', typeof flushSync],
  ['react-dom/client', 'createRoot', typeof createRoot],
];
```

目标：先建立 package entry 心智模型，不把所有 DOM API 混成一个模块。

### 第 3 步：仍然用 createRoot 启动应用

```jsx
createRoot(document.getElementById('root')).render(<App />);
```

## 运行案例

```bash
npm run dev
```

打开：

```text
/20-react-dom-client-portal-dom-semantics/kp191-react-dom-vs-client/
```

## 效果验证

页面应显示三个 API 都是 function，同时清楚标出其导入入口。

你应该能够回答：

- 为什么业务组件通常不导入 `react-dom/client`？
- 为什么 Portal 不需要新建另一个 React Root？
- SSR HTML 为什么应该用 `hydrateRoot` 而不是 `createRoot`？

最终源码：[`src/main.jsx`](./src/main.jsx)
