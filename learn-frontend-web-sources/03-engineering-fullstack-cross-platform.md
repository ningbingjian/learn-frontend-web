# 卷 16～21：Node.js、构建、仓库工程、测试、全栈与跨端

> 覆盖 Stage 46～63。  
> 目标：从应用开发者升级为能负责工具链、质量体系、全栈渲染、云交付、实时协作和多端工程的高级前端专家。

---

# 卷 16：Node.js、模块、编译与构建工具

## Stage 46：Node.js 运行时、标准库与工程脚本

**目标**：能够编写可靠的前端工具、CLI、BFF 和自动化脚本，而不是只会执行 `npm run dev`。

**模块**：

1. **运行时模型**：Node.js 与浏览器的全局对象、模块、事件循环、I/O、线程池、进程和信号差异。
2. **核心标准库**：Path、URL、File System、Process、OS、Crypto、HTTP、Stream、Buffer、EventEmitter 和 Child Process。
3. **异步 I/O**：Callback、Promise API、Stream、Pipeline、Backpressure、文件句柄、错误关闭和并发限制。
4. **命令行程序**：参数、选项、帮助、交互输入、Exit Code、Signal、颜色、进度、日志级别和非交互 CI 模式。
5. **环境管理**：Node 版本、Active LTS 策略、环境变量、`.env` 边界、配置优先级和开发/测试/生产差异。
6. **包管理器**：npm、pnpm、Yarn、Bun 的安装模型、Lockfile、Workspace、Script、Lifecycle 和安全风险。
7. **自动化脚本**：文件生成、批量重命名、代码检查、资源处理、构建编排、并发任务和失败回滚。
8. **调试与性能**：Inspector、CPU Profile、Heap、Async Stack、Trace Event、未处理异常和进程泄漏。

**实践与证据**：实现一个课程目录生成 CLI；实现并发受控的文件处理工具；处理 SIGINT 和失败清理；使用 Inspector 定位 CPU 或内存问题。

**阶段门槛**：CLI 必须有帮助、错误码、日志、幂等和测试；不能用同步 I/O 阻塞大规模任务而不解释取舍。

## Stage 47：ESM/CJS、包解析、编译器与 Source Map

**目标**：理解源码如何被解析、转换、解析依赖并映射回开发代码。

**模块**：

1. **模块体系**：ES Modules、CommonJS、动态 Import、Top-level Await、Live Binding、循环依赖和执行顺序。
2. **Node 包解析**：`type`、Main、Module、Exports、Imports、条件导出、子路径、Self Reference 和 Dual Package Hazard。
3. **浏览器模块**：URL 解析、Import Map、跨域、MIME、模块缓存、预加载和 Native ESM。
4. **编译流程**：Source → Token → AST → Transform → Codegen；Parser、Traversal、Scope、Binding 和静态分析。
5. **工具比较**：TypeScript Compiler、Babel、SWC、esbuild 等在类型检查、语法转换、Polyfill 和性能上的职责。
6. **Polyfill 策略**：Syntax Transform 与 Runtime API；Target、Browserslist、Core-js、按需注入和污染风险。
7. **Source Map**：原始位置、生成位置、映射段、Inline/External/Hidden、生产上传和源码泄漏风险。
8. **Codemod**：AST 查询、批量迁移、幂等、格式保持、Dry Run、统计和失败回滚。

**实践与证据**：手写 AST 转换；实现一个 API 重命名 Codemod；构造 ESM/CJS 互操作问题；生成并验证 Source Map。

**阶段门槛**：能从包导入失败追踪到 Package Exports 和 Resolution 条件，能说明语法转换、类型检查和打包不是同一件事。

## Stage 48：Vite、Rolldown、Rollup、Webpack、Rspack 与构建原理

**目标**：能够设计、调试和迁移构建系统，而不是依赖脚手架默认值。

**模块**：

