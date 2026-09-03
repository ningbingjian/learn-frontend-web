# Module 11.02：JSX、Element、Component 与 Render Output

> Stage：[Stage 11：React 完整体系](../README.md)  
> 状态：✅ 8 / 8 完成  
> 前置 Module：[11.01 React 的问题模型与声明式 UI](../module11-01-react-problem-model/README.md)

---

## 1. Module 要解决的问题

Module 11.01 已经建立：

```text
State
→ Component Tree
→ Render Output
→ React 管理 Root 内 DOM
```

本 Module 进一步把以下对象彻底拆开：

```text
JSX Source
React Element
Component Function
Component Invocation
Render Output
Host DOM
```

最终链路：

```text
JSX Source
  ↓ compiler transform
React Element Description
  ↓ React 读取 element.type
Component Invocation（当 type 是组件时）
  ↓
Component Render Output
  ↓
React 继续展开 / 计算
  ↓
Host Element Description
  ↓ Commit
Browser DOM
```

完成本 Module 后，不能再把 `<App />`、`App()`、React Element、DOM Element、Render 与 Commit 当成同一个东西。

---

## 2. Owner Boundary

### 本 Module 完整负责

- JSX 是什么、为什么它不是 HTML。
- JSX 与 JavaScript Expression 的关系。
- JSX automatic runtime 的课程级转换模型。
- JSX 与 Element Factory 的概念关系。
- React Element 的 `type`、`props`、`key` 等公开心智模型。
- React Element 是 UI Description，而不是 DOM Node。
- 创建 Component Element 与调用 Component Function 的区别。
- React Node / Render Output 的第一层模型。
- Fragment、Conditional、Empty Node。
- `0 && UI` 条件渲染陷阱。
- Pure Render、Idempotency 与 Render-time Mutation。
- Render 与 Commit 的表层职责边界。
- 错误标签、Element Mutation、手工调用组件等综合故障。
- Element → Component → Render Output → Host Commit 的可观察证据链。

### 本 Module 只预览、不深入

- Props / Children 公共 API：11.03。
- State Snapshot、Update Queue、Batching：11.04。
- List / Key Identity：11.06。
- Effect：11.07。
- Ref / DOM Escape Hatch：11.08。
- Reconciliation、Fiber、Lane、Scheduler：11.22。
- DOM Renderer / Host Config 源码：11.23。
- Babel / SWC / Compiler AST 全体系：Stage 16。

---

## 3. 最终学习目标

完成本 Module 后，应能够：

1. 解释 JSX 与 React 是两个不同概念。
2. 把一段 JSX 写出课程级转换结果。
3. 区分 HTML Element、React Element、Component 与 DOM Node。
4. 使用 `isValidElement` 判断 React Element。
5. 解释 Host Element 与 Component Element 的 `type` 差异。
6. 证明创建 `<ReleaseCard />` 不等于立刻执行 `ReleaseCard()`。
7. 说明 string / number / Element / Fragment / array / null 等 Render Output。
8. 解释 `0 && <Panel />` 为什么可能显示 `0`。
9. 解释 Fragment 为什么不创建额外 Host Wrapper。
10. 解释 Pure Render 与 Idempotency。
11. 稳定复现 Render-time Mutation。
12. 区分 Component Render 与 Host DOM Commit。
13. 诊断错误标签、Element Mutation 与手工组件调用。
14. 使用 Console、React DevTools、Elements、Transform Output 与 MutationObserver 建立证据链。

---

## 4. 8 节完整课程

| 编号 | Lesson | 深度 | 核心问题 | 状态 |
|---|---|---|---|---|
| RE-1102-001 | [JSX 不是 HTML：从源码看到转换结果](./01-jsx-source-to-transform/README.md) | Must | JSX 在构建时到底变成什么 | ✅ |
| RE-1102-002 | [React Element：UI 描述对象不是 DOM](./02-react-element-description/README.md) | Must | JSX 产生的 Element 是什么对象 | ✅ |
| RE-1102-003 | [Component 何时调用，Render Output 到底是什么](./03-component-call-render-output/README.md) | Must | `<Comp />`、`Comp()` 与返回值有什么区别 | ✅ |
| RE-1102-004 | [JSX Expression、Fragment、Conditional 与 Empty Node](./04-jsx-expression-fragment-empty-node/README.md) | Must | JavaScript 值怎样进入 Render Output | ✅ |
| RE-1102-005 | [Pure Render、Idempotency 与 Render-time Mutation](./05-pure-render-idempotency-mutation/README.md) | Should | 为什么 Render 必须保持纯 | ✅ |
| RE-1102-006 | [Render vs Commit：从描述到 Host DOM](./06-render-vs-commit-host-dom/README.md) | Should | 组件执行和 DOM 写入为什么是两个阶段 | ✅ |
| RE-1102-007 | [Failure Lab：错误标签、Element Mutation 与手工调用组件](./07-failure-lab-tag-element-mutation-manual-call/README.md) | Should | 错误心智模型会制造什么故障 | ✅ |
| RE-1102-008 | [Module Project：Render Model Inspector](./08-module-project-render-model-inspector/README.md) | Must / Should | 串起 JSX → Element → Component → DOM | ✅ |

---

## 5. 完整学习链

