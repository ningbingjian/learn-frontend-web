# Module 11.02：JSX、Element、Component 与 Render Output

> Stage：[Stage 11：React 完整体系](../README.md)  
> 状态：🚧 建设中，首批 3 / 8 已交付  
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

但如果继续只把 JSX 当成“像 HTML 的写法”，后面学习 Props、State、Key、Reconciliation 与 Fiber 时会不断混淆：

```text
JSX 源码
React Element
Component Function
Component 调用结果
Render Output
Host DOM
```

本 Module 把链路拆清楚：

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

学完后，不能再把 `<App />`、`App()`、React Element、DOM Element 与 Fiber 当成同一个东西。

---

## 2. Owner Boundary

### 本 Module 完整负责

- JSX 是什么、为什么它不是 HTML。
- JSX 与 JavaScript 表达式的关系。
- JSX automatic runtime 的课程级转换模型。
- JSX 与 `createElement` / Element Factory 的概念关系。
- React Element 的 `type`、`props`、`key` 等公开心智模型。
- React Element 是“UI 描述”而不是 DOM 节点。
- 创建 Component Element 与真正调用 Component Function 的区别。
- 组件返回值与 React Node / Render Output 的第一层模型。
- 组件纯渲染、幂等与 Render 阶段禁止副作用的基本边界。
- Render 与 Commit 的表层职责边界。
- Element → Component → Host Output 的可观察实验。

### 本 Module 只预览、不深入

- Props / Children 的完整公共 API：归 11.03。
- State Snapshot、Update Queue、Batching：归 11.04。
- List / Key Identity：归 11.06；这里只解释 `key` 是 Element 身份提示的一部分。
- Effect 与外部同步：归 11.07。
- Reconciliation、Fiber、Lane、Scheduler：归 11.22。
- DOM Renderer / Host Config 源码：归 11.23。
- JSX 编译器实现、Babel/SWC AST 全体系：归 Stage 16。

### 本 Module 不负责

- Router、Server State、Suspense、表单和状态库。
- Next.js / Server Component 完整模型。

---

## 3. 学习目标

完成本 Module 后，应能够：

1. 解释 JSX 与 React 是两个不同概念。
2. 把一段 JSX 写出课程级转换结果。
3. 解释为什么现代 JSX 不要求每个文件显式 `import React`。
4. 区分 HTML Element、React Element 与 Component。
5. 使用 `isValidElement` 证明一个值是不是 React Element。
6. 解释 Element 的 `type` 是字符串或组件引用时分别意味着什么。
7. 证明创建 `<ReleaseCard />` 不等于立刻执行 `ReleaseCard()`。
8. 说明组件可以返回哪些 React Node。
9. 解释为什么不能手工调用 React 组件来“复用 UI”。
10. 解释纯 Render 为什么是 React 可暂停、重试和重复执行工作的前提之一。
11. 区分 Render 计算与 Commit DOM 写入。
12. 使用 Console、React DevTools 和 Elements 分别观察不同层级。

---

## 4. Lesson 规划

Module 11.02 规划 8 节，当前只交付前三节：

| 编号 | Lesson | 深度 | 核心问题 | 状态 |
|---|---|---|---|---|
| RE-1102-001 | JSX 不是 HTML：从源码看到转换结果 | Must | JSX 在构建时到底变成什么 | ✅ |
| RE-1102-002 | React Element：UI 描述对象不是 DOM | Must | JSX 产生的 Element 是什么对象 | ✅ |
| RE-1102-003 | Component 何时调用，Render Output 到底是什么 | Must | `<Comp />`、`Comp()` 与返回值有什么区别 | ✅ |
| RE-1102-004 | JSX Expression、Fragment、Conditional 与 Empty Node | Must | JavaScript 值怎样进入 Render Output | ⏳ |
| RE-1102-005 | Pure Render、Idempotency 与 Render-time Mutation | Should | 为什么 Render 必须保持纯 | ⏳ |
| RE-1102-006 | Render vs Commit：从描述到 Host DOM | Should | 组件执行和 DOM 写入为什么是两个阶段 | ⏳ |
| RE-1102-007 | Failure Lab：错误标签、Element Mutation 与手工调用组件 | Should | 错误心智模型会制造什么故障 | ⏳ |
| RE-1102-008 | Module Project：Render Model Inspector | Must/Should | 串起 JSX → Element → Component → DOM | ⏳ |

---

## 5. 第一批学习链

```text
RE-1102-001
JSX 是 JavaScript 的语法扩展
并在构建阶段被转换
  ↓
RE-1102-002
转换结果表达的是 React Element / UI Description
不是 DOM
  ↓
RE-1102-003
当 Element.type 指向 Component 时
React 才在 Render 工作中调用组件
并继续处理组件返回的 Render Output
```

完成前三课以后，应能写出：

```text
写 JSX ≠ 写 HTML
创建 <MyComponent /> ≠ 调用 MyComponent()
React Element ≠ DOM Element
Component Render ≠ DOM Commit
```

---

## 6. Module Project

### 名称

**Render Model Inspector**

### 目标

实现一个可观察页面，让学习者选择不同示例并查看：

```text
JSX Source
→ 转换后的 Element Factory 调用
→ Element.type / props / key
→ Component Call Log
→ Component Render Output
→ 最终 DOM
```

### 强制交付

- JSX 与无 JSX写法对照。
- Host Element 与 Component Element 对照。
- `isValidElement` 与 React Node 对照。
- Component 调用时间线。
- Render-time mutation Failure。
- Render / Commit 证据矩阵。
- React DevTools / Elements / Console 对照记录。
- Module Review。

---

## 7. 第一批验收

完成 RE-1102-001 ～ 003 后，不看文档回答：

1. JSX 是 HTML 吗？
2. JSX 是否必须和 React 一起使用？
3. `jsx: react-jsx` 表示什么？
4. `<section />` 的 Element `type` 大致是什么？
5. `<ReleaseCard />` 的 Element `type` 大致是什么？
6. 创建 `<ReleaseCard />` 时是否已经执行 `ReleaseCard`？
7. React Element 是 DOM Node 吗？
8. `42` 可以成为 React Node 吗？它是 React Element 吗？
9. 为什么不应该直接调用 `ReleaseCard(props)`？
10. Component 返回 JSX 后是否已经修改了 DOM？

---

## 8. Definition of Done

- [x] Module Owner Boundary。
- [x] 8 课轻规划。
- [x] RE-1102-001 完整 README 与独立源码。
- [x] RE-1102-002 完整 README 与独立源码。
- [x] RE-1102-003 完整 README 与独立源码。
- [x] JSX 转换观察脚本。
- [x] Element 对象观察实验。
- [x] Component 调用时机实验。
- [ ] Expression / Fragment / Empty Node。
- [ ] Pure Render Failure Lab。
- [ ] Render / Commit 深化实验。
- [ ] Module Project。
- [ ] Module Review。

下一批继续完成 RE-1102-004 ～ 006。
