# RE-KP173：useActionState

> [返回 Chapter 18](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录
- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 掌握 `useActionState(action, initialState)` 的基本 API。
2. 理解 Action 第一个参数是 previous state，第二个参数来自 dispatch payload。
3. 理解把返回的 Action 传给 `<form action>` 后，payload 会是 `FormData`。
4. 理解 Action 返回值会成为下一次 state。
5. 知道 `useActionState` 是普通 Hook，必须在组件顶层调用。

> **本节核心代码**：`const [state, submitAction] = useActionState(saveName, initialState)`。  
> **实验辅助代码**：`wait()` 只用于模拟服务端保存延迟。

## 理论讲解

### 1. useActionState 的三元返回值

完整 API：

```jsx
const [state, dispatchAction, isPending] = useActionState(action, initialState);
```

本节先聚焦前两个值，`isPending` 下一课单独讲。

### 2. Action 收到 previous state

```jsx
async function saveName(previousState, formData) {
  // ...
}
```

每次 Action 返回的新值，会成为下一次 Action 的 `previousState`。

### 3. 与 form action 集成

```jsx
<form action={submitAction}>
```

React 会把表单提交包装进 Transition，并把 `FormData` 传给 Action。

### 4. Action 返回值就是状态结果

```jsx
return { message: '保存成功', submittedName: name };
```

不需要额外 `setState` 把 Action 结果复制一遍。

### 5. useActionState 不是 Reducer 的简单异步版

它服务于 Action 结果状态，尤其适合 mutation / form 等异步行为；普通组件内部同步状态仍优先 `useState/useReducer`。

## 动手编码：从 0 到 1

### 第 0 步：准备初始状态

```jsx
const initialState = { message: '尚未提交', submittedName: '' };
```

### 第 1 步：写 Action

```jsx
async function saveName(previousState, formData) {
  const name = String(formData.get('name') ?? '').trim();
  // ...
}
```

### 第 2 步：返回校验结果

```jsx
if (!name) {
  return { ...previousState, message: '请输入姓名' };
}
```

### 第 3 步：调用 useActionState

```jsx
const [state, submitAction] = useActionState(saveName, initialState);
```

### 第 4 步：把 Action 交给 form

```jsx
<form action={submitAction}>
```

### 第 5 步：渲染 Action 结果

```jsx
<p role="status">{state.message}</p>
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：previous state + FormData + Action 返回状态。
- **实验辅助代码**：800ms 延迟。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./18-react19-actions-forms-optimistic-ui/kp173-use-action-state --config ./vite.config.js
```

## 效果验证

1. 空提交会返回“请输入姓名”。
2. 正常提交后 state 更新为保存成功结果。
3. 不需要手动 preventDefault。
4. 能解释 Action 返回值如何成为下一版 state。

完成后继续 **RE-KP174：pending 状态**。
