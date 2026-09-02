# Stage 11：React 完整体系

> 版本：v1.0-draft  
> 基线日期：2026-09-02  
> React 基线：React 19.2.x Stable；正式课程编写时使用当时最新稳定补丁并重新核验官方文档、安全公告和生态兼容性。  
> 上级总纲：[`../README.md`](../README.md)  
> 教学规范：[`../FRONTEND_TEACHING_GUIDE.md`](../FRONTEND_TEACHING_GUIDE.md)

---

# 1. 阶段定位

Stage 11 是课程中唯一完整的 React Stage。

React 不再拆成：

```text
React 基础
→ React 高级
→ React SSR
→ React 源码
```

而是在这一 Stage 中从第一次创建 React 项目开始，一路学习到企业应用、并发、服务端 React、源码、性能、Compiler、Library、Legacy、迁移与大型架构。

完整能力链：

```text
第一次创建 React 项目
↓
理解 JSX / Element / Component / Props
↓
掌握 Event / State / Form / Render
↓
掌握 State Architecture / Reducer / Context
↓
掌握 Ref / Effect / Hook
↓
掌握 Router / Server State / API Boundary
↓
掌握 Actions / Optimistic / Suspense / Concurrency / Activity
↓
掌握 Profiler / Performance / Compiler
↓
掌握 React DOM / Error / A11Y / Security
↓
掌握 SSR / Hydration / Streaming / Static Rendering
↓
掌握 RSC / Server Functions / Cache Boundary
↓
调试 Fiber / Reconciler / Hooks / Lane / Scheduler 源码
↓
建设 React Library / Headless UI / 大型应用架构
↓
维护 Legacy React / Migration / Upgrade Governance
↓
能够长期负责大型 React 技术体系
```

---

# 2. Stage 11 教学原则

1. **一个 React 主题，一个 Owner Module，一次学透。**
2. 每个 Module 后续可以拆很多 Lesson，但不能再创建同名“高级篇 / 原理篇 / 源码篇”。
3. 所有 Lesson 必须遵循“从零状态开始”或“明确复制上一课最终源码继续演进”两种起点之一。
4. 当前 Lesson 最终源码必须可独立安装、运行、测试。
5. 不允许因为“React 应该会”“上一课讲过”“这个很简单”而省略当前步骤。
6. 综合实践、Failure Lab、Performance Lab、Source Lab 直接穿插在正常学习顺序中，不另开项目支线。
7. 项目必须遵守 Knowledge Ceiling：不得偷用尚未正式学习的核心 React 技术。
8. React Stage 只完整教授 React-specific 能力；通用 Design System、Testing、Security、Microfrontend 等组织级能力在后续 Owner Stage 继续系统学习，这里只覆盖 React 集成边界。

---

# 3. Module 学习顺序

# Module 11.01：React 是什么、为什么需要 React

完整学习：命令式 DOM 的复杂度、声明式 UI、UI 与 State 的关系、React 的职责与非职责、React 与 ReactDOM、Library vs Framework、React Tree 与 DOM Tree、Client Rendering、SSR、RSC 以及 React 与 Vue/Angular/Svelte 等范式差异的初步认知。

### 最小机制实验

用原生 DOM 和 React 分别实现同一个有状态交互，观察“手工同步 DOM”和“声明下一份 UI”的区别。

---

# Module 11.02：从空目录建立 React + TypeScript 项目

从空目录开始，完整学习 Node/pnpm 前置检查、package.json、react、react-dom、Vite、TypeScript、tsconfig、index.html、src/main.tsx、src/App.tsx、CSS、scripts、Dev Server、HMR、production build、dist 和 Source Map 初识。

必须建立完整启动链路：

```text
Browser
↓
index.html
↓
<script type="module">
↓
main.tsx
↓
createRoot()
↓
root.render()
↓
<App />
↓
React Tree
↓
DOM
```

---

# Module 11.03：React Root 与应用启动生命周期

完整学习 DOM Container、createRoot、React Root、root.render、root.unmount、Multiple Roots、React 嵌入历史页面、hydrateRoot、Client Root vs Hydration Root、Root Error Callback、identifierPrefix 和 Root 生命周期。

---

# Module 11.04：JSX 一次学透

学习 JSX 为什么存在、JSX 与 HTML 的区别、Expression、Attribute、Children、Fragment、Spread、Conditional JSX、JSX Transform、jsx/jsxs 心智模型、Build-time Transform，以及 JSX 最终如何形成 React Element。

