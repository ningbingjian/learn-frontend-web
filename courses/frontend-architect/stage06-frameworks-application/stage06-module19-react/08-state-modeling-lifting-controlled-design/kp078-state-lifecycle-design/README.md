# RE-KP078：状态生命周期设计

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Should |
| 本课主问题 | State 什么时候创建、应该保留多久、何时必须重置/销毁？ |
| Learning Artifact | Create → Preserve → Reset/Dispose 生命周期图 |

## 先问生命周期

不要只问“State 放哪”。同一份编辑草稿可能需要：切 Tab 保留、切用户重置、关闭页面销毁。先写出业务规则。

## 动手建模

### Step 0：定义 State 的 Birth

哪个组件身份创建时初始化？初始数据来自哪？

### Step 1：定义 Preserve 条件

哪些 Props/样式/父级 Render 不应该破坏它？

### Step 2：定义 Reset 条件

业务 Entity 改变时，是否应 key reset？

### Step 3：定义 Dispose

组件真正离开树后，这份 State 是否应该彻底消失，还是需要提升/持久化？

[查看最终源码](./src/main.jsx)

## 理论收束

State 生命周期最终依附于 Owner 的组件 Identity。设计 State 时必须同时设计 Owner 和 Identity 边界，而不是出 Bug 后再补 Effect。

## Wrong Way

- 只设计初始值，不设计 reset。
- 希望组件卸载后 Local State 自动永久保存。
- 用 random key 控制生命周期。

## Production Boundary

表单草稿、Wizard、缓存页面、聊天窗口都需要明确生命周期；必要时把需要跨卸载保留的数据提升到更长生命周期的 Owner/Store。

## 本课只记住 3 件事

1. State 设计包含 Create/Preserve/Reset/Dispose。
2. 生命周期和组件 Identity 强关联。
3. 需要跨卸载保存就不能只依赖局部 State。

## Challenge

为“订单编辑页”写一张 State 生命周期表：切 Tab、切订单、刷新浏览器、离开页面分别怎么处理。

## Mastery Check

- **Must**：会说明何时 reset。
- **Should**：能设计跨组件生命周期。
- **Expert**：能连接 Identity、Persistence 与 State Owner。
