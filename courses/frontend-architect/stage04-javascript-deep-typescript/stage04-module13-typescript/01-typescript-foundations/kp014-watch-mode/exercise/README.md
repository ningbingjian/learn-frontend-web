# TS-KP014 练习

目标：通过 Watch Mode 亲自观察错误出现与消失。

## 任务

1. 启动对 [`main.ts`](./main.ts) 的持续类型检查。
2. 当前 `price` 故意写成字符串，观察错误。
3. 把 `price` 修复为数字 `19`，保存后观察错误自动消失。
4. 再把 `stock` 改成字符串制造第二次错误。
5. 修复后使用 `Ctrl + C` 退出。

可以直接运行：

```bash
npx tsc --watch --noEmit --strict --target ES2022 ./01-typescript-foundations/kp014-watch-mode/exercise/main.ts
```

参考答案：[`../solution/main.ts`](../solution/main.ts)。
