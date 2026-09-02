# Module 11.16：Actions 与 Optimistic Mutations

> [← Module 11.15：Server State、TanStack Query 与 API Boundary](../module11-15-server-state-query-api/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.17：Concurrent React：Transition、Suspense、use 与 Activity →](../module11-17-concurrent-suspense-activity/README.md)

本 Module 学习 React 19 Action 心智模型、Form Action、Pending、错误、Transition 连接与渐进增强边界。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（29 课）</strong></summary>

- [RE-ACTION-001：React 中 Action 这个词到底指什么](#lesson-re-action-001)
- [RE-ACTION-002：第一个 `<form action={fn}>`](#lesson-re-action-002)
- [RE-ACTION-003：Async Action 如何管理 Pending](#lesson-re-action-003)
- [RE-ACTION-004：Action Error 与 Validation Error 应该怎么区分](#lesson-re-action-004)
- [RE-ACTION-005：Action 与 Transition 的关系](#lesson-re-action-005)
- [RE-ACTION-006：多个 Action 并发会发生什么](#lesson-re-action-006)
- [RE-ACTION-007：Form Action 与传统 onSubmit 怎么选](#lesson-re-action-007)
- [RE-ACTION-008：Action 如何与 Router / Server Function 连接](#lesson-re-action-008)
- [RE-ACTION-009：综合实现——把 Enterprise SPA 的一个 Mutation 重构为 Action Flow](#lesson-re-action-009)
- [RE-ACTIONSTATE-001：useActionState 解决什么重复模式](#lesson-re-actionstate-001)
- [RE-ACTIONSTATE-002：第一个 useActionState](#lesson-re-actionstate-002)
- [RE-ACTIONSTATE-003：Previous State 什么时候有价值](#lesson-re-actionstate-003)
- [RE-ACTIONSTATE-004：Validation Error 如何通过 Action State 返回](#lesson-re-actionstate-004)
- [RE-ACTIONSTATE-005：useFormStatus 为什么必须在 Form 子树中使用](#lesson-re-actionstate-005)
- [RE-ACTIONSTATE-006：一个页面多个 Form 时 Pending 状态如何隔离](#lesson-re-actionstate-006)
- [RE-ACTIONSTATE-007：Action State 与 Server Function 如何连接](#lesson-re-actionstate-007)
- [RE-ACTIONSTATE-008：Action State Failure——重复提交、旧错误、字段改变](#lesson-re-actionstate-008)
- [RE-ACTIONSTATE-009：综合实现——带字段错误和 Pending UX 的订单提交表单](#lesson-re-actionstate-009)
- [RE-OPT-001：什么叫 Optimistic UI](#lesson-re-opt-001)
- [RE-OPT-002：第一个 useOptimistic](#lesson-re-opt-002)
- [RE-OPT-003：Optimistic State 在 Action 完成后如何回到真实数据](#lesson-re-opt-003)
- [RE-OPT-004：失败时如何 Rollback](#lesson-re-opt-004)
- [RE-OPT-005：临时 ID 如何与服务器真实 ID 对齐](#lesson-re-opt-005)
- [RE-OPT-006：多个并发 Optimistic Update 如何组合](#lesson-re-opt-006)
- [RE-OPT-007：乱序服务器响应怎么避免旧结果覆盖新意图](#lesson-re-opt-007)
- [RE-OPT-008：Optimistic Delete 为什么风险更高](#lesson-re-opt-008)
- [RE-OPT-009：Optimistic UI 与 Query Cache Optimistic Update 如何分工](#lesson-re-opt-009)
- [RE-OPT-010：什么时候不应该乐观更新](#lesson-re-opt-010)
- [RE-OPT-011：综合实现——订单备注/状态的 Optimistic Mutation](#lesson-re-opt-011)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-action-001"></a>
### Lesson RE-ACTION-001：React 中 Action 这个词到底指什么

从“异步状态转换”理解 Action 与普通 Event Handler 的差异。

<a id="lesson-re-action-002"></a>
### Lesson RE-ACTION-002：第一个 `<form action={fn}>`

观察 FormData、调用时机和提交生命周期。

<a id="lesson-re-action-003"></a>
### Lesson RE-ACTION-003：Async Action 如何管理 Pending

把提交中的 UI 反馈和重复提交控制连接起来。

<a id="lesson-re-action-004"></a>
### Lesson RE-ACTION-004：Action Error 与 Validation Error 应该怎么区分

建立字段错误、业务拒绝和系统异常的不同返回/抛出策略。

<a id="lesson-re-action-005"></a>
### Lesson RE-ACTION-005：Action 与 Transition 的关系

理解 Action 执行中的非紧急更新和 async transition 高层模型。

<a id="lesson-re-action-006"></a>
### Lesson RE-ACTION-006：多个 Action 并发会发生什么

制造重复提交和乱序结果，连接 Idempotency / Optimistic UI。

<a id="lesson-re-action-007"></a>
### Lesson RE-ACTION-007：Form Action 与传统 onSubmit 怎么选

从渐进增强、表单语义、客户端-only 交互比较两者。

<a id="lesson-re-action-008"></a>
### Lesson RE-ACTION-008：Action 如何与 Router / Server Function 连接

建立 client action、route action、server action/function 的边界，不混淆名称。

<a id="lesson-re-action-009"></a>
### Lesson RE-ACTION-009：综合实现——把 Enterprise SPA 的一个 Mutation 重构为 Action Flow

比较重构前后的 pending/error/validation 代码路径。

---

本 Module 聚焦 Action 状态累积和 Form 子树 Pending Context。

<a id="lesson-re-actionstate-001"></a>
### Lesson RE-ACTIONSTATE-001：useActionState 解决什么重复模式

从 action result + pending + previous state 建立问题背景。

<a id="lesson-re-actionstate-002"></a>
### Lesson RE-ACTIONSTATE-002：第一个 useActionState

拆解 action function、initial state、returned state、dispatch/action 和 pending。

<a id="lesson-re-actionstate-003"></a>
### Lesson RE-ACTIONSTATE-003：Previous State 什么时候有价值

实现计数/表单服务器错误累积，并避免把它当普通 reducer。

<a id="lesson-re-actionstate-004"></a>
### Lesson RE-ACTIONSTATE-004：Validation Error 如何通过 Action State 返回

设计 typed field errors 与 form message。

<a id="lesson-re-actionstate-005"></a>
### Lesson RE-ACTIONSTATE-005：useFormStatus 为什么必须在 Form 子树中使用

理解 Form Context 与提交状态传播。

<a id="lesson-re-actionstate-006"></a>
### Lesson RE-ACTIONSTATE-006：一个页面多个 Form 时 Pending 状态如何隔离

验证最近 Form 边界和按钮行为。

<a id="lesson-re-actionstate-007"></a>
### Lesson RE-ACTIONSTATE-007：Action State 与 Server Function 如何连接

建立 client UX state 与 server mutation result 的合同。

<a id="lesson-re-actionstate-008"></a>
### Lesson RE-ACTIONSTATE-008：Action State Failure——重复提交、旧错误、字段改变

设计错误清理和按钮状态。

<a id="lesson-re-actionstate-009"></a>
### Lesson RE-ACTIONSTATE-009：综合实现——带字段错误和 Pending UX 的订单提交表单

完成可访问错误提示、提交状态和恢复。

---

本 Module 从用户感知延迟出发完整学习乐观状态、提交、回滚、并发操作、排序和服务器校准。

<a id="lesson-re-opt-001"></a>
### Lesson RE-OPT-001：什么叫 Optimistic UI

区分“先显示预测结果”和“服务器已经成功”。

<a id="lesson-re-opt-002"></a>
### Lesson RE-OPT-002：第一个 useOptimistic

建立 base state、optimistic state、optimistic update function。

<a id="lesson-re-opt-003"></a>
### Lesson RE-OPT-003：Optimistic State 在 Action 完成后如何回到真实数据

观察 pending optimistic layer 与 base state 更新。

<a id="lesson-re-opt-004"></a>
### Lesson RE-OPT-004：失败时如何 Rollback

制造服务器拒绝并恢复 UI，同时保留错误反馈。

<a id="lesson-re-opt-005"></a>
### Lesson RE-OPT-005：临时 ID 如何与服务器真实 ID 对齐

处理新增 Comment/Item 的 identity reconciliation。

<a id="lesson-re-opt-006"></a>
### Lesson RE-OPT-006：多个并发 Optimistic Update 如何组合

制造快速连续操作并观察 optimistic queue。

<a id="lesson-re-opt-007"></a>
### Lesson RE-OPT-007：乱序服务器响应怎么避免旧结果覆盖新意图

连接 mutation ordering 和 version/idempotency。

<a id="lesson-re-opt-008"></a>
### Lesson RE-OPT-008：Optimistic Delete 为什么风险更高

设计撤销、恢复和不可逆操作边界。

<a id="lesson-re-opt-009"></a>
### Lesson RE-OPT-009：Optimistic UI 与 Query Cache Optimistic Update 如何分工

比较 React UI 层 optimistic state 与 server cache patch。

<a id="lesson-re-opt-010"></a>
### Lesson RE-OPT-010：什么时候不应该乐观更新

讨论支付、权限变更、高失败率和不可预测服务器规则。

<a id="lesson-re-opt-011"></a>
### Lesson RE-OPT-011：综合实现——订单备注/状态的 Optimistic Mutation

实现成功、失败、并发和 rollback 全路径。

---

---

> [← Module 11.15：Server State、TanStack Query 与 API Boundary](../module11-15-server-state-query-api/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.17：Concurrent React：Transition、Suspense、use 与 Activity →](../module11-17-concurrent-suspense-activity/README.md)
