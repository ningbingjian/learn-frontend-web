# Stage 04：CSS 完整体系

> 版本：v1.0-draft  
> 基线日期：2026-09-02  
> 上级总纲：[`../README.md`](../README.md)  
> 教学规范：[`../FRONTEND_TEACHING_GUIDE.md`](../FRONTEND_TEACHING_GUIDE.md)

---

## 1. 阶段定位

Stage 04 是课程中唯一完整的 CSS 主教学 Stage。

本阶段不是 CSS 属性速查表，而是从第一次理解“为什么页面需要 CSS”，一路学习到布局系统、响应式、现代 CSS、动画、主题、样式架构、Debug、性能与生产治理。

完整能力链：

```text
第一次接触 CSS
↓
能够把 CSS 正确接入 HTML
↓
理解 Selector / Cascade / Specificity / Inheritance
↓
理解 Value / Unit / Custom Property
↓
建立 Box / Flow / Formatting Context 心智模型
↓
掌握 Position / Stacking / Overflow
↓
掌握 Flexbox / Grid
↓
掌握响应式与 Container Query
↓
掌握字体、文本、颜色、背景、图像与视觉表达
↓
掌握 Transform / Transition / Animation
↓
掌握现代 CSS 与渐进增强
↓
掌握 Token / Theme / CSS Architecture
↓
能使用 DevTools 定位复杂 CSS 故障并分析性能
↓
能够负责大型产品 CSS 体系的长期演进
```

### Stage 04 与其他 Stage 的边界

- Stage 03 负责 HTML 语义、表单、媒体、A11Y 基础；Stage 04 只负责视觉与布局。
- Stage 09 负责浏览器 CSS Parse、CSSOM、Style、Layout、Paint、Raster、Composite 的完整渲染管线；Stage 04 只讲理解 CSS 行为所需的前置机制与可观察证据。
- Stage 14 负责 Design System、复杂组件、UI Platform、A11Y Engineering；Stage 04 负责 CSS 层面的 Token、Theme 与 Style Architecture。
- Stage 16 负责 Bundler / PostCSS / Compiler / Package / Monorepo 等工程链；Stage 04 只讲 CSS 作者需要理解的接口边界。

---

## 2. 文件与课程结构

```text
stage04-css/
├── README.md
├── module04-01-css-foundation/
├── module04-02-selector/
├── module04-03-cascade-inheritance/
├── module04-04-value-unit-custom-property/
├── module04-05-box-flow-formatting-context/
├── module04-06-sizing-overflow/
├── module04-07-position-stacking-context/
├── module04-08-flexbox/
├── module04-09-grid/
├── module04-10-responsive-container-query/
├── module04-11-typography-text/
├── module04-12-visual-styling/
├── module04-13-transform-transition-animation/
├── module04-14-modern-css-progressive-enhancement/
├── module04-15-token-theme-architecture/
├── module04-16-debug-performance-compatibility/
└── module04-17-final-project/
```

每个 Module 仍采用统一三级结构：

```text
Stage → Module → Lesson
```

正式编写 Lesson 时，每课必须遵守 `FRONTEND_TEACHING_GUIDE.md`：从零或明确复制上一课、精确到文件与位置、最终源码独立运行、包含验证与故障观察。

---

## 3. Module 总纲

| Module | 主题 | 目标 |
| --- | --- | --- |
| 04.01 | CSS Foundation | 建立 CSS 最小完整心智模型与调试入口 |
| 04.02 | Selector | 一次学透元素匹配、伪类、伪元素与复杂选择器 |
| 04.03 | Cascade & Inheritance | 解释“为什么最终是这个样式” |
| 04.04 | Value / Unit / Custom Property | 建立声明值计算、单位、函数与变量体系 |
| 04.05 | Box / Flow / Formatting Context | 理解页面为什么按当前方式排布 |
| 04.06 | Sizing & Overflow | 掌握尺寸、内在尺寸、替换元素与溢出 |
| 04.07 | Position & Stacking Context | 掌握定位、包含块、层叠上下文与滚动容器 |
| 04.08 | Flexbox | 一维布局完整体系与典型故障 |
| 04.09 | Grid | 二维布局完整体系与复杂 Dashboard |
| 04.10 | Responsive & Container Query | 从 viewport 响应式走向组件响应式 |
| 04.11 | Typography & Text | 字体加载、文本排版与国际化布局基础 |
| 04.12 | Visual Styling | 颜色、背景、边框、阴影、图像与视觉效果 |
| 04.13 | Transform / Transition / Animation | 动画体系、可访问性与渲染成本 |
| 04.14 | Modern CSS | 现代能力、特性检测与渐进增强 |
| 04.15 | Token / Theme / Architecture | 从单页面 CSS 演进到大型样式系统 |
| 04.16 | Debug / Performance / Compatibility | 建立生产级 CSS 故障诊断方法 |
| 04.17 | Final Project | 独立完成生产级响应式产品 / Dashboard |

---

## 4. Stage 04 阶段验收

完成 Stage 04 后，学习者必须能够：

1. 从空 HTML 项目正确建立外部 CSS 并使用 DevTools 验证加载与计算结果；
2. 准确解释复杂 Selector 是否匹配、Specificity 如何计算以及 Cascade 最终为何胜出；
3. 解释 declared / cascaded / specified / computed / used value 的关系；
4. 解释 Box Model、Normal Flow、BFC/IFC、Containing Block、Intrinsic Sizing；
5. 复现并修复 margin collapse、100% 溢出、min-width:auto、height:100%、sticky 失效、z-index 失效等经典问题；
6. 独立设计 Flexbox 和 Grid 布局，并明确何时选择哪一种；
7. 使用 Media Query、Container Query、Fluid Sizing、Logical Properties 构建响应式组件；
8. 正确处理字体加载、文本溢出、Dark Mode、High Contrast、Reduced Motion；
9. 使用 Custom Property、Cascade Layer、Token 与 Theme 建立可维护样式体系；
10. 评估 BEM / ITCSS / Utility / CSS Modules / CSS-in-JS 等方案的适用边界；
11. 使用 Elements / Styles / Computed / Layout / Rendering / Performance 等 DevTools 证据定位 CSS 故障；
12. 完成一个不依赖 CSS 框架的生产级响应式产品页面 / Dashboard，并提交多视口、A11Y、性能和兼容性证据。
