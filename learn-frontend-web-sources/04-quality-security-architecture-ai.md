# 卷 22～28：性能、安全、可靠性、架构、平台、领导力与 AI

> 覆盖 Stage 64～84。  
> 目标：从高级工程师继续成长为能够负责组织级质量、复杂架构、前端平台和 AI 原生产品的 Staff / Principal 级前端架构师。

---

# 卷 22：性能测量、优化、预算与规模化治理

## Stage 64：性能指标、实验方法、Lab 与 RUM

**目标**：从“感觉页面快慢”升级为使用可重复数据描述用户体验。

**模块**：

1. **用户体验指标**：TTFB、FCP、LCP、INP、CLS、DOMContentLoaded、Load、Long Task、Long Animation Frame 和自定义业务指标。
2. **指标语义**：每个指标测量什么、不测量什么；页面级、会话级、用户级；P50/P75/P95/P99 和均值误导。
3. **Lab 与 Field**：本地实验、Lighthouse、Performance Panel、WebPageTest 类实验与真实用户监控的差异。
4. **RUM 采集**：Performance API、PerformanceObserver、Navigation/Resource/Long Task/Event Timing、采样和上报。
5. **业务时间点**：可交互、首个可用数据、搜索结果可用、提交完成、播放器起播、AI 首 Token 等领域指标。
6. **实验设计**：基线、假设、单变量、控制组、设备/网络矩阵、冷/热缓存、重复次数和置信区间意识。
7. **性能预算**：页面重量、请求数、关键 Chunk、LCP、INP、CLS、内存、CPU 和构建时间预算。
8. **数据质量**：Bot、后台标签、异常设备、版本、地域、网络、缓存、采样偏差和指标丢失。

**实践与证据**：为主线项目建立 Lab 与 RUM 双基线；定义 5 个技术指标和 3 个业务指标；按设备、地域、版本和页面分组分析。

**阶段门槛**：优化前必须有基线，优化后必须证明改善且未引入新的质量退化。

## Stage 65：加载、渲染、交互、内存与能源优化

**目标**：能够定位并优化网络、主线程、渲染、框架和内存瓶颈。

**模块**：

1. **加载路径**：关键请求链、DNS/Connect/TLS、HTML 流、Render-blocking、Preload、Priority、第三方和缓存。
2. **代码体积**：Tree Shaking、Code Splitting、Route/Component Splitting、Polyfill、Locale、重复依赖和 Source Map。
3. **图片与字体**：尺寸、格式、响应式、Lazy Load、Decode、Placeholder、字体子集、Preload 和回退指标。
4. **渲染成本**：Style、Layout、Paint、Composite、Layout Shift、DOM 规模、CSS 选择器和 Layer。
5. **JavaScript 成本**：Parse/Compile/Evaluate、Long Task、任务切片、Worker、Scheduler、Yield 和事件处理。
6. **框架性能**：Render 扩散、Memo、Selector、Context/Store、Virtualization、Suspense、Hydration、Server Component 和响应式粒度。
7. **交互性能**：Input Delay、Event Handler、Next Paint、频繁事件、Debounce/Throttle、Passive Listener 和手势。
8. **内存**：Heap、Detached DOM、监听器、Timer、Cache、Closure、GPU、媒体资源和页面长期运行。
9. **能源与低端设备**：CPU 唤醒、轮询、动画、网络、后台工作、电量和 TV/移动端热量。

**实践与证据**：至少完成一次 LCP、一次 INP、一次内存和一次 Bundle 优化；每项提交 Trace、前后数据、风险和回归测试。

**阶段门槛**：不能用“加 Memo”“上 CDN”“压图片”等方案词替代根因分析。

## Stage 66：性能架构、容量模型与持续治理

**目标**：让性能成为系统属性，而不是上线前临时救火。

**模块**：

1. **预算自动化**：CI Bundle Budget、页面指标、组件 Benchmark、Lighthouse CI、RUM Regression 和阻断/告警策略。
2. **容量模型**：用户量、并发、请求、消息、数据行、DOM 节点、内存、CPU、带宽和第三方配额。
3. **大型页面策略**：虚拟列表、分页、增量加载、Worker、Server Aggregation、查询限制和可视化降采样。
4. **多租户与配置膨胀**：主题、权限、Feature Flag、动态组件、Locale 和租户代码对缓存及包体的影响。
5. **缓存架构**：浏览器、Service Worker、CDN、SSR、API、Query Cache 的职责、命中率和失效成本。
6. **性能回归治理**：Owner、Baseline、Release Annotation、Bisect、Rollback、Exception、Debt 和修复 SLA。
7. **体验与成本取舍**：预取、服务器渲染、Edge、图片转换、日志采样和第三方服务的收益与费用。
8. **组织机制**：Performance Champion、评审模板、性能周报、红线、培训和典型案例库。

