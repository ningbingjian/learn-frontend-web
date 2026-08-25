# TS-KP006：渐进式类型系统与 JavaScript 迁移

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 TypeScript 为什么适合从 JavaScript 渐进迁移，而不是要求一次性重写整个项目。
2. 知道迁移可以从“最不确定的 any”逐步变成明确的边界类型和业务类型。
3. 知道 `any` 可以作为短期迁移桥梁，但不能成为长期默认方案。
4. 理解“旧系统输入类型”和“新业务内部类型”可以暂时并存。
5. 能设计一个小型迁移函数，把旧数据转换成更稳定的新类型。

> **本节核心知识**：迁移不是“把所有 `.js` 一夜改成 `.ts`”，而是逐步缩小不确定区域并建立清晰类型边界。
>
> **实验辅助代码**：旧商品数据只是为了模拟真实遗留系统中的宽松数据格式。

## 理论讲解

### 1. 大型 JavaScript 项目不适合一次性类型化

真实项目通常已经存在：

- 大量历史模块。
- 第三方依赖。
- 宽松的接口数据。
- 动态对象。
- 很多暂时说不清楚的数据形状。

如果迁移策略只有：

```text
今天 JavaScript
明天全部 Strict TypeScript
```

成本往往非常高。

更合理的思路是：

```text
先让项目继续工作
      ↓
识别高风险边界
      ↓
逐步补类型
      ↓
减少 any
      ↓
扩大 strict 范围
```

### 2. `any` 可以是迁移桥梁，但不是终点

旧代码迁移初期经常出现：

```ts
function normalize(input: any) {
  // ...
}
```

它的价值是：先让迁移继续推进。

但代价也很明显：

```text
any
 ↓
很多类型检查能力被关闭
```

所以正确态度应该是：

> `any` 可以临时存在，但必须知道它在哪里、为什么存在、准备如何收回。

### 3. 先描述“遗留输入”，再设计“业务内部类型”

假设旧系统里的商品数据是：

```text
id    可能是 string，也可能是 number
name  可能缺失
price 可能是 string，也可能是 number
```

不要强行假装它已经是理想业务模型。

可以先定义：

```ts
type LegacyProduct = {
  id: string | number;
  name?: string;
  price: string | number;
};
```

再定义新系统真正想要的：

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};
```

两者中间通过迁移函数连接。

### 4. 类型迁移的关键是缩小不确定区域

好的迁移方向是：

```text
旧世界：宽松、动态、不完全确定
        ↓
少数适配 / 转换函数
        ↓
新世界：更稳定、更严格的业务类型
```

而不是让整个新系统一直背着 `any`。

### 5. 渐进迁移可以发生在多个维度

不仅是“文件从 JS 变 TS”，还包括：

- 文件数量逐步增加。
- `any` 数量逐步减少。
- 外部边界从宽松类型变得更明确。
- `strict` 选项逐步收紧。
- 共享类型逐步稳定。
- 核心业务模块优先获得更强约束。

---

## 动手编码：从 0 到 1

### 第 0 步：明确迁移目标

我们模拟一个旧商品对象：

```ts
const legacyProduct = {
  id: '42',
  name: 'Mechanical Keyboard',
  price: '499'
};
```

目标是把它转换为：

```text
id    → number
name  → string
price → number
```

### 第 1 步：先用 `any` 快速接住旧数据

最初可以写：

```ts
function normalizeProduct(input: any) {
  return {
    id: Number(input.id),
    name: input.name ?? 'Unnamed product',
    price: Number(input.price)
  };
}
```

这样迁移很快，但 `input.xxx` 基本失去类型保护。

### 第 2 步：描述真实的遗留输入

加入：

```ts
type LegacyProduct = {
  id: string | number;
  name?: string;
  price: string | number;
};
```

然后改成：

```ts
function normalizeProduct(input: LegacyProduct) {
  // ...
}
```

现在旧世界不再是完全未知的 `any`，而是“虽然宽松，但边界明确”。

### 第 3 步：定义新系统真正想要的类型

继续加入：

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};
```

并声明函数返回值：

```ts
function normalizeProduct(input: LegacyProduct): Product {
  // ...
}
```

此时 TypeScript 会检查你的迁移函数是否真的输出了完整 `Product`。

### 第 4 步：完成转换逻辑

写成：

```ts
function normalizeProduct(input: LegacyProduct): Product {
  return {
    id: Number(input.id),
    name: input.name ?? 'Unnamed product',
    price: Number(input.price)
  };
}
```

### 第 5 步：运行旧数据到新模型的转换

加入：

```ts
const legacyProduct: LegacyProduct = {
  id: '42',
  name: 'Mechanical Keyboard',
  price: '499'
};

const product = normalizeProduct(legacyProduct);
console.log(product);
```

预期输出：

```text
{ id: 42, name: 'Mechanical Keyboard', price: 499 }
```

### 第 6 步：理解迁移边界

现在代码形成了清晰分层：

```text
LegacyProduct
旧系统真实但宽松的数据
        ↓
normalizeProduct
集中处理转换
        ↓
Product
新代码内部稳定类型
```

这比“所有地方都继续写 `any`”更容易治理。

### 第 7 步：完成案例并对照最终源码

最终代码应与 [`src/main.ts`](./src/main.ts) 一致。

本节总结：

- **核心代码**：`LegacyProduct`、`Product` 和 `normalizeProduct()` 共同建立“旧边界 → 新模型”的渐进迁移路径。
- **实验辅助代码**：模拟的旧商品对象与日志，只用来观察迁移结果。

## 运行案例

在模块根目录执行类型检查：

```bash
npm run check -- ./01-typescript-foundations/kp006-gradual-typing-migration/tsconfig.json
```

编译：

```bash
npm run build -- ./01-typescript-foundations/kp006-gradual-typing-migration/tsconfig.json
```

运行：

```bash
node ./01-typescript-foundations/kp006-gradual-typing-migration/dist/main.js
```

## 效果验证

你应该能够确认：

1. `any` 版本迁移快，但类型保护很弱。
2. `LegacyProduct` 可以真实表达旧数据的宽松状态。
3. `Product` 可以表达新系统内部更严格的状态。
4. `normalizeProduct()` 把不确定性集中在一个转换边界里。
5. 能解释为什么渐进迁移的目标是持续缩小 `any` 和动态区域，而不是长期保留它们。

配套练习见 [`exercise/README.md`](./exercise/README.md)。
