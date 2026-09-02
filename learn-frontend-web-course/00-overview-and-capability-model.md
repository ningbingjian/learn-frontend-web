# 从零基础到极其资深前端架构师：总览、能力模型与课程地图

> 版本：v0.2  
> 基线日期：2026-09-02  
> 状态：Draft / 课程源材料  
> 适用对象：完全零基础学习者、前端开发者、高级 / 资深前端、技术负责人以及希望成长为 Staff / Principal / 前端架构师的人。

---

# 1. 这套路线最终培养什么人

这套课程不是为了培养“会调用某个框架 API 的页面开发者”，而是培养能够长期负责复杂 Web 产品、前端技术体系和组织级前端平台的人。

最终应该具备：

1. 能从计算机、操作系统、网络、浏览器、语言、框架、构建、部署到线上运行解释完整链路。
2. 能独立交付高质量 React / Vue 企业应用、SSR / BFF、设计系统、实时协作、离线应用和多端产品。
3. 能定位渲染、网络、异步、内存、并发、缓存、构建、依赖、安全和线上稳定性问题。
4. 能读关键框架、编译器、构建器、路由、状态库和浏览器相关源码，而不是把第三方工具永远当黑盒。
5. 能设计大型前端应用、组件平台、微前端、插件体系、多租户、Schema-driven UI 和内部开发者平台。
6. 能建立测试、性能、安全、隐私、可访问性、可观测、发布、回滚和故障治理体系。
7. 能在用户价值、开发效率、性能、安全、可靠性、合规、成本和团队能力之间做可解释取舍。
8. 能使用 ADR、RFC、C4、时序图、数据流、容量模型、Threat Model、Failure Model 和迁移方案推动决策。
9. 能处理存量系统迁移、技术债、跨团队边界、版本升级和长期演进。
10. 能建设 Golden Path、组件 / SDK / CLI / 质量平台、Developer Portal 和组织级技术治理机制。
11. 能理解企业身份、数据一致性、云交付、全球化、内容平台等影响前端架构的重要邻接领域。
12. 能在 AI 时代设计安全、可评估、可观测、可授权、可撤销的 AI 原生前端和 Agent UX。

> “极其资深”描述的是课程能力边界，不保证任何公司的具体职级。Senior、Staff、Principal、Architect、Distinguished Engineer 在不同公司定义不同。

---

# 2. v0.2 最重要的结构原则

## 2.1 广度不能靠技术名词堆出来

课程必须覆盖广泛领域，但每一个领域进入主纲都要回答：

```text
它为什么属于前端架构师能力？
它与真实交付、排障、性能、安全、架构或治理有什么关系？
需要掌握到什么深度？
如何通过实验或项目证明掌握？
```

不能为了显得“高级”而简单加入越来越多框架名称。

## 2.2 深度的基本单位是 Module

> **一个 Module，一次学透。**

一个主题只有一个主教学 Module。

复杂 Module 可以有很多 Lesson，但完成后必须覆盖计划范围内的：

```text
基础
完整能力
工程实践
高级边界
Wrong Way
Failure
Debug
原理
源码（适用时）
性能 / 安全 / A11Y（适用时）
Production Boundary
Trade-off / 架构
综合实战
```

禁止未来通过“同名高级篇 / 原理篇 / 源码篇”补课。

## 2.3 Stage 数量服从知识结构

v0.1 使用了“28 卷、每卷 3 Stage、总计 84 Stage”的整齐结构。

v0.2 不再把“固定 84 Stage”作为最终约束。

原因：

- React、Vue、浏览器、构建、安全等领域知识密度不同；
- 固定每卷 3 Stage 会让复杂领域严重过载；
- 一个 Stage 如果同时塞入大量可以独立学习和验收的主题，最终只能浅讲。

因此后续允许：

```text
拆分过载 Stage
合并重复 Stage
新增缺失 Stage
调整 Stage 顺序
调整 Volume 边界
```

目录结构服务学习，不反过来让知识服从漂亮数字。

## 2.4 大纲必须最终落到可复刻 Lesson

所有大纲设计最终必须接受下面这个问题检验：

> 这个 Module 拆成具体 Lesson 后，学习者是否能只看当前 Lesson README 就从零状态或明确复制基线完整复刻？

如果不能，大纲只是名词地图，不算真正完成。

---

# 3. 十八个核心能力维度

v0.1 的能力维度继续保留并补强为以下体系。

