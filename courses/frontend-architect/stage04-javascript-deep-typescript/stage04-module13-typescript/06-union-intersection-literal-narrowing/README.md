# Chapter 06：联合、交叉、字面量与类型收窄

> [返回 TypeScript 模块索引](../README.md)

## 章节定位

Chapter 05 已经完成函数类型系统。本章开始学习 TypeScript 中最重要的一组“类型组合与控制流分析”能力：

```text
多个可能类型
  ↓
Union Types
  ↓
多个能力同时成立
  ↓
Intersection Types
  ↓
把宽泛 primitive 收紧为精确值
  ↓
Literal Types
  ↓
有限业务状态
  ↓
Literal Union / Discriminated Union
  ↓
利用运行时判断缩小类型范围
  ↓
Type Narrowing
```

真正进入大型业务建模后，Union、Literal 与 Narrowing 会反复出现在：API 状态、表单状态、消息事件、组件 Props、请求结果和状态机中。

## 学习顺序

### Lesson 06.1：组合类型

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP081 | Union Types | [文档](./kp081-union-types/README.md) · [源码](./kp081-union-types/src/main.ts) | 已完成 |
| TS-KP082 | Intersection Types | [文档](./kp082-intersection-types/README.md) · [源码](./kp082-intersection-types/src/main.ts) | 已完成 |
| TS-KP083 | String Literal Types | [文档](./kp083-string-literal-types/README.md) · [源码](./kp083-string-literal-types/src/main.ts) | 已完成 |
| TS-KP084 | Numeric / Boolean Literal Types | [文档](./kp084-numeric-boolean-literal-types/README.md) · [源码](./kp084-numeric-boolean-literal-types/src/main.ts) | 已完成 |
| TS-KP085 | Literal Union | [文档](./kp085-literal-union/README.md) · [源码](./kp085-literal-union/src/main.ts) | 已完成 |
| TS-KP086 | 判别联合 Discriminated Union | [文档](./kp086-discriminated-union/README.md) · [源码](./kp086-discriminated-union/src/main.ts) | 已完成 |

### Lesson 06.2：类型收窄

| 编号 | 知识点 | 文档与源码 | 状态 |
|---|---|---|---|
| TS-KP087 | `typeof` Narrowing | [文档](./kp087-typeof-narrowing/README.md) · [源码](./kp087-typeof-narrowing/src/main.ts) | 已完成 |
| TS-KP088 | Truthy / Falsy Narrowing | [文档](./kp088-truthiness-narrowing/README.md) · [源码](./kp088-truthiness-narrowing/src/main.ts) | 已完成 |
| TS-KP089 | Equality Narrowing | [文档](./kp089-equality-narrowing/README.md) · [源码](./kp089-equality-narrowing/src/main.ts) | 已完成 |
| TS-KP090 | `in` Operator Narrowing | [文档](./kp090-in-operator-narrowing/README.md) · [源码](./kp090-in-operator-narrowing/src/main.ts) | 已完成 |
| TS-KP091 | `instanceof` Narrowing | [文档](./kp091-instanceof-narrowing/README.md) · [源码](./kp091-instanceof-narrowing/src/main.ts) | 已完成 |
| TS-KP092 | 赋值导致的收窄 | [文档](./kp092-assignment-narrowing/README.md) · [源码](./kp092-assignment-narrowing/src/main.ts) | 已完成 |
| TS-KP093 | 控制流分析 Control Flow Analysis | [文档](./kp093-control-flow-analysis/README.md) · [源码](./kp093-control-flow-analysis/src/main.ts) | 已完成 |
| TS-KP094 | 用户自定义 Type Predicate | [文档](./kp094-type-predicate/README.md) · [源码](./kp094-type-predicate/src/main.ts) | 已完成 |
| TS-KP095 | Assertion Functions | [文档](./kp095-assertion-functions/README.md) · [源码](./kp095-assertion-functions/src/main.ts) | 已完成 |
| TS-KP096 | `never` 与穷尽检查 | [文档](./kp096-never-exhaustiveness/README.md) · [源码](./kp096-never-exhaustiveness/src/main.ts) | 已完成 |
| TS-KP097 | 复杂状态机中的判别联合 | `kp097-state-machine-discriminated-union/` | 待生成 |

## 本章学习原则

1. `A | B` 表示一个值可以是 A 或 B，不等于 `any`。
2. Union 值在没有收窄前，只能安全使用所有成员都保证存在的能力。
3. `A & B` 表示一个值必须同时满足 A 和 B，常用于组合对象能力。
4. Literal Type 描述的是某一个精确值，而不是整个 `string` / `number` / `boolean` 集合。
5. Literal Union 用有限字面量集合表达有限业务取值，比宽泛 primitive 更精确。
6. Discriminated Union 应把不同业务状态拆成独立成员，再使用共同的字面量字段区分成员，避免“一个大对象 + 大量可选字段”。
7. Narrowing 本质上是 TypeScript 根据运行时控制流证据缩小静态类型范围。
8. `typeof` Narrowing 依赖 JavaScript 真实的 `typeof` 结果，因此必须理解 `typeof null === "object"` 等运行时边界。
9. Truthiness Narrowing 会遵循 JavaScript 的真值规则；空字符串、0、false 等合法业务值也可能被判定为 falsy。
10. Equality Narrowing 会利用 `===`、`!==`、`==`、`!=`、`switch` 等比较证据缩小类型；`value == null` 是同时处理 `null | undefined` 的常见精确写法。
11. `in` Narrowing 利用 JavaScript 属性存在性判断缩小对象 Union；可选属性可能同时保留在 true / false 两个分支。
12. `instanceof` Narrowing 依赖真实的 JavaScript 原型链与构造器值；`type` / `interface` 本身不能作为运行时 `instanceof` 右操作数。
13. 赋值会改变变量在当前程序位置上的 observed type，但后续赋值是否合法仍然由变量的 declared type 决定。
14. Control Flow Analysis 会综合 type guards、赋值、`return`、`throw` 与可达性，为同一个变量在不同程序位置计算不同的 observed type。
15. Type Predicate 用 `parameter is Type` 把可复用运行时判断暴露为 Narrowing 契约；predicate 实现必须真实可靠，类型系统不会替你证明其语义正确。
16. Assertion Function 用 `asserts condition` / `asserts value is Type` 表达“失败就终止流程”；正常返回后可直接收窄，但 assertion signature 不能替代真实 runtime validation。
17. `never` 表示没有任何可能值；Discriminated Union 被完整处理后可以使用 `never` 做 Exhaustiveness Checking，让新增状态但漏写分支变成编译错误。
18. 类型组合与收窄都是编译期能力，不替代运行时输入校验。
19. 每个知识点保留真实 `src/`，不创建独立 `exercise/`、`solution/`。

## 完成标准

一个知识点标记为“已完成”需要同时满足：

1. README 包含学习目标、理论讲解、从 0 到 1 动手编码、运行案例和效果验证。
2. 动手编码从最小文件逐步构造最终案例。
3. 明确区分“本节核心代码”和“实验辅助代码”。
4. README 中的路径、命令、输出与 `src/` 实际源码保持一致。
5. 最终源码能够通过严格类型检查、编译并运行。

## 当前进度

- Lesson 06.1：6/6 已完成。
- Lesson 06.2：10/11 已完成。
- Chapter 06：16/17 已完成。
- 下一知识点：TS-KP097「复杂状态机中的判别联合」。
