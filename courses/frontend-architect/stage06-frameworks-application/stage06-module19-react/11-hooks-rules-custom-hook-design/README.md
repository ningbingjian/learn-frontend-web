# Chapter 11：Hooks 规则与 Custom Hook 设计

> [返回 React 模块索引](../README.md)

本 Chapter 从 Hooks 的调用规则开始，再把重复的 Stateful Logic 抽成可复用 Custom Hook，并设计稳定参数与返回 API。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | React 如何把 Hook 调用与组件实例状态对应？Custom Hook 怎样复用逻辑而不是共享 State？ |
| 主教学模式 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 辅助模式 | `FAILURE-LAB` + `ARCHITECTURE-LAB` |
| Learning Artifact | Hook 顺序故障、eslint 诊断、自定义 Hook API 重构 |
| Wrong Way | 条件 Hook、普通函数冒充 Hook、巨大 Hook、错误共享 State 心智模型 |
| Module DoD | 能遵守 Hook Rules，并设计可组合的 Custom Hook 参数/返回值 |

## 课程索引

| 编号 | 知识点 | 教学状态 |
|---|---|---|
| RE-KP101 | Hooks 顶层调用 | 已重构 · v1.0 |
| RE-KP102 | 普通 Hook 不能放条件/循环 | 已重构 · v1.0 |
| RE-KP103 | `use` 特殊例外 | 已重构 · v1.0 |
| RE-KP104 | eslint-plugin-react-hooks | 已重构 · v1.0 |
| RE-KP105～110 | Custom Hook 设计 | 已完成 · 待重构 |

## 当前进度
- 知识点完成度：**10 / 10**
- 新教学规范重构：**4 / 10**
- 下一重构范围：**RE-KP105～110**
