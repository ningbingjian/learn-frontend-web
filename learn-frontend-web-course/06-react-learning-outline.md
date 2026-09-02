# React 从零基础到极其资深前端架构师学习大纲

> 版本：v0.1  
> 基线日期：2026-09-02  
> React 基线：React 19.2.x Stable；课程正式编写时使用当时最新稳定补丁并重新核验官方文档、安全公告与框架兼容性。  
> 定位：`learn-frontend-web-course` 的 React 专项总纲，用于后续拆解正式课程 `Stage → Module → Lesson / Lab → Project`。  
> 教学规范：全部正式课程必须遵循 [`FRONTEND_TEACHING_GUIDE.md`](./FRONTEND_TEACHING_GUIDE.md)。

---

# 1. 最终目标

这不是 React API 清单，也不是“Hooks 速成”。最终要培养能够长期负责复杂 React 产品和 React 技术体系的人。

学习完成后，应能够：

1. 从空目录创建、运行、构建和调试 React + TypeScript 项目，并解释 `index.html → main.tsx → createRoot → render → Component → DOM` 完整启动链路。
2. 准确区分 JSX、React Element、React Node、Component、React Tree、Fiber、DOM Node，不把这些概念混成“虚拟 DOM”。
3. 一次学透 Props、State、Event、Form、Ref、Effect、Context、Reducer、Custom Hook 等核心模型，并能处理 Wrong Way、Failure、Debug、性能和源码边界。
4. 能设计复杂状态、表单、路由、Server State、缓存、乐观交互、离线/弱网和错误恢复。
5. 掌握现代 React 的 Actions、`useActionState`、`useOptimistic`、`useEffectEvent`、Transition、Deferred Value、Suspense、`use()`、Activity 等能力。
6. 能完成 React DOM、Portal、资源预加载、Metadata、A11Y、i18n、样式和复杂 UI 工程。
7. 能使用 Profiler、React Performance Tracks、Browser Performance、Memory、Network 等证据定位 Render、Commit、Bundle、内存和交互性能问题。
8. 理解 React Compiler 的目标、约束、编译结果、渐进采用与性能验证，而不是继续机械堆 `memo/useMemo/useCallback`。
9. 不依赖 Next.js 黑盒即可理解 SSR、Hydration、Streaming SSR、Static Rendering、Partial Prerender / Resume 等服务端 React 模型。
10. 理解 React Server Components、Server/Client Boundary、Server Functions、`use()`、RSC Payload 和 Bundler 集成边界。
11. 能从源码解释 Fiber、Reconciler、Update Queue、Hooks、Render/Commit、Lane、Scheduler、Suspense、Hydration 和 Server Renderer 的关键机制。
12. 能建设 React Library、Headless UI、Design System、Monorepo、Microfrontend、共享平台和升级迁移机制。
13. 能处理 Legacy React、Class Component、旧 Context、旧 Router/Redux、CRA/旧 Webpack，以及 React 18 → 19 等真实迁移。
14. 能建立 React 应用的测试、性能、安全、可靠性、可观测、发布、回滚和架构治理体系。
15. 能完成 Principal 级 React 架构答辩：解释架构驱动力、状态边界、异步边界、SSR/RSC 边界、性能、安全、成本、迁移和退出策略。

---

# 2. 课程不可违反的规则

## 2.1 一个 Module，一次学透

每个 React 主题只允许一个 Owner Module。一个 Module 一旦完成，必须在计划范围内完成：

```text
为什么存在
→ 基础概念
→ 最小使用
→ 完整 API / 能力
→ 工程实践
→ Wrong Way
→ Failure Lab
→ Debug
→ 底层机制
→ Source Lab（适用时）
→ Performance / Security / A11Y（适用时）
→ Production Boundary
→ 替代方案 / Trade-off
→ Module Project / Review
```

禁止后续再创建同名：

```text
React State 高级篇
React State 原理篇
React State 源码篇
React Effect 性能篇
```

复杂 Module 可以拆很多 Lesson，但必须在同一 Module 内完成闭环。

## 2.2 每个 Lesson 必须可复刻、源码必须独立运行

需要代码或实验的 Lesson 只能：

1. 从空目录 / 最小空项目开始；或
2. 明确执行 `Step 0：复制并验证上一课最终源码` 后继续演进。

连续 Lesson 必须写清来源目录、复制方式、目标目录、依赖安装、基线运行、预期结果以及本课新增/修改/删除文件。

每个 Lesson 最终目录必须是一份可独立安装、运行、测试的完整工程，不得运行时依赖上一课源码或上一课 Dev Server。

## 2.3 不默认任何当前课程所需操作是“常识”

教学步骤必须写清：

```text
在哪个目录
哪个文件
创建 / 修改 / 删除
找到哪段代码
在哪个位置新增 / 替换
代码写什么
为什么写这里
现在能否运行
执行什么命令
应该看到什么
为什么出现
理论上叫什么
```

高级阶段的独立能力放在 Challenge / Project / Architecture Exercise 中训练，不通过缺失教学步骤制造困难。

## 2.4 Must / Should / Expert 都要学

- **Must**：正确使用、基础心智模型、常见错误。
- **Should**：复杂场景、边界、故障、Debug、工程与性能。
- **Expert**：底层机制、关键源码、系统性能/安全、架构取舍与治理。

完整 Owner Module 最终必须覆盖计划内的三层深度；标签不是跳过 Expert 的理由。

---

# 3. React 课程地图