**实践与证据**：为一个百万级数据或高并发场景建立容量模型；设计性能门禁；演示一次回归自动发现、定位和回滚。

**阶段门槛**：能够说明系统在哪个规模下首先失效、如何监测、如何扩展以及扩展成本。

---

# 卷 23：Web 安全、认证、隐私与供应链安全

## Stage 67：浏览器攻击面与常见 Web 漏洞

**目标**：理解浏览器安全模型，能够发现和修复客户端漏洞。

**模块**：

1. **信任边界**：用户输入、URL、DOM、存储、API、第三方脚本、Iframe、扩展和服务端渲染内容。
2. **XSS**：Reflected、Stored、DOM-based；HTML/Attribute/URL/Script/CSS Context；编码、Sanitization 和安全 DOM API。
3. **DOM Clobbering 与 Prototype Pollution**：命名属性、对象合并、路径设置、第三方库和防御。
4. **CSRF**：Cookie 自动携带、SameSite、Token、Origin/Referer 检查、幂等和登录 CSRF。
5. **CORS**：同源策略、简单请求、Preflight、Credential、Origin 白名单、缓存和常见错误配置。
6. **点击劫持**：Frame、Overlay、`frame-ancestors`、X-Frame-Options 和敏感操作确认。
7. **开放重定向与 URL 安全**：协议、Host、相对路径、`javascript:`、Data URL 和跳转白名单。
8. **文件与富文本**：MIME、扩展名、SVG、图片元数据、下载、预览、Office/PDF 和内容嗅探。
9. **业务攻击**：越权、批量枚举、重复提交、价格篡改、前端校验绕过和自动化滥用。

**实践与证据**：在隔离环境复现 XSS、CSRF、CORS 和 Clickjacking；使用上下文编码、CSP 和服务端校验修复；输出漏洞报告。

**阶段门槛**：不能把输入校验等同于输出编码，也不能把前端隐藏和按钮禁用当成权限控制。

## Stage 68：会话、授权、CSP、Trusted Types 与安全隔离

**目标**：设计从登录到敏感操作的端到端安全链路。

**模块**：

1. **认证协议**：Session、OAuth 2.0、OIDC、Authorization Code + PKCE、State、Nonce、Redirect URI 和 Token Exchange。
2. **会话生命周期**：创建、续期、Rotation、并发会话、过期、登出、撤销、设备管理和风险登录。
3. **Token 存储**：HttpOnly Cookie、内存、Web Storage 的风险；Refresh、Access、泄漏和 XSS 影响。
4. **授权模型**：RBAC、ABAC、ReBAC、Policy、Resource、Action、Tenant、Row-level 和前后端职责。
5. **CSP**：Directive、Nonce、Hash、Strict Dynamic、Report Only、Violation Report、第三方脚本和渐进上线。
6. **Trusted Types**：Sink、Policy、Sanitizer、迁移和第三方库兼容。
7. **Iframe/Sandbox**：Sandbox Token、allow、Credentialless、跨源隔离、`postMessage` Origin/Schema 校验。
8. **跨源隔离**：COOP、COEP、CORP、SharedArrayBuffer、安全与兼容影响。
9. **强认证**：WebAuthn/Passkey、多因素、恢复流程、设备丢失和可访问性。
10. **审计与敏感操作**：Step-up Authentication、二次确认、Audit Log、不可抵赖边界和隐私。

**实践与证据**：实现 OIDC/Session 登录；配置 CSP Report Only 到 Enforcement；构建安全 `postMessage` 协议；完成权限矩阵与越权测试。

**阶段门槛**：认证、会话、授权和 UI 显示控制必须分开建模；安全 Header 和策略需有自动化验证。

## Stage 69：OWASP、隐私、依赖与软件供应链治理

**目标**：把安全从单个漏洞修复扩展为工程和组织流程。

**模块**：

