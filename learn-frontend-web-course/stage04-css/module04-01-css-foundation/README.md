# Module 04.01：CSS Foundation、Syntax 与 Stylesheet

## 模块目标

建立第一次学习 CSS 所需的完整最小心智模型：CSS 为什么存在、如何进入页面、规则如何组成、浏览器如何容错、如何确认样式是否真正生效。

## Lesson 顺序

1. **04.01.01 CSS 为什么存在**：从“只有 HTML 的页面”观察结构与表现分离问题。
2. **04.01.02 第一段 CSS**：从零创建 `index.html` 与 `styles.css`，完成首次样式修改。
3. **04.01.03 Rule / Selector / Declaration / Property / Value**：拆解一条 CSS 规则。
4. **04.01.04 Inline / `<style>` / External Stylesheet**：三种接入方式及边界。
5. **04.01.05 `<link rel="stylesheet">` 与资源加载**：路径、相对 URL、Network 验证。
6. **04.01.06 User-Agent Stylesheet**：为什么没写 CSS 页面仍然有样式。
7. **04.01.07 注释、空白、大小写与语法边界**。
8. **04.01.08 CSS Error Recovery**：故意写错声明、规则与未知属性，观察浏览器如何忽略错误。
9. **04.01.09 DevTools Styles 面板**：匹配规则、被覆盖声明、来源文件。
10. **04.01.10 Computed 面板**：第一次区分“写了什么”与“最终是什么”。
11. **04.01.11 CSS 调试最小工作流**：元素是否选中 → 规则是否加载 → 声明是否有效 → 是否被覆盖 → 最终值。
12. **04.01.12 综合实践：给 Stage 03 的纯 HTML 内容页建立第一套样式**。

## 深度分布

- **Must**：01～07、09～11
- **Should**：08、12
- **Expert 前置**：理解 CSS 是声明式约束系统，而不是逐句执行的脚本。

## Definition of Done

学习者能够不用框架，从空目录创建 HTML + CSS 页面；能够通过 Network、Styles、Computed 三处证据证明样式表加载和最终值。