| Stage | 主题 | 主要能力 |
| --- | --- | --- |
| RE-S00 | React 启动、运行边界与开发环境 | 从空目录理解 React 如何真正启动 |
| RE-S01 | JSX、Element、Component 与 Props | 建立声明式 UI 与组件基础模型 |
| RE-S02 | Render、State、Identity 与 Update | 掌握 React 最核心状态与更新模型 |
| RE-S03 | Event、Form、Action 与用户交互 | 构建复杂交互和现代表单 Action |
| RE-S04 | Ref、Effect 与外部系统同步 | 一次学透 React Escape Hatch |
| RE-S05 | Context、Reducer、Custom Hook 与状态架构 | 复杂状态组织和外部 Store 契约 |
| RE-S06 | 组件组合、公共 API 与高级组件模式 | 设计可复用、可演进组件 |
| RE-S07 | Router、Server State 与应用数据架构 | 构建完整企业 SPA 数据体系 |
| RE-S08 | Suspense、Transition、Concurrency 与 Activity | 掌握现代并发 React |
| RE-S09 | React DOM、Portal、资源与 Metadata | 掌握 React ↔ Browser DOM 边界 |
| RE-S10 | A11Y、i18n、Styling 与 UI Engineering | 构建生产级 UI 工程 |
| RE-S11 | Error、Security、Reliability 与 Observability | 处理生产故障与风险 |
| RE-S12 | Performance、Profiler 与 React Compiler | 建立 React 性能工程体系 |
| RE-S13 | React Testing 与质量工程 | 建立完整质量矩阵 |
| RE-S14 | SSR、Hydration、Streaming 与 Static Rendering | 掌握服务端 React 基础设施 |
| RE-S15 | RSC、Server Functions 与 Full-stack React | 掌握现代服务端 React |
| RE-S16 | Fiber、Reconciler、Lane、Hooks 与源码 | 源码级理解 React |
| RE-S17 | React Library、Design System 与平台能力 | 从业务开发进入公共平台建设 |
| RE-S18 | 大型 React 架构、迁移、治理与 Capstone | 达到 Staff / Principal / Architect 能力 |

---

# 4. RE-S00：React 启动、运行边界与开发环境

## RE-M001：React 是什么以及为什么需要 React

完整学习：命令式 DOM 的同步成本、声明式 UI、UI = f(state) 的适用边界、React/ReactDOM 分工、Library vs Framework、SPA/SSR/RSC 中 React 的位置、React 不负责的路由/数据/构建/部署能力、React/Vue/Angular/Svelte 的范式差异初识。

**Lab**：同一 Counter / Product List 分别使用 Vanilla DOM 与 React 实现，比较状态同步、事件、DOM 更新与维护成本。

## RE-M002：从空目录创建 React + TypeScript 项目

完整学习：Node、pnpm、`package.json`、dependency/devDependency、Vite、TypeScript、tsconfig、`index.html`、`src/main.tsx`、`src/App.tsx`、scripts、Dev Server、HMR、Production Build、dist、Source Map 初识。

**核心链路**：`Browser → index.html → module script → main.tsx → createRoot → root.render → App → DOM`。

## RE-M003：React Root 与应用启动模型

完整学习：DOM Container、`createRoot`、Root、`root.render`、`root.unmount`、Multiple Roots、React 嵌入历史页面/其他框架、`createRoot` vs `hydrateRoot`、Root 生命周期、Root Error Callback、identifier prefix、React Tree 与 DOM Tree。

## RE-M004：React DevTools 与最小 Debug 能力

完整学习：Components、Props、State、Hooks、Component Tree、Profiler 初识、Highlight Updates、Browser Elements/Sources/Console/Network、断点、调用栈、Error Stack、Component Stack，建立“结论必须有证据”习惯。

**Stage Project**：从空目录构建最小 Product Explorer，提交启动链路图、React Tree/DOM Tree 对照和第一份 Debug 记录。

---

# 5. RE-S01：JSX、Element、Component 与 Props

## RE-M005：JSX 一次学透

JSX 为什么存在；JSX Syntax、Expression、Attribute、Children、Fragment、HTML/JSX 差异、`className`、style object、boolean prop、event prop、JSX Transform、`jsx/jsxs` 心智模型、JSX 最终产物；严格区分 JSX、HTML、DOM、Component。

## RE-M006：React Node、Element、Component、DOM Node

区分 Component Definition、Component Invocation、React Element、React Node、React Tree、组件身份、DOM Node、Fiber；重点解释 `App`、`App()`、`<App />` 三者差异。

## RE-M007：Function Component 一次学透

Function Component、命名、Render、Return、Component Tree、Nested Component 错误、Pure Render、Component Boundary、局部变量、组件身份、Render 与普通函数调用的区别。

## RE-M008：Props 与单向数据流

Props、解构、默认值、对象/数组/函数 Props、children、immutability、parent→child、callback→parent、composition、prop drilling 初识；TypeScript Props、discriminated props、generic props、API 边界。

## RE-M009：Conditional Rendering、List 与 Key

`if/&&/?:/null`、array children、`map`、Key、Stable Identity、index key、reorder/insert/delete、State mismatch。

**Failure Lab**：使用 index key → 输入状态 → 重新排序 → State 错位；用证据建立 `Key → Identity → State Preservation → Reconciliation` 模型。

## RE-M010：Pure Render、Rules of React 与 StrictMode

Render Purity、Side Effect、Mutation、Idempotence、Rules of Hooks / Components、StrictMode 的开发期检查、重复执行行为、错误副作用、随机数/日期/DOM 访问边界，以及 React Compiler 与 Rules of React 的关系。

**Stage Project**：商品目录组件系统，覆盖列表身份、组件组合、Props API、StrictMode 和错误 Key 回归测试。