必须彻底回答：

```tsx
<App />
```

到底是什么。

---

# Module 11.05：React Element、React Node、Component、DOM Node

严格区分 Function、Component Definition、Component Invocation、React Element、React Node、Component Tree、DOM Node 和 Fiber。

重点比较：

```tsx
App
App()
<App />
```

---

# Module 11.06：Function Component、Pure Render 与 StrictMode

学习 Function Component、Component Identity、Render、Pure Render、Idempotence、Side Effect、Rules of React、StrictMode、开发环境重复验证、Nested Component Definition 和 Mutation 问题。

---

# Module 11.07：Props、Children 与单向数据流

学习 Props、默认值、解构、Object/Array Props、Function Props、Children、Immutable Input、Parent→Child、Callback、Composition、TypeScript Props 和组件 API 初步设计。

---

# Module 11.08：Conditional Rendering、List、Key 与 Identity

学习 if、ternary、&&、null、array children、map、Stable Key、Index Key、Reorder、Insert/Delete 以及 Key 与 Identity 的关系。

### Failure Lab：错误 Key

主动制造列表重排后的状态错位，用运行结果建立：

```text
Key
→ Identity
→ Reconciliation
→ State Preservation
```

---

## 综合实践 11-A：React Product Catalog

仅使用截至当前位置已经学过的 Component、JSX、Props、Children、Conditional、List、Key 和 CSS 完成商品目录。

禁止提前使用 State Manager、Router、Query、Effect 等未来 Module 能力。

---

# Module 11.09：React Event System

学习 Event Handler、Function Reference、SyntheticEvent、nativeEvent、Capture/Bubble、target/currentTarget、preventDefault、stopPropagation、Keyboard、Pointer、Input、Composition、Event Delegation 和 Event Priority 前置模型。

---

# Module 11.10：State 与 useState 一次学透

学习 State 为什么存在、普通变量为什么不能驱动 UI、Hook、useState、Lazy Initialization、Setter、Object.is、Object/Array State、Immutable Update、Same-value Update、State 生命周期和 Hook Storage 心智模型。

---

# Module 11.11：Render Snapshot、Update Queue 与 Batching

通过连续 setState 实验学习 Render Snapshot、Closure、Update Queue、Replace Update、Functional Updater、Batching、Scheduling、Event Boundary、Async Callback 和 Stale State。

必须能解释：

```tsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

为什么不会被简单理解成三次普通变量赋值。

---

# Module 11.12：Object / Array State 与不可变更新

学习 Reference、Shallow Copy、Nested Update、Normalization、Immutable、Mutation、Immer 类方案的取舍以及 State Shape 对维护和 Render 的影响。

---

# Module 11.13：Component Identity 与 State Preservation

学习 Tree Position、Component Type、Key、Same/Different Position、State Preserve/Reset、Conditional Tree、Tabs、Form、Modal、Hidden UI，并为 Activity 建立前置模型。

---

# Module 11.14：State Modeling 与 Ownership

学习 Minimal、Derived、Redundant、Duplicate、Impossible、Normalized、Local、Shared、URL、Server、Persistent State，State Ownership、Lift State、Controlled State 和 Single Source of Truth。

必须回答：什么数据根本不应该进入 React State？

---

# Module 11.15：React Form 完整体系

学习 input、textarea、select、checkbox、radio、file、Controlled/Uncontrolled、value/defaultValue、checked/defaultChecked、IME、Selection、同步/异步 Validation、Server Error、Dynamic Field、Field Array、Draft、Autosave、大型表单性能和 A11Y。

---

## 综合实践 11-B：Order Editor

组合 Component、Props、State、Event、List/Key、Form 和 Validation，完成动态订单项、编辑、删除、金额计算、Reset、Dirty State 和 Error State。

---

# Module 11.16：useReducer 与复杂状态

学习 Reducer、State、Action、Dispatch、Pure Reducer、Initializer、Action Modeling、Domain Event、Reducer Composition、Undo/Redo、Reducer Test 和 State Machine 思想。

---

# Module 11.17：Context 一次学透

学习 createContext、Provider、最近 Provider、Default Value、Value Identity、Update Propagation、Context Splitting、Dependency Injection、Context + Reducer、性能和滥用边界。

---

# Module 11.18：React State Architecture

比较 useState、useReducer、Context、Redux Toolkit、Zustand、Jotai、State Machine、URL State、External Store 和 Server Cache，重点建立 State Type → Ownership → Lifecycle → Storage Position 的选择模型。

---

## 综合实践 11-C：Multi-step Order Workflow

把 Order Editor 演进为多步骤业务工作流，使用 Reducer、Context、State Modeling、Undo/Redo、Draft 和状态机式边界。

---

# Module 11.19：Ref 一次学透

学习 useRef、ref.current、State vs Ref、DOM Ref、Callback Ref、Timer、Previous Value、Focus、Measurement、Scroll、Selection、Third-party Widget 和 Ref Lifecycle。

---

# Module 11.20：Imperative API 与 useImperativeHandle

学习 Imperative Escape Hatch、Ref Exposure、Minimal Imperative API、Modal、Editor、Video、Canvas、Chart、Map，以及什么情况下不应该暴露 Imperative API。

---

# Module 11.21：useEffect 一次学透

完整学习 Effect 为什么存在、External Synchronization、setup/cleanup、dependency、Object.is、StrictMode、Subscription、Timer、WebSocket、Third-party Library、Network Request、AbortController、Stale Closure、Race、Infinite Effect、Object/Function Dependency、Unmount、Passive Effect、Render/Commit 与 Fiber Effect 模型。

---

# Module 11.22：Removing Effects

学习 Derived State、Calculate During Render、Event Logic、Reset with Key、External Store、Query Cache、State Machine 和 Effect Anti-pattern，形成“看到 Effect 先问能否删除”的判断习惯。

---

# Module 11.23：useEffectEvent

学习 Reactive Logic、Non-reactive Logic、Latest Props/State、Effect 内事件、Timer、Connection、Listener、Dependency Semantics，以及为什么不能用它逃避合法依赖。

---

# Module 11.24：useLayoutEffect / useInsertionEffect

学习 Commit Timing、Browser Layout、Paint、DOM Measurement、Visual Flicker、Tooltip、Synchronous Update、CSS-in-JS 和 Performance Cost。

---

## Failure Lab 11-D：Effect Hell

主动制造 Infinite Effect、Repeated Subscription、Stale Closure、Race Condition、Missing Cleanup、Object Dependency、Function Dependency 和 Request After Unmount，完成正常基线→故障→证据→根因→修复→回归闭环。

---

# Module 11.25：Custom Hook 一次学透

学习 Logic Reuse、Naming、Hook Composition、State Isolation、Lifecycle、Dependency、Return API、Tuple vs Object、Error、SSR、Testability、useDebugValue、Library Hook 和 Versioning。

---

# Module 11.26：useSyncExternalStore

学习 External Mutable Store、subscribe、getSnapshot、getServerSnapshot、Tearing、Concurrency、SSR、Browser Online State、LocalStorage Store 和第三方状态库契约。

---

# Module 11.27：Router 完整体系

以 React Router 为代表学习 URL、History、Route Tree、Layout、Nested Route、Dynamic Params、Search Params、Navigation、Deep Link、Error Route、Lazy Route、Scroll Restore、Permission Route 和 URL State。

---

# Module 11.28：Data Router 与 Route Architecture

学习 Loader、Action、Pending、Redirect、Error、Revalidation、Route Data、Nested Loading、Mutation、Route-level Code Split 和 Auth Boundary。

---

# Module 11.29：Server State 完整模型

严格区分 Client State 与 Server State，学习 Cache、Stale、GC、Query Key、Dedup、Retry、Refetch、Invalidation、Mutation、Pagination、Infinite Data、Prefetch、Offline 和 Optimistic Update。

---

# Module 11.30：TanStack Query 生产级使用

学习 Query Key Design、staleTime、GC、Query Function、Cancellation、Mutation、Invalidation、Optimistic、Prefetch、SSR、Hydration、Persistence、Offline、DevTools 和 Architecture Boundary。

---

# Module 11.31：API Client 与 React 数据边界

学习 Fetch Abstraction、Abort、Runtime Validation、DTO、Domain Model、Error Model、Trace ID、Authentication、Retry、Pagination、Schema 和 OpenAPI Client。

---

## 综合实践 11-E：React Enterprise SPA

自然组合 Router、Reducer/Context、Form、Query、API Client、Error、Permission UI 和 URL State，形成完整企业 SPA。

---

# Module 11.32：React Actions

学习 Action、form action、Async Action、Pending、Validation、Error、Transition Integration 和 Progressive Enhancement。

---

# Module 11.33：useActionState / useFormStatus

学习 Action State、Previous State、Pending、Form Context、Server Error、Queued Action 和 Form UX。

---

# Module 11.34：useOptimistic

学习 Optimistic State、Pending、Commit、Rollback、Server Reject、Concurrent Optimistic Operations、Ordering、Duplicate Submission 和 Idempotency。

---

# Module 11.35：Concurrent Rendering Mental Model

彻底理解 Concurrency ≠ Parallelism、Interruptible Rendering、Restart、Urgent/Non-urgent、Commit Atomicity、Background Rendering、Purity、Scheduler 和 Lane 前置模型。

---

# Module 11.36：Transition

学习 startTransition、useTransition、Pending、Interruption、Actions、Async Transition、Navigation、Ordering、Input Restriction 和 Fallback Control。

---

# Module 11.37：useDeferredValue

学习 Deferred Render、Stale UI、Search、Expensive Tree、Suspense、Transition vs Deferred、Debounce vs Deferred 和 Performance Measurement。

---

# Module 11.38：Suspense 一次学透

学习 Suspend、Boundary、Fallback、Nested Boundary、Reveal、Error、Retry、Lazy、Data、Router、Streaming、Transition、Waterfall 和 Boundary Architecture。

---

# Module 11.39：use()

学习 Promise、Context Resource、Suspense、Rejection、Error Boundary、Conditional use 和 Server-created Promise → Client Consumption。

---

# Module 11.40：Activity

学习 visible/hidden、State Preservation、Effect Lifecycle、Background Priority、Prerender、Tabs、Likely Navigation、Suspense Integration 和 Performance Cost。

---

## 综合实践 11-F：High-interaction Data Workbench

加入 Query、Optimistic UI、Suspense、Transition、Deferred Value、Activity、Search、Large List 和 Async Mutation。

---

# Module 11.41：React DevTools Profiler 与 Performance Track

学习 Render、Commit、Flamegraph、Ranked、Render Cause、React Performance Track、Browser Performance、CPU Throttle 和 User Timing。

---

# Module 11.42：React Render Performance

学习 Render Propagation、State Locality、Props Identity、Context Diffusion、Selector、Virtualization、Component Split、Expensive Computation、Long Task 和 INP。

---

# Module 11.43：Memoization

学习 memo、useMemo、useCallback、Equality、Dependency、Wrong Optimization、Memo Cost 和什么时候不该 Memoize。

---

# Module 11.44：React Compiler

学习 Compiler 为什么存在、Automatic Memoization、Rules of React、Build Integration、Compilation Result、Diagnostics、Bailout、`"use memo"`、`"use no memo"`、Incremental Adoption、Library Compilation、Manual Memo Compatibility、Migration 和 Benchmark。

---

## Performance Lab 11-G

主动制造 Context Render Storm、Large List、Expensive Render、Long Task、Bad Memo 和 Memory Retention，使用 Profiler、Browser Performance 和 Memory 证据验证优化。

---

# Module 11.45：React DOM Integration

学习 DOM Props、Attribute/Property、HTML/SVG、Controlled Native Element、Custom Element、Browser API Boundary 和 flushSync 的风险与使用边界。

---

# Module 11.46：Portal

学习 React Tree ≠ DOM Tree，覆盖 Modal、Overlay、Tooltip、Context、Event Bubble、Focus、Stacking Context 和 A11Y。

---

# Module 11.47：Resource Loading / Metadata

学习 preconnect、preload、preinit、Module Preload、Stylesheet、Script、Font、Title、Meta 与 SSR/Streaming 的关系。

---

# Module 11.48：React Error Model

学习 Render Error、Event Error、Async Error、Resource Error、Error Boundary、Nested Boundary、Reset、Root Error Callback、Suspense Interaction 和 Production Error UI。

---

# Module 11.49：React-specific Accessibility

聚焦 React 特有的 Focus Management、Portal、Modal、Suspense Loading、Route Navigation、Dynamic Content、Live Region、Virtual List、useId 和 SSR ID Consistency。

---

# Module 11.50：React-specific Security

聚焦 React Escaping、XSS、dangerouslySetInnerHTML、Sanitizer、Markdown、Rich Text、URL Security、SSR Injection、Hydration Payload、RSC Data Leak、Server Function Authorization 和 Client Permission ≠ Authorization。

---

# Module 11.51：React Debugging & Failure Model

建立 React 故障库：Wrong Key、Infinite Render、Infinite Effect、Stale Closure、Race、Context Storm、Chunk Load Failure、Hydration Mismatch、Suspense Waterfall、Memory Leak 和 Server Function Failure。

---

# Module 11.52：React Testing Integration

只学习 React-specific 测试整合：Component Behavior、User-centric Test、Hook Boundary、Context、Router、Query、Suspense、Error Boundary、Async UI 和 Fake Timer；完整质量体系归后续 Testing Stage 统一深化。

---

# Module 11.53：SSR Mental Model

不依赖 Next.js 黑盒，学习 react-dom/server、Server Render、HTML、Node/Web Stream、Shell、Error、Abort、SEO 和 TTFB。

---

# Module 11.54：Hydration 一次学透

学习 Existing HTML、hydrateRoot、DOM Identity、Event Attachment、Client State、Mismatch、Date/Random、Locale、Browser-only API、useId、Recoverable Error 和 Performance Debug。

---

# Module 11.55：Streaming SSR

学习 Suspense Boundary、Shell、Chunk、Reveal、Bootstrap、Backpressure、Abort、Proxy Buffering、Crawler 和 Failure。

---

# Module 11.56：Static Rendering / Prerender / Resume

学习 prerender、Static HTML、Hydration、CDN、Partial Prerender、Postponed State、Resume、Cache 和 Deployment Boundary。

---

## 综合实践 11-H：从零构建 React SSR App

必须真正观察 Server HTML → Browser Visible → hydrateRoot → React 接管，并主动制造 Hydration Mismatch、Abort 和 Streaming Boundary 故障。

---

# Module 11.57：RSC Mental Model

彻底区分 Client Component、Server Component、SSR、RSC 和 Server Function，理解 Server Component 的运行位置、Bundle/Data Boundary、Build-time 与 Request-time 行为。

---

# Module 11.58：Server / Client Boundary

学习 `"use client"`、Module Graph、Serialization、Props Boundary、Browser API、Context、Event、Bundle 和 Boundary Placement。

---

# Module 11.59：Server Functions

学习 `"use server"`、Client Reference、Server Execution、Arguments、Result、Action、Validation、Authorization、Error 和 Mutation。

---

# Module 11.60：RSC + Suspense + use()

建立 Server → Promise/Data → RSC Stream → Client → use() → Suspense 的完整模型。

---

# Module 11.61：RSC Data / Cache Architecture

学习 DB Access、Service Layer、Cache、Auth、Tenant、Invalidation、N+1、Waterfall、Serialization、Data Leak 和 Observability。

---

## 综合实践 11-I：Full-stack React Runtime Lab

不是 Next.js 教程，目标是理解 SSR、RSC、Client Component、Server Function、Streaming 和 Hydration 之间真实运行边界。

---

# Module 11.62：React 源码研究方法

学习固定 React Version/Commit、Build、Test、Fixture、Minimal Reproduction、Source Map、Breakpoint、Call Stack、Object Snapshot、Hypothesis 和 Verification。

---

# Module 11.63：Fiber 一次学透

学习 Fiber 存在原因、Fiber Node、child/sibling/return/alternate、flags、lanes、memoizedProps、memoizedState、updateQueue、current 和 workInProgress。

---

# Module 11.64：Reconciler

学习 Element → Fiber、beginWork、completeWork、Child Reconciliation、Key、Placement、Delete、Reuse、Bailout 和 Diff。

---

# Module 11.65：Render / Commit Pipeline

深入 Schedule → Render → beginWork → completeWork → Commit，并继续拆 Mutation、Layout、Ref 和 Passive Effect。

---

# Module 11.66：Hooks Internals

学习 Hook Linked List、Dispatcher、Mount/Update、useState、useReducer、Queue、Pending、Base State、Effect、Dependency 和 Rules Enforcement。

---

# Module 11.67：Update Queue

从 setState → Update → Queue → Lane → Render 跑通状态更新源码路径。

---

# Module 11.68：Lane 与 Scheduler

学习 Priority、Lane、Pending、Suspended、Ping、Entangle、Transition Lane、Sync、Interrupt、Starvation 和 Scheduler。

---

# Module 11.69：Suspense / Activity Internals

学习 Suspension、Boundary、Retry、Ping、Fallback、Hidden Tree、Activity 和 Transition 的内部连接关系。

---

# Module 11.70：Server Renderer / Hydration / RSC Internals

专家级学习 Segment、Boundary、Stream、Hydration、Event Replay、RSC Payload、Client/Server Reference 和 Framework/Bundler Integration。

---

## Source Lab 11-J：一次 State Update 如何走到 DOM Commit

从事件触发 setState 开始，断点跟踪 Dispatch → Update Queue → Lane → Schedule → Render → Reconciliation → Commit → DOM Mutation，提交完整调用路径和关键对象快照。

---

# Module 11.71：React Library Authoring

学习 Public API、Entry、Exports、Types、ESM、Peer Dependency、React Singleton、Tree Shaking、SSR、RSC、Compiler、Source Map、Package Testing 和 Versioning。

---

# Module 11.72：React Headless Component Architecture

学习 State、Behavior、DOM、A11Y、Style Separation、Controlled API、Composition、Portal、Focus 和 Adapter；Design System 的组织级治理留到 UI Engineering Stage 深化。

---

# Module 11.73：Large-scale React Application Architecture

学习 Feature、Domain、Layer、Module、Public API、Dependency、DTO、Domain Model、ViewModel、Infrastructure、Route Owner、State Owner、Async Boundary、Error Boundary 和 Architecture Fitness Function。

---

# Module 11.74：React 在 Microfrontend 中的边界

只学习 React-specific 问题：Multiple Roots、Shared React、Singleton、Context Boundary、Router Boundary、React Version Conflict 和 Error Isolation；完整 Microfrontend Architecture 在后续架构 Stage 统一学习。

---

# Module 11.75：Legacy React

必须能够维护 React 15/16/17/18、Class Component、Lifecycle、Legacy Context、HOC、Render Props、Old Redux、Old Router、CRA、Legacy Webpack 和 Enzyme。

---

# Module 11.76：React Migration

学习 Class→Function、Legacy Context→Context、Old Root→createRoot、Old Hydrate→hydrateRoot、Old SSR→Streaming、React 18→19、Manual Memo→Compiler、SPA→SSR/RSC、Codemod、Feature Flag、Canary 和 Rollback。

---

# Module 11.77：React Upgrade Governance

学习 Stable/Canary/Experimental、SemVer、Security Advisory、Dependency Compatibility、Compiler Compatibility、Framework Compatibility、Pilot、Upgrade Matrix、Rollback 和 Exception。

---

# Module 11.78：React Architecture Review

最终能够系统评审 State、Effect、Component API、Context、Router、Server State、Suspense Boundary、Transition、SSR/RSC Boundary、Server Function Authorization、Render/Bundle/Memory、Compiler、Error Isolation 和 Migration Strategy。

---

# 4. Stage 11 最终综合项目：React Enterprise Platform

最终项目沿前面的 Enterprise SPA / Workbench 自然演进，不单独开启另一条项目路线。

至少包含：

- React 19.2.x + TypeScript；
- Component Architecture；
- Complex State；
- Router；
- Complex Form；
- Server State / Query Cache；
- Actions / useActionState / useOptimistic；
- Suspense / Transition / Deferred Value / Activity；
- Error Boundary；
- React-specific A11Y / i18n；
- Profiler / Performance；
- React Compiler；
- SSR / Streaming / Hydration；
- RSC / Server Functions；
- React Library Package；
- Observability Integration；
- Security Boundary；
- Legacy/Migration Plan。

必须主动制造并处理至少：

- Wrong Key；
- Stale Closure；
- Infinite Effect；
- Effect Race；
- Context Render Storm；
- Slow Render / INP；
- Memory Leak；
- Chunk Load Failure；
- Hydration Mismatch；
- Suspense Waterfall；
- Unauthorized Server Function；
- RSC Data Leak Risk。

最终证据至少包括：

- 可运行源码；
- React DevTools 记录；
- Profiler；
- Browser Performance Trace；
- Network；
- Heap Snapshot；
- Component Tree；
- State Diagram；
- Render/Commit 图；
- SSR/Hydration 时序图；
- RSC Boundary 图；
- Fiber Source Debug 记录；
- Performance Report；
- Failure Report；
- Architecture ADR；
- Migration Plan。

---

# 5. Stage 11 阶段验收

完成 Stage 11 后，学习者必须能够：

1. 从空目录建立 React + TypeScript 项目并解释完整启动链路；
2. 不混淆 JSX、React Element、Component、React Tree、Fiber 和 DOM Node；
3. 一次性解释 State、Snapshot、Update Queue、Batching、Identity 和 Reconciliation；
4. 设计复杂 State / Form / Router / Server State 边界；
5. 判断 Effect 是否真正必要，并复现/修复 Effect 常见故障；
6. 使用 Suspense、Transition、Activity、Actions 和 Optimistic UI 构建高交互应用；
7. 使用 Profiler、Browser Performance、Heap 等证据分析 React 性能；
8. 配置并验证 React Compiler；
9. 不依赖 Next.js 黑盒解释 SSR、Hydration、Streaming、Static Rendering；
10. 准确解释 RSC、Client Component、Server Function 和序列化/安全边界；
11. 用源码断点跟踪一次 State Update 到 DOM Commit；
12. 解释 Fiber、Reconciler、Hooks、Lane、Scheduler、Suspense 的核心内部模型；
13. 发布或设计可消费 React Library / Headless Component；
14. 维护 Legacy React，并设计 React 18→19 或 SPA→SSR/RSC 的迁移方案；
15. 对大型 React 系统进行状态、性能、安全、服务端边界和升级治理评审。

---

# 6. 后续 Lesson 拆分规则

上述 78 个 Module 是 Stage 11 的 Owner Module Map，不是最终 Lesson 数量。

例如 `Module 11.21：useEffect` 后续可以拆成：

```text
RE-EFFECT-KP001 为什么需要 Effect？
RE-EFFECT-KP002 第一个外部系统同步 Effect
RE-EFFECT-KP003 Dependency 如何决定重同步？
RE-EFFECT-KP004 Cleanup 为什么存在？
RE-EFFECT-KP005 StrictMode 为什么重复验证 Effect？
RE-EFFECT-KP006 Stale Closure 如何形成？
RE-EFFECT-KP007 Race Condition 如何出现？
RE-EFFECT-KP008 AbortController 如何取消异步工作？
RE-EFFECT-KP009 Object Dependency 为什么导致重复执行？
RE-EFFECT-KP010 Function Dependency 如何处理？
RE-EFFECT-KP011 Infinite Effect 如何定位？
RE-EFFECT-KP012 Effect Scheduling 与 Commit
RE-EFFECT-KP013 Passive Effect 源码 Debug
RE-EFFECT-KP014 Effect-heavy Architecture Review
```

但禁止未来创建 `React Effect 高级篇 / 源码篇 / 性能篇` 来补课。

每个 Lesson 必须遵循：

```text
一个主问题
+ 从零或明确复制起点
+ 精确到目录 / 文件 / 修改位置
+ 可运行立即运行
+ 真实观察证据
+ 即时理论解释
+ Wrong Way / Failure（适用时）
+ 当前 Lesson 独立最终源码
```

---

# 7. Stage 11 学习路径摘要

```text
React Problem Domain
↓
从空目录创建 React
↓
Root / JSX / Element / Component / Props
↓
List / Key
↓
Product Catalog
↓
Event / State / Snapshot / Form
↓
Order Editor
↓
State Modeling / Reducer / Context
↓
Multi-step Workflow
↓
Ref / Effect / Removing Effects / Custom Hook
↓
Effect Failure Lab
↓
Router / Server State / Query / API Client
↓
React Enterprise SPA
↓
Actions / Optimistic
↓
Concurrency / Transition / Suspense / Activity
↓
High-interaction Workbench
↓
Profiler / Performance / Compiler
↓
Performance Lab
↓
React DOM / Error / A11Y / Security / Testing Integration
↓
SSR / Hydration / Streaming / Static Rendering
↓
React SSR App
↓
RSC / Server Functions / Cache Boundary
↓
Full-stack React Runtime Lab
↓
Fiber / Reconciler / Hooks / Lane / Scheduler
↓
Source Lab：State Update → DOM Commit
↓
Library / Headless / Large-scale Architecture
↓
Legacy / Migration / Upgrade Governance
↓
React Enterprise Platform
↓
Architecture Review
```
