# TS-KP060：接口构造签名

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `new (...args): Result` 描述“可被 `new` 调用”的值。
2. 区分接口调用签名与接口构造签名。
3. 理解构造签名约束的是构造器值，而不是普通实例对象。
4. 使用构造签名把 class 作为参数传给工厂函数。
5. 理解 `implements` 检查的是 class 的实例侧，而构造签名通常用于描述 class 的静态构造侧。
6. 知道构造签名只存在于 TypeScript 类型系统中，不会生成新的 JavaScript 构造器。

> **本节核心代码**：`interface ProductConstructor { new (id: number, name: string): Product }`。
>
> **实验辅助代码**：`ProductModel` 和 `createProduct()` 用于观察构造器契约如何参与真实 `new` 调用。

## 理论讲解

### 1. 上一节的调用签名描述“可以直接调用”

上一节学习：

```ts
interface Formatter {
  (value: number): string;
}
```

它描述的是：

```ts
formatter(10)
```

也就是普通函数调用。

### 2. 构造签名描述“可以被 new”

如果希望描述：

```ts
new Constructor(101, 'Keyboard')
```

可以写：

```ts
interface ProductConstructor {
  new (id: number, name: string): Product;
}
```

这里的 `new` 很关键。

可以建立这样的对照：

```text
调用签名
(value: number): string
↓
formatter(10)

构造签名
new (id: number, name: string): Product
↓
new Constructor(101, 'Keyboard')
```

### 3. 构造器类型和实例类型是两个概念

假设：

```ts
interface Product {
  id: number;
  name: string;
}
```

这是**实例形状**。

而：

```ts
interface ProductConstructor {
  new (id: number, name: string): Product;
}
```

描述的是**能够创建 Product 实例的构造器值**。

可以理解为：

```text
ProductConstructor
       ↓ new
    Product
```

### 4. class 同时存在实例侧和构造侧

例如：

```ts
class ProductModel implements Product {
  constructor(
    public id: number,
    public name: string
  ) {}
}
```

`implements Product` 检查的是实例创建以后是否具备：

```text
id
name
```

而 class 名 `ProductModel` 本身是一个运行时构造器值，可以被：

```ts
new ProductModel(...)
```

因此它可以满足 `ProductConstructor`。

### 5. 构造签名非常适合工厂函数

例如：

```ts
function createProduct(
  Constructor: ProductConstructor,
  id: number,
  name: string
): Product {
  return new Constructor(id, name);
}
```

函数不关心具体传入哪个 class，只要求：

```text
这个值必须能 new
参数必须是 number + string
最终实例必须满足 Product
```

这是一种典型的依赖抽象方式。

### 6. 构造签名不是 class 声明

下面：

```ts
interface ProductConstructor {
  new (...): Product;
}
```

不会在 JavaScript 中生成：

```js
class ProductConstructor {}
```

接口会被擦除。

真正执行 `new` 的仍然必须是某个运行时构造器，例如 class。

### 7. 不要把实例对象传给构造器参数

下面是实例：

```ts
const product = new ProductModel(101, 'Keyboard');
```

它不能替代：

```ts
ProductModel
```

因为：

```text
product
→ 已经创建好的实例

ProductModel
→ 可以继续 new 的构造器值
```

### 8. 构造签名也可以带更多成员

JavaScript 的 class / constructor 本身也是对象，因此理论上可以同时描述：

- `new (...)`
- 静态属性
- 静态方法

本节先聚焦最核心的 `new` 契约，不提前扩展更复杂的静态侧设计。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp060-interface-construct-signatures/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：先声明实例接口

创建 `src/main.ts`：

```ts
interface Product {
  id: number;
  name: string;
}
```

### 第 2 步：声明构造器接口

继续写：

```ts
interface ProductConstructor {
  new (id: number, name: string): Product;
}
```

现在 TypeScript 已经知道：满足这个接口的值必须可以被 `new`。

### 第 3 步：创建真正的运行时 class

```ts
class ProductModel implements Product {
  constructor(
    public id: number,
    public name: string
  ) {}
}
```

这里 `ProductModel` 是实际 JavaScript 构造器。

### 第 4 步：让函数接收构造器，而不是实例

```ts
function createProduct(
  Constructor: ProductConstructor,
  id: number,
  name: string
): Product {
  return new Constructor(id, name);
}
```

注意参数名使用大写 `Constructor`，只是为了让“这是构造器值”更容易阅读，不是 TypeScript 语法要求。

### 第 5 步：把 class 传进去

```ts
const product = createProduct(
  ProductModel,
  101,
  'Keyboard'
);
```

此时 `ProductModel` 必须满足构造签名。

### 第 6 步：使用最终实例

```ts
console.log(
  `${product.id}:${product.name.toUpperCase()}`
);
```

预期：

```text
101:KEYBOARD
```

### 第 7 步：临时制造构造参数错误

可以尝试定义：

```ts
class WrongProductModel {
  constructor(id: string) {}
}
```

然后传给 `createProduct()`，类型检查应该失败，因为构造签名不兼容。

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`new (id, name): Product` 构造签名。
- **实验辅助代码**：class 和工厂函数只用于证明构造器契约可以真实约束 `new`。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./04-type-interface-structural-typing/kp060-interface-construct-signatures/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp060-interface-construct-signatures/tsconfig.json
node ./04-type-interface-structural-typing/kp060-interface-construct-signatures/dist/main.js
```

预期：

```text
101:KEYBOARD
```

## 效果验证

你应该能够确认：

- 构造签名描述的是“可被 `new` 调用”的值。
- `Product` 和 `ProductConstructor` 分别描述实例侧与构造侧。
- class 名本身可以作为构造器值传递。
- `implements Product` 不等于“class 构造器实现 ProductConstructor”。
- 接口构造签名不会生成新的 JavaScript 运行时代码。
