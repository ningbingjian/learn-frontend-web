# TS-KP007 练习：按结构复用函数

请先修改 [`main.ts`](./main.ts)。

## 任务

1. 定义 `HasId`，只要求 `id: number`。
2. 编写 `printId(value: HasId): void`。
3. 创建一个 `user`：包含 `id`、`name`。
4. 创建一个 `order`：包含 `id`、`total`、`status`。
5. 让两个对象都能调用 `printId()`。
6. 再创建一个没有 `id` 的对象，验证它不能传给 `printId()`。

## 思考

为什么 user 和 order 不需要继承同一个类，也可以复用 `printId()`？

参考答案：[`../solution/main.ts`](../solution/main.ts)。
