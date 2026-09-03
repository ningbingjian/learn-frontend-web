# KP006：Specificity、Inheritance 与 CSS-wide Keyword

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP006 |
| 深度 | Must / Should |
| Pattern | BROWSER-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | 当前面的 Cascade 条件打平后，Specificity 如何决胜；最终值又怎样受继承和 CSS-wide keywords 影响？ |
| 运行要求 | Node.js 20+，现代浏览器 |

---

## 1. 本课最终要做出什么

你会完成一个 **Specificity / Inheritance / CSS-wide Keywords Laboratory**：

1. 用真实 selector 计算 Specificity 并验证 winner。
2. 区分“继承属性”与“非继承属性”。
3. 实验 `inherit`、`initial`、`unset`、`revert`。
4. 制造一个 ID-based Specificity Debt。
5. 对比“继续加权重”与“降低组件基础规则权重”的架构差异。

本课不是教你背：

```text
inline = 1000
id = 100
class = 10
tag = 1
```

这种加法口诀。

更可靠的 selector Specificity 模型是逐列比较：

```text
ID column
Class / attribute / pseudo-class column
Type / pseudo-element column
```

从左到右决胜，而不是把它们当十进制整数相加。

---

## 2. 前置知识

KP005 已经证明：

```text
Origin / Importance / Layer / Context 等更早条件
可能在 Specificity 之前就淘汰 declaration。
```

所以本课的前提始终是：

> **只有仍处在同一个有资格竞争的 Cascade precedence 范围内，才开始比较 Specificity。**

---

## 3. 本课边界

### 本课完整学习

- ID / class / type 三列 Specificity；
- Source Order 与 Specificity 的先后；
- inline normal 的实务位置；
- inheritance 默认行为；
- inherited vs non-inherited property；
- `inherit`；
- `initial`；
- `unset`；
- `revert`；
- Specificity Debt；
- 用低 Specificity API 替代不断升级覆盖。

### 暂不展开

- `:is()` / `:where()` / `:not()` / `:has()` 的 Specificity：04.02 Selector。
- `revert-layer`：KP007。
- `@scope` / Scoping Proximity：KP007。
- computed / used / actual value 全链路：KP008。

`revert-rule` 已进入现代 CSS-wide keyword 讨论范围，但仍属于较新的能力；本课只在 Expert 边界提示，不把它作为生产基线。

---

## 4. 起始状态与最终文件

本课从独立空目录开始：

```text
kp006-specificity-inheritance-css-wide-keywords/
├── README.md
├── index.html
├── package.json
├── server.mjs
├── styles.css
└── verify.mjs
```

运行：

```bash
npm run check
npm run dev
```

打开：

```text
http://localhost:4173
```

---

## 5. Step 0：准备运行环境

创建 `package.json`：

```json
{
  "name": "css-kp006-specificity-inheritance",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node server.mjs",
    "check": "node verify.mjs"
  }
}
```

`server.mjs` 继续使用无依赖静态 HTTP Server；当前 Lesson 不依赖上一课运行目录。

---

## 6. Step 1：建立实验页面

`index.html` 分成五个区域：

```text
A Specificity
B Inheritance
C CSS-wide keywords
D Specificity Debt
E Fixed component API
```

Specificity 目标元素：

```html
<p id="specificity-target" class="specificity-target">
  这个元素同时命中 type + class、class 和 ID 三条规则。
</p>
```

Inheritance 目标：

```html
<section class="lab-section inheritance-parent">
  <div class="inheritance-child">
    子元素没有声明 color，也没有声明 border。
  </div>
</section>
```

CSS-wide keywords：

```html
<p class="keyword-inherit">inherit</p>
<p class="keyword-initial">initial</p>
<p class="keyword-unset">unset</p>
<p class="keyword-border-unset">unset on border</p>
<a class="revert-link" href="#revert-reference">revert link</a>
```

---

## 7. Step 2：Specificity 三列模型

在 `styles.css` 中加入：

```css
/* Specificity: 0-1-1 */
p.specificity-target {
  color: #0f766e;
}

/* Specificity: 0-1-0 */
.specificity-target {
  color: #b45309;
}

/* Specificity: 1-0-0 */
#specificity-target {
  color: #1d4ed8;
}
```

### Rule A：`p.specificity-target`

```text
0 ID
1 class
1 type
→ 0-1-1
```

### Rule B：`.specificity-target`

```text
0-1-0
```

虽然 B 写在 A 后面，但：

```text
0-1-1 > 0-1-0
```

所以 B 不能仅凭 Source Order 获胜。

### Rule C：`#specificity-target`

```text
1-0-0
```

从第一列开始比较：

```text
1 > 0
```

因此 ID rule 直接赢，不需要把后两列做“加法”。

### DevTools 验证

选择 `#specificity-target`：

```text
Elements → Styles
```

预期三条 `color` 都能看到，最终 `#specificity-target` 生效，其余被划掉。

---

## 8. 为什么不要把 Specificity 当十进制加法

不要把：

```text
1-0-0
```

