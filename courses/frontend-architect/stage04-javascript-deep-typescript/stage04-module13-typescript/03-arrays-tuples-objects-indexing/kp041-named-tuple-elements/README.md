# TS-KP041：Named Tuple Elements

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `[name: Type]` 为 Tuple 位置添加可读标签。
2. 理解 Named Tuple Element 的标签服务于文档、提示和可读性，不改变结构兼容规则。
3. 知道 Tuple 标签不会在 JavaScript 运行时变成对象属性。
4. 理解解构变量名称不需要和 Tuple 标签相同。
5. 能给可选元素、Rest 元素使用与参数列表相似的标签语法。
6. 知道现代 TypeScript 已允许带标签和不带标签的 Tuple 元素混用，但业务代码仍应优先保持一致可读性。

> **本节核心代码**：`type ProductRow = [id: number, name: string, price: number]`。
>
> **实验辅助代码**：解构、格式化和日志输出用于证明标签不会变成运行时字段。

## 理论讲解

### 1. 普通 Tuple 的位置含义可能不直观

例如：

```ts
type ProductRow = [number, string, number];
```

虽然类型是精确的，但看到它时仍然要猜：

```text
第一个 number 是什么？
string 是什么？
最后一个 number 又是什么？
```

Named Tuple Elements 就是为了解决这种可读性问题。

### 2. 给每个位置加标签

可以写：

```ts
type ProductRow = [
  id: number,
  name: string,
  price: number
];
```

现在编辑器和读代码的人都更容易理解：

```text
第 0 位 → id
第 1 位 → name
第 2 位 → price
```

### 3. 标签不是对象属性

这一点非常重要。

Named Tuple 仍然是 Tuple，不是：

```ts
{
  id: number;
  name: string;
  price: number;
}
```

所以值仍然写成：

```ts
const row: ProductRow = [101, 'Keyboard', 499];
```

而不是：

```ts
// row.id
```

Tuple 读取仍然依赖索引或解构。

### 4. 标签不影响解构变量名称

例如类型标签叫：

```text
id
name
price
```

你仍然可以：

```ts
const [productId, productName, productPrice] = row;
```

TypeScript 依然能推断：

```text
productId    → number
productName  → string
productPrice → number
```

所以标签不是变量名绑定规则。

### 5. 标签主要改善可读性和工具体验

它们不会改变 Tuple 的核心类型兼容逻辑。

下面两个结构在位置类型上表达的是同一类信息：

```ts
[number, string]
[start: number, label: string]
```

差异主要在：

```text
第二种更容易阅读
编辑器提示更有语义
API 签名更接近参数列表
```

### 6. 可选元素和 Rest 元素也可以加标签

可选元素：

```ts
type Result = [
  code: number,
  message?: string
];
```

Rest 元素：

```ts
type Command = [
  name: string,
  ...args: string[]
];
```

它们的写法故意和函数参数语法比较接近。

### 7. 现代 TypeScript 可以混合有标签和无标签元素

早期 Named Tuple Elements 有“要么全部有标签，要么都没有标签”的限制。

现代 TypeScript 已经放宽这一点，可以在某些 Tuple 中混合 labeled / unlabeled elements。

不过从课程和工程可读性角度，推荐同一个业务 Tuple 保持一致：

```text
要么给重要位置都起清楚的名字
要么结构足够简单时完全不加标签
```

不要为了证明语法允许而故意写得难读。

### 8. Named Tuple 不等于 Named Runtime Fields

编译以后，标签会像其他类型信息一样被擦除。

运行时：

```text
[101, 'Keyboard', 499]
```

仍然只是 Array。

因此如果业务真正依赖字段名进行访问、序列化或动态扩展，对象通常更合适。

### 9. 什么场景适合 Named Tuple

比较适合：

- 坐标与范围。
- 小型固定协议返回值。
- 函数参数列表映射。
- 固定少量元素、顺序稳定的结构。

如果字段不断增加、经常按名字访问，应考虑对象类型。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp041-named-tuple-elements/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：先写无标签 Tuple

先建立最基础结构：

```ts
type ProductRow = [number, string, number];
```

它能工作，但语义不够清楚。

### 第 2 步：加入位置标签

改成：

```ts
type ProductRow = [
  id: number,
  name: string,
  price: number
];
```

现在不需要额外注释就能看懂三个位置。

### 第 3 步：创建真实 Tuple 值

```ts
const row: ProductRow = [101, 'Keyboard', 499];
```

注意值本身仍然没有标签语法。

### 第 4 步：创建格式化函数

```ts
function formatRow(row: ProductRow): string {
  const [id, name, price] = row;
  return `${id}:${name.toUpperCase()}:¥${price.toFixed(2)}`;
}
```

Tuple 标签让函数签名更易读，但函数内部仍然通过解构获取值。

### 第 5 步：用完全不同的变量名解构

加入：

```ts
const [productId, productName, productPrice] = row;
```

这三个人工变量名和类型中的标签不相同，仍然完全合法。

### 第 6 步：输出结果

```ts
console.log(formatRow(row));
console.log(`${productId}/${productName}/${productPrice}`);
```

预期：

```text
101:KEYBOARD:¥499.00
101/Keyboard/499
```

### 第 7 步：临时尝试对象属性访问

尝试：

```ts
// console.log(row.id);
```

TypeScript 会提示不存在 `id` 这样的对象属性。

这一步用来证明：

```text
Named Tuple label
≠
runtime property
```

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`[id: number, name: string, price: number]`。
- **实验辅助代码**：解构和日志输出用于观察标签只影响可读性与工具提示，不产生运行时字段。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp041-named-tuple-elements/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp041-named-tuple-elements/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp041-named-tuple-elements/dist/main.js
```

预期：

```text
101:KEYBOARD:¥499.00
101/Keyboard/499
```

## 效果验证

你应该能够确认：

- Named Tuple Elements 能让位置语义更清晰。
- 标签不会改变 Tuple 的运行时结构。
- `row.id` 并不会因为标签存在而自动可用。
- 解构变量名不必和标签名称相同。
- 标签主要服务于代码阅读和编辑器工具体验。
- Named Tuple 适合小型固定结构，不应拿来替代所有对象类型。
