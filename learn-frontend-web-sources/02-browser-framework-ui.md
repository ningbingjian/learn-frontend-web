# 卷 10～15：浏览器、网络、React、Vue、应用与 UI 工程

> 覆盖 Stage 28～45。  
> 目标：从“会写代码”升级为理解浏览器和网络、能够使用 React 与 Vue 构建企业级应用的现代前端工程师。

---

# 卷 10：浏览器渲染、生命周期与 Web API

## Stage 28：HTML/CSS 解析与渲染流水线

**目标**：用浏览器真实工作过程解释页面显示、卡顿、闪烁和布局问题。

**模块**：

1. **导航到文档**：导航请求、响应、流式字节、字符解码、Preload Scanner 和增量解析。
2. **HTML 解析**：Tokenizer、Tree Builder、DOM 构建、错误恢复、Parser-blocking Script、`defer`、`async` 和 Module Script。
3. **CSS 解析**：CSSOM、选择器匹配、继承、Computed Style、样式失效和重新计算。
4. **渲染树与布局**：Box Tree、Formatting Context、Containing Block、Intrinsic Size、Layout 和 Fragment。
5. **绘制与合成**：Paint Record、Layer、Raster、Composite、GPU 加速的真实边界和层爆炸风险。
6. **更新成本**：Style、Layout、Paint、Composite；Forced Synchronous Layout、Layout Thrashing 和批量读写。
7. **观察工具**：Performance Trace、Rendering 面板、Paint Flashing、Layer Border、Layout Shift 和 Performance Insights。

**实践与证据**：记录从导航到首屏的 Trace；比较阻塞脚本、defer、async 和 module；制造强制布局与布局抖动；使用批量读写和 `requestAnimationFrame` 修复。

**阶段门槛**：任何“页面慢”结论必须指出时间花在网络、脚本、样式、布局、绘制还是合成，并给出 Trace 证据。

## Stage 29：事件、输入、导航与页面生命周期

**目标**：正确处理用户输入、浏览器导航、焦点和页面恢复。

**模块**：

1. **事件分发深层模型**：Event Path、Shadow DOM Retargeting、Composed、Trusted Event、默认动作和取消时机。
2. **输入事件**：Keyboard、Pointer、Mouse、Touch、Wheel、Input、BeforeInput、Composition；触控与输入法边界。
3. **焦点与选择**：Active Element、Tab Order、Focus/Blur、Selection、Caret、焦点恢复和弹层焦点管理。
4. **导航与历史**：Location、History API、Navigation API、同文档导航、跨文档导航、滚动恢复和路由拦截。
5. **页面生命周期**：DOMContentLoaded、Load、Visibility、Pagehide/Pageshow、Freeze/Resume、Unload 限制和 BFCache。
6. **调度能力**：Timer、Animation Frame、Idle Callback、Scheduler、Observer 类 API 和主线程协作。
7. **观察者 API**：MutationObserver、IntersectionObserver、ResizeObserver、PerformanceObserver 的职责与回调时机。

**实践与证据**：实现键盘可用的 Dialog；完成支持前进后退和滚动恢复的原生路由；验证 BFCache 命中与失败原因；处理中文输入法搜索；比较 Observer 与轮询。

**阶段门槛**：不能通过滥用 `beforeunload`、全局阻止默认事件或持续轮询解决生命周期问题。

## Stage 30：存储、Worker、离线与设备能力

**目标**：合理使用浏览器能力，并理解线程、权限、容量和隐私边界。

**模块**：

