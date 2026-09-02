# Module 11.13：Custom Hook 与 External Store Integration

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-12-effect-external-sync/README.md)  > · [下一个 Module](../module11-14-router-route-data/README.md)

本 Module 从逻辑复用进入 Hook API、生命周期、依赖、SSR、测试、Debug 和 Library 设计，避免“看到三行重复就抽 Hook”。

### Lesson RE-HOOK-001：Custom Hook 复用的到底是什么

区分逻辑复用与 State 实例共享，证明两个 Hook 调用拥有独立 State。

### Lesson RE-HOOK-002：第一个 Custom Hook

把可复用状态逻辑从 Component 提取，并保持 Hook 命名和调用规则。

### Lesson RE-HOOK-003：Hook 参数应该接受值、配置还是 Callback

比较 API 稳定性、Dependency 和调用体验。

### Lesson RE-HOOK-004：Hook 返回 Tuple 还是 Object

从字段数量、重命名、向后兼容和类型推断选择返回形态。

### Lesson RE-HOOK-005：Custom Hook 如何组合其他 Hook

建立 Hook Composition 和内部生命周期模型。

### Lesson RE-HOOK-006：Hook 内 Effect Dependency 如何设计

避免通过 API 设计把不稳定对象/函数强迫给使用者。

### Lesson RE-HOOK-007：Hook 如何暴露错误、Pending 与取消能力

设计异步 Hook 的完整状态合同，不吞异常。

### Lesson RE-HOOK-008：Hook 与 SSR / Hydration 边界

识别 window/document、server snapshot 和 client-only 初始化问题。

### Lesson RE-HOOK-009：useDebugValue 什么时候有价值

为复杂 Library Hook 提供 DevTools 可读状态，而不是所有 Hook 都加标签。

### Lesson RE-HOOK-010：如何测试 Custom Hook

优先通过消费组件行为验证，再讨论独立 Hook harness 的适用场景。

### Lesson RE-HOOK-011：Custom Hook 为什么不是 Service Layer

区分 React 生命周期逻辑、纯 Domain Function、API Client 和 Repository。

### Lesson RE-HOOK-012：Hook API Versioning 怎么避免破坏大量调用方

讨论返回结构、option object、deprecated field 和迁移策略。

### Lesson RE-HOOK-013：综合实现——useOnlineStatus / useMediaQuery / useDebouncedValue 的边界比较

分别识别 External Store、Browser Subscription、纯时间逻辑的不同实现策略。

---

本 Module 建立 React 与外部可变 Store 的正式订阅合同，并深入 tearing、snapshot identity、SSR 与自定义 Store 设计。

### Lesson RE-STORE-001：什么叫 External Mutable Store

用浏览器 online 状态和自定义 store 区分 React-owned State 与外部数据源。

### Lesson RE-STORE-002：为什么手工 useEffect + setState 订阅可能不够可靠

从并发 Render、订阅时序和 SSR 建立问题背景。

### Lesson RE-STORE-003：第一个 useSyncExternalStore

实现 subscribe + getSnapshot，并观察外部值变化触发 React 更新。

### Lesson RE-STORE-004：getSnapshot 为什么必须返回可缓存的稳定 Snapshot

制造每次返回新对象导致的循环/无意义更新问题。

### Lesson RE-STORE-005：subscribe 函数 Identity 为什么重要

比较模块级 subscribe 和 Render 内新函数，观察重复订阅。

### Lesson RE-STORE-006：Tearing 是什么

通过概念与可控实验理解同一次 UI Render 读取到不一致外部数据的风险。

### Lesson RE-STORE-007：getServerSnapshot 为什么存在

为 SSR 提供服务器值，并保持 Hydration 首次 Snapshot 一致。

### Lesson RE-STORE-008：用 useSyncExternalStore 封装 Browser Online State

完成浏览器事件订阅、SSR fallback 和测试。

### Lesson RE-STORE-009：用 useSyncExternalStore 封装 LocalStorage Store

处理 storage event、多 Tab、parse/version 和 local write 通知。

### Lesson RE-STORE-010：Selector 为什么是 External Store 性能的下一步问题

理解细粒度订阅和 Snapshot 切片，但不在这里重教 Zustand/Redux。

### Lesson RE-STORE-011：设计一个最小 External Store Contract

实现 getState/setState/subscribe 与 React Adapter，观察 React 之外也可以读写。

### Lesson RE-STORE-012：综合比较——Context、External Store、Server State 各自负责什么

通过同一页面把三类数据放回正确 Owner。

---
