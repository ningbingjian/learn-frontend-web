# RE-KP176：乐观更新与回滚

> [返回 Chapter 18](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 optimistic state 为什么只是 Action 期间的临时 UI。
2. 区分 Base State 与 Optimistic State。
3. 理解成功时为什么要把服务端确认结果写回 Base State。
4. 理解失败时“不更新 Base State”为什么会让乐观内容自动消失。
5. 知道已知失败可以在 Action 内处理，而未知异常应交给后续 Error Boundary。

## 理论讲解

### 1. 乐观更新不是提前修改真实数据

`useOptimistic` 的目标是：在 mutation 还没结束时先给用户即时反馈。

本课把两份状态分开：

```text
messages            = 已确认的 Base State
optimisticMessages  = Action 期间用于渲染的临时版本
```

### 2. 成功路径

成功时流程是：

```text
addOptimisticMessage()
        ↓
立即显示 pending 消息
        ↓
await 保存
        ↓
setMessages(...)
        ↓
真实 Base State 接管
```

### 3. 失败与回滚

如果保存失败，本课不会把失败消息写入 `messages`：

```text
optimistic row 出现
        ↓
请求失败
        ↓
Base State 不变
        ↓
Action 结束
        ↓
optimistic row 消失
```

这就是回滚。

### 4. 为什么不要手工复制一份“临时列表 State”

如果自己维护：

```text
serverMessages
optimisticMessages
failedMessages
pendingMessages
```

很容易产生同步问题。

`useOptimistic` 的价值就是让“临时 UI”围绕 Action 生命周期存在，而 Base State 继续代表已确认事实。

## 动手编码：从 0 到 1

### 第 1 步：创建 Base State

在 `src/main.jsx` 中：

```jsx
const [messages, setMessages] = useState([
  { id: 1, text: '欢迎来到 Actions 聊天室' },
]);
```

目标：只保存已经确认的数据。

### 第 2 步：创建 optimistic reducer

```jsx
const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (currentMessages, optimisticMessage) => [
    ...currentMessages,
    optimisticMessage,
  ],
);
```

运行后，普通状态下 `optimisticMessages` 与 `messages` 一致。

### 第 3 步：在 Form Action 中先写 optimistic state

```jsx
async function sendAction(formData) {
  const text = String(formData.get('message') ?? '').trim();

  addOptimisticMessage({
    id: `pending-${Date.now()}`,
    text,
    pending: true,
  });
}
```

`addOptimisticMessage` 位于 Form Action 中，因此处在合法 Action 上下文。

### 第 4 步：增加成功与失败路径

```jsx
await delay(900);

if (text.toLowerCase().includes('fail')) {
  setError('保存失败：乐观消息已自动回滚。');
  return;
}

setMessages(current => [
  ...current,
  { id: Date.now(), text, pending: false },
]);
```

输入包含 `fail` 时不修改 Base State，Action 结束后临时消息会自动消失。

### 第 5 步：渲染 pending 标识

```jsx
{optimisticMessages.map(message => (
  <li key={message.id}>
    {message.text} {message.pending && <em>（发送中…）</em>}
  </li>
))}
```

最终源码：[src/main.jsx](./src/main.jsx)

**本节核心代码**：`useOptimistic`、Form Action、成功写回 Base State、失败不写 Base State。

**实验辅助代码**：`delay()` 与约定输入 `fail` 仅用于稳定观察成功/回滚过程。

## 运行案例

在 React 模块目录启动 Vite，然后访问本知识点目录。

1. 输入 `hello` 并提交。
2. 先看到“发送中”，随后成为已确认消息。
3. 输入 `fail message` 并提交。
4. 先看到乐观消息，随后它消失并显示失败提示。

## 效果验证

- 成功请求：Optimistic UI 最终被 Base State 接管。
- 失败请求：Base State 不变，临时 UI 自动回滚。
- 页面没有维护第二份永久消息列表来手工对账。
