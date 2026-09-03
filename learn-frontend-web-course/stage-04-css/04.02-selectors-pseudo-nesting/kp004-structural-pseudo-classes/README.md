# KP004：Structural Pseudo-class——按元素兄弟顺序进行结构匹配

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo、Nesting 与 `:scope` |
| Lesson | KP004 |
| 深度 | Must / Should |
| Pattern | BROWSER-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | `:nth-child()`、`:nth-of-type()` 与 `of S` 到底按什么集合编号？ |
| 运行要求 | Node.js 20+，现代浏览器 |

---

## 1. 本课最终要做出什么

本课会建立一个 **Structural Pseudo-class Laboratory**，包含三组可以直接观察和破坏的实验：

1. 混合 `p / article / aside` 兄弟元素，比较 `:nth-child()` 与 `:nth-of-type()`。
2. 一组 `eligible / blocked` 发布任务，验证 `:nth-child(2 of .eligible)` 的“先过滤、再编号”。
3. 一个只有单个元素子节点的容器，验证 `:only-child`。

页面还提供两个按钮：

```text
在队首加入 eligible job
恢复初始队列
```

点击按钮后 DOM 顺序会真实改变，匹配集合也会立即改变。你会看到：

```text
结构伪类不是给元素永久贴上的标签
而是浏览器基于当前兄弟集合重新计算的关系
```

---

## 2. 本课解决什么问题

下面两条规则看起来只差几个字符：

```css
.mixed-children > article:nth-child(2) {
  background: #dbeafe;
}

.mixed-children > article:nth-of-type(2) {
  background: #dcfce7;
}
```

它们的含义完全不同：

```text
article:nth-child(2)
→ 当前元素必须是 article
→ 同时它必须是父元素所有元素子节点中的第 2 个

article:nth-of-type(2)
→ 当前元素必须是 article
→ 然后只在同类型 article 兄弟中计算第 2 个
```

如果 DOM 中混有 `p`、`aside`、`div`，两个 selector 往往匹配不同元素。

本课还解决一个现代结构选择问题：

```css
.deployment-queue > :nth-child(2 of .eligible)
```

它不是：

```text
“第二个子元素，并且它碰巧有 eligible”
```

而是：

```text
先从兄弟元素中筛出 .eligible
→ 再对筛选后的集合从 1 开始编号
→ 选择其中第 2 个
```

---

## 3. 前置知识与本课边界

### 已经学过

- KP001：Basic / Compound Selector。
- KP002：Attribute Selector。
- KP003：Combinator 与 DOM 关系。
- Module 04.01：Specificity、Cascade 与最终值。

### 本课完整拥有

- `:first-child`
- `:last-child`
- `:only-child`
- `:nth-child(An+B)`
- `:nth-last-child(An+B)`
- `:first-of-type`
- `:last-of-type`
- `:only-of-type`
- `:nth-of-type(An+B)`
- `:nth-child(An+B of S)`
- 动态 DOM 变化后结构匹配重新计算
- child index 与 type index 的 Failure Lab

### 本课不展开

- `:is()`、`:where()`、`:not()`、`:has()`：KP005。
- Focus、Form State、Pseudo-element：KP006。
- Selector Engine 内部索引和 Style Invalidation：Stage 09 / Stage 24。
- 表格、Grid、Flex 布局：后续布局 Module。

---

## 4. 本课项目结构

```text
kp004-structural-pseudo-classes/
├── README.md
├── index.html
├── styles.css
├── app.js
├── package.json
├── server.mjs
└── verify.mjs
```

职责：

- `index.html`：提供可预测的兄弟元素结构。
- `styles.css`：只放本课结构伪类和必要视觉基线。
- `app.js`：动态插入元素并输出真实匹配集合。
- `verify.mjs`：保证关键实验条件不会被误删。
- `server.mjs`：通过 HTTP 提供实验文件。

---

## 5. 起始状态

本课是独立 Lesson，不依赖 KP003 的运行目录。

从空目录开始：

```bash
mkdir -p kp004-structural-pseudo-classes
cd kp004-structural-pseudo-classes
```

仓库中已经保存最终源码；学习时应根据 README 从零建立一份练习副本，而不是先阅读最终答案倒推。

---

## 6. Step 0：建立最小运行环境

创建 `package.json`：

```json
{
  "private": true,
  "type": "module",
  "name": "css-kp004-structural-pseudo-classes",
  "scripts": {
    "dev": "node server.mjs",
    "check": "node verify.mjs && node --check app.js"
  }
}
```

创建 `server.mjs`，职责只有：

```text
/           → index.html
/styles.css → text/css
/app.js     → text/javascript
```

运行：

```bash
npm run dev
```

打开：

```text
http://localhost:4173
```

