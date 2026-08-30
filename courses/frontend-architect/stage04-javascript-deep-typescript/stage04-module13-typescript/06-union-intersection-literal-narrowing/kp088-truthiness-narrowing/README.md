# TS-KP088：Truthy / Falsy Narrowing

> [返回 Chapter 06](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 JavaScript Truthy / Falsy 规则如何影响 TypeScript Narrowing。
2. 使用 `if (value)` / `if (!value)` 对可能为空的值进行控制流收窄。
3. 记住 JavaScript 常见 falsy 值，而不是把 truthiness 简化成“只有 null / undefined”。
4. 理解空字符串、0、false 可能是合法业务值，因此 Truthiness Guard 可能产生业务语义损失。
5. 在 `string | null | undefined` 上理解 truthy 分支与 falsy 分支的差异。
6. 知道需要只排除 nullish 值时，应使用更精确的 Equality Narrowing；具体规则留到 TS-KP089。
7. 理解 Truthiness Narrowing 是控制流分析，不是数据清洗或默认值机制。

> **本节核心代码**：`if (!title)` 对 `string | null | undefined` 的 Truthiness Narrowing，以及空字符串进入 falsy 分支的实验。
>
> **实验辅助代码**：三个 `console.log()` 用于分别观察普通字符串、空字符串和 `null`。

## 理论讲解

### 1. JavaScript 条件表达式不要求一定是 boolean

JavaScript 可以直接写：

```js
if (value) {
  // ...
}
```

运行时会先把 `value` 按真值规则解释成：

```text
truthy
或
falsy
```

TypeScript 在分析这段 JavaScript 控制流时，也会利用这些规则做 Narrowing。

### 2. 常见 falsy 值必须记住

JavaScript 中常见 falsy 值包括：

```text
false
0
-0
0n
NaN
''
null
undefined
```

其余大量值都是 truthy，例如：

```text
'hello'
1
-1
[]
{}
function () {}
```

注意：

```text
[]
{}
```

即使“看起来是空的”，仍然是 truthy。

### 3. Truthiness Narrowing 可以帮助排除 nullish 值

例如：

```ts
function displayTitle(title: string | null | undefined) {
  if (title) {
    title.toUpperCase();
  }
}
```

true 分支里，TypeScript 知道当前 `title` 不可能是：

```text
null
undefined
```

因此可以把它作为 `string` 使用。

### 4. 但 Truthiness 不只会排除 null / undefined

这是本节最重要的边界。

如果：

```ts
title = ''
```

那么运行时：

```js
Boolean('') === false
```

因此空字符串也不会进入：

```ts
if (title) {
```

true 分支。

所以：

```text
Truthiness Guard
不是
Nullish Guard
```

### 5. `if (!title)` 会把多种业务情况合在一起

最终案例：

```ts
if (!title) {
  return '(empty or missing)';
}
```

这里会同时处理：

```text
title = ''
title = null
title = undefined
```

这是不是正确，要看业务语义。

如果产品规定：

```text
空字符串
和
缺失标题
就是同一回事
```

那么这样写很方便。

如果业务规定：

```text
'' 是合法输入
null / undefined 才表示缺失
```

那么 Truthiness 判断就过宽了。

### 6. Truthiness Narrowing 需要先想清楚“0 / false 是否有意义”

例如：

```ts
function handleCount(count: number | undefined) {
  if (!count) {
    // ...
  }
}
```

这里 `count = 0` 也会进入分支。

但是数量 0 在很多业务里完全合法。

同样：

```ts
function handleEnabled(enabled: boolean | undefined) {
  if (!enabled) {
    // ...
  }
}
```

这里会同时处理：

```text
false
undefined
```

但 `false` 通常是一个非常明确的业务状态。

所以 Truthiness 判断前应该先问：

> falsy 的 primitive 值是不是我的合法业务值？

### 7. true 分支和 false 分支的精度并不总是对称

对于：

```ts
title: string | null | undefined
```

进入：

```ts
if (title) {
```

true 分支时，`title` 可以安全作为 `string` 使用。

但 falsy 分支里不应该简单理解成：

```text
null | undefined
```

因为：

```text
''
```

也是一个可能的 falsy string。

这就是为什么空字符串实验非常重要。

### 8. 如果只想排除 nullish，下一节用 Equality Narrowing

如果真正想表达：

```text
只要不是 null / undefined 就继续
哪怕是 '' / 0 / false 也保留
```

应该使用更精确的判断。

例如后续会学习：

```ts
value != null
```

或者明确比较：

```ts
value !== null && value !== undefined
```

这属于 TS-KP089 Equality Narrowing 的范围，本节先建立问题意识。

### 9. `Boolean(value)` 与 `!!value`

JavaScript 中：

```js
Boolean(value)
!!value
```

都可以把值转换成真正的布尔结果。

但本节重点不是“如何把值转换为 boolean”，而是：

```text
TypeScript 如何根据 truthy / falsy 控制流更新类型
```

不要把 Narrowing 和布尔类型转换混成一个知识点。

### 10. Truthiness Narrowing 不会修改原始值

例如：

```ts
if (!title) {
```

TypeScript 不会自动：

- 把 `null` 改成空字符串。
- 给字段写默认值。
- 删除无效数据。
- 运行 schema validation。

它只是利用 JavaScript 真值判断，让不同控制流位置获得更精确的静态类型信息。

## 动手编码：从 0 到 1

### 第 1 步：创建可能缺失的标题类型

创建：

```text
kp088-truthiness-narrowing/src/main.ts
```

写：

```ts
function displayTitle(title: string | null | undefined): string {
  // ...
}
```

### 第 2 步：增加 falsy Guard

加入：

```ts
if (!title) {
  return '(empty or missing)';
}
```

这个分支会处理多种 falsy 情况。

### 第 3 步：在剩余路径使用 string 能力

继续：

```ts
return title.trim().toUpperCase();
```

运行能到这里时，`title` 已被 TypeScript 收窄为 `string`。

### 第 4 步：先测试普通字符串

加入：

```ts
console.log(displayTitle('Keyboard'));
```

预期：

```text
KEYBOARD
```

### 第 5 步：刻意测试空字符串

加入：

```ts
console.log(displayTitle(''));
```

预期：

```text
(empty or missing)
```

这一行非常重要，它证明：

```text
Truthiness Guard
不只是处理 null / undefined
```

### 第 6 步：测试 null

加入：

```ts
console.log(displayTitle(null));
```

同样输出：

```text
(empty or missing)
```

### 第 7 步：添加 tsconfig

创建：

```text
kp088-truthiness-narrowing/tsconfig.json
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

**本节核心代码**：`if (!title)` 和其后的 `string` 收窄。

**实验辅助代码**：普通字符串、空字符串、`null` 三个测试值用于展示 Truthiness 的业务边界。

## 运行案例

在 TypeScript 模块目录执行：

```bash
npm run check -- ./06-union-intersection-literal-narrowing/kp088-truthiness-narrowing/tsconfig.json
npm run build -- ./06-union-intersection-literal-narrowing/kp088-truthiness-narrowing/tsconfig.json
node ./06-union-intersection-literal-narrowing/kp088-truthiness-narrowing/dist/main.js
```

预期：

```text
KEYBOARD
(empty or missing)
(empty or missing)
```

## 效果验证

完成本节后，应该能回答：

1. JavaScript 中哪些常见值是 falsy？
2. 为什么 `if (title)` 能让 TypeScript 在 true 分支把值作为 string 使用？
3. 为什么空字符串也会被 `if (!title)` 捕获？
4. 为什么 `if (!count)` 可能错误地把合法的 0 当成缺失？
5. 为什么 `if (!enabled)` 会把 false 和 undefined 合在一起？
6. Truthiness Guard 和 Nullish Guard 有什么区别？
7. 如果只想排除 null / undefined，为什么应该使用更精确的 Equality Narrowing？
