# Module 11.32：Large-scale React Architecture 与 Microfrontend Boundary

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-31-library-headless/README.md)  > · [下一个 Module](../module11-33-legacy-migration/README.md)

本 Module 从 Feature/Domain/Layer/Public API、DTO/Domain/ViewModel、State/Route/Async/Error Ownership、Dependency Rule、Architecture Test、Code Split 和多团队 Ownership 设计大型 React 应用。

### Lesson RE-ARCH-001：大型 React 项目为什么不能只按 components/hooks/pages 分目录

观察技术分类在业务增长后的耦合扩散。

### Lesson RE-ARCH-002：Feature / Domain Boundary 如何识别

从业务变化原因和 ownership 拆模块。

### Lesson RE-ARCH-003：一个 Module 的 Public API 应该是什么

用 index/export boundary 禁止任意 deep import。

### Lesson RE-ARCH-004：Dependency Direction 如何避免循环依赖

定义 app/feature/entity/shared/infrastructure 或自定义层级规则。

### Lesson RE-ARCH-005：DTO / Domain Model / ViewModel 为什么值得分开

避免 API shape 直接污染整个 UI。

### Lesson RE-ARCH-006：State Owner 应该和 Domain Owner 一致吗

讨论 local/server/url/workflow data 的不同 owner。

### Lesson RE-ARCH-007：Route Owner 如何定义

让业务 feature 拥有 route config/data boundary，而不是中央路由巨石。

### Lesson RE-ARCH-008：Async Boundary 如何成为架构元素

统一 Query/Suspense/Transition/Error 的边界设计。

### Lesson RE-ARCH-009：Error Boundary 应该按技术层还是业务隔离半径划分

设计 widget/feature/page/app failure domain。

### Lesson RE-ARCH-010：Context/Provider 应该放在什么边界

避免 Global Provider Pyramid。

### Lesson RE-ARCH-011：Cross-feature Communication 应该怎么做

比较 direct import、shared state、domain event、URL、server state。

### Lesson RE-ARCH-012：Feature Flag 如何不污染每个 Component

建立 boundary / config adapter 和生命周期清理。

### Lesson RE-ARCH-013：大型 React App 的 Code Splitting 应跟什么边界走

Route/feature/heavy capability 而非随机文件大小。

### Lesson RE-ARCH-014：Architecture Fitness Function 如何自动阻止越层依赖

用 ESLint/import rule/graph test 建门禁。

### Lesson RE-ARCH-015：多人团队 Ownership 如何映射 CODEOWNERS / Module

让架构边界与责任边界一致。

### Lesson RE-ARCH-016：React App ADR 应该记录哪些决策

State、Router、Data、SSR/RSC、Error、Compiler、Library Boundary。

### Lesson RE-ARCH-017：综合重构——把 Enterprise SPA 从技术目录改成 Domain Module

保持功能不变，减少跨域 import 并生成 dependency graph。

### Lesson RE-ARCH-018：Large-scale React Architecture Review

对 module boundary、state ownership、async/error boundary、build split 做系统评审。

---

本 Module只学习 React-specific Microfrontend 问题：Multiple Roots、React Singleton、Context/Router Boundary、Version Conflict、Shared Component、Error Isolation；完整微前端体系归后续架构 Stage。

### Lesson RE-MFE-001：一个页面多个 React Root 与真正 Microfrontend 有什么区别

区分技术挂载和独立团队/部署边界。

### Lesson RE-MFE-002：为什么两份 React 可能造成 Hook/Context 问题

理解 singleton/peer dependency/shared runtime。

### Lesson RE-MFE-003：Module Federation Shared React 如何配置和验证

只聚焦 React runtime compatibility。

### Lesson RE-MFE-004：Context 能不能自动跨 Microfrontend Root

验证 root boundary，并设计显式 dependency bridge。

### Lesson RE-MFE-005：Router Ownership 冲突怎么发生

比较 shell router、sub-route ownership、history coordination。

### Lesson RE-MFE-006：Design System Component 跨不同 React Version 如何治理

讨论 package peer range 和 compatibility matrix。

### Lesson RE-MFE-007：Error Boundary 能隔离到什么程度

区分 React subtree error 与 script/runtime/global CSS failure。

### Lesson RE-MFE-008：SSR/RSC 下 Microfrontend React Boundary 更复杂在哪里

只建立版本、stream、module graph 风险地图。

### Lesson RE-MFE-009：React Microfrontend Migration 如何避免 Big Bang

用 route/feature strangler 渐进接管。

### Lesson RE-MFE-010：综合评审——什么时候根本不值得上 Microfrontend

从团队独立性、部署、运行时成本和复杂度做决策。

---
