# RE-KP136：useSyncExternalStore

> [返回 Chapter 14](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useSyncExternalStore` 用于订阅 React 外部的数据源。
2. 理解 `subscribe` 与 `getSnapshot` 各自承担的职责。
3. 会编写一个返回取消订阅函数的最小 external store。
4. 理解 store 更新后 React 会重新读取 snapshot，并在 snapshot 变化时重新渲染。
5. 理解多个组件可以订阅同一个外部 store，而不是通过 React State 提升来共享这份外部数据。

> **本节核心代码**：模块级 `counterStore` 提供 `subscribe/getSnapshot`，两个 React consumer 调用 `useSyncExternalStore` 读取同一个 snapshot。  
> **实验辅助代码**：increment/reset 按钮属于教学 store 的 mutation API，不是 Hook 本身的参数。

## 理论讲解

### 1. 什么叫 External Store

React 组件通常从这些地方读取数据：

```text
Props
State
Context
```

但有些数据位于 React 之外，例如：

- 第三方状态管理库；
- 浏览器 API；
- 自己维护的模块级可变 store；
- 老系统中的订阅式数据容器。

`useSyncExternalStore` 就是 React 与这类数据源之间的标准订阅桥梁。

### 2. 最小调用形式

```jsx
const snapshot = useSyncExternalStore(subscribe, getSnapshot);
```

两个参数：

#### subscribe

```jsx
function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
```

Store 改变后需要调用 callback，通知 React“可能有新 snapshot”。

#### getSnapshot

```jsx
function getSnapshot() {
  return currentSnapshot;
}
```

它负责返回组件当前需要看到的数据快照。

### 3. React 不直接理解你的 Store

React 不知道：

```text
counterStore.increment()
```

意味着什么。

React 只依赖协议：

```text
store changes
→ listener callback
→ React calls getSnapshot again
→ Object.is(previous, next)
→ if changed, render
```

### 4. 为什么不用 useEffect + useState 手搓订阅

可以手工写：

```jsx
useEffect(() => store.subscribe(...), []);
```

再把值复制进组件 State，但这种模式把“外部 store 的一致性读取”拆成了自定义同步逻辑。

`useSyncExternalStore` 是 React 专门为 external store integration 提供的 Hook，应优先用于这类契约。

### 5. 它不是创建 Store 的工具

`useSyncExternalStore` 不负责：

- 定义 mutation；
- 管理 reducer；
- 网络缓存；
- 设计 store schema。

它只负责让 React 安全地**读取并订阅已有外部数据源**。

## 动手编码：从 0 到 1

### 第 0 步：准备模块级 snapshot

```jsx
let snapshot = Object.freeze({ count: 0 });
const listeners = new Set();
```

### 第 1 步：实现 subscribe

```jsx
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
```

### 第 2 步：实现 getSnapshot

```jsx
function getSnapshot() {
  return snapshot;
}
```

### 第 3 步：实现 store mutation

每次 mutation 创建新的 snapshot：

```jsx
snapshot = Object.freeze({ count: snapshot.count + 1 });
listeners.forEach(listener => listener());
```

### 第 4 步：组件订阅 store

```jsx
const snapshot = useSyncExternalStore(
  counterStore.subscribe,
  counterStore.getSnapshot,
);
```

### 第 5 步：渲染两个 consumer

两个组件都订阅相同 store，点击一次 increment 后会看到相同新值。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`subscribe/getSnapshot/useSyncExternalStore` 三者形成的 external store contract。
- **实验辅助代码**：counter mutation 只提供可操作的数据源。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./14-hooks-complete-api-low-level-integration/kp136-use-sync-external-store --config ./vite.config.js
```

## 效果验证

1. 两个 Consumer 初始都显示 count = 0。
2. 点击 increment 后两个 Consumer 同时读取新 snapshot。
3. 点击 reset 后两个 Consumer 都恢复 0。
4. 能解释 `subscribe` 为什么必须返回 unsubscribe function。
5. 能说明 `useSyncExternalStore` 是订阅桥梁，而不是状态管理库本身。

完成后继续 **RE-KP137：subscribe/getSnapshot 契约**。
