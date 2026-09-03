# REFERENCE SOLUTION

## S01 · Invalid Selector List

把实验性或非法成员从普通 Selector List 中移除，使 `.selector-list-target` 成为独立有效规则。

## S02 · Attribute Substring Over-match

将 `[data-role*="admin"]` 改为 `[data-role="admin"]`，让角色成为离散状态，而不是模糊字符串。

## S03 · Broad Descendant Leakage

把 `.dashboard .title` 拆成 `.dashboard > .dashboard__title` 与 `.widget__title`，恢复所有权。

## S04 · Structural Position as Business Identity

把 `.release-row:nth-child(2)` 改为 `.release-row[data-state="current"]`。插入其他兄弟不再改变身份。

## S05 · `:is()` Specificity Trap

用 `:where()` 建立零权重分组基线，再由普通组件 class 覆盖。

## S06 · `:has()` Direction Error

Subject 应是父 `.status-panel`，正确规则为 `.status-panel:has(.status-error)`。

## S07 · Hover-only Interaction

基础边框始终可见，Hover 只做增强；键盘路径不依赖 Hover。

## S08 · Focus Indicator Missing

使用 `:focus-visible` 提供高对比 outline，不无替代地删除焦点指示。

## S09 · Generated-content-only Label

将“删除项目”放入真实 `<span>`，Pseudo-element 只保留装饰警示符号。

## S10 · Sass Concatenation Mental Model

把 `&__label` 改为 `& > .notice__label` 或完整类名。Native Nesting 不做字符串拼接。

## S11 · `:scope` Context Misunderstanding

顶层 Stylesheet 不会自动把当前 section 当 scoped query 根。这里真正需要的是 `.scope-zone > .scope-row`。DOM scoped query 留到 Stage 07。
