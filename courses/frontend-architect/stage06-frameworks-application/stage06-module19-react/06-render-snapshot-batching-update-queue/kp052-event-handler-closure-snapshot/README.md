# RE-KP052：事件处理器闭包与快照

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解事件处理器是组件某一次 Render 创建出来的函数。
2. 理解 JavaScript Closure 如何让 Handler 读取该 Render 中的 State Snapshot。
3. 能解释为什么同一次 Handler 内多次读取 `number` 都来自同一个 Render。
4. 区分“当前 Handler 捕获的值”和“下一次 Render 会得到的值”。
5. 知道每次新 Render 会生成新的 Handler 闭包。
6. 为后续异步 Snapshot / Stale Closure 学习建立基础，但本节不提前展开异步回调。

> **本节核心代码**：事件处理器闭包读取本次 Render 的 `number`，并显式计算 `nextNumber`。
>
> **实验辅助代码**：按钮标签、日志字符串用于观察闭包，不是 React 特殊机制。

## 理论讲解

### 1. Handler 在哪里创建

组件函数每次 Render 都会执行：

```jsx
function App() {
  const [number, setNumber] = useState(0);

  function handleIncrease() {
    // ...
  }

  return <button onClick={handleIncrease}>增加</button>;
}
```

所以 `handleIncrease` 不是一个脱离 Render 永远不变的神秘函数。

它是这次组件函数调用过程中创建的 JavaScript 函数。

### 2. Closure 是普通 JavaScript 能力

Handler 内可以直接读取：

```jsx
number
```

是因为 JavaScript 函数可以访问外层作用域变量。

这就是 Closure 的基础能力。

如果这次 Render：

```text
number = 5
```

那么这次 Render 创建的 Handler 就是基于 `number = 5` 这个作用域环境来工作的。

### 3. React Snapshot + JavaScript Closure

两者组合起来：

```text
React Render
  ↓ 提供 number = 5
组件函数执行
  ↓ 创建 Handler
Closure 捕获本次 Render 中可见的 number
```

因此事件发生时，Handler 读取的是它所属 Render 的值。

### 4. Setter 不会改写这个闭包里的 Snapshot

例如：

```jsx
function handleIncrease() {
  console.log(number);
  setNumber(number + 1);
  console.log(number);
}
```

如果当前 Render 的 `number` 是 5：

```text
第一次打印：5
第二次打印：5
```

因为这个函数执行期间使用的是同一份 Render Snapshot。

### 5. 下一次 Render 会产生新的闭包

更新完成后：

```text
Render A：number = 5 → Handler A
setNumber(6)
Render B：number = 6 → Handler B
```

下一次用户点击时，DOM 上对应的是新 Render 产生的 Handler 逻辑，它看到 `number = 6`。

### 6. 这不是 React “缓存旧函数”的 Bug

更准确的解释是：

```text
每次 Render 都有自己的 Props / State
每次 Render 创建的函数会闭包捕获那次 Render 可见的值
```

这个模型后面会解释很多现象：

- State Snapshot。
- 异步回调读取旧值。
- Effect 依赖。
- Stale Closure。

但本节只建立最基础闭包关系。

### 7. 不要把闭包和 updater function 混为一谈

写：

```jsx
setNumber(previousNumber => previousNumber + 1);
```

updater 参数 `previousNumber` 是 React 在处理更新队列时提供的 pending state。

而普通 Handler 里的：

```jsx
number
```

是闭包读取的本次 Render Snapshot。

两者来源不同。

RE-KP055 会深入 updater queue。

## 动手编码：从 0 到 1

### 第 0 步：建立 State

```jsx
const [number, setNumber] = useState(0);
```

### 第 1 步：在组件函数里定义 Handler

```jsx
function handleIncrease() {
  // Handler 可以读取 number
}
```

### 第 2 步：记录 Handler 开始时看到的 Snapshot

```jsx
console.log('Handler 捕获的 number：', number);
```

### 第 3 步：计算下一值

```jsx
const nextNumber = number + 1;
```

它由当前 Snapshot 推导出来。

### 第 4 步：请求 State 更新

```jsx
setNumber(nextNumber);
```

### 第 5 步：再次读取闭包里的 `number`

```jsx
console.log('调用 setter 后，闭包里的 number：', number);
```

你会看到它没有在当前 Handler 中改变。

### 第 6 步：再点击一次

页面完成新 Render 后，再点击按钮。

新的 Handler 会看到新的 Snapshot。

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Handler 闭包读取 `number`。
- **实验辅助代码**：Console 用于把不可见的闭包关系可视化。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp052-event-handler-closure-snapshot --config ./vite.config.js
```

## 效果验证

1. 每次点击时，Handler 开头和 setter 后读取的 `number` 相同。
2. 页面更新后下一次点击会看到新的数值。
3. 能解释 Handler 为什么能访问组件 State：JavaScript Closure。
4. 能说明 Closure 捕获的是某次 Render 可见的 Snapshot，而不是一个会被 setter 原地修改的变量。
5. 能区分闭包里的 `number` 和 updater 参数 `previousNumber` 的来源。

完成后继续 **RE-KP053：同一事件中的自动批处理**。
