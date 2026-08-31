# TS-KP091：`instanceof` Narrowing

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 JavaScript `instanceof` 的运行时原型链检查。
2. 使用 `value instanceof Constructor` 对 class Union 进行收窄。
3. 理解 true 分支为什么获得更具体的实例类型。
4. 理解 remaining branch 如何排除已识别的 class 成员。
5. 区分 class 构造器值与 interface / type alias 的类型层声明。
6. 理解 `instanceof` 是 JavaScript 运行时机制，而不是 TypeScript 编译期专属语法。
7. 知道不能用 `instanceof SomeInterface` 检查一个只存在于类型层的接口。

> **本节核心代码**：`discount instanceof FixedDiscount` 对 `FixedDiscount | RateDiscount` 的 class Union 收窄。
>
> **实验辅助代码**：两个 class 实例和日志仅用于进入两个分支观察结果。

## 理论讲解

### 1. `instanceof` 首先是 JavaScript 运算符

JavaScript 可以写：

```js
value instanceof SomeClass
```

它大体是在检查：

```text
SomeClass.prototype
```

是否出现在：

```text
value 的 prototype chain
```

中。

所以 `instanceof` 的结果来自真实运行时对象关系。

### 2. TypeScript 会把这个结果当作 Type Guard

假设：

```ts
class FixedDiscount {
  constructor(public readonly amount: number) {}
}

class RateDiscount {
  constructor(public readonly rate: number) {}
}
```

并有：

```ts
type Discount = FixedDiscount | RateDiscount;
```

进入函数时：

```text
discount
→ FixedDiscount | RateDiscount
```

如果写：

```ts
if (discount instanceof FixedDiscount) {
```

true 分支中 TypeScript 就可以把它看成：

```text
FixedDiscount
```

因此可以安全读取：

```ts
discount.amount
```

### 3. remaining branch 会排除已经识别的成员

如果 Union 只有：

```text
FixedDiscount | RateDiscount
```

那么：

```ts
if (discount instanceof FixedDiscount) {
  // FixedDiscount
}

// remaining path: RateDiscount
```

所以剩余路径可以直接访问：

```ts
discount.rate
```

### 4. 为什么 interface 不能直接放在 `instanceof` 右侧

例如：

```ts
interface Product {
  id: number;
}
```

编译后：

```text
interface Product
```

不会产生 JavaScript 构造函数。

所以不能写：

```ts
// value instanceof Product
```

因为运行时根本不存在可以参与原型链检查的 `Product` 值。

这和 class 不同：

```ts
class ProductModel {}
```

编译后仍然有真实 JavaScript class / constructor value。

### 5. `instanceof` 检查的是运行时身份关系，不是纯结构

TypeScript 整体是结构化类型系统，但：

```ts
value instanceof FixedDiscount
```

判断依据不是：

```text
对象有没有 amount 属性
```

而是 JavaScript 的原型链关系。

如果只是一个普通对象：

```ts
const value = { amount: 50 };
```

即使结构看起来像：

```text
FixedDiscount
```

也不代表：

```js
value instanceof FixedDiscount
```

会是 true。

### 6. `instanceof` 与 `in` 的选择

如果对象 Union 来自 class 实例：

```text
FixedDiscount | RateDiscount
```

使用 `instanceof` 很自然。

如果是普通 JSON-like 对象：

```text
{ email: ... }
{ phone: ... }
```

通常：

```ts
'email' in value
```

或者稳定 discriminant 更合适。

不要为了使用 `instanceof`，把本来只是数据结构的对象强行改成 class。

### 7. `instanceof` 不会执行 TypeScript runtime validation

它只回答原型链问题。

不会自动：

- 检查所有字段类型。
- 验证 JSON schema。
- 转换外部对象成 class 实例。
- 补齐缺失字段。

从服务器反序列化出来的普通 JSON 对象也不会因为字段结构一样就自动成为 class instance。

### 8. 标准内建对象也可以使用 `instanceof`

例如：

```ts
function format(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value.toUpperCase();
}
```

这里 `Date` 是真实运行时构造器，所以可以参与 Narrowing。

### 9. 本节为什么使用两个自定义 class

这样可以同时看到：

```text
类型层：FixedDiscount | RateDiscount
运行时：两个不同 constructor / prototype chain
```

比只背 `Date | string` 更容易建立“instanceof 依赖运行时构造器”的完整直觉。

## 动手编码：从 0 到 1

### 第 1 步：创建 FixedDiscount

创建：

```text
kp091-instanceof-narrowing/src/main.ts
```

写：

```ts
class FixedDiscount {
  constructor(public readonly amount: number) {}
}
```

### 第 2 步：创建 RateDiscount

继续：

```ts
class RateDiscount {
  constructor(public readonly rate: number) {}
}
```

### 第 3 步：建立 class Union

写：

```ts
type Discount = FixedDiscount | RateDiscount;
```

### 第 4 步：使用 `instanceof` 检查 FixedDiscount

写：

```ts
function describeDiscount(discount: Discount): string {
  if (discount instanceof FixedDiscount) {
    return `money:${discount.amount.toFixed(2)}`;
  }

  return `percentage:${(discount.rate * 100).toFixed(0)}%`;
}
```

true 分支：

```text
FixedDiscount
```

remaining branch：

```text
RateDiscount
```

### 第 5 步：创建两个实例

加入：

```ts
console.log(describeDiscount(new FixedDiscount(50)));
console.log(describeDiscount(new RateDiscount(0.1)));
```

### 第 6 步：添加 tsconfig

创建：

```text
kp091-instanceof-narrowing/tsconfig.json
```

内容：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`discount instanceof FixedDiscount` 以及 class Union 的 true / remaining branch 收窄。

**实验辅助代码**：`FixedDiscount(50)`、`RateDiscount(0.1)` 两个测试实例。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp091-instanceof-narrowing/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp091-instanceof-narrowing/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp091-instanceof-narrowing/dist/main.js
```

预期：

```text
money:50.00
percentage:10%
```

## 效果验证

完成本节后，应该能回答：

1. JavaScript `instanceof` 主要检查什么？
2. 为什么 true 分支可以把 class Union 收窄成具体 class？
3. remaining branch 为什么可以排除已识别成员？
4. 为什么 interface 不能直接出现在 `instanceof` 右侧？
5. 一个结构像 class instance 的普通对象，为什么不一定通过 `instanceof`？
6. `instanceof` 和 `in` 分别适合什么场景？
7. 为什么 `instanceof` 不等于完整的运行时数据校验？
