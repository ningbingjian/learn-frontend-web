# RE-KP192：createRoot

> [返回 Chapter 20](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

学完本节后，你应该能够：

1. 理解 `createRoot(domNode)` 创建的不是 DOM 节点，而是 React Root 控制器。
2. 理解 Root 会接管传入容器内部的 DOM。
3. 知道完整 React SPA 通常只需要一个 Root。
4. 理解部分 React 页面可以存在多个独立 Root。
5. 知道已有 SSR/SSG React HTML 时应使用 `hydrateRoot`。

> **本节核心代码**：`const root = createRoot(container)`。
>
> **实验辅助代码**：`index.html` 在 root 容器内预置一段静态 HTML，并在创建 Root 前记录它。

## 理论讲解

### 1. createRoot 接收真实 DOM 元素

```jsx
const container = document.getElementById('root');
const root = createRoot(container);
```

`container` 是浏览器 DOM 元素；`root` 是 React 提供的控制对象。

### 2. Root 会管理容器内部

第一次：

```jsx
root.render(<App />);
```

React 会清理 root 容器里原本存在的 HTML，然后渲染 React Tree，并从此管理其中 DOM。

### 3. 完整 React App 通常只有一个 Root

```text
index.html #root
      ↓
createRoot(#root)
      ↓
<App />
      ↓
所有业务组件继续嵌套
```

不要为了普通 Modal、Tooltip 再创建一个 Root；这些场景后面会学习 Portal。

### 4. SSR 是另一条入口

如果 DOM 里已经存在由 React Server Render 产生的 HTML，目标不是“清空重建”，而是让客户端 React 附着到现有 HTML：

```jsx
hydrateRoot(container, <App />);
```

## 动手编码：从 0 到 1

### 第 1 步：在 HTML 中放一个静态 placeholder

```html
<div id="root">
  <p data-static-placeholder>createRoot 前的静态 HTML</p>
</div>
```

### 第 2 步：创建 Root 前记录 HTML

```jsx
const container = document.getElementById('root');
const htmlBeforeCreateRoot = container.innerHTML;
```

### 第 3 步：createRoot + render

```jsx
const root = createRoot(container);
root.render(<App htmlBeforeCreateRoot={htmlBeforeCreateRoot} />);
```

预期：原 placeholder 被 React UI 替换。

## 运行案例

```bash
npm run dev
```

打开：

```text
/20-react-dom-client-portal-dom-semantics/kp192-create-root/
```

## 效果验证

页面会显示 React 接管前保存下来的 HTML 字符串，但真实 DOM 中的静态 placeholder 已被 React Render 替换。

结论：

- `createRoot` 建立 React 与 DOM container 的所有权关系。
- 它不是 SSR hydration API。
- 一般业务组件应该继续嵌套在已有 Root 下，而不是频繁 createRoot。

最终源码：[`src/main.jsx`](./src/main.jsx)
