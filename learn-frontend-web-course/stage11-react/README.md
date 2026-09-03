# Stage 11：React 完整体系

> 状态：🚧 正式建设中  
> 课程总纲：[../README.md](../README.md)  
> 教学规范：[../FRONTEND_TEACHING_GUIDE.md](../FRONTEND_TEACHING_GUIDE.md)

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

## 2. 建设方式：轻规划、重交付

Stage 11 不先创建几百个空 Lesson，只固定：

1. **26 个 Owner Module**：确定知识归属，避免重复建设。
2. **当前正在建设的 Module**：细化到 Lesson、实验、项目和验收标准。
3. **已经交付的 Lesson**：必须包含完整 README 与独立可运行源码。

建设节奏：

```text
确定当前 Module 边界
→ 规划支撑闭环所需的 Lesson
→ 连续交付可运行课程
→ Failure Lab / Debug / Module Project
→ Module Review
→ 再细化下一个 Module
```

---

## 3. 单一课程目录

Stage 11 不再拆分“设计目录”和“正式课程目录”，统一放在：

```text
learn-frontend-web-course/stage11-react/
```

结构统一为：

```text
learn-frontend-web-course/stage11-react/
├── README.md
└── module11-xx-topic/
    ├── README.md
    └── lesson-name/
        ├── README.md
        ├── package.json
        ├── index.html
        ├── src/
        ├── tests/               # 需要时提供
        └── 运行所需配置
```

其中：

- Stage README：负责 Stage 目标、Module 路线、Owner Boundary、项目和进度。
- Module README：负责知识边界、Lesson 索引、Module Project 与 Definition of Done。
- Lesson README：就是可直接学习的具体知识点课程。
- Lesson 目录：直接保存完整可运行源码和实验材料。

---

## 4. 技术基线

当前 React 课程基线：

- React / React DOM：19.2.x。
- TypeScript：strict mode。
- Vite：8.x。
- Node.js：22.12+。
- 包管理器：npm。
- 浏览器：现代 Chromium、Firefox 或 Safari。

版本策略：

- Lesson 的 `package.json` 保存可运行依赖版本。
- 稳定补丁升级可以进入课程。
- Major 升级必须先建立兼容性实验和迁移说明。
- Canary / 实验性 API 不进入 Must 主线，只能进入明确标记的 Expert 实验。
- Create React App 不作为新课程脚手架；遗留迁移放在对应架构课程中处理。

---

## 5. 前置要求

进入 Stage 11 前，默认已经具备：

- HTML 语义、表单和基础可访问性。
- CSS 布局、响应式和样式组织基础。
- JavaScript 函数、对象、数组、模块、闭包与异步。
- DOM、Event、Form、History 和浏览器调试基础。
- TypeScript 基础类型、对象类型、联合类型、泛型和模块。
- HTTP 请求、错误、取消、缓存和基础 Server State 模型。
- Git、Node.js、npm 和命令行基础。

本 Stage 会在必要位置回顾前置概念，但不会重复建立 JavaScript、TypeScript、HTTP 或 CSS 主课程。

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

- 正确使用组件、JSX、Props、State、Event、Form、List、Key、Effect、Ref 和 Hook。
- 区分 Local State、Server State、URL State、Form State 和共享状态。
- 正确处理加载、错误、空状态、取消、竞态、重试和乐观更新。
- 完成路由、权限、复杂表单、测试和基础性能分析。

### Should

- 设计稳定的组件 API、Custom Hook、Context 和状态边界。
- 使用 Suspense、Transition、Deferred Value、Error Boundary 和流式 UI。
- 诊断无意义重渲染、Context 扩散、Effect 风暴、Hydration Mismatch 和 Chunk Error。
- 建设可访问、可国际化、可观测、可灰度和可回滚的 React 应用。

### Expert

- 追踪 Fiber、Reconciler、Scheduler、Lane、Update Queue、Hook 与 Effect 的关键源码链路。
- 解释 Concurrent Rendering、Render/Commit、双缓冲树和优先级调度。
- 设计 React Library、Design System 接入、SSR/Streaming 边界和大型模块架构。
- 制定遗留系统迁移、状态库迁移、React 版本升级和组织级治理方案。

---

## 7. 26 个 Owner Module

### Wave A：声明式 UI 与核心心智模型

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.01 | React 的问题模型与声明式 UI | 从手工 DOM 同步过渡到 Root、组件树和状态驱动 UI |
| 11.02 | JSX、Element、Component 与 Render Output | JSX 转换、Element、纯渲染和 Render/Commit 边界 |
| 11.03 | Props、Children、Composition 与 API Design | 可组合、可演进的组件 API |
| 11.04 | State、Update Queue、Batching 与快照 | 状态快照、更新队列、批处理、保留与重置 |
| 11.05 | Event、Form 与用户输入 | 合成事件、表单、焦点和高频输入 |
| 11.06 | List、Key 与 Identity | 用身份模型解释列表更新和状态错位 |

