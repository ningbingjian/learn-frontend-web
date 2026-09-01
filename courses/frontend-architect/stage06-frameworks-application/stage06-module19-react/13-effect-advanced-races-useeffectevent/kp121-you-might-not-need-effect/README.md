# RE-KP121：You Might Not Need an Effect

> [返回 Chapter 13](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `ARCHITECTURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 写 Effect 之前，如何证明它真的在同步外部系统？ |
| Learning Artifact | Effect 删除清单 + 前后 Render 次数/逻辑复杂度对照 |

## 先审查现有 Effect
逐条问：
1. 是否有 React 外部系统？
2. 是否只是根据 Props/State 计算数据？
3. 是否由具体用户动作触发？
如果 2/3 是“是”，Effect 很可能不需要。

## 动手重构
### Step 0：找一个派生 State Effect
删掉 State/Effect，改 Render 计算。
### Step 1：找一个事件触发 Effect
移动到 Event Handler。
### Step 2：保留真正连接/订阅 Effect
对比三类代码位置。

[查看最终源码](./src/main.jsx)

## 理论收束
Effect 是 Escape Hatch。越少的 Effect 通常意味着更直接的数据流、更少额外 Render 和更少依赖同步 Bug。

## Wrong Way
- “需要执行代码”就写 Effect。
- 为避免写函数，把事件逻辑放 Effect。
- 为了删除 Effect 又把外部系统操作放 Render。

## Production Boundary
删除 Effect 的目标不是追求数量 0，而是让每条 Effect 都有清晰外部同步理由。

## 本课只记住 3 件事
1. Effect 不是默认工具。
2. 派生数据放 Render。
3. 用户动作放 Event。

## Challenge
审查一个真实组件的所有 Effect，为每条写“同步对象是谁”。

## Mastery Check
- **Must**：能删除常见不必要 Effect。
- **Should**：能说明保留理由。
- **Expert**：能把 Effect 审查纳入团队 Code Review。