理解成整数 `100`，然后做跨位数学。

规范心智是列式比较：

```text
先 ID 数量
相同再比较 class / attribute / pseudo-class
相同再比较 type / pseudo-element
```

因此：

```text
1-0-0
永远先于
0-N-M
```

这也是 ID selector 很容易制造 Specificity Debt 的原因。

---

## 9. Inline Style 怎么理解

页面还有：

```html
<p class="inline-specificity" style="color: #7c3aed;">
```

外部：

```css
.inline-specificity {
  color: #047857;
}
```

在 Author Normal 范围内，inline element-attached declaration 会压过普通 selector rule。

很多入门资料把 inline 记成：

```text
1-0-0-0
```

这可以作为记忆辅助，但不要把它误认为普通 selector 三列算法的一部分。

更准确的调试顺序仍然是：

```text
Cascade precedence
→ selector specificity
→ source order
```

---

## 10. Step 3：Inheritance

加入：

```css
.inheritance-parent {
  color: #7c3aed;
  border: 4px dashed #c4b5fd;
}

.inheritance-child {
  padding: 18px;
  background: #faf5ff;
}
```

子元素没有写 `color` 或 `border`。

预期：

```text
color  → 继承
border → 不继承
```

### 为什么 CSS 需要继承

文本相关属性如果完全不继承，就必须对每个后代元素重复字体、颜色等视觉信息。

继承允许内容树自然传递一部分文本表现。

### 为什么不是所有 Property 都继承

如果这些属性默认继承：

```text
margin
padding
border
width
position
```

父容器的盒模型很容易复制到所有后代，布局会迅速失控。

因此：

> 是否继承是 Property 自身定义的行为，不能靠直觉猜。

---

## 11. Step 4：`inherit`

```css
.keyword-inherit {
  color: inherit;
}
```

`inherit` 的含义：

```text
无论该 Property 默认是否继承
→ 当前元素都明确使用父元素的对应 computed value
```

所以它不只可用于 `color`；也可以强制某个默认不继承的 Property 取父级值。

---

## 12. Step 5：`initial`

```css
.keyword-initial {
  color: initial;
}
```

`initial` 表示：

```text
回到 CSS specification 为该 Property 定义的 initial value
```

它不是：

```text
“恢复浏览器对这个 HTML 标签的默认外观”
```

例如：

```text
display 的 initial value = inline
```

但 UA stylesheet 通常会给：

```text
div → display: block
table → display: table
```

所以 **initial value 与 UA stylesheet default 不是一回事**。

---

## 13. Step 6：`unset`

继承属性：

```css
.keyword-unset {
  color: unset;
}
```

因为 `color` 默认继承，所以这里：

```text
unset ≈ inherit
```

非继承属性：

```css
.keyword-border-unset {
  border: 4px solid #ef4444;
  border: unset;
}
```

`border` 默认不继承，所以：

```text
unset ≈ initial
```

红色 border 最终消失。

记忆模型：

```text
unset:
if property naturally inherits
    → inherit
else
    → initial
```

---

## 14. Step 7：`revert`

先有 Author rule：

```css
a {
  color: #7c3aed;
}
```

再有：

```css
.revert-link {
  color: revert;
}
```

`revert` 不是设置某个固定值，而是沿 Cascade Origin 回滚当前来源的影响。

当前规则来自 Author Origin，因此会尝试回到：

```text
User Origin（如果用户有自定义）
否则 UA / inherited / initial 形成的结果
```

所以链接通常会重新呈现浏览器 / 用户层的链接颜色。

### `revert` 与 `initial`

```text
initial
→ Property specification 的初始值

revert
→ 沿 Cascade Origin 回滚
```

它们是两个不同动作。

---

## 15. Step 8：Specificity Debt Failure Lab

Legacy 样式：

```css
#legacy-panel .component-button {
  background: #1e3a8a;
}

.component-button.action {
  background: #dc2626;
}
```

Specificity：

```text
#legacy-panel .component-button
= 1-1-0

.component-button.action
= 0-2-0
```

第二条虽然更晚，但第一列已经：

```text
1 > 0
```

所以状态 rule 失败。

### 错误修复

```css
.component-button.action {
  background: #dc2626 !important;
}
```

这不是解决 Specificity，而是直接跳到更高 Importance precedence。

以后别人为了覆盖它，还会继续升级。

---

## 16. Step 9：低 Specificity 修复模型

另一组：

```css
.fixed-button {
  background: #1e3a8a;
}

.fixed-button.action {
  background: #047857;
}
```

基础 rule：

```text
0-1-0
```

状态 rule：

```text
0-2-0
```

组件 API 变得可预测，不需要 ID，也不需要 `!important`。

这才是治理 Specificity Debt 的方向：

```text
降低基础规则权重
而不是让 override 无限加权
```

---

## 17. 完整运行与自动检查

`verify.mjs` 会确保：

```text
三组 specificity rule 存在
inline 实验存在
inherit / initial / unset / revert 存在
Legacy ID 故障存在
低 specificity 修复模型存在
```

执行：

