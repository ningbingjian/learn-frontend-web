# Chapter 10：Ref、DOM 与 Escape Hatches

> [返回 React 模块索引](../README.md)

本 Chapter 研究声明式数据流之外的必要逃生口：非渲染数据、DOM 节点、callback ref 生命周期，以及对外暴露最小命令式能力。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 什么数据不应触发 Render？什么时候必须与 DOM/命令式系统交互？ |
| 主教学模式 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 辅助模式 | `FAILURE-LAB` |
| Learning Artifact | Ref/State 对照、DOM focus/measure、callback ref attach/cleanup 日志 |
| Wrong Way | Ref 驱动主 UI、Render 中操作 DOM、把整个 DOM 暴露给父组件 |
| Module DoD | 能区分 State/Ref，并安全使用 DOM ref 与最小 imperative handle |

## 课程索引

| 编号 | 知识点 | 教学状态 |
|---|---|---|
| RE-KP091 | useRef 保存非渲染数据 | 已重构 · v1.0 |
| RE-KP092 | Ref vs State | 已重构 · v1.0 |
| RE-KP093 | DOM Ref | 已重构 · v1.0 |
| RE-KP094 | React 19 ref as prop | 已重构 · v1.0 |
| RE-KP095 | Ref Callback | 已重构 · v1.0 |
| RE-KP096 | React 19 Ref Cleanup | 已重构 · v1.0 |
| RE-KP097 | useImperativeHandle | 已重构 · v1.0 |
| RE-KP098 | 最小 Imperative Handle | 已重构 · v1.0 |
| RE-KP099 | 测量 DOM | 已完成 · 待重构 |
| RE-KP100 | 管理焦点 | 已完成 · 待重构 |

## 当前进度
- 知识点完成度：**10 / 10**
- 新教学规范重构：**8 / 10**
- 下一重构范围：**RE-KP099～104**
