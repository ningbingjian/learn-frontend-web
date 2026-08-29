# TS-KP048：数字索引与字符串索引

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 分别使用 `[index: number]: T` 与 `[key: string]: T` 描述数字索引和字符串索引。
2. 理解 JavaScript 对象的数字属性访问在运行时会落到字符串属性键上。
3. 解释为什么同时存在 number/string 两种索引签名时，number 索引返回类型必须兼容 string 索引返回类型。
4. 知道数字索引可以提供更具体的返回类型，但不能和字符串索引产生矛盾。
5. 区分“索引参数的名字”和“索引参数的类型”：`index`、`key` 只是说明性名称。
6. 能通过真实对象验证 `obj[0]` 与 `obj['0']` 在 JavaScript 运行时指向同一个属性。

> **本节核心代码**：同时声明 `[key: string]: NamedEntry` 与 `[index: number]: ProductEntry`，并让 `ProductEntry` 的结构包含 `NamedEntry` 所要求的成员。
>
> **实验辅助代码**：`directory[0] === directory['0']` 只用于观察 JavaScript 运行时数字 key 的行为。

## 理论讲解

### 1. 数字索引签名

上一节已经见过字符串索引签名：

```ts
{
  [key: string]: number;
}
```

数字索引的写法类似：

```ts
{
  [index: number]: string;
}
```

它表达：

> 当代码使用 number 去索引这个值时，TypeScript 认为读取结果满足 `string`。

数组就是典型例子。可以建立直觉：

```text
Array<string>
    ↓
用 0、1、2... 读取
    ↓
得到 string
```

### 2. JavaScript 真正的对象属性键会发生什么

普通 JavaScript 对象：

```js
const value = {
  0: 'zero'
};
```

访问：

```js
value[0]
value['0']
```

两者指向同一个属性。

这是因为普通对象上的数字属性访问最终会对应字符串形式的属性键。

所以 TypeScript 不能让：

```text
obj[0]
```

和：

```text
obj['0']
```

描述成完全互相矛盾的值类型。

### 3. 同时声明两种索引签名

可以写：

```ts
type Directory = {
  [key: string]: NamedEntry;
  [index: number]: ProductEntry;
};
```

这里表示：

```text
普通 string key
→ 至少得到 NamedEntry

number key
→ 可以得到更具体的 ProductEntry
```

但必须满足一个关键条件：

```text
ProductEntry
必须能够赋给
NamedEntry
```

也就是 number 索引返回类型必须是 string 索引返回类型可接受的更具体类型。

### 4. 为什么必须有这个限制

假设反过来写成：

```ts
{
  [key: string]: ProductEntry;
  [index: number]: NamedEntry;
}
```

但 `NamedEntry` 不一定有 `ProductEntry` 的全部成员。

那么：

```text
obj[0]
```

可能被说成 `NamedEntry`，而同一个运行时属性：

```text
obj['0']
```

又需要满足更严格的 `ProductEntry`。

这会产生冲突。

因此 TypeScript 要求 number index value type 必须兼容 string index value type。

### 5. 本节用结构化类型建立“更具体”的关系

我们声明：

```ts
type NamedEntry = {
  name: string;
};
```

然后：

```ts
type ProductEntry = {
  id: number;
  name: string;
};
```

`ProductEntry` 拥有：

```text
name: string
```

并额外拥有：

```text
id: number
```

所以从结构上看，一个 `ProductEntry` 可以满足 `NamedEntry` 的要求。

### 6. 为什么最终源码先创建 ProductEntry 变量

最终案例先写：

```ts
const keyboard: ProductEntry = {
  id: 101,
  name: 'Keyboard'
};
```

再放入目录。

这样做是为了让本节聚焦索引签名关系。

如果把带额外 `id` 属性的对象字面量直接放进某些上下文，还可能同时触发对象字面量额外属性检查；这个规则正好会在下一节 TS-KP049 单独学习。

### 7. 数字索引不是“真正存在另一套数字属性系统”

必须区分：

```text
TypeScript
[number index signature]
→ 静态描述访问方式和返回类型

JavaScript
普通对象属性
→ 运行时属性键规则
```

TypeScript 没有改变 JavaScript 对象的运行时键机制。

### 8. 索引签名参数名不影响类型

下面：

```ts
[index: number]: string
```

和：

```ts
[position: number]: string
```

参数名只是为了让类型声明更易读。

真正决定规则的是：

```text
number
```

以及返回值类型。

### 9. 工程上什么时候会见到数字索引

常见场景包括：

- 类数组结构。
- 数字 ID 到对象的映射。
- 需要同时支持数字访问和其他字符串属性的结构。

不过如果业务本质上就是连续列表，通常优先使用真正的：

```ts
Array<T>
```

而不是手写数字索引对象。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp048-number-string-index/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明字符串索引的基础值结构

在 `src/main.ts`：

```ts
type NamedEntry = {
  name: string;
};
```

字符串索引至少保证每个值拥有 `name`。

### 第 2 步：声明数字索引使用的更具体结构

```ts
type ProductEntry = {
  id: number;
  name: string;
};
```

它比 `NamedEntry` 多一个 `id`，但仍满足 `name: string`。

### 第 3 步：同时声明两种索引签名

```ts
type ProductDirectory = {
  [key: string]: NamedEntry;
  [index: number]: ProductEntry;
};
```

注意方向：

```text
number → ProductEntry
string → NamedEntry
```

### 第 4 步：创建具体数字项

```ts
const keyboard: ProductEntry = {
  id: 101,
  name: 'Keyboard'
};

const mouse: ProductEntry = {
  id: 102,
  name: 'Mouse'
};
```

### 第 5 步：创建目录

```ts
const directory: ProductDirectory = {
  0: keyboard,
  1: mouse,
  fallback: { name: 'Unknown' }
};
```

这里：

- 数字键值满足 `ProductEntry`。
- `fallback` 只需要满足字符串索引要求 `NamedEntry`。

### 第 6 步：观察数字索引的更具体结果

```ts
console.log(directory[0].id);
```

能够访问 `id`，说明 number index 被理解成 `ProductEntry`。

### 第 7 步：观察普通字符串索引

```ts
console.log(directory['fallback'].name.toUpperCase());
```

普通 string key 至少得到 `NamedEntry`。

### 第 8 步：验证运行时数字 key

```ts
console.log(directory[0] === directory['0']);
```

预期：

```text
true
```

这说明两种访问方式最终指向同一个 JavaScript 对象属性。

### 第 9 步：临时制造错误的索引关系

可以临时尝试让 number 索引返回一个不满足 string 索引值类型的结构。

TypeScript 应该直接在类型声明阶段报错。

验证后恢复最终代码。

### 第 10 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：number/string 两种索引签名以及两者返回类型的兼容关系。
- **实验辅助代码**：最后的严格相等比较只用于展示运行时属性键行为。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp048-number-string-index/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp048-number-string-index/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp048-number-string-index/dist/main.js
```

预期：

```text
101
UNKNOWN
true
```

## 效果验证

你应该能够确认：

- number 和 string 都可以作为索引签名参数类型。
- 同时存在两种索引签名时，number index 的返回类型必须兼容 string index 的返回类型。
- number index 可以提供更具体的静态读取结果。
- `obj[0]` 与 `obj['0']` 在普通 JavaScript 对象上最终访问同一个属性。
- 索引签名只影响 TypeScript 静态检查，不会改变 JavaScript 运行时属性键规则。
