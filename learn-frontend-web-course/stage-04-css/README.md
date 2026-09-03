# Stage 04：CSS、布局、响应式、现代 CSS、动画、Token 与样式架构

> 课程状态：建设中  
> 当前进度：✅ Module 04.01 与 04.02 已完成  
> 已完成 Lesson：17  
> 下一 Module：04.03 Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow  
> 课程总纲：[../README.md](../README.md)  
> 教学规范：[../FRONTEND_TEACHING_GUIDE.md](../FRONTEND_TEACHING_GUIDE.md)

---

## 1. 阶段定位

Stage 04 是整套前端架构师课程中 **CSS 的唯一完整 Owner Stage**。

目标不是只会修改颜色、间距和 `display`，而是建立确定性的 CSS 工程能力：

```text
CSS Source
→ Parser / CSSOM
→ Selector Match
→ Cascade / Value Pipeline
→ Box / Sizing
→ Layout Algorithm
→ Paint / Motion
→ Responsive / Theme
→ Debug / A11Y / Performance
→ Architecture / Governance
```

最终必须能够：

```text
预测结果
→ 运行页面
→ 收集浏览器证据
→ 解释机制
→ 注入故障
→ 定位根因
→ 最小修复
→ 设计长期约束
```

---

## 2. Stage 04 Owner Boundary

### Stage 04 完整拥有

- CSS Syntax、Stylesheet、CSSOM 基础。
- Parser Error Recovery。
- Cascade、Origin、Importance、Context、Layer、Specificity、Inheritance、Scope。
- Property Value Processing。
- Selector、Attribute、Combinator、Structural / Functional / State Pseudo。
- Pseudo-element。
- Native CSS Nesting 与 `&`。
- `:scope`。
- Box Model、Sizing、Intrinsic Size、Replaced Element、Overflow。
- Normal Flow、Formatting Context、Positioning、Stacking。
- Flexbox、Grid、Subgrid。
- Responsive Design、Media Query、Container Query。
- Unit、Function、Logical Property、Writing Mode。
- Typography、Web Font。
- Color、Background、Gradient、Filter、Mask、Blend。
- Transform、Transition、Animation。
- Scroll-driven Animation、View Transition 的 CSS 侧。
- Custom Property、Design Token、Theme、Multi-brand。
- CSS Architecture。
- CSS Debug、Compatibility、Performance、A11Y、Governance。

### 后续 Stage 只组合或深入实现

- Stage 09：Browser Style / Layout / Paint / Composite 内核。
- Stage 14：Design System 与复杂 UI Engineering。
- Stage 16：Sass / PostCSS / Bundler / Compiler Toolchain。
- Stage 17：Visual Regression 与质量工程。
- Stage 24：生产级性能与 Style Invalidation 治理。

不得再建立平行的 CSS 基础篇、高级篇、原理篇、性能篇或架构篇补课。

---

## 3. 总体路线

```text
14 个 Owner Module
120 个 Lesson（含 Module Project）
1 个 Stage 综合项目
```

### 第一部分：语言、级联与尺寸基础

| Module | 课数 | 状态 | 核心问题 |
| --- | ---: | --- | --- |
| [04.01 CSS 语言、样式表与级联体系](./04.01-css-language-and-stylesheets/) | 9 | ✅ 9/9 | CSS 怎样进入浏览器并得到最终值？ |
| [04.02 Selector、关系匹配、Pseudo、Nesting 与 `:scope`](./04.02-selectors-pseudo-nesting/) | 8 | ✅ 8/8 | 浏览器怎样决定一条 Rule 匹配哪些目标？ |
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

合计：120 课。

---

## 4. 当前进度

```text
Module 04.01  9 / 9  COMPLETE
Module 04.02  8 / 8  COMPLETE
Stage Lesson  17 / 120
```

已建立两条基础能力链：

```text
CSS 是否进入浏览器并得到正确值？
+
Selector 是否匹配正确目标？
```

下一步才进入：

```text
当声明已经确定后，盒子最终尺寸如何计算？
```

---

## 5. Module 04.01：CSS 语言与级联体系

入口：

- [Module README](./04.01-css-language-and-stylesheets/)
- [Module Review](./04.01-css-language-and-stylesheets/MODULE_REVIEW.md)

Lesson：

