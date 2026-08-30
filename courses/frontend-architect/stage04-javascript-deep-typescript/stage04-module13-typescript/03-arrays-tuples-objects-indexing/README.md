# Chapter 03：数组、元组、对象与索引结构

> [返回 TypeScript 模块索引](../README.md)

## 章节定位

本章从“单个值的类型”进入“结构化数据的类型”。重点学习数组如何约束元素、Tuple 如何约束位置、对象如何描述属性，以及索引签名如何描述动态键结构。

本章不是单纯记忆几种语法，而是建立下面这条结构化类型链路：

```text
单个值
  ↓
同类值集合：Array
  ↓
固定位置结构：Tuple
  ↓
命名属性结构：Object Type
  ↓
动态键结构：Index Signature
```

## 学习顺序

### Lesson 03.1：数组与元组

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP036 | `T[]` 与 `Array<T>` | [文档](./kp036-array-syntax/README.md) · [源码](./kp036-array-syntax/src/main.ts) | 已完成 |
| TS-KP037 | 只读数组 `readonly T[]` / `ReadonlyArray<T>` | [文档](./kp037-readonly-array/README.md) · [源码](./kp037-readonly-array/src/main.ts) | 已完成 |
| TS-KP038 | Tuple 基础 | [文档](./kp038-tuple-basics/README.md) · [源码](./kp038-tuple-basics/src/main.ts) | 已完成 |
| TS-KP039 | 可选 Tuple 元素 | [文档](./kp039-optional-tuple-elements/README.md) · [源码](./kp039-optional-tuple-elements/src/main.ts) | 已完成 |
| TS-KP040 | Rest Tuple 元素 | [文档](./kp040-rest-tuple-elements/README.md) · [源码](./kp040-rest-tuple-elements/src/main.ts) | 已完成 |
| TS-KP041 | Named Tuple Elements | [文档](./kp041-named-tuple-elements/README.md) · [源码](./kp041-named-tuple-elements/src/main.ts) | 已完成 |
| TS-KP042 | Readonly Tuple | [文档](./kp042-readonly-tuple/README.md) · [源码](./kp042-readonly-tuple/src/main.ts) | 已完成 |
| TS-KP043 | Variadic Tuple Types | [文档](./kp043-variadic-tuple-types/README.md) · [源码](./kp043-variadic-tuple-types/src/main.ts) | 已完成 |

### Lesson 03.2：对象类型

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP044 | 匿名对象类型 | [文档](./kp044-anonymous-object-types/README.md) · [源码](./kp044-anonymous-object-types/src/main.ts) | 已完成 |
| TS-KP045 | 可选属性 | [文档](./kp045-optional-properties/README.md) · [源码](./kp045-optional-properties/src/main.ts) | 已完成 |
| TS-KP046 | `readonly` 属性 | [文档](./kp046-readonly-properties/README.md) · [源码](./kp046-readonly-properties/src/main.ts) | 已完成 |
| TS-KP047 | 索引签名 | [文档](./kp047-index-signatures/README.md) · [源码](./kp047-index-signatures/src/main.ts) | 已完成 |
| TS-KP048 | 数字索引与字符串索引 | [文档](./kp048-number-string-index/README.md) · [源码](./kp048-number-string-index/src/main.ts) | 已完成 |
| TS-KP049 | Excess Property Checking | [文档](./kp049-excess-property-checking/README.md) · [源码](./kp049-excess-property-checking/src/main.ts) | 已完成 |
| TS-KP050 | 对象字面量的新鲜度直觉 | [文档](./kp050-object-literal-freshness/README.md) · [源码](./kp050-object-literal-freshness/src/main.ts) | 已完成 |
| TS-KP051 | 嵌套对象类型设计 | [文档](./kp051-nested-object-type-design/README.md) · [源码](./kp051-nested-object-type-design/src/main.ts) | 已完成 |

## 本章学习原则

1. 区分“容器整体类型”和“容器内部元素/属性类型”。
2. 数组优先关注元素一致性，Tuple 优先关注固定位置语义。
3. 不把 Tuple 误解成 JavaScript 新增的运行时数据结构；它运行时仍然是数组。
4. `readonly` 先理解静态修改约束，不自动等价于深度不可变或运行时冻结。
5. 对象章节优先学习真实业务结构，不用 `{}`、`Object` 代替具体业务对象类型。
6. 每个知识点继续保留真实最终源码，不创建独立 `exercise/`、`solution/`。

## 完成标准

一个知识点标记为“已完成”需要同时满足：

1. README 包含学习目标、理论讲解、从 0 到 1 动手编码、运行案例和效果验证。
2. README 中的步骤可以从最小文件逐步得到最终案例。
3. 明确区分本节核心代码与实验辅助代码。
4. 真实 `src/` 源码与文档中的路径、命令和结果保持一致。
5. 最终源码能够按文档给出的方式完成类型检查、编译和运行。

## 当前进度

- Lesson 03.1：8/8 已完成。
- Lesson 03.2：8/8 已完成。
- Chapter 03：16/16 已完成。
- Chapter 03 已完成，下一步进入 Chapter 04 的 TS-KP052「`type` 基础」。
