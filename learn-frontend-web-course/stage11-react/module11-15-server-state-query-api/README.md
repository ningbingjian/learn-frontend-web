# Module 11.15：Server State、TanStack Query 与 API Boundary

> [← Module 11.14：Router 与 Route Data Architecture](../module11-14-router-route-data/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.16：Actions 与 Optimistic Mutations →](../module11-16-actions-optimistic/README.md)

本 Module 不从某个库 API 开始，而是先完整建立 Server State 的所有权、缓存、Stale、去重、重试、失效、分页、乐观更新和离线模型。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（54 课）</strong></summary>

- [RE-SERVERSTATE-001：Server State 为什么不属于浏览器](#lesson-re-serverstate-001)
- [RE-SERVERSTATE-002：Cache Entry 需要哪些最小信息](#lesson-re-serverstate-002)
- [RE-SERVERSTATE-003：Fresh、Stale、Expired 分别意味着什么](#lesson-re-serverstate-003)
- [RE-SERVERSTATE-004：Query Key 为什么决定缓存正确性](#lesson-re-serverstate-004)
- [RE-SERVERSTATE-005：Request Deduplication 解决什么问题](#lesson-re-serverstate-005)
- [RE-SERVERSTATE-006：Retry 为什么不能无脑重试](#lesson-re-serverstate-006)
- [RE-SERVERSTATE-007：Refetch Trigger 如何选择](#lesson-re-serverstate-007)
- [RE-SERVERSTATE-008：Invalidation 与直接改 Cache 有什么区别](#lesson-re-serverstate-008)
- [RE-SERVERSTATE-009：Mutation 为什么需要独立生命周期](#lesson-re-serverstate-009)
- [RE-SERVERSTATE-010：Optimistic Update 需要哪些前提](#lesson-re-serverstate-010)
- [RE-SERVERSTATE-011：Pagination 与 Infinite Query 的 Cache Shape 有什么不同](#lesson-re-serverstate-011)
- [RE-SERVERSTATE-012：Prefetch 为什么是性能与数据策略问题](#lesson-re-serverstate-012)
- [RE-SERVERSTATE-013：Offline Server State 应该怎么理解](#lesson-re-serverstate-013)
- [RE-SERVERSTATE-014：Server State Architecture Review——哪些 API Response 不应该塞进 Redux/Context](#lesson-re-serverstate-014)
- [RE-QUERY-001：从零接入 QueryClient / Provider](#lesson-re-query-001)
- [RE-QUERY-002：第一个 useQuery](#lesson-re-query-002)
- [RE-QUERY-003：如何设计可演进的 Query Key Factory](#lesson-re-query-003)
- [RE-QUERY-004：staleTime 到底控制什么](#lesson-re-query-004)
- [RE-QUERY-005：GC Time 与 Stale Time 为什么不是同一个值](#lesson-re-query-005)
- [RE-QUERY-006：Query Function 如何接收 AbortSignal](#lesson-re-query-006)
- [RE-QUERY-007：enabled / dependent query 应该如何使用](#lesson-re-query-007)
- [RE-QUERY-008：Retry / Retry Delay 如何按错误类型配置](#lesson-re-query-008)
- [RE-QUERY-009：select 如何派生 Cache 数据](#lesson-re-query-009)
- [RE-QUERY-010：placeholderData / initialData 应该怎么选](#lesson-re-query-010)
- [RE-QUERY-011：Prefetch Query 如何配合 Router](#lesson-re-query-011)
- [RE-QUERY-012：第一个 Mutation](#lesson-re-query-012)
- [RE-QUERY-013：Mutation 成功后为什么要 Invalidate](#lesson-re-query-013)
- [RE-QUERY-014：直接 setQueryData 什么时候更好](#lesson-re-query-014)
- [RE-QUERY-015：Optimistic Mutation 完整闭环](#lesson-re-query-015)
- [RE-QUERY-016：Concurrent Optimistic Mutation 为什么难](#lesson-re-query-016)
- [RE-QUERY-017：Pagination / Infinite Query 如何设计](#lesson-re-query-017)
- [RE-QUERY-018：Query Cache Persistence 有哪些风险](#lesson-re-query-018)
- [RE-QUERY-019：SSR Dehydrate / Hydrate 的高层模型](#lesson-re-query-019)
- [RE-QUERY-020：TanStack Query DevTools 如何用于真实诊断](#lesson-re-query-020)
- [RE-QUERY-021：Query Anti-pattern——把 Query data 再复制进 Local State](#lesson-re-query-021)
- [RE-QUERY-022：生产级 Query Policy 怎么制定](#lesson-re-query-022)
- [RE-API-001：为什么 Component 不应该到处直接拼 fetch](#lesson-re-api-001)
- [RE-API-002：设计最小 Fetch Wrapper](#lesson-re-api-002)
- [RE-API-003：HTTP Error、Network Error、Abort Error、Business Error 如何统一建模](#lesson-re-api-003)
- [RE-API-004：Runtime Validation 为什么 TypeScript 替代不了](#lesson-re-api-004)
- [RE-API-005：DTO、Domain Model、ViewModel 应该怎么分](#lesson-re-api-005)
- [RE-API-006：Auth Token 应该在哪里注入](#lesson-re-api-006)
- [RE-API-007：Request Cancellation 如何贯穿 Router / Query / Client](#lesson-re-api-007)
- [RE-API-008：Retry 应该在 API Client 还是 Query Layer](#lesson-re-api-008)
- [RE-API-009：Pagination / Cursor 类型如何设计](#lesson-re-api-009)
- [RE-API-010：Trace ID / Correlation ID 如何进入前端诊断](#lesson-re-api-010)
- [RE-API-011：OpenAPI Codegen 应该生成到什么边界](#lesson-re-api-011)
- [RE-API-012：Multi-tenant API Client 如何防止上下文串用](#lesson-re-api-012)
- [RE-API-013：Mock API / Contract Verification 如何服务 React 开发](#lesson-re-api-013)
- [RE-API-014：综合项目——React Enterprise SPA 需求与边界设计](#lesson-re-api-014)
- [RE-API-015：综合项目——实现 Route + Query + Form 的读写闭环](#lesson-re-api-015)
- [RE-API-016：综合项目——加入 Auth、Tenant、Runtime Validation 与 Trace ID](#lesson-re-api-016)
- [RE-API-017：综合项目——制造 401、Schema Drift、Timeout、Abort、409 冲突](#lesson-re-api-017)
- [RE-API-018：综合项目——Enterprise SPA 完整验收](#lesson-re-api-018)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-serverstate-001"></a>
### Lesson RE-SERVERSTATE-001：Server State 为什么不属于浏览器

建立 Remote Ownership 与 Client Cache 的根本区别。

<a id="lesson-re-serverstate-002"></a>
### Lesson RE-SERVERSTATE-002：Cache Entry 需要哪些最小信息

理解 key、data、status、updatedAt、observers、stale/expiry 等概念。

<a id="lesson-re-serverstate-003"></a>
### Lesson RE-SERVERSTATE-003：Fresh、Stale、Expired 分别意味着什么

区分“还能展示”和“是否应该后台刷新”。

<a id="lesson-re-serverstate-004"></a>
### Lesson RE-SERVERSTATE-004：Query Key 为什么决定缓存正确性

制造 key 缺参数导致跨筛选/租户数据串用的 Bug。

<a id="lesson-re-serverstate-005"></a>
### Lesson RE-SERVERSTATE-005：Request Deduplication 解决什么问题

多个组件同时需要同一数据时复用 in-flight 请求。

<a id="lesson-re-serverstate-006"></a>
### Lesson RE-SERVERSTATE-006：Retry 为什么不能无脑重试

区分网络错误、429、5xx、4xx、幂等性和 Backoff。

<a id="lesson-re-serverstate-007"></a>
### Lesson RE-SERVERSTATE-007：Refetch Trigger 如何选择

讨论 mount、focus、reconnect、interval、manual invalidation。

<a id="lesson-re-serverstate-008"></a>
### Lesson RE-SERVERSTATE-008：Invalidation 与直接改 Cache 有什么区别

区分“标记过期”“重新取数”“本地补丁”。

<a id="lesson-re-serverstate-009"></a>
### Lesson RE-SERVERSTATE-009：Mutation 为什么需要独立生命周期

建立 pending/success/error、variables、retry 和 side effect model。

<a id="lesson-re-serverstate-010"></a>
### Lesson RE-SERVERSTATE-010：Optimistic Update 需要哪些前提

理解 snapshot、temporary state、rollback、server reconciliation。

<a id="lesson-re-serverstate-011"></a>
### Lesson RE-SERVERSTATE-011：Pagination 与 Infinite Query 的 Cache Shape 有什么不同

比较 page keyed cache、cursor pages、append/prepend 和去重。

<a id="lesson-re-serverstate-012"></a>
### Lesson RE-SERVERSTATE-012：Prefetch 为什么是性能与数据策略问题

分析 hover/navigation prefetch、浪费请求和 stale 策略。

<a id="lesson-re-serverstate-013"></a>
### Lesson RE-SERVERSTATE-013：Offline Server State 应该怎么理解

区分“读缓存”与“离线写队列”，后者完整能力留给更后面的 Local-first Stage。

<a id="lesson-re-serverstate-014"></a>
### Lesson RE-SERVERSTATE-014：Server State Architecture Review——哪些 API Response 不应该塞进 Redux/Context

对真实应用做一次缓存所有权重构。

---

本 Module 用 TanStack Query 验证上一 Module 的 Server State 模型，并覆盖 Query Key、staleTime、GC、取消、Mutation、Optimistic、Prefetch、Persistence、SSR/Hydration、DevTools 和生产边界。

<a id="lesson-re-query-001"></a>
### Lesson RE-QUERY-001：从零接入 QueryClient / Provider

理解 QueryClient 是缓存与协调器，不是“请求函数替代品”。

<a id="lesson-re-query-002"></a>
### Lesson RE-QUERY-002：第一个 useQuery

拆解 queryKey、queryFn、status、fetchStatus 和 data 生命周期。

<a id="lesson-re-query-003"></a>
### Lesson RE-QUERY-003：如何设计可演进的 Query Key Factory

把 entity、params、tenant、scope 编码进稳定 key。

<a id="lesson-re-query-004"></a>
### Lesson RE-QUERY-004：staleTime 到底控制什么

通过 focus/remount 实验观察 freshness 与 refetch。

<a id="lesson-re-query-005"></a>
### Lesson RE-QUERY-005：GC Time 与 Stale Time 为什么不是同一个值

观察无 observer cache entry 的保留与删除。

<a id="lesson-re-query-006"></a>
### Lesson RE-QUERY-006：Query Function 如何接收 AbortSignal

快速切换参数验证请求取消。

<a id="lesson-re-query-007"></a>
### Lesson RE-QUERY-007：enabled / dependent query 应该如何使用

处理依赖参数和串行数据，不用 Effect 手工触发。

<a id="lesson-re-query-008"></a>
### Lesson RE-QUERY-008：Retry / Retry Delay 如何按错误类型配置

把 HTTP/业务错误模型接入 retry policy。

<a id="lesson-re-query-009"></a>
### Lesson RE-QUERY-009：select 如何派生 Cache 数据

区分缓存原始数据、消费视图和 expensive select。

<a id="lesson-re-query-010"></a>
### Lesson RE-QUERY-010：placeholderData / initialData 应该怎么选

理解来源、freshness 和 UX 语义差异。

<a id="lesson-re-query-011"></a>
### Lesson RE-QUERY-011：Prefetch Query 如何配合 Router

在导航前预热缓存并验证实际 Network 行为。

<a id="lesson-re-query-012"></a>
### Lesson RE-QUERY-012：第一个 Mutation

理解 mutationFn、variables、pending、error、success 生命周期。

<a id="lesson-re-query-013"></a>
### Lesson RE-QUERY-013：Mutation 成功后为什么要 Invalidate

根据资源关系选择精确失效，不做“全部 invalidate”。

<a id="lesson-re-query-014"></a>
### Lesson RE-QUERY-014：直接 setQueryData 什么时候更好

服务器已返回完整新实体时避免无意义 refetch。

<a id="lesson-re-query-015"></a>
### Lesson RE-QUERY-015：Optimistic Mutation 完整闭环

实现 onMutate snapshot、cancel queries、optimistic write、rollback 和 settle。

<a id="lesson-re-query-016"></a>
### Lesson RE-QUERY-016：Concurrent Optimistic Mutation 为什么难

制造多次并发修改和乱序响应，设计 reconciliation。

<a id="lesson-re-query-017"></a>
### Lesson RE-QUERY-017：Pagination / Infinite Query 如何设计

处理 cursor、next page、去重、刷新和页面级错误。

<a id="lesson-re-query-018"></a>
### Lesson RE-QUERY-018：Query Cache Persistence 有哪些风险

讨论版本、过期、敏感数据、容量和恢复策略。

<a id="lesson-re-query-019"></a>
### Lesson RE-QUERY-019：SSR Dehydrate / Hydrate 的高层模型

建立服务器预取、序列化、客户端重建 Cache 的边界，为 SSR Module 前置。

<a id="lesson-re-query-020"></a>
### Lesson RE-QUERY-020：TanStack Query DevTools 如何用于真实诊断

观察 observers、stale、fetch、cache entry 和 invalidation。

<a id="lesson-re-query-021"></a>
### Lesson RE-QUERY-021：Query Anti-pattern——把 Query data 再复制进 Local State

制造双份数据不同步并重构。

<a id="lesson-re-query-022"></a>
### Lesson RE-QUERY-022：生产级 Query Policy 怎么制定

为 retry、staleTime、error、logging、auth、tenant、prefetch 建立统一团队策略。

---

本 Module 把 React UI 与 HTTP/Schema/DTO/Auth/Error/Trace 隔离开，形成稳定的数据访问边界，并在末尾把 Router、Form、Query、API Client 组合成 React Enterprise SPA。

<a id="lesson-re-api-001"></a>
### Lesson RE-API-001：为什么 Component 不应该到处直接拼 fetch

识别 base URL、auth、error、schema、trace、cancel 重复逻辑。

<a id="lesson-re-api-002"></a>
### Lesson RE-API-002：设计最小 Fetch Wrapper

明确 Request/Response、signal、headers、method、body 和返回值合同。

<a id="lesson-re-api-003"></a>
### Lesson RE-API-003：HTTP Error、Network Error、Abort Error、Business Error 如何统一建模

让 UI 能做准确错误决策，而不是只 catch Error message。

<a id="lesson-re-api-004"></a>
### Lesson RE-API-004：Runtime Validation 为什么 TypeScript 替代不了

对外部 JSON 做 schema parse，拒绝“类型声明即数据可信”。

<a id="lesson-re-api-005"></a>
### Lesson RE-API-005：DTO、Domain Model、ViewModel 应该怎么分

把服务器字段和 UI/业务模型解耦，并明确转换位置。

<a id="lesson-re-api-006"></a>
### Lesson RE-API-006：Auth Token 应该在哪里注入

讨论 Cookie、Header、refresh、401 和重放边界，不把安全责任塞进每个组件。

<a id="lesson-re-api-007"></a>
### Lesson RE-API-007：Request Cancellation 如何贯穿 Router / Query / Client

让 AbortSignal 从调用方传到底层，而不是 Client 私自创建不可控请求。

<a id="lesson-re-api-008"></a>
### Lesson RE-API-008：Retry 应该在 API Client 还是 Query Layer

根据 transport、idempotency、cache lifecycle 决定责任边界。

<a id="lesson-re-api-009"></a>
### Lesson RE-API-009：Pagination / Cursor 类型如何设计

建立请求参数、page info、next cursor 和 generic page result。

<a id="lesson-re-api-010"></a>
### Lesson RE-API-010：Trace ID / Correlation ID 如何进入前端诊断

从 Response Header / Error Model 连接到日志和用户报错。

<a id="lesson-re-api-011"></a>
### Lesson RE-API-011：OpenAPI Codegen 应该生成到什么边界

比较 generated DTO/client 与手写 domain adapter，避免 generated code 扩散整个 UI。

<a id="lesson-re-api-012"></a>
### Lesson RE-API-012：Multi-tenant API Client 如何防止上下文串用

明确 tenant scope、cache key、header 和 client instance 生命周期。

<a id="lesson-re-api-013"></a>
### Lesson RE-API-013：Mock API / Contract Verification 如何服务 React 开发

使用课程提供的 Mock Server 与 schema 样例验证正常/错误响应合同，让前端在后端不稳定时仍能工作；Mock/Test 工具工程化统一留到 Module 11.23 与后续质量 Stage。

<a id="lesson-re-api-014"></a>
### Lesson RE-API-014：综合项目——React Enterprise SPA 需求与边界设计

确定 Router、Form、Query、API、Permission UI、URL State 和错误模型，禁止偷用未来 Suspense/RSC。

<a id="lesson-re-api-015"></a>
### Lesson RE-API-015：综合项目——实现 Route + Query + Form 的读写闭环

完成列表、详情、编辑、提交、缓存更新和路由跳转。

<a id="lesson-re-api-016"></a>
### Lesson RE-API-016：综合项目——加入 Auth、Tenant、Runtime Validation 与 Trace ID

把非 UI 责任收敛到数据边界。

<a id="lesson-re-api-017"></a>
### Lesson RE-API-017：综合项目——制造 401、Schema Drift、Timeout、Abort、409 冲突

验证错误模型和恢复 UX。

<a id="lesson-re-api-018"></a>
### Lesson RE-API-018：综合项目——Enterprise SPA 完整验收

输出 Route Tree、State Map、Query Key Map、API Boundary 和 Failure Matrix，并执行 production build。

---

> [← Module 11.14：Router 与 Route Data Architecture](../module11-14-router-route-data/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.16：Actions 与 Optimistic Mutations →](../module11-16-actions-optimistic/README.md)
