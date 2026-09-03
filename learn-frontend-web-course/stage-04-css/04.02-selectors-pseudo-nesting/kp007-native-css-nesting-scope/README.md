# KP007：Native CSS Nesting、`&`、`:scope` 与 Selector Context

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo、Nesting 与 `:scope` |
| Lesson | KP007 |
| 深度 | Should / Expert |
| Pattern | BUILD-LAB + BROWSER-MECHANISM-LAB + ARCHITECTURE-LAB + FAILURE-LAB |
| 主问题 | 原生 CSS Nesting 怎样建立 Selector Context，`&` 到底代表谁，`:scope` 又如何明确一次 DOM 查询的引用根？ |
| 运行要求 | Node.js 20+，支持现代 CSS Nesting 的浏览器 |

---

## 1. 本课最终要做出什么

你会完成一个 **Native CSS Nesting / `&` / `:scope` Laboratory**。

最终页面包含六组可验证实验：

1. 隐式后代 Nesting。
2. `&:hover`、`&[data-state]`、`& > child` 与 `.theme-dark &`。
3. Nesting 不提供组件隔离的泄漏实验。
4. 父 Selector List 通过 `&` 影响 Specificity 的实验。
5. Sass `&__element` 字符串拼接迁移失败实验。
6. `Element.querySelectorAll(":scope > ...")` 的 Scoped Query 实验。

本课结束后，你不能只说：

> “Nesting 就是把 CSS 缩进起来。”

而要能够把任何嵌套规则还原为真实 Selector，并回答：

```text
父 Selector 是什么？
内层 Selector 是隐式后代、Relative Selector，还是显式使用 &？
& 在组合后的 Selector 中处于哪里？
最终匹配的 Subject 是谁？
父 Selector List 是否把更高 Specificity 带进来？
当前使用的是 :scope pseudo-class，还是 @scope at-rule？
```

---

## 2. 最重要的边界

### 2.1 Nesting 是 Selector 语法，不是字符串模板

原生 CSS Nesting 让一条 Style Rule 可以包含另一条 Style Rule。

```css
.card {
  .title {
    color: navy;
  }
}
```

可以按下面的心智模型理解：

```css
.card .title {
  color: navy;
}
```

浏览器不是先把源码交给 Sass，也不是简单执行文本替换。它会直接解析 Nested Style Rule，并让内层 Selector 相对于父 Rule 的 Selector Context 求值。

因此：

```css
.card {
  &__title {
    color: navy;
  }
}
```

**不会**像 Sass 那样生成：

```css
.card__title {
  color: navy;
}
```

原生 CSS 中的 `&` 不是字符串变量，`&__title` 是无效 Selector。

### 2.2 Nesting 不等于 Scope

下面两段写法匹配边界相同：

```css
.card .title {
  color: red;
}
```

```css
.card {
  .title {
    color: red;
  }
}
```

如果 `.card` 内部又嵌套另一个组件，而那个组件也有 `.title`，两种写法都会匹配它。

Nesting 改善的是：

```text
Source Organization
Selector Repetition
局部阅读上下文
```

它不会自动提供：

```text
Shadow DOM 隔离
CSS Modules 哈希类名
@scope 边界
组件所有权
```

### 2.3 `:scope` 和 `@scope` 不是一回事

本课的 `:scope` 是 **Pseudo-class**：

```js
root.querySelectorAll(":scope > .item")
```

它表示当前查询上下文的 Reference Element / Scoping Root。

04.01 中学习过的 `@scope` 是 **At-rule**：

```css
@scope (.article) to (.stop) {
  .title {
    color: red;
  }
}
```

它影响 Stylesheet Rule 的作用范围和 Scoping Proximity。

两者名字接近，但不是同一个语法单位，也不能互相替换。

---

## 3. 先建立完整心智模型

### 3.1 隐式后代

```css
.component-card {
  .component-card__meta {
    color: gray;
  }
}
```