1. **构建目标**：开发启动速度、HMR、生产体积、缓存、兼容、插件生态、可观测性和稳定性。
2. **依赖图**：Entry、Module Graph、Chunk Graph、Asset Graph、Side Effect、Tree Shaking 和 Dead Code Elimination。
3. **开发服务器**：Native ESM、Dependency Pre-bundling、Module Transform、HMR Boundary、Update Propagation 和失效。
4. **生产打包**：Code Splitting、Dynamic Import、Manual Chunk、Runtime Chunk、CSS Extraction、Asset Hash 和 Manifest。
5. **工具体系**：Vite 8/Rolldown、Rollup、Webpack、Rspack、esbuild 的架构、适用场景、迁移成本和插件兼容。
6. **插件机制**：Resolve、Load、Transform、Virtual Module、Hook 顺序、缓存、Watch 和错误定位。
7. **高级优化**：Persistent Cache、Parallelism、Remote Cache、Module Federation、Worker、WASM、SSR Build 和 Library Mode。
8. **构建分析**：Bundle Analyzer、Stats、重复依赖、Chunk Waterfall、Source Map Explorer、冷启动和增量构建基线。

**实践与证据**：从零配置一个构建流程；编写虚拟模块插件；分析重复依赖和 Chunk；完成一次 Webpack/Vite 或 Vite 旧版到新版迁移实验。

**阶段门槛**：任何构建优化都必须有冷启动、热更新、生产构建、产物体积和运行性能前后数据。

---

# 卷 17：Monorepo、包工程、发布与开发者体验

## Stage 49：Workspace、Monorepo 与依赖图

**目标**：管理多个应用、组件库、工具包和服务之间的依赖与构建。

**模块**：

1. **仓库形态**：Polyrepo、Monorepo、Megarepo 的团队边界、发布节奏、权限和运维成本。
2. **Workspace**：包发现、Workspace Protocol、Hoist、严格依赖、Peer Dependency、Phantom Dependency 和 Lockfile。
3. **任务图**：Build/Test/Lint/Typecheck 的依赖、并行、增量、缓存 Key、输入输出和环境变量。
4. **工具比较**：原生 Workspace、Turborepo、Nx 等在 Project Graph、Affected、Generator、Remote Cache 和插件体系上的差异。
5. **边界治理**：层级、Tag、Import Rule、循环依赖、公共包膨胀、跨域引用和所有权。
6. **缓存与可重复性**：本地/远程缓存、Hermetic Build、时间/网络依赖、环境指纹和缓存污染。
7. **大仓库体验**：稀疏检出、局部安装、增量 TypeScript、测试分片、CI 选择执行和变更影响分析。
8. **权限和发布**：CODEOWNERS、目录所有者、敏感包、保护规则、版本策略和独立/统一发布。

**实践与证据**：建立包含 Web、BFF、组件库、SDK、配置包和 CLI 的 Monorepo；实现 Affected Build；故意制造幽灵依赖和循环依赖并治理。

**阶段门槛**：新增包后依赖方向可自动检查；改动一个模块时能解释哪些任务必须重新运行以及缓存为什么可复用。

## Stage 50：库设计、Package Export、SemVer 与发布

**目标**：发布真正可被多个项目长期消费的前端包。

**模块**：

1. **库边界**：公共 API、Internal、Entry、Subpath Export、Runtime、Type、Style、Asset 和 Side Effect。
2. **多格式输出**：ESM、CJS、Browser、Node、SSR、Type Declaration；是否需要多格式以及双包风险。
3. **Tree Shaking**：静态导入、Side Effects、Barrel File、CSS、副作用初始化和验证方法。
4. **版本语义**：SemVer、Breaking、Feature、Fix、Pre-release、Canary、Deprecation 和兼容窗口。
5. **发布流程**：Changeset、Changelog、Tag、Registry、Provenance、签名、Dry Run、回滚和撤回限制。
6. **API 质量**：类型测试、API Report、Bundle Size、Runtime Compatibility、Browser Matrix 和文档示例。
7. **依赖策略**：Dependency、Dev、Peer、Optional、Bundled；版本范围、单例库和重复 React/Vue 风险。
8. **消费方迁移**：Codemod、Compatibility Layer、Feature Flag、分批升级和废弃指标。

**实践与证据**：发布内部测试包或本地 Registry 包；构建 ESM/Type/CSS 输出；验证 Tree Shaking；模拟一次 Breaking Change 和自动迁移。

