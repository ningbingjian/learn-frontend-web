# KP003：Combinator——Descendant、Child、Adjacent 与 Subsequent Sibling

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Module | 04.02 Selector 完整体系 |
| Lesson | KP003 |
| 深度 | Must / Should |
| Pattern | BROWSER-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | Selector 怎样把 DOM 树中的结构关系转换成匹配条件？ |

---

## 1. 本课最终要做出什么

完成 **Combinator Relationship Laboratory**，真正区分：

```css
A B
A > B
A + B
A ~ B
```

分别表达后代、直接子元素、紧邻后续兄弟元素、任意后续兄弟元素。

---

## 2. 为什么 Combinator 是重要基础

很多 CSS bug 看起来像样式污染、组件串色、改 wrapper 全坏，根因其实是 Selector 描述的 DOM relation 比预期更宽或更窄。

`.component .icon` 不是“组件自己的 icon”，而是组件下任意深度的 `.icon` 后代。

---

## 3. DOM Tree 心智模型

```text
.toolbar
├── .icon.direct-icon
└── .menu
    └── .icon.nested-icon
```

`.toolbar .icon` 匹配两枚 icon；`.toolbar > .icon` 只匹配 direct child。

---

## 4. 起始状态

本课从零状态创建，运行：

```bash
npm run check
npm run dev
```

---

## 5. Descendant Combinator

```css
.toolbar .icon {}
```

空格表示在 `.toolbar` 的后代范围中匹配任意深度 `.icon`。

Console：

```js
document.querySelectorAll(".toolbar .icon")
```

---

## 6. Child Combinator

```css
.toolbar > .icon {}
```

`>` 表示直接 parent-child edge。

```js
document.querySelectorAll(".toolbar > .icon")
document.querySelector(".nested-icon").matches(".toolbar > .icon")
```

第二条返回 false。

---

## 7. Descendant vs Child Trade-off

Descendant 对中间 wrapper 不敏感，但匹配范围可能过宽；Child 关系明确，但增加一层 wrapper 后可能不再匹配。

关键问题是：组件 contract 到底承诺哪一种 DOM relation？

---

## 8. Adjacent Sibling `+`

```css
.release-heading + p {}
```

匹配紧接在 `.release-heading` 后面的第一个 `p` element sibling。

---

## 9. Subsequent Sibling `~`

```css
.release-heading ~ p {}
```

匹配同一个 parent 下，位于 `.release-heading` 后面的所有匹配 `p`。

---

## 10. `+` / `~` 都要求 Same Parent

CSS Selector 看 DOM，不看屏幕坐标。目标如果进入另一个 wrapper，即使视觉上仍在标题后面，也不会满足 sibling combinator。

HTML 格式化换行产生的 text node 不会破坏 `h3 + p`；真正影响它的是中间出现另一个 Element。

---

## 11. Failure Lab：Descendant Over-match

`.toolbar .icon` 未来如果嵌入第三方 menu component，其中 `.icon` 也会被匹配。

Selector correctness 有两个方向：

```text
False Negative
应该匹配却没匹配

False Positive
不应该匹配却匹配了
```

---

## 12. Failure Lab：DOM-coupled Deep Selector

源码故意保留：

```css
.dashboard .panel .panel-body .title-wrap .panel-title {}
```

它依赖整个 ancestor chain。删除一层 wrapper 后，即使 `.panel-title` 身份不变也可能失效。

对照：

```css
.panel-title {}
```

后者表达元素身份，而不是当前 DOM 路径。

---

## 13. 什么时候关系 Selector 合理

例如：

```css
.field > label {}
.tabs > [role="tab"] {}
.heading + .summary {}
```

如果 DOM relation 本来就是组件 public contract，关系 Selector 很自然。

问题是为了“更精确”把内部实现路径全部写进 Selector。

---

## 14. Selector Reading Algorithm

看到：

```css
.dashboard .panel > .header + .summary {}
```

要逐段明确目标元素、兄弟关系、父子关系和祖先范围，最终匹配的是 `.summary`，不是 `.dashboard`。

---

## 15. DevTools / Console Evidence

```js
document.querySelectorAll(".toolbar .icon")
document.querySelectorAll(".toolbar > .icon")
document.querySelectorAll(".release-heading + p")
document.querySelectorAll(".release-heading ~ p")
```

再用 `.matches()` 做单元素断言。

---

## 16. Performance 边界

不要把“Selector 越短一定越快”当作未经测量的性能结论。现代浏览器有复杂优化；本阶段优先关注 correctness、maintainability、DOM coupling、style leakage，Style Recalculation / Invalidation 性能测量留到 Stage 09 / 24。

---

## 17. 本课只记住 3 件事

1. 空格匹配任意深度 descendant，`>` 只匹配 direct child。
2. `+` 和 `~` 都要求 same parent；区别是紧邻还是任意后续。
3. Relation selector 最大工程风险通常是 DOM coupling 与误匹配。

---

## 18. Challenge

把深层 `.dashboard .panel .panel-body .title-wrap .panel-title` 重构成更稳定 Selector，然后增加/删除 wrapper，用 `element.matches()` 比较旧 Selector 与新 Selector。

---

## 19. Mastery Check

能准确回答 descendant/child/adjacent/subsequent sibling 的 DOM 条件、same-parent 限制、text node 影响，以及 deep selector 的工程风险。
