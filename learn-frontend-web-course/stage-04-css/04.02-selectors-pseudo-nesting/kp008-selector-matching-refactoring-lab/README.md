# KP008：Module Project——Selector Matching & Refactoring Lab

## 0. 项目信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo、Nesting 与 `:scope` |
| Lesson | KP008 / Module Project |
| 深度 | Must + Should + Expert |
| Pattern | PROJECT-LAB + FAILURE-LAB + DEBUG-LAB + A11Y-LAB + ARCHITECTURE-LAB |
| 主问题 | 面对一个同时存在 Parser、Match Set、Specificity、关系方向、结构漂移、Nesting 和 A11Y 问题的页面，能否用证据逐项完成最小重构？ |
| 运行要求 | Node.js 20+，现代浏览器 |

---

## 1. 项目目标

这个项目不是让你“把页面调好看”。

你要接管一个故意损坏的 Selector 系统，完成下面的完整工程闭环：

```text
读取 DOM
→ 拆解 Selector
→ 预测 Match Set
→ 用 DevTools / querySelectorAll() / matches() 验证
→ 区分 Parser、Matching、Cascade 和 A11Y 问题
→ 找到最小根因
→ 重构 Selector
→ 验证交互和语义
→ 输出 Selector Contract
```

项目同时验证 Module 04.02 的全部能力：

```text
Basic Selector
Attribute Selector
Combinator
Structural Pseudo-class
:is() / :where() / :not() / :has()
UI / Form / Focus State
Pseudo-element
Native CSS Nesting / &
:scope
Selector Architecture
```

---

## 2. 项目产物

```text
kp008-selector-matching-refactoring-lab/
├── README.md
├── index.html                 # Broken Baseline
├── styles.css                 # 故意损坏的 Selector
├── solution.html              # Reference Solution
├── solution.css               # 修复后样式
├── app.js                     # 动态状态与 Match Evidence
├── DIAGNOSTIC_REPORT.md       # 学习者填写模板
├── REFERENCE_SOLUTION.md      # 参考根因与修复
├── SELECTOR_CONTRACT.md       # 生产治理约定
├── package.json
├── server.mjs
└── verify.mjs
```

`solution.html` 和 `REFERENCE_SOLUTION.md` 不是开始按钮。

正确顺序：

```text
Broken Baseline
→ 自己填写 Diagnostic Report
→ 完成自己的 Fix
→ 回归
→ 最后对照 Reference Solution
```

---

## 3. 验收标准

项目必须同时满足：

### 功能

- 所有目标组件匹配正确。
- 动态插入节点后业务状态不漂移。
- 错误状态切换后 Parent Panel 正确更新。
- Scoped Query 只返回目标层级。

### Selector

- Invalid Selector List 被修复。
- Attribute Selector 不 Over-match。
- 组件 Selector 不穿透嵌套组件。
- Business State 不依赖 Child Index。
- `:is()` 不引入隐藏 ID Specificity。
- `:has()` Subject / Direction 正确。
- Native Nesting 可还原为可解释 Selector。

### A11Y

- Keyboard Focus 可见。
- Hover 不是唯一状态。
- 必要 Button Label 存在于真实 DOM。
- 当前步骤保留 `aria-current`。
- 禁用 CSS 后关键业务信息仍可理解。

### Evidence

- 每个 Case 有预测。
- 每个 Case 有实际 Match Set。
- 每个 Case 有最小修复。
- 至少完成一轮动态回归。
- `npm run check` 通过。

---

## 4. Step 0：从零复制并建立基线

进入 Module 目录：

```bash
cd learn-frontend-web-course/stage-04-css/04.02-selectors-pseudo-nesting
```

进入项目：

```bash
cd kp008-selector-matching-refactoring-lab
```

运行静态验收：

```bash
npm run check
```

预期：

```text
✓ KP008 broken baseline, eleven selector faults, evidence app, reports, solution, and selector contract are complete.
```

启动：

```bash
npm run dev
```

打开 Broken：

```text
http://127.0.0.1:4173/index.html
```

先不要打开 Solution。

---

## 5. 调试协议

每个 Case 使用同一张卡：

```text
1. Symptom
2. Selector Source
3. Subject / Candidate
4. Predicted Match Set
5. Actual Match Set
6. Styles / Computed Evidence
7. Root Cause Category
8. Minimal Fix
9. Regression Set
```

Root Cause 只能先归类，再修：

