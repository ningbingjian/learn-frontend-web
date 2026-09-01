# RE-KP072：状态提升

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `ARCHITECTURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 两个兄弟组件必须保持一致时，State 应该放在哪里？ |
| Learning Artifact | 两个独立面板 → Common Parent Owner 重构 |

## 先预测

两个兄弟各自保存 `isActive`，如果业务要求“最多只能打开一个”，它们靠什么协调？

## 动手重构

### Step 0：两个兄弟各自有 Local State

单独工作没问题，但彼此不知道对方状态。

### Step 1：提出跨兄弟约束

当 A 打开必须关闭 B，状态已经不再属于单个 Panel。

### Step 2：把共同 State 提升到最近共同父组件

```text
Parent owns activeId
├─ Panel A receives isActive + onShow
└─ Panel B receives isActive + onShow
```

### Step 3：子组件改为“接收状态 + 上报意图”

父组件成为唯一协调者。

[查看最终源码](./src/main.jsx)

## 理论收束

Lifting State Up 的判断依据不是“父组件更高级”，而是**多个组件需要协调同一事实**。State 应放到能够覆盖所有消费者的最近共同 Owner。

## Wrong Way

- 兄弟组件互相找 ref 调方法同步。
- 两边都存一份再用 Effect 对齐。
- 一看到共享就直接放全局 Store。

## Production Boundary

只在真正需要协调时提升；过度提升会让父组件承担无关细节并扩大 rerender/维护边界。

## 本课只记住 3 件事

1. 共享事实需要共同 Owner。
2. 最近共同父级通常是第一选择。
3. 子组件通过 Props 接收、事件回调上报意图。

## Challenge

增加第三个 Panel，验证 `activeId` 模型不需要增加第三份 State。

## Mastery Check

- **Must**：会把兄弟 State 提升到共同父级。
- **Should**：能判断什么时候不需要提升。
- **Expert**：能用 Ownership 设计局部/页面/全局状态层级。
