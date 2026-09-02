# Learn Frontend Web Course

`learn-frontend-web-course` 是 `learn-frontend-web` 的**课程设计、大纲与教学规范中心**。

这里先把从零基础到极其资深前端架构师的能力边界、课程结构、知识深度、项目体系、验收标准和统一教学规范设计正确，再把确认后的内容拆入正式课程目录 `courses/frontend-architect`。

> 当前状态：Frontend Architect 课程正在重新设计。这里属于 **Course Blueprint / Teaching Standard**，不是已经完成的正式课程。

---

# 1. 当前版本

- 大纲版本：`v0.2`
- 教学规范版本：以 [`FRONTEND_TEACHING_GUIDE.md`](./FRONTEND_TEACHING_GUIDE.md) 为准
- 基线日期：`2026-09-02`
- 状态：`Draft / 待继续拆分评审`

v0.2 的重点不是继续堆技术名词，而是先解决三件事：

1. **广度必须完整**：不能只会 React/Vue API，要覆盖浏览器、网络、工程化、测试、性能、安全、可靠性、全栈、跨端、架构、平台、组织和 AI 等完整能力。
2. **深度必须闭环**：一个 Module 一次学透，不能先讲基础、以后再补“高级篇 / 源码篇 / 性能篇”。
3. **每一课必须能被学生完整复刻**：不能因为某个操作以前讲过、很简单、属于常识，就默认学习者会。

---

# 2. 五条不可违反的核心规则

## 2.1 一个 Module，一次学透

一个知识主题只允许有一个主教学 Module。

该 Module 必须按主题自身需要，从最基础一路覆盖到高级、原理、故障、调试、性能、源码和生产架构边界，形成完整闭环。

```text
为什么存在
    ↓
基础概念与最小使用
    ↓
完整能力与工程实践
    ↓
高级特性与边界
    ↓
错误用法与故障
    ↓
Debug / 诊断
    ↓
底层机制 / 原理
    ↓
核心源码（适用时）
    ↓
性能 / 安全 / 兼容 / A11Y（适用时）
    ↓
Production Boundary
    ↓
技术选型 / 替代方案 / Trade-off
    ↓
模块综合实战与验收
```

后续课程再次使用该主题时，只允许：

- 使用已经学过的能力；
- 引用原 Module；
- 在新的业务上下文中组合应用。

禁止通过下面的方式弥补前面没有讲透的问题：

```text
XXX 高级篇
XXX 深入篇
XXX 原理篇
XXX 源码篇
XXX 性能篇
```

> “一次学透”指 **Module 闭环**，不等于一节 Lesson 塞完所有内容。一个复杂 Module 可以拆成很多 Knowledge Point / Lesson / Lab，但它们必须在同一个 Module 内把主题讲完整。

## 2.2 每一课都必须可复刻

每一节需要代码、命令或实验的课程，只允许两种起点：

### 方式 A：独立零状态

```text
空目录 / 最小空项目
    ↓
README 手把手创建
    ↓
最终得到当前 Lesson 的完整可运行源码
```

### 方式 B：明确从上一课演进

如果当前知识点确实必须依赖上一课项目状态，则 README 必须首先提供：

```text
Step 0：准备本课起始项目

1. 来源课程是什么
2. 上一课最终源码目录在哪里
3. 如何复制为当前课程目录
4. 当前目录应该长什么样
5. 是否需要重新安装依赖
6. 如何先运行复制后的基线
7. 基线应该看到什么
8. 本课接下来新增 / 修改 / 删除哪些文件
```

不能只写：

> “在上一节项目基础上继续。”

然后直接给修改后的代码。

## 2.3 每一课最终源码必须独立运行

无论课程从零创建，还是复制上一课继续演进：

> **当前 Lesson 自己的最终源码必须是一份完整工程。**

学生进入当前课程目录后，按照 README 的环境和命令即可独立安装、运行、测试和验证。

禁止：

- 运行时引用上一课目录里的源码；
- 依赖上一课正在运行的前端项目才能启动当前 Lesson；
- README 缺少当前 Lesson 的启动方式；
- 只保留 Diff，没有完整最终源码。

