# TS-KP003：TypeScript 的擦除型类型系统

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 TypeScript 中“类型擦除”是什么意思。
2. 通过编译前后对比确认类型标注、`type`、`interface` 不会作为普通类型信息保留在 JavaScript 产物中。
3. 区分“类型系统用于静态分析”和“JavaScript 代码负责运行时行为”。
4. 知道不能在运行时直接读取一个已经被擦除的 TypeScript 类型。
5. 知道“类型被擦除”是类型系统的基本直觉，但并不意味着所有 TypeScript 专属语法都绝不会产生运行时代码。

> **本节核心代码**：类型标注、`type`、`interface` 与编译后的 JavaScript 之间的对照。
>
> **实验辅助代码**：`tsc`、`dist/main.js` 和文件对比过程，用来观察类型信息在编译后的去向。

## 理论讲解

### 1. 类型信息主要服务于开发阶段

例如：

```ts
type ProductId = string;

interface Product {
  id: ProductId;
  price: number;
}
```

这些声明可以帮助 TypeScript 理解程序中值之间的关系。

但是普通 JavaScript 运行时并不认识这里的 `ProductId` 和 `Product` 类型。

### 2. 编译以后会发生什么

再看函数：

```ts
function formatProduct(product: Product): string {
  return `${product.id}: ¥${product.price.toFixed(2)}`;
}
```

TypeScript 在检查阶段会使用 `Product` 来检查：

- `product.id` 是否存在。
- `product.price` 是否为数字。
- 返回值是否符合 `string`。

常规编译后，函数会接近：

```js
function formatProduct(product) {
  return `${product.id}: ¥${product.price.toFixed(2)}`;
}
```

`Product` 和 `: string` 都不再作为普通类型信息存在。

### 3. 为什么运行时不能问“这个对象是不是 Product 类型”

如果 `Product` 只是一个 `interface`：

```ts
interface Product {
  id: string;
  price: number;
}
```

它主要存在于 TypeScript 的类型空间。

运行时不能这样写：

```ts
// 错误思路
// if (value instanceof Product) { ... }
```

因为 `Product` 接口不是一个 JavaScript 构造函数，也不会因为声明了接口就自动生成运行时验证器。

### 4. “擦除”不是“TypeScript 什么都不生成”

这一点要避免过度理解。

本节讨论的是**类型系统信息的擦除**：

- 类型标注。
- `type` 类型别名。
- `interface`。
- 大量只参与类型分析的泛型信息。

TypeScript 还有一些带运行时意义或需要转换的语法，可能会产生 JavaScript 代码；例如某些 `enum`、namespace 或语言降级转换场景。它们会在后面的专项章节学习。

所以最准确的初学心智模型是：

> TypeScript 的类型信息不会成为一个自动存在于 JavaScript 运行时的类型系统。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要亲眼比较：

```text
src/main.ts
    ↓ tsc
 dist/main.js
```

并找出哪些内容消失了、哪些内容保留下来。

### 第 1 步：先写一个类型别名

创建 `src/main.ts`：

```ts
type ProductId = string;
```

它给产品 ID 一个更清楚的类型名称。

### 第 2 步：加入接口

继续写：

```ts
interface Product {
  id: ProductId;
  price: number;
}
```

现在 TypeScript 已经知道一个 `Product` 应该具有什么结构。

### 第 3 步：让类型真正参与函数检查

继续加入：

```ts
function formatProduct(product: Product): string {
  return `${product.id}: ¥${product.price.toFixed(2)}`;
}
```

此时：

```text
ProductId
Product
product: Product
: string
```

都参与 TypeScript 的静态分析。

### 第 4 步：创建一个实际运行时对象

继续写：

```ts
const product: Product = {
  id: 'keyboard-001',
  price: 499
};

console.log(formatProduct(product));
```

注意这里有两层东西：

```text
Product 类型信息
      ↓
帮助编译器检查

{id, price} 对象
      ↓
JavaScript 运行时真实存在
```

### 第 5 步：先做类型检查

在模块根目录执行：

```bash
npm run check -- ./01-typescript-foundations/kp003-erased-type-system/tsconfig.json
```

正确代码应通过检查。

### 第 6 步：编译生成 JavaScript

执行：

```bash
npm run build -- ./01-typescript-foundations/kp003-erased-type-system/tsconfig.json
```

生成：

```text
kp003-erased-type-system/
└── dist/
    └── main.js
```

### 第 7 步：逐项寻找“消失的类型”

打开 `dist/main.js`，逐项检查：

- 能否找到 `type ProductId = string`？
- 能否找到 `interface Product`？
- 函数参数后还有没有 `: Product`？
- 函数后还有没有 `: string`？
- `const product = { ... }` 这个真实对象是否还在？
- `toFixed(2)` 和字符串模板是否还在？

你会看到：

```text
类型信息
   ↓
被用于静态分析后不再作为普通 JS 类型信息保留

运行时表达式 / 对象 / 函数逻辑
   ↓
继续存在于 JavaScript
```

### 第 8 步：运行编译产物

执行：

```bash
node ./01-typescript-foundations/kp003-erased-type-system/dist/main.js
```

预期：

```text
keyboard-001: ¥499.00
```

### 第 9 步：完成案例并对照最终源码

最终源码查看 [`src/main.ts`](./src/main.ts)。

本节总结：

- **核心代码**：`type ProductId`、`interface Product`、`: Product`、`: string` 与 `dist/main.js` 的对比。
- **实验辅助代码**：编译命令和查看 `dist/main.js` 的过程，用来证明类型信息不会自动成为 JavaScript 运行时类型。

最终源码以 [`src/main.ts`](./src/main.ts) 为准，不在 README 中重复粘贴整份文件。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./01-typescript-foundations/kp003-erased-type-system/tsconfig.json
npm run build -- ./01-typescript-foundations/kp003-erased-type-system/tsconfig.json
node ./01-typescript-foundations/kp003-erased-type-system/dist/main.js
```

## 效果验证

你应该能够用编译产物证明：

1. `type ProductId` 不在普通 JavaScript 产物中。
2. `interface Product` 不在普通 JavaScript 产物中。
3. `: Product`、`: string` 等类型标注被移除。
4. 对象、函数体、`toFixed()` 和 `console.log()` 等运行时逻辑仍然存在。
5. TypeScript 类型本身不会自动变成运行时校验器。

最终心智模型：

```text
TypeScript 类型系统
      ↓ 静态分析
检查程序关系
      ↓ 擦除类型信息
JavaScript 运行时代码
```
