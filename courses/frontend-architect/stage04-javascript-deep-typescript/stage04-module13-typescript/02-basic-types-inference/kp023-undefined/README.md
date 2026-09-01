# TS-KP023：`undefined`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Must** |
| 主问题 | “没有提供自定义超时”为什么自然地表现为 `undefined`？ |
| Learning Artifact | `number | undefined` 分支 + Runtime `typeof` |
| 暂不理解 | Optional Property / Optional Parameter 全部规则 |

## 这节课只需要搞懂什么

1. `undefined` 常表达“尚未提供/没有得到值”。
2. `T | undefined` 使用 T 能力前必须处理缺失。
3. Runtime `typeof undefined` 就是 `'undefined'`。

## 先预测

`resolveTimeout(false)` 的值、静态类型和 `typeof` 分别是什么？

## 动手实验

### Step 0：返回 number 或 undefined

```ts
function resolveTimeout(useCustomTimeout: boolean): number | undefined
```

### Step 1：先直接数值运算

临时对 `timeout` 做算术，观察“possibly undefined”。

### Step 2：加入判断并运行

结果：

```text
timeout=default
undefined
```

## 心智模型

```text
没有 custom timeout → undefined
             ↓ equality check
           default branch
```

## Wrong Way / Production Boundary

- null 和 undefined 都能表达缺失，但语义/序列化/属性存在性不同；团队 API 要统一。
- 不要用 non-null assertion `!` 直接压掉真实缺失风险。

## 本课只记住 3 件事

1. **undefined 常见于未提供值。**
2. **`T | undefined` 需要 Narrowing。**
3. **是否使用 null/undefined 是 API 设计决定。**

## Challenge

让 `resolveTimeout(true)` 走 number 分支，再比较 false 分支；记录两个分支内 Hover 类型。

## Mastery Check

**Must** 会处理 `T | undefined`；**Should** 能区分 null/undefined 语义；**Expert** 能制定公共 API 缺失值规范。

## 最终源码与代码边界

- 核心：number | undefined 及分支处理。
- 辅助：日志/`typeof`。
- [最终源码](./src/main.ts)
