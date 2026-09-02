# Module 11.08：State Modeling 与 Ownership

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-07-immutable-state-identity/README.md)  > · [下一个 Module](../module11-09-form/README.md)

本 Module 从“会维护 State”升级到“会设计 State”。目标是让学习者能决定哪些数据应该是 State、State 应该放在哪里、哪些 State 应被删除，以及 Client / URL / Server / Persistent State 各自的职责。

### Lesson RE-MODELING-001：什么数据才有资格成为 State

建立 State 的最小判定：是否随时间变化、是否影响 Render、能否由现有输入计算得到。

### Lesson RE-MODELING-002：Derived State 为什么通常不应该再存一份

用 items + total、firstName + fullName 等案例制造同步 Bug，改为 Render 期间计算。

### Lesson RE-MODELING-003：Duplicate State 为什么最终一定会产生冲突

把同一实体同时存在多个 State 中，制造更新不一致并学习 Single Source of Truth。

### Lesson RE-MODELING-004：Redundant State 与 Cache 有什么区别

区分“为了方便重复保存”和“有明确成本模型的 memo/cache”，避免用性能借口破坏数据一致性。

### Lesson RE-MODELING-005：Impossible State 是怎么被设计出来的

用 `isLoading/isSuccess/isError` 多 boolean 产生非法组合，引出 Discriminated Union / State Machine 的建模方式。

### Lesson RE-MODELING-006：State Shape 应该按 UI 结构还是业务关系设计

比较 deeply nested UI-shaped state 与 domain-shaped state，讨论更新、复用和测试成本。

### Lesson RE-MODELING-007：什么时候应该 Normalize State

处理实体被多个位置引用、列表和详情共享对象的场景，理解 id map / order list 等结构。

### Lesson RE-MODELING-008：State Ownership 到底是什么意思

通过两个 sibling 需要同一数据的场景，找出最近共同 Owner，而不是机械“状态提升到 App”。

### Lesson RE-MODELING-009：Lifting State Up 的代价是什么

观察状态提升后 Props 传递和 Render 范围扩大，理解“共享”与“全局化”不是一回事。

### Lesson RE-MODELING-010：Controlled 与 Uncontrolled State 应该怎么选

从 Input、Accordion、Dialog 等组件比较内部 ownership 和外部 ownership，建立可复用组件设计模式。

### Lesson RE-MODELING-011：Local State、Shared State、Global State 不是三个库

用生命周期和消费范围定义三者，而不是根据“组件层级深”直接选 Redux/Zustand。

### Lesson RE-MODELING-012：URL State 为什么不能随便复制到 useState

用 search/filter/page 参数展示 Refresh、Deep Link、Back/Forward 的需求，建立 URL 作为状态所有者的概念。

### Lesson RE-MODELING-013：Server State 为什么不是普通 Global State

只建立远程所有权、缓存、Stale、Refetch 的概念，完整 Query 模型留到 11.29。

### Lesson RE-MODELING-014：Persistent State 为什么有独立生命周期

比较 React State 与 LocalStorage/IndexedDB 数据，理解初始化、同步、版本和多标签问题。

### Lesson RE-MODELING-015：Transient UI State 应该离业务数据多远

讨论 hover、open、selection、draft、server entity 的不同生命周期，减少“大一统 Store”。

### Lesson RE-MODELING-016：State Colocation 为什么通常是默认好策略

通过把 State 从顶层移回真正消费位置，观察 Props、Render 和模块边界的改善。

### Lesson RE-MODELING-017：State Modeling Code Review——删掉一半 State

给出一个故意过度状态化的业务页面，逐项判断 derived / duplicate / URL / server / local 并重构。

### Lesson RE-MODELING-018：输出一张真实应用 State Ownership Map

对后续 Order Editor 标注每份 State 的 Owner、生命周期、来源和消费者，为复杂表单项目做设计准备。

---