---

# 6. RE-S02：Render、State、Identity 与 Update

## RE-M011：State 与 `useState` 一次学透

为什么需要 State；State vs ordinary variable；State ownership；Hook 调用；Lazy Initialization；Setter；Functional Updater；对象/数组不可变更新；Same-value Update 与 `Object.is`；State Queue、Batch、Render Scheduling、Stale State、Closure、Render Snapshot、Update Priority 初识；连接 Hooks 内部存储与 Update Queue 源码。

## RE-M012：Render Snapshot 与 Update Queue

通过连续 `setCount`、异步回调、Functional Updater 等实验理解一次 Render 的 State Snapshot、Closure、Replace Update、Updater Queue、Batching 与调度。

## RE-M013：Component Identity 与 State Preservation

Tree Position、Component Type、Key、Same/Different Position、State Preservation/Reset、Conditional Tree、Nested Definition、Key Reset、Tab/Form/Dialog 状态保留，以及 Activity 的连接点。

## RE-M014：State Modeling

Minimal/Derived/Redundant/Duplicate/Impossible State、Normalized State、Nested State、Entity State、State Ownership、Lift State、Controlled State、Local/Shared、URL State、Server State、State Machine；重点训练“什么数据不应该进入 `useState`”。

## RE-M015：`useReducer` 与复杂状态

Reducer、Action、Dispatch、Pure Reducer、Initializer、Action Modeling、Domain Event、Reducer Composition、Reducer + Context、State Machine、Undo/Redo、Reducer Test、性能与内部 Dispatch 流程。

**Failure Labs**：Stale State、错误对象 Mutation、错误 Key 重置/保留状态、冗余 State 不一致。

**Source Lab**：从 `setState` 触发到 Hook Update Queue 的最小源码 Debug。

**Stage Project**：购物车/订单状态系统，要求状态模型、Reducer、Undo/Redo、错误复现、Profiler 基线和状态 ADR。

---

# 7. RE-S03：Event、Form、Action 与用户交互

## RE-M016：React Event System 一次学透

Event Handler、Function Reference、Inline Handler、SyntheticEvent、nativeEvent、Capture、Target/CurrentTarget、Propagation、PreventDefault、Keyboard/Pointer/Input/Composition、Event Delegation、Event Priority 与内部事件分发模型。

## RE-M017：Controlled / Uncontrolled Input

Input/Textarea/Select/Checkbox/Radio/File、value/defaultValue、checked/defaultChecked、Controlled/Uncontrolled、切换警告、IME/Composition、Cursor/Selection、大表单渲染和 A11Y。

## RE-M018：复杂表单架构

Field/Value/Touched/Dirty/Error/Validating/Submitting、Initial/Server Value、Nested/Dynamic/Array/Dependent Field、Multi-step、Async/Server Validation、Draft、Autosave、Unsaved Changes、Large Form Performance；比较原生 React、React Hook Form 与 Schema Validation。

## RE-M019：React Actions 与 `<form action>`

Action、Sync/Async Action、Transition Integration、Form Action、Pending、Error、Progressive Enhancement、`useActionState`、`useFormStatus`、Queued Actions、Cancellation、Server/Client Action Boundary。

## RE-M020：Optimistic UI 与 `useOptimistic`

Optimistic State、Temporary State、Pending、Commit/Rollback、Server Reject、Concurrent Optimistic Updates、Ordering、Stale Response、Retry、Duplicate Submission、Idempotency、Optimistic Reducer，与 Query Cache Optimistic Update 比较。

**Stage Project**：多步骤订单编辑器，包含 Schema 校验、服务端错误、Action、Optimistic UI、重复提交保护、慢网和失败恢复。

---

# 8. RE-S04：Ref、Effect 与外部系统同步

## RE-M021：`useRef` 一次学透

Ref Container、`.current`、State vs Ref、DOM Ref、Timer/Imperative Value、Previous Value、生命周期、Callback Ref、Ref Cleanup、React 19 Ref 模型、Fiber Ref 连接点。

## RE-M022：Imperative Handle 与外部 DOM

Focus、Scroll、Measurement、Selection、Third-party Widget、Canvas、Video、Editor、Map、Chart、`useImperativeHandle`、Imperative API Design、Escape Hatch 边界。

## RE-M023：`useEffect` 一次学透

Effect 的真实职责——与外部系统同步；Setup/Cleanup/Dependencies/Commit Timing、Dependency Comparison、Object/Function Dependency、Race、AbortController、Stale Closure、Subscription、Timer、Third-party、Network、Infinite Effect、StrictMode、Cleanup before Re-run、Unmount、Passive Effect Scheduling、Fiber Effect 模型。

## RE-M024：Removing Effects

Derived State、Event Logic、Reset with Key、Render Calculation、Memoized Calculation、State Adjustment、Parent Notification、External Subscription、Server State Library、State Machine；建立“看到 Effect 先问是否真的需要”的设计习惯。

## RE-M025：`useEffectEvent` 与 Reactive / Non-reactive Logic

Reactive Value、Effect Dependency、Non-reactive Effect Event、Latest State、Reconnect/Timer/Event Listener 案例、不能用 Effect Event 逃避依赖、Lint Enforcement。

## RE-M026：`useLayoutEffect` / `useInsertionEffect`

Browser Layout/Paint、Commit、Layout Effect、Flicker、DOM Measurement、Tooltip、同步更新风险、CSS-in-JS、Insertion Effect、各 Effect 时机和 Commit Source Flow。

**Failure Labs**：Infinite Effect、Duplicate Subscription、Stale Closure、Race Condition、错误 Dependency、Layout Flicker。

