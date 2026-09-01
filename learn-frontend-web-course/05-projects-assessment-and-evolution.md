# 长期项目、阶段验收、学习节奏与课程演进规则

> 本文件回答四个问题：  
> 1. 84 个阶段如何通过项目串起来？  
> 2. 怎样判断“真正掌握”，而不是“看过”？  
> 3. 如何把总纲继续拆成正式课程？  
> 4. 技术变化后，课程怎样持续更新而不失控？

---

# 1. 唯一长期主线：Frontend Cloud Workbench

主线项目简称 **FCW**。它不是一开始就搭建的巨大系统，而是跟随能力逐步演进。

最终定位：

> 一个多租户、可扩展、可观测、可访问、支持实时协作和 AI Agent 的企业级 Web 工作台，同时包含组件平台、开发工具、BFF、SSR、插件与前端开发者平台。

它至少覆盖以下用户：

- 普通业务用户。
- 企业管理员。
- 内容或数据运营人员。
- 开发者和插件作者。
- 平台维护者与值班人员。
- 使用 AI 助手完成任务的用户。

## Phase 01：静态个人/产品站

**对应范围**：卷 01～03。

**能力**：

- 终端、编辑器、Git、README。
- 正确 URL、链接和资源路径。
- 语义 HTML、表单、表格、图片和基础 A11Y。

**产物**：产品首页、帮助中心、联系表单、隐私页、站点地图。

**故障实验**：资源 404、错误路径、错误字符集、无 JavaScript、图片失败、键盘不可用。

**验收**：HTML 校验、键盘操作、Accessibility Tree、Git 历史和运行文档。

## Phase 02：响应式视觉与主题

**对应范围**：卷 04～05。

**能力**：

- Flex、Grid、响应式、字体、图片、动画。
- Container Query、Token、主题和 CSS 架构。

**产物**：桌面/平板/手机页面、深色主题、高对比度主题、打印样式。

**故障实验**：超长文本、RTL、200% 缩放、极窄容器、低性能动画、主题覆盖冲突。

**验收**：多视口截图、CSS 层叠解释、动画性能 Trace、视觉回归基线。

## Phase 03：原生 JavaScript 应用

**对应范围**：卷 06～08。

**能力**：

- DOM、事件、表单、Promise、Fetch、模块和状态。
- 原生路由、缓存、错误处理和持久化。
- 事件循环、内存、设计模式和算法。

**产物**：不依赖 UI 框架的任务/订单工作台。

**故障实验**：请求乱序、重复提交、慢网、内存泄漏、事件重复订阅、历史导航错误。

**验收**：功能测试、Network 记录、Heap Snapshot、模块依赖图和状态图。

## Phase 04：TypeScript SDK 与契约

**对应范围**：卷 09。

**能力**：

- 严格 TypeScript、泛型、联合状态、声明文件。
- API Schema、运行时校验和类型安全客户端。

**产物**：独立发布的 FCW API SDK、事件 SDK 和 Token 类型包。

**故障实验**：无效外部数据、旧版接口、声明冲突、ESM/CJS 消费差异和破坏性类型升级。

**验收**：类型测试、运行时测试、声明输出、消费项目和迁移说明。

## Phase 05：浏览器能力与离线

**对应范围**：卷 10～11。

**能力**：

- 渲染、生命周期、存储、Worker、Service Worker。
- HTTP 缓存、实时连接、流式响应、上传和网络韧性。

**产物**：离线读取、后台同步、流式日志、大文件上传和实时通知。

**故障实验**：断网、网络切换、缓存污染、旧 Service Worker、消息重复、分片失败、权限拒绝。

**验收**：Performance Trace、Storage 数据、缓存链、同步时序和弱网测试报告。

## Phase 06：React 企业应用

**对应范围**：卷 12。

**能力**：

- 组件、State、Reducer、Context、Effect、Ref、表单和路由。
- Suspense、Transition、Actions、乐观更新、SSR、Hydration、RSC 与源码调试。

**产物**：FCW React 主应用，包括用户、组织、权限、工作台和复杂表单。

**故障实验**：错误 Key、Stale Closure、Effect Race、Context 扩散、Hydration Mismatch 和 Chunk 失败。

**验收**：React Profiler、源码断点记录、状态图、核心流程测试和 SSR 运行位置图。

## Phase 07：Vue 企业应用与跨框架协作

**对应范围**：卷 13～14。

**能力**：

