# Module 11.14：Router 与 Route Data Architecture

> [← Module 11.13：Custom Hook 与 External Store Integration](../module11-13-custom-hook-external-store/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.15：Server State、TanStack Query 与 API Boundary →](../module11-15-server-state-query-api/README.md)

本 Module 从 URL/History 出发，以 React Router 为代表完整覆盖 Route Tree、Nested Layout、Params、Search Params、Navigation、Deep Link、Error/Lazy Route、Scroll、Auth 与 URL State。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（30 课）</strong></summary>

- [RE-ROUTER-001：为什么 SPA 仍然需要 URL](#lesson-re-router-001)
- [RE-ROUTER-002：React Router 与浏览器 History 的关系](#lesson-re-router-002)
- [RE-ROUTER-003：第一个 Route Tree](#lesson-re-router-003)
- [RE-ROUTER-004：Nested Route 与 Layout Route 如何组织页面骨架](#lesson-re-router-004)
- [RE-ROUTER-005：Dynamic Params 如何成为页面输入](#lesson-re-router-005)
- [RE-ROUTER-006：Search Params 为什么应该成为真正的 URL State](#lesson-re-router-006)
- [RE-ROUTER-007：Navigate、Link、Redirect 各自解决什么问题](#lesson-re-router-007)
- [RE-ROUTER-008：Index Route、Relative Route 与 Path Resolution](#lesson-re-router-008)
- [RE-ROUTER-009：Deep Link 为什么在开发环境正常、生产刷新却可能 404](#lesson-re-router-009)
- [RE-ROUTER-010：Route-level Lazy Loading 如何工作](#lesson-re-router-010)
- [RE-ROUTER-011：Error Route 与普通 Error Boundary 有什么关系](#lesson-re-router-011)
- [RE-ROUTER-012：Scroll Restoration 是谁的责任](#lesson-re-router-012)
- [RE-ROUTER-013：Route Transition Pending UI 应该放在哪里](#lesson-re-router-013)
- [RE-ROUTER-014：Auth Route 为什么不能只做前端“拦截”](#lesson-re-router-014)
- [RE-ROUTER-015：Route Tree 如何映射 Feature / Domain Boundary](#lesson-re-router-015)
- [RE-ROUTER-016：综合实现——把 Multi-step Workflow 接入真实 URL](#lesson-re-router-016)
- [RE-DATAROUTER-001：为什么 Route Match 之后还需要 Data Lifecycle](#lesson-re-datarouter-001)
- [RE-DATAROUTER-002：第一个 Loader](#lesson-re-datarouter-002)
- [RE-DATAROUTER-003：Loader Params / Request 如何成为数据输入](#lesson-re-datarouter-003)
- [RE-DATAROUTER-004：Loader 的 Cancellation 为什么重要](#lesson-re-datarouter-004)
- [RE-DATAROUTER-005：Pending Navigation UI 如何设计](#lesson-re-datarouter-005)
- [RE-DATAROUTER-006：Route Action 如何处理写操作](#lesson-re-datarouter-006)
- [RE-DATAROUTER-007：Redirect 应该在什么层发生](#lesson-re-datarouter-007)
- [RE-DATAROUTER-008：Revalidation 是什么](#lesson-re-datarouter-008)
- [RE-DATAROUTER-009：Nested Route Data 如何组合](#lesson-re-datarouter-009)
- [RE-DATAROUTER-010：Deferred Route Data 为什么需要独立异步边界](#lesson-re-datarouter-010)
- [RE-DATAROUTER-011：Route Error Boundary 如何隔离局部失败](#lesson-re-datarouter-011)
- [RE-DATAROUTER-012：Data Router 与 Query Cache 会不会重复](#lesson-re-datarouter-012)
- [RE-DATAROUTER-013：Route Architecture 如何处理 Auth / Tenant / Feature Flag](#lesson-re-datarouter-013)
- [RE-DATAROUTER-014：综合实现——带 Loader/Action/Error/Revalidation 的订单路由](#lesson-re-datarouter-014)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-router-001"></a>
### Lesson RE-ROUTER-001：为什么 SPA 仍然需要 URL

建立可分享、刷新、Back/Forward、书签和外部入口的 Web 基本合同。

<a id="lesson-re-router-002"></a>
### Lesson RE-ROUTER-002：React Router 与浏览器 History 的关系

观察 push/replace/popstate 与 Router 状态更新，不把 Router 当魔法。

<a id="lesson-re-router-003"></a>
### Lesson RE-ROUTER-003：第一个 Route Tree

从 `/`、`/products`、`/orders` 建立路径到 UI 的匹配模型。

<a id="lesson-re-router-004"></a>
### Lesson RE-ROUTER-004：Nested Route 与 Layout Route 如何组织页面骨架

设计父 Layout、Outlet、子页面和共享导航。

<a id="lesson-re-router-005"></a>
### Lesson RE-ROUTER-005：Dynamic Params 如何成为页面输入

处理 `/orders/:orderId`、类型转换、非法参数和不存在资源。

<a id="lesson-re-router-006"></a>
### Lesson RE-ROUTER-006：Search Params 为什么应该成为真正的 URL State

实现 filter/sort/page 并验证刷新、分享、Back/Forward。

<a id="lesson-re-router-007"></a>
### Lesson RE-ROUTER-007：Navigate、Link、Redirect 各自解决什么问题

区分用户导航、命令式业务跳转和声明式重定向。

<a id="lesson-re-router-008"></a>
### Lesson RE-ROUTER-008：Index Route、Relative Route 与 Path Resolution

解决大型嵌套路由中相对链接和路径维护问题。

<a id="lesson-re-router-009"></a>
### Lesson RE-ROUTER-009：Deep Link 为什么在开发环境正常、生产刷新却可能 404

理解 SPA fallback、静态服务器和 CDN 路由配置边界。

<a id="lesson-re-router-010"></a>
### Lesson RE-ROUTER-010：Route-level Lazy Loading 如何工作

把代码分割与导航加载连接起来，并观察 Network Chunk。

<a id="lesson-re-router-011"></a>
### Lesson RE-ROUTER-011：Error Route 与普通 Error Boundary 有什么关系

区分路由加载/Action 错误、Render 错误和嵌套错误边界。

<a id="lesson-re-router-012"></a>
### Lesson RE-ROUTER-012：Scroll Restoration 是谁的责任

处理列表→详情→返回、hash anchor、手工 scroll 和浏览器默认行为。

<a id="lesson-re-router-013"></a>
### Lesson RE-ROUTER-013：Route Transition Pending UI 应该放在哪里

为未来 Data Router / Suspense 建立导航状态边界。

<a id="lesson-re-router-014"></a>
### Lesson RE-ROUTER-014：Auth Route 为什么不能只做前端“拦截”

区分 UI 路由可见性与服务器真正授权。

<a id="lesson-re-router-015"></a>
### Lesson RE-ROUTER-015：Route Tree 如何映射 Feature / Domain Boundary

避免一个巨大 routes 文件，建立 route ownership 与 module public API。

<a id="lesson-re-router-016"></a>
### Lesson RE-ROUTER-016：综合实现——把 Multi-step Workflow 接入真实 URL

把 step/orderId/filter 等适合 URL 的状态迁出 React State，并验证 Deep Link 与 Back/Forward。

---

本 Module 在 Router 基础上加入 Loader、Action、Pending、Redirect、Error、Revalidation 与 Route Data，建立“导航就是数据生命周期的一部分”的模型。

<a id="lesson-re-datarouter-001"></a>
### Lesson RE-DATAROUTER-001：为什么 Route Match 之后还需要 Data Lifecycle

从页面进入、刷新、切换参数分析数据加载与路由的一致性问题。

<a id="lesson-re-datarouter-002"></a>
### Lesson RE-DATAROUTER-002：第一个 Loader

让 Route 自己声明所需数据，并观察导航和加载的关系。

<a id="lesson-re-datarouter-003"></a>
### Lesson RE-DATAROUTER-003：Loader Params / Request 如何成为数据输入

处理 route params、search params、request header 和 abort signal。

<a id="lesson-re-datarouter-004"></a>
### Lesson RE-DATAROUTER-004：Loader 的 Cancellation 为什么重要

快速导航制造旧请求未完成场景，验证 abort。

<a id="lesson-re-datarouter-005"></a>
### Lesson RE-DATAROUTER-005：Pending Navigation UI 如何设计

区分当前页面保留、全局 loading、局部 skeleton 和 optimistic navigation。

<a id="lesson-re-datarouter-006"></a>
### Lesson RE-DATAROUTER-006：Route Action 如何处理写操作

用 Form/Mutation 建立提交→结果→后续数据更新流程。

<a id="lesson-re-datarouter-007"></a>
### Lesson RE-DATAROUTER-007：Redirect 应该在什么层发生

比较 UI effect redirect、loader/action redirect 和服务器 redirect。

<a id="lesson-re-datarouter-008"></a>
### Lesson RE-DATAROUTER-008：Revalidation 是什么

理解写操作以后哪些 loader 需要重新取数以及何时避免全量刷新。

<a id="lesson-re-datarouter-009"></a>
### Lesson RE-DATAROUTER-009：Nested Route Data 如何组合

父子 Layout 各自拥有数据，避免一个顶层 Loader 包办所有资源。

<a id="lesson-re-datarouter-010"></a>
### Lesson RE-DATAROUTER-010：Deferred Route Data 为什么需要独立异步边界

只建立“快数据先可用、慢数据后完成”的 Route Data 生命周期和接口边界，不在这里实现 Suspense；Suspense 与 Streaming 的正式模型留到 Module 11.17 / 11.24。

<a id="lesson-re-datarouter-011"></a>
### Lesson RE-DATAROUTER-011：Route Error Boundary 如何隔离局部失败

制造父/子 loader failure 并观察错误冒泡边界。

<a id="lesson-re-datarouter-012"></a>
### Lesson RE-DATAROUTER-012：Data Router 与 Query Cache 会不会重复

比较 navigation lifecycle 与 server-state cache，明确互补/重叠的选择边界。

<a id="lesson-re-datarouter-013"></a>
### Lesson RE-DATAROUTER-013：Route Architecture 如何处理 Auth / Tenant / Feature Flag

把运行上下文放在明确的 route/layout boundary。

<a id="lesson-re-datarouter-014"></a>
### Lesson RE-DATAROUTER-014：综合实现——带 Loader/Action/Error/Revalidation 的订单路由

将订单工作流升级为真正的路由数据应用，并保持 Knowledge Ceiling。

---

> [← Module 11.13：Custom Hook 与 External Store Integration](../module11-13-custom-hook-external-store/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.15：Server State、TanStack Query 与 API Boundary →](../module11-15-server-state-query-api/README.md)
