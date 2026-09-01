# TS-KP022：`null`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `FAILURE-LAB` |
| 学习深度 | **Must** |
| 主问题 | “明确没有优惠券”如何进入类型模型，而不是用空字符串偷偷表示？ |
| Learning Artifact | `string | null` 分支收窄 + Runtime `typeof null` |
| 暂不理解 | StrictNullChecks 全部配置细节、Truthiness Narrowing |

## 这节课只需要搞懂什么

1. `null` 可以显式表达“这里没有值”。
2. `string | null` 在使用 string API 前需要先排除 null。
3. JavaScript 中 `typeof null === 'object'` 是历史行为。

## 先预测

`resolveCoupon('GUEST')` 返回什么？直接 `coupon.toUpperCase()` 能否通过？最后 `typeof coupon` 会打印什么？

## 动手实验

### Step 0：返回 Union

```ts
function resolveCoupon(code: string): string | null
```

### Step 1：先错误地直接使用

临时调用 `coupon.toUpperCase()`，观察 `tsc` 提醒可能为 null。

### Step 2：加入精确判断

```ts
if (coupon === null) { ... } else { ... }
```

运行：

```text
coupon=none
object
```

### 立即解释

静态世界知道 `coupon` 是 null；Runtime `typeof null` 的历史返回值却是 `object`。两者不能混为一谈。

## Wrong Way / Production Boundary

- 不要用 `''` / `0` 随意代替“缺失”导致语义混乱。
- API 是否用 null、undefined、缺字段要形成统一契约。

## 本课只记住 3 件事

1. **null 是显式无值。**
2. **使用 Union 成员能力前先 Narrow。**
3. **`typeof null` 的 Runtime 结果是 `object`。**

## Challenge

让 VIP 返回优惠，GUEST 返回 null，分别走两个分支并记录 Hover 类型。

## Mastery Check

**Must** 会处理 `T | null`；**Should** 能解释 `typeof null`；**Expert** 能设计 API 缺失值策略。

## 最终源码与代码边界

- 核心：`string | null` 和 equality narrowing。
- 辅助：`typeof` 只用于展示 Runtime 历史边界。
- [最终源码](./src/main.ts)
