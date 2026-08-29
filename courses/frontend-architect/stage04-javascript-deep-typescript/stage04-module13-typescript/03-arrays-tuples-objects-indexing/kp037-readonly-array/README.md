# TS-KP037：只读数组 `readonly T[]` / `ReadonlyArray<T>`

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `readonly T[]` 声明只读数组视图。
2. 使用 `ReadonlyArray<T>` 表达同样的只读数组语义。
3. 理解只读数组允许读取、遍历和非破坏性转换，但不允许通过该引用直接修改数组结构。
4. 理解普通可变数组可以赋给只读数组引用，但只读数组不能直接赋给可变数组引用。
5. 知道只读数组默认是浅只读，不会自动让元素对象的内部属性变成只读。
6. 区分 TypeScript 编译期只读约束和 JavaScript 运行时真正冻结对象的机制。

> **本节核心代码**：`readonly string[]`、`ReadonlyArray<string>` 与“可变数组 → 只读视图”的赋值关系。
>
> **实验辅助代码**：对象元素属性修改和日志输出用于证明“只读数组是浅只读”，不是本节建议的业务修改模式。

## 理论讲解

### 1. 普通数组默认可以修改

例如：

```ts
const tags: string[] = ['typescript'];

tags.push('frontend');
tags[0] = 'ts';
```

只要元素类型仍然兼容，数组本身可以继续变化。

### 2. `readonly T[]` 禁止通过当前引用修改数组

例如：

```ts
const tags: readonly string[] = [
  'typescript',
  'frontend'
];
```

可以读取：

```ts
console.log(tags[0]);
console.log(tags.length);
```

也可以遍历：

```ts
tags.map((tag) => tag.toUpperCase());
```

但不能：

```ts
// tags.push('react');
// tags[0] = 'ts';
```

因为这些操作会修改原数组。

### 3. `ReadonlyArray<T>` 是另一种写法

同样可以写：

```ts
const tags: ReadonlyArray<string> = [
  'typescript',
  'frontend'
];
```

与上一节类似：

```text
readonly string[]
       =
ReadonlyArray<string>
```

它们都表达“当前数组引用只能按照只读方式使用”。

### 4. 可变数组可以赋给只读数组

例如：

```ts
const mutable: string[] = ['A', 'B'];
const readonlyView: readonly string[] = mutable;
```

这是安全的，因为只读引用承诺的是：

> 我不会通过这个引用去修改数组。

它并没有要求底层数组从此永远不可变。

### 5. 只读数组不能直接赋给可变数组

例如：

```ts
const readonlyValues: readonly string[] = ['A'];

// const mutableValues: string[] = readonlyValues;
```

如果允许这样做，就可以通过 `mutableValues.push()` 间接破坏原来的只读承诺。

所以赋值方向通常是：

```text
mutable array
     ↓
readonly array ✅

readonly array
     ↓
mutable array ❌
```

### 6. 只读数组不是深度只读

这是非常重要的边界。

例如：

```ts
const products: ReadonlyArray<{ name: string }> = [
  { name: 'Keyboard' }
];
```

数组结构不能通过 `products` 修改：

```ts
// products.push({ name: 'Mouse' });
```

但元素对象自身的类型仍然是：

```ts
{ name: string }
```

因此：

```ts
products[0].name = 'Mechanical Keyboard';
```

仍然可以通过类型检查。

这说明：

```text
ReadonlyArray<T>
只约束数组容器层

不会自动变成
DeepReadonly<T>
```

深层只读类型会在后面的映射类型章节学习。

### 7. 只读不等于运行时冻结

TypeScript 的：

```ts
readonly string[]
```

主要是编译期约束。

它不会自动调用：

```js
Object.freeze(...)
```

TypeScript 类型信息在常规 JavaScript 输出中会被擦除。

所以必须分清：

```text
readonly
→ 静态类型层面的修改限制

Object.freeze()
→ JavaScript 运行时对象冻结机制
```

二者不是同一层能力。

### 8. 函数参数为什么经常适合只读数组

如果一个函数只需要读取：

```ts
function formatTags(tags: readonly string[]) {
  return tags.join(',');
}
```

那么声明成只读参数能够表达更强的契约：

```text
这个函数只消费数据
不会修改调用方传入的数组结构
```

而且普通 `string[]` 仍然可以传入，因此调用体验通常很好。

### 9. 非破坏性数组操作仍然可以使用

例如：

```ts
readonlyValues.map(...)
readonlyValues.filter(...)
readonlyValues.slice(...)
```

这些方法不会直接修改原数组，而是产生新结果，因此适合只读数组。

需要修改时可以显式创建副本：

```ts
const copy = [...readonlyValues];
copy.push('new');
```

这比强行把只读类型断言回可变类型更清楚。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp037-readonly-array/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：创建普通可变数组

在 `src/main.ts` 中写：

```ts
const tags: string[] = ['typescript', 'frontend'];
```

这是普通可变数组。

### 第 2 步：建立只读视图

继续写：

```ts
const readonlyTags: readonly string[] = tags;
```

注意底层仍然是同一个 JavaScript 数组，但当前引用的静态类型变成只读数组。

### 第 3 步：创建只读取数组的函数

加入：

```ts
function formatTags(values: ReadonlyArray<string>): string {
  return values
    .map((value) => value.toUpperCase())
    .join(' | ');
}
```

这个函数只读取数组并产生新字符串。

继续：

```ts
console.log(formatTags(readonlyTags));
```

预期：

```text
TYPESCRIPT | FRONTEND
```

### 第 4 步：临时尝试修改只读数组

临时加入：

```ts
readonlyTags.push('react');
```

或者：

```ts
readonlyTags[0] = 'ts';
```

类型检查应该失败。

验证后删除这些代码。

### 第 5 步：观察浅只读边界

加入：

```ts
const products: ReadonlyArray<{ name: string }> = [
  { name: 'Keyboard' }
];
```

然后写：

```ts
products[0].name = 'Mechanical Keyboard';
```

这行可以通过。

原因是：

```text
数组容器 readonly
      ↓
不能 push / 改索引指向

元素对象 { name: string }
      ↓
name 自身并没有 readonly
```

### 第 6 步：输出元素变化

加入：

```ts
console.log(products[0].name);
```

预期：

```text
Mechanical Keyboard
```

这一步不是鼓励修改只读数组内部对象，而是帮助你准确理解浅只读边界。

### 第 7 步：临时验证赋值方向

下面可以：

```ts
const readonlyCopy: ReadonlyArray<string> = tags;
```

但下面不可以：

```ts
const mutableCopy: string[] = readonlyTags;
```

因为后者会把只读视图重新变成可变引用。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`readonly string[]`、`ReadonlyArray<string>` 与可变数组到只读数组的安全赋值。
- **实验辅助代码**：修改对象元素的 `name`，只用于证明只读数组默认是浅只读。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp037-readonly-array/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp037-readonly-array/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp037-readonly-array/dist/main.js
```

预期输出：

```text
TYPESCRIPT | FRONTEND
Mechanical Keyboard
```

## 效果验证

你应该能够确认：

- `readonly T[]` 与 `ReadonlyArray<T>` 都能表达只读数组。
- 只读数组可以读取、遍历、`map()`、`filter()`。
- 只读数组不能通过当前引用调用 `push()` 或重新赋值某个索引。
- 可变数组可以安全地提供给只读数组参数或变量。
- 只读数组不能直接赋值给可变数组引用。
- `ReadonlyArray<{ name: string }>` 不会自动把 `name` 变成只读。
- TypeScript 的 `readonly` 不等于 JavaScript 运行时 `Object.freeze()`。
