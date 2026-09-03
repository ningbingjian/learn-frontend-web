# Learn Frontend Web

一个从 **完全零基础** 持续成长到 **资深前端工程师、Staff / Principal Frontend Engineer 与前端架构师** 的长期学习与实践仓库。

本仓库不是 API 笔记、框架速成教程或面试八股合集，而是通过：

```text
完整课程体系
+ 手把手可复刻过程
+ 每课独立可运行源码
+ 浏览器 / 网络 / Runtime 原理
+ React / Vue 关键源码
+ 故障复现与 Debug
+ 性能 / 安全 / A11Y / 可靠性
+ Stage 综合项目
+ 贯穿式产品持续演进
+ 架构设计、平台建设与技术治理
```

建立前端工程师从实现、原理、工程、生产到架构治理的完整能力链。

---

## 当前状态

> ✅ 前端架构师课程唯一总纲已经完成。  
> 🚧 Stage 04 CSS、Stage 08 TypeScript 与 Stage 11 React 已进入正式课程建设。

当前已经完成：

- Stage 00～Stage 30 的完整学习路线；
- 各 Stage 的阶段目标、Owner Module、综合项目和验收标准；
- `Architect Workbench` 贯穿式项目 V0～V15 演进路线；
- 统一教学与课程编写规范；
- Stage 04 CSS 的完整 Stage / Module 规划及已落地课程；
- Stage 08 TypeScript 的完整 Stage 规划及首批具体课程；
- Stage 11 React 的 26 个 Owner Module 轻规划；
- React Module 11.01 的 **RE-1101-001 ～ RE-1101-008 共 8 / 8 节具体课程**；
- React Module 11.01 的 Failure Lab、Strict Mode Debug、局部 Root 实验、Module Project、迁移报告和自动验证脚本；
- 已完成 Lesson 均直接保存详细 README 与完整可运行源码。

---

## 唯一课程根目录

仓库现在统一采用一个课程根目录：

```text
learn-frontend-web-course/
```

不再区分“课程设计目录”和“正式课程目录”。

统一结构：

```text
learn-frontend-web-course/
├── README.md                       # 全课程唯一总纲
├── FRONTEND_TEACHING_GUIDE.md      # 统一教学规范
└── stageXX-topic/
    ├── README.md                   # Stage 目标、Module 地图、进度、项目
    └── moduleXX-YY-topic/
        ├── README.md               # Module 边界、Lesson 索引、验收
        └── lesson-name/
            ├── README.md           # 具体知识点详细课程
            ├── package.json        # 需要时提供
            ├── index.html          # 需要时提供
            ├── src/                # 完整源码
            ├── tests/              # 需要时提供
            └── 运行所需配置
```

也就是：

```text
总纲
→ Stage
→ Module
→ Lesson
→ README + 完整源码 + 实验 + 验收
```

---

## 核心入口

### 总体设计

- [前端架构师课程唯一总纲](./learn-frontend-web-course/README.md)
- [统一教学与课程编写规范](./learn-frontend-web-course/FRONTEND_TEACHING_GUIDE.md)

### Stage 04：CSS

- [CSS Stage 详细设计与课程入口](./learn-frontend-web-course/stage-04-css/README.md)
- [Module 04.01：CSS 语言、样式表与级联体系](./learn-frontend-web-course/stage-04-css/04.01-css-language-and-stylesheets/README.md)

### Stage 08：TypeScript

- [TypeScript Stage 课程入口](./learn-frontend-web-course/stage-08-typescript/README.md)

### Stage 11：React

