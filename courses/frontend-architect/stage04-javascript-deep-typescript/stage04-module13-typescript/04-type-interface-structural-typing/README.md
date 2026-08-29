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
调用 / 构造契约
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
| TS-KP056 | 接口继承 | [文档](./kp056-interface-extends/README.md) · [源码](./kp056-interface-extends/src/main.ts) | 已完成 |
| TS-KP057 | 多接口继承 | [文档](./kp057-multiple-interface-extends/README.md) · [源码](./kp057-multiple-interface-extends/src/main.ts) | 已完成 |
| TS-KP058 | 接口声明合并 | [文档](./kp058-interface-declaration-merging/README.md) · [源码](./kp058-interface-declaration-merging/src/main.ts) | 已完成 |
| TS-KP059 | 接口调用签名 | [文档](./kp059-interface-call-signatures/README.md) · [源码](./kp059-interface-call-signatures/src/main.ts) | 已完成 |
| TS-KP060 | 接口构造签名 | [文档](./kp060-interface-construct-signatures/README.md) · [源码](./kp060-interface-construct-signatures/src/main.ts) | 已完成 |

### Lesson 04.3：如何选择

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP061 | `type` 与 `interface` 相同点 | [文档](./kp061-type-interface-similarities/README.md) · [源码](./kp061-type-interface-similarities/src/main.ts) | 已完成 |
| TS-KP062 | `type` 与 `interface` 差异 | [文档](./kp062-type-interface-differences/README.md) · [源码](./kp062-type-interface-differences/src/main.ts) | 已完成 |
| TS-KP063 | 公共库 API 中的选择策略 | [文档](./kp063-public-api-choice-strategy/README.md) · [源码](./kp063-public-api-choice-strategy/src/main.ts) | 已完成 |
| TS-KP064 | 结构化类型与名义类型的区别 | `kp064-structural-vs-nominal-typing/` | 待生成 |

## 本章学习原则

1. `type` 先理解成“给一个类型表达式取名字”，不要把它误解成创建新的运行时类型。
2. `interface` 先理解成“给对象形状与对象能力建立可复用契约”。
3. 接口不仅能描述普通属性，也能描述继承、声明合并、调用签名和构造签名。
4. `type` 与 `interface` 在对象建模上有很大重叠，但并不是完全相同的语法工具。
5. 工程选型不要背“永远用 type”或“永远用 interface”的口号，应根据 API 是否需要开放扩展、是否表达 Union/Tuple/函数别名等实际需求决定。
6. TypeScript 兼容性主要看结构，而不是 Java/C# 风格的显式名义关系。
7. 每个知识点保留真实 `src/`，不创建独立 `exercise/`、`solution/`。

## 完成标准

一个知识点标记为“已完成”需要同时满足：

1. README 包含学习目标、理论讲解、从 0 到 1 动手编码、运行案例和效果验证。
2. README 中的代码步骤能从最小文件逐步得到最终案例。
3. 明确区分本节核心代码与实验辅助代码。
4. `src/`、路径、运行命令和预期输出保持一致。
5. 最终源码能够通过严格类型检查、编译并运行。

## 当前进度

- Lesson 04.1：3/3 已完成。
- Lesson 04.2：6/6 已完成。
- Lesson 04.3：3/4 已完成。
- Chapter 04：12/13 已完成。
- 下一知识点：TS-KP064「结构化类型与名义类型的区别」。