## 2.4 不允许默认学生“应该会”

课程作者不得因为以下理由省略当前课程真正需要的信息：

```text
“上一课讲过了”
“这个太简单”
“这属于常识”
“前端都应该知道”
“IDE 自己会提示”
“照最终源码看就懂了”
```

当前课程需要的操作必须重新说明当前上下文，尤其包括：

- 当前项目是干什么的；
- 当前文件为什么存在；
- 新 API / Hook / 配置第一次在当前学习链出现时是什么；
- 哪个目录执行命令；
- 创建还是修改文件；
- 修改已有文件时具体在什么位置；
- 为什么这样写；
- 当前能否运行；
- 应该观察什么；
- 结果为什么出现；
- 这个现象在理论上叫什么。

## 2.5 教学必须精确到文件和代码位置

所有 BUILD / FAILURE / SOURCE / PERFORMANCE / PROJECT 类课程中的关键操作，都必须尽量明确：

```text
文件完整路径
→ 创建新文件 / 修改已有文件 / 删除文件
→ 找到哪个类 / 函数 / JSX / 配置块
→ 在它的上面 / 下面 / 内部增加什么
→ 或替换哪个完整片段
→ 是否增加 import / dependency / script
→ 为什么修改这里
→ 修改完成后当前状态是什么
```

高级课程也不能通过“故意少写步骤”训练独立性。

独立设计能力应放在 `Challenge / Project / Architecture Exercise` 中训练，而不是靠教学文档缺信息制造困难。

---

# 3. Must / Should / Expert 的含义

三个标签表示**同一个 Module 内不同能力深度**，不是三个不同课程，也不是可以随便跳过的选修标签。

- **Must**：正常前端开发必须掌握的正确使用、基础心智模型和常见错误。
- **Should**：高级 / 资深前端应掌握的复杂场景、边界、故障、调试、工程和性能能力。
- **Expert**：技术专家 / 前端架构师需要掌握的底层机制、关键源码、系统性性能、安全、架构取舍和治理能力。

例如 React Effect：

```text
Must
→ Effect 什么时候需要、cleanup、依赖、取消请求

Should
→ stale closure、race condition、StrictMode、Effect 与外部系统同步边界

Expert
→ Render/Commit、Passive Effect、Fiber 上的 Effect 模型、源码 Debug、Effect-heavy 架构治理
```

对于本课程的目标——“从零基础到极其资深前端架构师”——一个被列为完整主教学 Module 的主题，最终必须把计划内的 Must / Should / Expert 深度都讲完。

标签的作用是告诉学习者当前学到了什么层级，而不是用 `Expert` 作为省略理由。

---

# 4. 课程结构

正式课程按以下层级组织：

```text
Capability Level
└── Domain / Volume
    └── Stage
        └── Module
            ├── Knowledge Point / Lesson
            ├── Mechanism Lab
            ├── Failure Lab
            ├── Performance Lab
            ├── Security / A11Y Lab
            ├── Source Lab
            └── Module Project / Review
```

结构必须服从知识本身，不为了数字漂亮强行保持每卷相同 Stage 数或每个 Stage 相同 Module 数。

当前 28 卷、84 Stage 仍作为 v0.1 课程地图的基础材料，但 v0.2 拆分时允许：

- 拆开过载 Stage；
- 合并重复 Stage；
- 增加缺失领域；
- 调整前后依赖；
- 不把“固定 84 Stage”作为最终约束。

---

# 5. 实践体系

前端课程采用多层实践体系：

```text
Lesson Minimal Lab / Evolving Lesson Source
        ↓
Module 综合实战
        ↓
Stage Project
        ↓
Frontend Cloud Workbench 长期主线
        ↓
Specialization / Domain Project
        ↓
Principal Capstone
```

其中：

- 独立机制、故障、性能、源码实验优先使用**独立最小项目**；
- 连续 BUILD 课程允许基于上一课演进，但必须明确复制和修改过程；
- 每一课最终源码都必须独立运行；
- 综合项目用于组合多个已经学透的 Module，不替代 Module 本身的深度教学。

