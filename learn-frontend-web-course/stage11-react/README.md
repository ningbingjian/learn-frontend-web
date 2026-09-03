# Stage 11：React 完整体系

> 状态：🚧 正式建设中  
> 课程总纲：[../README.md](../README.md)  
> 教学规范：[../FRONTEND_TEACHING_GUIDE.md](../FRONTEND_TEACHING_GUIDE.md)

---

## 1. Stage 定位

本 Stage 不是 React API 速查，也不拆成“基础篇 / 高级篇 / 性能篇 / 源码篇”。React 在一个 Stage 内完整学习一次：

```text
为什么需要 React
→ JSX / Element / Component / Props / State / Event
→ Effect / Ref / Reducer / Context / Custom Hook
→ Router / Server State / Suspense / Form
→ Concurrent Rendering / Performance / Testing / A11Y / i18n
→ SSR / Streaming / Hydration / Server Boundary
→ Fiber / Reconciler / Scheduler / Hook / DOM Renderer 源码
→ Library / 大型应用架构 / 迁移 / 生产治理
```

最终不仅要会写组件，还要能够解释 React 为什么这样运行、哪里会失败、如何 Debug，以及大型 React 系统如何演进。

---

## 2. 建设方式：轻规划、重交付

Stage 11 只固定三层：

1. **26 个 Owner Module**：确定知识归属。
2. **当前 Module**：细化到 Lesson、实验、Module Project 和验收。
3. **已交付 Lesson**：必须保存详细 README 与独立可运行源码。

建设节奏：

```text
确定当前 Module 边界
→ 只规划支撑当前闭环的 Lesson
→ 连续交付具体课程与源码
→ Failure Lab / Debug / Module Project
→ Module Review
→ 再进入下一 Module
```

---

## 3. 单一课程目录

所有 Stage、Module、Lesson、源码和项目统一放在：

```text
learn-frontend-web-course/stage11-react/
```

标准结构：

```text
stage11-react/
├── README.md
└── module11-xx-topic/
    ├── README.md
    └── lesson-name/
        ├── README.md
        ├── package.json
        ├── index.html
        ├── src/
        ├── tests/               # 需要时
        └── 运行所需配置
```

---

## 4. 技术基线

- React / React DOM：19.2.x。
- TypeScript：strict mode。
- Vite：8.x。
- Node.js：22.12+。
- 包管理器：npm。
- 浏览器：现代 Chromium、Firefox 或 Safari。

版本策略：

- Lesson 自己的 `package.json` 是精确运行依据。
- 稳定补丁可以进入课程。
- Major 升级必须先做兼容与迁移实验。
- Canary / 实验性 API 不进入 Must 主线。
- Create React App 不作为新课程脚手架。

---

## 5. 前置要求

进入 Stage 11 前，默认已具备：

- HTML、Form、A11Y 基础。
- CSS 布局、响应式与样式组织。
- JavaScript 函数、对象、数组、模块、闭包与异步。
- DOM、Event、History 与浏览器 Debug。
- TypeScript 基础类型、联合、泛型与模块。
- HTTP、错误、取消、缓存与基础 Server State 模型。
- Git、Node.js、npm 与命令行。

---

## 6. 学习结果

完成 Stage 11 后，应形成：

```text
正确实现 React 功能
+
解释状态与渲染行为
+
处理异步、Effect 与资源生命周期
+
设计组件、状态和模块边界
+
测试、分析性能和定位生产故障
+
追踪 React 关键源码调用链
+
设计和演进大型 React 系统
```

### Must

- 正确使用 Component、JSX、Props、State、Event、Form、List、Key、Effect、Ref 和 Hook。
- 区分 Local / Server / URL / Form / Shared State。
- 处理加载、错误、空状态、取消、竞态、重试和乐观更新。

### Should

- 设计稳定组件 API、Custom Hook、Context 和状态边界。
- 使用 Suspense、Transition、Deferred Value、Error Boundary。
- 诊断重渲染、Context 扩散、Effect 风暴、Hydration Mismatch 和 Chunk Error。

### Expert

- 追踪 Fiber、Reconciler、Scheduler、Lane、Update Queue、Hook 与 Effect 源码。
- 解释 Concurrent Rendering、Render/Commit、双缓冲树与优先级。
- 设计 React Library、SSR/Streaming 边界和大型模块架构。

---

## 7. 26 个 Owner Module

### Wave A：声明式 UI 与核心心智模型

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.01 | React 的问题模型与声明式 UI | Root、组件树、State Owner 与状态驱动 UI |
| 11.02 | JSX、Element、Component 与 Render Output | JSX 转换、Element、组件调用、纯渲染、Render/Commit |
| 11.03 | Props、Children、Composition 与 API Design | 可组合、可演进组件 API |
| 11.04 | State、Update Queue、Batching 与快照 | 快照、队列、批处理、保留与重置 |
| 11.05 | Event、Form 与用户输入 | 合成事件、表单、焦点和高频输入 |
| 11.06 | List、Key 与 Identity | 列表更新、身份与状态错位 |

### Wave B：资源生命周期与状态架构

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.07 | Effect 与外部系统同步 | 依赖、Cleanup、竞态、取消和 Strict Mode |
| 11.08 | Ref、Imperative Handle 与 DOM Escape Hatch | 命令式逃生舱边界 |
| 11.09 | Reducer、Context 与状态组合 | 复杂更新与 Context 边界 |
| 11.10 | Custom Hook 与逻辑复用 | 可测试 Hook 抽象 |
| 11.11 | State Architecture 与状态机 | 状态分类与状态机选型 |
| 11.12 | Router 与 Navigation Architecture | 路由、权限、错误和导航边界 |
| 11.13 | Server State 与数据访问 | 缓存、失效、去重、乐观更新和恢复 |

