# TS-KP055：`interface` 基础

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `interface Name { ... }` 命名对象结构。
2. 在变量和函数参数中使用接口类型。
3. 理解接口主要描述对象“形状”或契约，而不是创建运行时对象。
4. 理解 TypeScript 会按结构判断一个普通对象是否满足接口。
5. 知道一个对象可以拥有接口未列出的额外成员，同时仍满足接口要求。
6. 知道接口继承、声明合并、调用签名等能力会在后续知识点继续展开。

> **本节核心代码**：`interface Product` 和 `formatProduct(product: Product)`。
>
> **实验辅助代码**：额外的 `stock` 属性用于验证结构化兼容；字符串格式化只用于观察结果。

## 理论讲解

### 1. `interface` 可以给对象结构建立名字

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}
```

之后可以：

```ts
function formatProduct(product: Product): string {
  // ...
}
```

接口让多个位置共享同一个对象契约。

### 2. 接口描述的是形状

`Product` 要求：

```text
id    → number
name  → string
price → number
```

一个值只要具有这些成员并且类型兼容，就可以满足接口。

它不要求：

```text
必须 new Product()
必须继承某个 Product 类
必须显式 implements Product
```

### 3. 普通对象可以自动满足接口

例如：

```ts
const storedProduct = {
  id: 101,
  name: 'Keyboard',
  price: 499,
  stock: 20
};
```

它没有写：

```ts
: Product
```

但传给：

```ts
formatProduct(storedProduct)
```

仍然可以通过。

因为它至少拥有接口要求的三个成员。

### 4. 这就是结构化类型直觉

可以理解为：

```text
目标类型 Product 需要什么结构？
        ↓
实际值有没有这些成员？
        ↓
成员类型是否兼容？
        ↓
兼容
```

TypeScript 核心原则之一就是按值的形状检查兼容性。

TS-KP064 会系统对比结构化类型和名义类型。

### 5. 额外属性不一定会破坏兼容

`storedProduct` 还有：

```ts
stock: 20
```

但 `Product` 没有 `stock`。

这并不妨碍一个已经存在的对象变量满足 `Product` 结构。

这里和 Chapter 03 的 Excess Property Checking 要区分：

```text
已经存在的对象变量
→ 通常按结构兼容

直接新鲜对象字面量
→ 可能额外触发 Excess Property Checking
```

### 6. 接口本身没有运行时代码

编译后：

```ts
interface Product { ... }
```

会消失。

因此接口：

```text
不是 class
不是 constructor
不能在运行时用 instanceof Product
```

如果外部数据来自网络或 JSON，仍需要运行时校验。

### 7. 接口后续还有很多能力

本节只学基本对象契约。

接下来会依次学习：

- TS-KP056：接口继承。
- TS-KP057：多接口继承。
- TS-KP058：接口声明合并。
- TS-KP059：接口调用签名。
- TS-KP060：接口构造签名。

所以不要在第一节一次性把所有接口语法塞进来。

### 8. `interface` 与 `type` 暂时不要急着二选一

上一节刚学过：

```ts
type Product = { ... };
```

现在又可以：

```ts
interface Product { ... }
```

它们在描述普通对象结构时有大量重叠能力。

但完整差异、扩展方式和 API 选择策略会在 TS-KP061～063 专门分析。

本节只需要掌握：

> `interface` 是 TypeScript 命名对象形状、建立结构契约的核心工具之一。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp055-interface-basics/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明产品接口

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}
```

接口目前只描述三个必需属性。

### 第 2 步：创建接收接口的函数

```ts
function formatProduct(product: Product): string {
  return `${product.id}:${product.name.toUpperCase()}:¥${product.price.toFixed(2)}`;
}
```

现在函数边界由 `Product` 统一定义。

### 第 3 步：创建普通对象，而不是显式声明为 Product

```ts
const storedProduct = {
  id: 101,
  name: 'Keyboard',
  price: 499,
  stock: 20
};
```

注意它还多了一个 `stock`。

### 第 4 步：直接传入函数

```ts
console.log(formatProduct(storedProduct));
```

它能够通过，因为结构满足 `Product`。

### 第 5 步：证明额外成员仍然存在

```ts
console.log(storedProduct.stock);
```

预期：

```text
20
```

较窄接口只限制使用边界，不会在运行时删除额外属性。

### 第 6 步：临时删除必需成员

例如：

```ts
// const invalid = {
//   id: 102,
//   name: 'Mouse'
// };
// formatProduct(invalid);
```

应该失败，因为缺少 `price`。

### 第 7 步：临时写错成员类型

```ts
// const invalid = {
//   id: '102',
//   name: 'Mouse',
//   price: 199
// };
```

同样失败。

这说明结构化不是“只看成员名”，成员类型也必须兼容。

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`interface Product` 和接口参数。
- **实验辅助代码**：额外 `stock` 属性和日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./04-type-interface-structural-typing/kp055-interface-basics/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp055-interface-basics/tsconfig.json
node ./04-type-interface-structural-typing/kp055-interface-basics/dist/main.js
```

预期：

```text
101:KEYBOARD:¥499.00
20
```

## 效果验证

你应该能够确认：

- `interface` 可以为对象结构建立可复用名字。
- 普通对象不需要显式 `implements` 也能满足接口。
- 兼容性主要取决于对象是否具有目标接口要求的结构。
- 已存在对象拥有额外成员时仍可能满足接口。
- 接口只存在于 TypeScript 类型层，不会生成运行时构造函数。
