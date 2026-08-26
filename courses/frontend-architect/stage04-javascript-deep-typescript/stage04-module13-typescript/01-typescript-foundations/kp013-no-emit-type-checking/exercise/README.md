# TS-KP013 练习

目标：亲手验证“只类型检查，不生成 JavaScript”。

## 任务

给 [`main.ts`](./main.ts) 中的函数补充类型：

1. `name` 应为 `string`。
2. `count` 应为 `number`。
3. 返回值应为 `string`。

然后在模块根目录执行：

```bash
npx tsc --noEmit --strict --target ES2022 ./01-typescript-foundations/kp013-no-emit-type-checking/exercise/main.ts
```

完成后再故意把调用改成：

```ts
createLabel('cart', '3')
```

确认 TypeScript 能报告错误，同时不会产生 `.js` 文件。

参考答案：[`../solution/main.ts`](../solution/main.ts)。
