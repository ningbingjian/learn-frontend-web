# TS-KP031：函数返回值推断

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 TypeScript 可以根据函数体中的 `return` 表达式推断返回类型。
2. 知道“没有显式返回类型标注”不等于“函数没有返回类型”。
3. 能通过调用结果验证推断出的返回类型真实参与后续类型检查。
4. 理解没有返回业务值的函数通常会被推断为 `void`。
5. 区分函数参数类型和函数返回类型在普通函数声明中的推断方式。
6. 知道局部函数可以充分利用推断，而公共 API、复杂边界仍可能适合显式返回类型。

> **本节核心代码**：省略函数返回类型标注，让 TypeScript 根据 `return` 表达式推断 `number`、`string` 和 `void`。
>
> **实验辅助代码**：`typeof`、临时错误赋值和日志输出只用于观察推断结果。

## 理论讲解

### 1. 返回类型可以从 `return` 推出来

例如：

```ts
function add(a: number, b: number) {
  return a + b;
}
```

这里没有写：

```ts
function add(a: number, b: number): number
```

但 TypeScript 可以看到：

```text
a: number
b: number
   ↓
a + b
   ↓
number
```

于是函数返回类型会被推断为 `number`。

### 2. 推断出的返回类型会继续向外传播

例如：

```ts
const result = add(1, 2);
```

TypeScript 会知道 `result` 是数字相关类型，因此：

```ts
result.toFixed(2);
```

可以，而：

```ts
// result.toUpperCase();
```

会报错。

所以完整链路是：

```text
函数体 return
      ↓
推断函数返回类型
      ↓
调用表达式获得该类型
      ↓
调用结果继续参与检查
```

### 3. 字符串返回值同样可以推断

```ts
function buildLabel(name: string, price: number) {
  return `${name}: ¥${price.toFixed(2)}`;
}
```

模板字符串的结果是字符串，因此返回类型可以被推断为 `string`。

### 4. 没有业务返回值时通常推断为 `void`

例如：

```ts
function logOrder(id: number) {
  console.log(`order=${id}`);
}
```

没有返回业务值，TypeScript 通常会把返回类型推断为：

```ts
void
```

JavaScript 真正运行时，这种函数调用会得到 `undefined`。

`void` 与运行时 `undefined` 的区别已经在 TS-KP027 学过，本节只观察返回类型推断如何得到 `void`。

### 5. 参数通常不能靠普通函数体反推

下面这样写：

```ts
function add(a, b) {
  return a + b;
}
```

在严格模式下，`a` 和 `b` 没有足够上下文，通常会触发隐式 `any` 问题。

因此普通函数声明中常见模式是：

```ts
参数类型主动声明
返回类型可以推断
```

例如：

```ts
function calculateTotal(price: number, quantity: number) {
  return price * quantity;
}
```

下一节 Contextual Typing 会学习：函数表达式或回调位于明确上下文中时，参数类型也可能从上下文反向获得。

### 6. 为什么不总是手写返回类型

局部辅助函数：

```ts
function double(value: number) {
  return value * 2;
}
```

返回类型明显，推断可以减少重复信息。

但公共 API 或重要业务边界，有时主动写：

```ts
function loadConfig(): Config {
  // ...
}
```

也很有价值，因为它会让编译器反过来检查实现是否满足你声明的契约。

### 7. 显式返回类型可以成为实现约束

假设：

```ts
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
```

如果以后误改成：

```ts
return `¥${price * quantity}`;
```

函数自身就会直接报错。

如果完全依赖推断，函数返回类型会跟着实现变化，错误可能直到调用方才暴露。

因此工程选择可以是：

```text
局部实现 / 明显逻辑
      ↓
充分利用返回值推断

公共 API / 稳定契约
      ↓
考虑显式返回类型
```

### 8. 多个返回分支怎么办

如果函数有多个 `return` 分支，TypeScript 会综合这些返回表达式来推断结果。

更复杂的“多个候选类型如何组合”会继续在：

- TS-KP033 Best Common Type
- 后续 Union Types

中展开，本节先掌握最基础的单一返回类型推断。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp031-return-type-inference/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建数字返回函数

在 `src/main.ts` 写：

```ts
function calculateTotal(price: number, quantity: number) {
  return price * quantity;
}
```

注意：

```text
参数写了类型
返回值没写类型
```

### 第 2 步：调用函数

继续：

```ts
const total = calculateTotal(199.5, 2);
```

把鼠标放到 `total` 或 `calculateTotal` 上，可以观察 TypeScript 推断出的返回类型。

### 第 3 步：创建字符串返回函数

加入：

```ts
function buildLabel(name: string, price: number) {
  return `${name}: ¥${price.toFixed(2)}`;
}
```

这里返回类型同样不写，让 TypeScript 根据模板字符串推断。

继续：

```ts
const label = buildLabel('Keyboard', total);
```

### 第 4 步：创建没有业务返回值的函数

加入：

```ts
function logOrder(id: number) {
  console.log(`order=${id}`);
}
```

再写：

```ts
const logResult = logOrder(1001);
```

TypeScript 会把该函数的返回类型推断为 `void`。

### 第 5 步：输出结果

加入：

```ts
console.log(label);
console.log(typeof total);
console.log(typeof logResult);
```

最终输出：

```text
order=1001
Keyboard: ¥399.00
number
undefined
```

### 第 6 步：临时验证 `total` 的静态类型

临时加入：

```ts
const wrong: string = calculateTotal(199.5, 2);
```

类型检查应该失败，因为函数已经被推断为返回 `number`。

验证后删除这行。

### 第 7 步：临时验证字符串返回值

可以尝试：

```ts
const wrongPrice: number = buildLabel('Keyboard', 499);
```

同样应该失败。

这证明函数返回类型虽然没有写出来，却一直参与静态检查。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：三个省略返回类型的函数，分别被推断为 `number`、`string`、`void`。
- **实验辅助代码**：`typeof` 和临时错误赋值只用于证明推断结果。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp031-return-type-inference/tsconfig.json
npm run build -- ./02-basic-types-inference/kp031-return-type-inference/tsconfig.json
node ./02-basic-types-inference/kp031-return-type-inference/dist/main.js
```

预期：

```text
order=1001
Keyboard: ¥399.00
number
undefined
```

## 效果验证

你应该能够确认：

- `calculateTotal()` 没写 `: number` 仍然被推断为数字返回值。
- `buildLabel()` 的模板字符串让返回类型被推断为 `string`。
- `logOrder()` 没有业务返回值，因此推断为 `void`。
- 调用结果会继承函数推断出的返回类型。
- 普通函数参数与返回值的推断方式不同。
- 局部函数可以充分利用推断，公共 API 是否显式标注则应根据契约稳定性决定。
