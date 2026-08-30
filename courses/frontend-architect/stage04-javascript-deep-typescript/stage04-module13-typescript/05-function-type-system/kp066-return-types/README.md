# TS-KP066：返回值类型

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `function fn(...): ReturnType` 显式声明函数返回值类型。
2. 理解返回值类型约束函数实际返回路径。
3. 理解 TypeScript 通常可以根据 `return` 自动推断返回类型。
4. 知道显式返回类型适合公共 API、稳定边界和希望防止意外返回类型变化的场景。
5. 区分返回值类型注解和运行时数据转换。
6. 理解调用者会根据返回类型获得后续静态能力。
7. 能把函数输入类型和输出类型组合成清晰契约。

> **本节核心代码**：`: number` 与 `: string` 两个显式函数返回类型。
>
> **实验辅助代码**：`calculateTotal()`、`buildReceipt()` 与 `console.log()` 用于形成完整数据流。

## 理论讲解

### 1. 函数不只有输入，还有输出

上一节建立：

```text
参数类型
↓
调用者可以传什么
```

函数还需要回答：

```text
执行完成以后
↓
调用者会得到什么？
```

TypeScript 可以显式写返回类型：

```ts
function getCount(): number {
  return 3;
}
```

### 2. 返回类型写在参数列表后面

完整语法：

```ts
function calculateTotal(
  price: number,
  quantity: number
): number {
  return price * quantity;
}
```

可以拆成：

```text
price: number
quantity: number
      ↓
输入契约

: number
      ↓
输出契约
```

### 3. 返回值类型会检查 `return`

如果声明：

```ts
): number
```

却改成：

```ts
// return `${price * quantity}`;
```

实际返回 `string`，TypeScript 会报错。

### 4. TypeScript 经常能推断返回类型

下面也合法：

```ts
function calculateTotal(
  price: number,
  quantity: number
) {
  return price * quantity;
}
```

TypeScript 能推断返回 `number`。这一机制在 TS-KP031 已经学习过。

本节不是要求所有函数都手写返回类型，而是学习当输出契约需要显式稳定下来时如何表达。

### 5. 显式返回类型什么时候更有价值

常见场景：

```text
导出的公共函数
SDK API
公共库 API
服务层边界
希望避免重构时输出类型悄悄变化
希望代码审查时快速看见输入/输出契约
```

### 6. 返回类型会进入调用者上下文

如果：

```ts
function calculateTotal(...): number
```

调用：

```ts
const total = calculateTotal(499, 2);
```

TypeScript 知道 `total` 是 `number`，因此可以继续传给：

```ts
function buildReceipt(total: number): string
```

形成静态检查链路。

### 7. 返回类型不做运行时转换

写 `): string` 不会自动执行 `String(result)`；写 `): number` 也不会自动执行 `Number(result)`。

所以：

```text
返回类型
≠
序列化器
≠
格式转换器
```

### 8. `void` 也属于返回类型体系

前面 TS-KP027 已经学习：

```ts
function log(...): void
```

本节案例选择 `number` / `string`，便于观察返回值继续参与后续调用。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp066-return-types/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建计算函数

```ts
function calculateTotal(
  price: number,
  quantity: number
) {
  return price * quantity;
}
```

此时返回类型可以自动推断。

### 第 2 步：显式写出 `number`

```ts
function calculateTotal(
  price: number,
  quantity: number
): number {
  return price * quantity;
}
```

### 第 3 步：创建输出为 `string` 的函数

```ts
function buildReceipt(total: number): string {
  return `total=¥${total.toFixed(2)}`;
}
```

### 第 4 步：连接两个函数

```ts
const total = calculateTotal(499, 2);
console.log(buildReceipt(total));
```

TypeScript 会确认第一个函数返回的 `number` 与第二个函数参数要求兼容。

### 第 5 步：运行

预期：

```text
total=¥998.00
```

### 第 6 步：临时制造错误返回值

尝试：

```ts
// return `${price * quantity}`;
```

因为声明要求 `number`，类型检查应该失败。

### 第 7 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：函数参数列表后的 `: number` 与 `: string`。
- **实验辅助代码**：两个函数串联和日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp066-return-types/tsconfig.json
npm run build -- ./05-function-type-system/kp066-return-types/tsconfig.json
node ./05-function-type-system/kp066-return-types/dist/main.js
```

预期：

```text
total=¥998.00
```

## 效果验证

你应该能够确认：

- 返回类型写在参数列表之后。
- 返回类型会检查实际 `return` 结果。
- TypeScript 能推断很多函数的返回类型，但显式注解仍有 API 设计价值。
- 返回类型会成为调用者继续使用该值的静态依据。
- 返回类型不会在运行时自动转换值。
- 参数类型和返回值类型组合起来构成函数的完整基础契约。
