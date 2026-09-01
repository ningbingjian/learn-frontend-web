# Chapter 06：Render Snapshot、Batching 与更新队列

> [返回 React 模块索引](../README.md)

本 Chapter 不要求死记“某几次 `setState` 最后得到多少”，而是通过连续可运行实验建立一个统一心智模型：**一次 Render 拿到一份 State Snapshot；事件处理器读取这份 Snapshot；setter 把更新交给 React；React 批处理并按更新队列计算下一次 Render 的 State。**

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 为什么 React State 的行为不像普通 JavaScript 变量赋值？为什么连续 setter 有时只 +1、有时能 +3？ |
| 主教学模式 | `BUILD-LAB` |
| 辅助教学模式 | `BROWSER-MECHANISM-LAB` |
| 贯穿实验 | 一个不断变化的计数器 / 保存状态实验，通过页面结果、Console 与手工队列推演建立更新模型 |
| Learning Artifact | 可运行 React Demo、Console 观察、更新队列表格、预测题 |
| 源码主线 | 本 Chapter 暂不进入 React Fiber / Scheduler 源码；先把公开行为模型学透 |
| 故障 / Wrong Way | 把 State 当普通变量、连续 replacement update 误判为累加、把所有行为笼统解释成“异步” |
| 性能边界 | RE-KP053 / 057 理解 batching 的目标；RE-KP058 单独讨论 `flushSync` 打破默认批处理边界 |
| Module DoD | 能仅凭 Snapshot + Batching + Queue 模型预测 RE-KP051～060 的典型更新结果，而不是靠试运行猜答案 |

### 本 Chapter 的观察方法

```text
先预测
  ↓
运行一个最小例子
  ↓
观察页面 / Console
  ↓
把当前 Render 的 State 代入代码
  ↓
画出 Update Queue
  ↓
再运行验证
```

> 本 Chapter 的核心不是“记答案”，而是形成可以迁移到 Effect、异步回调、Stale Closure、Concurrent Rendering 的推理方法。

## 课程索引

| 编号 | 知识点 | 包含内容 | 文档与源码 | 教学状态 |
|---|---|---|---|---|
| RE-KP051 | 每次 Render 都得到状态快照 | 1. Snapshot 2. Setter 不修改当前变量 3. 下一次 Render | [文档](./kp051-state-snapshot-per-render/README.md) · [源码](./kp051-state-snapshot-per-render/src/main.jsx) | 已重构 · v1.0 |
| RE-KP052 | 事件处理器闭包与快照 | 1. Closure 2. Render 中创建 Handler 3. 捕获本次值 | [文档](./kp052-event-handler-closure-snapshot/README.md) · [源码](./kp052-event-handler-closure-snapshot/src/main.jsx) | 已重构 · v1.0 |
| RE-KP053 | 同一事件中的自动批处理 | 1. Event Handler 2. Batching 3. Handler 结束后处理 | [文档](./kp053-event-batching/README.md) · [源码](./kp053-event-batching/src/main.jsx) | 已重构 · v1.0 |
| RE-KP054 | 多次 setState 的结果 | 1. 相同 Snapshot 2. Replacement Update 3. 连续调用结果 | [文档](./kp054-multiple-setstate-results/README.md) · [源码](./kp054-multiple-setstate-results/src/main.jsx) | 已重构 · v1.0 |
| RE-KP055 | Updater Function 队列 | 1. Updater Queue 2. Pending State 3. 连续计算 | [文档](./kp055-updater-function-queue/README.md) · [源码](./kp055-updater-function-queue/src/main.jsx) | 已重构 · v1.0 |
| RE-KP056 | 替换更新与函数更新混合 | 1. Replace 2. Updater 3. Queue 顺序 | [文档](./kp056-replace-updater-mixed/README.md) · [源码](./kp056-replace-updater-mixed/src/main.jsx) | 已重构 · v1.0 |
| RE-KP057 | React 18+ 自动批处理的范围 | 1. React 18+ 2. Async Boundary 3. createRoot | [文档](./kp057-automatic-batching-scope/README.md) · [源码](./kp057-automatic-batching-scope/src/main.jsx) | 已完成 · 待重构 |
| RE-KP058 | flushSync 打破批处理的适用边界 | 1. flushSync 2. DOM 同步需求 3. 慎用 | [文档](./kp058-flush-sync-boundary/README.md) · [源码](./kp058-flush-sync-boundary/src/main.jsx) | 已完成 · 待重构 |
| RE-KP059 | 异步回调中的快照理解 | 1. Async Callback 2. Captured Snapshot 3. 时间差 | [文档](./kp059-async-callback-snapshot/README.md) · [源码](./kp059-async-callback-snapshot/src/main.jsx) | 已完成 · 待重构 |
| RE-KP060 | Stale Closure 的根源 | 1. Closure 2. Reactive Value 3. 旧 Render | [文档](./kp060-stale-closure-root-cause/README.md) · [源码](./kp060-stale-closure-root-cause/src/main.jsx) | 已完成 · 待重构 |

## 当前进度

- 知识点完成度：**10 / 10，已完成**
- 新教学规范重构：**6 / 10**
- 下一重构批次：**RE-KP057～060 + Chapter 07 前两节**
- 知识学习顺序下一 Chapter：**Chapter 07：组件身份、Key 与状态保存**
