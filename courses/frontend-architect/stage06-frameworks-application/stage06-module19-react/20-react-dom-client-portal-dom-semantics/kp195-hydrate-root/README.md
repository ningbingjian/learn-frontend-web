# RE-KP195：hydrateRoot

> [返回 Chapter 20](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

1. 理解 `hydrateRoot` 的目标是把 React “接到”已经存在的 React HTML 上。
2. 区分 `createRoot` 的客户端首次生成与 `hydrateRoot` 的 DOM 复用。
3. 理解 Hydration 要求客户端首屏输出与服务端 HTML 一致。
4. 通过 DOM 节点身份验证 Hydration 不是简单删除再重建。

## 理论讲解

SSR/SSG 场景中，浏览器拿到 HTML 时页面已经有内容：

```html
<div id="root">
  <main>...</main>
</div>
```

这时如果调用 `createRoot(...).render(...)`，React 会按客户端 Root 的方式接管容器，首次 render 会清空容器中已有 HTML。对于由 React 服务端生成的 HTML，正确 API 是：

```js
hydrateRoot(container, <App />);
```

Hydration 的目标是复用现有 DOM，并把事件、组件状态模型和 React Tree 接到这些节点上。

关键约束是：**服务端生成的首屏 HTML 与客户端用于 hydrate 的 React 输出应一致。** Hydration mismatch 应当当作 Bug 修复，而不是依赖 React 自动兜底。

## 动手编码：从 0 到 1

### 第 1 步：写一个可交互 Counter

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(value => value + 1)}>+1</button>;
}
```

### 第 2 步：模拟服务端 HTML

为了让本课在纯 Vite 浏览器实验中可运行，使用：

```js
const serverHtml = renderToString(<Counter />);
container.innerHTML = serverHtml;
```

**说明**：真实项目的 `renderToString` / streaming render 会在服务端 runtime 或构建阶段执行；这里仅用于构造“浏览器已经收到 React HTML”的实验前提。

### 第 3 步：保存 Hydration 前 DOM 节点

```js
const serverButton = container.querySelector('button');
```

### 第 4 步：Hydrate 现有 HTML

```js
hydrateRoot(container, <Counter />);
```

这里不会再额外调用首次 `root.render()`。

### 第 5 步：比较 DOM 节点身份

```js
const hydratedButton = container.querySelector('button');
serverButton === hydratedButton;
```

**预期观察**：结果为 `true`，说明现有匹配 DOM 被复用。

### 第 6 步：点击按钮验证交互已经接管

点击 `+1` 后，Count 应从 0 变成 1。

这说明：

```text
现有 HTML
  + hydrateRoot
  → React 事件和状态模型接管
```

## 运行案例

```bash
npm run dev
```

打开本课页面，先看顶部 Hydration 节点身份说明，再点击 `+1`。

## 效果验证

- 首屏 HTML 在 hydrate 之前已经存在。
- Hydration 前后按钮节点保持同一 DOM identity。
- hydrate 后按钮具备 React 交互能力。

**本节核心代码**：`hydrateRoot(container, <Counter />)`。

**实验辅助代码**：浏览器内 `renderToString` 只负责模拟 Server HTML，不代表真实 SSR 的部署位置。
