# TS-KP047：索引签名

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解当属性名称无法提前全部列出时为什么需要索引签名。
2. 使用 `[key: string]: ValueType` 描述字符串动态键对象。
3. 理解索引签名会约束所有匹配该 key 类型的属性值。
4. 知道显式声明的属性也必须和字符串索引签名的值类型兼容。
5. 理解索引签名不会在 JavaScript 运行时自动创建不存在的属性。
6. 知道 `noUncheckedIndexedAccess` 可以让动态索引读取更保守。
7. 为下一节数字索引与字符串索引之间的关系建立基础。

> **本节核心代码**：`[sku: string]: number` 动态库存表。
>
> **实验辅助代码**：`Object.values()` 和求和逻辑用于证明所有动态属性值都满足 `number`。

## 理论讲解

### 1. 普通对象类型适合已知属性名

例如：

```ts
{
  id: number;
  name: string;
}
```

适合字段名称提前确定的结构。

但库存表可能是：

```text
keyboard → 10
mouse    → 20
monitor  → 5
...
```

SKU 名称可能不断增加，不能提前把所有 key 全写进类型。

此时可以使用索引签名。

### 2. 字符串索引签名基本语法

```ts
{
  [sku: string]: number;
}
```

可以读作：

> 使用字符串 key 访问这个对象时，对应的值应该是 `number`。

例如：

```ts
const inventory: {
  [sku: string]: number;
} = {
  keyboard: 10,
  mouse: 20
};
```

### 3. 可以继续增加动态属性

因为类型允许任意字符串 key：

```ts
inventory.monitor = 5;
```

合法。

但：

```ts
// inventory.speaker = '5';
```

会失败。

不是因为 `speaker` 这个 key 不允许，而是：

```text
字符串 key
      ↓
值必须是 number
```

### 4. 索引参数名字只是说明性名字

写：

```ts
[sku: string]: number
```

也可以写：

```ts
[key: string]: number
```

`sku` 不会成为 JavaScript 变量，也不会限制 key 必须真的叫“sku”。

它主要帮助人理解：

```text
这个字符串 key 在业务上代表什么
```

### 5. 已知属性也必须满足字符串索引签名

例如：

```ts
type Inventory = {
  [sku: string]: number;
  total: number;
};
```

可以，因为：

```text
total 的值也是 number
```

但：

```ts
type InvalidInventory = {
  [sku: string]: number;
  name: string;
};
```

会冲突。

原因是 `name` 本身也是一个字符串属性名。

既然类型承诺：

```text
任意 string key → number
```

那么 `name` 就不能突然返回 `string`。

### 6. 索引签名不是“任意对象”

下面：

```ts
{
  [key: string]: number
}
```

并不是：

```text
任何属性都可以、任何值都可以
```

它恰恰是一种规则：

```text
key 可以动态
但 value 必须遵守统一约束
```

如果值类型确实有多种可能，需要显式建模，而不是偷偷依赖 `any`。

### 7. 不存在的 key 运行时仍然可能得到 undefined

非常重要。

类型：

```ts
const inventory: {
  [sku: string]: number;
}
```

允许写：

```ts
inventory['not-exist']
```

但索引签名不会真的创建这个属性。

JavaScript 运行时如果 key 不存在：

```text
结果仍然是 undefined
```

在默认索引访问规则下，TypeScript 往往根据索引签名把读取结果视为 `number`。

如果开启：

```json
{
  "compilerOptions": {
    "noUncheckedIndexedAccess": true
  }
}
```

未声明动态字段的索引读取会额外考虑 `undefined`，让使用方必须更谨慎。

这个选项后续工程配置章节还会再遇到。

### 8. 索引签名支持的不只有 string

现代 TypeScript 的索引签名 key 可以基于：

- `string`
- `number`
- `symbol`
- 模板字符串模式
- 由这些合法 key 类型组成的联合

本节只集中学习：

```ts
[string]: value
```

下一节 TS-KP048 会专门比较：

```text
number index
vs
string index
```

以及 JavaScript 中数字属性访问最终和字符串属性键之间的关系。

### 9. 什么时候适合索引签名

适合：

- 字典。
- 动态配置表。
- 按 SKU / ID / code 索引的映射。
- 动态 header、metadata 等结构。

不适合：

- 字段集合其实固定，却为了省事写成动态字典。
- 每个字段有完全不同的业务语义和不同类型。

已知固定字段越多，越应该优先明确写出真实属性。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp047-index-signatures/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建字符串索引签名

在 `src/main.ts`：

```ts
const inventory: {
  [sku: string]: number;
} = {
  keyboard: 10,
  mouse: 20
};
```

### 第 2 步：新增动态 key

```ts
inventory.monitor = 5;
```

TypeScript 接受，因为：

```text
monitor
→ string property name

5
→ number
```

### 第 3 步：临时写入错误值

尝试：

```ts
// inventory.speaker = '5';
```

取消注释后类型检查应该失败。

### 第 4 步：创建消费索引对象的函数

```ts
function totalStock(
  stock: {
    [sku: string]: number;
  }
): number {
  return Object.values(stock)
    .reduce((total, value) => total + value, 0);
}
```

因为索引签名保证所有值都是 `number`，`Object.values(stock)` 的元素可以参与数字求和。

### 第 5 步：读取已知 key

```ts
console.log(inventory.keyboard);
console.log(inventory.monitor);
```

输出：

```text
10
5
```

### 第 6 步：输出总库存

```ts
console.log(totalStock(inventory));
```

得到：

```text
35
```

### 第 7 步：理解不存在 key 的边界

可以在 Node / JavaScript 中观察：

```js
inventory.unknownSku
```

运行时没有这个字段时仍然是：

```text
undefined
```

索引签名只是类型承诺，不是运行时属性生成器。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：字符串索引签名 `[sku: string]: number`。
- **实验辅助代码**：`Object.values()` 和求和日志。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp047-index-signatures/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp047-index-signatures/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp047-index-signatures/dist/main.js
```

预期：

```text
10
5
35
```

## 效果验证

你应该能够确认：

- `[sku: string]: number` 允许未知字符串 key。
- 所有字符串属性对应的值都必须满足 `number`。
- 动态增加 `monitor = 5` 可以通过。
- 写入字符串值会产生类型错误。
- 索引签名不会自动创建运行时不存在的属性。
- `noUncheckedIndexedAccess` 可以让动态读取更保守。
