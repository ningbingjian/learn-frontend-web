# TS-KP018：`number`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用小写 `number` 描述 JavaScript 普通数字。
2. 理解 TypeScript 不另外提供 `int`、`float` 这类 Java 风格基础数字类型。
3. 使用 `number` 为函数参数和返回值建立计算边界。
4. 理解整数、小数在 JavaScript/TypeScript 中通常都属于 `number`。
5. 区分普通 `number` 与下一节 `bigint` 的运行时类型。

> **本节核心代码**：价格、数量、折扣等 `number` 值以及数值函数签名。
>
> **实验辅助代码**：`toFixed()`、`typeof` 和日志用于观察计算结果。

## 理论讲解

### 1. 普通 JavaScript 数字使用 `number`

```ts
const count: number = 2;
const price: number = 499.5;
```

整数和小数都可以使用 `number`。

### 2. 没有单独的 `int` / `float`

如果来自 Java 背景，很容易寻找 `int`、`long`、`float`、`double`。但 JavaScript 普通数值主要使用一种 Number 运行时类型，对应 TypeScript 的小写 `number`。非常大的整数使用独立的 `bigint`。

### 3. `number` 参与算术表达式

```ts
function add(left: number, right: number): number {
  return left + right;
}
```

错误传入字符串会被静态检查发现。

### 4. 数字格式化不会改变源值类型

`total.toFixed(2)` 返回显示字符串，因此要区分 `total` 本身的 `number` 与格式化后的文本。

---

## 动手编码：从 0 到 1

### 第 0 步：创建文件

创建 `src/main.ts` 与当前知识点 `tsconfig.json`。

### 第 1 步：声明价格

```ts
const unitPrice: number = 499.5;
```

小数仍然是 `number`。

### 第 2 步：让数量使用类型推断

```ts
const quantity = 2;
```

TypeScript 可以从数字字面量推断数值类型信息。

### 第 3 步：加入折扣率

```ts
const discountRate: number = 0.1;
```

### 第 4 步：建立数值计算函数

```ts
function calculateTotal(price: number, count: number, discount: number): number {
  return price * count * (1 - discount);
}
```

函数明确要求三个 `number`，并返回 `number`。

### 第 5 步：计算结果

```ts
const total = calculateTotal(unitPrice, quantity, discountRate);
```

`total` 的类型可以由函数返回值推断。

### 第 6 步：输出格式化结果

```ts
console.log(total.toFixed(2));
console.log(typeof total);
```

预期：

```text
899.10
number
```

### 第 7 步：制造错误调用

临时尝试：

```ts
calculateTotal('499.5', quantity, discountRate);
```

类型检查应阻止字符串冒充数字。验证后恢复最终源码。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

- **本节核心代码**：`number` 变量、数值参数和 `number` 返回值。
- **实验辅助代码**：`toFixed(2)` 用于展示金额，`typeof` 用于观察运行时类型。

## 运行案例

```bash
npm run check -- ./02-basic-types-inference/kp018-number/tsconfig.json
npm run build -- ./02-basic-types-inference/kp018-number/tsconfig.json
node ./02-basic-types-inference/kp018-number/dist/main.js
```

预期：

```text
899.10
number
```

## 效果验证

你应该能够解释：

- 为什么整数 `2` 和小数 `499.5` 都能使用 `number`。
- 为什么 TypeScript 日常业务中没有 `int` / `float` 基础类型选择题。
- 为什么字符串 `'499.5'` 不能直接传给 `number` 参数。
- 为什么 `total.toFixed(2)` 的显示文本和 `total` 本身不是同一种值。
