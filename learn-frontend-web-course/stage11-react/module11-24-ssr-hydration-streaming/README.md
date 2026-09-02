# Module 11.24：SSR、Hydration、Streaming 与 Prerender

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-23-testing/README.md)  > · [下一个 Module](../module11-25-rsc-server-functions-data/README.md)

本 Module 不依赖 Next.js 黑盒，从 React Server Renderer 开始建立 Request → React Tree → HTML/Stream → Browser 的完整模型。

### Lesson RE-SSR-001：为什么 CSR 之外还需要 Server Rendering

从首屏、SEO、弱设备、数据位置和成本讨论动机与 trade-off。

### Lesson RE-SSR-002：SSR 并不意味着 React 在浏览器消失

区分服务器生成 HTML 与客户端交互接管。

### Lesson RE-SSR-003：第一个 React Server Render

在 Node 环境把 React Tree 转成 HTML。

### Lesson RE-SSR-004：Server Component Function 与 Client Component Function 在 SSR 时怎么理解

先只讨论传统 SSR 中服务器执行 render，不提前混入 RSC。

### Lesson RE-SSR-005：Server Render 能访问哪些环境，不能访问哪些浏览器 API

处理 window/document/localStorage 边界。

### Lesson RE-SSR-006：Request-specific Data 如何进入 React Tree

避免全局变量导致跨请求/租户数据泄漏。

### Lesson RE-SSR-007：renderToPipeableStream / renderToReadableStream 高层区别

认识 Node Stream 与 Web Stream 部署环境。

### Lesson RE-SSR-008：Shell 是什么

理解可以先发送可完成的页面骨架。

### Lesson RE-SSR-009：SSR Error 应该在哪个阶段处理

区分 shell 前失败、stream 中失败、client hydrate 错误。

### Lesson RE-SSR-010：Abort SSR Request 为什么重要

处理客户端断开、超时和慢资源。

### Lesson RE-SSR-011：SSR 对 TTFB / HTML Size / CPU 有什么成本

建立服务端容量与前端体验 trade-off。

### Lesson RE-SSR-012：SSR 与 SEO 的真实关系

区分 HTML 可见、metadata、crawler、JS execution 和内容质量。

### Lesson RE-SSR-013：SSR 与 Cache/CDN 如何连接

建立 public/private HTML、Vary、tenant/user personalized boundary。

### Lesson RE-SSR-014：输出一次 React SSR Request 的运行位置图

标出 server-only、shared、client-only code 和数据。

---

本 Module 完整学习 hydrateRoot、HTML Identity、Event、Mismatch、Date/Random/Locale、useId、Browser Extension/DOM Mutation、Recoverable Error 和性能。

### Lesson RE-HYDRATE-001：Hydration 到底“复用”了什么

已有 DOM 不重新从空创建，而由 React 将客户端树与服务器 HTML 对齐并接管。

### Lesson RE-HYDRATE-002：第一个 hydrateRoot

从 server HTML 到 client interactive 完成最小链路。

### Lesson RE-HYDRATE-003：Hydration 与 createRoot 为什么不能互换

在同一 server markup 上比较行为和 DOM 重建风险。

### Lesson RE-HYDRATE-004：Hydration Mismatch 的根条件是什么

服务器输出与客户端首次 Render 结果不一致。

### Lesson RE-HYDRATE-005：Date / Math.random 为什么会制造 Mismatch

用非确定 Render 实验连接 Pure Render。

### Lesson RE-HYDRATE-006：Locale / Timezone 为什么是更隐蔽的 Mismatch 来源

比较服务器和浏览器地区格式化结果。

### Lesson RE-HYDRATE-007：Browser-only API 如何安全进入 SSR App

区分首 Render、Effect/client boundary 和 server-safe fallback。

### Lesson RE-HYDRATE-008：useId 如何保证 Server/Client ID 一致

连接 Root identifierPrefix 和多 Root 场景。

### Lesson RE-HYDRATE-009：Hydration 时 Event 如何恢复交互

建立事件注册/接管高层模型。

### Lesson RE-HYDRATE-010：Browser Extension / CDN Rewrite 也可能制造 Mismatch

学习从 server raw HTML 与浏览器实际 DOM 比较外部修改。

### Lesson RE-HYDRATE-011：suppressHydrationWarning 为什么只能是最后手段

明确可预期不可避免差异和隐藏真实 Bug 的风险。

### Lesson RE-HYDRATE-012：onRecoverableError 如何进入生产诊断

记录 mismatch/recovery 与 route/release context。

### Lesson RE-HYDRATE-013：Hydration Performance 应该测什么

