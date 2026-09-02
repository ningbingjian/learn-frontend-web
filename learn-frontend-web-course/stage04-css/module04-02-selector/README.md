# Module 04.02：Selector 完整体系

## 模块目标

一次学透 CSS 如何描述“哪些元素应该被这条规则命中”，并掌握复杂选择器的可维护性、性能认知与 Debug 方法。

## Lesson 顺序

1. **04.02.01 Type / Class / ID / Universal Selector**。
2. **04.02.02 Attribute Selector**：存在、精确、前缀、后缀、包含、大小写选项。
3. **04.02.03 Descendant / Child / Adjacent / General Sibling Combinator**。
4. **04.02.04 Selector List 与组合选择器**。
5. **04.02.05 结构伪类**：`:first-child`、`:last-child`、`:nth-child()`、`:nth-of-type()`。
6. **04.02.06 状态伪类**：`:hover`、`:focus`、`:focus-visible`、`:checked`、`:disabled` 等。
7. **04.02.07 Link / Target / Form 相关伪类**。
8. **04.02.08 `:not()` / `:is()` / `:where()`**：匹配与 specificity 差异。
9. **04.02.09 `:has()` 关系选择能力**：父级 / 兄弟条件与工程边界。
10. **04.02.10 Pseudo-element**：`::before`、`::after`、`::first-line`、`::selection`、marker 等。
11. **04.02.11 Selector Matching 与 DOM 变化**：动态状态如何触发重新匹配的高层认知。
12. **04.02.12 Wrong Way：过度嵌套、依赖 DOM 结构、ID 滥用、超长选择器**。
13. **04.02.13 DevTools Selector Debug**：为什么“写了选择器却没命中”。
14. **04.02.14 综合实践：无 JavaScript 的交互状态样式组件集**。

## Definition of Done

面对任意常见 DOM，学习者能够构造最小且可维护的 Selector；能够解释 `:is()`、`:where()`、`:has()` 与组合器的差异，并通过 DevTools 证明匹配结果。
