# TS-KP108：Type Parameter

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 Type Parameter 是类型层占位符。
2. 理解 `<T>` 的声明位置与 `T` 在参数、返回值、对象结构中的使用位置。
3. 理解 Type Parameter 与普通函数参数的区别。
4. 理解 Type Parameter 的作用域。
5. 理解无约束 `T` 不能假设拥有任意成员。
6. 理解名称 `T` 只是惯例，也可以使用更有语义的名称。

> **本节核心代码**：`box<T>(value: T): { value: T }` 中同一个 `T` 贯穿输入与输出对象。
>
> **实验辅助代码**：读取 `id` 和 `name` 用于验证对象类型被完整保留。

## 理论讲解

### 1. Type Parameter 是什么

```ts
function box<T>(value: T) {
  // ...
}
```

`T` 不是一个 JavaScript 变量。

它代表：

> 本次调用中，由类型系统决定的某个类型。

### 2. 普通参数与类型参数是两套空间

```ts
function box<T>(value: T)
```

这里有：

```text
T      → 类型参数，存在于类型层
value  → 值参数，存在于运行时
```

编译成 JavaScript 后，`T` 被擦除，而 `value` 仍然存在。

### 3. Type Parameter 可以在签名中重复使用

```ts
function box<T>(value: T): { value: T }
```

同一个 `T` 出现在：

- 参数类型。
- 返回对象属性类型。

这就建立：

```text
输入是什么类型
返回对象里的 value 就是什么类型
```

### 4. Type Parameter 有作用域

`T` 在泛型声明覆盖的区域里可用。

离开函数类型声明后，不能凭空使用这个 `T`。

这和函数值参数具有局部作用域的直觉类似，但它发生在类型系统中。

### 5. 无约束 T 的能力非常有限

```ts
function inspect<T>(value: T) {
  // value.length // 不安全
}
```

为什么？

因为 `T` 可能是：

```text
number
boolean
object
string
...
```

除非后续给 T 添加 Constraint，否则函数体必须只使用所有可能 T 都安全的操作。

### 6. `T` 只是名字

下面也可以：

```ts
function box<Value>(value: Value): { value: Value }
```

复杂 API 中更有语义的名称通常更易读，例如：

```text
TItem
TResult
TKey
TValue
```

## 动手编码：从 0 到 1

### 第 1 步：声明 Type Parameter

```ts
function box<T>(value: T): { value: T } {
  return { value };
}
```

### 第 2 步：传入对象

```ts
const productBox = box({
  id: 101,
  name: 'Keyboard'
});
```

TypeScript 会让 T 对应这个对象结构。

### 第 3 步：观察返回对象

```ts
console.log(productBox.value.id);
console.log(productBox.value.name.toUpperCase());
```

如果 `T` 的关系被正确保存，这些成员都会保留。

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`<T>` 声明，以及参数和返回值中的同一个 `T`。

**实验辅助代码**：具体 product 对象和日志。

## 运行案例

```bash
npm run check -- ./08-generics/kp108-type-parameter/tsconfig.json
npm run build -- ./08-generics/kp108-type-parameter/tsconfig.json
node ./08-generics/kp108-type-parameter/dist/main.js
```

预期：

```text
101
KEYBOARD
```

## 效果验证

1. Type Parameter 和普通函数参数有什么区别？
2. 为什么 `T` 在运行时不存在？
3. 同一个 `T` 为什么要在签名多个位置重复出现？
4. 无约束 `T` 为什么不能直接访问 `.length`？
5. `T` 是否必须叫 T？
6. 什么时候更适合使用语义化 Type Parameter 名称？
