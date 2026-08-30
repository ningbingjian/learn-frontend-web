# RE-KP113：Effect 与 Event 的区别

> [返回 Chapter 12](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 Event Handler 因“具体用户交互”运行，而 Effect 因“需要重新同步”运行。
2. 能判断发送消息、支付、保存、提交等动作为什么通常属于 Event。
3. 能判断连接房间、订阅数据、同步浏览器状态为什么属于 Effect。
4. 避免用 Effect 监听 State 变化来间接完成一次用户动作。
5. 理解 Event 逻辑通常是非响应式的，而 Effect 逻辑是响应式的。

> **本节核心代码**：`roomId` 改变后 Effect 自动同步浏览器标题；提交消息只在 `handleSubmit` 事件中写入 `localStorage`。  
> **实验辅助代码**：发送状态文案用于观察事件是否真的只执行一次。

## 理论讲解

### 1. 先问：这段逻辑是“因为用户做了某件事”，还是“因为某个值需要保持同步”

发送消息：

```text
用户点击发送
   ↓
Event Handler
   ↓
发送一次
```

连接当前房间：

```text
roomId 改变
   ↓
Effect 重新同步
   ↓
连接 / 更新外部系统
```

### 2. Event Handler 不会因为读取值变化自动重跑

例如：

```jsx
function handleSubmit() {
  sendMessage(message);
}
```

用户继续输入 `message` 时，这段逻辑不会自动运行。

这正是发送消息需要的语义：

> 输入内容变化不等于用户已经决定发送。

### 3. Effect 是响应式同步逻辑

如果浏览器标题必须跟随 `roomId`：

```jsx
useEffect(() => {
  document.title = `房间：${roomId}`;
}, [roomId]);
```

`roomId` 变化意味着同步目标也变了，因此 Effect 应重新同步。

### 4. 常见反模式：用 Effect 间接处理一次点击动作

不推荐：

```jsx
const [shouldSend, setShouldSend] = useState(false);

useEffect(() => {
  if (shouldSend) {
    sendMessage(message);
  }
}, [shouldSend, message]);
```

这把原本明确的用户动作绕成：

```text
click → setState → render → effect → send
```

不仅更复杂，还容易被其他依赖变化意外触发。

如果动作只因为点击发生，就直接在事件处理器执行。

### 5. Event 和 Effect 都能读取 State，但语义不同

Event：

```text
读取“交互发生这一刻”的值
```

Effect：

```text
读取 Reactive Value，并在它变化后保持同步
```

这一差异会贯穿后续 Effect 依赖和 Effect Event。

## 动手编码：从 0 到 1

### 第 0 步：准备房间与消息 State

```jsx
const [roomId, setRoomId] = useState('general');
const [message, setMessage] = useState('');
```

### 第 1 步：把房间同步放进 Effect

```jsx
useEffect(() => {
  document.title = `房间：${roomId}`;
}, [roomId]);
```

无需用户额外点击“同步标题”。

### 第 2 步：把发送行为留在 Event Handler

```jsx
function handleSubmit(event) {
  event.preventDefault();
  window.localStorage.setItem('lastSentMessage', message);
}
```

它只在提交交互发生时执行。

### 第 3 步：不要让 message 变化自动发送

输入框只是：

```jsx
onChange={event => setMessage(event.target.value)}
```

它更新 State，但不会触发发送副作用。

### 第 4 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Effect 同步 `roomId`；Event Handler 执行一次发送。
- **实验辅助代码**：`status` 只用于页面反馈。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./12-effect-basics-mental-model/kp113-effect-vs-event --config ./vite.config.js
```

## 效果验证

1. 切换房间后，浏览器标题自动跟随房间变化。
2. 在消息输入框持续输入时，不会向 `localStorage` 写入发送结果。
3. 只有点击“发送”后，`lastSentMessage` 才更新。
4. 能解释为什么“发送消息”属于 Event，而“保持房间同步”属于 Effect。
5. 能识别 `click → state flag → effect → action` 这种不必要的绕路。

完成后继续 **RE-KP114：Effect 依赖数组**。
