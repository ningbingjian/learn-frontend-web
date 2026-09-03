# KP002：Attribute Selector——Presence、Value、Token、Substring 与 Case Matching

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Module | 04.02 Selector 完整体系 |
| Lesson | KP002 |
| 深度 | Must / Should |
| Pattern | BUILD-LAB + FAILURE-LAB |
| 主问题 | 当状态已经存在于 HTML Attribute 中，怎样准确表达匹配条件？ |

---

## 1. 本课最终要做出什么

完成 **Attribute Selector Laboratory**，系统观察：

```text
[attr]
[attr="value"]
[attr~="token"]
[attr|="prefix"]
[attr^="prefix"]
[attr$="suffix"]
[attr*="substring"]
[attr="value" i]
```

重点不是背操作符，而是回答：这个 Attribute 的数据模型到底是“存在、单值、token list、语言前缀，还是任意字符串”？

---

## 2. 为什么 Attribute Selector 很重要

现代组件经常已经有 `aria-expanded`、`data-state`、`aria-invalid`、`lang` 等状态。如果为了 CSS 又复制一套 class，可能制造双状态源。

Attribute selector 可以直接消费已有状态，但它不是万能查询语言。本课会专门制造 `[data-user*="admin"]` 的 over-match 故障。

---

## 3. 本课边界

本课讲 Attribute Selector 的匹配语义，不展开 Form state pseudo-class、`:has()` 或完整 A11Y。

---

## 4. 起始项目

本课从新的最小项目开始：

```text
kp002-attribute-selectors/
├── README.md
├── index.html
├── styles.css
├── package.json
├── server.mjs
└── verify.mjs
```

运行：

```bash
npm run check
npm run dev
```

---

## 5. Presence Selector

```css
[data-state] {}
```

只问 attribute 是否存在，不关心值。

---

## 6. Exact Value

```css
[data-state="active"] {}
```

要求值准确等于 `active`，不是 substring。

---

## 7. Token Match `~=`

HTML：

```html
data-tags="urgent finance"
```

CSS：

```css
[data-tags~="urgent"] {}
```

它针对 whitespace-separated token list。

---

## 8. Hyphen Match `|=`

```css
[lang|="zh"] {}
```

匹配 `zh` 或 `zh-*`，典型场景是语言代码。

---

## 9. Case-insensitive Modifier

```css
[data-env="prod" i] h3 {}
```

HTML 中即使是 `data-env="PROD"`，ASCII case-insensitive 条件仍可匹配。

不要默认所有业务值都应该忽略大小写；这取决于数据语义。

---

## 10. Prefix / Suffix / Substring

```css
[data-code^="CN-"] {}
[href$=".pdf"] {}
[data-user*="admin"] {}
```

这些本质都是字符串条件，`*=` 尤其容易 over-match。

---

## 11. Failure Lab：Substring Over-match

页面有：

```text
admin
administrator
not-admin
```

源码：

```css
[data-user*="admin"] {}
```

Console：

```js
document.querySelectorAll('[data-user*="admin"]')
```

会匹配多个值，因为 Selector 只判断字符串中是否包含 `admin`，并不理解“用户角色”。

如果数据模型是精确 role，应该用：

```css
[data-user="admin"] {}
```

如果是 token list，才考虑 `~=`。

---

## 12. Attribute Selector 与 Class 的 Trade-off

视觉变体使用 class 往往足够；已经存在的机器状态 / DOM 状态使用 attribute 往往更直接。

如果已经存在 `aria-expanded="true"`，不要无意义复制 `class="expanded"`；但 CSS 选中了 ARIA attribute 也不等于已经完成 A11Y 设计。

---

## 13. DevTools Evidence

Console：

```js
document.querySelectorAll("[data-state]").length
document.querySelectorAll('[data-state="active"]').length
document.querySelectorAll('[data-tags~="urgent"]').length
document.querySelectorAll('[data-user*="admin"]').length
```

Selector Debug 的核心是比较“预期 match set”和“真实 NodeList”。

---

## 14. Wrong Way

- 把 substring 当 fuzzy business query。
- 为 CSS 制造 class/data/ARIA 三份重复状态。
- 用不稳定的内部 attribute 作为组件样式 public API。

---

## 15. Production Boundary

大型组件可以约定：class 表达组件身份，`data-state/data-size/data-variant` 表达稳定状态，ARIA/native attribute 表达语义与可访问状态。

关键不是选哪一种，而是状态源清晰、属性语义稳定、selector 不猜字符串。

---

## 16. 本课只记住 3 件事

1. Attribute operator 必须对应真实数据模型。
2. `~=` 是 token match，`*=` 只是 substring match。
3. Attribute selector 能复用已有 DOM state，但不能替代语义设计。

---

## 17. Challenge

把 `[data-user*="admin"]` 重构为不会误伤 `administrator` 与 `not-admin` 的 selector；再新增 `.pdf/.csv` 链接，只匹配 `.pdf`，用 `querySelectorAll()` 提交匹配数量证据。

---

## 18. Mastery Check

能回答 `[attr]`、`[attr="x"]`、`~=`、`|=`、`^=`、`$=`、`*=`、`i` 的语义，并解释 substring over-match 的根因。

---

## 19. 参考

- W3C Selectors Level 4：Attribute selectors
- MDN：Attribute selectors
