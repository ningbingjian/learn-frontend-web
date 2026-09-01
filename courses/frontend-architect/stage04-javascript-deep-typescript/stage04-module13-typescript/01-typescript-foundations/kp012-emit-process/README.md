# TS-KP012：源码到 JavaScript 的 Emit 过程

> [返回 Chapter 01](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + 轻量 `SOURCE-LAB` |
| 学习深度 | **Must** |
| 前置课程 | TS-KP003、TS-KP010～011 |
| 本课主问题 | 同一份 `.ts` 源码为什么在 ES2018 / ES2022 目标下可以得到不同 JavaScript？ |
| Learning Artifact | `dist/main.js` + `main.js.map` + `noEmitOnError` 失败实验 |
| 本课暂时不用理解 | Scanner / Parser / Transformer / Emitter 内部调用链、Source Map 格式 |

## 这节课只需要搞懂什么

1. Emit 根据 `compilerOptions` 生成运行时代码和附加产物。
2. 类型检查与“是否输出文件”是相关但可分离的决策。
3. `target`、`outDir`、`sourceMap`、`noEmitOnError` 会改变可观察产物。

## 前置状态

源码同时包含：

```ts
type CourseConfig = { ... };
config.title?.trim() ?? 'Untitled course';
```

一个是类型层声明，一个是现代 JavaScript 语法。

## 本课主问题

配置指定：

```json
"target": "ES2018",
"sourceMap": true
```

Build 后类型会怎样，`?.` / `??` 又会怎样？

## 先预测

```text
CourseConfig 会不会出现在 main.js？
ES2018 产物会不会原样保留所有 ?. / ??？
sourceMap=true 会多出什么文件？
有 Type Error 且 noEmitOnError=true 时会不会继续产出新 JS？
```

## 动手编码：从 0 到 1

### Step 0：先 Build 正确源码

```bash
npm run build -- ./01-typescript-foundations/kp012-emit-process/tsconfig.json
```

观察：

```text
dist/main.js
dist/main.js.map
```

运行：

```bash
node ./01-typescript-foundations/kp012-emit-process/dist/main.js
```

输出：

```text
Untitled course | enabled=false
```

---

### Step 1：先找“消失的 Type”

源码中的 `CourseConfig` 不会作为普通 JS 类型声明进入 `main.js`。

这再次验证 TS-KP003 的 Type Erasure。

### Step 2：再找“被转换的 Runtime Syntax”

源码包含 `?.` / `??`。因为 target 是 ES2018，Emit 会把它们转换为目标版本可执行的等价逻辑。

### 立即解释

类型语法的“消失”和现代 JS 语法的“降级”是两种不同现象：

```text
Type Syntax → erase
Runtime Syntax → 视 target 决定保留或 transform
```

---

### Step 3：只改 target 做对照

临时把 ES2018 改为 ES2022，删除旧 `dist` 后再 Build。

比较 `main.js`，观察现代语法保留程度的变化。验证后恢复 ES2018。

---

### Step 4：观察附加产物 Source Map

`sourceMap: true` 生成 `main.js.map`，帮助调试器把运行 JS 的位置映射回 TS 源码。本课只观察文件存在，不解析 Map 格式。

---

### Step 5：制造 Type Error，观察 noEmitOnError

先删 `dist`，临时加入：

```ts
const count: number = '3';
```

重新 Build。课程基础配置开启 `noEmitOnError: true`，应看到 Diagnostic 且不生成新的正常产物。验证后恢复源码。

## 图解与心智模型

```text
TypeScript Source
  ├─ Type Syntax ───────→ Checker → erase
  └─ Runtime Syntax ────→ target transform
                           ↓
compilerOptions → Emit → dist/main.js
                       └→ main.js.map
```

## 理论收束

> Emit 是 TypeScript 编译流程中根据配置产生 JavaScript / JSX / Source Map / Declaration 等输出的阶段；它不等于“把所有源码原样复制成 JS”。

| 配置/现象 | 影响 |
|---|---|
| `target` | JS 语法级别 / 降级程度 |
| `outDir` | 输出位置 |
| `sourceMap` | 是否生成 `.map` |
| `noEmitOnError` | 有错误时是否阻止 Emit |

## Wrong Way 与边界

- 不要把 Type Erasure 与 JavaScript Syntax Transform 混成一件事。
- 不要背生成代码的具体临时变量名；真正要理解的是 target 控制输出语法能力。

## Production Boundary

真实项目可能让 `tsc` 只做类型检查，由 Babel / SWC / esbuild / Vite 负责 Transform/Bundle；也可能直接由 `tsc` Emit。必须先明确工具链职责。

## 本课只记住 3 件事

1. **Type Syntax 通常擦除，Runtime Syntax 可能按 target 转换。**
2. **Emit 是配置驱动的。**
3. **检查通过与是否输出是两个需要显式设计的工程决策。**

## Challenge

把 target 改成更高版本，比较 `dist/main.js`；再恢复并制造一次 Type Error，记录“源码、Diagnostic、dist”三者变化。

## Mastery Check

### Must
- 能解释本课 ES2018 产物为何与源码不同。
### Should
- 能区分 Type Erasure / Runtime Transform / Source Map。
### Expert
- 能根据团队工具链决定 `tsc` 应负责 Typecheck、Emit 或两者。

## 最终源码与代码边界

- **核心内容**：`compilerOptions` 对 Emit 的影响。
- **实验辅助代码**：可选链 / 空值合并用于放大 target 差异。
- **最终源码**：[`src/main.ts`](./src/main.ts)
