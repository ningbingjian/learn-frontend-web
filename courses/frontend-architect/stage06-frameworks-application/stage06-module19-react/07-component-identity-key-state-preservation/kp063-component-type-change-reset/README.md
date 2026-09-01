# RE-KP063：组件类型变化导致状态重置

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 前置课程 | RE-KP062：同位置同类型保留 State |
| 本课主问题 | 同一个树位置从 `Counter` 换成 `Message`，为什么切回来后 score 归零？ |
| Learning Artifact | Counter → Message → Counter 状态重置实验 |
| 暂时不用理解 | `key`、Reconciler 源码 |

## 先预测

把 Counter 点到 3，然后切到 Message，再切回来。你预测新 Counter 是 3 还是 0？

## 动手实验：从 0 到 1

### Step 0：准备有 State 的 Counter

```jsx
function Counter() {
  const [score, setScore] = useState(0);
  // ...
}
```

### Step 1：准备另一种组件类型

```jsx
function Message() {
  return <p>这里现在是 Message。</p>;
}
```

### Step 2：让同一位置发生 Type Change

```jsx
{showCounter ? <Counter /> : <Message />}
```

### Step 3：复现 State Reset

`Counter=3 → Message → Counter`。

**观察**：新的 Counter 从 0 开始。

**立即解释**：位置没变，但 Component Type 变了；旧 Counter Identity 被移除，它的 State 一起丢弃。切回来建立的是新 Counter Identity。

[查看最终源码](./src/main.jsx)

## 图解

```text
Render A: position #1 → Counter(score=3)
Render B: position #1 → Message
                         ↑ type changed
                         Counter unmounted
Render C: position #1 → Counter(score=0)
                         ↑ new identity
```

## 理论收束

State Preserve 需要 React 能匹配前后组件身份。“同位置”只是条件之一；当组件类型不同，React 会替换对应子树，而不是跨类型搬运内部 State。

## Wrong Way

- 把任何重新 Render 都叫“重新挂载”。
- 认为 State Reset 是随机现象。
- 为了清 State 随意换组件类型，而不是表达真实 UI 结构。

## Production Boundary

页面模式切换如果本质是完全不同的 UI 类型，重置通常合理；如果只是样式/Props 变化，却换了组件类型，可能造成用户草稿意外丢失。

## 本课只记住 3 件事

1. 同位置不代表一定同身份。
2. Type Change 会替换旧组件身份。
3. 旧身份被移除后，本地 State 也被丢弃。

## Challenge

给 Counter 增加输入框草稿，重复 Type Change，观察 score 和 draft 是否一起重置。

## Mastery Check

- **Must**：能预测 Counter → Message → Counter 的 State。
- **Should**：能区分 rerender 与 unmount/remount。
- **Expert**：能从组件边界设计角度避免无意义 Type Change。
