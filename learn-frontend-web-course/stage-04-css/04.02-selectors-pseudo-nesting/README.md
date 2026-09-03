# Module 04.02：Selector、关系匹配、Pseudo、Nesting 与 `:scope`

> Stage：[Stage 04 CSS 完整体系](../README.md)  
> 状态：✅ 已完成  
> 当前完成：KP001～KP008 / 8 课  
> 前置 Module：[04.01 CSS 语言、样式表与级联体系](../04.01-css-language-and-stylesheets/)  
> Module Review：[MODULE_REVIEW.md](./MODULE_REVIEW.md)

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个问题：

> 浏览器面对一条 Selector 时，怎样根据 DOM 的元素类型、属性、结构、关系与状态确定 Match Set，并让复杂 Selector 保持可解释、可测试、可访问和可治理？

完整学习链：

```text
Selector Source
→ Parse Selector
→ Ordinary / Forgiving / Relative Selector List
→ Simple Selector
→ Compound Selector
→ Complex Selector
→ Element / Attribute Match
→ Tree Relationship Match
→ Structural Match
→ Functional / Relational Match
→ UI / Form / Focus State
→ Pseudo-element Target
→ Native Nesting / & Context
→ :scope Reference Root
→ Match Set
→ 交给 Module 04.01 的 Cascade 决定 Winner
```

关键边界：

```text
Selector
→ 决定“谁进入竞争”

Cascade
→ 决定“匹配声明中谁获胜”
```

Module 04.01 已完整拥有：

- Origin。
- Importance。
- Encapsulation Context。
- Cascade Layer。
- Specificity。
- Scoping Proximity。
- Source Order。
- Inheritance。
- Value Processing。

Module 04.02 不创建平行的 Cascade 课程，只在解释 `:is()`、`:where()`、`:not()`、`:has()` 和 `&` 时引用 Specificity 规则。

### 1.2 为什么必须在 Box Model 前完成

如果不能准确判断 Selector Match Set，后续进入 Box Model、Flex、Grid 时会把两类完全不同的问题混在一起：

```text
规则根本没有匹配
vs
规则匹配了，但布局算法得到另一个结果
```

完成本 Module 后，学习者必须先回答：

```text
DOM 目标存在吗？
Selector 能解析吗？
Candidate / Subject 是谁？
每个 Simple Selector 限制什么？
Combinator 表达什么关系？
Pseudo-class 检查什么状态？
实际 Match Set 是什么？
```

只有 Match Set 正确，才进入 Cascade 与 Layout 分析。

---

## 2. Scope

### 2.1 本 Module 完整拥有

- Selector grammar。
- Type / Universal / Class / ID Selector。
- Simple / Compound / Complex Selector。
- Selector List 与 Invalidity。
- Attribute Selector：
  - presence；
  - exact；
  - token；
  - hyphen；
  - prefix；
  - suffix；
  - substring；
  - ASCII case modifier。
- Combinator：
  - descendant；
  - child；
  - adjacent sibling；
  - subsequent sibling。
- Structural Pseudo-class：
  - `:first-child`；
  - `:last-child`；
  - `:only-child`；
  - `:nth-child()`；
  - `:nth-of-type()`；
  - `:nth-child(... of S)`。
- Functional / Relational Pseudo-class：
  - `:is()`；
  - `:where()`；
  - `:not()`；
  - `:has()`。
- Relative Selector 与 Anchor / Subject。
- UI / Link / Form / Focus State。
- Pseudo-element：
  - `::before`；
  - `::after`；
  - `::marker`；
  - `::selection`。
- Native CSS Nesting。
- Nesting Selector `&`。
- Nesting 与 Parent Selector List Specificity。
- `:scope` Pseudo-class 与 DOM Scoped Query。
- Selector Evidence：
  - DevTools Matched Rules；
  - `querySelectorAll()`；
  - `matches()`；
  - `CSS.supports()`；
  - `getComputedStyle(..., "::pseudo")`。