此时如果还没有创建 HTML，会看到 404，这是正确起点。

---

## 7. Step 1：建立混合兄弟元素基线

在 `index.html` 中创建：

```html
<div class="mixed-children" id="mixed-children">
  <p class="intro">第 1 个元素子节点：p.intro</p>
  <article class="build-card" data-name="Build A">
    第 2 个元素子节点，也是第 1 个 article
  </article>
  <aside class="note">第 3 个元素子节点：aside.note</aside>
  <article class="build-card" data-name="Build B">
    第 4 个元素子节点，但它是第 2 个 article
  </article>
  <article class="build-card" data-name="Build C">
    第 5 个元素子节点，也是最后一个元素子节点
  </article>
</div>
```

先不要写结构伪类。

在 Console 执行：

```js
[...document.querySelector("#mixed-children").children]
  .map((element, index) => `${index + 1}: ${element.tagName}`)
```

预期：

```text
1: P
2: ARTICLE
3: ASIDE
4: ARTICLE
5: ARTICLE
```

### 关键术语

结构伪类按 **element siblings** 计算。

它不是按源码行数计算，也不是把注释和普通文本节点都当成 `:nth-child()` 的编号对象。

---

## 8. Step 2：比较 child index 与 type index

在 `styles.css` 中增加：

```css
.mixed-children > article:nth-child(2) {
  background: #dbeafe;
}

.mixed-children > article:nth-of-type(2) {
  background: #dcfce7;
}
```

重新加载页面。

预期：

```text
Build A
→ article:nth-child(2)
→ 因为它是所有元素子节点中的第 2 个

Build B
→ article:nth-of-type(2)
→ 因为它是 article 类型兄弟中的第 2 个
```

Console 证据：

```js
document.querySelectorAll(
  ".mixed-children > article:nth-child(2)"
)

document.querySelectorAll(
  ".mixed-children > article:nth-of-type(2)"
)
```

### Failure Lab：把两个概念混成一个

错误判断：

> `article:nth-child(2)` 就是第二个 article。

根因：

```text
把“元素总兄弟集合的索引”
误当成
“同类型兄弟集合的索引”
```

诊断时先问：

```text
当前 selector 的编号集合到底是谁？
```

---

## 9. Step 3：first、last 与 only

增加：

```css
.mixed-children > :first-child {
  border-color: #2563eb;
}

.mixed-children > :last-child {
  box-shadow: inset 0 0 0 3px #f59e0b;
}

.single-host > :only-child {
  outline: 2px solid #0891b2;
}
```

心智模型：

```text
:first-child
→ 当前元素在元素兄弟中排名第一

:last-child
→ 当前元素在元素兄弟中排名最后

:only-child
→ 当前元素同时是 first-child 和 last-child
```

`only-child` 并不表示“父元素只有一个 Node”；它关心的是元素兄弟关系。

---

## 10. Step 4：学习 An+B

常见写法：

```css
.job:nth-child(odd) {}
.job:nth-child(even) {}
.job:nth-child(2n + 1) {}
.job:nth-child(3n) {}
.job:nth-child(-n + 3) {}
```

解释：

```text
An+B
A = 周期
B = 起点偏移
n = 0、1、2、3……的非负整数
```

例如：

```text
2n + 1
n=0 → 1
n=1 → 3
n=2 → 5
```

因此 `2n + 1` 与 `odd` 表达同一组索引。

本课源码使用：

```css
.deployment-queue > .job:nth-child(odd) {
  border-color: #c4b5fd;
}
```

注意：

```text
先判断当前元素是否是 .job
再判断它是否处于父元素所有元素子节点的奇数位
```

---

## 11. Step 5：使用 `of S` 先过滤再编号

HTML：

```html
<ul class="deployment-queue" id="deployment-queue">
  <li class="job eligible">Job A · eligible</li>
  <li class="job blocked">Job B · blocked</li>
  <li class="job eligible">Job C · eligible</li>
  <li class="job eligible">Job D · eligible</li>
  <li class="job blocked">Job E · blocked</li>
</ul>
```

CSS：

```css
.deployment-queue > :nth-child(2 of .eligible) {
  background: #fef3c7;
  border-color: #d97706;
  font-weight: 750;
}
```

筛选过程：

```text
所有兄弟：
A eligible
B blocked
C eligible
D eligible
E blocked

of .eligible 过滤后：
A eligible → 1
C eligible → 2
D eligible → 3

最终命中：
C
```

对比下面的 selector：

```css
.deployment-queue > .eligible:nth-child(2)
```

它表示：

```text
先要求当前元素处于所有元素子节点的第 2 位
再要求它具有 eligible
```

当前第 2 位是 blocked，所以不会匹配。

---

## 12. Step 6：动态改变 DOM，观察结构匹配重新计算

