# TS-KP025：`unknown`

> [返回 Chapter 02](../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 `unknown` 为什么可以接收任意值。
2. 说明 `unknown` 与 `any` 的核心差异。
3. 理解为什么不能直接访问 `unknown` 的属性或调用它。
4. 使用 `typeof`、非空判断和 `in` 对 `unknown` 做运行时收窄。
5. 在 `JSON.parse()`、外部输入等不可信边界上优先使用 `unknown`。

> **本节核心代码**：`unknown`、运行时检查和类型收窄。
>
> **实验辅助代码**：`JSON.parse()` 和 `console.log()` 只是为了模拟不可信输入并观察结果。

## 理论讲解

### 1. `unknown` 可以接收任意值

下面这些赋值都合法：

```ts
let value: unknown;

value = 'hello';
value = 42;
value = { name: 'Ada' };
```

因为 `unknown` 表示：

```text
这个值确实存在
但我现在不知道它具体是什么类型
```

### 2. `unknown` 和 `any` 的区别

上一节的 `any` 可以直接：

```ts
value.trim();
value.notExists.deep.call();
```

编译器基本不阻止。

但如果变量是：

```ts
value: unknown
```

那么下面代码不能直接通过：

```ts
// value.trim();
// value.name;
```

TypeScript 会要求你先证明这个值确实具备对应能力。

可以这样理解：

```text
any
我不知道是什么，但先随便用

unknown
我不知道是什么，所以先检查再用
```

### 3. `unknown` 很适合不可信边界

例如：

```ts
const data: unknown = JSON.parse(text);
```

JSON 字符串在运行前可能来自：

- HTTP 响应。
- localStorage。
- 配置文件。
- 用户输入。
- 第三方系统。

因此把结果直接当成业务类型并不可靠。

### 4. 收窄以后才能安全使用

例如：

```ts
if (typeof value === 'string') {
  console.log(value.toUpperCase());
}
```

进入分支以后，TypeScript 知道：

```text
value: unknown
      ↓ typeof 检查
value: string
```

对象同样需要逐步验证。

### 5. `unknown` 是更安全的顶层类型

从赋值关系上看，大量值都可以进入 `unknown`，但 `unknown` 不能随意流入具体业务类型。

这会迫使代码在边界上显式建立信任。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要模拟一个真实场景：

```text
JSON 字符串
   ↓
JSON.parse()
   ↓
unknown
   ↓
运行时检查
   ↓
安全读取 name
```

### 第 1 步：创建解析函数

创建 `src/main.ts`：

```ts
function parseProfile(text: string): unknown {
  return JSON.parse(text);
}
```

这里故意返回 `unknown`。

**为什么不是直接返回某个 Profile 类型？**

因为仅仅执行 `JSON.parse()` 并不能证明输入真的满足 Profile 结构。

### 第 2 步：声明接收 `unknown` 的函数

继续写：

```ts
function printProfileName(value: unknown): void {
}
```

此时如果直接写：

```ts
// console.log(value.name);
```

应该出现类型错误。

### 第 3 步：先判断是不是对象

加入：

```ts
if (typeof value === 'object' && value !== null) {
}
```

为什么还要判断 `value !== null`？

因为 JavaScript 历史行为中：

```text
typeof null === "object"
```

### 第 4 步：判断 `name` 是否存在

继续扩展：

```ts
'name' in value
```

现在我们已经证明对象中存在 `name` 这个键。

### 第 5 步：继续验证 `name` 的真实类型

加入：

```ts
typeof value.name === 'string'
```

完整条件变成：

```ts
if (
  typeof value === 'object' &&
  value !== null &&
  'name' in value &&
  typeof value.name === 'string'
) {
  console.log(value.name.toUpperCase());
}
```

此时 `value.name` 已经安全收窄为字符串。

### 第 6 步：增加失败分支

加入：

```ts
console.log('invalid profile');
```

完整函数对不满足结构的数据不会直接调用字符串方法。

### 第 7 步：传入两组运行时数据

```ts
printProfileName(parseProfile('{"name":"Ada"}'));
printProfileName(parseProfile('42'));
```

第一组满足要求，第二组是数字。

### 第 8 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **本节核心代码**：`unknown` + `typeof` + 非空判断 + `in` + 属性类型检查。
- **实验辅助代码**：两段 JSON 输入用于制造合法和非法运行时数据。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./02-basic-types-inference/kp025-unknown/tsconfig.json
npm run build -- ./02-basic-types-inference/kp025-unknown/tsconfig.json
node ./02-basic-types-inference/kp025-unknown/dist/main.js
```

预期输出：

```text
ADA
invalid profile
```

## 效果验证

你应该能够确认：

- 任意值都可以进入 `unknown`。
- `unknown` 不能像 `any` 一样直接访问任意属性。
- 经过运行时判断后，TypeScript 会逐步收窄类型。
- `JSON.parse()` 这类不可信边界适合先进入 `unknown`。
- `unknown` 的核心价值不是“更麻烦”，而是强迫程序先建立信任再使用数据。
