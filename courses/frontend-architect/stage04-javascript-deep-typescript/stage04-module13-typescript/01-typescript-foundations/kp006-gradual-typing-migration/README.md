# TS-KP006：渐进式类型系统与 JavaScript 迁移

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `ARCHITECTURE-LAB` |
| 学习深度 | **Should** |
| 前置课程 | TS-KP001～005：TypeScript 能力边界 |
| 本课主问题 | 一个旧 JavaScript 系统的数据很脏，迁移 TypeScript 时必须一次性把全项目改成严格模型吗？ |
| Learning Artifact | Legacy Boundary → Normalize → Strict Domain 的可运行迁移适配器 |
| 本课暂时不用理解 | `allowJs` / `checkJs` 配置、Monorepo 迁移、类型债务治理细则 |

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

1. TypeScript 可以逐步引入，不要求把旧系统一次性全部改完。
2. 迁移边界可以暂时接受较宽 Legacy Type，再集中规范化成严格 Domain Type。
3. “渐进式”不是永久放任 `any`，而是让风险有明确边界和收敛路径。

## 前置状态

旧系统里的商品可能长这样：

```text
id    → "42" 或 42
name  → 可能缺失
price → "499" 或 499
```

而新代码真正希望得到：

```text
id    → number
name  → string
price → number
```

## 本课主问题

迁移时应该：

```text
A. 先停下业务，把全部旧数据和代码一次改干净
```

还是：

```text
B. 明确 Legacy Boundary，在边界做转换，新代码内部保持严格
```

## 先预测

看下面两个模型：

```ts
type LegacyProduct = {
  id: string | number;
  name?: string;
  price: string | number;
};

type Product = {
  id: number;
  name: string;
  price: number;
};
```

先回答：

```text
1. 为什么不直接把 Product 也写得很宽？
2. normalizeProduct 应该返回 LegacyProduct 还是 Product？
3. name 缺失时，默认值应该在哪里集中处理？
```

## 动手编码：从 0 到 1

### Step 0：诚实描述 Legacy Boundary

先定义：

```ts
type LegacyProduct = {
  id: string | number;
  name?: string;
  price: string | number;
};
```

这不是理想模型，但它准确表达旧系统现状。

### 立即解释

迁移第一步不是假装旧世界已经干净，而是**把不确定性限制在边界类型里**。

---

### Step 1：定义新代码真正想要的严格模型

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};
```

不要因为旧数据很宽，就把整个新系统都传播成：

```text
string | number | undefined
```

否则迁移债务会扩散。

---

### Step 2：只写一个边界适配器

```ts
function normalizeProduct(input: LegacyProduct): Product {
  return {
    id: Number(input.id),
    name: input.name ?? 'Unnamed product',
    price: Number(input.price)
  };
}
```

这里集中完成：

```text
宽 Legacy Input
   ↓ normalize
严格 Product
```

---

### Step 3：运行真实 Legacy 输入

最终源码输入：

```ts
const legacyProduct: LegacyProduct = {
  id: '42',
  name: 'Mechanical Keyboard',
  price: '499'
};
```

编译并运行，实际输出：

```text
{ id: 42, name: 'Mechanical Keyboard', price: 499 }
```

**观察**：旧数据没有要求一次性全量重写，但新代码已经可以拿到更严格的 Product。

---

### Step 4：观察默认值边界

把实验输入临时改成省略 `name`：

```ts
const legacyProduct: LegacyProduct = {
  id: '42',
  price: '499'
};
```

预测输出中的 `name`。

这里的默认值策略被集中在 `normalizeProduct()`，而不是散落到所有下游调用方。

## 图解与心智模型

```text
Legacy JS / API / Storage
        │
        │ 宽类型，承认历史现实
        ↓
LegacyProduct
        ↓
normalizeProduct()
        ↓
Product
        │
        │ 严格内部模型
        ↓
New TypeScript Code
```

## 理论收束

### 一句话

> Gradual Typing 允许 TypeScript 按边界逐步引入；优秀迁移的目标不是“全项目立刻最严格”，而是让宽松区域可识别、可隔离、可持续收敛。

### 代码变化 → 理论

| 设计 | 对应理论 |
|---|---|
| `string | number` / optional | Legacy Boundary |
| `Product` 严格字段 | Strict Internal Model |
| `normalizeProduct()` | Anti-corruption / Migration Adapter |
| 宽输入不向下游传播 | Type Debt Containment |

## Wrong Way 与边界

### Wrong Way 1：Big Bang Migration

为了“类型纯洁”暂停所有业务并一次迁完整仓库，风险通常很高，也难以审查和回滚。

### Wrong Way 2：所有旧值先 `any`

这虽然迁移快，但如果没有边界和清理计划，会把静态反馈永久关闭。

### Wrong Way 3：为了兼容旧数据，把 Domain Type 永久写宽

这会让每个下游函数都重复处理历史脏数据。

## Production Boundary

真实迁移还需要考虑：

- `allowJs` / `checkJs`；
- CI 类型检查；
- `any` / `@ts-ignore` 债务统计；
- API Boundary；
- 模块优先级和迁移顺序；
- 回归测试。

这些会在后续工程章节展开。本课先建立最重要的“边界适配”模型。

## 本课只记住 3 件事

1. **迁移可以渐进，不必 Big Bang。**
2. **宽松 Legacy Type 应限制在边界，不要污染内部 Domain Type。**
3. **转换 / 默认值 /兼容逻辑应该集中在明确 Adapter 中。**

## Challenge

把 Legacy 输入改成：

```ts
{
  id: 'not-a-number',
  price: 'free'
}
```

预测当前 `Number()` 会得到什么。

然后回答：仅靠这个 Adapter 是否已经等价于“可靠 Runtime Validation”？为什么？

> 提示：`Number('free')` 会产生 `NaN`，这正好连接 TS-KP004 / TS-KP005 的边界模型。

## Mastery Check

### Must

- 能解释 Gradual Typing 不等于永久使用 `any`。
- 能说明为什么 Legacy Type 和 Domain Type 应分离。

### Should

- 能设计一个 Boundary Normalizer，把旧数据转换成严格模型。
- 能识别 Big Bang Migration 和类型债务扩散风险。

### Expert

- 能为真实仓库设计分阶段迁移顺序、债务指标、CI Gate 和 Boundary Ownership，而不是只把 `.js` 批量改名成 `.ts`。

## 最终源码与代码边界

- **本节核心代码**：`LegacyProduct → normalizeProduct → Product`。
- **实验辅助代码**：示例 Legacy 数据用于观察迁移边界。
- **最终源码**：[`src/main.ts`](./src/main.ts)
