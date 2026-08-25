# TS-KP006 练习：渐进迁移旧订单数据

请先修改 [`main.ts`](./main.ts)。

## 任务

旧订单数据可能是：

```ts
{
  id: '1001',
  total: '399.50',
  buyer: undefined
}
```

请完成：

1. 定义 `LegacyOrder`：`id` 与 `total` 都允许 `string | number`，`buyer` 可选。
2. 定义严格的 `Order`：`id: number`、`total: number`、`buyer: string`。
3. 实现 `normalizeOrder(input: LegacyOrder): Order`。
4. 缺少 `buyer` 时使用 `'Guest'`。
5. 确保转换后的 `id` 和 `total` 都是 `number`。

## 思考

为什么比起让整个新系统继续使用 `any`，把宽松类型限制在 `LegacyOrder` 和一个转换函数里更容易维护？

参考答案：[`../solution/main.ts`](../solution/main.ts)。
