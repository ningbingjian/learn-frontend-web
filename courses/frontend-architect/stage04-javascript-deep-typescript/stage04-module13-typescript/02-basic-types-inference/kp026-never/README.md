# TS-KP026：`never`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `FAILURE-LAB` |
| 学习深度 | **Should** |
| 主问题 | 当一个 Union 的所有可能都被处理后，剩下的值是什么类型？ |
| Learning Artifact | `assertNever()` + 新增状态后产生编译错误 |
| 暂不理解 | 复杂条件类型中的 never 分布 |

## 只需要搞懂什么
1. `never` 表示理论上没有可能值。
2. 总是抛错/无法正常返回的函数可返回 never。
3. `assertNever` 能把遗漏 Union 分支变成编译错误。

## 先预测
当前 `draft | published` 两个 case 全处理后，default 中 status 还能是什么？

## 动手实验
### Step 0：完整 switch
运行：
```text
Draft
Published
```
### Step 1：观察 default
`assertNever(status)` 能成立，因为前面已排除全部成员。
### Step 2：制造新状态
临时把 Union 加入 `'archived'`，但不加 case。观察 `assertNever(status)` 处编译错误。

## 心智模型
```text
Union → 排除 draft → 排除 published → no possible member → never
```

## Wrong Way / Production Boundary
- never 不是 void；void 表示不关心返回值，never 表示根本不能正常产生返回值。
- 穷尽检查适合状态机、事件、协议类型。

## 只记住 3 件事
**never=不可能值；可用于抛错函数；可保护穷尽分支。**

## Challenge
加入 archived 并补齐 case，验证错误消失。

## Mastery Check
**Must** 能解释 never；**Should** 会 assertNever；**Expert** 能把穷尽检查纳入状态/协议设计。

## 最终源码与代码边界
- 核心：PublishStatus + assertNever。
- 辅助：Console 输出两个合法分支。
- [最终源码](./src/main.ts)
