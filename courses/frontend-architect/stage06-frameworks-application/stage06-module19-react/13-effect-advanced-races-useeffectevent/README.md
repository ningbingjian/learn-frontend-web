# Chapter 13：Effect 高阶、竞态与 useEffectEvent

> [返回 React 模块索引](../README.md)

本 Chapter 从“先删除不必要 Effect”开始，再处理请求竞态、取消、对象/函数依赖、Effect Event 与无限循环诊断。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 怎样减少 Effect 数量，并让真正需要的 Effect 面对异步竞态和依赖变化仍然正确？ |
| 主模式 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| 辅助模式 | `BUILD-LAB` |
| Learning Artifact | Race 复现、Abort、dependency identity、infinite loop 诊断 |
| Wrong Way | 派生 State Effect、事件 Effect、忽略竞态、删依赖 |
| Module DoD | 能先消除不必要 Effect，再解决真实同步问题 |

## 课程索引

| 编号 | 知识点 | 教学状态 |
|---|---|---|
| RE-KP121 | You Might Not Need an Effect | 已重构 · v1.0 |
| RE-KP122 | Render 中计算派生数据 | 已重构 · v1.0 |
| RE-KP123～130 | 待重构 |

## 当前进度
- 知识点完成度：**10 / 10**
- 新教学规范重构：**2 / 10**
- 下一重构范围：**RE-KP123～128**
