# KP009：Module Project——First Stylesheet Diagnostic Lab

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP009 |
| 深度 | Must / Should / Expert 综合 |
| Pattern | PROJECT-LAB + FAILURE-LAB |
| 主问题 | 面对一个同时存在多种 CSS 故障的页面，能否不靠试值，按证据链完成系统诊断？ |
| 运行要求 | Node.js 20+，现代浏览器，DevTools |

---

## 1. 这是 Module 04.01 的毕业项目

前八课分别拆开研究：

```text
CSS 的职责
Stylesheet 接入
Rule / Declaration
Shorthand / Longhand
Origin / Importance / Context
Specificity / Inheritance
Cascade Layer / @scope
CSSOM / Value Processing
```

真实项目不会告诉你“现在这是 Specificity 题”，只会说：

> 页面样式不对。

所以本课提供一个故意损坏的页面，要求：

```text
观察症状
↓
建立假设
↓
收集证据
↓
分类根因
↓
做最小修复
↓
回归
↓
写防复发规则
```

---

## 2. 最终交付物

你必须完成：

```text
1. Broken Baseline 可运行
2. C01～C09 九个 Case 的诊断
3. DIAGNOSTIC_REPORT.md
4. 每个 Case 的 DevTools / Network / CSSOM 证据
5. 最小修复
6. 回归检查
7. 架构 / 规范复盘
```

仓库还提供 `solution.html / solution.css / REFERENCE_SOLUTION.md`，但只能在完成自己诊断后阅读。

---

## 3. 项目文件

```text
kp009-first-stylesheet-diagnostic-lab/
├── README.md
├── index.html
├── styles.css
├── theme.css
├── solution.html
├── solution.css
├── DIAGNOSTIC_REPORT.md
├── REFERENCE_SOLUTION.md
├── package.json
├── server.mjs
└── verify.mjs
```

Broken 与 Reference 都位于当前 Lesson，独立运行，不依赖上一课。

---

## 4. Step 0：运行自动检查

```bash
npm run check
```

预期：

```text
✓ KP009 broken baseline, nine fault cases, report template, and reference solution are complete.
```

这里 `check passed` 不是说 Broken Baseline 没问题，而是证明九个故障条件和参考解都完整存在。

---

## 5. Step 1：启动 Broken Baseline

```bash
npm run dev
```

打开：

```text
http://localhost:4173
```

先不要打开 `/solution.html`。

建议固定 DevTools：

```text
Elements
Network
Console
```

---

## 6. 诊断纪律

每个 Case 必须遵守：

```text
症状
↓
至少两个假设
↓
证据
↓
排除错误假设
↓
根因
↓
最小修改
↓
回归
```

禁止：

```text
颜色不对 → 直接改颜色
覆盖冲突 → 直接 !important
selector 不赢 → 直接加 ID
```

项目评分看诊断过程，不是页面好不好看。

---

## 7. C01：Stylesheet URL / 404

Theme 视觉没有出现。

必须回答：

1. DOM 是否存在？
2. `<link>` 请求了哪个 URL？
3. Network Status 是什么？
4. `theme.css` 文件是否真实存在？
5. 问题属于 Network、Parser 还是 Cascade？

强制证据：

```text
Request URL
HTTP Status
Initiator
```

不能通过在 `styles.css` 重写 Theme 样式来“修复”，因为那没有修复资源根因。

---

## 8. C02：Source Order

症状：Internal CSS 定义紫色，最终却不是紫色。

要求先比较：

```text
Origin
Importance
Layer
Specificity
Source Order
```

Internal 与 External 并不是两个独立 Origin；它们都可以属于 Author Origin。

当其他条件相同，document order 决定结果。

---

## 9. C03：Importance

页面中有：

```html
style="color: #047857;"
```

但最终不是绿色。

你必须解释：

```text
inline normal
vs
author important
```

谁在哪个 Cascade 阶段获胜。

禁止通过给 inline 再加 `!important` 升级战争。

---

## 10. C04：Specificity

状态元素：

```html
<p class="state-target active">
```

状态规则写在后面仍未获胜。

计算：

```text
#specificity-zone .state-target
vs
.state-target.active
```

使用 A-B-C 列模型，不使用“100 分 / 20 分”的十进制误导说法。

---

## 11. C05：Inheritance

父元素设置 `color`，子元素却不是同色。

排查：

```text
color 是否 inherited？
子元素是否已有自己的 cascaded declaration？
是否应该删除 child declaration？
是否需要 color: inherit？
```

Inheritance 不是更高优先级 declaration；它是在相应阶段为缺失值补值。

---

## 12. C06：Invalid Declaration

目标有两个 `background` declaration，其中一个 value 故意无效。

至少使用 Styles + Computed（或 CSSOM）说明：

```text
为什么一个 declaration 失败
但整个 ruleset 没有失败
```

---

## 13. C07：Shorthand Reset

症状：Gradient 消失。

检查：

```text
background-image
background
```

回答：

