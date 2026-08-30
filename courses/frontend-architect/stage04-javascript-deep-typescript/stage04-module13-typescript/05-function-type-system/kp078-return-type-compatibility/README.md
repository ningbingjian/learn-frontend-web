# TS-KP078：函数返回值兼容

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解两个函数类型进行赋值时，返回值类型也必须满足兼容关系。
2. 使用结构化类型系统判断对象返回值之间的兼容性。
3. 理解“返回更具体对象”的函数为什么可以满足“返回较窄对象结构”的目标函数类型。
4. 理解反方向为什么不成立：目标需要的成员不能凭空消失。
5. 区分运行时真实返回对象与目标函数类型提供的静态可见视图。
6. 知道 `void` 返回值存在独立特殊规则，将在 TS-KP080 单独学习。

> **本节核心代码**：`ProductSummary`、`ProductDetails`、`SummaryFactory` 与 `createDetails -> createSummary` 的返回值兼容关系。
>
> **实验辅助代码**：`'price' in summary` 和日志用于证明运行时对象没有因为较窄目标类型而删除字段。

## 理论讲解

### 1. 函数兼容不只比较参数

上一节学习了参数数量兼容。

但完整函数类型还包含返回值：

```text
参数列表
   +
返回值
   ↓
完整函数类型
```

例如：

```ts
type Factory = () => Product;
```

如果把另一个函数赋给 `Factory`，TypeScript 不仅检查它能不能被正确调用，也会检查它返回的值能否作为 `Product` 使用。

### 2. 返回值兼容仍然使用结构化思路

声明：

```ts
type ProductSummary = {
  name: string;
};
```

再声明一个更具体的结构：

```ts
type ProductDetails = {
  name: string;
  price: number;
};
```

结构关系可以理解为：

```text
ProductDetails
├── name: string
└── price: number

ProductSummary
└── name: string
```

`ProductDetails` 拥有 `ProductSummary` 所要求的全部成员。

因此：

```text
ProductDetails
可以作为
ProductSummary
```

### 3. 返回更具体类型的函数可以满足较窄目标

例如：

```ts
type SummaryFactory = () => ProductSummary;

const createDetails = (): ProductDetails => ({
  name: 'Keyboard',
  price: 499
});
```

然后：

```ts
const createSummary: SummaryFactory = createDetails;
```

这是安全的。

调用 `createSummary()` 的代码只要求：

```text
一定能得到 name: string
```

而 `createDetails()` 实际返回：

```text
name: string ✅
price: number 额外成员
```

完全满足目标要求。

### 4. 反方向为什么不成立

如果目标需要：

```ts
() => ProductDetails
```

但源函数只能保证：

```ts
() => ProductSummary
```

那目标调用者可能会写：

```ts
result.price.toFixed(2);
```

但源函数没有承诺 `price` 一定存在。

因此：

```text
源返回值缺少目标要求的成员
        ↓
不兼容
```

可以建立方向感：

```text
源函数返回得更具体
        ↓
可以赋给返回较宽 / 较少要求的目标

源函数返回得更少
        ↓
不能赋给要求更多成员的目标
```

### 5. 目标函数类型会影响调用结果的静态视图

这一点非常重要。

虽然：

```ts
const createSummary: SummaryFactory = createDetails;
```

底层实际运行的仍然是 `createDetails()`。

它返回的真实 JavaScript 对象仍然有：

```text
name
price
```

但是：

```ts
const summary = createSummary();
```

`summary` 的静态类型来自 `SummaryFactory`：

```ts
ProductSummary
```

所以直接写：

```ts
// summary.price
```

TypeScript 不允许。

不是因为运行时 `price` 被删除，而是当前静态契约没有承诺这个字段。

### 6. 类型收窄和运行时字段仍然是两层概念

最终案例使用：

```ts
console.log('price' in summary);
```

运行时会输出：

```text
true
```

这证明类型系统没有改变真实对象。

可以记住：

```text
函数目标返回类型
        ↓
决定调用方静态可依赖的能力

JavaScript 实际返回对象
        ↓
由运行时代码真正创建
```

### 7. 返回值兼容可以理解成“协变方向”

后面你会接触 variance 相关术语。

当前只建立直觉：

```text
返回位置
通常允许“更具体”去满足“更宽”
```

例如：

```text
Dog -> Animal
ProductDetails -> ProductSummary
```

不需要现在死记“协变”术语，但要理解这个方向为什么安全。

### 8. `void` 是特殊情况，不要混进普通返回值规则

如果目标返回类型是：

```ts
() => void
```

TypeScript 有一个为了 JavaScript 回调习惯设计的特殊规则。

一个实际返回 `number` 的函数仍可能赋给 `() => void`。

这和本节普通结构化返回值兼容不同，因此统一留到 TS-KP080 解释。

### 9. 类型兼容不做运行时转换

即使：

```ts
const createSummary: SummaryFactory = createDetails;
```

TypeScript 也不会插入：

```js
return {
  name: result.name
};
```

更不会删除 `price`。

类型赋值只是编译期兼容关系。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp078-return-type-compatibility/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明较窄的摘要结构

```ts
type ProductSummary = {
  name: string;
};
```

调用方只需要 `name`。

### 第 2 步：声明更具体的详细结构

```ts
type ProductDetails = {
  name: string;
  price: number;
};
```

它比 `ProductSummary` 多一个 `price`。

### 第 3 步：声明目标函数类型

```ts
type SummaryFactory = () => ProductSummary;
```

任何赋给它的函数都必须保证返回值至少满足：

```text
{ name: string }
```

### 第 4 步：实现返回更具体对象的函数

```ts
const createDetails = (): ProductDetails => ({
  name: 'Keyboard',
  price: 499
});
```

它返回的是 `ProductDetails`。

### 第 5 步：把更具体的函数赋给较窄目标

```ts
const createSummary: SummaryFactory = createDetails;
```

这里应该通过类型检查。

### 第 6 步：通过目标类型调用

```ts
const summary = createSummary();
console.log(summary.name);
```

预期：

```text
Keyboard
```

### 第 7 步：观察运行时对象没有被裁剪

```ts
console.log('price' in summary);
```

预期：

```text
true
```

虽然 `summary` 静态类型不暴露 `price`，实际对象仍然来自 `createDetails()`。

### 第 8 步：通过具体函数访问具体返回类型

```ts
console.log(createDetails().price.toFixed(2));
```

预期：

```text
499.00
```

### 第 9 步：临时实验反方向错误

```ts
type DetailsFactory = () => ProductDetails;

const createOnlySummary = (): ProductSummary => ({
  name: 'Mouse'
});

// const wrong: DetailsFactory = createOnlySummary;
```

目标要求 `price`，源函数没有承诺它，因此不兼容。

### 第 10 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`ProductSummary` / `ProductDetails` 的结构关系以及 `createSummary = createDetails`。
- **实验辅助代码**：`'price' in summary` 和日志输出用于观察静态类型与运行时对象的区别。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp078-return-type-compatibility/tsconfig.json
npm run build -- ./05-function-type-system/kp078-return-type-compatibility/tsconfig.json
node ./05-function-type-system/kp078-return-type-compatibility/dist/main.js
```

预期输出：

```text
Keyboard
true
499.00
```

## 效果验证

完成本节后，你应该能够解释：

```text
() => ProductDetails
```

为什么可以赋给：

```text
() => ProductSummary
```

因为目标调用者所要求的全部成员，源函数返回值都能够保证。

同时要记住：目标函数类型只改变调用方的**静态可见能力**，不会修改真实 JavaScript 返回对象。
