# 长期项目、阶段验收、拆课与课程演进规则

> 版本：v0.2  
> 基线日期：2026-09-02  
> 本文件回答：课程如何通过项目串起来、如何保证每课可复刻、如何验收“真正掌握”、如何拆 Stage / Module / Lesson，以及技术变化后如何持续演进。

---

# 1. 实践体系总览

课程不以“看完文档”作为学习完成标准，而采用多层实践体系：

```text
Lesson Minimal Lab / Evolving Lesson
        ↓
Module Project
        ↓
Stage Project
        ↓
Frontend Cloud Workbench 长期主线
        ↓
Specialization / Domain Capstone
        ↓
Principal Capstone
```

每一层解决不同问题：

- **Lesson**：证明一个独立知识点真的理解并能复刻。
- **Module Project**：证明一个主题从 Must 到 Expert 已形成完整闭环。
- **Stage Project**：组合多个 Module 完成真实交付。
- **FCW**：让已经学透的能力持续进入同一个长期产品。
- **Domain Capstone**：证明能力能迁移到不同业务约束。
- **Principal Capstone**：综合架构、平台、质量、迁移、组织和 AI 能力。

---

# 2. Lesson 项目起点规则

每一节需要代码、命令或实验的课程，只允许两类起点。

## 2.1 独立零状态 Lesson

优先用于：

- HTML / CSS 独立知识点；
- JavaScript / TypeScript 机制实验；
- Browser Mechanism；
- Network Lab；
- Failure Lab；
- Performance Lab；
- Security / A11Y Lab；
- Source Lab；
- 与上一课业务上下文没有必要依赖的 API。

README 必须从空目录或最小空项目开始，并手把手得到最终完整源码。

## 2.2 连续演进 Lesson

适用于真正需要保持连续上下文的学习链，例如：

```text
React Component
→ Props
→ Event
→ State
→ Form
```

或者：

```text
原生 SPA
→ Router
→ Server Data
→ Cache
→ Error Recovery
```

允许共享上一课项目思想，但当前课必须明确执行：

```text
Step 0：复制并验证上一课最终项目
```

至少说明：

1. 来源 Lesson 和完整路径。
2. 复制哪个目录。
3. 复制到当前 Lesson 的哪个目录。
4. 复制完成后的目录树。
5. 是否重新安装依赖。
6. 在哪个目录执行什么命令。
7. 基线页面 / Console / Network / 测试应看到什么。
8. 本课要新增、修改、删除哪些文件。

不能出现：

> “基于上一课继续。”

却不给实际复制和验证步骤。

## 2.3 当前 Lesson 最终源码必须独立运行

无论从零还是复制上一课：

```text
当前 Lesson 目录
=
完整最终工程
```

当前课不得运行时依赖上一课源码、上一课 Dev Server 或作者本地隐藏配置。

---

# 3. 唯一长期主线：Frontend Cloud Workbench

主线项目简称 **FCW**。

它不是第一天就搭建的巨大系统，而是随着课程逐步演进。

最终定位：

> 一个多租户、可扩展、可观测、可访问、支持实时协作和 AI Agent 的企业级 Web 工作台，同时包含 Design System、组件平台、开发工具、BFF、SSR、插件体系和前端开发者平台。

最终至少覆盖：

- 普通业务用户；
- 企业管理员；
- 内容 / 数据运营人员；
- 开发者与插件作者；
- 平台维护者和值班人员；
- 使用 AI 助手完成任务的用户。

长期主线的原则是：

> **只吸收已经在 Owner Module 中学透的能力，不利用 FCW 代替基础教学。**

例如 React Suspense 应先在自己的 Module / Lab 中从零讲透，再进入 FCW，不应该第一次在 FCW 大项目中突然出现然后默认学习者会。

---

# 4. FCW 建议演进阶段

阶段名称用于项目演进，不强制和最终 Stage 数一一绑定。

## Phase 01：静态内容与语义

能力：终端、Git、URL、HTML、表单、图片、语义和基础 A11Y。

产物：产品首页、帮助中心、联系表单、隐私页。

故障：资源 404、字符集、图片失败、键盘不可用。

证据：HTML 校验、Accessibility Tree、Git 历史和运行 README。

## Phase 02：布局、主题与视觉系统

能力：Flex、Grid、响应式、字体、图片、动画、Container Query、Token、主题。

故障：超长文本、RTL、200% 缩放、极窄容器、主题覆盖冲突。

## Phase 03：原生 JavaScript 应用

能力：DOM、事件、Promise、Fetch、状态、路由、缓存、错误和持久化。

故障：竞态、重复提交、慢网、泄漏、事件重复订阅、History 错误。

## Phase 04：TypeScript SDK 与契约

