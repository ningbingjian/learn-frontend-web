# TS-KP011：`.ts`、`.tsx`、`.mts`、`.cts` 文件

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开源码目录](./src) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 `.ts` 是普通 TypeScript 源文件后缀。
2. 知道 `.tsx` 允许 TypeScript 文件包含 JSX 语法。
3. 知道 `.mts` 明确表示 ESM 语义，常规 Emit 对应 `.mjs`。
4. 知道 `.cts` 明确表示 CommonJS 语义，常规 Emit 对应 `.cjs`。
5. 理解 `.ts/.tsx` 在 Node 风格模块模式下还可能受到最近 `package.json` 中 `type` 字段影响。

> **本节核心知识**：文件后缀不只是“文件名长得不同”，某些后缀会参与模块格式与 Emit 文件名判断。  
> **实验辅助代码**：`jsx-global.d.ts` 只为了让本节不引入 React 依赖也能编译一个最小 JSX 示例，不是生产项目的 JSX 类型配置范式。

## 理论讲解

### 1. `.ts`

最普通的 TypeScript 文件：

```text
main.ts
```

适合不包含 JSX 的常规 TypeScript 代码。

在 Node 风格模块模式中，`.ts` 自身并不强制 ESM 或 CommonJS；TypeScript 会结合宿主规则，例如最近的 `package.json` 中是否有：

```json
{
  "type": "module"
}
```

来判断对应 `.js` 运行时文件应该按什么模块格式理解。

### 2. `.tsx`

当 TypeScript 文件需要包含 JSX：

```tsx
const view = <div>Hello</div>;
```

文件通常使用：

```text
view.tsx
```

并且需要配置合适的 `jsx` 编译选项。

`.tsx` 不是“React 专属后缀”，它表达的是：

```text
TypeScript + JSX syntax
```

React 只是最常见的使用场景之一。

### 3. `.mts`

`.mts` 用来明确表达该 TypeScript 文件采用 ESM 模块语义。

常规 Emit 关系：

```text
source.mts
   ↓
source.mjs
```

这样运行时看到 `.mjs` 就能明确按 ESM 处理。

### 4. `.cts`

`.cts` 用来明确表达 CommonJS 模块语义。

常规 Emit 关系：

```text
source.cts
   ↓
source.cjs
```

运行时看到 `.cjs` 就明确按 CommonJS 处理。

### 5. 为什么不能只背“.mts = mjs、.cts = cjs”

真正需要建立的是：

```text
源文件后缀
   ↓
TypeScript 判断模块格式
   ↓
类型检查规则 / 模块解析规则 / Emit 文件名和语法
   ↓
目标运行时按输出后缀继续解释
```

模块系统会在 Chapter 18 深入学习，本节只建立文件后缀直觉。

### 6. `.d.mts` 与 `.d.cts`

以后学习声明文件时还会遇到：

```text
.d.ts
.d.mts
.d.cts
```

它们分别描述不同运行时文件/模块格式对应的类型声明。

本节先知道存在即可。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要在同一个知识点里准备四种源码：

```text
plain.ts
view.tsx
esm-entry.mts
cjs-entry.cts
```

然后只运行一次 `tsc`，直接观察 `dist/` 文件名。

### 第 1 步：创建普通 `.ts`

创建：

```text
src/plain.ts
```

写入：

```ts
export const plain = 'plain .ts';

console.log(plain);
```

### 第 2 步：创建明确 ESM 的 `.mts`

创建：

```text
src/esm-entry.mts
```

写入：

```ts
export const esmMode = 'ESM from .mts';

console.log(esmMode);
```

### 第 3 步：创建明确 CommonJS 的 `.cts`

创建：

```text
src/cjs-entry.cts
```

写入：

```ts
export const cjsMode = 'CommonJS from .cts';

console.log(cjsMode);
```

### 第 4 步：创建最小 `.tsx`

创建：

