# Chapter 06：Render Snapshot、Batching 与更新队列

> [返回 React 模块索引](../README.md)

本 Chapter 不要求死记“某几次 `setState` 最后得到多少”，而是通过连续可运行实验建立统一心智模型：**一次 Render 拿到一份 State Snapshot；事件处理器读取这份 Snapshot；setter 把更新交给 React；React 批处理并按更新队列计算下一次 Render 的 State。**

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 为什么 React State 的行为不像普通 JavaScript 变量赋值？为什么连续 setter 有时只 +1、有时能 +3？ |
| 主教学模式 | `BUILD-LAB` |
| 辅助教学模式 | `BROWSER-MECHANISM-LAB` + `FAILURE-LAB` |
| 贯穿实验 | 计数器 / 保存状态实验，通过页面结果、Console、DOM 读取与手工队列推演建立更新模型 |
| Learning Artifact | 可运行 React Demo、Console 观察、更新队列表格、时间轴、预测题 |
| 源码主线 | 暂不进入 Fiber / Scheduler；先把公开行为模型学透 |
| Wrong Way | 把 State 当普通变量；用“setState 是异步的”解释一切；把 replacement 当累加；误把旧 Closure 当最新值 |
| 性能边界 | batching 减少无意义中间更新；`flushSync` 只用于明确同步 DOM 集成边界 |
| Module DoD | 能仅凭 Snapshot + Closure + Batching + Queue 模型预测 RE-KP051～060，而不是靠试运行猜答案 |

### 本 Chapter 的学习循环

```text
先预测
  ↓
写 / 改一个最小点
  ↓
运行并观察
  ↓
用当前 Render 的值手工推演
  ↓
给现象命名
  ↓
再进入下一步
```

## 课程索引

| 编号 | 知识点 | 包含内容 | 文档与源码 | 教学状态 |
|---|---|---|---|---|
| RE-KP051 | 每次 Render 都得到状态快照 | Snapshot / Setter / Next Render | [文档](./kp051-state-snapshot-per-render/README.md) · [源码](./kp051-state-snapshot-per-render/src/main.jsx) | 已重构 · v1.0 |
| RE-KP052 | 事件处理器闭包与快照 | Closure / Handler / Captured Value | [文档](./kp052-event-handler-closure-snapshot/README.md) · [源码](./kp052-event-handler-closure-snapshot/src/main.jsx) | 已重构 · v1.0 |
| RE-KP053 | 同一事件中的自动批处理 | Event Handler / Batching / Boundary | [文档](./kp053-event-batching/README.md) · [源码](./kp053-event-batching/src/main.jsx) | 已重构 · v1.0 |
| RE-KP054 | 多次 setState 的结果 | Same Snapshot / Replacement / Result | [文档](./kp054-multiple-setstate-results/README.md) · [源码](./kp054-multiple-setstate-results/src/main.jsx) | 已重构 · v1.0 |
| RE-KP055 | Updater Function 队列 | Updater Queue / Pending State / Sequence | [文档](./kp055-updater-function-queue/README.md) · [源码](./kp055-updater-function-queue/src/main.jsx) | 已重构 · v1.0 |
| RE-KP056 | 替换更新与函数更新混合 | Replace / Updater / Queue Order | [文档](./kp056-replace-updater-mixed/README.md) · [源码](./kp056-replace-updater-mixed/src/main.jsx) | 已重构 · v1.0 |
| RE-KP057 | React 18+ 自动批处理的范围 | React 18+ / Async Boundary / createRoot | [文档](./kp057-automatic-batching-scope/README.md) · [源码](./kp057-automatic-batching-scope/src/main.jsx) | 已重构 · v1.0 |
| RE-KP058 | flushSync 打破批处理的适用边界 | flushSync / DOM Sync / Caveat | [文档](./kp058-flush-sync-boundary/README.md) · [源码](./kp058-flush-sync-boundary/src/main.jsx) | 已重构 · v1.0 |
| RE-KP059 | 异步回调中的快照理解 | Async Callback / Captured Snapshot / Timeline | [文档](./kp059-async-callback-snapshot/README.md) · [源码](./kp059-async-callback-snapshot/src/main.jsx) | 已重构 · v1.0 |
| RE-KP060 | Stale Closure 的根源 | Closure / Reactive Value / Old Render | [文档](./kp060-stale-closure-root-cause/README.md) · [源码](./kp060-stale-closure-root-cause/src/main.jsx) | 已重构 · v1.0 |

## 当前进度

- 知识点完成度：**10 / 10，已完成**
- 新教学规范重构：**10 / 10，已完成**
- 下一重构范围：**Chapter 07**
- 知识学习顺序下一 Chapter：**Chapter 07：组件身份、Key 与状态保存**
