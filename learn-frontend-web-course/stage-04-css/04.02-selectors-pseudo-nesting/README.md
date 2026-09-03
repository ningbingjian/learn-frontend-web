# Module 04.02：Selector、关系匹配、Pseudo 与 Native Nesting

> Stage：[Stage 04 CSS 完整体系](../README.md)  
> 状态：✅ 已完成并通过 Boundary Fix  
> 当前完成：KP001～KP008 / 8 课  
> 前置 Module：[04.01 CSS 语言、样式表与级联体系](../04.01-css-language-and-stylesheets/)  
> Boundary：[STAGE_BOUNDARY.md](../STAGE_BOUNDARY.md)  
> Module Review：[MODULE_REVIEW.md](./MODULE_REVIEW.md)

---

## 1. Module Teaching Contract

本 Module 只解决：

> 浏览器怎样根据元素类型、属性、结构、关系和状态确定 Selector Match Set，并让复杂 Selector 保持可解释、可访问和可治理？

学习链：

```text
Selector Source
→ Parse
→ Simple / Compound / Complex Selector
→ Attribute Match
→ Combinator Relationship
→ Structural Match
→ Functional / Relational Match
→ UI / Form / Focus State
→ Pseudo-element
→ Native Nesting / &
→ Match Set
→ 交给 04.01 的 Cascade
```

---

## 2. 学习者技术边界

学习者只需要：

```text
语义 HTML
CSS
DevTools Elements / Styles / Computed
浏览器原生鼠标、键盘与表单状态
手动修改 HTML / CSS 后刷新
静态 Broken / Fixed 对照
```

不要求：

```text
JavaScript 语言
DOM Query / Event / Form API
CSSOM 编程接口
Shadow DOM / Web Components
测试框架或 CI 配置
```

`server.mjs`、`verify.mjs` 与 GitHub Actions 是黑盒课程维护设施。

---

## 3. Scope

### 本 Module 完整拥有

- Type、Universal、Class、ID Selector。
- Simple、Compound、Complex Selector。
- Selector List 与 Invalidity。
- Attribute Selector。
- Descendant、Child、Adjacent、Subsequent Sibling Combinator。
- Structural Pseudo-class 与 `An+B`、`of S`。
- `:is()`、`:where()`、`:not()`、`:has()`。
- UI、Form、Focus Pseudo-class。
- `::before`、`::after`、`::marker`、`::selection`。
- Native CSS Nesting 与 `&`。
- `:scope` 的 CSS 概念边界。
- Selector Contract、Depth Budget、Specificity Budget、State Modeling。
- A11Y Failure Lab。

### 明确后置

| 主题 | Owner |
| --- | --- |
| JavaScript | Stage 05 |
| DOM Query、Event、Form API | Stage 07 |
| CSSOM / Web Platform 编程接口 | Stage 09 |
| Shadow DOM / Web Components | Stage 13 |
| 完整测试工程 | Stage 17 |
| CI/CD | Stage 26 |

---

## 4. Lesson 路线

| 编号 | Lesson | 深度 | 状态 |
| --- | --- | --- | --- |
| KP001 | [Selector Grammar 与 Basic / Compound Selector](./kp001-selector-grammar-basic-selectors/) | Must | ✅ |
| KP002 | [Attribute Selector](./kp002-attribute-selectors/) | Must / Should | ✅ |
| KP003 | [Combinator 与 DOM Relationship](./kp003-combinators-relationships/) | Must / Should | ✅ |
| KP004 | [Structural Pseudo-class 与 `of S`](./kp004-structural-pseudo-classes/) | Must / Should | ✅ |
| KP005 | [`:is()`、`:where()`、`:not()`、`:has()`](./kp005-functional-relational-pseudo-classes/) | Should / Expert | ✅ |
| KP006 | [UI / Form / Focus Pseudo-class 与 Pseudo-element](./kp006-ui-form-focus-pseudo-elements/) | Must / Should | ✅ |
| KP007 | [Native CSS Nesting、`&` 与 Selector Context](./kp007-native-css-nesting-scope/) | Should / Expert | ✅ |
| KP008 | [Selector Matching & Refactoring Lab](./kp008-selector-matching-refactoring-lab/) | 全层级 | ✅ |

