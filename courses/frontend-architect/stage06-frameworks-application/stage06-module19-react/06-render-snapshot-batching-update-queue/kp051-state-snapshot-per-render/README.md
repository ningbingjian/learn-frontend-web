# RE-KP051：每次 Render 都得到状态快照

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 State 在一次 Render 中表现为固定快照。
2. 理解调用 setter 不会修改当前这次 Render 已经拿到的 State 变量。
3. 能解释“为什么 `setNumber(number + 1)` 后立刻打印 `number` 还是旧值”。
4. 建立 `setter → 请求更新 → 新 Render → 新 Snapshot` 的链路。
5. 区分普通 JavaScript 变量赋值与 React State 更新。
6. 为后续 Batching 和更新队列建立前置心智模型。

> **本节核心代码**：在同一个事件处理器中对比 setter 前后读取的 `number`。
>
> **实验辅助代码**：Console 日志和页面提示只用于观察 Snapshot，不是新的 React API。

## 理论讲解

### 1. State 看起来像变量，但行为不同

组件中：

```jsx
const [number, setNumber] = useState(0);
```

`number` 是 React 在这一次 Render 调用组件时提供给你的值。

可以先把它想成：

```text
Render #1
number = 0
```

这次 Render 生成的 JSX、事件处理器等都基于这个 `number = 0`。

### 2. Setter 不会改写当前变量

在事件里：

```jsx
setNumber(number + 1);
console.log(number);
```

很多人第一次会期待：

```text
1
```

但当前 Handler 所属的这次 Render 中：

```text
number 仍然是 0
```

`setNumber` 的意义更接近：

```text
告诉 React：下一次 Render 请使用新的 State
```

不是：

```text
立即给当前 JavaScript 变量 number 重新赋值
```

### 3. Snapshot 心智模型

可以画成：

```text
Render #1
number = 0
   ↓ 用户点击
setNumber(1)
   ↓ 请求更新
Render #2
number = 1
```

`Render #1` 里的 `number` 不会突然变成 1。

新值属于下一次 Render。

### 4. 为什么 React 要这样工作

React 根据一次 Render 中固定的 Props / State 计算 UI：

```text
Props Snapshot
State Snapshot
      ↓
Component Function
      ↓
JSX Snapshot
```

如果 State 在组件函数执行到一半时随意变化，同一次 Render 的推理会变得很难预测。

固定 Snapshot 让每次 Render 可以作为一个一致的计算过程来理解。

### 5. Setter 之后如何得到“下一值”

如果当前：

```jsx
number === 0
```

你完全可以自己计算：

```jsx
const nextNumber = number + 1;
setNumber(nextNumber);
console.log(nextNumber);
```

这里打印 1，是因为 `nextNumber` 是你自己创建的普通局部变量。

但：

```jsx
console.log(number);
```

仍然属于当前 Render Snapshot。

### 6. 不要把 Snapshot 误解成“React 更新慢”

这不是简单的：

```text
React 太慢，所以变量晚一点才变
```

更准确是：

```text
当前 Render 的 State 值就是固定的
新 State 会用于后续 Render
```

这是语义，而不是偶然的性能现象。

## 动手编码：从 0 到 1

### 第 0 步：建立计数 State

```jsx
const [number, setNumber] = useState(0);
```

页面先显示：

```jsx
<p>当前 number：{number}</p>
```

### 第 1 步：创建事件处理器

```jsx
function handleIncrease() {
  setNumber(number + 1);
}
```

按钮点击后 UI 正常加 1。

### 第 2 步：在 setter 前打印 Snapshot

```jsx
console.log('setter 前：', number);
```

### 第 3 步：setter 后再打印同一个变量

```jsx
setNumber(number + 1);
console.log('setter 后：', number);
```

第一次点击时，两条日志都看到 0。

### 第 4 步：显式计算下一值

```jsx
const nextNumber = number + 1;
setNumber(nextNumber);
```

再打印：

```jsx
console.log('本次计算出的 nextNumber：', nextNumber);
```

这样可以同时看到：

```text
当前 Snapshot = 0
下一目标值 = 1
```

### 第 5 步：等待 React 进入下一次 Render

页面更新后显示：

```text
当前 number：1
```

下一次点击的 Handler 才会基于新的 Snapshot 工作。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：setter 前后读取同一个 State 变量。
- **实验辅助代码**：`nextNumber` 和 Console 只用于说明“当前值 / 下一值”的区别。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp051-state-snapshot-per-render --config ./vite.config.js
```

## 效果验证

1. 第一次点击时，setter 前后 Console 中的 `number` 都是 0。
2. 页面随后重新渲染为 1。
3. `nextNumber` 可以是 1，但这不意味着当前 `number` 已被改写。
4. 能画出 `Render #1 → setter → Render #2`。
5. 能解释为什么 Snapshot 是 State 的语义，而不是“异步太慢”的偶发现象。

完成后继续 **RE-KP052：事件处理器闭包与快照**。
