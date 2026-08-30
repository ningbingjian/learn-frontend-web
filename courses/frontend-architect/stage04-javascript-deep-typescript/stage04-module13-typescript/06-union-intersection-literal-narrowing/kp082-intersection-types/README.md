# TS-KP082：Intersection Types

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `A & B` 声明 Intersection Type。
2. 理解 Intersection 表示一个值必须同时满足多个类型。
3. 使用 Intersection 组合多个小型对象能力。
4. 区分 Intersection 与 Union 的语义方向。
5. 理解交叉后的对象需要包含所有参与类型要求的成员。
6. 知道冲突成员可能产生不可满足或非常窄的交叉结果。
7. 理解 `&` 是静态类型组合，不会在运行时自动合并对象。

> **本节核心代码**：`Identifiable & Named & Priced` 组合出的 `ProductSummary`。
>
> **实验辅助代码**：`formatProduct()` 和日志用于观察组合后的成员可直接使用。

## 理论讲解

### 1. Union 和 Intersection 的方向完全不同

上一节：

```ts
A | B
```

表示：

```text
A 或 B
```

Intersection：

```ts
A & B
```

表示：

```text
同时满足 A 和 B
```

可以先记：

```text
Union        扩大“可能是哪一种”
Intersection 叠加“必须具备什么”
```

### 2. 用小型能力组合大型对象

例如：

```ts
type Identifiable = {
  id: number;
};

type Named = {
  name: string;
};
```

组合：

```ts
type Entity = Identifiable & Named;
```

那么 `Entity` 必须同时拥有：

```text
id
name
```

### 3. 最终案例组合三个类型

```ts
type ProductSummary = Identifiable & Named & Priced;
```

因此合法值需要：

```text
id: number
name: string
price: number
```

缺少任意一个都不满足 `ProductSummary`。

### 4. Intersection 不是运行时对象合并

类型层：

```ts
type Combined = A & B;
```

不会自动执行 JavaScript：

```ts
Object.assign(a, b)
```

`&` 只描述“最终值应该同时满足什么结构”。

真正的数据从哪里来，仍然由你的运行时代码决定。

### 5. 为什么对象类型最适合建立 Intersection 直觉

对对象：

```ts
{ id: number } & { name: string }
```

非常直观地得到：

```text
同时具有 id 和 name 的对象
```

因此本节先用对象能力组合建立基本直觉。

更复杂的 primitive intersection 可能很快变成无法构造的类型，例如：

```ts
string & number
```

不要把 `&` 机械理解成“值可以同时是任意两个 primitive”。

### 6. 冲突属性要谨慎

假设：

```ts
type A = { id: number };
type B = { id: string };
```

那么：

```ts
type C = A & B;
```

`id` 必须同时满足：

```text
number
和 string
```

这通常意味着无法得到普通可用值。

所以 Intersection 更适合组合彼此兼容的能力，而不是强行拼接冲突模型。

### 7. Intersection 和 interface extends 的关系

Chapter 04 学过：

```ts
interface Product extends Identifiable, Named {
  // ...
}
```

Intersection 提供另一种类型组合手段：

```ts
type Product = Identifiable & Named;
```

两者有重叠能力，但语法、开放性和适用场景不同。

本节只掌握 `&` 自身，不重新展开 `type` vs `interface` 选型。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp082-intersection-types/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：定义 ID 能力

```ts
type Identifiable = {
  id: number;
};
```

### 第 2 步：定义名称能力

```ts
type Named = {
  name: string;
};
```

### 第 3 步：定义价格能力

```ts
type Priced = {
  price: number;
};
```

三个类型分别保持单一语义。

### 第 4 步：使用 `&` 组合

```ts
type ProductSummary = Identifiable & Named & Priced;
```

现在一个 `ProductSummary` 必须满足全部成员。

### 第 5 步：创建格式化函数

```ts
function formatProduct(product: ProductSummary): string {
  return `${product.id}:${product.name}:${product.price.toFixed(2)}`;
}
```

三个来源类型的成员都可以直接使用。

### 第 6 步：创建完整值

```ts
const product: ProductSummary = {
  id: 101,
  name: 'Keyboard',
  price: 499
};
```

### 第 7 步：输出

```ts
console.log(formatProduct(product));
```

预期：

```text
101:Keyboard:499.00
```

### 第 8 步：临时观察缺字段错误

尝试：

```ts
// const wrong: ProductSummary = {
//   id: 101,
//   name: 'Keyboard'
// };
```

因为缺少 `price`，类型检查应该失败。

### 第 9 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：三个小类型与 `ProductSummary` Intersection。
- **实验辅助代码**：格式化函数与日志。

## 运行案例

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp082-intersection-types/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp082-intersection-types/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp082-intersection-types/dist/main.js
```

预期：

```text
101:Keyboard:499.00
```

## 效果验证

你应该能解释：

1. `A | B` 和 `A & B` 为什么不是同一个方向。
2. 为什么 Intersection 对象需要同时满足所有成员。
3. 为什么 `&` 不等于运行时 `Object.assign()`。
4. 为什么冲突属性可能让 Intersection 变得不可用。
5. 什么时候可以用“小能力 + Intersection”组织类型模型。
