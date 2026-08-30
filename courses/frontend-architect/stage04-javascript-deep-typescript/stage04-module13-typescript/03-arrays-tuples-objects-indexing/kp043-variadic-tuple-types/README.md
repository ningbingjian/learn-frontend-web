# TS-KP043：Variadic Tuple Types

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 Variadic Tuple Types 允许在 Tuple 类型中展开泛型 Tuple。
2. 使用 `[Head, ...Tail]` 在保留尾部结构的同时添加固定元素。
3. 使用 `[...Left, ...Right]` 表达两个 Tuple 的结构拼接。
4. 理解 Variadic Tuple 的价值是保留长度、顺序和每个位置类型，而不是退化成普通数组。
5. 区分普通 Rest Tuple 和 Variadic Tuple Types 的关注点。
6. 理解它为什么能减少为不同 Tuple 长度编写大量 overload 的需求。

> **本节核心代码**：泛型 `Tail extends unknown[]`、`[Head, ...Tail]` 和 `[...Left, ...Right]`。
>
> **实验辅助代码**：`prepend()`、`concat()` 与日志输出用于证明 Tuple 结构在泛型转换后仍然被保留。

## 理论讲解

### 1. 普通 Rest Tuple 已经能表达可变长度

上一节前面学过：

```ts
[string, ...number[]]
```

它表达的是：

```text
一个固定 string
+
任意数量 number
```

但这里的尾部元素类型已经写死为 `number[]`。

### 2. 如果尾部本身也是一个未知 Tuple 呢

假设我们想写一个通用函数：

```text
输入任意一组参数
在最前面加一个元素
并且保留原来每个位置的类型
```

如果只使用普通数组：

```ts
unknown[]
```

就会丢掉：

- 原始长度。
- 每个位置的类型。
- 顺序信息。

Variadic Tuple Types 就是为这类场景服务的。

### 3. Tuple spread 可以是泛型

可以写：

```ts
function prepend<Head, Tail extends unknown[]>(
  head: Head,
  ...tail: Tail
): [Head, ...Tail] {
  return [head, ...tail];
}
```

这里最关键的是：

```ts
[Head, ...Tail]
```

`Tail` 不是固定的 `string[]` 或 `number[]`，而是调用时推断出来的 Tuple/参数列表结构。

### 4. 调用时会保留每个位置类型

例如：

```ts
const order = prepend('order', 1001, true);
```

可以建立直觉：

```text
Head → string
Tail → [number, boolean]

结果
→ [string, number, boolean]
```

所以后续解构：

```ts
const [, orderId, paid] = order;
```

TypeScript 知道：

```text
orderId → number
paid    → boolean
```

### 5. 两个泛型 Tuple 也能拼接

例如：

```ts
function concat<
  Left extends unknown[],
  Right extends unknown[]
>(
  left: [...Left],
  right: [...Right]
): [...Left, ...Right] {
  return [...left, ...right];
}
```

返回类型：

```ts
[...Left, ...Right]
```

表达的是：

```text
保留 Left 的全部位置
再保留 Right 的全部位置
```

而不是简单变成：

```ts
unknown[]
```

### 6. Variadic Tuple 的核心是“传播结构”

普通 Rest Tuple：

```ts
[string, ...number[]]
```

关注：

```text
固定位置 + 同类可变尾部
```

Variadic Tuple：

```ts
[Head, ...Tail]
```

其中 `Tail` 是泛型 Tuple，关注：

```text
把未知但具体的 Tuple 结构继续传播下去
```

这是两者最重要的学习区别。

### 7. 为什么它能减少 overload

假设没有 Variadic Tuple Types，要给 `concat()` 精确保留不同长度：

```text
[] + []
[A] + []
[A, B] + []
[A] + [C]
[A, B] + [C]
...
```

很快会产生大量函数重载。

有 Variadic Tuple 后，可以把规律直接写进一个泛型签名：

```ts
[...Left, ...Right]
```

这是一种典型的“用类型结构表达规律”。