### Wave C：异步 UI、产品工程与体验

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.14 | Suspense、Lazy、Error Boundary 与异步 UI | 加载协调、代码分割和错误隔离 |
| 11.15 | Concurrent Rendering、Transition 与 Deferred Value | 可中断与分级响应性 |
| 11.16 | React Form Architecture 与 Server Mutation | 复杂表单、Schema 与提交边界 |
| 11.17 | Styling、Asset 与 Design System Integration | Token、主题、组件库与 SSR 兼容 |
| 11.18 | React A11Y 与国际化 | 焦点、键盘、动态内容与多语言 |

### Wave D：质量、性能与服务端边界

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.19 | React Testing | 组件、Hook、路由、数据和端到端测试 |
| 11.20 | React Performance Engineering | Profiler、Render 原因、Context、列表和 Bundle |
| 11.21 | SSR、Streaming、Hydration 与 Server Boundary | 服务端输出、流式、Hydration 与客户端边界 |

### Wave E：源码、库设计与大型架构

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.22 | Fiber、Reconciler 与 Scheduler | Fiber 树、工作循环、Lane 与 Commit |
| 11.23 | Hook、Effect 与 DOM Renderer 源码 | Hook 链表、更新队列、Effect、事件和 Host Config |
| 11.24 | React Library 与 Headless Component 设计 | 可复用、可兼容升级的库 |
| 11.25 | 大型 React 应用架构、迁移与治理 | Feature Boundary、依赖方向和迁移路线 |
| 11.26 | React 生产诊断与 Stage Project | 故障演练、生产加固和正式架构复盘 |

---

## 8. Owner Boundary

- JSX 转换、Element 结构、Component 调用、Render Output 与纯渲染归 **11.02**。
- Props、Children 与公共组件 API 归 **11.03**。
- State 快照、Batching 与 Update Queue 归 **11.04**。
- React 合成事件与表单归 **11.05**。
- List / Key / Identity 归 **11.06**。
- Effect 外部同步归 **11.07**。
- Ref 与合法 DOM Escape Hatch 归 **11.08**。
- React 数据层集成归 **11.13**；HTTP 通用原理归 Stage 10。
- React 行为测试归 **11.19**；通用质量工程归 Stage 17。
- React 渲染性能归 **11.20**；通用 Web 性能归 Stage 24。
- React SSR/Hydration 机制归 **11.21**；Next.js 完整体系归 Stage 18。
- Fiber / Scheduler 归 **11.22**；DOM Renderer 源码归 **11.23**。

---

## 9. 实践体系

每个 Module 至少包含：

```text
可复现实验
→ Wrong Way / Failure
→ Debug 与观察
→ 正确实现
→ 边界和 Trade-off
→ Module Project
→ Module Review
```

Stage 11 贯穿实践对象是 `Architect Workbench` 的 **React Enterprise Console**。

---

## 10. Stage 验收标准

完成 Stage 11 时至少能够：

1. 独立实现生产级 React 应用。
2. 用 Element、状态快照、Identity、Reconciliation、Render 和 Commit 解释行为。
3. 正确处理 Effect、订阅、请求、取消、竞态和资源释放。
4. 为不同状态选择 local state、reducer、context、store、URL 或 server cache。
5. 设计可访问、可国际化、可测试的组件 API。
6. 使用 React DevTools、Profiler、Performance、Network、Memory 和日志定位问题。
7. 实现并解释 Suspense、Transition、SSR、Streaming 和 Hydration。
8. 阅读 Fiber、Scheduler、Hook 和 DOM Renderer 关键源码。
9. 处理白屏、Chunk Error、Hydration Mismatch、渲染风暴和内存泄漏。
10. 输出架构图、ADR、性能报告、测试报告、故障复盘和迁移方案。

---

## 11. 当前建设进度

### Module 11.01：已完成 8 / 8

- [Module 11.01：React 的问题模型与声明式 UI](./module11-01-react-problem-model/README.md)
- Root / State / Component Tree / 单向更新流。
- 多 Root 渐进接入与 Strict Mode Debug。
- 重复 State / DOM Ownership Failure Lab。
- Release Console Migration Module Project 与 Review。

### Module 11.02：建设中，已完成 3 / 8

- [Module 11.02：JSX、Element、Component 与 Render Output](./module11-02-jsx-element-component-render-output/README.md)
- [RE-1102-001：JSX 不是 HTML——从源码看到转换结果](./module11-02-jsx-element-component-render-output/01-jsx-source-to-transform/README.md)
- [RE-1102-002：React Element——UI 描述对象不是 DOM](./module11-02-jsx-element-component-render-output/02-react-element-description/README.md)
- [RE-1102-003：Component 何时调用，Render Output 到底是什么](./module11-02-jsx-element-component-render-output/03-component-call-render-output/README.md)

当前学习链：

```text
Module 11.01
声明式 UI / Root / State Owner
        ↓
RE-1102-001
JSX Source → Transform
        ↓
RE-1102-002
React Element Description
        ↓
RE-1102-003
Component Invocation → Render Output
```

### 下一批

继续 RE-1102-004 ～ RE-1102-006：

```text
JSX Expression / Fragment / Empty Node
→ Pure Render / Idempotency
→ Render vs Commit
```
