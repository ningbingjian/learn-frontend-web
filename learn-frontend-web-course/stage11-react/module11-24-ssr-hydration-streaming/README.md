# Module 11.24：SSR、Hydration、Streaming 与 Prerender

> [← Module 11.23：React Testing Integration](../module11-23-testing/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.25：RSC、Server/Client Boundary、Server Functions 与 Data/Cache Architecture →](../module11-25-rsc-server-functions-data/README.md)

本 Module 不依赖 Next.js 黑盒，从 React Server Renderer 开始建立 Request → React Tree → HTML/Stream → Browser 的完整模型。由于 Node.js Runtime 与 Bundler 分别在后续 Stage 15 / 16 正式学习，本 Module 的 HTTP Server、多入口 Build、Proxy 等非 React 部分统一作为教学基础设施提供；当前只要求理解 React-side SSR/Hydration/Streaming/Prerender 因果链。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（57 课）</strong></summary>

- [RE-SSR-001：为什么 CSR 之外还需要 Server Rendering](#lesson-re-ssr-001)
- [RE-SSR-002：SSR 并不意味着 React 在浏览器消失](#lesson-re-ssr-002)
- [RE-SSR-003：第一个 React Server Render](#lesson-re-ssr-003)
- [RE-SSR-004：普通 React Component 在 SSR 时到底在哪里执行](#lesson-re-ssr-004)
- [RE-SSR-005：Server Render 能访问哪些环境，不能访问哪些浏览器 API](#lesson-re-ssr-005)
- [RE-SSR-006：Request-specific Data 如何进入 React Tree](#lesson-re-ssr-006)
- [RE-SSR-007：renderToPipeableStream / renderToReadableStream 高层区别](#lesson-re-ssr-007)
- [RE-SSR-008：Shell 是什么](#lesson-re-ssr-008)
- [RE-SSR-009：SSR Error 应该在哪个阶段处理](#lesson-re-ssr-009)
- [RE-SSR-010：Abort SSR Request 为什么重要](#lesson-re-ssr-010)
- [RE-SSR-011：SSR 对 TTFB / HTML Size / CPU 有什么成本](#lesson-re-ssr-011)
- [RE-SSR-012：SSR 与 SEO 的真实关系](#lesson-re-ssr-012)
- [RE-SSR-013：SSR 与 Cache/CDN 如何连接](#lesson-re-ssr-013)
- [RE-SSR-014：输出一次 React SSR Request 的运行位置图](#lesson-re-ssr-014)
- [RE-SEC-008：SSR HTML Injection 风险在哪里](#lesson-re-sec-008)
- [RE-HYDRATE-001：Hydration 到底“复用”了什么](#lesson-re-hydrate-001)
- [RE-HYDRATE-002：第一个 hydrateRoot](#lesson-re-hydrate-002)
- [RE-HYDRATE-003：Hydration 与 createRoot 为什么不能互换](#lesson-re-hydrate-003)
- [RE-HYDRATE-004：Hydration Mismatch 的根条件是什么](#lesson-re-hydrate-004)
- [RE-HYDRATE-005：Date / Math.random 为什么会制造 Mismatch](#lesson-re-hydrate-005)
- [RE-HYDRATE-006：Locale / Timezone 为什么是更隐蔽的 Mismatch 来源](#lesson-re-hydrate-006)
- [RE-HYDRATE-007：Browser-only API 如何安全进入 SSR App](#lesson-re-hydrate-007)
- [RE-HYDRATE-008：useId 如何保证 Server/Client ID 一致](#lesson-re-hydrate-008)
- [RE-HYDRATE-009：Hydration 时 Event 如何恢复交互](#lesson-re-hydrate-009)
- [RE-HYDRATE-010：Browser Extension / CDN Rewrite 也可能制造 Mismatch](#lesson-re-hydrate-010)
- [RE-HYDRATE-011：suppressHydrationWarning 为什么只能是最后手段](#lesson-re-hydrate-011)
- [RE-HYDRATE-012：onRecoverableError 如何进入生产诊断](#lesson-re-hydrate-012)
- [RE-HYDRATE-013：Hydration Performance 应该测什么](#lesson-re-hydrate-013)
- [RE-HYDRATE-014：综合故障——系统定位五类 Hydration Mismatch](#lesson-re-hydrate-014)
- [RE-SEC-009：Hydration Payload 如何避免闭合 script / 数据注入](#lesson-re-sec-009)
- [RE-DEBUG-008：Hydration Mismatch 应该从哪三份证据对比](#lesson-re-debug-008)
- [RE-TEST-013：Hydration / SSR React-specific Test 验证什么](#lesson-re-test-013)
- [RE-STREAMSSR-001：为什么一次等完整 HTML 再发送会产生 Waterfall](#lesson-re-streamssr-001)
- [RE-STREAMSSR-002：Suspense Boundary 如何成为 Streaming Segment](#lesson-re-streamssr-002)
- [RE-STREAMSSR-003：Shell Ready 与 All Ready 分别代表什么](#lesson-re-streamssr-003)
- [RE-STREAMSSR-004：后续 HTML Chunk 如何替换/揭示 Boundary](#lesson-re-streamssr-004)
- [RE-STREAMSSR-005：Bootstrap Script / Client Bundle 如何接入 Stream](#lesson-re-streamssr-005)
- [RE-STREAMSSR-006：Backpressure 为什么是生产 Stream 必须考虑的问题](#lesson-re-streamssr-006)
- [RE-STREAMSSR-007：Abort 慢 Boundary 如何保证页面仍然可用](#lesson-re-streamssr-007)
- [RE-STREAMSSR-008：Stream 中错误发生在 Shell 前后有何区别](#lesson-re-streamssr-008)
- [RE-STREAMSSR-009：Reverse Proxy Buffering 为什么可能让“流式”失效](#lesson-re-streamssr-009)
- [RE-STREAMSSR-010：Crawler / Bot 是否总应该走完整等待](#lesson-re-streamssr-010)
- [RE-STREAMSSR-011：Streaming SSR Waterfall 如何诊断](#lesson-re-streamssr-011)
- [RE-STREAMSSR-012：综合实现——三层 Suspense Streaming Page](#lesson-re-streamssr-012)
- [RE-STATIC-001：Static Rendering 与 Request-time SSR 有什么区别](#lesson-re-static-001)
- [RE-STATIC-002：第一个 prerender](#lesson-re-static-002)
- [RE-STATIC-003：Static HTML 最终为什么仍可能需要 Hydration](#lesson-re-static-003)
- [RE-STATIC-004：静态页面如何安全缓存到 CDN](#lesson-re-static-004)
- [RE-STATIC-005：Partial Prerendering 解决什么问题](#lesson-re-static-005)
- [RE-STATIC-006：Postponed State / Resume 的高层模型](#lesson-re-static-006)
- [RE-STATIC-007：PPR / Resume 为什么必须严格锁 React / Framework 版本](#lesson-re-static-007)
- [RE-STATIC-009：综合项目——从空目录建立 React SSR 的 React-side Runtime Boundary](#lesson-re-static-009)
- [RE-STATIC-010：综合项目——接入 hydrateRoot 与交互](#lesson-re-static-010)
- [RE-STATIC-011：综合项目——加入 Suspense Streaming](#lesson-re-static-011)
- [RE-STATIC-012：综合项目——制造 Hydration Mismatch 与 Abort](#lesson-re-static-012)
- [RE-STATIC-013：综合项目——加入可静态预渲染页面](#lesson-re-static-013)
- [RE-STATIC-014：综合项目——React SSR App 完整验收](#lesson-re-static-014)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-ssr-001"></a>
### Lesson RE-SSR-001：为什么 CSR 之外还需要 Server Rendering

从首屏、SEO、弱设备、数据位置和成本讨论动机与 trade-off。

<a id="lesson-re-ssr-002"></a>
### Lesson RE-SSR-002：SSR 并不意味着 React 在浏览器消失

区分服务器生成 HTML 与客户端交互接管。

<a id="lesson-re-ssr-003"></a>
### Lesson RE-SSR-003：第一个 React Server Render

在 Node 环境把 React Tree 转成 HTML。

<a id="lesson-re-ssr-004"></a>
### Lesson RE-SSR-004：普通 React Component 在 SSR 时到底在哪里执行

只讨论传统 SSR 中普通 React Component Function 如何在服务器 Render 生成 HTML；Server Component / Client Component 是 RSC 概念，统一留到 Module 11.25。
<a id="lesson-re-ssr-005"></a>
### Lesson RE-SSR-005：Server Render 能访问哪些环境，不能访问哪些浏览器 API

处理 window/document/localStorage 边界。

<a id="lesson-re-ssr-006"></a>
### Lesson RE-SSR-006：Request-specific Data 如何进入 React Tree

避免全局变量导致跨请求/租户数据泄漏。

<a id="lesson-re-ssr-007"></a>
### Lesson RE-SSR-007：renderToPipeableStream / renderToReadableStream 高层区别

认识 Node Stream 与 Web Stream 部署环境。

<a id="lesson-re-ssr-008"></a>
### Lesson RE-SSR-008：Shell 是什么

理解可以先发送可完成的页面骨架。

<a id="lesson-re-ssr-009"></a>
### Lesson RE-SSR-009：SSR Error 应该在哪个阶段处理

区分 shell 前失败、stream 中失败、client hydrate 错误。

<a id="lesson-re-ssr-010"></a>
### Lesson RE-SSR-010：Abort SSR Request 为什么重要

处理客户端断开、超时和慢资源。

<a id="lesson-re-ssr-011"></a>
### Lesson RE-SSR-011：SSR 对 TTFB / HTML Size / CPU 有什么成本

建立服务端容量与前端体验 trade-off。

<a id="lesson-re-ssr-012"></a>
### Lesson RE-SSR-012：SSR 与 SEO 的真实关系

区分 HTML 可见、metadata、crawler、JS execution 和内容质量。

<a id="lesson-re-ssr-013"></a>
### Lesson RE-SSR-013：SSR 与 Cache/CDN 如何连接

建立 public/private HTML、Vary、tenant/user personalized boundary。

<a id="lesson-re-ssr-014"></a>
### Lesson RE-SSR-014：输出一次 React SSR Request 的运行位置图

标出 server-only、shared、client-only code 和数据。

---

本 Module 完整学习 hydrateRoot、HTML Identity、Event、Mismatch、Date/Random/Locale、useId、Browser Extension/DOM Mutation、Recoverable Error 和性能。

<a id="lesson-re-sec-008"></a>
### Lesson RE-SEC-008：SSR HTML Injection 风险在哪里

在已经掌握 SSR 输出链后，检查用户内容、metadata 和 script data serialization 的 HTML 注入风险，并明确安全 escaping/sanitization 边界。
<a id="lesson-re-hydrate-001"></a>
### Lesson RE-HYDRATE-001：Hydration 到底“复用”了什么

已有 DOM 不重新从空创建，而由 React 将客户端树与服务器 HTML 对齐并接管。

<a id="lesson-re-hydrate-002"></a>
### Lesson RE-HYDRATE-002：第一个 hydrateRoot

从 server HTML 到 client interactive 完成最小链路。

<a id="lesson-re-hydrate-003"></a>
### Lesson RE-HYDRATE-003：Hydration 与 createRoot 为什么不能互换

在同一 server markup 上比较行为和 DOM 重建风险。

<a id="lesson-re-hydrate-004"></a>
### Lesson RE-HYDRATE-004：Hydration Mismatch 的根条件是什么

服务器输出与客户端首次 Render 结果不一致。

<a id="lesson-re-hydrate-005"></a>
### Lesson RE-HYDRATE-005：Date / Math.random 为什么会制造 Mismatch

用非确定 Render 实验连接 Pure Render。

<a id="lesson-re-hydrate-006"></a>
### Lesson RE-HYDRATE-006：Locale / Timezone 为什么是更隐蔽的 Mismatch 来源

比较服务器和浏览器地区格式化结果。

<a id="lesson-re-hydrate-007"></a>
### Lesson RE-HYDRATE-007：Browser-only API 如何安全进入 SSR App

区分首 Render、Effect/client boundary 和 server-safe fallback。

<a id="lesson-re-hydrate-008"></a>
### Lesson RE-HYDRATE-008：useId 如何保证 Server/Client ID 一致

连接 Root identifierPrefix 和多 Root 场景。

<a id="lesson-re-hydrate-009"></a>
### Lesson RE-HYDRATE-009：Hydration 时 Event 如何恢复交互

建立事件注册/接管高层模型。

<a id="lesson-re-hydrate-010"></a>
### Lesson RE-HYDRATE-010：Browser Extension / CDN Rewrite 也可能制造 Mismatch

学习从 server raw HTML 与浏览器实际 DOM 比较外部修改。

<a id="lesson-re-hydrate-011"></a>
### Lesson RE-HYDRATE-011：suppressHydrationWarning 为什么只能是最后手段

明确可预期不可避免差异和隐藏真实 Bug 的风险。

<a id="lesson-re-hydrate-012"></a>
### Lesson RE-HYDRATE-012：onRecoverableError 如何进入生产诊断

记录 mismatch/recovery 与 route/release context。

<a id="lesson-re-hydrate-013"></a>
### Lesson RE-HYDRATE-013：Hydration Performance 应该测什么

观察 HTML 可见时间、JS 下载、main-thread hydrate、可交互时间。

<a id="lesson-re-hydrate-014"></a>
### Lesson RE-HYDRATE-014：综合故障——系统定位五类 Hydration Mismatch

从 server input、client input、DOM、locale、random 五条线排查。

---

本 Module 学习 React 如何利用 Suspense Boundary 把 Server HTML 分段输出，并覆盖 Shell、Chunk、Backpressure、Abort、Proxy Buffering、Crawler 和失败恢复。

<a id="lesson-re-sec-009"></a>
### Lesson RE-SEC-009：Hydration Payload 如何避免闭合 script / 数据注入

在已经掌握 Hydration Payload 后，验证序列化数据如何安全嵌入 HTML/script context，避免闭合 script 与数据注入。
<a id="lesson-re-debug-008"></a>
### Lesson RE-DEBUG-008：Hydration Mismatch 应该从哪三份证据对比

比较 server raw HTML、client first render input 与浏览器实际 DOM 三份证据，建立 Hydration Mismatch 的标准诊断路径。
<a id="lesson-re-test-013"></a>
### Lesson RE-TEST-013：Hydration / SSR React-specific Test 验证什么

将 Module 11.23 的 Client React Test Matrix 扩展到 SSR/Hydration：比较 server markup、hydrate 行为和 recoverable warning。
<a id="lesson-re-streamssr-001"></a>
### Lesson RE-STREAMSSR-001：为什么一次等完整 HTML 再发送会产生 Waterfall

建立服务端数据等待与 TTFB 问题。

<a id="lesson-re-streamssr-002"></a>
### Lesson RE-STREAMSSR-002：Suspense Boundary 如何成为 Streaming Segment

慢子树 pending 时先输出 fallback/shell。

<a id="lesson-re-streamssr-003"></a>
### Lesson RE-STREAMSSR-003：Shell Ready 与 All Ready 分别代表什么

决定何时开始向普通用户和特殊消费者发送。

<a id="lesson-re-streamssr-004"></a>
### Lesson RE-STREAMSSR-004：后续 HTML Chunk 如何替换/揭示 Boundary

观察真实响应流和浏览器 DOM 更新。

<a id="lesson-re-streamssr-005"></a>
### Lesson RE-STREAMSSR-005：Bootstrap Script / Client Bundle 如何接入 Stream

建立 server HTML 与 client hydration 的连接。

<a id="lesson-re-streamssr-006"></a>
### Lesson RE-STREAMSSR-006：Backpressure 为什么是生产 Stream 必须考虑的问题

理解消费者慢、网络慢和服务端写入节奏。

<a id="lesson-re-streamssr-007"></a>
### Lesson RE-STREAMSSR-007：Abort 慢 Boundary 如何保证页面仍然可用

超时后让客户端接管剩余内容。

<a id="lesson-re-streamssr-008"></a>
### Lesson RE-STREAMSSR-008：Stream 中错误发生在 Shell 前后有何区别

设计 status code、fallback、logging。

<a id="lesson-re-streamssr-009"></a>
### Lesson RE-STREAMSSR-009：Reverse Proxy Buffering 为什么可能让“流式”失效

使用课程提供的最小 Reverse Proxy 配置观察 chunk 被 buffering 后一次性返回；本课只验证对 React Streaming 的影响，不教授代理/部署配置，完整交付工程留后续 Stage。
<a id="lesson-re-streamssr-010"></a>
### Lesson RE-STREAMSSR-010：Crawler / Bot 是否总应该走完整等待

讨论 SEO、TTFB、资源预算和策略。

<a id="lesson-re-streamssr-011"></a>
### Lesson RE-STREAMSSR-011：Streaming SSR Waterfall 如何诊断

从 server trace、data start time、boundary reveal 定位串行资源。

<a id="lesson-re-streamssr-012"></a>
### Lesson RE-STREAMSSR-012：综合实现——三层 Suspense Streaming Page

主动加入快/中/慢数据并验证 Shell、Reveal、Abort、Error。

---

本 Module 学习 React 静态预渲染能力、Hydration、CDN、PPR/Resume 等版本敏感能力的设计边界，并完成从零 React SSR App 综合项目。

<a id="lesson-re-static-001"></a>
### Lesson RE-STATIC-001：Static Rendering 与 Request-time SSR 有什么区别

比较构建时、请求时、数据 freshness 和部署成本。

<a id="lesson-re-static-002"></a>
### Lesson RE-STATIC-002：第一个 prerender

把可完成的 React Tree 生成静态 HTML/预加载信息。

<a id="lesson-re-static-003"></a>
### Lesson RE-STATIC-003：Static HTML 最终为什么仍可能需要 Hydration

区分纯静态内容和客户端交互。

<a id="lesson-re-static-004"></a>
### Lesson RE-STATIC-004：静态页面如何安全缓存到 CDN

讨论 content hash、revalidation、personalization boundary。

<a id="lesson-re-static-005"></a>
### Lesson RE-STATIC-005：Partial Prerendering 解决什么问题

建立静态 shell + 动态区域的架构动机。

<a id="lesson-re-static-006"></a>
### Lesson RE-STATIC-006：Postponed State / Resume 的高层模型

理解预渲染暂停点与后续请求继续工作；底层 API 按正式写课时稳定版本锁定。

<a id="lesson-re-static-007"></a>
### Lesson RE-STATIC-007：PPR / Resume 为什么必须严格锁 React / Framework 版本

认识版本敏感底层集成与生产风险。

<a id="lesson-re-static-009"></a>
### Lesson RE-STATIC-009：综合项目——从空目录建立 React SSR 的 React-side Runtime Boundary

Step 0 使用课程提供的最小 HTTP Server / Build Harness；学习者从空 React 入口开始建立 server entry、client entry、HTML shell 和 React render/hydrate 连接，不把未学 Node/Bundler 作为项目核心知识。
<a id="lesson-re-static-010"></a>
### Lesson RE-STATIC-010：综合项目——接入 hydrateRoot 与交互

验证 Server HTML → Browser Visible → Client 接管。

<a id="lesson-re-static-011"></a>
### Lesson RE-STATIC-011：综合项目——加入 Suspense Streaming

观察真实 Response Chunk 和 boundary reveal。

<a id="lesson-re-static-012"></a>
### Lesson RE-STATIC-012：综合项目——制造 Hydration Mismatch 与 Abort

完成证据化定位和恢复。

<a id="lesson-re-static-013"></a>
### Lesson RE-STATIC-013：综合项目——加入可静态预渲染页面

比较 Static 与 Request SSR 的产物/运行成本。

<a id="lesson-re-static-014"></a>
### Lesson RE-STATIC-014：综合项目——React SSR App 完整验收

输出运行位置图、stream timeline、hydration evidence、cache policy 和 failure report。

---

---

> [← Module 11.23：React Testing Integration](../module11-23-testing/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.25：RSC、Server/Client Boundary、Server Functions 与 Data/Cache Architecture →](../module11-25-rsc-server-functions-data/README.md)
