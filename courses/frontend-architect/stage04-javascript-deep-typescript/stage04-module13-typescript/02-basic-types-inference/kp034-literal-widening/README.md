# TS-KP034：Literal Widening

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `FAILURE-LAB` |
| 学习深度 | **Should** |
| 主问题 | 同样是 `'draft'`，为什么有时类型是精确 `'draft'`，有时会变成宽泛 `string`？ |
| Learning Artifact | const/let/copy Hover + `acceptDraft()` 类型实验 |
| 暂不理解 | `as const`、Const Type Parameters |

## 只需要搞懂什么
1. Literal value 可以保留精确字面量类型，也可能因为可变上下文而 Widen。
2. `const` 与显式 literal annotation 能保留更精确信息。
3. Widening 反映“这个位置是否预计会被改成其他值”。

## 先预测
`initialStatus`、`mutableStatus`、`fixedStatus`、`copiedFixedStatus` 的 Hover 是否都一样？

## 动手实验
最终源码让 `mutableStatus = 'published'` 合法，同时：
```text
accepted:draft
accepted:draft
published
```
临时 `acceptDraft(mutableStatus)`，观察为什么宽泛 string 不能保证就是 draft。

## Wrong Way / Production Boundary
- 不要用大量显式 literal annotation 对抗推断；后续 `as const` / satisfies 有更自然的精确推断工具。
- API 状态常需要 Literal Union，而不是任意 string。

## 只记住 3 件事
**literal 可精确也可 widening；可变性会影响推断；精确 literal 能加强 API 契约。**

## Challenge
把 `let mutableStatus = 'draft'` 改成 const，观察 Hover/赋值/acceptDraft 三处变化。

## Mastery Check
**Must** 理解 widening；**Should** 会读 const/let 差异；**Expert** 能控制配置/状态 API 的 literal 精度。

## 最终源码与代码边界
- 核心：四种 status 推断对照。
- 辅助：acceptDraft 放大精度差异。
- [最终源码](./src/main.ts)
