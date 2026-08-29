# TS-KP027：`void`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 说明 `void` 最常见的使用场景是函数返回类型。
2. 理解 `void` 表示调用方不应依赖一个可用返回值。
3. 区分 TypeScript 的 `void` 与运行时的 `undefined`。
4. 理解没有显式返回值的 JavaScript 函数运行时通常得到 `undefined`。
5. 区分 `void` 与 `never`。

> **本节核心代码**：函数返回类型 `: void`。
>
> **实验辅助代码**：保存函数调用结果并打印 `typeof`，只是为了观察 JavaScript 运行时行为。

## 理论讲解

### 1. `void` 最常见于函数返回类型

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

这里表达的是：

```text
这个函数主要做副作用
调用方不应该依赖一个业务返回值
```

### 2. `void` 不等于“函数不存在”

函数仍然会正常执行：

```ts
logMessage('hello');
```

只是它没有提供一个应该被业务代码继续使用的返回结果。

### 3. JavaScript 运行时会得到 `undefined`

JavaScript 函数如果正常结束但没有显式返回一个值，运行时调用结果通常是：

```text
undefined
```

但 TypeScript 文档明确区分：

```text
void !== undefined
```

`undefined` 是一个真实值和类型；`void` 更强调函数 API 的返回语义。

### 4. `void` 与 `never` 的区别

上一节的 `never`：

```ts
function fail(): never {
  throw new Error('boom');
}
```

不会正常结束。

本节的 `void`：

```ts
function log(): void {
  console.log('done');
}
```

会正常结束，只是没有可依赖的业务返回值。

### 5. 回调中的 `void` 还有特殊规则

TypeScript 的函数类型中，`void` 回调还有一些特殊兼容规则，例如某些返回值会被调用方忽略。

这属于函数类型系统内容，会在后续函数章节继续学习；本节先建立最基础的返回值直觉。

---

## 动手编码：从 0 到 1

### 第 0 步：创建一个只做日志的函数

创建 `src/main.ts`：

```ts
function logOrderCreated(orderId: number): void {
  console.log(`created order=${orderId}`);
}
```

函数的职责是记录日志，而不是计算并返回一个业务值。

### 第 1 步：正常调用函数

```ts
logOrderCreated(1001);
```

运行时应该输出：

```text
created order=1001
```

### 第 2 步：保存调用结果做实验

为了观察运行时行为，改成：

```ts
const result = logOrderCreated(1001);
```

在 TypeScript 语义中，`result` 对应函数的 `void` 返回。

### 第 3 步：打印真实运行时值

```ts
console.log(result);
console.log(typeof result);
```

预期：

```text
undefined
undefined
```

这是 JavaScript 没有显式返回值时的运行结果。

### 第 4 步：验证不能把它当业务返回值

临时加入：

```ts
const text: string = result;
```

类型检查应失败，因为 `void` 不能直接作为字符串结果使用。

验证后删除该行。

### 第 5 步：对比 `never`

思考两段函数：

```text
logOrderCreated()
能够正常执行到函数末尾
→ void

throw new Error(...)
永远不会正常执行到末尾
→ never
```

### 第 6 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`: void` 表达函数没有供调用方使用的业务返回值。
- **实验辅助代码**：`result`、`typeof result` 用于观察 JavaScript 最终得到 `undefined`。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp027-void/tsconfig.json
npm run build -- ./02-basic-types-inference/kp027-void/tsconfig.json
node ./02-basic-types-inference/kp027-void/dist/main.js
```

预期：

```text
created order=1001
undefined
undefined
```

## 效果验证

你应该能够确认：

- `void` 主要用于函数返回类型。
- `void` 函数仍然会正常执行。
- 没有显式返回值的 JavaScript 函数运行时通常返回 `undefined`。
- `void` 与 `undefined` 在 TypeScript 中不是完全相同的概念。
- `void` 与 `never` 的关键区别是函数能否正常结束。