- Selector Architecture：
  - DOM Coupling；
  - Depth Budget；
  - Specificity Budget；
  - State Modeling；
  - A11Y Boundary。

### 2.2 不属于本 Module

- `@scope` At-rule 与 Scoping Proximity：Module 04.01。
- Box Model、Sizing、Intrinsic Size、Overflow：Module 04.03。
- CSS Modules、Utility CSS、CSS-in-JS 选型：Module 04.13。
- Selector Engine 内部索引、Bloom Filter、Style Invalidation 深入：Stage 09 / Stage 24。
- 完整 Form API 与 Constraint Validation API：Stage 07。
- 完整 Design System A11Y：Stage 14。

---

## 3. Must / Should / Expert

### Must

- 识别常见 Basic Selector。
- 区分 Simple / Compound / Complex Selector。
- 准确读取四类 Combinator。
- 使用 Attribute Selector 表达离散状态。
- 区分 Child Index 与 Type Index。
- 使用常见 UI / Form / Focus Pseudo-class。
- 区分 Pseudo-class 与 Pseudo-element。
- 用 DevTools / `querySelectorAll()` / `matches()` 验证 Match Set。

### Should

- 解释 Ordinary Selector List Invalidity。
- 使用 `:nth-child(... of S)`。
- 使用 `:is()` / `:where()` / `:not()` 控制重复与 Specificity。
- 使用 `:has()` 表达真实关系，并判断方向。
- 识别 Attribute Substring Over-match。
- 识别 Structural Position 承担业务身份的问题。
- 识别 Hover-only、Focus Removal、Generated-content-only Label。
- 使用 Native CSS Nesting。
- 把 Nested Source 还原为组合后的 Selector。
- 降低 DOM Coupling 与 Selector Fragility。

### Expert

- 解释 Relative Selector 与 Anchor Element。
- 解释 `:is()` / `:where()` / `&` 的 Specificity 边界。
- 解释 `:scope` 在 Element / DocumentFragment Query 中的 Reference Root。
- 区分 `:scope` Pseudo-class 与 `@scope` At-rule。
- 解释 Native Nesting 为什么不是字符串预处理。
- 识别 Sass `&__element` 迁移风险。
- 为大型系统制定：
  - Selector Depth Budget；
  - Specificity Budget；
  - State Modeling Rule；
  - Nesting Contract；
  - Evidence Requirement；
  - A11Y Review Checklist。

---

## 4. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP001 | [Selector Grammar、Type、Class、ID、Universal 与 Compound Selector](./kp001-selector-grammar-basic-selectors/) | Must | BUILD + FAILURE-LAB | ✅ |
| KP002 | [Attribute Selector：Presence、Value、Token、Substring 与 Case Matching](./kp002-attribute-selectors/) | Must / Should | BUILD + FAILURE-LAB | ✅ |
| KP003 | [Combinator：Descendant、Child、Adjacent 与 Subsequent Sibling](./kp003-combinators-relationships/) | Must / Should | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP004 | [Structural Pseudo-class：`:nth-child()`、`:nth-of-type()` 与 `of S`](./kp004-structural-pseudo-classes/) | Must / Should | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP005 | [`:is()`、`:where()`、`:not()` 与 `:has()`](./kp005-functional-relational-pseudo-classes/) | Should / Expert | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP006 | [UI State、Form、Focus Pseudo-class 与 Pseudo-element](./kp006-ui-form-focus-pseudo-elements/) | Must / Should | A11Y + FAILURE-LAB | ✅ |
| KP007 | [Native CSS Nesting、`&`、`:scope` 与 Selector Context](./kp007-native-css-nesting-scope/) | Should / Expert | BUILD + ARCHITECTURE + FAILURE-LAB | ✅ |
| KP008 | [Module Project：Selector Matching & Refactoring Lab](./kp008-selector-matching-refactoring-lab/) | 全层级 | PROJECT + DEBUG + A11Y + FAILURE-LAB | ✅ |

完成度：

```text
8 / 8
100%
COMPLETE
```

---

## 5. 八课因果链

