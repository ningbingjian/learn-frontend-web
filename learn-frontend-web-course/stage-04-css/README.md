# Stage 04：CSS、布局、响应式、现代 CSS、动画、Token 与样式架构

> 课程状态：建设中  
> 当前进度：✅ Module 04.01 已完成；🚧 Module 04.02 已完成 KP001～KP003 / 8  
> 当前 Module：[04.02 Selector、关系匹配、Pseudo、Nesting 与 `:scope`](./04.02-selectors-pseudo-nesting/)  
> 课程总纲：[../README.md](../README.md)  
> 教学规范：[../FRONTEND_TEACHING_GUIDE.md](../FRONTEND_TEACHING_GUIDE.md)

---

## 1. 阶段定位

Stage 04 是整套前端架构师课程中 **CSS 的唯一完整 Owner Stage**。

目标是形成 CSS 语言模型、Cascade 心智模型、Selector Matching、布局算法、响应式、视觉与动画、Token/Theme、Debug/Performance/A11Y 与样式架构治理的完整能力。

---

## 2. Stage 04 唯一教学边界

Stage 04 完整拥有 CSS Syntax / Stylesheet / CSSOM、Cascade、Selector / Attribute / Combinator / Pseudo / Nesting、Box Model、Flow、Flexbox、Grid、Responsive、Value、Typography、Color、Animation、Token、Architecture 与 CSS 生产治理。

后续 Stage 只组合应用；不得建立 CSS 基础篇 / 高级篇 / 原理篇 / 架构篇平行路线。

---

## 3. 总体学习路线

Stage 04 共规划 14 个 Owner Module、120 个 Lesson（含 Module Project）和 1 个 Stage 综合项目。

### 第一部分：语言、级联与尺寸基础

| Module | 计划课数 | 状态 | 核心问题 |
| --- | ---: | --- | --- |
| [04.01 CSS 语言、样式表与级联体系](./04.01-css-language-and-stylesheets/) | 9 | ✅ 9/9 | 一条 CSS 怎样进入浏览器并得到最终值？ |
| [04.02 Selector、关系匹配、Pseudo、Nesting 与 `:scope`](./04.02-selectors-pseudo-nesting/) | 8 | 🚧 3/8 | 浏览器怎样判断一条规则匹配哪些元素？ |
| 04.03 Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow | 9 | ⏳ | 一个盒子的最终尺寸为什么是当前结果？ |

### 第二部分：布局算法与响应式

| Module | 计划课数 | 状态 |
| --- | ---: | --- |
| 04.04 Normal Flow、Formatting Context、Positioning 与 Stacking | 9 | ⏳ |
| 04.05 Flexbox 完整布局算法 | 9 | ⏳ |
| 04.06 Grid、Track Sizing、Auto Placement 与 Subgrid | 9 | ⏳ |
| 04.07 Responsive Design、Media Query 与 Container Query | 8 | ⏳ |
| 04.08 Unit、Function、Viewport、Logical Property 与 Writing Mode | 7 | ⏳ |

### 第三部分：视觉、排版与运动

| Module | 计划课数 | 状态 |
| --- | ---: | --- |
| 04.09 Typography、Web Font 与国际化文本布局 | 8 | ⏳ |
| 04.10 Color、Background、Gradient、Filter、Mask 与 Blend | 8 | ⏳ |
| 04.11 Transform、Transition、Animation、Scroll-driven 与 View Transition | 9 | ⏳ |

### 第四部分：Token、架构与生产治理

| Module | 计划课数 | 状态 |
| --- | ---: | --- |
| 04.12 Custom Property、Design Token、Theme 与 Multi-brand | 8 | ⏳ |
| 04.13 CSS Architecture 与方案选型 | 9 | ⏳ |
| 04.14 CSS Debug、Compatibility、Performance、A11Y 与 Governance | 10 | ⏳ |

---

## 4. Module 04.01：✅ 已完成

入口：[04.01 CSS 语言、样式表与级联体系](./04.01-css-language-and-stylesheets/)

状态：

```text
9 / 9
100%
COMPLETE
```

