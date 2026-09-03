# Learn Frontend Web

一个从 **完全零基础** 持续成长到 **极其资深前端工程师 / Staff / Principal / 前端架构师** 的长期学习与实践仓库。

本仓库不是 API 笔记、框架速成教程或面试八股合集，而是以：

```text
系统课程
+ 手把手可复刻过程
+ 每课独立可运行源码
+ 原理 / 源码
+ 故障与 Debug
+ 性能 / 安全 / 可靠性
+ 顺着学习进度自然出现的综合项目
+ 架构设计、平台建设与治理
```

构建完整前端学习体系。

---

## 当前状态

> 🚧 **Frontend Architect 正式课程已经开始落地。**

课程设计继续统一放在 `learn-frontend-web-course/`；正式可学习课程放在 `courses/frontend-architect/`。

当前 React Stage 11 已完成：

```text
Stage 总纲
→ 35 个 Owner Module
→ 1101 个 Lesson 大纲
→ Dependency / Duplication / Granularity / Knowledge Ceiling 全局复审
→ 按 Module 拆分课程设计文档
→ 开始正式逐 Lesson 编写 README 与完整源码
```

第一篇正式课程已经完成：

- [RE-INTRO-001：网页交互为什么会越来越难维护](./courses/frontend-architect/stage11-react/module11-01-react-foundation/01-web-interaction-complexity/README.md)

---

## 核心入口

### 课程设计

- [前端架构师唯一总纲](./learn-frontend-web-course/README.md)
- [统一教学与课程编写规范](./learn-frontend-web-course/FRONTEND_TEACHING_GUIDE.md)
- [React Stage 11 详细设计](./learn-frontend-web-course/stage11-react/README.md)

`stage11-react/` 是唯一总纲下的 Stage 子级详细设计，不是另一套平行课程体系。

### 正式课程

- [Frontend Architect 正式课程入口](./courses/frontend-architect/README.md)
- [React Stage 11 正式课程](./courses/frontend-architect/stage11-react/README.md)

所有课程统一遵循：

```text
Stage
└── Module
    └── Lesson
```

故障复现、源码 Debug、性能分析、综合项目、架构复盘仍然可以出现，但它们在课程结构上全部都是普通 Lesson，不再增加新的层级类型。

---

## Stage / Module 组织原则

课程参考 `learn-java-course` 的结构思想：

```text
Stage = 一个较完整的技术 / 能力领域
Module = 该领域中的一个独立知识主题
Lesson = 一个可单独提出、操作、解释和验证的主要问题
```

因此不会再把同一核心技术人为拆成：

```text
React 基础 Stage
→ React 高级 Stage
→ React 源码 Stage
```

而是：

```text
Stage：React 完整体系
  ↓
State / Effect / Router / Suspense / SSR / RSC / Fiber / Migration / Architecture ...
```

React 只学一次，但这一次从零一路学习到源码、性能、服务端、迁移和大型架构。

Vue 同理。

---

## 当前总纲

新版总纲当前规划 **Stage 00 ～ Stage 30**：

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

详细 Stage / Module 设计统一查看：

- [learn-frontend-web-course/README.md](./learn-frontend-web-course/README.md)

---

## 最重要的课程原则

### 1. 一个 Module，一次学透

同一个知识主题不采用：

```text
基础篇
→ 高级篇
→ 深入篇
→ 原理篇
→ 源码篇
```

而是在唯一 Owner Module 中完成：

```text
为什么存在
→ 基础使用
→ 完整能力
→ 工程实践
→ 高级边界
→ Wrong Way / Failure
→ Debug
→ 原理
→ 源码（适用时）
→ 性能 / 安全 / A11Y（适用时）
→ Production Boundary
→ Trade-off / 架构
→ 综合实践
```

复杂 Module 可以拆很多 Lesson，但完成后不再通过同名“高级 / 源码课程”补课。

### 2. 每一课都必须能被学生完整复刻

需要代码、命令或实验的 Lesson，只允许：

```text
从零状态开始
```

或者：

```text
明确复制上一课最终源码
→ 验证上一课基线
→ 再逐步新增 / 修改 / 删除
```

禁止只写“在上一课基础上继续”然后直接给代码。

### 3. 每一课最终源码必须独立运行

即使当前课从上一课复制演进，当前 Lesson 自己仍然必须保存完整最终源码，可以独立安装、运行、测试和验证。

### 4. 不允许默认读者懂了

不能因为：

```text
以前讲过
太简单
属于常识
IDE 会提示
前端应该知道
```

就省略当前课程真正需要的操作和上下文。

### 5. 教学步骤必须精确到文件和位置

关键步骤必须写清：

```text
哪个目录
哪个文件
创建 / 修改 / 删除
找到哪一段代码
在上面 / 下面 / 内部修改什么
为什么这样改
什么时候运行
看到什么
为什么出现
理论上叫什么
```

独立设计能力通过 Challenge / Project / Architecture Exercise 训练，而不是通过把教学文档故意写得不完整训练。

---

## 当前目录

```text
learn-frontend-web/
├── README.md
├── learn-frontend-web-course/
│   ├── README.md
│   ├── FRONTEND_TEACHING_GUIDE.md
│   └── stage11-react/
│       ├── README.md
│       └── module11-xx-*/README.md
└── courses/
    └── frontend-architect/
        ├── README.md
        └── stage11-react/
            ├── README.md
            └── module11-01-react-foundation/
                ├── README.md
                └── 01-web-interaction-complexity/
                    ├── README.md
                    ├── index.html
                    ├── styles.css
                    └── app.js
```

当前阶段的重点：

> **React Stage 11 大纲已经完成全局复审，正式进入逐 Lesson 建设阶段。每完成一课，就同时交付完整教学 README、独立最终源码和可验证结果。**