```text
KP001
Selector Source 自己由什么组成？
↓
KP002
怎样基于 Attribute 与 State Value 匹配？
↓
KP003
怎样基于 Ancestor / Parent / Sibling 关系匹配？
↓
KP004
怎样基于 Sibling Set、Type Set 与 Filtered Set 计算位置？
↓
KP005
怎样组合、排除并检查 Relational Condition？
↓
KP006
怎样匹配 UI / Form / Focus State，并理解 Pseudo-element Target？
↓
KP007
怎样用 Native Nesting 组织 Selector Context，并用 :scope 明确 Query Root？
↓
KP008
面对多类 Selector 故障，能否预测、验证、重构和建立治理约定？
```

---

## 6. 每课能力与证据

### KP001：Selector Grammar

核心能力：

```text
Type
Class
ID
Universal
Selector List
Compound vs Descendant
```

主要 Evidence：

```js
document.querySelectorAll(".selector-card.featured")
element.matches(".selector-card.featured")
```

Failure：

```text
Ordinary Selector List 中一个 invalid item
→ 整条 Style Rule 无效
```

### KP002：Attribute Selector

核心能力：

```text
[attr]
[attr="value"]
[attr~="token"]
[attr|="prefix"]
[attr^="prefix"]
[attr$="suffix"]
[attr*="substring"]
[attr="value" i]
```

Failure：

```text
substring over-match
case assumption
state value contract 不清晰
```

### KP003：Combinator

核心能力：

```text
A B
A > B
A + B
A ~ B
```

Failure：

```text
Descendant Leakage
Sibling Direction
Deep DOM Coupling
```

### KP004：Structural Pseudo-class

核心能力：

```text
:first-child
:last-child
:only-child
:nth-child(An+B)
:nth-of-type(An+B)
:nth-child(An+B of S)
```

Failure：

```text
Child Set / Type Set / Filtered Set 混淆
DOM 插入导致业务状态漂移
```

### KP005：Functional / Relational Pseudo

核心能力：

```text
:is()
:where()
:not()
:has()
```

Failure：

```text
:is() 参数中的 ID Specificity
:where() 权重误判
:has() Subject / Direction 错误
```

### KP006：UI / Form / Focus / Pseudo-element

核心能力：

```text
:hover
:active
:focus
:focus-visible
:focus-within
:required
:valid
:invalid
:checked
:disabled
:read-only
::before
::after
::marker
::selection
```

Failure：

```text
Hover-only
Focus Removal
Fake Disabled
Generated-content-only Label
Color-only Invalid State
```

### KP007：Native Nesting / `&` / `:scope`

核心能力：

```text
implicit descendant nesting
&:state
&[attribute]
& > child
ancestor &
parent selector list specificity
:scope > child
```

Failure：

```text
Nesting 被误当 Scope
&__element 被误当字符串拼接
深层缩进隐藏 DOM Coupling
父 Selector List 隐藏 ID Specificity
:scope 与 @scope 混淆
```

### KP008：Module Project

项目组合 11 类故障：

```text
S01 Invalid Selector List
S02 Attribute Substring Over-match
S03 Broad Descendant Coupling
S04 Structural Position as Business Identity
S05 :is() Specificity Trap
S06 :has() Direction Error
S07 Hover-only Interaction
S08 Focus Removal
S09 Generated-content-only Label
S10 Sass Concatenation Mental Model
S11 Scoped Query Boundary
```

产物：

- Broken Baseline。
- Solution。
- Dynamic Evidence App。
- Diagnostic Report Template。
- Reference Solution。
- Selector Contract。
- Regression Matrix。

---

## 7. Selector Matching 诊断树

