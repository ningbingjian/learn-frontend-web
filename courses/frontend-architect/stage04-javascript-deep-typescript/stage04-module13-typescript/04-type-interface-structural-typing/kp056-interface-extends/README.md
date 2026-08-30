# TS-KP056：接口继承

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `interface Child extends Parent` 继承另一个接口。
2. 理解子接口会拥有父接口的成员，并可以继续增加自己的成员。
3. 使用接口继承提取公共结构，避免在多个接口中重复声明相同字段。
4. 理解接口继承描述的是类型关系，不会在 JavaScript 运行时建立原型继承。
5. 知道子接口重新声明同名成员时必须保持兼容，不能随意把父接口成员改成冲突类型。
6. 区分“接口 extends”与“class extends”的职责。

> **本节核心代码**：`Product extends Entity`，让产品接口复用 `id`。
>
> **实验辅助代码**：`formatProduct()` 与日志输出只用于证明继承后的成员可以正常使用。

## 理论讲解

### 1. 为什么接口需要继承

假设多个业务对象都有：

```ts
id: number
```

如果每个接口都重复：

```ts
interface Product {
  id: number;
  // ...
}

interface Order {
  id: number;
  // ...
}
```

公共结构会不断复制。

可以先定义：

```ts
interface Entity {
  id: number;
}
```

再让产品接口继承：

```ts
interface Product extends Entity {
  name: string;
  price: number;
}
```

### 2. `extends` 会把父接口成员纳入子接口

从使用效果看：

```text
Entity
└── id: number

Product extends Entity
├── id: number      ← 继承
├── name: string    ← 自己声明
└── price: number   ← 自己声明
```

所以一个 `Product` 值必须同时满足三项要求。

### 3. 子接口可以继续增加成员

继承不是“复制以后不能改”。

子接口可以继续新增自己的业务字段：

```ts
interface Product extends Entity {
  name: string;
  price: number;
}
```

这让公共能力和具体业务能力分离。

### 4. 接口继承仍然是结构化类型

即使我们写了：

```ts
interface Product extends Entity {}
```

普通对象并不需要在运行时“声明自己继承 Entity”。

只要对象结构满足 `Product`，就可以作为 `Product` 使用。

这与 Java/C# 常见的名义类型关系不同。

### 5. 接口继承不会生成 JavaScript 原型链

TypeScript 编译后：

```text
interface Entity
interface Product extends Entity
```

都会被擦除。

所以它不会自动产生：

```js
Product.prototype
```

也不会执行任何构造逻辑。

接口 `extends` 是**类型层的结构复用**。

### 6. 同名成员必须兼容

父接口如果规定：

```ts
interface Entity {
  id: number;
}
```

子接口不能写成：

```ts
// interface Product extends Entity {
//   id: string;
// }
```

因为这会让 `Product` 无法同时满足父接口的 `id: number` 契约。

### 7. 什么时候适合接口继承

适合表达：

```text
更具体的对象契约
拥有更基础对象契约的全部能力
并增加新成员
```

例如：

```text
Entity
  ↓
Product

BaseConfig
  ↓
HttpConfig
```

如果只是临时拼装两个完全独立结构，也可以有其它类型组合方式，后续课程会继续比较。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp056-interface-extends/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：定义公共接口

在 `src/main.ts` 写：

```ts
interface Entity {
  id: number;
}
```

当前接口只负责“拥有数字 ID”这一条公共契约。

### 第 2 步：创建子接口

继续写：

```ts
interface Product extends Entity {
  name: string;
  price: number;
}
```

现在 `Product` 自动拥有 `id`。

### 第 3 步：写一个依赖子接口的函数

```ts
function formatProduct(product: Product): string {
  return `${product.id}:${product.name.toUpperCase()}:¥${product.price.toFixed(2)}`;
}
```

这里可以直接使用：

```ts
product.id
```

虽然 `id` 没有重新写在 `Product` 的接口体里。

### 第 4 步：创建产品值

```ts
const product: Product = {
  id: 101,
  name: 'Keyboard',
  price: 499
};
```

如果删除 `id`，类型检查会失败。

这证明父接口成员已经成为子接口契约的一部分。

### 第 5 步：运行

```ts
console.log(formatProduct(product));
```

预期：

```text
101:KEYBOARD:¥499.00
```

### 第 6 步：临时制造继承冲突

尝试：

```ts
// interface BrokenProduct extends Entity {
//   id: string;
// }
```

类型检查应该失败。

原因不是“TypeScript 不允许重新写同名字段”，而是新字段类型破坏了父接口契约。

### 第 7 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`interface Product extends Entity`。
- **实验辅助代码**：格式化函数和日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./04-type-interface-structural-typing/kp056-interface-extends/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp056-interface-extends/tsconfig.json
node ./04-type-interface-structural-typing/kp056-interface-extends/dist/main.js
```

预期：

```text
101:KEYBOARD:¥499.00
```

## 效果验证

你应该能够确认：

- 子接口会继承父接口的成员。
- 子接口可以继续增加自己的成员。
- 父接口字段会成为子接口值的必需结构。
- 冲突的同名成员不能随意覆盖父接口契约。
- 接口继承发生在类型系统，不会生成运行时原型关系。
