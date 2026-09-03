# Module 11.01：React 的问题模型与声明式 UI

> Stage：[Stage 11：React 完整体系](../README.md)  
> 状态：✅ 已完成  
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

学完后，学习者应先把 React 理解为“状态到 UI 的声明式映射和组件化组织方式”，而不是模板语言、DOM 封装器或自动性能优化工具。

---

## 2. Owner 边界

### 本 Module 负责

- 手工 DOM 同步为什么随着状态和视图增加而失控。
- 命令式更新与声明式描述的根本差异。
- React、React DOM、Root、Component Tree 的第一层关系。
- `createRoot(...).render(...)` 的最小运行链路。
- “UI 是当前状态的函数”的基础心智模型。
- State Owner、Props Down 与 Callback Intent。
- React 接管整个应用或局部页面时的边界。
- 开发模式、Strict Mode 和基础调试入口。
- 重复 State 与直接 DOM 修改的 Failure Lab。
- 从原生 DOM 应用迁移到 React 的最小实践。

### 本 Module 只预览、不深入

- `useState`：只用于证明状态驱动 UI，完整语义归 11.04。
- JSX：只使用最小语法，转换与 Element 模型归 11.02。
- Props 与 Composition：只建立组件树和最小回调关系，API 设计归 11.03。
- Event：只使用点击、radio 和 checkbox，合成事件与表单归 11.05。
- `useEffect`：只用于 Strict Mode setup/cleanup 观察，完整语义归 11.07。
- Render/Commit：只建立时间线，Fiber 与完整机制归 11.22。
- DOM Escape Hatch：只制造越权故障，正确 Ref 体系归 11.08。

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
7. 画出 Component Tree 并定位 State Owner。
8. 判断一个页面适合整体使用 React，还是局部渐进接入。
9. 使用 Console、Elements 与 React DevTools 建立证据链。
10. 复现重复 State 与 DOM 所有权冲突。
11. 把一个小型命令式页面重构为声明式 React 页面。
12. 用迁移报告和自动检查证明 Module Project 完成。

---

## 4. Lesson 交付结果

| 编号 | Lesson | 深度 | 核心问题 | 状态 |
|---|---|---|---|---|
| RE-1101-001 | 手工 DOM 同步为什么会失控 | Must | 当多个 DOM 节点表达同一份状态时，为什么容易出现不一致 | ✅ |
| RE-1101-002 | 创建第一个 React 应用 | Must | React 如何进入页面并接管一个 DOM 子树 | ✅ |
| RE-1101-003 | 让状态声明 UI | Must | 为什么只修改状态就能更新多个界面区域 | ✅ |
| RE-1101-004 | Component Tree 与单向更新流 | Must | 页面如何形成组件树，State Owner 如何决定 | ✅ |
| RE-1101-005 | 整体应用与局部接入边界 | Should | React 应该接管整个页面还是只接管某个区域 | ✅ |
| RE-1101-006 | Strict Mode 与第一套 Debug 基线 | Should | 开发环境为什么额外执行检查，如何建立证据链 | ✅ |
| RE-1101-007 | Failure Lab：重复状态与 DOM 逃生 | Should | 直接改 DOM、复制派生状态会制造什么故障 | ✅ |
| RE-1101-008 | Module Project：发布控制台迁移 | Must/Should | 如何把命令式发布控制台渐进重构为 React | ✅ |

---

## 5. 完整学习闭环

```text
RE-1101-001
制造并观察手工 DOM 同步错误
  ↓
RE-1101-002
建立 React Root、Component 和宿主 DOM 的关系
  ↓
RE-1101-003
用最小 State 声明多个 UI 区域
  ↓
RE-1101-004
建立 Component Tree、State Owner 和单向更新流
  ↓
RE-1101-005
在遗留宿主页中验证整体 Root 与局部多 Root 边界
  ↓
RE-1101-006
使用 Strict Mode、Console 与 React DevTools 建立 Debug 基线
  ↓
RE-1101-007
主动制造 Derived State Drift 与 DOM 所有权冲突
  ↓
RE-1101-008
完成 Legacy / React 对照迁移、验证和架构复盘
```