1. **存储选型**：Cookie、LocalStorage、SessionStorage、IndexedDB、Cache Storage、OPFS 的数据模型、同步/异步、容量和生命周期。
2. **数据版本与迁移**：Schema Version、Migration、事务、损坏恢复、过期、清理和多标签一致性。
3. **Worker 家族**：Dedicated Worker、Shared Worker、Service Worker、Worklet；消息传递、Structured Clone 和 Transferable。
4. **离线模型**：App Shell、Precache、Runtime Cache、Network First、Cache First、Stale While Revalidate、Background Sync 和离线队列。
5. **跨上下文协调**：BroadcastChannel、MessageChannel、Web Locks、Storage Event 和 Leader Election。
6. **用户与设备 API**：Clipboard、File、File System Access、Drag and Drop、Notification、Permissions、Geolocation、Screen、Share。
7. **高性能能力**：Streams、SharedArrayBuffer、Atomics、WebAssembly 的使用边界；COOP/COEP 初识。
8. **隐私和兼容**：权限请求时机、指纹风险、第三方上下文限制、Private Mode 和渐进增强。

**实践与证据**：实现 IndexedDB 数据库与迁移；将计算任务移动到 Worker；构建可离线读取和稍后同步的页面；实现多标签协调；记录权限拒绝和不支持时的降级路径。

**阶段门槛**：每个 Web API 都必须说明支持范围、权限、数据生命周期、失败处理和替代方案。

---

# 卷 11：网络、API、实时通信与数据韧性

## Stage 31：HTTP/2、HTTP/3、缓存与 CDN

**目标**：理解生产环境中的多级网络和缓存，而不是只会“清浏览器缓存”。

**模块**：

1. **HTTP/1.1 深入**：持久连接、队头阻塞、连接并发、Chunked、Range、压缩和代理语义。
2. **HTTP/2**：二进制分帧、多路复用、Stream、Header Compression、Priority 的现实限制和连接级阻塞。
3. **HTTP/3 与 QUIC**：UDP 上的可靠传输、连接迁移、0-RTT 风险和部署观察。
4. **缓存语义**：Freshness、Validation、ETag、Last-Modified、Vary、Immutable、No-cache、No-store 和私有/共享缓存。
5. **CDN**：Edge、Origin、Cache Key、Purge、Stale、Shield、回源、负缓存和多层缓存一致性。
6. **资源提示**：Preload、Modulepreload、Prefetch、Preconnect、DNS Prefetch、Priority Hints 和错误预加载成本。
7. **内容优化**：Brotli/Gzip、图片格式、字体子集、Range、流式响应和静态资源指纹。
8. **诊断**：Server Timing、Age、Via、Cache Status、Timing-Allow-Origin、HAR 和跨区域对比。

**实践与证据**：搭建浏览器缓存与反向代理缓存实验；验证 200/304/缓存命中；设计带 Hash 的静态资源策略；模拟错误 Cache Key 导致的租户数据串扰。

**阶段门槛**：能画出 Browser—CDN—Gateway—Origin 的缓存链，并说明失效、回源、更新和故障策略。

## Stage 32：API 契约、错误模型与前端数据层

**目标**：让接口调用形成稳定的数据产品，而不是在组件里散落 Fetch。

**模块**：

1. **REST 资源建模**：Resource、Collection、Subresource、Method、Status、Representation 和 Hypermedia 的适用边界。
2. **查询与分页**：Filter、Sort、Search、Offset/Cursor Pagination、Total、Snapshot Consistency 和重复/遗漏处理。
3. **写操作**：Idempotency Key、Optimistic Concurrency、Version、ETag、批量操作、部分成功和补偿。
4. **错误契约**：机器错误码、用户消息、字段错误、Trace ID、Retryable、权限错误、限流和降级信息。
5. **Schema 与契约**：OpenAPI、JSON Schema、GraphQL Schema、Codegen、Mock、Contract Test 和兼容演进。
6. **客户端数据层**：Transport、Serializer、Auth、Retry、Cache、Repository、Query Key、Normalization 和 Invalidation。
7. **GraphQL**：Query/Mutation/Subscription、Fragment、N+1、缓存、Persisted Query、复杂度和 Schema 演进。
8. **RPC 风格**：gRPC-Web、Connect、tRPC 等端到端类型方案的收益、耦合和边界。

