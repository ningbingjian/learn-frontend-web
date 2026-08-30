# RE-KP154：useTransition

> [返回 Chapter 16](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 掌握 `const [isPending, startTransition] = useTransition()`。
2. 理解 Hook 版 `startTransition` 与独立 `startTransition` 的共同点。
3. 理解 `useTransition` 的额外价值是让当前组件观察 pending 状态。
4. 知道 `useTransition` 只能在组件或自定义 Hook 顶层调用。
5. 能选择什么时候用独立 API，什么时候用 Hook。

> **本节核心代码**：`useTransition` 返回 `isPending` 和 `startTransition`，列表查询仍作为 Transition Update。  
> **实验辅助代码**：慢列表与页面上的 `isPending` 文本只用于观察调度行为。

## 理论讲解

### 1. Hook 返回两个值

```jsx
const [isPending, startTransition] = useTransition();
```

顺序固定：

```text
第 1 项 → isPending
第 2 项 → startTransition
```

### 2. startTransition 的核心语义不变

仍然写：

```jsx
startTransition(() => {
  setListQuery(nextValue);
});
```

传入函数会立即执行，其中同步调度的更新被标记为 Transition。

### 3. Hook 多出来的是 pending 可观察性

独立 `startTransition`：

```text
可以启动 Transition
不能直接得到 pending flag
```

`useTransition`：

```text
可以启动 Transition
还能得到 isPending
```

### 4. 为什么它必须是 Hook

`useTransition` 需要把 pending 状态关联到当前 React 组件。因此它遵守 Hooks Rules，只能在组件或自定义 Hook 顶层调用。

如果代码在 React 组件外部，例如数据层模块里，只能使用独立 `startTransition`。

### 5. 本节只观察 isPending，不深入 UX

源码先直接输出：

```jsx
<p>isPending：{String(isPending)}</p>
```

下一节专门讨论如何把 pending 状态变成可用的 UX，而不是到处 `disabled`。

## 动手编码：从 0 到 1

### 第 0 步：从独立 API 版本开始

上一课代码：

```jsx
startTransition(() => {
  setListQuery(nextValue);
});
```

### 第 1 步：导入 useTransition

```jsx
import { useState, useTransition } from 'react';
```

### 第 2 步：在组件顶层调用

```jsx
const [isPending, startTransition] = useTransition();
```

### 第 3 步：继续标记列表查询

```jsx
startTransition(() => {
  setListQuery(nextValue);
});
```

不用改变受控输入：

```jsx
setInputValue(nextValue);
```

### 第 4 步：直接显示 pending flag

```jsx
<p>isPending：{String(isPending)}</p>
```

目标：先确认 Hook 能观察 Transition 是否仍未完成。

### 第 5 步：理解 API 选择

如果你不需要 pending UI 或不在组件中：

```jsx
import { startTransition } from 'react';
```

如果组件需要 pending 状态：

```jsx
const [isPending, startTransition] = useTransition();
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`useTransition()` 返回值以及 Hook 版 `startTransition`。
- **实验辅助代码**：昂贵过滤和 pending 文本用于观察效果。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./16-concurrent-rendering-transition-deferred-value/kp154-use-transition --config ./vite.config.js
```

## 效果验证

1. 能写出 `useTransition` 的两个返回值及顺序。
2. 能说明 Hook 版与独立 `startTransition` 在更新标记上的共同点。
3. 能解释为什么 `useTransition` 只能在 React Hook 调用位置使用。
4. 能指出 `isPending` 的值属于 React 提供的 Transition 状态，而不是自己维护的 Boolean。
5. 能判断组件外代码为何使用独立 `startTransition`。

完成后继续 **RE-KP155：isPending**。
