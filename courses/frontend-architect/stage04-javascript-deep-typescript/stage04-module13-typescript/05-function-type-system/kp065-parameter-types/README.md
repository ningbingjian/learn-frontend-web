# TS-KP065：参数类型

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `parameter: Type` 为函数参数添加类型注解。
2. 理解参数类型同时约束调用者和函数体内部的静态操作。
3. 理解普通参数默认是必需参数，调用时需要提供对应参数。
4. 知道参数名称和参数类型共同构成函数声明的输入边界。
5. 理解参数类型只存在于 TypeScript 编译期，不会自动执行运行时数据转换或校验。
6. 能区分“参数类型错误”和“JavaScript 运行时拿到某个值”这两个层次。
7. 为后续可选参数、默认参数、Rest 参数和完整函数类型打基础。

> **本节核心代码**：`function formatOrderLine(sku: string, quantity: number)` 中的两个参数类型注解。
>
> **实验辅助代码**：`toUpperCase()`、`toFixed()` 和 `console.log()` 用于证明参数类型在函数体内真实提供静态能力。

## 理论讲解

### 1. 函数首先是一条输入边界

JavaScript 可以写：

```js
function formatOrderLine(sku, quantity) {
  return `${sku} x ${quantity}`;
}
```

仅从函数声明本身，编辑器不知道：

```text
sku 应该是什么？
quantity 应该是什么？
```

TypeScript 可以把输入契约写进函数声明：

```ts
function formatOrderLine(
  sku: string,
  quantity: number
) {
  // ...
}
```

现在静态规则变成：

```text
第 1 个参数 → string
第 2 个参数 → number
```

### 2. 参数类型写在参数名称后面

基本语法：

```ts
function greet(name: string) {
  // ...
}
```

多个参数分别声明：

```ts
function calculate(
  price: number,
  quantity: number
) {
  // ...
}
```

每个参数都有自己的静态类型。

### 3. 参数类型会检查调用者

如果函数要求：

```ts
function formatOrderLine(
  sku: string,
  quantity: number
) {
  // ...
}
```

合法调用：

```ts
formatOrderLine('kb-001', 2);
```

错误调用：

```ts
// formatOrderLine(1001, 2);
// formatOrderLine('kb-001', '2');
```

TypeScript 会在执行 JavaScript 之前就指出参数类型不匹配。

### 4. 参数类型也会影响函数体内部

当 `sku: string` 时，可以安全使用：

```ts
sku.toUpperCase();
sku.trim();
```

当 `quantity: number` 时，可以安全使用：

```ts
quantity.toFixed(0);
```

如果写：

```ts
// quantity.toUpperCase();
```

类型检查会失败。

### 5. 普通参数默认是必需的

下面函数的两个参数默认都需要提供：

```ts
function formatOrderLine(
  sku: string,
  quantity: number
) {
  // ...
}
```

因此：

```ts
formatOrderLine('kb-001', 2);
```

合法，但：

```ts
// formatOrderLine('kb-001');
```

会报参数数量不足。

后面 TS-KP067 会学习如何用 `?` 让参数允许省略。

### 6. 参数类型不会自动做运行时转换

声明 `quantity: number` 并不意味着运行时会自动执行：

```js
Number(quantity)
```

同样 `sku: string` 也不会自动执行 `String(sku)`。

必须建立：

```text
静态参数类型
≠
运行时转换器
≠
运行时校验器
```

如果参数来自 HTTP、JSON、表单或外部 JavaScript，仍然要根据边界需要做运行时验证。

### 7. 参数类型不是返回值类型

本节只显式声明输入：

```ts
function formatOrderLine(
  sku: string,
  quantity: number
) {
  return ...;
}
```

返回类型暂时让 TypeScript 自动推断。下一节 TS-KP066 再单独学习函数输出契约。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp065-parameter-types/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：从最小函数开始

在 `src/main.ts` 写：

```ts
function formatOrderLine(
  sku: string,
  quantity: number
) {
}
```

此时已经建立输入约束。

### 第 2 步：使用 `string` 参数

加入：

```ts
sku.toUpperCase()
```

因为 `sku` 已经是 `string`。

### 第 3 步：使用 `number` 参数

继续加入：

```ts
quantity.toFixed(0)
```

因为 `quantity` 已经是 `number`。

### 第 4 步：完成函数

```ts
function formatOrderLine(
  sku: string,
  quantity: number
) {
  return `${sku.toUpperCase()} x ${quantity.toFixed(0)}`;
}
```

### 第 5 步：合法调用

```ts
console.log(formatOrderLine('kb-001', 2));
```

预期：

```text
KB-001 x 2
```

### 第 6 步：临时制造参数类型错误

尝试：

```ts
// formatOrderLine(1001, 2);
// formatOrderLine('kb-001', '2');
```

两行都应该类型检查失败。

### 第 7 步：临时少传参数

尝试：

```ts
// formatOrderLine('kb-001');
```

普通参数默认必需，因此应报参数数量不足。

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`sku: string`、`quantity: number` 参数类型注解。
- **实验辅助代码**：字符串、数字方法和日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp065-parameter-types/tsconfig.json
npm run build -- ./05-function-type-system/kp065-parameter-types/tsconfig.json
node ./05-function-type-system/kp065-parameter-types/dist/main.js
```

预期：

```text
KB-001 x 2
```

## 效果验证

你应该能够确认：

- 函数参数可以使用 `name: Type` 显式声明类型。
- 参数类型会约束调用时传入的值。
- 参数类型也决定函数体内可以安全使用哪些成员。
- 普通参数默认需要在调用时提供。
- 参数类型不会自动转换 JavaScript 运行时值。
- 类型注解编译后会被擦除。
- 本节只负责函数输入，返回值类型在下一节继续学习。
