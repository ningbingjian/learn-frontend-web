# RE-KP076：Props Drilling 的识别

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | Props 穿过很多层一定是坏事吗？什么时候它才真正成为 Drilling 问题？ |
| Learning Artifact | 深层 Props 链路图 + Boundary 判断 |

## 先观察

```text
Page → Layout → Section → Toolbar → Button
```

如果 `theme` 只被 Button 用，中间 3 层只是转发。先判断：这是可接受的显式数据流，还是已经妨碍维护？

## 动手分析

### Step 0：画真实组件树

标记每个 Prop 的生产者、消费者、纯转发节点。

### Step 1：增加一次结构调整

把中间层重命名/重排，观察多少接口必须跟着改。

### Step 2：识别真正成本

Drilling 的问题不是“层数超过 3”，而是大量无关中间组件被迫知道并转发它们不关心的数据。

### Step 3：先尝试 Composition / State Placement

有时重新放置 Owner 或传递 children/组件，比立刻上 Context 更简单。

[查看最终源码](./src/main.jsx)

## 理论收束

Props Drilling 是架构气味，不是语法错误。Props 本身仍是最直接、最可追踪的数据流；只有当转发造成明显耦合时才需要其它边界工具。

## Wrong Way

- 见两层 Props 就上 Context。
- 为避免 Props 把所有状态塞全局 Store。
- 不画组件树就讨论“层级太深”。

## Production Boundary

低频、局部、清晰的 Props 链路通常没问题；跨大子树的主题、用户、配置等横切信息更可能适合 Context。

## 本课只记住 3 件事

1. Props Drilling 是耦合问题，不是层数公式。
2. Props 仍是优先的显式数据流。
3. 先检查 State Placement / Composition，再引入更重工具。

## Challenge

给现有组件树标出 3 类 Prop：业务数据、事件 callback、横切配置，判断哪些真的构成 drilling。

## Mastery Check

- **Must**：能识别纯转发节点。
- **Should**：能比较 Props / Composition / Context。
- **Expert**：能以变更成本评估 drilling，而不是按层数拍脑袋。