**Source Lab**：Effect Hook 链表、Flags、Passive Mount/Unmount、Commit Timing。

**Stage Project**：第三方实时图表/聊天连接 Adapter，要求订阅、重连、清理、取消、测量、Profiler 与 Failure Report。

---

# 9. RE-S05：Context、Reducer、Custom Hook 与状态架构

## RE-M027：Context 一次学透

`createContext`、Provider、Nearest Provider、Default、Subscription、Value Identity、Update Propagation、Context Splitting、Dependency Injection、Context + Reducer、性能、Selector Problem、SSR/Server Boundary、Testability、架构滥用。

## RE-M028：Custom Hook 一次学透

逻辑复用、Naming、State Isolation、Dependency、Lifecycle、Subscription、API Design、Options、Object/Tuple Return、Error Handling、SSR、Testability、`useDebugValue`、Library Hook、Versioning。

## RE-M029：`useSyncExternalStore` 与 External Store Contract

External Mutable Store、Subscribe、Snapshot、Server Snapshot、Tearing、Concurrent Rendering、SSR、localStorage/browser-online Store、第三方状态库契约。

## RE-M030：React 应用状态架构

系统比较 `useState/useReducer/Context/Redux Toolkit/Zustand/Jotai/XState/URL/Server Cache/External Store`；核心不是堆库，而是 State Ownership、Lifecycle、Serialization、Consistency、Debuggability、Performance 与 Team Governance。

**Stage Project**：组织/权限工作台状态架构，提交状态分类图、Context/External Store 对比、故障实验和 ADR。

---

# 10. RE-S06：组件组合、公共 API 与高级组件模式

## RE-M031：Composition 一次学透

Children、Slot、Component Prop、Render Prop、Compound Component、Headless、Provider、Controlled/Uncontrolled、Polymorphism、`as/asChild` 思路、Composition vs Configuration/Inheritance。

## RE-M032：组件 API 设计

Stable/Minimal API、Props Explosion、Boolean Trap、Semantic Props、Extensibility、Event Contract、Ref、Error、Async、Controlled State、Backward Compatibility、Deprecation、Versioning。

## RE-M033：复杂 Headless Component

以 Dialog/Select/Tabs/Combobox/Menu 为核心，系统学习 State、DOM、Focus、Keyboard、ARIA、Portal、Positioning、Controlled API、Animation 和 Interaction Matrix。

## RE-M034：React Type API Design

`ComponentProps`、Children/Ref/Event Type、Generic Component、Discriminated Union、Polymorphic Type、Callback Typing、Public Library Type、Inference、Breaking Type Change。

**Stage Project**：Headless Dialog + Combobox，并提供业务 Styled Adapter、A11Y 测试、Visual Test 和 Breaking Change Review。

---

# 11. RE-S07：Router、Server State 与应用数据架构

## RE-M035：React Router 与 Navigation

History、URL、Route、Nested/Layout/Dynamic/Search Params、Route State、Navigation、Back/Forward、Deep Link、404、Error Route、Lazy Route、Scroll Restore、Route Ownership。

## RE-M036：Data Router 与 Route Architecture

Loader、Action、Pending、Error、Redirect、Nested Loading、Mutation/Revalidation、Route-level Code Split、Auth/Permission、Route Data Ownership。

## RE-M037：Server State 一次学透

Client State vs Server State；Loading/Error/Cache/Stale/Refetch/Invalidate/Dedupe/Retry/Pagination/Infinite/Mutation/Optimistic/Focus Refetch/Offline。

## RE-M038：TanStack Query 生产级实践

Query Key、Cache、staleTime、GC、Invalidation、Mutation、Optimistic、Cancellation、Prefetch、Hydration、SSR、Persistence、Offline、DevTools、Query Boundary 与 Architecture。

## RE-M039：API Client 与数据契约

Fetch/Abort、Transport Adapter、Runtime Validation、Schema、DTO/Domain Model、Error/Trace ID、Pagination、Version、Retry、Auth、Cache、OpenAPI Codegen。

**Failure Labs**：路由深链失效、重复请求、请求竞态、错误 Query Key、缓存失效错误、慢网/离线。

**Stage Project**：企业任务中心 SPA，包含 Router、Query Cache、URL State、Pagination、Optimistic Mutation、Runtime Validation、错误恢复和离线提示。

---

# 12. RE-S08：Suspense、Transition、Concurrency 与 Activity

## RE-M040：Concurrent Rendering Mental Model

Sync/Urgent/Non-urgent Update、Interruptible/Restartable Render、Render Purity、Background Render、Commit Atomicity、Concurrency ≠ Parallelism、User Responsiveness、Scheduler/Lane 连接点。

## RE-M041：`useTransition` / `startTransition`

Transition、Pending、Action、Interrupt、Async Transition、Nested Transition、Input Restriction、Ordering、Navigation、Fallback Prevention、Error Boundary、内部优先级流程。

## RE-M042：`useDeferredValue`

Stale UI、Background Render、Search/Chart/Expensive Tree、Suspense、Timeout/Debounce 区别、Deferred vs Transition、性能验证。

## RE-M043：Suspense 一次学透

Suspend、Promise、Boundary、Fallback、Nested Boundary、Reveal、Error/Retry、`lazy`、Streaming、Data/Router Integration、Transition、Boundary Architecture、内部 Suspense State。

## RE-M044：`use()` 与 Promise / Context Resource

`use(resource)`、Promise、Suspense、Server Promise → Client Read、Rejection、Error Boundary、Conditional `use`、Resource Architecture。

