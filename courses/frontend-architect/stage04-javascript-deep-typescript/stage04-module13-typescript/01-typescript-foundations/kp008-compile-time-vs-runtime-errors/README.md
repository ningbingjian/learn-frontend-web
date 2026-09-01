# TS-KP008：编译期错误与运行时错误的区别

> [返回 Chapter 01](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` |
| 学习深度 | **Must** |
| 前置课程 | TS-KP001～007 |
| 本课主问题 | 参数类型全部正确，为什么程序仍能得到 `Infinity`，坏 JSON 仍会抛 `SyntaxError`？ |
| Learning Artifact | `tsc` 通过 + 两种 Runtime 现象 |
| 本课暂时不用理解 | 业务不变量建模、异常体系设计 |

## 这节课只需要搞懂什么

1. Compile-time Error 是类型检查阶段能证明的问题。
2. Runtime Error / 异常 / 非法业务结果发生在真实执行阶段。
3. “没有 Type Error”绝不等价于“运行一定正确”。

## 前置状态

```ts
function average(total: number, count: number): number {
  return total / count;
}
```

从类型关系看，`100` 和 `0` 都是合法 `number`。

## 本课主问题

为什么：

```ts
average(100, 0)
```

不会产生类型错误，却得到 `Infinity`？为什么一个字符串类型完全没问题的坏 JSON 还能在 `JSON.parse()` 时抛异常？

## 先预测

```text
average(100, 4) → ?
average(100, 0) → Type Error / Infinity / throw？
JSON.parse('{"name": }') → 编译错误 / Runtime Error？
```

## 动手编码：从 0 到 1

### Step 0：先验证正常值

运行最终函数：

```text
正常平均值: 25
```

### Step 1：只把 count 改成 0

类型检查仍然通过；Node 输出：

```text
除以零: Infinity
```

### 立即解释

`0` 的类型确实是 `number`。TypeScript 没有被要求证明“count 必须大于 0”。这不是 Type Error，而是运行时/业务语义问题。

---

### Step 2：制造真正 Runtime Exception

```ts
const brokenJson = '{"name": }';
JSON.parse(brokenJson);
```

通过 `try/catch` 观察：

```text
运行时异常: SyntaxError
```

这里字符串本身类型正确，但内容不满足 JSON Grammar。

---

### Step 3：反过来制造 Compile-time Error

临时写：

```ts
average('100', 4);
```

这次 `tsc` 在运行前就能证明参数类型不成立。

## 图解与心智模型

```text
Compile Time
类型关系能否成立？
      ↓
JavaScript Runtime
真实值怎么计算 / 是否抛异常？
      ↓
Business Correctness
结果是否符合领域规则？
```

## 理论收束

| 现象 | 分类 |
|---|---|
| string 传给 number 参数 | Compile-time Type Error |
| 100 / 0 得到 Infinity | Runtime JavaScript Result |
| JSON.parse 坏内容 | Runtime Exception |

## Wrong Way 与边界

- “`tsc` 通过，所以不需要测试”是错误结论。
- 不是所有 Runtime 问题都会 `throw`；`Infinity`、`NaN`、逻辑错误可能静默传播。

## Production Boundary

生产系统需要组合：Static Types + Runtime Validation + Business Invariants + Tests + Error Handling。TypeScript 只是其中一层。

## 本课只记住 3 件事

1. **Type Error 和 Runtime Error 发生在不同阶段。**
2. **类型合法的值仍可能产生非法业务结果。**
3. **运行时问题不一定以异常形式出现。**

## Challenge

把 `count` 改成 `-2`、`NaN`，分别预测输出；再思考哪些约束应由 Runtime Guard / Test 负责。

## Mastery Check

### Must
- 能区分本课三个现象属于哪个阶段。
### Should
- 能说明为什么 `number` 不能表达所有数值业务约束。
### Expert
- 能为生产 API 分配 Type / Validation / Error / Test 的职责。

## 最终源码与代码边界

- **核心代码**：`average()` 的数值边界与坏 JSON Runtime 现象。
- **实验辅助代码**：`try/catch` 只用于捕获并显示异常类型。
- **最终源码**：[`src/main.ts`](./src/main.ts)
