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

> ✅ **前端架构师课程唯一总纲已经完成。**  
> 🚧 正式 Stage、Module、Lesson 和配套源码将按照总纲逐步建设。

当前已经完成：

- Stage 00～Stage 30 的完整学习路线。
- 各 Stage 的阶段目标、Owner Module、综合项目和验收标准。
- React、Vue、浏览器、工程化、全栈前端、跨端、性能、安全、云交付、架构治理和 AI Native Frontend 的完整覆盖。
- `Architect Workbench` 贯穿式项目 V0～V15 演进路线。
- Must / Should / Expert 深度标准。
- Lesson、Module、Stage 与毕业项目的统一完成标准。
- 统一教学与课程编写规范。

---

## 核心入口

- [前端架构师课程唯一总纲](./learn-frontend-web-course/README.md)
- [统一教学与课程编写规范](./learn-frontend-web-course/FRONTEND_TEACHING_GUIDE.md)

`learn-frontend-web-course/README.md` 是课程唯一总纲。后续 Stage 和 Module 文档只能细化它，不能再创建平行课程体系。

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

每个核心主题只设置一个 Owner Module，从基础使用一直学习到高级边界、Debug、原理、关键源码、性能、安全、生产实践和架构取舍。

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

贯穿项目会依次经历：

```text
静态网站
→ 原生 JavaScript / TypeScript 应用
→ React 企业控制台
→ Vue 业务域与迁移实验
→ Design System
→ Monorepo 与研发平台
→ BFF / SSR / Streaming / Edge
→ PWA / Desktop / Mobile / TV
→ Realtime / Local-first
→ Visual Editor / Low-code / Plugin
→ 性能、安全、可观测与云交付
→ 多租户与多团队架构
→ AI Native Workbench
```

---

## 最重要的课程原则

### 一个主题，一次学透

不把同一个知识点人为拆成基础篇、高级篇、原理篇和源码篇。唯一 Owner Module 必须形成完整闭环。

### 每一课都必须能够完整复刻

所有代码、命令、文件、运行时机、观察结果和原因都要写清楚，不能只写“在上一课基础上继续”。

### 每一课最终源码必须独立运行

学习者进入任意 Lesson，都能按照 README 独立安装、启动、构建、测试和验证。

### 不允许默认学习者已经懂了

不能因为内容基础、以前讲过或 IDE 会提示，就省略当前课程真正需要的上下文和操作。

### 范围做减法，解释做加法

使用能够证明知识点的最小项目，但必须把现象、原因、边界、错误、Debug 和生产意义解释完整。

---

## 后续目录结构

```text
learn-frontend-web/
├── README.md
├── learn-frontend-web-course/
│   ├── README.md                       # 唯一总纲
│   ├── FRONTEND_TEACHING_GUIDE.md      # 教学规范
│   └── stageXX-topic/                  # 后续 Stage 详细设计
│       └── moduleXX-YY-topic/
└── courses/
    └── frontend-architect/             # 后续正式课程与源码
        └── stageXX-topic/
            └── moduleXX-YY-topic/
                └── lesson-name/
```

正式课程建设顺序、课程边界、贯穿项目版本和每个 Stage 的详细内容，请查看：

- [learn-frontend-web-course/README.md](./learn-frontend-web-course/README.md)

---

## 最终目标

最终不是只会说：

> “我会 HTML、CSS、JavaScript、React、Vue、Next.js。”

而是能够做到：

> 理解一个复杂 Web 系统为什么这样设计；能够通过浏览器、网络、源码、指标和实验验证判断；知道它会在哪里失败，如何保证性能、安全、可访问、可靠和可演进；也知道什么时候应该主动拒绝或删除不必要的技术复杂度。