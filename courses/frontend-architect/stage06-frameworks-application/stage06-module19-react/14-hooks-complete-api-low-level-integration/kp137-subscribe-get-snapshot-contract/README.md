# RE-KP137：subscribe/getSnapshot 契约

> [返回 Chapter 14](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 精确解释 `subscribe(callback)` 与 `getSnapshot()` 的 contract。
2. 理解 store 未改变时，多次调用 `getSnapshot` 必须返回同一个值。
3. 理解 snapshot 改变时需要返回一个与旧 snapshot `Object.is` 不同的新值。
4. 知道 mutable store 应缓存不可变 snapshot，而不是每次 `getSnapshot()` 临时创建新对象。
5. 理解把 `subscribe` 定义在组件外通常能避免因为函数身份变化而反复重新订阅。

> **本节核心代码**：模块级 store 缓存一个不可变 `snapshot`；只有 mutation 时才替换 snapshot，并通知 listeners。  
> **实验辅助代码**：`renderTick` 只制造与 store 无关的 React Render，用来验证 store 未变时 snapshot 引用保持不变。

## 理论讲解

### 1. subscribe 的职责

`subscribe` 接收 React 提供的 callback：

```jsx
function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
```

外部 store 变化时：

```jsx
listeners.forEach(listener => listener());
```

这不是直接要求 React 重渲染，而是告诉 React：**请重新读取 snapshot。**

### 2. getSnapshot 的职责

```jsx
function getSnapshot() {
  return snapshot;
}
```

它应返回组件真正需要读取的数据快照。

React 会比较前后 snapshot：

```text
Object.is(previousSnapshot, nextSnapshot)
```

不同才表示 React 观察到 store 数据发生变化。

### 3. 最常见错误：每次都 new object

错误：

```jsx
function getSnapshot() {
  return {
    version: store.version,
    items: store.items,
  };
}
```

即使 store 没改变，每次调用也创建新对象：

```js
Object.is(getSnapshot(), getSnapshot()) === false
```

React 无法得到“外部数据其实没有变化”的稳定信号，并可能报出 `getSnapshot` 结果应该缓存的错误。

### 4. 正确方式：变化时创建 snapshot

```jsx
let snapshot = Object.freeze({
  version: 0,
  items: Object.freeze(['React']),
});
```

只有 store mutation 时：

```jsx
snapshot = Object.freeze({
  version: snapshot.version + 1,
  items: Object.freeze([...snapshot.items, newItem]),
});
```

`getSnapshot` 自己不创建新对象。

### 5. mutable data 也要提供 cached snapshot

真实外部系统内部可能是 mutable 的。

但给 React 的读取协议仍可设计为：

```text
mutable internal data changes
→ create/cache a new immutable snapshot
→ notify subscribers
```

这让 snapshot identity 能可靠表示版本变化。

### 6. subscribe 函数身份也重要

如果每次 Render 都写：

```jsx
useSyncExternalStore(
  callback => store.subscribe(callback),
  store.getSnapshot,
);
```

这里会得到新的 subscribe 函数引用，React 可能需要重新订阅。

没有捕获组件 Reactive Value 时，优先把 `subscribe` 定义在模块级或保持稳定。

## 动手编码：从 0 到 1

### 第 0 步：准备 cached snapshot

```jsx
let snapshot = Object.freeze({
  version: 0,
  items: Object.freeze(['React']),
});
```

### 第 1 步：实现模块级 subscribe

```jsx
const listeners = new Set();
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
```

### 第 2 步：getSnapshot 直接返回缓存

```jsx
function getSnapshot() {
  return snapshot;
}
```

### 第 3 步：mutation 时替换 snapshot

```jsx
function addItem(label) {
  snapshot = Object.freeze({
    version: snapshot.version + 1,
    items: Object.freeze([...snapshot.items, label]),
  });
  listeners.forEach(listener => listener());
}
```

### 第 4 步：增加无关 React State

```jsx
const [renderTick, setRenderTick] = useState(0);
```

点击“unrelated render”时 store 完全不变。

### 第 5 步：验证引用稳定

```jsx
Object.is(getSnapshot(), getSnapshot())
```

在 store 未变时始终应该为 `true`。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：cached immutable snapshot + stable subscribe contract。
- **实验辅助代码**：无关 Render 和 `Object.is` 展示用于验证契约。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./14-hooks-complete-api-low-level-integration/kp137-subscribe-get-snapshot-contract --config ./vite.config.js
```

## 效果验证

1. 初始 `Object.is(getSnapshot(), getSnapshot())` 显示 true。
2. 点击 unrelated render，snapshot version 不改变。
3. 点击 add item 后 version +1，列表增加项目。
4. mutation 后 React consumer 能看到新的 snapshot。
5. 能解释为什么“每次 getSnapshot 都返回新对象”违反 contract。

完成后继续 **RE-KP138：getServerSnapshot 与 SSR**。
