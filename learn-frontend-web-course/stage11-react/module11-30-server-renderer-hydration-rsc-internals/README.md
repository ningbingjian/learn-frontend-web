# Module 11.30：Server Renderer、Hydration 与 RSC Internals

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-29-lane-scheduler-suspense-internals/README.md)  > · [下一个 Module](../module11-31-library-headless/README.md)

本 Module 是 React Server Runtime 的专家级源码段，覆盖 Segment/Boundary/Stream、Server Task、Hydration、Event Replay、RSC Payload、Client/Server Reference、Bundler Integration，并用一次完整 Source Debug 串起 State Update 到 DOM Commit。

### Lesson RE-SERVERSRC-001：Server Renderer 的核心工作单元是什么

按固定版本识别 request/task/segment/boundary 等关键结构。

### Lesson RE-SERVERSRC-002：React Server Renderer 如何遍历 Element Tree

比较与 Client Reconciler 的目标差异。

### Lesson RE-SERVERSRC-003：Suspense Boundary 如何生成 Server Segment

观察 pending task 与 fallback/primary output。

### Lesson RE-SERVERSRC-004：Stream Chunk 如何被排队和 Flush

连接 renderToPipeableStream / ReadableStream 行为。

### Lesson RE-SERVERSRC-005：Abort 如何传播到 Server Task / Boundary

验证用户层 abort 行为的内部路径。

### Lesson RE-SERVERSRC-006：Hydration Fiber 如何与现有 DOM 对齐

认识 hydratable instance 查找与匹配高层路径。

### Lesson RE-SERVERSRC-007：Hydration Mismatch 在源码哪里被检测

制造 text/element mismatch 并观察 recoverable path。

### Lesson RE-SERVERSRC-008：Event Replay 为什么与未完成 Hydration 有关

建立 selective hydration / blocked event 高层模型。

### Lesson RE-SERVERSRC-009：RSC Server Renderer 与 HTML Server Renderer 有何根本区别

比较输出协议、client reference、host HTML。

### Lesson RE-SERVERSRC-010：Client Reference 如何进入 RSC Payload

观察 `"use client"` module reference 的序列化表示。

### Lesson RE-SERVERSRC-011：Server Reference / Server Function 如何编码

建立框架 transport 的内部概念，不把格式当公共稳定协议。

### Lesson RE-SERVERSRC-012：RSC String / Row / Chunk 消费高层路径

理解客户端如何逐步重建 model。

### Lesson RE-SERVERSRC-013：Bundler Integration 为什么是版本敏感内部边界

记录 manifest/module id/client reference resolution。

### Lesson RE-SERVERSRC-014：Source Debug 综合项目——State Update 到 DOM Commit 入口

从 Button Event 断点进入 dispatchSetState。

### Lesson RE-SERVERSRC-015：Source Debug 综合项目——记录 Update Queue 与 Lane

保存 update/queue/fiber/root 关键对象快照。

### Lesson RE-SERVERSRC-016：Source Debug 综合项目——跟踪 Schedule → Render → Reconcile

记录 beginWork/completeWork/child reuse。

### Lesson RE-SERVERSRC-017：Source Debug 综合项目——跟踪 Commit → DOM Mutation

定位最终文本/属性更新。

### Lesson RE-SERVERSRC-018：Source Debug 综合项目——加入 Effect 再走一次完整 Pipeline

对比 mutation/layout/passive 时机。

### Lesson RE-SERVERSRC-019：Source Debug 综合项目——提交完整调用链报告

包括 React commit SHA、断点、stack、Fiber/Queue/Lane 对象和结论。

### Lesson RE-SERVERSRC-020：React Client / Server Internal 总图验收

把 Reconciler、Scheduler、Server Renderer、Hydration、RSC 五条核心链画在统一架构图中。

---
