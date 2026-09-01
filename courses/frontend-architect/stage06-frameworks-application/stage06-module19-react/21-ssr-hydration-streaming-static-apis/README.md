# Chapter 21：SSR、Hydration、Streaming 与 Static APIs

> [返回 React 模块索引](../README.md)

本 Chapter 把 React 从浏览器 DOM 集成继续推进到服务端输出协议。先建立 CSR/SSR 与 Hydration 的基础模型，再分析 Hydration Mismatch 和服务端/客户端首屏一致性；随后进入 Node Stream、Web Stream、Streaming SSR、`renderToString` 限制，以及 React 19.2 的 Static/PPR 与 Resume APIs。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP201 | CSR 与 SSR 的差异 | 1. Empty Shell 2. HTML Snapshot 3. JavaScript | [文档](./kp201-csr-vs-ssr/README.md) · [源码](./kp201-csr-vs-ssr/src/main.jsx) | 已完成 |
| RE-KP202 | Hydration | 1. Existing DOM 2. Attach React 3. Interactivity | [文档](./kp202-hydration/README.md) · [源码](./kp202-hydration/src/main.jsx) | 已完成 |
| RE-KP203 | Hydration Mismatch | 1. Mismatch 2. Recoverable Error 3. Bug | [文档](./kp203-hydration-mismatch/README.md) · [源码](./kp203-hydration-mismatch/src/main.jsx) | 已完成 |
| RE-KP204 | 服务端与客户端输出一致性 | 1. Shared Data 2. Serialization 3. First Render | [文档](./kp204-server-client-output-consistency/README.md) · [源码](./kp204-server-client-output-consistency/src/main.jsx) | 已完成 |
| RE-KP205 | renderToPipeableStream | 1. Node Stream 2. Shell Ready 3. pipe/abort | [文档](./kp205-render-to-pipeable-stream/README.md) · [源码](./kp205-render-to-pipeable-stream/src/server.mjs) | 已完成 |
| RE-KP206 | renderToReadableStream | 1. Web Stream 2. Edge Runtime 3. ReadableStream | `kp206-render-to-readable-stream/` | 待生成 |
| RE-KP207 | Streaming SSR | 1. Suspense 2. Progressive HTML 3. Reveal | `kp207-streaming-ssr/` | 待生成 |
| RE-KP208 | renderToString 的限制 | 1. No Streaming 2. Suspense Fallback 3. Legacy Constraint | `kp208-render-to-string-limitations/` | 待生成 |
| RE-KP209 | prerender | 1. Static API 2. Complete Content 3. Web Stream | `kp209-prerender/` | 待生成 |
| RE-KP210 | React 19.2 Partial Pre-rendering 基本模型 | 1. PPR 2. Static Shell 3. Deferred Content | `kp210-react19-2-partial-prerendering-model/` | 待生成 |
| RE-KP211 | prerenderToNodeStream | 1. Node Stream 2. Static Generation 3. Complete HTML | `kp211-prerender-to-node-stream/` | 待生成 |
| RE-KP212 | resume / resumeToPipeableStream | 1. Resume 2. Postponed State 3. Runtime | `kp212-resume-resume-to-pipeable-stream/` | 待生成 |
| RE-KP213 | resumeAndPrerender / resumeAndPrerenderToNodeStream | 1. Resume 2. Prerender 3. Node/Web Variants | `kp213-resume-and-prerender/` | 待生成 |

## 当前进度

- Chapter 21：**5 / 13**
- 下一知识点：**RE-KP206：renderToReadableStream**
