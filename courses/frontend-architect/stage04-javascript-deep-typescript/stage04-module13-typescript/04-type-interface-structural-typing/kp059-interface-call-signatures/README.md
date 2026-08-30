# TS-KP059：接口调用签名

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 在接口中使用 `(args): ReturnType` 描述可调用对象。
2. 使用接口调用签名约束函数参数和返回值。
3. 理解调用签名和普通方法属性语法的差异。
4. 知道 JavaScript 函数本身也是对象，因此一个接口可以同时描述“可调用能力”和函数对象上的属性。
5. 使用 `Object.assign()` 构造一个既可调用又带属性的函数对象案例。
6. 理解调用签名仍然只是静态类型约束，不会自动创建函数实现。
7. 为下一节构造签名 `new (...)` 建立对照。

> **本节核心代码**：`PriceFormatter` 中的调用签名和 `locale` 属性。
>
> **实验辅助代码**：`Object.assign()` 只用于构造符合接口结构的真实 JavaScript 函数对象。

## 理论讲解

### 1. interface 不只可以描述普通对象属性

以前接口常见写法：

```ts
interface Product {
  id: number;
  name: string;
}
```

它描述一个拥有属性的对象。

但 JavaScript 中函数也是对象，并且可以被调用。

TypeScript 可以用**调用签名**描述这种“可以像函数一样调用”的结构。

### 2. 调用签名的基本语法

```ts
interface SearchFunc {
  (source: string, keyword: string): boolean;
}
```

注意这里不是：

```ts
search(source: string, keyword: string): boolean;
```

前者表示：

> `SearchFunc` 类型的值本身可以直接被调用。

后者表示：

> 一个对象上有名为 `search` 的方法。

这是两个不同结构。

### 3. 调用签名可以约束普通函数

例如：

```ts
interface Formatter {
  (value: number): string;
}

const format: Formatter = (value) => value.toFixed(2);
```

TypeScript 会根据接口检查参数和返回值。

### 4. 函数对象还可以拥有属性

JavaScript 函数可以这样：

```js
function fn() {}
fn.label = 'formatter';
```

所以 TypeScript 接口可以同时写：

```ts
interface PriceFormatter {
  (price: number, currency: string): string;
  readonly locale: string;
}
```

它表达的不是“两个对象”，而是同一个值同时满足：

```text
可以被调用
+
拥有 locale 属性
```

### 5. 本节为什么用 `Object.assign()`

直接写箭头函数：

```ts
const fn = () => '...';
```

它没有我们业务需要的 `locale` 属性。

可以通过：

```ts
Object.assign(functionValue, { locale: 'zh-CN' })
```

构造一个真实的 JavaScript 函数对象，并给它添加属性。

这正好展示：调用签名描述的是 JavaScript 已有能力，而不是 TypeScript 创造了新的运行时函数类型。

### 6. 参数名不决定兼容关系

接口可能写：

```ts
(price: number, currency: string): string
```

实现函数内部可以使用其它参数名，只要位置上的参数类型和返回值满足要求。

这仍然符合 TypeScript 的结构化类型思路。

### 7. 调用签名与下一节构造签名

调用签名：

```ts
(value: string): Result
```

表示：

```ts
fn('hello')
```

下一节构造签名：

```ts
new (value: string): Result
```

表示：

```ts
new Constructor('hello')
```

二者要分清“普通调用”和“new 调用”。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp059-interface-call-signatures/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明调用签名

```ts
interface PriceFormatter {
  (price: number, currency: string): string;
}
```

现在这个接口描述的值必须能直接：

```ts
formatter(499, 'CNY')
```

### 第 2 步：加入函数对象属性

把接口扩展成：

```ts
interface PriceFormatter {
  (price: number, currency: string): string;
  readonly locale: string;
}
```

这要求同一个值还拥有 `locale`。

### 第 3 步：创建函数实现

先准备普通函数：

```ts
(price: number, currency: string) =>
  `${currency} ${price.toFixed(2)}`
```

### 第 4 步：给函数对象附加属性

使用：

```ts
const formatPrice: PriceFormatter = Object.assign(
  (price: number, currency: string) => `${currency} ${price.toFixed(2)}`,
  { locale: 'zh-CN' }
);
```

最终 `formatPrice` 同时满足：

```text
可调用
+
locale 属性
```

### 第 5 步：像函数一样调用

```ts
console.log(formatPrice(499, 'CNY'));
```

预期：

```text
CNY 499.00
```

### 第 6 步：像对象一样读取属性

```ts
console.log(formatPrice.locale);
```

预期：

```text
zh-CN
```

### 第 7 步：临时制造错误

尝试把实现返回数字：

```ts
// const broken: PriceFormatter = Object.assign(
//   (price: number, currency: string) => price,
//   { locale: 'zh-CN' }
// );
```

应该失败，因为接口要求返回 `string`。

也可以临时移除 `locale`，观察结构不完整时的错误。

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：接口中的无名称调用签名。
- **实验辅助代码**：`Object.assign()` 负责构造真实函数对象。

## 运行案例

```bash
npm run check -- ./04-type-interface-structural-typing/kp059-interface-call-signatures/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp059-interface-call-signatures/tsconfig.json
node ./04-type-interface-structural-typing/kp059-interface-call-signatures/dist/main.js
```

预期：

```text
CNY 499.00
zh-CN
```

## 效果验证

你应该能够确认：

- interface 可以描述一个值本身的调用方式。
- 调用签名会检查参数和返回值。
- 调用签名和“对象上有一个方法”不是同一个结构。
- 一个 JavaScript 函数对象可以同时可调用并拥有属性。
- 调用签名是静态契约，不会自动生成函数实现。
