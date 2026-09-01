# TS-KP024：`any`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` |
| 学习深度 | **Must** |
| 主问题 | 为什么 `any` 能让编译器安静，却把错误推迟到 Runtime？ |
| Learning Artifact | 通过 typecheck 的错误调用 + Runtime Crash + 静态 number/运行时 string 错位 |
| 暂不理解 | `unknown` 的完整替代策略（下一课） |

## 这节课只需要搞懂什么

1. `any` 基本关闭该值周围的类型检查保护。
2. 它能传播错误的静态信任。
3. `any` 是迁移/边界逃生口，不应成为默认模型。

## 先预测

下面是否能通过 `tsc`？

```ts
unsafeNormalize(42)
const count: number = rawValue.count // 实际 "3"
```

如果通过，Runtime 会发生什么？

## 动手实验

### Step 0：正确 string

输出：

```text
TYPESCRIPT
```

### Step 1：同一个函数传 number

因为参数是 `any`，静态阶段放行；运行得到：

```text
runtime error: value.trim is not a function
```

### Step 2：观察信任污染

```ts
const rawValue: any = { count: '3' };
const count: number = rawValue.count;
```

`tsc` 接受，但 Runtime：

```text
count runtime type=string
```

### 立即解释

`any` 没有把 string 转成 number；它只是让类型系统停止追问。

## 心智模型

```text
unknown data → any → Type Checker trust gap → later Runtime failure
```

## Wrong Way / Production Boundary

- 不要用 `any` 修复错误信息；它经常只是隐藏问题。
- 旧系统迁移可临时使用，但应限制边界、统计债务、逐步收敛。
- 外部数据优先 `unknown` + validation。

## 本课只记住 3 件事

1. **any 是“关闭检查”，不是“万能安全类型”。**
2. **any 会传播不真实的静态信任。**
3. **优先缩小 any 的作用域和生命周期。**

## Challenge

把函数参数从 any 改成 unknown，不做其他修改，记录出现的错误；这就是下一课的起点。

## Mastery Check

**Must** 能解释两个 Runtime 故障为何被 any 放过；**Should** 能用 unknown/guard 替代边界 any；**Expert** 能治理大型仓库 any 债务。

## 最终源码与代码边界

- 核心：`any` 对静态保护的关闭效果。
- 辅助：`try/catch` 用于观察故障而不中断实验。
- [最终源码](./src/main.ts)
