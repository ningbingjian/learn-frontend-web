# TS-KP001：TypeScript 与 JavaScript 的关系

> [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [完整源码讲解](#完整源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [课后练习](#课后练习)

## 学习目标

学完本节后，你应该能够：

1. 用自己的话说明 TypeScript 与 JavaScript 的关系。
2. 知道 TypeScript 在 JavaScript 语法基础上增加了类型语法和静态检查能力。
3. 知道常规 TypeScript 工程最终仍然会得到 JavaScript。
4. 能亲手完成一次“编写 TS → 类型检查 → 编译 → 运行 JS”的最小流程。
5. 能区分本节核心代码和实验辅助代码。

> **本节核心代码**：TypeScript 类型标注，例如 `value: number` 与函数返回值 `: string`。
>
> **实验辅助代码**：`package.json`、`tsconfig.json`、npm scripts、故意写错的调用。它们用于观察现象，本节不要求一次掌握全部配置。

---

## 理论讲解

### 1. JavaScript 负责真正的运行时行为

先看普通 JavaScript：

```js
function formatPrice(value) {
  return `¥${value.toFixed(2)}`;
}

console.log(formatPrice(499));
```

浏览器或 Node.js 真正执行的是 JavaScript 运行时逻辑。

但是下面的调用也可以被写出来：

```js
formatPrice('499');
```

如果传入的数据不符合程序预期，问题可能直到运行时才暴露。

### 2. TypeScript 在 JavaScript 上增加类型信息

同一个函数使用 TypeScript 可以写成：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

新增的部分是：

```text
value: number
      ↓
参数应该是 number

:string
      ↓
函数应该返回 string
```

于是：

```ts
formatPrice(499);
```

符合类型要求，而：

```ts
formatPrice('499');
```

会在类型检查阶段被发现。

### 3. TypeScript 并没有创造另一套运行时

先记住最基础的一条链路：

```text
TypeScript 源码
      ↓
类型检查 / 编译处理
      ↓
JavaScript
      ↓
浏览器 / Node.js
```

例如 TypeScript：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

常规编译后得到的 JavaScript 大致是：

```js
function formatPrice(value) {
  return `¥${value.toFixed(2)}`;
}
```

类型标注已经不在普通 JavaScript 产物中。

类型擦除会在 **TS-KP003** 专门学习；本节先建立直觉即可。

### 4. TypeScript 与 JavaScript 的关系

现阶段先记住：

```text
JavaScript
负责运行时行为

TypeScript
建立在 JavaScript 生态和语义基础上
并增加开发期类型能力
```

所以学习 TypeScript 并不是把 JavaScript 推翻重学。

正确关系更像：

```text
JavaScript 基础
      ↓
TypeScript 类型系统
```

这也是为什么学习 TypeScript 不能跳过 JavaScript。

### 5. 关于“直接运行 TypeScript”

现代部分运行时可以直接接受某些 TypeScript 文件或可擦除类型语法。

但这不会改变本节的核心认识：

```text
TypeScript 类型信息主要服务于开发期分析
运行时行为仍然遵循 JavaScript 语义
```

具体运行方式会在后面的安装、编译与执行章节学习。

---

## 动手编码：从 0 到 1

不要先复制最终 `src/main.ts`。建议从空目录开始跟着写。

### 第 0 步：明确实验目标

我们只验证三件事：

1. TypeScript 能继续写熟悉的 JavaScript 风格代码。
2. 加入类型以后，错误调用能在运行前被发现。
3. TypeScript 编译以后得到的是 JavaScript。

最终链路：

```text
src/main.ts
    ↓
npm run check
    ↓
npm run build
    ↓
dist/main.js
    ↓
npm run start
```

### 第 1 步：创建最小文件

创建：

```text
src/
└── main.ts
```

先写：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;
```

这段代码看起来和普通 JavaScript 一样。

**为什么这样写？**

因为 TypeScript 不是要求所有代码都写显式类型。这里先保留熟悉的 JavaScript 写法，让后面新增的类型语法更容易观察。

### 第 2 步：先写运行行为

继续加入：

```ts
console.log(`${productName}: ¥${price}`);
```

当前代码：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;

console.log(`${productName}: ¥${price}`);
```

到这里，我们还没有使用最明显的 TypeScript 专属类型语法。

### 第 3 步：加入类型标注

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

现在完整代码是：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;

function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}

console.log(`${productName}: ${formatPrice(price)}`);
```

**本步要观察什么？**

```ts
value: number
```

和：

```ts
: string
```

就是我们第一次显式加入的 TypeScript 类型信息。

### 第 4 步：加入最小工程配置

创建 `package.json`：

```json
{
  "name": "ts-kp001-typescript-javascript-relationship",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "check": "tsc --noEmit",
    "build": "tsc",
    "start": "node dist/main.js"
  },
  "devDependencies": {
    "typescript": "7.0.2"
  }
}
```

再创建 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "strict": true,
    "rootDir": "src",
    "outDir": "dist",
    "noEmitOnError": true
  },
  "include": ["src/**/*.ts"]
}
```

