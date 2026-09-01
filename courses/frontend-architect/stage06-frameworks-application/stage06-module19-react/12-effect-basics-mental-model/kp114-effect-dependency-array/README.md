# RE-KP114：Effect Dependency Array

> [返回 Chapter 12](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `FAILURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | Dependency Array 是“我想什么时候跑”的开关，还是 Effect 使用的 reactive input 声明？ |
| Learning Artifact | roomId 依赖缺失 → 错连接 → 修复 |

## 先制造故障
```jsx
useEffect(() => connect(roomId), []);
```
页面 roomId 从 A 切 B，连接会跟着变吗？

## 动手实验
### Step 0：`[]` 版本
观察 UI 已变 B，但外部连接仍 A。
### Step 1：加入 `[roomId]`
React 在 roomId 变化后 cleanup A/setup B。
### Step 2：加入另一个 Reactive Value
如果 Effect 读取 `serverUrl`，依赖也必须反映它。

[查看最终源码](./src/main.jsx)

## 理论收束
依赖数组不是人工调度表。Effect 代码中使用的 Reactive Values 决定依赖；React 用 `Object.is` 比较前后依赖，变化时重新同步。

## Wrong Way
- 为“只跑一次”删依赖。
- eslint 报警后 disable。
- 用空数组隐藏 stale value。

## Production Boundary
如果不想某值成为依赖，应重构代码证明它不是 Reactive Value，而不是撒谎给依赖数组。

## 本课只记住 3 件事
1. Dependencies 来自 Effect 使用的 reactive inputs。
2. 变化意味着需要重新同步。
3. 不要人为压制依赖。

## Challenge
给 connection 增加 serverUrl，先预测依赖数组。

## Mastery Check
- **Must**：会写正确依赖。
- **Should**：能解释 Object.is 比较。
- **Expert**：能通过重构缩小依赖而非禁用 lint。