**实践与证据**：设计订单或任务 API；生成类型安全客户端；实现统一错误对象、重试和 Trace ID；分别用 REST 与 GraphQL 完成同一查询并写 Trade-off。

**阶段门槛**：UI 组件不直接理解底层协议细节；接口升级有兼容策略；错误能被用户、前端、后端和运维共同定位。

## Stage 33：流式、实时、上传、同步与网络韧性

**目标**：在弱网、断网、重复连接和大数据传输下保持可预测行为。

**模块**：

1. **通信模式**：Polling、Long Polling、SSE、WebSocket、WebRTC Data Channel、WebTransport 的方向性、代理兼容和成本。
2. **连接生命周期**：握手、心跳、重连、退避、鉴权续期、网络切换、后台暂停和连接风暴。
3. **消息协议**：Envelope、Type、Version、Sequence、Ack、Deduplication、Ordering、Replay 和 Schema 演进。
4. **流式数据**：ReadableStream、WritableStream、TransformStream、Backpressure、分块解析和增量 UI。
5. **文件上传**：Multipart、直传对象存储、Signed URL、分片、断点续传、校验、秒传、取消和并发控制。
6. **离线写入**：Outbox、Operation Log、重试队列、幂等、冲突、Last-write-wins、人工合并和 CRDT/OT 初识。
7. **韧性模式**：Timeout、Retry Budget、Circuit Breaker、Bulkhead、Fallback、缓存兜底和用户可恢复操作。
8. **弱网测试**：Latency、Bandwidth、Packet Loss、Offline、Server Error、乱序和重复消息。

**实践与证据**：实现实时通知和断线重连；实现流式日志或 AI 文本显示；实现分片上传；在网络限速和断网条件下验证重试、去重和恢复。

**阶段门槛**：重复消息不会导致重复副作用；断线恢复不会制造请求风暴；用户知道当前数据是实时、缓存、待同步还是失败。

---

# 卷 12：React 从基础到并发、服务端与源码

## Stage 34：React 启动链路、组件与声明式 UI

**目标**：从 `index.html` 到组件树逐步建立 React 心智模型。

**模块**：

1. **项目启动链路**：HTML 容器、入口模块、`createRoot`、Root、`render`、App Component、React Tree 与 DOM Tree。
2. **JSX**：语法转换、Expression、Attribute、Children、Fragment、Element Object 和组件调用与普通函数调用的区别。
3. **组件**：Function Component、Props、纯渲染、组合、Children、命名、文件边界和组件身份。
4. **条件与列表**：条件渲染、Key、稳定身份、重排、插入和错误 Key 导致的状态错位。
5. **事件**：Synthetic Event、高层事件系统、参数传递、事件处理器和渲染期间副作用禁令。
6. **样式与资源**：CSS Modules、普通 CSS、Utility、图片、字体和组件样式边界。
7. **开发模式**：Strict Mode、开发期重复调用的目的、React DevTools 和组件树观察。

**实践与证据**：从空目录建立 React 项目；逐步走完启动链路；实现产品列表；故意使用错误 Key 并观察状态错位；对照 React Tree 和 DOM Tree。

**阶段门槛**：能解释 `<App />`、`App()`、Element、Component、Instance、Render 和 DOM Node 之间的区别。

## Stage 35：State、Render、Effect、Ref 与复杂交互

**目标**：正确处理状态和外部系统同步，避免“到处 useEffect”。

**模块**：

1. **Render Snapshot**：一次 Render 看到固定 Props/State；事件处理器闭包；旧值和批处理现象。
2. **State Queue**：Set State、Updater Function、批处理、相同值、对象不可变更新和状态保留位置。
3. **状态建模**：最小状态、派生值、冗余状态、Lift State、Reducer、Context 和状态机。
4. **Effect 模型**：Render 与 Commit；Effect 只用于外部同步；Dependency、Cleanup、竞态、取消和 Strict Mode 验证。
5. **Ref**：DOM Ref、可变容器、Imperative Handle、焦点/测量和不触发 Render 的状态。
6. **表单**：Controlled/Uncontrolled、Validation、Dynamic Field、提交状态、服务器错误和可访问性。
7. **Context**：Provider、消费范围、更新传播、拆分、Selector 思路和滥用全局 Context 的成本。
8. **Escape Hatch**：Portal、Error Boundary、External Store、Layout Effect 和何时不应使用。