`app.js` 中的核心操作：

```js
const item = document.createElement("li");
item.className = "job eligible";
item.dataset.name = "New Job";
item.textContent = "New Job · eligible";
queue.prepend(item);
```

点击“在队首加入 eligible job”。

变化：

```text
原第二个 eligible：Job C
→ 插入后变成 Job A
```

这证明：

```text
结构伪类不是持久状态
DOM 结构变化后浏览器会重新得到匹配结果
```

不要使用 `:nth-child()` 表达真正的业务身份，例如：

```text
“第二个元素就是管理员”
“第三个按钮就是删除”
```

业务身份应优先使用稳定类名、属性或语义结构。

---

## 13. Step 7：输出匹配证据

本课通过：

```js
document.querySelectorAll(selector)
```

对每个 selector 输出：

```text
count
matches
```

关键 selector：

```js
[
  ".mixed-children > :first-child",
  ".mixed-children > :last-child",
  ".mixed-children > article:nth-child(2)",
  ".mixed-children > article:nth-of-type(2)",
  ".deployment-queue > .job:nth-child(odd)",
  ".deployment-queue > :nth-child(2 of .eligible)",
  ".single-host > :only-child"
]
```

证据优先级：

```text
DOM Tree
→ 兄弟集合
→ Selector 语义
→ querySelectorAll() 匹配集合
→ 页面视觉
```

不要反过来只根据颜色猜命中了谁。

---

## 14. 完整运行与验收

执行：

```bash
npm run check
npm run dev
```

验收：

1. Build A 与 Build B 分别体现 child / type index。
2. Job C 初始是第二个 `.eligible`。
3. 插入 New Job 后，第二个 `.eligible` 改为 Job A。
4. Console 和页面证据区的数量一致。
5. Tab 可以聚焦两个按钮。
6. 恢复按钮能返回初始匹配结果。

---

## 15. Wrong Way

### Wrong Way 1：用位置表达业务身份

```css
.toolbar > button:nth-child(3) {
  color: red;
}
```

如果第三个按钮恰好是“删除”，这条规则会在插入新按钮后误伤。

更稳定：

```html
<button data-action="delete">删除</button>
```

```css
[data-action="delete"] {
  color: red;
}
```

### Wrong Way 2：把 `nth-of-type` 当成“同 class 排名”

```css
.card:nth-of-type(2) {}
```

`of-type` 比较元素类型，不比较 `.card` class。

### Wrong Way 3：忽略隐藏元素仍参与结构编号

`display: none` 不会从 DOM 兄弟集合中删除元素。

当需求是“对可见行交替着色”，可以考虑：

```css
tr:nth-child(even of :not([hidden])) {}
```

但仍应验证真实产品中的隐藏方式和兼容边界。

---

## 16. Production Boundary

结构伪类适合：

- 列表视觉节奏。
- 第一项、最后一项边框处理。
- 同类型内容排版。
- 基于真实结构关系的样式。
- `of S` 过滤后的排名。

不适合：

- 用户身份。
- 权限。
- 订单状态。
- 永久业务编号。
- 会频繁插入、排序却要求视觉身份固定的集合。

生产决策：

```text
需求来自结构
→ structural pseudo-class

需求来自业务状态
→ stable class / data-* / semantic attribute
```

---

## 17. 本课只记住 3 件事

1. `:nth-child()` 在所有元素兄弟中编号，`:nth-of-type()` 在同类型兄弟中编号。
2. `:nth-child(An+B of S)` 先按 `S` 过滤兄弟，再对过滤结果编号。
3. DOM 顺序变化会重新计算结构匹配，不能用位置代替业务身份。

---

## 18. Challenge

实现一个发布队列：

```text
只对未隐藏的 eligible job 交替着色
突出最后一个 eligible job
当只有一个 eligible job 时显示特殊边框
```

限制：

- 不修改 JavaScript。
- 不增加专门的 `is-first`、`is-last` class。
- 必须用 Console 输出实际匹配集合。
- 写清每个 selector 的编号集合。

---

## 19. Mastery Check

你应该能独立回答：

- 文本节点会不会让 `:nth-child()` 的元素索引加一？
- `article:nth-child(2)` 和 `article:nth-of-type(2)` 各自的候选集合是什么？
- `:nth-child(2 of .eligible)` 与 `.eligible:nth-child(2)` 有什么不同？
- 为什么插入新兄弟后匹配对象会改变？
- 什么需求不应该使用结构伪类？

---

## 20. 标准依据

- W3C Selectors Level 4：Child-indexed Pseudo-classes。
- `:nth-child(An+B [of S]?)`、`:nth-of-type()` 与 specificity 定义。
- 课程以实际浏览器结果和 WPT 可测试语义为准。
