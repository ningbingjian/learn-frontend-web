# Module 11.33：Legacy React 与 Migration

> [← Module 11.32：Large-scale React Architecture 与 Microfrontend Boundary](../module11-32-large-scale-microfrontend/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.34：React Upgrade Governance →](../module11-34-upgrade-governance/README.md)

本 Module 让学习者能维护 React 15～18、Class、Lifecycle、Legacy Context、HOC/Render Props、Old Redux/Router、CRA/Webpack、Enzyme，并理解这些模式与现代 React 的映射。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（32 课）</strong></summary>

- [RE-LEGACY-001：为什么资深 React 必须看得懂 Class Component](#lesson-re-legacy-001)
- [RE-LEGACY-002：Class Component State / setState 模型](#lesson-re-legacy-002)
- [RE-LEGACY-003：Lifecycle Methods 完整映射](#lesson-re-legacy-003)
- [RE-LEGACY-004：Derived State Lifecycle 为什么危险](#lesson-re-legacy-004)
- [RE-LEGACY-005：Error Boundary 为什么长期仍依赖 Class 实现形态](#lesson-re-legacy-005)
- [RE-LEGACY-006：Legacy Context 与现代 Context 有什么差异](#lesson-re-legacy-006)
- [RE-LEGACY-007：HOC 解决了什么问题](#lesson-re-legacy-007)
- [RE-LEGACY-008：Render Props 解决了什么问题](#lesson-re-legacy-008)
- [RE-LEGACY-009：HOC / Render Props 如何迁到 Custom Hook](#lesson-re-legacy-009)
- [RE-LEGACY-010：旧 Redux connect / mapStateToProps 怎么读](#lesson-re-legacy-010)
- [RE-LEGACY-011：旧 React Router 常见模式怎么读](#lesson-re-legacy-011)
- [RE-LEGACY-012：ReactDOM.render / hydrate 为什么需要迁移](#lesson-re-legacy-012)
- [RE-LEGACY-013：Create React App 项目结构和隐式配置怎么理解](#lesson-re-legacy-013)
- [RE-LEGACY-014：Enzyme 测试为什么迁移困难](#lesson-re-legacy-014)
- [RE-LEGACY-015：React 17/18 行为差异中哪些会影响升级](#lesson-re-legacy-015)
- [RE-LEGACY-016：综合阅读——一套旧 React 管理后台从入口到状态/路由/测试](#lesson-re-legacy-016)
- [RE-MIGRATE-001：迁移前为什么必须先建立行为基线](#lesson-re-migrate-001)
- [RE-MIGRATE-002：如何给 Legacy React 建 Dependency / Compatibility Inventory](#lesson-re-migrate-002)
- [RE-MIGRATE-003：Class→Function 应该逐组件还是按 Feature](#lesson-re-migrate-003)
- [RE-MIGRATE-004：Lifecycle→Effect 不能机械一一翻译](#lesson-re-migrate-004)
- [RE-MIGRATE-005：Legacy Context→Modern Context 如何过渡](#lesson-re-migrate-005)
- [RE-MIGRATE-006：Old Root→createRoot 如何验证行为变化](#lesson-re-migrate-006)
- [RE-MIGRATE-007：Old hydrate→hydrateRoot 如何处理 Mismatch / ID](#lesson-re-migrate-007)
- [RE-MIGRATE-008：React 18→19 升级如何做兼容矩阵](#lesson-re-migrate-008)
- [RE-MIGRATE-009：Manual Memo→Compiler 不能一键删除](#lesson-re-migrate-009)
- [RE-MIGRATE-010：SPA→SSR 应该从哪些 Route 开始](#lesson-re-migrate-010)
- [RE-MIGRATE-011：SPA→RSC 应该先拆 Server/Client Boundary](#lesson-re-migrate-011)
- [RE-MIGRATE-012：Codemod 能做什么，不能做什么](#lesson-re-migrate-012)
- [RE-MIGRATE-013：Compatibility Layer 如何降低 Big Bang 风险](#lesson-re-migrate-013)
- [RE-MIGRATE-014：Feature Flag / Dual Run 如何支持灰度](#lesson-re-migrate-014)
- [RE-MIGRATE-015：迁移过程中如何管理 Cache / URL / State Compatibility](#lesson-re-migrate-015)
- [RE-MIGRATE-016：综合项目——为 Legacy Admin 设计 6 个月 React Migration Plan](#lesson-re-migrate-016)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-legacy-001"></a>
### Lesson RE-LEGACY-001：为什么资深 React 必须看得懂 Class Component

真实遗留系统不会因为新课程只讲 Hook 就消失。

<a id="lesson-re-legacy-002"></a>
### Lesson RE-LEGACY-002：Class Component State / setState 模型

比较 object merge、functional setState 与现代 Hook State。

<a id="lesson-re-legacy-003"></a>
### Lesson RE-LEGACY-003：Lifecycle Methods 完整映射

理解 mount/update/unmount、render、didMount/didUpdate/willUnmount。

<a id="lesson-re-legacy-004"></a>
### Lesson RE-LEGACY-004：Derived State Lifecycle 为什么危险

认识 getDerivedStateFromProps 等常见同步问题。

<a id="lesson-re-legacy-005"></a>
### Lesson RE-LEGACY-005：Error Boundary 为什么长期仍依赖 Class 实现形态

读取现有 error boundary code。

<a id="lesson-re-legacy-006"></a>
### Lesson RE-LEGACY-006：Legacy Context 与现代 Context 有什么差异

理解维护迁移而不是新项目使用。

<a id="lesson-re-legacy-007"></a>
### Lesson RE-LEGACY-007：HOC 解决了什么问题

分析 wrapper composition、prop collision、debug tree。

<a id="lesson-re-legacy-008"></a>
### Lesson RE-LEGACY-008：Render Props 解决了什么问题

理解逻辑复用与 JSX nesting。

<a id="lesson-re-legacy-009"></a>
### Lesson RE-LEGACY-009：HOC / Render Props 如何迁到 Custom Hook

识别哪些逻辑可直接迁、哪些 wrapper semantics 要保留。

<a id="lesson-re-legacy-010"></a>
### Lesson RE-LEGACY-010：旧 Redux connect / mapStateToProps 怎么读

理解 subscription/selector/dispatch mapping。

<a id="lesson-re-legacy-011"></a>
### Lesson RE-LEGACY-011：旧 React Router 常见模式怎么读

Switch/Route/history 等历史 API 到现代模型映射。

<a id="lesson-re-legacy-012"></a>
### Lesson RE-LEGACY-012：ReactDOM.render / hydrate 为什么需要迁移

连接 legacy root 与 modern root/concurrency。

<a id="lesson-re-legacy-013"></a>
### Lesson RE-LEGACY-013：Create React App 项目结构和隐式配置怎么理解

认识 react-scripts、eject、webpack/babel hidden config。

<a id="lesson-re-legacy-014"></a>
### Lesson RE-LEGACY-014：Enzyme 测试为什么迁移困难

识别 shallow implementation tests 与 modern behavior tests 差异。

<a id="lesson-re-legacy-015"></a>
### Lesson RE-LEGACY-015：React 17/18 行为差异中哪些会影响升级

关注 root、batching、StrictMode、concurrent foundation 等真实边界。

<a id="lesson-re-legacy-016"></a>
### Lesson RE-LEGACY-016：综合阅读——一套旧 React 管理后台从入口到状态/路由/测试

输出 Legacy Architecture Map 和迁移风险清单。

---

本 Module 系统学习 Class→Function、Legacy Context、Old Root、Old SSR、React 18→19、Manual Memo→Compiler、SPA→SSR/RSC、Codemod、Compatibility Layer、Feature Flag、Canary、Rollback。

<a id="lesson-re-migrate-001"></a>
### Lesson RE-MIGRATE-001：迁移前为什么必须先建立行为基线

用 E2E/Visual/metrics 固定当前系统合同。

<a id="lesson-re-migrate-002"></a>
### Lesson RE-MIGRATE-002：如何给 Legacy React 建 Dependency / Compatibility Inventory

记录 React、Router、State、UI Library、Build、Test、Browser。

<a id="lesson-re-migrate-003"></a>
### Lesson RE-MIGRATE-003：Class→Function 应该逐组件还是按 Feature

比较依赖、测试和回滚半径。

<a id="lesson-re-migrate-004"></a>
### Lesson RE-MIGRATE-004：Lifecycle→Effect 不能机械一一翻译

重新按 External Synchronization / Event / Derived Data 设计。

<a id="lesson-re-migrate-005"></a>
### Lesson RE-MIGRATE-005：Legacy Context→Modern Context 如何过渡

用 adapter/dual provider 控制迁移窗口。

<a id="lesson-re-migrate-006"></a>
### Lesson RE-MIGRATE-006：Old Root→createRoot 如何验证行为变化

关注 batching、strict/concurrent readiness 和 third-party integration。

<a id="lesson-re-migrate-007"></a>
### Lesson RE-MIGRATE-007：Old hydrate→hydrateRoot 如何处理 Mismatch / ID

建立 SSR upgrade checklist。

<a id="lesson-re-migrate-008"></a>
### Lesson RE-MIGRATE-008：React 18→19 升级如何做兼容矩阵

检查 library、types、framework、compiler、actions/ref changes。

<a id="lesson-re-migrate-009"></a>
### Lesson RE-MIGRATE-009：Manual Memo→Compiler 不能一键删除

先 pilot、profile、再按 evidence 清理。

<a id="lesson-re-migrate-010"></a>
### Lesson RE-MIGRATE-010：SPA→SSR 应该从哪些 Route 开始

按 SEO/TTFB/business value 选择 pilot。

<a id="lesson-re-migrate-011"></a>
### Lesson RE-MIGRATE-011：SPA→RSC 应该先拆 Server/Client Boundary

避免把现有全部 Component 直接 server 化。

<a id="lesson-re-migrate-012"></a>
### Lesson RE-MIGRATE-012：Codemod 能做什么，不能做什么

机械语法迁移与语义/architecture decision 分开。

<a id="lesson-re-migrate-013"></a>
### Lesson RE-MIGRATE-013：Compatibility Layer 如何降低 Big Bang 风险

建立 adapter/facade/bridge，但明确退出计划。

<a id="lesson-re-migrate-014"></a>
### Lesson RE-MIGRATE-014：Feature Flag / Dual Run 如何支持灰度

新旧实现并存、对比 metrics、快速 rollback。

<a id="lesson-re-migrate-015"></a>
### Lesson RE-MIGRATE-015：迁移过程中如何管理 Cache / URL / State Compatibility

避免新旧客户端数据协议不一致。

<a id="lesson-re-migrate-016"></a>
### Lesson RE-MIGRATE-016：综合项目——为 Legacy Admin 设计 6 个月 React Migration Plan

输出阶段、风险、测试、metrics、rollback 和 decommission plan。

---

---

> [← Module 11.32：Large-scale React Architecture 与 Microfrontend Boundary](../module11-32-large-scale-microfrontend/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.34：React Upgrade Governance →](../module11-34-upgrade-governance/README.md)
