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
+ 自然穿插的综合项目
+ 架构设计、平台建设与治理
```

构建完整前端学习体系。

---

## 当前状态

> 🚧 **Frontend Architect 正式课程正在重新设计。**

原 `courses/frontend-architect` 旧课程已经清理。

当前先在 `learn-frontend-web-course/` 中把**唯一总纲**和**统一教学规范**设计正确，再按总纲逐 Stage → Module → Lesson 落地正式课程。

---

## 核心文档

当前课程设计区只保留两个核心来源：

- [前端架构师唯一总纲](./learn-frontend-web-course/README.md)
- [统一教学与课程编写规范](./learn-frontend-web-course/FRONTEND_TEACHING_GUIDE.md)

不再为 React、Vue、浏览器、性能、安全、项目等另外建立平行的专项总纲或项目路线。

所有内容统一进入一条课程主线：

```text
Stage
  ↓
Module
  ↓
Module
  ↓
知识已经足够组合
  ↓
综合实践 / Failure Lab / Source Lab / Performance Lab
  ↓
继续 Module
  ↓
阶段综合项目
  ↓
下一 Stage
```

项目和实验是正常学习顺序中的节点，不是另一套课程体系。

---

## 当前总纲

新版总纲当前规划 **Stage 00 ～ Stage 35**，覆盖：

```text
开发环境 / Git
→ 计算机 / OS / Linux / 网络基础
→ Internet / DNS / TCP / TLS / HTTP
→ HTML / SEO / A11Y
→ CSS / Modern CSS / Token / Theme
→ JavaScript 基础 / 对象 / 模块 / DOM / Async
→ JavaScript Runtime / Event Loop / Memory / Engine / JIT
→ TypeScript 类型架构
→ Browser Internals / Multi-process / Worker / PWA
→ HTTP2/3 / CDN / API / Realtime / Offline
→ React 从启动到 State / Effect / Suspense / RSC / Fiber 源码
→ Vue 从启动到响应式 / Renderer / Compiler / SSR 源码
→ 多框架 / Angular / Web Components / Legacy Migration
→ UI Engineering / Design System / A11Y / Globalization
→ Node.js / Compiler / Bundler / Package / Monorepo
→ Testing / Quality Engineering
→ BFF / Next.js / Nuxt / Edge / CDN
→ 数据一致性 / 企业身份 / CMS / Search / Storage / Analytics
→ PWA / Desktop / Mobile / Miniapp / TV
→ Realtime Collaboration / Local-first / OT / CRDT
→ SVG / Canvas / WebGPU / Media / WASM / WebXR
→ Schema-driven UI / Low-code / Visual Editor
→ Performance / RUM / Capacity
→ Security / Privacy / Supply Chain / Threat Modeling
→ Observability / SLO / CI/CD / Kubernetes / GitOps
→ DDD / Microfrontend / Plugin / Multitenancy / Frontend Platform
→ Migration / Governance / Staff & Principal Leadership
→ AI-assisted Development / MCP / Agent UX / AI Security
→ Principal 级毕业项目与架构答辩
```

详细 Stage、Module、综合实践和阶段验收全部直接写在：

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

而在唯一 Owner Module 中，从基础一路覆盖到：

```text
为什么需要
→ 从零使用
→ 完整能力
→ 工程实践
→ Wrong Way / Failure
→ Debug
→ 底层原理
→ 关键源码（适用时）
→ 性能 / 安全 / A11Y（适用时）
→ Production Boundary
→ Trade-off / 架构
→ 综合实践
```

### 2. 项目顺着学习进度自然出现

不单独建设一条 Projects 支线。

当截至当前位置学过的知识已经能够组成有意义的完整成果，就安排综合实践；随着学习深入，项目自然越来越复杂。

项目不得偷用未来课程尚未正式教授的核心技术。

### 3. 每一课都必须完整可复刻

需要代码、命令或实验的 Lesson，只允许：

```text
从零状态开始
```

或者：

```text
明确复制上一课最终源码
→ 先验证基线
→ 再逐步新增 / 修改 / 删除
```

当前 Lesson 最终源码必须独立安装、运行、测试和验证。

### 4. 不允许默认读者“应该会”

不能因为“上一课讲过”“太简单”“属于常识”“IDE 会提示”就省略当前课程真正需要的上下文和操作。

### 5. 手把手必须精确到文件和代码位置

关键步骤必须说明：

```text
哪个目录
哪个文件
创建 / 修改 / 删除
找到哪段代码
在哪里增加 / 替换
为什么这样改
什么时候运行
应该看到什么
为什么出现
理论上叫什么
```

高级课程也保留该要求。独立架构能力通过 Challenge / Project / Architecture Exercise 训练，而不是靠教学文档故意少写信息训练。

---

## 仓库规划

```text
learn-frontend-web/
├── README.md
├── learn-frontend-web-course/
│   ├── README.md                   # 唯一总纲
│   └── FRONTEND_TEACHING_GUIDE.md  # 唯一教学 / 编写规范
└── courses/
    └── frontend-architect/          # 总纲确认后逐 Stage 正式建设
```

当前最重要的工作是继续评审：

> **这份唯一总纲的 Stage 顺序是否正确、Module 是否足够完整、广度是否遗漏、深度是否真正达到资深架构师，以及综合实践是否在正确的学习时机自然出现。**
