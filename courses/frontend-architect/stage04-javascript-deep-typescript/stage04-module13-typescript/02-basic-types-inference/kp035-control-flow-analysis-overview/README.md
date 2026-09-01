# TS-KP035：控制流类型分析概览

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `MECHANISM-LAB` |
| 学习深度 | **Must** |
| 主问题 | 同一个变量为什么在不同 if 分支里能拥有不同的静态类型？ |
| Learning Artifact | 分支内 Hover + 赋值后 Hover + Runtime 输出 |
| 暂不理解 | 完整 Narrowing 规则（Chapter 06） |

## 只需要搞懂什么
1. TypeScript 会沿控制流追踪当前可能类型。
2. `=== null`、`typeof`、return、赋值都会改变当前位置的 observed type。
3. 声明类型没有被永久改写，变化的是程序位置上的视图。

## 先预测
`normalize(input: string|number|null)` 的三个返回分支中 input 分别是什么类型？

## 动手实验
运行：
```text
string:KEYBOARD
number:42.0
empty
length-or-number:5.0
length-or-number:7.0
```
在每个分支 Hover input；再看 `inspect()` 中 string 被赋值为 length 后，函数尾部 value 为什么能调用 `toFixed()`。

## 心智模型
```text
declared union → control-flow evidence → observed type at each program point
```

## Wrong Way / Production Boundary
- 不要用 `as` 跳过可以由控制流证明的事实。
- 复杂 callback/异步闭包可能影响 Narrowing 保持，后续深入。

## 只记住 3 件事
**类型随控制流位置变精确；Guard/return/assignment 都是证据；声明类型与 observed type 要区分。**

## Challenge
给 Input 增加 boolean，先看现有代码哪里报错，再设计新分支。

## Mastery Check
**Must** 能读分支类型；**Should** 能用 Early Return 简化 Narrowing；**Expert** 能解释声明类型与 observed type 的区别。

## 最终源码与代码边界
- 核心：normalize/inspect 控制流。
- 辅助：Console 覆盖不同路径。
- [最终源码](./src/main.ts)
