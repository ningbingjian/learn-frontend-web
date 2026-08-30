# Chapter 11：Hooks 规则与自定义 Hook 设计

> [返回 React 模块索引](../README.md)

本 Chapter 系统学习 Hooks 的调用规则，以及如何把可复用的状态逻辑组织成 Custom Hook。前半章建立稳定调用顺序和 lint 约束，后半章把 Custom Hook 当成公共 API 设计，并最终学习如何把面向外部系统的 Effect 封装进有明确业务语义的 Hook。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP101 | Hooks 只能在组件或自定义 Hook 顶层调用 | 1. React Function 2. Top Level 3. Custom Hook | [文档](./kp101-hooks-top-level-react-functions/README.md) · [源码](./kp101-hooks-top-level-react-functions/src/main.jsx) | 已完成 |
| RE-KP102 | Hooks 不能放在普通条件和循环中 | 1. Condition 2. Loop 3. Early Return | [文档](./kp102-hooks-no-conditions-loops/README.md) · [源码](./kp102-hooks-no-conditions-loops/src/main.jsx) | 已完成 |
| RE-KP103 | use 是规则中的特殊例外 | 1. use API 2. Condition / Loop 3. try/catch 限制 | [文档](./kp103-use-special-exception/README.md) · [源码](./kp103-use-special-exception/src/main.jsx) | 已完成 |
| RE-KP104 | eslint-plugin-react-hooks | 1. Lint 2. Rules of Hooks 3. Diagnostics | [文档](./kp104-eslint-plugin-react-hooks/README.md) · [源码](./kp104-eslint-plugin-react-hooks/src/main.jsx) | 已完成 |
| RE-KP105 | 自定义 Hook 的命名规则 | 1. use 前缀 2. Hook 识别 3. 调用约束 | [文档](./kp105-custom-hook-naming/README.md) · [源码](./kp105-custom-hook-naming/src/main.jsx) | 已完成 |
| RE-KP106 | 自定义 Hook 复用状态逻辑而非状态本身 | 1. Logic Reuse 2. Independent State 3. Abstraction | [文档](./kp106-reuse-state-logic/README.md) · [源码](./kp106-reuse-state-logic/src/main.jsx) | 已完成 |
| RE-KP107 | 自定义 Hook 参数设计 | 1. Input 2. Options 3. Stable Contract | [文档](./kp107-custom-hook-parameters/README.md) · [源码](./kp107-custom-hook-parameters/src/main.jsx) | 已完成 |
| RE-KP108 | 自定义 Hook 返回值设计 | 1. Return Contract 2. Read / Action 3. Encapsulation | [文档](./kp108-custom-hook-return-values/README.md) · [源码](./kp108-custom-hook-return-values/src/main.jsx) | 已完成 |
| RE-KP109 | 对象返回与 Tuple 返回的选择 | 1. Object 2. Tuple 3. API Evolution | [文档](./kp109-object-vs-tuple-return/README.md) · [源码](./kp109-object-vs-tuple-return/src/main.jsx) | 已完成 |
| RE-KP110 | 自定义 Hook 中的 Effect | 1. Encapsulated Effect 2. Cleanup 3. Reactive Inputs | [文档](./kp110-effect-in-custom-hook/README.md) · [源码](./kp110-effect-in-custom-hook/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 11：**10 / 10，已完成**
- 下一 Chapter：**Chapter 12：Effect 基础心智模型**
- 下一知识点：**RE-KP111：useEffect 的真正用途：同步外部系统**
