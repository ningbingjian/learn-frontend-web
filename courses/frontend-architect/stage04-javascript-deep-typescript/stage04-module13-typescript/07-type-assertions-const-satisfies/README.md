# Chapter 07：类型断言、常量推断与 `satisfies`

> [返回 TypeScript 模块索引](../README.md)

## 章节定位

Chapter 06 已经建立了 Union、Literal、Narrowing、Type Predicate、Assertion Function 与 `never` 的完整控制流类型分析能力。

Chapter 07 进入另一组非常容易被滥用、但又极其常见的工具：**类型断言与精确推断控制**。

```text
编译器当前知道的类型
        ↓
开发者提供额外类型信息
        ↓
Type Assertion
        ↓
控制字面量是否拓宽
        ↓
const assertion
        ↓
既校验结构又尽量保留推断
        ↓
satisfies
```

本章最重要的目标不是“学会更多 `as`”，而是建立下面的边界：

```text
能让代码通过编译
≠
证明运行时数据真的安全
```

## 学习顺序

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP098 | `as` 类型断言 | [文档](./kp098-as-type-assertion/README.md) · [源码](./kp098-as-type-assertion/src/main.ts) | 已完成 |
| TS-KP099 | 尖括号断言及 TSX 限制 | [文档](./kp099-angle-bracket-assertion-tsx/README.md) · [源码](./kp099-angle-bracket-assertion-tsx/src/main.ts) | 已完成 |
| TS-KP100 | Double Assertion | [文档](./kp100-double-assertion/README.md) · [源码](./kp100-double-assertion/src/main.ts) | 已完成 |
| TS-KP101 | Non-null Assertion `!` | [文档](./kp101-non-null-assertion/README.md) · [源码](./kp101-non-null-assertion/src/main.ts) | 已完成 |
| TS-KP102 | `as const` | [文档](./kp102-as-const/README.md) · [源码](./kp102-as-const/src/main.ts) | 已完成 |
| TS-KP103 | Const Assertion 对对象、数组和字面量的影响 | [文档](./kp103-const-assertion-effects/README.md) · [源码](./kp103-const-assertion-effects/src/main.ts) | 已完成 |
| TS-KP104 | `satisfies` Operator | [文档](./kp104-satisfies-operator/README.md) · [源码](./kp104-satisfies-operator/src/main.ts) | 已完成 |
| TS-KP105 | `satisfies` 与类型注解的差异 | [文档](./kp105-satisfies-vs-annotation/README.md) · [源码](./kp105-satisfies-vs-annotation/src/main.ts) | 已完成 |
| TS-KP106 | 避免滥用断言掩盖模型错误 | [文档](./kp106-avoid-assertion-abuse/README.md) · [源码](./kp106-avoid-assertion-abuse/src/main.ts) | 已完成 |

## 本章学习原则

1. 类型断言是开发者向编译器提供额外信息，不是 Java / C# 风格的运行时强制类型转换。
2. `as T` 会在编译后被擦除，不会自动校验、转换、补字段或修复数据。
3. TypeScript 会阻止明显没有足够重叠关系的单次断言；Double Assertion 可以绕过这层保护，因此风险更高。
4. `as unknown as T` 应被视为迁移、边界适配或极少数底层场景的逃生口，不应成为日常建模方式。
5. Non-null Assertion `!` 只从静态类型中移除 `null | undefined`，不会增加运行时存在性检查。
6. 能通过 Narrowing、默认值、可选链、Assertion Function 或重新建模解决的问题，通常优先于 `!`。
7. `as const` 用于请求更精确的字面量推断：不拓宽 literal、对象属性变为 readonly、数组字面量变为 readonly tuple。
8. `as const` 是类型系统能力，不等于 `Object.freeze()`，也不保证所有被引用的内部对象在运行时深度不可变。
9. `const` 变量声明与 `as const` 不是同一件事：前者限制变量重新赋值，后者影响表达式的推断结果。
10. `satisfies` 用来检查表达式是否满足目标类型，同时尽量保留表达式自身的具体推断信息。
11. 显式类型注解会让变量从声明处就按注解类型被观察；`satisfies` 更适合“校验契约但保留更具体推断”的配置对象。
12. 看到 `as T`、`!`、Double Assertion 时，应优先追问：模型是否准确、边界是否完成运行时校验、能否通过 Narrowing 建立真实证据。
13. 网络、文件、数据库、用户输入等外部数据必须先视为不可信；类型断言不能替代 runtime validation。
14. 每个知识点保留真实 `src/`，不创建独立 `exercise/`、`solution/`。

## 完成标准

一个知识点标记为“已完成”需要同时满足：

1. README 包含学习目标、理论讲解、动手编码：从 0 到 1、运行案例和效果验证。
2. 动手编码从最小可运行文件逐步构造最终案例。
3. 明确区分“本节核心代码”和“实验辅助代码”。
4. README 中的路径、命令、预期输出与实际 `src/` 一致。
5. 最终源码能够通过严格类型检查、编译并运行。

## 当前进度

- Chapter 07：9/9 已完成。
- TS-KP098～TS-KP106 全部完成。
- Chapter 07 已完成，下一步进入 Chapter 08 的 TS-KP107「Generic Function」。
