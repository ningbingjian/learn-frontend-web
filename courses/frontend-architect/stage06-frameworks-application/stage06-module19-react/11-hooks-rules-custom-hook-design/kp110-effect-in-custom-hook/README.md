# RE-KP110：自定义 Hook 中的 Effect

> [返回 Chapter 11](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 Custom Hook 可以封装 `useEffect`，把外部系统同步细节隐藏在业务语义 API 后面。
2. 会把浏览器事件订阅的 setup / cleanup 写成对称结构。
3. 理解把 Effect 提取到 Custom Hook 后，并不会改变 Effect 的响应式规则。
4. 能区分“复用 Effect 逻辑”和“共享同一份 State”。
5. 能判断什么时候值得提取 Custom Hook，而不是机械地把每个 Effect 都包装一层。

> **本节核心代码**：`useOnlineStatus()` 内部使用 `useEffect` 订阅 `window` 的 `online` / `offline` 事件，并在 cleanup 中解除订阅。  
> **实验辅助代码**：页面状态文案和刷新按钮只用于观察浏览器网络状态，不是 Custom Hook 的核心机制。

## 理论讲解

### 1. Custom Hook 可以隐藏 Effect 的实现细节

组件如果直接写：

```jsx
useEffect(() => {
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}, []);
```

调用者必须知道：

- 要监听哪些浏览器事件；
- 怎样初始化状态；
- 怎样清理监听器；
- 什么时候重新同步。

如果这些细节表达的是一个明确业务能力，例如“获得当前在线状态”，更好的调用层 API 是：

```jsx
const isOnline = useOnlineStatus();
```

### 2. 提取 Custom Hook 不会改变 Effect 的语义

把 Effect 移进：

```jsx
function useOnlineStatus() {
  // ...
}
```

不代表 Effect 变成了普通函数逻辑。

它仍然：

```text
Render
  ↓
Commit
  ↓
Effect setup
  ↓
依赖变化或卸载
  ↓
cleanup
```

Custom Hook 只是把这套状态逻辑封装起来。

### 3. setup 与 cleanup 要成对出现

本节订阅：

```jsx
window.addEventListener('online', handleOnline);
```

就应该对称清理：

```jsx
window.removeEventListener('online', handleOnline);
```

同理：

```text
connect    ↔ disconnect
subscribe  ↔ unsubscribe
add        ↔ remove
start      ↔ stop
```

### 4. 每次调用 Hook 仍然拥有独立 State

如果两个组件都调用：

```jsx
useOnlineStatus();
```

它们复用了相同的状态逻辑，但每次 Hook 调用仍属于各自组件的 Hook 链。

这延续 RE-KP106：

```text
Custom Hook 共享 logic
≠
Custom Hook 自动共享 State instance
```

### 5. 不要为了“看起来高级”把所有 Effect 都提成 Hook

推荐提取的信号：

- Effect 表达明确的业务或平台能力；
- 多个组件需要相同同步逻辑；
- setup / cleanup 细节已经影响组件可读性；
- 希望调用组件只描述“我要什么”，而不是“具体怎样同步”。

例如：

```jsx
useOnlineStatus()
useChatRoom(options)
useWindowListener(type, listener)
```

比抽象成：

```jsx
useMountSomething()
useRunEffect()
```

更有业务语义。

## 动手编码：从 0 到 1

### 第 0 步：准备状态展示组件

先假设组件需要展示：

```jsx
function StatusPanel() {
  return <p>网络状态：未知</p>;
}
```

### 第 1 步：定义浏览器状态读取函数

```jsx
function readOnlineStatus() {
  return navigator.onLine;
}
```

这让初始化表达得更清楚。

### 第 2 步：创建 Custom Hook

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(readOnlineStatus);

  return isOnline;
}
```

当前只初始化一次，还不会响应浏览器网络变化。

### 第 3 步：加入 Effect 订阅

```jsx
useEffect(() => {
  function handleOnline() {
    setIsOnline(true);
  }

  function handleOffline() {
    setIsOnline(false);
  }

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
}, []);
```

### 第 4 步：补上 cleanup

```jsx
return () => {
  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
};
```

现在订阅与解除订阅形成对称生命周期。

### 第 5 步：组件只消费业务语义

```jsx
const isOnline = useOnlineStatus();
```

组件不再需要知道 `window.addEventListener` 的实现细节。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`useOnlineStatus()`、`useEffect` setup、cleanup。
- **实验辅助代码**：页面提示和浏览器网络状态观察说明。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./11-hooks-rules-custom-hook-design/kp110-effect-in-custom-hook --config ./vite.config.js
```

## 效果验证

1. 页面能显示浏览器当前在线/离线状态。
2. 在浏览器 DevTools Network 中切换 Offline 后，状态能够响应变化。
3. `StatusPanel` 中看不到 `addEventListener` / `removeEventListener` 细节。
4. 能解释为什么 cleanup 必须与订阅操作对应。
5. 能解释 Custom Hook 为什么只是复用状态逻辑，而不是自动共享 State。
6. 能说出至少一个不值得为了抽象而提取 Custom Hook 的场景。

完成后继续 **RE-KP111：useEffect 的真正用途：同步外部系统**。
