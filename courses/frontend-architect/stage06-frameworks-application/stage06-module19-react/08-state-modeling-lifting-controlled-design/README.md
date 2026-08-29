# Chapter 08：状态建模、提升状态与受控设计

> [返回 React 模块索引](../README.md)

本 Chapter 从“State 应该放在哪里”进入更系统的状态建模。先建立 Single Source of Truth，再学习状态提升、受控/非受控组件、Props Drilling 识别、状态放置与生命周期设计，最终形成“谁拥有状态、谁只是消费状态、怎样让合法状态更容易表达”的组件架构直觉。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP071 | Single Source of Truth | 1. State Owner 2. 避免重复状态 3. Derived View | [文档](./kp071-single-source-of-truth/README.md) · [源码](./kp071-single-source-of-truth/src/main.jsx) | 已完成 |
| RE-KP072 | 状态提升 | 1. Common Parent 2. Lift State Up 3. Props / Handler | [文档](./kp072-lifting-state-up/README.md) · [源码](./kp072-lifting-state-up/src/main.jsx) | 已完成 |
| RE-KP073 | 受控组件 | 1. Controlled Component 2. Props Drive State 3. Event Callback | [文档](./kp073-controlled-component/README.md) · [源码](./kp073-controlled-component/src/main.jsx) | 已完成 |
| RE-KP074 | 非受控组件 | 1. Local State 2. Initial Value 3. Parent Control Boundary | [文档](./kp074-uncontrolled-component/README.md) · [源码](./kp074-uncontrolled-component/src/main.jsx) | 已完成 |
| RE-KP075 | 受控与非受控的选择 | 1. Coordination 2. Reuse 3. API Trade-off | [文档](./kp075-controlled-vs-uncontrolled/README.md) · [源码](./kp075-controlled-vs-uncontrolled/src/main.jsx) | 已完成 |
| RE-KP076 | Props Drilling 的识别 | 1. Intermediate Props 2. Tree Depth 3. Boundary | [文档](./kp076-props-drilling-recognition/README.md) · [源码](./kp076-props-drilling-recognition/src/main.jsx) | 已完成 |
| RE-KP077 | 状态放置原则 | 1. Ownership 2. Closest Common Parent 3. Locality | [文档](./kp077-state-placement-principles/README.md) · [源码](./kp077-state-placement-principles/src/main.jsx) | 已完成 |
| RE-KP078 | 状态生命周期设计 | 1. Create 2. Preserve 3. Reset / Dispose | [文档](./kp078-state-lifecycle-design/README.md) · [源码](./kp078-state-lifecycle-design/src/main.jsx) | 已完成 |
| RE-KP079 | 状态归属与组件边界 | 1. Domain Owner 2. Component Boundary 3. API | [文档](./kp079-state-ownership-component-boundary/README.md) · [源码](./kp079-state-ownership-component-boundary/src/main.jsx) | 已完成 |
| RE-KP080 | 有限状态思维 | 1. Valid States 2. Transitions 3. Impossible Combination | `kp080-finite-state-thinking/` | 待生成 |

## 当前进度

- Chapter 08：**9 / 10**
- 下一知识点：**RE-KP080：有限状态思维**