## RE-M045：Activity 一次学透

Visible/Hidden、State Preservation、Effect Cleanup、Background Priority、Pre-render probable UI、Tabs/Navigation、Cost、Suspense/Transition Interaction。

## RE-M046：Concurrent Failure Lab

主动制造 Slow Render、Blocked Input、Unwanted Fallback、Transition Ordering、Stale Result、Suspense Waterfall、Repeated Fetch、Hidden Activity Side Effect，并使用 Profiler/Performance 证明。

**Stage Project**：大型搜索/数据探索页，包含 Suspense Boundary 设计、Transition、Deferred Value、Activity 预渲染和并发故障报告。

---

# 13. RE-S09：React DOM、Portal、资源与 Metadata

## RE-M047：React DOM Component Model

HTML/SVG Props、DOM Property vs Attribute、Style、Event、Form Special Behavior、Custom Element、`dangerouslySetInnerHTML`、React DOM 更新边界。

## RE-M048：Portal 一次学透

React Tree vs DOM Tree、Modal/Tooltip/Overlay、Event Bubbling、Context、Focus、Stacking Context、Accessibility。

## RE-M049：React DOM Resource API

Preconnect、Preload、Preinit、Module Preload/Preinit、Stylesheet/Script/Font、Request Priority、Suspense/SSR Resource Coordination。

## RE-M050：Metadata

Title、Meta、Link、Script、Document Metadata、SSR/Streaming、Duplicate Metadata、SEO 与框架集成边界。

**Stage Project**：Portal Overlay + Resource/Metadata Demo，并提交 DOM/React Tree、Network Waterfall、焦点路径和 SEO 证据。

---

# 14. RE-S10：A11Y、i18n、Styling 与 UI Engineering

## RE-M051：React Accessibility 一次学透

Semantic HTML、Keyboard、Focus、Accessible Name、ARIA、Live Region、Dialog/Tabs/Combobox/Tree/Grid、Virtualized UI、Suspense Loading、Route Navigation、Error、Screen Reader、Automated + Manual Audit。

## RE-M052：Focus Architecture

Focus Ownership、Trap/Restore、Roving Tabindex、Keyboard Navigation、Modal、Route、Async UI、Suspense、Portal、Virtual List。

## RE-M053：React 国际化

Message/Plural/Date/Number/Currency/Timezone/Locale、RTL、Text Expansion、Lazy Locale、Hydration、Server/Client Locale Consistency、Unicode/ICU/CLDR 前置连接。

## RE-M054：Styling Architecture

Global CSS、CSS Modules、Utility/Tailwind、CSS-in-JS、Zero-runtime、CSS Variables、Token、Theme、SSR/Hydration、Critical CSS、RSC Compatibility、Design System Boundary。

## RE-M055：Motion / View Transition Integration

稳定主线学习 CSS/Browser View Transition、React 普通动画与 Reduced Motion；React `<ViewTransition>` / `addTransitionType` 放 Canary Research Lab，不作为 Stable 主线依赖。

**Stage Project**：可访问、多语言、RTL、主题化的复杂 Dashboard UI，含键盘/屏幕阅读器/视觉/国际化测试。

---

# 15. RE-S11：Error、Security、Reliability 与 Observability

## RE-M056：Error Boundary 一次学透

Render/Lifecycle Error、Event/Async Error 边界、Error Boundary、Fallback、Reset、Scope、Nested/Route Boundary、Suspense Interaction、Production Error UX；Class Component 仅在这里和 Legacy 路线中系统补充必要能力。

## RE-M057：React Failure Model

White Screen、Infinite Render/Effect、Stale Closure、Race、Chunk/Dynamic Import Failure、Hydration Error、Server/Client Error、Malformed Data、Cache Error、Network Loss；建立症状→证据→根因→修复→防护模型。

## RE-M058：React Security

Default Escaping、XSS、`dangerouslySetInnerHTML`、Sanitizer、URL/`javascript:`、Markdown/Rich Text、Third-party Component、UI Permission ≠ Authorization、Token Storage、CSP、Trusted Types、SSR Injection、Hydration Payload、Server Function Authorization、RSC Data Leak。

## RE-M059：React Observability

Error Capture、Component Stack、Root Error Callback、Release/Source Map、Route、User/Tenant、Query、Web Vitals、Profiler、Tracing/Breadcrumb、Feature Flag、Session Replay Privacy。

## RE-M060：Reliability Patterns

Timeout、Cancel、Retry、Fallback、Stale Cache、Offline、Partial Response、Optimistic Rollback、Kill Switch、Feature Flag、Graceful Degradation、Recovery UX。

**Stage Project**：故障注入版企业页面，要求 Threat Model、Error Boundary Map、Telemetry、Runbook 和至少 5 类故障演练。

---

# 16. RE-S12：Performance、Profiler 与 React Compiler

## RE-M061：React Performance Measurement

React DevTools Profiler、Commit/Render、Flame/Ranked View、Why Render、Browser Performance、User Timing、React Performance Tracks、CPU Slowdown、Production Profiling、基线/实验设计。

## RE-M062：Render Performance

Unnecessary Render、Parent Render、Props Identity、Context Diffusion、Store Selector、`memo/useMemo/useCallback` 的真实边界、Expensive Render、Virtualization、Component Split、State Locality。

## RE-M063：React Compiler 一次学透

Compiler Motivation、Automatic Memoization、Rules of React、Build Integration、Compilation Result、Bailout/Diagnostics、`"use memo"` / `"use no memo"`、Incremental Adoption、Library Compilation、Manual Memo Compatibility、Migration、Benchmark。

