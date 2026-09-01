# Chapter 03：数组、元组、对象与索引结构

> [返回 TypeScript 模块索引](../README.md)

从单值进入结构化数据：数组约束元素、Tuple 约束位置、对象约束命名属性、Index Signature 约束动态键。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 主线问题 | 如何让 TypeScript 精确描述“集合、位置、属性、动态键”四类结构？ |
| 主模式 | `BUILD-LAB` |
| 辅助模式 | `FAILURE-LAB` + 结构对照实验 |
| Learning Artifact | `tsc` Diagnostic、IDE Hover、数组/tuple/object Runtime Console、Mutation 负向实验 |
| Wrong Way | 数组和 Tuple 混用、误把 readonly 当 runtime freeze、用 `{}` 代替具体对象、误解 Index Signature |
| Chapter DoD | 能根据业务结构选择 Array/Tuple/Object/Index Signature，并解释静态约束与 JS Runtime 容器的关系 |

## 学习顺序

### Lesson 03.1：数组与元组
| 编号 | 知识点 | 文档与源码 | 教学状态 |
|---|---|---|---|
| TS-KP036 | `T[]` 与 `Array<T>` | [文档](./kp036-array-syntax/README.md) · [源码](./kp036-array-syntax/src/main.ts) | 已重构 · v1.0 |
| TS-KP037 | 只读数组 | [文档](./kp037-readonly-array/README.md) · [源码](./kp037-readonly-array/src/main.ts) | 已完成 · 待重构 |
| TS-KP038 | Tuple 基础 | [文档](./kp038-tuple-basics/README.md) · [源码](./kp038-tuple-basics/src/main.ts) | 已完成 · 待重构 |
| TS-KP039 | 可选 Tuple 元素 | [文档](./kp039-optional-tuple-elements/README.md) · [源码](./kp039-optional-tuple-elements/src/main.ts) | 已完成 · 待重构 |
| TS-KP040 | Rest Tuple 元素 | [文档](./kp040-rest-tuple-elements/README.md) · [源码](./kp040-rest-tuple-elements/src/main.ts) | 已完成 · 待重构 |
| TS-KP041 | Named Tuple Elements | [文档](./kp041-named-tuple-elements/README.md) · [源码](./kp041-named-tuple-elements/src/main.ts) | 已完成 · 待重构 |
| TS-KP042 | Readonly Tuple | [文档](./kp042-readonly-tuple/README.md) · [源码](./kp042-readonly-tuple/src/main.ts) | 已完成 · 待重构 |
| TS-KP043 | Variadic Tuple Types | [文档](./kp043-variadic-tuple-types/README.md) · [源码](./kp043-variadic-tuple-types/src/main.ts) | 已完成 · 待重构 |

### Lesson 03.2：对象类型
| 编号 | 知识点 | 文档与源码 | 教学状态 |
|---|---|---|---|
| TS-KP044 | 匿名对象类型 | [文档](./kp044-anonymous-object-types/README.md) · [源码](./kp044-anonymous-object-types/src/main.ts) | 已完成 · 待重构 |
| TS-KP045 | 可选属性 | [文档](./kp045-optional-properties/README.md) · [源码](./kp045-optional-properties/src/main.ts) | 已完成 · 待重构 |
| TS-KP046 | `readonly` 属性 | [文档](./kp046-readonly-properties/README.md) · [源码](./kp046-readonly-properties/src/main.ts) | 已完成 · 待重构 |
| TS-KP047 | 索引签名 | [文档](./kp047-index-signatures/README.md) · [源码](./kp047-index-signatures/src/main.ts) | 已完成 · 待重构 |
| TS-KP048 | 数字索引与字符串索引 | [文档](./kp048-number-string-index/README.md) · [源码](./kp048-number-string-index/src/main.ts) | 已完成 · 待重构 |
| TS-KP049 | Excess Property Checking | [文档](./kp049-excess-property-checking/README.md) · [源码](./kp049-excess-property-checking/src/main.ts) | 已完成 · 待重构 |
| TS-KP050 | 对象字面量新鲜度 | [文档](./kp050-object-literal-freshness/README.md) · [源码](./kp050-object-literal-freshness/src/main.ts) | 已完成 · 待重构 |
| TS-KP051 | 嵌套对象类型设计 | [文档](./kp051-nested-object-type-design/README.md) · [源码](./kp051-nested-object-type-design/src/main.ts) | 已完成 · 待重构 |

## 当前进度
- 知识点：**16/16**。
- 新规范重构：**1/16**。
- 下一批：TS-KP037～042。
