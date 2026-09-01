# TS-KP001：TypeScript 与 JavaScript 的关系

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 前置课程 | 已掌握 JavaScript 变量、函数与 Node.js 基础运行方式 |
| 本课主问题 | TypeScript 增加了类型以后，最终到底是谁在运行程序？ |
| Learning Artifact | `tsc` 类型检查、Emit JavaScript、Node Console |
| 本课暂时不用理解 | 类型擦除的完整机制、`tsconfig` 全部选项、TypeScript Compiler 内部结构 |

## 文档目录

- [这节课只需要搞懂什么](#这节课只需要搞懂什么)
- [前置状态](#前置状态)
- [本课主问题](#本课主问题)
- [先预测](#先预测)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [图解与心智模型](#图解与心智模型)
- [理论收束](#理论收束)
- [Wrong Way 与边界](#wrong-way-与边界)
- [Production Boundary](#production-boundary)
- [本课只记住 3 件事](#本课只记住-3-件事)
- [Challenge](#challenge)
- [Mastery Check](#mastery-check)

## 这节课只需要搞懂什么

1. `.ts` 文件可以包含熟悉的 JavaScript 代码，也可以增加 TypeScript 类型信息。
2. TypeScript 能在运行前检查类型关系。
3. 常规构建后交给 Node.js / 浏览器执行的仍然是 JavaScript。

## 前置状态

先从普通 JavaScript 需求开始：格式化商品价格。

```js
function formatPrice(value) {
  return `¥${value.toFixed(2)}`;
}
```

JavaScript 负责真实运行行为；这一点不会因为开始学习 TypeScript 而消失。

## 本课主问题

把函数改成：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

多出来的 `number`、`string` 最终会不会也交给 Node.js 执行？

## 先预测

先不要看编译产物，回答：

```text
1. formatPrice('499') 能否在运行前被发现？
2. dist/main.js 里还会不会保留 : number / : string？
3. 最后 node 执行的是 main.ts 还是编译后的 main.js？
```

## 动手编码：从 0 到 1

### Step 0：先写 JavaScript 风格代码

创建 `src/main.ts`，先只写：

```ts
const productName = 'Mechanical Keyboard';
const price = 499;
```

这一步几乎就是 JavaScript。

**观察**：TypeScript 不是要求你把 JavaScript 语法全部换掉，而是在它上面继续增加静态能力。

---

### Step 1：只增加一个类型契约

加入：

```ts
function formatPrice(value: number): string {
  return `¥${value.toFixed(2)}`;
}
```

并调用：

```ts
formatPrice(price);
```

执行：

```bash
npm run check -- ./01-typescript-foundations/kp001-typescript-javascript-relationship/tsconfig.json
```

正确代码应该通过。

### 立即解释

这一步只改变一件事：**函数现在有了开发期可检查的输入 / 输出契约。**

这类在程序运行前完成的检查叫 **Static Type Checking**。

---

### Step 2：故意制造一个静态错误

临时改成：

```ts
formatPrice('499');
```

再次运行类型检查。

应该看到“`string` 不能作为 `number` 参数”一类 Diagnostic。

关键证据：

```text
程序还没运行
  ↓
TypeScript 已经指出类型关系不成立
```

验证后恢复正确调用。

---

### Step 3：编译，再看 JavaScript 产物

执行：

```bash
npm run build -- ./01-typescript-foundations/kp001-typescript-javascript-relationship/tsconfig.json
```

打开：

```text
dist/main.js
```

对比：

```ts
function formatPrice(value: number): string
```

与 Emit 后的 JavaScript：

```js
function formatPrice(value)
```

**观察**：普通类型标注没有进入 JavaScript 运行时代码。

> 这个现象的完整名字“类型擦除”会在 TS-KP003 专门拆解，本课只建立直觉。

---

### Step 4：真正运行 JavaScript

执行：

```bash
node ./01-typescript-foundations/kp001-typescript-javascript-relationship/dist/main.js
```

预期：

```text
Mechanical Keyboard: ¥499.00
```

这时真正执行的是 JavaScript 产物。

## 图解与心智模型

```text
src/main.ts
  │
  ├─ TypeScript 类型信息
  │      ↓
  │   tsc 静态分析
  │
  └─ 可运行 JavaScript 语义
         ↓ build / emit
     dist/main.js
         ↓
   Node.js / Browser
```

## 理论收束

### 一句话

> TypeScript 建立在 JavaScript 之上，主要增加开发阶段的静态类型分析能力；运行时仍遵循 JavaScript 语义。

### 代码变化 → 理论

| 代码 / 观察 | 对应理论 |
|---|---|
| `value: number` | Type Annotation |
| 错误调用在运行前报错 | Static Type Checking |
| Emit 后类型标注消失 | 类型信息不属于普通 JS 运行时语法 |
| `node dist/main.js` | JavaScript Runtime |

## Wrong Way 与边界

### Wrong Way 1：把 TypeScript 当成另一套业务运行时

TypeScript 编译器不是业务请求、DOM、定时器、数组方法的执行引擎。

### Wrong Way 2：认为用了 TypeScript 就不用学 JavaScript

TypeScript 运行时语义仍建立在 JavaScript 之上，JS 基础仍然是前置能力。

### 边界：现代运行时可直接接受部分 TS 语法

某些现代运行方式可以直接加载可擦除 TypeScript 语法，但它们仍不会让 TypeScript 类型变成运行时业务验证器。本课先使用经典 `check → build → node` 链路建立最清楚的模型。

## Production Boundary

生产工程里 TypeScript 很适合：

- 在提交 / CI 前发现静态类型错误；
- 为 IDE、重构和公共 API 提供类型信息；
- 把调用关系写成可检查契约。

但它不能替代：

- API / JSON 的运行时校验；
- 业务规则校验；
- 单元测试 / 集成测试。

## 本课只记住 3 件事

1. **TypeScript = JavaScript 运行语义 + 开发期类型能力。**
2. **错误类型关系可以在运行前被发现。**
3. **常规最终执行的仍然是 JavaScript。**

## Challenge

临时把参数改成：

```ts
function formatPrice(value: string): string
```

再分别传入 `499` 和 `'499'`。

先预测哪一个调用会在 `tsc` 阶段失败，再运行验证。注意：不要为了让字符串工作而修改函数体，本 Challenge 只观察“类型契约改变后，调用关系如何变化”。

## Mastery Check

### Must

- 能解释 TypeScript 和 JavaScript 的关系。
- 能完成 `check → build → node` 最小链路。

### Should

- 能用 Emit 产物证明类型标注不属于普通 JavaScript 运行时代码。
- 不再把“类型检查通过”说成“程序运行绝不会出错”。

### Expert

- 能区分 TypeScript 编译器职责、JavaScript Runtime 职责和 Runtime Validation 职责，为后续工程边界设计打基础。

## 最终源码与代码边界

- **本节核心代码**：`value: number`、`: string` 形成的类型契约。
- **实验辅助代码**：`tsconfig.json`、npm 命令、临时错误调用用于制造可观察证据。
- **最终源码**：[`src/main.ts`](./src/main.ts)
