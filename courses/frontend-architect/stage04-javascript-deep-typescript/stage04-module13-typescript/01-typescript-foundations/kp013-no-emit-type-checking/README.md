# TS-KP013：`--noEmit` 与只类型检查

> [返回 Chapter 01](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `ENGINEERING` |
| 学习深度 | **Must** |
| 本课主问题 | 如果 Vite/其他工具负责生成 JavaScript，为什么团队还需要单独跑 `tsc --noEmit`？ |
| Learning Artifact | Diagnostic + “没有新 dist” 的文件系统证据 |
| 暂不理解 | Bundler 内部 Transform、CI Pipeline 细节 |

## 这节课只需要搞懂什么

1. `--noEmit` 保留类型检查但关闭输出。
2. Typecheck 可以成为独立 CI Gate。
3. “不输出 JS”不等于“什么都没做”。

## 前置状态

最终源码定义 `ServiceConfig` 并输出 `/api/products (3000ms)`。

## 本课主问题与先预测

删除当前 KP 的 `dist/` 后只运行：

```bash
npm run check -- ./01-typescript-foundations/kp013-no-emit-type-checking/tsconfig.json
```

预测：类型会不会检查？`dist/main.js` 会不会重新出现？

## 动手实验：从 0 到 1

### Step 0：正确代码只做 check

运行上面的命令。结果应无 Type Error，同时不产生新的 JS。

**立即解释**：项目脚本使用 `tsc --noEmit -p`，Checker 工作，Emitter 被关闭。

### Step 1：制造类型错误

临时把：

```ts
timeoutMs: 3000
```

改成：

```ts
timeoutMs: '3000'
```

再次 check，观察 Diagnostic；即使本来就不打算 Emit，类型错误仍然被发现。

### Step 2：和 build 做对照

恢复源码后执行：

```bash
npm run build -- ./01-typescript-foundations/kp013-no-emit-type-checking/tsconfig.json
node ./01-typescript-foundations/kp013-no-emit-type-checking/dist/main.js
```

输出：

```text
/api/products (3000ms)
```

## 心智模型

```text
tsc --noEmit → Parse/Check → Diagnostic → X Emit

tsc -p       → Parse/Check → Diagnostic → Emit（配置允许时）
```

## Wrong Way 与 Production Boundary

- 不要因为 Bundler 能转 TS 语法，就默认它一定完成完整 TypeScript Type Checking。
- CI 中常把 `typecheck` 独立出来；具体谁负责 Build 由工程工具链决定。

## 本课只记住 3 件事

1. **`--noEmit` = 检查但不输出。**
2. **Typecheck 可以独立于 Build。**
3. **工具链必须明确谁负责类型、谁负责产物。**

## Challenge

删除 `dist`，依次运行 check / build，记录目录变化；再制造一个类型错误比较两条命令反馈。

## Mastery Check

### Must
能解释 `--noEmit` 的行为。
### Should
能把 typecheck 配成独立 CI Gate。
### Expert
能判断 Vite/SWC/esbuild 工程中是否仍需要 `tsc --noEmit`。

## 最终源码与代码边界

- **核心能力**：`--noEmit` 的检查/输出分离。
- **辅助代码**：ServiceConfig 只是最小类型实验。
- **最终源码**：[`src/main.ts`](./src/main.ts)
