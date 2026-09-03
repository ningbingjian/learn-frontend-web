# Stage 04 CSS Owner Boundary

> 状态：强制执行  
> 适用范围：`learn-frontend-web-course/stage-04-css/` 下全部 Stage、Module、Lesson、Lab 与 Project  
> 目标：保证学习者在进入 JavaScript、DOM、Web Platform、Web Components、测试与 CI/CD 之前，可以只依靠已经完成的 HTML 基础来学习 CSS。

---

## 1. 核心原则

Stage 04 是 CSS 的唯一完整 Owner Stage，但不是所有“能帮助观察 CSS 的技术”的 Owner Stage。

本阶段的学习者可见主线必须保持：

```text
语义 HTML
+ CSS
+ 浏览器原生状态
+ DevTools Elements / Styles / Computed / Network
+ 手动修改 HTML / CSS
+ 刷新与视觉对照
```

任何实验都先问：

> 删除 JavaScript、DOM API、CSSOM API、Shadow DOM 或 CI 配置后，当前 CSS 知识还能否完整实现、观察和解释？

如果答案是“能”，这些技术不得进入学习者必须创建、理解或考核的步骤。

---

## 2. Stage 04 可以直接教学的内容

### 2.1 HTML 基线

- 使用 Stage 03 已学过的语义 HTML。
- 修改 class、id、attribute、元素顺序和静态结构。
- 使用浏览器原生链接、表单、焦点、校验和控件状态。

### 2.2 CSS

- CSS Syntax、Stylesheet、Selector、Cascade、Inheritance、Value Processing。
- Box Model、Sizing、Flow、Positioning、Flexbox、Grid、Responsive。
- Typography、Color、Visual Effect、Motion、Custom Property、Theme。
- CSS Architecture、Compatibility、A11Y、Performance 与 Governance。
- 现代 CSS 语法，包括 `@layer`、`@scope`、`:has()`、Native Nesting、Container Query 等。

### 2.3 浏览器证据

学习者可以并且应该使用：

```text
Elements → DOM Tree
Elements → Styles
Elements → Computed
Elements → Box Model
Layout 面板
Network 面板
浏览器原生键盘 / 鼠标 / 表单状态
手动编辑 DOM 属性或 HTML 源码后刷新
```

这些工具用于观察 CSS，不要求编写 JavaScript。

---

## 3. 可以存在，但只能作为黑盒基础设施

以下文件或命令可以留在仓库中，用于运行和维护课程：

```text
npm run dev
npm run check
server.mjs
verify.mjs
GitHub Actions Workflow
```

但必须满足：

1. README 不要求学习者编写、修改或解释这些脚本。
2. 它们不属于 Lesson 知识点、Challenge、Mastery Check 或考试范围。
3. 学习者只需要把它们当作已经提供的启动器和完整性检查器。
4. CI 只属于课程仓库维护设施，不属于 Stage 04 课程内容。

推荐表述：

> `server.mjs`、`verify.mjs` 与 CI 是课程维护工具。本课只要求执行命令，不要求阅读或理解其 JavaScript 实现。

---

## 4. 禁止进入学习者必修步骤的内容

### 4.1 JavaScript 语言

以下内容归 Stage 05 / 06：

```text
变量、函数、数组、对象、循环、异常
模块语法
异步与 Runtime
```

### 4.2 DOM、Event 与 Form API

以下内容归 Stage 07：

```text
document.querySelector()
document.querySelectorAll()
element.matches()
classList / className / dataset
createElement() / append() / prepend()
addEventListener()
event.preventDefault()
document.activeElement
form.checkValidity() / reportValidity()
```

Stage 04 不得通过这些 API 构建动态证据面板或修改页面状态。

### 4.3 CSSOM 与 Web Platform 编程 API

以下内容归 Stage 09：

```text
document.styleSheets
CSSStyleSheet.cssRules
CSSStyleRule
getComputedStyle()
CSS.supports()
```

Stage 04 可以讲 CSSOM 和 Value Processing 的概念，但不得要求学习者编写 JavaScript 访问这些对象。

### 4.4 Shadow DOM 与 Web Components

以下内容归 Stage 13：

