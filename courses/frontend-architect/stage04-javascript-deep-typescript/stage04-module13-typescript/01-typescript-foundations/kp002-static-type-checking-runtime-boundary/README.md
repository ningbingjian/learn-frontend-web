# TS-KP002：静态类型检查与 JavaScript 运行时的边界

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释“静态类型检查”为什么发生在程序真正执行之前。
2. 区分 TypeScript 编译器负责的检查与 JavaScript 运行时负责的行为。
3. 理解 TypeScript 只能依据它掌握的静态类型信息做判断。
4. 亲手验证“源码中的明显类型错误会被拦住，但运行时数据仍可能制造异常”。
5. 知道外部数据验证属于运行时边界问题，后续会在 TS-KP004 专门处理。

> **本节核心代码**：函数参数和返回值类型形成的静态约束，例如 `count: number` 与 `: string`。
>
> **实验辅助代码**：`JSON.parse()`、`try/catch` 和故意制造的错误调用，只用于把静态阶段和运行阶段放到同一个实验里观察。

## 理论讲解

### 1. 什么叫“静态”检查

“静态”可以先理解成：**不需要真正运行程序，就先分析代码。**

例如：

```ts
function formatCount(count: number): string {
  return count.toFixed(0);
}

formatCount('2');
```

TypeScript 不需要等 Node.js 真正执行到 `formatCount('2')` 才知道有问题。编译器根据函数签名就能发现：

```text
参数要求 number
      ↓
实际传入 string
      ↓
类型检查失败
```

### 2. JavaScript 运行时关心的是“真实值”

如果类型检查已经结束，真正运行 JavaScript 时，运行时面对的是实际的值和 JavaScript 语义。

例如运行时拿到字符串：

```js
'2'
```

它不会因为 TypeScript 源码里曾经写过 `number`，就自动把这个字符串变成数字。

所以必须把两层分开：

```text
TypeScript 静态阶段
分析“代码描述的类型关系”

JavaScript 运行阶段
处理“此刻真实存在的值”
```

### 3. 类型检查不是一个永久运行的保护罩

TypeScript 能很好地检查它看得见的类型关系：

```ts
formatCount('2');
```

但是现实程序的数据可能来自：

- HTTP 响应。
- `JSON.parse()`。
- localStorage。
- 用户输入。
- 第三方 JavaScript。
- 数据库或消息系统。

这些数据到达运行时边界时，静态类型系统不会凭空确认它们的真实内容。

本节只先建立边界直觉；“如何验证这些数据”会在 TS-KP004 专门学习。

### 4. 一个实用的心智模型

```text
你写 TypeScript
      ↓
编译器依据静态信息检查
      ↓
生成 / 交给 JavaScript 运行
      ↓
运行时面对真实值
      ↓
真实值仍可能触发 JavaScript 异常
```

不要把“类型检查通过”理解成“任何运行时情况都绝不可能出错”。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

本节要做两组对照：

1. 源码里直接传错类型，TypeScript 在运行前就报错。
2. 运行时拿到一个类型信息不可靠的值，类型检查可能无法替你确认它的真实内容。

### 第 1 步：创建一个有明确类型契约的函数

新建 `src/main.ts`：

```ts
function formatCount(count: number): string {
  return `count=${count.toFixed(0)}`;
}
```

这里的契约非常清楚：

```text
输入 number
    ↓
formatCount
    ↓
输出 string
```

### 第 2 步：加入一个正确调用

继续写：

```ts
console.log(formatCount(2));
```

此时 TypeScript 能确认：数字 `2` 满足 `number` 参数要求。

### 第 3 步：第一次执行静态检查

本知识点复用模块级 TypeScript 工具链。若还没有安装依赖，先在 `stage04-module13-typescript` 根目录执行一次：

```bash
npm install
```

然后执行：

```bash
npm run check -- ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/tsconfig.json
```

当前代码应该通过检查。

### 第 4 步：故意写出一个静态可见的错误

临时增加：

```ts
formatCount('2');
```

再次执行类型检查，应看到“`string` 不能作为 `number` 参数传入”这一类错误。

此时程序还没有真正运行：

```text
错误调用写在源码中
      ↓
TypeScript 看得见 string
      ↓
静态检查直接失败
```

观察完以后删除这行错误代码。

### 第 5 步：引入一个运行时值

现在加入：

```ts
const runtimeValue = JSON.parse('"2"');
```

`JSON.parse()` 产生的是运行时数据。这里故意让 JSON 中保存字符串 `"2"`。

继续写：

```ts
try {
  console.log(formatCount(runtimeValue));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`runtime error: ${message}`);
}
```

再次执行：

```bash
npm run check -- ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/tsconfig.json
```

这次静态检查可以通过。

> 为什么会这样，会在 TS-KP004 从“外部数据验证”的角度继续拆解。这里先观察边界即可。

### 第 6 步：编译并真正运行

执行：

```bash
npm run build -- ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/tsconfig.json
```

再运行：

```bash
node ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/dist/main.js
```

你应该先看到：

```text
count=2
```

随后看到类似：

```text
runtime error: count.toFixed is not a function
```

因为运行时真实拿到的是字符串，而不是数字。

### 第 7 步：完成案例并对照最终源码

最终代码应与 [`src/main.ts`](./src/main.ts) 一致。

本节只需要牢牢记住两层：

- **核心代码**：`count: number`、`: string` 形成的静态类型契约，以及错误调用在运行前被发现的过程。
- **实验辅助代码**：`JSON.parse()` 人为制造运行时边界，`try/catch` 只是为了让异常可见并让案例继续输出。

最终源码直接查看 [`src/main.ts`](./src/main.ts)，README 不重复整份源码。

## 运行案例

在 TypeScript 模块根目录执行：

```bash
npm run check -- ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/tsconfig.json
npm run build -- ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/tsconfig.json
node ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/dist/main.js
```

练习入口：[`exercise/README.md`](./exercise/README.md)。

## 效果验证

完成后应该能解释下面三件事：

1. 为什么直接写 `formatCount('2')` 会在程序运行前失败。
2. 为什么 `runtimeValue` 的真实值仍然可能在 JavaScript 运行时制造异常。
3. 为什么“静态类型检查通过”不能被理解为“所有运行时输入都已经被验证”。

最终应形成这条边界：

```text
静态类型信息
    ↓ TypeScript 检查
代码关系是否合理

运行时真实值
    ↓ JavaScript 执行
决定程序此刻真正发生什么
```
