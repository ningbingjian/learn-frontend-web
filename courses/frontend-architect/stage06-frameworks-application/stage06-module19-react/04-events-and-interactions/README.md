# Chapter 04：事件系统与交互

> [返回 React 模块索引](../README.md)

本 Chapter 从“用户发生交互时 React 如何调用我们的函数”开始，依次学习事件处理器、函数传递、冒泡/捕获、默认行为、状态更新、Synthetic Event、原生 DOM 事件边界与异步事件处理。完成本章后，应能够把“用户动作”放在事件处理器中，并知道什么时候才需要跨到原生 DOM 或后续 Effect 能力。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP031 | React 事件处理器 | 1. JSX 事件 Prop 2. Handler Function 3. Event Object | [文档](./kp031-react-event-handlers/README.md) · [源码](./kp031-react-event-handlers/src/main.jsx) | 已完成 |
| RE-KP032 | 传递函数与调用函数的区别 | 1. 函数引用 2. Render 时调用 3. Inline Handler | [文档](./kp032-pass-vs-call-function/README.md) · [源码](./kp032-pass-vs-call-function/src/main.jsx) | 已完成 |
| RE-KP033 | 事件冒泡 | 1. Target 2. Bubble 3. Parent Handler | [文档](./kp033-event-bubbling/README.md) · [源码](./kp033-event-bubbling/src/main.jsx) | 已完成 |
| RE-KP034 | 事件捕获 | 1. Capture Phase 2. `onClickCapture` 3. 使用边界 | [文档](./kp034-event-capture/README.md) · [源码](./kp034-event-capture/src/main.jsx) | 已完成 |
| RE-KP035 | stopPropagation 与 preventDefault | 1. 阻止传播 2. 阻止默认行为 3. 区别 | [文档](./kp035-stop-propagation-prevent-default/README.md) · [源码](./kp035-stop-propagation-prevent-default/src/main.jsx) | 已完成 |
| RE-KP036 | 事件处理器中的状态更新 | 1. Handler 2. setState 3. 交互更新 | [文档](./kp036-state-update-in-events/README.md) · [源码](./kp036-state-update-in-events/src/main.jsx) | 已完成 |
| RE-KP037 | 事件与 Effect 的职责区别 | 1. 用户动作 2. 同步外部系统 3. 职责边界 | [文档](./kp037-events-vs-effects/README.md) · [源码](./kp037-events-vs-effects/src/main.jsx) | 已完成 |
| RE-KP038 | Synthetic Event 的现代认知 | 1. React Event Object 2. `target/currentTarget` 3. `nativeEvent` 4. `persist` 现代认知 | [文档](./kp038-synthetic-event/README.md) · [源码](./kp038-synthetic-event/src/main.jsx) | 已完成 |
| RE-KP039 | 原生 DOM 事件与 React 事件的边界 | 1. React Handler 2. `addEventListener` 3. 集成边界 | [文档](./kp039-react-vs-native-dom-events/README.md) · [源码](./kp039-react-vs-native-dom-events/src/main.jsx) | 已完成 |
| RE-KP040 | 事件处理中的异步逻辑 | 1. async Handler 2. Promise 3. 错误处理 | [文档](./kp040-async-event-handlers/README.md) · [源码](./kp040-async-event-handlers/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 04：**10 / 10，已完成**
- 下一 Chapter：**Chapter 05：State 基础、对象与数组更新**
- 下一知识点：**RE-KP041：useState 基础**