```text
Parser
Match Set
Specificity / Cascade
DOM Coupling
State Modeling
Input Modality
Generated Content / Semantics
Nesting Context
Scoped Query
```

禁止一上来：

```text
加 !important
加 ID
复制一条更长 Selector
删除所有 outline
改 DOM 直到碰巧生效
```

---

## 6. S01：Invalid Selector List

Broken：

```css
.selector-list-target,
:totally-invalid-pseudo {
  border: 4px solid blue;
}
```

### 预测

不要只问：

> `.selector-list-target` 是否有效？

要问：

> 整个 Selector List 是否能被 Parser 接受？

Ordinary Selector List 中一个无效 Selector 可能让整条 Style Rule 无效。

### Evidence

```js
document.querySelectorAll(".selector-list-target")
```

能找到元素，并不证明 CSS Rule 被 Parser 保留。

继续：

1. 选择目标元素。
2. 查看 Styles。
3. 搜索 `selector-list-target`。
4. 查看目标 Border 的 Computed Value。
5. 在 CSSOM 中搜索对应 Rule。

### Root Cause

```text
DOM 正常
Basic Selector 正常
Rule Parser 失败
```

因此增加 Specificity 无意义。

---

## 7. S02：Attribute Substring Over-match

Broken：

```css
[data-role*="admin"] {
  ...
}
```

DOM：

```text
admin
superadmin
editor
```

### 预测

`*=` 表示字符串中包含目标子串，不表示角色枚举相等。

Console：

```js
document.querySelectorAll('[data-role*="admin"]')
```

记录返回数量和元素值。

### 修复决策

数据契约是：

```text
role ∈ { admin, superadmin, editor }
```

所以应该使用：

```css
[data-role="admin"]
```

Selector 语法必须服从数据模型，而不是凭视觉名称猜。

---

## 8. S03：组件边界与 Descendant Leakage

Broken：

```css
.dashboard .title {
  color: red;
}
```

它匹配 Dashboard 中所有后代 `.title`：

```text
Dashboard title
Panel title
Embedded Widget title
```

### Evidence

```js
document.querySelectorAll(".dashboard .title")
```

逐个打印：

```js
[...document.querySelectorAll(".dashboard .title")]
  .map(element => element.className)
```

### 修复

不是简单改成更长 Selector：

```css
.dashboard .panel .panel__body .panel__title
```

而是给每个组件明确样式所有权：

```css
.dashboard > .dashboard__title
.panel__title
.embedded-widget__title
```

---

## 9. S04：Structural Position 与业务状态

Broken：

```css
.release-list > :nth-child(2) {
  ...
}
```

需求却是：

> 标出当前版本。

DOM 第二个 Child 当前是一条维护提示。

点击“插入提示”后，索引还会继续变化。

### 证据

```js
[...document.querySelector(".release-list").children]
  .map((item, index) => ({
    index: index + 1,
    className: item.className,
    state: item.dataset.state
  }))
```

### 根因

```text
:nth-child()
→ 结构身份

data-state / aria-current
→ 业务状态
```

两者不是同一个问题。

### 修复

```css
.release-row[data-state="current"] {
  ...
}
```

`aria-current="step"` 继续服务于语义和辅助技术。

---

## 10. S05：`:is()` Specificity Trap

Broken：

```css
.project-shell :is(.action, #legacy-action) {
  color: red;
}

.project-shell .action.is-safe {
  color: green;
}
```

页面没有 `#legacy-action`，但它仍参与 `:is()` 参数最大 Specificity 的计算。

### Evidence

在 Styles 中记录：

```text
两条 Rule 是否都匹配？
哪条声明被划掉？
为什么后出现的状态类仍输？
```

### 修复选项

选项 A：低权重基线：

```css
.project-shell :where(.action, #legacy-action) {
  color: gray;
}
```

选项 B：拆分 Legacy Rule：

```css
.project-shell .action { ... }
#legacy-action { ... }
```

选项 C：迁移 Legacy ID 到单独 Cascade Layer。

---

## 11. S06：`:has()` Subject 与方向

Broken：

```css
.status-error:has(.panel)
```

这句话读作：

> 选择一个 `.status-error`，它内部必须有 `.panel`。

真实 DOM 正好相反：Panel 包含 Error。

### 正确表达

```css
.status-panel:has(.status-error)
```

读作：

> 选择一个 Status Panel，只要它包含 Error 后代。

点击“切换错误状态”验证：

```text
status-error
↔
status-ok
```

Panel 的 Match Set 应自动变化。

