# RE-KP175：useOptimistic

> [返回 Chapter 18](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录
- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 optimistic UI 是“请求完成前先展示期望结果”。
2. 掌握 `useOptimistic(value, reducer?)`。
3. 理解 optimistic state 是临时层，base state 仍是真实数据基线。
4. 会在 Action 中触发 optimistic update。
5. 区分“立即反馈”和“真正持久化完成”。

> **本节核心代码**：`useOptimistic(messages, reducer)` 与 Action 中的 `addOptimisticMessage()`。  
> **实验辅助代码**：1200ms 延迟用于观察临时 optimistic 状态。

## 理论讲解

### 1. 为什么需要 optimistic UI

普通流程：

```text
点击发送
→ 等待服务器
→ 成功后才出现消息
```

乐观流程：

```text
点击发送
→ 立即显示“发送中”消息
→ 后台请求
→ 成功后 base state 接管
```

### 2. useOptimistic 的两个返回值

```jsx
const [optimisticState, setOptimistic] = useOptimistic(value, reducer);
```

`value` 是真实基线。pending Action 存在时，React 会在它之上应用 optimistic update。

### 3. reducer 必须保持纯净

```jsx
(currentMessages, message) => [
  ...currentMessages,
  { ...message, sending: true },
]
```

不要修改原数组。

### 4. optimistic setter 应在 Action 中使用

本课把 async `sendMessage` 直接传给：

```jsx
<form action={sendMessage}>
```

函数 form action 本身就是 Action，因此可以安全触发 optimistic update。

### 5. 本课只讲成功路径

失败时如何让 optimistic UI 回滚、如何提示错误，是下一课 RE-KP176 的主题。

## 动手编码：从 0 到 1

### 第 0 步：准备真实消息 State

```jsx
const [messages, setMessages] = useState([...]);
```

### 第 1 步：声明 optimistic 层

```jsx
const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (currentMessages, message) => [
    ...currentMessages,
    { ...message, sending: true },
  ],
);
```

### 第 2 步：把提交函数作为 form Action

```jsx
<form action={sendMessage}>
```

### 第 3 步：请求前立即加入 optimistic 消息

```jsx
addOptimisticMessage(message);
```

此时 UI 无需等待网络响应。

### 第 4 步：请求完成后更新 base state

```jsx
setMessages(currentMessages => [
  ...currentMessages,
  { ...message, sending: false },
]);
```

真实基线更新后，optimistic 临时层结束。

### 第 5 步：渲染发送中标记

```jsx
{message.sending ? '（发送中…）' : ''}
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：base state + optimistic reducer + Action。
- **实验辅助代码**：延迟和发送中文案用于观察状态切换。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./18-react19-actions-forms-optimistic-ui/kp175-use-optimistic --config ./vite.config.js
```

## 效果验证

1. 点击发送后消息立即出现在列表。
2. 请求期间显示“发送中…”。
3. 约 1200ms 后真实 `messages` State 接管。
4. 能解释 optimistic state 为什么不是服务器真实数据本身。

完成后继续 **RE-KP176：乐观更新与回滚**。