- Vue SFC、Composition API、响应式、Pinia、Router、SSR 和源码。
- 跨框架状态、Web Components、Adapter 与迁移。

**产物**：FCW Vue 运营子应用；一个 React/Vue 共用的 Web Component。

**故障实验**：响应式解构丢失、深度 Watch、共享依赖冲突、路由冲突、样式污染和跨框架事件错误。

**验收**：Vue Devtools、响应式源码调试、跨框架契约测试和迁移 ADR。

## Phase 08：设计系统与国际化

**对应范围**：卷 15。

**能力**：

- UX 状态、WCAG 2.2、国际化、RTL。
- Headless Component、Token、主题、文档和发布治理。

**产物**：FCW Design System，至少包含 Token、20 个基础组件、5 个复杂模式和 React/Vue Adapter。

**故障实验**：键盘陷阱、屏幕阅读器名称错误、翻译膨胀、RTL 错位、主题不兼容和视觉回归。

**验收**：组件契约、视觉测试、A11Y 报告、主题矩阵和版本升级演练。

## Phase 09：Monorepo、构建与质量平台

**对应范围**：卷 16～18。

**能力**：

- Node CLI、AST、Codemod、Vite/Rolldown、包发布。
- Workspace、Monorepo、远程缓存、单测、E2E、视觉和契约测试。

**产物**：包含 Web、Vue 子应用、BFF、组件库、SDK、CLI 和配置包的 Monorepo。

**故障实验**：幽灵依赖、循环依赖、缓存污染、Chunk 重复、Flaky E2E、类型不兼容和发布失败。

**验收**：依赖图、Affected CI、构建基线、可安装 Package、Playwright Trace 和质量门禁。

## Phase 10：全栈渲染、BFF 与云交付

**对应范围**：卷 19～20。

**能力**：

- Session、OIDC、授权、BFF 聚合和韧性。
- Next.js、Nuxt、SSR/SSG/流式渲染、Edge、CDN 和多区域。
- 实时协作、对象存储、搜索和第三方服务。

**产物**：Next 主站、Nuxt 产品面、BFF、直传、搜索、实时协作和 Preview/生产环境。

**故障实验**：会话过期、下游超时、缓存失效错误、区域故障、第三方配额和重复 Webhook。

**验收**：部署图、缓存模型、Trace、权限矩阵、灰度与回滚演练、成本估算。

## Phase 11：桌面、移动、TV 与高性能可视化

**对应范围**：卷 21。

**能力**：

- Electron/Tauri/Hybrid/React Native/小程序/TV 的选型与桥接。
- SVG、Canvas、WebGL/WebGPU、Worker、媒体和新兴 API 研究。

**产物**：至少一个桌面或移动壳、一个 TV/大屏焦点实验、一个大数据可视化页面。

**故障实验**：IPC 越权、内存增长、低端设备掉帧、遥控器焦点丢失、GPU 资源未释放。

**验收**：跨端 Adapter、性能基线、安全检查、发布方案和能力兼容矩阵。

## Phase 12：性能、安全与可靠性体系

**对应范围**：卷 22～24。

**能力**：

- RUM、Core Web Vitals、性能预算和容量模型。
- CSP、Trusted Types、威胁模型、供应链和隐私。
- Log/Metric/Trace、SLO、故障演练、CI/CD、Kubernetes 和自动回滚。

**产物**：性能/安全/可靠性仪表盘、质量红线、Runbook、发布平台和事故复盘库。

**故障实验**：XSS、缓存串租户、RSC/SSR 输入风险、Chunk 404、错误发布、CDN 故障、证书问题和高延迟。

**验收**：性能前后数据、Threat Model、SLO、告警、演练记录、自动回滚和安全门禁。

## Phase 13：微前端、插件、多租户与前端平台

**对应范围**：卷 25～26。

**能力**：

- DDD、模块化架构、微前端、插件沙箱、多租户和白标。
- Internal Developer Platform、源码研究、迁移和架构治理。

**产物**：Shell、React/Vue 子应用、插件 SDK、租户配置、开发者门户和 Golden Path。

**故障实验**：远程模块失败、插件崩溃、版本冲突、租户配置污染、平台升级和旧系统并行迁移。

**验收**：架构 Fitness Function、插件权限、租户隔离、平台采用指标、迁移 RFC 和源码研究报告。

## Phase 14：AI 原生工作台与 Principal Capstone

**对应范围**：卷 27～28。

**能力**：

