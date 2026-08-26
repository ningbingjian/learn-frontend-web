# TS-KP016 练习

目标：使用编辑器语言服务完成一次跨文件类型修改。

## 任务

1. 打开 [`product.ts`](./product.ts) 和 [`main.ts`](./main.ts)。
2. 给 `Product` 新增 `stock: number`。
3. 观察 `main.ts` 是否立即出现缺少 `stock` 的诊断。
4. 使用自动补全补上 `stock: 20`。
5. 对 `Product` 执行 Rename Symbol，改成 `StoreProduct`。
6. 确认两个文件中的引用都被同步更新。
7. 最后执行一次 CLI 类型检查。

```bash
npx tsc --noEmit --strict --target ES2022 --module ES2022 --moduleResolution node ./01-typescript-foundations/kp016-language-service/exercise/main.ts ./01-typescript-foundations/kp016-language-service/exercise/product.ts
```

参考答案在 [`../solution/`](../solution/)。
