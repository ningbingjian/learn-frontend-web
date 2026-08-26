# TS-KP011 参考答案

在当前 `NodeNext + jsx: preserve` 实验中，核心输出关系是：

| 输入 | 输出 |
|---|---|
| `task.ts` | `task.js` |
| `module-task.mts` | `module-task.mjs` |
| `legacy-task.cts` | `legacy-task.cjs` |
| `view.tsx` | `view.jsx` |

关键结论：

- `.mts` 明确对应 ESM，Emit 使用 `.mjs`。
- `.cts` 明确对应 CommonJS，Emit 使用 `.cjs`。
- `.tsx` 表示允许 JSX 语法；具体 Emit 形式还与 `jsx` 配置有关。
- `.ts/.tsx` 在 NodeNext 等 Node 风格模式中还可能结合最近 `package.json` 的 `type` 判断模块格式。
