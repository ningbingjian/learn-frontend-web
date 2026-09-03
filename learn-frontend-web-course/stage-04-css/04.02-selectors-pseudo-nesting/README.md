# Module 04.02：Selector、关系匹配、Pseudo、Nesting 与 `:scope`

> Stage：[Stage 04 CSS 完整体系](../README.md)  
> 状态：🚧 建设中  
> 当前完成：KP001～KP003 / 8 课  
> 前置 Module：[04.01 CSS 语言、样式表与级联体系](../04.01-css-language-and-stylesheets/)

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个问题：

> 浏览器面对一条 Selector 时，怎样根据 DOM 的元素类型、属性、状态和关系，确定“哪些元素被匹配”，以及复杂选择器怎样保持可解释、可维护和可治理？

学习链：

```text
Selector Source
→ Parse Selector
→ Selector List
→ Simple Selector
→ Compound Selector
→ Complex Selector
→ Element / Attribute Match
→ Tree Relationship Match
→ Pseudo-class State / Structure Match
→ Relational Match
→ Pseudo-element Target
→ Nesting / :scope Context
→ Match Result
→ 交给 Cascade 决定最终声明
```

这里必须明确一个边界：

```text
Selector 决定“谁参与竞争”
Cascade 决定“竞争后谁获胜”
```

04.01 已经完整拥有 Cascade、Specificity、Layer、`@scope` 和 Value Pipeline。
04.02 不重复建立“级联高级篇”，只在 Selector 需要时引用 04.01 的规则。

### 1.2 为什么现在学习

如果不会准确读取 Selector，后面所有 CSS 都可能退化为：

```text
类名越写越长
DOM 层级越绑越死
!important 越来越多
改 HTML 后样式莫名失效
状态样式误伤其他组件
```

本 Module 的目标不是背 Selector API，而是建立“DOM 关系 → Selector → Match Evidence”的推导能力。

### 1.3 本 Module 完整拥有

- Selector grammar 与 selector list。
- Type / Universal / Class / ID selector。
- Compound Selector 与匹配交集。
- Attribute selector 的 presence / exact / token / prefix / suffix / substring / hyphen / ASCII case-insensitive match。
- Descendant / Child / Next-sibling / Subsequent-sibling combinator。
- Structural pseudo-classes。
- `:is()` / `:where()` / `:not()` / `:has()`。
- UI state、link、focus、form pseudo-classes。
- Pseudo-elements 与 generated content 的边界。
- Native CSS Nesting 与 `&`。
- `:scope` selector 与 scoped DOM query 心智模型。
- Selector invalidation、forgiving selector list 与 Failure Lab。
- Selector 与 DOM coupling、Specificity Debt、可维护性边界。
- DevTools / `matches()` / `querySelectorAll()` 的 selector evidence。

### 1.4 不属于本 Module

- Cascade 顺序、Layer、`@scope` at-rule、Scoping Proximity：04.01。
- Box Model / Sizing：04.03。
- CSS Modules / CSS-in-JS / Utility CSS 架构选型：04.13。
- 浏览器 selector engine 内部实现与 style invalidation 深入：Stage 09 / Stage 24。
- 完整 A11Y 工程：Stage 14；本 Module 只处理 selector 造成的 focus / state 可访问性边界。

---

## 2. Must / Should / Expert

### Must

- 能识别 Type、Class、ID、Universal 与 Attribute selector。
- 能区分 simple / compound / complex selector。
- 能正确使用 descendant、child、adjacent sibling、subsequent sibling combinator。
- 能使用常见 structural / state pseudo-class。
- 能通过 DevTools 判断 selector 是否匹配目标元素。
- 能用 `element.matches()` 和 `querySelectorAll()` 验证选择器。

### Should

- 能解释 invalid selector list 为什么可能让整条规则失效。
- 能使用 `:is()` / `:where()` / `:not()` 控制重复和 specificity。
- 能使用 `:has()` 处理真实的关系选择，同时识别滥用风险。
- 能区分 pseudo-class 与 pseudo-element。
- 能使用 Native Nesting，同时避免把 Sass 的 `&__element` 心智模型直接搬到原生 CSS。
- 能降低 DOM coupling 与 selector fragility。

### Expert

- 能解释 relative selector 与 anchor element。
- 能解释 `:scope` 在 DOM scoped query 中的语义。
- 能解释 selector list、forgiving selector list 和 relative selector list 的不同解析边界。
- 能为大型系统制定 selector contract、selector budget 和 DOM coupling 规则。
- 能判断一个问题应该通过 Selector、HTML 语义、状态类名还是组件边界解决。

---

## 3. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP001 | [Selector Grammar、Type、Class、ID、Universal 与 Compound Selector](./kp001-selector-grammar-basic-selectors/) | Must | BUILD + FAILURE-LAB | ✅ |
| KP002 | [Attribute Selector：Presence、Value、Token、Substring 与 Case Matching](./kp002-attribute-selectors/) | Must / Should | BUILD + FAILURE-LAB | ✅ |
| KP003 | [Combinator：Descendant、Child、Adjacent 与 Subsequent Sibling](./kp003-combinators-relationships/) | Must / Should | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP004 | Structural Pseudo-class：`:first-child`、`:nth-child()`、`:nth-of-type()` 与 `of S` | Must / Should | BROWSER-MECHANISM | ⏳ |
| KP005 | Functional / Relational Pseudo：`:is()`、`:where()`、`:not()`、`:has()` | Should / Expert | FAILURE + BROWSER-MECHANISM | ⏳ |
| KP006 | UI State、Form、Focus Pseudo-class 与 Pseudo-element | Must / Should | A11Y + FAILURE-LAB | ⏳ |
| KP007 | Native CSS Nesting、`&`、`:scope` 与 Selector Context | Should / Expert | BUILD + ARCHITECTURE-LAB | ⏳ |
| KP008 | Module Project：Selector Matching & Refactoring Lab | 全层级 | PROJECT + FAILURE-LAB | ⏳ |

