# TS-KP003 练习：找出编译后消失的类型信息

请先修改 [`main.ts`](./main.ts)，不要先看参考答案。

## 任务

请完成下面的类型设计：

1. 声明 `type UserId = string`。
2. 声明 `interface User`，包含 `id: UserId` 与 `name: string`。
3. 为 `formatUser` 参数补上 `User`，返回值补上 `string`。
4. 为 `user` 对象补上 `User` 类型。
5. 使用 TypeScript 编译器编译这个文件，并观察最终 JavaScript 中哪些内容消失。

可以在模块根目录执行：

```bash
npx tsc ./01-typescript-foundations/kp003-erased-type-system/exercise/main.ts --target ES2022 --outDir ./01-typescript-foundations/kp003-erased-type-system/exercise/dist
```

## 验收

请自己列出两张清单：

**编译后消失：**

- `type`？
- `interface`？
- 参数类型？
- 返回值类型？

**编译后保留：**

- 对象？
- 函数体？
- 字符串模板？
- `console.log()`？

完成后再查看 [`../solution/main.ts`](../solution/main.ts)。
