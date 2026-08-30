# RE-KP153：startTransition

> [返回 Chapter 16](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 会使用 React 独立 API `startTransition(action)`。
2. 理解 `startTransition` 标记的是 State Update，而不是延迟执行回调。
3. 理解 Transition 更新是 Non-blocking，并可以被更紧急更新打断。
4. 知道 Transition 不能用于控制文本输入。
5. 知道独立 `startTransition` 不提供 pending 状态。

> **本节核心代码**：受控输入继续普通 `setInputValue`，只有昂贵列表的 `setListQuery` 放入 `startTransition`。  
> **实验辅助代码**：慢列表用于放大普通更新与 Transition 更新的体验差异。

## 理论讲解

### 1. 基本签名

```jsx
import { startTransition } from 'react';

startTransition(() => {
  setListQuery(nextValue);
});
```

React 会立即调用传入函数。它不是 `setTimeout`，不是稍后才执行 callback。

### 2. 被标记的是 Transition State Update

可以把它理解成：

```text
立即执行 action
    ↓
action 同步期间调度的 State Update
    ↓
被标记为 Transition
```

这些更新可以在后台 Render，并允许更紧急更新先处理。

### 3. 为什么输入值不能一起放进去

错误方向：

```jsx
startTransition(() => {
  setInputValue(nextValue);
});
```

Transition 更新不能用于控制文本输入。因此源码保持：

```jsx
setInputValue(nextValue);
```

列表查询才放进 Transition。

### 4. Transition Render 可以被打断

如果列表正在计算新结果，而用户继续输入，React 可以优先处理新的输入更新，并让旧的 Transition Render 失去继续完成的必要。

这就是并发能力对“stale work”的价值。

### 5. 独立 startTransition 没有 isPending

独立 API 非常适合：

- 组件外也需要启动 Transition；
- 不需要在 UI 中显示 pending 状态。

如果组件需要 pending 提示，下一节使用 `useTransition`。

## 动手编码：从 0 到 1

### 第 0 步：复制同步基线

先保留：

```jsx
setInputValue(nextValue);
setListQuery(nextValue);
```

确保可以观察昂贵列表影响输入。

### 第 1 步：导入 startTransition

```jsx
import { startTransition, useState } from 'react';
```

### 第 2 步：保持输入为普通更新

```jsx
setInputValue(nextValue);
```

目标：字符回显仍然属于紧急更新。

### 第 3 步：只标记列表更新

```jsx
startTransition(() => {
  setListQuery(nextValue);
});
```

**为什么这样写？** `listQuery` 驱动的是昂贵列表，不需要抢占输入反馈。

### 第 4 步：观察两个值可能短暂不同

页面分别显示：

```jsx
<p>立即输入值：{inputValue || '空'}</p>
<p>后台列表查询：{listQuery || '空'}</p>
```

快速输入时，`inputValue` 代表最新紧急状态；Transition 对应的列表 Render 可以在后台准备。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`startTransition(() => setListQuery(nextValue))`。
- **实验辅助代码**：模拟商品与 CPU 循环只用于制造昂贵 Render。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./16-concurrent-rendering-transition-deferred-value/kp153-start-transition --config ./vite.config.js
```

## 效果验证

1. 能解释 `startTransition` callback 是立即调用而非延迟调用。
2. 能指出真正被标记为 Transition 的是 callback 中同步调度的 State Update。
3. 能解释为什么 `inputValue` 不放进 Transition。
4. 能说明 Transition Render 为什么可以被新输入打断。
5. 能说明独立 `startTransition` 为什么无法直接提供 pending UI。

完成后继续 **RE-KP154：useTransition**。
