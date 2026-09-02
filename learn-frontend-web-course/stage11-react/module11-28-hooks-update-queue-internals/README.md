# Module 11.28：Hooks 与 Update Queue Internals

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-27-reconciler-render-commit/README.md)  > · [下一个 Module](../module11-29-lane-scheduler-suspense-internals/README.md)

本 Module 一次进入 Dispatcher、Hook Linked List、mount/update、useState/useReducer Queue、Effect、Memo/Ref 和 Hook Rules 的内部实现。

### Lesson RE-HOOKSRC-001：Function Component 的 Hook State 为什么需要 Linked List

从调用顺序映射到 hook node 顺序理解设计。

### Lesson RE-HOOKSRC-002：Dispatcher 是什么

观察 mount/update/rerender 不同 dispatcher 如何让同一个 useState API 走不同实现。

### Lesson RE-HOOKSRC-003：mountWorkInProgressHook 如何创建 Hook Node

记录 memoizedState/baseState/queue/next。

### Lesson RE-HOOKSRC-004：updateWorkInProgressHook 如何复用对应 Hook

连接 current hook 与 workInProgress hook。

### Lesson RE-HOOKSRC-005：为什么条件调用 Hook 会错位

直接从 linked list 顺序解释 Rules of Hooks。

### Lesson RE-HOOKSRC-006：mountState 如何初始化 State 与 Queue

跟踪 lazy initializer、dispatch binding。

### Lesson RE-HOOKSRC-007：dispatchSetState 从哪里开始

找到 Fiber、Queue、Action、Lane 的入口。

### Lesson RE-HOOKSRC-008：updateState / basicStateReducer 如何处理 replacement/updater

源码验证 Snapshot/Updater Module。

### Lesson RE-HOOKSRC-009：useReducer 与 useState 内部有什么共性

比较 reducer/queue 复用。

### Lesson RE-HOOKSRC-010：useRef 内部为什么只是稳定对象

源码验证 current mutation 不触发 queue。

### Lesson RE-HOOKSRC-011：useMemo / useCallback 如何保存 value + deps

观察 dependency compare 与 cached value/function。

### Lesson RE-HOOKSRC-012：Effect Hook 在 Hook Node 中保存什么

认识 Effect object、deps、create/destroy/tag。

### Lesson RE-HOOKSRC-013：Effect List / Fiber Flag 如何让 Commit 找到 Effect

连接 Hooks Render 与 Commit passive/layout。

### Lesson RE-HOOKSRC-014：Render-phase Update 为什么特殊

观察 render 中 setState 的限制/重新 Render 路径。

### Lesson RE-HOOKSRC-015：Hook 错误信息如何由 Dev Dispatcher / Rules 检测产生

理解开发诊断而非只看错误文本。

### Lesson RE-HOOKSRC-016：综合源码调试——同一组件 useState/useRef/useMemo/useEffect 的 Hook 链

记录 mount/update 两次 Render 的 linked list 和字段变化。

---

本 Module 专门把 setState → Update → Queue → Lane → Render → Base State 跑透，验证前面所有 Update Queue 行为模型。

### Lesson RE-QUEUE-001：一次 setState 会创建什么 Update

找到 action、lane 等关键字段。

### Lesson RE-QUEUE-002：Queue 的 pending Ring / Linked Structure 如何组织多个 Update

观察连续 Setter 入队。

### Lesson RE-QUEUE-003：为什么 Functional Updater 可以按顺序串起来

源码验证 reducer 对 action function 的处理。

### Lesson RE-QUEUE-004：Replacement Value 在 Queue 中本质是什么

验证 direct value 与 updater 进入统一模型。

### Lesson RE-QUEUE-005：Base State / Base Queue 为什么在并发优先级下需要存在

建立跳过低优先级 update 后未来重放的动机。

### Lesson RE-QUEUE-006：Lane 如何决定某次 Render 处理哪些 Update

制造 transition + urgent update 并观察 queue skip。

### Lesson RE-QUEUE-007：Eager State Optimization 解决什么

观察某些相同值 update 可能提前判定无变化的高层路径。

### Lesson RE-QUEUE-008：Batching 与 Queue 入队是同一件事吗

区分多个 update 收集和何时 schedule/render。

### Lesson RE-QUEUE-009：Interrupted Render 后 Queue 如何保持正确性

理解 current/workInProgress/base queue 协作。

### Lesson RE-QUEUE-010：Reducer Queue 与 State Queue 有哪些共同字段

对比 useReducer。

### Lesson RE-QUEUE-011：综合源码调试——十组 Update Queue Case

把前面 Snapshot Module 的预测逐一对应到源码对象。

### Lesson RE-QUEUE-012：输出 Update Queue 状态机图

标出 enqueue、merge、process、skip、commit、rebase。

---
