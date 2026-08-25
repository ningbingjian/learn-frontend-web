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
2. 知道 TypeScript 在 JavaScript 语法之上增加了类型语法与静态检查能力。
3. 知道常规 TypeScript 工程最终仍然会得到可运行的 JavaScript。
4. 能亲手完成一次“编写 TypeScript → 类型检查 → 编译 → 运行 JavaScript”的最小流程。
5. 能区分本节真正要学习的 TypeScript 代码和为了验证现象而存在的工程辅助代码。

> **本节核心代码**是 TypeScript 类型标注，例如 `value: number` 与 `: string`。
>
> `package.json`、`tsconfig.json`、npm scripts、故意写错的调用等内容属于**实验辅助代码**。它们用于帮助我们观察 TypeScript 与 JavaScript 的关系，本节不要求一次掌握全部工程配置。

---

# 理论讲解

## 1. 先从 JavaScript 开始理解

JavaScript 是实际运行在浏览器、Node.js 等 JavaScript 运行环境中的语言。

例如：

```js
function formatPrice(value) {
  return `¥${value.toFixed(2)}`;
}

console.log(formatPrice(499));
```

运行时，JavaScript 会真正执行这些代码。

问题是：

```js
formatPrice('499');
```

从 JavaScript 语法角度看，这段代码可以被写出来。

但运行到：

```js
value.toFixed(2)
```

时，传入值如果不符合程序预期，就可能产生运行时错误。

JavaScript 本身不会要求你提前写出：

```text
value 必须是什么类型
```

这正是 TypeScript 希望在开发阶段帮助我们处理的一类问题。

## 2. TypeScript 在 JavaScript 上增加了什么

同一个函数使用 TypeScript 可以写成：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

这里比 JavaScript 多出了：

```ts
value: number
```

以及：

```ts
: string
```

它们分别表达：

```text
value 参数
   ↓
应该是 number

函数返回值
   ↓
应该是 string
```

于是下面的调用：

```ts
formatPrice(499);
```

符合类型要求。

而：

```ts
formatPrice('499');
```

会在类型检查阶段得到错误提示。

## 3. TypeScript 不是另一套独立运行时

理解这一点非常重要。

在常规 TypeScript 工程中，可以把过程先记成：

```text
TypeScript 源码
      ↓
类型检查 / 编译处理
      ↓
JavaScript
      ↓
浏览器 / Node.js 等运行环境
```

例如我们写：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

编译得到的 JavaScript 大致是：

```js
function formatPrice(value) {
  return `¥${value.toFixed(2)}`;
}
```

你会发现：

```text
:number
:string
```

这些 TypeScript 类型语法不再出现在普通 JavaScript 产物里。

类型擦除的完整原理会在后面的 **TS-KP003** 专门学习；本节只需要先建立这个直觉。

## 4. TypeScript 与 JavaScript 的核心关系

现阶段可以先记住四句话：

```text
JavaScript 负责运行时行为

TypeScript 建立在 JavaScript 语言生态之上

TypeScript 增加静态类型语法和开发期检查能力

常规 TypeScript 工程最终仍然生成或执行 JavaScript 语义
```

TypeScript 官方也将其描述为“JavaScript with syntax for types”。

这意味着你之前学习的 JavaScript 并没有作废。

相反：

```text
JavaScript 基础
      ↓
TypeScript 在此基础上增加类型能力
```

所以学习 TypeScript 的正确方式不是重新学习一门完全陌生的运行时语言，而是在理解 JavaScript 的基础上学习：

```text
怎样给程序增加更可靠的静态类型信息
```

## 5. 一个需要避免的误区

不要把 TypeScript 理解成：

```text
JavaScript + 到处写类型
```

TypeScript 的价值不只是让变量旁边出现 `string`、`number`。

后面的课程还会继续学习：

- 类型推断；
- 联合类型；
- 类型收窄；
- 泛型；
- 条件类型；
- 映射类型；
- 类型建模；
- API、组件与领域模型的类型设计。

不过这些都建立在今天这个最基础的关系之上：

> **TypeScript 扩展 JavaScript 的开发期类型能力，而你的程序最终仍然生活在 JavaScript 运行时世界里。**

## 6. 关于“直接运行 TypeScript”的补充

现代部分运行时已经能够直接接受某些 TypeScript 文件或可擦除类型语法。

但这不会改变本节最重要的认识：