| 能力维度 | 入门表现 | 高级表现 | 架构师表现 |
| --- | --- | --- | --- |
| 计算机与 OS | 能使用开发环境 | 理解进程、线程、内存、文件、调度 | 能结合硬件 / OS 成本解释前端运行与性能问题 |
| Web 标准与语义 | 会写语义页面 | 理解兼容、渐进增强、A11Y | 能制定 Web 标准采用与兼容策略 |
| HTML / CSS | 能还原页面 | 复杂布局、响应式、动效、主题 | CSS 架构、Token、设计系统和跨产品一致性 |
| JavaScript | 能写业务逻辑 | 运行时、异步、内存、抽象 | 理解引擎机制并设计基础库 / 性能方案 |
| TypeScript | 会使用常见类型 | 泛型、推导、声明、Schema | 建立大型类型边界、公共 API 和类型治理 |
| 浏览器平台 | 会用 DOM / DevTools | 渲染、事件、存储、Worker | 多进程、安全隔离、性能、兼容和平台选型 |
| 网络与协议 | 会调 API | HTTP、缓存、实时、弱网 | 端到端协议、多级缓存、流量、CDN 和容灾 |
| 数据与一致性 | 会消费 JSON | 分页、并发写、事务意识 | 理解缓存一致性、幂等、消息、最终一致和数据边界 |
| 框架 | 会 React / Vue | 状态、渲染、SSR、故障 | 源码、调度、选型、迁移和框架治理 |
| UI / Design System | 会封装组件 | Headless、复杂组件、A11Y、i18n | Token Pipeline、跨框架设计系统、治理和采纳 |
| 工程化 / Toolchain | 会运行脚手架 | 构建、包、Monorepo、Codemod | 统一工程平台、Golden Path、开发者体验 |
| 测试与质量 | 会写单测 | Component/E2E/Visual/Contract | 质量策略、门禁、风险度量和平台治理 |
| 性能 | 会看基本指标 | Trace、Profiler、内存、Bundle | 性能预算、RUM、容量模型和组织治理 |
| 安全 / 身份 / 隐私 | 知道常见漏洞 | CSP、OIDC、权限、依赖安全 | Threat Model、SSO/SCIM、供应链、隐私治理 |
| 全栈 / 云交付 | 会简单 Node API | SSR、BFF、CDN、容器 | Edge、多区域、K8s、GitOps、成本和交付架构 |
| 跨端 / 图形 / 媒体 | 能做基础跨端 | Desktop/Mobile/TV/Canvas/媒体 | 平台边界、性能、安全、适配和专项架构 |
| 架构 / 平台 / 治理 | 会模块划分 | DDD、插件、多租户、迁移 | 前端平台、低代码、治理、技术战略和组织影响 |
| AI 原生前端 | 能使用 AI 工具 | Streaming、Tool UI、RAG UX | Agent Architecture、Evals、安全、授权、审计和成本治理 |

---

# 4. Must / Should / Expert 到底表示什么

所有 Module / Lesson 使用三档深度标签，但必须明确它们不是三个互相分离的课程。

## Must

正常前端开发必须掌握：

```text
正确使用
基础心智模型
常见错误
基本测试 / 调试
```

## Should

高级 / 资深前端应该掌握：

```text
复杂场景
边界条件
故障与 Debug
工程集成
性能影响
生产问题
```

## Expert

技术专家 / 前端架构师需要掌握：

```text
底层机制
核心源码
系统级性能 / 安全
复杂 Trade-off
平台与治理
架构演进
```

例如 HTTP Cache：

```text
Must
→ Cache-Control、浏览器缓存、ETag、304

Should
→ Vary、CDN、Cache Key、SWR、Hash Asset、失效策略

Expert
→ Browser / Service Worker / CDN / Gateway / Origin 多级缓存、租户隔离、Purge、容量、故障和成本
```

重要：

> 对于课程中定义为完整主教学 Module 的主题，计划内 Must / Should / Expert 最终都要讲，不允许用“这是 Expert”作为略过理由。

---

# 5. 能力成长不是“看完目录”

仍然使用 L0～L7 描述学习范围，但不把它机械等同于公司职级。

## L0：开发环境与数字基本功

能够管理文件、终端、编辑器、浏览器、Git 和基础运行环境。

## L1：静态 Web 工程能力

能够使用语义 HTML、现代 CSS、响应式和基础 A11Y 可靠构建页面。

## L2：JavaScript 应用开发能力

能够使用原生 JavaScript 构建有状态应用，理解 DOM、事件、异步、错误和基本数据结构。

## L3：TypeScript、浏览器与网络平台能力

能够建立类型边界，并理解页面真正运行在浏览器和网络中的过程。

## L4：现代框架与 UI 工程能力