**阶段门槛**：包必须能在至少两个独立消费项目中安装、构建、测试和升级，不能只在仓库内部通过路径别名使用。

## Stage 51：脚手架、Codemod、依赖治理与 Developer Experience

**目标**：通过平台能力减少重复工作和错误，而不是仅靠文档要求开发者自觉。

**模块**：

1. **Golden Path**：推荐目录、配置、日志、测试、监控、发布和安全默认值。
2. **脚手架与生成器**：Template、Prompt、参数验证、命名、冲突检测、幂等、升级和自定义扩展。
3. **统一配置**：TypeScript、ESLint、Stylelint、Test、Build、Commit、EditorConfig 和共享配置包。
4. **Codemod 平台**：规则注册、变更统计、Dry Run、分批执行、失败样本、人工确认和回滚。
5. **依赖治理**：版本目录、自动升级、漏洞、License、重复依赖、未维护库、替代方案和批准流程。
6. **本地环境**：一键启动、Dev Container、Mock、代理、测试数据、服务依赖、端口和故障诊断。
7. **效率度量**：Setup Time、Build Time、Test Time、PR Lead Time、失败率、升级完成率和开发者反馈。
8. **平台产品思维**：内部开发者是用户；文档、支持、迁移、兼容、服务等级和采用策略。

**实践与证据**：实现项目生成器、统一配置包和 Codemod；将旧项目接入 Golden Path；记录接入前后启动、构建和质量数据。

**阶段门槛**：规范必须尽量自动执行；平台升级有兼容与迁移路径；不能通过复制粘贴一套配置冒充平台化。

---

# 卷 18：静态分析、单测、组件、E2E 与质量平台

## Stage 52：静态分析、单元测试与可测试设计

**目标**：在代码运行前和最小单元层发现大部分低成本问题。

**模块**：

1. **质量分层**：Type Check、Lint、Format、Unit、Integration、Component、E2E、Visual、A11Y、Performance 和 Security。
2. **静态分析**：ESLint AST Rule、Type-aware Lint、Import Boundary、Dead Code、Duplicate、Complexity 和 Custom Rule。
3. **单元测试模型**：Arrange/Act/Assert、Behavior、State、Interaction、Table-driven、Boundary 和 Error Case。
4. **测试替身**：Stub、Fake、Spy、Mock 的区别；过度 Mock、实现细节和真实依赖边界。
5. **时间与随机性**：Fake Timer、Clock、Random Seed、UUID、Date、Timezone 和可重复性。
6. **异步测试**：Promise、Timer、Retry、Polling、Abort、Unhandled Rejection 和测试完成时机。
7. **覆盖率**：Statement、Branch、Function、Line；覆盖率盲点、阈值和风险导向。
8. **可测试设计**：纯函数、依赖注入、Adapter、Port、显式时间、显式副作用和小公共面。

**实践与证据**：为 SDK、状态机、缓存和错误模型编写单测；实现自定义 ESLint 规则；对比重构前后测试复杂度。

**阶段门槛**：测试失败信息能够指出行为差异；不能通过大量 Snapshot 或 Mock 获得虚假覆盖率。

## Stage 53：组件、集成、E2E、视觉与可访问性测试

**目标**：验证用户真正看到和操作的行为，并覆盖浏览器集成边界。

**模块**：

1. **组件测试**：真实 DOM、可访问查询、Props、Event、Provider、Router、请求 Mock 和交互状态。
2. **集成测试**：多个模块、数据层、路由、Store、表单和错误边界的协作。
3. **E2E 测试**：Playwright Test、Browser Context、Isolation、Fixture、Locator、Auto-wait、Trace、Video 和 Screenshot。
4. **认证与数据**：Storage State、测试账号、并行隔离、数据 Seed、清理和多角色场景。
5. **网络控制**：Route Mock、HAR、API 测试、故障注入、慢网、重试和第三方依赖隔离。
6. **视觉回归**：基准图、字体、动画、时区、浏览器、像素差、组件矩阵和人工审批。
7. **A11Y 测试**：自动规则、键盘流程、屏幕阅读器人工检查、Focus、Name/Role/State 和误报处理。
8. **跨浏览器与设备**：Chromium、WebKit、Firefox、移动模拟、触控、Viewport 和真实设备抽样。