1. **OWASP Top 10:2025**：Broken Access Control、Security Misconfiguration、Supply Chain、Cryptographic、Injection、Insecure Design 等与前端的关系。
2. **威胁建模**：资产、Actor、Entry、Trust Boundary、STRIDE、Attack Tree、Abuse Case、风险和缓解。
3. **依赖风险**：已知漏洞、恶意包、Typosquatting、Dependency Confusion、维护停滞、Transitive Dependency 和 Install Script。
4. **供应链控制**：Lockfile、Registry、Scope、Integrity、Provenance、签名、SBOM、构建隔离、最小 Token 和发布保护。
5. **Secret 管理**：前端无法保存真正秘密；Build Secret、Runtime Secret、扫描、轮换和泄漏响应。
6. **隐私工程**：数据最小化、Purpose、Retention、Consent、Cookie、Tracking、导出/删除、日志脱敏和跨境意识。
7. **第三方治理**：SDK、Tag Manager、广告/分析、SRI、Sandbox、CSP、数据处理协议、故障和退出。
8. **安全测试**：SAST、SCA、DAST、Secret Scan、Header Test、Dependency Review、Pentest 和修复验证。
9. **响应流程**：严重性、Owner、SLA、补丁、升级、灰度、回滚、通知和事后复盘。

**实践与证据**：为主线项目完成 Threat Model、SBOM、依赖策略、隐私数据地图和安全门禁；演练一次高危依赖响应。

**阶段门槛**：每个高风险项都有 Owner、缓解、验证和剩余风险；不能只输出扫描工具截图。

---

# 卷 24：可观测、SLO、故障治理、CI/CD 与云交付

## Stage 70：前端日志、错误、RUM、Trace 与可观测性

**目标**：能够从用户故障追踪到具体版本、页面、请求、服务和代码位置。

**模块**：

1. **可观测三支柱扩展**：Log、Metric、Trace、Profile、RUM、Session Replay 的职责和隐私边界。
2. **错误采集**：Global Error、Unhandled Rejection、Framework Error Boundary、Resource Error、Chunk Load 和 Network Error。
3. **Source Map 运维**：Release、Artifact、Upload、Mapping、隐藏源图、权限、保留和版本匹配。
4. **上下文模型**：User/Tenant/Session、Route、Version、Commit、Feature Flag、Device、Network、Trace ID 和 Breadcrumb。
5. **分布式 Trace**：前端 Span、Navigation、Fetch、BFF、后端服务；Trace Context、采样和跨域传播。
6. **业务指标**：登录、查询、提交、支付、播放、上传、AI 生成等成功率和时延。
7. **日志设计**：结构化、级别、事件名、Schema、敏感字段、采样、去重、聚合和成本。
8. **告警**：症状优先、阈值、异常检测、Release Regression、告警聚合、值班路由和 Runbook。
9. **隐私保护**：输入框、Token、URL Query、截图、Replay、用户同意、脱敏和数据保留。

**实践与证据**：建立前端错误和 RUM 仪表盘；打通一次 Browser—BFF—Service Trace；使用 Source Map 定位压缩代码错误；编写 Runbook。

**阶段门槛**：收到一条用户投诉后，能定位用户、时间、版本、路由、错误、请求和相关发布，而不是要求用户反复截图。

## Stage 71：SLO、错误预算、容量、故障演练与事故复盘

**目标**：以可靠性目标管理系统，而不是追求无法衡量的“绝不出错”。

**模块**：

1. **SLI/SLO/SLA**：可用性、成功率、延迟、正确性、新鲜度和关键用户旅程。
2. **错误预算**：窗口、燃烧率、发布节奏、暂停变更、例外和业务协商。
3. **故障模型**：API 慢/错、CDN 故障、Chunk 404、缓存污染、配置错误、第三方失效、浏览器崩溃和版本不兼容。
4. **韧性设计**：Timeout、Retry、Fallback、Cache、Circuit Breaker、Bulkhead、Queue、Read-only 和功能降级。
5. **容量与极限**：QPS、并发连接、消息 Fan-out、日志量、上传、带宽、内存、DOM 和第三方配额。
6. **故障演练**：Network Fault、Dependency Failure、Region Failure、Bad Release、Expired Certificate、Clock Skew 和配置回滚。
7. **事故响应**：Detect、Triage、Mitigate、Communicate、Recover、Verify；指挥角色和时间线。
8. **复盘**：无责、事实、影响、根因、促成因素、探测缺口、行动项、Owner、截止时间和验证。
9. **可靠性经济学**：冗余、性能、成本、复杂度和业务损失的取舍。

**实践与证据**：为三个关键旅程定义 SLO；运行一次 Chunk 失败或下游超时演练；完成事故时间线、复盘和改进验证。

**阶段门槛**：SLO 必须由真实用户旅程计算；行动项必须可验证，不能只写“加强测试、提高意识”。

## Stage 72：CI/CD、环境、容器、Kubernetes、灰度与回滚

