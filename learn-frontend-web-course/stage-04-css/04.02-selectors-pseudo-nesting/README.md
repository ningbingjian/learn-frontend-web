# Module 04.02：Selector、关系匹配、Pseudo、Nesting 与 `:scope`

> Stage：[Stage 04 CSS 完整体系](../README.md)  
> 状态：🚧 建设中  
> 当前完成：KP001～KP006 / 8 课  
> 前置 Module：[04.01 CSS 语言、样式表与级联体系](../04.01-css-language-and-stylesheets/)

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个问题：

> 浏览器面对一条 Selector 时，怎样根据 DOM 的元素类型、属性、状态、结构和关系确定“哪些元素被匹配”，以及复杂 selector 怎样保持可解释、可测试和可治理？

完整学习链：

```text
Selector Source
→ Parse Selector
→ Selector List
→ Simple Selector
→ Compound Selector
→ Complex Selector
→ Element / Attribute Match
→ Tree Relationship Match
→ Structural Match
→ Functional / Relational Match
→ UI / Form / Focus State
→ Pseudo-element Target
→ Nesting / :scope Context
→ Match Result
→ 交给 Cascade 决定最终声明
```

边界：

```text
Selector
→ 决定谁进入竞争

Cascade
→ 决定匹配声明中谁获胜
```

Module 04.01 已完整拥有 Cascade、Specificity、Layer、`@scope` 与 Value Pipeline。04.02 只在分析 selector 参数 specificity 时引用 04.01，不创建平行级联课程。

### 1.2 为什么现在学习

如果没有 Selector 心智模型，样式代码很容易演化为：

```text
类名越写越长
DOM 路径越绑越死
状态样式误伤其他组件
结构一改样式就失效
!important 持续升级
无法解释一条 selector 到底匹配谁
```

本 Module 的目标不是背 API，而是建立：

```text
DOM / State
→ Selector Structure
→ Predicted Match Set
→ DevTools / querySelectorAll() Evidence
→ Refactoring Decision
```

### 1.3 本 Module 完整拥有

- Selector grammar 与 selector list。
- Type / Universal / Class / ID selector。
- Compound / Complex Selector。
- Attribute Selector 全部常见匹配方式。
- Descendant / Child / Adjacent / Subsequent Sibling Combinator。
- Structural Pseudo-class 与 `An+B`。
- `:nth-child(An+B of S)`。
- `:is()` / `:where()` / `:not()` / `:has()`。
- Relative Selector 与 anchor element。
- UI state、form state、focus pseudo-class。
- Pseudo-element 与 generated content 边界。
- Native CSS Nesting、`&` 与 `:scope`。
- Ordinary / Forgiving Selector List 边界。
- Selector Invalidity、DOM Coupling、Specificity Debt 与 Failure Lab。
- DevTools、`querySelectorAll()`、`matches()`、`CSS.supports()` 证据。

### 1.4 不属于本 Module

- Cascade 排序、Cascade Layer、`@scope` at-rule、Scoping Proximity：04.01。
- Box Model / Sizing：04.03。
- CSS Architecture 方案选型：04.13。
- Selector Engine 内部数据结构、Style Invalidation 深入：Stage 09 / Stage 24。
- 完整 Form API：Stage 07。
- 完整 A11Y 工程：Stage 14。

---

## 2. Must / Should / Expert

### Must

- 识别 Type、Class、ID、Universal、Attribute Selector。
- 区分 Simple / Compound / Complex Selector。
- 正确使用四类 Combinator。
- 正确使用 `:first-child`、`:nth-child()`、`:nth-of-type()`。
- 理解常见 UI、Form、Focus Pseudo-class。
- 区分 Pseudo-class 与 Pseudo-element。
- 使用 DevTools、`querySelectorAll()` 和 `matches()` 验证匹配。

### Should

- 解释 ordinary selector list 的 invalidation。
- 使用 `:nth-child(... of S)`。
- 使用 `:is()` / `:where()` / `:not()` 控制重复和 specificity。
- 使用 `:has()` 表达真实关系并判断方向。
- 识别 Hover-only、Focus Removal 与 Generated-content A11Y 故障。
- 使用 Native CSS Nesting。
- 降低 DOM Coupling 和 Selector Fragility。

### Expert

- 解释 Relative Selector 与 anchor element。
- 解释 Forgiving Selector List 边界。
- 解释 `:scope` 在 scoped DOM query 与 Nesting Context 中的语义。
- 为大型系统制定 Selector Contract、Depth Budget、Specificity Budget 与 State Modeling Rule。
- 判断问题应由 Selector、HTML 语义、状态属性、组件边界还是 JavaScript 状态机解决。

