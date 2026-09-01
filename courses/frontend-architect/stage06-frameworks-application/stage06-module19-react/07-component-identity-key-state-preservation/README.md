# Chapter 07：组件身份、Key 与状态保存

> [返回 React 模块索引](../README.md)

本 Chapter 通过一组可重复实验回答：**为什么 React 有时保留 State，有时又会把 State 重置？** 核心不是 JSX 写在哪一行，而是 React 如何根据 Render Tree 中的位置、组件类型与 `key` 判断身份。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | React 根据什么判断“这还是刚才那个组件”？State 为什么跟着某些 UI 身份走？ |
| 主教学模式 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 辅助教学模式 | `FAILURE-LAB` |
| 贯穿实验 | Counter / Form / List，通过切换位置、类型和 key 观察 State 保留、重置与错位 |
| Learning Artifact | 可运行 Demo、Render Tree 图、输入框/计数 State 观察 |
| 源码主线 | 暂不读 Reconciler 源码；先掌握公开 Identity 模型 |
| Wrong Way | 把源代码行号当 Position；滥用 index/random key；组件定义嵌套导致类型变化 |
| Module DoD | 能依据 Position + Type + Key 在运行前预测 State Preserve / Reset |

## 课程索引

| 编号 | 知识点 | 包含内容 | 文档与源码 | 教学状态 |
|---|---|---|---|---|
| RE-KP061 | 组件树中的位置决定身份 | Render Tree / Position / State Identity | [文档](./kp061-tree-position-component-identity/README.md) · [源码](./kp061-tree-position-component-identity/src/main.jsx) | 已重构 · v1.0 |
| RE-KP062 | 相同位置相同组件保留状态 | Same Position / Same Type / Prop Change | [文档](./kp062-same-position-same-component/README.md) · [源码](./kp062-same-position-same-component/src/main.jsx) | 已重构 · v1.0 |
| RE-KP063 | 组件类型变化导致状态重置 | Type Change / Unmount / Reset | [文档](./kp063-component-type-change-reset/README.md) · [源码](./kp063-component-type-change-reset/src/main.jsx) | 已完成 · 待重构 |
| RE-KP064 | key 不只是列表警告 | Identity Hint / Sibling Scope / key Prop | [文档](./kp064-key-beyond-list-warning/README.md) · [源码](./kp064-key-beyond-list-warning/src/main.jsx) | 已完成 · 待重构 |
| RE-KP065 | 使用 key 主动重置状态 | Reset Form / Entity Identity / Key Change | [文档](./kp065-key-reset-state/README.md) · [源码](./kp065-key-reset-state/src/main.jsx) | 已完成 · 待重构 |
| RE-KP066 | 列表 key 的稳定性要求 | Stable ID / Reorder / Local State | [文档](./kp066-list-key-stability/README.md) · [源码](./kp066-list-key-stability/src/main.jsx) | 已完成 · 待重构 |
| RE-KP067 | 为什么不能滥用数组索引 key | Index Key / Insert Delete Reorder / Misalignment | [文档](./kp067-index-key-problems/README.md) · [源码](./kp067-index-key-problems/src/main.jsx) | 已完成 · 待重构 |
| RE-KP068 | 随机 key 的问题 | Random Key / Remount / Input Loss | [文档](./kp068-random-key-problems/README.md) · [源码](./kp068-random-key-problems/src/main.jsx) | 已完成 · 待重构 |
| RE-KP069 | 嵌套组件定义导致状态意外重置 | Nested Definition / New Type / Reset | [文档](./kp069-nested-component-definition-reset/README.md) · [源码](./kp069-nested-component-definition-reset/src/main.jsx) | 已完成 · 待重构 |
| RE-KP070 | 状态保留与条件渲染 | Conditional Tree / Position / Preserve Reset | [文档](./kp070-state-preservation-conditional-rendering/README.md) · [源码](./kp070-state-preservation-conditional-rendering/src/main.jsx) | 已完成 · 待重构 |

## 当前进度

- 知识点完成度：**10 / 10，已完成**
- 新教学规范重构：**2 / 10**
- 下一重构范围：**RE-KP063～068**