**目标**：建立可重复、可审计、可快速恢复的前端交付系统。

**模块**：

1. **Pipeline**：Install、Lint、Typecheck、Test、Build、Scan、Package、Deploy、Verify 和 Promote。
2. **可重复构建**：Lockfile、固定运行时、缓存、Artifact、Provenance、环境隔离和不可变产物。
3. **环境策略**：Local、Preview、Test、Staging、Production；配置、数据、域名、认证和第三方差异。
4. **静态站/CDN 发布**：原子上传、HTML 与 Hash Asset 顺序、缓存、Purge、旧资源保留和回滚。
5. **容器**：Multi-stage Build、非 Root、最小镜像、Nginx/Node、Health、Signal 和静态资源配置。
6. **Kubernetes**：Deployment、Service、Ingress/Gateway、Config、Secret、Probe、Resource、Autoscaling 和滚动更新。
7. **发布策略**：Blue/Green、Canary、Percentage、Tenant/User Cohort、Feature Flag、Dark Launch 和 Shadow。
8. **验证与回滚**：Smoke、Synthetic、RUM Guard、自动回滚、数据库/API 兼容和 Roll-forward。
9. **变更安全**：审批、职责分离、冻结、紧急发布、Audit、Release Note 和通知。
10. **灾难恢复**：区域、DNS、CDN、证书、域名、Artifact、配置备份和恢复演练。

**实践与证据**：建设从 PR Preview 到生产灰度的流水线；部署静态前端和 SSR 服务；演示错误版本自动发现与回滚。

**阶段门槛**：任一生产版本都能追溯 Commit、依赖、构建、审批和配置；回滚无需临时重新构建。

---

# 卷 25：应用架构、DDD、微前端、插件与多租户

## Stage 73：领域建模、模块化单体与前端应用架构

**目标**：建立围绕业务变化的边界，而不是只按文件类型划分目录。

**模块**：

1. **架构驱动力**：业务目标、质量属性、团队边界、发布、合规、性能、成本和演进速度。
2. **领域建模**：Domain、Subdomain、Bounded Context、Ubiquitous Language、Entity、Value Object、Policy 和 Domain Event。
3. **前端领域对象**：API DTO、Domain Model、ViewModel、Form Model、Cache Model 和序列化边界。
4. **模块化单体**：Feature/Domain/Shared/Infrastructure、依赖方向、Public API、Anti-corruption Layer 和循环治理。
5. **分层与端口适配器**：UI、Application、Domain、Infrastructure；Port、Adapter、Dependency Inversion 和测试替换。
6. **状态机与工作流**：State、Event、Guard、Action、Effect、Parallel/Hierarchical State 和可视化。
7. **CQRS/事件驱动直觉**：Command、Query、Read Model、Event、Optimistic UI 和前端适用边界。
8. **跨切能力**：Auth、Permission、Error、I18n、Telemetry、Feature Flag、Config 和 Dependency Injection。
9. **架构验证**：Import Rule、Contract、Fitness Function、Architecture Test 和依赖可视化。

**实践与证据**：为主线项目完成 Event Storming/领域词汇；拆分 3 个 Bounded Context；建立模块 API 和自动依赖检查；提交 ADR。

**阶段门槛**：目录结构必须能解释业务边界和变化方向；不能用“Clean Architecture”名称掩盖不必要层级。

## Stage 74：微前端、独立交付与跨应用协作

**目标**：在确有组织和交付需求时设计微前端，并控制其运行与治理成本。

**模块**：

1. **采用条件**：团队自治、发布解耦、技术栈迁移、业务边界；不应采用的规模和场景。
2. **集成方式**：Build-time Package、Runtime Module Federation、Web Components、Iframe、Route Composition 和 Server Composition。
3. **Shell 职责**：导航、身份、权限、布局、配置、遥测、错误、资源加载和版本协商。
4. **跨应用通信**：URL、Event、Shared Service、Message Bus、Contract、Schema Version 和避免隐式全局状态。
5. **依赖共享**：Singleton、版本冲突、React/Vue Runtime、Design System、Chunk、缓存和升级。
6. **路由与样式**：Base Path、History、Deep Link、Scroll、CSS Isolation、Token、Portal 和 Overlay。
7. **部署与故障**：Remote Manifest、缓存、超时、Fallback、Kill Switch、独立回滚和部分不可用。
8. **安全**：信任级别、Iframe Sandbox、Remote Code、CSP、供应链、租户和权限。
9. **治理**：Contract Test、版本矩阵、Owner、SLO、兼容窗口、平台支持和成本度量。

