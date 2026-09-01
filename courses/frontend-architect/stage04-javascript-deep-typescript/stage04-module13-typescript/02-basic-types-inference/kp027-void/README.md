# TS-KP027：`void`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 主问题 | 一个函数“主要做副作用、不提供业务返回值”时，静态 `void` 与 Runtime `undefined` 有什么关系？ |
| Learning Artifact | void 函数调用结果 + `typeof` |
| 暂不理解 | callback 中 void 特殊兼容规则 |

## 只需要搞懂什么
1. `void` 常描述调用方不依赖返回值的函数契约。
2. 普通没有 return 的 JS 函数运行时返回 `undefined`。
3. void 是类型语义，不等于把 Runtime 值“变成 void”。

## 先预测
`const result = logOrderCreated(1001)` 后，`result` 和 `typeof result` 是什么？

## 动手实验
运行最终源码：
```text
created order=1001
undefined
undefined
```
第一个是副作用；后两行观察调用结果。

## 心智模型
```text
function(): void → caller 不依赖业务返回值
JS Runtime 无 return → undefined
```

## Wrong Way / Production Boundary
- 不要把 void 理解为“函数不能执行任何东西”。
- 事件/日志/回调 API 常用 void；callback 返回值兼容有特殊规则，后续单独学。

## 只记住 3 件事
**void 描述返回契约；副作用仍可发生；Runtime 无 return 通常得到 undefined。**

## Challenge
临时 `return 123` 并保持显式 `: void`，观察编译反馈，再恢复。

## Mastery Check
**Must** 会使用 void；**Should** 区分 void/undefined；**Expert** 知道 callback void 需要单独理解。

## 最终源码与代码边界
- 核心：void 返回契约。
- 辅助：result/typeof 用于观察。
- [最终源码](./src/main.ts)
