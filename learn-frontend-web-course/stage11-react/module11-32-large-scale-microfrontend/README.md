# Module 11.32：Large-scale React Architecture 与 Microfrontend Boundary

> [← Module 11.31：React Library 与 Headless Component Architecture](../module11-31-library-headless/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.33：Legacy React 与 Migration →](../module11-33-legacy-migration/README.md)

本 Module 只讨论大型 React 应用中的 React-specific Boundary：Component/Feature Ownership、State/Route/Async/Error、Shared React、Context 与 Runtime Isolation。DDD、Microfrontend 通用模式、Bundler Federation 与组织级架构治理分别由后续 Stage 27/16/28 完整教授；当前所需 dependency graph / federation host 作为教学基础设施提供。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（28 课）</strong></summary>

- [RE-ARCH-001：大型 React 项目为什么不能只按 components/hooks/pages 分目录](#lesson-re-arch-001)
- [RE-ARCH-002：Feature / Domain Boundary 如何识别](#lesson-re-arch-002)
- [RE-ARCH-003：一个 Module 的 Public API 应该是什么](#lesson-re-arch-003)
- [RE-ARCH-004：Dependency Direction 如何避免循环依赖](#lesson-re-arch-004)
- [RE-ARCH-005：DTO / Domain Model / ViewModel 为什么值得分开](#lesson-re-arch-005)
- [RE-ARCH-006：State Owner 应该和 Domain Owner 一致吗](#lesson-re-arch-006)
- [RE-ARCH-007：Route Owner 如何定义](#lesson-re-arch-007)
- [RE-ARCH-008：Async Boundary 如何成为架构元素](#lesson-re-arch-008)
- [RE-ARCH-009：Error Boundary 应该按技术层还是业务隔离半径划分](#lesson-re-arch-009)
- [RE-ARCH-010：Context/Provider 应该放在什么边界](#lesson-re-arch-010)
- [RE-ARCH-011：Cross-feature Communication 应该怎么做](#lesson-re-arch-011)
- [RE-ARCH-012：Feature Flag 如何不污染每个 Component](#lesson-re-arch-012)
- [RE-ARCH-013：大型 React App 的 Code Splitting 应跟什么边界走](#lesson-re-arch-013)
- [RE-ARCH-014：Architecture Fitness Function 如何自动阻止越层依赖](#lesson-re-arch-014)
- [RE-ARCH-015：多人团队 Ownership 如何映射 CODEOWNERS / Module](#lesson-re-arch-015)
- [RE-ARCH-016：React App ADR 应该记录哪些决策](#lesson-re-arch-016)
- [RE-ARCH-017：综合重构——把 Enterprise SPA 从技术目录改成 Domain Module](#lesson-re-arch-017)
- [RE-ARCH-018：Large-scale React Architecture Review](#lesson-re-arch-018)
- [RE-MFE-001：一个页面多个 React Root 与真正 Microfrontend 有什么区别](#lesson-re-mfe-001)
- [RE-MFE-002：为什么两份 React 可能造成 Hook/Context 问题](#lesson-re-mfe-002)
- [RE-MFE-003：在 Module Federation 场景如何验证 Shared React / Singleton](#lesson-re-mfe-003)
- [RE-MFE-004：Context 能不能自动跨 Microfrontend Root](#lesson-re-mfe-004)
- [RE-MFE-005：Router Ownership 冲突怎么发生](#lesson-re-mfe-005)
- [RE-MFE-006：Design System Component 跨不同 React Version 如何治理](#lesson-re-mfe-006)
- [RE-MFE-007：Error Boundary 能隔离到什么程度](#lesson-re-mfe-007)
- [RE-MFE-008：SSR/RSC 下 Microfrontend React Boundary 更复杂在哪里](#lesson-re-mfe-008)
- [RE-MFE-009：React Microfrontend Migration 如何避免 Big Bang](#lesson-re-mfe-009)
- [RE-MFE-010：综合评审——什么时候根本不值得上 Microfrontend](#lesson-re-mfe-010)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-arch-001"></a>
### Lesson RE-ARCH-001：大型 React 项目为什么不能只按 components/hooks/pages 分目录

观察技术分类在业务增长后的耦合扩散。

<a id="lesson-re-arch-002"></a>
### Lesson RE-ARCH-002：Feature / Domain Boundary 如何识别

从业务变化原因和 ownership 拆模块。

<a id="lesson-re-arch-003"></a>
### Lesson RE-ARCH-003：一个 Module 的 Public API 应该是什么

用 index/export boundary 禁止任意 deep import。

<a id="lesson-re-arch-004"></a>
### Lesson RE-ARCH-004：Dependency Direction 如何避免循环依赖

定义 app/feature/entity/shared/infrastructure 或自定义层级规则。

<a id="lesson-re-arch-005"></a>
### Lesson RE-ARCH-005：DTO / Domain Model / ViewModel 为什么值得分开

不重复 Module 11.15 已学的 DTO/Domain/ViewModel 定义，而是检查这些模型在多个 React Feature 之间传播时如何影响依赖方向和 Public API。
<a id="lesson-re-arch-006"></a>
### Lesson RE-ARCH-006：State Owner 应该和 Domain Owner 一致吗

讨论 local/server/url/workflow data 的不同 owner。

<a id="lesson-re-arch-007"></a>
### Lesson RE-ARCH-007：Route Owner 如何定义

让业务 feature 拥有 route config/data boundary，而不是中央路由巨石。

<a id="lesson-re-arch-008"></a>
### Lesson RE-ARCH-008：Async Boundary 如何成为架构元素

统一 Query/Suspense/Transition/Error 的边界设计。

<a id="lesson-re-arch-009"></a>
### Lesson RE-ARCH-009：Error Boundary 应该按技术层还是业务隔离半径划分

设计 widget/feature/page/app failure domain。

<a id="lesson-re-arch-010"></a>
### Lesson RE-ARCH-010：Context/Provider 应该放在什么边界

避免 Global Provider Pyramid。

<a id="lesson-re-arch-011"></a>
### Lesson RE-ARCH-011：Cross-feature Communication 应该怎么做

比较 direct import、shared state、domain event、URL、server state。

<a id="lesson-re-arch-012"></a>
### Lesson RE-ARCH-012：Feature Flag 如何不污染每个 Component

建立 boundary / config adapter 和生命周期清理。

<a id="lesson-re-arch-013"></a>
### Lesson RE-ARCH-013：大型 React App 的 Code Splitting 应跟什么边界走

Route/feature/heavy capability 而非随机文件大小。

<a id="lesson-re-arch-014"></a>
### Lesson RE-ARCH-014：Architecture Fitness Function 如何自动阻止越层依赖

使用课程提供的 import-rule / dependency-graph 脚本验证越层依赖能被门禁阻止；静态分析工具链本身在后续 Testing/Tooling Stage 正式学习。
<a id="lesson-re-arch-015"></a>
### Lesson RE-ARCH-015：多人团队 Ownership 如何映射 CODEOWNERS / Module

让架构边界与责任边界一致。

<a id="lesson-re-arch-016"></a>
### Lesson RE-ARCH-016：React App ADR 应该记录哪些决策

State、Router、Data、SSR/RSC、Error、Compiler、Library Boundary。

<a id="lesson-re-arch-017"></a>
### Lesson RE-ARCH-017：综合重构——把 Enterprise SPA 从技术目录改成 Domain Module

保持功能不变，把 Enterprise SPA 从技术目录改成 Domain Module，并使用课程提供的 dependency graph 脚本观察跨域 import 变化。
<a id="lesson-re-arch-018"></a>
### Lesson RE-ARCH-018：Large-scale React Architecture Review

对 module boundary、state ownership、async/error boundary、build split 做系统评审。

---

本 Module只学习 React-specific Microfrontend 问题：Multiple Roots、React Singleton、Context/Router Boundary、Version Conflict、Shared Component、Error Isolation；完整微前端体系归后续架构 Stage。

<a id="lesson-re-mfe-001"></a>
### Lesson RE-MFE-001：一个页面多个 React Root 与真正 Microfrontend 有什么区别

区分技术挂载和独立团队/部署边界。

<a id="lesson-re-mfe-002"></a>
### Lesson RE-MFE-002：为什么两份 React 可能造成 Hook/Context 问题

理解 singleton/peer dependency/shared runtime。

<a id="lesson-re-mfe-003"></a>
### Lesson RE-MFE-003：在 Module Federation 场景如何验证 Shared React / Singleton

课程提供可运行 Federation Host/Remote 作为教学基础设施；本课只验证 React singleton、peer/shared runtime compatibility，不教授 Federation/Bundler 配置，完整机制留 Stage 16/27。
<a id="lesson-re-mfe-004"></a>
### Lesson RE-MFE-004：Context 能不能自动跨 Microfrontend Root

验证 root boundary，并设计显式 dependency bridge。

<a id="lesson-re-mfe-005"></a>
### Lesson RE-MFE-005：Router Ownership 冲突怎么发生

比较 shell router、sub-route ownership、history coordination。

<a id="lesson-re-mfe-006"></a>
### Lesson RE-MFE-006：Design System Component 跨不同 React Version 如何治理

讨论 package peer range 和 compatibility matrix。

<a id="lesson-re-mfe-007"></a>
### Lesson RE-MFE-007：Error Boundary 能隔离到什么程度

区分 React subtree error 与 script/runtime/global CSS failure。

<a id="lesson-re-mfe-008"></a>
### Lesson RE-MFE-008：SSR/RSC 下 Microfrontend React Boundary 更复杂在哪里

只建立版本、stream、module graph 风险地图。

<a id="lesson-re-mfe-009"></a>
### Lesson RE-MFE-009：React Microfrontend Migration 如何避免 Big Bang

用 route/feature strangler 渐进接管。

<a id="lesson-re-mfe-010"></a>
### Lesson RE-MFE-010：综合评审——什么时候根本不值得上 Microfrontend

从团队独立性、部署、运行时成本和复杂度做决策。

---

---

> [← Module 11.31：React Library 与 Headless Component Architecture](../module11-31-library-headless/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.33：Legacy React 与 Migration →](../module11-33-legacy-migration/README.md)
