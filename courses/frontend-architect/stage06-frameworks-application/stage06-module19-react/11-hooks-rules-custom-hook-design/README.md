# Chapter 11：Hooks 规则与 Custom Hook 设计

> [返回 React 模块索引](../README.md)

本 Chapter 先用“Hook 调用顺序”建立规则直觉，再把重复的 Stateful Logic 提炼成可复用 Custom Hook，并设计稳定参数、返回值与 Effect 边界。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | React 如何稳定关联 Hook State？Custom Hook 怎样复用逻辑而不是共享 State？ |
| 主模式 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 辅助模式 | `FAILURE-LAB` + `ARCHITECTURE-LAB` |
| Learning Artifact | Hook 顺序故障、lint 诊断、自定义 Hook API 重构 |
| Wrong Way | 条件 Hook、普通函数冒充 Hook、巨大 Hook、把复用逻辑误解为共享 State |
| Module DoD | 能遵守 Hooks Rules，并设计可组合 Custom Hook 参数、返回值与 Effect 生命周期 |

## 课程索引

| 编号 | 知识点 | 教学状态 |
|---|---|---|
| RE-KP101～104 | Hooks Rules / `use` / ESLint | 已重构 · v1.0 |
| RE-KP105 | Custom Hook 命名 | 已重构 · v1.0 |
| RE-KP106 | 复用状态逻辑而不是 State | 已重构 · v1.0 |
| RE-KP107 | Custom Hook 参数设计 | 已重构 · v1.0 |
| RE-KP108 | Custom Hook 返回值设计 | 已重构 · v1.0 |
| RE-KP109 | Object vs Tuple Return | 已重构 · v1.0 |
| RE-KP110 | Custom Hook 中的 Effect | 已重构 · v1.0 |

## 当前进度
- 知识点完成度：**10 / 10**
- 新教学规范重构：**10 / 10，已完成**
- 下一重构范围：**Chapter 12**
