# TS-KP032：Contextual Typing

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 主问题 | 箭头函数参数没写类型，为什么编辑器仍知道 price 是 number、currency 是 string？ |
| Learning Artifact | Hover callback parameters + 故意调用错误成员 |
| 暂不理解 | 高级泛型上下文推断 |

## 只需要搞懂什么
1. 类型信息不仅从表达式“向右/向外”推断，也能从目标位置反向进入表达式。
2. 函数类型注解、回调参数位置都可提供 Context。
3. Contextual Typing 让回调不必重复写参数类型。

## 先预测
```ts
const formatPrice: PriceFormatter = (price, currency) => ...
```
`price`/`currency` 没注解，Hover 会是什么？

## 动手实验
最终源码输出：
```text
CNY 499.00
0:10.0 | 1:20.0 | 2:30.0
```
临时对 `price.toUpperCase()` 或 `currency.toFixed()`，观察 Diagnostic。这证明参数类型来自目标 `PriceFormatter`。
再观察 `buildLabels(..., (value,index)=>...)`，回调上下文同样提供 number。

## 心智模型
```text
Expected Function Type / Callback Position
             ↓ context
       arrow parameters
```

## Wrong Way / Production Boundary
- Contextual Typing 依赖目标类型；孤立函数表达式没有足够 Context 时可能需要注解。
- 好 API 的回调签名会直接影响调用者的推断体验。

## 只记住 3 件事
**Context 能反向提供类型；回调参数常无需重复注解；API 设计影响推断质量。**

## Challenge
把 formatter 参数类型改成 string，记录箭头函数 Hover 和错误变化。

## Mastery Check
**Must** 能指出参数类型来源；**Should** 会利用上下文减少冗余；**Expert** 能设计推断友好的 callback API。

## 最终源码与代码边界
- 核心：PriceFormatter 和 buildLabels callback context。
- 辅助：日志。
- [最终源码](./src/main.ts)
