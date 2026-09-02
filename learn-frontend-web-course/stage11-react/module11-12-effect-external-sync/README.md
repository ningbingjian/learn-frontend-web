# Module 11.12：Effect 与 External Synchronization

> [← Module 11.11：Ref 与 Imperative Escape Hatches](../module11-11-ref-imperative/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.13：Custom Hook 与 External Store Integration →](../module11-13-custom-hook-external-store/README.md)

Effect 是 React 最容易被误用的能力之一。本 Module 从“与外部系统同步”一路进入 Dependency、Cleanup、StrictMode、Race、Stale Closure、Abort、Passive Effect、SSR 和源码连接，确保后续不需要再开 Effect 高级篇。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（55 课）</strong></summary>

- [RE-EFFECT-001：Effect 真正解决的唯一核心问题是什么](#lesson-re-effect-001)
- [RE-EFFECT-002：第一个 Effect——把 React 状态同步到外部系统](#lesson-re-effect-002)
- [RE-EFFECT-003：Render、Commit、Effect 三个阶段是什么关系](#lesson-re-effect-003)
- [RE-EFFECT-004：Dependency Array 到底表达什么](#lesson-re-effect-004)
- [RE-EFFECT-005：React 如何比较 Dependency](#lesson-re-effect-005)
- [RE-EFFECT-006：eslint exhaustive-deps 为什么不是烦人的警告](#lesson-re-effect-006)
- [RE-EFFECT-007：Cleanup 为什么和 Setup 必须对称](#lesson-re-effect-007)
- [RE-EFFECT-008：StrictMode 为什么会额外执行 Setup → Cleanup → Setup](#lesson-re-effect-008)
- [RE-EFFECT-009：Subscription Effect 如何正确设计](#lesson-re-effect-009)
- [RE-EFFECT-010：Timer Effect 如何避免重复计时器](#lesson-re-effect-010)
- [RE-EFFECT-011：第三方 Widget Effect 如何围绕实例生命周期组织](#lesson-re-effect-011)
- [RE-EFFECT-012：在 Effect 中 Fetch 数据为什么容易产生额外复杂度](#lesson-re-effect-012)
- [RE-EFFECT-013：AbortController 如何真正取消 Effect 中的请求](#lesson-re-effect-013)
- [RE-EFFECT-014：Race Condition 是怎么形成的](#lesson-re-effect-014)
- [RE-EFFECT-015：Stale Closure 为什么会让 Effect 读到旧值](#lesson-re-effect-015)
- [RE-EFFECT-016：Object Dependency 为什么让 Effect 重复执行](#lesson-re-effect-016)
- [RE-EFFECT-017：Function Dependency 为什么经常不停变化](#lesson-re-effect-017)
- [RE-EFFECT-018：Infinite Effect 的两个必要条件是什么](#lesson-re-effect-018)
- [RE-EFFECT-019：多个 Effect 的 Cleanup / Setup 顺序应该怎么推理](#lesson-re-effect-019)
- [RE-EFFECT-020：Effect Error 应该如何处理](#lesson-re-effect-020)
- [RE-EFFECT-021：Effect 在 Server Rendering 时会运行吗](#lesson-re-effect-021)
- [RE-EFFECT-022：Passive Effect 为什么叫 Passive](#lesson-re-effect-022)
- [RE-EFFECT-023：从 useEffect 连接到 Fiber Effect 数据结构](#lesson-re-effect-023)
- [RE-EFFECT-024：综合故障——Effect Hell](#lesson-re-effect-024)
- [RE-EFFECT-025：Effect Architecture Review——每个 Effect 的外部系统是谁](#lesson-re-effect-025)
- [RE-REMOVE-001：Derived Data 为什么应该在 Render 中直接计算](#lesson-re-remove-001)
- [RE-REMOVE-002：用户事件为什么应该留在 Event Handler](#lesson-re-remove-002)
- [RE-REMOVE-003：切换实体时重置 State 为什么优先考虑 Key](#lesson-re-remove-003)
- [RE-REMOVE-004：Props 改变时“调整 State”应该怎么处理](#lesson-re-remove-004)
- [RE-REMOVE-005：通知 Parent 某个 State 改变为什么可能不需要 Effect](#lesson-re-remove-005)
- [RE-REMOVE-006：应用级一次性初始化为什么不一定属于 Effect](#lesson-re-remove-006)
- [RE-REMOVE-007：订阅外部 Store 为什么更适合 useSyncExternalStore](#lesson-re-remove-007)
- [RE-REMOVE-008：Server State 为什么更适合 Query Cache](#lesson-re-remove-008)
- [RE-REMOVE-009：Chained Effects 为什么会形成脆弱状态机](#lesson-re-remove-009)
- [RE-REMOVE-010：昂贵计算应该用 Effect + State 还是 useMemo](#lesson-re-remove-010)
- [RE-REMOVE-011：复杂表单派生状态如何删掉大量 Effect](#lesson-re-remove-011)
- [RE-REMOVE-012：Effect Audit——对一个 Effect-heavy 页面做系统重构](#lesson-re-remove-012)
- [RE-EFFECTEVENT-001：Reactive Logic 与 Non-reactive Logic 怎么区分](#lesson-re-effectevent-001)
- [RE-EFFECTEVENT-002：第一个 useEffectEvent](#lesson-re-effectevent-002)
- [RE-EFFECTEVENT-003：useEffectEvent 为什么能缓解 Stale Closure](#lesson-re-effectevent-003)
- [RE-EFFECTEVENT-004：为什么 useEffectEvent 不能用来隐藏真正的 Dependency](#lesson-re-effectevent-004)
- [RE-EFFECTEVENT-005：Timer / Listener 中什么逻辑适合 Effect Event](#lesson-re-effectevent-005)
- [RE-EFFECTEVENT-006：Effect Event 与 Ref latest-value pattern 怎么比较](#lesson-re-effectevent-006)
- [RE-EFFECTEVENT-007：Effect Event API 应该如何测试](#lesson-re-effectevent-007)
- [RE-EFFECTEVENT-008：综合重构——把聊天室 Effect 拆成同步关系与最新事件逻辑](#lesson-re-effectevent-008)
- [RE-LAYOUT-001：浏览器 Layout / Paint 与 React Commit 的关系](#lesson-re-layout-001)
- [RE-LAYOUT-002：为什么 Tooltip Measurement 可能需要 useLayoutEffect](#lesson-re-layout-002)
- [RE-LAYOUT-003：useLayoutEffect 为什么会阻塞 Paint](#lesson-re-layout-003)
- [RE-LAYOUT-004：DOM Read / Write 如何制造 Layout Thrashing](#lesson-re-layout-004)
- [RE-LAYOUT-005：什么时候普通 Event Handler 就能完成 DOM Measurement](#lesson-re-layout-005)
- [RE-LAYOUT-006：SSR 中 useLayoutEffect 为什么有特殊边界](#lesson-re-layout-006)
- [RE-LAYOUT-007：useInsertionEffect 解决的是什么库作者问题](#lesson-re-layout-007)
- [RE-LAYOUT-008：LayoutEffect、Effect、Ref Callback 如何选择](#lesson-re-layout-008)
- [RE-LAYOUT-009：性能故障——同步 LayoutEffect 把交互拖慢](#lesson-re-layout-009)
- [RE-LAYOUT-010：综合实现——无闪烁自适应 Popover](#lesson-re-layout-010)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-effect-001"></a>
### Lesson RE-EFFECT-001：Effect 真正解决的唯一核心问题是什么

从“React State 已变化，但外部系统还不知道”建立 External Synchronization 定义。

<a id="lesson-re-effect-002"></a>
### Lesson RE-EFFECT-002：第一个 Effect——把 React 状态同步到外部系统

用 document.title / 外部 Widget 作为最小例子，而不是一上来把数据请求等同于 Effect。

<a id="lesson-re-effect-003"></a>
### Lesson RE-EFFECT-003：Render、Commit、Effect 三个阶段是什么关系

通过日志建立 Render 描述 UI、Commit 修改宿主环境、Effect 之后同步外部系统的顺序。

<a id="lesson-re-effect-004"></a>
### Lesson RE-EFFECT-004：Dependency Array 到底表达什么

理解依赖不是“我想什么时候运行”，而是 Effect 使用了哪些 Reactive Value。

<a id="lesson-re-effect-005"></a>
### Lesson RE-EFFECT-005：React 如何比较 Dependency

用 Primitive、Object、Function 验证 Object.is 语义以及 identity 变化的影响。

<a id="lesson-re-effect-006"></a>
### Lesson RE-EFFECT-006：eslint exhaustive-deps 为什么不是烦人的警告

主动删依赖制造 stale behavior，理解 Linter 在维护同步声明正确性上的作用。

<a id="lesson-re-effect-007"></a>
### Lesson RE-EFFECT-007：Cleanup 为什么和 Setup 必须对称

用订阅/连接实验观察旧 Effect 清理后再建立新同步关系的必要性。

<a id="lesson-re-effect-008"></a>
### Lesson RE-EFFECT-008：StrictMode 为什么会额外执行 Setup → Cleanup → Setup

利用重复连接暴露 cleanup 缺失，理解开发模式压力测试的意义。

<a id="lesson-re-effect-009"></a>
### Lesson RE-EFFECT-009：Subscription Effect 如何正确设计

实现事件监听、subscribe/unsubscribe，并处理 dependency 变化和卸载。

<a id="lesson-re-effect-010"></a>
### Lesson RE-EFFECT-010：Timer Effect 如何避免重复计时器

制造 interval 泄漏和 stale callback，再根据同步对象生命周期修复。

<a id="lesson-re-effect-011"></a>
### Lesson RE-EFFECT-011：第三方 Widget Effect 如何围绕实例生命周期组织

初始化、更新、销毁地图/播放器类实例，并区分可直接在事件中执行的动作。

<a id="lesson-re-effect-012"></a>
### Lesson RE-EFFECT-012：在 Effect 中 Fetch 数据为什么容易产生额外复杂度

观察 loading/error/race/cache/waterfall，理解它可用但不是应用级 Server State 的默认终点。

<a id="lesson-re-effect-013"></a>
### Lesson RE-EFFECT-013：AbortController 如何真正取消 Effect 中的请求

把 Cleanup 与请求 Abort 连接起来，并区分取消网络工作和“忽略旧结果”。

<a id="lesson-re-effect-014"></a>
### Lesson RE-EFFECT-014：Race Condition 是怎么形成的

制造 A 请求后发先到、B 请求先发后到等乱序响应，用时间线证明错误数据覆盖。

<a id="lesson-re-effect-015"></a>
### Lesson RE-EFFECT-015：Stale Closure 为什么会让 Effect 读到旧值

通过 Timer / Subscription 复现旧 Render 闭包，区分依赖缺失与业务真正想读取最新值。

<a id="lesson-re-effect-016"></a>
### Lesson RE-EFFECT-016：Object Dependency 为什么让 Effect 重复执行

比较 render 中创建对象、对象字段依赖、Effect 内创建对象等修复策略。

<a id="lesson-re-effect-017"></a>
### Lesson RE-EFFECT-017：Function Dependency 为什么经常不停变化

比较内联函数、移动逻辑、useCallback 和 Effect 内定义，避免为了静态 identity 机械 memoize。

<a id="lesson-re-effect-018"></a>
### Lesson RE-EFFECT-018：Infinite Effect 的两个必要条件是什么

建立“Effect 更新 State + 更新导致依赖改变”的循环模型，并用 DevTools/日志定位。

<a id="lesson-re-effect-019"></a>
### Lesson RE-EFFECT-019：多个 Effect 的 Cleanup / Setup 顺序应该怎么推理

通过多个同步对象观察重新 Render 与 Unmount 时的执行顺序，避免依赖隐式顺序设计业务。

<a id="lesson-re-effect-020"></a>
### Lesson RE-EFFECT-020：Effect Error 应该如何处理

区分同步 setup 错误、异步 Promise 错误、外部连接错误，以及它们和 Error Boundary 的边界。

<a id="lesson-re-effect-021"></a>
### Lesson RE-EFFECT-021：Effect 在 Server Rendering 时会运行吗

用最小 SSR 实验建立 Effect 只在 Client Commit 后运行的模型，为 Hydration 做前置。

<a id="lesson-re-effect-022"></a>
### Lesson RE-EFFECT-022：Passive Effect 为什么叫 Passive

从浏览器 Paint 与 React Commit 时机建立高层模型，并与 LayoutEffect 对比。

<a id="lesson-re-effect-023"></a>
### Lesson RE-EFFECT-023：从 useEffect 连接到 Fiber Effect 数据结构

只画出 Hook Effect、Fiber flags、Passive Queue 的入口地图，后续 Hooks Internals / Commit 源码再断点验证。

<a id="lesson-re-effect-024"></a>
### Lesson RE-EFFECT-024：综合故障——Effect Hell

在一个页面中主动制造重复订阅、无限循环、Race、Stale Closure、对象依赖和未清理请求，再逐项修复。

<a id="lesson-re-effect-025"></a>
### Lesson RE-EFFECT-025：Effect Architecture Review——每个 Effect 的外部系统是谁

对真实页面逐个 Effect 做审计：没有明确外部系统的 Effect 必须证明其必要性，否则进入 Removing Effects 重构。

---

本 Module 负责把“不需要 Effect 的逻辑”重新放回正确位置，建立 React 数据流优先于同步补丁的设计习惯。

<a id="lesson-re-remove-001"></a>
### Lesson RE-REMOVE-001：Derived Data 为什么应该在 Render 中直接计算

把 fullName / filteredItems 从 Effect + State 重构为普通计算，消除一次额外 Render 和同步风险。

<a id="lesson-re-remove-002"></a>
### Lesson RE-REMOVE-002：用户事件为什么应该留在 Event Handler

把“点击以后发送请求/显示通知”从 Effect 重构回真正触发动作的位置。

<a id="lesson-re-remove-003"></a>
### Lesson RE-REMOVE-003：切换实体时重置 State 为什么优先考虑 Key

比较 Effect reset 与 Component Identity reset，减少手工同步。

<a id="lesson-re-remove-004"></a>
### Lesson RE-REMOVE-004：Props 改变时“调整 State”应该怎么处理

区分 Derived、Key Reset、条件 Render 内调整与真正需要保留部分 State 的特殊情况。

<a id="lesson-re-remove-005"></a>
### Lesson RE-REMOVE-005：通知 Parent 某个 State 改变为什么可能不需要 Effect

比较在 setter/event 中同步通知和 Effect 事后通知，减少两阶段更新。

<a id="lesson-re-remove-006"></a>
### Lesson RE-REMOVE-006：应用级一次性初始化为什么不一定属于 Effect

区分 module initialization、root bootstrap、用户会话启动与组件挂载。

<a id="lesson-re-remove-007"></a>
### Lesson RE-REMOVE-007：订阅外部 Store 为什么更适合 useSyncExternalStore

从 tearing / SSR / subscription contract 解释专用 Hook 比手工 Effect 更可靠。

<a id="lesson-re-remove-008"></a>
### Lesson RE-REMOVE-008：Server State 为什么更适合 Query Cache

把 fetch Effect 的缓存、去重、重试和失效需求列出来，连接后续 TanStack Query。

<a id="lesson-re-remove-009"></a>
### Lesson RE-REMOVE-009：Chained Effects 为什么会形成脆弱状态机

制造 Effect A 更新 State → Effect B 再更新 State 的链式流程，改为事件内一次计算或 reducer transition。

<a id="lesson-re-remove-010"></a>
### Lesson RE-REMOVE-010：昂贵计算应该用 Effect + State 还是 useMemo

区分“同步外部系统”与“缓存纯计算”的职责。

<a id="lesson-re-remove-011"></a>
### Lesson RE-REMOVE-011：复杂表单派生状态如何删掉大量 Effect

重构 errors/total/canSubmit/dirty 等可计算状态。

<a id="lesson-re-remove-012"></a>
### Lesson RE-REMOVE-012：Effect Audit——对一个 Effect-heavy 页面做系统重构

逐个标注 Event Logic、Derived Data、External Sync、Server State、Store Subscription，并删除不必要 Effect。

---

本 Module 解决 Effect 内“同步关系是 Reactive，但某段回调逻辑只想读取最新值”的场景，并明确它不能成为逃避 Dependency 的工具。

<a id="lesson-re-effectevent-001"></a>
### Lesson RE-EFFECTEVENT-001：Reactive Logic 与 Non-reactive Logic 怎么区分

用聊天室连接 + theme 通知例子区分“需要重新连接的值”和“只需要读取最新值的逻辑”。

<a id="lesson-re-effectevent-002"></a>
### Lesson RE-EFFECTEVENT-002：第一个 useEffectEvent

把非响应式回调从 Effect 中抽出，同时保持读取最新 Props/State。

<a id="lesson-re-effectevent-003"></a>
### Lesson RE-EFFECTEVENT-003：useEffectEvent 为什么能缓解 Stale Closure

通过延迟回调比较普通闭包与 Effect Event 的读取行为。

<a id="lesson-re-effectevent-004"></a>
### Lesson RE-EFFECTEVENT-004：为什么 useEffectEvent 不能用来隐藏真正的 Dependency

故意把 roomId 等同步条件塞进去，观察逻辑语义被破坏。

<a id="lesson-re-effectevent-005"></a>
### Lesson RE-EFFECTEVENT-005：Timer / Listener 中什么逻辑适合 Effect Event

处理稳定订阅 + 最新业务回调组合。

<a id="lesson-re-effectevent-006"></a>
### Lesson RE-EFFECTEVENT-006：Effect Event 与 Ref latest-value pattern 怎么比较

从语义、Linter、可读性和 React 数据流角度比较两者。

<a id="lesson-re-effectevent-007"></a>
### Lesson RE-EFFECTEVENT-007：Effect Event API 应该如何测试

验证外部订阅不重复建立，同时回调能看到最新 State。

<a id="lesson-re-effectevent-008"></a>
### Lesson RE-EFFECTEVENT-008：综合重构——把聊天室 Effect 拆成同步关系与最新事件逻辑

在真实连接场景中验证 dependency、reconnect 次数和最新 UI 配置。

---

本 Module 专门处理 Commit 与浏览器 Layout/Paint 之间的时机问题，并解释同步阻塞的性能代价。

<a id="lesson-re-layout-001"></a>
### Lesson RE-LAYOUT-001：浏览器 Layout / Paint 与 React Commit 的关系

复习渲染流水线，并定位普通 Effect 与 LayoutEffect 的时机差异。

<a id="lesson-re-layout-002"></a>
### Lesson RE-LAYOUT-002：为什么 Tooltip Measurement 可能需要 useLayoutEffect

先用 useEffect 制造闪烁，再在 Paint 前测量并同步调整位置。

<a id="lesson-re-layout-003"></a>
### Lesson RE-LAYOUT-003：useLayoutEffect 为什么会阻塞 Paint

用昂贵同步工作制造卡顿，理解它的成本和使用边界。

<a id="lesson-re-layout-004"></a>
### Lesson RE-LAYOUT-004：DOM Read / Write 如何制造 Layout Thrashing

在 LayoutEffect 中交错读写尺寸，连接浏览器性能知识。

<a id="lesson-re-layout-005"></a>
### Lesson RE-LAYOUT-005：什么时候普通 Event Handler 就能完成 DOM Measurement

避免把所有 DOM 操作都升级为 LayoutEffect。

<a id="lesson-re-layout-006"></a>
### Lesson RE-LAYOUT-006：SSR 中 useLayoutEffect 为什么有特殊边界

理解服务器没有 Layout，设计仅客户端执行的组件边界。

<a id="lesson-re-layout-007"></a>
### Lesson RE-LAYOUT-007：useInsertionEffect 解决的是什么库作者问题

认识 CSS-in-JS 样式注入时机、DOM Mutation 前插入和普通业务代码不应滥用的原因。

<a id="lesson-re-layout-008"></a>
### Lesson RE-LAYOUT-008：LayoutEffect、Effect、Ref Callback 如何选择

用 measurement、subscription、attach node 三类需求建立决策表。

<a id="lesson-re-layout-009"></a>
### Lesson RE-LAYOUT-009：性能故障——同步 LayoutEffect 把交互拖慢

用 Performance Trace 观察阻塞 Commit/Paint，并完成重构。

<a id="lesson-re-layout-010"></a>
### Lesson RE-LAYOUT-010：综合实现——无闪烁自适应 Popover

结合 Ref、LayoutEffect、ResizeObserver 前置和 Portal 前置设计定位流程。

---

---

> [← Module 11.11：Ref 与 Imperative Escape Hatches](../module11-11-ref-imperative/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.13：Custom Hook 与 External Store Integration →](../module11-13-custom-hook-external-store/README.md)
