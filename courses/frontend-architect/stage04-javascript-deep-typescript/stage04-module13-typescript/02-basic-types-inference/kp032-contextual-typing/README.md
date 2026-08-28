# TS-KP032：Contextual Typing

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 Contextual Typing 为什么被称为“从上下文反向获得类型信息”。
2. 理解函数表达式赋值给已知函数类型时，参数可以不写显式类型。
3. 理解回调函数作为实参传入时，参数类型可以从调用位置获得。
4. 能通过错误属性或错误方法调用证明参数并不是 `any`。
5. 知道脱离上下文的函数参数在严格模式下可能触发隐式 `any`。
6. 理解上下文不仅可以推断参数，还可以反过来检查函数返回值是否符合目标函数类型。

> **本节核心代码**：`PriceFormatter` 赋值上下文和 `buildLabels()` 回调参数上下文，它们为函数表达式中的参数提供类型。
>
> **实验辅助代码**：临时错误方法调用、编辑器 Hover 和日志输出只用于证明上下文类型已经生效。

## 理论讲解

### 1. 普通推断通常从值向变量传播

上一节学习的返回类型推断更像：

```text
return 表达式
      ↓
函数返回类型
```

变量初始化也类似：

```text
右侧值
  ↓
左侧变量类型
```

但 Contextual Typing 经常是另一个方向。

### 2. Contextual Typing 是“上下文 → 表达式”

先声明函数类型：

```ts
type PriceFormatter = (price: number, currency: string) => string;
```

再写：

```ts
const formatPrice: PriceFormatter = (price, currency) => {
  return `${currency} ${price.toFixed(2)}`;
};
```

箭头函数参数没有写：

```ts
price: number
currency: string
```

但 TypeScript 可以从左侧 `PriceFormatter` 反向得知：

```text
PriceFormatter
   ↓
第 1 个参数 number
第 2 个参数 string
   ↓
(price, currency) => ...
```

这就是 Contextual Typing。

### 3. 参数没有标注，不代表它们是 `any`

在上面的上下文中：

```ts
price.toFixed(2)
```

可以。

而如果临时写：

```ts
price.toUpperCase()
```

TypeScript 会报错，因为 `price` 已经从上下文获得了 `number` 类型。

同理：

```ts
currency.toUpperCase()
```

是合法的，因为 `currency` 被推断为 `string`。

### 4. 函数调用参数也会形成上下文

定义：

```ts
function buildLabels(
  values: number[],
  formatter: (value: number, index: number) => string
): string[] {
  return values.map(formatter);
}
```

调用：

```ts
buildLabels([10, 20, 30], (value, index) => {
  return `${index}:${value.toFixed(1)}`;
});
```

回调里的：

```text
value
index
```

都没有显式标注。

但调用位置已经知道第二个参数必须是：

```ts
(value: number, index: number) => string
```

因此这两个参数会被上下文类型化。

### 5. 脱离上下文后可能就不能推断

如果单独写：

```ts
const formatter = (value, index) => {
  return `${index}:${value}`;
};
```

在严格模式下，`value`、`index` 没有参数标注，也没有足够的函数上下文，可能触发隐式 `any` 错误。

所以关键不是：

> “箭头函数参数都可以省略类型”。

而是：

> **只有上下文已经提供足够类型信息时，TypeScript 才能安全省略这些重复标注。**

### 6. 上下文还会检查返回值

因为：

```ts
type PriceFormatter = (price: number, currency: string) => string;
```

明确要求返回 `string`。

所以：

```ts
const formatter: PriceFormatter = (price, currency) => {
  return price;
};
```

会失败。

这说明上下文类型不只流向参数，也会参与检查整个函数表达式是否满足目标函数契约。

### 7. Contextual Typing 常出现在哪里

常见位置包括：

- 函数表达式赋值给已知函数类型。
- 回调函数作为函数调用参数。
- 对象字面量位于明确类型上下文中。
- 数组字面量位于明确类型上下文中。
- 返回表达式位于明确返回类型上下文中。

本节先通过最常见的函数与回调建立直觉。

### 8. 为什么它很重要

没有 Contextual Typing，很多真实代码会变成：

```ts
items.map((item: Item, index: number) => {
  // ...
});
```

而数组本身已经知道回调参数是什么类型时，再重复写一遍往往只是噪音。

Contextual Typing 让 TypeScript 能做到：

```text
类型安全
+
更少重复标注
```

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp032-contextual-typing/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：定义一个函数类型

在 `src/main.ts` 写：

```ts
type PriceFormatter = (price: number, currency: string) => string;
```

这就是后面箭头函数的上下文来源。

### 第 2 步：不给参数写类型

继续：

```ts
const formatPrice: PriceFormatter = (price, currency) => {
  return `${currency} ${price.toFixed(2)}`;
};
```

注意参数：

```ts
price
currency
```

都没有显式类型标注。

### 第 3 步：通过 Hover 观察参数类型

把鼠标放到 `price` 上，应看到数字类型信息。

放到 `currency` 上，应看到字符串类型信息。

这就是：

```text
左侧函数类型
      ↓
反向提供参数类型
```

### 第 4 步：临时制造一个错误方法调用

临时写：

```ts
price.toUpperCase();
```

应该报错，因为 `price` 是 `number`，并不是 `any`。

验证后删除。

### 第 5 步：创建接收回调的函数

加入：

```ts
function buildLabels(
  values: number[],
  formatter: (value: number, index: number) => string
): string[] {
  return values.map(formatter);
}
```

这里第二个参数定义了回调契约。

### 第 6 步：直接传入匿名回调

继续：

```ts
const labels = buildLabels([10, 20, 30], (value, index) => {
  return `${index}:${value.toFixed(1)}`;
});
```

`value`、`index` 都会从 `buildLabels()` 的参数位置获得类型。

### 第 7 步：验证返回值也受上下文检查

临时把：

```ts
return `${currency} ${price.toFixed(2)}`;
```

改成：

```ts
return price;
```

类型检查应该失败，因为 `PriceFormatter` 要求返回 `string`。

验证后恢复。

### 第 8 步：运行最终案例

加入：

```ts
console.log(formatPrice(499, 'CNY'));
console.log(labels.join(' | '));
```

预期：

```text
CNY 499.00
0:10.0 | 1:20.0 | 2:30.0
```

### 第 9 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：左侧 `PriceFormatter` 和 `buildLabels()` 的回调参数类型，为箭头函数参数提供上下文类型。
- **实验辅助代码**：Hover、错误方法调用和日志输出用于证明 Contextual Typing 已经工作。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp032-contextual-typing/tsconfig.json
npm run build -- ./02-basic-types-inference/kp032-contextual-typing/tsconfig.json
node ./02-basic-types-inference/kp032-contextual-typing/dist/main.js
```

预期：

```text
CNY 499.00
0:10.0 | 1:20.0 | 2:30.0
```

## 效果验证

你应该能够确认：

- `formatPrice` 的参数没有显式标注，却分别获得 `number` 和 `string` 类型。
- `price.toUpperCase()` 会报错，证明参数不是 `any`。
- `buildLabels()` 调用位置可以给匿名回调的 `value`、`index` 提供类型。
- 目标函数类型还会检查箭头函数返回值。
- 脱离上下文的未标注函数参数在严格模式下可能产生隐式 `any`。
- Contextual Typing 的核心方向是“上下文 → 表达式”。