**实践与证据**：为主线项目建立核心旅程 E2E；失败时保留 Trace；覆盖权限、慢网和服务异常；运行视觉和 A11Y 检查。

**阶段门槛**：E2E 不依赖脆弱 CSS 路径和固定等待；测试可并行、可重复、失败可诊断。

## Stage 54：契约、属性、变异、性能测试与质量门禁

**目标**：从“有测试”升级为能够控制系统性风险的质量工程。

**模块**：

1. **契约测试**：OpenAPI/Schema、Consumer Contract、Mock Server、兼容检测和前后端独立发布。
2. **Property-based Testing**：生成输入、不变量、Shrink、边界空间和适合前端的 Parser/Formatter/State Machine。
3. **Mutation Testing**：测试是否真正能发现逻辑变化；存活变异、成本和关键模块采用。
4. **性能测试**：页面指标、组件 Benchmark、Bundle Budget、Long Task、Memory、并发用户和回归阈值。
5. **安全测试**：静态扫描、依赖扫描、Secret、Header、CSP、DAST 和安全单元测试。
6. **Flaky 治理**：分类、Quarantine、重试限制、根因、所有者、历史趋势和禁止永久忽略。
7. **测试数据**：Builder、Factory、Fixture、Seed、脱敏、环境隔离和数据生命周期。
8. **质量门禁**：PR 必跑、主干必跑、夜间任务、风险分级、豁免、审批和可追踪性。
9. **质量度量**：Defect Escape、Change Failure Rate、Flaky Rate、Mean Time to Diagnose、关键旅程覆盖和修复周期。

**实践与证据**：建立 CI 质量矩阵；引入契约和性能预算；对一个模块运行 Mutation Test；治理至少一个真实 Flaky Case。

**阶段门槛**：质量门禁与风险对应，失败有所有者和处理流程；不能只展示一个总体覆盖率数字。

---

# 卷 19：BFF、Next.js、Nuxt 与全栈渲染

## Stage 55：Node.js BFF、认证、会话与 API 聚合

**目标**：构建面向前端体验的服务层，并明确它与核心后端的边界。

**模块**：

1. **BFF 职责**：聚合、裁剪、协议转换、会话、SSR 数据、Feature Flag 和前端专用编排。
2. **服务结构**：Router、Controller、Use Case、Domain、Client、Repository、Middleware 和 Error Handler。
3. **认证模型**：Session、Cookie、Token、OAuth 2.0、OIDC、Authorization Code + PKCE 和登录回调。
4. **会话安全基础**：HttpOnly、Secure、SameSite、Rotation、Expiration、Logout、CSRF 防护和多设备会话。
5. **授权**：Role、Permission、Resource、Tenant、Policy、前端显示控制与服务端强制校验。
6. **聚合与韧性**：并发下游、Timeout、Retry、Circuit Breaker、Partial Response、Fallback 和 Trace。
7. **接口治理**：Schema、Validation、Rate Limit、Idempotency、Audit、版本和兼容。
8. **部署与运行**：Graceful Shutdown、Health、Readiness、日志、指标、配置和 Secret。

**实践与证据**：实现带登录、Session、权限、聚合和 Trace ID 的 BFF；模拟下游超时和部分失败；完成威胁初审。

**阶段门槛**：BFF 不保存不必要的核心业务规则；前端隐藏按钮不能代替后端授权；故障有明确超时和降级。

## Stage 56：Next.js App Router、React Server Components 与缓存

**目标**：以现代 React 全栈框架构建生产级应用，并理解服务器与客户端边界。

**模块**：