1. [KP001：CSS 是什么](./04.01-css-language-and-stylesheets/kp001-what-is-css/)
2. [KP002：CSS 怎样进入页面](./04.01-css-language-and-stylesheets/kp002-attach-stylesheet/)
3. [KP003：Rule、Declaration、Property 与 Value](./04.01-css-language-and-stylesheets/kp003-rules-declarations-properties-values/)
4. [KP004：Shorthand、Longhand、注释、At-rule](./04.01-css-language-and-stylesheets/kp004-shorthand-longhand-at-rules/)
5. [KP005：Origin、Importance、Context 与 Source Order](./04.01-css-language-and-stylesheets/kp005-origin-importance-context-source-order/)
6. [KP006：Specificity、Inheritance 与 CSS-wide Keyword](./04.01-css-language-and-stylesheets/kp006-specificity-inheritance-css-wide-keywords/)
7. [KP007：Cascade Layer、`@scope`、Scoping Proximity、`revert-layer`](./04.01-css-language-and-stylesheets/kp007-cascade-layer-scope-revert-layer/)
8. [KP008：CSS Error Recovery、CSSOM 与 Value Pipeline](./04.01-css-language-and-stylesheets/kp008-css-error-recovery-cssom-value-pipeline/)
9. [KP009：First Stylesheet Diagnostic Lab](./04.01-css-language-and-stylesheets/kp009-first-stylesheet-diagnostic-lab/)

能力链：

```text
Stylesheet Loading
→ Parser
→ CSSOM
→ Declaration Validity
→ Origin / Importance / Context
→ Layer
→ Specificity
→ Scope
→ Source Order
→ Inheritance / Initial
→ Computed / Used / Actual Value
```

---

## 6. Module 04.02：Selector 完整体系

入口：

- [Module README](./04.02-selectors-pseudo-nesting/)
- [Module Review](./04.02-selectors-pseudo-nesting/MODULE_REVIEW.md)

Lesson：

1. [KP001：Selector Grammar 与 Basic Selector](./04.02-selectors-pseudo-nesting/kp001-selector-grammar-basic-selectors/)
2. [KP002：Attribute Selector](./04.02-selectors-pseudo-nesting/kp002-attribute-selectors/)
3. [KP003：Combinator 与 DOM Relationship](./04.02-selectors-pseudo-nesting/kp003-combinators-relationships/)
4. [KP004：Structural Pseudo-class 与 `of S`](./04.02-selectors-pseudo-nesting/kp004-structural-pseudo-classes/)
5. [KP005：`:is()`、`:where()`、`:not()`、`:has()`](./04.02-selectors-pseudo-nesting/kp005-functional-relational-pseudo-classes/)
6. [KP006：UI / Form / Focus Pseudo-class 与 Pseudo-element](./04.02-selectors-pseudo-nesting/kp006-ui-form-focus-pseudo-elements/)
7. [KP007：Native CSS Nesting、`&` 与 `:scope`](./04.02-selectors-pseudo-nesting/kp007-native-css-nesting-scope/)
8. [KP008：Selector Matching & Refactoring Lab](./04.02-selectors-pseudo-nesting/kp008-selector-matching-refactoring-lab/)

能力链：

```text
Selector Parse
→ Basic / Compound / Complex
→ Attribute Match
→ Tree Relationship
→ Structural Index
→ Functional / Relational Condition
→ UI / Form / Focus State
→ Pseudo-element
→ Native Nesting / &
→ :scope Query Root
→ Match Set
```

Module Project 覆盖 11 类故障和生产 Selector Contract。

---

## 7. 已建立的完整 CSS 诊断链

```text
DOM Element 是否存在？
↓
Stylesheet 是否加载？
↓
Selector / Rule 是否解析？
↓
Selector Match Set 是否正确？
↓
Declaration 是否有效？
↓
Origin / Importance / Context
↓
Cascade Layer
↓
Specificity
↓
Scoping Proximity
↓
Source Order
↓
Inheritance / Initial
↓
Computed-value Time
↓
Used Value / Layout
```

Module 04.03 将从最后一项继续展开：

```text
Used Value / Layout
→ Box Geometry
→ Sizing Constraint
→ Intrinsic Contribution
→ Replaced Element
→ Overflow
```

---

## 8. Evidence Standard

CSS 课程优先使用：