## RE-M064：Large List 与 Virtualization

DOM/Render Scale、Windowing、Overscan、Dynamic Height、Scroll、Focus、A11Y、Memo、Server Pagination、Worker 与数据规模边界。

## RE-M065：Memory 与 Long-running React App

Retained Component、Listener/Timer/Subscription、Closure、Cache、Detached DOM、Media/GPU、Heap Snapshot、Allocation、TV/大屏长时间运行稳定性。

## RE-M066：Bundle 与 Loading Performance

Bundle/Route Chunk、`lazy`、Dynamic Import、Suspense、Duplicate Dependency、Tree Shaking、CSS/Locale/Third-party、Preload、RSC Bundle Reduction、性能预算。

**Stage Project**：性能问题实验室，至少完成 Render、INP、Bundle、Memory、Large List 五类优化，提交前后 Profiler/Trace/Heap/Bundle 数据。

---

# 17. RE-S13：React Testing 与质量工程

## RE-M067：React Unit Testing

Pure Logic、Reducer、State Machine、Utility、Hook Boundary、Fake Time、Async、Property-based Testing 适用边界。

## RE-M068：Component Testing

Testing Library 思想、User-centric/A11Y Query、userEvent、State/Form/Context/Router、Request Mock、Error/Suspense、避免测试实现细节。

## RE-M069：Integration Testing

Router + Query + Form + Auth + Error Boundary + Suspense 的真实协作；测试数据、真实边界与 Mock 层级。

## RE-M070：E2E

Playwright、Real Browser、Auth、Navigation、Form、Upload、Slow Network、Offline、Trace/Screenshot/Video、Multi-user、Flaky Diagnosis。

## RE-M071：Visual / A11Y / Performance Regression

Visual Snapshot、Responsive/Theme、A11Y、Bundle Budget、Profiler Regression、Web Vitals、Flaky Governance、PR Quality Gate。

**Stage Project**：为前面一个 Stage Project 建立 Unit/Component/Integration/E2E/Visual/A11Y/Performance 完整质量矩阵。

---

# 18. RE-S14：SSR、Hydration、Streaming 与 Static Rendering

> 本 Stage 必须直接使用 `react-dom/server`、`react-dom/client`、`react-dom/static` 建立模型，不能第一次学习就只依赖 Next.js 黑盒。

## RE-M072：React Server Rendering

Server Renderer、HTML Stream、`renderToPipeableStream`、`renderToReadableStream`、Shell、Bootstrap、Error/Abort、SEO、TTFB、Node/Web Stream、Server Runtime Boundary。

## RE-M073：Hydration 一次学透

Server DOM、Client React Tree、`hydrateRoot`、Event Attachment、Identity、Mismatch、Recoverable Error、Date/Random/Browser API/Locale、`useId`、Hydration Performance 与 Debug。

## RE-M074：Streaming SSR

Shell、Suspense Boundary、Streaming/Reveal、Bootstrap、Backpressure、Abort、Crawler、Proxy Buffering、Partial Failure、Performance。

## RE-M075：Static Rendering / Prerender

`react-dom/static`、Prerender、Node Stream、SSG、HTML Output、Hydration、Asset Manifest、CDN/Immutable Asset、Build-time Failure。

## RE-M076：Partial Prerender / Resume 专家研究

Static Shell、Postponed State、Resume/Continuation、Cache/CDN、Architecture、Version/Release Status；正式 Lesson 编写前必须按当前 React 稳定/Canary 状态重新核验 API。

**Failure Labs**：Hydration Mismatch、Stream Abort、Proxy Buffering、Server Error、资源加载顺序错误。

**Stage Project**：从零构建一个不依赖 Meta-framework 的 React SSR + Streaming + Hydration 应用。

---

# 19. RE-S15：RSC、Server Functions 与 Full-stack React

## RE-M077：RSC Mental Model

彻底区分 Client Component、Server Component、SSR、RSC、Server Function；Server Component 运行位置、Build-time/Request-time、Async、Data Access、Bundle Impact、No Client Interactivity。

## RE-M078：Server / Client Boundary

`"use client"`、Module Graph、Serialization、Props、Context、Browser API、Event、Third-party Package、Boundary Placement、Bundle/Architecture。

## RE-M079：Server Functions

`"use server"`、Client Reference、Request/Argument/Result、Action、Validation、Authorization、Error、Mutation、安全和可观测。

## RE-M080：RSC + Suspense + `use`

Server creates Promise → Client `use()` → Suspense；Streaming、Waterfall/Parallelism、Boundary Placement、Error/Retry。

## RE-M081：RSC Data / Cache Architecture

Direct DB/Service Layer、Cache、Request Memo、Authorization/Tenant、Invalidation、Data Leakage、Serialization、N+1、Waterfall、Observability。

## RE-M082：RSC Protocol / Bundler Expert Lab

RSC Payload/Flight Mental Model、Client/Server Reference、Module Map、Bundler Integration、Source Trace；固定具体 React Commit/Version，避免把底层接口当稳定 Public API。

**Stage Project**：RSC Workbench，包含 Server/Client Boundary、Server Function、Streaming/Suspense、权限、缓存、错误、安全和 Bundle 对比。

---

# 20. RE-S16：Fiber、Reconciler、Lane、Hooks 与源码

> 这里研究的是 React 这个系统本身，不重新补前面已经学完的 State/Effect“高级篇”。每个 Source Lab 必须从外部行为实验、假设和最小触发项目开始。

## RE-M083：React 源码研究方法