### 8. Variadic Tuple 常用于参数列表类型编程

它常出现在：

- 函数组合。
- `bind` / partial application 风格 API。
- 参数前置或后置。
- 中间件组合。
- 强类型事件和命令系统。

现阶段不需要立刻写复杂类型体操，先掌握“泛型 Tuple spread 会保留结构”。

### 9. 泛型约束为什么写 `extends unknown[]`

如果要使用：

```ts
...Tail
```

TypeScript 必须知道 `Tail` 是可展开的数组 / Tuple 类型。

因此写：

```ts
Tail extends unknown[]
```

先把 `Tail` 限定在数组样结构中。

泛型约束会在 Chapter 08 系统深入，本节只理解它为：

```text
允许任意元素结构
但必须是数组 / Tuple
```

### 10. 本节结束后 Tuple 基础链路完整

到这里已经依次掌握：

```text
固定 Tuple
↓
可选元素
↓
Rest 元素
↓
Named 元素
↓
Readonly Tuple
↓
Variadic Tuple Types
```

下一步可以正式进入对象结构建模。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp043-variadic-tuple-types/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建 `prepend()` 泛型函数

在 `src/main.ts` 写：

```ts
function prepend<Head, Tail extends unknown[]>(
  head: Head,
  ...tail: Tail
): [Head, ...Tail] {
  return [head, ...tail];
}
```

核心返回类型：

```ts
[Head, ...Tail]
```

### 第 2 步：传入不同位置类型

```ts
const order = prepend('order', 1001, true);
```

这里尾部不是统一数组元素类型，而是具体保留：

```text
number
boolean
```

两个位置。

### 第 3 步：解构并使用精确类型

```ts
const [, orderId, paid] = order;
```

然后：

```ts
orderId.toFixed(0);
paid ? 'paid' : 'unpaid';
```

都能直接通过检查。

### 第 4 步：创建通用 Tuple 拼接函数

继续写：

```ts
function concat<
  Left extends unknown[],
  Right extends unknown[]
>(
  left: [...Left],
  right: [...Right]
): [...Left, ...Right] {
  return [...left, ...right];
}
```

### 第 5 步：拼接两个具体 Tuple

```ts
const combined = concat(
  ['product', 499] as [string, number],
  [false] as [boolean]
);
```

结果结构是：

```text
[string, number, boolean]
```

而不是普通 `(string | number | boolean)[]`。

### 第 6 步：解构第二个结果

```ts
const [kind, price, featured] = combined;
```

TypeScript 分别知道三个变量类型。

### 第 7 步：输出结果

```ts
console.log(`${orderId.toFixed(0)}:${paid ? 'paid' : 'unpaid'}`);
console.log(`${kind}:${price.toFixed(2)}:${featured}`);
```

预期：

```text
1001:paid
product:499.00:false
```

### 第 8 步：临时验证结构没有退化

可以尝试：

```ts
// price.toUpperCase();
```

应该失败，因为拼接之后第 1 位仍然是 `number`。

也可以尝试：

```ts
// paid.toFixed(0);
```

同样失败，因为该位置仍然是 `boolean`。

### 第 9 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`Tail extends unknown[]`、`[Head, ...Tail]`、`[...Left, ...Right]`。
- **实验辅助代码**：两个泛型函数和日志输出用于证明结构被保留。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp043-variadic-tuple-types/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp043-variadic-tuple-types/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp043-variadic-tuple-types/dist/main.js
```

预期：

```text
1001:paid
product:499.00:false
```

## 效果验证

你应该能够确认：

- 泛型 Tuple spread 可以保留调用时的具体位置结构。
- `[Head, ...Tail]` 可以在未知 Tuple 前面添加元素，同时保留后续类型。
- `[...Left, ...Right]` 可以精确表达两个 Tuple 的拼接结果。
- 结果不会无条件退化成 `unknown[]` 或普通联合数组。
- Variadic Tuple Types 很适合参数列表和函数组合类 API。
- 到本节为止，Lesson 03.1 的数组与 Tuple 知识链路已经完整。