当前完成度：

```text
3 / 8
= 37.5%
```

---

## 4. 前三课因果链

```text
KP001
“一个 Selector 自己由什么组成？”
↓
KP002
“除了 class/id，怎样根据元素属性精确匹配？”
↓
KP003
“怎样根据 DOM 树中的父子、祖先和兄弟关系匹配？”
```

完成前三课后，学习者必须不再把：

```css
.dashboard .panel .header .title
```

理解成“CSS 的固定写法”，而是能够逐段回答：

```text
每一段匹配什么？
中间是什么关系？
DOM 改动后哪一段会失效？
是否真的需要这么深的关系绑定？
```

---

## 5. 起始状态策略

KP001～KP003 均从独立最小项目开始。

原因：

- KP001 只观察 selector grammar。
- KP002 只观察 attribute matching。
- KP003 只观察 tree relationship。

三课不共享运行时目录，避免实验变量互相污染。

后续 Lesson 如果复制上一课，README 必须提供明确 Step 0。

---

## 6. 统一运行方式

每个已完成 Lesson：

```bash
npm run check
npm run dev
```

默认：

```text
http://localhost:4173
```

每课至少保留：

```text
README.md
index.html
styles.css
package.json
server.mjs
verify.mjs
```

---

## 7. Evidence Contract

Selector 的结论必须优先通过以下证据验证：

```text
Elements DOM Tree
→ DevTools Styles matched rules
→ Console document.querySelectorAll(...)
→ element.matches(...)
→ CSSOM（必要时）
```

常用 Console 验证：

```js
document.querySelectorAll(".card.featured")
document.querySelectorAll('[data-state="active"]')
document.querySelectorAll(".toolbar > .icon")
document.querySelector(".target").matches(".card.target")
```

### 不允许只凭“页面看起来对”

因为：

```text
没有匹配
被其他规则补上
匹配了但被 Cascade 覆盖
继承得到相同视觉
浏览器默认样式碰巧一致
```

都可能让页面“看起来正常”。

---

## 8. Failure Lab 分布

### 已完成

- KP001：普通 selector list 中一个 invalid selector 让整条 ruleset 无效。
- KP001：把“compound selector”误写成 descendant selector，匹配集合发生变化。
- KP002：substring attribute selector 过度匹配。
- KP002：属性值大小写假设错误。
- KP003：descendant selector 误伤深层后代。
- KP003：`+` 与 `~` 的兄弟关系语义混淆。

### 后续

- Structural pseudo-class 索引误判。
- `:is()` / `:where()` specificity 误判。
- `:has()` 关系方向写反。
- `:hover` 作为唯一交互状态。
- `:focus` 被粗暴移除。
- Pseudo-element 当真实 DOM 节点处理。
- Native Nesting 与 Sass nesting 心智模型混用。
- `:scope` 与 `@scope` 混淆。
- 深层 selector 对 DOM 结构过度耦合。

---

## 9. Module Project

项目：

```text
Selector Matching & Refactoring Lab
```

提供一个故意 selector 失控的 UI：

- 深层 descendant selector。
- Attribute substring over-match。
- invalid selector list。
- `:nth-child()` 误判。
- `:has()` 方向错误。
- focus state 缺失。
- Nesting 结构耦合。
- 过度 specificity。

学习者必须：

1. 写出每条 selector 的结构。
2. 预测匹配集合。
3. 用 `querySelectorAll()` / `matches()` 验证。
4. 用 DevTools 记录 matched / unmatched evidence。
5. 把 selector 重构为最小稳定表达。
6. 证明重构前后功能一致。
7. 输出 Selector Contract。

---

## 10. Production Boundary

大型项目中的 selector 默认优先级：

```text
语义化 HTML
↓
稳定 component class / state attribute
↓
短而可解释的 relation selector
↓
structural selector（需要时）
↓
relational selector（问题确实是关系时）
↓
深层 DOM-coupled selector（最后手段）
```

不是 selector 越高级越好。

### 推荐治理规则

- 不为了“看起来专业”使用 `:has()`。
- 不默认使用 ID selector 做组件样式。
- 不依赖 4～5 层 DOM 路径表达组件身份。
- Attribute selector 优先表达真实 attribute/state，不把任意字符串当数据库查询。
- Selector 必须能由 DOM 结构和状态直接解释。
- 复杂 selector 要有 Failure Lab 或测试证明边界。

---

## 11. Module Definition of Done

完成 04.02 后，学习者必须能够：

- 从语法结构拆解任意常见 CSS selector。
- 根据 DOM 准确预测匹配集合。
- 使用 Attribute Selector 处理真实状态而不产生误匹配。
- 根据 DOM relation 正确选择 combinator。
- 正确使用 structural / state / functional / relational pseudo-class。
- 解释 pseudo-class 与 pseudo-element 的差异。
- 使用 Native Nesting 与 `:scope`。
- 使用 DevTools / `matches()` / `querySelectorAll()` 建立 selector evidence。
- 识别 DOM coupling 和 selector fragility。
- 完成 Module Project 的重构、回归与规则设计。

---

## 12. 当前下一批

```text
KP004  Structural Pseudo-class
KP005  :is() / :where() / :not() / :has()
KP006  UI State / Form / Focus / Pseudo-element
```

完成后进入最后两课，收束 Nesting / `:scope` 与 Module Project。