```text
目标样式异常
↓
DOM 中目标 Element 是否存在？
↓
Selector Source 是否能被 Parser 接受？
↓
当前是 Ordinary / Forgiving / Relative Selector List？
↓
Subject / Candidate 是谁？
↓
每个 Simple Selector 是否满足？
↓
Compound Selector 是否要求同一 Element 同时满足？
↓
Combinator Relation 是否成立？
↓
Attribute Operator 是否符合数据契约？
↓
Structural Sibling Set 是否正确？
↓
Functional Pseudo 参数是否正确？
↓
:has() Anchor / Direction 是否正确？
↓
UI / Form / Focus State 是否真实存在？
↓
Pseudo-element 是否生成？
↓
Nesting Context 是否正确？
↓
:scope Query Root 是否正确？
↓
得到 Actual Match Set
↓
进入 Module 04.01 Cascade Winner 分析
```

### Parser 与 Match 的区别

```text
Parser 失败
→ Rule 可能根本不进入 CSSOM

Match 失败
→ Rule 存在，但当前 Element 不满足 Selector

Cascade 失败
→ Rule 匹配，但 Declaration 没获胜

Used Value / Layout 问题
→ Declaration 获胜，但最终几何或渲染结果不同
```

---

## 8. Evidence Contract

Selector 结论必须优先使用：

```text
Elements DOM Tree
DevTools Styles Matched Rules
Computed
querySelectorAll()
matches()
CSS.supports("selector(...)")
getComputedStyle(element, "::pseudo")
CSSOM（需要区分 Parser 时）
Keyboard / Pointer 操作记录
```

### 常用命令

```js
document.querySelectorAll(".card.featured")

document.querySelector('[data-state="active"]')
  .matches('[data-state="active"]')

document.querySelectorAll(".toolbar > .icon")

document.querySelectorAll(":nth-child(2 of .eligible)")

document.querySelectorAll(".panel:has(.status-error)")

root.querySelectorAll(":scope > .item")

CSS.supports("selector(:has(*))")

CSS.supports("selector(&)")

getComputedStyle(element, "::before").content
```

### 不允许只看页面颜色

同样视觉可能来自：

- 目标 Rule。
- 另一个 Rule。
- Inheritance。
- UA Stylesheet。
- Cascade Override。
- Pseudo-element。
- 默认值。
- 上一轮未清理状态。

必须记录 Match Evidence。

---

## 9. Production Selector Contract

### 9.1 默认表达顺序

```text
语义 HTML
↓
稳定 Component Class
↓
平台语义 Attribute / State Attribute
↓
短而明确的 Relation Selector
↓
Structural Pseudo-class
↓
Functional / Relational Pseudo-class
↓
深层 DOM-coupled Selector
```

越靠后，Review 证明责任越高。

### 9.2 Selector Depth Budget

默认：

```text
Complex Selector 不超过 3 个 Compound
Native Nesting 不超过 3 层
```

超过必须说明：

- 为什么不能使用稳定类名。
- 是否跨越组件边界。
- 哪些 DOM 改动会破坏它。
- 是否有 Match Set Test。

### 9.3 Specificity Budget

普通组件规则：

```text
0 ID
0～2 Class / Attribute / Pseudo-class
必要 Type Selector
```

特别检查：

```text
:is()
:not()
:has()
&
Parent Selector List
```

因为最大参数或父列表可能引入隐藏权重。

### 9.4 State Modeling

业务状态优先：

```html
data-state="loading"
aria-expanded="true"
aria-current="step"
disabled
checked
required
```

禁止：

```text
用 :nth-child() 表达“当前订单”
用颜色单独表达“错误”
用纯 CSS class 假装 disabled 语义
```

### 9.5 Native Nesting

允许：

```css
.component {
  &:hover { ... }
  &[data-state="active"] { ... }
  & > .component__title { ... }
  .theme-dark & { ... }
}
```

迁移审计：

```text
&__
&--
&-
```

原生 CSS 不提供 Sass 字符串拼接。

### 9.6 A11Y

- Hover 不能是唯一状态。
- Focus Indicator 不得无替代移除。
- 必要业务文字必须存在于真实 DOM。
- Pseudo-element 只承担装饰。
- Form State 优先使用平台语义。

---

## 10. Failure Lab 总表

