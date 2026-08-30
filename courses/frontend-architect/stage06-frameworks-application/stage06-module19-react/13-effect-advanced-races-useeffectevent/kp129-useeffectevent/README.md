# RE-KP129：useEffectEvent

> [返回 Chapter 13](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useEffectEvent` 用于把 Effect 中的“非响应式事件逻辑”与同步过程分开。
2. 理解 Effect Event 能读取最新已提交的 Props / State，而不会因此让 Effect 重新同步。
3. 能区分真正应该触发 Effect 的值与只需要读取最新值的值。
4. 知道 Effect Event 只能从 Effect 或其他 Effect Event 中调用。
5. 知道不能为了删依赖而滥用 `useEffectEvent`。

> **本节核心代码**：聊天室连接对 `roomId` 响应，`onMessage` Effect Event 读取最新 `isMuted`，切换静音不会重新连接。  
> **实验辅助代码**：mock connection 使用 `setInterval` 周期性模拟服务端消息。

## 理论讲解

### 1. 一个 Effect 里可能同时存在两类逻辑

聊天室连接需要对：

```text
roomId
```

保持响应式，因为房间改变时必须断开旧房间、连接新房间。

但收到消息时是否播放声音取决于：

```text
isMuted
```

你想读取它的最新值，却不希望切换静音导致网络连接重启。

### 2. 直接读取会变成依赖

如果 Effect 内直接读取：

```jsx
if (!isMuted) {
  playSound();
}
```

那么 `isMuted` 是 Effect 读取的 Reactive Value，应进入依赖数组。

这意味着：

```text
toggle mute
→ dependency changes
→ disconnect
→ reconnect
```

但连接身份并没有变化。

### 3. Effect Event 分离非响应式逻辑

```jsx
const onMessage = useEffectEvent(message => {
  setMessages(messages => [...messages, message]);
  if (!isMuted) {
    console.log('play sound');
  }
});
```

Effect 继续只负责连接：

```jsx
useEffect(() => {
  const connection = createConnection(roomId, onMessage);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

`onMessage` 在被调用时会读取最新 committed `isMuted`。

### 4. Effect Event 不是依赖逃生口

错误心态：

```text
“linter 让我加依赖，好烦，全部包进 useEffectEvent。”
```

正确问题应该是：

```text
这个值变化后，外部同步过程是否真的需要重新开始？
```

如果答案是需要，例如 `roomId`，它必须保留为 Effect 依赖。

### 5. 使用限制

Effect Event：

- 在组件或自定义 Hook 顶层通过 `useEffectEvent` 创建；
- 只能从 Effect / Layout Effect / Insertion Effect 或其他 Effect Event 内调用；
- 不应在 Render 中调用；
- 不应作为普通事件处理器使用；
- 不应传给子组件当一般 callback；
- 不需要、也不应该放进 Effect 依赖数组。

## 动手编码：从 0 到 1

### 第 0 步：准备聊天室状态

```jsx
const [roomId, setRoomId] = useState('general');
const [isMuted, setIsMuted] = useState(false);
const [messages, setMessages] = useState([]);
```

### 第 1 步：创建 mock connection

让它每隔一段时间触发一次 `onMessage`，模拟服务端推送。

### 第 2 步：把消息处理写成 Effect Event

```jsx
const onMessage = useEffectEvent(message => {
  setMessages(items => [...items, message]);
  if (!isMuted) {
    console.log('🔔 sound');
  }
});
```

### 第 3 步：连接 Effect 只依赖 roomId

```jsx
useEffect(() => {
  const connection = createConnection(roomId, onMessage);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

### 第 4 步：切换静音

```jsx
<button onClick={() => setIsMuted(value => !value)}>
```

观察 Console：静音变化不应该导致 connect / disconnect。

### 第 5 步：切换房间

改变 `roomId` 后，连接应该 cleanup + setup，因为这是外部同步身份的真正变化。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`useEffectEvent` 分离最新值读取与响应式连接。
- **实验辅助代码**：定时消息、Console 声音标记用于观察行为。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./13-effect-advanced-races-useeffectevent/kp129-useeffectevent --config ./vite.config.js
```

## 效果验证

1. 初始连接 general 房间。
2. 切换静音状态不会断开并重连。
3. 后续消息处理会立即读取最新静音状态。
4. 切换 roomId 会正确断开旧连接并建立新连接。
5. 能解释 `useEffectEvent` 为什么不是“删依赖工具”。

完成后继续 **RE-KP130：无限 Effect 循环诊断**。
