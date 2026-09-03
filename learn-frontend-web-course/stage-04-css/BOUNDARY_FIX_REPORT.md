# Stage 04 Boundary Fix Report

> 审计范围：当前已完成的 17 个 CSS Lesson  
> 目标：删除 Stage 04 学习路径中的 JavaScript、DOM API、CSSOM API、Shadow DOM 与 CI/CD 前置依赖  
> 结论：PASS

---

## 1. 为什么修复

之前部分 CSS Lesson 为了生成动态证据，提前引入了：

```text
app.js
DOM Query / Mutation / Event API
Form API
CSSOM / Computed Style API
Shadow DOM / :host
GitHub Actions 课程化表述
```

这些技术可以帮助维护课程，但不是学习 CSS 的必要前置，并且各自有后续 Owner Stage。

---

## 2. 修复原则

```text
保留 CSS 深度
删除不必要的未来技术依赖
用静态 HTML 状态、浏览器原生状态和 DevTools 替代编程证据
把运行与验证脚本降级为黑盒基础设施
```

---

## 3. 17 课审计结果

### Module 04.01

| Lesson | 审计结果 | 处理 |
| --- | --- | --- |
| KP001 | PASS | 保留 HTML / CSS / DevTools 主线 |
| KP002 | PASS | 保留 Network / Stylesheet 实验 |
| KP003 | FIXED | 删除 CSSOM API 证据，改用 Styles / Computed |
| KP004 | PASS | `@supports` 保持 CSS 语法边界 |
| KP005 | FIXED | 删除 Shadow DOM / `:host` 实验 |
| KP006 | PASS | 保留纯 CSS Specificity / Inheritance |
| KP007 | PASS | 保留 `@layer` / `@scope` CSS 实验 |
| KP008 | FIXED | 删除 `app.js` 与 CSSOM 编程接口 |
| KP009 | PASS | 保留静态多故障诊断项目 |

### Module 04.02

| Lesson | 审计结果 | 处理 |
| --- | --- | --- |
| KP001 | FIXED | DOM Query 证据改为 Styles Matched Rules |
| KP002 | FIXED | Match Count 改为属性静态对照 |
| KP003 | FIXED | 脚本证据改为手动树关系修改 |
| KP004 | FIXED | 动态插入改为静态队列 A / B |
| KP005 | FIXED | 状态切换改为静态面板；支持检测改为 CSS `@supports` |
| KP006 | FIXED | Event / Form API 改为浏览器原生状态 |
| KP007 | FIXED | scoped DOM query 后置 Stage 07 |
| KP008 | FIXED | 删除动态证据 App，改为静态 Broken / Solution |

---

## 4. 删除的学习者可见依赖

- Stage 04 Lesson 下全部 `app.js`。
- HTML 中用于课程逻辑的 `<script>`。
- DOM Query、Mutation、Event、Form API 必做步骤。
- CSSOM JavaScript API 必做步骤。
- Declarative Shadow DOM、`:host` 必做实验。
- 通过 JavaScript 检测现代 Selector 支持。
- 通过脚本输出 Match Count 或 Computed Style。

---

## 5. 保留的课程深度

```text
Cascade / Layer / Scope / Value Pipeline
Selector Grammar / Attribute / Combinator
Structural / Functional / Relational Pseudo
Focus / Form State / Pseudo-element
Native Nesting / & / :scope 概念
Failure Lab / A11Y / Governance
Module Project / Diagnostic Report / Contract
```

修复不是降级课程，而是让技术顺序正确。

---

## 6. 黑盒基础设施

以下内容保留：

```text
server.mjs
verify.mjs
package.json
GitHub Actions
```

它们只负责：

- 静态文件服务。
- 文件完整性与故障样本保护。
- 仓库回归检查。

它们不进入学习目标、Challenge 或 Mastery Check。

---

## 7. 自动防复发

新增 Boundary Gate：

```text
boundary-check.mjs
```

它在 Pull Request 和 main Push 中运行，阻止：

- `app.js` 回到 Stage 04。
- HTML `<script>` 回到 CSS Lesson。
- Shadow DOM / `:host` 回到 Stage 04 实验。
- 后续 API 被重新写成 Lesson 必修步骤。

---

## 8. 最终结论

```text
Stage 04 已完成 17 课边界审计
04.01 与 04.02 重新通过 Module Review
学习者可以在尚未学习 JavaScript 的情况下完成全部现有 CSS 课程
```

在该修复合并后，才允许继续 Module 04.03。
