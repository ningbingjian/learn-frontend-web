# Stage 04：CSS、布局、响应式、现代 CSS、动画、Token 与样式架构

> 课程状态：建设中  
> 当前进度：✅ Module 04.01 已完成（KP001～KP009 / 9）  
> 下一 Module：04.02 Selector、关系匹配、Pseudo、Nesting 与 Scope  
> 课程总纲：[../README.md](../README.md)  
> 教学规范：[../FRONTEND_TEACHING_GUIDE.md](../FRONTEND_TEACHING_GUIDE.md)

---

## 1. 阶段定位

Stage 04 是整套前端架构师课程中 **CSS 的唯一完整 Owner Stage**。

目标不是只会调 margin、改颜色、抄 Flex 示例，而是形成：

```text
CSS 语言模型
+
Cascade 心智模型
+
布局算法
+
响应式
+
视觉与动画
+
Token / Theme
+
Debug / Performance / A11Y
+
样式架构与治理
```

最终学习者必须能够解释一个页面为什么得到当前样式和布局结果，而不是反复试值。

---

## 2. 前置知识

建议已经完成：

- Stage 00：开发环境、Terminal、Node.js、Git、DevTools。
- Stage 02：HTTP、资源请求、MIME、Network。
- Stage 03：HTML、语义、表单、媒体和基础 A11Y。

---

## 3. Stage 04 唯一教学边界

### Stage 04 完整拥有

- CSS Syntax / Stylesheet / CSSOM 基础。
- Cascade / Origin / Importance / Layer / Specificity / Inheritance / Scope。
- Selector / Pseudo / Nesting。
- Box Model / Sizing / Overflow。
- Normal Flow / Formatting Context / Positioning / Stacking。
- Flexbox / Grid / Subgrid。
- Responsive Design / Media Query / Container Query。
- Unit / Function / Logical Property。
- Typography / Web Font。
- Color / Background / Gradient / Filter / Mask / Blend。
- Transform / Transition / Animation。
- Scroll-driven Animation / View Transition 的 CSS 侧。
- Custom Property / Design Token / Theme。
- CSS Architecture。
- CSS Debug / Compatibility / Performance / A11Y / Governance。

### 后续 Stage 只组合应用

- Stage 09：Browser Style / Layout / Paint / Composite。
- Stage 14：Design System 与复杂 UI Engineering。
- Stage 16：Sass / PostCSS / Bundler / Compiler Toolchain。
- Stage 17：Visual Regression 与质量工程。
- Stage 24：生产级性能治理。

后续不得建立 CSS 基础篇 / 高级篇 / 原理篇 / 架构篇平行路线。

---

## 4. 总体学习路线

Stage 04 共规划：

```text
14 个 Owner Module
120 个 Lesson（含 Module Project）
1 个 Stage 综合项目
```

### 第一部分：语言、级联与尺寸基础

| Module | 计划课数 | 状态 | 核心问题 |
| --- | ---: | --- | --- |
| [04.01 CSS 语言、样式表与级联体系](./04.01-css-language-and-stylesheets/) | 9 | ✅ 9/9 | 一条 CSS 怎样进入浏览器并得到最终值？ |
| 04.02 Selector、关系匹配、Pseudo、Nesting 与 Scope | 8 | ⏳ | 浏览器怎样判断一条规则匹配哪些元素？ |
| 04.03 Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow | 9 | ⏳ | 一个盒子的最终尺寸为什么是当前结果？ |

### 第二部分：布局算法与响应式

| Module | 计划课数 | 状态 | 核心问题 |
| --- | ---: | --- | --- |
| 04.04 Normal Flow、Formatting Context、Positioning 与 Stacking | 9 | ⏳ | 元素为什么出现在当前位置与层级？ |
| 04.05 Flexbox 完整布局算法 | 9 | ⏳ | 一维空间如何增长、收缩、换行和对齐？ |
| 04.06 Grid、Track Sizing、Auto Placement 与 Subgrid | 9 | ⏳ | 二维轨道如何计算和自动放置？ |
| 04.07 Responsive Design、Media Query 与 Container Query | 8 | ⏳ | 页面与组件如何由环境和内容驱动适配？ |
| 04.08 Unit、Function、Viewport、Logical Property 与 Writing Mode | 7 | ⏳ | CSS 值相对于什么计算？ |

### 第三部分：视觉、排版与运动

| Module | 计划课数 | 状态 | 核心问题 |
| --- | ---: | --- | --- |
| 04.09 Typography、Web Font 与国际化文本布局 | 8 | ⏳ | 字体和行盒怎样影响阅读、布局和性能？ |
| 04.10 Color、Background、Gradient、Filter、Mask 与 Blend | 8 | ⏳ | 如何建立可访问、可降级的现代视觉系统？ |
| 04.11 Transform、Transition、Animation、Scroll-driven 与 View Transition | 9 | ⏳ | 运动如何正确、流畅、可中断？ |

### 第四部分：Token、架构与生产治理