**实践与证据**：实现复杂表单和购物车；复现 stale closure、Effect race 和重复订阅；使用 Cleanup/Abort 修复；用 Profiler 观察 Context 扩散。

**阶段门槛**：每个 Effect 必须说明同步的外部系统；能删除不必要 Effect；状态结构能排除不可能组合。

## Stage 36：并发、Suspense、Actions、服务端 React 与源码模型

**目标**：理解现代 React 的调度、异步 UI 和服务端边界。

**模块**：

1. **优先级与并发直觉**：Urgent/Non-urgent Update、Interruptible Render、Transition、Deferred Value 和用户输入响应。
2. **Suspense**：Boundary、Fallback、Reveal、Nested Boundary、Streaming、资源读取与错误边界协作。
3. **Actions 与乐观交互**：表单 Action、Pending、Optimistic、错误回滚、重复提交和服务端校验。
4. **缓存与资源**：请求去重、Cache 生命周期、服务端/客户端资源边界、External Store 和一致性。
5. **SSR 与 Hydration**：Server Render、HTML、Hydrate、Mismatch、事件接管、Streaming SSR 和选择性显示。
6. **Server Components / Server Functions**：模块环境、序列化边界、Client Boundary、数据访问、安全、Bundle 影响和部署约束。
7. **现代交互能力**：Activity/隐藏状态保留、Effect Event、View Transition 集成等按当前稳定版学习。
8. **源码模型**：Element、Fiber、Update Queue、Lane、Render Phase、Commit Phase、Reconciliation、Hook 链表和调度；先行为实验后断点。
9. **React Compiler 与自动优化**：纯性约束、静态分析、Memoization、逃逸情况和迁移验证。

**实践与证据**：构建带 Suspense、Transition、乐观更新和流式 SSR 的页面；制造 Hydration Mismatch；调试一次 State Update 从事件到 Commit；写出手工优化与编译器优化的对比报告。

**阶段门槛**：能用 Profiler、Performance Track 或源码断点解释一次更新，而不是只背“虚拟 DOM Diff”。

---

# 卷 13：Vue 从基础到响应式、SSR 与源码

## Stage 37：Vue 应用启动、模板与组件基础

**目标**：建立 Vue Application、Component Instance、Template 和 DOM 的关系。

**模块**：

1. **启动链路**：HTML 容器、`createApp`、Application Instance、Root Component、Mount 和插件安装。
2. **SFC**：`template`、`script setup`、`style`；编译前后、Scope Style 和模块边界。
3. **模板语法**：Interpolation、Attribute Binding、Event、Conditional、List、Key、Class/Style Binding。
4. **响应式基础**：`ref`、`reactive`、自动解包、Computed 和模板更新。
5. **组件通信**：Props、Emit、Model、Slots、Fallthrough Attribute 和组件注册。
6. **生命周期**：Setup、Mount、Update、Unmount、Template Ref 和 DOM 可用时机。
7. **开发工具**：Vue Devtools、组件树、Pinia、事件和性能观察。

**实践与证据**：从空目录建立 Vue 应用；实现相同产品列表；观察 Ref/Reactive 更新；比较 Vue Template 与 React JSX 的差异。

**阶段门槛**：能解释 SFC 如何被编译、组件实例如何保存状态、响应式变化如何触发更新。

## Stage 38：Composition API、响应式边界与企业应用

**目标**：使用 Vue 构建可维护的复杂状态和交互。

**模块**：

