# RE-KP174：pending 状态

> [返回 Chapter 18](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录
- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 掌握 `useActionState` 返回的 `isPending`。
2. 理解 pending 生命周期由 Action / Transition 自动协调。
3. 会用 pending 禁用重复提交。
4. 会用 `aria-busy` 和状态文字表达异步进度。
5. 区分 pending 状态和最终 Action result state。

> **本节核心代码**：`const [state, submitAction, isPending] = useActionState(...)`。  
> **实验辅助代码**：1200ms 延迟只是为了让 pending 可见。

## 理论讲解

### 1. pending 不需要手动维护 Boolean

过去常见：

```jsx
setLoading(true);
try {
  await request();
} finally {
  setLoading(false);
}
```

Action 模型可以直接读取：

```jsx
isPending
```

### 2. pending 与 result state 是两件事

```text
isPending → 当前是否仍有 Action 工作
state     → 最近一次 Action 返回的结果
```

### 3. pending 可以阻止重复提交

```jsx
<button disabled={isPending}>
```

这属于常见 UX，但是否允许并行提交仍应由业务决定。

### 4. 可访问性反馈

```jsx
<form aria-busy={isPending}>
```

配合 `role="status"` 可以让状态变化更明确。

### 5. useFormStatus 留到 RE-KP177

本课 pending 来自 `useActionState`。表单后代组件如何不透传 props 读取父 Form 状态，会在 `useFormStatus` 课程处理。

## 动手编码：从 0 到 1

### 第 0 步：写异步订单 Action

```jsx
async function submitOrder(previousState, formData) {
  await wait(1200);
  return { count: previousState.count + 1 };
}
```

### 第 1 步：读取三元返回值

```jsx
const [state, submitAction, isPending] = useActionState(...);
```

### 第 2 步：禁用输入和按钮

```jsx
<input disabled={isPending} />
<button disabled={isPending}>...</button>
```

### 第 3 步：显示 pending 文案

```jsx
{isPending ? '提交中…' : '提交订单'}
```

### 第 4 步：添加 aria-busy

```jsx
<form action={submitAction} aria-busy={isPending}>
```

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Action pending 驱动交互反馈。
- **实验辅助代码**：延迟模拟请求。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./18-react19-actions-forms-optimistic-ui/kp174-action-pending-state --config ./vite.config.js
```

## 效果验证

1. 提交后按钮立即显示“提交中…”。
2. pending 期间输入和按钮禁用。
3. 完成后 `isPending` 自动恢复 false。
4. Action result state 同时更新提交次数和最近商品。

完成后继续 **RE-KP175：useOptimistic**。
