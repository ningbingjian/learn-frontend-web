# Chapter 17：Suspense、Lazy、use 与资源读取

> [返回 React 模块索引](../README.md)

本 Chapter 学习 React 如何用 Suspense Boundary 描述“这一片 UI 还没有准备好时显示什么”，并逐步进入 `lazy` 代码分割、`use` 读取 Promise/Context 与资源读取边界。重点不是把 Suspense 理解成通用 loading 状态组件，而是理解：只有真正 Suspense-enabled 的资源读取、lazy code loading 等机制才会激活最近的 Boundary；Effect 中普通 fetch 不会自动触发 Suspense。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP161 | Suspense Boundary | 1. Boundary 2. Suspend 3. Closest Parent | [文档](./kp161-suspense-boundary/README.md) · [源码](./kp161-suspense-boundary/src/main.jsx) | 已完成 |
| RE-KP162 | fallback | 1. Loading UI 2. Boundary Replacement 3. UX | [文档](./kp162-suspense-fallback/README.md) · [源码](./kp162-suspense-fallback/src/main.jsx) | 已完成 |
| RE-KP163 | 嵌套 Suspense | 1. Nested Boundary 2. Loading Sequence 3. Progressive Reveal | [文档](./kp163-nested-suspense/README.md) · [源码](./kp163-nested-suspense/src/main.jsx) | 已完成 |
| RE-KP164 | Reveal 顺序与 UX | 1. Reveal Together 2. Progressive Reveal 3. Design Boundary | [文档](./kp164-reveal-order-ux/README.md) · [源码](./kp164-reveal-order-ux/src/main.jsx) | 已完成 |
| RE-KP165 | lazy | 1. Dynamic Import 2. Lazy Component 3. Suspense | [文档](./kp165-lazy/README.md) · [源码](./kp165-lazy/src/main.jsx) | 已完成 |
| RE-KP166 | 组件级代码分割 | 1. Chunk 2. Boundary 3. Loading Cost | [文档](./kp166-component-code-splitting/README.md) · [源码](./kp166-component-code-splitting/src/main.jsx) | 已完成 |
| RE-KP167 | Suspense 与路由框架的关系 | 1. Router 2. Framework 3. Suspense-enabled Data | [文档](./kp167-suspense-router-framework/README.md) · [源码](./kp167-suspense-router-framework/src/main.jsx) | 已完成 |
| RE-KP168 | use 读取 Promise | 1. use(Promise) 2. Suspend 3. Cached Promise | [文档](./kp168-use-read-promise/README.md) · [源码](./kp168-use-read-promise/src/main.jsx) | 已完成 |
| RE-KP169 | use 读取 Context | 1. use(Context) 2. Conditional Read 3. Closest Provider | [文档](./kp169-use-read-context/README.md) · [源码](./kp169-use-read-context/src/main.jsx) | 已完成 |
| RE-KP170 | use 可以条件调用的特殊规则 | 1. Conditional use 2. Loop 3. Rules Exception | [文档](./kp170-use-conditional-call-rule/README.md) · [源码](./kp170-use-conditional-call-rule/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 17：**10 / 10，已完成** ✅
- 下一 Chapter：**Chapter 18：React 19 Actions、Forms 与乐观 UI**
- 下一知识点：**RE-KP171：React 19 Actions 模型**
