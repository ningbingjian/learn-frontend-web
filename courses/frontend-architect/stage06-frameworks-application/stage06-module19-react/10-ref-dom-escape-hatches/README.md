# Chapter 10：Ref、DOM 与 Escape Hatches

> [返回 React 模块索引](../README.md)

本 Chapter 研究声明式数据流之外的必要逃生口：非渲染数据、DOM 节点、callback ref 生命周期，以及最小命令式能力。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 什么数据不应触发 Render？什么时候必须与 DOM/命令式系统交互？ |
| 主教学模式 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 辅助模式 | `FAILURE-LAB` |
| Learning Artifact | Ref/State 对照、focus/measure、callback ref lifecycle |
| Wrong Way | Ref 驱动主 UI、Render 中操作 DOM、暴露整个 DOM |
| Module DoD | 能区分 State/Ref，并安全管理 DOM 与最小 imperative API |

## 课程索引

| 编号 | 知识点 | 教学状态 |
|---|---|---|
| RE-KP091～098 | Ref 基础、DOM Ref、React 19 Ref、Imperative Handle | 已重构 · v1.0 |
| RE-KP099 | 测量 DOM | 已重构 · v1.0 |
| RE-KP100 | 管理焦点 | 已重构 · v1.0 |

## 当前进度
- 知识点完成度：**10 / 10**
- 新教学规范重构：**10 / 10，已完成**
- 下一重构范围：**Chapter 11**
