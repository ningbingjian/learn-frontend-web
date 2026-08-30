# TS-KP068：默认参数

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `parameter: Type = defaultValue` 声明默认参数。
2. 理解调用时省略参数会触发默认值。
3. 理解显式传入 `undefined` 同样会触发默认初始化。
4. 理解带默认值的参数在函数体内通常已经是确定类型，而不是 `T | undefined`。
5. 知道尾部默认参数在调用侧可以省略。
6. 理解默认参数与可选参数在调用类型上有相似处，但函数体内部语义不同。
7. 知道位于必需参数之前的默认参数需要通过显式 `undefined` 才能跳过，基础代码应优先选择更清晰的参数顺序。

> **本节核心代码**：`quantity: number = 1` 和 `discountRate: number = 0`。
>
> **实验辅助代码**：四次调用分别验证省略、部分覆盖、全部覆盖和显式 `undefined`。

## 理论讲解

### 1. “可省略”不一定代表函数体要处理 `undefined`

上一节：

```ts
title?: string
```

函数体内是 `string | undefined`。

但有些参数虽然调用者可以不传，我们希望函数内部总有一个确定值。例如：

```text
购买数量不传 → 默认 1
折扣不传     → 默认 0
```

这时默认参数更自然。

### 2. 默认参数基本语法

```ts
function calculate(
  quantity: number = 1
) {
  // ...
}
```

也可以让 TypeScript 从默认值推断：

```ts
function calculate(quantity = 1) {}
```

本节源码显式保留 `: number`，让参数类型和默认值两个概念都直接可见。

### 3. 调用者可以省略尾部默认参数

例如：

```ts
function calculatePrice(
  unitPrice: number,
  quantity: number = 1,
  discountRate: number = 0
): number {
  // ...
}
```

可以只调用：

```ts
calculatePrice(499);
```

运行时相当于：

```text
unitPrice    = 499
quantity     = 1
discountRate = 0
```

### 4. 可以只覆盖部分默认值

```ts
calculatePrice(499, 2);
```

此时 quantity 使用 2，而 discountRate 仍为 0。

继续传：

```ts
calculatePrice(499, 2, 0.1);
```

则三个参数都有明确值。

### 5. 显式 `undefined` 也触发默认值

调用：

```ts
calculatePrice(
  499,
  undefined,
  0.1
);
```

第二个位置虽然明确传了 `undefined`，运行时仍会执行 `quantity = 1`。

注意：

```text
undefined → 会触发默认值
null      → 不会自动触发默认值
```

`null` 是否允许传入，还取决于参数类型是否包含 `null`。

### 6. 函数体内部是确定类型

对于：

```ts
quantity: number = 1
```

进入函数体以后，TypeScript 可以把 `quantity` 当作 `number` 使用。

原因是：

```text
调用者没传        → 默认 1
调用者传 undefined → 默认 1
调用者传 number   → 使用那个 number
```

这与 `quantity?: number` 明显不同。

### 7. 尾部默认参数和可选参数的调用形式很接近

```ts
function a(value?: string): void {}
function b(value = 'default'): void {}
```

两者都允许 `a()` / `b()`。

但函数体内：

```text
a 的 value → string | undefined
b 的 value → string
```

这就是选择它们时最值得关注的差别之一。

### 8. 默认参数不一定必须放最后

JavaScript / TypeScript 允许：

```ts
function buildName(
  firstName = 'Will',
  lastName: string
) {}
```

但如果想用 firstName 默认值又必须提供 lastName，就要调用：

```ts
buildName(undefined, 'Smith');
```

这种 API 通常不如“必需参数在前，默认参数在后”直观。

### 9. 区分运行时默认值和静态参数类型

TypeScript 编译后会保留 JavaScript 默认参数的运行时行为，但 `number` 类型注解会被擦除。

所以：

```text
默认值
→ JavaScript 运行时行为

参数类型
→ TypeScript 编译期行为
```

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp068-default-parameters/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：先声明唯一必需参数

```ts
function calculatePrice(
  unitPrice: number
): number {
  return unitPrice;
}
```

### 第 2 步：增加数量默认值

```ts
function calculatePrice(
  unitPrice: number,
  quantity: number = 1
): number {
  return unitPrice * quantity;
}
```

现在 `calculatePrice(499)` 仍然合法。

### 第 3 步：增加折扣默认值

```ts
function calculatePrice(
  unitPrice: number,
  quantity: number = 1,
  discountRate: number = 0
): number {
  return unitPrice * quantity * (1 - discountRate);
}
```

三个参数职责：

```text
unitPrice     必需
quantity      默认 1
discountRate  默认 0
```

### 第 4 步：全部省略默认参数

```ts
console.log(calculatePrice(499).toFixed(2));
```

预期：

```text
499.00
```

### 第 5 步：覆盖 quantity

```ts
console.log(calculatePrice(499, 2).toFixed(2));
```

预期：

```text
998.00
```

### 第 6 步：覆盖两个默认参数

```ts
console.log(calculatePrice(499, 2, 0.1).toFixed(2));
```

预期：

```text
898.20
```

### 第 7 步：显式传 `undefined`

```ts
console.log(
  calculatePrice(499, undefined, 0.1).toFixed(2)
);
```

quantity 会重新使用默认值 1，输出：

```text
449.10
```

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：两个 `number = defaultValue` 默认参数。
- **实验辅助代码**：四种调用组合，用于观察默认值触发规则。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp068-default-parameters/tsconfig.json
npm run build -- ./05-function-type-system/kp068-default-parameters/tsconfig.json
node ./05-function-type-system/kp068-default-parameters/dist/main.js
```

预期：

```text
499.00
998.00
898.20
449.10
```

## 效果验证

你应该能够确认：

- 默认参数使用 `parameter: Type = value` 声明。
- 尾部默认参数可以在调用时省略。
- 显式传入 `undefined` 也会触发默认值。
- 默认参数进入函数体后通常已经是确定类型。
- 默认参数与 `parameter?: T` 在调用侧有相似处，但函数体语义不同。
- 默认值属于 JavaScript 运行时行为，类型注解属于 TypeScript 编译期行为。
- 基础 API 设计优先让必需参数在前、默认参数在后。
