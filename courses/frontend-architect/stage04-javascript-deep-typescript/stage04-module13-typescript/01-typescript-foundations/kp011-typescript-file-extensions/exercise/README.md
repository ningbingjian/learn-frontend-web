# TS-KP011 练习：预测不同 TypeScript 后缀的 Emit 文件名

先不要构建，先预测：

| 输入 | 你预测的输出 |
|---|---|
| `task.ts` | ? |
| `module-task.mts` | ? |
| `legacy-task.cts` | ? |
| `view.tsx`（`jsx: preserve`） | ? |

然后执行：

```bash
npx tsc -p ./01-typescript-foundations/kp011-typescript-file-extensions/exercise/tsconfig.json
```

查看 `exercise/dist/`，核对预测。

最后回答：

1. 哪两个后缀明确固定 ESM/CommonJS 语义？
2. 为什么 `.tsx` 的 Emit 结果会受到 `jsx` 配置影响？
3. 为什么 `.ts` 在 NodeNext 中还可能需要结合 `package.json` 判断模块格式？

答案见 [`../solution/README.md`](../solution/README.md)。
