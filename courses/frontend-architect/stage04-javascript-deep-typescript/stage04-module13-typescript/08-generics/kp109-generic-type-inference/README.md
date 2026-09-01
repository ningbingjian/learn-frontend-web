# TS-KP109：泛型类型推断

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解调用 Generic Function 时 TypeScript 如何推断 Type Argument。
2. 区分 Type Parameter 与 Type Argument。
3. 理解为什么很多泛型调用不需要手写 `<string>` / `<number>`。
4. 理解推断信息通常来自实参、上下文和泛型签名中的关系。
5. 知道推断不等于永远成功，复杂场景仍可能需要显式类型参数。
6. 建立“推断优先”的基础调用习惯。

> **本节核心代码**：`first<T>(items: readonly T[]): T | undefined` 与两次无显式 Type Argument 的调用。
>
> **实验辅助代码**：undefined guard 与日志用于安全观察推断后的 string / number 能力。

## 理论讲解

### 1. Type Parameter 和 Type Argument

定义：

```ts
function identity<T>(value: T): T
```

这里的 `T` 是：

```text
Type Parameter
```

调用：

```ts
identity<string>('hello')
```

这里的 `string` 是：

```text
Type Argument
```

可以类比：

```text
函数定义里的 parameter
函数调用里的 argument
```

只是这里发生在类型层。

### 2. Type Argument 可以显式传

```ts
identity<string>('hello')
```

这表示明确告诉 TypeScript：

```text
本次 T = string
```

### 3. 更多时候可以自动推断

```ts
identity('hello')
```

TypeScript 看到实参是 string，就可以推断：

```text
T = string
```

这称为：

```text
Type Argument Inference
```

### 4. 推断让 API 调用更自然

如果每次都要求：

```ts
first<string>(...)
first<number>(...)
```

泛型 API 会显得很啰嗦。

更理想的是：

```ts
first(['Keyboard', 'Mouse'])
first([499, 199])
```

TypeScript 自己根据数组元素推断 T。

### 5. 本节案例中的推断链

函数：

```ts
function first<T>(items: readonly T[]): T | undefined
```

调用：

```ts
first(['Keyboard', 'Mouse'])
```

推断：

```text
数组元素 → string
T        → string
返回值   → string | undefined
```

数字数组同理：

```text
数组元素 → number
T        → number
返回值   → number | undefined
```

### 6. 为什么返回值带 undefined

泛型不会掩盖真实运行时情况。

空数组：

```ts
first([])
```

确实可能没有第一个元素。

因此 API 应诚实返回：

```text
T | undefined
```

而不是为了方便调用强行断言存在。

### 7. 推断优先，但不是绝对规则

复杂泛型中，TypeScript 可能：

- 没有足够信息。
- 推断到过宽类型。
- 多个位置给出冲突候选。

此时显式 Type Argument 仍然有价值。

后续 TS-KP120 会专门讨论“推断优先还是显式参数优先”的设计问题。

## 动手编码：从 0 到 1

### 第 1 步：声明泛型 first

```ts
function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}
```

### 第 2 步：调用字符串数组

```ts
const firstName = first(['Keyboard', 'Mouse']);
```

没有写 `<string>`。

### 第 3 步：调用数字数组

```ts
const firstPrice = first([499, 199]);
```

没有写 `<number>`。

### 第 4 步：处理 undefined

```ts
if (firstName !== undefined) {
  console.log(firstName.toUpperCase());
}
```

这里 Narrowing 后就是 string。

数字同理：

```ts
if (firstPrice !== undefined) {
  console.log(firstPrice.toFixed(2));
}
```

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：从函数实参自动推断 `T`。

**实验辅助代码**：undefined checks 和日志用于安全观察推断结果。

## 运行案例

```bash
npm run check -- ./08-generics/kp109-generic-type-inference/tsconfig.json
npm run build -- ./08-generics/kp109-generic-type-inference/tsconfig.json
node ./08-generics/kp109-generic-type-inference/dist/main.js
```

预期：

```text
KEYBOARD
499.00
```

## 效果验证

1. Type Parameter 与 Type Argument 有什么区别？
2. 为什么调用 `first()` 时不需要显式写 `<string>`？
3. TypeScript 从哪里推断 T？
4. 为什么 first 返回 `T | undefined`？
5. 推断失败时可以怎么做？
6. 为什么好的泛型 API 通常希望调用方少写显式类型参数？
