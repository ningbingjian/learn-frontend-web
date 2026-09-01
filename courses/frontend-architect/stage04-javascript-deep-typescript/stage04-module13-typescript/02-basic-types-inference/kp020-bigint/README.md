# TS-KP020：`bigint`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 主问题 | 超过 `Number.MAX_SAFE_INTEGER` 的整数，为什么要进入 bigint 世界？ |
| Learning Artifact | 大整数加法结果 + `typeof bigint` |
| 暂不理解 | bigint 序列化/API 兼容策略 |

## 这节课只需要搞懂什么

1. `123n` 是 bigint literal。
2. bigint 与 number 是不同数值域，不能随意混算。
3. bigint 适合需要精确大整数的场景。

## 先预测

`9_007_199_254_740_993n + 7n` 是否精确？`typeof` 是什么？如果把 `7n` 改成 `7` 呢？

## 动手实验

### Step 0：运行最终大整数

结果：

```text
9007199254741000
bigint
```

### Step 1：只把右操作数改成 number

临时让 `addCounts(requestCount, 7)`，观察 Type Error。恢复。

### 立即解释

TypeScript 在静态阶段阻止 bigint/number 无意混用；Runtime 也有对应的大整数语义。

## 心智模型

```text
安全大整数边界之外
      ↓
BigInt runtime value (`n`)
      ↓
TypeScript bigint
```

## Wrong Way / Production Boundary

- bigint 不是“更大的 number”，不要无脑替换所有数值。
- `JSON.stringify()` 等生态边界需要额外设计；数据库/接口也要明确编码格式。

## 本课只记住 3 件事

1. **bigint 用于精确整数。**
2. **number 与 bigint 不能随意混算。**
3. **使用前要考虑序列化和系统边界。**

## Challenge

尝试 `Number(requestCount)`，比较类型转换后精度风险；不要把转换当推荐方案。

## Mastery Check

**Must** 会声明/运算 bigint；**Should** 知道混算限制；**Expert** 能设计 API/DB bigint 边界。

## 最终源码与代码边界

- 核心：bigint literal、参数、返回值。
- 辅助：`toString()`/`typeof` 用于观察。
- [最终源码](./src/main.ts)
