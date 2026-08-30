# TS-KP067：可选参数

> [返回 Chapter 05](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `parameter?: Type` 声明可选参数。
2. 理解可选参数在调用侧可以省略，也可以显式传入 `undefined`。
3. 理解可选参数在函数体内部通常表现为 `Type | undefined`。
4. 在使用可选参数前通过判断、可选链或回退逻辑处理 `undefined`。
5. 区分 `parameter?: T` 与 `parameter: T | undefined` 在参数数量上的关键差别。
6. 理解普通可选参数通常应放在必需参数之后。
7. 知道回调类型中的可选参数还有更特殊的语义，后续 TS-KP076 再深入。

> **本节核心代码**：`title?: string` 以及 `title === undefined` 的安全判断。
>
> **实验辅助代码**：三次不同调用分别验证“省略、提供值、显式 undefined”。

## 理论讲解

### 1. 有些参数不是每次调用都需要

例如用户展示函数：

```text
姓名一定有
职位称号不一定有
```

可以设计：

```ts
function formatUser(
  name: string,
  title?: string
) {
  // ...
}
```

这里 `name` 必需，`title` 可选。

### 2. `?` 放在参数名称后

语法：

```ts
parameter?: Type
```

例如：

```ts
title?: string
```

调用者可以：

```ts
formatUser('Ada');
formatUser('Ada', 'Admin');
```

### 3. 省略参数时，JavaScript 得到 `undefined`

调用：

```js
formatUser('Ada');
```

函数体内部实际：

```text
name  = 'Ada'
title = undefined
```

因此 TypeScript 会把 `title?: string` 在函数体内理解为：

```text
string | undefined
```

不能不检查就直接：

```ts
// title.toUpperCase();
```

### 4. 先处理 `undefined` 再使用

```ts
if (title === undefined) {
  return name;
}

return `${name} (${title})`;
```

提前返回后，剩余代码里的 `title` 已经被收窄成 `string`。

### 5. 可选参数也允许显式传 `undefined`

下面都合法：

```ts
formatUser('Ada');
formatUser('Ada', undefined);
```

两种情况下都表示没有有效的 `title`。

### 6. `title?: string` 不等于 `title: string | undefined`

可选参数：

```ts
function a(title?: string) {}
```

允许：

```ts
a();
a('Admin');
a(undefined);
```

但：

```ts
function b(title: string | undefined) {}
```

参数位置仍然必需，所以：

```ts
// b();
b('Admin');
b(undefined);
```

核心差别：

```text
?:
↓
参数位置本身可以省略

T | undefined
↓
参数位置必须存在
只是值允许 undefined
```

### 7. 可选参数通常放在必需参数后面

常见：

```ts
function fn(
  required: string,
  optional?: number
) {}
```

普通可选参数之后不能再直接放必需参数，否则调用位置会含糊。

默认参数有不同规则，下一节 TS-KP068 单独学习。

### 8. 不要用 `!` 掩盖真实 `undefined`

如果 `title?: string`，直接：

```ts
// title!.toUpperCase()
```

只是绕过检查，没有解决真正的缺失值。基础做法应优先“先判断，再使用”。

### 9. 回调中的可选参数要更加谨慎

后面 TS-KP076 会学习：在回调函数类型里写 `index?` 代表调用方可能真的不传 `index`，不是单纯为了让回调实现少写一个参数。

本节只掌握普通函数可选参数。

---

## 动手编码：从 0 到 1

### 第 0 步：创建目录

```text
kp067-optional-parameters/
├── README.md
├── src/
│   └── main.ts
└── tsconfig.json
```

### 第 1 步：先写两个必需参数

```ts
function formatUser(
  name: string,
  title: string
): string {
  return `${name} (${title})`;
}
```

此时必须传两个参数。

### 第 2 步：把 `title` 改成可选

```ts
function formatUser(
  name: string,
  title?: string
): string {
  // ...
}
```

现在 `formatUser('Ada')` 已经允许调用。

### 第 3 步：处理 `undefined`

```ts
if (title === undefined) {
  return name;
}
```

因为函数体里的 `title` 是 `string | undefined`。

### 第 4 步：处理有 title 的分支

```ts
return `${name} (${title})`;
```

执行到这里时，TypeScript 已经知道 `title` 是 `string`。

### 第 5 步：验证省略参数

```ts
console.log(formatUser('Ada'));
```

预期：

```text
Ada
```

### 第 6 步：验证提供参数

```ts
console.log(formatUser('Ada', 'Admin'));
```

预期：

```text
Ada (Admin)
```

### 第 7 步：显式传 `undefined`

```ts
console.log(formatUser('Ada', undefined));
```

预期：

```text
Ada
```

### 第 8 步：对比 `T | undefined`

临时增加：

```ts
function strictPosition(
  title: string | undefined
): void {}
```

`strictPosition(undefined)` 合法，但 `strictPosition()` 应该报参数数量不足。

### 第 9 步：对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`title?: string` 和使用前的 `undefined` 判断。
- **实验辅助代码**：三种调用方式，用于观察调用侧与函数体内行为。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./05-function-type-system/kp067-optional-parameters/tsconfig.json
npm run build -- ./05-function-type-system/kp067-optional-parameters/tsconfig.json
node ./05-function-type-system/kp067-optional-parameters/dist/main.js
```

预期：

```text
Ada
Ada (Admin)
Ada
```

## 效果验证

你应该能够确认：

- `parameter?: T` 允许调用者省略该参数。
- 可选参数也可以显式接收 `undefined`。
- 函数体内需要把可选参数按 `T | undefined` 处理。
- 收窄后才能安全使用具体类型能力。
- `parameter?: T` 与 `parameter: T | undefined` 的调用参数数量语义不同。
- 普通可选参数通常应位于必需参数之后。
- 回调可选参数还有额外语义，后续章节再深入。