```text
Elements DOM Tree
Network
Styles
Computed
CSSOM
querySelectorAll()
matches()
CSS.supports()
getComputedStyle(..., "::pseudo")
Box Model Panel
Layout Overlay
Rendering / Performance
Keyboard / Pointer Operation
Visual Comparison
Automated Check
```

统一实验链：

```text
建立基线
→ 写预测
→ 只改一个变量
→ 运行
→ 收集证据
→ 解释
→ 注入故障
→ 最小修复
→ 回归
```

---

## 9. 独立运行与 CI

所有已完成 Lesson：

```bash
npm run check
npm run dev
```

默认地址：

```text
http://127.0.0.1:4173
```

当前 Stage 04 GitHub Actions Matrix 覆盖：

```text
Module 04.01  9 Lesson
Module 04.02  8 Lesson
Total         17 Lesson
```

每个 Matrix Job 在对应 Lesson 目录独立执行 `npm run check`。

---

## 10. Stage 综合项目

项目：

```text
Responsive UI System
```

同时作为：

```text
Architect Workbench UI Foundation v1
```

页面范围：

- 响应式 Marketing Page。
- Content / Documentation Page。
- Enterprise Dashboard。
- Account / Settings Form。
- UI Component Gallery。

强制要求：

- Semantic HTML。
- Cascade Layer。
- Flex / Grid / Subgrid。
- Media / Container Query。
- Light / Dark / High Contrast。
- RTL。
- Print。
- Reduced Motion。
- Compatibility Boundary。
- A11Y Regression。
- CSS Architecture ADR。
- Failure Injection。
- Production Audit。

---

## 11. Stage Failure Map

已覆盖：

```text
Stylesheet 404
MIME / Loading
Invalid Declaration
Shorthand Reset
Origin / Importance
Specificity Debt
Inheritance Confusion
Layer Order
@scope Proximity
CSSOM / Value Pipeline
Invalid Selector List
Attribute Over-match
DOM Coupling
Structural Drift
:is() Specificity Trap
:has() Direction
Hover-only
Focus Removal
Generated-content-only Label
Native Nesting Migration
:scope Query Boundary
```

后续将继续加入：

```text
Content-box / Border-box Miscalculation
Percentage Containing Block Confusion
Min-size Constraint
Intrinsic Size Overflow
Replaced Element Distortion
Margin Collapse
BFC
Sticky Failure
Stacking Context
Flex Min-width
Grid Track Overflow
Container Query Root
Font Loading Shift
Motion Preference
Token Invalidity
CSS Performance Regression
```

---

## 12. Stage Definition of Done

最终学习者必须能够：

- 不靠试值解释主要样式与布局结果。
- 区分 Parser、Match、Cascade、Value、Layout 问题。
- 独立完成 Flex / Grid / Responsive UI。
- 建立 Typography / Color / Motion / Theme System。
- 使用 DevTools 和程序化证据诊断 CSS。
- 处理 Compatibility、A11Y、Performance。
- 比较和治理 CSS Architecture。
- 完成 Responsive UI System。
- 提交 Architecture ADR、Failure Report 与 Production Audit。
- 完成正式答辩。

---

## 13. 当前目录

```text
stage-04-css/
├── README.md
├── 04.01-css-language-and-stylesheets/
│   ├── README.md
│   ├── MODULE_REVIEW.md
│   └── kp001 ... kp009/
└── 04.02-selectors-pseudo-nesting/
    ├── README.md
    ├── MODULE_REVIEW.md
    ├── kp001-selector-grammar-basic-selectors/
    ├── kp002-attribute-selectors/
    ├── kp003-combinators-relationships/
    ├── kp004-structural-pseudo-classes/
    ├── kp005-functional-relational-pseudo-classes/
    ├── kp006-ui-form-focus-pseudo-elements/
    ├── kp007-native-css-nesting-scope/
    └── kp008-selector-matching-refactoring-lab/
```

---

## 14. 下一步

创建 Module 04.03 Teaching Contract，并完成第一批三课。建议顺序：

```text
KP001  Box Tree、Content / Padding / Border / Margin
KP002  content-box、border-box 与尺寸公式
KP003  width / height / auto / percentage 与 Containing Block
```

后续继续进入：

```text
min / max constraints
intrinsic sizing
aspect-ratio
replaced elements
overflow / scroll container
Module Project
```

Module 04.01 与 04.02 已正式关闭，不再建立同名补课。
