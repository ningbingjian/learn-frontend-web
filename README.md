# Learn Frontend Web

一个从 **零基础前端开发** 持续成长到 **极其资深前端工程师 / 前端架构师** 的长期学习与实践仓库。

本仓库不是单纯的知识点笔记，而是以 **系统课程 + 可独立运行源码 + 手把手复刻过程 + 项目实战 + 工程化实践 + 原理 / 源码 + 架构设计与治理** 的方式，重新构建完整的前端学习体系。

---

## 当前状态

> 🚧 **Frontend Architect 课程正在重新设计。**

原 `courses/frontend-architect` 下的旧课程内容已经清理。

当前阶段先在 `learn-frontend-web-course/` 中完成：

- 能力模型；
- 课程大纲；
- Module 深度边界；
- 项目体系；
- 验收标准；
- 统一教学与课程编写规范；
- 课程演进和版本治理规则。

确认后再重新创建正式课程内容。

---

## 课程设计与大纲

核心文档：

- [Learn Frontend Web Course](./learn-frontend-web-course/README.md)
- [从零基础到极其资深前端架构师：总览、能力模型与课程地图](./learn-frontend-web-course/00-overview-and-capability-model.md)
- [Frontend Teaching Guide](./learn-frontend-web-course/FRONTEND_TEACHING_GUIDE.md)
- [长期项目、阶段验收、拆课与课程演进规则](./learn-frontend-web-course/05-projects-assessment-and-evolution.md)

当前大纲版本：`v0.2`。

v0.1 的 28 卷 / 84 Stage 详细地图继续保留为重构底稿，但 **v0.2 不再把“固定 84 Stage”作为最终约束**。后续会根据知识本身拆开过载 Stage、合并重复内容并补齐缺失领域。

---

## 最重要的课程原则

### 1. 一个 Module，一次学透

同一个知识主题不再采用：

```text
基础篇
→ 高级篇
→ 深入篇
→ 原理篇
→ 源码篇
```

而是在唯一 Owner Module 中，从基础一路覆盖到：

```text
基础使用
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
→ 综合实战
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

高级课程也不取消这项要求。独立设计能力通过 Challenge / Project / Architecture Exercise 训练，而不是通过把教学文档故意写得不完整训练。

---

## Must / Should / Expert

三档表示同一主题的不同学习深度：

```text
Must
→ 正常前端开发必须掌握的正确使用和基础模型

Should
→ 高级 / 资深前端需要掌握的复杂场景、故障、Debug、工程和性能

Expert
→ 技术专家 / 前端架构师需要掌握的机制、源码、系统性能、安全、架构与治理
```

它们不是三个不同课程，也不是“Expert 可以不讲”的选修开关。

本课程目标是从零到极其资深前端架构师，因此一个完整主教学 Module 计划内的 Must / Should / Expert 最终都要覆盖。

---

## 学习目标

课程最终建立完整的前端技术能力体系，包括但不限于：

- 计算机、操作系统与工程师基本功；
- Web、HTTP、浏览器与网络；
- HTML / CSS / JavaScript / TypeScript；
- React / Vue 以及至少一个框架的源码与架构深度；
- UI 工程、A11Y、全球化与设计系统；
- Node.js、编译器、构建器、Monorepo 与包工程；
- 测试、性能、安全、身份、隐私与可靠性；
- BFF、SSR、Edge、CDN、容器、Kubernetes 与云交付；
- 实时、离线、数据一致性和第三方集成；
- Desktop / Mobile / TV、图形、媒体和新兴 Web 能力；
- DDD、微前端、插件、多租户、Schema-driven UI / Low-code；
- 前端平台、Developer Portal、迁移和技术治理；
- 产品、数据实验、成本和组织影响；
- AI 辅助研发、MCP、Agent UX、AI 安全与评估。

---

## 实践体系

```text
Lesson Minimal Lab / Evolving Lesson
        ↓
Module Project
        ↓
Stage Project
        ↓
Frontend Cloud Workbench
        ↓
Specialization / Domain Capstone
        ↓
Principal Capstone
```

长期主线项目继续使用 **Frontend Cloud Workbench (FCW)**，但架构阶段还会加入企业 SaaS、电商交易、内容 / SEO、实时协作、媒体 / TV、数据分析、低代码和 AI Agent 等不同领域项目，避免只会设计一种后台 SaaS。

---

## 目录

```text
learn-frontend-web/
├── README.md
├── learn-frontend-web-course/
│   ├── README.md
│   ├── FRONTEND_TEACHING_GUIDE.md
│   ├── 00-overview-and-capability-model.md
│   ├── 01-foundation-to-typescript.md
│   ├── 02-browser-framework-ui.md
│   ├── 03-engineering-fullstack-cross-platform.md
│   ├── 04-quality-security-architecture-ai.md
│   └── 05-projects-assessment-and-evolution.md
└── courses/
    └── frontend-architect/
        └── 大纲确认后重新创建正式课程
```

当前阶段的重点不是马上批量生成课程，而是：

> **先把广度、深度、Module 边界、可复刻教学规则和验收标准设计正确，再开始正式课程建设。**
