# TS-KP089：Equality Narrowing

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 TypeScript 如何利用相等 / 不相等比较进行类型收窄。
2. 使用 `===`、`!==` 让 Union 在不同控制流分支中变得更精确。
3. 理解两个 Union 值相等时，TypeScript 会寻找它们可能类型的共同部分。
4. 理解与具体 Literal Value 比较时为什么可以收窄到对应成员。
5. 正确理解 `value == null` 同时处理 `null` 与 `undefined` 的行为。
6. 区分 Equality Narrowing 与上一节 Truthiness Narrowing。
7. 知道 `switch` 也能利用字面量比较产生类似收窄效果。

> **本节核心代码**：`left === right` 对两个 Union 的共同成员收窄，以及 `value == null` 对 nullish Union 的收窄。
>
> **实验辅助代码**：四个 `console.log()` 只用于覆盖相等、不相等、缺失值和正常字符串路径。

## 理论讲解

### 1. Equality Narrowing 是什么

TypeScript 不只认识：

```ts
typeof value === 'string'
```

它也会分析普通 JavaScript 比较：

```ts
value === 'ready'
value !== null
left === right
value == null
```

这些比较在运行时提供了“当前值到底可能是什么”的证据。

TypeScript 会把这种证据带入控制流分析，让当前程序位置上的静态类型变窄。

### 2. 两个 Union 相等时，会寻找共同可能类型

假设：

```ts
left: string | number
right: string | boolean
```

两个类型集合分别是：

```text
left  = string | number
right = string | boolean
```

它们共同拥有的成员只有：

```text
string
```

所以：

```ts
if (left === right) {
  // left: string
  // right: string
}
```

为什么？

因为如果运行时已经证明：

```text
left === right
```

那么两边必须同时取到某个彼此兼容的值，而当前 Union 中唯一共同可能的类型就是 `string`。

因此 true 分支可以安全调用：

```ts
left.toUpperCase();
right.toLowerCase();
```

### 3. Equality Narrowing 不只是“比较值”

它实际上会结合：

```text
运行时比较结果
+
当前静态 Union 成员
+
控制流路径
```

推导出更精确类型。

例如：

```ts
function handle(status: 'loading' | 'success') {
  if (status === 'success') {
    // status: 'success'
  }
}
```

这里比较的是一个 Literal Value。

true 分支会把：

```text
'loading' | 'success'
```

缩小成：

```text
'success'
```

### 4. `!==` 同样可以排除成员

例如：

```ts
function print(value: string | null) {
  if (value !== null) {
    return value.toUpperCase();
  }

  return 'MISSING';
}
```

true 分支里 `null` 已经被排除，因此 `value` 是：

```text
string
```

### 5. `value == null` 为什么很特殊

JavaScript 中：

```text
null == undefined   // true
```

但是：

```text
'' == null     // false
0 == null      // false
false == null  // false
```

因此：

```ts
if (value == null) {
  // value: null | undefined
}
```

常用于非常精确地表达：

```text
只检查 null / undefined
不要把 '', 0, false 一起过滤
```

这正好和上一节 Truthiness Narrowing 形成对照。

### 6. Truthiness 与 nullish equality 的差异

假设：

```ts
value: string | null | undefined
```

如果写：

```ts
if (!value) {
```

会同时命中：

```text
''
null
undefined
```

如果业务允许合法空字符串，那么这种判断可能过宽。

而：

```ts
if (value == null) {
```

只命中：

```text
null
undefined
```

不会误伤 `''`。

### 7. `==` / `!=` 不是在任何地方都应该替代严格相等

本节并不是建议：

```text
以后全部使用 ==
```

通常工程代码仍然优先：

```ts
===
!==
```

`value == null` 是一个有明确 JavaScript 语义、并且 TypeScript 能理解的常见 nullish idiom。

### 8. `switch` 本质上也能产生 Equality Narrowing

例如：

```ts
switch (status) {
  case 'loading':
    // status: 'loading'
    break;
  case 'success':
    // status: 'success'
    break;
}
```

每一个 `case` 都是在建立一个具体的 equality 条件。

所以 `switch` 与 Discriminated Union 能非常自然地配合。

### 9. Narrowing 不改变运行时值

如果 TypeScript 把：

```text
string | number
```

在某个分支中收窄成：

```text
string
```

并不是编译器做了：

- 自动转换。
- 类型包装。
- 数据复制。
- 运行时 schema 校验。

只是静态分析知道当前路径里有哪些可能值已经被排除了。

## 动手编码：从 0 到 1

### 第 1 步：创建两个有重叠成员的 Union 参数

创建：

```text
kp089-equality-narrowing/src/main.ts
```

先写：

```ts
function compareValues(
  left: string | number,
  right: string | boolean
): string {
  // ...
}
```

这里：

```text
left 可能是 string / number
right 可能是 string / boolean
```

共同成员只有 `string`。

### 第 2 步：使用 `===` 建立相等证据

加入：

```ts
if (left === right) {
  return `same:${left.toUpperCase()}`;
}
```

这一行能通过，是因为 true 分支里 `left` 已经被收窄成 `string`。

### 第 3 步：处理不相等分支

继续：

```ts
return `different:${String(left)}:${String(right)}`;
```

在这里不能假设 `left` 一定是 string，因为 equality 条件并没有成立。

### 第 4 步：增加 nullish equality 案例

再写：

```ts
function normalizeLabel(
  value: string | null | undefined
): string {
  if (value == null) {
    return 'MISSING';
  }

  return value.toUpperCase();
}
```

`if` 之后剩下的路径中：

```text
null / undefined 已排除
value → string
```

### 第 5 步：加入运行样例

加入：

```ts
console.log(compareValues('ready', 'ready'));
console.log(compareValues(200, false));
console.log(normalizeLabel(undefined));
console.log(normalizeLabel('Keyboard'));
```

### 第 6 步：添加 tsconfig

创建：

```text
kp089-equality-narrowing/tsconfig.json
```

内容：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

### 最终源码

[查看 `src/main.ts`](./src/main.ts)

**本节核心代码**：`left === right` 与 `value == null` 两种 Equality Narrowing。

**实验辅助代码**：四个日志调用用于观察不同控制流路径。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp089-equality-narrowing/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp089-equality-narrowing/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp089-equality-narrowing/dist/main.js
```

预期：

```text
same:READY
different:200:false
MISSING
KEYBOARD
```

## 效果验证

完成本节后，应该能回答：

1. 为什么 `left === right` 能把 `string | number` 和 `string | boolean` 都缩小到 string？
2. `value === 'success'` 如何把 Literal Union 收窄到单个 Literal Type？
3. `!== null` 为什么能排除 null？
4. `value == null` 会匹配哪些值？
5. 为什么它不会把空字符串、0、false 当作缺失？
6. Truthiness Narrowing 和 Equality Narrowing 应该如何选择？
7. 为什么 Narrowing 不等于运行时数据转换？
