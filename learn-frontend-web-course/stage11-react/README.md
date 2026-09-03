# Stage 11：React 完整体系

> 状态：🚧 正式建设中  
> 课程总纲：[../README.md](../README.md)  
> 教学规范：[../FRONTEND_TEACHING_GUIDE.md](../FRONTEND_TEACHING_GUIDE.md)  
> 正式课程：[../../courses/frontend-architect/stage11-react/README.md](../../courses/frontend-architect/stage11-react/README.md)

---

## 1. Stage 定位

本 Stage 不是一套“React API 快速入门”，也不会把 React 人为拆成基础篇、高级篇、性能篇和源码篇。

React 在这里完整学习一次：

```text
为什么需要 React
→ 组件、JSX、Props、State、Event
→ Effect、Ref、Reducer、Context、Custom Hook
→ Router、Server State、Suspense、Form
→ 并发渲染、性能、测试、A11Y、国际化
→ SSR、Streaming、Hydration、Server Boundary
→ Fiber、Reconciler、Scheduler、Hook 与 DOM Renderer 源码
→ 组件库、大型应用架构、迁移与生产治理
```

学习者最终不仅要“会写组件”，还要能够解释：

- React 解决了哪一类 UI 同步问题，哪些问题 React 并不解决。
- 一次事件触发后，状态更新、Render、Reconciliation、Commit 如何发生。
- 为什么组件会重新渲染，为什么 DOM 可能没有变化。
- Effect 为什么容易产生竞态、重复订阅和内存泄漏。
- Key、Identity、State Preservation 为什么会导致状态保留或重置。
- Concurrent Rendering 为什么可以中断，Transition 为什么能改善响应性。
- SSR、Streaming 与 Hydration 的边界、故障和安全风险在哪里。
- Fiber、Lane、Update Queue、Hook Linked List 如何支撑 React 运行。
- 大型 React 系统如何划分模块、控制依赖、测试、发布、监控和演进。

---

## 2. 轻规划原则

Stage 11 使用“轻规划、重交付”的建设方式。

不会先创建几百个空 Lesson，也不会先把未来每一节课的标题固定死。当前只固定三层边界：

1. **26 个 Owner Module**：确定知识归属，避免重复建设。
2. **当前正在建设的 Module**：细化到 Lesson、实验和验收标准。
3. **已经交付的 Lesson**：必须包含完整 README 与独立可运行源码。

后续建设节奏：

```text
确定当前 Module 边界
→ 只规划足够支撑当前 Module 的 Lesson
→ 连续交付可运行课程
→ 完成 Module Project 和复审
→ 再细化下一个 Module
```

这样既保持完整路线，又避免“规划很宏大、课程无法真正落地”。

---

## 3. 技术基线

当前课程基线：

- React：19.2 系列；示例锁定到已验证的稳定补丁版本。
- React DOM：与 React 保持同一版本线。
- TypeScript：默认开启严格模式。
- Vite：8.x，用于本地开发和生产构建。
- Node.js：22.12+；同时满足 Vite 8 的运行要求。
- 浏览器：现代 Chromium、Firefox 或 Safari。
- 包管理器：第一批课程统一使用 npm，避免初学阶段同时引入包管理器差异。

版本策略：

- Lesson 的 `package.json` 保存可运行版本范围。
- 稳定补丁升级可以直接进入课程。
- Major 升级必须先建立兼容性实验和迁移说明。
- React Canary / 实验性 API 不进入 Must 主线，只允许出现在明确标记的 Expert 实验中。
- Create React App 不作为新课程脚手架；遗留项目迁移会在架构与迁移模块中单独处理。

官方参考：

- https://react.dev/versions
- https://react.dev/learn
- https://react.dev/reference/react
- https://vite.dev/guide/
- https://vite.dev/blog/announcing-vite8

---

## 4. 前置要求

进入 Stage 11 前，默认已经完成或具备以下能力：

- HTML 语义、表单和基础可访问性。
- CSS 布局、响应式与基础样式组织。
- JavaScript 函数、对象、数组、模块、闭包与异步。
- DOM、Event、Form、History 和浏览器调试基础。
- TypeScript 基础类型、对象类型、联合类型、泛型和模块。
- HTTP 请求、错误、取消、缓存和基础 Server State 概念。
- Git、命令行、Node.js 与 npm 基础操作。