- 技术战略、组织协作、业务与成本。
- AI Coding Agent、MCP、流式 UI、工具调用、人类审批、评估和安全。

**产物**：FCW AI Agent 工作台；从需求、设计、编码、测试、发布到观测的完整平台级 Capstone。

**故障实验**：Prompt Injection、工具越权、模型输出 XSS、断流、重复工具调用、超预算、错误引用和不确定答案。

**验收**：AI Evals、安全测试、成本与时延、RFC/ADR 集、架构答辩和组织推广计划。

---

# 2. 配套项目组合

除 FCW 主线外，需要少量边界清晰的专题项目验证特定能力：

| 编号 | 项目 | 主要验证能力 |
| --- | --- | --- |
| P01 | 语义化内容站 | HTML、SEO、A11Y、渐进增强 |
| P02 | 响应式作品集 | CSS、布局、主题、视觉还原 |
| P03 | 原生 JavaScript SPA | DOM、事件、状态、异步、路由 |
| P04 | TypeScript SDK | 类型架构、运行时校验、包发布 |
| P05 | 浏览器机制实验室 | Render、Event Loop、Storage、Worker |
| P06 | 网络与缓存实验室 | HTTP、CDN、缓存、流式、弱网 |
| P07 | React SaaS | React 企业应用、并发、SSR/RSC |
| P08 | Vue 运营后台 | Vue、响应式、Pinia、Nuxt |
| P09 | Design System | Token、组件、A11Y、版本治理 |
| P10 | Frontend Toolchain | CLI、AST、Bundler Plugin、Codemod |
| P11 | Monorepo Platform | Workspace、缓存、Package、CI |
| P12 | Test Engineering Lab | Unit、Component、E2E、Visual、Contract |
| P13 | Realtime Collaboration | WebSocket、离线、冲突、同步 |
| P14 | Cross-platform Shell | Desktop/Mobile/TV Adapter |
| P15 | Performance & Security Lab | RUM、Trace、CSP、Threat Model |
| P16 | Microfrontend & Plugin Host | Shell、Remote、Sandbox、Contract |
| P17 | Developer Portal | Golden Path、Owner、SLO、自助发布 |
| P18 | AI Agent Workbench | Streaming、Tools、Approval、Evals |

专题项目必须能被主线项目复用，或明确说明为什么保持独立。

---

# 3. 四级验收体系

## 3.1 Knowledge Point 验收

每个知识点至少满足：

- 能回答唯一主问题。
- 有最小可运行实验或其他验证产物。
- 能展示一个错误用法或边界条件。
- 能用自己的话解释现象和专业定义。
- 能指出这个知识在主线项目中的使用位置。

## 3.2 Module 验收

每个 Module 至少满足：

- 所有 KP 形成依赖链，而不是无序清单。
- 有一项综合 Lab。
- 有测试、DevTools、网络、性能、源码或架构证据中的至少一种。
- 有 Module Challenge，不能照抄教程完成。
- 有常见错误、排障路径和进一步阅读。

## 3.3 Stage 验收

每个 Stage 至少满足：

- 阶段项目或主线项目演进。
- 需求、源码、测试和运行文档完整。
- 至少一次故障实验。
- 至少一份设计或复盘文档。
- 进行口头或书面答辩。

## 3.4 Level 晋级验收

每个 Level 使用 Gate Review：

1. **Portfolio Review**：检查项目和证据是否完整。
2. **Live Debugging**：现场定位一个未知问题。
3. **System Explanation**：从用户动作解释到浏览器、网络和服务端。
4. **Design Exercise**：给出约束后设计方案并比较选项。
5. **Failure Exercise**：加入依赖故障、弱网、安全或规模变化。
6. **Retrospective**：说明曾经的错误判断、如何发现、如何修正。

---

# 4. 统一评分 Rubric

每项使用 0～4 分：

- **0：未完成**：没有可运行产物或结论明显错误。
- **1：照做**：跟随步骤可完成，但无法独立解释和迁移。
- **2：独立**：能独立完成常规场景，有基本测试和文档。
- **3：高级**：能处理边界、故障、性能、安全和取舍。
- **4：架构级**：能建立标准、平台或治理机制，并影响其他项目/团队。

评分维度：

| 维度 | 核心问题 |
| --- | --- |
| 正确性 | 是否满足需求和边界，错误是否可恢复？ |
| 原理理解 | 能否用行为、工具和源码证据解释？ |
| 工程质量 | 结构、类型、测试、文档和自动化是否可靠？ |
| 非功能质量 | 性能、安全、A11Y、兼容、稳定性如何？ |
| 架构判断 | 是否比较选项、约束、成本、风险和退出路径？ |
| 影响力 | 是否可复用、可推广、可运营并帮助其他人？ |