### Wave B：资源生命周期与状态架构

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.07 | Effect 与外部系统同步 | 依赖、Cleanup、竞态、取消和 Strict Mode |
| 11.08 | Ref、Imperative Handle 与 DOM Escape Hatch | 正确的命令式逃生舱边界 |
| 11.09 | Reducer、Context 与状态组合 | 复杂更新与上下文传播边界 |
| 11.10 | Custom Hook 与逻辑复用 | 可测试、无抽象泄漏的 Hook |
| 11.11 | State Architecture 与状态机 | Local/UI/Server/URL/Form State 与状态机选型 |
| 11.12 | Router 与 Navigation Architecture | 路由、权限、错误、导航和数据加载边界 |
| 11.13 | Server State 与数据访问 | 缓存、失效、去重、乐观更新和恢复 |

### Wave C：异步 UI、产品工程与体验

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.14 | Suspense、Lazy、Error Boundary 与异步 UI | 加载协调、代码分割和错误隔离 |
| 11.15 | Concurrent Rendering、Transition 与 Deferred Value | 可中断、可分级的响应性体验 |
| 11.16 | React Form Architecture 与 Server Mutation | 复杂表单、Schema、异步校验和提交边界 |
| 11.17 | Styling、Asset 与 Design System Integration | Token、主题、组件库和 SSR 兼容 |
| 11.18 | React A11Y 与国际化 | 语义、焦点、键盘、动态内容和多语言边界 |

### Wave D：质量、性能与服务端边界

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.19 | React Testing | 组件、Hook、路由、数据和端到端测试体系 |
| 11.20 | React Performance Engineering | Profiler、Render 原因、Context、列表和 Bundle 性能 |
| 11.21 | SSR、Streaming、Hydration 与 Server Boundary | 服务端输出、流式传输、Hydration 与客户端边界 |

### Wave E：源码、库设计与大型架构

| Module | 主题 | 核心交付 |
|---|---|---|
| 11.22 | Fiber、Reconciler 与 Scheduler | Fiber 树、工作循环、Lane 与 Commit |
| 11.23 | Hook、Effect 与 DOM Renderer 源码 | Hook 链表、更新队列、Effect、事件和 Host Config |
| 11.24 | React Library 与 Headless Component 设计 | 可复用、可 Tree-shaking、可兼容升级的库 |
| 11.25 | 大型 React 应用架构、迁移与治理 | Feature Boundary、依赖方向和迁移路线 |
| 11.26 | React 生产诊断与 Stage Project | 故障演练、生产加固和正式架构复盘 |

---

## 8. Owner Boundary

为避免后续重复建设：

- JSX 转换、Element 结构和纯渲染归 11.02。
- Props、Children 和组件公共 API 归 11.03。
- State 快照、批处理和更新队列归 11.04。
- DOM Event 原理归 Stage 07；React 合成事件与表单归 11.05。
- Effect 与外部系统同步归 11.07。
- 通用 HTTP、缓存和重试原理归 Stage 10；React 数据层集成归 11.13。
- 通用 A11Y / i18n 平台归 Stage 14；React 特有集成归 11.18。
- 通用测试工程归 Stage 17；React 行为测试归 11.19。
- 通用 Web 性能和 RUM 归 Stage 24；React 渲染性能归 11.20。
- Next.js 与完整全栈框架归 Stage 18；React 自身 SSR/Hydration 机制归 11.21。
- 通用大型前端架构归 Stage 27/28；React 具体实现、迁移和治理归 11.25。

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

Stage 11 的贯穿实践对象是 `Architect Workbench` 中的 **React Enterprise Console**，后续逐步加入：

- 应用壳、导航、权限与路由。
- 订单、任务或工作流领域模块。
- 表格、筛选、详情、复杂表单和文件上传。
- Server State、实时通知和错误恢复。
- Design System、A11Y 和国际化。
- 测试、性能预算、监控、灰度和回滚。
- SSR/Streaming、Hydration 和客户端边界实验。
- 生产故障演练与架构复盘。

---

## 10. Stage 验收标准

完成 Stage 11 时，至少能够：

1. 独立实现一个生产级 React 应用，而不是只完成 Demo。
2. 用状态快照、Identity、Reconciliation、Render 和 Commit 解释页面行为。
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
- [x] Module 11.01 详细边界和 8 课闭环设计。
- [x] RE-1101-001 ～ RE-1101-008 全部具体知识点课程。
- [x] 每节课的 README 与完整独立源码。
- [x] Component Tree、局部多 Root 与 Strict Mode Debug 实验。
- [x] 重复 State 与 DOM Ownership Failure Lab。
- [x] Release Console Migration Module Project。
- [x] Migration Report 与自动结构验证脚本。
- [x] Module 11.01 边界、重复、依赖、粒度和知识上限复审。

### 当前学习入口

- [Module 11.01：React 的问题模型与声明式 UI](./module11-01-react-problem-model/README.md)

### 下一步

进入 **Module 11.02：JSX、Element、Component 与 Render Output**，继续采用：

```text
轻规划
→ 具体 Lesson
→ Failure / Debug
→ Module Project
→ Review
```