Module 04.01 已正式关闭，不再创建同名补课。

---

## 5. Module 04.02：🚧 Selector 完整体系建设中

入口：[Module 04.02 Teaching Contract](./04.02-selectors-pseudo-nesting/)

当前完成：

1. [KP001：Selector Grammar、Type、Class、ID、Universal 与 Compound Selector](./04.02-selectors-pseudo-nesting/kp001-selector-grammar-basic-selectors/)
2. [KP002：Attribute Selector——Presence、Value、Token、Substring 与 Case Matching](./04.02-selectors-pseudo-nesting/kp002-attribute-selectors/)
3. [KP003：Combinator——Descendant、Child、Adjacent 与 Subsequent Sibling](./04.02-selectors-pseudo-nesting/kp003-combinators-relationships/)

当前能力链：

```text
Selector Grammar
→ Basic / Compound Selector
→ Attribute Matching
→ DOM Relationship / Combinator
```

进度：

```text
3 / 8
= 37.5%
```

下一批：

```text
KP004  Structural Pseudo-class
KP005  :is() / :where() / :not() / :has()
KP006  UI State / Form / Focus / Pseudo-element
```

最后两课：

```text
KP007  Native CSS Nesting / & / :scope
KP008  Selector Matching & Refactoring Lab
```

### 与 04.01 的边界

04.02 决定 match set；04.01 对已经匹配的声明完成 Cascade / winner selection。

`@scope` at-rule 与 Scoping Proximity 已由 04.01 完整拥有；04.02 后续只学习 selector 语境中的 `:scope` pseudo-class 和 Nesting context，不重复教学 `@scope`。

---

## 6. 已建立的 CSS 诊断链

```text
DOM
→ Network
→ Parser / CSSOM
→ Selector Match
→ Declaration Validity
→ Origin / Importance / Context
→ Layer
→ Specificity
→ Scoping Proximity
→ Source Order
→ Inheritance / Initial
→ Computed-value Time
→ Used Value / Layout
```

04.02 正在把 Selector Match 继续拆成 Selector Parse → Basic Match → Attribute Match → Tree Relation → Structural State → Functional/Relational Pseudo → UI State → Pseudo-element → Nesting/`:scope` Context。

---

## 7. 当前实践体系

所有已完成 Lesson 都提供 README 手把手复刻、独立源码、`npm run check`、`npm run dev`、DevTools Evidence、Failure Lab、Challenge、Mastery Check。

Selector Module 额外使用：

```text
querySelectorAll()
matches()
```

验证真实 match set。

---

## 8. Stage Evidence Standard

CSS 课程优先使用 DOM Tree、Styles、Computed、Box Model、Layout Overlay、Network、CSSOM、`querySelectorAll()`、`matches()`、Rendering/Performance 与自动验证脚本。

---

## 9. Stage 综合项目

项目：`Responsive UI System`，同时作为 `Architect Workbench UI Foundation v1`。

要求覆盖语义 HTML、Cascade Layer、Flex/Grid/Subgrid、Media/Container Query、Light/Dark/High Contrast/RTL/Print、Reduced Motion、Compatibility Boundary、CSS Architecture ADR、Failure Injection 与 Production Audit。

---

## 10. Stage Definition of Done

最终必须能系统分析 Cascade / Selector / Box / Sizing / Flow，独立完成 Flex / Grid / Responsive，建立 Typography / Color / Motion / Theme，使用 DevTools 诊断，并完成 Responsive UI System 与架构答辩。

---

## 11. 当前目录

```text
stage-04-css/
├── README.md
├── 04.01-css-language-and-stylesheets/
│   ├── README.md
│   ├── MODULE_REVIEW.md
│   └── kp001 ... kp009/
└── 04.02-selectors-pseudo-nesting/
    ├── README.md
    ├── kp001-selector-grammar-basic-selectors/
    ├── kp002-attribute-selectors/
    └── kp003-combinators-relationships/
```

---

## 12. 下一步

继续完成 Module 04.02 第二批 KP004～KP006；完成后进入 Nesting / `:scope` 与 Module Project 收尾。
