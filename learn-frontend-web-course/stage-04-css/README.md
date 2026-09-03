# Stage 04：CSS、布局、响应式、现代 CSS、动画、Token 与样式架构

> 课程状态：建设中  
> 当前批次：04.01 的 KP001～KP003 已完成  
> 课程总纲：[../README.md](../README.md)  
> 教学规范：[../FRONTEND_TEACHING_GUIDE.md](../FRONTEND_TEACHING_GUIDE.md)

---

## 1. 阶段定位

Stage 04 是整套前端架构师课程中 **CSS 的唯一完整 Owner Stage**。

这里不会只教“怎样把按钮变成蓝色”，而是从零建立下面这条能力链：

```text
看懂一条 CSS 声明
→ 能让样式稳定进入页面
→ 能解释级联与最终值
→ 能推导盒模型和布局结果
→ 能独立完成 Flex / Grid / 响应式页面
→ 能处理字体、颜色、动画与主题
→ 能 Debug 样式污染、溢出、层叠和兼容问题
→ 能选择并治理大型前端样式架构
```

本阶段结束后，学习者应该能够解释一个布局为什么得到当前结果，而不是依靠反复修改数字“碰运气”。

---

## 2. 前置知识

开始本阶段前，应当已经完成：

- Stage 00：能够使用终端、Node.js、npm、Git 和浏览器 DevTools。
- Stage 02：理解浏览器如何请求 HTML 与 CSS 资源。
- Stage 03：能够编写语义正确的 HTML，并理解 DOM、表单和基础 A11Y。

本阶段会继续使用 Stage 03 的语义 HTML，但不会重复讲 HTML 元素体系。

---

## 3. 本阶段的唯一教学边界

### Stage 04 完整拥有

- CSS 语法、样式表接入、解析和错误恢复。
- Cascade、Origin、Specificity、Inheritance、Layer 与最终值。
- Selector、Pseudo-class、Pseudo-element、Nesting 与作用域。
- Box Model、Sizing、Intrinsic Size、Overflow 与替换元素。
- Normal Flow、Formatting Context、Positioning、Stacking Context。
- Flexbox、Grid、Subgrid 与布局算法。
- 响应式、媒体查询、容器查询、现代单位和逻辑属性。
- Typography、Web Font、Color、Background、Mask、Filter 与 Blend。
- Transform、Transition、Animation、Scroll-driven 与 View Transition。
- Custom Property、Design Token、Theme 与样式架构。
- CSS Debug、兼容、性能、A11Y 和治理。

### 后续 Stage 只做组合应用

- Stage 09 深入浏览器 Style、Layout、Paint、Composite 与内核机制。
- Stage 14 在本阶段能力之上建设复杂组件与 Design System。
- Stage 16 深入 Sass、PostCSS、Bundler 与 CSS 构建工具链。
- Stage 17 建设 Visual Regression 与完整质量工程。
- Stage 24 建设生产级 RUM、性能预算与规模治理。

后续阶段不得再建立平行的“CSS 高级篇”“CSS 原理篇”或“CSS 架构篇”补课。

---

## 4. 学习路线

本阶段共规划 **14 个 Module、120 个 Lesson（含各 Module Project）和 1 个 Stage 综合项目**。

### 第一部分：语言、级联与尺寸基础

| Module | 计划课数 | 核心问题 |
| --- | ---: | --- |
| 04.01 CSS 语言、样式表、Cascade、Origin、Specificity、Inheritance 与 Layer | 9 | CSS 怎样进入页面；冲突声明怎样得出最终结果？ |
| 04.02 Selector、关系匹配、Pseudo、Nesting 与 Scope | 8 | 浏览器怎样确定一条规则匹配哪些元素？ |
| 04.03 Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow | 9 | 一个盒子的最终尺寸为什么是当前结果？ |

### 第二部分：布局算法与响应式

| Module | 计划课数 | 核心问题 |
| --- | ---: | --- |
| 04.04 Normal Flow、Formatting Context、Positioning 与 Stacking | 9 | 元素为什么出现在当前位置和层级？ |
| 04.05 Flexbox 完整布局算法 | 9 | 一维空间如何增长、收缩、换行和对齐？ |
| 04.06 Grid、Track Sizing、Auto Placement 与 Subgrid | 9 | 二维轨道如何计算和自动放置？ |
| 04.07 Responsive Design、Media Query 与 Container Query | 8 | 页面与组件如何由内容和环境驱动适配？ |
| 04.08 Unit、Function、Viewport、Logical Property 与 Writing Mode | 7 | CSS 值相对于什么计算，如何形成流式系统？ |

### 第三部分：视觉、排版与运动

| Module | 计划课数 | 核心问题 |
| --- | ---: | --- |
| 04.09 Typography、Web Font 与国际化文本布局 | 8 | 字体、行盒、换行和加载如何影响阅读与性能？ |
| 04.10 Color、Background、Gradient、Filter、Mask 与 Blend | 8 | 如何建立可降级、可访问的现代视觉系统？ |
| 04.11 Transform、Transition、Animation、Scroll-driven 与 View Transition | 9 | 运动如何正确、流畅、可中断且尊重用户偏好？ |

