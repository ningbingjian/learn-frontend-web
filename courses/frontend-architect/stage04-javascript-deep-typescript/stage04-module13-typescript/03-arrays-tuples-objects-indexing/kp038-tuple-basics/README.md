# TS-KP038：Tuple 基础

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 Tuple 用固定位置表达一组已知元素类型。
2. 区分普通数组 `string[]` 与 Tuple `[number, string, boolean]` 的建模目标。
3. 知道 Tuple 每个位置可以拥有不同类型。
4. 理解 Tuple 的长度和位置约束主要发生在 TypeScript 静态检查阶段。
5. 能通过索引和解构观察不同位置的精确类型。
6. 知道 Tuple 在 JavaScript 运行时仍然只是普通数组。

> **本节核心代码**：`[number, string, boolean]` 以及按固定位置读取、解构 Tuple。
>
> **实验辅助代码**：`Array.isArray()` 和日志输出只用于证明 Tuple 的运行时本质仍然是 JavaScript Array。

## 理论讲解

### 1. 普通数组强调“元素类型一致”

例如：

```ts
const names: string[] = ['Keyboard', 'Mouse'];
```

数组关心的是：

```text
每个元素
都应该是 string
```

索引 `0`、`1`、`2` 对类型系统来说没有不同的业务含义。

### 2. Tuple 强调“位置结构”

假设业务中一条数据固定表示：

```text
第 0 位：产品 ID
第 1 位：产品名称
第 2 位：是否启用
```

可以声明：

```ts
const product: [number, string, boolean] = [
  101,
  'Keyboard',
  true
];
```

此时 TypeScript 知道：

```text
product[0] → number
product[1] → string
product[2] → boolean
```

这比：

```ts
(number | string | boolean)[]
```

更精确，因为后者只知道“数组元素可能是三种类型之一”，不知道哪个位置对应哪一种。

### 3. Tuple 可以拥有不同位置类型

例如：

```ts
const point: [number, number] = [10, 20];
```

也可以：

```ts
const response: [number, string] = [200, 'OK'];
```

Tuple 的价值不在于元素必须不同，而在于：

> 每个位置的类型和顺序是已知的。

### 4. 顺序错误会被检查

正确：

```ts
const product: [number, string, boolean] = [
  101,
  'Keyboard',
  true
];
```

错误顺序：

```ts
// const product: [number, string, boolean] = [
//   'Keyboard',
//   101,
//   true
// ];
```

即使三个值“都在”，位置类型不匹配仍然会报错。

### 5. 长度同样是 Tuple 结构的一部分

例如：

```ts
const pair: [number, string] = [1, 'A'];
```

下面缺少一个元素：

```ts
// const pair: [number, string] = [1];
```

下面多一个元素：

```ts
// const pair: [number, string] = [1, 'A', true];
```

在直接创建 Tuple 值时都会受到长度结构检查。

后面的可选元素、Rest 元素会让 Tuple 长度变得更灵活，本节先掌握固定长度 Tuple。

### 6. 索引访问会得到精确位置类型

对于：

```ts
const product: [number, string, boolean] = [101, 'Keyboard', true];
```

可以直接：

```ts
product[0].toFixed(0);
product[1].toUpperCase();
```

因为 TypeScript 知道两个位置的类型不同。

如果它只是：

```ts
(number | string | boolean)[]
```

就无法直接这样使用，需要先收窄。

### 7. 解构 Tuple 也能保留位置类型

例如：

```ts
const [id, name, active] = product;
```

TypeScript 可以得到：

```text
id     → number
name   → string
active → boolean
```

所以 Tuple 和数组解构组合起来很适合处理固定协议结构。

### 8. Tuple 运行时仍然是 Array

TypeScript 编译后不会生成新的“Tuple 类”。

运行时：

```ts
Array.isArray(product)
```

结果仍然是：

```text
true
```

因此必须分清：

```text
Tuple
→ TypeScript 静态结构约束

Array
→ JavaScript 运行时数据结构
```

### 9. Tuple 不等于运行时不可变固定数组

写：

```ts
[number, string, boolean]
```

主要表示静态位置和长度信息。

它不会自动让数组变成 JavaScript 运行时冻结对象。

如果业务需要更强的不可修改约束，后面 TS-KP042 会学习 Readonly Tuple。

### 10. 什么时候适合 Tuple

适合：

```text
固定少量位置
顺序本身有明确语义
例如坐标、键值对、某些协议返回值
```

不适合：

```text
字段很多
位置含义难记
业务字段经常扩展
```

如果你开始需要记忆：

```text
第 0 位是什么？
第 5 位是什么？
第 8 位又是什么？
```

通常对象结构会比长 Tuple 更清晰。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp038-tuple-basics/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建最小 Tuple

在 `src/main.ts` 写：

```ts
const product: [number, string, boolean] = [
  101,
  'Keyboard',
  true
];
```

当前三个位置已经分别固定为：

```text
number
string
boolean
```

### 第 2 步：通过索引使用精确类型

继续写：

```ts
console.log(product[0].toFixed(0));
console.log(product[1].toUpperCase());
```

这两行能够通过检查，是因为 TypeScript 认识每个位置的类型。

### 第 3 步：创建接收 Tuple 的函数

加入：

```ts
function formatProduct(
  value: [number, string, boolean]
): string {
  const [id, name, active] = value;

  return `${id}:${name.toUpperCase()}:${
    active ? 'active' : 'inactive'
  }`;
}
```

这里参数本身就携带固定位置协议。

### 第 4 步：调用函数

加入：

```ts
console.log(formatProduct(product));
```

预期：

```text
101:KEYBOARD:active
```

### 第 5 步：验证运行时仍然是数组

加入：

```ts
console.log(Array.isArray(product));
```

预期：

```text
true
```

### 第 6 步：临时制造顺序错误

尝试：

```ts
const wrong: [number, string, boolean] = [
  'Keyboard',
  101,
  true
];
```

类型检查应该失败。

验证后删除。

### 第 7 步：临时制造长度错误

尝试：

```ts
const tooShort: [number, string, boolean] = [
  101,
  'Keyboard'
];
```

也应该失败。

这证明 Tuple 的静态结构不仅包含元素类型，也包含位置数量。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`[number, string, boolean]`、固定索引类型和 Tuple 解构。
- **实验辅助代码**：`Array.isArray(product)` 只用于确认运行时仍然是普通数组。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp038-tuple-basics/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp038-tuple-basics/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp038-tuple-basics/dist/main.js
```

预期输出：

```text
101:KEYBOARD:active
101
KEYBOARD
true
```

## 效果验证

你应该能够确认：

- Tuple 可以让每个固定位置拥有不同类型。
- `[number, string, boolean]` 不等于 `(number | string | boolean)[]`。
- Tuple 顺序错误和长度错误能够在静态检查阶段被发现。
- 访问 `product[0]`、`product[1]` 时可以获得不同的精确类型。
- Tuple 解构会保留每个位置的类型信息。
- Tuple 在 JavaScript 运行时依然是 Array。
