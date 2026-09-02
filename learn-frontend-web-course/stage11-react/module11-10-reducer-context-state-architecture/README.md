# Module 11.10：Reducer、Context 与 State Architecture

> [← Module 11.09：React Form 完整体系](../module11-09-form/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.11：Ref 与 Imperative Escape Hatches →](../module11-11-ref-imperative/README.md)

本 Module 从“多个 Setter 难以表达一次业务变化”出发，完整学习 Reducer、Action、Dispatch、Initializer、测试、Undo/Redo 和 State Machine 前置。重点是业务状态转换，而不是把 useReducer 当 Redux 的简化版。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（54 课）</strong></summary>

- [RE-REDUCER-001：什么时候多个 useState 开始不够表达问题](#lesson-re-reducer-001)
- [RE-REDUCER-002：Reducer 的最小模型](#lesson-re-reducer-002)
- [RE-REDUCER-003：Action 应该描述“怎么改”还是“发生了什么”](#lesson-re-reducer-003)
- [RE-REDUCER-004：Dispatch 到底做了什么](#lesson-re-reducer-004)
- [RE-REDUCER-005：Reducer 为什么必须是 Pure Function](#lesson-re-reducer-005)
- [RE-REDUCER-006：Initializer 什么时候比直接 initialState 更好](#lesson-re-reducer-006)
- [RE-REDUCER-007：复杂 Reducer 如何避免一个巨大 switch](#lesson-re-reducer-007)
- [RE-REDUCER-008：Reducer 与 Immutable Update 如何结合](#lesson-re-reducer-008)
- [RE-REDUCER-009：用最小断言验证 Reducer 为什么特别有价值](#lesson-re-reducer-009)
- [RE-REDUCER-010：Undo / Redo 的本质是什么](#lesson-re-reducer-010)
- [RE-REDUCER-011：Reducer 如何表达 Impossible State](#lesson-re-reducer-011)
- [RE-REDUCER-012：Reducer 与 State Machine 有什么关系](#lesson-re-reducer-012)
- [RE-REDUCER-013：什么时候不应该使用 useReducer](#lesson-re-reducer-013)
- [RE-REDUCER-014：把 Order Editor 的核心编辑逻辑重构为 Reducer](#lesson-re-reducer-014)
- [RE-REDUCER-015：Reducer Source Connection——Dispatch/Queue 先看到哪里](#lesson-re-reducer-015)
- [RE-CONTEXT-001：Prop Drilling 什么时候真的成为问题](#lesson-re-context-001)
- [RE-CONTEXT-002：第一个 createContext / Provider / useContext](#lesson-re-context-002)
- [RE-CONTEXT-003：Default Value 到底什么时候会生效](#lesson-re-context-003)
- [RE-CONTEXT-004：Nested Provider 为什么是作用域而不是全局变量](#lesson-re-context-004)
- [RE-CONTEXT-005：Context Value 更新时哪些 Consumer 会重新 Render](#lesson-re-context-005)
- [RE-CONTEXT-006：Value Identity 为什么会造成无意义传播](#lesson-re-context-006)
- [RE-CONTEXT-007：把 State 与 Dispatch 放在一个 Context 还是拆开](#lesson-re-context-007)
- [RE-CONTEXT-008：Context + Reducer 如何形成局部业务 Store](#lesson-re-context-008)
- [RE-CONTEXT-009：Context 适合 Dependency Injection 吗](#lesson-re-context-009)
- [RE-CONTEXT-010：Context 为什么不是完整 State Manager](#lesson-re-context-010)
- [RE-CONTEXT-011：Context Selector / External Store 为什么会出现](#lesson-re-context-011)
- [RE-CONTEXT-012：Provider 放太高会带来什么架构问题](#lesson-re-context-012)
- [RE-CONTEXT-013：如何让依赖 Context 的组件保持可测试性](#lesson-re-context-013)
- [RE-CONTEXT-014：Context 故障综合——缺 Provider、Value 抖动、巨大 Context](#lesson-re-context-014)
- [RE-CONTEXT-015：把 Multi-step Order Workflow 的共享依赖迁入 Context](#lesson-re-context-015)
- [RE-STATEARCH-001：先建立 React 应用中的 State Taxonomy](#lesson-re-statearch-001)
- [RE-STATEARCH-002：useState 适合解决哪一类 State](#lesson-re-statearch-002)
- [RE-STATEARCH-003：useReducer 适合解决哪一类 State](#lesson-re-statearch-003)
- [RE-STATEARCH-004：Context 适合解决哪一类依赖](#lesson-re-statearch-004)
- [RE-STATEARCH-005：URL State 为什么应该交给 Router / URL](#lesson-re-statearch-005)
- [RE-STATEARCH-006：Server State 为什么应该交给 Query Cache](#lesson-re-statearch-006)
- [RE-STATEARCH-007：什么时候架构上需要 External Store，而不是继续扩 Context / Reducer](#lesson-re-statearch-007)
- [RE-STATEARCH-008：Redux Toolkit 的核心价值到底是什么](#lesson-re-statearch-008)
- [RE-STATEARCH-009：Zustand 的核心取舍是什么](#lesson-re-statearch-009)
- [RE-STATEARCH-010：Jotai / Atomic State 的核心取舍是什么](#lesson-re-statearch-010)
- [RE-STATEARCH-011：State Machine / XState 类方案什么时候值得引入](#lesson-re-statearch-011)
- [RE-STATEARCH-012：一个应用可以同时使用多种 State 方案吗](#lesson-re-statearch-012)
- [RE-STATEARCH-013：如何避免 Global Store 变成业务垃圾桶](#lesson-re-statearch-013)
- [RE-STATEARCH-014：状态架构如何影响 Render Performance](#lesson-re-statearch-014)
- [RE-STATEARCH-015：状态持久化要解决哪些额外问题](#lesson-re-statearch-015)
- [RE-STATEARCH-016：状态调试与可观测应该记录什么](#lesson-re-statearch-016)
- [RE-STATEARCH-017：状态方案选型矩阵怎么做](#lesson-re-statearch-017)
- [RE-STATEARCH-018：综合项目——Multi-step Order Workflow 需求与 State 分类](#lesson-re-statearch-018)
- [RE-STATEARCH-019：综合项目——设计 Workflow State Machine / Reducer](#lesson-re-statearch-019)
- [RE-STATEARCH-020：综合项目——划分 Local State、Context、URL 与未来 Server State 边界](#lesson-re-statearch-020)
- [RE-STATEARCH-021：综合项目——实现多步骤导航、草稿与 Undo/Redo](#lesson-re-statearch-021)
- [RE-STATEARCH-022：综合项目——制造状态架构反模式再重构](#lesson-re-statearch-022)
- [RE-STATEARCH-024：综合项目——输出 State Architecture ADR](#lesson-re-statearch-024)
- [RE-STATEARCH-025：综合项目——完整验收 Multi-step Order Workflow](#lesson-re-statearch-025)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-reducer-001"></a>
### Lesson RE-REDUCER-001：什么时候多个 useState 开始不够表达问题

用复杂订单编辑状态观察“一个用户动作触发多处 Setter”的维护问题，引出把状态转换集中表达的需要。

<a id="lesson-re-reducer-002"></a>
### Lesson RE-REDUCER-002：Reducer 的最小模型

实现 `(state, action) => nextState`，先脱离 React 写纯函数，再接入 `useReducer`。

<a id="lesson-re-reducer-003"></a>
### Lesson RE-REDUCER-003：Action 应该描述“怎么改”还是“发生了什么”

比较 `SET_FIELD`、`INCREMENT` 与 `ITEM_ADDED/ORDER_SUBMITTED` 的语义，建立 Action Modeling。

<a id="lesson-re-reducer-004"></a>
### Lesson RE-REDUCER-004：Dispatch 到底做了什么

从 event handler dispatch action 到 React 调用 reducer 产生 next state，建立完整行为链。

<a id="lesson-re-reducer-005"></a>
### Lesson RE-REDUCER-005：Reducer 为什么必须是 Pure Function

主动在 reducer 中请求网络、读时间或修改外部对象，观察可测试性和 StrictMode 问题。

<a id="lesson-re-reducer-006"></a>
### Lesson RE-REDUCER-006：Initializer 什么时候比直接 initialState 更好

学习第三参数初始化、Props 输入和昂贵初始化，并比较重置状态策略。

<a id="lesson-re-reducer-007"></a>
### Lesson RE-REDUCER-007：复杂 Reducer 如何避免一个巨大 switch

讨论 action grouping、domain function、sub-reducer、state machine，而不是机械拆文件。

<a id="lesson-re-reducer-008"></a>
### Lesson RE-REDUCER-008：Reducer 与 Immutable Update 如何结合

处理 nested order state，并比较手工 structural sharing 与 Immer reducer。

<a id="lesson-re-reducer-009"></a>
### Lesson RE-REDUCER-009：用最小断言验证 Reducer 为什么特别有价值

不渲染 React，使用课程提供的最小断言脚本对 action sequence 验证 state transition，建立“纯业务转换可独立验证”的能力；测试框架本身不是本课知识。
<a id="lesson-re-reducer-010"></a>
### Lesson RE-REDUCER-010：Undo / Redo 的本质是什么

通过 past/present/future 或 command history 实现可撤销编辑，理解历史 State 与普通业务 State 的区别。

<a id="lesson-re-reducer-011"></a>
### Lesson RE-REDUCER-011：Reducer 如何表达 Impossible State

把多个 boolean 重构为 discriminated state/action，使非法状态更难产生。

<a id="lesson-re-reducer-012"></a>
### Lesson RE-REDUCER-012：Reducer 与 State Machine 有什么关系

比较 reducer 的任意 transition 与显式 state/event transition table，为后续复杂流程架构建立前置。

<a id="lesson-re-reducer-013"></a>
### Lesson RE-REDUCER-013：什么时候不应该使用 useReducer

比较简单 toggle、独立 fields、Server State 和 URL State，避免“复杂项目一律 reducer”。

<a id="lesson-re-reducer-014"></a>
### Lesson RE-REDUCER-014：把 Order Editor 的核心编辑逻辑重构为 Reducer

保留 UI 行为不变，把多处业务 Setter 收敛为 Action / Reducer，并继续使用本 Module 的最小断言脚本证明 state transition 行为一致。
<a id="lesson-re-reducer-015"></a>
### Lesson RE-REDUCER-015：Reducer Source Connection——Dispatch/Queue 先看到哪里

只建立 `dispatch → update queue → next render` 的源码入口地图，完整 Hooks Internals 后续验证。

---

本 Module 解决跨层级依赖传递，但必须同时讲清 Context 的更新传播、Value Identity、性能和滥用边界。目标不是“不会传 Props 就上 Context”。

<a id="lesson-re-context-001"></a>
### Lesson RE-CONTEXT-001：Prop Drilling 什么时候真的成为问题

从多层组件传递 theme/current user/order actions 的例子判断哪些只是正常显式依赖，哪些适合 Context。

<a id="lesson-re-context-002"></a>
### Lesson RE-CONTEXT-002：第一个 createContext / Provider / useContext

建立 Provider 提供值、后代消费最近值的最小模型。

<a id="lesson-re-context-003"></a>
### Lesson RE-CONTEXT-003：Default Value 到底什么时候会生效

移除 Provider、传 undefined/null，观察 default value 行为，避免把它误认为运行时 fallback。

<a id="lesson-re-context-004"></a>
### Lesson RE-CONTEXT-004：Nested Provider 为什么是作用域而不是全局变量

使用嵌套 Theme / Locale Provider 观察最近 Provider 覆盖，建立 scope 模型。

<a id="lesson-re-context-005"></a>
### Lesson RE-CONTEXT-005：Context Value 更新时哪些 Consumer 会重新 Render

通过多个 consumer 记录 Render，理解 Context update propagation 的高层行为。

<a id="lesson-re-context-006"></a>
### Lesson RE-CONTEXT-006：Value Identity 为什么会造成无意义传播

把 Provider value 写成每次新对象，观察 Consumer Render，为 Memoization/Context Split 建立前置。

<a id="lesson-re-context-007"></a>
### Lesson RE-CONTEXT-007：把 State 与 Dispatch 放在一个 Context 还是拆开

比较单 Context 与 State/Dispatch 分离，分析读取频率、API 和 Render 范围。

<a id="lesson-re-context-008"></a>
### Lesson RE-CONTEXT-008：Context + Reducer 如何形成局部业务 Store

把 Order Reducer 放入 Context，让深层组件消费 state/dispatch，同时保持明确 Provider Boundary。

<a id="lesson-re-context-009"></a>
### Lesson RE-CONTEXT-009：Context 适合 Dependency Injection 吗

用 API client、feature flag、runtime config 等稳定依赖讨论 Context 作为 dependency boundary 的价值。

<a id="lesson-re-context-010"></a>
### Lesson RE-CONTEXT-010：Context 为什么不是完整 State Manager

讨论 selector、middleware、devtools、persistence、server state 等需求，认识 Context 的能力边界。

<a id="lesson-re-context-011"></a>
### Lesson RE-CONTEXT-011：Context Selector / External Store 为什么会出现

从“大 Context 任意字段变化导致所有 consumer 受影响”的问题，引出 selector/store 方案，但不提前深入第三方库。

<a id="lesson-re-context-012"></a>
### Lesson RE-CONTEXT-012：Provider 放太高会带来什么架构问题

观察全 App Provider Stack、隐式依赖、测试困难，学习将 Provider 收敛到 Feature/Route Boundary。

<a id="lesson-re-context-013"></a>
### Lesson RE-CONTEXT-013：如何让依赖 Context 的组件保持可测试性

通过缩小 Provider Boundary、显式 dependency 和可替换默认依赖设计可验证组件；真正的 Provider wrapper / React 自动化测试实现统一留到 Module 11.23。
<a id="lesson-re-context-014"></a>
### Lesson RE-CONTEXT-014：Context 故障综合——缺 Provider、Value 抖动、巨大 Context

主动制造三类实际问题并用 DevTools / Render Log 诊断。

<a id="lesson-re-context-015"></a>
### Lesson RE-CONTEXT-015：把 Multi-step Order Workflow 的共享依赖迁入 Context

只迁移真正跨层级共享的 workflow state/dispatch/config，保留应当局部化的 UI State。

---

本 Module 是前面 State / Modeling / Reducer / Context 的第一次架构收束。它不把 Redux Toolkit、Zustand、Jotai 教成 API 大全，而是通过同一组真实问题比较 State Ownership、生命周期、订阅粒度、DevTools、Persistence、Server State 和 URL State，形成技术选型能力，并完成 Multi-step Order Workflow 综合项目。

<a id="lesson-re-statearch-001"></a>
### Lesson RE-STATEARCH-001：先建立 React 应用中的 State Taxonomy

把真实应用状态分类为 Local UI、Shared Client、URL、Server、Persistent、External Mutable、Workflow State，明确分类依据是 ownership/lifecycle 而不是“全局/局部”两个词。

<a id="lesson-re-statearch-002"></a>
### Lesson RE-STATEARCH-002：useState 适合解决哪一类 State

总结 colocation、简单生命周期、组件私有状态的优势和边界。

<a id="lesson-re-statearch-003"></a>
### Lesson RE-STATEARCH-003：useReducer 适合解决哪一类 State

总结 complex transition、action log、testability、workflow 的优势与成本。

<a id="lesson-re-statearch-004"></a>
### Lesson RE-STATEARCH-004：Context 适合解决哪一类依赖

区分 value distribution 与 state management，明确 Provider Scope 和更新传播成本。

<a id="lesson-re-statearch-005"></a>
### Lesson RE-STATEARCH-005：URL State 为什么应该交给 Router / URL

用 filter/sort/page/tab 案例验证 refresh、share、back/forward 和 deep link，不再复制一份 React State。

<a id="lesson-re-statearch-006"></a>
### Lesson RE-STATEARCH-006：Server State 为什么应该交给 Query Cache

从 remote ownership、stale、dedup、retry、invalidation 解释为什么 Redux/Context 直接存 API response 常常是在重造缓存；具体 TanStack Query 后续再学。

<a id="lesson-re-statearch-007"></a>
### Lesson RE-STATEARCH-007：什么时候架构上需要 External Store，而不是继续扩 Context / Reducer

只从外部所有权、React 外读写、订阅粒度和团队边界判断是否需要 External Store；subscribe/getSnapshot/useSyncExternalStore 契约由 Module 11.13 正式教授。
<a id="lesson-re-statearch-008"></a>
### Lesson RE-STATEARCH-008：Redux Toolkit 的核心价值到底是什么

从 predictable reducer、selector、middleware、devtools、large-team convention、RTK Query 边界做架构级认识，不陷入老 Redux boilerplate。

<a id="lesson-re-statearch-009"></a>
### Lesson RE-STATEARCH-009：Zustand 的核心取舍是什么

从 external store、selector、low ceremony、imperative access、middleware/persist 分析适用与滥用场景。

<a id="lesson-re-statearch-010"></a>
### Lesson RE-STATEARCH-010：Jotai / Atomic State 的核心取舍是什么

从 atom dependency graph、derived atom、fine-grained subscription 比较 centralized store 思路。

<a id="lesson-re-statearch-011"></a>
### Lesson RE-STATEARCH-011：State Machine / XState 类方案什么时候值得引入

从 explicit state/event/guard/effect model 讨论复杂流程、支付/审批/长流程与普通 reducer 的边界。

<a id="lesson-re-statearch-012"></a>
### Lesson RE-STATEARCH-012：一个应用可以同时使用多种 State 方案吗

设计 Local State + URL + Query Cache + Feature Store + Workflow Machine 的合理组合，反对“一库统治所有状态”。

<a id="lesson-re-statearch-013"></a>
### Lesson RE-STATEARCH-013：如何避免 Global Store 变成业务垃圾桶

学习 ownership、feature boundary、public API、selector、write authority 和 state lifecycle review。

<a id="lesson-re-statearch-014"></a>
### Lesson RE-STATEARCH-014：状态架构如何影响 Render Performance

比较 context broadcast、selector subscription、atom dependency、local state，建立性能模型但把实测留到 Performance Module。

<a id="lesson-re-statearch-015"></a>
### Lesson RE-STATEARCH-015：状态持久化要解决哪些额外问题

讨论 storage version、migration、rehydration、partial persistence、sensitive data、multi-tab，而不是简单 `persist: true`。

<a id="lesson-re-statearch-016"></a>
### Lesson RE-STATEARCH-016：状态调试与可观测应该记录什么

比较 action log、state snapshot、query devtools、URL、trace correlation，建立生产诊断意识。

<a id="lesson-re-statearch-017"></a>
### Lesson RE-STATEARCH-017：状态方案选型矩阵怎么做

用规模、数据来源、生命周期、更新频率、团队、调试、SSR、并发兼容、迁移成本形成实际 Trade-off 表。

<a id="lesson-re-statearch-018"></a>
### Lesson RE-STATEARCH-018：综合项目——Multi-step Order Workflow 需求与 State 分类

增加步骤导航、草稿、权限、Undo/Redo、提交状态等需求，先把每份数据分类再决定存放方案。

<a id="lesson-re-statearch-019"></a>
### Lesson RE-STATEARCH-019：综合项目——设计 Workflow State Machine / Reducer

明确 step、event、guard、transition 和 impossible state，保持业务转换可测试。

<a id="lesson-re-statearch-020"></a>
### Lesson RE-STATEARCH-020：综合项目——划分 Local State、Context、URL 与未来 Server State 边界

只使用目前已经学过的能力实现可实现部分，同时给未来 Router/Query Module 留明确接口而不偷用它们。

<a id="lesson-re-statearch-021"></a>
### Lesson RE-STATEARCH-021：综合项目——实现多步骤导航、草稿与 Undo/Redo

完成主要交互并验证切换、回退和当前数据生命周期边界。

<a id="lesson-re-statearch-022"></a>
### Lesson RE-STATEARCH-022：综合项目——制造状态架构反模式再重构

故意做巨大 Context、duplicate derived state、过度 lifting、single giant reducer，再依据 taxonomy 重构。

<a id="lesson-re-statearch-024"></a>
### Lesson RE-STATEARCH-024：综合项目——输出 State Architecture ADR

记录问题、候选方案、Decision、Trade-off、Rejected Alternatives、Migration Boundary 和未来 Router/Query 接入位置。

<a id="lesson-re-statearch-025"></a>
### Lesson RE-STATEARCH-025：综合项目——完整验收 Multi-step Order Workflow

从用户流程、State Ownership、Impossible State、Render 行为、可测试性和生产构建六个维度验收，要求能解释每份 State 为什么在那里。

---

---

> [← Module 11.09：React Form 完整体系](../module11-09-form/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.11：Ref 与 Imperative Escape Hatches →](../module11-11-ref-imperative/README.md)
