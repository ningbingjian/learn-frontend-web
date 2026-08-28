# RE-KP054：多次 setState 的结果

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 预测同一 Handler 中多次 `setNumber(number + 1)` 的结果。
2. 理解三次表达式为什么都基于同一个 Render Snapshot。
3. 区分“调用 setter 三次”和“把数字连续加三次”不是同一个语义。
4. 理解 `setNumber(number + 1)` 可以看作排入一个 replacement update。
5. 知道本节只讨论多次 replacement update，函数 updater 队列留到 RE-KP055。
6. 不再靠“setState 是异步的”这种模糊说法猜结果。

> **本节核心代码**：连续三次 `setNumber(number + 1)`，观察最终只增加 1。
>
> **实验辅助代码**：`+1` 对照按钮用于确认基础 setter 正常工作。

## 理论讲解

### 1. 经典问题：为什么不是 +3

代码：

```jsx
function handlePlusThree() {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}
```

假设当前 Render：

```text
number = 0
```

很多人会按普通赋值想象：

```text
0 → 1 → 2 → 3
```

但这里不是三次：

```js
number = number + 1;
```

### 2. 三个表达式都读取同一 Snapshot

当前 Handler 属于：

```text
Render：number = 0
```

所以三次：

```jsx
number + 1
```

求值结果都是：

```text
1
```

可以把它展开成：

```jsx
setNumber(1);
setNumber(1);
setNumber(1);
```

### 3. Setter 参数是“下一状态请求”

写：

```jsx
setNumber(1);
```

可以先理解为：

```text
请求把 number 替换为 1
```

连续三个相同 replacement update 并不会自动变成：

```text
+1
+1
+1
```

### 4. Batching 让这些请求一起被处理

同一个事件 Handler 中：

```text
setNumber(1)
setNumber(1)
setNumber(1)
```

会进入这一批更新。

最终下一状态仍然是 1。

### 5. 关键不是“后一个 setter 看到了前一个 setter 的值”

后面的表达式：

```jsx
number + 1
```

不会读取前一次 setter 的“即时结果”。

它仍然读取当前 Render Snapshot 中的 `number`。

因此预测代码时先问：

```text
这个 Handler 所属 Render 中 number 是多少？
```

### 6. 用 Replacement Update 思考

本节可以先把：

```jsx
setNumber(number + 1)
```

拆成两步：

```text
1. 当前 Snapshot 计算 number + 1
2. 把计算结果作为“替换成这个值”的更新交给 React
```

如果 `number` 是 0：

```text
replacement: 1
replacement: 1
replacement: 1
```

最终得到 1。

### 7. 真正的“基于前一个 pending state 连续计算”怎么办

需要：

```jsx
setNumber(n => n + 1);
```

但这已经是下一课：

```text
RE-KP055：Updater Function 队列
```

本节先把 replacement update 的结果彻底理解。

## 动手编码：从 0 到 1

### 第 0 步：建立计数器

```jsx
const [number, setNumber] = useState(0);
```

### 第 1 步：做一个普通 +1

```jsx
function handlePlusOne() {
  setNumber(number + 1);
}
```

确认每点击一次正常 +1。

### 第 2 步：创建 +3 按钮

```jsx
function handlePlusThree() {
  // 稍后写三次 setter
}
```

### 第 3 步：连续写三次相同 replacement update

```jsx
setNumber(number + 1);
setNumber(number + 1);
setNumber(number + 1);
```

### 第 4 步：第一次从 0 点击

预测每一行：

```text
0 + 1 = 1
0 + 1 = 1
0 + 1 = 1
```

最终页面变成：

```text
1
```

### 第 5 步：从 1 再点一次

这次当前 Snapshot 是 1：

```text
1 + 1 = 2
1 + 1 = 2
1 + 1 = 2
```

最终变成 2，而不是 4。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：三次 `setNumber(number + 1)`。
- **实验辅助代码**：单次 +1 按钮用于对照 replacement update 的基础行为。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp054-multiple-setstate-results --config ./vite.config.js
```

## 效果验证

1. 从 0 点击“连续三次 replacement update”后只变成 1。
2. 再点击一次只变成 2。
3. 能把三次调用展开成 `setNumber(1)` / `setNumber(1)` / `setNumber(1)`。
4. 能解释根因是三次表达式读取同一个 Snapshot。
5. 能说明“调用 setter 三次”并不自动等于“数值增加三次”。

完成后继续 **RE-KP055：Updater Function 队列**。
