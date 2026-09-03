# Stage 04：CSS、布局、响应式、现代 CSS、动画、Token 与样式架构

> 课程状态：建设中  
> Boundary Fix：✅ 已完成  
> 已完成 Module：04.01、04.02  
> 已完成 Lesson：17 / 120  
> 下一 Module：04.03 Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow  
> 强制边界：[STAGE_BOUNDARY.md](./STAGE_BOUNDARY.md)  
> 修复报告：[BOUNDARY_FIX_REPORT.md](./BOUNDARY_FIX_REPORT.md)

---

## 1. 阶段定位

Stage 04 是 CSS 的唯一完整 Owner Stage。

本阶段从 CSS 语言和 Selector 开始，持续覆盖尺寸、布局、响应式、视觉、动画、Token、Architecture、Debug、A11Y 与 Governance。

但 CSS 的 Owner 并不等于所有观察 CSS 的技术都应提前进入本阶段。

学习者可见主线固定为：

```text
Stage 03 已学过的语义 HTML
+ CSS
+ 浏览器原生状态
+ DevTools Elements / Styles / Computed / Network
+ 手动修改 HTML / CSS
+ 静态页面对照
```

---

## 2. Owner Boundary

### Stage 04 直接教学

- CSS Syntax、Stylesheet 与错误恢复。
- Selector、Cascade、Inheritance 与 Value Processing。
- Box Model、Sizing、Flow、Positioning、Flexbox、Grid、Responsive。
- Typography、Color、Visual Effect 与 Motion。
- Custom Property、Token、Theme、Architecture、Compatibility、A11Y、Performance 与 Governance。

### 后续 Stage 拥有

| 能力 | Owner |
| --- | --- |
| JavaScript 语言 | Stage 05 |
| JavaScript Runtime | Stage 06 |
| DOM、Event、Form、History API | Stage 07 |
| Browser / CSSOM / Web Platform 编程接口 | Stage 09 |
| Shadow DOM / Web Components | Stage 13 |
| 完整测试工程 | Stage 17 |
| CI/CD 与交付 | Stage 26 |

### 黑盒维护设施

```text
npm run dev
npm run check
server.mjs
verify.mjs
GitHub Actions
```

这些可以为课程运行和回归服务，但不是 Stage 04 学习内容。

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
| [04.01 CSS 语言、样式表与级联体系](./04.01-css-language-and-stylesheets/) | 9 | ✅ Boundary Fix PASS | CSS 怎样进入浏览器并得到最终值？ |
| [04.02 Selector、关系匹配、Pseudo 与 Native Nesting](./04.02-selectors-pseudo-nesting/) | 8 | ✅ Boundary Fix PASS | 浏览器怎样确定 Match Set？ |
| 04.03 Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow | 9 | ⏳ | 一个盒子的最终尺寸为什么是当前结果？ |

### 第二部分：布局算法与响应式

| Module | 课数 | 状态 |
| --- | ---: | --- |
| 04.04 Normal Flow、Formatting Context、Positioning 与 Stacking | 9 | ⏳ |
| 04.05 Flexbox 完整布局算法 | 9 | ⏳ |
| 04.06 Grid、Track Sizing、Auto Placement 与 Subgrid | 9 | ⏳ |
| 04.07 Responsive Design、Media Query 与 Container Query | 8 | ⏳ |
| 04.08 Unit、Function、Viewport、Logical Property 与 Writing Mode | 7 | ⏳ |

### 第三部分：视觉、排版与运动

| Module | 课数 | 状态 |
| --- | ---: | --- |
| 04.09 Typography、Web Font 与国际化文本布局 | 8 | ⏳ |
| 04.10 Color、Background、Gradient、Filter、Mask 与 Blend | 8 | ⏳ |
| 04.11 Transform、Transition、Animation、Scroll-driven 与 View Transition | 9 | ⏳ |

### 第四部分：Token、架构与生产治理

| Module | 课数 | 状态 |
| --- | ---: | --- |
| 04.12 Custom Property、Design Token、Theme 与 Multi-brand | 8 | ⏳ |
| 04.13 CSS Architecture 与方案选型 | 9 | ⏳ |
| 04.14 CSS Debug、Compatibility、Performance、A11Y 与 Governance | 10 | ⏳ |

---

## 4. 当前完成进度

```text
Module 04.01  9 / 9  COMPLETE + Boundary PASS
Module 04.02  8 / 8  COMPLETE + Boundary PASS
Stage Lesson  17 / 120
```

两条基础能力链已经建立：

```text
CSS 声明是否正确进入浏览器并得到最终值？
+
Selector 是否匹配正确目标？
```

在这些问题确定后，下一步才进入盒模型和尺寸计算。

---

## 5. Boundary Fix 完成内容

### 04.01

- 删除 CSSOM JavaScript API 教学步骤。
- 删除 Declarative Shadow DOM / `:host` 必做实验。
- 删除 KP008 学习者可见 `app.js`。
- Value Pipeline 改用 Styles / Computed 静态证据。

### 04.02

- Selector 基础课不再调用 DOM Query API。
- Structural Lab 改成静态状态 A / B。
- `:has()` Lab 改成静态健康 / 异常面板与 CSS `@supports`。
- Focus / Form Lab 改用浏览器原生状态。
- `:scope` DOM Query 后置 Stage 07。
- Module Project 改成静态 Broken / Solution。
- 删除全部 `app.js`。

### 自动门禁

`boundary-check.mjs` 会检查：

- Stage 04 下是否重新出现 `app.js`。
- HTML 是否引入 `<script>` 或 Shadow DOM。
- CSS 是否出现 `:host`。
- Lesson README 是否重新要求调用后续 Stage API。
- Lesson 是否仍具备 HTML / CSS 核心文件。

---

## 6. Evidence Standard

Stage 04 默认使用：

```text
Elements DOM Tree
Styles Matched Rules
Computed Style
Box Model
Layout 面板
Network
浏览器原生 Hover / Focus / Form 状态
静态 Broken / Fixed 页面
手动修改 HTML / CSS 后刷新
```

禁止因为“输出更直观”而把课程改造成 JavaScript、DOM 或 CSSOM API 教程。

---

## 7. Lesson Contract

每个 Stage 04 Lesson 必须满足：

1. 学习者核心文件只要求理解 HTML / CSS。
2. 关键现象可用 DevTools 或原生状态证明。
3. 动态变化优先使用静态前后状态或手动编辑。
4. `server.mjs` / `verify.mjs` 明确为黑盒工具。
5. 后续技术只能作为未来边界说明。
6. 删除所有辅助编程后，CSS 主问题仍完整闭环。
7. Boundary Gate 通过后才能标记完成。

---

## 8. Stage 综合项目

项目：

```text
Responsive UI System
Architect Workbench UI Foundation v1
```

最终覆盖：营销页、内容页、Dashboard、设置表单、Component Gallery、主题、RTL、打印、A11Y、兼容、性能与 CSS Architecture。

Stage Project 同样遵守 Boundary：在 Stage 04 版本中只使用语义 HTML 与 CSS；需要应用逻辑的交互会在后续 Stage 演进。

---

## 9. 下一步

Boundary Fix 已完成并建立自动门禁。

下一批才开始：

```text
Module 04.03
KP001  Box Tree、Content / Padding / Border / Margin
KP002  content-box、border-box 与尺寸计算公式
KP003  width / height / auto / percentage 与 Containing Block
```

04.03 的所有实验继续遵守 HTML + CSS + DevTools 边界。