React 和 Vue 都达到企业应用认知，其中至少一个框架完成完整主修闭环，包括高级行为、SSR、故障、性能和源码。

## L5：高级工程、全栈与多端能力

能够负责构建、Monorepo、测试平台、BFF、Meta-framework、实时 / 离线和至少一个跨端 / 图形专项。

## L6：质量与生产系统负责人能力

能够建立性能、安全、身份、隐私、可观测、SLO、发布、回滚和故障治理体系。

## L7：架构、平台与组织影响能力

能够设计大型应用和平台，处理多租户、插件、低代码、迁移、治理、业务成本和 AI 原生系统。

> L6/L7 的完成证据不仅是“会写代码”，还必须包含设计、事故、迁移、治理、平台或跨团队影响证据。

---

# 6. v0.1 课程地图：继续作为重构底稿

当前 28 卷仍然保留为 v0.2 的重构底稿：

| 卷 | 主题 |
| ---: | --- |
| 01 | 计算机、终端、编辑器与 Git |
| 02 | 互联网、HTTP 与 Web 心智模型 |
| 03 | HTML、语义、表单与基础 A11Y |
| 04 | CSS 基础、布局与响应式 |
| 05 | 现代 CSS、动效与 CSS 架构 |
| 06 | JavaScript 语言基础 |
| 07 | DOM、异步与原生应用 |
| 08 | JavaScript 运行时、模式与算法 |
| 09 | TypeScript 从基础到类型架构 |
| 10 | 浏览器渲染、生命周期与 Web API |
| 11 | 网络、API、实时通信与数据韧性 |
| 12 | React |
| 13 | Vue |
| 14 | 状态、路由、表单、数据层与框架比较 |
| 15 | UX、组件架构、设计系统、A11Y 与国际化 |
| 16 | Node.js、模块、编译与构建工具 |
| 17 | Monorepo、包工程、发布与开发者体验 |
| 18 | 静态分析、测试与质量工程 |
| 19 | BFF、Next.js、Nuxt 与全栈渲染 |
| 20 | Edge、CDN、实时协作、离线与第三方集成 |
| 21 | 桌面、移动、跨端、可视化与新兴 Web 能力 |
| 22 | 性能测量、优化与规模化治理 |
| 23 | Web 安全、认证、隐私与供应链安全 |
| 24 | 可观测、SLO、故障治理、CI/CD 与云交付 |
| 25 | 应用架构、DDD、微前端、插件与多租户 |
| 26 | 前端平台、源码研究、迁移与架构治理 |
| 27 | Staff/Principal 领导力、产品、业务与组织影响 |
| 28 | AI 辅助研发、AI 原生前端与终极 Capstone |

> 上表不再意味着“每卷必须固定 3 Stage”。01～04 分册中的 84 Stage 是 v0.1 的详细内容底稿，后续逐卷重构，而不是永久结构约束。

---

# 7. v0.2 首轮必须拆开的过载领域

下面的领域已经足够重要，后续详细大纲重构时不能继续挤在一个 Stage 中浅讲。

## 7.1 React 高级主修链

至少应分别形成清晰 Module / Stage 边界：

```text
Render / Commit / State Update
Effect / External Synchronization
Concurrent Rendering / Priority
Suspense / Async UI
Actions / Optimistic Interaction
SSR / Streaming / Hydration
RSC / Server Functions / Cache / Security Boundary
Fiber / Lane / Reconciliation / Hooks Source
React Compiler / Performance / Migration
```

它们仍属于同一个 React 领域，不代表未来另开“React 高级篇”；而是在 React 主教学体系中一次规划完整。

## 7.2 Vue 高级主修链

至少拆清：

```text
Composition / Reactivity Usage
Reactive Core / Dep / Effect / Scheduler
Renderer / VNode / Patch
Template Compiler
SSR / Hydration
Pinia / Router / Data Architecture
Vue Source Debug
Nuxt Connection / Migration
```

## 7.3 浏览器深层链

不能只停留在页面渲染流水线，需要逐步形成：

```text
HTML / CSS Parsing
Style / Layout / Paint / Composite
Event Loop / Input / Scheduling
Storage / Worker / Offline
Browser Process Architecture
Site Isolation / Sandbox / IPC
Navigation / OOPIF
DevTools / Protocol / Compatibility Research
```

## 7.4 JavaScript 引擎链

在语言运行时基础之上补：

```text
Parsing
Bytecode / Interpreter
JIT
Object Shape / Hidden Class
Inline Cache
Optimization / Deoptimization
GC / Allocation
Benchmark Pitfall
Engine Evidence
```

## 7.5 构建与编译工具链

