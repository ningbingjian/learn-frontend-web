# RE-KP202：Hydration

> [返回 Chapter 21](../README.md)

## 学习目标

1. 理解 Hydration 是“把 React 连接到已有 React Server HTML”，不是重新生成一遍页面。
2. 观察 Hydration 前后的 DOM 节点可以被复用。
3. 通过点击按钮验证 Hydration 后事件和 State 已经接管页面。

## 理论讲解

服务端 HTML 本质上是页面快照。它能提前显示内容，但它自己不知道 React State、事件处理器和组件生命周期。

客户端需要：

```jsx
hydrateRoot(container, <App />);
```

让 React 根据同一棵初始组件树接管已有 DOM。

本课先用 `renderToString` 在浏览器内模拟服务端输出，再把这段 HTML 填进 root，最后 `hydrateRoot`。真实生产项目中，第一步发生在服务器或构建阶段。

## 动手编码：从 0 到 1

### 第 1 步：写一个带 State 的 App

```jsx
const [count, setCount] = useState(0);
```

按钮会让 count +1。

### 第 2 步：生成并注入 Server HTML

```jsx
const serverHtml = renderToString(<App />);
root.innerHTML = serverHtml;
```

此时 DOM 已经存在，但还没有由客户端 React 接管。

### 第 3 步：记录 Hydration 前的 button DOM

```js
serverButton = root.querySelector('[data-role="counter"]');
```

### 第 4 步：调用 hydrateRoot

```jsx
hydrateRoot(root, <App />);
```

### 第 5 步：在 Effect 中检查 DOM identity

Hydration 完成后重新查询按钮，与 Hydration 前对象做 `Object.is` 比较。

预期：按钮节点被复用，并且点击后 count 可以更新。

## 运行案例

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## 效果验证

1. 页面一开始已有服务端 HTML snapshot。
2. Hydration 完成后显示 `same button DOM node: true`。
3. 点击按钮后计数正常增加。
4. 这说明 React 在“激活现有 DOM”，而不是必须删除全部 HTML 再重建。

## 本节核心代码

- `hydrateRoot` 面向 React Server/Build HTML。
- 初始 React Tree 必须与服务端输出一致。
- Hydration 的价值是复用已有内容并补上交互能力。

## 实验辅助代码

- 浏览器端 `renderToString` 只是本课程的单页模拟器。
- DOM identity 检查只是为了把“复用”变成可观察事实。

[查看最终源码](./src/main.jsx)
