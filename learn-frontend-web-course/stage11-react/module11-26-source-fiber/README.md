# Module 11.26：React Source Research 与 Fiber Model

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-25-rsc-server-functions-data/README.md)  > · [下一个 Module](../module11-27-reconciler-render-commit/README.md)

本 Module 先建立可重复源码研究方法，再进入 Fiber。目标是避免“搜索源码名词然后背结论”。

### Lesson RE-SOURCE-001：为什么源码学习必须固定 React Version / Commit

保证文件、调用链和实验结果可重复。

### Lesson RE-SOURCE-002：React 仓库 Packages 大地图怎么看

认识 react、react-dom、reconciler、scheduler、server 等主要边界。

### Lesson RE-SOURCE-003：如何构建可 Debug 的 React 本地版本

建立开发 build、fixture/test 和 Source Map。

### Lesson RE-SOURCE-004：如何让自己的最小 Demo 使用本地 React Build

避免 Debug 到 npm 压缩/不同版本代码。

### Lesson RE-SOURCE-005：源码问题必须先写 Hypothesis

例如“setState 后 Update 存在哪里”，先提出可验证猜测。

### Lesson RE-SOURCE-006：如何选择第一个断点而不是到处单步

从公开 API / dispatch / schedule / commit 入口逐层缩小。

### Lesson RE-SOURCE-007：Call Stack、Object Snapshot、Conditional Breakpoint 怎么配合

记录关键对象而不是只截图代码行。

### Lesson RE-SOURCE-008：如何使用 Git Blame / Commit 历史理解代码意图

把当前实现与设计演进连接，但不把历史当稳定 API。

### Lesson RE-SOURCE-009：源码结论如何通过第二个实验反证

改变 key、priority、hook type 等输入验证机制不是偶然。

### Lesson RE-SOURCE-010：建立统一 React Source Debug Report 模板

包含版本、问题、复现、断点、调用链、对象、结论、边界和未验证项。

---

本 Module 从 Fiber 为什么存在一路深入 Node 字段、树链接、current/workInProgress、alternate、flags、lanes、memoized state/props、updateQueue 和调试观察。

### Lesson RE-FIBER-001：Stack Reconciler 的限制为什么催生 Fiber

从可中断工作和优先级调度理解设计动机。

### Lesson RE-FIBER-002：Fiber Node 是什么对象

在源码和运行快照中定位 Fiber 基本字段。

### Lesson RE-FIBER-003：child / sibling / return 如何表示树

把普通多叉树映射为 Fiber 链接结构。

### Lesson RE-FIBER-004：Fiber 为什么没有简单 parent.children 数组

从遍历/工作单元结构理解链接设计。

### Lesson RE-FIBER-005：tag / elementType / type 分别表达什么

比较 Host、Function Component 等 Fiber 类型信息。

### Lesson RE-FIBER-006：pendingProps 与 memoizedProps 有何差异

观察当前输入和已完成输入。

### Lesson RE-FIBER-007：memoizedState 为什么不只表示 useState

认识 Function Hook 链、Class/HostRoot 等不同含义。

### Lesson RE-FIBER-008：updateQueue 在不同 Fiber 上承担什么

先建立 HostRoot/Function Effect/State Update 的多种队列概念。

### Lesson RE-FIBER-009：flags / subtreeFlags 解决什么 Commit 问题

理解 Render 阶段标记副作用、Commit 阶段快速遍历。

### Lesson RE-FIBER-010：lanes 字段为什么属于 Fiber

记录该节点/子树待处理优先级工作。

### Lesson RE-FIBER-011：current 与 workInProgress 为什么需要两棵树

建立双缓冲树与原子 Commit 模型。

### Lesson RE-FIBER-012：alternate 如何连接两棵 Fiber

通过更新前后快照观察对应关系。

### Lesson RE-FIBER-013：Fiber 与 React Element 为什么不是一回事

Element 是本次 UI 描述，Fiber 是跨 Render 保存运行工作/状态的节点。

### Lesson RE-FIBER-014：Fiber 与 DOM Node 如何连接

观察 stateNode 等宿主关联。

### Lesson RE-FIBER-015：一个 Function Component 的 Hook State 在 Fiber 哪里

连接 memoizedState 到 Hook linked list，详细结构留 11.66。

### Lesson RE-FIBER-016：综合源码观察——打印一棵最小 App Fiber Tree

记录 type/tag/child/sibling/return/alternate/flags/lanes，并与 Element/DOM Tree 对照。

---
