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
| TS-KP089 | Equality Narrowing | `kp089-equality-narrowing/` | 待生成 |
| TS-KP090 | `in` Operator Narrowing | `kp090-in-operator-narrowing/` | 待生成 |
| TS-KP091 | `instanceof` Narrowing | `kp091-instanceof-narrowing/` | 待生成 |
| TS-KP092 | 赋值导致的收窄 | `kp092-assignment-narrowing/` | 待生成 |
| TS-KP093 | 控制流分析 Control Flow Analysis | `kp093-control-flow-analysis/` | 待生成 |
| TS-KP094 | 用户自定义 Type Predicate | `kp094-type-predicate/` | 待生成 |
| TS-KP095 | Assertion Functions | `kp095-assertion-functions/` | 待生成 |
| TS-KP096 | `never` 与穷尽检查 | `kp096-never-exhaustiveness/` | 待生成 |
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
10. 类型组合与收窄都是编译期能力，不替代运行时输入校验。
11. 每个知识点保留真实 `src/`，不创建独立 `exercise/`、`solution/`。

## 完成标准

一个知识点标记为“已完成”需要同时满足：

1. README 包含学习目标、理论讲解、从 0 到 1 动手编码、运行案例和效果验证。
2. 动手编码从最小文件逐步构造最终案例。
3. 明确区分“本节核心代码”和“实验辅助代码”。
4. README 中的路径、命令、输出与 `src/` 实际源码保持一致。
5. 最终源码能够通过严格类型检查、编译并运行。

## 当前进度

- Lesson 06.1：6/6 已完成。
- Lesson 06.2：2/11 已完成。
- Chapter 06：8/17 已完成。
- 下一知识点：TS-KP089「Equality Narrowing」。
