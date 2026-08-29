# TS-KP039：可选 Tuple 元素

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `?` 为 Tuple 尾部位置声明可选元素。
2. 理解 `[string, number, string?]` 可以表示两种合法长度。
3. 知道读取可选 Tuple 元素时，静态类型会包含 `undefined` 的可能性。
4. 能通过解构、空值合并和分支判断安全使用可选位置。
5. 理解可选元素不能随意放在必选元素之前。
6. 区分“Tuple 可选位置”和“普通数组长度不固定”两种不同建模方式。

> **本节核心代码**：`[string, number, string?]` 以及读取可选第三个元素后的 `string | undefined` 处理。
>
> **实验辅助代码**：搜索分页场景和 `?? 'none'` 只用于让可选位置变得可观察。

## 理论讲解

### 1. 固定 Tuple 有固定长度

上一节写过：

```ts
[number, string, boolean]
```

它要求：

```text
第 0 位 number
第 1 位 string
第 2 位 boolean
```

并且直接创建值时要满足完整长度。

### 2. 某些固定协议允许最后一项缺失

例如搜索结果：

```text
第 0 位：查询词
第 1 位：结果数量
第 2 位：下一页 cursor，可选
```

第一页可能没有下一页：

```text
['keyboard', 42]
```

有下一页时：

```text
['keyboard', 42, 'cursor-2']
```

这可以用：

```ts
[string, number, string?]
```

表达。

### 3. `?` 表示这个位置可以不存在

定义：

```ts
type SearchResult = [string, number, string?];
```

那么下面两个值都合法：

```ts
const first: SearchResult = ['keyboard', 42];
```

```ts
const next: SearchResult = [
  'keyboard',
  42,
  'cursor-2'
];
```

因此它的长度不再只有一个值，可以建立直觉：

```text
长度 2
或
长度 3
```

### 4. 读取可选元素必须考虑 `undefined`

对于：

```ts
const result: SearchResult = ['keyboard', 42];
```

读取：

```ts
result[2]
```

TypeScript 不能保证第三个位置存在，所以它的静态类型包含：

```text
string | undefined
```

因此不能直接：

```ts
// result[2].toUpperCase();
```

因为值可能是 `undefined`。

### 5. 可以先判断再使用

例如：

```ts
const cursor = result[2];

if (cursor !== undefined) {
  console.log(cursor.toUpperCase());
}
```

控制流分析会在分支中把 `cursor` 收窄为 `string`。

也可以使用空值合并：

```ts
const cursor = result[2] ?? 'none';
```

### 6. 解构同样会保留可选性

例如：

```ts
const [query, count, cursor] = result;
```

得到：

```text
query  → string
count  → number
cursor → string | undefined
```

所以 Tuple 解构不会因为语法更短而丢失可选信息。

### 7. 可选元素通常位于必选元素之后

下面的形式很自然：

```ts
[string, number, string?]
```

如果把可选元素放在必选元素前面：

```ts
// [string?, number]
```

TypeScript 会拒绝这种普通可选 Tuple 定义，因为一旦前面的元素缺失，后面位置的解释会变得不稳定。

因此可以先记住：

```text
required
required
optional
```

是最典型的可选 Tuple 结构。

更复杂的中间缺失结构可以使用联合 Tuple 或后面的 Rest Tuple 等方案建模，但本节不展开。

### 8. 可选 Tuple 不等于普通数组

普通数组：

```ts
string[]
```

表示：

```text
长度可以变化
每个位置都是 string
```

而：

```ts
[string, number, string?]
```

表示：

```text
第 0 位固定 string
第 1 位固定 number
第 2 位如果存在则是 string
```

所以 Tuple 仍然强调位置协议。

### 9. 什么时候适合可选 Tuple

适合：

```text
协议位置很少
前几个位置稳定
末尾存在少量可选附加信息
```

例如：

```text
[x, y, z?]
[status, message, debugInfo?]
```

如果可选字段越来越多：

```text
[a, b?, c?, d?, e?]
```

对象类型通常会更容易阅读和扩展。

### 10. 可选 Tuple 是静态类型能力

运行时：

```js
['keyboard', 42]
```

就是普通长度为 2 的数组。

JavaScript 不知道第三个位置在 TypeScript 中被声明成“可选”。

所以：

```text
? 可选 Tuple 元素
→ TypeScript 静态模型

数组真实长度
→ JavaScript 运行时事实
```

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp039-optional-tuple-elements/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：定义搜索结果 Tuple

在 `src/main.ts` 中写：

```ts
type SearchResult = [string, number, string?];
```

三个位置含义是：

```text
查询词
结果数
可选 cursor
```

### 第 2 步：创建没有第三项的值

继续写：

```ts
const firstPage: SearchResult = [
  'keyboard',
  42
];
```

长度 2 合法，因为第三项可选。

### 第 3 步：创建包含第三项的值

加入：

```ts
const nextPage: SearchResult = [
  'keyboard',
  42,
  'cursor-2'
];
```

长度 3 同样合法。

### 第 4 步：创建格式化函数

加入：

```ts
function describeResult(
  result: SearchResult
): string {
  const [query, count, cursor] = result;

  return `${query}:${count}:${cursor ?? 'none'}`;
}
```

这里解构出的 `cursor` 仍然可能是 `undefined`，所以使用：

```ts
cursor ?? 'none'
```

提供默认展示值。

### 第 5 步：运行两个合法长度

加入：

```ts
console.log(describeResult(firstPage));
console.log(describeResult(nextPage));
```

预期：

```text
keyboard:42:none
keyboard:42:cursor-2
```

### 第 6 步：临时直接调用字符串方法

尝试：

```ts
const cursor = firstPage[2];
console.log(cursor.toUpperCase());
```

类型检查应该失败，因为 `cursor` 可能是 `undefined`。

改成：

```ts
if (cursor !== undefined) {
  console.log(cursor.toUpperCase());
}
```

就可以安全通过。

验证后删除临时代码。

### 第 7 步：临时尝试错误的可选位置

可以创建一个临时类型：

```ts
type Invalid = [string?, number];
```

TypeScript 应该拒绝，因为必选元素不能直接跟在普通可选元素之后。

验证后删除。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`[string, number, string?]`、长度 2/3 的合法值和可选位置读取。
- **实验辅助代码**：`?? 'none'` 和搜索分页语义只用于展示可选位置的实际影响。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp039-optional-tuple-elements/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp039-optional-tuple-elements/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp039-optional-tuple-elements/dist/main.js
```

预期输出：

```text
keyboard:42:none
keyboard:42:cursor-2
```

## 效果验证

你应该能够确认：

- `[string, number, string?]` 同时允许长度 2 和长度 3。
- 如果第三个位置存在，它必须是 `string`。
- 读取第三个位置时必须考虑 `undefined`。
- 解构可选 Tuple 元素后，可选性仍然存在。
- 普通可选元素不能随意放在后续必选元素之前。
- 可选 Tuple 仍然是固定位置协议，而不是普通不定长数组。