本 Stage 会在需要时回顾必要概念，但不会把 JavaScript、TypeScript、HTTP 或 CSS 重新完整教学一遍。

---

## 5. 学习结果

完成 Stage 11 后，应形成以下能力链：

```text
能正确实现 React 功能
+
能解释状态与渲染行为
+
能处理异步、Effect 和资源生命周期
+
能设计组件、状态和模块边界
+
能测试、分析性能和定位生产问题
+
能追踪关键源码调用链
+
能设计和演进大型 React 系统
```

### Must

- 正确使用组件、JSX、Props、State、Event、Form、List、Key、Effect、Ref 和 Hook。
- 能区分 Local State、Server State、URL State、Form State 和共享状态。
- 能处理加载、错误、空状态、取消、竞态、重试和乐观更新。
- 能完成路由、权限、复杂表单、测试和基础性能分析。

### Should

- 能设计稳定的组件 API、Custom Hook、Context 和状态边界。
- 能使用 Suspense、Transition、Deferred Value、Error Boundary 和流式 UI。
- 能诊断无意义重渲染、Context 扩散、Effect 风暴、Hydration Mismatch 和 Chunk Error。
- 能建设可访问、可国际化、可观测、可灰度和可回滚的 React 应用。

### Expert

- 能追踪 Fiber、Reconciler、Scheduler、Lane、Update Queue、Hook 与 Effect 的关键源码链路。
- 能解释 Concurrent Rendering、Render/Commit、双缓冲树和优先级调度。
- 能设计 React Library、Design System 接入、SSR/Streaming 边界和大型模块架构。
- 能制定遗留系统迁移、状态库迁移、React 版本升级和组织级治理方案。

---

## 6. Module 路线

### Wave A：声明式 UI 与核心心智模型

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.01 | React 的问题模型与声明式 UI | 从手工 DOM 同步过渡到 React 根节点、组件树和状态驱动 UI |
| 11.02 | JSX、Element、Component 与 Render Output | 能解释 JSX 转换、React Element、纯渲染与 Render/Commit 边界 |
| 11.03 | Props、Children、Composition 与 API Design | 设计可组合、可演进的组件 API |
| 11.04 | State、Update Queue、Batching 与快照 | 完整理解状态快照、更新队列、批处理、保留和重置 |
| 11.05 | Event、Form 与用户输入 | 正确处理合成事件、表单、焦点和高频输入 |
| 11.06 | List、Key 与 Identity | 用身份模型解释列表更新和组件状态错位 |

### Wave B：资源生命周期与状态架构

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.07 | Effect 与外部系统同步 | 处理依赖、Cleanup、竞态、取消和 Strict Mode |
| 11.08 | Ref、Imperative Handle 与 DOM Escape Hatch | 建立正确的命令式逃生舱边界 |
| 11.09 | Reducer、Context 与状态组合 | 设计复杂更新与上下文传播边界 |
| 11.10 | Custom Hook 与逻辑复用 | 设计可测试、无抽象泄漏的 Hook |
| 11.11 | State Architecture 与状态机 | 为不同状态类型选择正确模型和工具 |
| 11.12 | Router 与 Navigation Architecture | 建立路由、权限、错误和数据加载边界 |
| 11.13 | Server State 与数据访问 | 完成缓存、失效、去重、乐观更新和恢复 |

### Wave C：异步 UI、产品工程与体验

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.14 | Suspense、Lazy、Error Boundary 与异步 UI | 设计加载协调、代码分割和错误隔离 |
| 11.15 | Concurrent Rendering、Transition 与 Deferred Value | 构建可中断、可分级的响应性体验 |
| 11.16 | React Form Architecture 与 Server Mutation | 设计复杂表单、Schema、异步校验和提交边界 |
| 11.17 | Styling、Asset 与 Design System Integration | 接入 Token、主题、组件库和服务端渲染 |
| 11.18 | React A11Y 与国际化 | 处理语义、焦点、键盘、动态内容和多语言边界 |

### Wave D：质量、性能与服务端边界

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.19 | React Testing | 建立组件、Hook、路由、数据和端到端测试体系 |
| 11.20 | React Performance Engineering | 使用 Profiler 和证据治理渲染、列表与 Bundle 性能 |
| 11.21 | SSR、Streaming、Hydration 与 Server Boundary | 解释并实现服务端输出、流式传输和 Hydration |

