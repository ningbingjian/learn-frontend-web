# TS-KP036：`T[]` 与 `Array<T>`

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `T[]` 描述某种元素类型组成的数组。
2. 使用 `Array<T>` 描述同样的数组类型。
3. 理解 `number[]` 与 `Array<number>` 在日常数组类型表达上的等价关系。
4. 知道数组元素类型会约束读取、写入、函数参数和返回值。
5. 能根据代码可读性选择 `T[]` 或 `Array<T>`，而不是把它们理解成两套数组系统。
6. 区分“数组类型语法”和 JavaScript 运行时真正存在的 `Array` 对象。

> **本节核心代码**：`number[]`、`Array<string>` 以及两种写法之间的相互赋值。
>
> **实验辅助代码**：`reduce()`、`map()` 和日志输出只用于证明两种类型写法拥有同样的数组能力。

## 理论讲解

### 1. `T[]` 是最常见的数组类型写法

例如：

```ts
const ids: number[] = [101, 102, 103];
```

这里：

```text
number
  ↓
数组元素类型

[]
  ↓
这是一个数组
```

所以 `number[]` 可以读作：

> number 类型元素组成的数组。

字符串数组同理：

```ts
const names: string[] = ['Keyboard', 'Mouse'];
```

### 2. `Array<T>` 是泛型形式

同样的数字数组也可以写成：

```ts
const ids: Array<number> = [101, 102, 103];
```

字符串数组：

```ts
const names: Array<string> = ['Keyboard', 'Mouse'];
```

这里的 `T` 可以先理解成“放进数组中的元素类型”。

泛型会在 Chapter 08 系统学习，本节只需要接受：

```text
number[]
      =
Array<number>
```

在普通数组类型表达上，它们表示同一种类型关系。

### 3. 两种写法可以互相赋值

例如：

```ts
const ids: number[] = [1, 2, 3];
const copied: Array<number> = ids;
```

反过来也可以：

```ts
const names: Array<string> = ['A', 'B'];
const copiedNames: string[] = names;
```

这说明它们不是：

```text
两种不同数组
```

而是：

```text
同一个 TypeScript 数组类型的两种书写方式
```

### 4. 元素类型会约束写入

如果数组是：

```ts
const prices: number[] = [100, 200];
```

可以写：

```ts
prices.push(300);
```

但不能写：

```ts
// prices.push('300');
```

因为数组已经声明只能接收数字元素。

同样：

```ts
const names: Array<string> = ['A'];
```

不能把数字放进去。

### 5. 元素类型也会影响读取

当 TypeScript 知道：

```ts
const prices: number[] = [100, 200];
```

那么从数组中读取的元素会按数字类型参与检查。

例如：

```ts
prices.map((price) => price.toFixed(2));
```

回调中的 `price` 会获得数字相关类型，因此可以使用 `toFixed()`。

> 更严格的数组下标越界类型行为与 `noUncheckedIndexedAccess` 等配置有关，后续配置章节再深入。本节先掌握数组元素类型本身。

### 6. 函数参数也可以使用两种写法

下面两个函数参数类型表达的核心含义相同：

```ts
function sum(values: number[]) {
  // ...
}
```

```ts
function sum(values: Array<number>) {
  // ...
}
```

团队一般根据可读性和复杂度统一风格。

常见习惯：

```text
简单元素类型
number[]
string[]
User[]

复杂嵌套类型或强调泛型结构时
Array<T>
```

但这不是语言强制规则。

### 7. 二维数组如何写

例如数字二维数组：

```ts
const matrix: number[][] = [
  [1, 2],
  [3, 4]
];
```

也可以写：

```ts
const matrix: Array<Array<number>> = [
  [1, 2],
  [3, 4]
];
```

还可以混合：

```ts
const matrix: Array<number[]> = [
  [1, 2],
  [3, 4]
];
```

本质仍然是元素类型嵌套。

### 8. TypeScript 类型和运行时 Array 要分开

TypeScript 中：

```ts
number[]
Array<number>
```

属于静态类型描述。

JavaScript 真正运行时存在的是数组对象：

```js
[1, 2, 3]
```

可以通过：

```ts
Array.isArray(value)
```

进行运行时判断。

但运行时并不存在一个叫：

```text
number[]
```

的 JavaScript 类型对象。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

创建：

```text
kp036-array-syntax/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：使用 `T[]` 创建数字数组

在 `src/main.ts` 中写：

```ts
const productIds: number[] = [101, 102, 103];
```

当前数组只能保存与 `number` 兼容的值。

### 第 2 步：使用 `Array<T>` 创建字符串数组

继续写：

```ts
const productNames: Array<string> = ['Keyboard', 'Mouse'];
```

这里使用的是泛型数组写法。

### 第 3 步：验证两种写法兼容

加入：

```ts
const idsAsGeneric: Array<number> = productIds;
const namesAsBrackets: string[] = productNames;
```

如果两种写法代表完全不同的类型，这两行就无法通过。

但 TypeScript 可以正常接受。

### 第 4 步：让数字数组进入函数

加入：

```ts
function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
```

这里参数使用 `number[]`。

继续：

```ts
console.log(sum(idsAsGeneric));
```

虽然传入变量声明为：

```ts
Array<number>
```

仍然可以正常传给 `number[]` 参数。

### 第 5 步：让字符串数组进入另一个函数

加入：

```ts
function normalize(values: Array<string>): string[] {
  return values.map((value) => value.toUpperCase());
}
```

这里故意混合两种写法：

```text
参数：Array<string>
返回：string[]
```

继续：

```ts
console.log(normalize(namesAsBrackets).join(' | '));
```

### 第 6 步：运行并观察结果

预期输出：

```text
306
KEYBOARD | MOUSE
```

### 第 7 步：临时制造元素类型错误

临时尝试：

```ts
productIds.push('104');
```

类型检查应该失败。

再尝试：

```ts
productNames.push(123);
```

同样应该失败。

这证明真正产生约束的是元素类型，而不是你选择了哪一种数组书写语法。

验证后删除错误代码。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`number[]`、`Array<string>` 与两种形式的相互赋值。
- **实验辅助代码**：`sum()`、`normalize()` 和输出只用于验证两种写法拥有相同的数组类型能力。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp036-array-syntax/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp036-array-syntax/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp036-array-syntax/dist/main.js
```

预期输出：

```text
306
KEYBOARD | MOUSE
```

## 效果验证

你应该能够确认：

- `number[]` 与 `Array<number>` 可以互相赋值。
- `string[]` 与 `Array<string>` 表达相同的元素约束。
- 数组元素类型会限制 `push()` 等写入操作。
- 数组元素类型会影响 `map()`、`reduce()` 等回调中的参数类型。
- `T[]` 和 `Array<T>` 是类型语法选择，不是两套不同的运行时数组。
