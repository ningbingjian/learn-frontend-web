# Module 11.29：Lane、Scheduler 与 Suspense / Activity Internals

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-28-hooks-update-queue-internals/README.md)  > · [下一个 Module](../module11-30-server-renderer-hydration-rsc-internals/README.md)

本 Module 完整学习 Update Priority、Lane、Pending/Suspended/Pinged/Entangled、Transition、Root Scheduling、Scheduler、Yield、Starvation 和 Expiration。

### Lesson RE-LANE-001：React 为什么不用一个简单 priority number

从多组可组合 pending work 理解 Lane bitmask 模型。

### Lesson RE-LANE-002：一次用户 Event 如何得到 Update Priority

连接 Event Priority 与 Lane Selection。

### Lesson RE-LANE-003：Sync Lane / Transition Lane 高层差异

通过 urgent + transition update 观察。

### Lesson RE-LANE-004：Root pendingLanes 表达什么

记录整个 Root 还欠哪些优先级工作。

### Lesson RE-LANE-005：suspendedLanes / pingedLanes 为什么存在

连接 Suspense resource pending/resolve。

### Lesson RE-LANE-006：Entangled Lanes 解决什么一致性问题

理解某些 transition updates 需要一起处理。

### Lesson RE-LANE-007：getNextLanes 如何选择下一批工作

通过断点观察优先级选择而不是背源码分支。

### Lesson RE-LANE-008：Scheduler Task 与 React Lane 是同一个东西吗

区分 React 更新优先级表示和 scheduler callback。

### Lesson RE-LANE-009：Concurrent Work Loop 什么时候 Yield

观察 shouldYield / time slicing 高层行为。

### Lesson RE-LANE-010：浏览器主线程被占满时 Scheduler 能做什么、不能做什么

明确 React 不是抢占式 OS scheduler。

### Lesson RE-LANE-011：Starvation 为什么需要 Expiration

低优先级工作不能永远得不到执行。

### Lesson RE-LANE-012：Transition 如何得到并传播 Lane

跟踪 startTransition 到 update lane。

### Lesson RE-LANE-013：Suspense Retry 为什么会安排新工作

Promise ping 后重新选择 lanes。

### Lesson RE-LANE-014：Lane 如何影响 Update Queue Rebase

连接被跳过 update 与未来 render。

### Lesson RE-LANE-015：综合源码实验——持续输入打断大列表 Transition

记录 event priority、lane、yield、restart、commit。

### Lesson RE-LANE-016：输出 Lane/Scheduler 决策图

把 Event → Lane → Root → Scheduler → Work Loop → Commit 串起来。

---

本 Module 从 Promise Suspend、Boundary Capture、Retry/Ping、Fallback、Offscreen/Hidden Tree、Transition 与 Activity 内部连接验证用户层行为。

### Lesson RE-SUSPENSESRC-001：Component “Suspend” 时源码里发生了什么

跟踪 thrown thenable / suspension signal 到 boundary 查找。

### Lesson RE-SUSPENSESRC-002：React 如何找到最近 Suspense Boundary

观察 boundary capture / flags 高层路径。

### Lesson RE-SUSPENSESRC-003：Fallback Fiber Tree 如何被构建

比较 primary / fallback subtree。

### Lesson RE-SUSPENSESRC-004：Promise Resolve 后 Ping 如何触发 Retry

跟踪 ping listener、pinged lane 和重新 schedule。

### Lesson RE-SUSPENSESRC-005：Nested Suspense 为什么能独立 Reveal

用 Fiber boundary/lanes 解释。

### Lesson RE-SUSPENSESRC-006：Transition 为什么可能保留旧 UI 而不马上 fallback

连接 lane priority 与 suspense handling。

### Lesson RE-SUSPENSESRC-007：Hidden / Offscreen Tree 内部需要保存什么

认识可见性、pending work、effect lifecycle 高层结构。

### Lesson RE-SUSPENSESRC-008：Activity 与 Hidden Tree 的内部连接怎么理解

按固定版本源码验证 visible/hidden 行为。

### Lesson RE-SUSPENSESRC-009：隐藏树 Effect 为什么需要特殊处理

连接用户层 Activity Effect Lifecycle。

### Lesson RE-SUSPENSESRC-010：Suspense Retry Storm 如何形成

制造频繁 promise identity/资源重建并看 schedule。

### Lesson RE-SUSPENSESRC-011：综合源码调试——一个 Lazy Component 从 Suspend 到 Reveal

记录 boundary、fallback、ping、retry、commit。

### Lesson RE-SUSPENSESRC-012：综合源码调试——Activity Hide/Show 的 Fiber/Effect 变化

对照用户层 State Preservation 与内部树行为。

---
