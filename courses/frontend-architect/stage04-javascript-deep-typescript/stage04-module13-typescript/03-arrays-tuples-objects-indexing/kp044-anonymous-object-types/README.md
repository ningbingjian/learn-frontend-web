# TS-KP044：匿名对象类型

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 直接使用 `{ property: Type }` 描述对象结构。
2. 理解对象类型约束的是属性名称和属性值类型，而不是某个具体 JavaScript 构造函数。
3. 在函数参数位置使用匿名对象类型建立清晰的输入边界。
4. 理解对象类型采用结构化兼容思路：只要实际值具备需要的结构，就可以参与赋值和传参。
5. 知道属性默认是必需的，缺少必需属性会产生静态错误。
6. 知道匿名对象类型适合局部、小型结构；重复或公共结构后续可以用 `type` / `interface` 提取。

> **本节核心代码**：函数参数中的 `{ id: number; name: string; price: number }`。
>
> **实验辅助代码**：字符串格式化和日志输出只用于证明属性类型真实参与检查。

## 理论讲解

### 1. TypeScript 可以直接写对象结构

例如：

```ts
function printUser(user: { id: number; name: string }): void {
  console.log(user.name);
}
```

这里没有先声明 `type User` 或 `interface User`。

类型直接写在参数位置：

```text
{
  id: number
  name: string
}
```

这就是匿名对象类型。

“匿名”不是说 JavaScript 对象没有名字，而是：

> 这段类型结构没有被单独命名为一个可复用的类型声明。

### 2. 对象类型描述的是结构

假设函数要求：

```ts
function formatProduct(
  product: {
    id: number;
    name: string;
    price: number;
  }
): string {
  // ...
}
```

那么传入值至少要满足：

```text
id    → number
name  → string
price → number
```

TypeScript 关心的是这些成员是否存在、类型是否兼容。

这延续了前面 TS-KP007 学过的结构化类型直觉。

### 3. 属性默认都是必需的

下面类型：

```ts
{
  id: number;
  name: string;
  price: number;
}
```

三个属性都必须存在。

所以：

```ts
formatProduct({
  id: 101,
  name: 'Keyboard',
  price: 499
});
```

可以。

但：

```ts
// formatProduct({
//   id: 101,
//   name: 'Keyboard'
// });
```

会失败，因为缺少 `price`。

下一节 TS-KP045 会学习如何用 `?` 表达可选属性。

### 4. 属性值类型同样会被检查

例如：

```ts
// formatProduct({
//   id: '101',
//   name: 'Keyboard',
//   price: 499
// });
```

会失败，因为：

```text
id 需要 number
实际却是 string
```

对象类型并不是只检查“有没有这个 key”，还检查对应 value。

### 5. 普通变量也可以满足匿名对象类型

本节最终代码先创建：

```ts
const product = {
  id: 101,
  name: 'Keyboard',
  price: 499
};
```

然后：

```ts
formatProduct(product);
```

能够通过。

原因是 TypeScript 会分析 `product` 的结构，并确认它具有函数需要的成员。

这体现了：

```text
值本身不需要声明“我是某个类的实例”
          ↓
只要结构满足要求
          ↓
就可以传入
```

### 6. 对象类型不会生成运行时代码

这段：

```ts
{ id: number; name: string; price: number }
```

只存在于 TypeScript 类型系统中。

编译成 JavaScript 后：

- `number` 消失。
- `string` 消失。
- 整段对象类型标注消失。
- 真正运行的仍然只是普通 JavaScript 对象。

所以对象类型不能替代运行时数据校验。

如果数据来自网络、JSON、用户输入，仍然要在运行时验证。

### 7. 匿名对象类型适合局部边界

如果结构只在一个很小的局部使用：

```ts
function move(point: { x: number; y: number }) {
  // ...
}
```

匿名对象类型很直观。

但如果同一个结构出现很多次：

```text
函数 A 要一遍
函数 B 要一遍
变量 C 又写一遍
```

就会产生重复。

后续 Chapter 04 会系统学习：

- `type`
- `interface`

把重复结构提取成有名字的类型。

### 8. 不要把匿名对象类型和 `{}` 混淆

前面 TS-KP029 学过：

```ts
{}
```

在 TypeScript 中不是“一个拥有零个属性的业务对象”。

而本节：

```ts
{
  id: number;
  name: string;
}
```

是真正描述具体成员结构的对象类型。

业务对象建模应该优先写清楚真实成员，而不是偷懒写 `{}`。

### 9. 额外属性检查后面单独学

如果直接传对象字面量：

```ts
formatProduct({
  id: 101,
  name: 'Keyboard',
  price: 499,
  category: 'Input'
});
```

你可能会遇到额外属性检查。

这是 TypeScript 对“新鲜对象字面量”的一组特殊检查规则。

本章后面的：

- TS-KP049 Excess Property Checking
- TS-KP050 对象字面量的新鲜度直觉

会专门拆解，本节先不提前混在一起。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp044-anonymous-object-types/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：写一个普通 JavaScript 风格对象

在 `src/main.ts`：

```ts
const product = {
  id: 101,
  name: 'Keyboard',
  price: 499
};
```

TypeScript 会根据初始化值推断三个属性的类型。

### 第 2 步：创建函数，并直接写对象类型

加入：

```ts
function formatProduct(
  product: {
    id: number;
    name: string;
    price: number;
  }
): string {
}
```

现在函数输入边界已经明确。

### 第 3 步：读取每个属性

实现函数：

```ts
return `${product.id}:${product.name.toUpperCase()}:¥${product.price.toFixed(2)}`;
```

这里能直接：

```ts
product.name.toUpperCase()
```

因为 `name` 已经被约束为 `string`。

同理：

```ts
product.price.toFixed(2)
```

因为 `price` 是 `number`。

### 第 4 步：调用函数

```ts
console.log(formatProduct(product));
```

预期：

```text
101:KEYBOARD:¥499.00
```

### 第 5 步：临时删除必需属性

临时尝试：

```ts
formatProduct({
  id: 102,
  name: 'Mouse'
});
```

类型检查应该失败，因为缺少：

```text
price
```

验证后删除。

### 第 6 步：临时写错属性类型

尝试：

```ts
formatProduct({
  id: '102',
  name: 'Mouse',
  price: 199
});
```

也应该失败。

这证明对象类型同时约束：

```text
属性名
+
属性值类型
```

### 第 7 步：观察最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：匿名对象参数类型。
- **实验辅助代码**：格式化字符串和 `console.log()`。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp044-anonymous-object-types/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp044-anonymous-object-types/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp044-anonymous-object-types/dist/main.js
```

预期：

```text
101:KEYBOARD:¥499.00
```

## 效果验证

你应该能够确认：

- `{ id: number; name: string }` 可以直接作为对象类型使用。
- 对象类型会同时检查必需属性和属性值类型。
- 一个普通对象变量只要结构满足要求，就可以传给函数。
- 匿名对象类型是静态结构，不会生成新的 JavaScript 对象类别。
- 局部小结构可以匿名书写，重复结构后续适合提取为 `type` / `interface`。