内层 Selector 没有以 Combinator 开始，也没有显式 `&`，默认建立后代关系。

理解为：

```css
.component-card .component-card__meta {
  color: gray;
}
```

这会匹配所有深度的后代，而不仅是直接子元素。

### 3.2 显式引用父匹配元素

```css
.component-card {
  &:hover {
    background: aliceblue;
  }
}
```

这里不能省略 `&`。

若写成：

```css
.component-card {
  :hover {
    background: aliceblue;
  }
}
```

它表达的是：

```css
.component-card :hover
```

也就是“`.component-card` 内部某个处于 hover 状态的后代”，而不是 Card 本身。

### 3.3 Relative Selector

```css
.component-card {
  > .component-card__title {
    color: navy;
  }
}
```

Nested Rule 可以直接以 Combinator 开始，它相对于父 Selector 求值。

等价心智模型：

```css
.component-card > .component-card__title {
  color: navy;
}
```

为了让阅读者更快看到父元素位置，本课源码采用：

```css
.component-card {
  & > .component-card__title {
    color: navy;
  }
}
```

两种写法都可以，但团队应统一风格。

### 3.4 把父元素放在 Selector 后面

```css
.component-card {
  .theme-dark & {
    background: #172033;
  }
}
```

这里 `&` 明确表示父 Rule 匹配的 `.component-card` 出现在 `.theme-dark` 后面。

理解为：

```css
.theme-dark .component-card {
  background: #172033;
}
```

这证明 `&` 不必总在最左侧。

### 3.5 父 Selector List 与 Specificity

```css
#never-used,
.specificity-parent {
  & .specificity-child {
    color: red;
  }
}
```

即使当前 DOM 中真正匹配父元素的是 `.specificity-parent`，嵌套 Selector 中 `&` 的 Specificity 仍使用父 Selector List 的最大值。

因此 `#never-used` 会把 ID 权重带进嵌套规则。

这与 `:is()` 的 Specificity 模型一致。

该能力可以减少 Selector 展开组合，但也可能制造隐藏的 Specificity Debt。

---

## 4. 项目结构

```text
kp007-native-css-nesting-scope/
├── README.md
├── index.html
├── styles.css
├── app.js
├── package.json
├── server.mjs
└── verify.mjs
```

每一课都独立运行，不依赖 KP006 的服务器或目录。

---

## 5. Step 0：从零建立实验

创建目录并进入：

```bash
mkdir -p kp007-native-css-nesting-scope
cd kp007-native-css-nesting-scope
```

创建文件：

```bash
touch README.md index.html styles.css app.js package.json server.mjs verify.mjs
```

先写入 `package.json`：

```json
{
  "private": true,
  "type": "module",
  "name": "css-kp007-native-nesting-scope",
  "scripts": {
    "dev": "node server.mjs",
    "check": "node verify.mjs && node --check app.js"
  }
}
```

第一次验证：

```bash
npm run check
```

此时检查应该失败，因为实验条件尚未建立。

这一步很重要：自动检查不是“最后补一条命令”，而是先定义课程必须保留的证据。

---

## 6. 实验一：隐式后代与显式 `&`

核心源码：

```css
.component-card {
  .component-card__meta {
    color: #52627a;
  }

  & > .component-card__title {
    color: #1e3a8a;
  }

  &[data-state="active"] {
    border-color: #2563eb;
  }

  &:hover {
    background: #eef5ff;
  }

  .theme-dark & {
    color: #e6edf8;
    background: #172033;
  }
}
```

逐条还原：

```text
.component-card .component-card__meta
.component-card > .component-card__title
.component-card[data-state="active"]
.component-card:hover
.theme-dark .component-card
```

### DevTools 证据

1. 打开 Elements。
2. 选择 `.component-card__title`。
3. 在 Styles 中找到 Nested Rule。
4. 观察浏览器展示或序列化的组合 Selector。
5. 选择深层 `.component-card__meta`。
6. 验证隐式后代规则仍然匹配。

