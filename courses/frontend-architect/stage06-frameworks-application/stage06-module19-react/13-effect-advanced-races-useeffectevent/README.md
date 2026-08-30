# Chapter 13：Effect 高阶、竞态与 useEffectEvent

> [返回 React 模块索引](../README.md)

本 Chapter 在 Effect 基础心智模型之上继续做“减法”和“边界治理”：先识别根本不需要 Effect 的场景，再处理数据请求竞态、取消、对象/函数依赖、Effect Event 与无限循环诊断。目标不是写更多 Effect，而是只保留真正用于外部同步、生命周期清晰且能够正确清理的 Effect。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP121 | You Might Not Need an Effect | 1. Remove Effect 2. Render Derivation 3. Event Logic | [文档](./kp121-you-might-not-need-effect/README.md) · [源码](./kp121-you-might-not-need-effect/src/main.jsx) | 已完成 |
| RE-KP122 | 在 Render 中计算派生值 | 1. Derived Data 2. Pure Calculation 3. No Redundant State | [文档](./kp122-derived-data-in-render/README.md) · [源码](./kp122-derived-data-in-render/src/main.jsx) | 已完成 |
| RE-KP123 | 在事件中处理用户动作 | 1. User Action 2. Event Handler 3. No Reactive Trigger | [文档](./kp123-user-actions-in-events/README.md) · [源码](./kp123-user-actions-in-events/src/main.jsx) | 已完成 |
| RE-KP124 | Effect 中的数据请求竞态 | 1. Race Condition 2. Stale Response 3. Request Ordering | [文档](./kp124-effect-fetch-race/README.md) · [源码](./kp124-effect-fetch-race/src/main.jsx) | 已完成 |
| RE-KP125 | Ignore Flag 与请求取消 | 1. Ignore Flag 2. Cleanup 3. Stale Result | [文档](./kp125-ignore-flag-request-cleanup/README.md) · [源码](./kp125-ignore-flag-request-cleanup/src/main.jsx) | 已完成 |
| RE-KP126 | AbortController 与 Effect | 1. AbortController 2. AbortSignal 3. Cleanup | [文档](./kp126-abortcontroller-effect/README.md) · [源码](./kp126-abortcontroller-effect/src/main.jsx) | 已完成 |
| RE-KP127 | 对象依赖导致重复执行 | 1. Object Identity 2. Dependency 3. Remove Unnecessary Object | [文档](./kp127-object-dependency-rerun/README.md) · [源码](./kp127-object-dependency-rerun/src/main.jsx) | 已完成 |
| RE-KP128 | 函数依赖导致重复执行 | 1. Function Identity 2. Dependency 3. Move Logic | [文档](./kp128-function-dependency-rerun/README.md) · [源码](./kp128-function-dependency-rerun/src/main.jsx) | 已完成 |
| RE-KP129 | useEffectEvent | 1. Effect Event 2. Non-reactive Logic 3. Latest Values | [文档](./kp129-useeffectevent/README.md) · [源码](./kp129-useeffectevent/src/main.jsx) | 已完成 |
| RE-KP130 | 无限 Effect 循环诊断 | 1. Dependency Change 2. State Update 3. Debug Loop | [文档](./kp130-infinite-effect-loop/README.md) · [源码](./kp130-infinite-effect-loop/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 13：**10 / 10，已完成**
- 下一 Chapter：**Chapter 14：Hooks 完整 API 与底层集成**
- 下一知识点：**RE-KP131：useLayoutEffect**
