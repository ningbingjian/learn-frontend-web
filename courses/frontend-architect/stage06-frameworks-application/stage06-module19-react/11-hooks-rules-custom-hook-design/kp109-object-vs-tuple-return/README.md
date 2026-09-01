# RE-KP109：Object vs Tuple Return

> [返回 Chapter 11](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` |
| 学习深度 | Should |
| 本课主问题 | Custom Hook 返回 `[value,setValue]` 还是 `{value,setValue}`，应该按什么判断？ |
| Learning Artifact | Tuple/Object 消费代码 Trade-off 对照 |

## 先比较
```js
const [value, setValue] = useThing();
const { value, setValue } = useThing();
```
哪种更适合 2 个稳定位置？哪种更适合未来增加 `reset/error/status`？

## 动手对照
### Step 0：小而固定的成对 API
Tuple 简洁，调用者可自由重命名，典型如 useState。
### Step 1：多个有名称字段
Object 更自解释，扩展字段时通常更平滑。
### Step 2：模拟新增字段
观察 Tuple position 与 Object property 的兼容影响。

[查看最终源码](./src/main.jsx)

## 理论收束
没有“Custom Hook 一律 Object”的规则。选择基于返回项数量、位置语义、可扩展性和消费可读性。

## Wrong Way
- 返回 6 项 Tuple 靠位置背含义。
- 只有两项稳定对也套巨大 Object。
- 随版本改变 Tuple 字段顺序。

## Production Boundary
组件库/公共 Hook 更重视 API 演进；应用内部小 Hook 可以优先简单直接。

## 本课只记住 3 件事
1. Tuple 适合少量稳定位置语义。
2. Object 适合命名字段和扩展。
3. 选择看 API 契约，不看个人偏好。

## Challenge
分别为 `useToggle` 和 `useRequest` 选择返回结构并解释。

## Mastery Check
- **Must**：知道两种返回方式。
- **Should**：能按扩展性选择。
- **Expert**：能制定团队 Hook API 约定。
