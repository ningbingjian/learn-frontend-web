# TS-KP001：TypeScript 与 JavaScript 的关系

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用自己的话说明 TypeScript 与 JavaScript 的关系。
2. 知道 TypeScript 在 JavaScript 语法和运行时语义基础上增加了开发期类型能力。
3. 知道常规 TypeScript 工程经过编译后仍然得到 JavaScript。
4. 能亲手完成一次“编写 TS → 类型检查 → 编译 → 运行 JS”的最小流程。
5. 能区分 TypeScript 类型代码和为了观察实验而加入的工程辅助代码。

> **本节核心代码**：`value: number`、`: string` 等 TypeScript 类型标注，以及它们形成的函数类型约定。
>
> **实验辅助代码**：共享 `package.json`、`tsconfig.base.json`、当前知识点的 `tsconfig.json`、npm 命令以及故意制造的错误调用。它们用于完成实验，本节不要求一次掌握全部配置。

## 理论讲解

### 1. JavaScript 负责运行时行为

先看普通 JavaScript：

```js
function formatPrice(value) {
  return `¥${value.toFixed(2)}`;
}

console.log(formatPrice(499));
```

真正运行这段逻辑的是浏览器或 Node.js 的 JavaScript 运行时。

但是下面的调用也可以被写出来：

```js
formatPrice('499');
```

如果数据不符合程序预期，问题可能直到运行时才暴露。

### 2. TypeScript 在 JavaScript 上增加类型信息

同一个函数使用 TypeScript 可以写成：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

新增的类型信息是：

```text
value: number
      ↓
参数应该是 number

: string
      ↓
函数应该返回 string
```

于是正确调用：

```ts
formatPrice(499);
```

能够通过类型检查，而：

```ts
formatPrice('499');
```

会在程序真正运行之前被 TypeScript 发现。

### 3. TypeScript 没有创造另一套业务运行时

先建立最重要的一条链路：

```text
TypeScript 源码
      ↓
类型检查 / 编译
      ↓
JavaScript
      ↓
浏览器 / Node.js
```

例如 TypeScript 源码：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

常规编译后的 JavaScript 大致为：

```js
function formatPrice(value) {
  return `¥${value.toFixed(2)}`;
}
```

`number`、`string` 这些类型标注不再出现在普通 JavaScript 产物里。

具体的类型擦除机制会在 **TS-KP003** 单独学习；本节只建立直觉。

### 4. TypeScript 和 JavaScript 不是二选一

现阶段可以这样理解：

```text
JavaScript
负责语言的运行时行为

TypeScript
建立在 JavaScript 之上
增加静态类型分析和开发工具能力
```

所以学习 TypeScript 不是把 JavaScript 推翻重学，而是在已有 JavaScript 基础上继续增加类型系统能力：

```text
JavaScript 基础
      ↓
TypeScript 类型系统
```

这也是为什么不能跳过 JavaScript 基础直接只学 TypeScript 语法。

### 5. 关于“直接运行 TypeScript”

现代部分运行时能够直接接受某些 TypeScript 文件或可擦除类型语法，但这不会改变本节的核心认识：

```text
TypeScript 类型信息主要服务于开发期分析
运行时行为仍然遵循 JavaScript 语义
```

不同运行方式会在 TS-KP009～TS-KP015 继续学习。

## 动手编码：从 0 到 1

不要先复制最终 [`src/main.ts`](./src/main.ts)。建议按照下面步骤自己创建、修改、检查和运行。

### 第 0 步：明确实验目标

我们只验证三件事：

1. `.ts` 文件可以继续写熟悉的 JavaScript 风格代码。
2. 加入类型以后，错误调用可以在运行前被发现。
3. TypeScript 编译以后可以得到 JavaScript，再交给 Node.js 执行。

最终链路：

```text
src/main.ts
    ↓
TypeScript 类型检查
    ↓
TypeScript 编译
    ↓
dist/main.js
    ↓
Node.js 执行 JavaScript
```

### 第 1 步：准备共享 TypeScript 环境

本模块不再为每个 KP 重复安装一套 TypeScript。先进入 TypeScript 模块根目录：

```bash
cd courses/frontend-architect/stage04-javascript-deep-typescript/stage04-module13-typescript
```

第一次学习本模块时执行：

```bash
npm install
```

模块根目录的 `package.json` 统一提供 TypeScript 依赖，`tsconfig.base.json` 统一提供基础严格模式配置。

**为什么这样做？**

如果 550 个知识点都各自维护一份 `package.json` 和 `node_modules`，会产生大量重复文件和依赖。共享工具链更接近真实工程，也更容易维护。

> 共享工程配置是实验辅助设施，不是 TS-KP001 的核心知识。

### 第 2 步：创建最小 TypeScript 文件

在当前知识点目录创建：

```text
src/
└── main.ts
```

先写：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;
```

**为什么先这样写？**

因为 TypeScript 并不要求每个变量都显式写类型。我们先保留最熟悉的 JavaScript 写法，再观察后面新增的 TypeScript 类型语法。

当前代码本身没有明显的 TypeScript 专属语法。

### 第 3 步：先写 JavaScript 风格的运行逻辑

继续加入：

```ts
console.log(`${productName}: ¥${price}`);
```

当前文件：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;

console.log(`${productName}: ¥${price}`);
```

**本步观察什么？**

`.ts` 文件并不是一种和 JavaScript 完全无关的新语言。大量普通 JavaScript 代码本身就是合法的 TypeScript 输入。

