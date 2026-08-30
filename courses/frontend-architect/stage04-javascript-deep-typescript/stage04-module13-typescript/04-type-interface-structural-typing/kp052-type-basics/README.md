# TS-KP052：`type` 基础

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `type Name = TypeExpression` 创建类型别名。
2. 理解类型别名只是给现有类型表达式取名字，不会创建新的 JavaScript 运行时类型。
3. 使用 `type` 命名原始类型和对象结构。
4. 在变量和函数参数中复用类型别名。
5. 理解类型别名不会自动产生名义类型隔离。
6. 知道 `type` 后续还能描述 Union、Tuple、函数类型等结构，但本节先掌握基本命名能力。

> **本节核心代码**：`ProductId` 与 `Product` 两个类型别名。
>
> **实验辅助代码**：`formatProduct()`、`typeof` 和日志输出用于证明别名不会改变 JavaScript 运行时值。

## 理论讲解

### 1. 为什么要给类型取名字

Chapter 03 中可以直接写：

```ts
function formatProduct(product: {
  id: number;
  name: string;
  price: number;
}) {
  // ...
}
```

如果同一个结构只出现一次，这很直观。

但重复出现时会变成：

```text
函数 A 写一次
函数 B 写一次
变量 C 再写一次
```

这时应该给结构取一个稳定名字。

### 2. `type` 的基本语法

```ts
type ProductId = number;
```

结构是：

```text
type
  ↓
声明类型别名

ProductId
  ↓
新的类型名称

number
  ↓
它所代表的类型表达式
```

之后可以：

```ts
const id: ProductId = 101;
```

### 3. 类型别名不是新的运行时类型

下面：

```ts
type ProductId = number;
const id: ProductId = 101;
```

运行时：

```ts
typeof id
```

仍然得到：

```text
number
```

编译后 `ProductId` 会被擦除。

因此：

```text
ProductId
≠ JavaScript 新的数据类型
≠ class
≠ constructor
```

### 4. 类型别名也不会自动制造名义隔离

例如：

```ts
type ProductId = number;
type UserId = number;
```

这两个名字都只是 `number` 的别名。

不能因为名字不同就假设：

```text
ProductId 与 UserId 自动互不兼容
```

TypeScript 默认仍然采用结构化兼容思路。

更深入的结构化与名义类型差异会在 TS-KP064 学习。

### 5. `type` 可以命名对象结构

例如：

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};
```

之后函数可以写：

```ts
function formatProduct(product: Product): string {
  // ...
}
```

比重复匿名对象结构更清楚。

### 6. 类型别名可以引用另一个类型别名

```ts
type ProductId = number;

type Product = {
  id: ProductId;
  name: string;
  price: number;
};
```

这里 `Product` 没必要重新写：

```ts
id: number
```

而是可以直接复用已有类型名称。

下一节会把这种组合方式扩展成完整业务对象模型。

### 7. 类型别名不只支持对象

`type` 的右侧可以是多种类型表达式，例如：

```ts
type Id = number;
type Point = [number, number];
type Status = 'draft' | 'published';
```

本节不提前展开 Tuple / Union 的详细规则，只记住：

> `type` 是给“任意可表达的类型”取名字，而不只是给对象取名字。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp052-type-basics/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：先给产品 ID 取类型名

在 `src/main.ts` 写：

```ts
type ProductId = number;
```

现在 `ProductId` 可以在类型位置代替 `number`。

### 第 2 步：给完整产品结构取名

继续写：

```ts
type Product = {
  id: ProductId;
  name: string;
  price: number;
};
```

这样产品结构只有一个定义来源。

### 第 3 步：在函数参数中复用

```ts
function formatProduct(product: Product): string {
  return `${product.id}:${product.name.toUpperCase()}:¥${product.price.toFixed(2)}`;
}
```

TypeScript 知道每个属性的类型。

### 第 4 步：创建一个真正的产品值

```ts
const product: Product = {
  id: 101,
  name: 'Keyboard',
  price: 499
};
```

类型别名负责静态检查，实际运行值仍然是普通对象。

### 第 5 步：输出格式化结果

```ts
console.log(formatProduct(product));
```

预期：

```text
101:KEYBOARD:¥499.00
```

### 第 6 步：观察运行时类型

继续：

```ts
console.log(typeof product.id);
```

预期：

```text
number
```

这里不会输出 `ProductId`，证明类型别名已经被擦除。

### 第 7 步：临时制造错误

尝试：

```ts
// const wrong: Product = {
//   id: '101',
//   name: 'Keyboard',
//   price: 499
// };
```

类型检查应该失败，因为 `id` 需要满足 `ProductId`，而它最终代表 `number`。

验证后删除或保持注释。

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`type ProductId = number` 和 `type Product = {...}`。
- **实验辅助代码**：格式化函数、`typeof` 和输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./04-type-interface-structural-typing/kp052-type-basics/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp052-type-basics/tsconfig.json
node ./04-type-interface-structural-typing/kp052-type-basics/dist/main.js
```

预期：

```text
101:KEYBOARD:¥499.00
number
```

## 效果验证

你应该能够确认：

- `type` 可以给类型表达式取稳定名称。
- 一个类型别名可以被变量和函数参数重复使用。
- 类型别名可以引用另一个类型别名。
- `ProductId` 不会变成 JavaScript 运行时类型。
- `type ProductId = number` 不会自动制造名义类型隔离。
