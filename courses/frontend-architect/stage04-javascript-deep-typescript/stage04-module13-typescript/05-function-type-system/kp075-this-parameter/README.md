# TS-KP075：`this` 参数

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `this: Type` 显式描述函数体中的 `this` 类型。
2. 理解 TypeScript 的 `this` 参数是静态伪参数，不会成为 JavaScript 运行时实参。
3. 区分“给 `this` 声明类型”和“真正绑定 JavaScript `this`”。
4. 使用 `.call()` / `.bind()` 以符合类型的上下文调用函数。
5. 理解普通函数和箭头函数在 `this` 行为上的差异。
6. 知道箭头函数不能声明 TypeScript `this` 参数。
7. 理解 `this: void` 可以用于表达“不应该依赖调用上下文”的回调契约。

> **本节核心代码**：`function formatTotal(this: PricingContext, subtotal: number)`。
>
> **实验辅助代码**：`.call()`、`.bind()` 和日志输出用于显式展示运行时调用上下文。

## 理论讲解

### 1. JavaScript 的 `this` 类型很容易不明确

普通 JavaScript 函数中的 `this` 取决于调用方式。

例如：

```js
obj.method()
```

和：

```js
const method = obj.method;
method();
```

即使函数体相同，运行时 `this` 也可能完全不同。

TypeScript 需要一种方式告诉类型检查器：

> 这个函数期望 `this` 是什么结构？

### 2. TypeScript 使用“伪参数”语法描述 `this`

例如：

```ts
type PricingContext = {
  currency: string;
  discountRate: number;
};

function formatTotal(
  this: PricingContext,
  subtotal: number
): string {
  // ...
}
```

这里：

```ts
this: PricingContext
```

写在参数列表最前面，但它不是普通参数。

### 3. `this` 参数不会出现在运行时参数中

调用时不会写：

```ts
formatTotal(context, 1000);
```

因为 `context` 不是普通第一个实参。

正确的运行时上下文可以通过：

```ts
formatTotal.call(context, 1000);
```

或者：

```ts
const bound = formatTotal.bind(context);
bound(1000);
```

来提供。

编译成 JavaScript 后：

```ts
this: PricingContext
```

会被擦除。

### 4. 类型注解不会替你绑定 `this`

这是本节最重要的边界之一。

写：

```ts
function formatTotal(this: PricingContext, subtotal: number) {
}
```

只是告诉 TypeScript：

```text
函数体里 this 应满足 PricingContext
```

它不会改变 JavaScript 的调用规则。

真正的运行时 `this` 仍然由：

- 方法调用。
- `.call()`。
- `.apply()`。
- `.bind()`。
- 严格模式下的普通调用方式。

等机制决定。

### 5. 函数体里可以安全使用上下文字段

因为我们声明：

```ts
this: PricingContext
```

所以函数体可以直接：

```ts
this.currency
this.discountRate
```

并获得完整静态类型。

例如：

```ts
const total = subtotal * (1 - this.discountRate);
return `${this.currency} ${total.toFixed(2)}`;
```

### 6. `.call()` 会检查上下文类型

最终代码使用：

```ts
const context: PricingContext = {
  currency: 'CNY',
  discountRate: 0.1
};

formatTotal.call(context, 1000);
```

如果传入：

```ts
// formatTotal.call({ currency: 'CNY' }, 1000);
```

应该失败，因为缺少：

```text
discountRate
```

### 7. `.bind()` 可以提前固定 `this`

写：

```ts
const boundFormatter = formatTotal.bind(context);
```

以后：

```ts
boundFormatter(499)
```

不需要再提供 `this` 上下文。

运行时 `.bind()` 真正创建了一个绑定上下文的新函数。

这里要区分：

```text
this 参数
→ TypeScript 静态描述

bind()
→ JavaScript 运行时绑定
```

### 8. 箭头函数不能声明 `this` 参数

下面是不允许的：

```ts
// const formatter = (this: PricingContext, subtotal: number) => {
//   return subtotal;
// };
```

原因是 JavaScript 箭头函数没有自己的动态 `this`。

箭头函数会从外层词法环境捕获 `this`。

所以如果 API 需要调用方提供动态 `this`，通常应使用普通 `function`。

### 9. 函数类型里也可以声明 `this`

例如：

```ts
type Formatter = (
  this: PricingContext,
  subtotal: number
) => string;
```

这里的 `this` 同样是类型层能力。

它让库作者可以规定：

```text
这个回调需要什么调用上下文
```

### 10. `this: void` 的意义

某些回调 API 会承诺：

```text
调用回调时不会提供可依赖的 this
```

可以用：

```ts
(this: void, event: Event) => void
```

表达这种契约。

这能阻止需要特定 `this` 上下文的函数被错误传入。

本节先建立概念，不深入 DOM 事件案例。

### 11. `this` 参数不是 JavaScript 新语法

再次强调：

```text
this: PricingContext
```

只存在于 TypeScript 类型检查阶段。

运行时不会：

- 多出一个参数。
- 自动注入对象。
- 改写调用方式。
- 自动 bind。

如果调用方式本身错误，类型注解不会神奇地修复 JavaScript 行为。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp075-this-parameter/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：描述调用上下文

在 `src/main.ts` 中：

```ts
type PricingContext = {
  currency: string;
  discountRate: number;
};
```

### 第 2 步：给函数声明 `this` 参数

```ts
function formatTotal(
  this: PricingContext,
  subtotal: number
): string {
}
```

此时 TypeScript 已经知道函数体内 `this` 的结构。

### 第 3 步：读取 `this` 成员

```ts
const total = subtotal * (1 - this.discountRate);
```

因为 `discountRate` 是 `number`，可以直接参与计算。

### 第 4 步：返回格式化结果

```ts
return `${this.currency} ${total.toFixed(2)}`;
```

### 第 5 步：创建一个有效上下文

```ts
const context: PricingContext = {
  currency: 'CNY',
  discountRate: 0.1
};
```

### 第 6 步：使用 `.call()`

```ts
console.log(formatTotal.call(context, 1000));
```

预期：

```text
CNY 900.00
```

### 第 7 步：使用 `.bind()` 固定上下文

```ts
const boundFormatter = formatTotal.bind(context);
console.log(boundFormatter(499));
```

预期：

```text
CNY 449.10
```

### 第 8 步：临时测试错误上下文

可以尝试：

```ts
// formatTotal.call({ currency: 'CNY' }, 1000);
```

类型检查应该失败，因为没有 `discountRate`。

### 第 9 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`this: PricingContext`。
- **实验辅助代码**：`.call()` / `.bind()` / 日志输出。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp075-this-parameter/tsconfig.json
npm run build -- ./05-function-type-system/kp075-this-parameter/tsconfig.json
node ./05-function-type-system/kp075-this-parameter/dist/main.js
```

预期输出：

```text
CNY 900.00
CNY 449.10
```

## 效果验证

你应该能够确认：

- `this: Type` 可以显式描述普通函数中的 `this`。
- `this` 参数不会作为运行时参数存在。
- `this` 参数不会自动绑定 JavaScript `this`。
- `.call()` 和 `.bind()` 提供的是实际运行时调用机制。
- 箭头函数不能声明 `this` 参数，因为箭头函数使用词法 `this`。
