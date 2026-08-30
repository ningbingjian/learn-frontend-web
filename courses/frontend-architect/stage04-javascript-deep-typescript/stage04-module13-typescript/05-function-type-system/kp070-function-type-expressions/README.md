# TS-KP070：函数类型表达式

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `(params) => ReturnType` 描述普通函数值的类型。
2. 使用 `type` 为函数类型表达式建立可复用名称。
3. 理解函数类型同时包含参数类型和返回值类型。
4. 知道函数类型表达式里的参数名主要用于可读性，不要求与实现参数名一致。
5. 理解目标函数类型可以为函数表达式提供 Contextual Typing。
6. 在高阶函数参数中使用函数类型表达式。
7. 区分函数类型表达式与下一节 Call Signature 的适用边界。

> **本节核心代码**：`type PriceCalculator = (unitPrice: number, quantity: number) => number`。
>
> **实验辅助代码**：`runCalculation()` 和 `toFixed()` 用于证明函数值可以按静态契约传递和调用。

## 理论讲解

### 1. 函数本身也是值

JavaScript 中可以：

```js
const fn = function () {};
```

也可以：

```js
const fn = () => {};
```

还可以把函数作为参数：

```js
run(fn);
```

既然函数本身是值，TypeScript 就需要能够描述：

```text
这个函数值
接收什么参数
返回什么结果
```

最常见的方式就是 Function Type Expression。

### 2. 函数类型表达式基本语法

```ts
(unitPrice: number, quantity: number) => number
```

可以拆成：

```text
(unitPrice: number, quantity: number)
→ 参数列表

=>
→ 函数类型箭头

number
→ 返回值类型
```

完整含义：

> 这是一个接收两个 `number` 参数并返回 `number` 的函数。

### 3. 可以用 `type` 给函数类型取名字

直接重复：

```ts
(unitPrice: number, quantity: number) => number
```

会很长。

所以可以：

```ts
type PriceCalculator = (
  unitPrice: number,
  quantity: number
) => number;
```

之后：

```ts
const calculate: PriceCalculator = ...;
```

或：

```ts
function run(calculator: PriceCalculator) {}
```

都可以复用。

### 4. 参数名不要求和实现一致

类型里写：

```ts
type PriceCalculator = (
  unitPrice: number,
  quantity: number
) => number;
```

实现可以写：

```ts
const calculateTotal: PriceCalculator = (price, count) => {
  return price * count;
};
```

这里：

```text
unitPrice ↔ price
quantity  ↔ count
```

名字不同没有问题。

函数类型兼容关注的是对应参数位置和类型，不要求参数变量名称一致。

### 5. 但函数类型里的参数名不能随便省略语义

正确写法：

```ts
(a: string) => void
```

如果写成：

```ts
(string) => void
```

TypeScript 会把 `string` 当成**参数名称**，而不是把它理解成“省略了名字的 string 类型参数”。

因此函数类型表达式中应该正常写：

```text
参数名: 参数类型
```

参数名虽然不参与名称匹配，但语法上仍然有意义。

### 6. 函数类型包含输入和输出两部分

下面：

```ts
type PriceCalculator = (
  unitPrice: number,
  quantity: number
) => number;
```

既要求：

```text
输入：number, number
```

也要求：

```text
输出：number
```

如果实现返回字符串：

```ts
// const wrong: PriceCalculator = (price, count) => {
//   return `${price * count}`;
// };
```

应该失败。

### 7. 目标函数类型会提供 Contextual Typing

本节源码：

```ts
const calculateTotal: PriceCalculator = (price, count) => {
  return price * count;
};
```

这里没有再次写：

```ts
(price: number, count: number)
```

但 TypeScript 已经从左侧：

```ts
PriceCalculator
```

推断：

```text
price → number
count → number
```

这就是 Chapter 02 学过的 Contextual Typing 在函数类型中的真实使用。

### 8. 函数类型表达式非常适合高阶函数参数

所谓高阶函数，常见形式之一就是：

```text
函数接收另一个函数
```

例如：

```ts
function runCalculation(
  calculator: PriceCalculator,
  price: number,
  quantity: number
): number {
  return calculator(price, quantity);
}
```

`runCalculation()` 不需要知道传入函数内部怎么实现。

它只需要相信：

```text
calculator
符合 PriceCalculator 契约
```

### 9. 无返回值时要写 `void`

函数类型表达式的返回部分不能因为“没业务返回值”就直接消失。

例如：

```ts
type Logger = (message: string) => void;
```

这里 `void` 表达：

```text
调用者不应该依赖一个业务返回值
```

`void` 的深入规则已经在前面学过，Chapter 05 后面还会学习回调中的 `void` 特殊兼容规则。

### 10. 函数类型表达式和 Call Signature 的边界

普通函数：

```ts
(price: number) => string
```

非常适合 Function Type Expression。

但 JavaScript 函数还能拥有属性：

```js
formatter.currency = 'CNY';
```

如果要同时描述：

```text
可以调用
+
还有属性
```

Function Type Expression 本身不够方便。

下一节会学习 Call Signature：

```ts
type Formatter = {
  (value: number): string;
  currency: string;
};
```

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp070-function-type-expressions/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明函数类型别名

```ts
type PriceCalculator = (
  unitPrice: number,
  quantity: number
) => number;
```

现在有了一个完整函数契约。

### 第 2 步：实现符合契约的函数

```ts
const calculateTotal: PriceCalculator = (price, count) => {
  return price * count;
};
```

注意实现参数没有再次标注类型。

TypeScript 根据 `PriceCalculator` 得到：

```text
price → number
count → number
```

### 第 3 步：创建接收函数值的函数

```ts
function runCalculation(
  calculator: PriceCalculator,
  price: number,
  quantity: number
): number {
  return calculator(price, quantity);
}
```

这一步证明函数类型可以作为普通参数类型使用。

### 第 4 步：把函数作为值传进去

```ts
runCalculation(calculateTotal, 199.5, 2);
```

`calculateTotal` 满足 `PriceCalculator`，所以可以作为实参。

### 第 5 步：输出结果

```ts
console.log(
  runCalculation(calculateTotal, 199.5, 2).toFixed(2)
);
```

预期：

```text
399.00
```

### 第 6 步：临时制造错误返回类型

尝试：

```ts
// const wrong: PriceCalculator = (price, count) => {
//   return `${price * count}`;
// };
```

应该失败，因为目标返回类型是 `number`。

### 第 7 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`(params) => ReturnType` 与 `PriceCalculator`。
- **实验辅助代码**：`runCalculation()` 与格式化输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp070-function-type-expressions/tsconfig.json
npm run build -- ./05-function-type-system/kp070-function-type-expressions/tsconfig.json
node ./05-function-type-system/kp070-function-type-expressions/dist/main.js
```

预期：

```text
399.00
```

## 效果验证

你应该能够确认：

- `(a: A, b: B) => R` 可以描述普通函数值。
- 函数类型同时约束参数和返回值。
- 类型里的参数名与实现里的参数名可以不同。
- 左侧函数类型可以给函数表达式参数提供 Contextual Typing。
- 函数类型可以像普通类型一样用于变量和参数。
- 普通函数优先使用函数类型表达式；需要描述额外函数属性时再考虑 Call Signature。
