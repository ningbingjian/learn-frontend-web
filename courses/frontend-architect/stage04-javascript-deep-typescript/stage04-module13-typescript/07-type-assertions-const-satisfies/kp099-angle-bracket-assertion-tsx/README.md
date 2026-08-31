# TS-KP099：尖括号断言及 TSX 限制

> [返回 Chapter 07](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 写出 `<Type>value` 尖括号类型断言。
2. 理解它与 `value as Type` 在普通 `.ts` 中的语义关系。
3. 理解为什么 `.tsx` 中不能使用尖括号断言语法。
4. 理解 JSX 语法歧义是限制来源，而不是类型能力差异。
5. 在现代 TypeScript 项目中知道为什么通常优先 `as` 语法。
6. 能区分 Type Assertion 与泛型尖括号语法。

> **本节核心代码**：`const product = <Product>rawValue`。
>
> **实验辅助代码**：日志与对象值用于独立运行；`.tsx` 报错实验只在文档中展示，不作为最终可运行源码的一部分。

## 理论讲解

### 1. TypeScript 有两种经典断言写法

第一种：

```ts
const product = rawValue as Product;
```

第二种：

```ts
const product = <Product>rawValue;
```

在普通 `.ts` 文件里，这两种写法表达相同类型断言意图。

### 2. 为什么现在更常见 `as`

现代前端项目大量使用：

```text
.tsx
React
JSX
```

而尖括号：

```tsx
<Product>rawValue
```

会与 JSX 元素语法发生歧义。

### 3. `.tsx` 会把 `<Product>` 当成 JSX 开始标签

在 `.tsx` 中写：

```tsx
const product = <Product>rawValue;
```

解析器可能理解为：

```text
开始了一个 <Product> JSX element
```

接下来却找不到对应闭合标签，于是得到类似：

```text
JSX element 'Product' has no corresponding closing tag
```

这不是 Product 类型本身有问题，而是语法层面已经先冲突了。

### 4. TSX 中应该使用 `as`

改成：

```tsx
const product = rawValue as Product;
```

就没有 JSX 语法歧义。

因此团队规范通常可以直接统一：

```text
Type Assertion → 优先使用 as
```

这样 `.ts` / `.tsx` 风格一致。

### 5. 尖括号断言不是泛型

下面是断言：

```ts
<Product>rawValue
```

下面则可能是泛型类型参数：

```ts
Array<Product>
```

或者：

```ts
identity<Product>(value)
```

它们都出现 `< >`，但语义完全不同。

### 6. 两种断言同样不会做运行时检查

不论：

```ts
rawValue as Product
```

还是：

```ts
<Product>rawValue
```

都会在编译过程中被擦除。

所以尖括号语法并不会比 `as` 更“强”。

### 7. 项目实践建议

建议：

```text
新代码统一 as
```

原因不是尖括号断言已失效，而是：

- 与 TSX 兼容。
- 跨 `.ts` / `.tsx` 更一致。
- 阅读时不容易和 JSX / 泛型混淆。
- 自动格式化工具处理更统一。

## 动手编码：从 0 到 1

### 第 1 步：定义 Product

创建：

```text
kp099-angle-bracket-assertion-tsx/src/main.ts
```

写：

```ts
type Product = {
  id: number;
  name: string;
};
```

### 第 2 步：准备 unknown 值

```ts
const rawValue: unknown = {
  id: 101,
  name: 'Keyboard'
};
```

### 第 3 步：使用尖括号断言

```ts
const product = <Product>rawValue;
```

本节文件是 `.ts`，所以语法合法。

### 第 4 步：验证断言后的能力

```ts
console.log(`${product.id}:${product.name.toUpperCase()}`);
console.log('angle-bracket assertion works in .ts');
```

预期：

```text
101:KEYBOARD
angle-bracket assertion works in .ts
```

### 第 5 步：理解 TSX 失败实验

如果把等价代码放进：

```text
main.tsx
```

并写：

```tsx
const product = <Product>rawValue;
```

TypeScript/JSX 解析器会把它优先按 JSX 解析，产生语法错误。

正确做法：

```tsx
const product = rawValue as Product;
```

### 第 6 步：添加 tsconfig

本节保持 `.ts` 最终源码，因此继续使用标准 strict 配置。

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`<Product>rawValue` 以及它只适用于没有 TSX 语法冲突的环境这一事实。

**实验辅助代码**：日志用于确认 `.ts` 运行结果；TSX 错误片段只用于教学验证。

## 运行案例

```bash
npm run check -- ./07-type-assertions-const-satisfies/kp099-angle-bracket-assertion-tsx/tsconfig.json
npm run build -- ./07-type-assertions-const-satisfies/kp099-angle-bracket-assertion-tsx/tsconfig.json
node ./07-type-assertions-const-satisfies/kp099-angle-bracket-assertion-tsx/dist/main.js
```

预期：

```text
101:KEYBOARD
angle-bracket assertion works in .ts
```

## 效果验证

完成本节后，应该能回答：

1. `<T>value` 和 `value as T` 在 `.ts` 中有什么关系？
2. 为什么尖括号断言在 `.tsx` 中不能使用？
3. 这个限制来自类型系统还是 JSX 语法解析？
4. 为什么现代项目通常统一使用 `as`？
5. `<Product>value` 与 `Array<Product>` 中的尖括号分别表达什么？
6. 两种断言哪一种会提供 runtime validation？