```text
8 / 8
100%
```

---

## 5. Evidence Contract

### 核心证据

```text
Elements：真实元素、属性、父子和兄弟关系
Styles：Matched Rules、未匹配规则、Specificity 与覆盖
Computed：最终属性值
浏览器原生状态：Hover、Active、Focus、Validity、Checked
静态状态 A / B
Broken / Solution 页面
```

### 禁止替代

不能因为编程输出方便，就把 Selector 课程改造成 DOM API 课程。

以下做法已从学习路径中删除：

```text
脚本统计 Match Count
脚本插入节点
脚本切换状态
脚本读取 Pseudo-element Computed Style
脚本检测 Selector 支持
```

---

## 6. Failure Lab 分布

- KP001：Invalid Selector List、Compound / Descendant 混淆。
- KP002：Substring Over-match、大小写契约错误。
- KP003：Descendant Leakage、Sibling Relation 混淆、DOM Coupling。
- KP004：Child / Type / Filtered Index 混淆、位置承担业务身份。
- KP005：`:is()` Specificity、`:has()` Direction、关系滥用。
- KP006：Hover-only、Focus Removal、模拟 Disabled、Generated-content-only Label。
- KP007：Nesting Depth、父列表权重、Sass `&__element` 心智模型。
- KP008：十一类综合故障与 Selector Contract。

这些故障均可只用 HTML、CSS 和 DevTools 复现与修复。

---

## 7. Static Experiment Pattern

```text
预测 Match Set
→ 查看真实 DOM
→ 在 Styles 中确认规则
→ 修改 HTML / CSS 一个变量
→ 刷新
→ 再次确认
```

需要比较 DOM 变化时，优先：

```text
状态 A 与状态 B 同屏
或
手动编辑 HTML 后刷新
```

不为了“动态效果”提前引入 JavaScript。

---

## 8. Module Project

项目：

```text
Selector Matching & Refactoring Lab
```

项目包含：

- 静态 Broken Baseline。
- 静态 Reference Solution。
- 11 类 Selector / A11Y 故障。
- Diagnostic Report。
- Reference Solution Notes。
- Selector Contract。
- 回归矩阵。

项目没有学习者可见 `app.js`，不依赖 DOM API 或动态证据面板。

---

## 9. Production Selector Contract

1. 组件默认使用稳定 Class / Attribute。
2. 深度超过三层需要说明结构契约。
3. Structural Selector 不承担长期业务身份。
4. `*=` 不表达权限或离散角色。
5. `:has()` 使用前写出 Subject 与方向。
6. `:is()` 参数混入 ID 前评估权重。
7. `:where()` 用于明确的低权重基线。
8. Hover 不成为唯一反馈。
9. Focus Indicator 不无替代删除。
10. Generated Content 不承担必要业务文字。
11. Native Nesting 不进行字符串拼接，也不提供隔离。

---

## 10. Definition of Done

学习者能够：

- 拆解常见 Selector。
- 根据静态 DOM 准确预测 Match Set。
- 用 Styles 证明匹配结果。
- 正确处理 Attribute、Combinator、Structural、Functional 与 State Selector。
- 区分 Pseudo-class 与 Pseudo-element。
- 解释 Native Nesting 与 `&`。
- 区分 `:scope` 与 `@scope`。
- 识别 DOM Coupling、Specificity Debt 和 A11Y 风险。
- 完成 11 故障重构项目。
- 在尚未学习 JavaScript 的前提下完成全部课程。

---

## 11. Boundary Fix 记录

本次修复：

- KP001～KP003 删除 DOM Query API 作为必修证据。
- KP004 用静态前后队列替代脚本插入节点。
- KP005 用静态状态与 CSS `@supports` 替代脚本切换和支持检测。
- KP006 用浏览器原生状态替代 Event / Form API。
- KP007 将 scoped DOM query 后置 Stage 07。
- KP008 删除动态证据应用，改为静态 Broken / Solution。
- 删除 Module 内全部 `app.js`。

Module 04.02 已通过重新复审，随后才允许进入 04.03。