### 动态状态实验

点击“切换组件 active 状态”。

JavaScript 只修改：

```js
component.dataset.state =
  component.dataset.state === "active" ? "idle" : "active";
```

CSS 通过：

```css
&[data-state="active"]
```

重新决定 Match Set。

这仍然遵循 Module 04.02 的原则：

```text
State 改变
→ Selector Match 改变
→ 匹配声明进入 Cascade
→ 最终视觉改变
```

---

## 7. 实验二：Nesting 不提供隔离

错误的安全感：

```css
.leaky-card {
  .title {
    color: red;
  }
}
```

开发者可能因为 `.title` 被“写在 `.leaky-card` 里面”，误以为它只属于外层标题。

实际组合仍然是：

```css
.leaky-card .title
```

所以嵌套 Widget 中的 `.title` 也会被命中。

### 最小修复

当需求明确是直接子元素时：

```css
.bounded-card {
  & > .bounded-card__title {
    color: green;
  }
}
```

更重要的修复不是一味加 `>`，而是建立稳定 Component Contract：

```text
组件根类
组件元素类
必要的直接关系
尽量少依赖内部包装层
```

### Wrong Way

```css
.dashboard {
  .panel {
    .body {
      .header {
        .title {
          color: red;
        }
      }
    }
  }
}
```

缩进让代码看起来“整齐”，但组合后仍然是五层 DOM Coupling。

---

## 8. Failure Lab：Sass `&__element` 迁移

故意保留：

```css
.bem-failure {
  &__label {
    color: red;
  }
}
```

HTML：

```html
<span class="bem-failure__label">...</span>
```

预测：

```text
如果把原生 CSS 当 Sass：
→ 期待 .bem-failure__label 被生成
→ 期待文字变红
```

实际：

```text
&__label 是无效原生 Selector
→ Nested Rule 被忽略
→ Parent Rule 仍然可以保留
→ label 不会因为这条规则获得样式
```

修复：

```css
.bem-fix {
  .bem-fix__label {
    color: green;
  }
}
```

或直接写在顶层：

```css
.bem-fix__label {
  color: green;
}
```

### 迁移规则

从 Sass 迁移时必须搜索：

```text
&__
&--
&-
```

逐条判断它究竟是：

```text
字符串拼接
状态组合
Pseudo-class
Combinator
外层 Context
```

只有状态、关系、Pseudo 等 Selector 组合可以直接迁移为原生 `&` 语义。

---

## 9. 实验三：`&` 的 Specificity Trap

源码：

```css
#never-used,
.specificity-parent {
  & .specificity-child {
    color: #b42318;
  }
}

.specificity-parent .specificity-child {
  color: #166534;
}
```

第二条看起来更晚，但第一条 Nested Selector 携带父列表中的 ID Specificity，因此红色规则获胜。

### 证据步骤

在 Console 中运行：

```js
document.querySelector(".specificity-parent")
  .matches(".specificity-parent")
```

结果为 `true`。

页面中没有：

```html
id="never-used"
```

但是这不代表 `#never-used` 对 Specificity 没影响。

在 Styles 面板查看 `.specificity-child`，记录：

```text
哪条规则匹配
哪条声明被覆盖
父 Selector List 中谁提供最大 Specificity
```

### 生产建议

不要为了减少几行重复，把完全不同权重的 Selector 放在同一个父列表：

```css
#legacy-root,
.modern-component {
  & .title {
    ...
  }
}
```

如果必须兼容 Legacy ID，建议拆分规则或放入明确的 Migration Layer。

---

## 10. 实验四：DOM Query 中的 `:scope`

HTML：

```html
<div id="scope-root">
  <div class="scope-item">A</div>
  <div class="scope-item">
    B
    <div class="scope-item">B-1</div>
  </div>
  <div class="scope-item">C</div>
</div>
```

