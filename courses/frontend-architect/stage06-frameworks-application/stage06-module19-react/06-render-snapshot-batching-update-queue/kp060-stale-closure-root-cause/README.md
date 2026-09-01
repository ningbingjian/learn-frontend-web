# RE-KP060：Stale Closure 的根源

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 前置课程 | RE-KP059：异步回调中的快照 |
| 本课主问题 | 旧 Snapshot 什么时候从“正常闭包行为”变成真正会覆盖新状态的 Bug？ |
| Learning Artifact | stale delayed update vs updater delayed update 故障复现 |
| 暂时不用理解 | Ref、Effect Event 等其他 latest-value 模式 |

## 这节课只需要搞懂什么

1. Stale Closure = 旧 Render 的 Closure 被业务错误地当成最新值来源。
2. `setCount(count + 1)` 会把旧闭包值先算成 replacement update。
3. 当需求是“执行时基于最新 pending state 更新”时，updater function 才是合适修法。

## 先制造故障

当前 `count=0`，安排：

```jsx
setTimeout(() => {
  setCount(count + 1);
}, 2000);
```

然后立刻把 count 加到 10。你预测两秒后是 11 还是 1？

## 动手实验：从 0 到 1

### Step 0：准备 count 和“立即 +10”

```jsx
<button onClick={() => setCount(current => current + 10)}>
  立即 +10
</button>
```

### Step 1：实现旧 Closure 版本

```jsx
function scheduleStaleIncrement() {
  setTimeout(() => {
    setCount(count + 1);
  }, 2000);
}
```

### Step 2：复现 Bug

```text
0
↓ 安排 stale +1（callback 捕获 0）
↓ 立即 +10 → 页面 10
↓ 两秒后 callback 执行 setCount(0 + 1)
↓ 页面被覆盖为 1
```

**立即解释**：旧值不是因为 React “延迟太久”，而是 replacement 参数在旧 Closure 里根据旧 Snapshot 计算。

### Step 3：只改变更新语义

```jsx
setTimeout(() => {
  setCount(current => current + 1);
}, 2000);
```

### Step 4：重复实验

```text
0 → 安排 updater +1 → 立即 +10 → 10 → callback → 11
```

**立即解释**：`current` 来自 React 处理队列时的 pending state，更新不再依赖旧 Closure 中的 `count`。

### Step 5：证明 updater 没有“刷新 Closure”

即使 callback 中写：

```jsx
console.log(count);
setCount(current => current + 1);
```

`console.log(count)` 仍可能是旧值。Updater 只解决本次“基于 pending state 更新”的问题。

[查看最终源码](./src/main.jsx)

## 图解：正常旧值 vs Stale Closure Bug

```text
Captured Snapshot
      ↓
业务本来就要“点击时的值” → 正常

Captured Snapshot
      ↓
业务却要求“执行时最新值”
      ↓
仍用旧值计算 replacement
      ↓
Stale Closure Bug
```

## 理论收束

Stale Closure 不是 React 独有魔法，而是 JavaScript Closure 与 React Render Snapshot 叠加后的业务语义错误。修法必须从需求出发：需要 pending state 更新用 updater；需要最新非渲染值可能是 Ref；Effect 内最新事件逻辑后面还会学习 `useEffectEvent`。

## Wrong Way

- 看到异步 callback 就机械改 updater，而不确认需求。
- 说“updater 会让 Closure 变成最新”。
- 用 Ref 存所有 State 来逃避 React 数据流。

## Production Boundary

计数、重试次数、累计状态等“在最新状态基础上继续变化”的异步更新优先考虑 updater；提交时快照、审计参数等则可能故意保留捕获值。

## 本课只记住 3 件事

1. Stale Closure 的根源是旧 Render Closure 被当成最新值使用。
2. updater 读取的是更新队列中的 pending state。
3. 修复前先确定业务需要 captured value 还是 latest value。

## Challenge

把延迟 +1 改成延迟 `+5`，再添加两次同步更新；不运行先手工推演 stale 和 updater 两个版本的最终值。

## Mastery Check

- **Must**：能复现并解释 `10 → 1` 的覆盖 Bug。
- **Should**：能选出 updater / captured snapshot 的正确使用场景。
- **Expert**：能把 stale closure 诊断迁移到订阅、请求和 Effect 回调。
