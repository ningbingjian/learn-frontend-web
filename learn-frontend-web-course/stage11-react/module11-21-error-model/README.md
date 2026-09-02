# Module 11.21：React Error Model

> [← Module 11.20：Resource Loading 与 Metadata](../module11-20-resource-metadata/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.22：React-specific Accessibility、Security 与 Debugging →](../module11-22-a11y-security-debugging/README.md)

本 Module 系统区分 Render、Event、Async、Resource、Route、Root、Server 错误，并设计 Error Boundary、Reset、Fallback 和 Production Reporting。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（12 课）</strong></summary>

- [RE-ERROR-001：React 应用中到底有哪些错误来源](#lesson-re-error-001)
- [RE-ERROR-002：Error Boundary 能捕获什么](#lesson-re-error-002)
- [RE-ERROR-003：Error Boundary 捕获不了什么](#lesson-re-error-003)
- [RE-ERROR-004：Nested Error Boundary 如何隔离局部页面](#lesson-re-error-004)
- [RE-ERROR-005：Error Fallback 应该如何提供 Recovery](#lesson-re-error-005)
- [RE-ERROR-006：Reset Error Boundary 与 State Identity 怎么连接](#lesson-re-error-006)
- [RE-ERROR-007：Suspense 与 Error Boundary 如何组合](#lesson-re-error-007)
- [RE-ERROR-008：Chunk Load Failure 应该怎么恢复](#lesson-re-error-008)
- [RE-ERROR-009：Root Error Callback 适合做什么 Observability](#lesson-re-error-009)
- [RE-ERROR-010：错误日志中不能遗漏哪些上下文](#lesson-re-error-010)
- [RE-ERROR-011：错误报告如何避免泄漏敏感数据](#lesson-re-error-011)
- [RE-ERROR-012：综合实现——多层 Error Recovery Architecture](#lesson-re-error-012)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-error-001"></a>
### Lesson RE-ERROR-001：React 应用中到底有哪些错误来源

建立 Render/Event/Async/Network/Resource/Server/Chunk 分类表。

<a id="lesson-re-error-002"></a>
### Lesson RE-ERROR-002：Error Boundary 能捕获什么

先使用课程提供的最小 TeachingErrorBoundary 验证 Render Error 的捕获范围，重点学习 Boundary 行为和恢复合同；其 Class Component 实现形态在 Module 11.33 再正式阅读。

<a id="lesson-re-error-003"></a>
### Lesson RE-ERROR-003：Error Boundary 捕获不了什么

验证 Event Handler、任意异步 callback 等边界。

<a id="lesson-re-error-004"></a>
### Lesson RE-ERROR-004：Nested Error Boundary 如何隔离局部页面

比较 App-level、Route-level、Widget-level fallback。

<a id="lesson-re-error-005"></a>
### Lesson RE-ERROR-005：Error Fallback 应该如何提供 Recovery

设计 retry/reset/back/reload/report，而不是只显示“出错了”。

<a id="lesson-re-error-006"></a>
### Lesson RE-ERROR-006：Reset Error Boundary 与 State Identity 怎么连接

用 key / state reset 重新创建失败子树。

<a id="lesson-re-error-007"></a>
### Lesson RE-ERROR-007：Suspense 与 Error Boundary 如何组合

同一 Resource pending/rejected 的两条路径。

<a id="lesson-re-error-008"></a>
### Lesson RE-ERROR-008：Chunk Load Failure 应该怎么恢复

模拟 lazy chunk 加载失败、版本发布和 reload/update UX。

<a id="lesson-re-error-009"></a>
### Lesson RE-ERROR-009：Root Error Callback 适合做什么 Observability

把 caught/uncaught/recoverable error 连接日志、trace、release 信息。

<a id="lesson-re-error-010"></a>
### Lesson RE-ERROR-010：错误日志中不能遗漏哪些上下文

Route、user-safe id、tenant、release、trace、feature flag、component stack。

<a id="lesson-re-error-011"></a>
### Lesson RE-ERROR-011：错误报告如何避免泄漏敏感数据

在 React-specific context 中建立 redaction 原则。

<a id="lesson-re-error-012"></a>
### Lesson RE-ERROR-012：综合实现——多层 Error Recovery Architecture

为 Enterprise SPA 配置 root/route/widget boundary 和统一报告合同。

---

> [← Module 11.20：Resource Loading 与 Metadata](../module11-20-resource-metadata/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.22：React-specific Accessibility、Security 与 Debugging →](../module11-22-a11y-security-debugging/README.md)