普通查询：

```js
scopeRoot.querySelectorAll(".scope-item")
```

结果包含：

```text
A
B
B-1
C
```

Scoped Direct-child Query：

```js
scopeRoot.querySelectorAll(":scope > .scope-item")
```

结果只包含：

```text
A
B
C
```

`:scope` 把“当前调用 querySelectorAll 的 Element”显式放进关系表达式。

### 为什么不能只写 `> .scope-item`

DOM `querySelectorAll()` 接受完整 Selector。直接以 `>` 开头缺少左侧 Anchor，通常不是合法顶层 Selector。

正确写法：

```js
root.querySelectorAll(":scope > .scope-item")
```

### DocumentFragment 边界

在 DocumentFragment 上下文中，`:scope` 可以作为虚拟 Scoping Root，帮助表达顶层子元素关系；虚拟 Root 自己并不是普通 Element Subject。

本课只建立这一心智模型，Shadow DOM 与更深的 Scoping Engine 留到后续 Stage。

---

## 11. 自动 Evidence Output

页面中的 `app.js` 输出：

```text
Native nesting support
:scope support
所有 .scope-item 数量
直接 :scope 子项数量
嵌套节点是否进入直接子项集合
组件 data-state
组件最终 border color
标题最终 color
```

关键代码：

```js
const allScopeItems = scopeRoot.querySelectorAll(".scope-item");
const directScopeItems =
  scopeRoot.querySelectorAll(":scope > .scope-item");
```

Feature Detection：

```js
CSS.supports("selector(&)")
CSS.supports("selector(:scope)")
```

Feature Detection 只能证明解析支持，不代表你的 Selector 设计正确。仍然需要验证实际 Match Set。

---

## 12. CSSOM 观察建议

在 Console 中运行：

```js
const sheet = [...document.styleSheets]
  .find(item => item.href?.endsWith("/styles.css"));

[...sheet.cssRules].map(rule => ({
  type: rule.constructor.name,
  cssText: rule.cssText
}));
```

现代浏览器会在 CSSOM 中暴露 Nested Rule 结构。序列化形式可能比源文件更显式，例如给 Relative Selector 插入 `&`。

不要依赖 DevTools 的缩进外观作为唯一证据；重点看：

```text
Parent Rule
Nested Rule
selectorText / cssText
Matched Elements
Computed Result
```

---

## 13. 常见错误诊断树

```text
Nested 样式没有生效
↓
浏览器是否支持当前 Nesting 语法？
↓
Parent Rule 是否匹配？
↓
Nested Selector 是否有效？
↓
是否错误使用 &__suffix 字符串拼接？
↓
内层 Selector 是隐式后代还是 Parent-self？
↓
是否忘记 &:hover 中的 &？
↓
Relative Combinator 方向是否正确？
↓
父 Selector List 是否带来意外 Specificity？
↓
匹配后是否被 Cascade 覆盖？
```

`:scope` 查询异常：

```text
调用 querySelectorAll 的 Root 是谁？
↓
是否写了 :scope？
↓
需要所有后代还是直接子元素？
↓
查询上下文是 Element、Document 还是 DocumentFragment？
↓
是否把 :scope 与 @scope 混淆？
↓
是否对错误 Root 执行了查询？
```

---

## 14. Production Boundary

### 14.1 推荐用途

- 把组件 Root 与 State Selector 放在一起。
- 表达 `&:hover`、`&[data-state]`。
- 表达少量直接子元素或 sibling relationship。
- 在 Media / Container / Supports 条件中保留组件上下文。
- 减少重复但保持组合后 Selector 短小。

### 14.2 不推荐用途

