# TS-KP025：`unknown`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BUILD-LAB` |
| 学习深度 | **Must** |
| 主问题 | 怎样接收“不知道是什么”的外部值，同时不关闭类型保护？ |
| Learning Artifact | `unknown` 直接访问失败 + runtime guard 成功/拒绝两条路径 |
| 暂不理解 | User-defined Type Predicate、Schema Library |

## 只需要搞懂 3 件事
1. `unknown` 可以接收任意值，但不能未经检查直接使用。
2. Narrowing 建立证据后才能获得具体能力。
3. 外部数据边界优先 `unknown`，通常比 `any` 更安全。

## 先预测
`parseProfile()` 返回 unknown 后，直接 `value.name.toUpperCase()` 能否编译？为什么？

## 动手实验
### Step 0：返回 unknown
```ts
function parseProfile(text: string): unknown {
  return JSON.parse(text);
}
```
### Step 1：临时直接访问成员
观察 `tsc` 拒绝：当前没有证据证明 value 是对象、更没有证明 name 是 string。
### Step 2：逐层建立证据
最终源码用 `typeof`、非 null、`in`、字段 `typeof` 完成 guard。
运行：
```text
ADA
invalid profile
```
### 立即解释
这不是“unknown 自动变成对象”，而是控制流证明让当前分支类型逐步收窄。

## 心智模型
```text
untrusted value → unknown → runtime evidence → narrowed type → safe operation
```

## Wrong Way / Production Boundary
- 不要为了方便把 unknown 第一行就 `as User`。
- 大 Payload 生产环境应使用可靠 Schema/Guard，并测试边界数据。

## 只记住 3 件事
**unknown 接收广但使用严；先验证再使用；外部边界优先 unknown。**

## Challenge
给 JSON 增加 `{ "name": 123 }`，预测会在哪个 guard 被拒绝。

## Mastery Check
**Must** 会 Narrow unknown；**Should** 能把 any 边界改成 unknown；**Expert** 能设计 Runtime Validation Boundary。

## 最终源码与代码边界
- 核心：unknown + runtime checks。
- 辅助：两条 JSON 输入用于正反验证。
- [最终源码](./src/main.ts)
