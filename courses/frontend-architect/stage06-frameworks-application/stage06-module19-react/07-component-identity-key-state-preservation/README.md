# Chapter 07：组件身份、Key 与状态保存

> [返回 React 模块索引](../README.md)

本 Chapter 解释 React 为什么有时保留 State、有时又会把 State 重置。核心不是“组件函数名一样就一定是同一个组件”，而是理解 React 如何根据渲染树中的位置、组件类型与 `key` 判断组件身份。后半章继续进入列表 key、随机 key、嵌套组件定义和条件渲染中的状态保留问题。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP061 | 组件树中的位置决定身份 | 1. Render Tree 2. Position 3. State Identity | [文档](./kp061-tree-position-component-identity/README.md) · [源码](./kp061-tree-position-component-identity/src/main.jsx) | 已完成 |
| RE-KP062 | 相同位置相同组件保留状态 | 1. Same Position 2. Same Type 3. Prop Change | [文档](./kp062-same-position-same-component/README.md) · [源码](./kp062-same-position-same-component/src/main.jsx) | 已完成 |
| RE-KP063 | 组件类型变化导致状态重置 | 1. Type Change 2. Unmount 3. State Reset | [文档](./kp063-component-type-change-reset/README.md) · [源码](./kp063-component-type-change-reset/src/main.jsx) | 已完成 |
| RE-KP064 | key 不只是列表警告 | 1. Identity Hint 2. Sibling Scope 3. key 不是普通 Prop | [文档](./kp064-key-beyond-list-warning/README.md) · [源码](./kp064-key-beyond-list-warning/src/main.jsx) | 已完成 |
| RE-KP065 | 使用 key 主动重置状态 | 1. Reset Form 2. Entity Identity 3. key Change | [文档](./kp065-key-reset-state/README.md) · [源码](./kp065-key-reset-state/src/main.jsx) | 已完成 |
| RE-KP066 | 列表 key 的稳定性要求 | 1. Stable ID 2. Reorder 3. Local State Follow Item | [文档](./kp066-list-key-stability/README.md) · [源码](./kp066-list-key-stability/src/main.jsx) | 已完成 |
| RE-KP067 | 为什么不能滥用数组索引 key | 1. Index Key 2. Insert/Delete/Reorder 3. Local State Misalignment | [文档](./kp067-index-key-problems/README.md) · [源码](./kp067-index-key-problems/src/main.jsx) | 已完成 |
| RE-KP068 | 随机 key 的问题 | 1. Random Key 2. Remount 3. Input Loss | [文档](./kp068-random-key-problems/README.md) · [源码](./kp068-random-key-problems/src/main.jsx) | 已完成 |
| RE-KP069 | 嵌套组件定义导致状态意外重置 | 1. Nested Definition 2. New Component Type 3. Reset | [文档](./kp069-nested-component-definition-reset/README.md) · [源码](./kp069-nested-component-definition-reset/src/main.jsx) | 已完成 |
| RE-KP070 | 状态保留与条件渲染 | 1. Conditional Tree 2. Position 3. Preserve / Reset | [文档](./kp070-state-preservation-conditional-rendering/README.md) · [源码](./kp070-state-preservation-conditional-rendering/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 07：**10 / 10，已完成**
- 下一 Chapter：**Chapter 08：状态建模、提升状态与受控设计**
- 下一知识点：**RE-KP071：Single Source of Truth**
