# Module 04.01：CSS 语言、样式表与级联体系

> Stage：[Stage 04 CSS 完整体系](../README.md)  
> 状态：✅ 已完成  
> 当前完成：KP001～KP009 / 9 课  
> Boundary：[STAGE_BOUNDARY.md](../STAGE_BOUNDARY.md)  
> Module Review：[MODULE_REVIEW.md](./MODULE_REVIEW.md)

---

## 1. Module Teaching Contract

### 1.1 唯一主题

本 Module 只解决：

> 一条 CSS 声明怎样从 Stylesheet 进入浏览器，经过解析、匹配、级联、继承和值处理，最终成为元素的真实样式？

学习链：

```text
HTML / Stylesheet
→ Resource Loading
→ CSS Parsing
→ Selector Match
→ Declared Values
→ Origin / Importance
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

### 1.2 Stage 04 学习者边界

本 Module 的学习者只需要：

```text
HTML
CSS
DevTools Elements / Styles / Computed / Network
手动编辑源码
刷新与视觉对照
```

不要求编写或理解：

```text
JavaScript
DOM / Event API
CSSOM 编程 API
Shadow DOM / Web Components
CI 配置
```

`server.mjs`、`verify.mjs` 和 GitHub Actions 是课程维护基础设施，只需执行命令。

---

## 2. Scope

### 本 Module 完整拥有

- CSS 与 HTML 的职责边界。
- Inline / Internal / External Stylesheet。
- Rule、Selector、Declaration、Property、Value。
- Shorthand / Longhand、注释、At-rule。
- Parser Error Recovery。
- Origin、Importance、Source Order。
- Specificity。
- Inheritance。
- CSS-wide Keywords。
- Cascade Layer、`@scope`、Scoping Proximity、`revert-layer`。
- Declared / Cascaded / Specified / Computed / Used / Actual Value。
- CSSOM 概念。
- DevTools 驱动的“CSS 不生效”诊断树。
- Module Project。

### 明确后置

- CSSOM JavaScript API：Stage 09。
- DOM / Event / Form API：Stage 07。
- Shadow DOM / Encapsulation Context 实验：Stage 13。
- 完整测试工程：Stage 17。
- CI/CD：Stage 26。

---

## 3. Lesson 路线

| 编号 | Lesson | 深度 | 状态 |
| --- | --- | --- | --- |
| KP001 | [CSS 是什么](./kp001-what-is-css/) | Must | ✅ |
| KP002 | [CSS 怎样进入页面](./kp002-attach-stylesheet/) | Must | ✅ |
| KP003 | [Rule、Declaration、Property 与 Value](./kp003-rules-declarations-properties-values/) | Must | ✅ |
| KP004 | [Shorthand、Longhand、注释与 At-rule](./kp004-shorthand-longhand-at-rules/) | Must | ✅ |
| KP005 | [Origin、Importance 与 Source Order](./kp005-origin-importance-context-source-order/) | Must / Should | ✅ |
| KP006 | [Specificity、Inheritance 与 CSS-wide Keyword](./kp006-specificity-inheritance-css-wide-keywords/) | Must / Should | ✅ |
| KP007 | [Cascade Layer、`@scope` 与 `revert-layer`](./kp007-cascade-layer-scope-revert-layer/) | Should / Expert | ✅ |
| KP008 | [CSS Error Recovery 与 Value Processing](./kp008-css-error-recovery-cssom-value-pipeline/) | Should / Expert | ✅ |
| KP009 | [First Stylesheet Diagnostic Lab](./kp009-first-stylesheet-diagnostic-lab/) | 全层级 | ✅ |

完成度：

```text
9 / 9
100%
```

---

## 4. Evidence Contract

### 允许的学习者证据

```text
Elements → DOM Tree
Elements → Styles
Elements → Computed
Network → Stylesheet Request
手动禁用 / 修改 CSS Declaration
手动修改 class / attribute / source order
静态页面对照
```

### 不再作为前置的证据

```text
通过 JavaScript访问 Stylesheet 对象
通过 DOM API 输出匹配数量
通过脚本动态插入节点
通过 Shadow DOM 构造封装上下文
```

这些能力后置到各自 Owner Stage。

---

## 5. Failure Lab 分布

- KP002：Stylesheet 路径错误与 Source Order。
- KP003：无效 Selector List、未知 Property、无效 Value。
- KP004：Shorthand Reset。
- KP005：Importance 与 Inline / Source Order 误判。
- KP006：Specificity Debt、Inheritance 与 CSS-wide Keyword 误判。
- KP007：Layer 顺序、Important Layer 反转、Scope Proximity。
- KP008：Parser Error、Declaration Error、Computed-value-time Failure。
- KP009：九类故障综合诊断。

所有 Failure 均可只用 HTML、CSS 与 DevTools 完成。

---

## 6. 运行方式

进入任意 Lesson：

```bash
npm run check
npm run dev
```

默认地址：

```text
http://localhost:4173
```

边界说明：

- `npm run check` 只验证课程文件没有被误删。
- 不要求学习者阅读 `verify.mjs`。
- `npm run dev` 只启动静态文件服务器。
- 不要求学习者阅读 `server.mjs`。

---

## 7. Module Project

项目：

```text
First Stylesheet Diagnostic Lab
```

故障范围：

```text
Stylesheet 404
Source Order
Importance
Specificity
Inheritance
Invalid Declaration
Shorthand Reset
Layer Order
Scope Proximity
```

提交物：

1. 症状。
2. Styles / Computed / Network 证据。
3. 级联推导。
4. 根因分类。
5. 最小修复。
6. 回归记录。
7. 防复发约束。

不要求 JavaScript 诊断脚本。

---

## 8. Definition of Done

完成本 Module 后，学习者能够：

- 判断 Stylesheet 是否真正加载。
- 拆解 CSS Rule 与 Declaration。
- 区分 Selector Match、Declaration Validity 与 Cascade。
- 按正确顺序分析 Origin、Importance、Layer、Specificity、Scope 与 Source Order。
- 解释 Inheritance 和 CSS-wide Keywords。
- 解释 Value Processing Pipeline。
- 使用 Styles / Computed / Network 定位问题。
- 完成多故障静态页面诊断。
- 在尚未学习 JavaScript 的情况下完成全部课程。

---

## 9. Boundary Fix 记录

本 Module 已完成 Stage 04 Boundary Fix：

- KP003 删除 CSSOM JavaScript API 教学步骤。
- KP005 删除 Declarative Shadow DOM 与 `:host` 必做实验。
- KP008 删除 `app.js` 和 CSSOM 编程接口实验。
- Evidence 统一改为 DevTools 与静态 HTML/CSS。
- 后续技术只保留明确的 Owner Stage 说明。
