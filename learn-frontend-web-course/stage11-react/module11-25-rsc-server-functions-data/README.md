# Module 11.25：RSC、Server/Client Boundary、Server Functions 与 Data/Cache Architecture

> [← Module 11.24：SSR、Hydration、Streaming 与 Prerender](../module11-24-ssr-hydration-streaming/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.26：React Source Research 与 Fiber Model →](../module11-26-source-fiber/README.md)

本 Module 一次建立 Server Component、Client Component、SSR、RSC Payload、Build/Request-time、Bundle/Data Boundary，并坚决避免把 RSC 等同于 SSR。Node Server、Bundler RSC Plugin、数据库/Auth/Cache 实现均属于后续 Stage 15/16/18/19/25 的 Owner 能力；本 Module 使用固定教学 Harness / Data Service，只把 React-specific RSC Boundary、Serialization、Mutation 与 Cache Contract 作为核心知识。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（69 课）</strong></summary>

- [RE-RSC-001：RSC 为什么出现](#lesson-re-rsc-001)
- [RE-RSC-002：Server Component 与 SSR Component 是同一个概念吗](#lesson-re-rsc-002)
- [RE-RSC-003：Client Component 真正意味着什么](#lesson-re-rsc-003)
- [RE-RSC-004：Server Component 可以直接访问什么](#lesson-re-rsc-004)
- [RE-RSC-005：Server Component 为什么不能使用 useState / Event Handler](#lesson-re-rsc-005)
- [RE-RSC-006：RSC Payload 是什么高层结构](#lesson-re-rsc-006)
- [RE-RSC-007：RSC 与 HTML SSR 如何串起来](#lesson-re-rsc-007)
- [RE-RSC-008：Async Server Component 为什么自然](#lesson-re-rsc-008)
- [RE-RSC-009：Build-time 与 Request-time Server Component 有什么区别](#lesson-re-rsc-009)
- [RE-RSC-010：Server Component 如何减少 Client Bundle](#lesson-re-rsc-010)
- [RE-RSC-011：Server Component 不是“自动更快”](#lesson-re-rsc-011)
- [RE-RSC-012：RSC 与 SEO 没有直接一一对应关系](#lesson-re-rsc-012)
- [RE-RSC-013：RSC Error / Suspense Boundary 如何理解](#lesson-re-rsc-013)
- [RE-RSC-014：RSC Debugging 首先要知道代码到底在哪运行](#lesson-re-rsc-014)
- [RE-RSC-015：RSC 底层 Bundler API 为什么是框架作者边界](#lesson-re-rsc-015)
- [RE-RSC-016：画出一棵混合 Server/Client Component Tree](#lesson-re-rsc-016)
- [RE-BOUNDARY-001：`"use client"` 标记的是 Component 还是 Module Boundary](#lesson-re-boundary-001)
- [RE-BOUNDARY-002：为什么 Boundary 位置会影响 Client Bundle](#lesson-re-boundary-002)
- [RE-BOUNDARY-003：Server → Client Props 为什么必须可序列化](#lesson-re-boundary-003)
- [RE-BOUNDARY-004：Event Handler 为什么只能存在 Client side 交互子树](#lesson-re-boundary-004)
- [RE-BOUNDARY-005：Context Provider 应该放在哪一侧](#lesson-re-boundary-005)
- [RE-BOUNDARY-006：Browser-only Library 如何隔离](#lesson-re-boundary-006)
- [RE-BOUNDARY-007：Server-only Library 如何防止被 Client import](#lesson-re-boundary-007)
- [RE-BOUNDARY-008：Client Component 能不能包含 Server Component](#lesson-re-boundary-008)
- [RE-BOUNDARY-009：Boundary Placement 如何平衡交互与 Bundle](#lesson-re-boundary-009)
- [RE-BOUNDARY-010：Boundary 过多有什么代价](#lesson-re-boundary-010)
- [RE-BOUNDARY-011：Boundary Security Review 应检查什么](#lesson-re-boundary-011)
- [RE-BOUNDARY-012：综合重构——把一个全 Client Page 拆成 Server-first + Client Islands](#lesson-re-boundary-012)
- [RE-SERVERFN-001：Server Function 解决什么问题](#lesson-re-serverfn-001)
- [RE-SERVERFN-002：`"use server"` 到底声明什么](#lesson-re-serverfn-002)
- [RE-SERVERFN-003：Client 拿到的不是普通跨网络 Function Object](#lesson-re-serverfn-003)
- [RE-SERVERFN-004：参数和返回值为什么必须可序列化](#lesson-re-serverfn-004)
- [RE-SERVERFN-005：Server Function 必须重新做 Validation](#lesson-re-serverfn-005)
- [RE-SERVERFN-006：Server Function 必须重新做 Authorization](#lesson-re-serverfn-006)
- [RE-SERVERFN-007：Tenant Context 如何安全解析](#lesson-re-serverfn-007)
- [RE-SERVERFN-008：Mutation 事务边界怎么设计](#lesson-re-serverfn-008)
- [RE-SERVERFN-009：Idempotency 如何处理重复提交](#lesson-re-serverfn-009)
- [RE-SERVERFN-010：Server Function Error 如何返回 Client UX](#lesson-re-serverfn-010)
- [RE-SERVERFN-011：Server Function 与 useActionState / Form Action 如何组合](#lesson-re-serverfn-011)
- [RE-SERVERFN-012：Server Function 与 Cache Invalidation 如何连接](#lesson-re-serverfn-012)
- [RE-SERVERFN-013：Server Function Observability 应记录什么](#lesson-re-serverfn-013)
- [RE-SERVERFN-014：综合攻击实验——Unauthorized / Duplicate / Invalid Mutation](#lesson-re-serverfn-014)
- [RE-RSCUSE-001：Server 直接 await 与把 Promise 传给 Client 有何区别](#lesson-re-rscuse-001)
- [RE-RSCUSE-002：稳定 Promise 如何跨 Boundary 传递](#lesson-re-rscuse-002)
- [RE-RSCUSE-003：Server-created Promise 到 Client use() 后哪些 Suspense 语义保持不变](#lesson-re-rscuse-003)
- [RE-RSCUSE-004：多个 Promise 如何并行启动避免 Waterfall](#lesson-re-rscuse-004)
- [RE-RSCUSE-005：Nested Boundary 如何设计 reveal](#lesson-re-rscuse-005)
- [RE-RSCUSE-006：Server Error 与 Client Error Boundary 如何连接](#lesson-re-rscuse-006)
- [RE-RSCUSE-007：Transition 导航到新 RSC Tree 时用户看到什么](#lesson-re-rscuse-007)
- [RE-RSCUSE-008：RSC Streaming 如何与 HTML Streaming 区分](#lesson-re-rscuse-008)
- [RE-RSCUSE-009：综合实现——Server Promise → Client use() → Suspense Dashboard](#lesson-re-rscuse-009)
- [RE-RSCUSE-010：异步边界图验收](#lesson-re-rscuse-010)
- [RE-RSCDATA-001：Server Component 应该直接依赖数据源还是走 Service Boundary](#lesson-re-rscdata-001)
- [RE-RSCDATA-002：Request Memoization 与跨请求 Cache 是同一个东西吗](#lesson-re-rscdata-002)
- [RE-RSCDATA-003：Cache Key 必须包含哪些 Security Context](#lesson-re-rscdata-003)
- [RE-RSCDATA-004：RSC N+1 是怎么产生的](#lesson-re-rscdata-004)
- [RE-RSCDATA-005：DataLoader / Batch / Join / Prefetch 如何解决 N+1](#lesson-re-rscdata-005)
- [RE-RSCDATA-006：RSC Waterfall 与 Component Composition 的关系](#lesson-re-rscdata-006)
- [RE-RSCDATA-007：Cache Invalidation 为什么比 Cache Read 更难](#lesson-re-rscdata-007)
- [RE-RSCDATA-008：Authorization 应该在 Component 还是 Service](#lesson-re-rscdata-008)
- [RE-RSCDATA-009：Serialization Cost 如何影响 RSC Payload](#lesson-re-rscdata-009)
- [RE-RSCDATA-010：Secret / Internal Object 如何保证不跨 Client Boundary](#lesson-re-rscdata-010)
- [RE-RSCDATA-011：RSC Observability 如何串联 DB / Cache / Render / Stream](#lesson-re-rscdata-011)
- [RE-STATIC-008：Static / SSR / CSR / RSC 应该怎么选](#lesson-re-static-008)
- [RE-RSCDATA-012：综合项目——Full-stack React Runtime 运行时骨架](#lesson-re-rscdata-012)
- [RE-RSCDATA-013：综合项目——加入 Auth/Tenant/Cache/Data Boundary](#lesson-re-rscdata-013)
- [RE-RSCDATA-014：综合项目——加入 Suspense/Streaming/use()](#lesson-re-rscdata-014)
- [RE-RSCDATA-015：综合项目——制造 N+1、Waterfall、Unauthorized Mutation、Data Leak Risk](#lesson-re-rscdata-015)
- [RE-RSCDATA-016：综合项目——Full-stack React Runtime 完整验收](#lesson-re-rscdata-016)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-rsc-001"></a>
### Lesson RE-RSC-001：RSC 为什么出现

从 server-only data/code、client bundle、component composition 的问题域理解设计目标。

<a id="lesson-re-rsc-002"></a>
### Lesson RE-RSC-002：Server Component 与 SSR Component 是同一个概念吗

用运行阶段和输出物区分 RSC 与 HTML Rendering。

<a id="lesson-re-rsc-003"></a>
### Lesson RE-RSC-003：Client Component 真正意味着什么

理解它进入 Client Module Graph、可用 State/Event/Browser API，不意味着只在浏览器第一次执行。

<a id="lesson-re-rsc-004"></a>
### Lesson RE-RSC-004：Server Component 可以直接访问什么

通过课程提供的 server-only data service / file adapter 演示服务器可访问能力，并建立 secret-bearing service 的安全边界；真实数据库/对象存储接入留到后续 Data Platform Stage。

<a id="lesson-re-rsc-005"></a>
### Lesson RE-RSC-005：Server Component 为什么不能使用 useState / Event Handler

从运行环境和序列化/交互需求解释，而不是背禁用列表。

<a id="lesson-re-rsc-006"></a>
### Lesson RE-RSC-006：RSC Payload 是什么高层结构

认识它描述 Server Tree、Client Reference 和数据，而不是 HTML。

<a id="lesson-re-rsc-007"></a>
### Lesson RE-RSC-007：RSC 与 HTML SSR 如何串起来

建立 Server Component Tree → RSC Result → Server Renderer → HTML 的可能框架流程。

<a id="lesson-re-rsc-008"></a>
### Lesson RE-RSC-008：Async Server Component 为什么自然

直接 await data 并把异步边界交给 server rendering / Suspense。

<a id="lesson-re-rsc-009"></a>
### Lesson RE-RSC-009：Build-time 与 Request-time Server Component 有什么区别

比较静态数据和请求上下文。

<a id="lesson-re-rsc-010"></a>
### Lesson RE-RSC-010：Server Component 如何减少 Client Bundle

把 server-only dependency 留在服务器，并使用课程 Harness 已生成的 bundle report 验证 Client Bundle 是否减少；Bundler 分析机制本身留到 Stage 16。

<a id="lesson-re-rsc-011"></a>
### Lesson RE-RSC-011：Server Component 不是“自动更快”

讨论 server latency、serialization、waterfall、cache 和 deployment。

<a id="lesson-re-rsc-012"></a>
### Lesson RE-RSC-012：RSC 与 SEO 没有直接一一对应关系

区分最终 HTML 是否由 SSR 输出。

<a id="lesson-re-rsc-013"></a>
### Lesson RE-RSC-013：RSC Error / Suspense Boundary 如何理解

建立 server execution failure 与 client-visible boundary 的关系。

<a id="lesson-re-rsc-014"></a>
### Lesson RE-RSC-014：RSC Debugging 首先要知道代码到底在哪运行

设计 server/client log 标识和运行位置图。

<a id="lesson-re-rsc-015"></a>
### Lesson RE-RSC-015：RSC 底层 Bundler API 为什么是框架作者边界

正式课程固定具体 React 版本研究，不把内部协议当业务稳定 API。

<a id="lesson-re-rsc-016"></a>
### Lesson RE-RSC-016：画出一棵混合 Server/Client Component Tree

标注 module graph、data flow、bundle inclusion 和 HTML/RSC 输出。

---

本 Module 深入 `"use client"`、Module Graph、Serialization、Props、Browser API、Context、Bundle 与 Boundary Placement。

<a id="lesson-re-boundary-001"></a>
### Lesson RE-BOUNDARY-001：`"use client"` 标记的是 Component 还是 Module Boundary

理解入口模块及其依赖进入 Client Graph。

<a id="lesson-re-boundary-002"></a>
### Lesson RE-BOUNDARY-002：为什么 Boundary 位置会影响 Client Bundle

移动 directive，并使用课程 Harness 提供的 module graph / bundle diff 比较边界变化；当前只解释 React Boundary 结果，不教授 Bundler 图生成机制。

<a id="lesson-re-boundary-003"></a>
### Lesson RE-BOUNDARY-003：Server → Client Props 为什么必须可序列化

制造 Function/Class/复杂对象传递错误并解释边界。

<a id="lesson-re-boundary-004"></a>
### Lesson RE-BOUNDARY-004：Event Handler 为什么只能存在 Client side 交互子树

从 function 不能跨序列化边界理解。

<a id="lesson-re-boundary-005"></a>
### Lesson RE-BOUNDARY-005：Context Provider 应该放在哪一侧

处理 theme/session-like client context 与 server data。

<a id="lesson-re-boundary-006"></a>
### Lesson RE-BOUNDARY-006：Browser-only Library 如何隔离

把 editor/chart/map 放进小 Client island，而不是整页 client 化。

<a id="lesson-re-boundary-007"></a>
### Lesson RE-BOUNDARY-007：Server-only Library 如何防止被 Client import

建立 module boundary / build guard / secret safety。

<a id="lesson-re-boundary-008"></a>
### Lesson RE-BOUNDARY-008：Client Component 能不能包含 Server Component

通过 children/composition 理解“import”与“由 server 传入 element”的区别。

<a id="lesson-re-boundary-009"></a>
### Lesson RE-BOUNDARY-009：Boundary Placement 如何平衡交互与 Bundle

用 Dashboard 逐步下沉 client boundary。

<a id="lesson-re-boundary-010"></a>
### Lesson RE-BOUNDARY-010：Boundary 过多有什么代价

讨论 serialization、mental model、loading、module graph complexity。

<a id="lesson-re-boundary-011"></a>
### Lesson RE-BOUNDARY-011：Boundary Security Review 应检查什么

Server secret、serialized props、auth context、tenant data。

<a id="lesson-re-boundary-012"></a>
### Lesson RE-BOUNDARY-012：综合重构——把一个全 Client Page 拆成 Server-first + Client Islands

用 bundle/data flow 证据证明边界变化。

---

本 Module 完整学习 `"use server"`、Server Reference、调用/序列化、Validation、Authorization、Mutation、错误、幂等、审计和安全边界。

<a id="lesson-re-serverfn-001"></a>
### Lesson RE-SERVERFN-001：Server Function 解决什么问题

让 Client 通过框架协议触发 Server-side async function，同时保留安全网络边界意识。

<a id="lesson-re-serverfn-002"></a>
### Lesson RE-SERVERFN-002：`"use server"` 到底声明什么

区分 module/function directive 与普通 server-only helper。

<a id="lesson-re-serverfn-003"></a>
### Lesson RE-SERVERFN-003：Client 拿到的不是普通跨网络 Function Object

建立 Server Reference / framework transport 高层模型。

<a id="lesson-re-serverfn-004"></a>
### Lesson RE-SERVERFN-004：参数和返回值为什么必须可序列化

验证复杂参数边界并设计 DTO。

<a id="lesson-re-serverfn-005"></a>
### Lesson RE-SERVERFN-005：Server Function 必须重新做 Validation

客户端 TypeScript / Form 校验不能替代服务器校验。

<a id="lesson-re-serverfn-006"></a>
### Lesson RE-SERVERFN-006：Server Function 必须重新做 Authorization

直接构造调用验证隐藏按钮完全不构成权限保护。

<a id="lesson-re-serverfn-007"></a>
### Lesson RE-SERVERFN-007：Tenant Context 如何安全解析

禁止信任客户端随意传 tenantId 而跳过 membership 校验。

<a id="lesson-re-serverfn-008"></a>
### Lesson RE-SERVERFN-008：Mutation 事务边界怎么设计

使用课程提供的 in-memory repository / transaction helper 模拟多步写入、失败和部分成功，当前学习 mutation 原子边界；真实数据库事务留到后续 Data Stage。

<a id="lesson-re-serverfn-009"></a>
### Lesson RE-SERVERFN-009：Idempotency 如何处理重复提交

用教学 idempotency store 演示重复提交保护，并认识 unique constraint 等生产实现选项；数据库实现细节留到后续 Data Stage。

<a id="lesson-re-serverfn-010"></a>
### Lesson RE-SERVERFN-010：Server Function Error 如何返回 Client UX

区分 validation result、expected business error、unexpected exception。

<a id="lesson-re-serverfn-011"></a>
### Lesson RE-SERVERFN-011：Server Function 与 useActionState / Form Action 如何组合

完成完整提交状态链。

<a id="lesson-re-serverfn-012"></a>
### Lesson RE-SERVERFN-012：Server Function 与 Cache Invalidation 如何连接

写后刷新/失效对应资源。

<a id="lesson-re-serverfn-013"></a>
### Lesson RE-SERVERFN-013：Server Function Observability 应记录什么

trace、actor、tenant、operation、result、latency，不记录 secret payload。

<a id="lesson-re-serverfn-014"></a>
### Lesson RE-SERVERFN-014：综合攻击实验——Unauthorized / Duplicate / Invalid Mutation

主动绕过 UI、重复请求、伪造参数，验证服务器防线。

---

本 Module 把 Server Async、Promise 传递、RSC Stream、Client use()、Suspense/Error Boundary 串成完整异步数据路径。

<a id="lesson-re-rscuse-001"></a>
### Lesson RE-RSCUSE-001：Server 直接 await 与把 Promise 传给 Client 有何区别

比较阻塞 server subtree 与让 client boundary 使用 use() suspend。

<a id="lesson-re-rscuse-002"></a>
### Lesson RE-RSCUSE-002：稳定 Promise 如何跨 Boundary 传递

建立 Promise ownership 和 serialization/framework transport 模型。

<a id="lesson-re-rscuse-003"></a>
### Lesson RE-RSCUSE-003：Server-created Promise 到 Client use() 后哪些 Suspense 语义保持不变

不重复 Module 11.17 的 use(Promise) 基础，而是验证 Promise 跨 Server/Client Boundary 后，pending/fulfilled/rejected 仍如何进入既有 Suspense/Error 契约。

<a id="lesson-re-rscuse-004"></a>
### Lesson RE-RSCUSE-004：多个 Promise 如何并行启动避免 Waterfall

先创建资源再组合 tree。

<a id="lesson-re-rscuse-005"></a>
### Lesson RE-RSCUSE-005：Nested Boundary 如何设计 reveal

按用户感知依赖划分，而不是按 API 个数划分。

<a id="lesson-re-rscuse-006"></a>
### Lesson RE-RSCUSE-006：Server Error 与 Client Error Boundary 如何连接

验证 rejected resource 的呈现和恢复。

<a id="lesson-re-rscuse-007"></a>
### Lesson RE-RSCUSE-007：Transition 导航到新 RSC Tree 时用户看到什么

建立旧 UI、pending tree、新 payload 的高层模型。

<a id="lesson-re-rscuse-008"></a>
### Lesson RE-RSCUSE-008：RSC Streaming 如何与 HTML Streaming 区分

明确两种不同流内容和消费者。

<a id="lesson-re-rscuse-009"></a>
### Lesson RE-RSCUSE-009：综合实现——Server Promise → Client use() → Suspense Dashboard

验证并行、错误、nested reveal 和 boundary placement。

<a id="lesson-re-rscuse-010"></a>
### Lesson RE-RSCUSE-010：异步边界图验收

为一次请求标出 Promise 创建、RSC、HTML、Client Hydration 和 use() 的位置。

---

本 Module 负责 Server Component 数据访问、Service Layer、Cache、Invalidation、Auth/Tenant、N+1、Waterfall、Serialization、Observability，并完成 Full-stack React Runtime 综合项目。

<a id="lesson-re-rscdata-001"></a>
### Lesson RE-RSCDATA-001：Server Component 应该直接依赖数据源还是走 Service Boundary

从复用、授权、事务、测试替身和架构边界比较直接数据源访问与 Service Layer；本课使用教学 Data Service，不教授数据库 API。

<a id="lesson-re-rscdata-002"></a>
### Lesson RE-RSCDATA-002：Request Memoization 与跨请求 Cache 是同一个东西吗

区分单请求去重和共享缓存生命周期。

<a id="lesson-re-rscdata-003"></a>
### Lesson RE-RSCDATA-003：Cache Key 必须包含哪些 Security Context

处理 tenant/user/permission/locale 避免数据串用。

<a id="lesson-re-rscdata-004"></a>
### Lesson RE-RSCDATA-004：RSC N+1 是怎么产生的

列表子组件逐个读取数据制造查询放大。

<a id="lesson-re-rscdata-005"></a>
### Lesson RE-RSCDATA-005：DataLoader / Batch / Join / Prefetch 如何解决 N+1

根据数据源选择聚合策略。

<a id="lesson-re-rscdata-006"></a>
### Lesson RE-RSCDATA-006：RSC Waterfall 与 Component Composition 的关系

嵌套 async component 串行发现数据时测量延迟。

<a id="lesson-re-rscdata-007"></a>
### Lesson RE-RSCDATA-007：Cache Invalidation 为什么比 Cache Read 更难

建立 mutation→affected key/tag→refresh 的关系。

<a id="lesson-re-rscdata-008"></a>
### Lesson RE-RSCDATA-008：Authorization 应该在 Component 还是 Service

强调 UI component 可以决定呈现，但 server data/mutation 必须在可复用安全边界验证。

<a id="lesson-re-rscdata-009"></a>
### Lesson RE-RSCDATA-009：Serialization Cost 如何影响 RSC Payload

避免把巨大对象/重复字段无脑传 Client。

<a id="lesson-re-rscdata-010"></a>
### Lesson RE-RSCDATA-010：Secret / Internal Object 如何保证不跨 Client Boundary

做 Data Leak Review。

<a id="lesson-re-rscdata-011"></a>
### Lesson RE-RSCDATA-011：RSC Observability 如何串联 DB / Cache / Render / Stream

设计 trace span 和 boundary timing。

<a id="lesson-re-static-008"></a>
### Lesson RE-STATIC-008：Static / SSR / CSR / RSC 应该怎么选

在已经完整学习 CSR、SSR、Static Rendering 与 RSC 后，从 personalization、freshness、SEO、server cost、client bundle 和 interaction 建立最终选择矩阵。

<a id="lesson-re-rscdata-012"></a>
### Lesson RE-RSCDATA-012：综合项目——Full-stack React Runtime 运行时骨架

从零连接 SSR、RSC、Client Component、Server Function；HTTP/Build/Data/Auth/Cache 使用课程固定教学 Harness，不把尚未学习的 Node/Bundler/Database 技术作为项目核心。

<a id="lesson-re-rscdata-013"></a>
### Lesson RE-RSCDATA-013：综合项目——加入 Auth/Tenant/Cache/Data Boundary

在教学 Auth/Tenant/Cache Adapter 上验证 Server-only data、tenant scope 与 client serialization；当前验收 React Boundary，完整身份/缓存平台实现留后续 Owner Stage。

<a id="lesson-re-rscdata-014"></a>
### Lesson RE-RSCDATA-014：综合项目——加入 Suspense/Streaming/use()

观察 RSC/HTML 两类流和异步 reveal。

<a id="lesson-re-rscdata-015"></a>
### Lesson RE-RSCDATA-015：综合项目——制造 N+1、Waterfall、Unauthorized Mutation、Data Leak Risk

完成证据化定位和修复。

<a id="lesson-re-rscdata-016"></a>
### Lesson RE-RSCDATA-016：综合项目——Full-stack React Runtime 完整验收

输出 Server/Client Boundary 图、RSC Payload 分析、Cache Map、Threat Notes 和 Trace。

---

> [← Module 11.24：SSR、Hydration、Streaming 与 Prerender](../module11-24-ssr-hydration-streaming/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.26：React Source Research 与 Fiber Model →](../module11-26-source-fiber/README.md)
