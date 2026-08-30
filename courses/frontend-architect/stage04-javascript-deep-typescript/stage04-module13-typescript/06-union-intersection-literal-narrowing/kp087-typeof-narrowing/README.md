# TS-KP087：`typeof` Narrowing

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 TypeScript 如何利用 JavaScript 运行时 `typeof` 判断进行类型收窄。
2. 在 `string | number` 等 Union 上使用 `typeof` Type Guard。
3. 理解 `if` 分支和剩余分支中的静态类型为什么不同。
4. 记住 JavaScript `typeof` 的主要返回字符串集合。
5. 理解 `typeof null === 'object'` 这一运行时历史特性对收窄的影响。
6. 区分本节的运行时 `typeof value` 与类型位置的 TypeScript `typeof` Type Operator。
7. 理解 Narrowing 不会改变运行时值，只改变控制流位置上的静态类型视图。

> **本节核心代码**：`typeof value === 'string'` 对 `string | number` 的分支收窄。
>
> **实验辅助代码**：两个调用与日志仅用于观察两个 Union 成员分别进入哪个分支。

## 理论讲解

### 1. Union 只告诉你“有多种可能”

例如：

```ts
function normalizeValue(value: string | number) {
  // ...
}
```

此时 `value` 可能是：

```text
string
或
number
```

所以在没有更多证据之前，不能直接写：

```ts
// value.toUpperCase();
```

因为 `number` 没有 `toUpperCase()`。

同样也不能直接：

```ts
// value.toFixed(2);
```

因为 `string` 没有 `toFixed()`。

### 2. JavaScript 运行时已经有 `typeof`

JavaScript 可以写：

```js
typeof value
```

常见结果包括：

```text
string
number
bigint
boolean
symbol
undefined
object
function
```

TypeScript 知道这些运行时结果与静态类型之间的关系。

因此它可以把：

```ts
if (typeof value === 'string') {
  // ...
}
```

识别为 Type Guard。

### 3. `typeof` 检查会让 TypeScript 缩小当前类型

原始类型：

```text
string | number
```

进入：

```ts
if (typeof value === 'string') {
```

之后，true 分支里：

```text
value → string
```

于是可以安全调用：

```ts
value.trim();
value.toUpperCase();
```

### 4. 剩余分支也会被自动收窄

如果 Union 只有：

```text
string | number
```

并且 `if` 已经证明：

```text
true branch = string
```

那么 `if` 之后剩下的路径就是：

```text
number
```

因此最终案例可以直接：

```ts
return value.toFixed(2);
```

这里不需要再写一次：

```ts
if (typeof value === 'number')
```

因为控制流已经排除了 `string`。

### 5. Narrowing 是“某个程序位置上的类型变窄”

需要建立一个非常重要的直觉：

```text
声明类型
string | number
```

并没有被永久改写。

只是：

```text
在 string 分支
TypeScript 当前把它视为 string

在剩余分支
TypeScript 当前把它视为 number
```

也就是 TypeScript 会根据控制流路径动态维护更精确的静态类型。

### 6. `typeof null === 'object'` 是必须知道的边界

JavaScript 中：

```js
typeof null === 'object'
```

结果是 `true`。

因此如果有：

```ts
value: string[] | null
```

只检查：

```ts
if (typeof value === 'object') {
```

TypeScript 不能把 `value` 简单收窄成 `string[]`。

因为这个分支在运行时也可能进入：

```text
null
```

所以可能得到：

```text
string[] | null
```

这是 `typeof` Narrowing 必须尊重 JavaScript 真实运行时语义的典型例子。

### 7. `typeof` 不能精确识别所有复杂对象

例如数组：

```js
typeof []
```

得到：

```text
object
```

普通对象：

```js
typeof {}
```

同样得到：

```text
object
```

因此数组更常使用：

```ts
Array.isArray(value)
```

而 class 实例后面会学习：

```ts
instanceof
```

不要把 `typeof` 当作万能运行时类型反射工具。

### 8. 本节的 `typeof` 和类型位置 `typeof` 不是同一用途

本节写的是：

```ts
if (typeof value === 'string')
```

这是 JavaScript 运行时 `typeof`，TypeScript 利用结果做 Narrowing。

TypeScript 还允许在类型位置写：

```ts
type ConfigType = typeof config;
```

这是 `typeof` Type Operator，用来取得一个值的静态类型。

两者拼写一样，但目的不同。

本节只讲：

```text
runtime typeof
+
control flow
→ narrowing
```

### 9. `typeof` Type Guard 不会转换值

判断：

```ts
if (typeof value === 'string')
```

不会把 number 转成 string，也不会做 schema validation。

它只是在运行时执行一个普通布尔判断，同时让 TypeScript 在编译期更新当前分支的类型信息。

## 动手编码：从 0 到 1

### 第 1 步：定义 Union 输入

创建：

```text
kp087-typeof-narrowing/src/main.ts
```

写：

```ts
function normalizeValue(value: string | number): string {
  // ...
}
```

### 第 2 步：增加 `typeof` Type Guard

加入：

```ts
if (typeof value === 'string') {
  return value.trim().toUpperCase();
}
```

此时这个分支中的 `value` 已经被收窄成 `string`。

### 第 3 步：处理剩余的 number 分支

继续：

```ts
return value.toFixed(2);
```

因为 `string` 已被前面的条件排除，此处 `value` 是 `number`。

### 第 4 步：测试两个成员

加入：

```ts
console.log(normalizeValue(' keyboard '));
console.log(normalizeValue(499));
```

预期：

```text
KEYBOARD
499.00
```

### 第 5 步：添加 tsconfig

创建：

```text
kp087-typeof-narrowing/tsconfig.json
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

**本节核心代码**：`typeof value === 'string'` 以及剩余分支的自动收窄。

**实验辅助代码**：两个日志调用用于让 string / number 分别经过不同路径。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp087-typeof-narrowing/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp087-typeof-narrowing/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp087-typeof-narrowing/dist/main.js
```

预期：

```text
KEYBOARD
499.00
```

## 效果验证

完成本节后，应该能回答：

1. 为什么 `typeof value === 'string'` 能让 TypeScript 把 Union 缩小成 `string`？
2. 为什么 `if` 后的剩余路径能自动得到 `number`？
3. `typeof` 常见会返回哪些字符串？
4. 为什么 `typeof null === 'object'` 会影响 Narrowing？
5. 为什么 `typeof` 不适合区分数组和普通对象？
6. 运行时 `typeof value` 和类型位置 `typeof config` 有什么区别？
7. Narrowing 会不会修改变量真正的 JavaScript 值？
