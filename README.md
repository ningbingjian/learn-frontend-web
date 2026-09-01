# Learn Frontend Web

一个从 **零基础前端开发** 持续成长到 **资深前端工程师 / 前端架构师** 的长期学习与实践仓库。

本仓库不是单纯的知识点笔记，而是计划以 **系统课程 + 可运行源码 + 项目实战 + 工程化实践 + 架构设计** 的方式，重新构建完整的前端学习体系。

## 当前状态

> 🚧 **Frontend Architect 课程正在重新设计。**

原 `courses/frontend-architect` 下的旧课程内容已经清理。接下来会先完成课程体系、阶段划分、模块设计、项目主线和验收标准，再重新编写正式课程。

因此，当前仓库暂时不再标记 HTML、CSS、TypeScript、React 等旧模块为“已完成”。新课程会在整体大纲评审后重新创建并逐步落地。

## 课程源材料

已经新增独立的课程源材料区：

- [Learn Frontend Web Sources](./learn-frontend-web-sources/README.md)
- [从零基础到极其资深前端架构师：总览、能力模型与课程地图](./learn-frontend-web-sources/00-overview-and-capability-model.md)

当前总纲采用 **8 个能力等级、28 卷、84 个阶段**，覆盖从计算机、Web、HTML、CSS、JavaScript、TypeScript、浏览器和网络，到 React、Vue、工程化、全栈、跨端、性能、安全、可靠性、前端架构、平台治理、领导力与 AI 原生前端。

源材料区用于课程设计与评审；确认后的内容才会拆入正式课程目录 `courses/frontend-architect`。

## 学习目标

课程最终目标不是只掌握某一个前端框架，而是建立完整的前端技术能力体系：

- Web 与浏览器基础
- HTML / CSS / JavaScript / TypeScript
- React / Vue 等现代前端框架及其生态
- 前端工程化与构建体系
- Node.js 与前端服务层能力
- 网络、浏览器原理与性能优化
- 前端测试体系与质量工程
- 组件库、设计系统与大型应用架构
- 微前端、插件系统、跨端与多端工程
- 前端安全、隐私、监控与可观测性
- CI/CD、部署与云原生前端工程
- 多租户、前端平台与大型团队架构治理
- AI 时代的前端开发、Agent UX 与工程效率
- 从业务开发到 Principal 级前端架构能力的综合项目实战

## 课程建设原则

课程将尽量遵循以下方式组织：

1. **从 0 到 1**：不默认已经掌握关键前置知识。
2. **理论 + 实践**：知识点必须尽量配套可运行代码或其他可验证证据。
3. **循序渐进**：基础、进阶、高级、工程化、质量、架构和组织能力逐层提升。
4. **面向真实开发**：不仅解释 API，还要解释为什么这样设计、实际项目怎么使用。
5. **长期主线项目**：重要能力持续演进到同一个企业级项目，而不是长期停留在孤立 Demo。
6. **证据优先**：通过 DevTools、测试、网络记录、性能数据、源码断点或架构产物验证结论。
7. **架构视角**：后期重点训练技术选型、复杂度控制、性能、安全、稳定性、成本、可维护性和团队协作。
8. **持续更新**：课程内容根据 Web 标准、现代前端生态和工程实践持续演进。

## 教学规范

正式课程详细内容遵循仓库中的统一教学规范：

- [Frontend Teaching Guide](./FRONTEND_TEACHING_GUIDE.md)

## 目录规划

```text
learn-frontend-web/
├── README.md
├── FRONTEND_TEACHING_GUIDE.md
├── learn-frontend-web-sources/       # 课程源材料、能力模型与完整大纲
│   ├── README.md
│   ├── 00-overview-and-capability-model.md
│   ├── 01-foundation-to-typescript.md
│   ├── 02-browser-framework-ui.md
│   ├── 03-engineering-fullstack-cross-platform.md
│   ├── 04-quality-security-architecture-ai.md
│   └── 05-projects-assessment-and-evolution.md
└── courses/
    └── frontend-architect/            # 大纲确认后重新创建正式课程
        ├── README.md
        ├── level00-...
        ├── level01-...
        └── ...
```

> 当前阶段的重点：**先把从零基础到极其资深前端架构师的完整课程体系设计正确，再开始批量编写具体课程。**