```text
TypeScript 的类型信息用于开发期分析
运行时行为仍然遵循 JavaScript 语义
```

Node.js 等现代运行时直接处理 TypeScript 的具体方式，会在后面的“安装、编译与执行”章节单独学习，本节先不展开。

---

# 动手编码：从 0 到 1

这一部分不要先复制最终的 `src/main.ts`。

建议你新建一个空目录，按照下面步骤自己敲一遍，并在每一步观察变化。

## 第 0 步：明确我们要验证什么

本节只验证三个问题：

1. TypeScript 能不能写普通 JavaScript 风格的代码？
2. 加上类型以后，错误调用能不能在运行前被发现？
3. TypeScript 编译以后得到的到底是什么？

最终执行链路是：

```text
自己写 main.ts
      ↓
npm run check
      ↓
npm run build
      ↓
dist/main.js
      ↓
node dist/main.js
```

## 第 1 步：创建最小项目目录

新建目录：

```text
kp001-typescript-javascript-relationship/
```

进入目录后创建：

```text
src/
└── main.ts
```

先只写两行：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;
```

注意：

```ts
const productName = 'Mechanical Keyboard';
```

本身看起来就是普通 JavaScript。

这一步想说明的是：

> TypeScript 并不是要求你把原来的 JavaScript 语法全部推翻重写。

## 第 2 步：先写一个真正的运行行为

继续加入：

```ts
console.log(`${productName}: ¥${price}`);
```

现在的 `main.ts`：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;

console.log(`${productName}: ¥${price}`);
```

这三行代码同时也是合法的 JavaScript 风格代码。

到这里还没有看到 TypeScript 最明显的类型语法。

## 第 3 步：加入 TypeScript 类型标注

现在增加一个格式化价格的函数：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

重点观察：

```ts
value: number
```

以及：

```ts
: string
```

它们表达函数对输入和输出的类型要求。

然后把输出改成：

```ts
console.log(`${productName}: ${formatPrice(price)}`);
```

完整代码暂时是：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;

function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}

console.log(`${productName}: ${formatPrice(price)}`);
```

这就是本节真正需要理解的核心代码。

## 第 4 步：加入最小 TypeScript 工程配置

为了让案例可以稳定运行，在目录根部创建 `package.json`：

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

这里先不要死记全部配置。

本节只需要知道：

```text
strict
  ↓
开启严格类型检查

outDir
  ↓
编译后的 JavaScript 放到 dist/

noEmitOnError
  ↓
有类型错误时不生成最终 JavaScript
```

`tsconfig.json` 会在后面的专门章节系统学习。

## 第 5 步：安装依赖并做第一次类型检查

在当前知识点目录运行：

```bash
npm install
```

然后：

```bash
npm run check
```

如果没有输出错误，说明当前代码通过类型检查。

> 安装 TypeScript、版本管理和 `tsc` 命令本身会在 TS-KP009、TS-KP010 详细学习。这里先把命令当作实验工具使用。

## 第 6 步：故意制造一个类型错误

现在暂时把：

```ts
formatPrice(price)
```

改成：

```ts
formatPrice('499')
```

再次运行：

```bash
npm run check
```

你应该看到类似含义的错误：

```text
string 不能作为 number 参数传入
```

重点不是背错误编号，而是观察时间点：

```text
程序还没有真正运行
      ↓
TypeScript 已经发现调用不符合类型约定
```

这就是 TypeScript 与纯 JavaScript 开发体验之间最直观的差异之一。

### 这一行错误代码需要保留吗？

不需要。

它属于：

```text
实验辅助代码
```

完成观察后恢复：

```ts
formatPrice(price)
```

## 第 7 步：编译 TypeScript

恢复正确代码后运行：

```bash
npm run build
```

现在会生成：

```text
dist/
└── main.js
```

打开 `dist/main.js`。

你会看到接近下面的内容：

```js
const productName = 'Mechanical Keyboard';
const price = 499;

function formatPrice(value) {
  return `¥${value.toFixed(2)}`;
}

console.log(`${productName}: ${formatPrice(price)}`);
```

对比 TypeScript：

```ts
function formatPrice(value: number): string
```

和 JavaScript：

```js
function formatPrice(value)
```

你已经亲手观察到了：

```text
TypeScript 类型语法
      ↓
帮助开发阶段检查
      ↓