---

## 12. S07 / S08：Input Modality 与 Focus

Broken：

```css
.interactive-target:hover {
  ...
}

.interactive-target:focus {
  outline: none;
}
```

### Pointer 测试

用鼠标 Hover。

### Keyboard 测试

1. 点击地址栏。
2. 使用 Tab 前进。
3. 使用 Shift+Tab 后退。
4. 观察 Interactive Target。
5. 检查 `document.activeElement`。

### 修复

```css
.interactive-target:is(:hover, :focus-visible) {
  ...
}

.interactive-target:focus-visible {
  outline: 3px solid orange;
  outline-offset: 3px;
}
```

Hover 和 Focus 可以共享部分视觉，但不能假设只有鼠标用户。

---

## 13. S09：Pseudo-element 与关键语义

Broken HTML：

```html
<button class="danger-action"></button>
```

Broken CSS：

```css
.danger-action::before {
  content: "删除项目";
}
```

页面视觉上似乎有文字，但必要业务标签不应只依赖 Generated Content。

### 三个回归

1. 在 Elements 中检查真实 DOM Text。
2. 禁用 CSS。
3. 检查 Accessibility Tree / Accessible Name。

### 修复

```html
<button class="danger-action" type="button">
  <span>删除项目</span>
</button>
```

Pseudo-element 只做装饰：

```css
.danger-action::before {
  content: "⚠ ";
}
```

---

## 14. S10：Native Nesting 与 Sass 迁移

Broken：

```css
.notice {
  &__label {
    ...
  }
}
```

这不是 Native CSS 的字符串模板。

### 修复

```css
.notice {
  & > .notice__label {
    ...
  }
}
```

组合后：

```css
.notice > .notice__label
```

### 迁移审计

仓库迁移时搜索：

```text
&__
&--
&-
```

然后逐项分类：

```text
字符串拼接
Pseudo-class
State Attribute
Combinator
Ancestor Context
```

只有后四类可以按真实 Selector 语义迁移。

---

## 15. S11：`:scope` Query Boundary

Broken 模式使用：

```js
scopeZone.querySelectorAll(".scope-row")
```

它包含直接 Row 和 Nested Row。

Solution 模式使用：

```js
scopeZone.querySelectorAll(":scope > .scope-row")
```

只包含三条直接 Row。

### Evidence

页面自动输出数量。

再手工运行：

```js
const root = document.querySelector("#scope-zone");

[...root.querySelectorAll(".scope-row")]
  .map(item => item.textContent.trim());

[...root.querySelectorAll(":scope > .scope-row")]
  .map(item => item.firstChild.textContent.trim());
```

`:scope` 明确当前 Query Root；它不是 `@scope` At-rule。

---

## 16. 自动 Evidence 面板

`app.js` 根据：

```html
<body data-mode="broken">
```

或：

```html
<body data-mode="solution">
```

选择对应验证 Selector。

输出包括：

```text
S01 Border Used Value
S02 Attribute Match Count
S03 Descendant Match Count
S04 Current Selector Match Count
S05 Action Computed Color
S06 :has() Match Count
S09 Real DOM textContent
S10 Notice Label Computed Color
S11 Scoped Query Count
```

自动输出不是答案，只是帮助你建立可重复证据。

---

## 17. 完整回归矩阵

| Case | Broken 证据 | 修复后预期 |
| --- | --- | --- |
| S01 | Target 存在但 Border Rule 不出现 | Border Rule 有效 |
| S02 | admin 与 superadmin 同时匹配 | 只匹配 admin |
| S03 | 三层 Title 被统一命中 | 组件各自拥有样式 |
| S04 | 第二 Child 被选中且插入后漂移 | current state 稳定 |
| S05 | Safe Rule 被 ID Specificity 压制 | 状态类自然覆盖 |
| S06 | Error Node 检查错误方向 | Panel 根据后代状态匹配 |
| S07 | 只有 Mouse Hover | Mouse 与 Keyboard 都有反馈 |
| S08 | Focus Indicator 消失 | Focus-visible 清晰 |
| S09 | DOM 中无按钮标签 | 真实 DOM 有标签 |
| S10 | `&__label` 无效 | 显式真实 Selector |
| S11 | Query 包含 Nested Row | 只返回 Direct Row |

动态回归：

```text
切换 Error
插入 Release Note
Tab / Shift+Tab
禁用 CSS
调整 DOM Wrapper
重复刷新 Evidence
```

---