**实践与证据**：以 React Shell、Vue 子应用和 Web Component 共享模块实现原型；模拟 Remote 失败和版本冲突；提交采用/不采用决策。

**阶段门槛**：必须证明微前端解决的组织问题大于新增的运行、性能、测试和治理复杂度。

## Stage 75：插件系统、多租户、白标与动态能力

**目标**：设计可扩展产品，而不是让每个客户需求都 Fork 一套代码。

**模块**：

1. **扩展点**：Route、Menu、Page、Widget、Command、Toolbar、Data Source、Renderer、Validator 和 Hook。
2. **插件生命周期**：Discover、Load、Validate、Activate、Deactivate、Update、Rollback 和 Uninstall。
3. **插件契约**：Manifest、Capability、Permission、API Version、Dependency、Compatibility 和 Feature Detection。
4. **运行隔离**：Same Realm、Worker、Iframe、Sandbox、Resource Quota、Timeout 和 Crash Containment。
5. **多租户模型**：Tenant Context、Domain、Theme、Locale、Feature、Data、Permission、Quota 和 Region。
6. **白标体系**：Brand Token、Asset、Content、Domain、Email、SEO、Legal 和 Runtime Configuration。
7. **配置治理**：Schema、Default、Override、Inheritance、Validation、Rollout、Audit、Secret 和 Emergency Disable。
8. **市场与供应链**：签名、审核、来源、版本、计费、权限说明、数据访问和撤回。
9. **测试矩阵**：插件×宿主版本、租户×主题×Locale、权限、升级、降级和不兼容。

**实践与证据**：实现一个带 Manifest、权限、版本和隔离的插件 SDK；支持至少 3 个租户主题和功能差异；演示插件故障不拖垮宿主。

**阶段门槛**：扩展能力有最小权限、版本协商、资源限制、审计和退出机制。

---

# 卷 26：前端平台、源码研究、迁移与架构治理

## Stage 76：内部前端平台与开发者门户

**目标**：把脚手架、组件、质量、发布和可观测能力产品化，服务多个团队。

**模块**：

1. **平台用户与需求**：新项目、存量接入、组件使用、发布、排障、升级和合规。
2. **平台能力地图**：Template、CLI、Monorepo、Design System、Testing、Observability、CI/CD、Security 和 Documentation。
3. **Golden Path**：默认技术栈、目录、依赖、日志、监控、测试、部署和安全配置。
4. **开发者门户**：服务目录、Owner、文档、依赖、构建、环境、指标、SLO、Runbook 和自助操作。
5. **自助与权限**：创建项目、申请资源、Preview、发布、回滚、密钥、审计和审批。
6. **平台 API/插件**：可扩展能力、Provider、模板版本、向后兼容和生态贡献。
7. **可靠性**：平台自身 SLO、版本、降级、回滚、支持、迁移和灾难恢复。
8. **采用与度量**：Activation、Adoption、Coverage、Upgrade、Lead Time、Failure Rate、Support Ticket 和满意度。
9. **平台团队模式**：产品经理、设计、平台工程、支持、文档、Champion 和贡献者模型。

**实践与证据**：建立前端开发者门户原型；接入两个不同项目；展示从创建到发布、监控、回滚的一条自助路径；记录采用指标。

**阶段门槛**：平台不是共享仓库合集，必须有用户、产品路线、服务等级、迁移和运营机制。

## Stage 77：框架、编译器、构建器与浏览器源码研究

**目标**：形成可迁移的源码阅读和验证能力，而不是背某一版调用栈。

**模块**：

1. **研究方法**：先外部行为、再假设、最小复现、断点、关键对象、调用图、测试和结论。
2. **React 方向**：Element、Fiber、Lane、Update Queue、Reconciliation、Commit、Hook、Suspense、Server Boundary。
3. **Vue 方向**：Reactive Effect、Dep、Scheduler、VNode、Renderer、Compiler、Patch Flag 和 Hydration。
4. **构建方向**：Module Graph、Resolver、Parser、Transform、Chunk、Tree Shaking、HMR 和 Plugin Hook。
5. **TypeScript 方向**：Scanner、Parser、Binder、Checker、Program、Language Service、Incremental 和 Declaration Emit。
6. **路由/状态库**：Match、History、Subscription、Selector、Cache、Invalidation 和 Middleware。
7. **浏览器方向**：HTML/CSS 解析、DOM、Layout、Paint、Compositor、Event Loop 和 DevTools Protocol 的高层路径。
8. **Benchmark 与正确性**：源码改动前后测试、性能、兼容、回归和不变量。
9. **贡献流程**：Issue、Reproduction、Test、Patch、Review、Release Note 和上游沟通。