### 第 4 步：第一次加入 TypeScript 类型标注

增加函数：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

再把输出改成：

```ts
console.log(`${productName}: ${formatPrice(price)}`);
```

此时文件为：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;

function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}

console.log(`${productName}: ${formatPrice(price)}`);
```

**本步新增了什么？**

```ts
value: number
```

表示参数约定为 `number`。

```ts
: string
```

表示函数返回值约定为 `string`。

这两处就是本节最核心的 TypeScript 代码。

### 第 5 步：创建当前知识点的最小编译配置

当前知识点仍然保留一个很小的 `tsconfig.json`：

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

它不再重复声明 TypeScript 版本和全部编译选项，而是继承模块根目录的：

```text
tsconfig.base.json
```

这里只需要知道：

```text
extends
  ↓
复用模块基础配置

rootDir
  ↓
当前源码位于 src/

outDir
  ↓
当前 JavaScript 输出到 dist/
```

这些配置后面会专门学习。

### 第 6 步：第一次运行类型检查

仍然在 TypeScript 模块根目录执行：

```bash
npm run check -- ./01-typescript-foundations/kp001-typescript-javascript-relationship/tsconfig.json
```

当前正确代码应该通过检查。

**为什么此时程序还没有运行？**

因为这个命令只要求 TypeScript 分析代码是否合法，并不执行 `formatPrice()` 的业务逻辑。

### 第 7 步：故意制造一个类型错误

临时把：

```ts
formatPrice(price)
```

改成：

```ts
formatPrice('499')
```

再次执行：

```bash
npm run check -- ./01-typescript-foundations/kp001-typescript-javascript-relationship/tsconfig.json
```

应该看到类似含义的错误：

```text
string 不能作为 number 参数传入
```

最重要的是观察错误发生的时间：

```text
还没有真正运行程序
      ↓
TypeScript 已经发现调用不符合类型约定
```

这行错误调用只是实验辅助代码。验证完成后恢复：

```ts
formatPrice(price)
```

### 第 8 步：编译 TypeScript

恢复正确代码后执行：

```bash
npm run build -- ./01-typescript-foundations/kp001-typescript-javascript-relationship/tsconfig.json
```

当前知识点目录会生成：

```text
dist/
└── main.js
```

**为什么要看编译产物？**

因为本节要亲手证明 TypeScript 和 JavaScript 的关系，而不是只记定义。

### 第 9 步：对比 TypeScript 和 JavaScript

TypeScript 中有：

```ts
function formatPrice(value: number): string
```

打开生成的 `dist/main.js`，对应代码中不会再保留这些普通类型标注：

```js
function formatPrice(value)
```

现在可以得到实验结论：

```text
类型信息参与开发期检查
      ↓
常规编译产物是 JavaScript
```

### 第 10 步：真正运行 JavaScript

执行：

```bash
node ./01-typescript-foundations/kp001-typescript-javascript-relationship/dist/main.js
```

预期输出：

```text
Mechanical Keyboard: ¥499.00
```

真正交给 Node.js 执行的是：

```text
dist/main.js
```

而不是 `number`、`string` 这些类型标注本身。

### 第 11 步：完成案例并对照最终源码

到这里，你已经从最小文件亲手完成了：

```text
JavaScript 风格代码
      ↓
加入 TypeScript 类型标注
      ↓
类型检查
      ↓
故意制造类型错误
      ↓
恢复正确代码
      ↓
编译成 JavaScript
      ↓
Node.js 运行 JavaScript
```

最终源码直接查看 [`src/main.ts`](./src/main.ts)，README 不再重复粘贴整份最终文件。

本节最后只需要分清两层：

- **核心代码**：`value: number`、`: string` 以及由它们表达的类型约定。
- **实验辅助代码**：模块共享 `package.json`、`tsconfig.base.json`、本知识点 `tsconfig.json`、npm 命令和故意制造的错误调用。

## 运行案例

进入 TypeScript 模块根目录：

```bash
cd courses/frontend-architect/stage04-javascript-deep-typescript/stage04-module13-typescript
```

首次运行先安装一次依赖：

```bash
npm install
```

类型检查：

```bash
npm run check -- ./01-typescript-foundations/kp001-typescript-javascript-relationship/tsconfig.json
```

编译：

```bash
npm run build -- ./01-typescript-foundations/kp001-typescript-javascript-relationship/tsconfig.json
```

运行生成的 JavaScript：

```bash
node ./01-typescript-foundations/kp001-typescript-javascript-relationship/dist/main.js
```

预期输出：

```text
Mechanical Keyboard: ¥499.00
```

## 效果验证

请亲手完成下面五项验证：

1. `.ts` 文件中的普通 JavaScript 风格代码可以继续存在。
2. `npm run check -- .../tsconfig.json` 能让正确代码通过类型检查。
3. 临时改为 `formatPrice('499')` 后，程序尚未真正运行，TypeScript 就能指出参数类型不匹配。
4. `npm run build -- .../tsconfig.json` 能生成当前知识点的 `dist/main.js`。
5. 打开 `dist/main.js` 后能够确认 `: number`、`: string` 不再存在，并能运行得到 `Mechanical Keyboard: ¥499.00`。

最终你应该能够不背定义，直接解释：

```text
我编写 TypeScript
      ↓
开发阶段进行类型检查
      ↓
常规编译得到 JavaScript
      ↓
JavaScript 运行时执行程序行为
```

并能说明为什么学习 TypeScript 仍然需要扎实的 JavaScript 基础。
