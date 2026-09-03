# Module 11.02 Review

## 1. Review 结论

Module 11.02 已形成完整闭环：

```text
JSX Syntax
→ Transform
→ React Element
→ Component Invocation
→ Render Output
→ Expression / Fragment / Empty Node
→ Pure Render
→ Render / Commit
→ Failure Lab
→ Render Model Inspector
```

结论：**通过 Module Definition of Done，可以进入 Module 11.03。**

---

## 2. Scope Review

### 已完整覆盖

- JSX 不是 HTML。
- JSX 与 JavaScript Expression。
- automatic JSX runtime 的课程级模型。
- React Element 是 UI Description。
- Host / Component Element Type。
- `props`、`key`、children 形态。
- 创建 Component Element 与调用 Component Function 的区别。
- Render Output / React Node 表层模型。
- Fragment、Conditional、Empty Node。
- `0 && UI` 陷阱。
- Pure Render、Idempotency、Render-time Mutation。
- Render 与 Commit 表层证据。
- 错误标签、Element Mutation、手工调用组件。

### 有意未深入

- Props / Children API 设计。
- State Snapshot / Update Queue / Batching。
- List / Key Identity。
- Effect / Ref。
- Reconciliation / Fiber / Lane / Scheduler。
- DOM Renderer / Host Config 源码。
- Babel / SWC / Compiler AST 实现。

这些内容继续由各自 Owner Module 负责。

---

## 3. Depth Review

每个核心概念都至少经过：

```text
Explanation
→ Runnable Example
→ Observable Evidence
→ Wrong Way / Failure
→ Debug Method
→ Boundary / Trade-off
```

不是只停留在：

```text
JSX 会编译
Element 是对象
组件是函数
```

而是已经能回答：

- 编译结果如何观察？
- Element Type 为什么决定 Host / Component？
- Component 何时由 React 调用？
- 哪些 JavaScript 值成为可见输出？
- 为什么 Render 需要纯？
- 如何证明 Render 没有 Commit？
- 错误心智模型如何制造真实故障？

---

## 4. Evidence Review

| 概念 | 证据 |
|---|---|
| JSX Transform | TypeScript transform inspector |
| React Element | `isValidElement`、type / props / key |
| Component Invocation | Console / breakpoint |
| Fragment | Elements 中无额外 wrapper |
| Empty Node | Preview 与 Elements |
| Render Impurity | Strict Mode 重复暴露共享 mutation |
| Render vs Commit | Console + MutationObserver |
| Component Boundary | React DevTools |
| Element Mutation | Freeze / exception / before-after |
| Manual Component Call | type 变化 + Invalid Hook Call |

证据链覆盖了源码、React 树、对象、浏览器 DOM 和运行日志多个层级。

---

## 5. Lesson Review

### RE-1102-001

建立 JSX Source → automatic runtime 的第一条链路。

### RE-1102-002

明确 React Element 是不可变 UI Description，不是 DOM Node。

### RE-1102-003

拆开 `<Component />`、Component Function 与 Render Output。

### RE-1102-004

建立 Expression、Conditional、Fragment、Empty Node 的值模型。

### RE-1102-005

通过 shared mutation 证明 Pure Render 的必要性。

### RE-1102-006

通过 Console / MutationObserver 证明 Render 不等于 Commit。

### RE-1102-007

把错误标签、Element Mutation、手工调用组件组合成综合 Failure Lab。

### RE-1102-008

以 Inspector 项目串起整个 Module，并输出 Project Report。

---

## 6. Common Misconceptions 已关闭

```text
[关闭] JSX 就是 HTML
[关闭] React Element 就是 DOM Element
[关闭] 创建 <Component /> 会立即调用函数
[关闭] 组件只能返回一个 DOM Element
[关闭] Fragment 会生成一个隐藏 div
[关闭] null 输出表示组件没有执行
[关闭] Strict Mode 制造了重复副作用
[关闭] Render 日志等于 DOM 更新次数
[关闭] Element 可以像普通 View Model 一样修改
[关闭] Component() 与 <Component /> 完全等价
```

---

## 7. Architecture Boundary

本 Module 使用：

- JSX runtime 表层概念。
- React Element 公开 API。
- Browser DOM 与 MutationObserver。
- React DevTools。

本 Module 没有把以下内部实现提前当成前置：

- Fiber 节点字段。
- Lane bitmask。
- Work Loop。
- Effect Flags。
- Host Config。
- Commit Mutation Effects 源码。

因此后续源码 Module 仍然拥有清晰的知识增量。

---

## 8. Definition of Done

```text
[x] 8 / 8 Lesson
[x] 每课详细 README
[x] 每课独立 package.json
[x] TypeScript strict
[x] Vite Production Build
[x] Failure Lab
[x] Module Project
[x] Project Report
[x] Automated Verify
[x] CI Matrix
[x] Scope Review
[x] Depth Review
[x] Evidence Review
[x] Boundary Review
```

---

## 9. 进入 Module 11.03 的条件

学习者应能不看文档解释：

1. JSX Source 与 React Element 的关系。
2. Host Element 与 Component Element 的区别。
3. `<Component />` 与 `Component()` 的区别。
4. Component Render Output 的合法形态。
5. Fragment 与 Empty Node。
6. Pure Render 为什么支撑重复计算。
7. Render Evidence 与 Commit Evidence 如何分别采集。
8. Element Mutation 和手工组件调用为什么不可维护。

满足后进入：

```text
Module 11.03
Props、Children、Composition 与 API Design
```

新的核心问题是：

```text
当组件边界已经正确建立后
数据和 UI 结构应该如何穿过边界
才能形成稳定、可组合、可演进的公共 API？
```