## 18. Diagnostic Report

复制模板：

```bash
cp DIAGNOSTIC_REPORT.md MY_DIAGNOSTIC_REPORT.md
```

填写要求：

- 不只写“改成什么”。
- 必须写原 Selector 为什么产生当前 Match Set。
- 必须区分 Parser 与 Matching。
- 必须写出 Subject / Anchor。
- 必须保留最小 Evidence。
- 必须说明修复后哪些 DOM 变化仍然安全。

---

## 19. Selector Contract

项目附带 `SELECTOR_CONTRACT.md`，覆盖：

```text
Component Identity
Selector Depth Budget
Specificity Budget
State Modeling
Attribute Selector
Relation Selector
Structural Selector
Native Nesting
Focus / Input Modality
Evidence Requirement
Review Checklist
```

完成项目后，应根据你自己的结论修改一份团队版本，而不是原样复制。

---

## 20. Wrong Way

### Wrong Way A：用更高 Specificity 盖住所有问题

```css
#app .project-shell .dashboard .panel .title {
  color: green !important;
}
```

它没有修复：

```text
Parser Error
Wrong Match Set
A11Y
State Modeling
Nesting Invalidity
```

### Wrong Way B：一看到 `:has()` 就替代 JavaScript

`:has()` 解决的是 Selector Relation，不是复杂业务状态机、权限和异步流程。

### Wrong Way C：所有状态都改成位置

```css
:nth-child(...)
```

位置适合斑马纹、网格周期和纯结构装饰，不适合表达“当前、失败、管理员、已选中”。

### Wrong Way D：Nesting 越深越模块化

缩进深度与模块化没有直接关系。组合后 Selector 仍可能跨越多个组件。

---

## 21. Module Final Challenge

在不查看 `solution.css` 的前提下：

1. 创建 `my-solution.html`。
2. 创建 `my-solution.css`。
3. 不改 `app.js` 的 Evidence Contract。
4. 修复全部 11 个 Case。
5. 给每个 Case 写至少一条 Console 验证。
6. 完成键盘回归。
7. 动态插入三次 Release Note。
8. 动态切换 Error 三次。
9. 禁用 CSS 后检查业务文本。
10. 输出你自己的 Selector Contract。

加分项：

- 把 Match Set Evidence 写成浏览器内测试函数。
- 检测所有复杂 Selector 的返回数量。
- 为组件 Wrapper 变化添加回归 Fixture。
- 记录 Nested CSS 在 CSSOM 中的序列化结构。

---

## 22. Mastery Check

完成项目后应能回答：

1. DOM 中能找到元素，为什么 CSS Rule 仍可能不存在？
2. `*=` 为什么容易 Over-match？
3. Descendant Selector 如何穿透嵌套组件？
4. `:nth-child()` 为什么不能默认表达业务身份？
5. `:is()` 参数中不存在的 ID 为什么仍影响 Specificity？
6. `:where()` 的架构用途是什么？
7. `:has()` 的 Subject 与 Relative Selector 分别是什么？
8. Hover-only 为什么是输入模型缺陷？
9. Focus Indicator 为什么不能无替代移除？
10. Pseudo-element Content 为什么不应承载必要业务文本？
11. `&__element` 为什么不是原生 CSS Nesting？
12. `:scope > child` 与普通 Descendant Query 有什么区别？
13. Selector Match 问题与 Cascade Winner 问题怎样区分？
14. Selector Depth Budget 约束的是什么？
15. 什么时候应放弃复杂 Selector，改用状态属性或组件边界？

---

## 23. Definition of Done

必须全部完成：

```text
[ ] npm run check
[ ] Broken Baseline 11 个 Case 的预测
[ ] 11 个 Case 的实际 Evidence
[ ] 自己的 MY_DIAGNOSTIC_REPORT.md
[ ] 自己的 my-solution.html / css
[ ] Mouse 回归
[ ] Keyboard 回归
[ ] Dynamic DOM 回归
[ ] CSS Disabled 回归
[ ] Selector Contract
[ ] 与 Reference Solution 差异复盘
```

通过后，Module 04.02 的 Selector 学习链闭环：

```text
Grammar
→ Attribute
→ Combinator
→ Structural
→ Functional / Relational
→ UI / Form / Focus / Pseudo-element
→ Native Nesting / :scope
→ Multi-fault Refactoring Project
```

下一步进入 Module 04.03：

```text
Box Model
Sizing
Intrinsic Size
Replaced Element
Overflow
```
