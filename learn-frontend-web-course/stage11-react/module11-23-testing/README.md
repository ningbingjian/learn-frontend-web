# Module 11.23：React Testing Integration

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-22-a11y-security-debugging/README.md)  > · [下一个 Module](../module11-24-ssr-hydration-streaming/README.md)

本 Module 只覆盖 React-specific 测试方法，把 Component 行为、用户交互、Hook、Context、Router、Query、Suspense、Error Boundary、Timer 和 Hydration 的可验证性串起来。

### Lesson RE-TEST-001：React 测试应该验证实现还是用户行为

建立用户可观察输出优先原则。

### Lesson RE-TEST-002：第一个 Component Render Test

查询文本/role/label，而不是依赖 className/内部 State。

### Lesson RE-TEST-003：User Event 如何验证真实交互链

覆盖 click/type/keyboard/tab 与异步 UI。

### Lesson RE-TEST-004：如何测试 Controlled Form 与 Validation

验证用户输入、错误、submit、focus。

### Lesson RE-TEST-005：如何测试 Reducer / Pure State Logic

把纯业务转换脱离 React 快速验证。

### Lesson RE-TEST-006：如何测试 Context Consumer

通过最小 Provider wrapper 注入 dependency。

### Lesson RE-TEST-007：Custom Hook 什么时候值得单独测试

区分可通过组件行为覆盖与 library hook contract。

### Lesson RE-TEST-008：Router 测试如何建立 Memory History / Initial Entry

验证 route match、params、navigation、404/error。

### Lesson RE-TEST-009：Query 测试如何隔离 QueryClient

避免 cache 泄漏跨测试，并控制 retry/time。

### Lesson RE-TEST-010：Suspense 测试如何等待 fallback 与 reveal

验证 pending→content/error 路径。

### Lesson RE-TEST-011：Error Boundary 如何测试捕获与恢复

注入会失败的 child 并验证 retry/reset。

### Lesson RE-TEST-012：Fake Timer 什么时候适合，什么时候破坏真实调度

处理 debounce/timer，不把 React Scheduler 全部假掉。

### Lesson RE-TEST-013：Hydration / SSR React-specific Test 验证什么

比较 server markup、hydrate、recoverable warning。

### Lesson RE-TEST-014：建立 React Test Matrix

为 state/form/router/query/suspense/error/SSR 各定义最小必要测试层，完整质量工程后续 Stage 再扩展。

---