观察 HTML 可见时间、JS 下载、main-thread hydrate、可交互时间。

### Lesson RE-HYDRATE-014：综合故障——系统定位五类 Hydration Mismatch

从 server input、client input、DOM、locale、random 五条线排查。

---

本 Module 学习 React 如何利用 Suspense Boundary 把 Server HTML 分段输出，并覆盖 Shell、Chunk、Backpressure、Abort、Proxy Buffering、Crawler 和失败恢复。

### Lesson RE-STREAMSSR-001：为什么一次等完整 HTML 再发送会产生 Waterfall

建立服务端数据等待与 TTFB 问题。

### Lesson RE-STREAMSSR-002：Suspense Boundary 如何成为 Streaming Segment

慢子树 pending 时先输出 fallback/shell。

### Lesson RE-STREAMSSR-003：Shell Ready 与 All Ready 分别代表什么

决定何时开始向普通用户和特殊消费者发送。

### Lesson RE-STREAMSSR-004：后续 HTML Chunk 如何替换/揭示 Boundary

观察真实响应流和浏览器 DOM 更新。

### Lesson RE-STREAMSSR-005：Bootstrap Script / Client Bundle 如何接入 Stream

建立 server HTML 与 client hydration 的连接。

### Lesson RE-STREAMSSR-006：Backpressure 为什么是生产 Stream 必须考虑的问题

理解消费者慢、网络慢和服务端写入节奏。

### Lesson RE-STREAMSSR-007：Abort 慢 Boundary 如何保证页面仍然可用

超时后让客户端接管剩余内容。

### Lesson RE-STREAMSSR-008：Stream 中错误发生在 Shell 前后有何区别

设计 status code、fallback、logging。

### Lesson RE-STREAMSSR-009：Reverse Proxy Buffering 为什么可能让“流式”失效

通过代理配置观察 chunk 被缓存后一次性返回。

### Lesson RE-STREAMSSR-010：Crawler / Bot 是否总应该走完整等待

讨论 SEO、TTFB、资源预算和策略。

### Lesson RE-STREAMSSR-011：Streaming SSR Waterfall 如何诊断

从 server trace、data start time、boundary reveal 定位串行资源。

### Lesson RE-STREAMSSR-012：综合实现——三层 Suspense Streaming Page

主动加入快/中/慢数据并验证 Shell、Reveal、Abort、Error。

---

本 Module 学习 React 静态预渲染能力、Hydration、CDN、PPR/Resume 等版本敏感能力的设计边界，并完成从零 React SSR App 综合项目。

### Lesson RE-STATIC-001：Static Rendering 与 Request-time SSR 有什么区别

比较构建时、请求时、数据 freshness 和部署成本。

### Lesson RE-STATIC-002：第一个 prerender

把可完成的 React Tree 生成静态 HTML/预加载信息。

### Lesson RE-STATIC-003：Static HTML 最终为什么仍可能需要 Hydration

区分纯静态内容和客户端交互。

### Lesson RE-STATIC-004：静态页面如何安全缓存到 CDN

讨论 content hash、revalidation、personalization boundary。

### Lesson RE-STATIC-005：Partial Prerendering 解决什么问题

建立静态 shell + 动态区域的架构动机。

### Lesson RE-STATIC-006：Postponed State / Resume 的高层模型

理解预渲染暂停点与后续请求继续工作；底层 API 按正式写课时稳定版本锁定。

### Lesson RE-STATIC-007：PPR / Resume 为什么必须严格锁 React / Framework 版本

认识版本敏感底层集成与生产风险。

### Lesson RE-STATIC-008：Static / SSR / CSR / RSC 应该怎么选

从 personalization、freshness、SEO、server cost、interaction 做矩阵。

### Lesson RE-STATIC-009：综合项目——从空目录搭 React SSR Runtime

不用 Next.js，建立 server entry、client entry、HTML shell 和 build。

### Lesson RE-STATIC-010：综合项目——接入 hydrateRoot 与交互

验证 Server HTML → Browser Visible → Client 接管。

### Lesson RE-STATIC-011：综合项目——加入 Suspense Streaming

观察真实 Response Chunk 和 boundary reveal。

### Lesson RE-STATIC-012：综合项目——制造 Hydration Mismatch 与 Abort

完成证据化定位和恢复。

### Lesson RE-STATIC-013：综合项目——加入可静态预渲染页面

比较 Static 与 Request SSR 的产物/运行成本。

### Lesson RE-STATIC-014：综合项目——React SSR App 完整验收

输出运行位置图、stream timeline、hydration evidence、cache policy 和 failure report。

---
