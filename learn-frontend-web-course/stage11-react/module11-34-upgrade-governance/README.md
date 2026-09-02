# Module 11.34：React Upgrade Governance

> [← Module 11.33：Legacy React 与 Migration](../module11-33-legacy-migration/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.35：React Architecture Review 与最终综合项目 →](../module11-35-architecture-final/README.md)

本 Module 只治理 React Upgrade：Stable/Canary/Experimental、React ecosystem compatibility、Pilot、Canary、Rollback 与 Exception。通用 CI/Test/Monorepo/Technology Governance 由后续 Stage 16/17/28 负责，本 Module 使用既有工程 Harness 做 React 升级决策。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（12 课）</strong></summary>

- [RE-UPGRADE-001：Stable / Canary / Experimental 分别意味着什么](#lesson-re-upgrade-001)
- [RE-UPGRADE-002：React SemVer 能保护哪些边界，保护不了哪些内部集成](#lesson-re-upgrade-002)
- [RE-UPGRADE-003：如何持续跟踪 React Release / Security Advisory](#lesson-re-upgrade-003)
- [RE-UPGRADE-004：Dependency Compatibility Matrix 怎么维护](#lesson-re-upgrade-004)
- [RE-UPGRADE-005：Upgrade Pilot 应该选什么应用/Feature](#lesson-re-upgrade-005)
- [RE-UPGRADE-006：Canary Release 如何验证真实用户指标](#lesson-re-upgrade-006)
- [RE-UPGRADE-007：升级前后必须跑哪些 Test / Benchmark](#lesson-re-upgrade-007)
- [RE-UPGRADE-008：Rollback 为什么必须在升级前设计](#lesson-re-upgrade-008)
- [RE-UPGRADE-009：Temporary Exception 如何防止变成永久技术债](#lesson-re-upgrade-009)
- [RE-UPGRADE-010：多应用 Monorepo 如何分批升级 React](#lesson-re-upgrade-010)
- [RE-UPGRADE-011：如何写 React Upgrade RFC](#lesson-re-upgrade-011)
- [RE-UPGRADE-012：综合演练——模拟一次 React Major Upgrade Review](#lesson-re-upgrade-012)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-upgrade-001"></a>
### Lesson RE-UPGRADE-001：Stable / Canary / Experimental 分别意味着什么

建立生产使用和研究 track 的不同门槛。

<a id="lesson-re-upgrade-002"></a>
### Lesson RE-UPGRADE-002：React SemVer 能保护哪些边界，保护不了哪些内部集成

特别区分公开 API 与 RSC/bundler 底层版本敏感能力。

<a id="lesson-re-upgrade-003"></a>
### Lesson RE-UPGRADE-003：如何持续跟踪 React Release / Security Advisory

把 release watch 变成工程职责而非临时搜索。

<a id="lesson-re-upgrade-004"></a>
### Lesson RE-UPGRADE-004：Dependency Compatibility Matrix 怎么维护

React、react-dom、types、router、query、UI library、framework、compiler。

<a id="lesson-re-upgrade-005"></a>
### Lesson RE-UPGRADE-005：Upgrade Pilot 应该选什么应用/Feature

既有代表性又有可回滚性。

<a id="lesson-re-upgrade-006"></a>
### Lesson RE-UPGRADE-006：Canary Release 如何验证真实用户指标

错误率、performance、hydration、bundle、interaction。

<a id="lesson-re-upgrade-007"></a>
### Lesson RE-UPGRADE-007：升级前后必须跑哪些 Test / Benchmark

定义升级必须覆盖的 Unit/Integration/E2E/Visual/SSR/Performance/Bundle 验证矩阵，并执行课程现成 scripts；本课不重教各测试/构建工具。

<a id="lesson-re-upgrade-008"></a>
### Lesson RE-UPGRADE-008：Rollback 为什么必须在升级前设计

依赖 lock、build artifact、data/cache compatibility。

<a id="lesson-re-upgrade-009"></a>
### Lesson RE-UPGRADE-009：Temporary Exception 如何防止变成永久技术债

记录 owner、reason、expiry、remediation。

<a id="lesson-re-upgrade-010"></a>
### Lesson RE-UPGRADE-010：多应用 Monorepo 如何分批升级 React

在课程提供的多应用 workspace 中处理 shared package / peer range / React version consistency；Monorepo 工具与 workspace 工程化在 Stage 16 正式学习。

<a id="lesson-re-upgrade-011"></a>
### Lesson RE-UPGRADE-011：如何写 React Upgrade RFC

背景、breaking risk、compatibility、pilot、metrics、rollback、timeline。

<a id="lesson-re-upgrade-012"></a>
### Lesson RE-UPGRADE-012：综合演练——模拟一次 React Major Upgrade Review

面对一个有 SSR、Library、Legacy、Compiler 的组织级仓库给出 rollout 决策。

---

> [← Module 11.33：Legacy React 与 Migration](../module11-33-legacy-migration/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.35：React Architecture Review 与最终综合项目 →](../module11-35-architecture-final/README.md)