**实践与证据**：选择两个项目完成源码 Debug 报告；修复一个文档、测试或小问题并尝试上游贡献；画出行为到源码对象的映射。

**阶段门槛**：报告必须包含版本、Commit、复现、断点位置、对象快照和可运行实验，不能只转载源码解析文章。

## Stage 78：历史系统迁移、技术债与架构治理

**目标**：安全演进真实存量系统，而不是只设计理想新项目。

**模块**：

1. **系统盘点**：业务价值、流量、Owner、依赖、版本、构建、测试、部署、事故、漏洞和成本。
2. **技术债分类**：Intentional/Accidental、Code、Architecture、Dependency、Test、Data、Operational 和 Knowledge Debt。
3. **迁移策略**：Big Bang、Strangler、Branch by Abstraction、Route/Feature、Dual Run、Shadow、Adapter 和 Compatibility Layer。
4. **框架与构建迁移**：jQuery/AngularJS/Vue2/Class React、Webpack 旧版、CJS、旧 Node、CSS 全局和历史浏览器。
5. **数据与契约迁移**：API、Schema、缓存、Storage、URL、Session、Telemetry 和用户偏好兼容。
6. **自动化迁移**：Codemod、Lint Rule、API Report、Visual Regression、Diff、批量 PR 和进度仪表盘。
7. **风险控制**：Feature Flag、Cohort、Canary、Rollback、Freeze、Parallel Run 和业务验收。
8. **治理机制**：RFC、ADR、Architecture Review、Fitness Function、Dependency Policy、Exception 和到期复审。
9. **价值度量**：缺陷、交付时间、构建、性能、安全、招聘、维护成本和机会成本。

**实践与证据**：为一个假想或真实旧系统编写 6～12 个月迁移路线；完成一个垂直切片迁移；用指标证明价值。

**阶段门槛**：迁移计划必须能持续交付业务，并包含停止条件、回滚、预算、Owner 和验收。

---

# 卷 27：Staff/Principal 领导力、产品、业务与组织影响

## Stage 79：技术战略、RFC、ADR 与跨团队影响

**目标**：通过清晰决策和协作影响多个团队，而不是依赖职位命令。

**模块**：

1. **问题定义**：业务背景、用户、约束、现状、非目标、成功指标和决策期限。
2. **架构文档**：RFC、ADR、C4、时序、数据流、部署图、威胁模型、容量和故障模型。
3. **方案比较**：选项、证据、Trade-off、短期/长期成本、可逆性、退出和未知项。
4. **决策机制**：Stakeholder、Driver、Approver、Consulted、Informed、异议记录和 Timebox。
5. **技术战略**：North Star、原则、目标架构、过渡架构、能力路线、投资组合和里程碑。
6. **跨团队推动**：Pilot、Champion、Office Hour、Migration Support、Adoption、Feedback 和冲突解决。
7. **风险沟通**：概率、影响、触发条件、缓解、残余风险和管理层语言。
8. **决策复盘**：假设是否成立、指标、意外成本、撤销/调整和知识沉淀。

**实践与证据**：完成一个组织级 RFC；主持评审；记录反对意见和决策；实施 Pilot 并根据数据修订。

**阶段门槛**：文档能让不参与会议的人理解为什么做、如何做、谁负责、何时停止和如何判断成功。

## Stage 80：团队建设、招聘、辅导、评审与事故领导

**目标**：提高整个组织的技术能力，而不是成为唯一能解决问题的人。

**模块**：

1. **能力模型**：Junior、Mid、Senior、Staff、Principal 的交付、判断、影响和范围差异。
2. **招聘设计**：岗位真实工作、题目、评分 Rubric、偏差控制、候选人体验和面试校准。
3. **辅导与成长**：目标、Stretch Project、反馈、1:1、Pairing、Design Review、Delegation 和 Sponsorship。
4. **代码与设计评审**：正确性、可维护性、性能、安全、测试、架构、沟通和优先级。
5. **知识系统**：文档、示例、Playbook、内训、社区、技术雷达和决策记录。
6. **所有权**：Code Owner、On-call、SLO、Runbook、Bus Factor、交接和轮岗。
7. **事故领导**：指挥、技术排查、信息同步、决策日志、客户沟通和恢复优先级。
8. **健康工程文化**：无责复盘、心理安全、可持续值班、反英雄主义和质量责任。
9. **冲突处理**：技术争议、团队边界、资源竞争、优先级和基于事实的升级路径。

