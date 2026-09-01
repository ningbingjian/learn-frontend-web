# RE-KP193：root.render

> [返回 Chapter 20](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

学完本节后，你应该能够：

1. 使用 `root.render(reactNode)` 把 React Node 显示到 Root 容器。
2. 理解 `root.render` 返回 `undefined`。
3. 理解同一个 Root 可以再次 `render` 新 React Node。
4. 理解再次 render 会和上一棵树匹配，只更新必要 DOM。
5. 理解组件 Type/位置匹配时，本地 State 可以跨 root.render 保留。
6. 知道 `root.render` 后面的普通 JavaScript 不应被当成“所有 Effects 已完成”的同步屏障。

> **本节核心代码**：同一个 `root` 反复执行 `root.render(<App version={version} />)`。
>
> **实验辅助代码**：组件内部输入框 State 用于验证重复 root.render 不是整棵树强制重建。

## 理论讲解

### 1. render 的参数是 React Node

典型写法：

```jsx
root.render(<App />);
```

也可以传字符串、数字、`null` 等 React Node，但应用入口通常传 JSX Component Tree。

### 2. 第一次 render

第一次 `root.render` 会让 Root container 显示 React UI，并开始由 React 管理其中 DOM。

### 3. 同一个 Root 可以再次 render

```jsx
root.render(<App version={1} />);
root.render(<App version={2} />);
```

React 不会机械销毁全部 DOM。它会把最新 React Tree 与之前的 Tree 匹配，决定哪些节点复用、更新或替换。

### 4. State 是否保留取决于身份匹配

只要组件 Type 和树中位置保持对应：

```jsx
<App version={1} />
<App version={2} />
```

其中 `App` 的本地 State 可以继续存在。

如果根节点类型改成完全不同的 Component，则可能触发对应子树重置。

### 5. root.render 不是“Effect 已完成”屏障

代码写成：

```jsx
root.render(<App />);
console.log('after render');
```

不能据此假定 `App` 的 `useEffect` 已经执行。极少数第三方集成真的需要同步 DOM flush 时，再考虑后面的 `flushSync` 课程。

## 动手编码：从 0 到 1

### 第 1 步：创建一次 Root

```jsx
const root = createRoot(document.getElementById('root'));
```

### 第 2 步：维护 Root 层 version

```jsx
let rootVersion = 1;
```

这是实验辅助变量，不是业务 State。

### 第 3 步：重复 render 同一个 App Type

```jsx
function renderApp() {
  root.render(<App version={rootVersion} onRenderAgain={handleRenderAgain} />);
}
```

### 第 4 步：在 App 内维护输入 State

输入任意文字后再次 root.render，验证输入仍保留。

## 运行案例

```bash
npm run dev
```

打开：

```text
/20-react-dom-client-portal-dom-semantics/kp193-root-render/
```

操作：

1. 在输入框输入一段文字。
2. 连续点击“再次 root.render”。
3. 观察 version 增加，但输入 State 不重置。

## 效果验证

你应该得到：

- Root 只创建一次。
- `root.render` 可以重复调用。
- 同一组件身份下 React 会进行增量更新，并保留 State。
- 应用内部常规更新仍然优先用组件 State，而不是把 `root.render` 当日常状态管理 API。

最终源码：[`src/main.jsx`](./src/main.jsx)
