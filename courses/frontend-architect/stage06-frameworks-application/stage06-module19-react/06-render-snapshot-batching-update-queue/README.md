# Chapter 06：Render Snapshot、Batching 与更新队列

> [返回 React 模块索引](../README.md)

本 Chapter 从“State 为什么看起来不像普通变量”继续向下：理解每次 Render 都有自己的 State Snapshot，事件处理器闭包为什么会看到某次 Render 的值，以及 React 如何批处理并排队多个 State 更新。重点是建立可预测的更新心智模型，而不是死记 `setState` 结果。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP051 | 每次 Render 都得到状态快照 | 1. Snapshot 2. Setter 不修改当前变量 3. 下一次 Render | [文档](./kp051-state-snapshot-per-render/README.md) · [源码](./kp051-state-snapshot-per-render/src/main.jsx) | 已完成 |
| RE-KP052 | 事件处理器闭包与快照 | 1. Closure 2. Render 中创建 Handler 3. 捕获本次值 | [文档](./kp052-event-handler-closure-snapshot/README.md) · [源码](./kp052-event-handler-closure-snapshot/src/main.jsx) | 已完成 |
| RE-KP053 | 同一事件中的自动批处理 | 1. Event Handler 2. Batching 3. Handler 结束后处理 | [文档](./kp053-event-batching/README.md) · [源码](./kp053-event-batching/src/main.jsx) | 已完成 |
| RE-KP054 | 多次 setState 的结果 | 1. 相同 Snapshot 2. Replacement Update 3. 连续调用结果 | [文档](./kp054-multiple-setstate-results/README.md) · [源码](./kp054-multiple-setstate-results/src/main.jsx) | 已完成 |
| RE-KP055 | Updater Function 队列 | 1. Updater Queue 2. Pending State 3. 连续计算 | [文档](./kp055-updater-function-queue/README.md) · [源码](./kp055-updater-function-queue/src/main.jsx) | 已完成 |
| RE-KP056 | 替换更新与函数更新混合 | 1. Replace 2. Updater 3. Queue 顺序 | [文档](./kp056-replace-updater-mixed/README.md) · [源码](./kp056-replace-updater-mixed/src/main.jsx) | 已完成 |
| RE-KP057 | React 18+ 自动批处理的范围 | 1. React 18+ 2. Async Boundary 3. createRoot | [文档](./kp057-automatic-batching-scope/README.md) · [源码](./kp057-automatic-batching-scope/src/main.jsx) | 已完成 |
| RE-KP058 | flushSync 打破批处理的适用边界 | 1. flushSync 2. DOM 同步需求 3. 慎用 | [文档](./kp058-flush-sync-boundary/README.md) · [源码](./kp058-flush-sync-boundary/src/main.jsx) | 已完成 |
| RE-KP059 | 异步回调中的快照理解 | 1. Async Callback 2. Captured Snapshot 3. 时间差 | [文档](./kp059-async-callback-snapshot/README.md) · [源码](./kp059-async-callback-snapshot/src/main.jsx) | 已完成 |
| RE-KP060 | Stale Closure 的根源 | 1. Closure 2. Reactive Value 3. 旧 Render | [文档](./kp060-stale-closure-root-cause/README.md) · [源码](./kp060-stale-closure-root-cause/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 06：**10 / 10，已完成**
- 下一 Chapter：**Chapter 07：组件身份、Key 与状态保存**
- 下一知识点：**RE-KP061：组件树中的位置决定身份**
