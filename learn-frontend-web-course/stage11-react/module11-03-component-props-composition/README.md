# Module 11.03：Component、Pure Render、Props 与 Composition

> [← Module 11.02：JSX 与 React Object Model](../module11-02-jsx-object-model/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.04：Conditional Rendering、List、Key 与 Identity →](../module11-04-conditional-list-key-identity/README.md)

本 Module 从“会写函数组件”深入到 React 正确性规则。后续 State、Effect、Concurrency、Compiler 和 Fiber 都依赖这里建立的纯 Render 模型。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（22 课）</strong></summary>

- [RE-COMP-001：第一个真正可复用的 Function Component](#lesson-re-comp-001)
- [RE-COMP-002：Component Function 什么时候会重新执行](#lesson-re-comp-002)
- [RE-COMP-003：Render 到底是什么意思](#lesson-re-comp-003)
- [RE-COMP-004：Pure Render 为什么是 React 的硬规则](#lesson-re-comp-004)
- [RE-COMP-005：在 Render 中修改外部变量会发生什么](#lesson-re-comp-005)
- [RE-COMP-006：为什么不能在 Render 中直接调用会变化的随机/时间数据](#lesson-re-comp-006)
- [RE-COMP-007：StrictMode 到底在验证什么](#lesson-re-comp-007)
- [RE-COMP-008：Nested Component Definition 为什么会导致状态重置](#lesson-re-comp-008)
- [RE-COMP-009：Mutation 为什么经常让 React 推理失效](#lesson-re-comp-009)
- [RE-COMP-010：Rules of React 的统一心智模型](#lesson-re-comp-010)
- [RE-PROPS-001：第一个 Props](#lesson-re-props-001)
- [RE-PROPS-002：Props Destructuring、Default Value 与 Optional Props](#lesson-re-props-002)
- [RE-PROPS-003：Object / Array Props 为什么仍然是引用](#lesson-re-props-003)
- [RE-PROPS-004：Function Props 如何让 Child 请求 Parent 执行动作](#lesson-re-props-004)
- [RE-PROPS-005：Children 到底是不是一个特殊 Props](#lesson-re-props-005)
- [RE-PROPS-006：Composition 为什么通常优于大量配置 Props](#lesson-re-props-006)
- [RE-PROPS-007：Props 是只读的意味着什么](#lesson-re-props-007)
- [RE-PROPS-008：TypeScript 如何设计可靠 Props API](#lesson-re-props-008)
- [RE-PROPS-009：Controlled API 的概念从哪里来](#lesson-re-props-009)
- [RE-PROPS-010：Prop Drilling 是问题本身还是架构信号](#lesson-re-props-010)
- [RE-PROPS-011：组件公共 API 如何避免不断膨胀](#lesson-re-props-011)
- [RE-PROPS-012：综合重构——从硬编码卡片到可组合组件族](#lesson-re-props-012)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-comp-001"></a>
### Lesson RE-COMP-001：第一个真正可复用的 Function Component

从单文件 App 拆出独立组件，明确组件命名、文件职责、参数和返回 UI 描述的基本形式。

<a id="lesson-re-comp-002"></a>
### Lesson RE-COMP-002：Component Function 什么时候会重新执行

通过父组件更新、Props 更新和 State 更新观察函数重新调用，纠正“组件对象被修改”的错误心智模型。

<a id="lesson-re-comp-003"></a>
### Lesson RE-COMP-003：Render 到底是什么意思

区分 Component Render、React Render Phase 和浏览器 Paint，避免把“React render”简单理解为“屏幕刷新”。

<a id="lesson-re-comp-004"></a>
### Lesson RE-COMP-004：Pure Render 为什么是 React 的硬规则

通过相同输入产生不同结果的故障示例，解释纯函数、幂等、可重试 Render 与 Concurrent Rendering 的关系。

<a id="lesson-re-comp-005"></a>
### Lesson RE-COMP-005：在 Render 中修改外部变量会发生什么

主动制造全局变量累加、DOM 修改等副作用，观察重复 Render 后错误行为，并解释副作用为什么必须离开 Render。

<a id="lesson-re-comp-006"></a>
### Lesson RE-COMP-006：为什么不能在 Render 中直接调用会变化的随机/时间数据

使用 Date、Math.random 制造不稳定 UI，为 Hydration Mismatch、Memoization 和 Compiler 规则建立前置理解。

<a id="lesson-re-comp-007"></a>
### Lesson RE-COMP-007：StrictMode 到底在验证什么

观察开发环境中的额外 Render / Effect 检查，理解 StrictMode 是发现不纯逻辑和清理缺失的工具，不是“React 的 Bug”。

<a id="lesson-re-comp-008"></a>
### Lesson RE-COMP-008：Nested Component Definition 为什么会导致状态重置

在组件内部定义另一个组件并触发父更新，观察 Component Type Identity 变化，为后续 State Preservation 深入做准备。

<a id="lesson-re-comp-009"></a>
### Lesson RE-COMP-009：Mutation 为什么经常让 React 推理失效

从 Props/Object Mutation 的小例子观察不可预测行为，引出不可变数据和 Compiler/Concurrent React 对正确代码结构的要求。

<a id="lesson-re-comp-010"></a>
### Lesson RE-COMP-010：Rules of React 的统一心智模型

把 Pure Render、Hook Rules、不可变输入、Effect 边界等规则放在同一张图里解释“React 为什么需要这些约束”。

---

本 Module 不止讲“父传子”，还覆盖组件 API 设计、Composition、回调、不可变输入、TypeScript Props 和常见 API 失控问题。

<a id="lesson-re-props-001"></a>
### Lesson RE-PROPS-001：第一个 Props

从硬编码组件演进为可配置组件，理解 Component Definition 与每次 Element 创建时传入的 Props 数据。

<a id="lesson-re-props-002"></a>
### Lesson RE-PROPS-002：Props Destructuring、Default Value 与 Optional Props

学习默认值真正发生的位置、undefined 与缺省值行为，并用 TypeScript 明确 required / optional 合同。

<a id="lesson-re-props-003"></a>
### Lesson RE-PROPS-003：Object / Array Props 为什么仍然是引用

观察父组件每次创建新对象对 Props Identity 的影响，为后续 Memoization 和 Render Performance 建立前置知识。

<a id="lesson-re-props-004"></a>
### Lesson RE-PROPS-004：Function Props 如何让 Child 请求 Parent 执行动作

理解 Callback Props 不是“子改父”，而是父组件把能力通过函数传给子组件；建立事件上行的正确数据流模型。

<a id="lesson-re-props-005"></a>
### Lesson RE-PROPS-005：Children 到底是不是一个特殊 Props

比较显式 `children` 与普通 Props，理解文本、Element、多个 Children 和嵌套结构。

<a id="lesson-re-props-006"></a>
### Lesson RE-PROPS-006：Composition 为什么通常优于大量配置 Props

从一个布尔 Props 爆炸组件重构为 Composition，学习 slots-like composition、wrapper、layout 和 content injection。

<a id="lesson-re-props-007"></a>
### Lesson RE-PROPS-007：Props 是只读的意味着什么

主动修改 Props / nested object，讨论 JavaScript 引用可变性与 React 单向数据流之间的边界。

<a id="lesson-re-props-008"></a>
### Lesson RE-PROPS-008：TypeScript 如何设计可靠 Props API

覆盖 union、discriminated union、children 类型、event callback、generic props 的基础设计，重点避免 impossible props combination。

<a id="lesson-re-props-009"></a>
### Lesson RE-PROPS-009：Controlled API 的概念从哪里来

通过“父拥有值 + 子接收 value/onChange”建立 Controlled Component 前置模型，为 Form、Headless Component 做准备。

<a id="lesson-re-props-010"></a>
### Lesson RE-PROPS-010：Prop Drilling 是问题本身还是架构信号

通过多层传递例子分析何时保持显式 Props 更好、何时应 Composition、Context 或重新划分 Ownership，不提前直接把 Context 当答案。

<a id="lesson-re-props-011"></a>
### Lesson RE-PROPS-011：组件公共 API 如何避免不断膨胀

从 ProductCard 的真实需求演进中分析 boolean prop、mode prop、render prop、children composition 的取舍，为大型组件 API 设计建立早期经验。

<a id="lesson-re-props-012"></a>
### Lesson RE-PROPS-012：综合重构——从硬编码卡片到可组合组件族

把多个重复卡片重构为 ProductCard / ProductImage / ProductMeta / Action Area 等可组合结构，仅使用已经学过的 JSX、Component、Props 和 Children。

---

---

> [← Module 11.02：JSX 与 React Object Model](../module11-02-jsx-object-model/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.04：Conditional Rendering、List、Key 与 Identity →](../module11-04-conditional-list-key-identity/README.md)