能力：严格类型、泛型、联合状态、Schema、运行时校验、声明输出和版本兼容。

## Phase 05：浏览器平台与网络韧性

能力：渲染、生命周期、Storage、Worker、Service Worker、HTTP Cache、Streaming、Upload、Realtime。

## Phase 06：React 企业应用

能力：组件、状态、Effect、表单、路由、Server State、Suspense、SSR/Hydration、源码和性能。

注意：FCW 中的 React 能力只能在对应 React Module 已完成后集成。

## Phase 07：Vue 企业应用与跨框架

能力：SFC、Composition API、响应式、Pinia、Router、SSR、源码、Web Components 和迁移。

## Phase 08：Design System 与全球化

能力：Headless、Token、主题、A11Y、i18n/RTL、Unicode/Locale 基础、版本治理。

## Phase 09：Toolchain、Monorepo 与质量平台

能力：Node CLI、AST、Bundler、Codemod、Package、Workspace、CI、测试和质量门禁。

## Phase 10：全栈渲染、BFF 与云交付

能力：Session/OIDC、BFF、Next/Nuxt、SSR、Edge、CDN、容器、Kubernetes、灰度与回滚。

## Phase 11：实时、离线、第三方与跨端

能力：协作同步、对象存储、搜索、第三方 Adapter、Desktop/Mobile/TV 和大数据可视化。

## Phase 12：性能、安全、身份与可靠性治理

能力：RUM、Budget、Threat Model、CSP、企业身份、供应链、SLO、Trace、事故与自动回滚。

## Phase 13：架构、插件、多租户、低代码与前端平台

能力：DDD、模块化、微前端、Plugin SDK、Tenant、Schema-driven UI、Developer Portal、Golden Path、迁移和治理。

## Phase 14：AI 原生工作台与 Principal Capstone

能力：AI Coding Workflow、MCP、Streaming UI、Tool Call、Approval、Evals、安全、成本和架构答辩。

---

# 5. 领域 Capstone：避免只会设计一种 FCW

长期主线不能成为唯一业务模型。

架构阶段至少应从下面不同业务约束中选择若干完整项目：

| 领域 | 主要架构约束 |
| --- | --- |
| 企业 SaaS | 多租户、SSO、SCIM、权限、审计、白标、数据驻留 |
| 电商交易 | 库存、价格、订单、支付、幂等、并发写和最终一致性 |
| 内容 / SEO 平台 | CMS、Draft/Publish、Preview、缓存、SEO、大流量、URL 迁移 |
| 实时协作 | Presence、离线、冲突、CRDT/OT、历史版本、连接扩展 |
| 媒体 / TV | 播放、DRM、遥控焦点、低端硬件、长时间运行、媒体故障 |
| 数据分析 | 大表格、大查询、Worker、可视化、内存、权限和导出 |
| Schema-driven / Low-code | Renderer、Builder、Rule、Plugin、Undo/Redo、版本兼容和沙箱 |
| AI Agent 平台 | Streaming、Tools、Approval、RAG、Evals、权限、成本和审计 |

学习者最终必须证明：

> 能力可以迁移到不同业务约束，而不是只会模仿 FCW 的一种后台架构。

---

# 6. 四级基础验收体系

## 6.1 Lesson / Knowledge Point 验收

至少满足：

- 有唯一主问题；
- 明确从零还是复制上一课；
- 如果复制，当前 README 可以独立准备基线；
- 当前课最终源码可以独立运行；
- 有真实可观察证据；
- 有至少一个关键错误 / 边界（适用时）；
- 能解释现象和专业定义；
- 知道这个知识属于 Module 的 Must / Should / Expert 哪一层；
- 知道它在后续项目中的使用位置。

## 6.2 Module 验收

Module 必须证明“一次学透”：

```text
为什么存在
基础使用
完整能力
高级场景
故障
Debug
原理
源码（适用时）
性能 / 安全 / A11Y（适用时）
Production Boundary
Trade-off
Module Project
```

完成后不得再计划同名高级 / 原理 / 源码补课。

## 6.3 Stage 验收

至少包括：

- 组合多个 Module 的项目；
- 独立运行和部署说明；
- 至少一次故障实验；
- 设计或复盘文档；
- 功能、机制、质量和工程证据；
- 口头或书面答辩。

## 6.4 Level / 里程碑验收

至少使用：

1. **Portfolio Review**：检查项目和证据。
2. **Live Debugging**：定位未知问题。
3. **System Explanation**：从用户操作解释到浏览器、网络和服务端。
4. **Design Exercise**：给定约束设计方案。
5. **Failure Exercise**：加入弱网、依赖故障、安全、规模变化。
6. **Migration Exercise**：存量系统如何逐步演进。
7. **Retrospective**：曾经错误判断如何被证据纠正。

