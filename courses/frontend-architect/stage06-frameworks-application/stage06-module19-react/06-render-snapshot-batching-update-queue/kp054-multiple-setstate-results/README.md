# RE-KP054：多次 setState 的结果

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | **Must** |
| 前置课程 | RE-KP051～053：Snapshot、Closure、Batching |
| 本课主问题 | 为什么同一个 Handler 里连续三次 `setNumber(number + 1)`，页面通常只 +1？ |
| Learning Artifact | `+1` / “三次 setter”对照计数器 + 手工表达式展开 |
| 本课暂时不用理解 | Updater Function Queue（下一课） |

## 文档目录

- [这节课只需要搞懂什么](#这节课只需要搞懂什么)
- [前置状态](#前置状态)
- [本课主问题](#本课主问题)
- [先预测](#先预测)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [图解与心智模型](#图解与心智模型)
- [理论收束](#理论收束)
- [Wrong Way 与边界](#wrong-way-与边界)
- [Production Boundary](#production-boundary)
- [本课只记住 3 件事](#本课只记住-3-件事)
- [Challenge](#challenge)
- [Mastery Check](#mastery-check)

## 这节课只需要搞懂什么

1. 三次 `number + 1` 都会读取同一个 Render Snapshot。
2. `setNumber(number + 1)` 先在 JavaScript 中计算值，再把一个“替换成该值”的更新交给 React。
3. 三次 setter 不自动等于“把 number 累加三次”。

## 前置状态

你已经知道：

```text
当前 Handler 里的 number 是固定 Snapshot
```

并且同一 Handler 的多个更新会被 batching。

这节课把两个模型组合起来，预测一个经典反直觉结果。

## 本课主问题

代码：

```jsx
function handlePlusThree() {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}
```

按钮名字叫“+3”，结果真的会 +3 吗？

## 先预测

从：

```text
number = 0
```

开始。

不要运行，先选：

```text
A. 1
B. 2
C. 3
```

然后写出你脑中的计算过程。

如果你的过程是：

```text
0 → 1 → 2 → 3
```

接下来专门验证这个模型哪里不成立。

## 动手编码：从 0 到 1

### Step 0：先做一个普通 +1

```jsx
function handlePlusOne() {
  setNumber(number + 1);
}
```

点击几次，确认：

```text
0 → 1 → 2 → 3
```

每一次是**不同的用户点击 / 不同的 Render Snapshot**。

---

### Step 1：增加一个“三次 setter”按钮

```jsx
function handlePlusThree() {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}
```

从 0 刷新页面，点击一次。

**实际结果**：

```text
number = 1
```

不是 3。

---

### Step 2：不要猜 React，先展开普通 JavaScript 表达式

当前 Handler 属于：

```text
Render Snapshot：number = 0
```

因此三行代码真正先计算的是：

```jsx
setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
```

继续化简：

```jsx
setNumber(1);
setNumber(1);
setNumber(1);
```

到这里，不需要背 React 规则也能看出：你并没有传入 `1 → 2 → 3` 三个结果。

---

### Step 3：给这种更新命名为 Replacement Update

为了推理 Update Queue，可以把：

```jsx
setNumber(1);
```

理解成：

```text
replace pending number with 1
```

当前这批请求类似：

```text
replace 1
replace 1
replace 1
```

最终仍然是 1。

这时才引出专业表达：**replacement update（替换更新）**。

---

### Step 4：从 1 再实验一次

当前页面变成 1 后，再点击“三次 setter”。

新 Handler 的 Snapshot 是：

```text
number = 1
```

所以三行展开：

```text
setNumber(2)
setNumber(2)
setNumber(2)
```

最终结果：

```text
2
```

这再次证明根因不是“React 最多只执行一次”，而是三次表达式都读取同一个 Snapshot。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp054-multiple-setstate-results --config ./vite.config.js
```

最终源码：[`src/main.jsx`](./src/main.jsx)

## 图解与心智模型

```text
Render Snapshot：number = 0

handlePlusThree()
│
├─ number + 1 → 1 → replace 1
├─ number + 1 → 1 → replace 1
└─ number + 1 → 1 → replace 1

          ↓ batching / queue processing

下一次 Render：number = 1
```

## 理论收束

### 一句话

> `setNumber(number + 1)` 中的 `number + 1` 会先使用当前 Render Snapshot 求值；传给 setter 的已经是计算结果，不是“未来再执行一次 +1”的命令。

### 两步拆解法

以后看到：

```jsx
setNumber(number + 1);
```

先拆成：

```text
1. JavaScript：读取当前 Snapshot，算出 next value
2. React：收到一个 replacement update
```

### 代码变化 → 理论

| 代码 / 观察 | 对应理论 |
|---|---|
| 三次 `number + 1` 都得到相同值 | State Snapshot |
| 三次 setter 在同一点击里一起处理 | Batching |
| setter 得到具体数值 | Replacement Update |

## Wrong Way 与边界

### Wrong Way 1：按普通变量赋值脑补

这不是：

```js
number = number + 1;
number = number + 1;
number = number + 1;
```

State 变量不会在当前 Handler 中被 setter 原地重写。

### Wrong Way 2：总结成“React 会忽略前两个 setter”

这个结论不能迁移到 updater function 或混合队列。

更准确是：三次 replacement 都基于相同 Snapshot 算成相同目标值。

### 边界

真正想“基于上一条 pending state 再 +1”，需要 updater function，下一课 RE-KP055 解决。

## Production Boundary

业务中如果 next state 依赖 previous state，例如：

```text
计数 +1
库存 -1
重试次数 +1
```

不要机械使用闭包里的旧值做连续更新。先判断是否应该使用 updater function。

## 本课只记住 3 件事

1. **连续三次 `number + 1` 会读取同一 Snapshot。**
2. **具体值 setter 可以按 replacement update 推理。**
3. **setter 调用三次不等于数值自动累加三次。**

## Challenge

把三次代码改成：

```jsx
setNumber(number + 1);
setNumber(number + 2);
setNumber(number + 3);
```

从 0 开始，先预测最终值，再运行。

要求你先把它展开成：

```text
replace ?
replace ?
replace ?
```

再给答案。

## Mastery Check

### Must

- 不运行代码也能预测三次 `setNumber(number + 1)` 的结果。
- 能说明三次表达式读取的是同一个 Snapshot。

### Should

- 能使用 “JavaScript 求值 → replacement update” 两步模型。
- 不把结果错误解释成 React 忽略 setter。

### Expert

- 能用相同模型推导任意一组具体值 replacement update，并为下一课 updater queue 建立对比模型。

## 最终源码与代码边界

- **本节核心代码**：三次 `setNumber(number + 1)`。
- **实验辅助代码**：普通 `+1` 按钮提供行为对照。
- **最终源码**：[`src/main.jsx`](./src/main.jsx)

完成后继续 **RE-KP055：Updater Function 队列**。
