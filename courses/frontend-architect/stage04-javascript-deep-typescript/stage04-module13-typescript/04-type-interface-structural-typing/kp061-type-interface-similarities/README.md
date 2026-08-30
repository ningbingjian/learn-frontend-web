# TS-KP061：`type` 与 `interface` 相同点

> [返回 Chapter 04](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 说明 `type` 与 `interface` 在对象结构建模上的大量重叠能力。
2. 使用两者描述必需属性、`readonly` 属性和普通对象形状。
3. 理解两者都可以作为变量、函数参数和返回值的类型。
4. 理解两者都参与 TypeScript 的结构化兼容检查。
5. 知道两者都会在编译时被擦除，不会生成运行时构造器。
6. 不再因为语法不同就误认为它们代表两套完全不同的类型系统。

> **本节核心代码**：用 `ProductAlias` 和 `ProductInterface` 描述相同对象结构并接受同一个真实对象。
>
> **实验辅助代码**：两个格式化函数和比较输出只用于证明两种声明都参与同一套结构检查。

## 理论讲解

### 1. 两者都可以给对象结构命名

使用 `type`：

```ts
type ProductAlias = {
  id: number;
  name: string;
};
```

使用 `interface`：

```ts
interface ProductInterface {
  id: number;
  name: string;
}
```

在这个简单对象场景里，两者表达的目标高度相似。

### 2. 都可以描述必需属性

无论使用哪一种：

```text
id: number
name: string
```

都代表调用方必须满足对应成员结构。

缺少成员或成员类型错误都会失败。

### 3. 都可以描述 readonly 属性

例如：

```ts
type A = {
  readonly id: number;
};

interface B {
  readonly id: number;
}
```

两种形式都能对属性重新赋值进行静态限制。

### 4. 都可以用于变量和函数参数

例如：

```ts
function useAlias(value: ProductAlias) {}
function useInterface(value: ProductInterface) {}
```

两者都只是正常的 TypeScript 类型。

### 5. 两者都遵守结构化兼容

假设已有对象：

```ts
const storedProduct = {
  id: 101,
  name: 'Keyboard',
  stock: 20
};
```

它既可以满足：

```ts
ProductAlias
```

也可以满足：

```ts
ProductInterface
```

因为两个目标都只要求：

```text
id
name
```

额外的 `stock` 不会让一个已经存在的对象失去结构兼容性。

### 6. 两者都不会生成运行时代码

下面类型声明：

```ts
type ProductAlias = {...}
interface ProductInterface {...}
```

编译成 JavaScript 时都会消失。

所以不能写：

```ts
new ProductInterface()
```

也不能依赖：

```ts
value instanceof ProductAlias
```

它们都不是运行时 constructor。

### 7. 两者都可以表达比简单属性更丰富的对象契约

到目前为止已经看到：

- interface 可描述属性、继承、调用签名、构造签名。
- type 可以给对象、Tuple、Union、函数等类型表达式命名。

本节只聚焦“共同部分”，差异留到下一节系统比较。

### 8. 不要把“都能写对象”误解成“永远完全等价”

虽然：

```ts
type User = { ... };
interface UserShape { ... }
```

经常能完成同一个目标，但两者仍有：

- 声明合并。
- 可命名类型表达式范围。
- 扩展语法。

等差异。

因此正确的学习顺序是：

```text
先理解共同能力
      ↓
再理解差异
      ↓
最后做工程选择
```

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp061-type-interface-similarities/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：用 type 声明产品结构

```ts
type ProductAlias = {
  readonly id: number;
  name: string;
};
```

### 第 2 步：用 interface 声明同样结构

```ts
interface ProductInterface {
  readonly id: number;
  name: string;
}
```

### 第 3 步：分别写两个函数

```ts
function formatAlias(product: ProductAlias): string {
  return `${product.id}:${product.name.toUpperCase()}`;
}

function formatInterface(product: ProductInterface): string {
  return `${product.id}:${product.name.toUpperCase()}`;
}
```

### 第 4 步：创建一个带额外属性的真实对象

```ts
const storedProduct = {
  id: 101,
  name: 'Keyboard',
  stock: 20
};
```

### 第 5 步：同时赋给两种类型

```ts
const asAlias: ProductAlias = storedProduct;
const asInterface: ProductInterface = storedProduct;
```

两行都应该通过。

### 第 6 步：分别运行

```ts
console.log(formatAlias(asAlias));
console.log(formatInterface(asInterface));
```

都输出：

```text
101:KEYBOARD
```

### 第 7 步：证明值仍然来自同一个 JavaScript 对象结构

```ts
console.log(
  asAlias.name === asInterface.name
);
```

输出：

```text
true
```

### 第 8 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：相同对象结构分别用 `type` 和 `interface` 表达。
- **实验辅助代码**：重复格式化和布尔比较只是用来证明两者共享同一套结构化类型检查。

## 运行案例

```bash
npm run check -- ./04-type-interface-structural-typing/kp061-type-interface-similarities/tsconfig.json
npm run build -- ./04-type-interface-structural-typing/kp061-type-interface-similarities/tsconfig.json
node ./04-type-interface-structural-typing/kp061-type-interface-similarities/dist/main.js
```

预期：

```text
101:KEYBOARD
101:KEYBOARD
true
```

## 效果验证

你应该能够确认：

- `type` 和 `interface` 都能命名普通对象形状。
- 两者都可以描述 `readonly` 等对象成员约束。
- 两者都可以参与变量、参数和返回值类型检查。
- 两者都遵循结构化兼容规则。
- 两者都会在 JavaScript 运行前被擦除。
- “有很多相同能力”不代表“二者完全没有差异”。
