# TS-KP005：TypeScript 的设计目标与非目标

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `FAILURE-LAB` |
| 学习深度 | **Must** |
| 前置课程 | TS-KP001～004：Static / Runtime / Validation Boundary |
| 本课主问题 | 参数都是 `number`、代码也通过 `tsc`，为什么 150% 折扣仍然能得到荒谬结果？ |
| Learning Artifact | 正常业务值 / 可疑业务值 Console 对照 |
| 本课暂时不用理解 | Branded Types、Refinement Types、Schema Libraries、Domain Modeling |

## 文档目录

- [这节课只需要搞懂什么](#这节课只需要搞懂什么)
- [前置状态](#前置状态)
- [本课主问题](#本课主问题)
- [先预测](#先预测)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [图解与心智模型](#图解与心智模型)
- [理论收束](#理论收束)
- [Wrong Way 与边界](#wrong-way-与边界)
- [Production Boundary](#production-boundary)
- [本课只记住 3 件事](#本课只记住-3-件事)
- [Challenge](#challenge)
- [Mastery Check](#mastery-check)

## 这节课只需要搞懂什么

1. TypeScript 擅长检查“类型关系”，但普通 `number` 不知道你的业务范围。
2. “类型正确”与“业务合法”不是同一个命题。
3. 业务约束需要 Runtime Validation、领域建模或更精确的 API 设计补充。

## 前置状态

我们有一个看起来完全类型安全的函数：

```ts
function discountedPrice(
  price: number,
  discountPercent: number
): number
```

所有参数和返回值都明确是 `number`。

## 本课主问题

调用：

```ts
discountedPrice(200, 150)
```

TypeScript 应不应该自动知道“折扣百分比不能超过 100”？

## 先预测

先回答：

```text
1. tsc 会不会因为 150 > 100 而报错？
2. 函数真实计算结果是多少？
3. 如果结果为负数，这是类型系统错误还是业务规则缺失？
```

## 动手编码：从 0 到 1

### Step 0：只写数值类型契约

```ts
function discountedPrice(
  price: number,
  discountPercent: number
): number {
  return price * (1 - discountPercent / 100);
}
```

运行 `tsc`，函数本身没有类型问题。

---

### Step 1：先验证正常业务值

```ts
console.log('正常折扣:', discountedPrice(200, 20));
```

实际输出：

```text
正常折扣: 160
```

类型契约和业务值都正常。

---

### Step 2：只改变一个变量——折扣改成 150

```ts
console.log('业务可疑:', discountedPrice(200, 150));
```

`tsc` 仍然可以通过。

真正运行得到：

```text
业务可疑: -100
```

### 立即解释

从 TypeScript 的普通 `number` 视角：

```text
200 是 number
150 是 number
-100 也是 number
```

所以静态类型关系完全成立。

错误来自另一层：**业务规则没有被表达 / 验证。**

---

### Step 3：区分 Language Type Rule 与 Domain Rule

```text
Language Type Rule
price 必须是 number
      ↓
TypeScript 能检查

Domain Rule
discountPercent 必须在 0..100
      ↓
普通 number 本身没有表达
```

这就是 TypeScript 的设计边界之一。

## 图解与心智模型

```text
TypeScript
“这是 number 吗？”
      ↓ yes

Business Domain
“这个 number 在允许范围内吗？”
      ↓ 需要额外规则
```

## 理论收束

### 一句话

> TypeScript 的目标是为 JavaScript 提供实用的静态类型分析，而不是自动理解所有业务语义、数据真实性和程序正确性。

### TypeScript 很擅长什么

- 参数 / 返回值关系；
- 对象结构；
- Union / Narrowing；
- 泛型关系；
- API 契约和重构反馈。

### 它不会自动替你完成什么

- 业务数值范围；
- 网络数据真实性；
- 算法逻辑正确性；
- 安全策略；
- 单元 / 集成测试。

### 代码变化 → 理论

| 观察 | 对应理论 |
|---|---|
| `150` 通过 `number` 检查 | Primitive Type 只表达数值类型 |
| 运行得到 `-100` | Business Logic 仍按 JS 执行 |
| 类型正确但业务错误 | Type System Non-goal / Domain Boundary |

## Wrong Way 与边界

### Wrong Way 1：用了 TypeScript 就不用测试业务逻辑

类型系统不会替你验证折扣公式、权限规则、库存不变量等全部业务行为。

### Wrong Way 2：为了所有业务范围都做复杂类型体操

有些规则更适合简单 Runtime Check、Schema 或 Domain Function。不要为了“类型更高级”牺牲可读性。

## Production Boundary

生产环境中常见组合是：

```text
TypeScript Static Contract
+
Runtime Validation
+
Business Invariant
+
Automated Tests
```

不同层各自解决不同问题。

## 本课只记住 3 件事

1. **类型正确不等于业务正确。**
2. **普通 `number` 不自动携带百分比范围。**
3. **Static Type、Runtime Validation、Business Rule、Test 要分层设计。**

## Challenge

在不修改最终源码的前提下，自己写一个实验版本：

```ts
if (discountPercent < 0 || discountPercent > 100) {
  throw new RangeError('discountPercent must be between 0 and 100');
}
```

分别测试 `20`、`100`、`150`。

回答：这个 Runtime Check 是在补“TypeScript 类型能力”，还是在补“业务规则”？

## Mastery Check

### Must

- 能解释 `discountedPrice(200, 150)` 为什么能通过 `tsc`。
- 能区分 Type Error 和 Business Error。

### Should

- 能为一个业务规则选择 Type / Runtime Validation / Test 中合适的实现层。
- 不把 TypeScript 宣传成“程序绝不会出错”的证明系统。

### Expert

- 能在领域模型中识别哪些 Invariant 值得通过更精确类型表达，哪些更适合运行时校验和测试。

## 最终源码与代码边界

- **本节核心代码**：`number` 类型契约与正常 / 可疑业务值对照。
- **实验辅助代码**：两条 Console 输出用于让“类型正确但业务错误”可观察。
- **最终源码**：[`src/main.ts`](./src/main.ts)
