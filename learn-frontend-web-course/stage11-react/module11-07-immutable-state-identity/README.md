# Module 11.07：Immutable State 与 Component Identity

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-06-state-snapshot-queue-batching/README.md)  > · [下一个 Module](../module11-08-state-modeling-ownership/README.md)

本 Module 解决复杂 State 的引用、Mutation 与结构更新问题。完成后不仅会 spread，还要理解为什么 React、Memoization、Concurrent Render 和未来 Compiler 都依赖可预测的不可变更新习惯。

### Lesson RE-IMMUTABLE-001：Primitive State 与 Reference State 有什么本质差异

比较 Number/String 与 Object/Array 的值和引用，理解 React State 中存的是引用值这一事实。

### Lesson RE-IMMUTABLE-002：直接修改对象以后为什么 UI 可能不更新

复现 `state.user.name = ...; setState(state)`，观察引用未变化带来的问题，并联系 Same-value Update。

### Lesson RE-IMMUTABLE-003：Shallow Copy 到底复制了什么

用展开运算符复制对象并比较 nested reference，理解 shallow copy 不等于 deep clone。

### Lesson RE-IMMUTABLE-004：正确更新一层 Object State

实践 property replace、multiple fields、dynamic key，并保持旧对象不变。

### Lesson RE-IMMUTABLE-005：Nested Object State 应该怎么更新

手工逐层 copy，观察代码复杂度并为 State Shape / Normalization 做铺垫。

### Lesson RE-IMMUTABLE-006：Array append / prepend / remove / replace 的不可变写法

使用 spread、filter、map 等已有 JavaScript 能力完成常见更新。

### Lesson RE-IMMUTABLE-007：Array sort / reverse 为什么特别容易误改 State

复现原地 sort/reverse 造成的 Mutation，并使用 copy-before-mutate 修复。

### Lesson RE-IMMUTABLE-008：数组中的对象怎么更新

处理 `Array<Object>` 中单条记录修改、删除、批量标记，避免同时修改数组和内部对象。

### Lesson RE-IMMUTABLE-009：为什么“深拷贝一切”不是正确答案

比较 deep clone 的性能、Prototype/Date/Map 丢失风险和无意义 identity 变化，理解只复制改变路径的原则。

### Lesson RE-IMMUTABLE-010：Immer 的 Draft 为什么看起来可以直接修改

引入 Immer 类方案，理解 Proxy/Draft/Structural Sharing 高层模型以及它解决的是可读性而不是取消不可变约束。

### Lesson RE-IMMUTABLE-011：什么时候值得使用 Immer，什么时候普通更新更清晰

用简单表单和深层编辑器两个案例比较依赖成本、Debug、Bundle、团队认知和代码复杂度。

### Lesson RE-IMMUTABLE-012：Structural Sharing 与 Render Performance 有什么关系

建立 unchanged reference / changed reference 对 Memoization、Selector、Context 的前置意义。

### Lesson RE-IMMUTABLE-013：Mutation Bug 为什么在复杂 React 中更难排查

用共享引用导致“修改 A 却影响 B”的案例，结合 Object Freeze / DevTools / Test 定位。

### Lesson RE-IMMUTABLE-014：State Shape 不合理会让不可变更新变得多痛苦

观察深层嵌套数据更新，提出 flatten / normalize 的问题，但完整 State Modeling 留到 11.14。

### Lesson RE-IMMUTABLE-015：综合实现——可编辑订单行的不可变更新

在订单数据中完成增删改、批量标记、排序与撤销前置数据结构，所有修改都通过运行测试验证原对象没有被污染。

---

本 Module 完整回答“React 为什么有时保留 State、有时重置 State”。这是 Key、条件渲染、Tabs、Form Reset、Activity、Reconciliation 甚至 Bug 定位的关键基础。

### Lesson RE-IDENTITY-001：State 为什么必须绑定到某个组件身份

从两个 Counter 独立 State 重新解释 React 如何把 State 与 Tree 中的位置关联。

### Lesson RE-IDENTITY-002：相同位置 + 相同 Component Type 会发生什么

切换 Props 但保持 Tree Position / Type，观察 State 被保留。

### Lesson RE-IDENTITY-003：相同位置换成不同 Component Type 会发生什么

在 Counter 与 Paragraph / Different Component 间切换，观察 State 被销毁并重建。

### Lesson RE-IDENTITY-004：JSX 代码位置和 Tree Position 是一回事吗

用条件分支看起来写了两份 JSX、实际仍落在同一 Tree Position 的例子纠正常见误解。

### Lesson RE-IDENTITY-005：Key 如何主动改变组件身份

在非列表场景用 Key 重置 Chat / Profile / Form，理解 Key 是 identity hint 而不只是列表属性。

### Lesson RE-IDENTITY-006：为什么把 Component Definition 写在另一个 Component 内部会重置 State

连接 Module 11.06 的 Nested Definition，从 Component Type 每次变新的角度完整解释。

### Lesson RE-IDENTITY-007：表单什么时候应该保留，什么时候应该重置

用编辑不同用户资料的场景比较 preserve state、key reset、手工清空 state 三种策略。

### Lesson RE-IDENTITY-008：Tabs 切换为什么默认可能丢失隐藏页面 State

比较 conditional unmount、CSS hide、保留组件树三种策略，为 Activity 做前置。

### Lesson RE-IDENTITY-009：Modal / Drawer 关闭后 State 应不应该消失

从业务语义而不是技术偏好决定 unmount / preserve，并讨论 Draft、Privacy、Memory 取舍。

### Lesson RE-IDENTITY-010：State Preservation 与 DOM Preservation 是一回事吗

观察组件 State、Fiber 身份和真实 DOM 节点复用可能不完全等价，建立更准确的分层模型。

### Lesson RE-IDENTITY-011：如何用 React DevTools 判断组件到底被更新还是重新挂载

通过 Profiler / mount log / Effect 前置观察区分 update 与 remount，形成实际 Debug 手段。

### Lesson RE-IDENTITY-012：Identity Bug 综合——错误 Key、Nested Component、条件树

一次复现三种导致意外重置/串 State 的问题，并根据 Type + Position + Key 模型定位。

### Lesson RE-IDENTITY-013：从 Identity 高层模型连接到 Reconciler

画出 Element Type / Key → Child Reconciliation → Fiber reuse/reset 的连接图，源码验证留到 Reconciler Module。

---
