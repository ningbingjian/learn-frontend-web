# TS-KP029：`{}` 与 `Object` 的差异

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BUILD-LAB` |
| 学习深度 | **Should** |
| 主问题 | 为什么 `{}` 和 `Object` 居然能接受 string/number，而小写 `object` 不行？ |
| Learning Artifact | 三个函数对 string/number/object/array 的对照 |
| 暂不理解 | Top Types、NonNullable 的类型代数 |

## 只需要搞懂什么
1. `{}` 在 TS 中不是“空对象字段结构”的直觉含义。
2. `Object` 也不是推荐的“普通对象”类型写法。
3. 小写 `object` 才表达非 primitive。

## 先预测
`acceptsEmptyObject('text')`、`acceptsUpperObject(42)` 会不会通过？`acceptsNonPrimitive(42)` 呢？

## 动手实验
运行最终源码会看到 `{}` / `Object` 接受 primitive，而 `object` 示例只传普通对象/数组。
临时把 `42` 传给 `acceptsNonPrimitive()`，观察编译错误。

## 心智模型
```text
{} / Object → 大量 non-nullish values 可兼容
object      → non-primitive values
具体对象型   → 描述真实字段
```

## Wrong Way / Production Boundary
- 不要把 `{}` 当成“没有任何属性的严格空对象”。
- 常规业务对象优先具体 shape；只想非 primitive 时用 `object`。

## 只记住 3 件事
**{} 不是空对象；Object 通常不是业务建模首选；object 明确排除 primitive。**

## Challenge
把 `null/undefined/string/function` 分别测试三个函数，记录类型反馈矩阵。

## Mastery Check
**Must** 能区分三个写法；**Should** 能选择正确边界；**Expert** 能解释为什么公共 API 应避免含糊顶层对象类型。

## 最终源码与代码边界
- 核心：三个接受函数的类型对照。
- 辅助：日志只用于观察。
- [最终源码](./src/main.ts)