- 用十层缩进隐藏十层 DOM Coupling。
- 混合 ID 和 Class 父列表，制造隐式高 Specificity。
- 从 Sass 无审查迁移 `&__element`。
- 把 Nesting 当 Scope 或组件隔离。
- 在一个 Rule 中交错大量 Declaration 与 Nested Rule，降低阅读顺序。
- 只看缩进，不写出组合后的 Selector。

### 14.3 Selector Budget

建议团队 Review 时同时检查：

```text
Nesting Depth <= 3
组合后 Complex Selector 的 Compound 数量
是否跨越组件边界
是否引入 ID Specificity
是否依赖包装层顺序
是否能用稳定类名更直接表达
```

限制 Nesting Depth 不是因为浏览器不能解析更深层，而是为了让人能够可靠审查组合结果。

---

## 15. Wrong Way 与 Better Way

### Wrong Way：隐藏深层路径

```css
.page {
  .dashboard {
    .panel {
      .body {
        .title {
          ...
        }
      }
    }
  }
}
```

### Better Way：稳定组件身份

```css
.panel-title {
  ...
}
```

或者只有真实关系时：

```css
.panel {
  & > .panel-title {
    ...
  }
}
```

### Wrong Way：把 Parent Context 写错

```css
.button {
  :hover {
    ...
  }
}
```

### Better Way

```css
.button {
  &:hover {
    ...
  }
}
```

### Wrong Way：用 Nesting 假装 Scope

```css
.component {
  .title {
    ...
  }
}
```

### Better Way

```css
.component {
  & > .component__title {
    ...
  }
}
```

或者使用真正的组件命名、Shadow DOM、`@scope` 或构建期隔离方案。

---

## 16. Challenge

### Challenge A

为 `.menu` 写出原生 Nested CSS：

```text
.menu 自身 data-state="open" 时显示边框
.menu 的直接 .menu__item 有 padding
.menu__item hover 和 focus-visible 有相同背景
.dark-theme 下改变 .menu 背景
```

必须先写出组合后的四条 Selector，再写 Nested Source。

### Challenge B

构造一个父 Selector List：

```css
#legacy,
.card
```

证明 Nested Child Selector 会继承最大 Specificity，然后把它重构为无 ID Debt 的版本。

### Challenge C

构造三层 DOM：

```text
root
→ direct item
→ nested item
```

分别证明：

```js
root.querySelectorAll(".item")
root.querySelectorAll(":scope > .item")
```

返回不同集合。

---

## 17. Mastery Check

你应该能够独立回答：

1. 原生 CSS Nesting 是运行时字符串拼接吗？
2. `.card { .title {} }` 默认建立什么关系？
3. 为什么 `.card { :hover {} }` 与 `.card { &:hover {} }` 不同？
4. `& > .title` 中 `&` 代表谁？
5. `.theme-dark &` 怎样还原？
6. 为什么 `&__title` 在 Sass 中可能工作，在原生 CSS 中不工作？
7. Nesting 为什么不能提供 Style Isolation？
8. 父 Selector List 怎样影响 `&` Specificity？
9. `:scope` 在 Element Query 中代表谁？
10. `:scope` 与 `@scope` 有什么本质区别？
11. 为什么 Feature Detection 不能替代 Match Evidence？
12. 为什么团队需要 Nesting Depth Budget？

---

## 18. 验收

运行：

```bash
npm run check
npm run dev
```

访问：

```text
http://127.0.0.1:4173
```

至少留下以下证据：

```text
1. component-card 的 Nested Rules 在 DevTools 中的匹配记录。
2. active / idle 切换前后的 border computed value。
3. leaky-card 内外两个 title 同时被匹配的证据。
4. bounded-card 只匹配直接子元素的证据。
5. Specificity Trap 中红色规则获胜的 Styles 证据。
6. &__label Nested Rule 不产生目标样式的证据。
7. .scope-item 与 :scope > .scope-item 的数量对照。
8. npm run check 成功输出。
```

完成本课后，进入 KP008，把整个 Module 的 Selector 能力放进多故障综合重构项目。
