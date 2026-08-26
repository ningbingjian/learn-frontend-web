# Chapter 03：Props、组合与组件 API

> [返回 React 模块索引](../README.md)

本 Chapter 学习组件之间如何传递输入，以及如何通过 `children`、React node Props、Render Prop 与职责拆分设计可复用组件 API。重点不是“会写几个属性”，而是建立 Props 的只读边界、默认值规则、内容组合、复用策略与 API 状态空间意识。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP021 | Props 作为只读输入 | 1. Props Snapshot 2. 只读输入 3. 不直接修改 | [文档](./kp021-props-readonly-input/README.md) · [源码](./kp021-props-readonly-input/src/main.jsx) | 已完成 |
| RE-KP022 | Props 解构与默认值 | 1. 参数解构 2. 默认值 3. `undefined` 边界 | [文档](./kp022-props-destructuring-defaults/README.md) · [源码](./kp022-props-destructuring-defaults/src/main.jsx) | 已完成 |
| RE-KP023 | children 组合 | 1. 嵌套 JSX 2. Wrapper API 3. 内容与容器分离 | [文档](./kp023-children-composition/README.md) · [源码](./kp023-children-composition/src/main.jsx) | 已完成 |
| RE-KP024 | 通过 JSX 传递内容而不是配置对象 | 1. React node Props 2. JSX 内容 3. 配置对象边界 | [文档](./kp024-jsx-content-over-config/README.md) · [源码](./kp024-jsx-content-over-config/src/main.jsx) | 已完成 |
| RE-KP025 | 组件组合优于继承 | 1. UI 复用 2. Wrapper 组合 3. 避免组件继承层级 | [文档](./kp025-composition-over-inheritance/README.md) · [源码](./kp025-composition-over-inheritance/src/main.jsx) | 已完成 |
| RE-KP026 | 插槽式组件 API | 1. 多区域内容 2. Named Slot 思想 3. API 语义 | [文档](./kp026-slot-style-component-api/README.md) · [源码](./kp026-slot-style-component-api/src/main.jsx) | 已完成 |
| RE-KP027 | Render Prop 模式的历史与适用场景 | 1. Function Prop 2. 历史用途 3. 现代边界 | [文档](./kp027-render-prop-pattern/README.md) · [源码](./kp027-render-prop-pattern/src/main.jsx) | 已完成 |
| RE-KP028 | 组件拆分的职责边界 | 1. 拆分信号 2. 领域职责 3. 过度拆分 | [文档](./kp028-component-splitting-boundary/README.md) · [源码](./kp028-component-splitting-boundary/src/main.jsx) | 已完成 |
| RE-KP029 | 数据组件与展示组件的现代取舍 | 1. 历史模式 2. Hooks 之后 3. 实际边界 | [文档](./kp029-data-presentational-components/README.md) · [源码](./kp029-data-presentational-components/src/main.jsx) | 已完成 |
| RE-KP030 | 避免 Boolean Props 爆炸 | 1. Boolean 组合 2. 状态空间 3. API 重构 | [文档](./kp030-boolean-props-explosion/README.md) · [源码](./kp030-boolean-props-explosion/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 03：**10 / 10，已完成**
- 下一 Chapter：**Chapter 04：事件系统与交互**
- 下一知识点：**RE-KP031：React 事件处理器**
