# DIAGNOSTIC REPORT

> 使用本模板完成 Broken Baseline 的证据记录。证据仅来自 HTML、CSS、DevTools 与静态 Broken / Solution 对照。

## S01 · Invalid Selector List

- 症状：
- 预测 Match Set：
- Elements / Styles 证据：
- 根因：
- 最小修复：
- 回归：

## S02 · Attribute Substring Over-match

- 症状：
- 实际被误选的属性值：
- Styles 证据：
- 根因：
- 最小修复：
- 回归：

## S03 · Broad Descendant Leakage

- 症状：
- 被误伤的嵌套组件：
- DOM 关系：
- 根因：
- 最小修复：
- 回归：

## S04 · Structural Position as Business Identity

- 症状：
- 插入说明元素后的兄弟集合：
- 根因：
- 稳定状态契约：
- 回归：

## S05 · `:is()` Specificity Trap

- 症状：
- 两条 Selector 的权重推导：
- Styles 证据：
- 最小修复：
- 回归：

## S06 · `:has()` Direction Error

- Subject：
- 参数关系方向：
- 真实 DOM：
- 最小修复：
- 回归：

## S07 · Hover-only Interaction

- 键盘路径症状：
- 必要反馈：
- 修复：
- 回归：

## S08 · Focus Indicator Missing

- Tab 操作结果：
- Styles 证据：
- 修复：
- 回归：

## S09 · Generated-content-only Label

- 关闭 CSS 后的内容：
- HTML 语义问题：
- 修复：
- 回归：

## S10 · Sass Concatenation Mental Model

- 错误源码：
- 期望组合结果：
- 原生 Nesting 实际边界：
- 修复：
- 回归：

## S11 · `:scope` Context Misunderstanding

- 错误假设：
- Stylesheet 中的参考根：
- 当前真正需要表达的关系：
- 修复：
- 未来 Stage 边界：

## 总结

- 哪些故障属于 Parser？
- 哪些属于 Match Set？
- 哪些属于 Specificity？
- 哪些属于 HTML / State Contract？
- 哪些属于 A11Y？
- 哪些属于未来 Stage 技术误用？
