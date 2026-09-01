# RE-KP056：替换更新与函数更新混合

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | **Must** |
| 前置课程 | RE-KP054～055：Replacement Update 与 Updater Queue |
| 本课主问题 | replacement 和 updater 放进同一队列时，最终值到底由什么决定？ |
| Learning Artifact | 两个混合队列按钮 + 手工 Queue 表 |
| 本课暂时不用理解 | React 内部 Update 对象、Lane / Priority |

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

1. replacement 和 updater 都进入同一 State Update Queue。
2. React 按队列顺序处理，每一个 item 都会改变当前 pending state。
3. 判断结果要看“顺序 + 每个 item 的语义”，不能数 setter 次数。

## 前置状态

你已经掌握两类更新：

```text
setNumber(5)
→ replacement：把 pending state 替换成 5

setNumber(n => n + 1)
→ updater：基于 pending state 计算下一值
```

现在把它们混在同一次点击里。

## 本课主问题

这两段都调用两次 setter：

A：

```jsx
setNumber(5);
setNumber(n => n + 1);
```

B：

```jsx
setNumber(n => n + 1);
setNumber(5);
```

从 0 开始，结果会一样吗？

## 先预测

先不要运行。

填写：

```text
A 最终 = ?
B 最终 = ?
```

然后写出每个 queue item 执行后的 pending state。

## 动手编码：从 0 到 1

### Step 0：准备最小 number State

```jsx
const [number, setNumber] = useState(0);
```

页面显示：

```jsx
<p>当前 number：{number}</p>
```

并保留重置按钮：

```jsx
<button onClick={() => setNumber(0)}>重置为 0</button>
```

这样两组实验可以从相同基线重复执行。

---

### Step 1：先写“replace → updater”

```jsx
function replaceThenUpdate() {
  setNumber(5);
  setNumber(n => n + 1);
}
```

先手算：

| Queue Item | 进入前 pending | 执行后 pending |
|---|---:|---:|
| `replace 5` | 0 | 5 |
| `n => n + 1` | 5 | 6 |

预测：

```text
最终 = 6
```

运行验证，页面得到 6。

---

### Step 2：把顺序反过来

```jsx
function updateThenReplace() {
  setNumber(n => n + 1);
  setNumber(5);
}
```

手算：

| Queue Item | 进入前 pending | 执行后 pending |
|---|---:|---:|
| `n => n + 1` | 0 | 1 |
| `replace 5` | 1 | 5 |

预测：

```text
最终 = 5
```

运行验证，页面得到 5。

### 立即解释

两个 Handler 的 setter 数量完全一样，最终结果却不同。

所以真正的推理单位不是：

```text
调用 setter 几次
```

而是：

```text
Queue 中按什么顺序放了哪些类型的 Update
```

---

### Step 3：从任意初始值验证“replace”的覆盖语义

假设当前先点普通操作把 number 变成 20。

执行：

```text
replace 5 → updater +1
```

仍然得到：

```text
6
```

因为 `replace 5` 不关心进入队列前的旧值。

执行：

```text
updater +1 → replace 5
```

仍然得到：

```text
5
```

这说明 replacement 可以覆盖前面已经算出的 pending state。

---

### Step 4：把完整 Update Queue 心智模型拼起来

到这里 Chapter 06 前六课已经能组合成：

```text
Render Snapshot
   ↓ Handler Closure 读取
setter 把 Update 放入队列
   ↓
Batching 在安全边界内统一处理
   ↓
Queue 按顺序计算 pending state
   ↓
下一次 Render 获得最终 State
```

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp056-replace-updater-mixed --config ./vite.config.js
```

最终源码：[`src/main.jsx`](./src/main.jsx)

## 图解与心智模型

### Queue A

```text
start 0
  ↓
replace 5
  ↓
pending 5
  ↓
updater +1
  ↓
pending 6
```

### Queue B

```text
start 0
  ↓
updater +1
  ↓
pending 1
  ↓
replace 5
  ↓
pending 5
```

## 理论收束

### 一句话

> State Update Queue 的结果由 Update 的**类型和顺序**决定：具体值执行 replacement，updater function 基于当时的 pending state 继续计算。

### 更准确地理解 replacement

为了推理，可以把：

```jsx
setNumber(5);
```

想成：

```text
“不使用当前 pending state，直接令结果为 5”
```

它和：

```jsx
setNumber(n => n + 1);
```

在队列中的行为不同。

### 完整六课映射

| 现象 | 对应模型 |
|---|---|
| setter 后当前变量不变 | Snapshot |
| Handler 还能读到 State | Closure |
| 同事件多个更新一起处理 | Batching |
| 三次 `number + 1` 只 +1 | Snapshot + Replacement |
| 三个 updater 能 +3 | Updater Queue |
| 混合结果取决于顺序 | Queue Ordering |

## Wrong Way 与边界

### Wrong Way 1：最后一个 setter 永远赢

如果最后一个是 updater，它会基于前面 pending state 继续算，而不是简单“覆盖”。

### Wrong Way 2：把 replacement 说成前面的更新都没执行

更准确是：队列按顺序处理，但后面的 replacement 把当前 pending state 改成指定值。

### 边界

本节仍是公开行为心智模型，不进入 Fiber Update、Lane 或 Scheduler 源码。

## Production Boundary

生产业务尽量让一次 State 更新表达清楚意图：

```jsx
setStatus('saved');              // 明确 replacement
setCount(count => count + 1);   // 明确 previous-state dependency
```

不要故意写复杂混合 queue 炫技。

但当你 Review 或 Debug 第三方代码时，必须有能力按队列顺序预测结果。

## 本课只记住 3 件事

1. **Replacement 和 updater 都进入同一 Update Queue。**
2. **Queue 按顺序处理，后一个 item 接着当前 pending state 工作。**
3. **预测结果要看“类型 + 顺序”，不能只数 setter。**

## Challenge

从 0 开始，先手算：

```jsx
setNumber(5);
setNumber(n => n * 2);
setNumber(42);
setNumber(n => n + 1);
```

要求画四行 Queue 表，再运行自己改出的实验代码验证。

## Mastery Check

### Must

- 能预测 `replace → updater` 和 `updater → replace`。
- 能解释为什么两者 setter 次数相同但结果不同。

### Should

- 能手算任意 replacement / updater 混合队列。
- 能把 RE-KP051～056 串成一个统一更新模型。

### Expert

- 能区分公开 State Queue 心智模型与 React 内部 Fiber / Lane 实现，不把教学模型误当源码细节。

## 最终源码与代码边界

- **本节核心代码**：`setNumber(5)` 与 `setNumber(n => n + 1)` 的顺序组合。
- **实验辅助代码**：两个对照按钮和重置按钮。
- **最终源码**：[`src/main.jsx`](./src/main.jsx)

完成后继续 **RE-KP057：React 18+ 自动批处理的范围**。
