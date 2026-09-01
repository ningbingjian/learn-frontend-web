# Chapter 10：Ref、DOM 与 Escape Hatches

> [返回 React 模块索引](../README.md)

本 Chapter 研究 React 声明式数据流之外的必要逃生口：保存不参与渲染的数据、获取 DOM、暴露最小命令式 API，以及测量/聚焦等浏览器集成。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 什么数据不应该触发 Render？什么时候必须直接和 DOM/命令式系统交互？ |
| 主教学模式 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 辅助模式 | `FAILURE-LAB` |
| Learning Artifact | Ref/State 对照、DOM focus/measure、callback ref lifecycle |
| Wrong Way | 用 Ref 驱动 UI、Render 期间读写 DOM、暴露整个 DOM 实现 |
| Module DoD | 能区分 State/Ref，并安全使用 DOM ref 与最小 imperative handle |

## 课程索引

| 编号 | 知识点 | 教学状态 |
|---|---|---|
| RE-KP091 | useRef 保存非渲染数据 | 已重构 · v1.0 |
| RE-KP092 | Ref vs State | 已重构 · v1.0 |
| RE-KP093 | DOM Ref | 已完成 · 待重构 |
| RE-KP094 | React 19 ref as prop | 已完成 · 待重构 |
| RE-KP095 | Ref Callback | 已完成 · 待重构 |
| RE-KP096 | React 19 Ref Cleanup | 已完成 · 待重构 |
| RE-KP097 | useImperativeHandle | 已完成 · 待重构 |
| RE-KP098 | 最小 Imperative Handle | 已完成 · 待重构 |
| RE-KP099 | 测量 DOM | 已完成 · 待重构 |
| RE-KP100 | 管理焦点 | 已完成 · 待重构 |

## 当前进度
- 知识点完成度：**10 / 10**
- 新教学规范重构：**2 / 10**
- 下一重构范围：**RE-KP093～098**
