# TS-KP018：`number`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 本课主问题 | 整数、浮点数、`NaN`、`Infinity` 在 TypeScript 里为什么都落在同一个 `number` 世界？ |
| Learning Artifact | 真实算术结果 + `toFixed()` + Runtime `typeof` |
| 暂不理解 | Numeric Literal Type、Branded Unit、bigint |

## 这节课只需要搞懂什么

1. 小写 `number` 对应 JavaScript Number 数值世界。
2. 整数和浮点数不拆成不同 TS 基础类型。
3. 类型为 number 只证明“是数值类型”，不证明金额/百分比等业务规则。

## 前置状态与先预测

源码有：

```ts
const unitPrice: number = 499.5;
const quantity = 2;
const discountRate: number = 0.1;
```

预测 `quantity` 的推断类型，以及最终 `typeof total`。

## 动手实验

### Step 0：建立数值函数契约

```ts
function calculateTotal(price: number, count: number, discount: number): number
```

运行类型检查应通过。

### Step 1：执行真实算术

当前输入得到：

```text
899.10
number
```

`toFixed(2)` 是 Number API；`typeof` 证明 Runtime 也处于 JavaScript number 世界。

### Step 2：制造类型错误

临时传 `'2'` 作为 count，观察 `tsc` 在运行前拒绝。

### Step 3：制造“类型正确但业务可疑”

临时把 discount 改成 `2`（200%）。它仍是 number，所以类型层不会自动证明业务范围。

## 心智模型

```text
整数 / 小数 / NaN / Infinity
          ↓
JavaScript Number
          ↓
TypeScript number
```

## Wrong Way / Production Boundary

- TypeScript 没有 Java/C# 式 `int` / `double` 基础类型拆分。
- 金额精度、百分比范围、单位换算属于额外业务/数值工程问题，不能只靠 `number`。

## 本课只记住 3 件事

1. **JS 常规数值统一由 `number` 描述。**
2. **类型正确不等于数值业务正确。**
3. **能推断的局部变量不必机械注解。**

## Challenge

测试 `NaN`、`Infinity`、`-0` 的 `typeof`，并思考哪类业务需要额外 `Number.isFinite()` / Range Check。

## Mastery Check

### Must
会使用 number 参数、返回值与 Number API。
### Should
能解释 number 与业务数值约束的边界。
### Expert
能识别金额/单位等场景何时不应直接传播裸 number。

## 最终源码与代码边界

- **核心代码**：number 输入/输出关系与算术。
- **辅助代码**：`typeof` 和日志用于观察。
- **最终源码**：[`src/main.ts`](./src/main.ts)
