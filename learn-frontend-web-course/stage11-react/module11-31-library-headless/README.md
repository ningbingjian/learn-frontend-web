# Module 11.31：React Library 与 Headless Component Architecture

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-30-server-renderer-hydration-rsc-internals/README.md)  > · [下一个 Module](../module11-32-large-scale-microfrontend/README.md)

本 Module 从公共 API、Package Entry、Exports、Types、ESM、Peer React、Tree Shaking、SSR/RSC/Compiler Compatibility、Testing、Release 和版本治理建设可消费 React Library。

### Lesson RE-LIB-001：应用代码与 Library 代码的约束为什么不同

Library 无法控制消费者 bundler、React version、SSR 环境和 TS config。

### Lesson RE-LIB-002：设计 Library Public API Surface

只暴露稳定入口，避免消费者 deep import 内部文件。

### Lesson RE-LIB-003：package.json exports 如何设计

处理 root/subpath、types、import 条件和内部隐藏。

### Lesson RE-LIB-004：为什么 React 必须通常放 peerDependencies

避免 Library 打包第二份 React 造成 Hook/Context 问题。

### Lesson RE-LIB-005：ESM-first Library 如何构建

设计 source → dist、module format、target 和 source map。

### Lesson RE-LIB-006：Type Declaration 如何发布

生成 .d.ts、public type、generic props 和 API contract。

### Lesson RE-LIB-007：Tree Shaking 需要 Library 配合什么

处理 sideEffects、barrel、top-level side effect。

### Lesson RE-LIB-008：CSS / Asset 应该如何跟 React Library 一起发布

比较 CSS file、CSS-in-JS、token、consumer bundling。

### Lesson RE-LIB-009：React 19 ref / Actions / Compiler Compatibility 如何声明

根据实际使用 API 设计 minimum peer version。

### Lesson RE-LIB-010：SSR-safe Library 必须避免什么

顶层 window/document、random first render、layout-only assumption。

### Lesson RE-LIB-011：RSC-compatible Library 如何区分 Server/Client Entry

避免无意把整个包标成 client-only。

### Lesson RE-LIB-012：Compiler-precompiled Library 的消费边界

按正式版本验证发布产物和 fallback。

### Lesson RE-LIB-013：Library Test Matrix 应覆盖什么

React versions、TS types、browser behavior、SSR、bundle consumer。

### Lesson RE-LIB-014：SemVer 对 Component Props/API 意味着什么

识别 rename/default behavior/DOM output 等 breaking change。

### Lesson RE-LIB-015：如何做 Changeset / Release / Canary

建立 package version、changelog、pre-release 和 rollback。

### Lesson RE-LIB-016：综合项目——发布一个 React Utility + Component Package

由两个独立消费项目安装、SSR/Client 使用、升级和验证 tree shaking/types。

---

本 Module 负责 React-specific Headless Component：State/Behavior/DOM/A11Y/Style 分离、Controlled API、Composition、Compound Pattern、Portal/Focus、Positioning、Adapter 和版本合同。

### Lesson RE-HEADLESS-001：Headless UI 到底“无头”在哪里

分离行为/状态/A11Y 与视觉样式。

### Lesson RE-HEADLESS-002：先从一个 Toggle 的 State Machine 开始

定义状态、事件、keyboard、ARIA，不绑定具体 CSS。

### Lesson RE-HEADLESS-003：Controlled / Uncontrolled 双模式怎么设计

处理 value/defaultValue/onChange 和 ownership。

### Lesson RE-HEADLESS-004：Compound Component 如何共享行为上下文

设计 Root/Trigger/Content/Item API。

### Lesson RE-HEADLESS-005：Render Prop / Function-as-child 什么时候仍有价值

比较 Composition 和 DOM control flexibility。

### Lesson RE-HEADLESS-006：Polymorphic `as` API 有哪些类型/A11Y 风险

避免随意换元素破坏语义和 ref 类型。

### Lesson RE-HEADLESS-007：Focus Management 应该属于行为层

实现 roving tabindex / focus restore。

### Lesson RE-HEADLESS-008：Portal / Overlay / Positioning 如何进入 Headless Architecture

把 DOM placement 与视觉样式分离。

### Lesson RE-HEADLESS-009：Keyboard Interaction 如何按 WAI-ARIA Pattern 实现

为 Menu/Listbox/Dialog 等建立行为合同。

### Lesson RE-HEADLESS-010：Headless API 如何支持 React Server/Client Boundary

把交互组件 client 化但保持 server-renderable composition。

### Lesson RE-HEADLESS-011：Headless Component 如何做 Stable Public API

控制 props、context、imperative handle 和 data attribute。

### Lesson RE-HEADLESS-012：Headless Component 如何测试

覆盖行为、键盘、ARIA、controlled/uncontrolled，不依赖样式。

### Lesson RE-HEADLESS-013：综合项目——实现 Headless Select / Dialog

覆盖状态机、keyboard、portal、focus 和 typed API。

### Lesson RE-HEADLESS-014：Design System Adapter 如何消费 Headless Primitive

只做 React adapter 连接，组织级 Design System 治理留后续 Owner Stage。

---
