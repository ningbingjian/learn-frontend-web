# RE-KP139：useDebugValue

> [返回 Chapter 14](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useDebugValue` 用于给自定义 Hook 提供 React DevTools 调试标签。
2. 知道它不影响页面渲染、不提供业务 State、也不会触发组件更新。
3. 会在自定义 Hook 顶层调用 `useDebugValue`。
4. 会使用第二个 formatter 参数延迟昂贵的调试格式化。
5. 知道不需要给每一个简单自定义 Hook 都增加 debug value。

> **本节核心代码**：`useConnectionStatus` 在读取 external store 后调用 `useDebugValue(status, formatter)`，让 React DevTools 显示更可读的 Hook 状态。  
> **实验辅助代码**：页面也显示 status，便于没有打开 React DevTools 时操作；真正的 `useDebugValue` 效果只存在于 DevTools。

## 理论讲解

### 1. useDebugValue 不属于 UI

```jsx
useDebugValue('Online');
```

不会让页面自动出现：

```text
Online
```

它只用于 React DevTools 在检查调用该自定义 Hook 的组件时，展示更可读的调试信息。

### 2. 最适合放在 Custom Hook 内

例如：

```jsx
function useConnectionStatus() {
  const status = useSyncExternalStore(...);
  useDebugValue(status);
  return status;
}
```

DevTools 不必只看到底层 boolean/object，而可以看到更有业务语义的标签。

### 3. 使用 formatter 延迟格式化

如果调试字符串格式化比较昂贵，可以写：

```jsx
useDebugValue(status, value => `Connection: ${value}`);
```

React DevTools 在真正检查这个 Hook 时才需要调用 formatter，避免为了一个可能没人看的调试标签在每次 Render 都提前执行昂贵格式化。

### 4. 它不会改变 Hook contract

你的 Hook 仍然返回：

```jsx
return status;
```

调用者不会收到 debug value。

也就是说：

```text
Hook public API
!=
DevTools debug label
```

### 5. 不需要滥用

对于：

```jsx
function useToggle() {
  const [open, setOpen] = useState(false);
  return [open, setOpen];
}
```

底层信息已经非常容易理解，添加 debug value 未必有价值。

更值得添加的场景通常是：

- 库级 Custom Hook；
- 复杂订阅 Hook；
- 外部 Store integration；
- 状态内部结构复杂，但希望 DevTools 给出一条简明摘要。

### 6. 这是一种开发体验 API

`useDebugValue` 的价值主要在开发调试，而不是改变生产业务语义。

所以不要让业务正确性依赖：

```text
DevTools 是否打开
```

## 动手编码：从 0 到 1

### 第 0 步：准备 external connection store

```jsx
let connectionStatus = 'online';
const listeners = new Set();
```

### 第 1 步：通过 useSyncExternalStore 读取

```jsx
const status = useSyncExternalStore(subscribe, getSnapshot);
```

### 第 2 步：封装 Custom Hook

```jsx
function useConnectionStatus() {
  const status = useSyncExternalStore(...);
  return status;
}
```

### 第 3 步：添加 debug label

```jsx
useDebugValue(status, value => `Connection: ${value}`);
```

### 第 4 步：组件消费 public API

```jsx
const status = useConnectionStatus();
```

调用方仍只拿到 status 字符串。

### 第 5 步：打开 React DevTools

检查 `ConnectionPanel`，查看 `ConnectionStatus` Custom Hook 的调试值。

按钮切换 store 状态后，DevTools 调试值也会变化。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Custom Hook 内的 `useDebugValue` 与 formatter。
- **实验辅助代码**：external store 和切换按钮用来制造可观察状态变化。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./14-hooks-complete-api-low-level-integration/kp139-use-debug-value --config ./vite.config.js
```

## 效果验证

1. 页面可以在 online / offline 之间切换。
2. 不打开 DevTools 时，useDebugValue 不影响业务行为。
3. React DevTools 中可以看到自定义 Hook 的格式化调试值。
4. 能解释 formatter 为什么可以延迟昂贵格式化。
5. 能说明 debug value 与 Custom Hook 返回值是两个独立概念。

完成后继续 **RE-KP140：外部 Store 集成原则**。
