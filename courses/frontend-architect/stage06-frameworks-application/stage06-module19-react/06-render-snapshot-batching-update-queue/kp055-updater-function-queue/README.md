# RE-KP055：Updater Function 队列

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | **Must** |
| 前置课程 | RE-KP054：多次 replacement update 的结果 |
| 本课主问题 | 如果三次 `setNumber(number + 1)` 只 +1，怎样表达“真的连续 +3”？ |
| Learning Artifact | replacement ×3 / updater ×3 对照实验 + 手工 Queue 表 |
| 本课暂时不用理解 | replacement + updater 混合顺序（下一课）、React 内部 Fiber Update 对象 |

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

1. `n => n + 1` 是 updater function，不是最终 State 值。
2. React 处理队列时会把前一个 pending state 交给下一个 updater。
3. updater 必须是纯计算：接收 pending state，返回 next state。

## 前置状态

上一课从 0 运行：

```jsx
setNumber(number + 1);
setNumber(number + 1);
setNumber(number + 1);
```

最终只得到：

```text
1
```

因为三次都被提前计算成 replacement 1。

## 本课主问题

业务需求真的需要一次点击：

```text
0 → 1 → 2 → 3
```

我们应该把什么交给 React，才能让第二个更新真正基于第一个更新的结果？

## 先预测

比较两段：

A：

```jsx
setNumber(number + 1);
setNumber(number + 1);
setNumber(number + 1);
```

B：

```jsx
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```

从 0 开始，先预测 A / B 最终各是多少。

## 动手编码：从 0 到 1

### Step 0：保留上一课的 replacement 对照

最终源码保留：

```jsx
function handleReplacementPlusThree() {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}
```

从 0 点击：

```text
结果 = 1
```

这不是失败代码，它是我们理解 updater 的基线。

---

### Step 1：把“具体值”改成“计算函数”

新增：

```jsx
function handleUpdaterPlusThree() {
  setNumber(n => n + 1);
  setNumber(n => n + 1);
  setNumber(n => n + 1);
}
```

这里 setter 收到的不是：

```text
1
```

而是三个函数：

```text
n => n + 1
n => n + 1
n => n + 1
```

这时给它命名：**Updater Function**。

---

### Step 2：先别点击，手工处理 Queue

假设更新开始前：

```text
pending state = 0
```

按顺序：

| Queue Item | 输入 n | 返回 |
|---|---:|---:|
| `n => n + 1` | 0 | 1 |
| `n => n + 1` | 1 | 2 |
| `n => n + 1` | 2 | 3 |

最终：

```text
next state = 3
```

这个表格比“updater 很神奇”更重要。

---

### Step 3：运行验证

从 0：

1. 点击 `replacement × 3` → 1。
2. 点击“重置为 0”。
3. 点击 `updater × 3` → 3。

### 立即解释

区别不是 batching 消失了。

两组更新都可以被 batching。

真正区别是：

```text
replacement：setter 调用前已经得到具体 next value
updater：React 处理 queue 时再把 pending state 传给函数计算
```

---

### Step 4：从任意值推理

假设页面当前：

```text
number = 5
```

三个 updater：

```text
5 → 6 → 7 → 8
```

所以不需要记“总是得到 3”，而是记：

> 每个 updater 吃前一个 queue item 的结果。

---

### Step 5：为什么 updater 必须纯净

不要这样：

```jsx
setNumber(n => {
  sendAnalytics();
  return n + 1;
});
```

Updater 的职责应该是：

```text
pending state → next state
```

而不是发送请求、改 DOM、写日志系统等副作用。

开发 StrictMode 可能额外调用 updater 来帮助发现不纯逻辑，因此纯度是语义要求，不是代码洁癖。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp055-updater-function-queue --config ./vite.config.js
```

最终源码：[`src/main.jsx`](./src/main.jsx)

## 图解与心智模型

```text
Render Snapshot number = 0
        │
        │ 点击 updater × 3
        ↓
Update Queue
┌─────────────────┐
│ n => n + 1      │ 0 → 1
├─────────────────┤
│ n => n + 1      │ 1 → 2
├─────────────────┤
│ n => n + 1      │ 2 → 3
└─────────────────┘
        ↓
下一次 Render number = 3
```

## 理论收束

### 一句话

> 当 next state 依赖 previous / pending state 时，updater function 把“怎么从前一状态计算下一状态”交给 React 的更新队列顺序执行。

### Snapshot 与 updater 参数不是一回事

```text
number
→ 当前 Render Snapshot

n
→ React 处理 Update Queue 时提供的 pending state
```

这是本课最重要的区分。

### 什么时候优先 updater

当你表达的是：

```text
在已有值基础上 +1 / -1 / toggle / append
```

尤其同一次交互可能连续更新同一 State 时，updater 能直接表达依赖关系。

## Wrong Way 与边界

### Wrong Way 1：所有 setter 一律改 updater

如果 next state 完全不依赖 previous state，例如：

```jsx
setStatus('saved');
```

直接传值更清楚。

### Wrong Way 2：在 updater 里做副作用

Updater 可能在 Render 计算路径中执行，必须保持纯净。

### 边界

本课只处理全 updater queue。replacement + updater 混合顺序由 RE-KP056 解决。

## Production Boundary

生产代码常见安全用法：

```jsx
setCount(c => c + 1);
setExpanded(expanded => !expanded);
setItems(items => [...items, nextItem]);
```

这些写法明确表达“下一值依赖 pending state”。

但不要把 updater 当性能优化，它首先是正确的状态更新语义。

## 本课只记住 3 件事

1. **Updater 是函数，不是预先算好的 next value。**
2. **后一个 updater 接收前一个 queue item 计算后的 pending state。**
3. **Updater 必须是纯函数。**

## Challenge

从 0 开始，先手算再运行：

```jsx
setNumber(n => n + 2);
setNumber(n => n * 3);
setNumber(n => n - 1);
```

要求写 Queue 表：每一步输入多少、输出多少。

## Mastery Check

### Must

- 能解释三次 updater 为什么 +3。
- 能区分 `number` Snapshot 和 updater 参数 `n`。

### Should

- 能手工处理任意 updater queue。
- 能判断什么时候直接传值、什么时候用 updater。

### Expert

- 能解释 updater purity 为什么和 Render 可重复执行 / StrictMode 检查相关。

## 最终源码与代码边界

- **本节核心代码**：连续三个 `setNumber(n => n + 1)`。
- **实验辅助代码**：replacement 对照按钮和重置按钮。
- **最终源码**：[`src/main.jsx`](./src/main.jsx)

完成后继续 **RE-KP056：替换更新与函数更新混合**。
