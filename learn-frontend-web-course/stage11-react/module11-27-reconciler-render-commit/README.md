# Module 11.27：Reconciler 与 Render / Commit Pipeline

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-26-source-fiber/README.md)  > · [下一个 Module](../module11-28-hooks-update-queue-internals/README.md)

本 Module 一次学习 Element → Fiber、beginWork、completeWork、Child Reconciliation、Key、Placement/Delete/Reuse、Bailout 和 Diff，并用源码验证前面 Key/Identity 结论。

### Lesson RE-RECON-001：Reconciliation 真正比较的输入和输出是什么

当前 Fiber Tree + 新 Element 描述 → workInProgress Tree / effects。

### Lesson RE-RECON-002：beginWork 的职责是什么

根据 Fiber 类型和新输入决定子工作。

### Lesson RE-RECON-003：Function Component 在 beginWork 中如何被调用

跟踪 renderWithHooks 等入口高层路径。

### Lesson RE-RECON-004：reconcileChildren 在 mount/update 有何区别

观察是否追踪 Placement/Delete effects。

### Lesson RE-RECON-005：单个 Child Element 如何复用旧 Fiber

比较 type/key 条件。

### Lesson RE-RECON-006：Array Children 为什么需要 Key

直接断点验证 key 对 old fiber 匹配的影响。

### Lesson RE-RECON-007：Index Key Bug 在源码中如何出现

让数据重排后旧 Fiber 按位置被复用。

### Lesson RE-RECON-008：Random Key 为什么导致 Remount

观察旧 Fiber delete + 新 Fiber placement。

### Lesson RE-RECON-009：Placement Flag 什么时候被标记

区分新建、移动、保留。

### Lesson RE-RECON-010：Deletion 如何收集和提交

跟踪被移除 subtree 的 effect。

### Lesson RE-RECON-011：completeWork 的职责是什么

处理 Host instance、bubble flags/lanes 等完成工作。

### Lesson RE-RECON-012：Bailout 什么时候可以跳过子树

理解 props/lanes/context 等条件的高层逻辑。

### Lesson RE-RECON-013：React Diff 为什么不是“全树 O(n³) 最优算法”

理解基于 type/key 的工程启发式和约束。

### Lesson RE-RECON-014：Component Identity / State Preservation 在 Reconciler 哪验证

把 11.13 的行为模型对应到 fiber reuse/reset。

### Lesson RE-RECON-015：综合源码调试——列表插入/删除/重排三条路径

分别记录 reuse/placement/deletion 的 Fiber 变化。

### Lesson RE-RECON-016：输出 Reconciliation Decision Table

以 type/key/position/lanes 为输入总结可验证结果和边界。

---

本 Module 跑通 Schedule → Render → beginWork → completeWork → Commit，并深入 Mutation、Layout、Ref、Passive Effect 和 Error/Interrupted Render 边界。

### Lesson RE-PIPE-001：一次 Update 从什么时候进入 Render Pipeline

从 schedule/update root 高层入口开始。

### Lesson RE-PIPE-002：Render Phase 为什么允许被中断

连接 work loop、priority 和 pure render。

### Lesson RE-PIPE-003：Sync Render 与 Concurrent Render Loop 有何区别

比较工作循环选择。

### Lesson RE-PIPE-004：beginWork / completeWork 为什么形成“下行 + 上行”遍历

在 Fiber Tree 上画完整 DFS 工作路径。

### Lesson RE-PIPE-005：Render Phase 会直接修改可见 DOM 吗

用断点证明 Host mutation 留到 Commit。

### Lesson RE-PIPE-006：完成的 workInProgress Tree 什么时候成为 current

理解 root finishedWork 与 commit swap。

### Lesson RE-PIPE-007：Commit Mutation Phase 做什么

跟踪 Placement/Update/Deletion 到真实 DOM。

### Lesson RE-PIPE-008：Ref attach/detach 在 Commit 什么时候发生

连接 Ref Module 的生命周期行为。

### Lesson RE-PIPE-009：Layout Effect 为什么在 DOM Mutation 后、Paint 前

用源码路径对应 useLayoutEffect 行为。

### Lesson RE-PIPE-010：Passive Effect 为什么延后处理

跟踪 passive flags/queue 到后续 flush。

### Lesson RE-PIPE-011：Commit 为什么不能像 Render 一样随便中断

避免用户看到半提交 UI。

### Lesson RE-PIPE-012：Render 抛 Error / Suspend 时 Pipeline 怎么变化

建立 unwind/retry/boundary 的高层连接。

### Lesson RE-PIPE-013：Interrupted Render 的 workInProgress 会怎样

理解丢弃/重启而 current 保持稳定。

### Lesson RE-PIPE-014：Profiler Commit 与源码 Commit 如何对齐

把工具时间线映射到内部阶段。

### Lesson RE-PIPE-015：综合源码调试——一次 Button setState 到 DOM Text 更新

记录 schedule、render、complete、commit mutation 全调用链。

### Lesson RE-PIPE-016：输出 React Render/Commit 时序图

把 Event、Update Queue、Lane、Fiber Work、DOM、Layout/Passive Effect 串在同一图中。

---
