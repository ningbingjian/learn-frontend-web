# TS-KP098：`as` 类型断言

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `value as Type` 的基本语法与含义。
2. 区分 Type Assertion 与运行时类型转换。
3. 理解断言为什么不会生成 runtime check。
4. 理解 TypeScript 为什么只允许“更具体或更宽泛、具有足够重叠”的常规断言。
5. 理解什么时候断言是合理的，什么时候应该使用 Narrowing 或 runtime validation。
6. 能从 `unknown` 出发演示一次断言，并明确其风险。

> **本节核心代码**：`const product = rawValue as Product`。
>
> **实验辅助代码**：对象字面量和 `console.log()` 只用于观察断言后的静态能力与运行结果。

## 理论讲解

### 1. 什么是 Type Assertion

TypeScript 有时无法知道你在业务上下文中已经知道的信息。

语法：

```ts
value as TargetType
```

它表达的是：

```text
“编译器，我知道这里的值应该按 TargetType 看待。”
```

关键是“按某个类型看待”，不是：

```text
把值转换成 TargetType
```

### 2. 类型断言不是运行时强转

假设：

```ts
const value = rawValue as Product;
```

编译后的 JavaScript 不会保留：

```text
as Product
```

所以它不会自动执行：

- `instanceof Product`
- 字段存在性检查
- `Number(...)`
- JSON Schema 校验
- 默认值填充
- 数据修复

Type Assertion 本质是编译期信息。

### 3. 为什么本节从 `unknown` 开始

定义：

```ts
const rawValue: unknown = {
  id: 101,
  name: 'Keyboard',
  price: 499
};
```

此时不能直接：

```ts
// rawValue.name
```

因为 `unknown` 要求先提供证据。

本节为了演示断言，可以写：

```ts
const product = rawValue as Product;
```

之后静态类型变成：

```text
Product
```

于是可以使用：

```ts
product.name.toUpperCase();
product.price.toFixed(2);
```

### 4. 断言不会证明数据真的满足 Product

如果真实值是：

```ts
const rawValue: unknown = {
  id: 'wrong',
  name: null
};
```

然后仍然写：

```ts
const product = rawValue as Product;
```

TypeScript 会基于你的承诺继续检查后续代码。

但运行时：

```ts
product.name.toUpperCase()
```

仍可能直接抛异常。

因此：

```text
as Product
不是验证
```

### 5. TypeScript 并不会允许所有单次断言

例如从：

```text
string
```

直接断言到：

```text
number
```

这两者缺乏足够重叠，TypeScript 通常会提示这种转换可能是错误。

这是一层保护机制。

后面的 TS-KP100 会专门学习如何通过 Double Assertion 绕过这层保护，以及为什么这件事风险很高。

### 6. 什么时候可以合理使用 `as`

常见场景：

- DOM API 返回宽泛类型，但你确实掌握页面结构约束。
- 第三方库类型声明无法表达某个真实、稳定的运行时事实。
- 从已经完成 runtime validation 的边界，把结果交给内部强类型模型。
- 渐进式迁移遗留代码。
- 底层框架封装中，类型系统表达能力暂时不足。

### 7. 什么时候不应该优先使用 `as`

如果问题本质是：

```text
值到底是不是这个类型？
```

那么通常应该考虑：

```text
typeof / in / instanceof
Type Predicate
Assertion Function
schema validator
显式数据转换
```

而不是直接：

```ts
value as T
```

### 8. Annotation 与 Assertion 不是一回事

类型注解：

```ts
const product: Product = value;
```

会要求右侧本身可以赋给 `Product`。

类型断言：

```ts
const product = value as Product;
```

是在允许范围内主动改变编译器对这个表达式的类型视图。

所以 Assertion 的责任更多落在开发者身上。

## 动手编码：从 0 到 1

### 第 1 步：定义目标类型

创建：

```text
kp098-as-type-assertion/src/main.ts
```

写入：

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};
```

### 第 2 步：准备一个 unknown 值

继续：

```ts
const rawValue: unknown = {
  id: 101,
  name: 'Keyboard',
  price: 499
};
```

此时 `rawValue` 不能直接访问 Product 成员。

### 第 3 步：使用 `as Product`

加入：

```ts
const product = rawValue as Product;
```

本步只改变静态类型视图。

### 第 4 步：使用 Product 能力

加入：

```ts
console.log(`${product.id}:${product.name.toUpperCase()}`);
console.log(product.price.toFixed(2));
```

预期：

```text
101:KEYBOARD
499.00
```

### 第 5 步：添加 tsconfig

创建：

```text
kp098-as-type-assertion/tsconfig.json
```

配置继承模块的 strict 基础配置，并只包含本节 `src/**/*.ts`。

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`rawValue as Product` 以及断言后的静态成员访问。

**实验辅助代码**：`rawValue` 的对象内容和日志用于让案例可以独立运行；它们不是类型断言机制本身。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./07-type-assertions-const-satisfies/kp098-as-type-assertion/tsconfig.json
npm run build -- ./07-type-assertions-const-satisfies/kp098-as-type-assertion/tsconfig.json
node ./07-type-assertions-const-satisfies/kp098-as-type-assertion/dist/main.js
```

预期：

```text
101:KEYBOARD
499.00
```

## 效果验证

完成本节后，应该能回答：

1. `value as T` 在 TypeScript 中表达什么？
2. 为什么它不等于 Java / C# 的运行时类型转换？
3. `as Product` 编译后还会存在吗？
4. 为什么断言错误时运行时仍然可能崩溃？
5. `unknown` 为什么不能直接访问成员？
6. 类型注解和类型断言的责任边界有什么不同？
7. 外部数据为什么不应该只靠 `as T` 当作校验？
