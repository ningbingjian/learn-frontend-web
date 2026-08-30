# Chapter 10：Ref、DOM 与 Escape Hatches

> [返回 React 模块索引](../README.md)

本 Chapter 学习 React 的 Escape Hatches：当信息需要跨 Render 保存、但不参与 UI 渲染时使用 Ref；当必须访问真实 DOM、管理焦点、测量布局或向外暴露少量命令式能力时，使用 DOM Ref 与 Imperative APIs。核心原则始终是：**声明式优先，命令式能力最小化。**

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP091 | useRef 保存非渲染数据 | 1. Stable Ref Object 2. current 3. 不触发 Render | [文档](./kp091-useref-non-render-data/README.md) · [源码](./kp091-useref-non-render-data/src/main.jsx) | 已完成 |
| RE-KP092 | Ref 与 State 的区别 | 1. Mutable Ref 2. Reactive State 3. UI Dependency | [文档](./kp092-ref-vs-state/README.md) · [源码](./kp092-ref-vs-state/src/main.jsx) | 已完成 |
| RE-KP093 | DOM Ref | 1. ref Attribute 2. DOM Node 3. Imperative Access | [文档](./kp093-dom-ref/README.md) · [源码](./kp093-dom-ref/src/main.jsx) | 已完成 |
| RE-KP094 | React 19 ref as prop | 1. ref Prop 2. Function Component 3. forwardRef 兼容认知 | [文档](./kp094-react19-ref-as-prop/README.md) · [源码](./kp094-react19-ref-as-prop/src/main.jsx) | 已完成 |
| RE-KP095 | Ref Callback | 1. Callback Ref 2. Node Lifecycle 3. Collection | [文档](./kp095-ref-callback/README.md) · [源码](./kp095-ref-callback/src/main.jsx) | 已完成 |
| RE-KP096 | React 19 Ref Cleanup | 1. Callback Cleanup 2. React 19 3. 生命周期 | [文档](./kp096-react19-ref-cleanup/README.md) · [源码](./kp096-react19-ref-cleanup/src/main.jsx) | 已完成 |
| RE-KP097 | useImperativeHandle | 1. Imperative Handle 2. Exposed API 3. ref | [文档](./kp097-use-imperative-handle/README.md) · [源码](./kp097-use-imperative-handle/src/main.jsx) | 已完成 |
| RE-KP098 | Imperative Handle 最小化 | 1. Minimal API 2. Declarative First 3. Encapsulation | [文档](./kp098-minimal-imperative-handle/README.md) · [源码](./kp098-minimal-imperative-handle/src/main.jsx) | 已完成 |
| RE-KP099 | 测量 DOM | 1. Geometry 2. Timing 3. Measurement Boundary | [文档](./kp099-measure-dom/README.md) · [源码](./kp099-measure-dom/src/main.jsx) | 已完成 |
| RE-KP100 | 管理焦点 | 1. focus 2. Accessibility 3. Imperative Focus | [文档](./kp100-manage-focus/README.md) · [源码](./kp100-manage-focus/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 10：**10 / 10** ✅
- 下一知识点：**RE-KP101：Hooks 只能在组件或自定义 Hook 顶层调用**
