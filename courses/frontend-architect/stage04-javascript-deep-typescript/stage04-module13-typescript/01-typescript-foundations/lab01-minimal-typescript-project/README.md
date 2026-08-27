# Lab 01：最小 TypeScript 工程综合实验

> [返回 Chapter 01](../README.md) · [查看正常场景源码](./src/type-check-pass.ts) · [查看错误仍 Emit 场景](./src/emit-on-error.ts) · [查看运行时边界场景](./src/runtime-boundary.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本实验后，你应该能够把 TS-KP001～TS-KP016 串成一条完整链路：

1. 从最小 `.ts` 文件开始建立一个 TypeScript 编译项目。
2. 使用 `tsc --noEmit` 验证“只检查、不输出”。
3. 理解类型错误通常会被 TypeScript 在运行前发现。
4. 亲手验证 `noEmitOnError: false` 时可以出现“有诊断，但仍生成 JavaScript”。
5. 亲手验证静态类型不会自动校验 `JSON.parse()` 得到的真实运行时数据。
6. 能区分 TypeScript 编译阶段与 JavaScript 运行阶段。

> **本实验核心代码**：三个独立场景及它们的 TypeScript 编译配置。
>
> **实验辅助代码**：三个 `tsconfig.*.json`、`dist/` 输出目录和故意保留的错误代码，用于观察编译器行为。

## 理论讲解

### 1. 本实验为什么拆成三个场景

前 16 个知识点已经分别学习了类型检查、Emit、`noEmit`、运行时边界等概念。本实验不再单独讲新语法，而是把它们放进同一个最小工程：

```text
场景 A：类型正确
TypeScript → 检查通过 → Emit → Node.js 运行

场景 B：类型错误
TypeScript → 报诊断 → noEmitOnError=false → 仍然 Emit

场景 C：外部运行时数据
TypeScript → 静态检查通过 → JavaScript 运行 → 真实值触发异常
```

### 2. “有类型错误”与“是否 Emit”是两个维度

TypeScript 可以发现：

```ts
const quantity: number = '2';
```

但是否生成 JavaScript，还受到 `noEmit`、`noEmitOnError` 等配置影响。

因此不要把下面两句话混为一谈：

```text
代码存在 TypeScript 诊断

是否生成 JavaScript 产物
```

### 3. 静态类型检查不能读取未来的真实数据

下面的代码在类型层面很危险：

```ts
const payload = JSON.parse('{"amount":"499"}');
```

`JSON.parse()` 返回的数据来自运行时。TypeScript 不会因为后续函数需要 `number`，就把字符串 `"499"` 自动转换成数字，也不会自动替你验证 JSON 结构。

这正是静态类型与运行时数据校验的边界。

---

## 动手编码：从 0 到 1

### 第 0 步：准备目录

在 Chapter 01 下创建：

```text
lab01-minimal-typescript-project/
├── README.md
├── src/
│   ├── type-check-pass.ts
│   ├── emit-on-error.ts
│   └── runtime-boundary.ts
├── tsconfig.pass.json
├── tsconfig.emit-on-error.json
└── tsconfig.runtime.json
```

三个场景故意分开配置，避免一个场景的错误干扰另外两个。

### 第 1 步：编写“类型检查通过”场景

创建 `src/type-check-pass.ts`，先定义产品结构：

```ts
type Product = {
  name: string;
  price: number;
};
```

再加入函数：

```ts
function formatProduct(product: Product): string {
  return `${product.name}: ¥${product.price.toFixed(2)}`;
}
```

最后创建合法数据并输出：

```ts
const product: Product = {
  name: 'Mechanical Keyboard',
  price: 499
};

console.log(formatProduct(product));
```

### 第 2 步：为正常场景创建配置

创建 `tsconfig.pass.json`：

```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/pass"
  },
  "files": ["src/type-check-pass.ts"]
}
```

这里继承模块级严格配置，只选择一个文件参与本次项目。

### 第 3 步：先只做类型检查

进入 TypeScript 模块根目录执行：

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.pass.json --noEmit
```

应当没有诊断，也不会产生 `dist/pass/`。

这一步把 TS-KP013 的 `noEmit` 放进了真实项目。

### 第 4 步：真正 Emit 并运行

执行：

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.pass.json
node ./01-typescript-foundations/lab01-minimal-typescript-project/dist/pass/type-check-pass.js
```

预期：

```text
Mechanical Keyboard: ¥499.00
```

完整链路是：

```text
.ts
 ↓ 类型检查
 ↓ Emit
.js
 ↓ Node.js
输出结果
```

### 第 5 步：创建“类型错误但仍 Emit”场景

创建 `src/emit-on-error.ts`：

```ts
const quantity: number = '2';
console.log(`quantity=${quantity}`);
```

这里故意不修复错误。TypeScript 应该指出 `string` 不能赋值给 `number`。

### 第 6 步：显式关闭 noEmitOnError

创建 `tsconfig.emit-on-error.json`：

```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/emit-on-error",
    "noEmitOnError": false
  },
  "files": ["src/emit-on-error.ts"]
}
```

模块基础配置原本开启了 `noEmitOnError: true`，这里故意覆盖为 `false`。

### 第 7 步：观察“命令失败，但文件仍生成”

执行：

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.emit-on-error.json
```

你应该同时观察：终端报告类型错误并返回非零退出码，但 `dist/emit-on-error/emit-on-error.js` 仍然产生。

这证明“有 TypeScript 诊断”不等于“一定没有 JavaScript 产物”。

### 第 8 步：创建运行时边界场景

创建 `src/runtime-boundary.ts`：

```ts
function formatAmount(value: number): string {
  return `¥${value.toFixed(2)}`;
}

const payload = JSON.parse('{"amount":"499"}');
console.log(formatAmount(payload.amount));
```

从业务意图看，`amount` 应该是数字；但真实 JSON 中故意放的是字符串。

### 第 9 步：为运行时场景创建配置

创建 `tsconfig.runtime.json`：

```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/runtime"
  },
  "files": ["src/runtime-boundary.ts"]
}
```

### 第 10 步：先类型检查，再运行

执行：

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.runtime.json
node ./01-typescript-foundations/lab01-minimal-typescript-project/dist/runtime/runtime-boundary.js
```

