# Lab 01：最小 TypeScript 工程综合实验

> [返回 Chapter 01](../README.md) · [正常场景源码](./src/type-check-pass.ts) · [错误仍 Emit 场景](./src/emit-on-error.ts) · [运行时边界场景](./src/runtime-boundary.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本实验后，你应该能够把 TS-KP001～TS-KP016 串成一条完整链路：

1. 从最小 `.ts` 文件建立 TypeScript 编译项目。
2. 使用 `--noEmit` 验证“只检查、不输出”。
3. 理解类型错误通常会在程序运行前被发现。
4. 验证 `noEmitOnError: false` 时可以出现“有诊断，但仍生成 JavaScript”。
5. 验证静态类型不会自动校验 `JSON.parse()` 的真实运行时数据。
6. 区分 TypeScript 编译阶段与 JavaScript 运行阶段。

> **本实验核心代码**：三个独立场景及其类型关系。
>
> **实验辅助代码**：三个 `tsconfig.*.json`、独立 `dist/` 输出目录和故意保留的错误代码，只用于隔离并观察编译器行为。

## 理论讲解

### 1. 为什么拆成三个场景

前 16 个知识点已经分别学习类型检查、Emit、`noEmit`、运行时边界。本实验把它们放进一个最小工程：

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

但是否生成 JavaScript 还受 `noEmit`、`noEmitOnError` 等配置影响。

```text
是否存在 TypeScript 诊断
            ≠
是否一定生成/不生成 JavaScript
```

### 3. 静态检查不能验证未来的真实数据

```ts
const payload = JSON.parse('{"amount":"499"}');
```

这里的数据来自运行时。TypeScript 不会因为后续函数需要 `number`，就把字符串 `"499"` 自动转换成数字，也不会自动验证 JSON 的真实结构。

---

## 动手编码：从 0 到 1

### 第 0 步：创建实验目录

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

三个场景分开配置，避免一个场景的故意错误干扰另外两个。

### 第 1 步：编写正常场景

创建 `src/type-check-pass.ts`：

```ts
type Product = {
  name: string;
  price: number;
};

function formatProduct(product: Product): string {
  return `${product.name}: ¥${product.price.toFixed(2)}`;
}
```

再创建合法数据：

```ts
const product: Product = {
  name: 'Mechanical Keyboard',
  price: 499
};

console.log(formatProduct(product));
```

### 第 2 步：为正常场景创建配置

`tsconfig.pass.json`：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/pass"
  },
  "files": ["src/type-check-pass.ts"]
}
```

### 第 3 步：先只类型检查

在 TypeScript 模块根目录执行：

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.pass.json --noEmit
```

预期：没有诊断，也不会产生本次 JavaScript 输出。

### 第 4 步：真正 Emit 并运行

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.pass.json
node ./01-typescript-foundations/lab01-minimal-typescript-project/dist/pass/type-check-pass.js
```

预期：

```text
Mechanical Keyboard: ¥499.00
```

### 第 5 步：创建“类型错误但仍 Emit”场景

`src/emit-on-error.ts`：

```ts
const quantity: number = '2';
console.log(`quantity=${quantity}`);
```

这里故意不修复错误。

### 第 6 步：显式关闭 noEmitOnError

`tsconfig.emit-on-error.json`：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/emit-on-error",
    "noEmitOnError": false
  },
  "files": ["src/emit-on-error.ts"]
}
```

共享配置默认开启 `noEmitOnError: true`，这里为了实验显式覆盖为 `false`。

### 第 7 步：观察报错与 Emit 同时发生

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.emit-on-error.json
```

预期同时看到：

1. TypeScript 报告 `string` 不能赋值给 `number`，命令返回非零退出码。
2. `dist/emit-on-error/emit-on-error.js` 仍然生成。

### 第 8 步：创建运行时边界场景

`src/runtime-boundary.ts`：

```ts
function formatAmount(value: number): string {
  return `¥${value.toFixed(2)}`;
}

const payload = JSON.parse('{"amount":"499"}');
console.log(formatAmount(payload.amount));
```

### 第 9 步：创建运行时场景配置

`tsconfig.runtime.json`：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/runtime"
  },
  "files": ["src/runtime-boundary.ts"]
}
```

### 第 10 步：编译并运行错误数据

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.runtime.json
node ./01-typescript-foundations/lab01-minimal-typescript-project/dist/runtime/runtime-boundary.js
```

静态检查可以通过，但运行时会看到类似：

```text
TypeError: value.toFixed is not a function
```

这证明静态类型不会自动验证 JSON 的真实值。

### 第 11 步：完成综合对照

最终源码：

- [`src/type-check-pass.ts`](./src/type-check-pass.ts)
- [`src/emit-on-error.ts`](./src/emit-on-error.ts)
- [`src/runtime-boundary.ts`](./src/runtime-boundary.ts)

最终配置：

- [`tsconfig.pass.json`](./tsconfig.pass.json)
- [`tsconfig.emit-on-error.json`](./tsconfig.emit-on-error.json)
- [`tsconfig.runtime.json`](./tsconfig.runtime.json)

本实验总结：

- **核心代码**：正常类型契约、故意错误赋值、运行时外部数据三个场景。
- **实验辅助代码**：多个 tsconfig 和独立输出目录，用来隔离不同编译行为。

## 运行案例

正常场景：

```bash
npm install
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.pass.json --noEmit
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.pass.json
node ./01-typescript-foundations/lab01-minimal-typescript-project/dist/pass/type-check-pass.js
```

错误仍 Emit：

```bash
npx tsc -p ./01-typescript-foundations/lab01-minimal-typescript-project/tsconfig.emit-on-error.json
```

运行时边界：

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
5. 为什么真实项目需要同时关注类型检查策略与运行时数据边界？

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
