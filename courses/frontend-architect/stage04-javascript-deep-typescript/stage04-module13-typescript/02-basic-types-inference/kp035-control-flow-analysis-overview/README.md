# TS-KP035：控制流类型分析概览

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解变量的声明类型与“当前程序位置上的收窄类型”可以不同。
2. 理解 TypeScript 会根据 `if`、`typeof`、`return`、赋值等控制流推导更具体的类型。
3. 能通过 `null` 判断和 `typeof` 判断观察类型收窄。
4. 理解提前 `return` 会影响后续代码能够到达时的类型集合。
5. 理解赋值也可能改变变量后续位置上的控制流类型。
6. 知道本节只是总览，系统的 narrowing 规则会在 Chapter 06 深入学习。

> **本节核心代码**：`normalize()` 与 `inspect()` 中的条件判断、提前返回和赋值，让 TypeScript 根据控制流不断缩小变量可能的类型。
>
> **实验辅助代码**：日志输出和临时错误调用用于观察分析结果。

## 理论讲解

### 1. 一个变量可以拥有多个“当前类型状态”

假设参数声明：

```ts
function format(value: string | number) {
  // ...
}
```

声明类型是：

```ts
string | number
```

但进入判断：

```ts
if (typeof value === 'string') {
  // 这里 value 是 string
}
```

在这个分支里，TypeScript 已经根据控制流排除了 `number`。

因此要区分：

```text
声明类型
string | number

当前程序位置上的收窄类型
string
```

### 2. TypeScript 不只是逐行看类型标注

它会分析程序可能怎么执行：

```text
if
else
return
throw
赋值
循环
分支汇合
```

这些都会影响“代码执行到这里时，变量还可能是什么”。

这种能力就是控制流类型分析的核心直觉。

### 3. `typeof` 是最直接的收窄方式之一

例如：

```ts
if (typeof input === 'number') {
  input.toFixed(1);
}
```

TypeScript 能把该分支中的 `input` 收窄成 `number`。

在另一个剩余分支中，如果其他可能性已经排除，类型也会继续缩小。

### 4. `null` 判断同样会改变后续类型

假设：

```ts
input: string | number | null
```

先写：

```ts
if (input === null) {
  return 'empty';
}
```

因为 `null` 分支已经提前返回，所以后续代码能够执行时：

```text
null
已经不可能存在
```

于是剩余类型变成：

```ts
string | number
```

### 5. 提前 `return` 会改变可达路径

看：

```ts
if (input === null) {
  return 'empty';
}

// 这里 input 不再可能是 null
```

TypeScript 会分析“控制流能否到达这里”。

这不是简单的语法匹配，而是可达性分析的一部分。

### 6. 赋值也会影响后续类型

假设：

```ts
function inspect(value: string | number) {
  if (typeof value === 'string') {
    value = value.length;
  }

  value.toFixed(1);
}
```

分两条路径观察：

```text
原来是 number
→ 不进入 if
→ 仍然是 number

原来是 string
→ 进入 if
→ value.length 是 number
→ 重新赋值后变成 number
```

所以到达 `toFixed()` 那一行时，两条路径都只剩：

```ts
number
```

这就是非常典型的控制流分析。

### 7. 分支汇合时会重新综合可能性

如果不同分支结束后变量仍然可能保留多种类型，TypeScript 会在汇合点重新计算当前可能性。

可以理解为：

```text
路径 A 类型
      ↘
       汇合点 → 当前可能类型集合
      ↗
路径 B 类型
```

这也是后续复杂 narrowing 的基础。

### 8. 控制流分析不是运行时校验器

TypeScript 可以根据你写的运行时检查推导静态类型：

```ts
if (typeof value === 'string') {
  // TypeScript 利用这个事实
}
```

但它不会替你自动检查外部输入。

例如：

```ts
const value = JSON.parse(text);
```

仍然需要你自己建立运行时边界检查。

KP004 与 KP025 已经分别学习过这个问题。

### 9. 本节为什么只是“概览”

