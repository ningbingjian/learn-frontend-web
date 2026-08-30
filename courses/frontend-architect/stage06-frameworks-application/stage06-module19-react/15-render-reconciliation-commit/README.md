# Chapter 15：Render、Reconciliation 与 Commit

> [返回 React 模块索引](../README.md)

本 Chapter 从“会写组件”进一步进入 React 的执行模型。你将把一次 UI 更新拆成 Trigger → Render → Commit，理解 Render Phase 为什么必须保持纯净、为什么组件函数可以被重复调用，以及 React 如何根据 Element Type、Key 和前后两版输出决定复用或替换 DOM。目标不是记内部实现细节，而是建立足以解释常见状态、DOM、性能与副作用问题的稳定心智模型。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP141 | Render Phase | 1. Trigger 2. Component Call 3. Calculate JSX | [文档](./kp141-render-phase/README.md) · [源码](./kp141-render-phase/src/main.jsx) | 已完成 |
| RE-KP142 | Commit Phase | 1. DOM Mutation 2. Minimal Update 3. Commit Observation | [文档](./kp142-commit-phase/README.md) · [源码](./kp142-commit-phase/src/main.jsx) | 已完成 |
| RE-KP143 | Render 不等于 DOM 已更新 | 1. State Queue 2. Old DOM 3. Commit Boundary | [文档](./kp143-render-not-dom-updated/README.md) · [源码](./kp143-render-not-dom-updated/src/main.jsx) | 已完成 |
| RE-KP144 | 组件函数为什么可以重复执行 | 1. Repeatable Render 2. StrictMode 3. Restart Safety | [文档](./kp144-component-function-repeatable/README.md) · [源码](./kp144-component-function-repeatable/src/main.jsx) | 已完成 |
| RE-KP145 | Pure Render | 1. Same Input Same Output 2. No Side Effects 3. Local Mutation | [文档](./kp145-pure-render/README.md) · [源码](./kp145-pure-render/src/main.jsx) | 已完成 |
| RE-KP146 | Reconciliation 基本目标 | 1. Previous Tree 2. Next Tree 3. Minimal Work | `kp146-reconciliation-goal/` | 待生成 |
| RE-KP147 | Element Type 与身份比较 | 1. Type 2. Identity 3. Replace / Reuse | `kp147-element-type-identity/` | 待生成 |
| RE-KP148 | Key 在 Reconciliation 中的作用 | 1. Sibling Identity 2. Stable Key 3. Move | `kp148-key-in-reconciliation/` | 待生成 |
| RE-KP149 | DOM 节点复用与替换 | 1. Reuse 2. Replace 3. Host Node | `kp149-dom-node-reuse-replace/` | 待生成 |
| RE-KP150 | Props 更新与 DOM 更新 | 1. Prop Diff 2. Attribute / Property 3. Minimal DOM Change | `kp150-props-dom-update/` | 待生成 |

## 当前进度

- Chapter 15：**5 / 10**
- 下一知识点：**RE-KP146：Reconciliation 基本目标**