---

# 7. Must / Should / Expert 验收解释

标签是能力深度，不是选修开关。

## Must

学生应该能够：

- 独立正确使用；
- 不依赖作者提示完成常见任务；
- 解释基本模型；
- 避免最常见错误。

## Should

学生应该能够：

- 处理复杂边界；
- 制造并修复故障；
- 使用 DevTools / Profiler / Trace 等定位；
- 理解工程集成和性能成本。

## Expert

学生应该能够：

- 解释底层机制和关键源码；
- 分析规模化性能 / 安全 / 可靠性问题；
- 比较替代方案；
- 做架构、迁移和治理决策。

一个完整 Owner Module 最终要完成它计划中的 Must / Should / Expert，而不是把 Expert 留给未来同名课程。

---

# 8. 统一评分 Rubric

每项 0～4 分：

- **0 未完成**：没有可运行成果或结论明显错误。
- **1 跟做**：按步骤能完成，但不能独立解释或迁移。
- **2 独立**：能独立完成常规场景，有基本测试和文档。
- **3 高级**：能处理边界、故障、性能、安全和取舍。
- **4 架构级**：能建立标准、平台或治理机制，并影响多个项目 / 团队。

评分维度：

| 维度 | 核心问题 |
| --- | --- |
| 正确性 | 功能、边界和错误恢复是否正确？ |
| 可复刻性 | 只按当前 README 是否能从正确起点完整做出来？ |
| 原理理解 | 是否能用真实行为和证据解释？ |
| 工程质量 | 结构、类型、测试、文档、自动化是否可靠？ |
| 非功能质量 | 性能、安全、A11Y、兼容、稳定性如何？ |
| 架构判断 | 是否比较约束、成本、风险和退出路径？ |
| 迁移与演进 | 是否能不中断业务地升级 / 迁移？ |
| 影响力 | 是否可复用、可推广、可运营并帮助其他团队？ |

---

# 9. 证据要求

| 领域 | 首选证据 |
| --- | --- |
| HTML/CSS | DOM、Computed、Layout、A11Y Tree、多视口 |
| JavaScript | Console、断点、调用栈、事件顺序、Memory |
| Browser | Performance Trace、Memory、Application、Rendering、Process/Trace |
| Network | HAR、Header、Waterfall、Cache、Timing、故障注入 |
| React/Vue | DevTools、Profiler、Render 记录、源码断点 |
| TypeScript | 类型测试、声明输出、消费示例、编译行为 |
| Build | Module/Chunk Graph、构建日志、体积和冷/热时间 |
| Test | Trace、失败样本、Flaky 数据、关键旅程覆盖 |
| Performance | Lab/RUM 基线、P75/P95、单变量对比 |
| Security | Threat Model、漏洞复现、修复、策略和自动验证 |
| Reliability | SLO、告警、Runbook、演练、事故时间线 |
| Architecture | ADR、RFC、C4、时序、Trade-off、容量、故障模型 |
| Platform | 用户路径、采用率、升级率、支持成本、SLO |
| AI | Task Eval、Tool Trace、Approval、Cost、Latency、安全测试 |

---

# 10. 拆课规则

## 10.1 Stage 拆分

Stage 数量不固定。

一个 Stage 是否继续拆，应看：

- 是否包含多个可以独立学习和验收的大主题；
- 是否一次引入过多新机制；
- 是否需要完全不同的实验工具；
- 是否无法通过一个清晰综合项目串起来；
- 是否导致 Module 只能浅讲。

“每卷 3 Stage”不再作为约束。

## 10.2 Module 拆分

Module 的边界不是文章长度，而是：

> **一个可以一次学透的稳定知识主题。**

例如 React 的 Rendering、Effect、Suspense、SSR/Hydration、RSC 可以分别成为 Owner Module，但以后不再创建它们自己的高级 / 源码补课。

## 10.3 Lesson / KP 拆分

一个 Lesson 应转成一个明确问题，例如：

```text
React 为什么会因为错误 key 造成状态错位？
为什么一个旧请求会覆盖新请求结果？
浏览器为什么触发 CORS Preflight？
为什么 hydration 会出现 mismatch？
```

禁止过宽标题：

```text
React 高级用法
前端性能优化大全
微前端原理与实践
```

## 10.4 Lesson 数量没有机械上下限

以前“一个 Module 8～30 KP”只作为规模感知，不再是硬性目标。

如果主题 6 节就能完整讲透，不需要为了达到数字强行拆。

如果一个复杂 Module 需要更多 Lesson 才能从 Must 到 Expert 形成闭环，也允许继续拆。

核心判断是：