Repository/Build/Test/Fixture、Package、Source Map、Breakpoint、Call Stack、Key Object、Commit SHA、Hypothesis、Minimal Reproduction、外部行为→断点→对象→调用模型。

## RE-M084：Fiber 一次学透

Fiber 存在原因、Fiber Node、child/sibling/return、alternate、flags、lanes、memoizedProps/memoizedState、updateQueue、Current vs WorkInProgress。

## RE-M085：Reconciler

Element → Fiber、beginWork/completeWork、Child Reconciliation、Key、Placement/Delete/Reuse、Bailout、Diff Complexity 与正确性。

## RE-M086：Render / Commit Pipeline

Schedule → Render → beginWork → completeWork → Commit；Before Mutation、Mutation、Layout、Passive、Ref、Effect 各阶段与浏览器 Paint 的关系。

## RE-M087：Hooks Internals

Hook Linked List、Dispatcher、Mount/Update、`useState/useReducer` Queue、Base State/Pending、Effect、Dependency、Rules Enforcement。

## RE-M088：Scheduler 与 Lane

Priority、Lane、Merge/Pending/Suspended/Ping/Entangle、Sync/Transition、Render Interruption、Starvation、Scheduler 与 Browser Task 的关系。

## RE-M089：Suspense Internals

Thrown Promise Mental Model、Boundary、Retry/Ping、Fallback、Hidden Tree、Activity/Offscreen 连接、Transition Interaction。

## RE-M090：Server Renderer / Hydration / RSC Internals

Server Renderer、Stream Segment/Boundary、Hydration、Event Replay、RSC Transport、Server/Client Reference；以行为和版本固定源码为前提。

**Stage Project**：React Internals Debug Book，至少完成 State Update、Effect、Key Reconciliation、Transition/Suspense、Hydration 五条源码断点报告。

---

# 21. RE-S17：React Library、Design System 与平台能力

## RE-M091：React Library Authoring

Package Architecture、Entry/Exports、Types、ESM、Peer Dependency、React Singleton、Tree Shaking、SSR/RSC/Compiler Compatibility、Source Map、Testing、Release。

## RE-M092：Headless UI Architecture

State/Behavior/DOM/A11Y/Style 分离、Controlled API、Composition、Adapter、Positioning/Portal/Focus 与跨产品复用。

## RE-M093：React Design System

Token、Primitive、Component、Pattern、Theme、React API、A11Y、Docs/Story、Visual Test、Package、Release、Adoption、Contribution。

## RE-M094：组件版本与迁移

SemVer、Breaking Change、Deprecation、Migration Guide、Compatibility、Codemod、API Report、Adoption Telemetry、Canary Release。

## RE-M095：跨框架与 Web Component

React Wrapper、Custom Element、Property/Attribute、Event、Shadow DOM、SSR、React/Vue 共享 Design System 的 Interop 边界。

**Stage Project**：发布一套 React Library + Headless Component + Token/Design System 包，并由两个独立消费项目安装、升级和迁移。

---

# 22. RE-S18：大型 React 架构、迁移、治理与 Capstone

## RE-M096：Large-scale React Application Architecture

Feature/Domain/Layer/Module、Dependency/Public API、DTO/Domain/ViewModel、Infrastructure、State Owner、Route Owner、Async/Error Boundary、Architecture Fitness Function。

## RE-M097：React DDD / Modular Architecture

Bounded Context、Domain/Application/UI/Infrastructure、Dependency Inversion、Anti-corruption Layer、Domain Event、Module Contract、Architecture Test；强调 DDD 适用边界，避免层级过度设计。

## RE-M098：React Monorepo Architecture

Apps/Packages、Design System、Hook/SDK/Feature Package、Dependency Graph、Version/Affected/Remote Cache、CODEOWNERS、Ownership、Golden Path。

## RE-M099：React Microfrontend

Multiple Roots、Module Federation、Web Components、Iframe、Route Composition、Shared React Singleton、Context Boundary、Event/Router/Style、Independent Deployment、Fallback、Version Conflict、治理成本。

## RE-M100：Legacy React

React 15/16/17/18、Class Component、Lifecycle、Legacy Context、Legacy Render/Hydrate、HOC、Render Props、Old Redux/Router、CRA、Legacy Webpack、Enzyme；以维护/迁移为目标而非新项目主线。

## RE-M101：React Migration

Class→Function、Legacy Context→Context、Old Root→createRoot/hydrateRoot、Old SSR→Streaming、React 18→19、Manual Memo→Compiler、Client SPA→SSR/RSC；Codemod、Compatibility Layer、Feature Flag、Visual Regression、Canary、Rollback。

## RE-M102：React Upgrade Governance

Stable/Canary/Experimental Channel、Release/Security Advisory、Dependency Compatibility、Browser/Compiler/Framework Integration、Upgrade Matrix、Pilot、Exception、Rollout、Rollback、Migration Support。

## RE-M103：React Architecture Review

系统性评审 State、Effect、Component API、Context、Error/Suspense Boundary、Cache、SSR/RSC Boundary、Bundle、Performance、Security、Testing、Observability、Migration 与 Exit Strategy。

## RE-M104：React Principal Capstone

建设 **React Enterprise Workbench**，至少覆盖：React 19.2、TypeScript、复杂 Router、Server State、复杂 Form、Design System、A11Y、i18n、Suspense、Transition、Actions、Optimistic UI、Activity、SSR、Streaming、Hydration、RSC、Server Functions、Error Boundary、Observability、Performance、Compiler、Testing、Security、CI/CD 和 Migration Strategy。

必须主动制造并处理至少以下故障：

