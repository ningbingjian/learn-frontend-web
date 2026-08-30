# Chapter 09：Reducer 与 Context

> [返回 React 模块索引](../README.md)

本 Chapter 在状态建模之后解决两个问题：当组件内部状态迁移越来越复杂时，用 Reducer 集中管理；当同一份数据需要穿过较深组件树被多个后代消费时，用 Context 建立提供与读取边界。完成本章后，应能区分“状态由谁保存”和“状态如何跨层提供”，并能正确使用 React 19 的 Context Provider 语法。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP081 | useReducer 基础 | 1. reducer 2. state 3. dispatch 4. initialArg | [文档](./kp081-usereducer-basics/README.md) · [源码](./kp081-usereducer-basics/src/main.jsx) | 已完成 |
| RE-KP082 | Action 建模 | 1. Action Object 2. type 3. Payload 4. 描述发生了什么 | [文档](./kp082-action-modeling/README.md) · [源码](./kp082-action-modeling/src/main.jsx) | 已完成 |
| RE-KP083 | Reducer 必须保持纯净 | 1. Pure Function 2. Immutable Update 3. Side Effect Boundary | [文档](./kp083-pure-reducer/README.md) · [源码](./kp083-pure-reducer/src/main.jsx) | 已完成 |
| RE-KP084 | Reducer 与 useState 的选择 | 1. 简单局部值 2. 复杂迁移 3. 可读性权衡 | [文档](./kp084-usereducer-vs-usestate/README.md) · [源码](./kp084-usereducer-vs-usestate/src/main.jsx) | 已完成 |
| RE-KP085 | 复杂状态迁移集中管理 | 1. Transition Rules 2. Invariant 3. Centralized Logic | [文档](./kp085-centralize-complex-state-transitions/README.md) · [源码](./kp085-centralize-complex-state-transitions/src/main.jsx) | 已完成 |
| RE-KP086 | createContext | 1. Context Object 2. 默认值 3. Provider Boundary | [文档](./kp086-create-context/README.md) · [源码](./kp086-create-context/src/main.jsx) | 已完成 |
| RE-KP087 | useContext | 1. Read Context 2. Closest Provider 3. Reactive Read | [文档](./kp087-use-context/README.md) · [源码](./kp087-use-context/src/main.jsx) | 已完成 |
| RE-KP088 | Provider 的现代写法 | 1. React 19 Provider 2. `<Context value>` 3. 兼容认知 | [文档](./kp088-modern-context-provider/README.md) · [源码](./kp088-modern-context-provider/src/main.jsx) | 已完成 |
| RE-KP089 | Context 默认值 | 1. Fallback 2. Static Default 3. Missing Provider | [文档](./kp089-context-default-value/README.md) · [源码](./kp089-context-default-value/src/main.jsx) | 已完成 |
| RE-KP090 | Context 更新与重新渲染 | 1. Provider Value 2. Consumer Update 3. Object Identity | [文档](./kp090-context-update-rerender/README.md) · [源码](./kp090-context-update-rerender/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 09：**10 / 10，已完成**
- 下一 Chapter：**Chapter 10：Ref、DOM 与 Escape Hatches**
- 下一知识点：**RE-KP091：useRef 保存非渲染数据**
