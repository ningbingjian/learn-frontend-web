# TS-KP033：Best Common Type

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Should** |
| 主问题 | `[10,20,30]` 与 `[10,'20',30]` 为什么得到不同元素类型？ |
| Learning Artifact | Array Hover + map callback 能力差异 |
| 暂不理解 | 复杂候选类型算法内部实现 |

## 只需要搞懂什么
1. 多个候选值会共同影响集合推断。
2. 同质数组得到 number[]；混合数组通常得到 `(number|string)[]`。
3. Union 元素使用专属能力前需要 Narrowing。

## 先预测
Hover `scores` 和 `mixedValues`；哪个 map callback 能直接 `toFixed()`？

## 动手实验
最终输出：
```text
10.0, 20.0, 30.0
number:10.0 | string:20 | number:30.0
```
把混合数组 callback 直接写 `value.toFixed()`，观察错误；用 `typeof` 分支恢复安全能力。

## 心智模型
```text
array element candidates → common compatible type → array element type
```

## Wrong Way / Production Boundary
- 推断出的 Union 不是 any；它要求处理每种可能。
- 业务数组如果不该混合类型，应从模型源头限制，而不是下游到处 Narrow。

## 只记住 3 件事
**多个元素共同参与推断；混合元素形成 Union；Union 使用前需收窄。**

## Challenge
加入 `true`，预测元素类型和 describe 需要增加的分支。

## Mastery Check
**Must** 能读两种数组推断；**Should** 能 Narrow 混合数组；**Expert** 能判断是否该允许混合集合模型。

## 最终源码与代码边界
- 核心：scores/mixedValues 推断对照。
- 辅助：describe 展示 Union 处理。
- [最终源码](./src/main.ts)
