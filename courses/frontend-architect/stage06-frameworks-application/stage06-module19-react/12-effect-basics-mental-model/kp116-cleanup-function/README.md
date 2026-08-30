# RE-KP116：Cleanup Function

> [返回 Chapter 12](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 Cleanup Function 为什么必须与 setup 对称。
2. 知道哪些外部资源通常需要 cleanup：订阅、计时器、连接、观察器等。
3. 理解 cleanup 不只发生在卸载时，依赖变化前也会运行。
4. 能正确清理 `setInterval`，避免旧计时器继续存活。
5. 不使用“只执行一次”的思维代替真正的资源释放。

> **本节核心代码**：Effect 创建 interval，cleanup 使用同一个 `intervalId` 调用 `clearInterval()`。  
> **实验辅助代码**：页面中的秒数和“显示/隐藏计时器”按钮用于观察资源是否被正确释放。

## 理论讲解

### 1. Effect 是一次“开始同步”

例如：

```jsx
useEffect(() => {
  const intervalId = setInterval(...);
}, []);
```

这不是单纯“执行一段代码”，而是在 React 之外启动了一个浏览器计时器。

React 不会自动知道这个计时器应该什么时候结束。

### 2. Cleanup 是“停止同步”

Effect 可以返回一个函数：

```jsx
useEffect(() => {
  const intervalId = setInterval(...);

  return () => {
    clearInterval(intervalId);
  };
}, []);
```

它表达：

```text
setup   = 创建 interval
cleanup = 清除同一个 interval
```

### 3. Cleanup 应镜像 Setup

常见对应关系：

```text
addEventListener  ↔ removeEventListener
setInterval       ↔ clearInterval
connect           ↔ disconnect
observe           ↔ unobserve / disconnect
subscribe         ↔ unsubscribe
```

如果 setup 做了两件事，cleanup 通常也需要撤销对应资源。

### 4. Cleanup 不是只在 Unmount 时运行

如果 Effect 的依赖变化：

```jsx
useEffect(() => {
  // setup with roomId
  return () => {
    // cleanup old roomId
  };
}, [roomId]);
```

React 会先清理旧同步，再启动新同步。

因此更准确的模型是：

```text
old setup
→ old cleanup
→ new setup
```

### 5. 不要用 Ref 阻止 Effect 代替 Cleanup

错误方向：

```jsx
const didRun = useRef(false);

useEffect(() => {
  if (didRun.current) return;
  didRun.current = true;
  // setup
}, []);
```

这没有解决外部资源什么时候释放的问题。

真正需要的是 setup / cleanup 对称。

## 动手编码：从 0 到 1

### 第 0 步：准备可卸载的子组件

```jsx
function App() {
  const [showTimer, setShowTimer] = useState(true);
  return showTimer ? <Timer /> : null;
}
```

### 第 1 步：在 Timer 中创建秒数 State

```jsx
const [seconds, setSeconds] = useState(0);
```

### 第 2 步：使用 Effect 创建计时器

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    setSeconds(value => value + 1);
  }, 1000);
}, []);
```

此时外部资源已经被创建，但尚未清理。

### 第 3 步：添加 Cleanup

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    setSeconds(value => value + 1);
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, []);
```

### 第 4 步：打印 setup / cleanup

最终源码加入 Console 日志，方便观察 StrictMode 开发期检查和真实卸载。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`setInterval` / `clearInterval` 对称资源管理。
- **实验辅助代码**：`showTimer` 用来主动卸载子组件并观察 cleanup。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./12-effect-basics-mental-model/kp116-cleanup-function --config ./vite.config.js
```

## 效果验证

1. 显示 Timer 后秒数持续增加。
2. 隐藏 Timer 时 Console 出现 cleanup。
3. 隐藏后旧计时器不会继续修改已卸载组件。
4. 再次显示会创建新的同步过程。
5. 能解释 cleanup 为什么不仅仅是“组件销毁回调”。

完成后继续 **RE-KP117：Effect 生命周期**。