1. **Composition API**：Composable、参数、返回值、Effect Scope、生命周期组合和逻辑复用。
2. **响应式细节**：Ref vs Reactive、Shallow、Readonly、ToRef、ToRefs、Unwrap、Identity 和解构丢失响应式。
3. **Computed 与 Watch**：缓存、依赖、Flush Timing、Cleanup、Deep Watch、WatchEffect 和错误滥用。
4. **依赖注入**：Provide/Inject、Symbol Key、默认值、只读边界和跨层通信。
5. **应用状态**：Pinia Store、State、Getter、Action、插件、持久化、SSR 和模块拆分。
6. **路由**：Vue Router、Nested Route、Dynamic Route、Guard、Lazy Loading、Scroll、Data Fetch 和权限。
7. **高级内置能力**：Teleport、Suspense、KeepAlive、Transition、Async Component 和 Error Capture。
8. **表单与请求**：Model Modifier、Schema Validation、异步校验、服务端状态、缓存和乐观更新。

**实践与证据**：实现企业后台模块；复现解构丢失响应式、深度监听开销和错误 Watch；使用 Composable/Pinia/Router 重构。

**阶段门槛**：Composable 不依赖隐式全局状态；Store 边界明确；Watch 只用于副作用而不是替代 Computed。

## Stage 39：Vue 编译、响应式源码、SSR 与 Nuxt 连接

**目标**：从外部行为深入 Vue Renderer、Reactivity 和服务端渲染。

**模块**：

1. **响应式源码模型**：Proxy、Track、Trigger、Dep、Effect、Scheduler、Batch 和 Cleanup。
2. **渲染器**：VNode、Patch、Component Update、Keyed Diff、Block Tree、Patch Flag 和静态提升。
3. **模板编译**：Parse、AST、Transform、Codegen、Render Function 和编译时优化。
4. **调度队列**：Pre/Post Flush、Next Tick、Job Deduplication 和更新顺序。
5. **SSR/Hydration**：Server Render、Client Hydrate、Mismatch、Streaming、Async Data 和状态序列化。
6. **Nuxt 连接点**：File Routing、Auto Import、Server Route、Plugin、Middleware、Payload、Data Fetch 和部署适配器。
7. **源码调试方法**：最小复现、源码映射、断点、关键对象快照和外部行为对照。

**实践与证据**：手写最小响应式系统；调试一次 Ref 变化到 DOM Patch；查看模板编译结果；构建 SSR 页面并修复 Hydration 问题。

**阶段门槛**：能以依赖图、调度队列和 Patch 流程解释更新，不把 Vue 响应式简单描述为“数据双向绑定”。

---

# 卷 14：状态、路由、表单、数据层与框架比较

## Stage 40：状态分类、路由与应用边界

**目标**：根据状态所有权和生命周期选择方案，而不是把所有数据塞进一个 Store。

**模块**：

1. **状态分类**：Local UI、Shared Client、Server Cache、URL、Form、Session、Persistent、Derived 和 Ephemeral State。
2. **所有权与生命周期**：谁创建、谁更新、谁消费、何时销毁、是否序列化、是否跨标签或跨端。
3. **路由架构**：Route Tree、Layout、Data Route、Guard、Loader、Error Route、Lazy Route、Prefetch 和权限路由。
4. **Store 方案**：Context/Reducer、Redux Toolkit、Zustand、Pinia、Signals 类方案；事件驱动与状态机。
5. **服务端状态**：TanStack Query 等 Query Cache、Key、Stale、Garbage Collection、Invalidation、Mutation 和 Optimistic Update。
6. **URL 作为状态**：Search Params、Filter、Pagination、Shareable State、Back/Forward 和 Schema。
7. **模块边界**：Feature、Domain、Shared、Page、Widget、Infrastructure 的依赖方向。

**实践与证据**：为同一业务分别建立 React 和 Vue 状态图；把错误的全局状态拆分；实现可分享筛选 URL；对比 Store 与 Query Cache。

**阶段门槛**：每项状态都有明确唯一来源；刷新、深链、前进后退和多页面协作行为正确。

## Stage 41：复杂表单、数据一致性与离线交互