| 类别 | Failure | 对应 Lesson |
| --- | --- | --- |
| Parser | Invalid Selector List | KP001 / KP008 |
| Grammar | Compound 被误写为 Descendant | KP001 |
| Attribute | Substring Over-match | KP002 / KP008 |
| Relation | Descendant Leakage | KP003 / KP008 |
| Relation | `+` / `~` 混淆 | KP003 |
| Structural | `nth-child` / `nth-of-type` 混淆 | KP004 |
| Structural | Position 承担业务身份 | KP004 / KP008 |
| Specificity | `:is()` ID Trap | KP005 / KP008 |
| Relation | `:has()` Direction Error | KP005 / KP008 |
| Input | Hover-only | KP006 / KP008 |
| A11Y | Focus Removal | KP006 / KP008 |
| A11Y | Generated-content-only Label | KP006 / KP008 |
| Nesting | Nesting 被误当隔离 | KP007 |
| Nesting | Sass `&__element` 迁移 | KP007 / KP008 |
| Query | `:scope` Root 错误 | KP007 / KP008 |

---

## 11. Reproducibility

每个 Lesson 都可以独立：

```bash
npm run check
npm run dev
```

默认访问：

```text
http://127.0.0.1:4173
```

Lesson 不依赖上一课服务器、运行目录或第三方 npm 包。

动态实验使用原生 JavaScript，仅负责：

- 改变 DOM / State。
- 输出 Match Evidence。
- 触发回归场景。

JavaScript 不是 Selector 课程的替代实现。

---

## 12. Module Project Definition of Done

完成 KP008 时必须提交：

- 11 个 Case 的预测。
- 11 个 Case 的实际 Match Evidence。
- 自己的 `MY_DIAGNOSTIC_REPORT.md`。
- 自己的 `my-solution.html / css`。
- Dynamic DOM 回归。
- Error State 回归。
- Keyboard 回归。
- CSS Disabled 回归。
- Selector Contract。
- 与 Reference Solution 的差异复盘。

项目不能只提交最终正常页面。

---

## 13. Module Definition of Done

学习者必须能够：

- 从源码拆解常见 Selector。
- 根据 DOM 预测 Match Set。
- 区分 Parser / Match / Cascade / Layout 问题。
- 正确使用 Attribute Operators。
- 正确选择 Combinator。
- 区分 Child / Type / Filtered Index。
- 正确使用 `:is()`、`:where()`、`:not()`、`:has()`。
- 解释 Relative Selector、Subject 与 Anchor。
- 验证 UI / Form / Focus State。
- 区分 Pseudo-class 与 Pseudo-element。
- 使用 Native CSS Nesting。
- 解释 `&` 与父 Selector Context。
- 解释 Sass Concatenation 为什么不能直接迁移。
- 使用 `:scope` 构造 Scoped Query。
- 区分 `:scope` 与 `@scope`。
- 建立 Selector Depth / Specificity / State / A11Y Contract。
- 完成多故障项目的证据驱动重构。

---

## 14. Module Review 结论

复审文件：

- [MODULE_REVIEW.md](./MODULE_REVIEW.md)

结论：

```text
Scope        PASS
Depth        PASS
Evidence     PASS
Failure Lab  PASS
Project      PASS
Reproducible PASS
Boundary     PASS
```

已知保留边界：

- 浏览器 Selector Engine 内部实现留给 Stage 09。
- Style Invalidation 性能留给 Stage 24。
- 完整 CSS Architecture 方案选型留给 Module 04.13。
- 完整 A11Y 组件工程留给 Stage 14。

因此 Module 04.02 正式关闭，不再创建：

```text
Selector 高级篇
Pseudo-class 补充篇
Nesting 原理篇
Selector Debug 补课
```

---

## 15. 下一 Module

进入：

```text
Module 04.03
Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow
```

核心问题：

> 当 Selector 与 Cascade 已经确定最终声明后，一个 Element 的 Content Box、Padding、Border、Margin、Min/Max Constraint、Intrinsic Contribution 与 Overflow 怎样共同决定最终几何尺寸？

开始 04.03 前，先创建 Module Teaching Contract，再按每批三课推进。
