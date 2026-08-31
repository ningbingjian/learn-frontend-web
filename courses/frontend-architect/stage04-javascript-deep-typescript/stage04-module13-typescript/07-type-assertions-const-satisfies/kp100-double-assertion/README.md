# TS-KP100：Double Assertion

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解为什么某些明显不相关的单次类型断言会被 TypeScript 拒绝。
2. 看懂 `value as unknown as TargetType` Double Assertion。
3. 理解中间经过 `unknown` 为什么可以绕过类型重叠限制。
4. 明确 Double Assertion 不会执行任何数据转换。
5. 通过真实运行结果观察“静态 number，运行时 string”的危险错位。
6. 知道哪些少数场景可能需要 Double Assertion，以及为什么日常业务代码应尽量避免。

> **本节核心代码**：`rawProductId as unknown as number`。
>
> **实验辅助代码**：`typeof` 和 `+ 1` 用于证明断言不会改变运行时值。

## 理论讲解

### 1. TypeScript 会阻止明显不合理的单次断言

例如：

```ts
const value = '101';
// const id = value as number;
```

`string` 和 `number` 没有足够重叠关系，编译器会提示：

```text
这种转换可能是错误
```

这是 TypeScript 在保护你。

### 2. 什么是 Double Assertion

可以写：

```ts
const id = value as unknown as number;
```

过程：

```text
string
  ↓ as unknown
unknown
  ↓ as number
number
```

### 3. 为什么 `unknown` 能当中间桥梁

`unknown` 是所有值都可以赋给的安全顶层类型之一。

同时，如果你明确做断言，也可以从 `unknown` 断言到更具体类型。

于是两个分别允许的步骤被串起来：

```text
Source → unknown → Target
```

### 4. Double Assertion 不是转换

本节最终案例故意：

```ts
const rawProductId = '101';
const assertedProductId = rawProductId as unknown as number;
```

静态上：

```text
assertedProductId: number
```

但运行时真实值仍是：

```text
'101'
```

因此：

```ts
console.log(typeof assertedProductId);
```

输出：

```text
string
```

继续：

```ts
console.log(assertedProductId + 1);
```

运行时结果：

```text
1011
```

而不是数学加法：

```text
102
```

### 5. 真正的数据转换应该显式做

如果业务目标是把字符串 ID 转成数字：

```ts
const productId = Number(rawProductId);
```

然后还应该考虑：

```ts
Number.isNaN(productId)
```

这才是 runtime conversion / validation。

### 6. 为什么更推荐 `unknown` 而不是 `any` 作为中间层

也可以看到：

```ts
value as any as Target
```

但 `any` 会关闭更多类型检查能力。

相比之下：

```ts
value as unknown as Target
```

更明确地表达：

```text
我正在越过类型系统边界
```

所以如果真的不得不 Double Assertion，一般优先 `unknown`。

### 7. 可能出现 Double Assertion 的少数场景

例如：

- 遗留 SDK 类型声明严重落后于真实运行时协议。
- 框架底层通过约定建立了类型系统无法证明的不变量。
- 迁移过程中临时跨越两个互不兼容的旧模型。
- 测试中构造极简替身对象。

这些场景都应该：

```text
范围小
有注释
有测试
最好集中封装
```

### 8. 日常业务代码里出现它意味着什么

看到：

```ts
as unknown as T
```

应该产生一个审查信号：

```text
为什么正常类型关系表达不了？
```

可能真正的问题是：

- 类型模型设计错了。
- 外部数据没有验证。
- API 返回类型不准确。
- 应该引入 Union。
- 应该增加 Type Guard。
- 应该做显式转换。

## 动手编码：从 0 到 1

### 第 1 步：创建字符串 ID

```ts
const rawProductId = '101';
```

### 第 2 步：理解直接断言被拒绝

尝试理解但不要保留在最终源码：

```ts
// const productId = rawProductId as number;
```

TypeScript 会认为这两个类型缺乏足够重叠。

### 第 3 步：增加 Double Assertion

```ts
const assertedProductId = rawProductId as unknown as number;
```

现在静态检查把它视为 `number`。

### 第 4 步：观察运行时真实类型

```ts
console.log(typeof assertedProductId);
```

预期：

```text
string
```

### 第 5 步：观察 `+ 1`

```ts
console.log(assertedProductId + 1);
```

预期：

```text
1011
```

这一步直接证明：

```text
Assertion ≠ Conversion
```

### 第 6 步：添加 tsconfig

使用模块统一 strict 配置。

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`as unknown as number` 以及它绕过单次断言重叠限制的机制。

**实验辅助代码**：`typeof` 和数学/字符串 `+` 运算只为了观察运行时并未改变。

## 运行案例

```bash
npm run check -- ./07-type-assertions-const-satisfies/kp100-double-assertion/tsconfig.json
npm run build -- ./07-type-assertions-const-satisfies/kp100-double-assertion/tsconfig.json
node ./07-type-assertions-const-satisfies/kp100-double-assertion/dist/main.js
```

预期：

```text
string
1011
```

## 效果验证

完成本节后，应该能回答：

1. 为什么 `'101' as number` 通常会被 TypeScript 拒绝？
2. `as unknown as number` 为什么能通过？
3. Double Assertion 会把字符串真的转换成 number 吗？
4. 为什么最终案例输出 `1011`？
5. 真正需要数字转换时应该使用什么？
6. 为什么 Double Assertion 应被视为逃生口？
7. Code Review 看到 `as unknown as T` 时应该追问哪些问题？