### Wave E：源码、库设计与大型架构

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.22 | Fiber、Reconciler 与 Scheduler | 跟踪 Fiber 树、工作循环、Lane 和 Commit |
| 11.23 | Hook、Effect 与 DOM Renderer 源码 | 跟踪 Hook 链表、更新队列、Effect 和 Host Config |
| 11.24 | React Library 与 Headless Component 设计 | 发布可复用、可 Tree-shaking、可兼容升级的库 |
| 11.25 | 大型 React 应用架构、迁移与治理 | 设计 Feature Boundary、依赖方向和迁移路线 |
| 11.26 | React 生产诊断与 Stage Project | 完成故障演练、生产加固和正式架构复盘 |

---

## 7. Owner 边界

为避免后续重复建设，Stage 11 采用以下归属规则：

- JSX 转换、Element 结构和纯渲染归 11.02。
- Props、Children 和组件公共 API 归 11.03。
- State 快照、批处理和更新队列归 11.04。
- DOM Event 原理归 Stage 07；React 合成事件与表单归 11.05。
- Effect 只用于外部系统同步，其生命周期归 11.07。
- 通用 HTTP、缓存和重试原理归 Stage 10；React 数据层集成归 11.13。
- 通用 A11Y 和国际化平台归 Stage 14；React 特有集成归 11.18。
- 通用测试工程归 Stage 17；React 行为测试归 11.19。
- 通用 Web 性能和 RUM 归 Stage 24；React 渲染性能归 11.20。
- Next.js 和完整全栈框架归 Stage 18；React 自身 SSR/Hydration 机制归 11.21。
- 通用大型前端架构归 Stage 27/28；React 具体实现、迁移和治理归 11.25。

---

## 8. 实践体系

每个 Module 至少包含：

```text
可复现实验
→ Wrong Way / Failure
→ Debug 与观察
→ 正确实现
→ 边界和 Trade-off
→ Module Project
```

Stage 11 的主要实践对象是 `Architect Workbench` 中的 **React Enterprise Console**：

- 应用壳、导航、权限与路由。
- 订单、任务或工作流领域模块。
- 表格、筛选、详情、复杂表单和文件上传。
- Server State、实时通知和错误恢复。
- Design System、A11Y 和国际化。
- 测试、性能预算、监控、灰度和回滚。
- SSR/Streaming、Hydration 和客户端边界实验。
- 生产故障演练与架构复盘。

Stage Project 不是一次性从空目录写完，而是随着 Module 持续演进。

---

## 9. 课程目录

设计目录：

```text
learn-frontend-web-course/stage11-react/
├── README.md
└── module11-xx-topic/
    └── README.md
```

正式课程目录：

```text
courses/frontend-architect/stage11-react/
├── README.md
└── module11-xx-topic/
    ├── README.md
    └── lesson-name/
        ├── README.md
        ├── package.json
        ├── index.html
        ├── src/
        └── 运行所需配置
```

每个 Lesson 最终源码独立运行，不依赖相邻 Lesson 的目录。

---

## 10. Stage 验收标准

完成 Stage 11 时，至少能够：

1. 独立实现一个生产级 React 应用，而不是只完成 Demo。
2. 用状态快照、Identity、Reconciliation、Render 和 Commit 解释行为。
3. 正确处理 Effect、订阅、计时器、请求、取消、竞态和资源释放。
4. 根据状态类型选择 local state、reducer、context、store、URL 或 server cache。
5. 设计可访问、可国际化、可测试和可维护的组件 API。
6. 使用 Profiler、Performance、Network、Memory 和日志定位问题。
7. 实现并解释 Suspense、Transition、SSR、Streaming 和 Hydration。
8. 阅读 Fiber、Scheduler、Hook 和 DOM Renderer 关键源码。
9. 处理白屏、Chunk Error、Hydration Mismatch、渲染风暴和内存泄漏。
10. 输出架构图、ADR、性能报告、测试报告、故障复盘和迁移方案。

---

## 11. 当前建设进度

### 已完成

- [x] Stage 11 的 26 个 Owner Module 边界。
- [x] Stage 11 轻量建设路线与验收标准。
- [x] Module 11.01 详细设计。
- [x] 11.01 第一批三节正式课程与独立源码。

### 当前 Module

- [Module 11.01：React 的问题模型与声明式 UI](./module11-01-react-problem-model/README.md)

### 下一步

先完成 Module 11.01 的剩余 Lesson、Failure Lab 和 Module Project；通过模块复审后再细化 Module 11.02。
