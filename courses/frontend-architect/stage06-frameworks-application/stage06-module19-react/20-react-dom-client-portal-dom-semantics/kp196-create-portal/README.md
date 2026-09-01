# RE-KP196：createPortal

> [返回 Chapter 20](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

1. 理解 Portal 允许 React child 渲染到另一个现存 DOM node。
2. 知道 `createPortal` 来自 `react-dom`，不是 `react-dom/client`。
3. 理解 Portal 适合 Modal、Tooltip、浮层等需要“逃出”祖先 DOM 裁剪/层叠上下文的 UI。
4. 先建立 Portal Target 概念，为后续 React Tree 语义做准备。

## 理论讲解

普通 JSX 的 DOM 通常位于组件父 DOM 下面，但：

```jsx
createPortal(children, domNode)
```

会把 `children` 的 DOM 实际放到 `domNode` 中。

本课 HTML 同时提供两个兄弟节点：

```html
<div id="root"></div>
<aside id="portal-root"></aside>
```

React App 仍从 `#root` 启动，但 Modal 的 DOM 被放到 `#portal-root`。

这类能力常用于：

- Modal/Dialog。
- Tooltip/Popover。
- Toast/Notification。
- 需要绕开父元素 `overflow: hidden` 的浮层。

## 动手编码：从 0 到 1

### 第 1 步：准备独立 Portal Target

```html
<div id="root"></div>
<aside id="portal-root">Portal target</aside>
```

Portal Target 必须在调用时已经存在。

### 第 2 步：从 react-dom 导入 createPortal

```js
import { createPortal } from 'react-dom';
```

Root API 仍来自：

```js
import { createRoot } from 'react-dom/client';
```

### 第 3 步：创建普通 Modal Component

```jsx
function Modal({ onClose }) {
  return <div>...</div>;
}
```

Modal 本身不需要知道自己最终放在哪个 DOM 节点。

### 第 4 步：在 App Render 中创建 Portal

```jsx
{open && createPortal(
  <Modal onClose={() => setOpen(false)} />,
  portalTarget,
)}
```

### 第 5 步：用 DevTools 检查物理 DOM

打开 Portal 后检查 DOM：

```text
#root
  main

#portal-root
  div (Modal)
```

Modal 并不是 `#root main` 的 DOM child。

## 运行案例

```bash
npm run dev
```

打开页面点击“打开 Portal”，观察 `#portal-root` 中出现 Modal。

## 效果验证

- React App Root 没有变化。
- Portal UI 的物理 DOM 被放入另一个已有 DOM target。
- 关闭 Modal 后 Portal DOM 被移除。

**本节核心代码**：`createPortal(<Modal />, portalTarget)`。

**实验辅助代码**：`#portal-root` 和内联边框仅用于让物理 DOM 位置更容易观察。
