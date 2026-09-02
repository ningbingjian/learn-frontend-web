# Module 11.09：React Form 完整体系

> [← Module 11.08：State Modeling 与 Ownership](../module11-08-state-modeling-ownership/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.10：Reducer、Context 与 State Architecture →](../module11-10-reducer-context-state-architecture/README.md)

本 Module 不把表单简化成 `value + onChange`。从原生 Form 行为、Controlled/Uncontrolled 一路覆盖多控件、IME、Validation、异步校验、动态字段、Draft、Autosave、性能、A11Y，并将 Order Editor 综合项目直接拆成连续 Lesson。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（28 课）</strong></summary>

- [RE-FORM-001：先理解浏览器原生 Form，再谈 React Form](#lesson-re-form-001)
- [RE-FORM-002：Controlled Input 的最小模型](#lesson-re-form-002)
- [RE-FORM-003：Uncontrolled Input 到底是什么](#lesson-re-form-003)
- [RE-FORM-004：Controlled 与 Uncontrolled 应该怎么选](#lesson-re-form-004)
- [RE-FORM-005：Input、Textarea、Select 的 React 行为差异](#lesson-re-form-005)
- [RE-FORM-006：Checkbox 与 Radio 为什么不能照搬 text input](#lesson-re-form-006)
- [RE-FORM-007：File Input 为什么天然更偏 Uncontrolled](#lesson-re-form-007)
- [RE-FORM-008：一个 onChange Handler 如何管理多个字段](#lesson-re-form-008)
- [RE-FORM-009：IME / Composition 对 React Form 有什么影响](#lesson-re-form-009)
- [RE-FORM-010：同步 Validation 应该在什么时候发生](#lesson-re-form-010)
- [RE-FORM-011：Touched、Dirty、Visited、Submitted 分别是什么](#lesson-re-form-011)
- [RE-FORM-012：异步 Validation 如何避免 Race Condition](#lesson-re-form-012)
- [RE-FORM-013：Server Error 应该如何映射回字段和表单](#lesson-re-form-013)
- [RE-FORM-014：Dynamic Field 与 Field Array 如何建模](#lesson-re-form-014)
- [RE-FORM-015：Draft 与 Reset 的语义怎么设计](#lesson-re-form-015)
- [RE-FORM-016：Autosave 为什么不是简单 setInterval](#lesson-re-form-016)
- [RE-FORM-017：大型 Controlled Form 为什么可能变慢](#lesson-re-form-017)
- [RE-FORM-018：Form A11Y 的 React-specific 连接点](#lesson-re-form-018)
- [RE-FORM-019：TypeScript 如何描述复杂 Form State](#lesson-re-form-019)
- [RE-FORM-020：什么时候值得引入 React Hook Form 等表单库](#lesson-re-form-020)
- [RE-FORM-021：综合项目——Order Editor 需求、数据模型和知识边界](#lesson-re-form-021)
- [RE-FORM-022：综合项目——设计 Order Editor 的 Component Tree 与 State Ownership](#lesson-re-form-022)
- [RE-FORM-023：综合项目——实现订单行增删改与金额派生](#lesson-re-form-023)
- [RE-FORM-024：综合项目——实现 Validation、Dirty、Reset 与错误展示](#lesson-re-form-024)
- [RE-FORM-025：综合项目——主动制造 Form State Bug](#lesson-re-form-025)
- [RE-FORM-026：综合项目——大型表单 Render 重构](#lesson-re-form-026)
- [RE-FORM-027：综合项目——从空目录复刻 Order Editor](#lesson-re-form-027)
- [RE-FORM-028：综合项目——Order Editor 完整验收](#lesson-re-form-028)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-form-001"></a>
### Lesson RE-FORM-001：先理解浏览器原生 Form，再谈 React Form

回顾 form、name、submit、FormData、默认提交和浏览器 Validation，明确 React 没有发明表单本身。

<a id="lesson-re-form-002"></a>
### Lesson RE-FORM-002：Controlled Input 的最小模型

从 `value + onChange + State` 建立 React 控制输入值的闭环，并观察忘记 onChange / value 为 undefined 等典型问题。

<a id="lesson-re-form-003"></a>
### Lesson RE-FORM-003：Uncontrolled Input 到底是什么

使用 `defaultValue`、DOM 自己保存当前值和提交时读取，比较它与 Controlled 的状态所有权差异。

<a id="lesson-re-form-004"></a>
### Lesson RE-FORM-004：Controlled 与 Uncontrolled 应该怎么选

从即时联动、复杂 Validation、超大表单、第三方组件和原生能力比较两种策略，不做教条结论。

<a id="lesson-re-form-005"></a>
### Lesson RE-FORM-005：Input、Textarea、Select 的 React 行为差异

系统实现文本、多行、单选 select、多选 select，并理解 value 类型和选项同步。

<a id="lesson-re-form-006"></a>
### Lesson RE-FORM-006：Checkbox 与 Radio 为什么不能照搬 text input

学习 checked/value、group semantics、boolean vs selected value，以及受控状态设计。

<a id="lesson-re-form-007"></a>
### Lesson RE-FORM-007：File Input 为什么天然更偏 Uncontrolled

理解浏览器安全限制、FileList、清空方式、Preview URL 生命周期，为上传 Module 前置。

<a id="lesson-re-form-008"></a>
### Lesson RE-FORM-008：一个 onChange Handler 如何管理多个字段

使用 name / computed property 更新对象，同时讨论“所有表单都塞一个大 Object State”何时开始失控。

<a id="lesson-re-form-009"></a>
### Lesson RE-FORM-009：IME / Composition 对 React Form 有什么影响

把 Event Module 的输入法知识真正放进搜索、字符限制、实时校验场景。

<a id="lesson-re-form-010"></a>
### Lesson RE-FORM-010：同步 Validation 应该在什么时候发生

比较 onChange、onBlur、onSubmit、Render-derived validation，避免每个规则都写 Effect。

<a id="lesson-re-form-011"></a>
### Lesson RE-FORM-011：Touched、Dirty、Visited、Submitted 分别是什么

建立表单 UX 状态模型，解释这些状态为什么不能和字段值混为一个概念。

<a id="lesson-re-form-012"></a>
### Lesson RE-FORM-012：异步 Validation 如何避免 Race Condition

模拟 username availability 请求，加入请求序号/取消前置，完整 Abort/Effect 方案在后续 Effect Module 再深入。

<a id="lesson-re-form-013"></a>
### Lesson RE-FORM-013：Server Error 应该如何映射回字段和表单

设计 field error、form error、global error，并处理服务器返回错误后用户继续编辑的生命周期。

<a id="lesson-re-form-014"></a>
### Lesson RE-FORM-014：Dynamic Field 与 Field Array 如何建模

实现可增删订单行，正确处理 Stable Key、字段 State 和 Validation。

<a id="lesson-re-form-015"></a>
### Lesson RE-FORM-015：Draft 与 Reset 的语义怎么设计

区分初始值、已保存值、当前编辑值、Reset、Cancel、Switch Entity，连接 Component Identity / Key Reset。

<a id="lesson-re-form-016"></a>
### Lesson RE-FORM-016：Autosave 为什么不是简单 setInterval

先从 dirty detection、debounce、pending、last saved、failure、conflict 的状态模型分析需求，避免过早引入 Effect。

<a id="lesson-re-form-017"></a>
### Lesson RE-FORM-017：大型 Controlled Form 为什么可能变慢

用数十/数百字段观察 Render 范围、State Colocation、Component Split，性能工具完整使用留到 Performance Module。

<a id="lesson-re-form-018"></a>
### Lesson RE-FORM-018：Form A11Y 的 React-specific 连接点

覆盖 label/id、aria-describedby、error announcement、focus invalid field、dynamic errors 和 `useId` 前置。

<a id="lesson-re-form-019"></a>
### Lesson RE-FORM-019：TypeScript 如何描述复杂 Form State

使用 discriminated union、field model、error type 和 domain value，避免 stringly-typed form。

<a id="lesson-re-form-020"></a>
### Lesson RE-FORM-020：什么时候值得引入 React Hook Form 等表单库

从注册模型、uncontrolled strategy、validation ecosystem、bundle、team complexity 讨论选型；这里只建立边界，不把第三方库变成课程主线。

<a id="lesson-re-form-021"></a>
### Lesson RE-FORM-021：综合项目——Order Editor 需求、数据模型和知识边界

设计订单头、订单行、价格、数量、校验、Dirty/Reset 等需求，列出当前允许使用的 React 能力和明确禁止的未来 Router/Query/Effect 技术。

<a id="lesson-re-form-022"></a>
### Lesson RE-FORM-022：综合项目——设计 Order Editor 的 Component Tree 与 State Ownership

把 State Modeling Map 落到 OrderEditor、OrderHeader、LineList、LineEditor、Summary 等组件，明确每份状态放置位置。

<a id="lesson-re-form-023"></a>
### Lesson RE-FORM-023：综合项目——实现订单行增删改与金额派生

综合 Event、State、Immutable Update、List/Key、Derived State，禁止存冗余 total。

<a id="lesson-re-form-024"></a>
### Lesson RE-FORM-024：综合项目——实现 Validation、Dirty、Reset 与错误展示

完成字段/表单级校验和完整 UX 状态，不引入未来表单库隐藏机制。

<a id="lesson-re-form-025"></a>
### Lesson RE-FORM-025：综合项目——主动制造 Form State Bug

制造 duplicate state、wrong key、props-to-state sync、mutation 等问题，用当前已学模型逐个定位。

<a id="lesson-re-form-026"></a>
### Lesson RE-FORM-026：综合项目——大型表单 Render 重构

使用 State Colocation、Component Boundary 和数据建模降低无意义 Render，并记录 before/after 行为。

<a id="lesson-re-form-027"></a>
### Lesson RE-FORM-027：综合项目——从空目录复刻 Order Editor

不查看最终源码重新搭建核心功能，证明不是只会在上一课 Diff 上继续修改。

<a id="lesson-re-form-028"></a>
### Lesson RE-FORM-028：综合项目——Order Editor 完整验收

运行测试、键盘操作、IME、Validation、生产构建，输出 Component Tree、State Ownership Map 和已知限制。

---

---

> [← Module 11.08：State Modeling 与 Ownership](../module11-08-state-modeling-ownership/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.10：Reducer、Context 与 State Architecture →](../module11-10-reducer-context-state-architecture/README.md)
