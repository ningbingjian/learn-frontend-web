# SELECTOR_CONTRACT：Module 04.02 生产级最小约定

## 1. Component Identity

组件 Root 和关键 Element 使用稳定、可搜索的类名。不得依赖四层以上 DOM Path 表达组件身份。

## 2. Selector Depth Budget

默认最大 Complex Selector 深度：

```text
3 个 Compound Selector
```

超过后必须在 Review 中说明：

- 为什么稳定类名不能解决。
- 跨越了哪些组件边界。
- 哪个 DOM 改动会导致失效。
- 有什么自动 Match Set 证据。

Native Nesting 的缩进层级也计入组合后的 Selector Depth，不能用缩进隐藏复杂度。

## 3. Specificity Budget

组件普通规则默认不使用 ID Selector。

推荐基线：

```text
0 ID
0～2 Class / Attribute / Pseudo-class
必要的 Type Selector
```

`:is()`、`:not()`、`:has()` 与 `&` 的参数或父列表可能引入最大 Specificity，Review 必须检查完整参数，不只看实际匹配分支。

低权重基线优先考虑 `:where()`，但要写清楚“允许谁覆盖”。

## 4. State Modeling

业务状态优先使用：

```html
data-state="loading"
aria-current="step"
aria-expanded="true"
disabled
checked
```

规则：

- Structural Position 只表达结构，不表达业务身份。
- 不用颜色作为唯一状态信息。
- 能使用平台语义属性时，不自造纯视觉 class 替代。
- JavaScript 负责改变状态，CSS Selector 负责匹配当前状态。

## 5. Attribute Selector

- 离散枚举使用 `=`。
- 空格分隔 Token 使用 `~=`。
- 语言前缀使用 `|=`。
- `*=`、`^=`、`$=` 必须证明不会 Over-match。
- 大小写 Modifier 必须与数据契约一致。

## 6. Relation Selector

Combinator 和 `:has()` 必须能够用一句自然语言解释：

```text
谁是 Subject？
谁是 Anchor？
关系方向是什么？
直接还是任意深度？
是否跨越组件边界？
```

无法解释时，不允许合并。

## 7. Structural Selector

`:nth-child()`、`:nth-of-type()` 与 `of S` 必须写出：

```text
被计数的 sibling set
过滤发生前还是后
DOM 插入是否会改变结果
```

不得使用位置表达订单状态、用户角色、当前步骤等业务身份。

## 8. Native Nesting

允许：

```css
.component {
  &:hover { ... }
  &[data-state="active"] { ... }
  & > .component__title { ... }
  .theme-dark & { ... }
}
```

禁止无审查迁移：

```css
&__element
&--modifier
```

Nesting 不提供 Scope。组合后的 Selector 仍必须满足 Depth / Specificity / Ownership Contract。

## 9. Focus 与 Input Modality

- Hover 不能是唯一交互状态。
- 不得无替代移除 Focus Indicator。
- `:focus-visible` 和 `:focus-within` 应按真实键盘路径验证。
- Disabled / Required / Invalid 优先使用 HTML 平台语义。
- 关键功能不能只由 Pseudo-element Content 表达。

## 10. Evidence Requirement

复杂 Selector 至少提供一个自动 Evidence：

```js
document.querySelectorAll(selector)
element.matches(selector)
CSS.supports(`selector(${selector})`)
getComputedStyle(element, "::before")
```

并提供一条 DevTools Matched Rules 记录。

Module Project 或生产 Bug 修复必须记录：

```text
Predicted Match Set
Actual Match Set
Cascade Winner（需要时）
Minimal Fix
Regression Set
```

## 11. Review Checklist

- [ ] Selector Parser 有效。
- [ ] Subject / Candidate 明确。
- [ ] Match Set 可预测。
- [ ] 没有 Attribute Over-match。
- [ ] 没有隐藏的 ID Specificity。
- [ ] 没有跨组件泄漏。
- [ ] Structural Selector 没承担业务身份。
- [ ] `:has()` 方向正确。
- [ ] Nesting 可还原且深度可控。
- [ ] Pointer / Keyboard 状态完整。
- [ ] 必要信息存在于真实 DOM。
- [ ] 有 Console / DevTools Evidence。