| Module | 计划课数 | 状态 | 核心问题 |
| --- | ---: | --- | --- |
| 04.12 Custom Property、Design Token、Theme 与 Multi-brand | 8 | ⏳ | 如何建立可运行时切换的视觉变量体系？ |
| 04.13 CSS Architecture 与方案选型 | 9 | ⏳ | BEM、Modules、Utility、CSS-in-JS 怎样取舍？ |
| 04.14 CSS Debug、Compatibility、Performance、A11Y 与 Governance | 10 | ⏳ | 样式系统如何进入生产治理？ |

合计 120 课。

---

## 5. Module 04.01 已完成

1. [KP001：CSS 是什么](./04.01-css-language-and-stylesheets/kp001-what-is-css/)
2. [KP002：CSS 怎样进入页面](./04.01-css-language-and-stylesheets/kp002-attach-stylesheet/)
3. [KP003：Rule、Declaration、Property 与 Value](./04.01-css-language-and-stylesheets/kp003-rules-declarations-properties-values/)
4. [KP004：Shorthand、Longhand、注释、At-rule 与语法边界](./04.01-css-language-and-stylesheets/kp004-shorthand-longhand-at-rules/)
5. [KP005：Origin、Importance、Context 与 Source Order](./04.01-css-language-and-stylesheets/kp005-origin-importance-context-source-order/)
6. [KP006：Specificity、Inheritance 与 CSS-wide Keyword](./04.01-css-language-and-stylesheets/kp006-specificity-inheritance-css-wide-keywords/)
7. [KP007：Cascade Layer、`@scope`、Scoping Proximity 与 `revert-layer`](./04.01-css-language-and-stylesheets/kp007-cascade-layer-scope-revert-layer/)
8. [KP008：CSS 错误恢复、CSSOM 与 Value Processing](./04.01-css-language-and-stylesheets/kp008-css-error-recovery-cssom-value-pipeline/)
9. [KP009：First Stylesheet Diagnostic Lab](./04.01-css-language-and-stylesheets/kp009-first-stylesheet-diagnostic-lab/)

Module 复审：[MODULE_REVIEW.md](./04.01-css-language-and-stylesheets/MODULE_REVIEW.md)

状态：

```text
9 / 9
100%
COMPLETE
```

---

## 6. Module 04.01 能力链

```text
CSS 是什么
→ Stylesheet 接入
→ CSS 语言单位
→ Shorthand / Longhand / At-rule
→ Origin / Importance / Context
→ Specificity / Inheritance
→ Layer / @scope / revert-layer
→ Parser / CSSOM / Value Pipeline
→ 多故障综合诊断
```

“CSS 不生效”第一版排障链：

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

---

## 7. 当前实践体系

所有已完成 Lesson 都提供：

```text
README 手把手复刻
+
独立源码
+
npm run check
+
npm run dev
+
DevTools / Network / CSSOM Evidence
+
Failure Lab
+
Challenge
+
Mastery Check
```

Module 04.01 项目额外提供 Broken Baseline、9 Fault Cases、Diagnostic Report、Reference Solution 和 Module Final Review。

---

## 8. Stage Evidence Standard

CSS 课程优先使用：

```text
DOM Tree
Styles
Computed
Box Model
Layout Overlay
Network
CSSOM
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

项目：`Responsive UI System`，同时作为 `Architect Workbench UI Foundation v1`。

范围：响应式营销页、内容页、企业 Dashboard、设置表单、UI Component Gallery。

强制要求：语义 HTML、Cascade Layer、Flex / Grid / Subgrid、Media / Container Query、Light / Dark / High Contrast / RTL / Print、Reduced Motion、兼容边界、CSS Architecture ADR、故障注入和生产审计。

---

## 10. Stage Definition of Done

最终必须做到：

- 不靠试值解释主要布局结果。
- 系统分析 Cascade / Box / Sizing / Flow。
- 独立完成 Flex / Grid / Responsive。
- 建立 Typography / Color / Motion / Theme。
- 使用 DevTools 进行 CSS 诊断。
- 有 Compatibility / A11Y / Performance 意识。
- 比较样式架构方案。
- 完成 Responsive UI System 与架构答辩。

---

## 11. 当前目录

```text
stage-04-css/
├── README.md
└── 04.01-css-language-and-stylesheets/
    ├── README.md
    ├── MODULE_REVIEW.md
    ├── kp001-what-is-css/
    ├── kp002-attach-stylesheet/
    ├── kp003-rules-declarations-properties-values/
    ├── kp004-shorthand-longhand-at-rules/
    ├── kp005-origin-importance-context-source-order/
    ├── kp006-specificity-inheritance-css-wide-keywords/
    ├── kp007-cascade-layer-scope-revert-layer/
    ├── kp008-css-error-recovery-cssom-value-pipeline/
    └── kp009-first-stylesheet-diagnostic-lab/
```

---

## 12. 下一步

下一批开始 Module 04.02：

```text
Selector
→ Combinator
→ Attribute Selector
→ Pseudo-class
→ :is() / :where() / :not()
→ :has()
→ Pseudo-element
→ Native CSS Nesting
→ Selector Architecture
```

开始前先写 Module Teaching Contract，再按每批 3 课推进。

Module 04.01 已正式关闭，不再创建同名补课。
