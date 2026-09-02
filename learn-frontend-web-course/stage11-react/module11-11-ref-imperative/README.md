# Module 11.11：Ref 与 Imperative Escape Hatches

> [← Module 11.10：Reducer、Context 与 State Architecture](../module11-10-reducer-context-state-architecture/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.12：Effect 与 External Synchronization →](../module11-12-effect-external-sync/README.md)

本 Module 负责 React 的可变容器和 DOM Escape Hatch。完成后必须能区分 State 与 Ref、声明式与命令式边界，并正确处理 DOM、Timer、第三方实例和生命周期。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（27 课）</strong></summary>

- [RE-REF-001：为什么 React 需要 Ref 这种“不会触发 Render 的容器”](#lesson-re-ref-001)
- [RE-REF-002：第一个 useRef 与 ref.current](#lesson-re-ref-002)
- [RE-REF-003：Ref Object 为什么可以跨多次 Render 保持同一身份](#lesson-re-ref-003)
- [RE-REF-004：State 与 Ref 应该怎么选](#lesson-re-ref-004)
- [RE-REF-005：第一个 DOM Ref——拿到真实 DOM Node](#lesson-re-ref-005)
- [RE-REF-006：使用 Ref 管理 Focus、Scroll 与 Selection](#lesson-re-ref-006)
- [RE-REF-007：Callback Ref 什么时候比 Object Ref 更合适](#lesson-re-ref-007)
- [RE-REF-008：如何管理一组动态列表 DOM Ref](#lesson-re-ref-008)
- [RE-REF-009：Ref 如何保存 Timer、Animation、Observer、Socket 等外部句柄](#lesson-re-ref-009)
- [RE-REF-010：Ref 能用来保存“最新值”吗，风险是什么](#lesson-re-ref-010)
- [RE-REF-011：DOM Measurement 应该在什么时候读取](#lesson-re-ref-011)
- [RE-REF-012：Ref 在挂载、更新、卸载时如何变成 Node / null](#lesson-re-ref-012)
- [RE-REF-013：StrictMode 下 Callback Ref 为什么可能重复 attach/detach](#lesson-re-ref-013)
- [RE-REF-014：Ref 滥用如何造成隐藏状态和内存问题](#lesson-re-ref-014)
- [RE-REF-015：综合实现——可聚焦、可滚动、可测量的 List Navigator](#lesson-re-ref-015)
- [RE-IMP-001：什么叫 Imperative Escape Hatch](#lesson-re-imp-001)
- [RE-IMP-002：React 19 的 ref-as-prop 与 forwardRef 历史兼容怎么理解](#lesson-re-imp-002)
- [RE-IMP-003：第一个 useImperativeHandle](#lesson-re-imp-003)
- [RE-IMP-004：Imperative Handle 为什么应该只暴露最小能力](#lesson-re-imp-004)
- [RE-IMP-005：为 Modal 设计 open/close 还是 controlled open Props](#lesson-re-imp-005)
- [RE-IMP-006：Editor / Canvas / Media 为什么更常需要 Imperative API](#lesson-re-imp-006)
- [RE-IMP-007：第三方 Chart / Map 实例应该如何包进 React Component](#lesson-re-imp-007)
- [RE-IMP-008：多个 Ref 如何组合和转发](#lesson-re-imp-008)
- [RE-IMP-009：Imperative API 如何做 TypeScript 类型设计](#lesson-re-imp-009)
- [RE-IMP-010：如何测试 Imperative Component](#lesson-re-imp-010)
- [RE-IMP-011：Imperative API 反模式——父组件遥控子组件内部实现](#lesson-re-imp-011)
- [RE-IMP-012：综合重构——把命令式组件 API 收敛到最小边界](#lesson-re-imp-012)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-ref-001"></a>
### Lesson RE-REF-001：为什么 React 需要 Ref 这种“不会触发 Render 的容器”

从跨 Render 保存 Timer ID / DOM Handle 的需求出发，理解 Ref 解决的问题与 State 完全不同。

<a id="lesson-re-ref-002"></a>
### Lesson RE-REF-002：第一个 useRef 与 ref.current

创建 Ref、读写 current，并证明修改 current 不会触发 Component Render。

<a id="lesson-re-ref-003"></a>
### Lesson RE-REF-003：Ref Object 为什么可以跨多次 Render 保持同一身份

比较普通对象与 useRef 返回对象，建立 Stable Container 的心智模型。

<a id="lesson-re-ref-004"></a>
### Lesson RE-REF-004：State 与 Ref 应该怎么选

用“是否影响可见 UI”“是否需要触发 Render”“是否只保存外部句柄”建立可执行判断规则。

<a id="lesson-re-ref-005"></a>
### Lesson RE-REF-005：第一个 DOM Ref——拿到真实 DOM Node

把 Ref 绑定到 Input / Div，观察 Commit 后 current 指向真实 DOM，并明确 Render 阶段不能可靠读取它。

<a id="lesson-re-ref-006"></a>
### Lesson RE-REF-006：使用 Ref 管理 Focus、Scroll 与 Selection

实现聚焦、滚动、文本选择，理解这些操作为何天然属于命令式浏览器能力。

<a id="lesson-re-ref-007"></a>
### Lesson RE-REF-007：Callback Ref 什么时候比 Object Ref 更合适

观察 attach/detach 时机，并用于动态节点和可观测节点生命周期。

<a id="lesson-re-ref-008"></a>
### Lesson RE-REF-008：如何管理一组动态列表 DOM Ref

为可变列表建立 Map/Callback Ref 方案，避免按 index 保存导致身份错乱。

<a id="lesson-re-ref-009"></a>
### Lesson RE-REF-009：Ref 如何保存 Timer、Animation、Observer、Socket 等外部句柄

比较 number/object handle 的生命周期，并明确谁负责 cleanup。

<a id="lesson-re-ref-010"></a>
### Lesson RE-REF-010：Ref 能用来保存“最新值”吗，风险是什么

实现 latest-value pattern，同时说明它绕开 React 响应式数据流的代价，为 useEffectEvent 做前置。

<a id="lesson-re-ref-011"></a>
### Lesson RE-REF-011：DOM Measurement 应该在什么时候读取

比较事件后读取、Effect、LayoutEffect 的时机，先建立测量与浏览器 Layout 的联系。

<a id="lesson-re-ref-012"></a>
### Lesson RE-REF-012：Ref 在挂载、更新、卸载时如何变成 Node / null

通过日志观察 Ref 生命周期，理解卸载后引用失效和资源释放。

<a id="lesson-re-ref-013"></a>
### Lesson RE-REF-013：StrictMode 下 Callback Ref 为什么可能重复 attach/detach

用开发模式验证 StrictMode 的额外检查，找出不对称清理逻辑。

<a id="lesson-re-ref-014"></a>
### Lesson RE-REF-014：Ref 滥用如何造成隐藏状态和内存问题

制造“所有业务状态都塞进 Ref”的反模式，并用 Heap/Retainer 高层思路分析长生命周期引用。

<a id="lesson-re-ref-015"></a>
### Lesson RE-REF-015：综合实现——可聚焦、可滚动、可测量的 List Navigator

组合 DOM Ref、Callback Ref、动态节点映射和键盘事件，完成一个不依赖未来 Effect 能力的导航组件。

---

本 Module 讨论组件对外暴露命令式能力的正确边界。目标不是“会调用 useImperativeHandle”，而是学会只在声明式 Props 不足以表达的场景暴露最小 API。

<a id="lesson-re-imp-001"></a>
### Lesson RE-IMP-001：什么叫 Imperative Escape Hatch

用 focus/open/play/scroll 等动作区分“描述状态”与“直接命令对象执行动作”。

<a id="lesson-re-imp-002"></a>
### Lesson RE-IMP-002：React 19 的 ref-as-prop 与 forwardRef 历史兼容怎么理解

建立现代 React ref 传递模型，并认识维护旧代码时仍会遇到的 forwardRef。

<a id="lesson-re-imp-003"></a>
### Lesson RE-IMP-003：第一个 useImperativeHandle

让父组件拿到自定义 Handle，而不是直接拿到整个内部 DOM Node。

<a id="lesson-re-imp-004"></a>
### Lesson RE-IMP-004：Imperative Handle 为什么应该只暴露最小能力

比较暴露完整 DOM、暴露内部 State、只暴露 focus/reset 三种 API 的耦合差异。

<a id="lesson-re-imp-005"></a>
### Lesson RE-IMP-005：为 Modal 设计 open/close 还是 controlled open Props

比较 Controlled API 与 Imperative API，明确业务状态通常优先声明式表达。

<a id="lesson-re-imp-006"></a>
### Lesson RE-IMP-006：Editor / Canvas / Media 为什么更常需要 Imperative API

处理 selection、undo、play、seek、export 等天然命令式能力。

<a id="lesson-re-imp-007"></a>
### Lesson RE-IMP-007：第三方 Chart / Map 实例应该如何包进 React Component

建立 Wrapper、Ref、实例生命周期和最小外部 Handle 的边界。

<a id="lesson-re-imp-008"></a>
### Lesson RE-IMP-008：多个 Ref 如何组合和转发

处理内部需要 DOM Ref、外部又需要 Handle 的场景，并避免 Ref ownership 混乱。

<a id="lesson-re-imp-009"></a>
### Lesson RE-IMP-009：Imperative API 如何做 TypeScript 类型设计

为 Handle、nullable lifecycle、generic element 设计明确类型合同。

<a id="lesson-re-imp-010"></a>
### Lesson RE-IMP-010：如何测试 Imperative Component

从用户行为和必要 Handle 两个层面验证，不把实现细节变成测试合同。

<a id="lesson-re-imp-011"></a>
### Lesson RE-IMP-011：Imperative API 反模式——父组件遥控子组件内部实现

制造大量 `doX/doY/setInternalFoo` 方法，分析它如何破坏封装和状态所有权。

<a id="lesson-re-imp-012"></a>
### Lesson RE-IMP-012：综合重构——把命令式组件 API 收敛到最小边界

对 Modal / Editor Wrapper 做一次 API Review，在 Props、Callback、Ref Handle 之间重新分配职责。

---

---

> [← Module 11.10：Reducer、Context 与 State Architecture](../module11-10-reducer-context-state-architecture/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.12：Effect 与 External Synchronization →](../module11-12-effect-external-sync/README.md)
