# Chapter 02：基础类型与类型推断

> [返回 TypeScript 模块索引](../README.md)

本章不以“背类型列表”为目标，而是反复做同一个实验：**先观察 JavaScript 真实值，再看 TypeScript 如何描述、限制和推断它。**

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | JavaScript 的真实值如何映射成 TypeScript 类型？什么时候需要显式注解，什么时候应信任推断？ |
| 主教学模式 | `BUILD-LAB` |
| 辅助教学模式 | `FAILURE-LAB` + 轻量 `BROWSER/JS-MECHANISM` 观察 |
| Learning Artifact | `tsc` Diagnostic、IDE Hover、Node `typeof` / Console、负向类型实验 |
| Wrong Way | 机械给所有变量注解、滥用 `any`、把 `null/undefined` 混为一谈、把 wrapper `Object` 当小写基础类型 |
| Chapter DoD | 能从真实值、静态类型、推断结果、运行时 `typeof` 四个角度解释基础类型与特殊类型 |

## 学习顺序

### Lesson 02.1：原始类型

| 编号 | 知识点 | 文档与源码 | 教学状态 |
|---|---|---|---|
| TS-KP017 | `string` | [文档](./kp017-string/README.md) · [源码](./kp017-string/src/main.ts) | 已重构 · v1.0 |
| TS-KP018 | `number` | [文档](./kp018-number/README.md) · [源码](./kp018-number/src/main.ts) | 已重构 · v1.0 |
| TS-KP019 | `boolean` | [文档](./kp019-boolean/README.md) · [源码](./kp019-boolean/src/main.ts) | 已完成 · 待重构 |
| TS-KP020 | `bigint` | [文档](./kp020-bigint/README.md) · [源码](./kp020-bigint/src/main.ts) | 已完成 · 待重构 |
| TS-KP021 | `symbol` | [文档](./kp021-symbol/README.md) · [源码](./kp021-symbol/src/main.ts) | 已完成 · 待重构 |
| TS-KP022 | `null` | [文档](./kp022-null/README.md) · [源码](./kp022-null/src/main.ts) | 已完成 · 待重构 |
| TS-KP023 | `undefined` | [文档](./kp023-undefined/README.md) · [源码](./kp023-undefined/src/main.ts) | 已完成 · 待重构 |

### Lesson 02.2：特殊类型

| TS-KP024 | `any` | [文档](./kp024-any/README.md) · [源码](./kp024-any/src/main.ts) | 已完成 · 待重构 |
| TS-KP025 | `unknown` | [文档](./kp025-unknown/README.md) · [源码](./kp025-unknown/src/main.ts) | 已完成 · 待重构 |
| TS-KP026 | `never` | [文档](./kp026-never/README.md) · [源码](./kp026-never/src/main.ts) | 已完成 · 待重构 |
| TS-KP027 | `void` | [文档](./kp027-void/README.md) · [源码](./kp027-void/src/main.ts) | 已完成 · 待重构 |
| TS-KP028 | `object` | [文档](./kp028-object/README.md) · [源码](./kp028-object/src/main.ts) | 已完成 · 待重构 |
| TS-KP029 | `{}` 与 `Object` | [文档](./kp029-empty-object-vs-object/README.md) · [源码](./kp029-empty-object-vs-object/src/main.ts) | 已完成 · 待重构 |

### Lesson 02.3：推断与上下文类型

| TS-KP030 | 变量类型推断 | [文档](./kp030-variable-type-inference/README.md) · [源码](./kp030-variable-type-inference/src/main.ts) | 已完成 · 待重构 |
| TS-KP031 | 函数返回值推断 | [文档](./kp031-return-type-inference/README.md) · [源码](./kp031-return-type-inference/src/main.ts) | 已完成 · 待重构 |
| TS-KP032 | Contextual Typing | [文档](./kp032-contextual-typing/README.md) · [源码](./kp032-contextual-typing/src/main.ts) | 已完成 · 待重构 |
| TS-KP033 | Best Common Type | [文档](./kp033-best-common-type/README.md) · [源码](./kp033-best-common-type/src/main.ts) | 已完成 · 待重构 |
| TS-KP034 | Literal Widening | [文档](./kp034-literal-widening/README.md) · [源码](./kp034-literal-widening/src/main.ts) | 已完成 · 待重构 |
| TS-KP035 | 控制流类型分析概览 | [文档](./kp035-control-flow-analysis-overview/README.md) · [源码](./kp035-control-flow-analysis-overview/src/main.ts) | 已完成 · 待重构 |

## 当前进度

- 知识点完成度：**19/19**。
- 新教学规范重构：**2/19**。
- 下一批：TS-KP019～024。
