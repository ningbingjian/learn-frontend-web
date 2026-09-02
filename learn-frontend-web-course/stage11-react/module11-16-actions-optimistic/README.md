# Module 11.16：Actions 与 Optimistic Mutations

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-15-server-state-query-api/README.md)  > · [下一个 Module](../module11-17-concurrent-suspense-activity/README.md)

本 Module 学习 React 19 Action 心智模型、Form Action、Pending、错误、Transition 连接与渐进增强边界。

### Lesson RE-ACTION-001：React 中 Action 这个词到底指什么

从“异步状态转换”理解 Action 与普通 Event Handler 的差异。

### Lesson RE-ACTION-002：第一个 `<form action={fn}>`

观察 FormData、调用时机和提交生命周期。

### Lesson RE-ACTION-003：Async Action 如何管理 Pending

把提交中的 UI 反馈和重复提交控制连接起来。

### Lesson RE-ACTION-004：Action Error 与 Validation Error 应该怎么区分

建立字段错误、业务拒绝和系统异常的不同返回/抛出策略。

### Lesson RE-ACTION-005：Action 与 Transition 的关系

理解 Action 执行中的非紧急更新和 async transition 高层模型。

### Lesson RE-ACTION-006：多个 Action 并发会发生什么

制造重复提交和乱序结果，连接 Idempotency / Optimistic UI。

### Lesson RE-ACTION-007：Form Action 与传统 onSubmit 怎么选

从渐进增强、表单语义、客户端-only 交互比较两者。

### Lesson RE-ACTION-008：Action 如何与 Router / Server Function 连接

建立 client action、route action、server action/function 的边界，不混淆名称。

### Lesson RE-ACTION-009：综合实现——把 Enterprise SPA 的一个 Mutation 重构为 Action Flow

比较重构前后的 pending/error/validation 代码路径。

---

本 Module 聚焦 Action 状态累积和 Form 子树 Pending Context。

### Lesson RE-ACTIONSTATE-001：useActionState 解决什么重复模式

从 action result + pending + previous state 建立问题背景。

### Lesson RE-ACTIONSTATE-002：第一个 useActionState

拆解 action function、initial state、returned state、dispatch/action 和 pending。

### Lesson RE-ACTIONSTATE-003：Previous State 什么时候有价值

实现计数/表单服务器错误累积，并避免把它当普通 reducer。

### Lesson RE-ACTIONSTATE-004：Validation Error 如何通过 Action State 返回

设计 typed field errors 与 form message。

### Lesson RE-ACTIONSTATE-005：useFormStatus 为什么必须在 Form 子树中使用

理解 Form Context 与提交状态传播。

### Lesson RE-ACTIONSTATE-006：一个页面多个 Form 时 Pending 状态如何隔离

验证最近 Form 边界和按钮行为。

### Lesson RE-ACTIONSTATE-007：Action State 与 Server Function 如何连接

建立 client UX state 与 server mutation result 的合同。

### Lesson RE-ACTIONSTATE-008：Action State Failure——重复提交、旧错误、字段改变

设计错误清理和按钮状态。

### Lesson RE-ACTIONSTATE-009：综合实现——带字段错误和 Pending UX 的订单提交表单

完成可访问错误提示、提交状态和恢复。

---

本 Module 从用户感知延迟出发完整学习乐观状态、提交、回滚、并发操作、排序和服务器校准。

### Lesson RE-OPT-001：什么叫 Optimistic UI

区分“先显示预测结果”和“服务器已经成功”。

### Lesson RE-OPT-002：第一个 useOptimistic

建立 base state、optimistic state、optimistic update function。

### Lesson RE-OPT-003：Optimistic State 在 Action 完成后如何回到真实数据

观察 pending optimistic layer 与 base state 更新。

### Lesson RE-OPT-004：失败时如何 Rollback

制造服务器拒绝并恢复 UI，同时保留错误反馈。

### Lesson RE-OPT-005：临时 ID 如何与服务器真实 ID 对齐

处理新增 Comment/Item 的 identity reconciliation。

### Lesson RE-OPT-006：多个并发 Optimistic Update 如何组合

制造快速连续操作并观察 optimistic queue。

### Lesson RE-OPT-007：乱序服务器响应怎么避免旧结果覆盖新意图

连接 mutation ordering 和 version/idempotency。

### Lesson RE-OPT-008：Optimistic Delete 为什么风险更高

设计撤销、恢复和不可逆操作边界。

### Lesson RE-OPT-009：Optimistic UI 与 Query Cache Optimistic Update 如何分工

比较 React UI 层 optimistic state 与 server cache patch。

### Lesson RE-OPT-010：什么时候不应该乐观更新

讨论支付、权限变更、高失败率和不可预测服务器规则。

### Lesson RE-OPT-011：综合实现——订单备注/状态的 Optimistic Mutation

实现成功、失败、并发和 rollback 全路径。

---
