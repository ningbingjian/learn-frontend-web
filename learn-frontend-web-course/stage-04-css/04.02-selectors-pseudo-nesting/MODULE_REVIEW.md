# Module 04.02 Final Review

> Module：Selector、关系匹配、Pseudo、Nesting 与 `:scope`  
> 状态：PASS / COMPLETE  
> Lesson：KP001～KP008  
> Review 维度：Scope、Depth、Evidence、Failure、Project、Reproducibility、Boundary

---

## 1. Review 结论

```text
Scope Review          PASS
Depth Review          PASS
Evidence Review       PASS
Failure Lab Review    PASS
A11Y Boundary Review  PASS
Project Review        PASS
Reproducibility       PASS
Owner Boundary        PASS
```

Module 04.02 可以正式关闭，并把学习链交给 Module 04.03。

---

## 2. Scope Review

### 已覆盖

- Basic Selector。
- Selector List。
- Compound / Complex Selector。
- Attribute Selector。
- 四类 Combinator。
- Structural Pseudo-class。
- `An+B`。
- `of S` Filter。
- `:is()` / `:where()` / `:not()` / `:has()`。
- Relative Selector。
- UI / Form / Focus State。
- Pseudo-element。
- Native CSS Nesting。
- `&`。
- `:scope`。
- Selector Evidence。
- Selector Governance。
- 综合 Module Project。

### 无遗漏但有明确后置边界

- `@scope` 和 Scoping Proximity 已在 04.01。
- Box / Sizing 在 04.03。
- Browser Selector Engine 在 Stage 09。
- Performance Invalidation 在 Stage 24。
- CSS Architecture Solution Selection 在 04.13。
- 完整 A11Y Component Engineering 在 Stage 14。

结论：Owner Scope 完整，没有把核心 Selector 知识推迟到后续“高级篇”。

---

## 3. Depth Review

### Must

课程不只列语法，已经要求学习者：

- 读取 DOM。
- 预测 Match Set。
- 使用 DevTools。
- 使用 `querySelectorAll()`。
- 使用 `matches()`。
- 区分 Match 与 Cascade。

### Should

已经覆盖：

- Invalid Selector List。
- Attribute Over-match。
- Structural Index Drift。
- `:is()` / `:where()` Specificity。
- `:has()` Direction。
- Hover / Focus / Generated Content 边界。
- Native Nesting。

### Expert

已经覆盖：

- Relative Selector Anchor。
- Parent Selector List Specificity。
- Native Nesting 不是字符串转换。
- Sass Migration Risk。
- Scoped Query Reference Root。
- Selector Budget。
- State Modeling Contract。
- Evidence Requirement。

结论：深度从 Syntax 进入 Debug、A11Y、Architecture 与 Production Boundary。

---

## 4. Evidence Review

各 Lesson 均采用至少一种浏览器证据：

```text
DOM Tree
Matched Rules
Computed
querySelectorAll()
matches()
CSS.supports()
getComputedStyle(..., "::pseudo")
Dynamic DOM Mutation
Keyboard Interaction
```

KP008 额外提供自动 Evidence Panel，输出：

- Parser 后的 Used Value 间接证据。
- Attribute Match Count。
- Descendant Match Count。
- Structural Match Count。
- Computed Color。
- `:has()` Match Count。
- DOM Text。
- Native Nesting Result。
- Scoped Query Count。

结论：页面“看起来正确”不是验收标准。

---

## 5. Failure Lab Review

Failure 类型分布：

```text
Parser
Grammar
Attribute Contract
Tree Relation
Structural Index
Specificity
Relational Direction
Input Modality
Focus A11Y
Generated Content
Nesting Context
Scoped Query
DOM Coupling
```

所有 Failure 都有：

```text
Symptom
Prediction
Evidence
Root Cause
Minimal Fix
Regression
```

结论：Failure Lab 不是附录，而是主学习路径。

---

## 6. Project Review

KP008 包含 11 个组合故障，不是单一 Demo。

项目产物：

```text
Broken Baseline
Reference Solution
Dynamic Evidence App
Diagnostic Report Template
Reference Root-cause Notes
Selector Contract
Regression Matrix
```

项目要求学习者独立创建自己的 Solution，而不是只运行参考版本。

结论：Module Project 能证明知识组合能力。

---

## 7. A11Y Boundary Review

Selector Module 已覆盖与 Selector 直接相关的 A11Y 边界：

- Hover 不能是唯一状态。
- Focus Indicator 不能无替代移除。
- `:focus-visible` / `:focus-within`。
- HTML Disabled / Required / Invalid State。
- Generated Content 不承担必要 Label。
- CSS Disabled 回归。

未越界深入：

- ARIA Pattern 全体系。
- Screen Reader Matrix。
- Complex Widget Keyboard Model。
- Design System A11Y Governance。

这些继续由 Stage 14 拥有。

---

## 8. Reproducibility Review

每课均包含：

```text
README.md
index.html
styles.css
package.json
server.mjs
verify.mjs
```

需要动态证据时包含 `app.js`。

统一命令：

```bash
npm run check
npm run dev
```

无第三方依赖，不依赖上一课运行目录。

Stage 04 CI Matrix 在 Module 完成后覆盖 17 个已完成 Lesson。

结论：任意 Lesson 可独立复制、运行与检查。

---

## 9. Production Boundary Review

已经建立：

- Component Identity Rule。
- Selector Depth Budget。
- Specificity Budget。
- State Modeling Rule。
- Attribute Operator Rule。
- Relation Selector Review。
- Structural Selector Rule。
- Native Nesting Contract。
- Focus / Input Modality Contract。
- Evidence Requirement。
- PR Review Checklist。

结论：课程不止教“能写”，还教“何时不该写”。

---

## 10. Known Risks

### 风险一：浏览器实现继续演进

Native CSS Nesting 的 CSSOM 表达和边缘语法仍可能演进。

处理：

- 课程以当前标准语义为基线。
- 使用 Feature Detection。
- 强调组合后 Selector，而不是依赖 DevTools 展示细节。
- 后续可做兼容审计，但不重开平行 Module。

### 风险二：`:has()` 滥用

学习者可能把“会写”理解为“到处写”。

处理：

- Production Contract 明确只有真实关系需求才使用。
- 复杂业务状态继续使用 JavaScript State / HTML Attribute。
- Stage 24 再讨论 Invalidation Cost。

### 风险三：Nesting 隐藏复杂度

缩进可能让深层 Selector 看起来更模块化。

处理：

- Review 必须还原组合后 Selector。
- Nesting Depth 计入 Selector Depth Budget。
- Project 包含 DOM Coupling Case。

---

## 11. Exit Criteria

以下条件全部满足：

- [x] 8 / 8 Lesson 完成。
- [x] Must / Should / Expert 覆盖。
- [x] 每课独立运行。
- [x] 每课自动检查。
- [x] Browser Match Evidence。
- [x] Parser / Match / Cascade Boundary。
- [x] Dynamic Failure Lab。
- [x] A11Y Boundary。
- [x] Native Nesting / `&`。
- [x] `:scope`。
- [x] Module Project。
- [x] Diagnostic Report。
- [x] Selector Contract。
- [x] CI Matrix。

---

## 12. Final Decision

```text
Module 04.02
Selector、关系匹配、Pseudo、Nesting 与 :scope
STATUS: COMPLETE
```

下一 Owner Module：

```text
04.03
Box Model、Sizing、Intrinsic Size、Replaced Element 与 Overflow
```

后续不允许以“Selector 高级篇”名义重复建设本 Module 已拥有的内容。