1. **App Router**：Segment、Layout、Page、Loading、Error、Not Found、Route Group、Parallel/Intercepting Route。
2. **Server/Client Component**：模块图、Boundary、Serialization、Browser API、Bundle、Context 和第三方库适配。
3. **数据访问**：服务端 Fetch、数据库/API、并行、Suspense、Streaming、错误和身份上下文。
4. **写操作**：Server Function/Action、Validation、Authorization、Pending、Optimistic、Revalidation 和重复提交。
5. **缓存体系**：Request Memoization、Data Cache、Route Cache、Client Router Cache、Tag/Path Revalidation 和动态渲染。
6. **渲染策略**：Static、Dynamic、Streaming、Partial Prerender、Client Navigation、Hydration 和 SEO。
7. **资源优化**：Image、Font、Script、Metadata、Sitemap、Open Graph、Bundle 和 Third-party。
8. **运行环境**：Node/Edge、Middleware/Proxy、Route Handler、Instrumentation、Runtime 限制和部署形式。
9. **升级与安全**：Codemod、弃用、RSC 安全公告、依赖锁定、回归和灰度。

**实践与证据**：构建多租户 Next 应用；包含 RSC、流式加载、Action、缓存失效、权限和部署；绘制每个模块运行位置图。

**阶段门槛**：能准确回答一段代码运行在构建期、服务器请求期、Edge 还是浏览器；缓存命中和失效有证据。

## Stage 57：Nuxt 4、Nitro、Vue SSR 与跨框架渲染策略

**目标**：掌握 Vue 全栈框架，并能比较不同 Meta-framework 的架构选择。

**模块**：

1. **Nuxt 目录与路由**：App、Pages、Layouts、Middleware、Plugins、Components、Composables 和 Assets/Public。
2. **数据获取**：`useFetch`、`useAsyncData`、Payload、Key、Deduplication、Lazy、Refresh、Error 和 SSR 状态。
3. **Nitro 服务端**：Server Route、Middleware、Storage、Task、Plugin、Runtime Config 和部署预设。
4. **渲染与缓存**：Universal、Client-only、Prerender、Hybrid Route Rule、SWR、ISR、Edge 和 Hydration。
5. **状态与安全**：Pinia SSR、Cookie、Session、序列化、私有配置、请求上下文和跨请求污染。
6. **Module 与 Layer**：可复用模块、Hook、自动导入、配置扩展、多产品基座和主题层。
7. **性能与观测**：Bundle、Payload、组件岛、资源提示、Server Timing、日志和错误跟踪。
8. **Next/Nuxt 比较**：RSC/组件边界、数据模型、缓存、插件生态、部署、团队技能和迁移成本。

**实践与证据**：使用 Nuxt 4 实现主线项目的一个完整产品面；建设 Layer；完成混合渲染和部署；提交 Next/Nuxt Trade-off ADR。

**阶段门槛**：不是用“React 还是 Vue 更喜欢”选型，而是从运行模型、缓存、团队、生态、成本和退出策略论证。

---

# 卷 20：Edge、CDN、实时协作、离线与第三方集成

## Stage 58：渲染拓扑、Edge、Serverless、CDN 与多区域

**目标**：把前端渲染和静态资源放入真实云网络中设计。

**模块**：

1. **部署拓扑**：Browser、DNS、CDN、WAF、Edge Function、Load Balancer、SSR Server、BFF 和 Origin。
2. **静态交付**：对象存储、Immutable Asset、HTML 缓存、Purge、Version、Rollback 和多环境域名。
3. **Serverless/Edge**：Cold Start、Runtime 限制、连接、状态、文件系统、地域、成本和 Vendor Lock-in。
4. **多区域**：用户就近、数据驻留、跨区延迟、会话、缓存一致性、故障切换和写入归属。
5. **渲染策略组合**：Build-time、Request-time、Edge、Client、Streaming、Partial 和按路由选择。
6. **配置与密钥**：Build-time/Public/Server-only、Secret Manager、轮换和泄漏检测。
7. **流量治理**：Canary、Blue/Green、Weighted Routing、Feature Flag、租户灰度和回滚。
8. **成本模型**：请求、带宽、函数时间、日志、图片处理、缓存命中和第三方服务费用。

**实践与证据**：为主线项目画三种部署拓扑；实现静态资源不可变缓存和 HTML 回滚；模拟区域故障；建立基本成本估算。

**阶段门槛**：部署方案必须包含缓存、失败、回滚、数据地域、安全和成本，不能只写“部署到某平台”。

## Stage 59：实时协作、Presence、冲突与离线同步

