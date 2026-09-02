# Module 11.06：State Fundamentals、Render Snapshot、Update Queue 与 Batching

> [← Module 11.05：React Event System](../module11-05-event-system/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.07：Immutable State 与 Component Identity →](../module11-07-immutable-state-identity/README.md)

本 Module 一次建立 React State 的基本存储与更新时间模型：为什么普通变量不够、State 属于谁、`useState` 返回什么、Setter 为什么不是赋值，以及 Snapshot、Update Queue 与 Batching 如何解释更新结果。Object/Array 不可变更新与 Component Identity 在下一 Module 11.07 继续。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（30 课）</strong></summary>

- [RE-STATE-001：普通局部变量为什么不能驱动 React UI](#lesson-re-state-001)
- [RE-STATE-002：第一个 useState](#lesson-re-state-002)
- [RE-STATE-003：State 到底存在哪里](#lesson-re-state-003)
- [RE-STATE-004：Setter 为什么不是普通赋值语句](#lesson-re-state-004)
- [RE-STATE-005：一次 State Update 如何触发下一次 Render](#lesson-re-state-005)
- [RE-STATE-006：Initial State 为什么只在初始化时生效](#lesson-re-state-006)
- [RE-STATE-007：Lazy Initialization 解决什么问题](#lesson-re-state-007)
- [RE-STATE-008：Same-value Update 为什么可能不产生可见更新](#lesson-re-state-008)
- [RE-STATE-009：一个组件里可以有多少份 State](#lesson-re-state-009)
- [RE-STATE-010：State 是私有的吗](#lesson-re-state-010)
- [RE-STATE-011：Props 改变为什么不会自动重新初始化 State](#lesson-re-state-011)
- [RE-STATE-012：State Hook 的调用顺序为什么必须稳定](#lesson-re-state-012)
- [RE-STATE-013：什么时候应该用 State，什么时候普通变量或 Ref 更合适](#lesson-re-state-013)
- [RE-STATE-014：综合实现——可编辑数量与选择状态](#lesson-re-state-014)
- [RE-SNAPSHOT-001：什么叫一次 Render 的 State Snapshot](#lesson-re-snapshot-001)
- [RE-SNAPSHOT-002：为什么 setState 后马上 console.log 还是旧值](#lesson-re-snapshot-002)
- [RE-SNAPSHOT-003：事件处理器为什么“记住”它创建时的 State](#lesson-re-snapshot-003)
- [RE-SNAPSHOT-004：连续三次 setCount(count + 1) 为什么不是 +3](#lesson-re-snapshot-004)
- [RE-SNAPSHOT-005：Functional Updater 为什么能解决连续累加](#lesson-re-snapshot-005)
- [RE-SNAPSHOT-006：Replace Update 与 Updater Function 可以混在一起吗](#lesson-re-snapshot-006)
- [RE-SNAPSHOT-007：Update Queue 到底保存了什么](#lesson-re-snapshot-007)
- [RE-SNAPSHOT-008：Batching 是什么，为什么 React 要批量处理更新](#lesson-re-snapshot-008)
- [RE-SNAPSHOT-009：React 18+ 的 Automatic Batching 扩展到了哪些异步边界](#lesson-re-snapshot-009)
- [RE-SNAPSHOT-010：什么时候会需要 flushSync，为什么它应该很少用](#lesson-re-snapshot-010)
- [RE-SNAPSHOT-011：Async Callback 为什么容易读到旧 Snapshot](#lesson-re-snapshot-011)
- [RE-SNAPSHOT-012：Stale State 与 Stale Closure 是同一个问题吗](#lesson-re-snapshot-012)
- [RE-SNAPSHOT-013：跨多个 State 的更新如何保持业务一致性](#lesson-re-snapshot-013)
- [RE-SNAPSHOT-014：使用测试验证 Update Queue 与 Batching 行为](#lesson-re-snapshot-014)
- [RE-SNAPSHOT-015：从行为模型连接到未来的 Fiber Update Queue](#lesson-re-snapshot-015)
- [RE-SNAPSHOT-016：综合推演——十组 State Update 最终结果](#lesson-re-snapshot-016)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-state-001"></a>
### Lesson RE-STATE-001：普通局部变量为什么不能驱动 React UI

先做一个普通 `let count` Counter，观察变量确实变化但 UI 不更新；再解释 Render、局部变量生命周期和“触发下一次 Render”是三个不同问题。

<a id="lesson-re-state-002"></a>
### Lesson RE-STATE-002：第一个 useState

从 `[count, setCount] = useState(0)` 开始，逐个解释 Hook 调用、当前 State 值、Setter 和初始值，而不是把数组解构当成模板代码。

<a id="lesson-re-state-003"></a>
### Lesson RE-STATE-003：State 到底存在哪里

通过 Component Function 每次重新执行但 State 仍保留的现象，建立“State 不存在局部变量里，而由 React 按组件身份管理”的核心模型。

<a id="lesson-re-state-004"></a>
### Lesson RE-STATE-004：Setter 为什么不是普通赋值语句

比较 `count = 1` 与 `setCount(1)`，理解 Setter 的职责是请求 React 安排一次更新，而不是修改当前 Render 中的变量。

<a id="lesson-re-state-005"></a>
### Lesson RE-STATE-005：一次 State Update 如何触发下一次 Render

用 Console、React DevTools 观察事件 → Setter → 下一次 Component Function 执行 → 新 UI 的过程，先建立不涉及源码的完整行为链。

<a id="lesson-re-state-006"></a>
### Lesson RE-STATE-006：Initial State 为什么只在初始化时生效

修改 Props / 变量后再次经过 `useState(initialValue)`，观察初始值不会每次覆盖已有 State，理解 mount 与 update 的差异。

<a id="lesson-re-state-007"></a>
### Lesson RE-STATE-007：Lazy Initialization 解决什么问题

把昂贵初始化函数分别写成 `useState(expensive())` 和 `useState(expensive)`，通过调用次数证明 Lazy Init 的真实价值。

<a id="lesson-re-state-008"></a>
### Lesson RE-STATE-008：Same-value Update 为什么可能不产生可见更新

使用重复 `setCount(count)` / `setCount(0)`，理解 React 对相同 State 的处理以及 `Object.is` 在状态比较中的意义。

<a id="lesson-re-state-009"></a>
### Lesson RE-STATE-009：一个组件里可以有多少份 State

比较一个对象 State 与多个独立 State，讨论状态关联性、更新频率和可维护性，但把复杂 State Shape 决策留到 State Modeling Module。

<a id="lesson-re-state-010"></a>
### Lesson RE-STATE-010：State 是私有的吗

渲染两个相同 Counter，观察它们拥有独立 State；再由父组件保存共享值，建立 Local State 与 Shared State 的第一层直觉。

<a id="lesson-re-state-011"></a>
### Lesson RE-STATE-011：Props 改变为什么不会自动重新初始化 State

复现“从 Props 初始化 State 后 Props 更新但 State 不跟着变”的常见 Bug，引出 Derived / Duplicate State；完整 State Modeling 与 Ownership 在 Module 11.08。
<a id="lesson-re-state-012"></a>
### Lesson RE-STATE-012：State Hook 的调用顺序为什么必须稳定

通过条件调用 `useState` 制造 Hook Rule 错误，先从行为层解释 React 依赖调用顺序识别 Hook State，源码细节留到 Hooks Internals。

<a id="lesson-re-state-013"></a>
### Lesson RE-STATE-013：什么时候应该用 State，什么时候普通变量或 Ref 更合适

用 UI 可见数据、临时计算、跨 Render 非 UI 数据三个场景建立第一版选择规则，Ref 在后续 Module 完整学习。

<a id="lesson-re-state-014"></a>
### Lesson RE-STATE-014：综合实现——可编辑数量与选择状态

把上一 Module 的交互升级为真正可保存的 UI State，实现选择、数量和开关，并明确每一份 State 为什么存在。

---

本 Module 解释 React State 最核心的时间模型：每次 Render 都看到自己的 Snapshot，Setter 把 Update 放入 Queue，React 再按规则处理队列和 Batching。完成后必须能解释“为什么代码按这个顺序写，结果却不是普通变量直觉”。

<a id="lesson-re-snapshot-001"></a>
### Lesson RE-SNAPSHOT-001：什么叫一次 Render 的 State Snapshot

在事件处理器和 JSX 中同时打印 State，观察一次 Render 内读取到的是固定值，建立 Snapshot 概念。

<a id="lesson-re-snapshot-002"></a>
### Lesson RE-SNAPSHOT-002：为什么 setState 后马上 console.log 还是旧值

通过最小实验解释 Setter 安排未来 Render，而当前函数闭包仍然属于当前 Snapshot。

<a id="lesson-re-snapshot-003"></a>
### Lesson RE-SNAPSHOT-003：事件处理器为什么“记住”它创建时的 State

保存旧 Render 的 handler 并延迟调用，观察 Closure 与 Render Snapshot 的组合行为。

<a id="lesson-re-snapshot-004"></a>
### Lesson RE-SNAPSHOT-004：连续三次 setCount(count + 1) 为什么不是 +3

逐次记录三个 Update 的输入值，解释它们都基于同一 Snapshot 计算 replacement value。

<a id="lesson-re-snapshot-005"></a>
### Lesson RE-SNAPSHOT-005：Functional Updater 为什么能解决连续累加

使用 `setCount(c => c + 1)`，把 Updater 看作“等待 React 处理的计算步骤”，而不是特殊语法。

<a id="lesson-re-snapshot-006"></a>
### Lesson RE-SNAPSHOT-006：Replace Update 与 Updater Function 可以混在一起吗

组合 `setNumber(number + 5)`、`setNumber(n => n + 1)` 等实验，手工推演最终结果。

<a id="lesson-re-snapshot-007"></a>
### Lesson RE-SNAPSHOT-007：Update Queue 到底保存了什么

在不进入 React 源码的前提下建立 Queue 项、replacement/updater、处理顺序和 next state 的行为模型。

<a id="lesson-re-snapshot-008"></a>
### Lesson RE-SNAPSHOT-008：Batching 是什么，为什么 React 要批量处理更新

在一次 Click Handler 中触发多个 Setter，观察 Render 次数与最终值，理解批处理对一致性和性能的意义。

<a id="lesson-re-snapshot-009"></a>
### Lesson RE-SNAPSHOT-009：React 18+ 的 Automatic Batching 扩展到了哪些异步边界

比较事件、Promise、setTimeout 等场景，观察现代 React 自动批处理行为，并认识与旧版本 React 的历史差异。

<a id="lesson-re-snapshot-010"></a>
### Lesson RE-SNAPSHOT-010：什么时候会需要 flushSync，为什么它应该很少用

只建立紧急 DOM 同步场景和性能代价的概念，完整 `flushSync` 边界在 React DOM Integration Module 再深入。

<a id="lesson-re-snapshot-011"></a>
### Lesson RE-SNAPSHOT-011：Async Callback 为什么容易读到旧 Snapshot

使用 Timer / Promise 复现“延迟逻辑读取旧 State”，区分逻辑真正需要旧值还是最新值。

<a id="lesson-re-snapshot-012"></a>
### Lesson RE-SNAPSHOT-012：Stale State 与 Stale Closure 是同一个问题吗

比较“计算 next state 用旧值”和“异步闭包捕获旧 Render”两个问题，为 Effect 中 Stale Closure 做准确术语准备。

<a id="lesson-re-snapshot-013"></a>
### Lesson RE-SNAPSHOT-013：跨多个 State 的更新如何保持业务一致性

用订单数量 + 总价的错误示例讨论独立 Setter、派生值和 Reducer 前置，不提前教授 Reducer API。

<a id="lesson-re-snapshot-014"></a>
### Lesson RE-SNAPSHOT-014：使用测试验证 Update Queue 与 Batching 行为

把几个“看起来反直觉”的 State 更新写成可重复测试，让理论结论由运行证据固定下来。

<a id="lesson-re-snapshot-015"></a>
### Lesson RE-SNAPSHOT-015：从行为模型连接到未来的 Fiber Update Queue

画出 `setState → Update → Queue → Render` 的高层图，只标记未来源码 Module 将继续验证的位置。

<a id="lesson-re-snapshot-016"></a>
### Lesson RE-SNAPSHOT-016：综合推演——十组 State Update 最终结果

给出 replacement、functional updater、async callback、multiple state 的混合案例，要求先手工预测再运行验证，真正形成 Snapshot/Queue 心智模型。

---

---

> [← Module 11.05：React Event System](../module11-05-event-system/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.07：Immutable State 与 Component Identity →](../module11-07-immutable-state-identity/README.md)