### 第四部分：Token、架构与生产治理

| Module | 计划课数 | 核心问题 |
| --- | ---: | --- |
| 04.12 Custom Property、Design Token、Theme 与 Multi-brand | 8 | 如何建立可运行时切换、可演进的视觉变量系统？ |
| 04.13 CSS Architecture 与方案选型 | 9 | BEM、CSS Modules、Utility、CSS-in-JS 等方案怎样取舍？ |
| 04.14 CSS Debug、Compatibility、Performance、A11Y 与 Governance | 10 | 样式系统出故障后如何定位、修复、预防和治理？ |

合计：

```text
9 + 8 + 9 + 9 + 9 + 9 + 8 + 7 + 8 + 8 + 9 + 8 + 9 + 10 = 120
```

---

## 5. 当前建设进度

| Module | 状态 | 已完成 |
| --- | --- | --- |
| [04.01 CSS 语言与级联体系](./04.01-css-language-and-stylesheets/) | 🚧 建设中 | KP001～KP003 |
| 04.02～04.14 | ⏳ 待建设 | 0 |
| Stage Project：Responsive UI System | ⏳ 待建设 | 0 |

当前 04.01 已完成：

1. [KP001：CSS 是什么](./04.01-css-language-and-stylesheets/kp001-what-is-css/)
2. [KP002：CSS 怎样进入页面](./04.01-css-language-and-stylesheets/kp002-attach-stylesheet/)
3. [KP003：Rule、Declaration、Property 与 Value](./04.01-css-language-and-stylesheets/kp003-rules-declarations-properties-values/)

---

## 6. 统一实践方式

每一课都必须至少留下以下证据中的一种或多种：

```text
DOM Tree
Styles Panel
Computed Style
Box Model
Layout Overlay
Network Request
CSSOM
Rendering / Performance Trace
视觉对照
自动检查脚本
```

每个关键机制采用：

```text
建立正常基线
→ 预测结果
→ 只改变一个变量
→ 运行并观察
→ 用 DevTools 收集证据
→ 解释机制
→ 制造错误
→ 修复并回归
```

所有 Lesson 最终源码独立存在，进入任意 Lesson 后都可以直接：

```bash
npm run check
npm run dev
```

然后访问课程 README 指定的地址完成实验。

---

## 7. Stage 综合项目

项目名称：

```text
Responsive UI System
```

同时作为贯穿项目：

```text
Architect Workbench UI Foundation v1
```

### 页面范围

1. 响应式营销首页。
2. 内容与文档阅读页。
3. 企业后台 Dashboard。
4. 账户与系统设置表单。
5. UI Component Gallery。

### 强制约束

- 主实现不依赖 Bootstrap、Ant Design、Tailwind 等 UI/CSS 框架。
- 使用语义 HTML，并继承 Stage 03 的 A11Y 基线。
- 使用 Cascade Layer 管理 reset、base、token、layout、component、utility、override。
- 同时使用 Flex、Grid、Subgrid、Media Query 和 Container Query。
- 支持 Light、Dark、High Contrast、RTL 和 Print。
- 动画必须支持 `prefers-reduced-motion`。
- 新特性必须有 `@supports`、自然降级或明确兼容边界。
- 提交 CSS Architecture ADR、兼容矩阵和生产审计报告。

### 必须注入的故障

```text
!important 战争
Specificity 失控
Flex min-size 导致溢出
Grid 轨道撑破容器
Sticky 因祖先 overflow 失效
z-index 很大但仍然被遮挡
字体加载造成布局跳动
Container Query 查询错容器
Custom Property 在 computed-value 阶段失效
Reduced Motion 未生效
RTL 下物理方向属性错误
```

---

## 8. Stage Definition of Done

完成 Stage 04 时，学习者必须能够：

- 不依靠试值，解释主要布局和尺寸结果。
- 从 Cascade、Selector、Formatting Context、Sizing 和 Stacking 定位问题。
- 独立实现复杂 Flex/Grid/响应式界面。
- 建立字体、颜色、运动、Token 和主题体系。
- 使用 DevTools 定位样式覆盖、溢出、定位、层叠和性能问题。
- 比较 CSS 架构方案，并给出约束、Trade-off、迁移和退出策略。
- 完成 Stage Project 的功能、兼容、A11Y、性能、故障和架构答辩。

---

## 9. 目录约定

```text
stage-04-css/
├── README.md
├── 04.01-css-language-and-stylesheets/
│   ├── README.md
│   ├── kp001-what-is-css/
│   ├── kp002-attach-stylesheet/
│   └── kp003-rules-declarations-properties-values/
├── 04.02-selectors-nesting-and-scope/
├── ...
└── project-responsive-ui-system/
```

每个 Lesson 目录中的 README 是从零复刻教程；同目录源码是最终结果、自动检查和排障对照。
