# Module 04.01：CSS 语言、样式表与级联体系

> Stage：[Stage 04 CSS 完整体系](../README.md)  
> 状态：✅ 已完成  
> 当前完成：KP001～KP009 / 9 课  
> Module Review：[MODULE_REVIEW.md](./MODULE_REVIEW.md)

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决一个主题：

> 一条 CSS 样式如何从源代码进入浏览器，经过加载、解析、匹配、级联、继承和值处理，最终成为元素的真实样式？

学习链：

```text
HTML / Stylesheet
→ CSS Resource
→ Parser
→ CSSOM
→ Selector Matching
→ Declared Values
→ Origin / Importance
→ Encapsulation Context
→ Cascade Layer
→ Specificity
→ Scoping Proximity
→ Source Order
→ Cascaded Value
→ Inheritance / Initial
→ Specified Value
→ Computed Value
→ Used Value
→ Actual Rendering
```

后续 Module 不再建立“CSS Cascade 高级篇 / 原理篇 / Debug 篇”补课。

---

## 2. 为什么必须在布局之前完成

如果不先掌握 CSS 语言和 Cascade，进入 Box Model、Flex、Grid 后遇到“写了却没生效”，很容易把所有问题都归结为“CSS 玄学”。

实际上浏览器执行的是确定性规则。

Module 04.01 的目标是：

> 先判断 CSS 是否进入正确处理阶段，再讨论布局和视觉结果。

---

## 3. 与其他 Module 的边界

### 本 Module 完整拥有

- CSS 与 HTML、DOM、CSSOM 的职责关系。
- Inline / Internal / External Stylesheet。
- Rule、Selector、Declaration、Property、Value。
- Shorthand / Longhand、注释、At-rule。
- Parser Error Recovery。
- Origin、Importance、Encapsulation Context、Source Order。
- Specificity。
- Inheritance。
- CSS-wide Keywords：`inherit`、`initial`、`unset`、`revert`、`revert-layer`。
- Cascade Layer。
- `@scope`、Scope Root、Scope Limit、Scoping Proximity。
- Declared / Cascaded / Specified / Computed / Used / Actual Value。
- CSSOM、`CSSStyleSheet`、`cssRules`、`getComputedStyle()` 的证据边界。
- “CSS 不生效”的完整第一版诊断树。

### 后续 Module 负责

- **04.02**：完整 Selector 体系、Combinator、Pseudo、`:has()`、Nesting。
- **04.03～04.08**：盒模型、尺寸、布局、Flex、Grid、响应式和值系统。
- **04.14**：生产级 CSS Debug / Compatibility / Performance / Governance。
- **Stage 09**：浏览器 Style / Layout / Paint 内核。
- **Stage 24**：性能治理与 RUM。

---

## 4. Must / Should / Expert

### Must

- 正确接入外部样式表。
- 识别 CSS 语言基本单位。
- 区分 Shorthand 与 Longhand。
- 判断 CSS 是否真正加载。
- 解释常见 Cascade / Specificity / Inheritance。
- 使用 Styles / Computed 找最终样式来源。
- 使用 CSS-wide keywords 做有语义重置。

### Should

- 系统分析 Origin / Importance / Context / Layer / Specificity / Scope / Source Order。
- 识别 Specificity Debt 和 `!important` escalation。
- 使用 Cascade Layer 设计覆盖顺序。
- 识别 Parser Error、Invalid Value 和 Computed-value-time Failure。
- 使用 CSSOM 证明 Parser 实际保留哪些 rules。
- 通过 Failure Lab 做最小修复。

### Expert

- 解释完整 Property Value Processing Pipeline。
- 解释 `@scope` 与 Scoping Proximity。
- 解释 important layer order reversal。
- 解释 unlayered normal author declarations。
- 设计 Vendor / Design System / Component / Utility 的 Layer Contract。
- 为大型团队制定 CSS Cascade Governance。

---

## 5. Lesson 路线

| 编号 | Lesson | 深度 | Pattern | 状态 |
| --- | --- | --- | --- | --- |
| KP001 | [CSS 是什么：第一次让结构拥有可控外观](./kp001-what-is-css/) | Must | BUILD-LAB | ✅ |
| KP002 | [CSS 怎样进入页面：Inline、Internal 与 External](./kp002-attach-stylesheet/) | Must | BUILD + NETWORK-LAB | ✅ |
| KP003 | [Rule、Declaration、Property 与 Value](./kp003-rules-declarations-properties-values/) | Must | BROWSER-MECHANISM-LAB | ✅ |
| KP004 | [Shorthand、Longhand、注释、At-rule 与语法边界](./kp004-shorthand-longhand-at-rules/) | Must | BUILD + FAILURE-LAB | ✅ |
| KP005 | [Origin、Importance、Context 与 Source Order](./kp005-origin-importance-context-source-order/) | Must / Should | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP006 | [Specificity、Inheritance 与 CSS-wide Keyword](./kp006-specificity-inheritance-css-wide-keywords/) | Must / Should | BROWSER-MECHANISM + FAILURE-LAB | ✅ |
| KP007 | [Cascade Layer、`@scope`、Scoping Proximity 与 `revert-layer`](./kp007-cascade-layer-scope-revert-layer/) | Should / Expert | ARCHITECTURE + FAILURE-LAB | ✅ |
| KP008 | [CSS 错误恢复、Styles、Computed、CSSOM 与 Value Processing](./kp008-css-error-recovery-cssom-value-pipeline/) | Should / Expert | FAILURE + BROWSER-MECHANISM | ✅ |
| KP009 | [Module Project：First Stylesheet Diagnostic Lab](./kp009-first-stylesheet-diagnostic-lab/) | 全层级 | PROJECT + FAILURE-LAB | ✅ |