---

# 6. 当前大纲导航

1. [统一教学与课程编写规范](./FRONTEND_TEACHING_GUIDE.md)
2. [总览、能力模型与课程地图](./00-overview-and-capability-model.md)
3. [卷 01～09：零基础、HTML、CSS、JavaScript、TypeScript](./01-foundation-to-typescript.md)
4. [卷 10～15：浏览器、网络、React、Vue、应用与 UI 工程](./02-browser-framework-ui.md)
5. [卷 16～21：Node.js、构建、仓库工程、测试、全栈与跨端](./03-engineering-fullstack-cross-platform.md)
6. [卷 22～28：性能、安全、可靠性、架构、平台、领导力与 AI](./04-quality-security-architecture-ai.md)
7. [长期项目、阶段验收、拆课与演进规则](./05-projects-assessment-and-evolution.md)

> 01～04 目前仍保留 v0.1 的详细阶段内容，后续将在 v0.2 规则稳定后逐卷重新检查：广度缺口、Stage 过载、Module 是否一次学透、前置依赖和项目可复刻性。

---

# 7. v0.2 广度与深度重点补强方向

后续重新评审 01～04 时，除现有内容外，重点检查以下能力是否形成完整学习链，而不是只出现几个名词：

- JavaScript 引擎：解析、字节码、JIT、Shape/Hidden Class、Inline Cache、Deopt 与真实性能边界。
- 浏览器多进程：Browser/Renderer/Network/GPU Process、Site Isolation、Sandbox、IPC、OOPIF、导航与 DevTools Protocol。
- 数据与分布式基础：SQL/关系模型、事务、隔离、锁、缓存一致性、MQ、幂等、最终一致性、Outbox/CDC 基础。
- 企业身份：OAuth/OIDC 之外的 SAML、SCIM、企业 SSO、Provisioning、Entitlement、审计和生命周期。
- 全球化：Unicode、Grapheme、Normalization、CLDR、ICU、MessageFormat、时区、RTL/CJK 和翻译工程。
- 内容平台与 SEO：CMS、内容模型、Preview、Draft/Publish、Canonical、Hreflang、Structured Data、大规模 URL 迁移。
- Schema-driven UI / Low-code：Schema、Renderer、Builder、Rule Engine、Plugin、Undo/Redo、版本迁移和运行时隔离。
- 企业框架认知：Angular/RxJS/Signals/DI/SSR/迁移，作为架构选型和遗留系统能力。
- IaC / GitOps / Policy as Code：前端平台、SSR/BFF 和云交付所需的基础设施治理能力。
- 产品分析与实验工程：Event Schema、Identity、Exposure、A/B、Guardrail、数据质量和自动验证。
- AI 原生安全：Prompt/Tool Injection、MCP 信任边界、工具授权、Structured Output 校验、Artifact Sandbox 和 Agent Audit。

这些方向最终是否独立成为 Stage / Module，以知识依赖和教学闭环为准，不以“多加一卷”作为目标。

---

# 8. 正式课程建设顺序

```text
确认能力终点与硬规则
    ↓
重新评审课程广度和深度
    ↓
拆开过载 Stage / 补齐缺失领域
    ↓
确定每个知识主题的唯一 Owner Module
    ↓
为 Module 设计 Must / Should / Expert 完整闭环
    ↓
拆成可复刻的 Lesson / Lab
    ↓
逐课编写 README + 独立可运行源码
    ↓
从空目录或复制基线重新跟做
    ↓
运行、测试、评审、修订
```

---

# 9. 课程最高验收标准

任何 Lesson、Module、Stage 和 Project 最终都服务于下面这个目标：

> **一名第一次打开当前 Lesson、没有阅读最终源码、也不记得上一课具体代码的学习者，只依靠当前 README，就能够准备正确起始项目、完成所有新增与修改、运行项目、观察正确结果，并理解每一步为什么这么做。**

同时：

> **一个 Module 完成后，不需要未来再开同名“高级篇 / 原理篇 / 源码篇”补课；计划范围内的深度必须在这个 Module 内一次闭环。**
