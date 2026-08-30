# TS-KP040：Rest Tuple 元素

> [返回 Chapter 03](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `[T, ...U[]]` 描述“固定前缀 + 可变长度尾部”的 Tuple。
2. 理解 Rest Tuple 元素可以匹配零个、一个或多个元素。
3. 知道固定位置仍然保留精确类型，而 Rest 部分按数组元素类型约束。
4. 能通过 Tuple 解构中的 `...rest` 安全取得可变尾部。
5. 区分 Rest Tuple 与普通数组：Tuple 仍然保留固定结构信息。
6. 知道 Rest Tuple 属于 TypeScript 静态结构，JavaScript 运行时仍然只是 Array。

> **本节核心代码**：`type Route = [string, ...number[]]`，表示第 0 位固定为字符串，后面允许任意数量的数字。
>
> **实验辅助代码**：`describeRoute()`、`join()` 与日志输出用于观察固定前缀和可变尾部。

## 理论讲解

### 1. 固定长度 Tuple 有时不够用

前面已经学过：

```ts
[number, string]
```

它适合表示固定两个位置。

但有些结构的前几位固定，后面数量不确定，例如路由层级：

```text
users
orders / 2026
orders / 2026 / 8 / 28
```

如果把第一位固定为资源名，后面的路径段都用数字表示，就可以使用 Rest Tuple。

### 2. Rest Tuple 的基本语法

```ts
type Route = [string, ...number[]];
```

可以建立这样的结构直觉：

```text
第 0 位
string
固定存在

第 1 位以后
...number[]
可以有 0～N 个 number
```

因此以下值都合法：

```ts
const a: Route = ['users'];
const b: Route = ['orders', 2026];
const c: Route = ['orders', 2026, 8, 28];
```

### 3. Rest 部分可以匹配零个元素

`...number[]` 不代表至少有一个数字。

所以：

```ts
const root: Route = ['users'];
```

完全合法。

但是固定的第 0 位不能缺少：

```ts
// const invalid: Route = [];
```

### 4. Rest 部分仍然有元素类型约束

下面会失败：

```ts
// const invalid: Route = ['orders', '2026'];
```

因为 Rest 部分要求：

```text
number[]
```

不是任意值数组。

所以 Rest Tuple 不是把尾部变成 `any[]`。

### 5. 解构时非常自然

对于：

```ts
const route: Route = ['orders', 2026, 8, 28];
```

可以写：

```ts
const [resource, ...segments] = route;
```

TypeScript 知道：

```text
resource → string
segments → number[]
```

固定位置和可变尾部的类型信息都会保留下来。

### 6. Rest Tuple 与普通联合数组不同

如果写成：

```ts
(string | number)[]
```

类型系统只知道每个位置可能是字符串或数字。

它不知道：

```text
第 0 位必须是 string
后面必须是 number
```

而：

```ts
[string, ...number[]]
```

恰好能表达这种顺序规则。

### 7. Rest 元素不只是一种运行时展开语法

JavaScript 中也有：

```js
const [head, ...tail] = values;
```

但 TypeScript 的：

```ts
[string, ...number[]]
```

是在**类型位置**描述结构。

必须区分：

```text
值层面的 ...
→ JavaScript 展开 / 收集

类型层面的 ...
→ TypeScript Tuple 结构描述
```

### 8. 现代 TypeScript 还支持更灵活的 Rest 位置

现代 TypeScript 可以表达某些 leading / middle Rest Tuple 结构。

例如可以出现“前面可变、末尾固定”的类型设计。

但本节先掌握最常见、最容易理解的：

```ts
[固定前缀, ...可变尾部]
```

更复杂的“把任意 Tuple 结构传播到另一个 Tuple”会在 TS-KP043 Variadic Tuple Types 中学习。

### 9. 运行时仍然只是数组

Rest Tuple 不会创建新的 JavaScript 数据结构。

编译以后：

```text
Route 类型信息被擦除
实际运行的值仍然是 Array
```

因此 `Array.isArray(route)` 仍然成立。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp040-rest-tuple-elements/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：声明最小 Rest Tuple

在 `src/main.ts` 写：

```ts
type Route = [string, ...number[]];
```

这个类型先建立一条规则：

```text
第一位是 string
后面全部是 number
数量不限
```

### 第 2 步：创建只有固定前缀的值

```ts
const users: Route = ['users'];
```

这里 Rest 部分匹配 0 个元素。

### 第 3 步：创建多个尾部元素

```ts
const orderArchive: Route = ['orders', 2026, 8, 28];
```

这里 Rest 部分匹配 3 个数字。

### 第 4 步：使用解构读取固定前缀和 Rest 尾部

加入：

```ts
function describeRoute(route: Route): string {
  const [resource, ...segments] = route;

  const suffix = segments.length === 0
    ? 'root'
    : segments.join('/');

  return `${resource}:${suffix}`;
}
```

此时：

```text
resource → string
segments → number[]
```

### 第 5 步：输出两个合法结构

```ts
console.log(describeRoute(users));
console.log(describeRoute(orderArchive));
```

预期：

```text
users:root
orders:2026/8/28
```

### 第 6 步：临时制造尾部类型错误

尝试：

```ts
// const wrong: Route = ['orders', '2026'];
```

类型检查应该失败，因为第二个元素已经进入 Rest 区域，却不是 `number`。

### 第 7 步：临时删除固定前缀

尝试：

```ts
// const empty: Route = [];
```

也应该失败。

这说明 Rest 只让尾部长度可变，不会取消前面的固定位置要求。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`[string, ...number[]]`、固定前缀和可变长度尾部。
- **实验辅助代码**：`describeRoute()` 和日志输出用于观察 Tuple 解构后的类型结果。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./03-arrays-tuples-objects-indexing/kp040-rest-tuple-elements/tsconfig.json
npm run build -- ./03-arrays-tuples-objects-indexing/kp040-rest-tuple-elements/tsconfig.json
node ./03-arrays-tuples-objects-indexing/kp040-rest-tuple-elements/dist/main.js
```

预期：

```text
users:root
orders:2026/8/28
```

## 效果验证

你应该能够确认：

- Rest Tuple 可以表达固定前缀和可变尾部。
- `...number[]` 可以匹配 0～N 个数字。
- 固定前缀仍然是 Tuple 结构的一部分，不能缺失。
- Rest 尾部不会退化成 `any[]`，仍然受到元素类型约束。
- 解构后的 `segments` 能被 TypeScript 理解为 `number[]`。
- Rest Tuple 在 JavaScript 运行时仍然只是数组。