1. 哪条先出现？
2. Shorthand 覆盖哪些 longhand？
3. 为什么 `background` 不是“只改背景色”？
4. 应该使用 `background-color` 还是完整 shorthand？

---

## 14. C08：Cascade Layer Order

Broken Baseline：

```css
@layer app, vendor;
```

先画 Layer Order，再看 selector。

normal declaration 中 vendor 更晚，因此优先级更高。

禁止通过增加 ID、selector 深度或 `!important` 修复错误 Layer Contract。

---

## 15. C09：Scoping Proximity

团队知道“更近 scope root 更高”，于是认为 inner scope 一定赢。

但必须回到顺序：

```text
Layer
↓
Specificity
↓
Scoping Proximity
↓
Source Order
```

Broken outer scoped selector Specificity 更高，所以 Scope Proximity 根本还没有机会决定结果。

只有前面的条件相同，Scoping Proximity 才参与决胜。

---

## 16. Milestone 1：只分类，不修复

第一轮禁止修改源码。

先在 `DIAGNOSTIC_REPORT.md` 给 C01～C09 分类：

```text
Network
Parser / Invalid Value
Source Order
Importance
Specificity
Inheritance
Shorthand
Layer Architecture
Scope
```

先定位层次，再动代码。

---

## 17. Milestone 2：收集证据

| Case | 首选证据 |
| --- | --- |
| C01 | Network |
| C02 | Styles |
| C03 | Styles |
| C04 | Styles + Specificity |
| C05 | Styles + Computed |
| C06 | Styles + Computed |
| C07 | Styles 展开 longhand |
| C08 | Styles Layer |
| C09 | Styles + Scope / Specificity |

不能九个 Case 全写“肉眼颜色不对”。

---

## 18. Milestone 3：最小修复

最小修复：

> 修改最接近根因的位置，不引入新的覆盖债务。

例如：

```text
URL 错 → 修 URL
Layer Order 错 → 修 Layer Order
Value 错 → 修 Value
Specificity Debt → 降低基础 selector
```

---

## 19. Milestone 4：回归

每修一个 Case 都重新确认：

```text
当前 Case 已修复
其他 Case 没被意外改变
```

即使当前没有完整 Visual Regression，也要建立 Regression Thinking。

---

## 20. Reference Solution

完成自己的报告后再打开：

```text
http://localhost:4173/solution.html
```

并阅读：

```text
REFERENCE_SOLUTION.md
```

Reference 不是唯一正确实现；如果你的方案根因正确、修改更小、没有制造新债务，也可以更好。

---

## 21. 评分 Rubric（100）

- 根因分类：20。
- 真实证据：25。
- 最小修复：20。
- 回归：15。
- Production Prevention：10。
- 复盘表达：10。

重点看诊断推理和证据，而不是最终颜色。

---

## 22. Architecture Review

完成后回答：

1. Vendor CSS 应位于哪个 Layer，为什么？
2. 哪些样式允许不进入 Layer？
3. `!important` 的合法边界是什么？
4. Component Selector 的 Specificity Budget 是多少？
5. `@scope` 的旧浏览器 fallback 策略是什么？
6. Override 如何设置 Owner 和退出机制？

---

## 23. Module 04.01 最终心智模型

```text
HTML
→ DOM

CSS Resource
→ Parser
→ CSSOM
→ Selector Matching
→ Declared Values
→ Origin / Importance
→ Context
→ Layer
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

这就是 Module 04.01 的闭环。

---

## 24. 以后排查 CSS 的固定顺序

```text
1. 元素对不对？
2. CSS 资源加载了吗？
3. Rule 进入 CSSOM 了吗？
4. Selector 匹配了吗？
5. Declaration 有效吗？
6. Origin / Importance / Context 是什么？
7. Layer 是什么？
8. Specificity 谁高？
9. Scope Proximity 是否参与？
10. Source Order 谁晚？
11. Inheritance / CSS-wide keyword？
12. Computed-value Time 是否失效？
13. Used Value / Layout 是否改变最终结果？
```

先问在哪一层失败，再改代码。

---

## 25. Definition of Done

```text
□ npm run check 通过
□ Broken Baseline 能访问
□ C01～C09 均有诊断
□ 每个 Case 有真实证据
□ 每个 Case 有最小修复
□ 每个 Case 有回归
□ 完成 DIAGNOSTIC_REPORT.md
□ 最后才阅读 Reference Solution
□ Reference Solution 能访问
□ 能口述 Module 04.01 心智模型
```

---

## 26. 下一步

完成 KP009：

```text
Module 04.01
= 9 / 9
= COMPLETE
```

下一 Module：

```text
04.02 Selector、关系匹配、Pseudo、Nesting 与 Scope
```

04.02 不会重新讲 Cascade 基础。

---

## 27. 最终源码

```bash
npm run check
npm run dev
```

Broken：`http://localhost:4173`  
Reference：`http://localhost:4173/solution.html`

当前 Project 独立运行，不依赖上一 Lesson。