```text
有没有漏知识
有没有重复教学
每课是否只有一个主问题
Module 是否真正一次学透
```

---

# 11. 正式课程目录原则

大纲确认后，正式目录仍可按 Level / Domain / Stage / Module / Lesson 组织，例如：

```text
courses/frontend-architect/
├── README.md
├── level00-foundation/
│   └── ...
├── level01-static-web/
├── level02-javascript/
├── level03-browser-network-typescript/
├── level04-framework-ui/
├── level05-engineering-fullstack/
├── level06-quality-production/
└── level07-architecture-platform-ai/
```

具体 Stage 数量按最终大纲确定。

Lesson 目录必须保存当前 Lesson 的完整最终源码。

---

# 12. 连续 Lesson 的目录和复制示例

假设：

```text
re-kp006-state-basic/
re-kp007-state-update/
```

`re-kp007-state-update/README.md` 开头应该类似：

```text
Step 0：准备本课项目

来源：../re-kp006-state-basic
目标：当前 re-kp007-state-update

如果你在仓库外从头跟做：
1. 复制 re-kp006-state-basic 为 re-kp007-state-update
2. 进入新目录
3. 安装依赖
4. 运行基线
5. 确认页面显示 ...

本课接下来：
- 修改 src/App.tsx
- 新增 src/...
```

仓库中提交的 `re-kp007-state-update` 仍然保存自己完整的最终代码。

---

# 13. 版本与过时内容治理

每个 Module / Lesson 记录：

- 编写 / 更新日期；
- Node / 包管理器；
- 框架和关键库版本；
- 浏览器测试基线；
- Source Lab 的源码 Commit；
- 相关官方标准 / 文档；
- 安全基线。

状态可以标记：

- `Current`：当前主路径；
- `Legacy`：维护历史系统；
- `Migration`：旧到新的迁移课程；
- `Research`：前沿能力研究；
- `Archived`：保留历史，不再作为主线。

版本变化不能破坏“一次学透”原则：

如果是同一主题的版本升级，应更新原 Owner Module 或增加明确 Migration Lesson，而不是创建一个新的同名高级课程。

---

# 14. 提交与质量审查

每批课程提交前必须完成：

## Scope Review

检查无关复杂度是否可以删除。

## Depth Review

检查核心知识是否真的讲完整。

## Evidence Review

检查关键结论是否有真实证据。

## Reproduction Review

不先看 Final Source，按 README：

```text
从空目录
或
从明确声明的上一课复制步骤
```

重新做一遍。

确认：

- 文件路径正确；
- 修改位置清楚；
- 命令可执行；
- 依赖完整；
- 每个运行点结果一致；
- 当前 Lesson 最终可独立运行。

---

# 15. 课程完成定义

一门 Lesson / Module / Stage 不能因为“README 已经写了”就标记完成。

必须同时满足适用项：

- 符合统一教学规范；
- 源码可从干净环境运行；
- 连续 Lesson 有明确复制链；
- 当前 Lesson 源码独立完整；
- 核心行为有真实证据；
- 错误和边界已覆盖；
- Module 的 Must / Should / Expert 已按计划闭环；
- 不再依赖未来同名高级 / 源码补课；
- README 与实际源码一致；
- 项目或 FCW 已吸收该能力；
- Review 意见已关闭或记录技术债。

以下情况不能完成：

```text
只有名词解释，没有实验
只有 Final Source，没有施工过程
只写“基于上一课继续”没有复制基线
当前课必须依赖上一课目录才能运行
因为“太简单”省略文件和位置
把 Expert 内容留给未来同名课程
只有正常路径，没有边界和故障
性能没有数据
源码课没有版本和触发项目
架构课只有图，没有约束和验证
AI 课只有生成效果，没有评估、权限和安全
```

---

# 16. 下一步拆解顺序

v0.2 规则确认后：

1. 逐卷审查现有 01～04 分册的知识广度。
2. 找出过载 Stage 并拆开。
3. 为每个知识主题确定唯一 Owner Module。
4. 检查 Module 是否真的能从 Must 到 Expert 一次学透。
5. 补齐浏览器进程、JavaScript 引擎、数据、企业身份、全球化、CMS、低代码、IaC、实验工程和 AI 安全等缺口。
6. 先选 2～3 个 Module 做正式样板。
7. 样板必须验证“独立 Lesson + 连续复制 Lesson”两种课程起点。
8. 从空目录重新跟做样板课。
9. 根据样板结果再批量建设正式课程。

最终目标不是把目录做得最大，而是：

> **每一个重要主题都真正一次学透；每一节课都能够被学生独立复刻；所有高级深度都有真实证据；最终能力能够迁移到不同业务和架构约束。**
