# RE-KP079：状态归属与组件边界

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` |
| 学习深度 | Should |
| 本课主问题 | 组件边界应该围绕 DOM 切，还是围绕谁拥有业务状态和规则来切？ |
| Learning Artifact | State Owner / Consumer / Command 边界图 |

## 先观察坏设计

一个巨大组件同时保存筛选、选择、编辑草稿、网络状态，并把几十个 setter 传下去。问题不只是“文件长”，而是 Ownership 模糊。

## 动手重构思路

### Step 0：按业务事实分组 State

哪些 State 属于同一领域动作和生命周期？

### Step 1：确定 Domain Owner

让最懂这份规则的边界拥有它，而不是机械放最顶层。

### Step 2：对子组件暴露语义 API

优先 `onSelectUser(id)`，而不是到处传 `setSelectedUser`。

### Step 3：验证边界

内部实现变化时，消费者 API 是否仍稳定？

[查看最终源码](./src/main.jsx)

## 理论收束

State Ownership 是组件架构的重要依据。好的边界隐藏内部状态结构，对外暴露业务语义和必要数据。

## Wrong Way

- 组件按视觉框框切完就认为架构完成。
- 向所有子组件直接暴露 setter。
- Owner 与业务规则分离，导致规则散落。

## Production Boundary

中大型应用中，组件边界应同时考虑业务职责、状态生命周期、复用和测试，而不只是 DOM 大小。

## 本课只记住 3 件事

1. Owner 应靠近理解业务规则的边界。
2. API 暴露意图比暴露 setter 更稳定。
3. 组件边界和 State Boundary 应一起设计。

## Challenge

把一个“用户列表+详情+编辑”页面画成 Owner/Consumer 图，并设计 3 个语义事件 API。

## Mastery Check

- **Must**：能指出一份 State 的 Owner。
- **Should**：能设计语义 callback API。
- **Expert**：能以 Ownership 为依据拆中大型组件。