后续 Chapter 06 会单独学习：

- `typeof` Narrowing
- Truthy / Falsy Narrowing
- Equality Narrowing
- `in` Operator Narrowing
- `instanceof` Narrowing
- 赋值导致的收窄
- Control Flow Analysis
- Type Predicate
- Assertion Functions
- `never` 穷尽检查

所以本节目标不是一次记住所有规则，而是先建立：

> TypeScript 会跟着程序控制流动态更新它对变量类型的认识。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp035-control-flow-analysis-overview/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：定义一个包含三种可能性的输入

在 `src/main.ts` 写：

```ts
type Input = string | number | null;
```

然后创建函数：

```ts
function normalize(input: Input): string {
  // 后续逐步完成
}
```

### 第 2 步：先处理 `null`

加入：

```ts
if (input === null) {
  return 'empty';
}
```

现在 `return` 后面的代码中，`input` 已经不再可能是 `null`。

### 第 3 步：处理数字

继续：

```ts
if (typeof input === 'number') {
  return `number:${input.toFixed(1)}`;
}
```

这里 `input` 已收窄为 `number`。

### 第 4 步：利用剩余类型

前面已经排除：

```text
null
number
```

所以函数最后可以直接写：

```ts
return `string:${input.trim().toUpperCase()}`;
```

这里 TypeScript 能知道剩余的 `input` 是 `string`。

### 第 5 步：调用三种输入

加入：

```ts
console.log(normalize(' keyboard '));
console.log(normalize(42));
console.log(normalize(null));
```

预期：

```text
string:KEYBOARD
number:42.0
empty
```

### 第 6 步：创建赋值影响控制流的案例

加入：

```ts
function inspect(value: string | number): string {
  if (typeof value === 'string') {
    value = value.length;
  }

  return `length-or-number:${value.toFixed(1)}`;
}
```

重点观察最后一行。

TypeScript 允许调用：

```ts
value.toFixed(1)
```

因为所有能够到达这里的路径都已经让 `value` 成为 `number`。

### 第 7 步：运行赋值案例

加入：

```ts
console.log(inspect('hello'));
console.log(inspect(7));
```

预期：

```text
length-or-number:5.0
length-or-number:7.0
```

### 第 8 步：临时删除 `null` 分支观察错误

临时删除：

```ts
if (input === null) {
  return 'empty';
}
```

此时后面的字符串分支无法安全假设 `input` 一定不是 `null`。

观察 TypeScript 如何重新报告潜在问题。

验证后恢复代码。

### 第 9 步：临时删除赋值观察类型变化

把：

```ts
value = value.length;
```

临时删除。

此时 if 结束后，`value` 仍可能是：

```ts
string | number
```

因此最后的：

```ts
value.toFixed(1)
```

会再次产生类型问题。

这一步非常直观地证明：赋值本身参与了控制流类型分析。

恢复最终源码。

### 第 10 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：条件判断、提前 `return`、`typeof` 和赋值共同改变当前程序位置上的类型。
- **实验辅助代码**：日志和临时删除代码用于观察控制流分析结果。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp035-control-flow-analysis-overview/tsconfig.json
npm run build -- ./02-basic-types-inference/kp035-control-flow-analysis-overview/tsconfig.json
node ./02-basic-types-inference/kp035-control-flow-analysis-overview/dist/main.js
```

预期：

```text
string:KEYBOARD
number:42.0
empty
length-or-number:5.0
length-or-number:7.0
```

## 效果验证

你应该能够确认：

- `input: string | number | null` 在不同代码位置可以被收窄成不同类型。
- `input === null` 配合提前 `return` 会让后续路径排除 `null`。
- `typeof input === 'number'` 分支中可以安全使用数字方法。
- 前面两种可能性被排除后，剩余分支可以被识别为 `string`。
- 对 `value` 的赋值会影响 if 结束后的控制流类型。
- 控制流分析是 TypeScript 静态分析能力，不等于自动运行时数据验证。