- [React Stage 详细设计与课程入口](./learn-frontend-web-course/stage11-react/README.md)
- [Module 11.01：React 的问题模型与声明式 UI](./learn-frontend-web-course/stage11-react/module11-01-react-problem-model/README.md)
- [RE-1101-001：手工 DOM 同步为什么会失控](./learn-frontend-web-course/stage11-react/module11-01-react-problem-model/01-manual-dom-sync-problem/README.md)
- [RE-1101-002：创建第一个 React 应用](./learn-frontend-web-course/stage11-react/module11-01-react-problem-model/02-first-react-application/README.md)
- [RE-1101-003：让状态声明 UI](./learn-frontend-web-course/stage11-react/module11-01-react-problem-model/03-state-declares-ui/README.md)
- [RE-1101-004：Component Tree 与单向更新流](./learn-frontend-web-course/stage11-react/module11-01-react-problem-model/04-component-tree-one-way-flow/README.md)
- [RE-1101-005：整体应用与局部接入边界](./learn-frontend-web-course/stage11-react/module11-01-react-problem-model/05-whole-app-vs-partial-roots/README.md)
- [RE-1101-006：Strict Mode 与第一套 Debug 基线](./learn-frontend-web-course/stage11-react/module11-01-react-problem-model/06-strict-mode-debug-baseline/README.md)
- [RE-1101-007：Failure Lab——重复状态与 DOM 逃生](./learn-frontend-web-course/stage11-react/module11-01-react-problem-model/07-failure-lab-duplicate-state-dom-escape/README.md)
- [RE-1101-008：Module Project——Release Console Migration](./learn-frontend-web-course/stage11-react/module11-01-react-problem-model/08-module-project-release-console-migration/README.md)

`learn-frontend-web-course/README.md` 是课程唯一总纲。Stage、Module 和 Lesson 只能在这棵课程树中继续细化，不再建立平行课程根目录。

---

## 完整路线

```text
Stage 00  开发环境、命令行、Git 与工程师基本功
Stage 01  计算机组成、操作系统、Linux 与网络底层基础
Stage 02  Internet、URL、DNS、TCP/TLS、HTTP 与 Web 系统模型
Stage 03  HTML、语义、表单、媒体、SEO 与可访问性
Stage 04  CSS、布局、响应式、现代 CSS、动画、Token 与样式架构
Stage 05  JavaScript 语言、对象体系、集合、模块、元编程与设计抽象
Stage 06  JavaScript Async、Runtime、Event Loop、Memory、Engine 与算法
Stage 07  DOM、Event、Form、History 与原生浏览器应用
Stage 08  TypeScript 从基础到高级类型、Schema、SDK 与类型架构
Stage 09  浏览器渲染、多进程、生命周期、存储、Worker 与 Web Platform
Stage 10  HTTP/2/3、缓存、API、实时通信、流式、数据一致性与离线韧性
Stage 11  React 完整体系
Stage 12  Vue 完整体系
Stage 13  多框架范式、Angular 企业认知、Web Components 与历史系统迁移
Stage 14  UI Engineering、复杂组件、Design System、A11Y、国际化与样式平台
Stage 15  Node.js Runtime、CLI、Stream、Process 与前端服务工具
Stage 16  Compiler、AST、Bundler、Package、Monorepo 与 Developer Experience
Stage 17  静态分析、Unit、Component、Integration、E2E、Visual 与质量工程
Stage 18  BFF、Next.js、Nuxt、SSR/SSG、Edge、CDN 与全栈前端
Stage 19  数据与平台集成：数据库认知、CMS、Search、Object Storage、Payment、Analytics
Stage 20  PWA、Desktop、Mobile、小程序、TV/OTT 与跨端工程
Stage 21  Realtime Collaboration、Local-first、离线同步、OT/CRDT 与多人系统
Stage 22  SVG、Canvas、WebGL/WebGPU、音视频、WASM、WebXR 与高性能可视化
Stage 23  Schema-driven UI、动态表单、低代码、Visual Editor 与插件式业务平台
Stage 24  前端性能工程、RUM、Core Web Vitals、Memory、Capacity 与规模治理
Stage 25  Web 安全、企业认证、隐私、供应链、Threat Modeling 与安全治理
Stage 26  Observability、SLO、故障治理、CI/CD、Container、Kubernetes、GitOps 与云交付
Stage 27  DDD、模块化、Microfrontend、Plugin、Multitenancy 与大型前端架构
Stage 28  Frontend Platform、迁移、技术债、Governance、成本、产品与 Staff/Principal 影响力
Stage 29  AI-assisted Development、MCP、AI Native Frontend、Agent UX、安全与评估
Stage 30  Principal 级综合毕业项目与正式架构答辩
```

