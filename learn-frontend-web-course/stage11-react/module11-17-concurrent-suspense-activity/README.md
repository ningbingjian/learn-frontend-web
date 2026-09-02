# Module 11.17：Concurrent React：Transition、Suspense、use 与 Activity

> [← Module 11.16：Actions 与 Optimistic Mutations](../module11-16-actions-optimistic/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.18：Profiling、Render Performance、Memoization 与 React Compiler →](../module11-18-performance-compiler/README.md)

本 Module 不从 API 开始，而是先建立 Concurrent React 的可中断 Render、优先级、重启和原子 Commit 心智模型。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（67 课）</strong></summary>

- [RE-CONCURRENT-001：Concurrency 为什么不等于 Parallelism](#lesson-re-concurrent-001)
- [RE-CONCURRENT-002：为什么 Render 必须可重试](#lesson-re-concurrent-002)
- [RE-CONCURRENT-003：Urgent 与 Non-urgent Update 有什么差异](#lesson-re-concurrent-003)
- [RE-CONCURRENT-004：Interruptible Render 是什么](#lesson-re-concurrent-004)
- [RE-CONCURRENT-005：Commit 为什么仍然必须保持原子性](#lesson-re-concurrent-005)
- [RE-CONCURRENT-006：Background Rendering 与 Hidden UI 有什么关系](#lesson-re-concurrent-006)
- [RE-CONCURRENT-007：State Snapshot 在 Concurrent Render 下为什么更重要](#lesson-re-concurrent-007)
- [RE-CONCURRENT-008：External Store 为什么会遇到 Tearing](#lesson-re-concurrent-008)
- [RE-CONCURRENT-009：Lane / Scheduler 现在只需要理解到什么程度](#lesson-re-concurrent-009)
- [RE-CONCURRENT-010：综合实验——高成本列表在持续输入下的响应性问题](#lesson-re-concurrent-010)
- [RE-TRANSITION-001：什么更新适合标记为 Transition](#lesson-re-transition-001)
- [RE-TRANSITION-002：第一个 startTransition](#lesson-re-transition-002)
- [RE-TRANSITION-003：useTransition 多给了什么能力](#lesson-re-transition-003)
- [RE-TRANSITION-004：为什么不能用 Transition 控制 Text Input value](#lesson-re-transition-004)
- [RE-TRANSITION-005：Transition Render 被打断时会发生什么](#lesson-re-transition-005)
- [RE-TRANSITION-006：Transition 与 Suspense Fallback 如何互动](#lesson-re-transition-006)
- [RE-TRANSITION-007：Async Transition / Action 中 await 后更新怎么处理](#lesson-re-transition-007)
- [RE-TRANSITION-008：多个并发 Transition 的状态如何理解](#lesson-re-transition-008)
- [RE-TRANSITION-009：Transition 与 Router Navigation 的关系](#lesson-re-transition-009)
- [RE-TRANSITION-010：Transition 故障——把所有更新都包起来为什么更糟](#lesson-re-transition-010)
- [RE-TRANSITION-011：综合实现——响应式搜索 + 慢结果面板](#lesson-re-transition-011)
- [RE-DEFER-001：Deferred Value 与 Transition 的方向差异](#lesson-re-defer-001)
- [RE-DEFER-002：第一个 useDeferredValue](#lesson-re-defer-002)
- [RE-DEFER-003：Stale UI 应该如何向用户表达](#lesson-re-defer-003)
- [RE-DEFER-004：DeferredValue 与 Suspense 如何协作](#lesson-re-defer-004)
- [RE-DEFER-005：DeferredValue 为什么不是 Debounce](#lesson-re-defer-005)
- [RE-DEFER-006：什么时候应 Debounce Network，而 Deferred Render UI](#lesson-re-defer-006)
- [RE-DEFER-007：DeferredValue 是否改善响应性，怎样建立最小证据对比](#lesson-re-defer-007)
- [RE-DEFER-008：综合实现——搜索、图表、列表多消费者的 Deferred UI](#lesson-re-defer-008)
- [RE-SUSPENSE-001：Suspense 解决的根问题是什么](#lesson-re-suspense-001)
- [RE-SUSPENSE-002：第一个 Suspense + lazy](#lesson-re-suspense-002)
- [RE-SUSPENSE-003：Boundary 放在哪里决定了什么 UX](#lesson-re-suspense-003)
- [RE-SUSPENSE-004：Nested Suspense 如何控制 Reveal Sequence](#lesson-re-suspense-004)
- [RE-SUSPENSE-005：Suspense 为什么只处理 Pending，而不负责普通 Error](#lesson-re-suspense-005)
- [RE-SUSPENSE-006：Retry 是怎么发生的](#lesson-re-suspense-006)
- [RE-SUSPENSE-007：Suspense Data Source 为什么必须被框架/缓存正确集成](#lesson-re-suspense-007)
- [RE-SUSPENSE-008：Suspense Waterfall 是怎么形成的](#lesson-re-suspense-008)
- [RE-SUSPENSE-009：Parallel Data Fetch 如何减少 Waterfall](#lesson-re-suspense-009)
- [RE-SUSPENSE-010：Suspense 与 Transition 如何避免已显示内容闪回 fallback](#lesson-re-suspense-010)
- [RE-SUSPENSE-011：Suspense 与 DeferredValue 如何保持旧结果](#lesson-re-suspense-011)
- [RE-SUSPENSE-012：Suspense Boundary 与 Route Boundary 怎么组合](#lesson-re-suspense-012)
- [RE-SUSPENSE-013：Suspense 与 Streaming SSR 为什么天然关联](#lesson-re-suspense-013)
- [RE-SUSPENSE-014：Fallback 本身为什么也可能导致 Layout Shift / A11Y 问题](#lesson-re-suspense-014)
- [RE-SUSPENSE-015：Suspense Debugging——到底是谁 Suspend 了](#lesson-re-suspense-015)
- [RE-SUSPENSE-016：综合实现——多层异步 Dashboard](#lesson-re-suspense-016)
- [RE-USE-001：use() 与普通 Hook 有什么不同](#lesson-re-use-001)
- [RE-USE-002：用 use() 读取 Promise 时发生什么](#lesson-re-use-002)
- [RE-USE-003：为什么 Promise Identity 必须稳定](#lesson-re-use-003)
- [RE-USE-004：use() 读取的 Promise Reject 后应该进入什么错误路径](#lesson-re-use-004)
- [RE-USE-005：条件调用 use() 为什么与其他 Hook 规则不同](#lesson-re-use-005)
- [RE-USE-006：用 use() 读取 Context 与 useContext 有什么差异](#lesson-re-use-006)
- [RE-USE-007：Server-created Promise → Client use() 的完整链路前置](#lesson-re-use-007)
- [RE-ACTIVITY-001：隐藏 UI 的三种策略——Unmount、CSS Hide、Activity](#lesson-re-activity-001)
- [RE-ACTIVITY-002：第一个 Activity visible/hidden](#lesson-re-activity-002)
- [RE-ACTIVITY-003：Activity Hidden 时 Effect 会发生什么](#lesson-re-activity-003)
- [RE-ACTIVITY-004：Activity 与 Component Identity 有什么关系](#lesson-re-activity-004)
- [RE-ACTIVITY-005：Activity 如何用于后台预渲染可能访问的 UI](#lesson-re-activity-005)
- [RE-ACTIVITY-006：Background Priority 为什么重要](#lesson-re-activity-006)
- [RE-ACTIVITY-007：Activity 与 Suspense 如何组合](#lesson-re-activity-007)
- [RE-ACTIVITY-008：Activity 的内存与资源成本怎么评估](#lesson-re-activity-008)
- [RE-ACTIVITY-009：什么时候不应该使用 Activity](#lesson-re-activity-009)
- [RE-ACTIVITY-010：综合项目——High-interaction Data Workbench 需求设计](#lesson-re-activity-010)
- [RE-ACTIVITY-011：综合项目——实现可响应搜索与延迟结果](#lesson-re-activity-011)
- [RE-ACTIVITY-012：综合项目——实现 Optimistic Mutation 与错误恢复](#lesson-re-activity-012)
- [RE-ACTIVITY-013：综合项目——实现 Activity Tab 预渲染](#lesson-re-activity-013)
- [RE-ACTIVITY-014：综合项目——制造 Suspense Waterfall 与长 Render](#lesson-re-activity-014)
- [RE-ACTIVITY-015：综合项目——完整验收 High-interaction Workbench](#lesson-re-activity-015)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-concurrent-001"></a>
### Lesson RE-CONCURRENT-001：Concurrency 为什么不等于 Parallelism

明确 React 可以交错/暂停工作，不代表 JavaScript Component 同时多线程执行。

<a id="lesson-re-concurrent-002"></a>
### Lesson RE-CONCURRENT-002：为什么 Render 必须可重试

把 Pure Render 与可中断/重启工作连接起来。

<a id="lesson-re-concurrent-003"></a>
### Lesson RE-CONCURRENT-003：Urgent 与 Non-urgent Update 有什么差异

用输入框和大列表过滤建立交互优先级直觉。

<a id="lesson-re-concurrent-004"></a>
### Lesson RE-CONCURRENT-004：Interruptible Render 是什么

用概念时间线理解低优先级 Render 被新输入打断后重新开始。

<a id="lesson-re-concurrent-005"></a>
### Lesson RE-CONCURRENT-005：Commit 为什么仍然必须保持原子性

区分可中断 Render 与不可露出半成品 DOM。

<a id="lesson-re-concurrent-006"></a>
### Lesson RE-CONCURRENT-006：Background Rendering 与 Hidden UI 有什么关系

为 Transition、Suspense、Activity 做统一前置。

<a id="lesson-re-concurrent-007"></a>
### Lesson RE-CONCURRENT-007：State Snapshot 在 Concurrent Render 下为什么更重要

连接每个 Render 独立 Snapshot 和 closure。

<a id="lesson-re-concurrent-008"></a>
### Lesson RE-CONCURRENT-008：External Store 为什么会遇到 Tearing

回看 useSyncExternalStore 的并发一致性价值。

<a id="lesson-re-concurrent-009"></a>
### Lesson RE-CONCURRENT-009：Lane / Scheduler 现在只需要理解到什么程度

建立更新带优先级标签、调度选择工作的高层图，源码后续验证。

<a id="lesson-re-concurrent-010"></a>
### Lesson RE-CONCURRENT-010：综合实验——高成本列表在持续输入下的响应性问题

先制造卡顿，再为 Transition / DeferredValue 留出明确问题。

---

本 Module 完整学习 startTransition/useTransition、Pending、Interrupt、Async Action、Navigation、错误顺序和使用禁区。

<a id="lesson-re-transition-001"></a>
### Lesson RE-TRANSITION-001：什么更新适合标记为 Transition

用搜索结果、Tab 内容、路由内容与输入值比较紧急性。

<a id="lesson-re-transition-002"></a>
### Lesson RE-TRANSITION-002：第一个 startTransition

把昂贵结果更新标记为非紧急，保持输入响应。

<a id="lesson-re-transition-003"></a>
### Lesson RE-TRANSITION-003：useTransition 多给了什么能力

使用 isPending 为用户展示过渡状态。

<a id="lesson-re-transition-004"></a>
### Lesson RE-TRANSITION-004：为什么不能用 Transition 控制 Text Input value

解释输入的紧急受控更新约束。

<a id="lesson-re-transition-005"></a>
### Lesson RE-TRANSITION-005：Transition Render 被打断时会发生什么

持续输入观察旧工作被丢弃、最新结果最终 Commit。

<a id="lesson-re-transition-006"></a>
### Lesson RE-TRANSITION-006：Transition 与 Suspense Fallback 如何互动

观察已显示内容是否被立即替换成 fallback。

<a id="lesson-re-transition-007"></a>
### Lesson RE-TRANSITION-007：Async Transition / Action 中 await 后更新怎么处理

理解异步边界和重新标记 transition 的版本相关行为。

<a id="lesson-re-transition-008"></a>
### Lesson RE-TRANSITION-008：多个并发 Transition 的状态如何理解

制造两个非紧急更新，观察 pending 与结果顺序。

<a id="lesson-re-transition-009"></a>
### Lesson RE-TRANSITION-009：Transition 与 Router Navigation 的关系

把页面导航作为非紧急 UI 切换理解。

<a id="lesson-re-transition-010"></a>
### Lesson RE-TRANSITION-010：Transition 故障——把所有更新都包起来为什么更糟

分析错误优先级、复杂 pending 和 UX 退化。

<a id="lesson-re-transition-011"></a>
### Lesson RE-TRANSITION-011：综合实现——响应式搜索 + 慢结果面板

用 CPU throttle 和课程给定的最小交互 timing 对比输入响应性；完整 React Profiler / Browser Trace 在下一 Module 11.18。

---

本 Module 学习“消费方读取一个滞后的值”，并与 Transition、Debounce、Throttle 做清晰区分。

<a id="lesson-re-defer-001"></a>
### Lesson RE-DEFER-001：Deferred Value 与 Transition 的方向差异

Transition 控制 update，DeferredValue 控制消费到的 value。

<a id="lesson-re-defer-002"></a>
### Lesson RE-DEFER-002：第一个 useDeferredValue

让搜索输入保持最新、结果树暂时使用旧 query。

<a id="lesson-re-defer-003"></a>
### Lesson RE-DEFER-003：Stale UI 应该如何向用户表达

通过 opacity/progress 表示结果仍基于旧值。

<a id="lesson-re-defer-004"></a>
### Lesson RE-DEFER-004：DeferredValue 与 Suspense 如何协作

避免每次输入都闪 fallback。

<a id="lesson-re-defer-005"></a>
### Lesson RE-DEFER-005：DeferredValue 为什么不是 Debounce

比较请求次数、时间延迟、调度优先级和 CPU 工作。

<a id="lesson-re-defer-006"></a>
### Lesson RE-DEFER-006：什么时候应 Debounce Network，而 Deferred Render UI

组合两者解决不同层成本。

<a id="lesson-re-defer-007"></a>
### Lesson RE-DEFER-007：DeferredValue 是否改善响应性，怎样建立最小证据对比

固定数据量与设备条件，用输入响应时间和 Render 日志做最小对照；Profiler / Performance 的系统测量在下一 Module 11.18。
<a id="lesson-re-defer-008"></a>
### Lesson RE-DEFER-008：综合实现——搜索、图表、列表多消费者的 Deferred UI

为不同高成本消费组件共享最新输入和延迟视图。

---

本 Module 从“Render 暂时无法完成”完整学习 Boundary、Fallback、Nested Reveal、Lazy、Data、Retry、Error、Transition、Streaming、Waterfall 和架构设计。

<a id="lesson-re-suspense-001"></a>
### Lesson RE-SUSPENSE-001：Suspense 解决的根问题是什么

建立某个子树暂时不能完成 Render、由上层 Boundary 接住的模型。

<a id="lesson-re-suspense-002"></a>
### Lesson RE-SUSPENSE-002：第一个 Suspense + lazy

用代码分割组件观察 fallback 与模块加载。

<a id="lesson-re-suspense-003"></a>
### Lesson RE-SUSPENSE-003：Boundary 放在哪里决定了什么 UX

比较整页 fallback、区域 fallback 和过度碎片化 boundary。

<a id="lesson-re-suspense-004"></a>
### Lesson RE-SUSPENSE-004：Nested Suspense 如何控制 Reveal Sequence

设计页面骨架先出、慢区域后出的加载体验。

<a id="lesson-re-suspense-005"></a>
### Lesson RE-SUSPENSE-005：Suspense 为什么只处理 Pending，而不负责普通 Error

建立“Promise pending 进入 Suspense、真正 Error 进入独立错误恢复边界”的职责划分；Error Boundary 的实现与恢复模型在 Module 11.21。
<a id="lesson-re-suspense-006"></a>
### Lesson RE-SUSPENSE-006：Retry 是怎么发生的

理解资源完成后 React 再次尝试 Render 的高层模型。

<a id="lesson-re-suspense-007"></a>
### Lesson RE-SUSPENSE-007：Suspense Data Source 为什么必须被框架/缓存正确集成

避免把任意 Effect fetch 误认为 Suspense data fetching。

<a id="lesson-re-suspense-008"></a>
### Lesson RE-SUSPENSE-008：Suspense Waterfall 是怎么形成的

父资源完成后才发现子资源，制造串行等待并测量。

<a id="lesson-re-suspense-009"></a>
### Lesson RE-SUSPENSE-009：Parallel Data Fetch 如何减少 Waterfall

提前启动资源/路由 loader/query prefetch。

<a id="lesson-re-suspense-010"></a>
### Lesson RE-SUSPENSE-010：Suspense 与 Transition 如何避免已显示内容闪回 fallback

比较普通更新和 transition update。

<a id="lesson-re-suspense-011"></a>
### Lesson RE-SUSPENSE-011：Suspense 与 DeferredValue 如何保持旧结果

把搜索结果 UX 做成 stale-while-revalidate 风格。

<a id="lesson-re-suspense-012"></a>
### Lesson RE-SUSPENSE-012：Suspense Boundary 与 Route Boundary 怎么组合

设计 route shell、page data、widget data 三层异步边界。

<a id="lesson-re-suspense-013"></a>
### Lesson RE-SUSPENSE-013：Suspense 与 Streaming SSR 为什么天然关联

建立服务器可以按 Boundary 逐段发送 HTML 的前置模型。

<a id="lesson-re-suspense-014"></a>
### Lesson RE-SUSPENSE-014：Fallback 本身为什么也可能导致 Layout Shift / A11Y 问题

设计稳定尺寸、live region 和焦点策略。

<a id="lesson-re-suspense-015"></a>
### Lesson RE-SUSPENSE-015：Suspense Debugging——到底是谁 Suspend 了

使用 React DevTools / Network / 资源日志定位 pending source。

<a id="lesson-re-suspense-016"></a>
### Lesson RE-SUSPENSE-016：综合实现——多层异步 Dashboard

组合 Lazy、Query/Resource、Nested Boundary、Transition 并主动制造 Waterfall；错误路径使用课程提供的 TeachingErrorBoundary 作为教学基础设施，不要求理解其 Class 实现，完整 Error Model 在 Module 11.21。

---

本 Module 学习 React 的 Resource Reading 模型：Promise / Context 如何在 Render 中读取、Suspense/Error Boundary 如何承接，以及 Server-created Promise 如何交给 Client。

<a id="lesson-re-use-001"></a>
### Lesson RE-USE-001：use() 与普通 Hook 有什么不同

理解它可以读取 Promise/Context，并具有不同的条件调用规则。

<a id="lesson-re-use-002"></a>
### Lesson RE-USE-002：用 use() 读取 Promise 时发生什么

Promise pending 触发 Suspense、fulfilled 返回值、rejected 进入错误路径。

<a id="lesson-re-use-003"></a>
### Lesson RE-USE-003：为什么 Promise Identity 必须稳定

Render 中不断创建新 Promise 会造成重复 suspend/工作浪费。

<a id="lesson-re-use-004"></a>
### Lesson RE-USE-004：use() 读取的 Promise Reject 后应该进入什么错误路径

制造 Promise rejection，并使用课程提供的 TeachingErrorBoundary 验证 rejected path；本课关注 use() / Suspense 契约，Error Boundary 实现与恢复 UI 在 Module 11.21。
<a id="lesson-re-use-005"></a>
### Lesson RE-USE-005：条件调用 use() 为什么与其他 Hook 规则不同

建立它的 API 语义但仍遵循只在 Component/Hook 中调用的边界。

<a id="lesson-re-use-006"></a>
### Lesson RE-USE-006：用 use() 读取 Context 与 useContext 有什么差异

理解条件读取场景和可读性取舍。

<a id="lesson-re-use-007"></a>
### Lesson RE-USE-007：Server-created Promise → Client use() 的完整链路前置

为 RSC Module 建立 Promise 传递与 Suspense 消费模型。

---

本 Module 学习 React 19.2 的 Activity：在隐藏 UI 保留 State、处理 Effect 生命周期、后台优先级和预渲染候选页面，并完成高交互 Workbench。

<a id="lesson-re-activity-001"></a>
### Lesson RE-ACTIVITY-001：隐藏 UI 的三种策略——Unmount、CSS Hide、Activity

比较 State、DOM、Effect、CPU 和内存行为。

<a id="lesson-re-activity-002"></a>
### Lesson RE-ACTIVITY-002：第一个 Activity visible/hidden

切换 Tab 并观察 State Preservation。

<a id="lesson-re-activity-003"></a>
### Lesson RE-ACTIVITY-003：Activity Hidden 时 Effect 会发生什么

验证外部同步生命周期和重新 visible 时的行为。

<a id="lesson-re-activity-004"></a>
### Lesson RE-ACTIVITY-004：Activity 与 Component Identity 有什么关系

连接 Module 11.07 的 Component Identity / State Preservation 行为模型。
<a id="lesson-re-activity-005"></a>
### Lesson RE-ACTIVITY-005：Activity 如何用于后台预渲染可能访问的 UI

设计 likely navigation / tab content 的预备渲染。

<a id="lesson-re-activity-006"></a>
### Lesson RE-ACTIVITY-006：Background Priority 为什么重要

理解隐藏树工作不能抢占当前输入/可见页面。

<a id="lesson-re-activity-007"></a>
### Lesson RE-ACTIVITY-007：Activity 与 Suspense 如何组合

隐藏内容预先 suspend/加载，在 visible 时减少等待。

<a id="lesson-re-activity-008"></a>
### Lesson RE-ACTIVITY-008：Activity 的内存与资源成本怎么评估

讨论保留大量树、DOM、State 与隐藏资源的 trade-off。

<a id="lesson-re-activity-009"></a>
### Lesson RE-ACTIVITY-009：什么时候不应该使用 Activity

短生命周期 Modal、敏感 State、巨大隐藏树等场景选型。

<a id="lesson-re-activity-010"></a>
### Lesson RE-ACTIVITY-010：综合项目——High-interaction Data Workbench 需求设计

组合搜索、Query、Optimistic、Suspense、Transition、DeferredValue、Activity，明确 Knowledge Ceiling。

<a id="lesson-re-activity-011"></a>
### Lesson RE-ACTIVITY-011：综合项目——实现可响应搜索与延迟结果

验证输入优先级和 stale result UX。

<a id="lesson-re-activity-012"></a>
### Lesson RE-ACTIVITY-012：综合项目——实现 Optimistic Mutation 与错误恢复

加入并发修改、rollback 和 server reconciliation。

<a id="lesson-re-activity-013"></a>
### Lesson RE-ACTIVITY-013：综合项目——实现 Activity Tab 预渲染

比较 unmount / CSS / Activity 的用户体验和资源开销。

<a id="lesson-re-activity-014"></a>
### Lesson RE-ACTIVITY-014：综合项目——制造 Suspense Waterfall 与长 Render

记录问题，为下一性能段建立 baseline。

<a id="lesson-re-activity-015"></a>
### Lesson RE-ACTIVITY-015：综合项目——完整验收 High-interaction Workbench

输出异步边界图、State/Cache Map、用户交互 timing/log baseline 和已知性能问题；下一 Module 11.18 再把同一 Workbench 升级为 Profiler/Trace 证据。

---

---

> [← Module 11.16：Actions 与 Optimistic Mutations](../module11-16-actions-optimistic/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.18：Profiling、Render Performance、Memoization 与 React Compiler →](../module11-18-performance-compiler/README.md)