---

## 3. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP001 | [Selector Grammar、Type、Class、ID、Universal 与 Compound Selector](./kp001-selector-grammar-basic-selectors/) | Must | BUILD + FAILURE-LAB | ✅ |
| KP002 | [Attribute Selector：Presence、Value、Token、Substring 与 Case Matching](./kp002-attribute-selectors/) | Must / Should | BUILD + FAILURE-LAB | ✅ |
| KP003 | [Combinator：Descendant、Child、Adjacent 与 Subsequent Sibling](./kp003-combinators-relationships/) | Must / Should | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP004 | [Structural Pseudo-class：`:nth-child()`、`:nth-of-type()` 与 `of S`](./kp004-structural-pseudo-classes/) | Must / Should | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP005 | [`:is()`、`:where()`、`:not()` 与 `:has()`](./kp005-functional-relational-pseudo-classes/) | Should / Expert | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP006 | [UI State、Form、Focus Pseudo-class 与 Pseudo-element](./kp006-ui-form-focus-pseudo-elements/) | Must / Should | A11Y + FAILURE-LAB | ✅ |
| KP007 | Native CSS Nesting、`&`、`:scope` 与 Selector Context | Should / Expert | BUILD + ARCHITECTURE-LAB | ⏳ |
| KP008 | Module Project：Selector Matching & Refactoring Lab | 全层级 | PROJECT + FAILURE-LAB | ⏳ |

当前完成度：

```text
6 / 8
= 75%
```

---

## 4. 已完成能力链

```text
KP001
Selector 自己由什么组成？
↓
KP002
怎样基于 Attribute / State Value 匹配？
↓
KP003
怎样基于祖先、父子和兄弟关系匹配？
↓
KP004
怎样基于当前元素兄弟顺序和过滤集合匹配？
↓
KP005
怎样组合、排除和检查关系？
↓
KP006
怎样匹配平台交互 / 表单 / 焦点状态，以及样式化抽象渲染目标？
```

完成前六课后，学习者必须能够回答：

```text
selector 的 subject / candidate 是谁？
每个 simple selector 限制了什么？
combinator 表示什么树关系？
structural index 基于哪个 sibling set？
functional pseudo 的参数怎样影响匹配和 specificity？
:has() 的 anchor 是谁？
pseudo-class 匹配真实元素的什么状态？
pseudo-element 是否是真实 DOM Element？
```

---

## 5. 起始状态策略

KP001～KP006 都采用独立最小项目。

```text
KP001 → Grammar
KP002 → Attribute
KP003 → Tree Relationship
KP004 → Sibling Index
KP005 → Functional / Relational
KP006 → UI / Form / Focus / Pseudo-element
```

这样可以保持单变量实验，不让一个复杂页面同时引入太多 selector 机制。

KP007 和 KP008 仍必须在 README 中明确：

- 零状态或复制来源。
- 完整路径。
- 基线验证。
- 新增、修改和删除文件。
- 第一次可运行时机。

---

## 6. 统一运行方式

每个 Lesson：

```bash
npm run check
npm run dev
```

默认地址：

```text
http://localhost:4173
```

已完成 Lesson 至少包含：

```text
README.md
index.html
styles.css
app.js（需要动态证据时）
package.json
server.mjs
verify.mjs
```

---

## 7. Evidence Contract

Selector 结论必须优先通过：

```text
Elements DOM Tree
→ DevTools Styles Matched Rules
→ document.querySelectorAll()
→ element.matches()
→ CSS.supports("selector(...)")
→ getComputedStyle(element, "::pseudo")
```

### 各课核心证据

| Lesson | 主要证据 |
| --- | --- |
| KP001 | Selector List 是否保留、Compound vs Descendant Match Set |
| KP002 | Attribute Value / Token / Case / Substring Match Set |
| KP003 | Parent / Ancestor / Sibling Tree Relationship |
| KP004 | Sibling Index、Type Index、`of S` 过滤后编号 |
| KP005 | `:is/:where/:not/:has` Match Set 与 Specificity 对照 |
| KP006 | Active Element、Focus State、Validity、Pseudo-element Computed Style |

### 不允许只凭视觉下结论

以下情况都可能“看起来一样”：

```text
selector 没匹配
其他 rule 补了同样视觉
匹配后被 Cascade 覆盖
属性通过继承得到
UA 样式碰巧相同
pseudo-element 没有生成 box
```

因此每课必须留下 Match Evidence。

---

## 8. Failure Lab 分布

### KP001～KP003

