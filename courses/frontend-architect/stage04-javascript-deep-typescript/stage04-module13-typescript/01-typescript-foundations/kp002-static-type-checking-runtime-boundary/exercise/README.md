# TS-KP002 练习：判断错误发生在哪个阶段

请先修改 [`main.ts`](./main.ts)，不要先看参考答案。

## 任务

当前函数缺少类型：

```ts
function uppercase(value) {
  return value.toUpperCase();
}
```

请完成：

1. 把参数类型补成 `string`。
2. 把返回值类型补成 `string`。
3. 保证 `uppercase('hello')` 能通过类型检查。
4. 临时加入 `uppercase(123)`，确认 TypeScript 能在运行前指出问题，然后删除它。
5. 观察 `JSON.parse('123')` 得到的运行时值进入函数后会发生什么。

在 TypeScript 模块根目录检查本练习：

```bash
npx tsc ./01-typescript-foundations/kp002-static-type-checking-runtime-boundary/exercise/main.ts --noEmit --strict --target ES2022
```

## 思考题

- `uppercase(123)` 和 `uppercase(JSON.parse('123'))` 为什么可能得到不同的静态检查结果？
- 真正执行 `.toUpperCase()` 的是 TypeScript 还是 JavaScript？
- 哪一部分属于静态阶段，哪一部分属于运行阶段？

完成后再查看 [`../solution/main.ts`](../solution/main.ts)。
