# TS-KP009：安装 TypeScript 与版本管理

> [返回 Chapter 01](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `ENGINEERING` |
| 学习深度 | **Must** |
| 前置课程 | TS-KP001～008 |
| 本课主问题 | 为什么团队项目不应该依赖“我电脑全局正好装了某个 tsc”？ |
| Learning Artifact | `package.json` / lockfile + project-local `tsc --version` + 可运行源码 |
| 本课暂时不用理解 | npm workspace、pnpm catalog、TypeScript 多版本兼容策略 |

## 这节课只需要搞懂什么

1. TypeScript Compiler 是项目工具依赖，不是 JavaScript Runtime 本身。
2. 项目本地锁定版本能提高开发机与 CI 的可重复性。
3. 执行项目脚本时应优先使用项目安装的 `tsc`。

## 前置状态

源码只是：

```ts
const compilerBaseline: string = 'TypeScript project-local toolchain';
```

真正的课程重点不在这行代码，而在“谁提供编译器、用哪个版本”。

## 本课主问题

如果 A 开发者全局安装 TS 5.x，B 开发者是 7.x，CI 又是另一版本，同一仓库的 Diagnostic / Emit 可能一致吗？

## 先预测

```text
全局 tsc 版本是否由仓库控制？
package.json devDependency 是否可以被 lockfile 固定？
npm script 中的 tsc 默认优先找哪里？
```

## 动手编码：从 0 到 1

### Step 0：看模块根 package.json

本模块把 TypeScript 放在 `devDependencies`，因为编译器是开发 / 构建工具。

### Step 1：安装项目依赖

在模块根目录：

```bash
npm install
```

这会根据项目清单和 lockfile 建立本地工具链。

### Step 2：观察项目本地版本

执行：

```bash
npm exec tsc -- --version
```

或通过仓库已有 `npm run check/build` 脚本调用本地 `tsc`。

### 立即解释

版本基线应该属于仓库，而不是开发者机器的个人状态。

---

### Step 3：实际检查并运行源码

```bash
npm run check -- ./01-typescript-foundations/kp009-installation-version-management/tsconfig.json
npm run build -- ./01-typescript-foundations/kp009-installation-version-management/tsconfig.json
node ./01-typescript-foundations/kp009-installation-version-management/dist/main.js
```

输出：

```text
TypeScript project-local toolchain
```

## 图解与心智模型

```text
package.json + lockfile
        ↓
node_modules/typescript
        ↓
npm script / npm exec
        ↓
一致的项目 Compiler Baseline
```

## 理论收束

> Compiler Version 是工程输入的一部分。可重复构建要求它被项目声明、锁定并由 CI 使用同一基线。

## Wrong Way 与边界

- **Wrong Way：**只在 README 写“请全局 npm i -g typescript”。团队很容易漂移版本。
- 临时 `npx` 下载未锁定版本也可能造成结果变化；真实工程应明确版本策略。

## Production Boundary

升级 TypeScript 应当像升级重要构建依赖：阅读 Release Notes、跑 CI、检查 Diagnostic / `.d.ts` / Emit 变化，而不是无感漂移。

## 本课只记住 3 件事

1. **TypeScript Compiler 是项目工具链的一部分。**
2. **项目本地版本优先于依赖个人全局安装。**
3. **版本升级需要验证，不只是改一个数字。**

## Challenge

分别运行全局 `tsc -v`（如果有）和 `npm exec tsc -- --version`，记录是否相同；思考 CI 应信任哪一个。

## Mastery Check

### Must
- 能安装并调用项目本地 TypeScript。
### Should
- 能解释 lockfile 对编译器版本可重复性的价值。
### Expert
- 能设计团队 TypeScript 升级与 CI Gate 策略。

## 最终源码与代码边界

- **核心能力**：项目本地 TypeScript 依赖与版本基线。
- **实验辅助代码**：`src/main.ts` 只用于证明工具链能检查、Build、Run。
- **最终源码**：[`src/main.ts`](./src/main.ts)
