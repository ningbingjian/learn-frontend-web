# TS-KP005 练习：类型职责与业务职责

请先修改 [`main.ts`](./main.ts)，不要先看参考答案。

## 任务

当前运费函数没有类型：

```ts
function shippingFee(weight, unitPrice) {
  return weight * unitPrice;
}
```

请完成：

1. 给 `weight` 和 `unitPrice` 添加 `number` 类型。
2. 给返回值添加 `number` 类型。
3. 验证 `shippingFee('3', 10)` 会被 TypeScript 拒绝。
4. 再验证 `shippingFee(-3, 10)` 在普通 `number` 类型下仍能通过。
5. 用自己的话解释：为什么“重量不能为负数”属于业务规则，而不是普通 `number` 类型自动保证的事实？

## 验收

你应该能区分：

```text
字符串重量
→ 类型问题

负数重量
→ 类型正确，但业务可疑
```

参考答案：[`../solution/main.ts`](../solution/main.ts)。
