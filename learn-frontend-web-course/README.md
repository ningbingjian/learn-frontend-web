# Learn Frontend Web Course

`learn-frontend-web-course` 是 `learn-frontend-web` 的**课程设计与大纲中心**。

这里先完成课程体系、能力模型、知识边界、项目主线、验收标准、统一教学规范和演进规则的设计，再把确认后的内容拆入正式课程目录 `courses/frontend-architect`。这样可以避免一边写具体课程，一边频繁推翻整体结构。

> 当前状态：Frontend Architect 课程正在重新设计。这里的内容属于 **Course Blueprint / Teaching Standard**，不是已经完成的正式课程。

## 当前总纲

当前是一套从零基础到极其资深前端架构师的完整学习总纲，采用：

- **8 个能力等级**：L0 到 L7。
- **28 卷课程体系**：从计算机与 Web 入门，一直到前端平台、组织治理和 AI 原生前端。
- **84 个学习阶段**：每卷 3 个阶段。
- **300+ 个模块方向**：后续继续拆分为 Module、Knowledge Point、Lab 和 Project。
- **一条长期主线项目**：从静态页面逐步演进为企业级、多租户、可观测、可扩展、AI 原生的前端平台。
- **多种可验证产物**：源码、测试、DevTools 证据、性能报告、威胁模型、ADR、架构图、迁移方案、SLO 与故障复盘。

## 文档导航

1. [统一教学规范](./FRONTEND_TEACHING_GUIDE.md)
2. [总览、能力模型与课程地图](./00-overview-and-capability-model.md)
3. [卷 01～09：零基础、HTML、CSS、JavaScript、TypeScript](./01-foundation-to-typescript.md)
4. [卷 10～15：浏览器、网络、React、Vue、应用与 UI 工程](./02-browser-framework-ui.md)
5. [卷 16～21：Node.js、构建、仓库工程、测试、全栈与跨端](./03-engineering-fullstack-cross-platform.md)
6. [卷 22～28：性能、安全、可靠性、架构、平台、领导力与 AI](./04-quality-security-architecture-ai.md)
7. [长期项目、阶段验收、学习节奏与课程演进规则](./05-projects-assessment-and-evolution.md)

## 与仓库其他内容的关系

- [`README.md`](../README.md)：仓库对外入口和当前建设状态。
- [`FRONTEND_TEACHING_GUIDE.md`](./FRONTEND_TEACHING_GUIDE.md)：正式课程内容的统一教学规范。
- `learn-frontend-web-course/`：课程大纲、教学规范、调研、总纲和候选材料。
- `courses/frontend-architect/`：大纲确认后重新创建的正式课程区。

## 课程建设顺序

```text
先确定能力终点
    ↓
建立能力等级与课程地图
    ↓
确定阶段依赖、主线项目和验收标准
    ↓
把 Stage 拆成 Module
    ↓
把 Module 拆成 Knowledge Point / Lab / Project
    ↓
按 FRONTEND_TEACHING_GUIDE.md 编写正式课程
    ↓
运行、测试、评审、修订
```

## 使用原则

1. **总纲不是技术名词清单**：每个阶段都要回答学什么、为什么学、如何实践、产出什么、如何证明掌握。
2. **版本会变化，能力模型不随版本漂移**：正式课程使用当时的稳定版或 LTS 版，并记录版本基线和升级说明。
3. **至少一个框架达到源码和架构深度**：React 与 Vue 都要达到企业级应用能力，其中至少一个继续深入到调度、响应式、编译、SSR、Hydration 和源码调试。
4. **主线项目持续演进**：不采用“每学一个 API 就重新建一个无关 Demo”的碎片化方式。
5. **证据优先**：重要结论必须通过运行结果、浏览器面板、测试、性能数据、网络记录、源码断点或架构产物证明。
6. **架构能力单独验收**：会写业务代码不等于会做架构，后期必须通过 ADR、Trade-off、容量模型、故障模型、迁移方案和架构答辩验收。

## 当前版本

- 大纲版本：`v0.1`
- 基线日期：`2026-09-01`
- 状态：`Draft / 待评审`
- 下一步：评审 28 卷与 84 阶段的范围、顺序和深度，然后开始拆分第一批 Module。