**实践与证据**：设计前端职级矩阵和面试 Rubric；辅导一个阶段项目；主持一次架构评审和一次事故演练。

**阶段门槛**：个人休假时系统和团队仍能运转；关键知识和权限不集中在单个人。

## Stage 81：产品、业务、数据、成本与组合管理

**目标**：把技术工作连接到用户价值、收入、风险和长期经营。

**模块**：

1. **产品发现**：用户问题、场景、Journey、假设、Prototype、研究、可用性和需求证据。
2. **业务模型**：收入、成本、转化、留存、活跃、SLA、合规和品牌风险。
3. **数据与实验**：North Star、Funnel、Cohort、Experiment、Guardrail、Exposure、统计显著和灰度解释。
4. **SEO 与增长**：抓取、索引、渲染、结构化数据、性能、内容、国际化和迁移风险。
5. **Build vs Buy**：战略差异化、总成本、集成、数据、SLA、锁定、退出和供应商健康。
6. **成本工程**：CDN、Edge、SSR、日志、图片、测试、第三方、开发时间和支持成本。
7. **路线与组合**：P0/P1/P2/Later、Dependency、Risk、Capacity、Milestone、Kill Criteria 和机会成本。
8. **合规与伦理**：可访问性、隐私、版权、暗黑模式、算法透明、儿童/敏感用户和全球化。
9. **高层沟通**：一页纸、决策摘要、预算、风险、时间、指标和非技术语言。

**实践与证据**：为一个平台能力制作商业案例；定义成功指标和成本模型；提出 Build/Buy 建议；进行季度路线评审。

**阶段门槛**：技术方案必须说明用户和业务结果；“更先进”不能独立成为投资理由。

---

# 卷 28：AI 辅助研发、AI 原生前端与终极 Capstone

## Stage 82：AI 辅助开发、上下文工程、MCP 与研发自动化

**目标**：把 AI 从聊天工具升级为可控制、可验证的工程能力。

**模块**：

1. **模型能力边界**：生成、解释、重构、测试、检索、规划、工具调用；幻觉、上下文、非确定性和知识时效。
2. **上下文工程**：任务、约束、仓库规则、相关文件、示例、接口、验收、负面要求和最小充分上下文。
3. **Spec-driven Development**：PRD、Technical Spec、Task、Acceptance、Test、Implementation、Review 和 Traceability。
4. **Coding Agent 工作流**：读仓库、计划、修改、运行、测试、Diff Review、回滚和提交边界。
5. **MCP 与工具**：文件、GitHub、浏览器、数据库、设计、日志等工具的权限、Schema、结果和审计。
6. **浏览器自动化**：Playwright/MCP、Accessibility Snapshot、操作、截图、E2E 生成和失败诊断。
7. **多 Agent/工作流**：Planner、Implementer、Reviewer、Tester、Security、Documentation 的职责与防止互相放大错误。
8. **评估**：任务集、Golden Answer、Unit/E2E、Diff Quality、Security、Latency、Cost、Regression 和人工评分。
9. **安全控制**：最小权限、Secret、命令批准、文件范围、网络、Prompt Injection、供应链和生成代码许可证。
10. **团队落地**：规则文件、模板、Review Gate、可观测、失败样本库、成本预算和培训。

**实践与证据**：建立从需求到 PR 的 AI 辅助流程；让 Agent 完成受限任务；记录提示、工具、Diff、测试、人工修改和失败原因。

**阶段门槛**：AI 产出必须经过测试和 Review；不能以“模型说已完成”作为验收证据。

## Stage 83：AI 原生界面、流式交互、Agent UX 与安全评估

**目标**：设计真正适合 LLM/Agent 的前端，而不是在页面上加一个聊天框。

**模块**：

