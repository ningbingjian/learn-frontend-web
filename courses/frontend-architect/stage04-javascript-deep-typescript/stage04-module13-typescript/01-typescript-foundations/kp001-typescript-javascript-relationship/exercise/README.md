# TS-KP001 课后练习

请先修改 [`main.ts`](./main.ts)，不要先看参考答案。

## 任务

当前函数是：

```ts
function formatOrderTotal(price, quantity) {
  const total = price * quantity;
  return `¥${total.toFixed(2)}`;
}
```

请完成下面任务：

1. 给 `price` 添加 `number` 类型。
2. 给 `quantity` 添加 `number` 类型。
3. 给函数返回值添加 `string` 类型。
4. 保证下面的正确调用能够通过类型检查：

```ts
formatOrderTotal(199, 2)
```

5. 取消错误调用的注释：

```ts
formatOrderTotal(199, '2')
```

然后执行：

```bash
npx tsc exercise/main.ts --noEmit --strict --target ES2022
```

确认 TypeScript 能在程序运行前指出参数类型错误。

## 思考题

完成后请自己回答：

1. `price: number` 会不会作为 JavaScript 运行时值存在？
2. 如果把 TypeScript 编译成 JavaScript，类型标注去了哪里？
3. `price * quantity` 这一行属于 TypeScript 的类型逻辑，还是 JavaScript 的运行时逻辑？
4. 为什么学习 TypeScript 不能跳过 JavaScript 基础？

## 验收

你应该能够不看答案写出：

```ts
function formatOrderTotal(price: number, quantity: number): string {
  // ...
}
```

并解释“类型检查”和“JavaScript 真正执行”发生在不同阶段。

完成后再查看 [`../solution/main.ts`](../solution/main.ts)。
