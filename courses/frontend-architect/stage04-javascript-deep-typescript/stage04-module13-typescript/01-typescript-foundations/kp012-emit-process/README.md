# TS-KP012：源码到 JavaScript 的 Emit 过程

> [返回 Chapter 01](../README.md) · [返回 TypeScript 模块索引](../../README.md) · [打开最终源码](./src/main.ts)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 建立“TypeScript 源码 → 检查 → Emit JavaScript”的基础流程图。
2. 理解类型检查与是否输出文件是两个相关但不同的决策。
3. 知道 `target` 会影响 JavaScript 语法降级程度。
4. 知道 `outDir`、`sourceMap` 等配置会影响 Emit 产物位置和附加文件。
5. 理解 `noEmitOnError` 的作用，并知道课程基线显式开启了它。

> **本节核心知识**：Emit 是“根据配置生成运行时代码/相关产物”的阶段；类型不会因为写在 TS 中就自动存在于运行时。  
> **实验辅助代码**：可选链与空值合并只是为了让 `target` 对输出语法的影响更容易观察。

## 理论讲解

### 1. 先建立最小编译链路

现在先用一个简化模型：

```text
.ts / .tsx / .mts / .cts
       ↓
解析源码
       ↓
类型检查
       ↓
根据 compilerOptions 进行 Emit
       ↓
.js / .jsx / .mjs / .cjs / source map / declaration...
```

编译器内部的 Scanner、Parser、Binder、Checker、Emitter 会在后面 Compiler Architecture 章节深入学习。

本节只关心：

```text
输入什么
配置什么
最终输出什么
```

### 2. 类型检查和 Emit 不是完全同一件事

TypeScript 可以：

```text
只检查，不 Emit
```

也可以：

```text
检查后 Emit
```

所以有：

```bash
--noEmit
```

专门关闭输出。

下一节 TS-KP013 会专门学习 `--noEmit`。

### 3. `target` 会影响输出的 JavaScript 语法级别

例如源码：

```ts
const title = config.title?.trim() ?? 'Untitled';
```

如果目标 JavaScript 版本较老，TypeScript 可能需要把：

```text
?.
??
```

转换成目标环境能够理解的等价 JavaScript。

如果 `target` 足够新，这些现代语法可能直接保留。

### 4. `outDir`

`outDir` 决定输出目录，例如：

```json
{
  "outDir": "dist"
}
```

于是：

```text
src/main.ts
   ↓
dist/main.js
```

### 5. `sourceMap`

开启：

```json
{
  "sourceMap": true
}
```

通常会额外生成：

```text
main.js.map
```

它用于帮助调试器把运行中的 JavaScript 位置映射回原始 TypeScript 源码。

### 6. `noEmitOnError`

TypeScript 编译器的通用默认行为并不是“只要有错误就一定完全禁止 Emit”。

`noEmitOnError` 用来明确要求：

```text
只要本次编译报告错误
      ↓
就不要生成本次输出文件
```

本课程共享 `tsconfig.base.json` 已经显式设置：

```json
{
  "noEmitOnError": true
}
```

因此课程项目采用“有类型错误就不生成新产物”的更严格基线。

---

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

本节要观察三件事：

1. TypeScript 类型被移除。
2. `target` 会影响现代 JavaScript 语法如何输出。
3. `sourceMap` 与 `noEmitOnError` 会改变输出行为。

### 第 1 步：创建带现代语法的 TypeScript 源码

创建：

```text
src/main.ts
```

写入：

```ts
type CourseConfig = {
  title?: string;
  nested?: {
    enabled?: boolean;
  };
};

const config: CourseConfig = {
  nested: {}
};

const title = config.title?.trim() ?? 'Untitled course';
const enabled = config.nested?.enabled ?? false;

console.log(`${title} | enabled=${enabled}`);
```

### 第 2 步：把本实验 target 设为 ES2018

当前知识点 `tsconfig.json` 覆盖：

```json
{
  "target": "ES2018",
  "sourceMap": true
}
```

这样可选链和空值合并就更容易在输出中观察到转换。

### 第 3 步：执行构建

在模块根目录执行：

```bash
npm run build -- ./01-typescript-foundations/kp012-emit-process/tsconfig.json
```

查看：

```text
dist/
├── main.js
└── main.js.map
```

### 第 4 步：先观察类型是否存在于 JavaScript

打开 `dist/main.js`。

源码中的：

```ts
type CourseConfig = { ... }
```

不会作为普通 JavaScript 类型定义保留。

这和 TS-KP003 的类型擦除结论一致。

### 第 5 步：观察现代语法如何被降级

源码：

```ts
config.title?.trim() ?? 'Untitled course'
```

在 ES2018 目标下，输出会变成目标版本能够执行的条件判断形式。

不要求背生成代码，只要能够回答：

```text
为什么源码有 ?. / ??
但输出可能没有？
```

答案是：

```text
target 要求更老的 JavaScript 语法级别
```

### 第 6 步：临时改成 ES2022 做对照

把当前知识点 `tsconfig.json` 的：

```json
"target": "ES2018"
```

临时改成：

```json
"target": "ES2022"
```

删除旧 `dist/` 后重新构建。

再次查看 `main.js`，比较现代语法是否保留得更多。

观察完成后恢复 `ES2018`。

### 第 7 步：观察 source map

恢复配置并重新构建后，确认存在：

```text
main.js.map
```

打开 `main.js` 底部，还会看到 source map 引用信息。

本节不深入 Source Map 格式，只要知道它属于 Emit 附加产物。

### 第 8 步：验证 `noEmitOnError`

先删除当前知识点的 `dist/`。

临时在 `src/main.ts` 加入：

```ts
const count: number = '3';
```

然后重新运行：

```bash
npm run build -- ./01-typescript-foundations/kp012-emit-process/tsconfig.json
```

应该看到类型错误，并且由于课程基线开启：

```json
"noEmitOnError": true
```

不会生成新的正常 Emit 产物。

观察后删除这行错误代码。

### 第 9 步：恢复正确源码并运行

重新构建：

```bash
npm run build -- ./01-typescript-foundations/kp012-emit-process/tsconfig.json
```

运行：

```bash
node ./01-typescript-foundations/kp012-emit-process/dist/main.js
```

预期：

```text
Untitled course | enabled=false
```

### 第 10 步：完成案例并对照最终源码

最终源码：[`src/main.ts`](./src/main.ts)。

本节总结：

- **核心知识**：Emit 会根据 `target`、`module`、`outDir`、`sourceMap` 等配置生成运行时产物；课程还通过 `noEmitOnError` 阻止错误构建产生新输出。
- **实验辅助代码**：可选链、空值合并和故意制造的 `number = string` 错误只用于让 Emit 差异变得可见。

## 运行案例

```bash
npm run build -- ./01-typescript-foundations/kp012-emit-process/tsconfig.json
node ./01-typescript-foundations/kp012-emit-process/dist/main.js
```

并打开：

```text
dist/main.js
dist/main.js.map
```

## 效果验证

你应该能够解释：

1. TypeScript 类型为什么通常不会保留在普通 JavaScript 产物里？
2. `target` 为什么会改变输出 JavaScript 的写法？
3. `sourceMap` 会新增什么类型的 Emit 产物？
4. `outDir` 控制什么？
5. `noEmitOnError` 为什么适合 CI 或严格课程基线？
6. “有类型错误”与“是否输出 JavaScript”为什么是两个需要单独理解的概念？