编译后得到 JavaScript
```

## 第 8 步：真正运行 JavaScript

执行：

```bash
npm run start
```

预期输出：

```text
Mechanical Keyboard: ¥499.00
```

注意实际被 Node.js 执行的是：

```text
dist/main.js
```

而不是我们在命令中直接执行 `src/main.ts`。

这正是本节想建立的第一层 TypeScript 心智模型。

---

# 完整源码讲解

## 1. `src/main.ts`

最终源码：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;

function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}

const label = `${productName}: ${formatPrice(price)}`;

console.log(label);
```

### 第一部分：仍然是熟悉的 JavaScript

```ts
const productName = 'Mechanical Keyboard';
const price = 499;
```

这里没有显式类型标注。

TypeScript 可以根据初始化值推断出类型。

类型推断会在后面的基础类型章节详细学习，本节只需要知道：

> TypeScript 并不要求所有变量都手写类型。

### 第二部分：TypeScript 类型语法

```ts
function formatPrice(value: number): string {
```

这里新增了 JavaScript 本身没有的类型信息：

```text
value: number
      ↓
输入应该是数字

:string
      ↓
返回值应该是字符串
```

### 第三部分：JavaScript 运行行为

```ts
return `¥${value.toFixed(2)}`;
```

真正格式化数字、拼接字符串的逻辑仍然是 JavaScript 运行时行为。

TypeScript 没有替你创造另一套运行时。

### 第四部分：调用函数

```ts
const label = `${productName}: ${formatPrice(price)}`;
```

TypeScript 会在开发期检查：

```text
price
  ↓
能否作为 formatPrice 的 number 参数
```

真正运行时，最终执行的仍是编译后的 JavaScript。

## 2. `package.json`

本案例固定 TypeScript `7.0.2`，提供三个实验命令：

```text
npm run check
  ↓
只做类型检查

npm run build
  ↓
生成 JavaScript

npm run start
  ↓
运行 dist/main.js
```

这些命令是为了让本节实验可以重复执行，不是 TS-KP001 的核心语法知识。

## 3. `tsconfig.json`

本案例使用严格检查，并把：

```text
src/*.ts
```

编译到：

```text
dist/*.js
```

完整配置能力会在后续 `tsconfig` 章节学习。

---

# 运行案例

进入本知识点目录：

```bash
cd courses/frontend-architect/stage04-javascript-deep-typescript/stage04-module13-typescript/01-typescript-foundations/kp001-typescript-javascript-relationship
```

安装依赖：

```bash
npm install
```

类型检查：

```bash
npm run check
```

编译：

```bash
npm run build
```

运行生成的 JavaScript：

```bash
npm run start
```

预期输出：

```text
Mechanical Keyboard: ¥499.00
```

---

# 效果验证

完成本节后，请自己验证下面四件事。

## 验证 1：正确代码可以通过检查

```bash
npm run check
```

不应该出现类型错误。

## 验证 2：错误类型能在运行前被发现

临时改成：

```ts
formatPrice('499')
```

再次执行：

```bash
npm run check
```

应该得到类型错误。

观察完成后恢复正确代码。

## 验证 3：编译结果是 JavaScript

执行：

```bash
npm run build
```

检查：

```text
dist/main.js
```

确认 TypeScript 的 `: number` 与 `: string` 已经不在 JavaScript 产物中。

## 验证 4：最终程序可以正常运行

```bash
npm run start
```

应输出：

```text
Mechanical Keyboard: ¥499.00
```

如果这四项都能亲手验证，你就已经完成 TS-KP001。

---

# 课后练习

练习文件位于：

```text
exercise/main.ts
```

要求你为一个订单金额函数补充 TypeScript 类型，使其能够：

1. 接收商品单价 `price`；
2. 接收数量 `quantity`；
3. 返回格式化后的字符串；
4. 在错误传入字符串数量时让 TypeScript 报错；
5. 能解释编译后的 JavaScript 中为什么看不到类型标注。

详细要求见：

[exercise/README.md](./exercise/README.md)

参考实现：

[solution/main.ts](./solution/main.ts)

建议先独立完成，再查看答案。

---

## 本节验收标准

不要只回答“TypeScript 是 JavaScript 的超集”就结束。

你至少应该能够完整解释：

```text
我先写 TypeScript
      ↓
TypeScript 在开发阶段检查类型
      ↓
常规编译过程生成 JavaScript
      ↓
浏览器或 Node.js 执行 JavaScript 运行时行为
```

并且能够自己写出：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

再通过错误调用、类型检查和编译产物证明自己的理解。