每个核心主题只设置一个 Owner Module，从基础使用一路学习到高级边界、Debug、原理、关键源码、性能、安全、生产实践和架构取舍。

---

## Stage 11 React 当前路线

```text
声明式 UI
→ JSX / Element / Component
→ Props / Composition
→ State / Update Queue / Batching
→ Event / Form / List / Key
→ Effect / Ref / Reducer / Context / Custom Hook
→ Router / Server State / Suspense / Concurrency / Action
→ Styling / A11Y / Testing / Performance
→ SSR / Streaming / Hydration / Server Boundary
→ Fiber / Reconciler / Scheduler / Hook / DOM Renderer 源码
→ Library / 大型架构 / 迁移 / 生产治理
```

当前已经完整完成第一条学习链：

```text
手工 DOM 同步问题
→ React Root
→ State 声明 UI
→ Component Tree 与 State Owner
→ 整体 / 局部 Root 边界
→ Strict Mode Debug
→ 重复 State / DOM Ownership Failure Lab
→ Release Console Migration
```

下一步进入：

```text
Module 11.02
JSX、Element、Component 与 Render Output
```

---

## 实践体系

```text
每课可复现实验
   ↓
Module Project
   ↓
Stage 综合项目
   ↓
故障注入与诊断实验
   ↓
Architect Workbench 贯穿式项目
   ↓
Principal 级毕业项目与架构答辩
```

当前已经确定的 Stage 综合项目包括：

- **Stage 04 — Responsive UI System / Architect Workbench UI Foundation v1**。
- **Stage 11 — React Enterprise Console**。

---

## 最重要的课程原则

### 一个主题，一次学透

同一主题不重复建立基础篇、高级篇、原理篇和源码篇。唯一 Owner Module 必须形成完整闭环。

### 每一课都能完整复刻

所有代码、命令、文件、运行时机、观察结果和原因都要写清楚。

### 每一课最终源码独立运行

进入任意 Lesson 后，都能独立安装、启动、构建和验证，不依赖上一课服务器或目录。

### 不默认学习者已经懂了

不能因为内容基础、以前讲过或 IDE 会提示，就省略当前课程需要的上下文和操作。

### 范围做减法，解释做加法

项目保持最小，但现象、原因、边界、错误、Debug 和生产意义必须解释完整。

---

## 当前目录

```text
learn-frontend-web/
├── README.md
├── .github/
└── learn-frontend-web-course/
    ├── README.md
    ├── FRONTEND_TEACHING_GUIDE.md
    ├── stage-04-css/
    ├── stage-08-typescript/
    └── stage11-react/
        ├── README.md
        └── module11-01-react-problem-model/
            ├── README.md
            ├── 01-manual-dom-sync-problem/
            ├── 02-first-react-application/
            ├── 03-state-declares-ui/
            ├── 04-component-tree-one-way-flow/
            ├── 05-whole-app-vs-partial-roots/
            ├── 06-strict-mode-debug-baseline/
            ├── 07-failure-lab-duplicate-state-dom-escape/
            └── 08-module-project-release-console-migration/
```

现在只有一个课程根目录：`learn-frontend-web-course/`。Stage、Module、Lesson、README、源码和项目全部在这棵树中维护。

---

## 最终目标

最终不是只会说：

> “我会 HTML、CSS、JavaScript、React、Vue、Next.js。”

而是能够做到：

> 理解复杂 Web 系统为什么这样设计；能够通过浏览器、网络、源码、指标和实验验证判断；知道系统会在哪里失败，如何保证性能、安全、可访问、可靠和可演进；也知道什么时候应该主动拒绝或删除不必要的复杂度。
