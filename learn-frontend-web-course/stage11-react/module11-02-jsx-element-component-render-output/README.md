# Module 11.02：JSX、Element、Component 与 Render Output

> Stage：[Stage 11：React 完整体系](../README.md)  
> 状态：🚧 建设中，已交付 6 / 8  
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

本 Module 把下面这些对象彻底拆清楚：

```text
JSX Source
React Element
Component Function
Component Invocation
Render Output
Host DOM
```

核心链路：

```text
JSX Source
  ↓ compiler transform
React Element Description
  ↓ React 读取 element.type
Component Invocation（当 type 是组件时）
  ↓
Component Render Output
  ↓
React 继续展开 / 协调
  ↓
Host Element Description
  ↓ Commit
Browser DOM
```

完成本 Module 后，不能再把 `<App />`、`App()`、React Element、DOM Element 与 Fiber 当成同一个东西。

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
- Pure Render、Idempotency 与 Render-time Mutation。
- Render 与 Commit 的表层职责边界。
- Element → Component → Host Output 的可观察证据链。

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

## 3. 学习目标

完成本 Module 后，应能够：

1. 解释 JSX 与 React 是两个不同概念。
2. 把一段 JSX 写出课程级转换结果。
3. 区分 HTML Element、React Element、Component 与 DOM Node。
4. 使用 `isValidElement` 判断 React Element。
5. 解释 Host Element 与 Component Element 的 `type` 差异。
6. 证明创建 `<ReleaseCard />` 不等于立刻执行 `ReleaseCard()`。
7. 说明 string / number / Element / Fragment / array / null 等 Render Output。
8. 解释 `0 && <Panel />` 的陷阱。
9. 解释 Fragment 为什么不创建额外 Host Wrapper。
10. 解释 Pure Render 与 Idempotency。
11. 稳定复现 Render-time Mutation。
12. 区分 Component Render 与 Host DOM Commit。
13. 使用 Console / React DevTools / Elements / MutationObserver 建立证据链。

---

## 4. Lesson 规划

| 编号 | Lesson | 深度 | 核心问题 | 状态 |
|---|---|---|---|---|
| RE-1102-001 | JSX 不是 HTML：从源码看到转换结果 | Must | JSX 在构建时到底变成什么 | ✅ |
| RE-1102-002 | React Element：UI 描述对象不是 DOM | Must | JSX 产生的 Element 是什么对象 | ✅ |
| RE-1102-003 | Component 何时调用，Render Output 到底是什么 | Must | `<Comp />`、`Comp()` 与返回值有什么区别 | ✅ |
| RE-1102-004 | JSX Expression、Fragment、Conditional 与 Empty Node | Must | JavaScript 值怎样进入 Render Output | ✅ |
| RE-1102-005 | Pure Render、Idempotency 与 Render-time Mutation | Should | 为什么 Render 必须保持纯 | ✅ |
| RE-1102-006 | Render vs Commit：从描述到 Host DOM | Should | 组件执行和 DOM 写入为什么是两个阶段 | ✅ |
| RE-1102-007 | Failure Lab：错误标签、Element Mutation 与手工调用组件 | Should | 错误心智模型会制造什么故障 | ⏳ |
| RE-1102-008 | Module Project：Render Model Inspector | Must/Should | 串起 JSX → Element → Component → DOM | ⏳ |

---

## 5. 当前 6 课学习链

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
```

完成前 6 课后，应能明确写出：

```text
写 JSX ≠ 写 HTML
创建 <MyComponent /> ≠ 调用 MyComponent()
React Element ≠ DOM Element
Component Render ≠ DOM Commit
Fragment ≠ Host Wrapper
Render 被重复执行 ≠ 允许重复副作用
```

---

## 6. 本批关键实验

### RE-1102-004

观察：

```text
JavaScript Expression
→ React Node
```

并验证：

- ternary。
- `&&`。
- `0 && UI`。
- `null / false / undefined`。
- Fragment 不产生额外 DOM。

### RE-1102-005

在 Strict Mode 中故意执行：

```tsx
sharedMutableChecks.push(...)
```

观察同一组件仅因 Render 次数增加就污染外部数组。

### RE-1102-006

使用两类独立证据：

```text
Console
→ Render evidence

MutationObserver
→ Host DOM mutation evidence
```

稳定证明：

```text
Render 可以发生
但 DOM 可以完全不变
```

---

## 7. Module Project

### Render Model Inspector

最终项目必须能观察：

```text
JSX Source
→ 转换后的 Element Factory 调用
→ Element.type / props / key
→ Component Call Log
→ Render Output
→ Render-time Failure
→ Commit Evidence
→ 最终 DOM
```

### 强制交付

- JSX 与无 JSX 写法对照。
- Host Element 与 Component Element 对照。
- `isValidElement` 与 React Node 对照。
- Component 调用时间线。
- Fragment / Empty Node 对照。
- Render-time mutation Failure。
- Render / Commit 证据矩阵。
- React DevTools / Elements / Console 对照记录。
- Module Review。

---

## 8. 前 6 课验收

不看文档回答：

1. JSX 是 HTML 吗？
2. `jsx: react-jsx` 表示什么？
3. `<section />` 和 `<ReleaseCard />` 的 `type` 有什么区别？
4. 创建 `<ReleaseCard />` 时组件函数是否已经执行？
5. `42` 可以成为 React Node 吗？它是 React Element 吗？
6. `0 && <Panel />` 为什么可能显示 `0`？
7. Fragment 为什么不会出现在 Elements 中？
8. `null`、`false`、`undefined` 为什么通常不产生可见 DOM？
9. Render 中修改模块级数组为什么危险？
10. Strict Mode 是制造 impurity 的原因吗？
11. Component Function 重新执行是否证明 DOM 被修改？
12. MutationObserver 在 RE-1102-006 中证明了什么？

---

## 9. Definition of Done

- [x] Module Owner Boundary。
- [x] 8 课轻规划。
- [x] RE-1102-001 JSX Transform。
- [x] RE-1102-002 React Element。
- [x] RE-1102-003 Component Invocation / Render Output。
- [x] RE-1102-004 Expression / Fragment / Empty Node。
- [x] RE-1102-005 Pure Render / Idempotency Failure。
- [x] RE-1102-006 Render / Commit Evidence。
- [x] 每课完整 README 与独立源码。
- [x] Stage 11 CI 执行 TypeScript strict + Production Build。
- [ ] RE-1102-007 综合 Failure Lab。
- [ ] RE-1102-008 Render Model Inspector Project。
- [ ] Module Review。

下一批完成 007～008，收束 Module 11.02。
