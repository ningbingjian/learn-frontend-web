# TS-KP008 练习：给错误分类

请先修改 [`main.ts`](./main.ts)。

## 任务

当前有一个重复字符串函数和一段配置 JSON。

请完成：

1. 给 `repeatText(text, times)` 添加 `string`、`number` 和返回值类型。
2. 验证 `repeatText(2, 'hi')` 属于编译期类型错误。
3. 保留一个损坏 JSON 字符串，并使用 `try/catch` 捕获 `JSON.parse()` 的运行时异常。
4. 再思考 `repeatText('hi', -1)` 属于哪一类问题：类型错误、运行时异常还是业务规则问题？

## 验收

你应该能够把问题分成：

```text
静态类型诊断
运行时异常
业务规则/边界条件
```

参考答案：[`../solution/main.ts`](../solution/main.ts)。
