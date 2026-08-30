# Chapter 14：Hooks 完整 API 与底层集成

> [返回 React 模块索引](../README.md)

本 Chapter 继续补齐 React Hooks API 中更靠近浏览器布局、样式注入、SSR 标识与外部 Store 集成的能力。重点不是“所有 Hook 都要在业务代码里使用”，而是理解每个 API 的适用层级：`useLayoutEffect` 只用于必须在 Paint 前完成的布局工作，`useInsertionEffect` 主要属于 CSS-in-JS 库作者；`useId` 解决可访问性 ID 与 SSR 对齐；`useSyncExternalStore` 定义 React 与外部可变数据源之间的读取/订阅契约；`useDebugValue` 只服务于自定义 Hook 的 DevTools 调试体验。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP131 | useLayoutEffect | 1. Before Paint 2. Layout Measurement 3. Blocking | [文档](./kp131-use-layout-effect/README.md) · [源码](./kp131-use-layout-effect/src/main.jsx) | 已完成 |
| RE-KP132 | useEffect 与 useLayoutEffect 的选择 | 1. Timing 2. Visual Work 3. Performance | [文档](./kp132-useeffect-vs-uselayouteffect/README.md) · [源码](./kp132-useeffect-vs-uselayouteffect/src/main.jsx) | 已完成 |
| RE-KP133 | useInsertionEffect 的库作者场景 | 1. CSS-in-JS 2. Style Insertion 3. Library API | [文档](./kp133-use-insertion-effect-library-authors/README.md) · [源码](./kp133-use-insertion-effect-library-authors/src/main.jsx) | 已完成 |
| RE-KP134 | useId | 1. Stable ID 2. Accessibility 3. Prefix | [文档](./kp134-use-id/README.md) · [源码](./kp134-use-id/src/main.jsx) | 已完成 |
| RE-KP135 | useId 与 SSR 一致性 | 1. Hydration 2. Stable Tree 3. Server / Client | [文档](./kp135-useid-ssr-consistency/README.md) · [源码](./kp135-useid-ssr-consistency/src/main.jsx) | 已完成 |
| RE-KP136 | useSyncExternalStore | 1. External Store 2. Subscription 3. Snapshot | [文档](./kp136-use-sync-external-store/README.md) · [源码](./kp136-use-sync-external-store/src/main.jsx) | 已完成 |
| RE-KP137 | subscribe/getSnapshot 契约 | 1. subscribe 2. getSnapshot 3. Cached Snapshot | [文档](./kp137-subscribe-get-snapshot-contract/README.md) · [源码](./kp137-subscribe-get-snapshot-contract/src/main.jsx) | 已完成 |
| RE-KP138 | getServerSnapshot 与 SSR | 1. Server Snapshot 2. Hydration 3. Consistency | [文档](./kp138-get-server-snapshot-ssr/README.md) · [源码](./kp138-get-server-snapshot-ssr/src/main.jsx) | 已完成 |
| RE-KP139 | useDebugValue | 1. Custom Hook 2. DevTools Label 3. Debugging | [文档](./kp139-use-debug-value/README.md) · [源码](./kp139-use-debug-value/src/main.jsx) | 已完成 |
| RE-KP140 | 外部 Store 集成原则 | 1. Store Boundary 2. Concurrency-safe Read 3. Integration | [文档](./kp140-external-store-integration-principles/README.md) · [源码](./kp140-external-store-integration-principles/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 14：**10 / 10，已完成**
- 下一 Chapter：**Chapter 15：Render、Reconciliation 与 Commit**
- 下一知识点：**RE-KP141：Render Phase**
