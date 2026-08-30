# RE-KP151：Concurrent Rendering 的目标

> [返回 Chapter 16](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 Concurrent Rendering 的核心目标是改善交互响应性，而不是“让 React 自动多线程”。
2. 理解某些并发更新的 Render 工作可以被暂停、继续或放弃。
3. 理解尚未 Commit 的 stale render work 可以被更高优先级的新更新替代。
4. 理解 React 仍然会保持最终提交 UI 的一致性。
5. 建立下一节 Urgent / Non-urgent Update 的学习动机，而不提前滥用 `startTransition`。

> **本节核心代码**：输入框与昂贵结果列表共享同一个同步 `query`，建立“所有工作都绑在一次同步更新里”的基线问题。  
> **实验辅助代码**：`expensiveScore()` 只是制造确定性的 CPU 计算成本，用来观察为什么昂贵 Render 可能影响输入响应。

## 理论讲解

### 1. 同步更新的基线问题

假设一次输入同时导致：

```text
更新 input value
+
重新计算巨大结果列表
```

如果昂贵 Render 工作占用较多主线程时间，用户会感觉：

```text
键盘输入反馈不够及时
```

### 2. Concurrent Rendering 的目标是 Responsiveness

React 的并发能力希望让不同重要程度的 UI 工作可以被更合理地调度。

重点不是：

```text
把一个组件拆成多个 CPU 线程同时跑
```

而是允许某些 Render 工作具有可中断性。

### 3. Interruptible Render

当使用支持并发的能力时，某些非紧急更新的 Render 可以：

```text
开始
↓
被更紧急更新打断
↓
稍后继续，或者直接放弃旧工作
```

### 4. Stale Work 可以被丢弃

例如用户快速输入：

```text
r
re
rea
reac
react
```

如果旧的昂贵结果还没 Commit，而用户已经输入更新内容，那么旧结果可能已经没有展示价值。

理想目标是：

```text
优先响应最新交互
不要强迫 stale render work 必须完成后才能继续
```

### 5. 并发不等于最终 UI 不一致

可中断的是 Render 工作。

React 在 Commit 时仍然需要把一版一致的 UI 应用到 DOM。

可以先记：

```text
Render work 可以更灵活调度
Commit 仍提交完整一致结果
```

### 6. 本课为什么还不用 startTransition

课程顺序刻意是：

```text
RE-KP151：先理解问题和目标
RE-KP152：区分 Urgent / Non-urgent
RE-KP153：再学习 startTransition
```

否则很容易变成“看到慢就包 startTransition”，却不知道哪些更新可以延后。

## 动手编码：从 0 到 1

### 第 0 步：准备搜索输入

**目标**：建立高频用户交互。

```jsx
const [query, setQuery] = useState('');
```

```jsx
<input value={query} onChange={event => setQuery(event.target.value)} />
```

**为什么这样写**：输入是最典型的高优先级即时反馈场景。

**观察**：每次按键都触发 State 更新。

### 第 1 步：准备较大的数据集

**目标**：让查询结果需要做更多 Render 计算。

```jsx
const products = Array.from({ length: 2500 }, (_, index) => ({
  id: index,
  name: `Product ${index}`,
}));
```

**为什么这样写**：固定数据保证实验可重复。

**观察**：结果计算需要遍历较多 item。

### 第 2 步：加入确定性的昂贵计算

**目标**：人为放大 Render 成本。

```jsx
function expensiveScore(text) {
  let score = 0;
  for (let index = 0; index < 180; index += 1) {
    score += text.charCodeAt(index % text.length);
  }
  return score;
}
```

**为什么这样写**：只做纯计算，不修改外部系统。

**观察**：每个 item 都要做额外 CPU 工作。

### 第 3 步：输入与昂贵列表共用 query

**目标**：建立“一个同步更新同时驱动紧急输入和昂贵列表”的基线。

```jsx
<ExpensiveResults query={query} />
```

**为什么这样写**：本课就是要先看到没有优先级拆分时的结构。

**观察**：输入 query 会同步触发整个结果列表重新计算。

### 第 4 步：限制实际 DOM 输出数量

**目标**：让实验主要关注计算，而不是创建成千 DOM 节点。

```jsx
results.slice(0, 20)
```

**为什么这样写**：避免 DOM 数量本身掩盖课程重点。

**观察**：计算仍遍历数据集，但页面只展示前 20 个结果。

### 第 5 步：保留问题，不在本课修复

**目标**：为后续 Transition 建立明确动机。

本节不使用：

```text
startTransition
useTransition
useDeferredValue
```

**为什么这样写**：先理解为什么需要调度，再学习 API。

**观察**：代码结构中 input 和 expensive results 仍绑定同一个同步 query。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：同步 query 同时驱动输入和昂贵列表的基线结构。
- **实验辅助代码**：大数据集、`expensiveScore` 和仅展示前 20 条结果的限制。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./16-concurrent-rendering-transition-deferred-value/kp151-concurrent-rendering-goal --config ./vite.config.js
```

## 效果验证

1. 在输入框快速输入多个字符。
2. 每次 query 变化都会同步触发 ExpensiveResults 重新计算。
3. 能解释为什么高频输入不应该总被昂贵、可延后的 UI 工作拖住。
4. 能说明 Concurrent Rendering 不是 JavaScript 多线程模型。
5. 能说明某些并发 Render 工作可以被打断、继续或放弃旧结果。
6. 能说明本课尚未引入 Transition API，下一步先区分 Urgent 与 Non-urgent Update。

完成后继续 **RE-KP152：Urgent Update 与 Non-urgent Update**。
