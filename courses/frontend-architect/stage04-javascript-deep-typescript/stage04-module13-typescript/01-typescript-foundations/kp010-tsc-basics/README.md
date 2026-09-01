# TS-KP010：`tsc` 基本使用

> [返回 Chapter 01](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 前置课程 | TS-KP009：项目本地 TypeScript 工具链 |
| 本课主问题 | `tsc` 到底负责检查、生成 JavaScript，还是直接运行你的业务代码？ |
| Learning Artifact | check 无输出文件 + build 生成 dist + Node Console |
| 本课暂时不用理解 | Watch、Project References、Compiler API |

## 这节课只需要搞懂什么

1. `tsc` 是 TypeScript Compiler CLI。
2. 同一项目可以“只检查”或“检查并 Emit”。
3. 运行 JavaScript 是 Node / Browser 的职责，不是 `tsc` 的业务执行职责。

## 前置状态

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

## 本课主问题

为什么我们会分别运行：

```bash
npm run check -- .../tsconfig.json
npm run build -- .../tsconfig.json
node .../dist/main.js
```

而不是一个 `tsc` 命令完成所有职责？

## 先预测

```text
check 后 dist 是否必须存在？
build 后会产生什么？
tsc 会不会自己执行 console.log？
```

## 动手编码：从 0 到 1

### Step 0：先运行 check

```bash
npm run check -- ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json
```

项目脚本实际使用 `tsc --noEmit -p`：分析项目，但不生成运行产物。

### Step 1：故意制造参数错误

临时写：

```ts
greet(123);
```

再次 check，观察 Diagnostic；验证后恢复。

### Step 2：执行 build

```bash
npm run build -- ./01-typescript-foundations/kp010-tsc-basics/tsconfig.json
```

现在 `dist/main.js` 被生成。

### 立即解释

`tsc` 可以把“检查”和“Emit”组合在编译流程里；是否输出由命令和配置决定。

---

### Step 3：真正运行 JavaScript

```bash
node ./01-typescript-foundations/kp010-tsc-basics/dist/main.js
```

输出：

```text
Hello, TypeScript
```

这个 Console 是 Node 执行业务代码产生的，不是 `tsc` 在类型检查时打印的。

## 图解与心智模型

```text
src/main.ts
 ├─ tsc --noEmit → Diagnostic only
 └─ tsc          → dist/main.js
                      ↓
                    node
                      ↓
               Hello, TypeScript
```

## 理论收束

| 工具/模式 | 职责 |
|---|---|
| `tsc --noEmit` | 类型检查，不产出 JS |
| `tsc -p` | 按项目配置检查并可 Emit |
| `node` | 执行 JavaScript Runtime Code |

## Wrong Way 与边界

- 不要把 `tsc` 当测试框架或应用服务器。
- `tsc` 参数直接编译单文件和 `-p tsconfig` 项目模式的配置来源不同；课程优先使用项目模式保持可重复性。

## Production Boundary

CI 常把 typecheck 作为独立 Gate；应用构建还可能由 Vite / webpack / esbuild / swc 等负责 Bundling/Transform。`tsc` 是否负责最终 Emit 取决于工程架构。

## 本课只记住 3 件事

1. **`tsc` 是 Compiler，不是 Runtime。**
2. **`--noEmit` 可以把类型检查和输出分开。**
3. **最终 JS 由 Node / Browser 执行。**

## Challenge

删除 `dist` 后只运行 `check`，确认不会重新得到 `dist/main.js`；再运行 `build` 做对照。

## Mastery Check

### Must
- 能区分 check / build / run 三个阶段。
### Should
- 能解释 `-p` 项目模式为什么适合仓库课程。
### Expert
- 能说明在 Bundler 工程中 `tsc` 与 Bundler 的职责如何拆分。

## 最终源码与代码边界

- **核心能力**：`tsc` check / Emit 两种基本使用方式。
- **实验辅助代码**：`greet()` 只是最小可观察程序。
- **最终源码**：[`src/main.ts`](./src/main.ts)
