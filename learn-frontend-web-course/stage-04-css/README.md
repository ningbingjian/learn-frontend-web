# Stage 04：CSS、布局、响应式、现代 CSS、动画、Token 与样式架构

> 课程状态：建设中  
> 当前进度：✅ Module 04.01 已完成；🚧 Module 04.02 已完成 KP001～KP006 / 8  
> 当前 Module：[04.02 Selector、关系匹配、Pseudo、Nesting 与 `:scope`](./04.02-selectors-pseudo-nesting/)  
> 课程总纲：[../README.md](../README.md)  
> 教学规范：[../FRONTEND_TEACHING_GUIDE.md](../FRONTEND_TEACHING_GUIDE.md)

---

## 1. 阶段定位

Stage 04 是 CSS 的唯一完整 Owner Stage。

目标能力链：

```text
CSS Language / Stylesheet / CSSOM
→ Cascade / Value Pipeline
→ Selector Matching
→ Box Model / Sizing
→ Flow / Position / Stacking
→ Flexbox / Grid
→ Responsive / Container Query
→ Typography / Color / Visual Effect
→ Motion
→ Token / Theme
→ Architecture / Debug / A11Y / Performance / Governance
```

这里不把“能调出效果”当成掌握。学习者最终必须能够：

```text
预测
→ 运行
→ 收集浏览器证据
→ 解释机制
→ 制造故障
→ 定位根因
→ 完成最小修复
→ 设计长期约束
```

---

## 2. Stage 04 唯一教学边界

### Stage 04 完整拥有

- CSS Syntax、Stylesheet、CSSOM 基础。
- Cascade、Origin、Importance、Layer、Specificity、Inheritance、Scope。
- Selector、Attribute、Combinator、Structural / Functional / State Pseudo。
- Pseudo-element 与 Native Nesting。
- Box Model、Sizing、Intrinsic Size、Overflow。
- Normal Flow、Formatting Context、Positioning、Stacking。
- Flexbox、Grid、Subgrid。
- Responsive Design、Media Query、Container Query。
- Unit、Function、Logical Property。
- Typography、Web Font。
- Color、Background、Gradient、Filter、Mask、Blend。
- Transform、Transition、Animation。
- Scroll-driven Animation、View Transition 的 CSS 侧。
- Custom Property、Design Token、Theme。
- CSS Architecture。
- CSS Debug、Compatibility、Performance、A11Y、Governance。

### 后续 Stage 只组合应用

- Stage 09：Browser Style / Layout / Paint / Composite 内核。
- Stage 14：Design System 与复杂 UI Engineering。
- Stage 16：Sass / PostCSS / Bundler / Compiler。
- Stage 17：Visual Regression 与质量工程。
- Stage 24：生产性能治理。

后续不得建立平行的 CSS 基础篇、高级篇、原理篇或架构篇补课。

---

## 3. 总体学习路线

```text
14 个 Owner Module
120 个 Lesson（含 Module Project）
1 个 Stage 综合项目
```

### 第一部分：语言、级联与尺寸基础

| Module | 课数 | 状态 | 核心问题 |
| --- | ---: | --- | --- |
| [04.01 CSS 语言、样式表与级联体系](./04.01-css-language-and-stylesheets/) | 9 | ✅ 9/9 | CSS 怎样进入浏览器并得到最终值？ |
| [04.02 Selector、关系匹配、Pseudo、Nesting 与 `:scope`](./04.02-selectors-pseudo-nesting/) | 8 | 🚧 6/8 | 浏览器怎样决定一条规则匹配哪些目标？ |
| 04.03 Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow | 9 | ⏳ | 一个盒子的最终尺寸为什么是当前结果？ |

### 第二部分：布局算法与响应式

| Module | 课数 | 状态 | 核心问题 |
| --- | ---: | --- | --- |
| 04.04 Normal Flow、Formatting Context、Positioning 与 Stacking | 9 | ⏳ | 元素为什么出现在当前位置与层级？ |
| 04.05 Flexbox 完整布局算法 | 9 | ⏳ | 一维空间怎样增长、收缩、换行与对齐？ |
| 04.06 Grid、Track Sizing、Auto Placement 与 Subgrid | 9 | ⏳ | 二维轨道怎样计算与自动放置？ |
| 04.07 Responsive Design、Media Query 与 Container Query | 8 | ⏳ | 页面与组件怎样由环境和内容驱动适配？ |
| 04.08 Unit、Function、Viewport、Logical Property 与 Writing Mode | 7 | ⏳ | CSS 值相对于什么计算？ |

### 第三部分：视觉、排版与运动

| Module | 课数 | 状态 | 核心问题 |
| --- | ---: | --- | --- |
| 04.09 Typography、Web Font 与国际化文本布局 | 8 | ⏳ | 字体和行盒怎样影响阅读、布局与性能？ |
| 04.10 Color、Background、Gradient、Filter、Mask 与 Blend | 8 | ⏳ | 怎样建立可访问、可降级的现代视觉系统？ |
| 04.11 Transform、Transition、Animation、Scroll-driven 与 View Transition | 9 | ⏳ | 运动怎样正确、流畅、可中断？ |

### 第四部分：Token、架构与生产治理

| Module | 课数 | 状态 | 核心问题 |
| --- | ---: | --- | --- |
| 04.12 Custom Property、Design Token、Theme 与 Multi-brand | 8 | ⏳ | 怎样建立运行时可切换的视觉变量体系？ |
| 04.13 CSS Architecture 与方案选型 | 9 | ⏳ | BEM、Modules、Utility、CSS-in-JS 怎样取舍？ |
| 04.14 CSS Debug、Compatibility、Performance、A11Y 与 Governance | 10 | ⏳ | 样式系统怎样进入生产治理？ |

