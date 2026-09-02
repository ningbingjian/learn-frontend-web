# Module 11.34：React Upgrade Governance

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-33-legacy-migration/README.md)  > · [下一个 Module](../module11-35-architecture-final/README.md)

本 Module 将一次升级变成长期治理能力：Stable/Canary/Experimental、SemVer、安全公告、依赖兼容、Compiler/Framework、Pilot、Canary、Rollback、Exception 和组织流程。

### Lesson RE-UPGRADE-001：Stable / Canary / Experimental 分别意味着什么

建立生产使用和研究 track 的不同门槛。

### Lesson RE-UPGRADE-002：React SemVer 能保护哪些边界，保护不了哪些内部集成

特别区分公开 API 与 RSC/bundler 底层版本敏感能力。

### Lesson RE-UPGRADE-003：如何持续跟踪 React Release / Security Advisory

把 release watch 变成工程职责而非临时搜索。

### Lesson RE-UPGRADE-004：Dependency Compatibility Matrix 怎么维护

React、react-dom、types、router、query、UI library、framework、compiler。

### Lesson RE-UPGRADE-005：Upgrade Pilot 应该选什么应用/Feature

既有代表性又有可回滚性。

### Lesson RE-UPGRADE-006：Canary Release 如何验证真实用户指标

错误率、performance、hydration、bundle、interaction。

### Lesson RE-UPGRADE-007：升级前后必须跑哪些 Test / Benchmark

Unit/Integration/E2E/Visual/SSR/Performance/Bundle。

### Lesson RE-UPGRADE-008：Rollback 为什么必须在升级前设计

依赖 lock、build artifact、data/cache compatibility。

### Lesson RE-UPGRADE-009：Temporary Exception 如何防止变成永久技术债

记录 owner、reason、expiry、remediation。

### Lesson RE-UPGRADE-010：多应用 Monorepo 如何分批升级 React

处理 shared package/peer range 和一致性。

### Lesson RE-UPGRADE-011：如何写 React Upgrade RFC

背景、breaking risk、compatibility、pilot、metrics、rollback、timeline。

### Lesson RE-UPGRADE-012：综合演练——模拟一次 React Major Upgrade Review

面对一个有 SSR、Library、Legacy、Compiler 的组织级仓库给出 rollout 决策。

---
