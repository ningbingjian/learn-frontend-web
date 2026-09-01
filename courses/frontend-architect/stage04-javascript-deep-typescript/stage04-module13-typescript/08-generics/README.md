# Chapter 08：泛型基础到高级泛型

> [返回 TypeScript 模块索引](../README.md)

## 章节定位

前面的章节已经学会描述具体类型、函数契约、联合状态和精确推断。本章开始解决另一个核心问题：

> **如何写一份类型逻辑，让它在多种具体类型之间复用，同时保留类型关系？**

如果只是使用 `any`：

```text
可以接收很多值
但类型信息丢失
```

泛型希望做到：

```text
接收不同类型
    +
保留输入与输出之间的类型关系
    +
让调用方尽量获得自动推断
```

典型形式：

```ts
function identity<T>(value: T): T {
  return value;
}
```

这里真正重要的不是字母 `T`，而是：

```text
输入是什么类型
    ↓
T 记录这个类型
    ↓
返回值继续使用同一个 T
```

## 学习顺序

### Lesson 08.1：泛型基础

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP107 | Generic Function | [文档](./kp107-generic-function/README.md) · [源码](./kp107-generic-function/src/main.ts) | 已完成 |
| TS-KP108 | Type Parameter | [文档](./kp108-type-parameter/README.md) · [源码](./kp108-type-parameter/src/main.ts) | 已完成 |
| TS-KP109 | 泛型类型推断 | [文档](./kp109-generic-type-inference/README.md) · [源码](./kp109-generic-type-inference/src/main.ts) | 已完成 |
| TS-KP110 | 多个类型参数 | `kp110-multiple-type-parameters/` | 待生成 |
| TS-KP111 | 泛型 Interface | `kp111-generic-interface/` | 待生成 |
| TS-KP112 | 泛型 Type Alias | `kp112-generic-type-alias/` | 待生成 |
| TS-KP113 | 泛型 Class | `kp113-generic-class/` | 待生成 |

### Lesson 08.2：泛型约束

| 编号 | 知识点 | 知识点目录 | 状态 |
|---|---|---|---|
| TS-KP114 | Generic Constraints | `kp114-generic-constraints/` | 待生成 |
| TS-KP115 | `extends` Constraint | `kp115-extends-constraint/` | 待生成 |
| TS-KP116 | `keyof` Constraint | `kp116-keyof-constraint/` | 待生成 |
| TS-KP117 | 泛型默认类型参数 | `kp117-generic-default-type-parameter/` | 待生成 |
| TS-KP118 | 泛型参数之间建立约束关系 | `kp118-related-type-parameters/` | 待生成 |
| TS-KP119 | Const Type Parameters | `kp119-const-type-parameters/` | 待生成 |

### Lesson 08.3：泛型设计

| 编号 | 知识点 | 知识点目录 | 状态 |
|---|---|---|---|
| TS-KP120 | 推断优先还是显式参数优先 | `kp120-inference-vs-explicit/` | 待生成 |
| TS-KP121 | 减少无意义泛型参数 | `kp121-reduce-useless-type-parameters/` | 待生成 |
| TS-KP122 | 泛型 API 的调用体验 | `kp122-generic-api-experience/` | 待生成 |
| TS-KP123 | 泛型约束过宽与过窄问题 | `kp123-constraint-width/` | 待生成 |
| TS-KP124 | 泛型导致错误信息复杂化的治理 | `kp124-generic-error-governance/` | 待生成 |

## 本章学习原则

1. 泛型的核心价值是保存类型之间的关系，而不是单纯“允许多种类型”。
2. `any` 也能接收很多类型，但会丢失调用前后的精确信息；泛型应该尽量保留它。
3. Type Parameter 是类型层占位符，只在类型检查阶段存在，不是运行时变量。
4. 调用泛型函数时优先依赖 Type Argument Inference；只有推断失败或需要主动指定更宽/不同目标时再显式传类型参数。
5. 在函数体内必须按照当前对 Type Parameter 已知的能力编程；无约束 `T` 不能随意访问 `.length` 等成员。
6. 后续约束、`keyof`、默认参数、const type parameters 都是在“保留关系”的基础上进一步限制和优化推断。
7. 好的泛型 API 应优先追求调用简单、推断稳定、错误信息可理解，而不是参数数量越多越高级。
8. 每个知识点保留真实 `src/`，不创建独立 `exercise/`、`solution/`。

## 完成标准

1. README 遵循学习目标 → 理论讲解 → 从 0 到 1 → 运行案例 → 效果验证。
2. README 与最终源码、命令和输出保持一致。
3. 明确区分核心代码与实验辅助代码。
4. 最终源码能在 strict 模式下通过类型检查并运行。

## 当前进度

- Lesson 08.1：3/7 已完成。
- Lesson 08.2：0/6。
- Lesson 08.3：0/5。
- Chapter 08：3/18 已完成。
- 下一知识点：TS-KP110「多个类型参数」。
