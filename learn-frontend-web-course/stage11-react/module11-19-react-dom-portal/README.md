# Module 11.19：React DOM 与 Portal

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-18-performance-compiler/README.md)  > · [下一个 Module](../module11-20-resource-metadata/README.md)

本 Module 聚焦 React 与真实 HTML/SVG/Custom Element/DOM API 的边界，并一次讲清 flushSync 等宿主整合能力。

### Lesson RE-DOM-001：React DOM Props 如何映射到 Attribute / Property

比较 value、checked、className、data-*、aria-* 等行为。

### Lesson RE-DOM-002：React 中原生 HTML Element 的受控行为有哪些特殊点

连接 Input/Form/Select 的宿主属性同步。

### Lesson RE-DOM-003：Style Prop 与 CSS 字符串有什么差异

理解 object、单位、vendor field 和动态 style 的性能/可维护性。

### Lesson RE-DOM-004：SVG 在 React 中有什么宿主差异

处理属性命名、namespace 和常用图形元素。

### Lesson RE-DOM-005：Custom Element / Web Component 如何与 React 互操作

比较 property、attribute、custom event、ref 和 shadow DOM。

### Lesson RE-DOM-006：dangerouslySetInnerHTML 为什么是特殊 DOM Escape Hatch

只建立 DOM API 语义，完整安全在 Security Module。

### Lesson RE-DOM-007：React 什么时候直接保留、什么时候更新真实 DOM

通过 DevTools Mutation 观察 Reconciliation 结果而非全量替换。

### Lesson RE-DOM-008：flushSync 到底强制了什么

在需要 DOM 立即更新的第三方浏览器 API 场景验证同步 Commit。

### Lesson RE-DOM-009：flushSync 为什么会破坏性能与并发收益

用连续强制同步更新制造主线程问题。

### Lesson RE-DOM-010：综合实现——React 与 Custom Element / DOM API 混合页面

明确哪些边界由 Props、Ref、Event、flushSync 负责。

---

本 Module 用 Portal 深化“React Tree ≠ DOM Tree”，覆盖事件、Context、Focus、Stacking Context、Modal/Overlay 和 A11Y。

### Lesson RE-PORTAL-001：为什么有些 UI 需要脱离父 DOM 层级

从 overflow/stacking/modal overlay 建立问题背景。

### Lesson RE-PORTAL-002：第一个 createPortal

把 Child DOM 渲染到外部 container，同时仍属于原 React Tree。

### Lesson RE-PORTAL-003：Portal 中 Context 为什么仍然可用

证明 Context 沿 React Tree 而不是 DOM Tree 传播。

### Lesson RE-PORTAL-004：Portal Event 为什么会冒泡到 React Parent

比较 DOM parent 与 React parent 的事件路径。

### Lesson RE-PORTAL-005：Modal Focus Trap 应该怎么设计

处理初始焦点、Tab 循环、关闭后恢复焦点。

### Lesson RE-PORTAL-006：Escape / Outside Click 如何正确关闭 Overlay

处理传播、pointer event 和 nested overlay。

### Lesson RE-PORTAL-007：Stacking Context 与 z-index 为什么不是 Portal 自动解决一切

连接 CSS stacking/positioning。

### Lesson RE-PORTAL-008：SSR / Hydration 中 Portal 有什么边界

讨论目标 container 存在时机和 client-only overlay。

### Lesson RE-PORTAL-009：Portal A11Y 需要哪些语义

覆盖 dialog role、aria-modal、label、background inert 等。

### Lesson RE-PORTAL-010：综合实现——可访问 Modal / Tooltip / Toast Portal Layer

建立统一 overlay root、focus、event 和 cleanup 策略。

---
