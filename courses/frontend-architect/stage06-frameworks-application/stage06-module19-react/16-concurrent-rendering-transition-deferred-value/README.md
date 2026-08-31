# Chapter 16：并发渲染、Transition 与 Deferred Value

> [返回 React 模块索引](../README.md)

本 Chapter 从同步 Render 心智模型继续进入 React 的并发能力。目标不是把 JavaScript 误解成自动多线程，而是理解 React 为什么需要区分 Urgent Update 与 Non-urgent Update，以及并发渲染如何允许 React 在合适的更新中暂停、继续或放弃尚未提交的 Render 工作。随后会逐步学习 `startTransition`、`useTransition`、`isPending`、异步 Transition、Action 与 Transition 的关系，以及 `useDeferredValue` 如何把昂贵 UI 与高优先级输入响应解耦。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP151 | Concurrent Rendering 的目标 | 1. Interruptible Render 2. Responsiveness 3. Stale Work | [文档](./kp151-concurrent-rendering-goal/README.md) · [源码](./kp151-concurrent-rendering-goal/src/main.jsx) | 已完成 |
| RE-KP152 | Urgent Update 与 Non-urgent Update | 1. Input Priority 2. Background Work 3. UX | [文档](./kp152-urgent-vs-non-urgent-update/README.md) · [源码](./kp152-urgent-vs-non-urgent-update/src/main.jsx) | 已完成 |
| RE-KP153 | startTransition | 1. startTransition 2. Transition Update 3. Interruptible | [文档](./kp153-start-transition/README.md) · [源码](./kp153-start-transition/src/main.jsx) | 已完成 |
| RE-KP154 | useTransition | 1. Hook 2. startTransition 3. Pending | [文档](./kp154-use-transition/README.md) · [源码](./kp154-use-transition/src/main.jsx) | 已完成 |
| RE-KP155 | isPending | 1. Pending Feedback 2. UX 3. Transition State | [文档](./kp155-is-pending/README.md) · [源码](./kp155-is-pending/src/main.jsx) | 已完成 |
| RE-KP156 | Transition 中的异步更新 | 1. async Action 2. await 3. Nested Transition | [文档](./kp156-async-transition-updates/README.md) · [源码](./kp156-async-transition-updates/src/main.jsx) | 已完成 |
| RE-KP157 | Action 与 Transition 的关系 | 1. Action 2. Transition 3. Async Flow | [文档](./kp157-action-transition-relationship/README.md) · [源码](./kp157-action-transition-relationship/src/main.jsx) | 已完成 |
| RE-KP158 | useDeferredValue | 1. Deferred Value 2. Stale UI 3. Background Render | [文档](./kp158-use-deferred-value/README.md) · [源码](./kp158-use-deferred-value/src/main.jsx) | 已完成 |
| RE-KP159 | 延迟值与防抖的区别 | 1. Scheduling 2. Debounce 3. Network / Render | [文档](./kp159-deferred-vs-debounce/README.md) · [源码](./kp159-deferred-vs-debounce/src/main.jsx) | 已完成 |
| RE-KP160 | 输入框与昂贵列表的分离 | 1. Urgent Input 2. Expensive Child 3. Responsive UI | [文档](./kp160-input-expensive-list-separation/README.md) · [源码](./kp160-input-expensive-list-separation/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 16：**10 / 10，已完成**
- 下一 Chapter：**Chapter 17：Suspense、Lazy、use 与资源读取**
- 下一知识点：**RE-KP161：Suspense Boundary**
