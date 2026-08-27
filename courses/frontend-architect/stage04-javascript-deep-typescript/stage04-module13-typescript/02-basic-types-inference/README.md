# Chapter 02：基础类型与类型推断

> [返回 TypeScript 模块索引](../README.md)

## 章节定位

本章开始正式学习 TypeScript 的基础类型系统。学习重点不是背“有哪些类型”，而是理解：JavaScript 中真实存在的值如何被 TypeScript 描述、推断、检查，并逐步成为后续联合类型、泛型和高级类型的基础。

## 学习顺序

### Lesson 02.1：原始类型

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP017 | `string` | [文档](./kp017-string/README.md) · [源码](./kp017-string/src/main.ts) | 已完成 |
| TS-KP018 | `number` | [文档](./kp018-number/README.md) · [源码](./kp018-number/src/main.ts) | 已完成 |
| TS-KP019 | `boolean` | [文档](./kp019-boolean/README.md) · [源码](./kp019-boolean/src/main.ts) | 已完成 |
| TS-KP020 | `bigint` | [文档](./kp020-bigint/README.md) · [源码](./kp020-bigint/src/main.ts) | 已完成 |
| TS-KP021 | `symbol` | `kp021-symbol/` | 待生成 |
| TS-KP022 | `null` | `kp022-null/` | 待生成 |
| TS-KP023 | `undefined` | `kp023-undefined/` | 待生成 |

### Lesson 02.2：特殊类型

| 编号 | 知识点 | 知识点目录 | 状态 |
|---|---|---|---|
| TS-KP024 | `any` | `kp024-any/` | 待生成 |
| TS-KP025 | `unknown` | `kp025-unknown/` | 待生成 |
| TS-KP026 | `never` | `kp026-never/` | 待生成 |
| TS-KP027 | `void` | `kp027-void/` | 待生成 |
| TS-KP028 | `object` | `kp028-object/` | 待生成 |
| TS-KP029 | `{}` 与 `Object` 的差异 | `kp029-empty-object-vs-object/` | 待生成 |

### Lesson 02.3：推断与上下文类型

| 编号 | 知识点 | 知识点目录 | 状态 |
|---|---|---|---|
| TS-KP030 | 变量类型推断 | `kp030-variable-type-inference/` | 待生成 |
| TS-KP031 | 函数返回值推断 | `kp031-return-type-inference/` | 待生成 |
| TS-KP032 | Contextual Typing | `kp032-contextual-typing/` | 待生成 |
| TS-KP033 | Best Common Type | `kp033-best-common-type/` | 待生成 |
| TS-KP034 | Literal Widening | `kp034-literal-widening/` | 待生成 |
| TS-KP035 | 控制流类型分析概览 | `kp035-control-flow-analysis-overview/` | 待生成 |

## 本章学习原则

1. 优先使用小写基础类型名称，例如 `string`、`number`、`boolean`。
2. 每个知识点都同时观察静态类型和 JavaScript 运行时值。
3. 不为了“写 TypeScript”而机械给每个局部变量添加显式类型，逐步建立类型推断意识。
4. 每个知识点保留真实 `src/` 最终源码，不创建独立 `exercise/`、`solution/`。
5. 复杂类型组合留到后续章节，本章先把基础值模型建立牢固。

## 完成标准

一个知识点标记“已完成”需要同时具备：学习目标、理论讲解、从 0 到 1 动手编码、真实最终源码、运行案例和效果验证。

## 当前进度

- Lesson 02.1：4/7 已完成。
- Lesson 02.2：0/6。
- Lesson 02.3：0/6。
- Chapter 02：4/19 已完成。
- 下一知识点：TS-KP021「`symbol`」。