TypeScript 编译可以通过，但运行时会看到类似：

```text
TypeError: value.toFixed is not a function
```

原因不是 TypeScript “失效”，而是静态类型系统没有自动验证这份运行时 JSON。

### 第 11 步：完成综合对照

最终源码：

- [`src/type-check-pass.ts`](./src/type-check-pass.ts)
- [`src/emit-on-error.ts`](./src/emit-on-error.ts)
- [`src/runtime-boundary.ts`](./src/runtime-boundary.ts)

三个配置：

- [`tsconfig.pass.json`](./tsconfig.pass.json)
- [`tsconfig.emit-on-error.json`](./tsconfig.emit-on-error.json)
- [`tsconfig.runtime.json`](./tsconfig.runtime.json)

本实验最后要分清：

- **核心代码**：类型契约、故意错误赋值、外部运行时数据三个场景。
- **实验辅助代码**：多个 tsconfig 与独立 dist 目录，用于隔离和观察不同编译行为。

## 运行案例

在 TypeScript 模块根目录依次执行：

```bash
npm install
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.pass.json --noEmit
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.pass.json
node ./01-typescript-foundations/lab01-minimal-typescript-project/dist/pass/type-check-pass.js
```

然后验证错误仍 Emit：

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.emit-on-error.json
```

最后验证运行时边界：

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.runtime.json
node ./01-typescript-foundations/lab01-minimal-typescript-project/dist/runtime/runtime-boundary.js
```

## 效果验证

完成后你应该能够回答：

1. `--noEmit` 为什么仍然会做类型检查？
2. 为什么 `noEmitOnError: false` 会出现“编译器报错但 JavaScript 仍生成”？
3. 为什么 `JSON.parse()` 得到错误结构的数据时，静态类型不能自动保护运行时？
4. TypeScript 编译器与 Node.js 分别负责哪一阶段？
5. 为什么真实项目需要同时关注“类型检查策略”和“运行时数据边界”？

最终心智模型：

```text
TypeScript 静态信息
      ↓
编译器检查代码关系
      ↓
根据配置决定是否 Emit
      ↓
JavaScript 运行时面对真实值
```