1. **交互模型**：Chat、Command、Copilot、Inline Suggestion、Workflow、Autonomous Agent 和 Human-in-the-loop。
2. **流式协议**：Token、Message、Tool Call、Tool Result、Reasoning Summary、Artifact、Usage、Error、Retry 和 Resume。
3. **状态机**：Idle、Submitting、Streaming、Calling Tool、Awaiting Approval、Paused、Completed、Failed、Cancelled。
4. **消息与产物**：Text、Markdown、Code、Table、Chart、File、Diff、Citation、Form、Preview 和可编辑 Artifact。
5. **工具可视化**：正在做什么、参数摘要、权限、进度、结果、失败、重试、撤销和审计。
6. **人类控制**：Stop、Approve、Reject、Edit、Retry、Branch、Checkpoint、Undo 和最终确认。
7. **RAG 与引用体验**：来源、片段、时效、权限、冲突、不确定性和引用跳转。
8. **多模态**：图片、文档、音频、视频、屏幕和摄像头输入的上传、预览、隐私和降级。
9. **安全**：Prompt Injection、Tool Injection、数据外泄、模型输出 XSS、Markdown/HTML Sanitization、权限提升和不可信附件。
10. **评估与观测**：Task Success、Groundedness、Tool Success、Approval Rate、Latency、First Token、Cost、Abandonment 和 Safety Incident。
11. **无障碍与国际化**：流式播报、焦点、Reduced Motion、长内容导航、代码可读、语言和方向。
12. **成本与容量**：上下文长度、缓存、并发、取消、模型路由、降级、配额和预算。

**实践与证据**：构建带 SSE/流式消息、工具调用、审批、停止、恢复、引用和产物预览的 Agent 工作台；完成安全和可访问性测试。

**阶段门槛**：工具调用和高风险操作对用户透明且可控制；模型输出经过安全渲染；失败和不确定性不会被伪装成成功。

## Stage 84：Principal 级终极项目、架构答辩与公开影响

**目标**：综合证明自己能长期负责复杂前端产品、平台和组织演进。

**终极 Capstone 必须包含**：

1. **真实业务**：明确用户、问题、价值、非目标、成功指标和约束。
2. **多产品形态**：官网/文档、企业 Web、React/Vue、SSR/BFF、桌面或移动中的至少一种。
3. **平台能力**：Monorepo、组件/Token、SDK、脚手架、质量门禁、开发者门户或插件平台。
4. **复杂数据**：权限、多租户、实时、离线、上传、搜索、可视化或协作中的至少三项。
5. **质量属性**：性能、安全、隐私、可访问性、国际化、可靠性和成本均有目标与证据。
6. **生产交付**：CI/CD、Preview、灰度、Feature Flag、监控、SLO、告警、回滚和 Runbook。
7. **架构材料**：Context/Container/Component 图、时序图、数据流、部署图、Threat Model、Capacity、Failure Model。
8. **决策记录**：至少 10 份 ADR、2 份完整 RFC、一份 Build/Buy、一份迁移或退出方案。
9. **故障演练**：依赖故障、错误发布、缓存问题、网络异常或安全事件中的至少三种。
10. **AI 能力**：AI 辅助研发流程或 AI 原生用户功能，包含评估、安全和成本。
11. **组织视角**：Owner、贡献流程、支持、升级、废弃、路线、预算和采用指标。
12. **公开影响**：技术文章、演讲、开源贡献、课程、内部平台采纳或跨团队迁移中的至少一种。

**架构答辩问题**：

- 为什么采用当前架构，而不是更简单或更复杂的方案？
- 哪三个假设最可能错误？如何尽早验证？
- 系统在什么规模、依赖故障或组织变化下首先失效？
- 如何在不中断业务的情况下迁移？
- 如何回滚？数据和协议是否向后兼容？
- 哪些部分是核心差异化，哪些应购买或复用？
- 性能、安全、稳定性和成本的证据在哪里？
- 如果团队扩大三倍或缩小一半，架构如何变化？
- AI 生成或 Agent 操作如何验证、授权、审计和撤销？
- 三年后哪些技术可以替换，哪些契约必须保持稳定？

**最终门槛**：不是功能数量最多，而是在复杂约束下仍能用证据解释设计、可靠交付、持续演进并带动其他工程师。

---

# 本分册综合验收

完成卷 22～28 后，必须提交：

1. 性能 Lab/RUM 基线、预算、容量模型和回归门禁。
2. Threat Model、CSP/Trusted Types、供应链与隐私治理证据。
3. 前端可观测仪表盘、SLO、告警、故障演练、Runbook 和复盘。
4. 模块化架构、微前端或插件/多租户平台中的至少两个完整实践。
5. 内部前端平台原型与采用度量。
6. 框架、编译器或构建工具源码研究报告与一次上游贡献尝试。
7. 存量系统迁移 RFC、自动化迁移工具和阶段验证。
8. Staff/Principal 级技术战略、团队能力或平台商业案例。
9. AI 辅助研发流程和 AI 原生前端项目。
10. Stage 84 终极 Capstone 与正式架构答辩记录。

达到这里的学习者，才算完成了“从零基础到极其资深前端架构师”的完整能力闭环。