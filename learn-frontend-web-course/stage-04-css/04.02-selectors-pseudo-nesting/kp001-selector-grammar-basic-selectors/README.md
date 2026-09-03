# KP001：Selector Grammar、Basic Selector 与 Compound Selector

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo 与 Native Nesting |
| Lesson | KP001 |
| 深度 | Must |
| 主问题 | 一条 Selector 由哪些部分组成，空格为什么会改变匹配关系？ |
| 学习者技术边界 | HTML + CSS + DevTools，不调用 DOM Query API |

> 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. 本课目标

你需要掌握：

```text
Type Selector
Universal Selector
Class Selector
ID Selector
Simple Selector
Compound Selector
Complex Selector
Selector List
```

并建立核心边界：

```text
Selector 决定谁进入声明竞争
Cascade 决定匹配声明中谁获胜
```

---

## 2. 核心文件

学习者只修改：

```text
index.html
styles.css
```

`server.mjs`、`verify.mjs`、`package.json` 是黑盒课程工具。

运行：

```bash
npm run check
npm run dev
```

---

## 3. Basic Selector

### Type Selector

```css
article {}
```

匹配所有 `article` 元素。

### Class Selector

```css
.selector-card {}
```

匹配 class token 中包含 `selector-card` 的元素。

### ID Selector

```css
#primary-card {}
```

匹配具有该 id 的元素。组件样式通常不应默认依赖高 Specificity 的 ID。

### Universal Selector

```css
* {}
```

匹配任意元素。它常用于基础规则，但不表示“没有成本与边界”。

---

## 4. Compound Selector

```css
.selector-card.featured
```

没有空格，表示同一个元素必须同时满足：

```text
class 包含 selector-card
并且
class 包含 featured
```

对比：

```css
.selector-card .featured
```

这里有空格，表示：

```text
某个 .featured 元素
并且它位于 .selector-card 后代中
```

这两条 Selector 的候选元素完全不同。

### DevTools 实验

1. 在 Elements 中选中 `class="selector-card featured"` 的元素。
2. 在 Styles 中查看 `.selector-card.featured` 是否匹配。
3. 再查看 `.selector-card .featured` 是否匹配同一元素。
4. 在该卡片内部新增一个 `<span class="featured">`。
5. 刷新后重新比较。

不需要编写查询脚本，Matched Rules 已经能直接证明结果。

---

## 5. Selector List

```css
.card,
.notice,
[data-state="active"] {
  border-radius: 12px;
}
```

逗号把多个完整 Selector 组成列表。

普通 Selector List 的解析边界很重要：

```css
.selector-list-invalid,
:totally-invalid-pseudo {
  color: red;
}
```

如果一个成员无法解析，整个 Rule 可能无效。

### Failure Lab

1. 先观察目标元素没有得到预期红色。
2. 在 Styles 中确认该规则没有正常成为 Matched Rule。
3. 删除非法成员。
4. 刷新后确认有效成员恢复。

---

## 6. Simple、Compound、Complex

### Simple Selector

单个匹配条件，例如：

```text
article
.featured
[data-state]
:first-child
```

### Compound Selector

多个 Simple Selector 作用于同一元素，中间没有 Combinator：

```css
article.selector-card[data-state="active"]
```

### Complex Selector

由 Compound Selector 和 Combinator 组合：

```css
.dashboard > article.selector-card
```

Combinator 在 KP003 完整学习。

---

## 7. Selector Evidence

本阶段使用：

```text
Elements 中确认真实 DOM
→ Styles 中确认 Matched Rules
→ 手动改 class / id / attribute
→ 刷新
→ 再确认匹配集合
```

不要把“元素看起来是蓝色”直接等同于“某条 Selector 匹配”。颜色也可能来自继承或其他规则。

---

## 8. Production Boundary

- 组件样式优先稳定 class，不默认用 ID。
- Compound Selector 用于表达同一元素的多条件。
- 空格是 Descendant Combinator，不是排版空白。
- Selector List 中的实验性成员需要考虑兼容和解析边界。
- 深层 DOM 路径不等于更专业。

---

## 9. Challenge

只使用 HTML 和 CSS：

1. 创建一个同时具有元素类型、两个 class 和一个属性的卡片。
2. 分别用 Type、Class、ID、Attribute、Compound Selector 匹配。
3. 故意把 Compound Selector 加一个空格。
4. 在 DevTools 中记录匹配前后差异。
5. 创建一个含非法成员的 Selector List，再完成修复。

---

## 10. Mastery Check

1. `.card.featured` 与 `.card .featured` 有什么差异？
2. Simple、Compound、Complex Selector 怎样区分？
3. Selector List 中的逗号表示什么？
4. 一个 Selector 不匹配时，Styles 面板会提供什么证据？
5. 为什么当前课不使用 DOM Query API？
