# RE-KP051：每次 Render 都得到状态快照

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | **Must** |
| 前置课程 | RE-KP041～050：State 基础与更新 |
| 本课主问题 | 为什么 `setNumber(number + 1)` 之后立刻读取 `number`，它还是旧值？ |
| Learning Artifact | 可运行计数器 + DevTools Console |
| 本课暂时不用理解 | Batching、Updater Queue、Fiber、Scheduler |

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

1. 一次 Render 中的 `number` 是固定的。
2. setter 请求的是**下一次 Render**，不是给当前局部变量重新赋值。
3. “旧值还在”不是 React 慢，而是 Snapshot 语义。

## 前置状态

你已经会写：

```jsx
const [number, setNumber] = useState(0);
```

也知道点击按钮后页面可以从 0 变 1。

这节课不增加新 Hook。我们只把一个看起来反直觉的现象真正观察出来。

## 本课主问题

如果 `setNumber` 是“更新 number”，为什么下面代码第一次点击时第二个日志不是 1？

```jsx
console.log(number);
setNumber(number + 1);
console.log(number);
```

## 先预测

假设页面当前显示：

```text
number = 0
```

先别运行，写下你的预测：

```text
setter 前：?
setter 后：?
页面最后：?
```

很多人的第一直觉是：

```text
0 / 1 / 1
```

接下来用代码验证。

## 动手编码：从 0 到 1

### Step 0：先让页面显示当前 State

**当前状态**：只有一个 State。

```jsx
const [number, setNumber] = useState(0);
```

先渲染：

```jsx
<p>当前 number：{number}</p>
```

**运行后观察**：页面显示 0。

**现在先不讲 Snapshot。** 我们先制造问题。

---

### Step 1：做一个最普通的 +1

加入：

```jsx
function handleIncrease() {
  setNumber(number + 1);
}
```

按钮：

```jsx
<button onClick={handleIncrease}>增加 1</button>
```

**运行**：点击一次。

**观察**：页面从 0 变成 1。

到这里很容易形成一个危险直觉：

```text
setNumber(number + 1)
≈
number = number + 1
```

下一步专门验证这个直觉对不对。

---

### Step 2：在 setter 前后读取同一个 `number`

把 Handler 改成：

```jsx
function handleIncrease() {
  console.log('setter 前的 number：', number);
  setNumber(number + 1);
  console.log('setter 后的 number：', number);
}
```

打开 DevTools Console，刷新页面后第一次点击。

**实际观察**：

```text
setter 前的 number：0
setter 后的 number：0
```

但按钮 Handler 结束后，页面会显示：

```text
当前 number：1
```

### 立即解释

这一步只说明一件事：

> setter 没有把当前这次组件调用里拿到的 `number` 变量原地改成 1。

它请求 React 用新 State 再执行一次组件。

这时才给刚才的现象命名：**State Snapshot**。

---

### Step 3：把“当前值”和“下一目标值”同时看见

最终源码里显式计算：

```jsx
const nextNumber = number + 1;

console.log('setter 前的 number：', number);
setNumber(nextNumber);
console.log('setter 后的 number：', number);
console.log('本次计算出的 nextNumber：', nextNumber);
```

第一次点击：

```text
当前 Render Snapshot：number = 0
本次普通 JS 计算：nextNumber = 1
```

注意：

```text
nextNumber = 1
```

不代表：

```text
当前 number 已经变成 1
```

`nextNumber` 只是你自己创建的普通局部变量。

---

### Step 4：观察下一次点击

第一次点击完成后，页面已经进入新 Render：

```text
number = 1
```

再点击一次，新的 Handler 会看到：

```text
setter 前：1
setter 后：1
nextNumber：2
```

这证明不是“永远读旧值”，而是：

> 每一次 Render 都有它自己的 State Snapshot。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp051-state-snapshot-per-render --config ./vite.config.js
```

最终源码：[`src/main.jsx`](./src/main.jsx)

## 图解与心智模型

```text
React 内部保存 State = 0
          ↓
调用 App()
          ↓
Render #1 拿到 number = 0
          ↓
创建 JSX + handleIncrease #1
          ↓
用户点击
          ↓
setNumber(1)
          ↓
当前 handleIncrease #1 中 number 仍是 0
          ↓
React 再次调用 App()
          ↓
Render #2 拿到 number = 1
```

可以把每次 Render 想成一张照片：

```text
Render #1：number = 0
Render #2：number = 1
Render #3：number = 2
```

setter 的作用是请求下一张照片，不是修改已经拍好的那一张。

## 理论收束

### 一句话

> State 更像 React 在每次 Render 时交给组件的一份快照，而不是当前函数里可以被 setter 原地修改的普通变量。

### 准确定义

组件重新 Render 时，React 再次调用组件函数，并为这次调用提供对应的 Props / State。由这次调用创建的 JSX、局部变量和事件处理器都基于该次 Render 的值计算。

### 代码变化 → 理论

| 观察 / 代码 | 对应理论 |
|---|---|
| setter 后 `number` 仍是旧值 | State Snapshot |
| 页面随后显示新值 | setter 请求新的 Render |
| 第二次点击读到新的值 | 新 Render 获得新的 Snapshot |

## Wrong Way 与边界

### Wrong Way 1：把 setter 当普通赋值

```text
错误：setNumber(1) 之后当前 number 就应该 === 1
```

更准确：

```text
setNumber(1) 请求后续 Render 使用 1
```

### Wrong Way 2：只说“setState 是异步的”

这个说法太模糊，因为它无法解释为什么当前 Handler 中值保持稳定。

优先说：

```text
当前 Render 的 State 是 Snapshot；setter 请求后续 Render。
```

### 边界

本节暂时不讨论多个 setter 如何合并，也不讨论 updater function。它们分别在 RE-KP053～056 展开。

## Production Boundary

生产代码中你不会为了 Snapshot 到处 `console.log`，但这个模型会直接影响：

- 连续 State 更新怎么写；
- 为什么异步回调可能读到旧值；
- 为什么 Effect 有依赖问题；
- 为什么 Stale Closure 会出现。

如果这一课理解错了，后面很多 React Bug 会被错误归因成“React 更新慢”。

## 本课只记住 3 件事

1. **当前 Render 的 State 值是固定 Snapshot。**
2. **setter 请求新 Render，不会改写当前局部变量。**
3. **要推理 React 代码，先问：这段函数属于哪一次 Render？**

## Challenge

把 Handler 改成：

```jsx
function handleIncrease() {
  setNumber(number + 5);
  console.log('number：', number);
  console.log('number + 5：', number + 5);
}
```

先预测 Console 和页面结果，再运行验证。

要求你能解释：为什么 `number + 5` 可以是 5，而 `number` 仍然是 0。

## Mastery Check

### Must

- 能解释 setter 后为什么立刻读取还是旧值。
- 能画出 `Render #1 → setter → Render #2`。

### Should

- 能区分 React State Snapshot 与普通局部变量 `nextNumber`。
- 不再用“异步”作为唯一解释。

### Expert

- 能把 Snapshot 模型迁移到后面的闭包、异步回调、Effect 与 Concurrent Rendering 推理中。

## 最终源码与代码边界

- **本节核心代码**：setter 前后读取同一个 `number`。
- **实验辅助代码**：`nextNumber` 与 Console 日志用于让 Snapshot 可观察。
- **最终源码**：[`src/main.jsx`](./src/main.jsx)

完成后继续 **RE-KP052：事件处理器闭包与快照**。
