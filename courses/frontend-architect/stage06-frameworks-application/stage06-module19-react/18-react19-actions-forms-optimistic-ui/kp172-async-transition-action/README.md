# RE-KP172：异步 Transition 与 Action

> [返回 Chapter 18](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录
- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解组件可以接收一个 Action prop，而不必知道它同步还是异步。
2. 理解为什么调用 Action 时应在 Transition 中 `await action()`。
3. 观察 `isPending` 会覆盖整个异步 Action 生命周期。
4. 理解 Action 是行为契约，而不是固定函数实现。
5. 区分 Action 组合和普通 callback 立即调用。

> **本节核心代码**：`startAction(async () => { await action(); })`。  
> **实验辅助代码**：`wait()` 仅用于模拟异步保存。

## 理论讲解

### 1. Action prop 的价值

组件可以暴露：

```jsx
<ActionButton action={saveAction} />
```

而不是把具体请求逻辑写死在按钮内部。

### 2. 为什么要 await action

React 官方建议：当组件对外暴露 `action` prop 时，在自己的 Transition 中 `await action()`。

这样调用者传入：

```text
同步 Action
异步 Action
```

组件都能使用统一协议。

### 3. pending 覆盖异步生命周期

如果 Action 返回 Promise，`isPending` 会保持到异步工作和相关 Transition 完成。

### 4. Action 可以组合

高层组件可以把领域行为传给通用交互组件：

```text
SaveButton
CheckoutButton
TabButton
```

交互组件只负责 Transition / pending，不负责领域请求细节。

### 5. await 后 State Update 的当前边界

如果 Action 自己在 `await` 之后调用普通 state setter，当前 React 仍要求用额外 `startTransition` 标记该更新。

## 动手编码：从 0 到 1

### 第 0 步：写普通按钮

```jsx
function ActionButton({ action, children }) {
  return <button onClick={action}>{children}</button>;
}
```

这还无法统一管理 async pending。

### 第 1 步：加入 useTransition

```jsx
const [isPending, startAction] = useTransition();
```

### 第 2 步：在 Transition 内 await 外部 Action

```jsx
startAction(async () => {
  await action();
});
```

目标：无论 Action 同步还是异步，都从同一个调用入口进入。

### 第 3 步：准备 async Action

```jsx
async function saveAction() {
  await wait(900);
  startTransition(() => setStatus('saved'));
}
```

### 第 4 步：再传一个同步 Action

```jsx
function resetAction() {
  setStatus('idle');
}
```

观察：同一个 `ActionButton` 同时接受两种 Action。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Action prop + Transition 包装 + await。
- **实验辅助代码**：延迟函数用于展示 pending。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./18-react19-actions-forms-optimistic-ui/kp172-async-transition-action --config ./vite.config.js
```

## 效果验证

1. 点击“异步保存”时按钮保持 pending 约 900ms。
2. 点击“同步重置”也通过同一个 ActionButton 协议执行。
3. 能解释为什么可复用组件应该 `await action()`。
4. 能说明 await 之后的普通 setter 为什么仍需关注 Transition 边界。

完成后继续 **RE-KP173：useActionState**。
