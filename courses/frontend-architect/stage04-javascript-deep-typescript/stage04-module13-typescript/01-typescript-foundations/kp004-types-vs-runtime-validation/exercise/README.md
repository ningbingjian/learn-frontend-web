# TS-KP004 练习：不要让类型声明冒充数据校验

请先修改 [`main.ts`](./main.ts)，不要先看参考答案。

## 场景

后端返回：

```json
{"name":"Keyboard","price":"199"}
```

但业务模型希望：

```ts
type Product = {
  name: string;
  price: number;
};
```

## 任务

1. 定义 `Product` 类型。
2. 用 `JSON.parse()` 得到运行时数据。
3. 先观察把数据直接放到 `Product` 类型位置为什么不能证明 `price` 真的是数字。
4. 再把外部输入放到 `unknown` 边界。
5. 使用 `typeof`、`in` 等运行时检查确认 `name` 和 `price` 的真实类型。
6. 对错误数据输出 `runtime validation rejected invalid product`。
7. 把 JSON 中的 `"199"` 改为 `199`，确认校验可以通过。

## 验收问题

请用自己的话回答：

- `type Product` 会不会读取 JSON 内容？
- `const product: Product = ...` 是不是运行时验证？
- 运行时真正判断 `price` 是不是 number 的代码是哪一行？
- 为什么 API 响应、localStorage、环境变量等都需要类似的边界意识？

完成后再查看 [`../solution/main.ts`](../solution/main.ts)。
