# TS-KP024：`any`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `any` 的核心作用是绕开 TypeScript 对某个值的进一步类型检查。
2. 观察 `any` 如何允许任意属性访问、函数调用和跨类型赋值。
3. 区分显式 `any` 与隐式 `any`。
4. 理解 `noImplicitAny` 为什么是重要的严格模式选项。
5. 知道 `any` 会削弱类型安全，并应尽量限制在很小的兼容边界内。
6. 为下一节 `unknown` 建立对比基础。

> **本节核心代码**：显式 `any`、`any` 参数、从 `any` 向具体类型赋值。
>
> **实验辅助代码**：`try/catch` 和 `typeof` 只用于把 `any` 带来的运行时风险直接展示出来。

## 理论讲解

### 1. `any` 相当于告诉 TypeScript“这里先别检查”

例如：

```ts
let value: any = 'hello';
```

一旦值是 `any`，TypeScript 会允许很多原本需要证明类型安全的操作：

```ts
value.foo.bar;
value();
value.trim();
value = 123;
```

这些操作是否真的安全，编译器不会继续替你保证。

所以不要把 `any` 理解为“万能类型”，更准确的直觉是：

> **`any` 会关闭这一段类型检查能力。**

### 2. `any` 可以跨越类型边界

下面代码可以通过类型检查：

```ts
const rawValue: any = { count: '3' };
const count: number = rawValue.count;
```

TypeScript 接受 `count: number`，但运行时真正拿到的仍可能是字符串 `'3'`。

这说明：

```text
any
  ↓
绕过静态证明
  ↓
一个不可靠值可以进入看似安全的业务类型
```

### 3. `any` 会传播

访问 `any` 的属性，结果通常继续是 `any`：

```ts
const user: any = getSomething();
const profile = user.profile;
const city = profile.address.city;
```

如果这条链路一直不重新建立可靠类型，类型检查能力会沿着数据流不断丢失。

因此工程里更重要的不是“绝对禁止 any”，而是：

> **把 `any` 隔离在尽可能小的边界，然后尽快恢复可靠类型。**

### 4. 显式 `any` 与隐式 `any`

显式 `any` 是你主动写出来：

```ts
function handle(value: any) {}
```

隐式 `any` 则是 TypeScript 无法推断类型时被迫退化。例如：

```ts
function handle(value) {}
```

如果没有足够上下文，参数可能隐式成为 `any`。

本课程共享配置开启 `strict: true`，其中包含 `noImplicitAny`，所以这类隐式 `any` 会被报告为错误。

### 5. `noImplicitAny` 不会禁止显式 `any`

这是一个重要区别：

```text
noImplicitAny
防止“无意中退化为 any”

显式 : any
仍然允许，因为这是开发者明确做出的选择
```

因此严格模式不是彻底移除 `any`，而是要求你对它的使用更有意识。

### 6. 什么情况下可能暂时使用 `any`

一些兼容场景可能短暂需要它，例如：

- 遗留 JavaScript 迁移。
- 第三方库类型声明缺失或错误。
- 极短生命周期的调试代码。
- 复杂边界暂时还没有完成类型建模。

但新代码面对“不可信外部数据”时，通常更值得优先考虑下一节的 `unknown`，因为 `unknown` 会要求使用者先证明类型再操作。

---

## 动手编码：从 0 到 1

### 第 0 步：创建文件结构

```text
kp024-any/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建一个接受 `any` 的函数

在 `src/main.ts` 写：

```ts
function unsafeNormalize(value: any): string {
  return value.trim().toUpperCase();
}
```

注意：TypeScript 没有要求我们先证明 `value` 真的是字符串，就允许调用 `trim()`。

### 第 2 步：先传入正确值

继续写：

```ts
console.log(unsafeNormalize(' typescript '));
```

运行时可以正常得到：

```text
TYPESCRIPT
```

### 第 3 步：传入错误类型，观察编译器仍然放行

继续写：

```ts
try {
  console.log(unsafeNormalize(42));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`runtime error: ${message}`);
}
```

关键点是：

```ts
unsafeNormalize(42)
```

**能够通过 TypeScript 类型检查。**

但 JavaScript 真正运行时，数字没有 `trim()`，于是产生 `TypeError`。

### 第 4 步：观察 `any` 穿透具体类型标注

继续写：

```ts
const rawValue: any = { count: '3' };
const count: number = rawValue.count;
```

表面上 `count` 被声明为 `number`，但因为数据来自 `any`，TypeScript 没有验证真实值。

加入：

```ts
console.log(`count runtime type=${typeof count}`);
```

运行时会得到：

```text
count runtime type=string
```

这就是 `any` 最危险的地方之一：**静态声明看起来很安全，真实值却可能完全不是那回事。**

### 第 5 步：临时观察隐式 `any`

临时增加：

```ts
function passthrough(value) {
  return value;
}
```

当前课程严格配置会因为参数 `value` 隐式成为 `any` 而报错。这正是 `noImplicitAny` 在工作。

观察后删除该函数，恢复最终源码。

### 第 6 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：显式 `any` 参数，以及 `any` 跨越具体类型边界的行为。
- **实验辅助代码**：错误调用、`try/catch`、`typeof` 用来证明“类型检查放行 ≠ 运行时安全”。

## 运行案例

```bash
npm run check -- ./02-basic-types-inference/kp024-any/tsconfig.json
npm run build -- ./02-basic-types-inference/kp024-any/tsconfig.json
node ./02-basic-types-inference/kp024-any/dist/main.js
```

预期：

```text
TYPESCRIPT
runtime error: value.trim is not a function
count runtime type=string
```

## 效果验证

你应该能够确认：

- 显式 `any` 会允许原本无法证明安全的操作。
- `unsafeNormalize(42)` 能通过类型检查，但运行时失败。
- 从 `any` 读取的字符串可以被直接赋给声明为 `number` 的变量。
- `noImplicitAny` 负责发现无意产生的隐式 `any`，但不会禁止显式 `any`。
- `any` 应被限制在小范围兼容边界，而不是作为日常业务代码的默认类型。
- 下一步应该学习 `unknown` 如何在保留“值未知”能力的同时继续要求类型证明。
