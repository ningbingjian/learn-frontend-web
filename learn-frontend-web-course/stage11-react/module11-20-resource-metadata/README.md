# Module 11.20：Resource Loading 与 Metadata

> [← Module 11.19：React DOM 与 Portal](../module11-19-react-dom-portal/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.21：React Error Model →](../module11-21-error-model/README.md)

本 Module 学习 React DOM 的资源提示与 Metadata 能力，并连接 SSR/Streaming/性能，而不是把它们孤立成 API 背诵。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（10 课）</strong></summary>

- [RE-RESOURCE-001：浏览器为什么需要 Resource Hint](#lesson-re-resource-001)
- [RE-RESOURCE-002：preconnect 什么时候有价值](#lesson-re-resource-002)
- [RE-RESOURCE-003：preload 适合什么资源](#lesson-re-resource-003)
- [RE-RESOURCE-004：preinit 与 preload 有什么区别](#lesson-re-resource-004)
- [RE-RESOURCE-005：Module Preload 如何影响 ESM Chunk](#lesson-re-resource-005)
- [RE-RESOURCE-006：React 资源 API 如何去重](#lesson-re-resource-006)
- [RE-RESOURCE-007：Title / Meta 如何由 React Component 声明](#lesson-re-resource-007)
- [RE-RESOURCE-008：Nested Metadata 冲突应该怎么处理](#lesson-re-resource-008)
- [RE-RESOURCE-009：Resource Hint 不是越多越好](#lesson-re-resource-009)
- [RE-RESOURCE-010：综合实现——为 React 页面建立 Metadata + Critical Resource Strategy](#lesson-re-resource-010)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-resource-001"></a>
### Lesson RE-RESOURCE-001：浏览器为什么需要 Resource Hint

复习 connection setup、discovery time、critical resource。

<a id="lesson-re-resource-002"></a>
### Lesson RE-RESOURCE-002：preconnect 什么时候有价值

为跨域 API/font/CDN 提前建立连接，并测量连接时序。

<a id="lesson-re-resource-003"></a>
### Lesson RE-RESOURCE-003：preload 适合什么资源

处理 font/image/script/style 的优先发现与错误用法。

<a id="lesson-re-resource-004"></a>
### Lesson RE-RESOURCE-004：preinit 与 preload 有什么区别

理解“只下载”与“准备执行/应用”的高层语义。

<a id="lesson-re-resource-005"></a>
### Lesson RE-RESOURCE-005：Module Preload 如何影响 ESM Chunk

连接 Vite split chunk / route lazy。

<a id="lesson-re-resource-006"></a>
### Lesson RE-RESOURCE-006：React 资源 API 如何去重

多个组件声明同一资源时观察最终 DOM。

<a id="lesson-re-resource-007"></a>
### Lesson RE-RESOURCE-007：Title / Meta 如何由 React Component 声明

建立 Metadata 与页面树/路由/SSR 的关系。

<a id="lesson-re-resource-008"></a>
### Lesson RE-RESOURCE-008：Nested Metadata 冲突应该怎么处理

讨论 route/page ownership 和重复 tag。

<a id="lesson-re-resource-009"></a>
### Lesson RE-RESOURCE-009：Resource Hint 不是越多越好

观察带宽竞争、错误优先级和无效预加载。

<a id="lesson-re-resource-010"></a>
### Lesson RE-RESOURCE-010：综合实现——为 React 页面建立 Metadata + Critical Resource Strategy

用 Network waterfall 验证实际收益。

---

---

> [← Module 11.19：React DOM 与 Portal](../module11-19-react-dom-portal/README.md) · [↑ Stage 11 总纲](../README.md) · [Module 11.21：React Error Model →](../module11-21-error-model/README.md)
