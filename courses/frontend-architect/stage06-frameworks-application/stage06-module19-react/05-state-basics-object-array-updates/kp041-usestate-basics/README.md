# RE-KP041：useState 基础

> [返回 Chapter 05](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 从 `react` 导入 `useState`。
2. 使用 `const [value, setValue] = useState(initialValue)` 声明 State。
3. 知道 `useState` 返回当前 State 和对应 setter 两个值。
4. 会在事件处理器中调用 setter 请求更新 State。
5. 能完成一个最小计数器，并理解 State 与普通局部变量的第一层区别。

> **本节核心代码**：`const [count, setCount] = useState(0)` 与事件中的 `setCount(count + 1)`。  
> **实验辅助代码**：重置按钮与页面文案只用于帮助观察 State 变化。

## 理论讲解

### 1. 为什么普通变量不够

组件函数里的普通变量：

```jsx
function Counter() {
  let count = 0;
  // ...
}
```

不能直接承担“跨 Render 记住值并驱动 UI 更新”的职责。

React State 解决的是：

```text
记住一个值
   +
值变化后让 React 再次渲染 UI
```

### 2. `useState` 返回什么

```jsx
const [count, setCount] = useState(0);
```

可以先拆成：

```text
count
→ 当前这次 Render 读取到的 State 值

setCount
→ 请求 React 更新这个 State 的函数

0
→ 初始 State
```

### 3. 为什么命名常写成 `[x, setX]`

这是 React 社区和官方示例的通用约定：

```jsx
const [name, setName] = useState('Ada');
const [open, setOpen] = useState(false);
const [count, setCount] = useState(0);
```

看到 `setCount` 就知道它对应 `count`。

### 4. Setter 最常出现在事件中

例如：

```jsx
function handleClick() {
  setCount(count + 1);
}
```

点击发生：

```text
Event
  ↓
setCount(...)
  ↓
React 保存下一状态
  ↓
组件后续重新 Render
  ↓
UI 显示新值
```

完整 Render/更新队列机制后面会继续拆解。

### 5. Hook 先只记住顶层调用规则

本节只建立最小规则：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  // ...
}
```

不要把 `useState` 放进普通条件、循环或事件处理器中。Hooks 规则会在 Chapter 11 专门学习。

## 动手编码：从 0 到 1

### 第 0 步：建立最小组件

```jsx
function Counter() {
  return <button>Count</button>;
}
```

### 第 1 步：导入 `useState`

```jsx
import { useState } from 'react';
```

### 第 2 步：声明 `count`

```jsx
const [count, setCount] = useState(0);
```

### 第 3 步：把 State 渲染到页面

```jsx
<p>当前计数：{count}</p>
```

页面初始看到：

```text
当前计数：0
```

### 第 4 步：事件中更新 State

```jsx
function handleIncrement() {
  setCount(count + 1);
}
```

绑定：

```jsx
<button onClick={handleIncrement}>+1</button>
```

### 第 5 步：增加重置动作

```jsx
<button onClick={() => setCount(0)}>重置</button>
```

现在页面可以在多个 Render 之间保存计数值。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`useState`、State value、setter。
- **实验辅助代码**：重置按钮用于快速回到初始状态。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./05-state-basics-object-array-updates/kp041-usestate-basics --config ./vite.config.js
```

## 效果验证

1. 初始显示 `0`。
2. 连续点击 `+1`，页面计数会保留并增长。
3. 点击“重置”恢复为 `0`。
4. 能解释 `count` 与 `setCount` 分别是什么。
5. 能独立写出 `useState(initialValue)` 的最小使用方式。

完成后继续 **RE-KP042：State 是组件私有记忆**。