晋级不要求所有项目满分，但关键能力不能为 0；进入 L6/L7 时，“架构判断”和“影响力”必须达到 3 以上。

---

# 5. 不同课程类型的证据要求

| 课程类型 | 首选证据 |
| --- | --- |
| HTML/CSS | DOM、Computed、Layout、A11Y Tree、多视口截图 |
| JavaScript | Console、断点、调用栈、事件顺序、测试 |
| Browser | Performance Trace、Memory、Application、Rendering |
| Network | HAR、Header、Waterfall、Cache、Timing、故障注入 |
| React/Vue | Devtools、Profiler、Render 记录、源码断点 |
| TypeScript | 类型测试、声明输出、消费示例、编译时间 |
| Build | Module/Chunk Graph、构建日志、体积和冷/热时间 |
| Test | Trace、失败样本、Flaky 数据、覆盖风险 |
| Performance | Lab/RUM 基线、P75/P95、单变量对比 |
| Security | Threat Model、漏洞复现、修复验证、扫描和策略 |
| Reliability | SLO、告警、Runbook、演练、事故时间线 |
| Architecture | ADR、RFC、C4、时序、Trade-off、容量、故障模型 |
| Platform | 用户路径、采用率、升级率、支持成本、SLO |
| AI | Task Evals、Tool Trace、人工审批、成本、时延和安全测试 |

---

# 6. 建议学习节奏

## 6.1 每周循环

```text
提出本周问题
→ 读最小必要材料
→ 从 0 编码或实验
→ 观察真实现象
→ 制造一个错误
→ 修复并记录证据
→ 总结心智模型
→ 合入主线项目
```

建议每周至少包含：

- 2 次知识点/实验学习。
- 1 次主线项目演进。
- 1 次测试或故障练习。
- 1 次复盘和文档整理。

## 6.2 每月循环

- 完成一个 Module 或小型 Stage。
- 发布一个可运行版本。
- 做一次完整 Review。
- 清理未验证的笔记和错误示例。
- 更新能力矩阵和技术债。

## 6.3 每季度循环

- 完成一个有明显用户价值的版本。
- 进行一次 Gate Review 或架构答辩。
- 完成一个性能、安全、可靠性或源码专题。
- 复核依赖版本和官方标准。
- 调整下一季度 P0/P1/P2/Later 范围。

## 6.4 五年建议分配

| 年度 | 学习主线 | 项目重点 |
| --- | --- | --- |
| 第 1 年 | 卷 01～08 | 静态 Web、CSS 作品、原生 SPA、调试手册 |
| 第 2 年 | 卷 09～15 | TypeScript、React、Vue、浏览器实验、设计系统 |
| 第 3 年 | 卷 16～21 | 工具链、Monorepo、测试、全栈、实时和跨端 |
| 第 4 年 | 卷 22～25 | 性能、安全、SLO、云交付、DDD、微前端、插件 |
| 第 5 年 | 卷 26～28 | 前端平台、迁移治理、领导力、AI 与终极答辩 |

这只是建议。已有经验者可通过挑战跳级，但必须提供同等质量证据。

---

# 7. 从总纲拆成正式课程的规则

## 7.1 Stage 拆分标准

一个 Stage 一般拆成 3～8 个 Module。拆分依据不是文章长度，而是：

- 是否解决不同类型的问题。
- 是否依赖不同前置知识。
- 是否需要不同实验工具。
- 是否具有独立验收产物。
- 是否可以在主线项目中形成一个可发布增量。

## 7.2 Module 拆分标准

一个 Module 一般拆成 8～30 个 Knowledge Point，并可包含：

- BUILD-LAB：从 0 构建。
- BROWSER-MECHANISM：浏览器机制。
- NETWORK-TRACE：网络证据。
- FAILURE-LAB：故障复现与修复。
- PERFORMANCE-LAB：性能基线与优化。
- SECURITY-LAB：安全模型与隔离实验。
- SOURCE-LAB：源码断点与对象观察。
- ARCHITECTURE-LAB：ADR、图、容量和迁移。

## 7.3 Knowledge Point 命名

每个 KP 应能转成唯一主问题，例如：

