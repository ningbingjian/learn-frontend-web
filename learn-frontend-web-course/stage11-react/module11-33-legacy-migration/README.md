# Module 11.33：Legacy React 与 Migration

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-32-large-scale-microfrontend/README.md)  > · [下一个 Module](../module11-34-upgrade-governance/README.md)

本 Module 让学习者能维护 React 15～18、Class、Lifecycle、Legacy Context、HOC/Render Props、Old Redux/Router、CRA/Webpack、Enzyme，并理解这些模式与现代 React 的映射。

### Lesson RE-LEGACY-001：为什么资深 React 必须看得懂 Class Component

真实遗留系统不会因为新课程只讲 Hook 就消失。

### Lesson RE-LEGACY-002：Class Component State / setState 模型

比较 object merge、functional setState 与现代 Hook State。

### Lesson RE-LEGACY-003：Lifecycle Methods 完整映射

理解 mount/update/unmount、render、didMount/didUpdate/willUnmount。

### Lesson RE-LEGACY-004：Derived State Lifecycle 为什么危险

认识 getDerivedStateFromProps 等常见同步问题。

### Lesson RE-LEGACY-005：Error Boundary 为什么长期仍依赖 Class 实现形态

读取现有 error boundary code。

### Lesson RE-LEGACY-006：Legacy Context 与现代 Context 有什么差异

理解维护迁移而不是新项目使用。

### Lesson RE-LEGACY-007：HOC 解决了什么问题

分析 wrapper composition、prop collision、debug tree。

### Lesson RE-LEGACY-008：Render Props 解决了什么问题

理解逻辑复用与 JSX nesting。

### Lesson RE-LEGACY-009：HOC / Render Props 如何迁到 Custom Hook

识别哪些逻辑可直接迁、哪些 wrapper semantics 要保留。

### Lesson RE-LEGACY-010：旧 Redux connect / mapStateToProps 怎么读

理解 subscription/selector/dispatch mapping。

### Lesson RE-LEGACY-011：旧 React Router 常见模式怎么读

Switch/Route/history 等历史 API 到现代模型映射。

### Lesson RE-LEGACY-012：ReactDOM.render / hydrate 为什么需要迁移

连接 legacy root 与 modern root/concurrency。

### Lesson RE-LEGACY-013：Create React App 项目结构和隐式配置怎么理解

认识 react-scripts、eject、webpack/babel hidden config。

### Lesson RE-LEGACY-014：Enzyme 测试为什么迁移困难

识别 shallow implementation tests 与 modern behavior tests 差异。

### Lesson RE-LEGACY-015：React 17/18 行为差异中哪些会影响升级

关注 root、batching、StrictMode、concurrent foundation 等真实边界。

### Lesson RE-LEGACY-016：综合阅读——一套旧 React 管理后台从入口到状态/路由/测试

输出 Legacy Architecture Map 和迁移风险清单。

---

本 Module 系统学习 Class→Function、Legacy Context、Old Root、Old SSR、React 18→19、Manual Memo→Compiler、SPA→SSR/RSC、Codemod、Compatibility Layer、Feature Flag、Canary、Rollback。

### Lesson RE-MIGRATE-001：迁移前为什么必须先建立行为基线

用 E2E/Visual/metrics 固定当前系统合同。

### Lesson RE-MIGRATE-002：如何给 Legacy React 建 Dependency / Compatibility Inventory

记录 React、Router、State、UI Library、Build、Test、Browser。

### Lesson RE-MIGRATE-003：Class→Function 应该逐组件还是按 Feature

比较依赖、测试和回滚半径。

### Lesson RE-MIGRATE-004：Lifecycle→Effect 不能机械一一翻译

重新按 External Synchronization / Event / Derived Data 设计。

### Lesson RE-MIGRATE-005：Legacy Context→Modern Context 如何过渡

用 adapter/dual provider 控制迁移窗口。

### Lesson RE-MIGRATE-006：Old Root→createRoot 如何验证行为变化

关注 batching、strict/concurrent readiness 和 third-party integration。

### Lesson RE-MIGRATE-007：Old hydrate→hydrateRoot 如何处理 Mismatch / ID

建立 SSR upgrade checklist。

### Lesson RE-MIGRATE-008：React 18→19 升级如何做兼容矩阵

检查 library、types、framework、compiler、actions/ref changes。

### Lesson RE-MIGRATE-009：Manual Memo→Compiler 不能一键删除

先 pilot、profile、再按 evidence 清理。

### Lesson RE-MIGRATE-010：SPA→SSR 应该从哪些 Route 开始

按 SEO/TTFB/business value 选择 pilot。

### Lesson RE-MIGRATE-011：SPA→RSC 应该先拆 Server/Client Boundary

避免把现有全部 Component 直接 server 化。

### Lesson RE-MIGRATE-012：Codemod 能做什么，不能做什么

机械语法迁移与语义/architecture decision 分开。

### Lesson RE-MIGRATE-013：Compatibility Layer 如何降低 Big Bang 风险

建立 adapter/facade/bridge，但明确退出计划。

### Lesson RE-MIGRATE-014：Feature Flag / Dual Run 如何支持灰度

新旧实现并存、对比 metrics、快速 rollback。

### Lesson RE-MIGRATE-015：迁移过程中如何管理 Cache / URL / State Compatibility

避免新旧客户端数据协议不一致。

### Lesson RE-MIGRATE-016：综合项目——为 Legacy Admin 设计 6 个月 React Migration Plan

输出阶段、风险、测试、metrics、rollback 和 decommission plan。

---
