# Module 11.18：Profiling、Render Performance、Memoization 与 React Compiler

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-17-concurrent-suspense-activity/README.md)  > · [下一个 Module](../module11-19-react-dom-portal/README.md)

本 Module 建立证据驱动的 React 性能诊断方法，而不是先背 memo/useMemo。

### Lesson RE-PROF-001：React 性能优化为什么必须先测量

区分 Render 次数、Render 成本、Commit 成本和用户体验指标。

### Lesson RE-PROF-002：React DevTools Components 面板如何读

观察 Props、State、Hooks、Context 和 Component Tree。

### Lesson RE-PROF-003：Profiler Flamegraph 怎么看

识别 commit 中哪些 Component Render 以及耗时分布。

### Lesson RE-PROF-004：Ranked View 适合回答什么问题

快速定位单次 Commit 最昂贵组件。

### Lesson RE-PROF-005：为什么组件会 Render

使用 render reason / props/state/context 变化定位传播根因。

### Lesson RE-PROF-006：Mount 与 Update 性能应该分开看

首次渲染和交互更新通常有不同瓶颈。

### Lesson RE-PROF-007：React Performance Tracks 与 Browser Performance 怎么对齐

把 React 工作与 Main Thread、Long Task、Paint、INP 时间线连接。

### Lesson RE-PROF-008：CPU Throttling 为什么能更早暴露问题

在低端设备近似环境验证交互响应性。

### Lesson RE-PROF-009：User Timing / Performance Mark 如何标注业务动作

把“保存订单”“切换大 Tab”与性能 Trace 对齐。

### Lesson RE-PROF-010：Profiler 本身的开销和测量误区

避免用开发模式数字直接代表生产真实性能。

### Lesson RE-PROF-011：建立一份 React Performance Baseline

为 Workbench 记录交互、commit、INP、long task、memory 基线。

### Lesson RE-PROF-012：从一次慢交互生成可复现性能报告

固定步骤、数据规模、设备条件和 before/after 证据。

---

本 Module 系统分析 Render Propagation、State Locality、Props/Context Identity、Selector、Virtualization、List、Expensive Computation、Memory 与 Bundle 的 React-specific 连接。

### Lesson RE-PERF-001：父组件 Render 为什么通常会让子树重新计算

建立 Render Propagation 高层模型，不把它误解为 DOM 全量重建。

### Lesson RE-PERF-002：Render 多不一定慢，Render 少也不一定快

比较廉价大量 render 与单个昂贵 component。

### Lesson RE-PERF-003：State Colocation 如何缩小更新传播范围

把顶层 State 下沉到真正 owner，并用 Profiler 验证。

### Lesson RE-PERF-004：Component Boundary 如何隔离昂贵子树

在组件拆分和数据 ownership 之间找性能/可维护性平衡。

### Lesson RE-PERF-005：Props Identity 为什么影响 Memoized Child

观察新对象、新函数和 primitive prop。

### Lesson RE-PERF-006：Context Broadcast 如何形成 Render Storm

用巨大 Provider value 制造全树更新，并比较 Context Split / selector/store。

### Lesson RE-PERF-007：Derived Calculation 什么时候真的昂贵

先测量，再决定是否 memoize/预计算/worker。

### Lesson RE-PERF-008：Large List 为什么不能只靠 memo

理解 DOM 数量、Layout/Paint 和 virtualization。

### Lesson RE-PERF-009：Virtualization 的核心 trade-off

处理 dynamic height、scroll restoration、A11Y、search/find 和 overscan。

### Lesson RE-PERF-010：图片/图表/Canvas 组件如何避免 React 主线程压力

区分 React Render 成本与浏览器绘制/第三方库成本。

### Lesson RE-PERF-011：Long Task 与 React Render 如何连接

在 Performance Trace 定位 JS work、render phase、commit。

### Lesson RE-PERF-012：INP 慢一定是 React 的问题吗

区分 event handler、React render、layout、network 和 browser work。

### Lesson RE-PERF-013：Memory Retention 与“Render 性能”有什么不同

建立 detached DOM、cache、closure、third-party instance 的内存诊断边界。

### Lesson RE-PERF-014：Code Splitting 对 React 性能解决什么问题

区分 startup/download/parse 与交互 render。

### Lesson RE-PERF-015：性能优化如何避免改变业务正确性

为 memo/cache/virtualization 建回归测试和性能预算。

### Lesson RE-PERF-016：综合重构——修复 Workbench 的 Context Storm、Large List 与 Long Task

提交 Profiler/Trace before-after，而不是只提交“优化后代码”。

---

