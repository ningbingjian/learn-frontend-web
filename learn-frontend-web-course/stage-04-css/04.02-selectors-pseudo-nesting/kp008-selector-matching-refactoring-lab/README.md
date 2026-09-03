# KP008：Module Project——Selector Matching & Refactoring Lab

## 0. 项目信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo 与 Native Nesting |
| Lesson | KP008 / Module Project |
| 深度 | Must / Should / Expert |
| 主问题 | 面对多类 Selector 故障，能否建立证据、完成最小修复并制定长期 Contract？ |
| 学习者技术边界 | 只使用 HTML、CSS、DevTools 与静态页面对照 |

> 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. 项目文件

学习者核心文件：

```text
index.html       Broken Baseline
styles.css       Broken CSS
solution.html    Reference Solution
solution.css     Fixed CSS
DIAGNOSTIC_REPORT.md
REFERENCE_SOLUTION.md
SELECTOR_CONTRACT.md
```

黑盒基础设施：

```text
package.json
server.mjs
verify.mjs
```

本项目没有 `app.js`，不要求 DOM API、事件脚本或自动证据面板。

---

## 2. 运行方式

```bash
npm run check
npm run dev
```

访问：

```text
http://localhost:4173/index.html
http://localhost:4173/solution.html
```

工作顺序：

```text
先只看 Broken
→ 写预测
→ 收集 DevTools 证据
→ 自己修复
→ 最后再打开 Solution 对照
```

---

## 3. 十一类故障

```text
S01 Invalid Selector List
S02 Attribute Substring Over-match
S03 Broad Descendant Leakage
S04 Structural Position as Business Identity
S05 :is() Specificity Trap
S06 :has() Direction Error
S07 Hover-only Interaction
S08 Focus Indicator Removal
S09 Generated-content-only Label
S10 Sass Concatenation Mental Model
S11 :scope Context Misunderstanding
```

---

## 4. 统一诊断法

对每个 Case 都执行：

```text
1. 定位目标 HTML
2. 写出期望 Match Set
3. 拆解 Selector
4. 标记 Subject
5. 标记 Combinator / Pseudo 参数
6. 在 Styles 中确认规则是否匹配
7. 如果匹配，判断是否被 Cascade 覆盖
8. 完成最小修复
9. 检查其他目标是否被误伤
10. 记录防复发 Contract
```

---

## 5. S01～S03：解析、属性与关系

### S01

普通 Selector List 中包含非法成员。不要通过“再加一条更强规则”掩盖 Parser 问题。

### S02

`[data-role*="admin"]` 把多个仅包含字符串的值一起命中。权限或角色应是 exact contract。

### S03

`.dashboard .title` 把嵌套 Widget 的标题一起选中。重构目标不是单纯缩短 Selector，而是恢复样式所有权。

---

## 6. S04～S06：结构、Specificity 与方向

### S04

`:nth-child(2)` 被错误地当成“当前发布”。插入一个说明元素后身份漂移。

### S05

`:is(.action, #legacy-action)` 因 ID 参数带来高权重。修复可以使用 `:where()` 或重新设计 Selector List。

### S06

`.status-error:has(.status-panel)` 把 Subject 写反。应从需要被选中的父面板出发。

---

## 7. S07～S09：A11Y Boundary

### S07

只有 Hover 状态提供明显反馈，键盘与触屏路径不完整。

### S08

`:focus { outline: none; }` 无替代删除焦点指示。

### S09

关键按钮文字只存在于 `content`。关闭 CSS 后按钮没有真实可见文本。

修复时必须把业务内容放回 HTML。

---

## 8. S10：Native Nesting

```css
.notice {
  &__label {}
}
```

这是 Sass 字符串拼接心智模型，不是 Native CSS Selector 组合。

修复：

```css
.notice {
  & > .notice__label {}
}
```

---

## 9. S11：`:scope` Boundary

Broken CSS：

```css
:scope > .scope-row {}
```

在普通顶层 Stylesheet 中，不能把当前 `.scope-zone` 想象成某次 DOM Query 的参考根。

当前需求只是文档中的直接父子关系，正确写法：

```css
.scope-zone > .scope-row {}
```

`:scope` 在 Element scoped query 中的完整使用延后 Stage 07。

---

## 10. 静态回归矩阵

| Case | Broken 页面 | Solution 页面 | 证据 |
| --- | --- | --- | --- |
| S01 | Rule 不生效 | Rule 生效 | Styles |
| S02 | 三项被误选 | 仅 admin | Elements + Styles |
| S03 | Widget 标题泄漏 | 所有权分离 | Styles |
| S04 | 身份随位置漂移 | 状态属性稳定 | DOM + Styles |
| S05 | 普通规则难覆盖 | 低权重基线 | Styles |
| S06 | 父面板不命中 | 父面板命中 | DOM + Styles |
| S07 | 仅 Hover | 基础 + Hover | 鼠标 / 键盘 |
| S08 | 无焦点指示 | Focus Visible | Tab |
| S09 | CSS 关闭后无文字 | HTML 保留文字 | Disable CSS |
| S10 | 嵌套规则无效 | 完整类名匹配 | Styles |
| S11 | 参考根假设错误 | 显式关系 | Styles |

---

## 11. 为什么删除动态 JavaScript

旧项目使用脚本：

```text
插入 DOM
切换状态
统计 Match Count
读取 Computed Style
检测 Selector Support
```

这些操作属于 Stage 05、07、09。

当前项目通过：

```text
静态 Broken / Solution
+ 手动 HTML / CSS 修改
+ DevTools
```

仍然完整保留所有 CSS 诊断目标，因此不应把后续技术作为前置。

---

## 12. 项目提交物

1. 完整 `DIAGNOSTIC_REPORT.md`。
2. 每个 Case 的预测 Match Set。
3. Styles / Computed / DOM 截图或文字记录。
4. 自己的修复版 HTML / CSS。
5. 回归矩阵。
6. 更新后的 Selector Contract。
7. 一段 Boundary Review：证明没有依赖未来 Stage 技术。

---

## 13. Definition of Done

你必须能够：

- 拆解全部 11 条问题 Selector。
- 区分 Parser、Match、Cascade 与 HTML Contract。
- 解释 `:is()`、`:has()`、Nesting 和 `:scope` 边界。
- 修复 Hover、Focus 与 Generated Content 风险。
- 证明修复没有扩大误匹配。
- 在完全不编写 JavaScript 的前提下完成项目。