**目标**：处理真实企业表单和写操作，而不是只展示几个输入框。

**模块**：

1. **表单模型**：Field、Value、Touched、Dirty、Validating、Error、Submit、Reset、Initial Value 和 Server Value。
2. **受控与非受控**：渲染成本、动态字段、文件输入、富文本、第三方组件和大型表单性能。
3. **Schema Validation**：客户端校验、服务端校验、跨字段规则、异步规则、错误映射和本地化。
4. **动态表单**：数组、条件字段、步骤、草稿、自动保存、离开确认和版本恢复。
5. **写入一致性**：乐观更新、回滚、并发修改、Version、Conflict、重复提交和幂等。
6. **离线与弱网**：Pending Queue、Retry、冲突提示、同步状态、失败恢复和用户可见性。
7. **数据缓存**：预取、占位数据、分页、无限列表、窗口焦点刷新、轮询和缓存边界。

**实践与证据**：实现多步骤订单编辑器；包含草稿、自动保存、服务端错误、并发冲突、离线队列和恢复；测量大表单渲染成本。

**阶段门槛**：在慢网、重复提交、服务器拒绝、页面刷新和多人修改条件下，表单不会静默丢失数据。

## Stage 42：多框架比较、Web Components 与历史系统迁移

**目标**：形成技术选型能力，而不是把熟悉度包装成架构结论。

**模块**：

1. **范式比较**：Virtual DOM、Fine-grained Reactivity、Compiler-first、Template、JSX、Signal、Resumability 和 Server-first。
2. **生态比较**：React、Vue、Angular、Svelte、Solid、Qwik 等在团队规模、约束、SSR、生态和升级成本上的差异。
3. **Web Components**：Custom Element、Shadow DOM、Slot、Attribute/Property、Event、Form-associated Element 和样式隔离。
4. **互操作**：React/Vue 包装 Web Components、跨框架事件、对象属性、SSR 和 Hydration 边界。
5. **历史技术识别**：jQuery、AMD/CMD、RequireJS、Backbone、AngularJS、Vue 2、Class Component 和旧构建链。
6. **迁移模式**：Big Bang、Strangler、Route-by-route、Component Island、Adapter、Dual Run、Feature Flag 和 Codemod。
7. **选型证据**：团队能力、招聘、性能、生态、长期支持、合规、部署、迁移和退出成本。

**实践与证据**：用至少三种范式实现同一交互；构建跨 React/Vue 使用的 Web Component；为一个旧系统编写分阶段迁移 RFC。

**阶段门槛**：选型文档必须包含“不选择什么、为什么不选、未来如何退出”，不能只列优点。

---

# 卷 15：UX、组件架构、设计系统、A11Y 与国际化

## Stage 43：产品界面、交互状态、可访问性与国际化

**目标**：把前端界面视为完整用户流程，而不只是正常状态截图。

**模块**：

1. **信息架构**：用户任务、导航、层级、内容分组、渐进披露、搜索和复杂后台信息密度。
2. **交互状态**：Initial、Loading、Skeleton、Empty、Partial、Error、Offline、Permission Denied、Success 和 Undo。
3. **输入体验**：即时/延迟校验、保存反馈、危险操作确认、批量操作、快捷键和触控目标。
4. **WCAG 2.2**：Perceivable、Operable、Understandable、Robust；A/AA/AAA；项目默认以 AA 为目标。
5. **复杂 A11Y**：Dialog、Combobox、Tabs、Tree、Grid、Live Region、Drag and Drop、虚拟列表和焦点恢复。
6. **国际化**：Locale、语言与地区、消息格式、复数、日期、数字、货币、时区、排序和相对时间。
7. **布局本地化**：RTL、文本膨胀、字体回退、CJK、换行、伪本地化和翻译资源加载。
8. **内容与隐私体验**：Cookie/Consent、数据导出、删除、权限说明、错误文案和敏感信息最小展示。