- Key State Bug；
- Stale Closure；
- Infinite / Racing Effect；
- Context Render Storm；
- Slow Render / INP；
- Memory Leak；
- Chunk Load Failure；
- Hydration Mismatch；
- Suspense Waterfall；
- Server Function Failure / Unauthorized Mutation；
- RSC Data Leak 风险；
- Network/Cache Failure；
- Bad Release / Rollback。

最终证据至少包括：源码、Unit/Component/E2E、Profiler、Performance Trace、Network、Heap Snapshot、Bundle Report、A11Y Report、架构图、状态图、数据流、SSR/RSC 运行位置图、Failure Model、Threat Model、ADR、迁移方案、性能报告、Runbook、故障复盘和架构答辩。

---

# 23. Module → Lesson 拆分规则

上述 `RE-M001 ～ RE-M104` 是 Module 级 Owner Map，不是最终 Lesson 数量。

例如 `RE-M023 useEffect` 后续允许拆成：

```text
RE-EFFECT-KP001 为什么需要 Effect？
RE-EFFECT-KP002 第一个外部系统同步 Effect
RE-EFFECT-KP003 Dependency 如何决定重同步？
RE-EFFECT-KP004 Cleanup 为什么必须存在？
RE-EFFECT-KP005 StrictMode 为什么重复验证 Effect？
RE-EFFECT-KP006 Stale Closure 是怎么形成的？
RE-EFFECT-KP007 Race Condition 如何出现？
RE-EFFECT-KP008 如何使用 AbortController 取消？
RE-EFFECT-KP009 Object Dependency 为什么导致重复执行？
RE-EFFECT-KP010 Function Dependency 如何处理？
RE-EFFECT-KP011 Infinite Effect 如何定位？
RE-EFFECT-KP012 Effect Scheduling 与 Commit
RE-EFFECT-KP013 Passive Effect 源码 Debug
RE-EFFECT-KP014 Effect-heavy Architecture Review
```

但是不会再创建“React Effect 高级篇/源码篇”。

每个 Lesson 必须符合：

```text
一个主问题
+ 最小充分项目
+ 手把手起点
+ 精确文件/位置
+ 可运行立即运行
+ 观察证据
+ 即时理论
+ Wrong Way / Boundary（适用）
+ 当前 Lesson 独立最终源码
```

---

# 24. React 深度能力阶梯

```text
第一层：React Developer
Component / Props / State / Event / Form

        ↓

第二层：Advanced React Engineer
Reducer / Context / Effect / Ref / Router / Server State / Testing

        ↓

第三层：React Specialist
Suspense / Transition / Actions / Activity / Performance / Compiler

        ↓

第四层：React Internals & Full-stack Expert
SSR / Hydration / RSC / Server Functions / Fiber / Lane / Reconciler

        ↓

第五层：React Architect
Library / Design System / Monorepo / Microfrontend / Migration / Security / Reliability / Governance
```

这五层不是拆成以后再补的“高级篇”，而是由上述 Owner Module 按依赖顺序一次完成完整课程体系。

---

# 25. React 专项综合验收

完成 React 专项后，学习者至少必须提交：

1. 从空目录创建的 React + TypeScript 启动链路实验。
2. Component/Props/State/Event/Form 核心应用和至少 5 个基础 Failure Lab。
3. State、Effect、Context、External Store 的完整架构与源码证据。
4. 一套复杂表单、路由、Server State 和 Optimistic UI 企业应用。
5. Suspense / Transition / Deferred / Activity 并发实验和 Profiler/Performance 数据。
6. 一个不依赖 Meta-framework 的 SSR + Streaming + Hydration 应用。
7. 一个 RSC + Server Functions + Suspense 的 Full-stack React 实验。
8. Fiber、Reconciler、Hooks、Lane、Suspense、Hydration 中至少 5 条源码 Debug 报告。
9. 一套 React Library / Headless UI / Design System 发布与消费实践。
10. 完整 Unit/Component/Integration/E2E/Visual/A11Y/Performance 质量矩阵。
11. React Security Threat Model、Observability、Reliability 与 Failure Drill。
12. React Compiler 编译、迁移和性能验证报告。
13. Legacy React / React 18→19 或等价历史系统迁移方案与 Codemod 实验。
14. React Enterprise Workbench Principal Capstone 和正式架构答辩。

只有当学习者既能“从零写出来”，又能“解释为什么这样工作”，还能“制造、定位、修复和预防生产问题”，最后能“设计大型 React 技术体系并说明 Trade-off”，才算完成 React 专项。

---

# 26. 版本与前沿能力规则

1. Stable React API 才进入正式主教学路径。
2. Canary / Experimental 能力可以进入 Research Lab，但必须显式标记 Channel 和退出条件。
3. `Activity` 属于 React 19.2 Stable 主线。
4. `useEffectEvent` 属于当前 Stable 主线，必须与依赖规则一起教学，禁止作为逃避 dependency 的工具。
5. React Compiler 进入正式主线，但必须用编译结果和性能数据验证，不宣称所有应用都自动变快。
6. `<ViewTransition>` / `addTransitionType` 当前只作为 Canary Research Lab；稳定前不作为 Principal Capstone 的硬依赖。
7. RSC 用户级能力与 Server Functions 可以进入正式教学，但 RSC Bundler/Protocol 等底层接口的源码课必须固定 React 具体版本/Commit，并明确其稳定性边界。
8. 每个 Module 正式编写时记录 React、react-dom、Node、TypeScript、Vite、测试浏览器和关键库版本。
9. React 安全公告、Framework 集成和 Compiler 兼容变化需要优先更新课程，不能等待固定大版本重写。
