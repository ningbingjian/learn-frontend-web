# Module 11.20：Resource Loading 与 Metadata

> [返回 Stage 11 总纲](../README.md)  > · [上一个 Module](../module11-19-react-dom-portal/README.md)  > · [下一个 Module](../module11-21-error-model/README.md)

本 Module 学习 React DOM 的资源提示与 Metadata 能力，并连接 SSR/Streaming/性能，而不是把它们孤立成 API 背诵。

### Lesson RE-RESOURCE-001：浏览器为什么需要 Resource Hint

复习 connection setup、discovery time、critical resource。

### Lesson RE-RESOURCE-002：preconnect 什么时候有价值

为跨域 API/font/CDN 提前建立连接，并测量连接时序。

### Lesson RE-RESOURCE-003：preload 适合什么资源

处理 font/image/script/style 的优先发现与错误用法。

### Lesson RE-RESOURCE-004：preinit 与 preload 有什么区别

理解“只下载”与“准备执行/应用”的高层语义。

### Lesson RE-RESOURCE-005：Module Preload 如何影响 ESM Chunk

连接 Vite split chunk / route lazy。

### Lesson RE-RESOURCE-006：React 资源 API 如何去重

多个组件声明同一资源时观察最终 DOM。

### Lesson RE-RESOURCE-007：Title / Meta 如何由 React Component 声明

建立 Metadata 与页面树/路由/SSR 的关系。

### Lesson RE-RESOURCE-008：Nested Metadata 冲突应该怎么处理

讨论 route/page ownership 和重复 tag。

### Lesson RE-RESOURCE-009：Resource Hint 不是越多越好

观察带宽竞争、错误优先级和无效预加载。

### Lesson RE-RESOURCE-010：综合实现——为 React 页面建立 Metadata + Critical Resource Strategy

用 Network waterfall 验证实际收益。

---
