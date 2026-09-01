# TS-KP003：TypeScript 的擦除型类型系统

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + 轻量 `SOURCE-LAB` |
| 学习深度 | **Must** |
| 前置课程 | TS-KP001～002：TS / JS 关系与静态 / 运行时边界 |
| 本课主问题 | `type ProductId` 和 `interface Product` 编译后去哪了？ |
| Learning Artifact | TypeScript Source 与 Emit JavaScript 对照 |
| 本课暂时不用理解 | Compiler AST、Binder、TypeChecker、Declaration Emit |

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

1. 普通 Type Alias / Interface 参与类型检查，但不作为 JavaScript 对象保留。
2. Type Annotation 也不会原样进入 Emit JavaScript。
3. “类型存在于 TypeScript 中”不等于“运行时能通过名字读取这个类型”。

## 前置状态

前两课已经看到参数类型标注在 JavaScript 产物中消失。

现在把实验升级到更明显的类型声明：

```ts
type ProductId = string;

interface Product {
  id: ProductId;
  price: number;
}
```

## 本课主问题

运行时能不能写出：

```js
console.log(Product);
```

或者：

```js
new Product();
```

如果不能，那这些类型声明到底在哪里发挥作用？

## 先预测

在 Build 前先回答：

```text
1. dist/main.js 中会不会出现 interface Product？
2. 会不会出现 type ProductId = string？
3. product 这个真实对象会不会保留？
```

## 动手编码：从 0 到 1

### Step 0：先声明类型层模型

```ts
type ProductId = string;

interface Product {
  id: ProductId;
  price: number;
}
```

现在暂时没有运行时对象。

**当前问题**：这些声明主要给 TypeScript Checker 使用。

---

### Step 1：让类型参与静态检查

加入函数：

```ts
function formatProduct(product: Product): string {
  return `${product.id}: ¥${product.price.toFixed(2)}`;
}
```

再创建符合结构的对象：

```ts
const product: Product = {
  id: 'keyboard-001',
  price: 499
};
```

运行 `npm run check -- .../tsconfig.json`，应通过。

### 立即解释

`Product` 现在非常有用：它约束 `product` 的结构和函数参数。

但“对类型检查有用”还不能证明它会存在于 Runtime。

---

### Step 2：Build 并搜索类型声明

执行：

```bash
npm run build -- ./01-typescript-foundations/kp003-erased-type-system/tsconfig.json
```

打开 `dist/main.js`。

你会看到真实函数和对象，但不会看到：

```text
interface Product
ProductId 类型别名
: Product
: number
```

这时才给现象命名：**Type Erasure（类型擦除）**。

---

### Step 3：运行 Emit JavaScript

执行：

```bash
node ./01-typescript-foundations/kp003-erased-type-system/dist/main.js
```

预期：

```text
keyboard-001: ¥499.00
```

运行所需的是对象值、函数和值运算；类型声明已经完成了开发阶段职责。

---

### Step 4：区分 Type Space 和 Value Space

可以先用最简单的双层模型：

```text
Type Space
Product / ProductId
  ↓ 参与检查
  X 不作为普通 JS 值输出

Value Space
product / formatProduct
  ↓ Emit
JavaScript Runtime
```

更完整的同名声明空间规则以后再学，本课只需要建立这条直觉。

## 图解与心智模型

```text
TypeScript Source
├─ type ProductId ─┐
├─ interface Product ─┤→ Type Checker
├─ : Product ──────┘
│
├─ const product ───────→ Emit
└─ function formatProduct → Emit
                           ↓
                     JavaScript
```

## 理论收束

### 一句话

> TypeScript 的大量类型语法只服务于静态分析，普通 JavaScript Emit 时会被擦除，不自动生成对应的运行时类型对象。

### 代码变化 → 理论

| 观察 | 对应理论 |
|---|---|
| `interface` 不进入 `.js` | Erased Type Syntax |
| `type` 不进入 `.js` | Erased Type Alias |
| `product` 对象仍存在 | Runtime Value |
| 类型名不能直接当运行时值 | Type Space vs Value Space |

## Wrong Way 与边界

### Wrong Way 1：认为 Interface 能在运行时反射

普通 `interface Product` 不会自动生成 Runtime Metadata，也不能直接用于 JSON 校验。

### Wrong Way 2：认为所有 TypeScript 语法都只是擦除

TypeScript 也有一些历史 / 运行时代码相关语法会影响 Emit，例如部分 Enum、Namespace、Decorator 配置等。它们会在后续章节单独学习。

本节结论针对普通类型标注、Type Alias、Interface 等典型擦除型类型语法。

## Production Boundary

这个模型会直接影响：

- Runtime Validation：不能拿 Interface 去校验 JSON；
- Dependency Injection：不能假设 Interface 天生存在 Runtime Token；
- 库发布：Runtime API 与 `.d.ts` 类型 API 是两个需要同时设计的层。

## 本课只记住 3 件事

1. **很多 TS 类型只存在于静态类型世界。**
2. **Build 后 JavaScript 主要保留运行时真正需要的 Value。**
3. **类型声明不能自动充当 Runtime Validation / Reflection 对象。**

## Challenge

临时在源码末尾尝试：

```ts
console.log(Product);
```

先预测 TypeScript 会报什么，再运行 `tsc`。

解释为什么 `Product` 可以出现在类型位置，却不能作为普通值传给 `console.log()`。

## Mastery Check

### Must

- 能用 `dist/main.js` 证明 `type` / `interface` 被擦除。
- 能区分 `Product` 类型和 `product` 运行时对象。

### Should

- 能解释为什么 Interface 不能自动验证 JSON。
- 知道“类型擦除”并不等于“所有 TS 语法都绝不产生运行时代码”。

### Expert

- 能把 Type Space / Value Space 边界迁移到库设计、DI Token、声明文件和 Runtime Schema 的架构讨论中。

## 最终源码与代码边界

- **本节核心代码**：`type ProductId`、`interface Product`、`: Product`。
- **实验辅助代码**：Build / 查看 `dist/main.js` 用于让类型擦除变得可观察。
- **最终源码**：[`src/main.ts`](./src/main.ts)
