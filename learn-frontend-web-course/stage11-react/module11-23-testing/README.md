# Module 11.23：React Testing Integration

> [← Module 11.22：React-specific Accessibility、Security 与 Debugging](../module11-22-a11y-security-debugging/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.24：SSR、Hydration、Streaming 与 Prerender →](../module11-24-ssr-hydration-streaming/README.md)

本 Module 只覆盖 React-specific 测试方法，把 Component 行为、用户交互、Hook、Context、Router、Query、Suspense、Error Boundary、Timer 和 Hydration 的可验证性串起来。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（14 课）</strong></summary>

- [RE-TEST-001：React 测试应该验证实现还是用户行为](#lesson-re-test-001)
- [RE-TEST-002：第一个 Component Render Test](#lesson-re-test-002)
- [RE-TEST-003：User Event 如何验证真实交互链](#lesson-re-test-003)
- [RE-TEST-004：如何测试 Controlled Form 与 Validation](#lesson-re-test-004)
- [RE-TEST-005：如何测试 Reducer / Pure State Logic](#lesson-re-test-005)
- [RE-TEST-006：如何测试 Context Consumer](#lesson-re-test-006)
- [RE-TEST-007：Custom Hook 什么时候值得单独测试](#lesson-re-test-007)
- [RE-TEST-008：Router 测试如何建立 Memory History / Initial Entry](#lesson-re-test-008)
- [RE-TEST-009：Query 测试如何隔离 QueryClient](#lesson-re-test-009)
- [RE-TEST-010：Suspense 测试如何等待 fallback 与 reveal](#lesson-re-test-010)
- [RE-TEST-011：Error Boundary 如何测试捕获与恢复](#lesson-re-test-011)
- [RE-TEST-012：Fake Timer 什么时候适合，什么时候破坏真实调度](#lesson-re-test-012)
- [RE-TEST-013：Hydration / SSR React-specific Test 验证什么](#lesson-re-test-013)
- [RE-TEST-014：建立 React Test Matrix](#lesson-re-test-014)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-test-001"></a>
### Lesson RE-TEST-001：React 测试应该验证实现还是用户行为

建立用户可观察输出优先原则。

<a id="lesson-re-test-002"></a>
### Lesson RE-TEST-002：第一个 Component Render Test

查询文本/role/label，而不是依赖 className/内部 State。

<a id="lesson-re-test-003"></a>
### Lesson RE-TEST-003：User Event 如何验证真实交互链

覆盖 click/type/keyboard/tab 与异步 UI。

<a id="lesson-re-test-004"></a>
### Lesson RE-TEST-004：如何测试 Controlled Form 与 Validation

验证用户输入、错误、submit、focus。

<a id="lesson-re-test-005"></a>
### Lesson RE-TEST-005：如何测试 Reducer / Pure State Logic

把纯业务转换脱离 React 快速验证。

<a id="lesson-re-test-006"></a>
### Lesson RE-TEST-006：如何测试 Context Consumer

通过最小 Provider wrapper 注入 dependency。

<a id="lesson-re-test-007"></a>
### Lesson RE-TEST-007：Custom Hook 什么时候值得单独测试

区分可通过组件行为覆盖与 library hook contract。

<a id="lesson-re-test-008"></a>
### Lesson RE-TEST-008：Router 测试如何建立 Memory History / Initial Entry

验证 route match、params、navigation、404/error。

<a id="lesson-re-test-009"></a>
### Lesson RE-TEST-009：Query 测试如何隔离 QueryClient

避免 cache 泄漏跨测试，并控制 retry/time。

<a id="lesson-re-test-010"></a>
### Lesson RE-TEST-010：Suspense 测试如何等待 fallback 与 reveal

验证 pending→content/error 路径。

<a id="lesson-re-test-011"></a>
### Lesson RE-TEST-011：Error Boundary 如何测试捕获与恢复

注入会失败的 child 并验证 retry/reset。

<a id="lesson-re-test-012"></a>
### Lesson RE-TEST-012：Fake Timer 什么时候适合，什么时候破坏真实调度

处理 debounce/timer，不把 React Scheduler 全部假掉。

<a id="lesson-re-test-013"></a>
### Lesson RE-TEST-013：Hydration / SSR React-specific Test 验证什么

比较 server markup、hydrate、recoverable warning。

<a id="lesson-re-test-014"></a>
### Lesson RE-TEST-014：建立 React Test Matrix

为 state/form/router/query/suspense/error/SSR 各定义最小必要测试层，完整质量工程后续 Stage 再扩展。

---

---

> [← Module 11.22：React-specific Accessibility、Security 与 Debugging](../module11-22-a11y-security-debugging/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.24：SSR、Hydration、Streaming 与 Prerender →](../module11-24-ssr-hydration-streaming/README.md)