需要从“会配 Vite”一直达到：

```text
Parser / AST
Resolver
Module Graph
Transform
HMR
Chunk Graph
Tree Shaking
Plugin Lifecycle
Cache
Bundler Source Debug
Codemod / Migration Platform
```

---

# 8. v0.2 广度缺口补强清单

以下方向不是简单“多列几个名词”，而是后续要判断是否形成独立 Owner Module / Stage。

## 8.1 数据与分布式系统基础

前端架构师不必成为 DBA，但必须理解影响客户端正确性的底层数据语义：

```text
关系模型 / SQL 基础
Index 基础
Transaction / Isolation
Optimistic / Pessimistic Lock
Idempotency
Cache Consistency
Message Queue
Eventual Consistency
Outbox
CDC 基础
Pagination Consistency
Ordering / Clock 基础
```

## 8.2 企业身份生命周期

在 OAuth/OIDC/Session 之外补：

```text
SAML
SCIM
Enterprise SSO
JIT Provisioning
User Lifecycle
Entitlement
Organization Domain Verification
Session / Device Management
Audit
Offboarding
```

## 8.3 全球化工程

在普通 i18n/RTL 之外补：

```text
Unicode
Code Point / Grapheme Cluster
Normalization
BiDi
CLDR
ICU
MessageFormat
Locale Fallback
Timezone
CJK
Font Fallback
Translation Workflow
```

## 8.4 CMS / Content / SEO Architecture

形成完整内容平台链：

```text
Content Model
Headless CMS
Draft / Publish
Preview
Cache
Crawler / Render / Index
Canonical
Hreflang
Structured Data
Sitemap
URL Migration
SEO Monitoring
```

## 8.5 Schema-driven UI / Low-code / Editor Architecture

补：

```text
JSON Schema / UI Schema
Component Registry
Renderer
Form / Page Builder
Property Panel
Rule Engine
Expression Sandbox
Undo / Redo
Command Model
Plugin
Schema Versioning
Compatibility
Preview
Collaboration
Runtime Isolation
```

## 8.6 Angular 企业框架认知

React / Vue 仍为主要课程框架，但架构师需要具备 Angular 企业认知：

```text
DI
RxJS
Signals
Router
Forms
Change Detection
SSR
Workspace
AngularJS / Legacy Migration
```

## 8.7 IaC / GitOps / Policy as Code

前端平台和 SSR/BFF 云交付补：

```text
Infrastructure as Code
GitOps
Policy as Code
Environment Drift
Artifact Promotion
Resource Quota
Secret Lifecycle
Supply-chain Attestation
Approval / Audit
Cost Ownership
```

## 8.8 产品分析与实验工程

补：

```text
Event Taxonomy
Analytics Schema
Identity
Consent
Exposure Event
A/B Experiment
Guardrail
SRM Awareness
Data Quality
Tracking Test
Feature Flag Integration
```

## 8.9 AI 原生安全

AI 课程除了 UI，还要完整覆盖：

```text
Prompt Injection
Tool Injection
MCP Trust Boundary
Confused Deputy
Tool Permission Lifecycle
Structured Output Validation
Model Output XSS
Artifact Sandbox
Agent Checkpoint / Replay Risk
Audit / Approval / Undo
```

---

# 9. 框架学习策略

课程仍要求 React 和 Vue 都达到真实企业开发能力，但必须避免“两个框架所有东西都重复学两遍”。

原则：

1. 两个框架都完成基础与企业应用能力。
2. 至少一个框架完成真正的 Expert 深度：调度 / 响应式、SSR/Hydration、源码、性能和迁移。
3. 第二框架仍需理解自身独特机制，而不是只会照着写 CRUD。
4. 公共知识如 HTTP、状态分类、A11Y、设计系统、测试、性能等必须有唯一 Owner Module，框架课程引用而不重复教学。
5. 跨框架比较的重点是运行模型、生态、团队、迁移和退出成本，不是喜好争论。

---

# 10. 质量属性必须螺旋进入，而不是最后才第一次学习

虽然性能、安全、可靠性有独立高阶卷，但不能等到 L6 才第一次正式出现。

## 基础阶段

```text
HTML / CSS
→ 图片 / 字体 / 布局成本、语义、安全外链、A11Y

JavaScript
→ Long Task、内存、DOM XSS、错误、取消和重试
```

## 框架阶段

```text
React / Vue
→ Render、Bundle、权限显示边界、Error Boundary、Chunk Failure、A11Y
```

## 全栈阶段

```text
SSR / BFF
→ TTFB、Cache、Session、CSRF、Timeout、Fallback、Trace
```

