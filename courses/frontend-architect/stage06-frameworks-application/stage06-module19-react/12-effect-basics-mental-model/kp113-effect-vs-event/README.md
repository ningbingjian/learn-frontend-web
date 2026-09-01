# RE-KP113：Effect vs Event

> [返回 Chapter 12](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | “提交订单”应该因为页面被渲染而发生，还是因为用户点击提交而发生？ |
| Learning Artifact | Effect 触发副作用 → Event Handler 重构 |

## 先判断因果
如果购买请求写在 Effect 中，组件因恢复/重新挂载等原因出现时也可能触发。业务真正原因是什么？——用户动作。

## 动手重构
### Step 0：故意把购买放 Effect
观察业务副作用和组件生命周期被错误绑定。
### Step 1：移动到 Handler
```jsx
function handleBuy() {
  post('/buy', productId);
}
```
### Step 2：保留真正的 Effect
例如页面显示期间维持产品订阅，这才取决于“组件当前存在”。

[查看最终源码](./src/main.jsx)

## 理论收束
Event Handler 由具体交互触发；Effect 由“这次 Render 结果需要与外部系统保持同步”触发。判断依据是因果来源，不是代码是否副作用。

## Wrong Way
- 先 set `shouldSubmit=true` 再用 Effect 监听并提交。
- 把所有网络请求都归类为 Effect。
- 把用户动作和页面存在状态混在一条 Effect 中。

## Production Boundary
支付、提交、删除、下载等用户动作放 Event；连接、订阅、可见期间同步放 Effect。

## 本课只记住 3 件事
1. Event 代表“用户做了什么”。
2. Effect 代表“组件存在时要同步什么”。
3. 按因果选择代码位置。

## Challenge
给“发送聊天消息”和“保持聊天室连接”分别选择 Event/Effect。

## Mastery Check
- **Must**：会区分 Event/Effect。
- **Should**：能删除 shouldXxx 触发型 Effect。
- **Expert**：能以业务因果重构副作用链。