```text
src/view.tsx
```

写入：

```tsx
const title = 'TSX example';
const view = <div>{title}</div>;

console.log(view);
```

为了不在这一课引入 React 类型依赖，再添加一个实验辅助声明：

```text
src/jsx-global.d.ts
```

它只为本地 `<div>` 提供最小 JSX 类型入口。

### 第 5 步：为本实验使用 NodeNext + JSX Preserve

当前知识点的 `tsconfig.json` 使用：

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "jsx": "preserve"
  }
}
```

`jsx: preserve` 会保留 JSX 给后续工具处理，因此 `.tsx` 对应输出会保留为 `.jsx`。

### 第 6 步：执行构建

在 TypeScript 模块根目录执行：

```bash
npm run build -- ./01-typescript-foundations/kp011-typescript-file-extensions/tsconfig.json
```

然后查看：

```text
kp011-typescript-file-extensions/dist/
```

预期能看到：

```text
plain.js
view.jsx
esm-entry.mjs
cjs-entry.cjs
```

这一步就是本节最关键的观察结果。

### 第 7 步：分别观察 ESM 与 CommonJS 产物

打开：

```text
dist/esm-entry.mjs
```

你应该看到 ESM 风格的 `export`。

再打开：

```text
dist/cjs-entry.cjs
```

你应该看到 CommonJS 相关 Emit。

重点不是背具体辅助代码，而是看到：

```text
.mts → .mjs → ESM
.cts → .cjs → CommonJS
```

### 第 8 步：运行可直接执行的三个 JavaScript 产物

执行：

```bash
node ./01-typescript-foundations/kp011-typescript-file-extensions/dist/plain.js
node ./01-typescript-foundations/kp011-typescript-file-extensions/dist/esm-entry.mjs
node ./01-typescript-foundations/kp011-typescript-file-extensions/dist/cjs-entry.cjs
```

分别应打印对应文本。

### 第 9 步：为什么不直接用 Node 运行 `view.jsx`

因为本课使用：

```text
jsx: preserve
```

Emit 后 JSX 仍然存在：

```jsx
<div>{title}</div>
```

Node.js 本身不会把这个 JSX 当作普通 JavaScript 自动转换。

实际 React/Vue/构建工具链中会由对应框架或构建工具继续处理。

所以 `.tsx` 这一部分的验收是：

```text
能够编译
能够看到 .jsx 产物
知道 JSX 仍需后续处理
```

而不是强行让 Node 直接执行它。

### 第 10 步：完成案例并对照最终源码

最终源码目录：[`src/`](./src)。

本节总结：

- **核心代码/知识**：`.ts`、`.tsx`、`.mts`、`.cts` 的语义差异，以及 `.mts → .mjs`、`.cts → .cjs` 的 Emit 关系。
- **实验辅助代码**：`jsx-global.d.ts` 和本节专用 `NodeNext` / `jsx: preserve` 配置只是为了把四种文件放进同一个可观察实验。

## 运行案例

```bash
npm run build -- ./01-typescript-foundations/kp011-typescript-file-extensions/tsconfig.json
node ./01-typescript-foundations/kp011-typescript-file-extensions/dist/plain.js
node ./01-typescript-foundations/kp011-typescript-file-extensions/dist/esm-entry.mjs
node ./01-typescript-foundations/kp011-typescript-file-extensions/dist/cjs-entry.cjs
```

并手动查看 `dist/view.jsx`。

## 效果验证

你应该能够不查资料回答：

1. 什么情况下使用 `.tsx` 而不是 `.ts`？
2. `.mts` 常规 Emit 后为什么是 `.mjs`？
3. `.cts` 常规 Emit 后为什么是 `.cjs`？
4. 为什么普通 `.ts` 在 Node 风格模块模式下还要关注 `package.json` 的 `type`？
5. 为什么本案例的 `.jsx` 不直接交给 Node 执行？
