# Chapter 08：状态建模、提升状态与受控设计

> [返回 React 模块索引](../README.md)

本 Chapter 从“State 应该放在哪里”进入状态建模：减少重复事实、确定 Owner、在需要协同时提升 State，并通过受控/非受控 API 设计组件边界。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 一份业务事实到底应该由谁拥有？多个组件怎样共享而不制造重复/冲突 State？ |
| 主教学模式 | `BUILD-LAB` + `ARCHITECTURE-LAB` |
| 辅助教学模式 | `FAILURE-LAB` |
| 贯穿实验 | 同步面板、输入组件、筛选/选择器逐步重构 |
| Learning Artifact | 可运行 Demo、State Ownership 图、API Trade-off 表 |
| Wrong Way | 重复 State、双向同步 Effect、无脑提升、Props Drilling 误判 |
| Module DoD | 能为组件树说明 State Owner、Derived Data、控制边界与生命周期 |

## 课程索引

| 编号 | 知识点 | 教学状态 |
|---|---|---|
| RE-KP071 | Single Source of Truth | 已重构 · v1.0 |
| RE-KP072 | 状态提升 | 已重构 · v1.0 |
| RE-KP073 | 受控组件 | 已重构 · v1.0 |
| RE-KP074 | 非受控组件 | 已重构 · v1.0 |
| RE-KP075 | 受控与非受控的选择 | 已重构 · v1.0 |
| RE-KP076 | Props Drilling 的识别 | 已重构 · v1.0 |
| RE-KP077 | 状态放置原则 | 已重构 · v1.0 |
| RE-KP078 | 状态生命周期设计 | 已重构 · v1.0 |
| RE-KP079 | 状态归属与组件边界 | 已重构 · v1.0 |
| RE-KP080 | 有限状态思维 | 已重构 · v1.0 |

## 当前进度

- 知识点完成度：**10 / 10**
- 新教学规范重构：**10 / 10，已完成**
- 下一重构范围：**Chapter 09**