```text
shadowRoot
<template shadowrootmode>
:host
Custom Elements
Encapsulation Context 的组件实验
```

Stage 04 只允许用一段“未来边界说明”告知其存在，不能把它做成必做 Lab。

### 4.5 测试与 CI/CD

- 完整测试工程归 Stage 17。
- GitHub Actions、Matrix、CI/CD 与交付归 Stage 26。

课程仓库可以使用这些设施，但 Stage 04 学习者不需要创建、阅读或解释它们。

---

## 5. 静态实验替代模式

### 5.1 替代动态 DOM 修改

不要通过 JavaScript 插入节点，而是同时提供：

```text
状态 A：修改前的静态 HTML
状态 B：修改后的静态 HTML
```

学习者直接比较两个区域，或者手动修改 HTML 后刷新。

### 5.2 替代 JavaScript Match Count

不要用 `querySelectorAll()` 输出数量。使用：

```text
先写预测表
→ 在 Elements 中定位目标
→ 在 Styles 中确认规则是否出现在 Matched Rules
→ 修改一个 class / attribute / sibling order
→ 刷新后再次确认
```

### 5.3 替代 `CSS.supports()`

优先使用 CSS 自己的条件规则：

```css
@supports selector(.card:has(.error)) {
  /* progressive enhancement */
}
```

### 5.4 替代 `getComputedStyle()`

使用 DevTools Computed 面板，并记录：

```text
最终属性值
来源规则
是否继承
是否被覆盖
```

### 5.5 替代动态状态按钮

使用浏览器原生状态：

```text
Tab → :focus-visible
点击按住 → :active
鼠标指向 → :hover
填写表单 → :valid / :invalid
勾选控件 → :checked
```

---

## 6. `:scope` 的特殊边界

`:scope` 是 CSS Selector，但常见的 DOM scoped query 用法属于 Stage 07。

Stage 04 允许：

- 解释 `:scope` 表示当前参考根。
- 区分 `:scope` Pseudo-class 与 `@scope` At-rule。
- 在文字中说明未来会结合 DOM Query API 重新学习。

Stage 04 不允许：

- 要求学习者编写 `element.querySelectorAll(':scope > ...')`。
- 把 scoped query JavaScript 当作 Selector Module 的验收条件。

---

## 7. 每课 Boundary Checklist

新增或修改 Stage 04 Lesson 时必须逐项检查：

```text
[ ] 学习者核心文件是否只需要理解 HTML 与 CSS？
[ ] 是否可以只用 DevTools 和手动编辑完成所有核心证据？
[ ] README 是否没有要求编写 app.js？
[ ] README 是否没有要求调用 DOM / Event / Form API？
[ ] README 是否没有要求调用 CSSOM / Web Platform API？
[ ] 是否没有 Shadow DOM / Web Components 必做实验？
[ ] server.mjs / verify.mjs 是否明确标记为黑盒工具？
[ ] CI 是否只作为仓库维护设施出现？
[ ] 后续 Stage 技术是否只以“边界说明”出现？
[ ] 删除所有辅助编程后，当前 CSS 主问题是否仍然闭环？
```

任意一项不满足，不得将 Lesson 标记为完成。

---

## 8. Owner 映射

| 能力 | Owner |
| --- | --- |
| CSS 语言、Selector、Cascade、Layout、视觉与样式架构 | Stage 04 |
| JavaScript 语言 | Stage 05 |
| JavaScript Runtime | Stage 06 |
| DOM、Event、Form、History | Stage 07 |
| Browser / CSSOM / Web Platform 编程接口 | Stage 09 |
| Web Components / Shadow DOM | Stage 13 |
| 完整测试工程 | Stage 17 |
| CI/CD 与交付 | Stage 26 |

---

## 9. Definition of Done

Stage 04 Boundary Fix 完成后必须达到：

```text
学习者可以在尚未学习 JavaScript 的前提下完成全部 Stage 04 正课
+
课程实验仍然可运行、可观察、可破坏、可修复
+
后续技术只存在于明确的未来边界说明或黑盒维护设施中
+
自动边界检查阻止同类问题重新进入主分支
```