---

## 6. Module Project

### 项目名称

**Release Console Migration：发布控制台渐进迁移**

### 起始版本

原生 JavaScript / TypeScript 页面，包含：

- 发布环境状态。
- 审批进度。
- 风险检查项。
- 发布按钮。
- 多个表达同一份状态的 DOM 区域。
- 可稳定复现的摘要同步漏洞。

### 目标版本

React + TypeScript 页面，具备：

- 单一可信状态来源。
- 清晰组件树。
- 单向数据流。
- 不直接修改 React 管理的 DOM。
- 正确的空状态、禁用状态和错误提示。
- 基础可访问性。
- 渐进迁移 Root 边界。
- 迁移前后对照报告。
- 自动结构验证脚本。

### 强制证据

项目已经交付：

1. 遗留版本的分散 DOM 写入点。
2. 一个可以稳定复现的不一致 Bug。
3. React 版本的 Source State 与 Derived Values。
4. Component Tree。
5. 一次审批更新的完整时间线。
6. Legacy Root 与 React Root 的所有权边界。
7. React 并未自动解决的问题清单。
8. `npm run verify` 自动结构检查。

---

## 7. Module Review

### 7.1 边界复审

- JSX 只作为语法使用，没有提前深入转换机制。
- Props 只用于最小父子通信，没有提前展开公共 API 设计。
- State 只建立 Source/Derived/Owner 模型，没有提前讲更新队列和 Batching。
- Effect 只用于 Strict Mode 观察，没有提前替代 11.07。
- Ref 只作为后续合法 Escape Hatch 的预告，没有提前教学。
- 多 Root 只覆盖接入边界，没有扩展为微前端体系。

结论：没有侵占后续 Owner Module。

### 7.2 重复复审

八课形成连续因果链，没有再次建立另一套 React 入门、State 基础或 DOM 基础课程。

结论：无平行路线。

### 7.3 依赖复审

前置依赖仅使用已经存在的 HTML、CSS、JavaScript、DOM、TypeScript 和 HTTP 基础；每课运行时不依赖上一课目录。

结论：依赖方向正确。

### 7.4 粒度复审

- 001 只负责制造同步问题。
- 002 只负责 React Root 与首个组件。
- 003 只负责最小 State 声明 UI。
- 004 只负责组件树和状态所有权。
- 005 只负责 Root 接入边界。
- 006 只负责开发模式 Debug 基线。
- 007 只负责两类所有权故障。
- 008 只负责组合、迁移和复盘。

结论：每课有一个主要因果关系。

### 7.5 知识上限复审

当前 Module 已达到其应有的 Should 深度：

- 不只会创建项目，还能解释 Root 与 DOM 所有权。
- 不只会使用 State，还能发现重复状态漂移。
- 不只会拆组件，还能判断 State Owner。
- 不只会运行开发环境，还能区分 Strict Mode 证据。
- 不只会重写页面，还能设计渐进迁移和验证报告。

Expert 深度的 Fiber、Scheduler、Hook 源码和大型架构仍保留在后续 Owner Module。

---

## 8. Definition of Done

- [x] 8 节完整 Lesson README。
- [x] 每节独立可运行最终源码。
- [x] 原生 DOM 同步故障实验。
- [x] React Root 与局部接入实验。
- [x] Component Tree 与单向更新流实验。
- [x] Strict Mode 和 React DevTools 调试实验。
- [x] 重复 State 与直接 DOM 修改 Failure Lab。
- [x] Release Console Migration 完整项目。
- [x] Migration Report 与自动结构验证。
- [x] 边界、重复、依赖、粒度和知识上限复审。

Module 11.01 正式完成。下一步进入 Module 11.02：JSX、Element、Component 与 Render Output。
