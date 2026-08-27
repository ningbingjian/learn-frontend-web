# TS-KP022：`null`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `null` 在 JavaScript 中代表一个明确存在的空值。
2. 理解 `strictNullChecks` 开启后，`null` 不会自动属于 `string`、`number` 等类型。
3. 使用 `T | null` 明确表达“有值或显式为空”。
4. 在使用值之前先判断 `null`，让 TypeScript 完成类型收窄。
5. 知道 `typeof null === 'object'` 是 JavaScript 历史行为，不代表 TypeScript 把它当普通对象类型。

> **本节核心代码**：`null`、`string | null`、`value === null`。
>
> **实验辅助代码**：`typeof` 输出用于观察 JavaScript 的历史运行时行为。

## 理论讲解

### 1. `null` 是一个真实运行时值

JavaScript 中可以直接写：

```ts
const emptyValue = null;
```

它通常用于表达“这里明确没有值”。具体业务是否选择 `null`，由 API 和数据模型约定决定。

### 2. `strictNullChecks` 改变了类型安全边界

本课程共享配置开启 `strict: true`，因此也开启了 `strictNullChecks`。

这意味着下面代码不能通过：

```ts
let title: string = 'TypeScript';
title = null;
```

因为：

```text
string
不自动包含 null
```

如果业务确实允许为空，要明确写出来：

```ts
let title: string | null = 'TypeScript';
```

这里的 `|` 是联合类型语法。本章先用它表达 nullable 值，联合类型本身会在后续章节系统学习。

### 3. 使用 nullable 值前要先处理空值

例如：

```ts
function resolveCoupon(code: string): string | null {
  return code === 'VIP' ? '20% OFF' : null;
}
```

调用方不能直接假设结果一定是字符串：

```ts
const coupon = resolveCoupon('GUEST');
```

需要先判断：

```ts
if (coupon === null) {
  // 空值分支
} else {
  coupon.toUpperCase();
}
```

判断以后 TypeScript 能在 `else` 分支中把 `coupon` 收窄为 `string`。

### 4. `typeof null` 是 JavaScript 的历史特殊行为

运行：

```ts
typeof null
```

得到：

```text
object
```

这是 JavaScript 长期保留的历史行为。不要因此把 `null` 理解成普通对象实例。

在 TypeScript 严格空值检查下，`null` 仍有自己独立的类型语义。

### 5. `null` 与 `undefined` 不要混为一谈

两者都是“没有正常业务值”时常见的表示方式，但不是同一个值、也不是同一个类型。

常见约定是：

```text
null
业务明确表达“空”

undefined
值尚未提供、缺失或未定义
```

这只是常见建模约定，不是 JavaScript 强制规定。下一节会专门学习 `undefined`。

---

## 动手编码：从 0 到 1

### 第 0 步：创建文件结构

```text
kp022-null/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建一个可能返回空值的函数

在 `src/main.ts` 写：

```ts
function resolveCoupon(code: string): string | null {
  if (code === 'VIP') {
    return '20% OFF';
  }

  return null;
}
```

函数签名直接告诉调用者：结果可能是字符串，也可能是 `null`。

### 第 2 步：取得一个真实的 `null`

继续写：

```ts
const coupon = resolveCoupon('GUEST');
```

当前调用会返回 `null`。

### 第 3 步：先判断再使用

加入：

```ts
if (coupon === null) {
  console.log('coupon=none');
} else {
  console.log(coupon.toUpperCase());
}
```

在 `else` 中 TypeScript 已经知道 `coupon` 不再是 `null`。

### 第 4 步：观察 JavaScript 运行时行为

加入：

```ts
console.log(typeof coupon);
```

因为本次真实值是 `null`，运行结果会是：

```text
object
```

这正好帮助我们区分“TypeScript 静态类型”与“JavaScript 历史运行时行为”。

### 第 5 步：临时制造类型错误

临时写：

```ts
const requiredText: string = null;
```

在当前严格配置下应直接报错。验证后删除。

### 第 6 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`string | null` 和显式 `null` 判断。
- **实验辅助代码**：`typeof coupon` 只用于观察 JavaScript 的历史行为。

## 运行案例

```bash
npm run check -- ./02-basic-types-inference/kp022-null/tsconfig.json
npm run build -- ./02-basic-types-inference/kp022-null/tsconfig.json
node ./02-basic-types-inference/kp022-null/dist/main.js
```

预期：

```text
coupon=none
object
```

## 效果验证

你应该能够确认：

- `null` 是真实 JavaScript 值。
- `strictNullChecks` 开启后，普通 `string` 不自动接受 `null`。
- `string | null` 明确表达 nullable 值。
- 判断 `coupon === null` 后，非空分支可以安全使用字符串方法。
- `typeof null === 'object'` 只是 JavaScript 历史行为。