当前完成度：

```text
9 / 9
= 100%
```

---

## 6. 九课因果链

```text
KP001  CSS 到底负责什么？
↓
KP002  CSS 怎样进入 Document？
↓
KP003  CSS Source 由什么语言单位组成？
↓
KP004  Shorthand / Longhand / At-rule 如何改变声明？
↓
KP005  Origin / Importance / Context / Source Order 怎么比较？
↓
KP006  Specificity / Inheritance / CSS-wide keywords 如何继续决定结果？
↓
KP007  大型系统如何用 Layer / Scope 治理覆盖权？
↓
KP008  Parser / CSSOM / Value Pipeline 在哪里失败？
↓
KP009  面对多故障页面，能否独立完成证据驱动诊断？
```

---

## 7. 统一运行方式

KP001～KP009 都在自己的 Lesson 目录保存独立最终源码。

```bash
npm run check
npm run dev
```

默认地址：

```text
http://localhost:4173
```

没有任何 Lesson 在运行时依赖上一课 Dev Server 或目录。

---

## 8. Evidence Map

| 能力 | 主要证据 |
| --- | --- |
| Stylesheet 是否加载 | Network |
| DOM 是否正确 | Elements |
| Rule 是否匹配 | Styles |
| Declaration 是否被覆盖 | Styles |
| 最终 Property | Computed |
| Parser 保留规则 | CSSOM / `cssRules` |
| Layer 排序 | Styles Layer + 实验对照 |
| `@scope` | Scoped Rule + Proximity 对照 |
| Invalid Value | Styles / Computed |
| Value Pipeline | CSSStyleRule vs `getComputedStyle()` |
| 多故障综合排查 | KP009 Diagnostic Report |

---

## 9. Failure Lab Map

已完成：

- Stylesheet URL / 404。
- Source Order。
- Invalid Property Value。
- Shorthand Reset。
- `!important` vs normal / inline。
- UA / Author / Encapsulation Context。
- Specificity Debt。
- Inheritance 误判。
- `initial` / `unset` / `revert` 误用。
- Layer Order。
- Important Layer Reversal。
- `@scope` Proximity。
- Invalid Selector。
- Unknown Property。
- Invalid at Computed-value Time。
- 九类故障组合诊断。

---

## 10. Module Project

项目：

```text
First Stylesheet Diagnostic Lab
```

Broken Baseline 同时包含：

```text
C01 Stylesheet URL / 404
C02 Source Order
C03 Importance
C04 Specificity
C05 Inheritance
C06 Invalid Declaration
C07 Shorthand Reset
C08 Cascade Layer Order
C09 @scope / Specificity / Proximity
```

要求提交：

```text
症状
→ 假设
→ DevTools / Network / CSSOM 证据
→ 根因
→ 最小修复
→ 回归
→ 预防
```

Project 提供 Broken Baseline、Reference Solution、Diagnostic Report Template 和 Reference Solution Notes。

---

## 11. Production Boundary

后续生产系统还会加入 CSS Modules、CSS-in-JS、Utility、Shadow DOM、Microfrontend、SSR、Bundling、Design System，但最基础诊断问题不会改变：

```text
样式是否加载？
规则是否有效？
是否匹配？
Cascade 谁赢？
值如何计算？
最终证据是什么？
```

所以后续课程只引用这套模型，不重讲基础。

---

## 12. Architecture Rules 建议

完成本 Module 后，团队至少应定义：

```text
1. Cascade Layer Order
2. Vendor CSS 归属
3. Component Selector Specificity Budget
4. !important 使用边界
5. Override Owner / Expire Policy
6. @scope Browser Support Policy
7. Shorthand 使用约定
8. CSS Debug Checklist
```

---

## 13. Module Definition of Done

```text
✅ 9 / 9 Lesson 完成
✅ 所有 Lesson README 可从零复刻
✅ 每课最终源码独立运行
✅ 所有 npm run check 通过
✅ Network / Styles / Computed / CSSOM 真实证据
✅ Parser / Cascade / Inheritance / Layer / Scope Failure Lab
✅ Value Processing Pipeline
✅ Module Project
✅ Diagnostic Report Template
✅ Reference Solution
✅ Scope Review
✅ Depth Review
✅ Evidence Review
```

完整复审见：[MODULE_REVIEW.md](./MODULE_REVIEW.md)

---

## 14. 最终只记住 5 件事

1. **CSS 不是“最后写的就赢”，而是完整 Cascade 排序。**
2. **Specificity 只是 Cascade 的一个阶段，不承担架构治理职责。**
3. **Inheritance 不是 Cascade 优先级，它是在需要时补值。**
4. **Styles、Computed、CSSOM 和 Raw Source 是不同证据层。**
5. **遇到 CSS 故障，先判断失败阶段，再做最小修复。**

---

## 15. 下一 Module

Module 04.01 已关闭。

下一步：

```text
04.02 Selector、关系匹配、Pseudo、Nesting 与 Scope
```

核心问题：

> 浏览器怎样判断一条 Style Rule 到底匹配哪些 Element，以及如何在复杂 DOM 中保持 Selector 可维护？

后续不再创建 CSS Cascade / Inheritance / Specificity 同名补课。
