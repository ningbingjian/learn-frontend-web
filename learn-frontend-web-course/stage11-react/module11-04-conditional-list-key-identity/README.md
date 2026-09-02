# Module 11.04：Conditional Rendering、List、Key 与 Identity

> [← Module 11.03：Component、Pure Render、Props 与 Composition](../module11-03-component-props-composition/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.05：React Event System →](../module11-05-event-system/README.md)

本 Module 从条件显示和列表渲染一路进入 Key、Identity、Reconciliation 前置模型，并在末尾自然完成第一个 React 综合项目。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（18 课）</strong></summary>

- [RE-LIST-001：条件 UI 的第一种写法——if 与提前 return](#lesson-re-list-001)
- [RE-LIST-002：三元表达式适合什么条件 UI](#lesson-re-list-002)
- [RE-LIST-003：`&&` 条件渲染有哪些陷阱](#lesson-re-list-003)
- [RE-LIST-004：数组为什么可以直接成为 React Children](#lesson-re-list-004)
- [RE-LIST-005：使用 map 从数据得到 Element 列表](#lesson-re-list-005)
- [RE-LIST-006：为什么 React 要求 Key](#lesson-re-list-006)
- [RE-LIST-007：什么才是 Stable Key](#lesson-re-list-007)
- [RE-LIST-008：Index Key 在什么情况下真的会出问题](#lesson-re-list-008)
- [RE-LIST-009：Random Key 为什么会让组件每次都重新开始](#lesson-re-list-009)
- [RE-LIST-010：Key 与 Component Identity / State Preservation 的连接](#lesson-re-list-010)
- [RE-LIST-011：列表删除、插入、重排时 React 在比较什么](#lesson-re-list-011)
- [RE-LIST-012：复杂条件与列表代码应该放在 JSX 里还是外面](#lesson-re-list-012)
- [RE-LIST-013：综合项目——React Product Catalog 需求与知识边界](#lesson-re-list-013)
- [RE-LIST-014：综合项目——设计 Product Catalog 的 Component Tree](#lesson-re-list-014)
- [RE-LIST-015：综合项目——实现分类、缺货状态和商品列表](#lesson-re-list-015)
- [RE-LIST-016：综合项目——主动制造错误 Key Bug](#lesson-re-list-016)
- [RE-LIST-017：综合项目——重构组件 API 与数据模型](#lesson-re-list-017)
- [RE-LIST-018：综合项目——从源码到生产构建完整验收](#lesson-re-list-018)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-list-001"></a>
### Lesson RE-LIST-001：条件 UI 的第一种写法——if 与提前 return

学习基于数据决定完整 UI 分支，理解 return null 和不渲染之间的关系。

<a id="lesson-re-list-002"></a>
### Lesson RE-LIST-002：三元表达式适合什么条件 UI

比较 if 与 ternary 的可读性边界，避免为了“短”把复杂业务逻辑塞进 JSX。

<a id="lesson-re-list-003"></a>
### Lesson RE-LIST-003：`&&` 条件渲染有哪些陷阱

主动制造 `0 && <Component />` 等问题，理解 JavaScript 表达式结果和 React Node 渲染规则之间的关系。

<a id="lesson-re-list-004"></a>
### Lesson RE-LIST-004：数组为什么可以直接成为 React Children

从数组 of Elements 到 JSX 列表，理解 React 如何接收一组 sibling children。

<a id="lesson-re-list-005"></a>
### Lesson RE-LIST-005：使用 map 从数据得到 Element 列表

建立“数据集合 → UI 描述集合”的声明式模型，并保持数据转换和 JSX 表达清晰。

<a id="lesson-re-list-006"></a>
### Lesson RE-LIST-006：为什么 React 要求 Key

从没有 Key 的警告入手，不先背规则，而是通过更新列表观察 React 为什么需要 sibling identity。

<a id="lesson-re-list-007"></a>
### Lesson RE-LIST-007：什么才是 Stable Key

比较 database id、业务 id、index、random key，理解稳定性、唯一范围和可预测 identity。

<a id="lesson-re-list-008"></a>
### Lesson RE-LIST-008：Index Key 在什么情况下真的会出问题

制造插入、删除、排序场景，并在行内加入可观察状态，看到状态为什么会对应错数据。

<a id="lesson-re-list-009"></a>
### Lesson RE-LIST-009：Random Key 为什么会让组件每次都重新开始

每次 Render 生成新 Key，观察 DOM/Component State 被重新创建，理解 Key 不只是消除 warning。

<a id="lesson-re-list-010"></a>
### Lesson RE-LIST-010：Key 与 Component Identity / State Preservation 的连接

把 Key 放到组件级切换场景，提前建立“type + position + key”决定 identity 的模型，完整机制留到 Module 11.13。

<a id="lesson-re-list-011"></a>
### Lesson RE-LIST-011：列表删除、插入、重排时 React 在比较什么

在不进入 Fiber 源码的前提下建立 Child Reconciliation 的高层模型，为后续 Reconciler Module 埋下清晰连接点。

<a id="lesson-re-list-012"></a>
### Lesson RE-LIST-012：复杂条件与列表代码应该放在 JSX 里还是外面

从可读性、可测试性和重复计算角度重构一个复杂商品列表，学习派生变量和渲染表达式的边界。

<a id="lesson-re-list-013"></a>
### Lesson RE-LIST-013：综合项目——React Product Catalog 需求与知识边界

确定商品目录需求、页面结构和验收标准，并明确项目只允许使用当前已经学习的 Component、JSX、Props、Children、Conditional、List、Key、CSS。

<a id="lesson-re-list-014"></a>
### Lesson RE-LIST-014：综合项目——设计 Product Catalog 的 Component Tree

从业务页面反推 ProductCatalog、CategorySection、ProductCard 等组件职责，画 Component Tree 和 Props Flow，不提前引入 State Manager、Router、Query、Effect。

<a id="lesson-re-list-015"></a>
### Lesson RE-LIST-015：综合项目——实现分类、缺货状态和商品列表

完成真实静态数据驱动的目录 UI，综合使用 Props、Composition、条件渲染和 List。

<a id="lesson-re-list-016"></a>
### Lesson RE-LIST-016：综合项目——主动制造错误 Key Bug

把正确 Key 改成 index/random，制造排序/重建问题，记录实际 UI / DOM 行为并解释根因。

<a id="lesson-re-list-017"></a>
### Lesson RE-LIST-017：综合项目——重构组件 API 与数据模型

检查 Props 是否过度、Component 边界是否合理、是否存在重复派生数据，完成第一次 React 组件设计重构。

<a id="lesson-re-list-018"></a>
### Lesson RE-LIST-018：综合项目——从源码到生产构建完整验收

从空目录重新复刻关键链路，运行开发模式和 production build，检查 Console、DOM、构建结果，并完整解释当前项目中 React 从数据到 DOM 的路径。

---

---

> [← Module 11.03：Component、Pure Render、Props 与 Composition](../module11-03-component-props-composition/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.05：React Event System →](../module11-05-event-system/README.md)
