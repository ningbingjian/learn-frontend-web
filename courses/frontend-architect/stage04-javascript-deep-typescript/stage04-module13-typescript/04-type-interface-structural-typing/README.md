# Chapter 04：`type`、`interface` 与结构化类型

> [返回 TypeScript 模块索引](../README.md)

## 章节定位

Chapter 03 已经能够直接写复杂对象结构，但如果同一结构在多个位置重复出现，继续复制匿名对象类型会快速失控。

本章开始解决“如何给类型结构命名、复用、扩展和组织”的问题，并逐步建立 TypeScript 结构化类型系统的工程直觉。

```text
匿名结构
  ↓
给结构命名：type / interface
  ↓
复用与组合
  ↓
继承 / 声明合并
  ↓
选择策略
  ↓
结构化类型
```

## 学习顺序

### Lesson 04.1：类型别名

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP052 | `type` 基础 | [文档](./kp052-type-basics/README.md) · [源码](./kp052-type-basics/src/main.ts) | 已完成 |
| TS-KP053 | 类型别名组合 | [文档](./kp053-type-alias-composition/README.md) · [源码](./kp053-type-alias-composition/src/main.ts) | 已完成 |
| TS-KP054 | 递归类型别名 | [文档](./kp054-recursive-type-aliases/README.md) · [源码](./kp054-recursive-type-aliases/src/main.ts) | 已完成 |

### Lesson 04.2：接口

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP055 | `interface` 基础 | [文档](./kp055-interface-basics/README.md) · [源码](./kp055-interface-basics/src/main.ts) | 已完成 |
| TS-KP056 | 接口继承 | `kp056-interface-extends/` | 待生成 |
| TS-KP057 | 多接口继承 | `kp057-multiple-interface-extends/` | 待生成 |
| TS-KP058 | 接口声明合并 | `kp058-interface-declaration-merging/` | 待生成 |
| TS-KP059 | 接口调用签名 | `kp059-interface-call-signatures/` | 待生成 |
| TS-KP060 | 接口构造签名 | `kp060-interface-construct-signatures/` | 待生成 |

### Lesson 04.3：如何选择

| 编号 | 知识点 | 知识点目录 | 状态 |
|---|---|---|---|
| TS-KP061 | `type` 与 `interface` 相同点 | `kp061-type-interface-similarities/` | 待生成 |
| TS-KP062 | `type` 与 `interface` 差异 | `kp062-type-interface-differences/` | 待生成 |
| TS-KP063 | 公共库 API 中的选择策略 | `kp063-public-api-choice-strategy/` | 待生成 |
| TS-KP064 | 结构化类型与名义类型的区别 | `kp064-structural-vs-nominal-typing/` | 待生成 |

## 本章学习原则

1. 先把 `type` 理解成“给一个类型表达式取名字”，不要把它误解成创建新的运行时类型。
2. `type` 可以给对象、原始类型、Tuple、联合类型等多种类型取名；本批先从对象结构和别名引用开始。
3. `interface` 先理解成“给对象形状建立可复用契约”，继承、声明合并等能力后续逐节展开。
4. TypeScript 兼容性主要看结构，而不是 Java/C# 风格的显式名义关系。
5. 不急着在本章开头争论 `type` 和 `interface` 谁更好；先分别掌握能力，再在 Lesson 04.3 做选择。
6. 每个知识点保留真实 `src/`，不创建独立 `exercise/`、`solution/`。

## 完成标准

一个知识点标记为“已完成”需要同时满足：

1. README 包含学习目标、理论讲解、从 0 到 1 动手编码、运行案例和效果验证。
2. README 中的代码步骤能从最小文件逐步得到最终案例。
3. 明确区分本节核心代码与实验辅助代码。
4. `src/`、路径、运行命令和预期输出保持一致。
5. 最终源码能够通过严格类型检查、编译并运行。

## 当前进度

- Lesson 04.1：3/3 已完成。
- Lesson 04.2：1/6 已完成。
- Lesson 04.3：0/4。
- Chapter 04：4/13 已完成。
- 下一知识点：TS-KP056「接口继承」。