本节只需要知道：

```text
strict
  ↓
开启严格类型检查

outDir
  ↓
JavaScript 输出到 dist/

noEmitOnError
  ↓
存在类型错误时不生成产物
```

这些配置后面会单独学习。

### 第 5 步：第一次类型检查

安装依赖：

```bash
npm install
```

运行：

```bash
npm run check
```

当前代码应该通过检查。

> 安装 TypeScript 和 `tsc` 命令会在 TS-KP009、TS-KP010 详细学习，这里把它们当作实验工具即可。

### 第 6 步：故意制造类型错误

暂时把：

```ts
formatPrice(price)
```

改成：

```ts
formatPrice('499')
```

再次执行：

```bash
npm run check
```

应该看到类似含义的错误：

```text
string 不能作为 number 参数传入
```

最重要的是观察错误出现的时间：

```text
程序还没有真正运行
      ↓
TypeScript 已经发现类型不匹配
```

这行错误代码只是**实验辅助代码**，观察完成后恢复 `formatPrice(price)`。

### 第 7 步：编译并查看 JavaScript

恢复正确代码后运行：

```bash
npm run build
```

会生成：

```text
dist/
└── main.js
```

打开 `dist/main.js`，重点比较：

TypeScript：

```ts
function formatPrice(value: number): string
```

JavaScript：

```js
function formatPrice(value)
```

你已经亲手观察到：

```text
类型信息参与开发期检查
      ↓
常规编译产物仍是 JavaScript
```

### 第 8 步：运行最终 JavaScript

执行：

```bash
npm run start
```

预期结果：

```text
Mechanical Keyboard: ¥499.00
```

本案例真正被 Node.js 执行的是：

```text
dist/main.js
```

到这里，TS-KP001 的核心实验完成。

---

## 完整源码讲解

最终 [`src/main.ts`](./src/main.ts)：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;

function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}

const label = `${productName}: ${formatPrice(price)}`;

console.log(label);
```

### 1. JavaScript 风格代码

```ts
const productName = 'Mechanical Keyboard';
const price = 499;
```

没有显式类型标注。TypeScript 可以根据初始化值进行类型推断，后续章节会详细学习。

### 2. 本节核心 TypeScript 代码

```ts
function formatPrice(value: number): string {
```

它表达了函数的类型约定：

```text
输入 number
   ↓
formatPrice
   ↓
输出 string
```

### 3. 真正的运行时逻辑

```ts
return `¥${value.toFixed(2)}`;
```

数字格式化和字符串拼接仍然属于 JavaScript 的运行时行为。

### 4. 类型检查发生在调用关系上

```ts
formatPrice(price)
```

TypeScript 会检查 `price` 能否作为 `number` 参数传入；真正运行时执行的是编译后的 JavaScript。

---

## 运行案例

进入当前目录：

```bash
cd courses/frontend-architect/stage04-javascript-deep-typescript/stage04-module13-typescript/01-typescript-foundations/kp001-typescript-javascript-relationship
```

依次执行：

```bash
npm install
npm run check
npm run build
npm run start
```

预期输出：

```text
Mechanical Keyboard: ¥499.00
```

---

## 效果验证

请亲手完成四项验证：

1. `npm run check`：正确代码无类型错误。
2. 临时改为 `formatPrice('499')`：类型检查应失败。
3. `npm run build`：确认生成 `dist/main.js`。
4. 打开 `dist/main.js`：确认 `: number`、`: string` 不再存在，然后 `npm run start` 得到正确输出。

如果四项都能解释清楚，就不是“看懂了”，而是真的完成了本节实验。

---

## 课后练习

练习入口：[`exercise/README.md`](./exercise/README.md)。

你需要给订单金额函数补充类型，并验证错误的字符串数量能够在运行前被 TypeScript 发现。

参考答案：[`solution/main.ts`](./solution/main.ts)。

建议先独立完成，再查看答案。

### 本节验收标准

你应该能够不背定义、直接解释下面这条链路：

```text
我写 TypeScript
      ↓
开发阶段进行类型检查
      ↓
常规编译得到 JavaScript
      ↓
JavaScript 运行时执行程序行为
```

并能够自己写出：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

再通过“错误调用 → 类型检查 → 查看编译产物 → 运行 JavaScript”证明自己的理解。