**实践与证据**：完成键盘和屏幕阅读器可用的后台流程；支持中英与 RTL；运行自动化和人工 A11Y 审计；处理所有非正常状态。

**阶段门槛**：设计稿未提供的错误、空、慢网、权限和辅助技术场景也必须有明确实现。

## Stage 44：组件 API、组合模式与无头组件

**目标**：设计长期稳定、可组合、可测试的组件 API。

**模块**：

1. **组件边界**：业务组件、领域组件、通用组件、Primitive、Layout、Page 和 Adapter。
2. **受控 API**：Controlled/Uncontrolled、Default Value、Change Event、Open State、Selection 和 Reset。
3. **组合模式**：Compound Component、Slot、Render Prop、Hook/Composable、Provider、Headless、Polymorphic 和 As Child。
4. **行为与样式分离**：State Machine、ARIA Behavior、Positioning、Portal、Focus、Animation 和 Theme。
5. **公共 API**：Props 命名、事件、Ref、Imperative API、Children、错误边界、默认值和扩展点。
6. **稳定性**：Backward Compatibility、Deprecated、Feature Detection、Tree Shaking、Bundle Size 和 SSR。
7. **复杂组件**：Data Grid、Tree、Combobox、Date Picker、Rich Text、Upload、Virtual List 和 Chart Wrapper。
8. **测试契约**：行为测试优先、可访问查询、交互矩阵、视觉状态和跨框架一致性。

**实践与证据**：实现 Headless Select/Dialog；分别封装 React 与 Vue Adapter；设计 Data Grid API；进行一次 Breaking Change 评审。

**阶段门槛**：调用方可以组合而不 Fork 组件；组件状态、DOM、A11Y、样式和业务数据边界清晰。

## Stage 45：Design Token、组件库与设计系统治理

**目标**：从“组件集合”升级为跨产品的设计与工程系统。

**模块**：

1. **系统分层**：Foundation、Token、Primitive、Component、Pattern、Template、Content Guideline 和 Tooling。
2. **Token Pipeline**：Source Token、Alias、Semantic、Component Token；JSON/代码生成、CSS Variables、原生平台输出和校验。
3. **主题与品牌**：Light/Dark、High Contrast、Brand、Tenant、Runtime Theme、主题继承和不兼容覆盖。
4. **文档与演示**：Story、Playground、Usage Guideline、Do/Don’t、A11Y、Responsive、Content 和 Migration。
5. **发布与版本**：Monorepo、Package、SemVer、Changeset、Canary、Release Note、Codemod 和兼容窗口。
6. **质量体系**：单测、交互、视觉回归、A11Y、Bundle、Browser Matrix、Performance 和 API Snapshot。
7. **设计协作**：Figma Token、组件映射、设计到代码、差异审计、贡献流程和设计评审。
8. **治理模型**：核心团队、贡献者、RFC、采纳率、重复组件、升级率、支持成本和废弃流程。

**实践与证据**：发布一套 React/Vue 可消费的组件与 Token 包；建设文档站；实现三主题；完成版本升级、视觉回归和使用方迁移。

**阶段门槛**：设计系统必须有采纳、升级、贡献、废弃和质量指标，不能只以组件数量衡量成功。

---

# 本分册综合验收

完成卷 10～15 后，必须提交：

1. 浏览器渲染、事件、生命周期、存储和 Worker 的实验报告。
2. HTTP 缓存、实时连接、流式响应和上传恢复的网络实验。
3. 一套企业级 React 应用和一套企业级 Vue 应用。
4. 至少一个框架的源码调试记录，包括状态更新、调度和 DOM Commit。
5. 一个跨框架可用的组件或 Web Component。
6. 一套支持主题、国际化和 WCAG 2.2 AA 目标的设计系统原型。
7. 一份框架选型或旧系统迁移 RFC，包含成本、风险和退出策略。

答辩必须从一次用户操作开始，解释事件、状态、框架 Render、浏览器 Commit、网络请求、缓存、错误恢复和可访问性反馈。