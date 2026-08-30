# TS-KP071：调用签名 Call Signature

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用对象类型中的 `(args): ReturnType` 声明 Call Signature。
2. 理解 Call Signature 表示“这个值本身可以被调用”。
3. 区分 Call Signature 和普通方法属性。
4. 理解 Call Signature 可以和普通对象属性一起出现。
5. 区分 Call Signature 使用 `:` 与函数类型表达式使用 `=>` 的语法。
6. 使用 `Object.assign()` 构造“可调用 + 带属性”的真实 JavaScript 函数对象。
7. 理解 Call Signature 是静态描述，函数属性本身必须由运行时代码真正创建。

> **本节核心代码**：`type CurrencyFormatter = { (value: number): string; readonly currency: string }`。
>
> **实验辅助代码**：`Object.assign()` 用于构造真实函数对象，日志用于分别观察调用结果和属性值。

## 理论讲解

### 1. JavaScript 函数也是对象

JavaScript 中：

```js
function formatter(value) {
  return String(value);
}

formatter.currency = 'CNY';
```

同一个值同时拥有：

```text
可调用能力
formatter(499)

+

对象属性
formatter.currency
```

如果 TypeScript 只描述：

```ts
(value: number) => string
```

只能表达“如何调用”，不能同时把额外属性自然写进同一个函数类型表达式。

此时就适合 Call Signature。

### 2. Call Signature 基本语法

```ts
type CurrencyFormatter = {
  (value: number): string;
};
```

注意这里不是：

```ts
(value: number) => string
```

而是：

```ts
(value: number): string;
```

对比：

```text
Function Type Expression
(value: number) => string

Call Signature
{
  (value: number): string;
}
```

### 3. Call Signature 描述的是“对象本身可调用”

下面：

```ts
type CurrencyFormatter = {
  (value: number): string;
};
```

表示值可以这样使用：

```ts
formatter(499);
```

而不是表示它拥有一个名为某某的方法。

### 4. 不要和普通方法属性混淆

Call Signature：

```ts
type A = {
  (value: number): string;
};
```

调用：

```ts
a(499);
```

普通方法属性：

```ts
type B = {
  format(value: number): string;
};
```

调用：

```ts
b.format(499);
```

这两个运行时结构完全不同。

### 5. Call Signature 最大价值之一：可以继续声明属性

本节最终类型：

```ts
type CurrencyFormatter = {
  (value: number): string;
  readonly currency: string;
};
```

这表示一个值必须同时满足：

```text
(value: number) → string

+

currency: string
```

也就是：

```text
函数能力
+
对象能力
```

### 6. JavaScript 函数本来就能拥有属性

TypeScript 没有发明一种新的“带属性函数”。

JavaScript 原本就允许：

```js
fn.someProperty = value;
```

TypeScript 的 Call Signature 只是把这类真实 JavaScript 值静态描述清楚。

### 7. 本节为什么使用 `Object.assign()`

可以先写函数，再赋属性：

```ts
function formatter(value: number) {
  return `¥${value.toFixed(2)}`;
}

formatter.currency = 'CNY';
```

也可以用：

```ts
Object.assign(functionValue, properties)
```

本节采用：

```ts
const formatCny: CurrencyFormatter = Object.assign(
  (value: number) => `¥${value.toFixed(2)}`,
  { currency: 'CNY' }
);
```

这样可以在一个表达式中看到：

```text
函数值
+
运行时属性
```

### 8. `readonly` 仍然只是 TypeScript 静态约束

类型中：

```ts
readonly currency: string;
```

表达使用方不应该通过该类型引用重新赋值。

它并不自动执行：

```js
Object.freeze(...)
```

前面已经多次学习过这个边界：

```text
readonly
→ 静态修改约束

不是
→ 自动运行时冻结
```

### 9. 类型声明不会自动创造属性

如果类型写：

```ts
type CurrencyFormatter = {
  (value: number): string;
  currency: string;
};
```

TypeScript 不会因此在运行时自动给函数添加 `currency`。

必须真的执行：

```js
formatter.currency = 'CNY';
```

或本节的：

```js
Object.assign(...)
```

这再次体现：

```text
类型
→ 描述 / 检查

JavaScript 代码
→ 真正创建值和属性
```

### 10. Function Type Expression 与 Call Signature 怎么选

普通函数：

```ts
(value: number) => string
```

优先 Function Type Expression，简单直接。

如果函数本身还有属性：

```text
formatter(...)
formatter.currency
formatter.description
formatter.version
```

可以使用 Call Signature 对象类型。

下一节 Construct Signature 会用非常相似的对象类型语法描述：

```text
这个值可以被 new
```

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp071-call-signatures/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：先定义只有调用能力的类型

```ts
type CurrencyFormatter = {
  (value: number): string;
};
```

这表示值可以：

```ts
formatter(499);
```

### 第 2 步：给函数对象增加属性契约

修改成：

```ts
type CurrencyFormatter = {
  (value: number): string;
  readonly currency: string;
};
```

现在这个值不仅要能调用，还必须有 `currency`。

### 第 3 步：创建函数值

先写核心函数：

```ts
(value: number) => `¥${value.toFixed(2)}`
```

它满足调用部分：

```text
number → string
```

但还没有运行时 `currency` 属性。

### 第 4 步：使用 `Object.assign()` 添加真实属性

```ts
const formatCny: CurrencyFormatter = Object.assign(
  (value: number) => `¥${value.toFixed(2)}`,
  { currency: 'CNY' }
);
```

现在同一个值同时满足：

```text
可调用
+
currency 属性
```

### 第 5 步：调用函数对象

```ts
console.log(formatCny(499));
```

预期：

```text
¥499.00
```

### 第 6 步：读取函数对象属性

```ts
console.log(formatCny.currency);
```

预期：

```text
CNY
```

### 第 7 步：临时制造不完整类型错误

如果只写普通函数：

```ts
// const wrong: CurrencyFormatter = (value: number) => {
//   return `¥${value.toFixed(2)}`;
// };
```

应该失败，因为缺少：

```text
currency
```

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：对象类型中的 `(value: number): string` Call Signature 与 `currency` 属性。
- **实验辅助代码**：`Object.assign()` 和日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp071-call-signatures/tsconfig.json
npm run build -- ./05-function-type-system/kp071-call-signatures/tsconfig.json
node ./05-function-type-system/kp071-call-signatures/dist/main.js
```

预期：

```text
¥499.00
CNY
```

## 效果验证

你应该能够确认：

- Call Signature 描述“这个值本身可以调用”。
- Call Signature 在对象类型中使用 `(args): ReturnType`。
- 它和函数类型表达式的 `=>` 语法不同。
- Call Signature 可以和普通属性一起组成函数对象契约。
- 函数本身也是 JavaScript 对象，所以能拥有真实运行时属性。
- 类型声明不会自动创建这些属性，必须由 JavaScript 代码真正赋值。
- Call Signature 与对象方法属性是两种不同的运行时结构。
