# TS-KP021：`symbol`

> [返回 Chapter 02](../README.md) · [最终源码](./src/main.ts)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | **Should** |
| 主问题 | 两次 `Symbol('productId')` 描述相同，为什么仍然不是同一个 key？ |
| Learning Artifact | Symbol-keyed property + equality + `typeof` |
| 暂不理解 | Well-known Symbols、深度库协议 |

## 这节课只需要搞懂什么

1. 每次 `Symbol()` 创建唯一值。
2. `symbol` 可作为对象属性 key。
3. `unique symbol` 能在类型层保留某个常量 Symbol 的唯一身份。

## 先预测

`productIdKey === fallbackKey` 是 true 还是 false？两个 Symbol description 都叫 `productId` 会影响唯一性吗？

## 动手实验

### Step 0：建立两个同描述 Symbol

```ts
const productIdKey: unique symbol = Symbol('productId');
const fallbackKey: symbol = Symbol('productId');
```

### Step 1：用唯一 key 存取属性

运行输出：

```text
product-001
false
symbol
```

### Step 2：尝试用 fallbackKey 读取

预测结果/类型反馈，再理解“description 不是 identity”。

## 心智模型

```text
Symbol('productId') → unique identity A
Symbol('productId') → unique identity B
A !== B
```

## Wrong Way / Production Boundary

- Symbol description 只便于调试，不是全局 ID。
- 跨模块共享身份时要明确导出同一 symbol 或考虑 `Symbol.for` 的全局注册语义。

## 本课只记住 3 件事

1. **Symbol 的核心是唯一身份。**
2. **description 相同不代表相等。**
3. **unique symbol 把某个常量 Symbol 的身份带进类型系统。**

## Challenge

把 key 导出/导入到两个文件中，比较“复用同一 symbol”与“各自重新 Symbol()”。

## Mastery Check

**Must** 理解 symbol 唯一性；**Should** 会用 symbol key；**Expert** 能区分 local symbol / registry / unique symbol 设计。

## 最终源码与代码边界

- 核心：symbol key 与 identity。
- 辅助：equality/`typeof` 日志。
- [最终源码](./src/main.ts)