**目标**：构建多人协作和离线可用的数据体验。

**模块**：

1. **协作状态**：Document State、Presence、Cursor、Selection、Typing、Awareness 和临时/持久数据。
2. **同步协议**：Snapshot、Operation、Sequence、Ack、Version Vector、Reconnect、Replay 和 Compaction。
3. **冲突策略**：锁、乐观并发、Last-write-wins、字段合并、Operational Transformation 和 CRDT。
4. **本地优先**：Local Database、Operation Log、Pending、Background Sync、Offline Queue 和最终一致。
5. **连接与扩展**：Room、Shard、Sticky Session、Fan-out、Backpressure、Heartbeat 和 Presence 过期。
6. **用户体验**：离线标识、待同步、冲突 UI、撤销、版本历史、恢复和权限变化。
7. **安全与隐私**：房间授权、消息校验、重放、防刷、敏感内容和协作审计。
8. **测试**：断网、乱序、重复、并发编辑、时钟差、客户端旧版本和大文档。

**实践与证据**：实现多人任务板或文本协作原型；支持 Presence、断线恢复、离线编辑和冲突显示；记录协议时序。

**阶段门槛**：两客户端并发修改时不会静默覆盖；重新连接可恢复；同步协议有版本和兼容策略。

## Stage 60：对象存储、搜索、支付、地图、分析与外部服务

**目标**：以可替换、可降级、可审计的方式集成外部能力。

**模块**：

1. **对象存储**：Signed URL、直传、分片、校验、元数据、访问控制、缩略图、病毒扫描和生命周期。
2. **搜索**：Query、Filter、Facet、Highlight、Autocomplete、Index Delay、Pagination 和无结果体验。
3. **支付与订单**：前端 Tokenization、支付跳转、3DS、重复提交、Webhook、最终状态和对账意识。
4. **地图与地理**：Tile、Marker、Cluster、Viewport、Geocode、权限、配额和隐私。
5. **分析与实验**：Event Schema、Identity、Session、Consent、Sampling、漏斗、实验曝光和数据质量。
6. **第三方脚本**：加载时机、性能、CSP、Sandbox、故障隔离、供应商变更和隐私风险。
7. **Webhook 与异步结果**：前端轮询/推送、签名、重复事件、乱序、状态机和最终一致。
8. **供应商抽象**：Adapter、Capability、Fallback、Feature Flag、SLA、费用、数据导出和退出计划。

**实践与证据**：完成大文件直传、搜索和一种外部服务集成；模拟供应商超时、配额耗尽和 SDK 加载失败；提供替代与降级方案。

**阶段门槛**：业务代码不直接散落供应商 SDK；数据、权限、失败、成本和退出路径明确。

---

# 卷 21：桌面、移动、跨端、可视化与新兴 Web 能力

## Stage 61：桌面、移动、小程序、TV 与跨端工程

**目标**：理解 Web 技术跨端的真实边界，避免“一套代码运行所有端”的空泛承诺。

**模块**：

1. **跨端模型**：WebView、Native Widget、JavaScript Runtime、Bridge、打包壳和共享业务逻辑。
2. **桌面应用**：Electron 的多进程、Preload、IPC、Context Isolation、更新、签名；Tauri 等轻量壳的安全与能力差异。
3. **移动方案**：React Native、Capacitor/Hybrid、PWA；布局、手势、导航、原生模块、离线和发布。
4. **小程序与平台容器**：运行时约束、组件映射、包大小、分包、权限、审核、平台 API 和多端编译。
5. **TV/OTT/大屏**：遥控器焦点导航、十英尺 UI、低性能设备、分辨率、视频、输入方式和长时间运行稳定性。
6. **共享策略**：Domain、Schema、SDK、Token、组件、Platform Adapter 和条件构建；哪些不应强行共享。
7. **发布与更新**：商店审核、Code Push 限制、桌面自动更新、灰度、崩溃和版本兼容。
8. **安全**：Bridge 最小权限、IPC 校验、远程内容、文件访问、证书、供应链和本地敏感数据。

**实践与证据**：将主线项目一个模块移植到桌面或移动壳；实现平台 Adapter；完成 TV 键盘/遥控焦点实验；记录共享率和额外成本。