## 高阶卷

再把这些能力提升成：

```text
Budget
RUM
Threat Model
CSP
Supply Chain
SLO
Incident
Governance
```

---

# 11. 实践体系

课程实践采用：

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

## 11.1 Lesson

每个 Lesson 最终源码独立可运行。

知识点优先从零状态建立；确实依赖上一课时，必须完整说明如何复制上一课源码、如何验证基线、再修改哪些文件。

## 11.2 Module Project

验证“这个主题是否真的一次学透”，而不是只验证 API 能跑。

## 11.3 Stage Project

组合多个 Module，验证综合交付和故障处理。

## 11.4 Frontend Cloud Workbench

长期主线用于持续吸收已经学透的能力。

## 11.5 Domain Capstone

FCW 不能成为唯一业务场景。架构阶段至少引入以下不同约束领域中的若干个：

- 企业 SaaS：多租户、SSO、审计、白标。
- 电商交易：库存、价格、支付、幂等、一致性。
- 内容 / SEO：CMS、发布、缓存、大流量和迁移。
- 实时协作：Presence、离线、冲突、历史版本。
- 媒体 / TV：播放、焦点、低端设备、长时间运行。
- 数据分析：大表格、大查询、Worker、可视化、权限。

学习者不能只证明自己会设计一种后台 SaaS。

---

# 12. 学习证据

不同层级不能只用“项目存在”验收。

至少逐步形成：

```text
可运行源码
测试
DevTools 记录
Network / HAR
Performance Trace
Profiler
Heap Snapshot
Bundle Graph
源码断点记录
ADR / RFC
Threat Model
Capacity / Failure Model
发布 / 回滚记录
SLO / Runbook / Postmortem
迁移方案
平台采用 / 升级 / 废弃指标
```

---

# 13. 架构师能力必须接受约束变化

后期架构练习必须逐渐加入真实变量：

```text
团队 5 人 → 20 人 → 100 人
一个应用 → 多应用 / 多团队
单区域 → 多区域
单租户 → 多租户
普通流量 → 高峰流量
无合规 → 数据驻留 / 审计
稳定技术栈 → 大规模存量迁移
预算充足 → 成本约束
核心成员在岗 → 人员流动 / Bus Factor
```

架构不是背 DDD、微前端和插件名词，而是在约束变化时仍然能解释为什么这样设计。

---

# 14. 版本与技术选型策略

1. 正式课程默认使用编写时的稳定版或 LTS。
2. 原理课程尽量版本无关；版本差异单独记录。
3. 每个 Module / Lesson 记录运行时、框架、工具和浏览器基线。
4. 升级必须有迁移实验，不能静默替换。
5. Web API 使用前检查 Baseline、兼容和渐进增强。
6. 安全课程根据最新标准、官方安全公告和真实版本复核。
7. Source Lab 必须记录源码版本 / Commit，不能只写框架名称。

---

# 15. 大纲评审必须回答的问题

每一个 Stage / Module 都必须回答：

1. 它为什么属于前端架构师能力？
2. 它的唯一主题 / Owner 是什么？
3. 是否与其他 Module 重复？
4. 是否计划一次讲透，还是偷偷把高级 / 源码留到了后面？
5. Must / Should / Expert 分别是什么？
6. 当前前置知识是否足够支撑 Expert 深度？
7. 如何从零状态或明确复制基线教学？
8. 学生如何独立复刻每个 Lesson？
9. 有什么真实 Failure / Performance / Security / A11Y 边界？
10. 哪些结论通过什么证据验证？
11. 是否需要 Source Lab？如果需要，研究哪个版本和行为？
12. 完成后如何进入 FCW 或其他项目？
13. 系统规模扩大 10 倍时这个知识如何变化？
14. 有哪些替代方案和退出策略？
15. 技术版本变化后哪些原理仍成立？

---

# 16. 当前下一步

v0.2 总规则稳定后，按下面顺序继续：

```text
先重新审查卷 01～09
↓
再审查浏览器 / 网络
↓
重点重拆 React / Vue 过载 Stage
↓
再审查工程化 / 全栈 / 跨端
↓
补齐数据、企业身份、全球化、CMS、低代码等缺口
↓
重新设计性能 / 安全 / 可靠性螺旋主线
↓
最后重构架构 / 平台 / AI / Capstone
```

大纲完成的标准不是“目录特别长”，而是：

> **广度没有关键空白；每一个重要主题都有唯一 Owner Module；每个 Module 计划一次学透；最终每个 Lesson 都能被学生只依靠当前 README 完整复刻并独立运行。**
