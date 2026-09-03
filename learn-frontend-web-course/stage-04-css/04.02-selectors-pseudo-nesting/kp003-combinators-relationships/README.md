# KP003：Combinator——Descendant、Child 与 Sibling Relationship

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo 与 Native Nesting |
| Lesson | KP003 |
| 深度 | Must / Should |
| 主问题 | 空格、`>`、`+`、`~` 分别表达什么 DOM 关系，怎样避免深层结构耦合？ |
| 学习者技术边界 | HTML + CSS + DevTools |

> 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. 四类 Combinator

```text
A B   Descendant
A > B Child
A + B Adjacent sibling
A ~ B Subsequent sibling
```

Combinator 连接的是 Selector 片段，表达候选元素与其他元素之间的树关系。

---

## 2. 核心文件与运行

学习者修改：

```text
index.html
styles.css
```

运行：

```bash
npm run check
npm run dev
```

`server.mjs`、`verify.mjs` 只作为黑盒工具存在。

---

## 3. Descendant Combinator

```css
.toolbar .icon {}
```

匹配：

```text
任意 .icon
只要它位于 .toolbar 的任意深度后代中
```

它不要求直接父子关系。

### Failure Lab：范围过宽

如果 `.toolbar` 内部还有嵌套组件，所有深层 `.icon` 都可能被选中。

诊断：

1. 在 Elements 展开 `.toolbar`。
2. 分别选中直接 icon 与嵌套 icon。
3. 在 Styles 中确认二者都匹配 `.toolbar .icon`。
4. 改成 child selector，再比较。

---

## 4. Child Combinator

```css
.toolbar > .icon {}
```

只匹配直接子元素。

如果结构是：

```html
<div class="toolbar">
  <span class="icon direct-icon"></span>
  <div class="group">
    <span class="icon nested-icon"></span>
  </div>
</div>
```

结果：

```text
direct-icon 匹配
nested-icon 不匹配
```

Child Selector 更严格，但也意味着 HTML 层级变化可能使规则失效。是否使用取决于组件结构是不是稳定契约。

---

## 5. Adjacent Sibling `+`

```css
.release-heading + p {}
```

匹配：

```text
紧跟在 .release-heading 后面的第一个 p 兄弟
```

要求：

- 同一个父元素；
- 目标出现在后面；
- 中间不能隔其他元素；
- 目标还要满足 `p`。

---

## 6. Subsequent Sibling `~`

```css
.release-heading ~ p {}
```

匹配同一父元素下，位于 heading 之后的所有 `p` 兄弟。

它不是“任意后代”，也不会匹配 heading 之前的兄弟。

### `+` 与 `~` 对照

```text
+ 只看紧邻的一个候选位置
~ 看后续所有满足条件的兄弟
```

---

## 7. 阅读 Complex Selector

```css
.dashboard .panel .panel-body .title-wrap .panel-title {}
```

从右向左提出问题：

1. 候选元素是 `.panel-title`。
2. 它是否位于 `.title-wrap` 后代中？
3. 该结构是否继续位于 `.panel-body`、`.panel`、`.dashboard` 中？

这条规则虽然可以匹配，但暴露强 DOM Coupling。

如果组件身份已经由 `.panel-title` 清楚表达，长路径可能只是增加脆弱性与 Specificity。

---

## 8. Static Refactor Lab

本课页面同时保留：

```css
.dashboard .panel .panel-body .title-wrap .panel-title {}
.panel-title {}
```

操作：

1. 在 Styles 中观察两条规则。
2. 给 HTML 中间增加一层 wrapper。
3. 让深层路径因结构变化失效。
4. 确认稳定 class 仍然匹配。
5. 判断哪条规则更符合真实所有权。

无需通过脚本修改 DOM；直接编辑 HTML 并刷新更符合当前 Stage 顺序。

---

## 9. Evidence Contract

```text
Elements：确认父子 / 祖先 / 兄弟关系
Styles：确认对应 Complex Selector 是否匹配
手动移动元素：改变树关系
刷新：观察 Matched Rules 变化
```

不要仅凭颜色判断，因为多条规则可能产生相同视觉。

---

## 10. Production Boundary

- Descendant Selector 范围更广，不是默认更灵活。
- Child Selector 依赖直接层级，适合明确结构契约。
- Sibling Selector 只能表达同父兄弟关系。
- 四层以上路径通常需要审查 DOM Coupling。
- 组件身份优先由稳定 class / attribute 表达。
- 关系确实重要时，Combinator 才是正确工具。

---

## 11. Challenge

1. 构造一组直接子元素和嵌套后代。
2. 分别使用空格和 `>`。
3. 构造一个标题以及三个后续段落。
4. 分别使用 `+` 和 `~`。
5. 手动移动一个元素到不同父节点。
6. 在 Styles 中记录每条规则的匹配变化。
7. 把一条五层 Selector 重构成稳定组件 class。

---

## 12. Mastery Check

1. Descendant 与 Child 的候选范围有何不同？
2. `+` 为什么要求同父且紧邻？
3. `~` 会不会匹配目标之前的兄弟？
4. 深层 Selector 为什么容易随 DOM 重构失效？
5. 什么情况下应该保留关系 Selector，而不是一律改成单 class？