```bash
npm run check
npm run dev
```

预期：

```text
✓ KP006 specificity, inheritance, CSS-wide keywords, and specificity-debt experiments are complete.
```

---

## 18. DevTools 验收

至少完成：

### Specificity

选择 `#specificity-target`：

```text
Styles → 找到 3 条 color
→ 记录被划掉的规则
→ 解释 winner
```

### Inheritance

选择 `.inheritance-child`：

```text
Computed → color
```

找到 inherited source。

再搜索 `border`，确认没有复制父级 border。

### CSS-wide

逐个检查：

```text
.keyword-inherit
.keyword-initial
.keyword-unset
.keyword-border-unset
.revert-link
```

### Failure

选择 `#legacy-panel .component-button`，说明 `.component-button.action` 为什么没赢。

---

## 19. CSS-wide Keyword 对照

| Keyword | 核心动作 |
| --- | --- |
| `inherit` | 明确取父元素对应 Property 的 computed value |
| `initial` | 使用该 Property 的 specification initial value |
| `unset` | inherited → inherit；non-inherited → initial |
| `revert` | 回滚当前 style origin |
| `revert-layer` | 回滚当前 Cascade Layer；KP007 |
| `revert-rule` | 回滚当前 rule 的影响；较新能力，生产前检查兼容性 |

`all` Property 可以把 CSS-wide keyword 一次应用给大多数 Properties，但 `all: unset` / `all: revert` 影响面很大，生产中必须谨慎。

---

## 20. Wrong Way

### Wrong Way 1：把 Specificity 当十进制加法

它是列式比较，不是普通整数。

### Wrong Way 2：选择器越长越强

```css
html body main section p
```

只有 type column；一个 ID 在第一列就能改变比较结果。

### Wrong Way 3：`inherit` = 恢复默认

`inherit` 是取父级。

### Wrong Way 4：`initial` = 浏览器默认

Specification initial value 与 UA stylesheet 不同。

### Wrong Way 5：Specificity 不够就 `!important`

这会把 selector 设计问题升级为 Importance governance 问题。

---

## 21. 更深原理：Inheritance 在值处理链的位置

粗略链路：

```text
declared values
→ cascade 找 winner
→ defaulting / inheritance
→ specified value
→ computed value
→ used value
→ actual value
```

本课先理解：

```text
没有 winning declaration 时
或显式使用 CSS-wide keyword 时
inheritance / defaulting 会影响指定结果
```

KP008 会把整条 Value Processing Pipeline 学完整。

---

## 22. Production Boundary

大型系统建议：

```text
组件基础 selector 保持低而稳定的 Specificity
状态变化使用可预测 class / attribute
避免 ID 参与日常组件样式
避免无边界嵌套 selector
不要把 !important 当 override API
Reset / third-party 用 Cascade Layer 治理
```

不要追求“全项目 Specificity 永远等于 0”。合理 Specificity 是 CSS 能力，目标是 **可预测、可删除、可覆盖**。

---

## 23. 本课只记住 3 件事

1. **Specificity 只有在更早 Cascade 条件打平后才比较，并按列从左向右决胜。**
2. **Inheritance 是 Property 自身定义的行为；`color` 会继承，不代表 `border` 也会。**
3. **`inherit`、`initial`、`unset`、`revert` 是四种不同的“值来源动作”。**

---

## 24. Challenge

1. 写出以下 selector 的 Specificity：
   - `article p.notice`
   - `.panel .notice`
   - `#app .notice`
2. 给 `.inheritance-child` 加 `border-color: inherit`，观察发生什么。
3. 把 `.keyword-initial` 的 Property 改成 `display`，对比 `initial` 与 UA stylesheet。
4. 给一个 `<h2>` 设置 `font-weight: normal`，再分别用 `unset` 与 `revert`，解释差异。
5. 重构 Legacy button，让整个组件不出现 ID 和 `!important` 仍能支持 default / danger / disabled 三种状态。

---

## 25. Mastery Check

- Specificity 为什么不能一上来就算？
- `0-10-0` 与 `1-0-0` 谁赢？为什么？
- 后写 rule 一定赢吗？
- inline normal 与 selector Specificity 应怎样区分？
- `color` 与 `border` 哪个默认继承？
- `inherit` 和 `unset` 什么时候结果一样？
- `initial` 为什么不等于 UA default？
- `revert` 回滚的是什么？
- Specificity Debt 为什么是架构问题，而不只是“样式写错”？

---

## 26. 参考资料

- MDN：Specificity — <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity>
- MDN：Inheritance — <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Inheritance>
- MDN：`initial` — <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/initial>
- MDN：`unset` — <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/unset>
- MDN：`revert` — <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/revert>
- MDN：`all` — <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/all>

---

## 27. 最终源码说明

最终源码同时保留：

```text
正确 Specificity 实验
Inheritance 对照
CSS-wide keyword 对照
Specificity Debt 故障
低 Specificity 修复模型
```

`#legacy-panel` 的高权重规则是受控 Failure Lab，不应在提交前“顺手优化掉”。
