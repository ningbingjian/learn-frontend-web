# RE-KP056：替换更新与函数更新混合

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 replacement update 与 updater function。
2. 理解两种更新混合时，React 仍然按进入队列的顺序处理。
3. 能预测“先替换再 updater”和“先 updater 再替换”的最终结果。
4. 理解 replacement update 可以把前面计算出的 pending state 覆盖掉。
5. 不再用“调用了几次 setter”直接推断最终值。

> **本节核心代码**：`setNumber(5)` 与 `setNumber(n => n + 1)` 的不同队列语义。  
> **实验辅助代码**：两个对照按钮和说明文字只用于观察顺序差异。

## 理论讲解

### 1. 两类更新先分清

如果写：

```jsx
setNumber(5);
```

可以把它理解成：

```text
把下一状态替换为 5
```

而：

```jsx
setNumber(n => n + 1);
```

表示：

```text
拿队列当前计算到的 pending state
经过 updater 计算后得到下一状态
```

二者都进入 State 更新队列，但处理方式不同。

### 2. 先替换，再 updater

```jsx
setNumber(5);
setNumber(n => n + 1);
```

队列可以先直觉化成：

```text
当前值：0
↓
replace 5
pending = 5
↓
updater n => n + 1
pending = 6
```

最终结果是：

```text
6
```

### 3. 先 updater，再替换

反过来：

```jsx
setNumber(n => n + 1);
setNumber(5);
```

则类似：

```text
当前值：0
↓
updater +1
pending = 1
↓
replace 5
pending = 5
```

最终结果是：

```text
5
```

### 4. 为什么顺序如此重要

React 不会把所有 setter 简单归类成“加法操作”。

真正重要的是：

```text
更新进入队列的顺序
+
每个更新自己的语义
```

所以：

```jsx
setNumber(5);
setNumber(n => n + 1);
```

和：

```jsx
setNumber(n => n + 1);
setNumber(5);
```

虽然都调用两次 setter，但结果完全不同。

### 5. replacement update 不是 updater

为了理解队列，可以把：

```jsx
setNumber(5)
```

概念上想成一种“不关心旧值，只返回 5”的更新。

但代码层面仍建议保持原写法，不需要人为改成：

```jsx
setNumber(() => 5)
```

本节要理解的是队列模型，不是统一代码风格。

### 6. 与 RE-KP055 的关系

RE-KP055 学的是：

```jsx
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```

三个 updater 会连续吃掉前一个 updater 的结果。

本节再加上 replacement update 后，你应该形成完整直觉：

```text
队列不是“setter 数量”
而是“按顺序执行的一组更新任务”
```

## 动手编码：从 0 到 1

### 第 0 步：准备最小计数器

```jsx
function App() {
  const [number, setNumber] = useState(0);

  return <p>当前 number：{number}</p>;
}
```

### 第 1 步：加入“先替换再 updater”

```jsx
function replaceThenUpdate() {
  setNumber(5);
  setNumber(n => n + 1);
}
```

预期从任意值点击后得到：

```text
6
```

因为第一条直接把 pending state 替换成 5，第二条再 +1。

### 第 2 步：加入“先 updater 再替换”

```jsx
function updateThenReplace() {
  setNumber(n => n + 1);
  setNumber(5);
}
```

最终会得到：

```text
5
```

后面的 replacement update 覆盖了前面 updater 的计算结果。

### 第 3 步：加入重置按钮

```jsx
<button onClick={() => setNumber(0)}>重置为 0</button>
```

这样可以重复实验。

### 第 4 步：画出队列再预测结果

先不要点击按钮，自己写：

```text
replace 5 → updater +1 → ?
updater +1 → replace 5 → ?
```

再运行验证。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：replacement update 和 updater function 混合顺序。
- **实验辅助代码**：重置按钮与说明段落只用于重复观察。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp056-replace-updater-mixed --config ./vite.config.js
```

## 效果验证

1. 重置为 0。
2. 点击“replace 5 → updater +1”，最终应为 6。
3. 再重置为 0。
4. 点击“updater +1 → replace 5”，最终应为 5。
5. 能不用运行代码就解释两个结果为什么不同。

完成后继续 **RE-KP057：React 18+ 自动批处理的范围**。
