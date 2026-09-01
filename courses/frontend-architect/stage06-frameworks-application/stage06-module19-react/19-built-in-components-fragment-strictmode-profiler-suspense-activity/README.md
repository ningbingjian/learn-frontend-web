# Chapter 19：内置组件：Fragment、StrictMode、Profiler、Suspense、Activity

> [返回 React 模块索引](../README.md)

本 Chapter 系统补齐 React 内置组件的工程语义。先从 `Fragment` 的“分组但不增加 DOM wrapper”开始，再进入 `StrictMode` 的开发期检查、`Profiler` 的性能测量、已有 Suspense 能力在内置组件视角下的定位，以及 React 19.2 的 `Activity` 可见/隐藏模式与状态保留。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP181 | Fragment | 1. Group Children 2. No Wrapper DOM 3. Shorthand | [文档](./kp181-fragment/README.md) · [源码](./kp181-fragment/src/main.jsx) | 已完成 |
| RE-KP182 | 带 key 的 Fragment | 1. Fragment Key 2. Explicit Syntax 3. List | [文档](./kp182-keyed-fragment/README.md) · [源码](./kp182-keyed-fragment/src/main.jsx) | 已完成 |
| RE-KP183 | StrictMode | 1. Development Checks 2. Scope 3. No Production Cost | [文档](./kp183-strict-mode/README.md) · [源码](./kp183-strict-mode/src/main.jsx) | 已完成 |
| RE-KP184 | StrictMode 的双 Render 检查 | 1. Double Render 2. Impurity 3. Development | [文档](./kp184-strictmode-double-render-check/README.md) · [源码](./kp184-strictmode-double-render-check/src/main.jsx) | 已完成 |
| RE-KP185 | StrictMode 的 Effect 检查 | 1. Setup 2. Cleanup 3. Re-run | [文档](./kp185-strictmode-effect-check/README.md) · [源码](./kp185-strictmode-effect-check/src/main.jsx) | 已完成 |
| RE-KP186 | Profiler | 1. Measure 2. Tree Scope 3. onRender | [文档](./kp186-profiler/README.md) · [源码](./kp186-profiler/src/main.jsx) | 已完成 |
| RE-KP187 | Profiler 回调指标 | 1. actualDuration 2. baseDuration 3. Phase | [文档](./kp187-profiler-callback-metrics/README.md) · [源码](./kp187-profiler-callback-metrics/src/main.jsx) | 已完成 |
| RE-KP188 | Activity | 1. Built-in Component 2. Visibility 3. Background UI | [文档](./kp188-activity/README.md) · [源码](./kp188-activity/src/main.jsx) | 已完成 |
| RE-KP189 | Activity visible/hidden 模式 | 1. visible 2. hidden 3. Effects | [文档](./kp189-activity-visible-hidden/README.md) · [源码](./kp189-activity-visible-hidden/src/main.jsx) | 已完成 |
| RE-KP190 | Activity 与状态保留 | 1. State Preservation 2. Hidden Tree 3. Restore | [文档](./kp190-activity-state-preservation/README.md) · [源码](./kp190-activity-state-preservation/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 19：**10 / 10，已完成**
- 下一 Chapter：**Chapter 20：React DOM Client、Portal 与 DOM 语义**
- 下一知识点：**RE-KP191：react-dom 与 react-dom/client**
