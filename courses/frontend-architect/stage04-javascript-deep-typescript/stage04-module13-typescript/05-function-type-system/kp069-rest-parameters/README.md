# TS-KP069：Rest 参数

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `...name: T[]` 声明 Rest 参数。
2. 理解 Rest 参数用于接收不定数量的实参。
3. 知道 Rest 参数必须放在普通参数之后，并位于参数列表末尾。
4. 理解 Rest 参数进入函数体后就是一个真正的数组。
5. 知道调用者可以为 Rest 参数传 0 个、1 个或多个值。
6. 区分“函数声明里的 Rest 参数”和“函数调用里的 Spread 参数”。
7. 理解 Rest 参数仍然有完整的 TypeScript 元素类型约束，不会自动退化成 `any[]`。

> **本节核心代码**：`function sumPrices(currency: string, ...prices: number[]): string`。
>
> **实验辅助代码**：`reduce()`、`toFixed()` 与日志输出用于观察 Rest 参数得到的数组和计算结果。

## 理论讲解

### 1. 为什么普通参数不够用

如果函数固定接收三个价格，可以写：

```ts
function sum(a: number, b: number, c: number) {
  return a + b + c;
}
```

但真实 API 可能允许：

```text
0 个价格
1 个价格
3 个价格
20 个价格
```

如果参数数量本身没有固定上限，就不应该继续机械增加：

```text
price1
price2
price3
price4
...
```

此时可以使用 Rest 参数。

### 2. Rest 参数基本语法

```ts
function sumPrices(
  currency: string,
  ...prices: number[]
): string {
  // ...
}
```

这里可以拆成：

```text
currency: string
→ 固定参数

...prices: number[]
→ Rest 参数
→ 接收后续任意数量的 number
```

### 3. Rest 参数必须在最后

Rest 参数会“收集后面所有剩余实参”。

所以：

```ts
function example(first: string, ...values: number[]) {}
```

可以。

但不能在 Rest 参数后继续声明普通参数。

可以建立直觉：

```text
前面的固定参数
        ↓
逐个匹配

Rest 参数
        ↓
收集剩余全部参数
```

### 4. 函数体内的 Rest 参数就是数组

对于：

```ts
function sumPrices(currency: string, ...prices: number[]) {
  // ...
}
```

函数内部：

```text
prices
↓
number[]
```

所以可以直接使用数组 API：

```ts
prices.length
prices.map(...)
prices.reduce(...)
```

这和旧式 `arguments` 对象不是同一个概念。

Rest 参数是现代 JavaScript 的正式语法，同时 TypeScript 可以继续给它增加静态元素类型。

### 5. Rest 参数可以接收 0 个值

下面合法：

```ts
sumPrices('CNY');
```

此时：

```text
currency = 'CNY'
prices = []
```

所以本节最终案例会得到：

```text
CNY 0.00
```

### 6. 也可以接收多个值

例如：

```ts
sumPrices('CNY', 199, 299, 499);
```

函数体内得到：

```ts
prices === [199, 299, 499]
```

类型仍然是：

```text
number[]
```

### 7. Rest 参数不会跳过类型检查

下面应该失败：

```ts
// sumPrices('CNY', 199, '299');
```

因为 Rest 参数声明的是：

```ts
...prices: number[]
```

所以后续所有对应实参都必须满足 `number`。

Rest 参数解决的是：

```text
数量不固定
```

不是：

```text
类型随便传
```

### 8. Rest Parameter 与 Spread Argument 不要混淆

函数声明中：

```ts
function sumPrices(...prices: number[]) {}
```

这里的 `...` 表示：

```text
收集多个实参
        ↓
形成一个数组
```

函数调用中：

```ts
const prices = [199, 299, 499] as const;
sumPrices('CNY', ...prices);
```

这里的 `...` 表示：

```text
把一个数组 / Tuple
        ↓
展开成多个实参
```

方向恰好相反：

```text
Rest Parameter
多个值 → 数组

Spread Argument
数组 → 多个值
```

本节核心是 Rest Parameter，Spread 只用于建立区分。

### 9. Rest 参数类型也可以是 Tuple

现代 TypeScript 中，Rest 参数并不只能写简单数组：

```ts
...args: [name: string, count: number]
```

Tuple Rest 可以保留固定位置和参数名称提示。

但当前课程已经在 Chapter 03 学过 Tuple，本节先用最常见的：

```ts
...prices: number[]
```

理解“不定数量、同类型参数”的场景。

### 10. 运行时仍然是普通 JavaScript

TypeScript 中的：

```ts
number[]
```

会在编译后擦除。

真正保留下来的 JavaScript Rest 参数语法仍然负责：

```text
收集后续实参
        ↓
创建 Array
```

所以要继续记住：

```text
Rest 语法
→ JavaScript 运行时行为

number[]
→ TypeScript 编译期约束
```

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp069-rest-parameters/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：定义固定参数和 Rest 参数

在 `src/main.ts` 中写：

```ts
function sumPrices(currency: string, ...prices: number[]): string {
}
```

此时已经建立：

```text
currency
→ 必须传 string

prices
→ 后续可以传任意数量 number
```

### 第 2 步：在函数体内把 Rest 参数当数组使用

加入：

```ts
const total = prices.reduce((sum, price) => sum + price, 0);
```

因为 `prices` 是 `number[]`，所以：

```text
sum   → number
price → number
```

都有明确类型。

### 第 3 步：格式化返回值

继续：

```ts
return `${currency} ${total.toFixed(2)}`;
```

完整函数变成：

```ts
function sumPrices(currency: string, ...prices: number[]): string {
  const total = prices.reduce((sum, price) => sum + price, 0);
  return `${currency} ${total.toFixed(2)}`;
}
```

### 第 4 步：传 0 个 Rest 实参

```ts
console.log(sumPrices('CNY'));
```

预期：

```text
CNY 0.00
```

说明 Rest 参数允许没有剩余参数。

### 第 5 步：传多个 Rest 实参

```ts
console.log(sumPrices('CNY', 199, 299, 499));
```

预期：

```text
CNY 997.00
```

### 第 6 步：临时制造类型错误

尝试：

```ts
// sumPrices('CNY', 199, '299');
```

应该产生类型错误。

原因：

```text
'299'
→ string

Rest 要求
→ number
```

验证后保持注释或删除。

### 第 7 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`...prices: number[]`。
- **实验辅助代码**：`reduce()`、货币格式化和日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp069-rest-parameters/tsconfig.json
npm run build -- ./05-function-type-system/kp069-rest-parameters/tsconfig.json
node ./05-function-type-system/kp069-rest-parameters/dist/main.js
```

预期：

```text
CNY 0.00
CNY 997.00
```

## 效果验证

你应该能够确认：

- Rest 参数使用 `...name: T[]` 声明。
- Rest 参数必须位于参数列表尾部。
- 调用者可以为 Rest 参数传 0～N 个值。
- 函数体内 Rest 参数是真正的数组。
- `number[]` 会约束每一个被收集的实参。
- Rest Parameter 是“多个值 → 数组”，Spread Argument 是“数组 → 多个值”。
- JavaScript Rest 行为会保留到运行时，TypeScript 元素类型会被擦除。