```text
RE-KP001：React 项目是如何从 index.html 启动到 App 的？
NET-KP023：浏览器为什么发起了 CORS 预检请求？
PERF-KP041：一次输入为什么要等 400ms 才出现下一帧？
ARCH-KP017：什么时候微前端带来的成本高于收益？
```

禁止使用下面这种过宽标题：

```text
React 高级用法
前端性能优化大全
微前端原理与实践
```

## 7.4 每课最低结构

1. 当前问题与可观察现象。
2. 前置知识和本课边界。
3. 从 0 开始的最小步骤。
4. 每个关键变化后的运行与解释。
5. 专业术语和准确原理。
6. 一个错误或失败实验。
7. 完整源码与运行方式。
8. 验证清单。
9. 课后挑战。
10. 与主线项目和后续课程的连接。

详细规范继续以 [`FRONTEND_TEACHING_GUIDE.md`](../FRONTEND_TEACHING_GUIDE.md) 为准。

---

# 8. 正式课程目录建议

大纲确认后，正式目录建议使用：

```text
courses/frontend-architect/
├── README.md
├── level00-foundation/
│   ├── volume01-computer-tools-git/
│   │   ├── README.md
│   │   ├── stage01-computer-files-terminal/
│   │   │   ├── README.md
│   │   │   ├── module01-computer-model/
│   │   │   └── module02-terminal-basics/
│   │   └── ...
│   └── volume02-internet-http-web/
├── level01-static-web/
├── level02-javascript-application/
├── level03-typescript-browser-network/
├── level04-framework-ui-engineering/
├── level05-engineering-fullstack-cross-platform/
├── level06-performance-security-reliability/
└── level07-architecture-platform-ai/
```

知识点目录继续使用稳定编号，避免章节移动后所有链接失效。

---

# 9. 版本、标准与过时内容治理

## 9.1 版本基线

每个 Module README 顶部记录：

- 编写日期。
- Node 与包管理器版本。
- 框架和关键库版本。
- 浏览器测试版本。
- 操作系统或运行环境。
- 相关官方规范/文档。

## 9.2 更新频率

- **每月**：修复错误链接、示例和安全问题。
- **每季度**：检查框架、构建、Node、测试和浏览器基线。
- **每半年**：检查课程顺序、重复内容和技术雷达。
- **重大版本/安全事件**：创建迁移或安全修订，不等待固定周期。

## 9.3 过时处理

不直接删除有迁移价值的历史内容，而是标记：

- Current：当前主路径。
- Legacy：仅用于维护旧系统。
- Migration：从旧方案迁移到新方案。
- Archived：保留历史，不再作为学习主线。

## 9.4 信息源优先级

1. 标准规范和官方文档。
2. 官方源码、测试、Release Note 和安全公告。
3. 浏览器或框架团队的技术文章。
4. 高质量书籍、论文和会议材料。
5. 社区文章仅作为补充，并通过实验验证。

---

# 10. 完成定义

一门课程或一个阶段只有同时满足以下条件才标记完成：

- 文档结构符合教学规范。
- 源码可以从干净环境运行。
- 依赖和版本可复现。
- 核心行为有自动测试或可观察证据。
- 错误场景和边界已覆盖。
- 安全和隐私风险已检查。
- README 说明运行、验证和排障。
- 主线项目或专题项目已吸收该能力。
- Review 意见已关闭或记录为明确技术债。
- 后续课程依赖和链接已建立。

以下情况不能标记完成：

- 只有名词解释，没有实验。
- 只有最终源码，没有从 0 到 1 过程。
- 只能在作者本机运行。
- 测试全部依赖 Mock，未验证真实集成。
- 只展示正常路径，没有错误和边界。
- 版本已经过时但没有迁移说明。
- 架构课程只有图，没有约束、取舍和验证。
- AI 课程只展示生成结果，没有评估、权限和安全。

---

# 11. 大纲下一步拆解顺序

总纲评审通过后，建议按以下顺序推进：

1. 先确认 8 个 Level 和 28 卷是否有遗漏或重复。
2. 再确认 84 个 Stage 的先后依赖。
3. 为每个 Stage 编写 Module Teaching Contract。
4. 先完整拆解卷 01，而不是同时批量生成所有课程。
5. 选择 2～3 个 Module 做样板课，验证教学规范和目录。
6. 根据样板课修改拆分粒度。
7. 再批量建设，保持每批可运行、可评审、可回滚。

这套流程的目的，是先把体系设计正确，再稳定地把它变成真正能学、能做、能验证的课程。