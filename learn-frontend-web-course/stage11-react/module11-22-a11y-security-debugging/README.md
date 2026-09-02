# Module 11.22：React-specific Accessibility、Security 与 Debugging

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-21-error-model/README.md)  > · [下一个 Module](../module11-23-testing/README.md)

本 Module 不重教完整 Web A11Y，而是聚焦 React 动态 UI、Portal、Route、Suspense、Virtualization、useId 与 Focus 管理的框架连接点。

### Lesson RE-A11Y-001：动态 React UI 为什么更容易破坏 Focus

观察条件 Render、Remount、Route 切换导致焦点丢失。

### Lesson RE-A11Y-002：useId 解决什么问题

为 label/input/aria relationship 生成稳定 ID，并连接 SSR hydration consistency。

### Lesson RE-A11Y-003：Modal / Portal 的 Focus Lifecycle

处理打开、trap、关闭恢复和 background inert。

### Lesson RE-A11Y-004：Route Navigation 后焦点应该去哪里

为 SPA 页面切换提供可感知的 heading/focus 策略。

### Lesson RE-A11Y-005：Suspense Loading 如何让 Screen Reader 感知

设计 loading semantics、live region、避免焦点突然消失。

### Lesson RE-A11Y-006：Error Boundary Fallback 如何保持可访问

提供焦点、错误说明和恢复动作。

### Lesson RE-A11Y-007：Dynamic Validation Error 如何宣布

连接 Form 的 aria-describedby / live region。

### Lesson RE-A11Y-008：Keyboard-first Component 如何测试

对 menu/dialog/listbox 等复合交互验证 Tab/Arrow/Escape。

### Lesson RE-A11Y-009：Virtualized List 有什么 A11Y 风险

讨论 DOM 缺项、screen reader navigation、focus offscreen 和 item count。

### Lesson RE-A11Y-010：Activity / Hidden UI 的可访问树如何处理

确保不可见区域不会错误参与交互。

### Lesson RE-A11Y-011：React Component API 如何内建 A11Y Guardrail

设计 label required、role/aria props、headless behavior contract。

### Lesson RE-A11Y-012：综合验收——对 Enterprise SPA 做 React-specific A11Y Audit

结合键盘、axe 类工具和手工 screen-reader-friendly 检查记录问题。

---

本 Module 聚焦 React 渲染、HTML、URL、Markdown、SSR/Hydration、RSC、Server Function 与权限 UI 的安全边界。

### Lesson RE-SEC-001：React 默认 Escaping 能防什么 XSS

用字符串插值验证文本被转义，并明确它不是完整安全系统。

### Lesson RE-SEC-002：dangerouslySetInnerHTML 为什么危险

注入恶意 HTML 并建立 Trusted Sanitization 的必要性。

### Lesson RE-SEC-003：Markdown / Rich Text 为什么必须按“不可信 HTML”处理

比较 parser、sanitizer、allowlist 和 plugin 风险。

### Lesson RE-SEC-004：URL / href / src 也可能成为攻击输入

处理 javascript/data scheme、open redirect 和 external link。

### Lesson RE-SEC-005：React Component Props 也能形成 Injection Boundary

审查 style、HTML、URL、event-like config 等高风险 Props API。

### Lesson RE-SEC-006：CSP / Trusted Types 与 React 如何配合

建立浏览器安全策略对 DOM sink 的保护层。

### Lesson RE-SEC-007：Client Permission UI 为什么不是 Authorization

隐藏按钮不能阻止直接请求，权限必须在 server mutation 验证。

### Lesson RE-SEC-008：SSR HTML Injection 风险在哪里

处理用户内容、metadata、script data serialization。

### Lesson RE-SEC-009：Hydration Payload 如何避免闭合 script / 数据注入

建立安全序列化与 escaping 边界。

### Lesson RE-SEC-010：RSC 为什么可能泄漏 Server-only Data

分析 Server Component props/serialization/client boundary。

### Lesson RE-SEC-011：Server Function 为什么每次都必须重新授权

把它当公开网络入口而不是“只能被自己组件调用”。

### Lesson RE-SEC-012：CSRF / Cookie Auth 与 Form/Server Action 的连接点

理解浏览器凭证自动携带带来的保护需求。

### Lesson RE-SEC-013：Sensitive Data 不应该进入哪些 React State / DevTools / Log

建立最小数据暴露原则。

### Lesson RE-SEC-014：综合 Threat Review——React 页面从 Input 到 Server Mutation

画出 trust boundary、验证点、渲染 sink 和授权点。

---

本 Module 不重复教授每个 Bug 的机制，而是建立跨 React 问题的系统诊断方法：症状分类、最小复现、DevTools、Profiler、Network、Heap、Source Map、Release/Trace 关联。

### Lesson RE-DEBUG-001：React Bug 应该先按哪几类症状分类

区分错误 UI、状态错位、重复 Render、卡顿、泄漏、异步乱序、Hydration、Chunk/Network。

### Lesson RE-DEBUG-002：如何制作最小 React Reproduction

删除业务噪音、固定数据和时间，保留导致问题的最小因果链。

### Lesson RE-DEBUG-003：Wrong Key Bug 的标准诊断路径

用 Component identity / mount log / DevTools 证明状态错位。

### Lesson RE-DEBUG-004：Infinite Render 与 Infinite Effect 怎么快速区分

根据调用栈、错误信息和 render/effect log 定位循环来源。

### Lesson RE-DEBUG-005：Stale Closure / Race 应该如何画时间线

让异步 Bug 从“偶现”变成可重复顺序问题。

### Lesson RE-DEBUG-006：Context Render Storm 如何用 Profiler 证明

定位 provider value 与 consumer 范围。

### Lesson RE-DEBUG-007：Chunk Load Failure 如何关联一次发布

结合 Network、asset hash、release、cache/CDN 信息定位。

### Lesson RE-DEBUG-008：Hydration Mismatch 应该从哪三份证据对比

比较 server HTML、client first render input、browser-modified DOM。

### Lesson RE-DEBUG-009：Suspense Waterfall 如何从 Network / Trace 看出来

识别串行资源启动。

### Lesson RE-DEBUG-010：Memory Leak 如何使用 Heap Snapshot / Retainer Path

定位 retained component data、DOM、listener、third-party instance。

### Lesson RE-DEBUG-011：Source Map 如何帮助线上 React Stack

把 minified stack 映射回源码和 release。

### Lesson RE-DEBUG-012：为什么“加 console.log”有时会误导并发问题

建立时间戳、render id、structured log 和 Profiler 证据优先。

### Lesson RE-DEBUG-013：Bug 修复以后如何防止回归

为每类问题选择 Unit/Integration/E2E/Performance regression evidence。

### Lesson RE-DEBUG-014：综合演练——随机抽取五类 React 故障完成定位报告

每个报告必须包含复现、证据、根因、修复、回归验证。

---
