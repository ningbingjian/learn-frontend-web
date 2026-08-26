# TS-KP015 练习

目标：区分“Node 能直接执行”与“TypeScript 类型检查通过”。

## 任务

1. 先直接运行 [`main.ts`](./main.ts)。
2. 再使用 `tsc --noEmit --strict` 检查它。
3. 把 `port` 从数字改成字符串 `'3000'`。
4. 再分别执行 Node 和 `tsc`，比较两者行为。

当前支持稳定 Type Stripping 的 Node.js：

```bash
node ./01-typescript-foundations/kp015-direct-typescript-execution/exercise/main.ts
```

类型检查：

```bash
npx tsc --noEmit --strict --target ES2022 ./01-typescript-foundations/kp015-direct-typescript-execution/exercise/main.ts
```

你最终应该能够解释：为什么“Node 能运行”并不能证明类型正确。

参考答案：[`../solution/main.ts`](../solution/main.ts)。