- 普通 selector list 中一个 invalid selector 使整条 rule 无效。
- Compound Selector 被误写成 Descendant Selector。
- Substring Attribute Selector 过度匹配。
- 属性值大小写假设错误。
- Descendant Selector 误伤深层后代。
- `+` 与 `~` 关系混淆。
- 深层 DOM Path 形成结构耦合。

### KP004

- `:nth-child()` 与 `:nth-of-type()` 索引集合混淆。
- `.eligible:nth-child(2)` 与 `:nth-child(2 of .eligible)` 混淆。
- 使用位置表达业务身份。
- DOM 插入后结构匹配漂移。

### KP005

- `:is()` 参数中的 ID 产生意外高 specificity。
- 把 `:where()` 当成 `:is()`。
- `:has()` 关系方向写反。
- 为所有父子需求滥用 `:has()`。
- 把 functional pseudo 当成无成本语法糖。

### KP006

- Hover 作为唯一交互反馈。
- 无替代地移除 Focus Outline。
- 用 CSS 模拟 disabled，却不提供 HTML 语义。
- 用 Generated Content 承载关键业务信息。
- 只用颜色表达 invalid。

### 待完成

- Native Nesting 与 Sass 字符串拼接心智模型混用。
- `&` 的 selector context 误判。
- `:scope` 与 `@scope` 混淆。
- 多故障 Selector Refactoring Project。

---

## 9. Production Selector Contract

### 默认优先顺序

```text
语义 HTML
↓
稳定 Component Class
↓
语义 Attribute / State Attribute
↓
短而可解释的 Combinator
↓
Structural Pseudo-class
↓
Functional / Relational Pseudo-class
↓
深层 DOM-coupled Selector
```

### 治理规则

1. 不默认使用 ID Selector 构建组件样式。
2. 不依赖四层以上 DOM 路径表达组件身份。
3. Structural Selector 只表达结构，不表达业务身份。
4. `:has()` 只在需求确实是关系时使用。
5. `:where()` 用于低权重基线时必须写清覆盖意图。
6. `:is()` 参数中混入 ID 前必须评估 Specificity Debt。
7. Hover 不得成为唯一状态。
8. Focus Indicator 不得无替代移除。
9. Generated Content 不承担必要业务语义。
10. 复杂 Selector 必须有 `querySelectorAll()` / `matches()` 测试样本。

---

## 10. Module Project

项目：

```text
Selector Matching & Refactoring Lab
```

Broken Baseline 包含：

- Invalid Selector List。
- Attribute Substring Over-match。
- Deep Descendant Selector。
- `:nth-child()` 误判。
- `:is()` Specificity Trap。
- `:has()` Direction Error。
- Hover-only Interaction。
- Focus Indicator Missing。
- Generated-content-only Label。
- Native Nesting / `:scope` 误用。

学习者必须提交：

1. 每条 Selector 的语法拆解。
2. 预测 Match Set。
3. `querySelectorAll()` / `matches()` Evidence。
4. DevTools Matched / Unmatched Evidence。
5. Root Cause 分类。
6. 最小 Selector Refactor。
7. A11Y 回归。
8. Selector Contract。
9. 重构前后 Match Set 对比。

---

## 11. Module Definition of Done

完成 04.02 后必须能够：

- 从语法结构拆解常见 Selector。
- 根据 DOM 准确预测 Match Set。
- 使用 Attribute Selector 表达状态而不过度匹配。
- 正确选择 Combinator。
- 区分 Child Index、Type Index 与 Filtered Index。
- 正确使用 `:is()`、`:where()`、`:not()`、`:has()`。
- 解释 UI / Form / Focus State。
- 区分 Pseudo-class 与 Pseudo-element。
- 使用 Native CSS Nesting 与 `:scope`。
- 建立 Selector Evidence。
- 识别 DOM Coupling、Specificity Debt 和 A11Y 风险。
- 完成 Module Project 的重构和回归。

---

## 12. 下一批：收尾 04.02

```text
KP007
Native CSS Nesting、&、:scope 与 Selector Context

KP008
Module Project：Selector Matching & Refactoring Lab
```

下一批不是机械凑够三课，而是用两课完整收束 Module：

```text
Nesting / :scope
→ 多故障综合重构
→ Scope / Depth / Evidence Review
→ Module 04.02 COMPLETE
```

完成后进入：

```text
Module 04.03
Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow
```

---

## 13. 标准基线

- W3C Selectors Level 4。
- W3C CSS Pseudo-Elements Level 4。
- HTML 表单与焦点语义。
- Web Platform Tests 可观察行为。

规范仍处于演进中的部分，课程必须：

```text
说明状态
→ 用 CSS.supports / Browser Evidence 验证
→ 提供可接受降级
→ 不把实验能力误写成无条件生产基线
```