本 Module 一次讲透 memo、useMemo、useCallback 的语义、成本、依赖和错误优化，并为 React Compiler 做迁移前置。

### Lesson RE-MEMO-001：Memoization 到底缓存什么

区分 component result reuse、calculation result reuse、function identity reuse。

### Lesson RE-MEMO-002：第一个 React.memo

验证 Props 相同情况下跳过子 Component Render。

### Lesson RE-MEMO-003：memo 的浅比较意味着什么

制造 object/function prop 每次新 identity 导致 memo 失效。

### Lesson RE-MEMO-004：useMemo 什么时候真正有价值

缓存昂贵纯计算或稳定对象，而不是为了“看起来高级”。

### Lesson RE-MEMO-005：useCallback 并不会让函数执行更快

理解它只缓存 function identity。

### Lesson RE-MEMO-006：Dependency 写错为什么会缓存错误结果

制造 stale memo / stale callback 并由 Linter/测试发现。

### Lesson RE-MEMO-007：Memoization 本身有什么 CPU / Memory / Complexity 成本

建立“缓存也要付钱”的模型。

### Lesson RE-MEMO-008：什么时候移动 State / 拆 Component 比 memo 更好

优先结构优化而不是到处加缓存。

### Lesson RE-MEMO-009：自定义 arePropsEqual 为什么危险

讨论深比较、函数闭包和漏字段正确性风险。

### Lesson RE-MEMO-010：综合实验——Bad Memo Optimization

制造 memo 更多但更慢/更难维护的页面，再恢复到证据驱动策略。

---

本 Module 完整覆盖 Compiler 目标、自动 Memoization、Rules of React、Build Integration、Diagnostics、Bailout、Directive、Library、渐进迁移和 Benchmark，并完成性能段综合项目。

### Lesson RE-COMPILER-001：React Compiler 为什么存在

从手工 memoization 的认知成本和编译期分析能力理解目标。

### Lesson RE-COMPILER-002：Compiler 自动优化的心智模型

认识它如何利用代码规则推断可复用计算/组件，而不是把它理解成“自动加 useMemo”。

### Lesson RE-COMPILER-003：为什么 Rules of React 对 Compiler 更重要

把 pure render、immutability、hook rules 与静态分析连接起来。

### Lesson RE-COMPILER-004：在 Vite React 项目中启用 Compiler

完成正式 build integration，并验证产物/诊断。

### Lesson RE-COMPILER-005：如何确认某个组件真的被 Compiler 优化

使用 DevTools/编译输出/Profiler 建立验证方法。

### Lesson RE-COMPILER-006：Compiler Bailout 是什么

故意写不满足规则的代码，观察诊断和 fallback 行为。

### Lesson RE-COMPILER-007：eslint-plugin-react-hooks 如何帮助 Compiler-ready Code

把规则问题提前变成开发反馈。

### Lesson RE-COMPILER-008：`"use memo"` Directive 应该什么时候用

理解 opt-in/调试/边界场景，而不是全文件滥加。

### Lesson RE-COMPILER-009：`"use no memo"` Directive 应该什么时候用

用于兼容/定位问题，并明确不是永久逃避代码质量。

### Lesson RE-COMPILER-010：Manual memo 与 Compiler 如何共存

比较保留、删除和渐进迁移策略。

### Lesson RE-COMPILER-011：第三方 Library 与 Compiler Compatibility

理解 library precompilation、published output 和消费方版本边界。

### Lesson RE-COMPILER-012：Compiler 对 Mutation / Dynamic Pattern 有什么限制

用实际诊断连接到前面 pure/immutable 课程。

### Lesson RE-COMPILER-013：Compiler 优化是否一定让应用更快

用真实 workload 测量 CPU、memory、bundle 和 interaction，不以启用成功为验收。

### Lesson RE-COMPILER-014：大型旧项目如何渐进启用 Compiler

设计目录/feature pilot、metrics、exception 和 rollback。

### Lesson RE-COMPILER-015：Compiler 回归如何 Debug

固定 case、比较 compiled/uncompiled、最小复现和版本锁定。

### Lesson RE-COMPILER-016：综合项目——建立 Workbench Compiler Baseline

记录启用前后的 Profiler、INP、render count 和 bundle。

### Lesson RE-COMPILER-017：综合项目——删除无价值 Manual Memo

基于 Compiler 与测量逐个删/留 memo/useMemo/useCallback。

### Lesson RE-COMPILER-018：综合项目——性能段完整验收

提交 Context Storm、Large List、Long Task、Memo、Compiler 的 before-after 证据与决策说明。

---
