# TS-KP015：直接运行 TypeScript 的现代方式与限制

> [返回 Chapter 01](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `ENGINEERING` |
| 学习深度 | **Should** |
| 本课主问题 | Node 能直接执行部分 `.ts` 后，是不是就“不需要 TypeScript Compiler”了？ |
| Learning Artifact | 同一 `main.ts` 的 direct-run 与 `tsc --noEmit` 双证据 |
| 暂不理解 | Node 版本矩阵、完整 type stripping 支持表、第三方 TS Runtime |

## 这节课只需要搞懂什么

1. 现代 Runtime 可以直接接受部分可擦除 TS 语法。
2. “能执行”与“做完整 Type Checking”不是同一件事。
3. 工程仍应明确 Compiler/Runtime 的职责。

## 前置状态

最终源码只有普通 type alias、annotation 和 JavaScript 逻辑，输出：

```text
1:Ada
```

## 本课主问题与先预测

如果直接：

```bash
node ./01-typescript-foundations/kp015-direct-typescript-execution/src/main.ts
```

在支持 TypeScript type stripping 的现代 Node 中可能运行成功。那把 `id: number` 错写成 string 后，Runtime 是否等价于 `tsc` 为你完成完整静态检查？

## 动手实验

### Step 0：先独立运行 typecheck

```bash
npm run check -- ./01-typescript-foundations/kp015-direct-typescript-execution/tsconfig.json
```

### Step 1：在支持的现代 Node 上直接运行 `.ts`

```bash
node ./01-typescript-foundations/kp015-direct-typescript-execution/src/main.ts
```

观察 `1:Ada`。

### 立即解释

Runtime 可以“去掉可擦除类型语法再执行 JS 语义”，这不等于它替代了 TypeScript Checker 的全部职责。

### Step 2：制造静态错误做对照

临时把 `id` 写成错误类型，分别观察 `tsc --noEmit` 与直接运行路径。把“是否能启动”和“静态契约是否正确”分开记录。

## 心智模型

```text
Direct TS Execution
.ts → strip erasable type syntax → JS Runtime

Type Checking
.ts → TypeScript Checker → Diagnostic
```

## Wrong Way 与 Production Boundary

- 不要从“Node 能跑 .ts”推导出“CI 不需要 typecheck”。
- Direct execution 支持范围与 Node 版本有关；部分需要 Transform 的 TS 语法并非都能按同样方式处理。
- 生产是否直接运行 TS 要看运行时版本、部署策略、启动性能、工具链兼容。

## 本课只记住 3 件事

1. **Direct Run ≠ Full Type Check。**
2. **可擦除类型语法可以被现代 Runtime 忽略。**
3. **工程仍应保留明确的静态检查 Gate。**

## Challenge

在当前机器记录 `node -v`，直接运行本课 `.ts`；再故意制造一个 `tsc` 能发现的错误，对比 direct run 和 typecheck 的反馈。

## Mastery Check

### Must
知道直接执行与编译执行是两条路径。
### Should
能解释为什么 CI 仍需要 Type Checking。
### Expert
能评估 direct TS execution 的版本/语法/部署边界。

## 最终源码与代码边界

- **核心能力**：Direct Run 与 Typecheck 的职责区分。
- **辅助代码**：User 示例只用于确保源码属于可擦除类型语法范围。
- **最终源码**：[`src/main.ts`](./src/main.ts)
