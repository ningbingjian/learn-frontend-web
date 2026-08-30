# RE-KP111：useEffect 的真正用途：同步外部系统

> [返回 Chapter 12](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用一句话解释 Effect 的核心职责：让 React 组件与外部系统保持同步。
2. 识别浏览器 API、网络连接、订阅、第三方组件等典型外部系统。
3. 理解 Effect 在 Commit 之后执行，而不是参与本次 Render 的纯计算。
4. 避免把所有“Render 之后想做的事”都默认塞进 Effect。
5. 会写一个最小、可清理的浏览器外部系统同步案例。

> **本节核心代码**：根据 `roomId` 在 Effect 中同步 `document.title`，并在 cleanup 中恢复原标题。  
> **实验辅助代码**：房间下拉框只用于制造 Reactive Value 变化。

## 理论讲解

### 1. Effect 不是“生命周期回调容器”

初学者经常把 `useEffect` 理解成：

```text
组件 Render 完以后执行一些代码
```

这描述了执行时机的一部分，却没有回答“为什么需要 Effect”。

更准确的心智模型是：

> **Effect 用来把 React 当前状态同步到 React 之外的系统。**

### 2. 什么叫外部系统

常见例子：

- 浏览器 DOM / `document.title`；
- `window` 事件；
- WebSocket / SSE / 聊天连接；
- 第三方地图、播放器、编辑器；
- 定时器；
- 外部 Store 的订阅；
- 浏览器观察器 API。

它们的共同点是：**不由 React Render 本身控制。**

### 3. 本节为什么用 document.title

页面标题属于浏览器环境：

```js
document.title
```

React JSX 不会自动帮你把组件里的 `roomId` 同步到浏览器标签页标题。

因此需要：

```text
React roomId
    ↓
Effect
    ↓
document.title
```

### 4. Render 与 Effect 的时间关系

可以先建立简化模型：

```text
State / Props 改变
      ↓
Render：计算 JSX
      ↓
Commit：更新 DOM
      ↓
Effect：同步外部系统
```

所以不要在 Effect 中做本来 Render 就能完成的纯计算。

### 5. 同步通常需要“撤销”

如果 setup 修改外部系统：

```jsx
document.title = `聊天室：${roomId}`;
```

组件离开时，往往应考虑是否需要恢复：

```jsx
return () => {
  document.title = previousTitle;
};
```

更复杂的外部系统通常也遵循：

```text
connect ↔ disconnect
subscribe ↔ unsubscribe
start ↔ stop
```

Cleanup 会在 RE-KP116 专门展开。

## 动手编码：从 0 到 1

### 第 0 步：先只渲染房间名称

```jsx
function Room({ roomId }) {
  return <h2>当前房间：{roomId}</h2>;
}
```

这完全属于 Render。

### 第 1 步：提出外部同步需求

现在增加需求：

> 浏览器标签页标题必须始终显示当前房间。

JSX 无法直接声明浏览器标签页标题，因此这是一个外部系统同步问题。

### 第 2 步：加入 useEffect

```jsx
useEffect(() => {
  document.title = `聊天室：${roomId}`;
}, [roomId]);
```

现在 `roomId` 改变时，Effect 会把新值同步到浏览器标题。

### 第 3 步：补上 cleanup

```jsx
useEffect(() => {
  const previousTitle = document.title;
  document.title = `聊天室：${roomId}`;

  return () => {
    document.title = previousTitle;
  };
}, [roomId]);
```

### 第 4 步：加入可切换 roomId

父组件保存：

```jsx
const [roomId, setRoomId] = useState('general');
```

下拉框改变 State，触发新的 Render，随后 Effect 根据最新 `roomId` 同步浏览器标题。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`useEffect` + `document.title` 外部同步。
- **实验辅助代码**：`select` 负责制造不同 `roomId`。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./12-effect-basics-mental-model/kp111-useeffect-sync-external-system --config ./vite.config.js
```

## 效果验证

1. 页面初始显示 `general`，浏览器标题也包含 `general`。
2. 切换到 `music` 后，页面先完成新的 Render，浏览器标题随后同步为新房间。
3. 能指出 `document.title` 为什么属于 React 外部系统。
4. 能解释“Effect 在 Commit 后同步外部系统”比“Effect 就是 componentDidMount”更准确。
5. 能举出至少三个真正适合 Effect 的外部系统案例。

完成后继续 **RE-KP112：Effect 与 Render 的区别**。