**阶段门槛**：跨端选型必须说明用户体验、团队能力、性能、安全、发布和维护成本，而不是只比较代码复用百分比。

## Stage 62：SVG、Canvas、WebGL/WebGPU、图表与媒体

**目标**：处理高密度可视化、图形、音视频和大数据展示。

**模块**：

1. **SVG**：坐标、ViewBox、Path、Group、Transform、Gradient、Filter、事件、A11Y 和 DOM 成本。
2. **Canvas 2D**：绘制状态、路径、像素、文本、HiDPI、命中测试、离屏绘制和导出。
3. **WebGL/WebGPU 基础**：渲染管线、Buffer、Shader、Texture、Coordinate、Batch、GPU 资源生命周期。
4. **图表工程**：Scale、Axis、Layout、Interaction、Tooltip、Zoom、Brush、Legend、Theme 和响应式。
5. **大数据可视化**：Sampling、Aggregation、Progressive Render、Virtualization、Worker、OffscreenCanvas 和 Level of Detail。
6. **媒体能力**：Audio/Video、MSE、EME 概念、Web Audio、WebCodecs、字幕、直播延迟和自适应码率直觉。
7. **可访问性**：图表文本摘要、数据表替代、键盘导航、颜色之外的编码和动态播报。
8. **库封装**：D3、ECharts、Three.js 等的 Adapter、生命周期、Resize、Dispose、主题和 SSR 边界。

**实践与证据**：构建实时大数据图表；将计算移入 Worker；实现图表可访问替代；分析帧率、内存和节点数量。

**阶段门槛**：图形方案必须有数据规模和帧率基线；卸载时释放 GPU、监听器和媒体资源。

## Stage 63：WebAssembly、WebGPU、WebXR 与设备 API 探索

**目标**：具备评估新兴 Web 能力的研究方法，而不是追逐新名词。

**模块**：

1. **WebAssembly**：线性内存、Module/Instance、JS Bridge、复制成本、线程、SIMD、WASI/组件模型概念和适用场景。
2. **高性能计算**：图像、音视频、压缩、解析、加密、科学计算；何时 Worker/JS 已足够。
3. **WebGPU**：Compute、Render Pipeline、资源绑定、异步错误、设备丢失和兼容降级。
4. **WebXR 与沉浸式界面**：Session、Reference Space、Input、Frame Loop、性能和眩晕风险。
5. **设备 API**：Bluetooth、USB、Serial、HID、MIDI、NFC 等的权限、浏览器支持和安全边界。
6. **能力检测**：Feature Detection、Permission、Secure Context、Origin Trial、Baseline 和实验开关。
7. **研究流程**：官方规范、浏览器实现、最小实验、兼容矩阵、性能基线、风险和退出策略。
8. **生产决策**：业务价值、Fallback、支持成本、隐私、合规、厂商锁定和长期维护。

**实践与证据**：选择一个新兴 API 完成 Research Spike；提交 Demo、兼容矩阵、性能数据、威胁分析、采用 ADR 和不采用条件。

**阶段门槛**：研究结论必须可复现；不能因为 Demo 能运行就直接建议生产采用。

---

# 本分册综合验收

完成卷 16～21 后，必须提交：

1. 一个可安装、可测试、可发布的 Node.js CLI。
2. 一个包含多应用、多包、组件库、SDK、BFF 和统一配置的 Monorepo。
3. 一次真实构建分析和构建系统迁移或插件开发。
4. 覆盖静态分析、单元、组件、E2E、视觉、A11Y、契约和性能的质量矩阵。
5. 一个 Next.js 全栈产品面和一个 Nuxt 全栈产品面。
6. 实时协作/离线同步、大文件上传或流式交互中的至少两项完整能力。
7. 一个桌面、移动、TV 或小程序跨端实验。
8. 一个大数据可视化或新兴 Web API Research Spike。

阶段答辩必须能够说明：源码如何经过解析、转换和打包；包如何发布；请求如何在浏览器、CDN、Edge、SSR、BFF 和下游之间流动；测试、回滚和降级如何保护用户。