```text
RE-1102-001
JSX Source → react/jsx-runtime
  ↓
RE-1102-002
React Element Description
  ↓
RE-1102-003
Component Element → Component Invocation → Render Output
  ↓
RE-1102-004
Expression / Conditional / Fragment / Empty Node
  ↓
RE-1102-005
Pure Render / Idempotency / Render-time Mutation
  ↓
RE-1102-006
Render Calculation ≠ Host DOM Commit
  ↓
RE-1102-007
Wrong Tag / Element Mutation / Manual Component Call
  ↓
RE-1102-008
Render Model Inspector / Project Report / Module Review
```

完成后必须能够明确写出：

```text
写 JSX ≠ 写 HTML
创建 <MyComponent /> ≠ 调用 MyComponent()
React Element ≠ DOM Element
Component Render ≠ DOM Commit
Fragment ≠ Host Wrapper
有效 Component Element ≠ 一定产生 Host DOM
Render 被重复执行 ≠ 允许重复副作用
Object.isFrozen 为 false ≠ 可以修改 Element
```

---

## 6. 综合 Failure Lab

RE-1102-007 同时制造三类故障。

### 6.1 错误标签

```text
小写 JSX / string type
→ React 按 Host Tag 处理
→ 预期 Component Boundary 不存在
```

核心证据：

- `typeof element.type`。
- Elements。
- React DevTools。

### 6.2 Element Mutation

```text
创建 Element
→ 直接修改 props
→ 破坏不可变 Description 契约
```

核心证据：

- `Object.isFrozen`。
- before / after。
- development exception。

### 6.3 手工调用组件

```text
Component(props)
→ 无 Hook 时可能暂时返回 Host Element
→ Component Boundary 消失
→ 加入 Hook 后触发 Invalid Hook Call
```

正确结论：

```text
组件虽然是 JavaScript 函数
但组件调用权属于 React
```

---

## 7. Module Project：Render Model Inspector

项目入口：

- [课程与操作说明](./08-module-project-render-model-inspector/README.md)
- [Project Report](./08-module-project-render-model-inspector/PROJECT_REPORT.md)
- [Module Review](./08-module-project-render-model-inspector/MODULE_REVIEW.md)

项目覆盖四类 Scenario：

```text
Host Element
Component Element
Fragment
Conditional Empty Node
```

并同时提供：

```text
JSX Source
Course-level Transform
Element Inspector
Component Console Evidence
Render Output Preview
MutationObserver Commit Evidence
```

两个关键对照：

```text
只请求 Render
→ Component Function 执行
→ Host DOM 可以不变

改变可见 Revision
→ Render 重新计算
→ Commit 必要 Host Mutation
```

---

## 8. 证据矩阵

| 问题 | 证据 |
|---|---|
| JSX 大致变成什么 | Transform Inspector / 编译输出 |
| 当前值是不是 React Element | `isValidElement` |
| Element 指向 Host 还是 Component | `typeof element.type` |
| Component Function 是否执行 | Console / breakpoint |
| Component Boundary 是否存在 | React DevTools |
| 最终 Host Node 是什么 | Elements |
| Root 内是否真实发生 DOM mutation | MutationObserver |
| Element 是否被 development freeze | `Object.isFrozen` |

一个重要原则：

```text
不要让一个工具回答它不负责的问题
```

例如 Console Render 日志不能单独证明 DOM Commit。

---

## 9. Module 最终验收

不看文档回答：

1. JSX 是 HTML 吗？
2. `jsx: react-jsx` 表示什么？
3. `<section />` 和 `<ReleaseCard />` 的 `type` 有什么区别？
4. 创建 `<ReleaseCard />` 时组件函数是否已经执行？
5. `42` 可以成为 React Node 吗？它是 React Element 吗？
6. `0 && <Panel />` 为什么可能显示 `0`？
7. Fragment 为什么不会出现在 Elements 中？
8. `null` 输出是否说明 Component 没有执行？
9. Render 中修改模块级数组为什么危险？
10. Strict Mode 是制造 impurity 的原因吗？
11. Component Function 重新执行是否证明 DOM 被修改？
12. 小写组件标签为什么不会建立预期组件边界？
13. Element 没有被冻结时能否安全 mutation？
14. 无 Hook 组件手工调用为什么是隐蔽故障？
15. MutationObserver 在 Inspector 中证明什么？
16. 哪些问题必须留给 Fiber / DOM Renderer 源码 Module？

---

## 10. Definition of Done

- [x] Module Owner Boundary。
- [x] 8 课轻规划。
- [x] RE-1102-001 JSX Transform。
- [x] RE-1102-002 React Element。
- [x] RE-1102-003 Component Invocation / Render Output。
- [x] RE-1102-004 Expression / Fragment / Empty Node。
- [x] RE-1102-005 Pure Render / Idempotency Failure。
- [x] RE-1102-006 Render / Commit Evidence。
- [x] RE-1102-007 综合 Failure Lab。
- [x] RE-1102-008 Render Model Inspector Project。
- [x] 每课完整 README 与独立源码。
- [x] Project Report。
- [x] Automated Verify。
- [x] Stage 11 CI：TypeScript strict + Production Build。
- [x] Scope / Depth / Evidence / Boundary Review。
- [x] Module Review。

---

## 11. 下一步

Module 11.02 已完成。下一 Module：

```text
Module 11.03
Props、Children、Composition 与 API Design
```

核心问题从“React 如何理解一棵 UI Description”升级为：

```text
组件边界已经建立后
数据、行为和 UI 结构如何穿过边界
才能形成稳定、可组合、可演进的公共 API？
```
