# Module 11.01：React 的问题模型与声明式 UI

> Stage：[Stage 11：React 完整体系](../README.md)  
> 状态：🚧 建设中  
> 正式课程：[../../../courses/frontend-architect/stage11-react/module11-01-react-problem-model/README.md](../../../courses/frontend-architect/stage11-react/module11-01-react-problem-model/README.md)

---

## 1. Module 要解决的问题

学习 React 最常见的错误起点是直接背：

```tsx
function App() {
  return <div>Hello</div>;
}
```

这样能够很快看到页面，却没有回答最重要的问题：

> 浏览器原本已经有 DOM、Event 和 JavaScript，为什么还需要 React？

本 Module 从真实 UI 同步问题出发，建立 React 的第一层心智模型：

```text
业务状态发生变化
  ↓
声明当前状态下 UI 应该是什么
  ↓
React 重新计算组件输出
  ↓
React 把必要变化提交到宿主环境
```

学完后，学习者应该先把 React 理解为“状态到 UI 的声明式映射和组件化组织方式”，而不是模板语言、DOM 封装器或自动性能优化工具。

---

## 2. Owner 边界

### 本 Module 负责

- 手工 DOM 同步为什么随着状态和视图增加而失控。
- 命令式更新与声明式描述的根本差异。
- React、React DOM、Root、Component Tree 的第一层关系。
- `createRoot(...).render(...)` 的最小运行链路。
- “UI 是当前状态的函数”的基础心智模型。
- React 接管整个应用或局部页面时的边界。
- 开发模式、Strict Mode 和基础调试入口。
- 从原生 DOM 应用迁移到 React 的最小实践。

### 本 Module 只预览、不深入

- `useState`：只用于证明状态驱动 UI，完整语义归 11.04。
- JSX：只使用最小语法，转换与 Element 模型归 11.02。
- Props 与 Composition：只建立组件树概念，API 设计归 11.03。
- Event：只使用点击事件，合成事件和表单归 11.05。
- Render/Commit：只建立时间线，Fiber 与完整机制归 11.22。

### 本 Module 不负责

- Router、Server State、Suspense、SSR、性能优化和状态库。
- React 项目的完整工程化配置和 Monorepo。
- React Native、Next.js 或其他框架的完整使用。

---

## 3. 学习目标

完成本 Module 后，应能够：

1. 用一个可复现 Bug 解释手工 DOM 同步的维护成本。
2. 区分业务状态、DOM 状态、派生值和重复状态。
3. 从空目录创建并运行最小 React + TypeScript 应用。
4. 解释 `index.html`、`main.tsx`、`createRoot`、`App` 的关系。
5. 使用最小 `useState` 实现状态驱动 UI。
6. 解释一次用户事件后的基础更新链路。
7. 判断一个页面适合整体使用 React，还是局部渐进接入。
8. 使用浏览器和 React DevTools 观察组件与更新。
9. 把一个小型命令式页面重构为声明式 React 页面。

---

## 4. Lesson 规划

Module 11.01 只规划支撑当前闭环所需的 8 节课。

| 编号 | Lesson | 深度 | 核心问题 | 状态 |
|---|---|---|---|---|
| RE-1101-001 | 手工 DOM 同步为什么会失控 | Must | 当多个 DOM 节点表达同一份状态时，为什么容易出现不一致 | ✅ 已完成 |
| RE-1101-002 | 创建第一个 React 应用 | Must | React 如何进入页面并接管一个 DOM 子树 | ✅ 已完成 |
| RE-1101-003 | 让状态声明 UI | Must | 为什么只修改状态就能更新多个界面区域 | ✅ 已完成 |
| RE-1101-004 | Component Tree 与单向更新流 | Must | 一个页面如何被组织为组件树，更新如何向下传播 | ⏳ 待建设 |
| RE-1101-005 | 整体应用与局部接入边界 | Should | React 应该接管整个页面还是只接管某个区域 | ⏳ 待建设 |
| RE-1101-006 | Strict Mode 与第一套 Debug 基线 | Should | 开发环境为什么可能多执行一次，如何观察更新 | ⏳ 待建设 |
| RE-1101-007 | Failure Lab：重复状态与 DOM 逃生 | Should | 直接改 DOM、复制派生状态会制造什么故障 | ⏳ 待建设 |
| RE-1101-008 | Module Project：发布控制台迁移 | Must/Should | 如何把命令式发布控制台渐进重构为 React | ⏳ 待建设 |

不会提前创建后五节的空目录；每节进入建设后再提交 README 和完整源码。

---

## 5. 第一批课程闭环

前三节形成以下最小闭环：

```text
RE-1101-001
制造并观察手工 DOM 同步错误
  ↓
RE-1101-002
建立 React Root、Component 和宿主 DOM 的关系
  ↓
RE-1101-003
用同一份 State 声明多个 UI 区域
```

此时学习者已经能回答：

- React 为什么出现。
- React 在页面的什么位置运行。
- 组件函数和 DOM 节点不是同一个对象。
- 状态改变后为什么不需要逐个修改 DOM。
- 为什么派生值应该尽量从当前状态计算，而不是复制成另一份状态。

---

## 6. Module Project

### 项目名称

**Release Console Migration：发布控制台渐进迁移**

### 起始版本

原生 JavaScript 页面，包含：

- 发布环境状态。
- 审批进度。
- 风险检查项。
- 发布按钮。
- 多个表达同一份状态的 DOM 区域。

### 目标版本

React + TypeScript 页面，要求：

- 单一可信状态来源。
- 清晰组件树。
- 单向数据流。
- 不直接修改 React 管理的 DOM。
- 正确的空状态、禁用状态和错误提示。
- 基础可访问性。
- 开发模式调试记录。

### 强制对照

项目报告必须包含：

1. 原生版本的同步点数量。
2. 至少一个真实不一致 Bug。
3. React 版本的状态来源和派生值。
4. 组件树图。
5. 一次事件更新的时间线。
6. React 并未自动解决的问题，例如数据请求、业务建模或样式质量。

---

## 7. 常见错误认知

### “React 就是更方便地操作 DOM”

不准确。React 的核心价值不是缩短 `querySelector`，而是让开发者声明当前状态下的 UI，并通过组件边界组织复杂界面。

### “React 会让所有页面更快”

错误。React 引入了运行时计算、调度和抽象成本。是否更快必须通过具体场景和测量判断。

### “使用 React 后不用理解 DOM”

错误。焦点、事件、布局、测量、可访问性、性能和第三方集成仍然依赖浏览器平台知识。

### “所有数据都应该放进 State”

错误。能够由当前 Props/State 直接计算的值通常不应再复制一份 State。

### “组件函数执行一次就对应一个 DOM 节点”

错误。组件可能执行多次、返回多个节点或不返回宿主节点；Render 结果与最终 DOM 不是一一对应关系。

---

## 8. Definition of Done

本 Module 完成时，必须具备：

- 8 节完整 Lesson README。
- 每节独立可运行最终源码。
- 原生 DOM 同步故障实验。
- React Root 与局部接入实验。
- Strict Mode 和 React DevTools 调试实验。
- 重复状态与直接 DOM 修改 Failure Lab。
- Release Console Migration 完整项目。
- Module Review：边界、重复、依赖、粒度和知识上限复审。

学习者验收不能只看“页面能运行”，还必须能口头或书面解释每个观察结果为什么发生。
