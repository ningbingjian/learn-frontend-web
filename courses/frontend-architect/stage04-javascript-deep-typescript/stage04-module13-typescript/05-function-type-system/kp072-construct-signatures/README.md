# TS-KP072：构造签名 Construct Signature

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `new (...args): Result` 描述可构造值。
2. 理解 Construct Signature 描述的是“可以放在 `new` 后面的值”。
3. 区分构造器值类型和构造出来的实例类型。
4. 理解 class 同时存在实例侧与构造侧两个观察角度。
5. 在工厂函数参数中使用构造签名约束 class / constructor。
6. 区分 Call Signature 与 Construct Signature。
7. 理解构造签名是 TypeScript 静态描述，不会自动生成 JavaScript constructor。

> **本节核心代码**：`type ProductConstructor = { new (name: string, price: number): Product }`。
>
> **实验辅助代码**：`ProductModel` 和 `createProduct()` 用于真实验证构造器值、实例对象和 `new` 调用之间的关系。

## 理论讲解

### 1. 有些 JavaScript 值可以被 `new`

例如：

```js
new Date();
new Map();
new SomeClass();
```

`new` 后面的值必须具有构造能力。

TypeScript 如果要描述这种值，就需要 Construct Signature。

### 2. Construct Signature 基本语法

```ts
type ProductConstructor = {
  new (name: string, price: number): Product;
};
```

可以拆成：

```text
new
→ 这个值可以作为构造器

(name: string, price: number)
→ 构造时需要的参数

: Product
→ new 之后得到的实例类型
```

### 3. Construct Signature 描述的是构造器值，不是实例

这是最重要的边界。

假设：

```ts
class ProductModel {
  constructor(
    public name: string,
    public price: number
  ) {}
}
```

有两个不同概念：

```text
ProductModel
→ class 本身这个值
→ 可以 new

new ProductModel(...)
→ 构造出来的实例对象
```

所以：

```ts
ProductConstructor
```

要约束的是前者。

### 4. 实例类型与构造器类型可以分开写

本节先声明实例结构：

```ts
type Product = {
  name: string;
  price: number;
};
```

再声明构造器契约：

```ts
type ProductConstructor = {
  new (name: string, price: number): Product;
};
```

可以建立：

```text
ProductConstructor
       ↓ new
     Product
```

### 5. class 具有“实例侧”和“构造侧”直觉

在：

```ts
class ProductModel implements Product {
  // ...
}
```

`implements Product` 主要检查构造出来的实例是否满足：

```text
name
price
```

而当我们写：

```ts
createProduct(ProductModel, ...)
```

传进去的是：

```text
ProductModel 这个 class 值
```

此时检查的是它能否满足：

```ts
ProductConstructor
```

也就是构造侧能力。

### 6. 工厂函数为什么经常需要构造签名

一个通用工厂可能不想写死：

```ts
new ProductModel(...)
```

而是接收构造器：

```ts
function createProduct(
  Constructor: ProductConstructor,
  name: string,
  price: number
): Product {
  return new Constructor(name, price);
}
```

这样工厂只依赖契约：

```text
任何能接受 string + number
并构造出 Product 的值
都可以传进来
```

### 7. Construct Signature 与 Call Signature 对比

上一节：

```ts
type Callable = {
  (value: number): string;
};
```

表示：

```ts
callable(10);
```

本节：

```ts
type Constructable = {
  new (value: number): SomeObject;
};
```

表示：

```ts
new constructable(10);
```

区别就是：

```text
Call Signature
→ 普通调用 ()

Construct Signature
→ new 调用
```

### 8. 有些 JavaScript 值可以同时支持 call 和 construct

JavaScript 生态中确实存在既能直接调用、又能被 `new` 的值。

TypeScript 的对象类型也可以同时声明：

```text
Call Signature
+
Construct Signature
```

不过现代业务代码更常见的是明确区分普通函数和 class / constructor。

本节只建立这个能力认知，不额外制造复杂案例。

### 9. 构造签名不会创建 constructor

如果类型写：

```ts
type ProductConstructor = {
  new (...): Product;
};
```

并不意味着 TypeScript 会自动生成一个可被 `new` 的函数。

必须真的存在 JavaScript 构造器，例如：

```ts
class ProductModel {}
```

或其他真实支持 `new` 的函数值。

所以仍然是：

```text
Construct Signature
→ 编译期能力描述

class / constructor function
→ 运行时真实构造能力
```

### 10. 为什么本章又学一次构造签名

Chapter 04 的 TS-KP060 已经从 `interface` 能力角度学习过接口构造签名。

本节换成函数类型系统角度，重点不再是：

```text
interface 能写什么
```

而是：

```text
JavaScript 中“可构造的函数值”
在函数 API / 工厂 API 中如何作为参数传递
```

两节知识相互衔接，但观察角度不同。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp072-construct-signatures/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：先声明实例结构

```ts
type Product = {
  name: string;
  price: number;
};
```

这个类型描述的是构造完成之后的对象。

### 第 2 步：声明构造器契约

```ts
type ProductConstructor = {
  new (name: string, price: number): Product;
};
```

这描述的是能执行：

```ts
new Constructor(name, price)
```

的值。

### 第 3 步：创建真实 class

```ts
class ProductModel implements Product {
  constructor(
    public name: string,
    public price: number
  ) {}
}
```

`ProductModel` 的实例满足 `Product`。

### 第 4 步：创建接收构造器的工厂函数

```ts
function createProduct(
  Constructor: ProductConstructor,
  name: string,
  price: number
): Product {
  return new Constructor(name, price);
}
```

这里 `Constructor` 不是实例，而是构造器值。

### 第 5 步：把 class 本身传给工厂

```ts
const product = createProduct(
  ProductModel,
  'Keyboard',
  499
);
```

这里传的是：

```text
ProductModel
```

不是：

```text
new ProductModel(...)
```

### 第 6 步：读取构造得到的实例

```ts
console.log(`${product.name}:${product.price.toFixed(2)}`);
```

预期：

```text
Keyboard:499.00
```

### 第 7 步：观察 class 本身也是运行时值

```ts
console.log(ProductModel.name);
```

预期：

```text
ProductModel
```

这有助于建立：

```text
class 声明
既参与类型系统
也创建 JavaScript 构造器值
```

### 第 8 步：临时制造错误构造器

如果某个 class 构造参数不兼容：

```ts
// class WrongModel {
//   constructor(public id: number) {}
// }
// createProduct(WrongModel, 'Keyboard', 499);
```

应该无法满足 `ProductConstructor`。

### 第 9 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`new (name: string, price: number): Product`。
- **实验辅助代码**：`ProductModel`、`createProduct()` 与日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp072-construct-signatures/tsconfig.json
npm run build -- ./05-function-type-system/kp072-construct-signatures/tsconfig.json
node ./05-function-type-system/kp072-construct-signatures/dist/main.js
```

预期：

```text
Keyboard:499.00
ProductModel
```

## 效果验证

你应该能够确认：

- Construct Signature 使用 `new (...args): Result` 描述可构造值。
- 它约束的是构造器值，不是构造出来的实例。
- 实例类型和构造器类型可以独立建模。
- class 本身可以作为普通 JavaScript 值传入函数。
- `implements` 主要检查 class 的实例侧，而构造签名用于约束构造侧能力。
- 工厂函数可以通过构造签名接收不同 constructor。
- Construct Signature 是静态描述，不会自动产生真实 constructor。