---

## 4. Module 04.01：✅ COMPLETE

入口：

- [Module 04.01](./04.01-css-language-and-stylesheets/)
- [Module Review](./04.01-css-language-and-stylesheets/MODULE_REVIEW.md)

完成：

```text
KP001～KP009
9 / 9
100%
```

能力链：

```text
CSS Responsibility
→ Stylesheet Loading
→ Rule / Declaration / Value
→ Shorthand / At-rule
→ Origin / Importance / Context
→ Specificity / Inheritance
→ Layer / @scope / revert-layer
→ Parser / CSSOM / Value Pipeline
→ Nine-fault Diagnostic Project
```

Module 04.01 已关闭，不再创建同名补课。

---

## 5. Module 04.02：🚧 6/8

入口：

- [Module 04.02 Teaching Contract](./04.02-selectors-pseudo-nesting/)

### 已完成

1. [KP001：Selector Grammar、Basic / Compound Selector](./04.02-selectors-pseudo-nesting/kp001-selector-grammar-basic-selectors/)
2. [KP002：Attribute Selector](./04.02-selectors-pseudo-nesting/kp002-attribute-selectors/)
3. [KP003：Combinator 与 DOM Relationship](./04.02-selectors-pseudo-nesting/kp003-combinators-relationships/)
4. [KP004：Structural Pseudo-class、`nth-child()` 与 `of S`](./04.02-selectors-pseudo-nesting/kp004-structural-pseudo-classes/)
5. [KP005：`:is()`、`:where()`、`:not()`、`:has()`](./04.02-selectors-pseudo-nesting/kp005-functional-relational-pseudo-classes/)
6. [KP006：UI / Form / Focus Pseudo-class 与 Pseudo-element](./04.02-selectors-pseudo-nesting/kp006-ui-form-focus-pseudo-elements/)

当前能力链：

```text
Selector Grammar
→ Attribute Match
→ Tree Relationship
→ Structural Index
→ Functional / Relational Match
→ UI / Form / Focus State
→ Pseudo-element Target
```

当前进度：

```text
6 / 8
= 75%
```

### 最后两课

```text
KP007
Native CSS Nesting、&、:scope 与 Selector Context

KP008
Selector Matching & Refactoring Module Project
```

完成 KP008 后执行 Module Scope / Depth / Evidence / Reproducibility Review，再进入 04.03。

---

## 6. 当前 Selector 诊断树

```text
Selector Source
→ Parse Success?
→ Ordinary / Forgiving Selector List?
→ Candidate / Subject
→ Simple / Compound / Complex Structure
→ Attribute Match
→ Combinator Relationship
→ Sibling Index / of S Filter
→ Functional Pseudo Arguments
→ :has() Anchor / Direction
→ UI / Form / Focus State
→ Pseudo-element Generation
→ Match Set
→ Cascade（04.01）
```

常用证据：

```js
document.querySelectorAll("...")
element.matches("...")
CSS.supports("selector(:has(*))")
getComputedStyle(element, "::before")
```

---

## 7. 实践体系

所有已完成 Lesson 提供：

```text
README 手把手复刻
+
独立完整源码
+
npm run check
+
npm run dev
+
DevTools / Console Evidence
+
Failure Lab
+
Challenge
+
Mastery Check
```

Stage 04 新增 CI 后，会对全部已完成 CSS Lesson 执行独立 `npm run check`。

---

## 8. Stage Evidence Standard

CSS 课程优先证据：

```text
DOM Tree
Styles
Computed
Box Model
Layout Overlay
Network
CSSOM
querySelectorAll()
matches()
CSS.supports()
getComputedStyle(..., "::pseudo")
Rendering / Performance
视觉对照
自动验证脚本
```

统一实验链：

```text
建立基线
→ 预测
→ 改一个变量
→ 运行
→ 收集证据
→ 解释
→ 制造故障
→ 修复
→ 回归
```

---

## 9. Stage 综合项目

项目：

```text
Responsive UI System
Architect Workbench UI Foundation v1
```

范围：

- 响应式营销页。
- 内容与文档阅读页。
- 企业 Dashboard。
- 账户与设置表单。
- UI Component Gallery。

强制要求：

- Semantic HTML。
- Cascade Layer。
- Stable Selector Contract。
- Flex / Grid / Subgrid。
- Media / Container Query。
- Light / Dark / High Contrast / RTL / Print。
- Reduced Motion。
- Compatibility Boundary。
- CSS Architecture ADR。
- Failure Injection。
- Production Audit。

---

## 10. Stage Definition of Done

最终必须：

- 解释样式和布局结果，而不是反复试值。
- 系统分析 Cascade / Selector / Box / Sizing / Flow。
- 独立完成 Flex / Grid / Responsive。
- 建立 Typography / Color / Motion / Theme。
- 使用 DevTools 和程序化证据诊断 CSS。
- 处理 Compatibility / A11Y / Performance。
- 比较样式架构方案。
- 完成 Responsive UI System 与架构答辩。

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
    ├── kp003-combinators-relationships/
    ├── kp004-structural-pseudo-classes/
    ├── kp005-functional-relational-pseudo-classes/
    └── kp006-ui-form-focus-pseudo-elements/
```

---

## 12. 下一步

完成 Module 04.02 最后两课：

```text
KP007  Native CSS Nesting / & / :scope
KP008  Selector Matching & Refactoring Lab
```

然后进入：

```text
Module 04.03
Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow
```
