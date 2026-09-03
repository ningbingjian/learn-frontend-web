# REFERENCE_SOLUTION：Selector Matching & Refactoring Lab

> 先完成自己的 `DIAGNOSTIC_REPORT.md` 再阅读。

## S01：Invalid Selector List

Broken：

```css
.selector-list-target,
:totally-invalid-pseudo { ... }
```

普通 Selector List 中存在无效项，整个 Rule 无效。修复为单独、有效的 `.selector-list-target` Rule。不要用“增加更高权重”处理 Parser 问题。

## S02：Attribute Substring Over-match

`[data-role*="admin"]` 同时匹配 `admin` 和 `superadmin`。角色是离散枚举，应使用 `[data-role="admin"]`。只有需求确实是任意子串时才使用 `*=`。

## S03：Deep / Broad Descendant Coupling

`.dashboard .title` 会穿透所有后代组件。修复使用稳定组件类：

```css
.dashboard > .dashboard__title { ... }
.panel__title { ... }
.embedded-widget__title { ... }
```

真正的目标是明确样式所有权，而不是单纯把 Selector 写得更长。

## S04：Structural Position as Business Identity

`:nth-child(2)` 表达第二个 DOM Child，不表达“当前版本”。插入提示后 Match Set 会漂移。修复使用：

```css
.release-row[data-state="current"]
```

并保留 `aria-current="step"` 语义。

## S05：`:is()` Specificity Trap

`:is(.action, #legacy-action)` 的 Specificity 取参数最大值，虚构 ID 仍会抬高规则。修复使用 `:where()` 建立零权重基线，或拆分 Legacy Rule。

## S06：`:has()` Direction Error

需求的 Subject 是 Panel：

```css
.status-panel:has(.status-error)
```

错误写法 `.status-error:has(.panel)` 检查的是“错误节点是否包含 Panel”，方向相反。

## S07：Hover-only Interaction

Hover 不覆盖键盘、触摸和其他输入。修复至少同时提供：

```css
.interactive-target:is(:hover, :focus-visible)
```

交互语义仍应由 HTML 元素和事件模型提供。

## S08：Focus Removal

`outline: none` 在没有替代时会移除关键键盘位置证据。修复提供高对比 `:focus-visible` Indicator，并使用 Tab / Shift+Tab 回归。

## S09：Generated-content-only Label

`::before { content: "删除项目" }` 不应承担必要业务标签。修复把文字放回真实 DOM，Pseudo-element 只保留装饰。禁用 CSS 后按钮仍应可理解。

## S10：Sass Concatenation Mental Model

原生 CSS 不把 `&__label` 转换成 `.notice__label`。修复：

```css
.notice {
  & > .notice__label { ... }
}
```

或把 `.notice__label` 写成顶层 Rule。

## S11：Scoped Query Boundary

`scopeZone.querySelectorAll(".scope-row")` 包含所有深度。只要直接子元素时使用：

```js
scopeZone.querySelectorAll(":scope > .scope-row")
```

`:scope` 是当前 DOM Query 的 Reference Root，不是 `@scope` At-rule。

## 总体重构原则

```text
Parser 正确
→ Match Set 准确
→ Component Ownership 清晰
→ Business State 不依赖位置
→ Specificity 可覆盖
→ Relation 方向明确
→ Input Modality 完整
→ 必要语义存在于 DOM
→ Nesting 可还原
→ Query Root 明确
```
