# Chapter 20：React DOM Client、Portal 与 DOM 语义

> [返回 React 模块索引](../README.md)

本 Chapter 从 React 组件模型进入浏览器 DOM 集成层。先区分 `react-dom` 与 `react-dom/client` 两个入口，再学习 `createRoot`、`root.render`、`root.unmount`、`hydrateRoot`，随后进入 Portal 的 DOM 位置与 React Tree 语义、Portal 事件冒泡、`flushSync` 以及 `dangerouslySetInnerHTML` 的安全边界。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP191 | react-dom 与 react-dom/client | 1. Package Entry 2. Web DOM APIs 3. Client Root APIs | [文档](./kp191-react-dom-vs-client/README.md) · [源码](./kp191-react-dom-vs-client/src/main.jsx) | 已完成 |
| RE-KP192 | createRoot | 1. DOM Container 2. Root Ownership 3. hydrateRoot Boundary | [文档](./kp192-create-root/README.md) · [源码](./kp192-create-root/src/main.jsx) | 已完成 |
| RE-KP193 | root.render | 1. React Node 2. Repeat Render 3. State Preservation | [文档](./kp193-root-render/README.md) · [源码](./kp193-root-render/src/main.jsx) | 已完成 |
| RE-KP194 | root.unmount | 1. Detach Root 2. Cleanup 3. Cannot Re-render | `kp194-root-unmount/` | 待生成 |
| RE-KP195 | hydrateRoot | 1. Existing HTML 2. Hydration 3. SSR | `kp195-hydrate-root/` | 待生成 |
| RE-KP196 | createPortal | 1. Portal Target 2. DOM Escape 3. React Tree | `kp196-create-portal/` | 待生成 |
| RE-KP197 | Portal 的 DOM 位置与 React 树位置 | 1. DOM Position 2. React Parent 3. Context | `kp197-portal-dom-react-tree/` | 待生成 |
| RE-KP198 | Portal 中事件冒泡 | 1. React Tree Bubble 2. Event 3. Stop Propagation | `kp198-portal-event-bubbling/` | 待生成 |
| RE-KP199 | flushSync | 1. Synchronous Flush 2. Third-party Integration 3. Caveat | `kp199-flush-sync/` | 待生成 |
| RE-KP200 | dangerouslySetInnerHTML | 1. Raw HTML 2. XSS 3. Trusted Content | `kp200-dangerously-set-inner-html/` | 待生成 |

## 当前进度

- Chapter 20：**3 / 10**
- 下一知识点：**RE-KP194：root.unmount**
