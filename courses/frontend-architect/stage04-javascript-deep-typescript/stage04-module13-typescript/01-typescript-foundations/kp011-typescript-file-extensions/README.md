# TS-KP011：`.ts`、`.tsx`、`.mts`、`.cts` 文件

> [返回 Chapter 01](../README.md) · [源码目录](./src)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `ENGINEERING` |
| 学习深度 | **Must** |
| 前置课程 | TS-KP009～010 |
| 本课主问题 | 为什么只换文件后缀，就会影响 JSX、ESM/CJS 模块语义和 Emit 文件名？ |
| Learning Artifact | `dist/plain.js`、`view.jsx`、`esm-entry.mjs`、`cjs-entry.cjs` |
| 本课暂时不用理解 | NodeNext 完整解析规则、Package Exports、声明文件后缀体系 |

## 这节课只需要搞懂什么

1. `.ts` 是常规 TypeScript；`.tsx` 允许 JSX。
2. `.mts` / `.cts` 明确 ESM / CommonJS 语义。
3. 后缀会影响 TypeScript 的解析上下文和 Emit 文件名。

## 前置状态

本课一次准备四种源码：

```text
plain.ts
view.tsx
esm-entry.mts
cjs-entry.cts
```

## 本课主问题

同样由 TypeScript Compiler 处理，为什么最终会得到四种不同输出后缀？

## 先预测

把源文件与输出连线：

```text
.ts  → ?
.tsx → ?   （当前 jsx: preserve）
.mts → ?
.cts → ?
```

## 动手编码：从 0 到 1

### Step 0：先放普通 `.ts`

`plain.ts` 是不含 JSX 的普通 TS 源码。

### Step 1：只改变一个变量——加入 JSX

`view.tsx` 中写：

```tsx
const view = <div>{title}</div>;
```

当前实验使用 `jsx: preserve`，并用 `jsx-global.d.ts` 提供最小 JSX 类型入口，避免引入 React。

### 立即解释

`.tsx` 表达的是 **TypeScript + JSX Syntax**，不是“React 专属文件”。

---

### Step 2：明确 ESM / CJS

加入 `.mts` 与 `.cts`，配置使用：

```json
"module": "NodeNext",
"moduleResolution": "NodeNext"
```

### Step 3：只 Build 一次，观察 dist

```bash
npm run build -- ./01-typescript-foundations/kp011-typescript-file-extensions/tsconfig.json
```

预期：

```text
plain.js
view.jsx
esm-entry.mjs
cjs-entry.cjs
```

这就是本课最重要的可观察证据。

---

### Step 4：运行可直接给 Node 的三个产物

```bash
node ./01-typescript-foundations/kp011-typescript-file-extensions/dist/plain.js
node ./01-typescript-foundations/kp011-typescript-file-extensions/dist/esm-entry.mjs
node ./01-typescript-foundations/kp011-typescript-file-extensions/dist/cjs-entry.cjs
```

分别输出源码中对应文本。

`view.jsx` 仍包含 JSX，因为我们故意 `preserve`；它需要后续 JSX Transform，而不是强迫 Node 直接执行。

## 图解与心智模型

```text
.ts  ─────────→ .js
.tsx + preserve → .jsx
.mts ─────────→ .mjs (ESM)
.cts ─────────→ .cjs (CJS)
```

## 理论收束

> 文件扩展名是编译输入的一部分：它既告诉 Compiler 可以出现什么语法，也可能明确模块格式，并影响运行时产物后缀。

## Wrong Way 与边界

- `.tsx` 不等于“必然 React”；它首先允许 JSX。
- `.ts` 在 Node 风格模块语义下并不单靠后缀决定 ESM/CJS，还可能受最近 `package.json` 的 `type` 影响。
- 不要只背 `.mts→.mjs`，要理解“后缀 → 模块语义 → Emit → Runtime”的链路。

## Production Boundary

库 / Node 项目中后缀选择会影响真实运行时模块格式；React 项目则通常由 Bundler 继续处理 `.tsx`。文件命名是工程契约的一部分。

## 本课只记住 3 件事

1. **`.tsx` = TS + JSX Syntax。**
2. **`.mts` / `.cts` 明确 ESM / CJS。**
3. **后缀会参与 Emit 与 Runtime 语义。**

## Challenge

先把 `jsx: preserve` 临时换成另一种 JSX Emit 模式并比较输出文件/代码；观察后恢复原配置。本课只比较现象，不提前学习框架 JSX Runtime。

## Mastery Check

### Must
- 能把四种源后缀映射到本实验的四种产物。
### Should
- 能解释 `.tsx` 为什么本课不直接由 Node 执行。
### Expert
- 能说明后缀与 package `type` / NodeNext 的职责边界。

## 最终源码与代码边界

- **核心内容**：四种后缀与 Emit 关系。
- **实验辅助代码**：`jsx-global.d.ts` 与专用 `tsconfig` 只服务观察。
- **最终源码**：[`src/`](./src)
