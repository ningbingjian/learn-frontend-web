# KP001：Selector Grammar、Type、Class、ID、Universal 与 Compound Selector

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo、Nesting 与 `:scope` |
| Lesson | KP001 |
| 深度 | Must |
| Pattern | BUILD-LAB + FAILURE-LAB |
| 主问题 | 浏览器看到一个 Selector 时，最基础的匹配单位是什么？ |
| 运行要求 | Node.js 20+，现代浏览器 |

---

## 1. 本课最终要做出什么

你会完成一个 **Selector Grammar Laboratory**，在同一个最小页面里观察 Type、Class、ID、Universal、Compound 与 Selector List，并通过一个故意损坏的 selector list 证明：Selector 解析失败会直接改变整条规则是否存在。

核心心智模型：

```text
Selector Source
→ Parse
→ Match Set
```

---

## 2. 本课解决什么问题

很多初学者会把下面两条当成“差不多”：

```css
.card.featured {}
.card .featured {}
```

实际上：

```text
.card.featured
= 同一个元素同时拥有 card 和 featured

.card .featured
= featured 元素位于 card 元素的后代中
```

这是后续所有 Combinator、Pseudo 与 Nesting 的语法基础。

---

## 3. 前置知识与本课边界

需要已经完成 Module 04.01，知道 Rule / Selector / Declaration、Cascade / Specificity 和 DevTools Styles / Computed。

本课只回答“谁被匹配”；已经匹配的规则最后谁获胜，回到 04.01 的 Cascade 模型。

---

## 4. 术语先建立

### Simple Selector

单个匹配条件：

```css
article
.selector-card
#primary-card
*
```

### Compound Selector

多个 simple selector 连在一起、没有 combinator：

```css
article.selector-card.featured
```

表示同一个元素同时满足所有条件。

### Complex Selector

由 combinator 连接多个 compound selector，例如：

```css
.card .featured
```

完整 Combinator 在 KP003。

### Selector List

逗号分隔：

```css
h1,
h2,
.hero-title {}
```

多个 Selector 共用 declaration block。

---

## 5. 最终文件

```text
kp001-selector-grammar-basic-selectors/
├── README.md
├── index.html
├── styles.css
├── package.json
├── server.mjs
└── verify.mjs
```

---

## 6. Step 0：从零建立项目

进入目录后执行：

```bash
npm run check
npm run dev
```

访问：

```text
http://localhost:4173
```

---

## 7. Step 1：创建 DOM 实验对象

核心对象：

```html
<article class="selector-card featured" id="primary-card">
  ...
</article>
```

它同时满足多个 selector。

Console：

```js
document.querySelectorAll("article").length
document.querySelectorAll(".selector-card").length
document.querySelectorAll("#primary-card").length
```

同一个 DOM Element 可以同时属于多个 selector 的 match set。

---

## 8. Step 2：Type / Class / ID Selector

```css
article { ... }
.selector-card { ... }
#primary-card { ... }
```

在 DevTools Styles 中选中 `#primary-card`，应该同时看到多组 matched rules。

这证明：

```text
Matching ≠ Winner Selection
```

---

## 9. Step 3：Compound 与 Descendant

```css
.selector-card.featured { ... }
.selector-card .featured { ... }
```

页面分别提供同元素多 class 与后代 class 两种 DOM 结构。

Console：

```js
document.querySelectorAll(".selector-card.featured")
document.querySelectorAll(".selector-card .featured")
```

两个 NodeList 不相同。

---

## 10. Universal Selector

```css
.evidence * {
  line-height: 1.65;
}
```

`*` 本质是 selector，不是“reset 专用语法”。

---

## 11. Selector List

```css
.selector-list-valid,
.compound-target {
  color: #166534;
}
```

两个 selector 都有效，因此规则正常进入 CSSOM。

---

## 12. Failure Lab：Invalid Selector List

源码故意保留：

```css
.selector-list-invalid,
:totally-invalid-pseudo {
  color: #b91c1c;
}
```

普通 selector list 中有 invalid selector 时，整个 selector list 对应 ruleset 都无效，而不是“只忽略错误项”。

Console 观察 CSSOM：

```js
[...document.styleSheets[0].cssRules]
  .map(rule => rule.selectorText)
  .filter(Boolean)
```

区分：

```text
selector parse failure
vs
selector valid but matches zero elements
```

---

## 13. Wrong Way：没匹配就加 `!important`

如果 selector 根本没有匹配目标元素，`!important` 没有帮助。

诊断顺序：

```text
Selector 是否 valid？
↓
Selector 是否 match？
↓
匹配后才讨论 Cascade
```

---

## 14. DevTools 诊断方法

可能有三种状态：

```text
规则不存在
→ parse / resource 问题

规则存在但目标 Styles 没有
→ selector 不匹配

规则匹配但 declaration 被划掉
→ Cascade 问题
```

---

## 15. Production Boundary

ID selector 可以工作，但大型组件样式默认不应该因为“优先级高”而选择 ID，因为会增加复用与覆盖成本。

Selector 越长也不等于越稳定：

```css
#app .dashboard main .panel .header h2.title {}
```

DOM 改一层就可能失效。

---

## 16. 本课只记住 3 件事

1. Selector 先决定 match set，Cascade 后决定 winner。
2. `.a.b` 是同一元素的条件交集；`.a .b` 是 DOM 关系。
3. 普通 selector list 里一个 invalid selector 可能让整个 ruleset 无效。

---

## 17. Challenge

不修改 HTML，写 Selector 分别只选第一个 article、同时拥有 selector-card 和 featured 的元素、selector-card 内部的 featured 后代，并用 `querySelectorAll()` 证明结果。

---

## 18. Mastery Check

你应该能回答 Type/Class/ID/Universal 分别匹配什么、`.a.b` 与 `.a .b` 差异、Selector List 的语义、invalid selector list 为什么不能靠 `!important` 修复，以及 `matches()` / `querySelectorAll()` 怎样帮助 Debug。

---

## 19. 参考

- MDN：CSS selector structure
- MDN：Selector list
- W3C：Selectors Level 4

`:is()` / `:where()` 的 forgiving selector list 在 KP005 系统讲解。
