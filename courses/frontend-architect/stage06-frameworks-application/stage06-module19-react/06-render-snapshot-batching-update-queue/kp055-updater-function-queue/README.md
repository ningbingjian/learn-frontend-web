# RE-KP055：Updater Function 队列

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `setNumber(n => n + 1)` 中的函数是 updater function。
2. 理解 React 会把 updater 放入更新队列。
3. 能解释多个 updater 如何依次接收前一个 pending state 的结果。
4. 预测三个 `n => n + 1` 为什么最终 +3。
5. 区分 Render Snapshot 中的 `number` 与 updater 参数 `n`。
6. 理解 updater 应保持纯净，不在函数内部执行副作用。

> **本节核心代码**：连续三个 `setNumber(n => n + 1)`，按队列依次计算 pending state。
>
> **实验辅助代码**：普通 replacement 按钮只用于和上一课形成对照。

## 理论讲解

### 1. Updater Function 是什么

当下一状态依赖前一状态时，可以写：

```jsx
setNumber(n => n + 1);
```

这里传给 setter 的不是最终数字，而是函数：

```jsx
n => n + 1
```

React 会把这个函数作为 updater 放进队列。

### 2. 参数 `n` 从哪里来

它不是简单等同于当前闭包里的：

```jsx
number
```

React 在处理更新队列时，会把 pending state 传给 updater。

假设更新前：

```text
number = 0
```

队列里有三个 updater：

```text
n => n + 1
n => n + 1
n => n + 1
```

React 可以按顺序处理：

```text
第 1 个：0 → 1
第 2 个：1 → 2
第 3 个：2 → 3
```

最终得到 3。

### 3. 为什么这和上一课不同

上一课：

```jsx
setNumber(number + 1);
setNumber(number + 1);
setNumber(number + 1);
```

如果 Snapshot 中 `number = 0`，三次参数都已经在调用 setter 前算成 1。

本课：

```jsx
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```

传入的是三个函数，真正的 `n` 会在 React 处理队列时依次获得 pending state。

### 4. Snapshot 与 Queue 的职责不同

可以这样区分：

```text
number
→ 当前 Render Snapshot

n（updater 参数）
→ React 处理更新队列时提供的 pending state
```

所以即使当前 Handler 闭包中的 `number` 没变，updater queue 仍可以连续计算出 1、2、3。

### 5. 什么时候优先使用 updater

典型场景：

```jsx
setCount(count => count + 1);
```

当下一状态明确依赖前一状态时，updater 通常更直接。

特别是：

- 同一次交互中连续更新同一 State。
- 更新逻辑表达为“在已有值基础上变化”。
- 希望逻辑不依赖当前闭包里手动读取旧值。

### 6. Updater 必须保持纯净

不要写：

```jsx
setNumber(n => {
  sendAnalytics();
  return n + 1;
});
```

updater 的职责应该只是：

```text
接收 pending state
返回 next state
```

开发 StrictMode 中 React 可能额外调用 updater 来帮助验证纯度。

所以副作用应放在合适的事件 / Effect 边界，而不是 updater 内。

### 7. 这一课暂时不混合 replacement 与 updater

例如：

```jsx
setNumber(number + 5);
setNumber(n => n + 1);
```

这会涉及“replacement update 与 updater 在同一队列中的顺序”。

课程单独放在：

```text
RE-KP056：替换更新与函数更新混合
```

本课只把纯 updater queue 学透。

## 动手编码：从 0 到 1

### 第 0 步：建立 number State

```jsx
const [number, setNumber] = useState(0);
```

### 第 1 步：保留上一课 replacement 对照

```jsx
function handleReplacementPlusThree() {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}
```

从 0 点击后得到 1。

### 第 2 步：新增 updater 版本

```jsx
function handleUpdaterPlusThree() {
  setNumber(n => n + 1);
  setNumber(n => n + 1);
  setNumber(n => n + 1);
}
```

### 第 3 步：手工模拟队列

从 0 开始：

```text
0
↓ 第一个 updater
1
↓ 第二个 updater
2
↓ 第三个 updater
3
```

### 第 4 步：实际点击验证

点击“Updater +3”后，页面一次更新到：

```text
3
```

### 第 5 步：从任意值继续推理

假设当前是 5：

```text
5 → 6 → 7 → 8
```

所以最终变 8。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：连续三个 updater function。
- **实验辅助代码**：replacement 按钮用于和 RE-KP054 对照，不是新的核心知识。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp055-updater-function-queue --config ./vite.config.js
```

## 效果验证

1. 从 0 点击 replacement 版本只得到 1。
2. 重置页面后从 0 点击 updater 版本得到 3。
3. 能手工画出 updater queue：`0 → 1 → 2 → 3`。
4. 能解释 updater 参数来自 pending state，而不是当前 Render Snapshot 变量被原地修改。
5. 能说明 updater 为什么必须保持纯净。
6. 能知道 replacement + updater 混合情况留给下一课。

完成后继续 **RE-KP056：替换更新与函数更新混合**。
