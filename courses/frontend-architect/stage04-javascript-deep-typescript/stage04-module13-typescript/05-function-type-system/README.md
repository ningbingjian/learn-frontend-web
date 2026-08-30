# Chapter 05：函数类型系统

> [返回 TypeScript 模块索引](../README.md)

## 章节定位

前四章已经完成值类型、对象结构、`type`、`interface` 与结构化类型系统。本章把这些能力集中到 JavaScript 最核心的抽象之一：**函数**。

TypeScript 中的函数类型不只是“给参数加几个类型”。一个完整的函数契约至少包含：

```text
调用者传什么
    ↓
参数类型 / 参数数量
    ↓
函数内部如何使用
    ↓
返回什么
    ↓
返回值类型
```

继续深入后，还会遇到：

```text
可选参数 / 默认参数 / Rest 参数
        ↓
函数类型表达式
        ↓
调用签名 / 构造签名
        ↓
重载
        ↓
this 参数
        ↓
回调兼容性
        ↓
strictFunctionTypes / void 特殊规则
```

本章目标不是记忆函数语法，而是建立“**函数本身也是一个具有静态契约的值**”这一核心直觉。

## 学习顺序

### Lesson 05.1：函数声明

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP065 | 参数类型 | [文档](./kp065-parameter-types/README.md) · [源码](./kp065-parameter-types/src/main.ts) | 已完成 |
| TS-KP066 | 返回值类型 | [文档](./kp066-return-types/README.md) · [源码](./kp066-return-types/src/main.ts) | 已完成 |
| TS-KP067 | 可选参数 | [文档](./kp067-optional-parameters/README.md) · [源码](./kp067-optional-parameters/src/main.ts) | 已完成 |
| TS-KP068 | 默认参数 | [文档](./kp068-default-parameters/README.md) · [源码](./kp068-default-parameters/src/main.ts) | 已完成 |
| TS-KP069 | Rest 参数 | [文档](./kp069-rest-parameters/README.md) · [源码](./kp069-rest-parameters/src/main.ts) | 已完成 |
| TS-KP070 | 函数类型表达式 | [文档](./kp070-function-type-expressions/README.md) · [源码](./kp070-function-type-expressions/src/main.ts) | 已完成 |
| TS-KP071 | 调用签名 Call Signature | [文档](./kp071-call-signatures/README.md) · [源码](./kp071-call-signatures/src/main.ts) | 已完成 |
| TS-KP072 | 构造签名 Construct Signature | [文档](./kp072-construct-signatures/README.md) · [源码](./kp072-construct-signatures/src/main.ts) | 已完成 |

### Lesson 05.2：高级函数类型

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP073 | 函数重载 | [文档](./kp073-function-overloads/README.md) · [源码](./kp073-function-overloads/src/main.ts) | 已完成 |
| TS-KP074 | Overload Signature 与 Implementation Signature | [文档](./kp074-overload-vs-implementation-signature/README.md) · [源码](./kp074-overload-vs-implementation-signature/src/main.ts) | 已完成 |
| TS-KP075 | `this` 参数 | [文档](./kp075-this-parameter/README.md) · [源码](./kp075-this-parameter/src/main.ts) | 已完成 |
| TS-KP076 | 回调函数参数设计 | [文档](./kp076-callback-parameter-design/README.md) · [源码](./kp076-callback-parameter-design/src/main.ts) | 已完成 |
| TS-KP077 | 函数参数数量兼容 | [文档](./kp077-parameter-count-compatibility/README.md) · [源码](./kp077-parameter-count-compatibility/src/main.ts) | 已完成 |
| TS-KP078 | 函数返回值兼容 | [文档](./kp078-return-type-compatibility/README.md) · [源码](./kp078-return-type-compatibility/src/main.ts) | 已完成 |
| TS-KP079 | `strictFunctionTypes` | [文档](./kp079-strict-function-types/README.md) · [源码](./kp079-strict-function-types/src/main.ts) | 已完成 |
| TS-KP080 | 回调中的 `void` 特殊规则 | [文档](./kp080-void-callback-rule/README.md) · [源码](./kp080-void-callback-rule/src/main.ts) | 已完成 |

## 本章学习原则

1. 先把函数理解成“输入契约 + 输出契约”，再进入函数类型之间的兼容关系。
2. 参数类型既约束调用者，也为函数体提供静态能力提示，不等于运行时参数校验。
3. 返回值类型既可以推断，也可以显式声明；公共 API 是否显式声明要看稳定性与可读性需求。
4. `?`、默认值和 `| undefined` 看起来接近，但调用侧和函数体内语义并不完全相同。
5. Rest 参数解决“不定数量参数”，进入函数体后是数组；不要和调用时的 Spread 参数混为一个概念。
6. 函数类型表达式适合描述普通函数值；Call Signature / Construct Signature 用来描述更丰富的可调用或可构造对象能力。
7. 函数重载用于描述同一个函数的多种合法调用形态；如果一个 Union 参数可以清楚表达同一契约，不要为了“高级”而滥用重载。
8. Implementation Signature 服务于函数体实现，但重载函数的外部调用只根据 Overload Signatures 判断。
9. `this` 参数是 TypeScript 的静态伪参数；真正的 JavaScript `this` 仍由调用方式决定。
10. 回调类型应该从“调用方承诺会传什么”来设计；不要把总会传入的参数错误标记为可选。
11. 函数参数数量兼容允许实现忽略调用者传入的额外参数，但不代表任意方向都兼容。
12. 普通函数返回值兼容遵循结构化兼容：返回更具体结构的函数可以满足返回较窄结构的目标函数类型。
13. `strictFunctionTypes` 让普通函数类型的参数检查更严格，避免把只能处理更具体输入的函数伪装成能处理更宽输入的函数。
14. `() => void` 主要表达“调用方忽略返回值”，不要把它机械理解成“实现必须在运行时返回 undefined”。
15. 每个知识点保留真实最终源码，不创建独立 `exercise/`、`solution/`。

## 完成标准

一个知识点标记为“已完成”需要同时满足：

1. README 包含学习目标、理论讲解、从 0 到 1 动手编码、运行案例和效果验证。
2. 动手编码从最小可运行文件逐步构造最终案例。
3. 明确区分“本节核心代码”和“实验辅助代码”。
4. README 中的路径、命令、输出与 `src/` 实际源码保持一致。
5. 最终源码可以通过严格类型检查、编译并运行。

## 当前进度

- Lesson 05.1：8/8 已完成。
- Lesson 05.2：8/8 已完成。
- Chapter 05：16/16 已完成。
- Chapter 05 已完成，下一步进入 Chapter 06 的 TS-KP081「Union Types」。
