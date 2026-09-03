# KP005：Origin、Importance、Context 与 Source Order

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP005 |
| 深度 | Must / Should |
| Pattern | BROWSER-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | 多条声明冲突时，为什么不能一上来就比较 Specificity？ |
| 运行要求 | Node.js 20+，支持 Declarative Shadow DOM 的现代浏览器 |

---

## 1. 本课最终要做出什么

你会完成一个 **Origin / Importance / Context / Source Order Laboratory**，亲自观察五个级联层次：

1. 完全相同 selector 的 normal Author declarations 如何由 Source Order 决胜。
2. `!important` 如何先改变 Importance bucket。
3. User-Agent Origin 与 Author Origin 如何在 DevTools 中同时出现。
4. Inline normal 为什么能压过普通 Author normal selector rule。
5. Encapsulation Context 为什么对 normal 和 important declarations 使用相反的上下文优先方向。

这节课最重要的是改掉一个习惯：

> **样式冲突 ≠ 先算 Specificity。**

课程最终要形成的完整 Cascade 排序心智模型是：

```text
Relevance
→ Origin / Importance
→ Cascade Layer / Encapsulation Context / element-attached position
→ Specificity
→ Scoping Proximity
→ Source Order
```

为了控制认知负担，本课只打穿 Origin、Importance、Context、inline 和 Source Order；KP006、KP007 会继续补齐 Specificity、Layer 与 Scope。

---

## 2. 为什么需要这课

下面两个 selector：

```css
#app .card p {
  color: red;
}

p {
  color: blue !important;
}
```

很多初学者会说：

```text
“第一条有 ID，所以一定更强。”
```

这是错误的。

`!important` 会先改变 declaration 所属的 importance precedence。只有当 Origin / Importance 等更早条件没有决出胜负时，Specificity 才有资格比较。

因此 Cascade 必须按顺序排除，不是把所有规则揉成一个“权重数字”。

---

## 3. 前置知识与本课边界

你已经完成：

- KP003：Rule / Declaration / Property / Value。
- KP004：Shorthand / Longhand / At-rule。

本课完整拥有：

- User-Agent / User / Author Origin 心智模型；
- normal 与 `!important`；
- normal Source Order；
- Inline normal 的 Author precedence；
- Encapsulation Context 的 normal / important 翻转；
- DevTools 中对 UA 与 Author rules 的证据收集。

本课暂不展开：

- Specificity 公式：KP006。
- Cascade Layer：KP007。
- `@scope` / Scoping Proximity：KP007。
- Shadow DOM API / Web Components 设计：后续 Stage。

Shadow DOM 在本课只作为 **CSS Encapsulation Context 实验工具**。

---

## 4. 起始状态与最终文件

本课从新的最小目录开始，不依赖 KP004：

```text
kp005-origin-importance-context-source-order/
├── README.md
├── index.html
├── package.json
├── server.mjs
├── styles.css
└── verify.mjs
```

运行方式：

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
  "name": "css-kp005-cascade-order",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node server.mjs",
    "check": "node verify.mjs"
  }
}
```

`server.mjs` 与前几课相同，只负责返回 HTML / CSS 并保证 CSS MIME 为 `text/css; charset=utf-8`。

---

## 6. Step 1：建立五组实验对象

`index.html` 包含：

```text
A Source Order
B Importance
C User-Agent / Author Origin
D Inline normal
E Encapsulation Context
```

其中两个重要的新实验对象：

### 6.1 Inline Style

```html
<p class="inline-vs-external" style="color: #7c3aed;">
```

`style=""` 仍属于 Author Origin，但 declaration 直接附着在 element 上，而不是由 selector 间接匹配。

### 6.2 Declarative Shadow DOM

```html
<div class="context-host context-normal">
  <template shadowrootmode="open">
    <style>
      :host {
        color: #b45309;
      }
    </style>
    <p>Shadow content</p>
  </template>
</div>
```

浏览器解析 `shadowrootmode="open"` 后，会给父元素创建 ShadowRoot。这里不需要 JavaScript，所以仍然可以把课程主体保持在 HTML + CSS。

---

## 7. Step 2：Source Order 实验

在 `styles.css` 中加入：

```css
.source-order-demo {
  color: #1d4ed8;
}

.source-order-demo {
  color: #b45309;
}
```

两条 declaration 的条件：

```text
Relevance：相同
Origin：Author
Importance：normal
Layer：都未分层
Specificity：完全相同
Scope：相同
```

前面全部打平后，才轮到：

```text
Order of appearance
```

因此第二条获胜。

### DevTools 证据

选择 `.source-order-demo`：

```text
Elements → Styles
```

预期：

- 两条规则都匹配；
- 第一条 `color` 被划掉；
- 第二条最终生效。

### 故障变体

把第二条移动到第一条前面，刷新。

如果其它条件仍完全相同，颜色应随 Source Order 翻转。

完成后恢复最终源码。

---

## 8. Step 3：Importance 实验

加入：

```css
.importance-demo {
  color: #166534 !important;
}

.importance-demo {
  color: #be123c;
}
```

虽然 important declaration 更早出现，但它进入 Author Important precedence，因此后面的 normal declaration 不会仅凭“更晚”越过它。

### 关键术语

不要说：

```text
!important 的 Specificity 更高
```

应该说：

```text
!important 改变了 Cascade Importance precedence。
```

`!important` **不是 selector Specificity 的组成部分**。

---

## 9. Step 4：Important vs Inline Normal

HTML：

```html
<p class="important-vs-inline" style="color: #7c3aed;">
```

CSS：

```css
.important-vs-inline {
  color: #166534 !important;
}
```

inline declaration 是 Author Normal；外部 rule 是 Author Important。

因此 Important 先获胜。

这个实验用来证明：

> 不能看到 inline 就机械认为“永远最高”。

Inline normal 很强，但仍然处在 Author normal 体系内；更高的 importance / origin / transition 等条件仍可能改变结果。

---

## 10. Step 5：观察 Origin

页面有两个按钮：

```html
<button type="button">仅使用浏览器默认样式</button>
<button class="author-button" type="button">被 Author 样式覆盖</button>
```

选择第一个按钮：

```text
DevTools → Elements → Styles
```

寻找：

```text
user agent stylesheet
```

这就是 User-Agent Origin 的直接证据。

选择第二个按钮，Author rule：

```css
.author-button {
  padding: 10px 16px;
  border: 0;
  border-radius: 10px;
  font: inherit;
  color: #ffffff;
  background: #3156a6;
}
```

会覆盖多个 UA normal defaults。

### 三种 Origin

```text
User-Agent Origin
→ 浏览器默认样式

User Origin
→ 用户为了自己的阅读、偏好或可访问需求提供的样式

Author Origin
→ 页面作者提供的外部 CSS、<style>、style=""
```

忽略 animation / transition / layer 细节时，normal 的宏观优先顺序为：

```text
UA normal
< User normal
< Author normal
```

Important 会反转三种 Origin 的优先方向：

```text
Author important
< User important
< UA important
```

因此网站作者不应该把“我要压过一切”当作 `!important` 的使用目标。

---

## 11. Step 6：Inline Normal 实验

HTML：

```html
<p class="inline-vs-external" style="color: #7c3aed;">
```

CSS：

```css
.inline-vs-external {
  color: #047857;
}
```

两者都是 Author Normal。

在当前场景中，inline / element-attached declaration 比普通 selector rule 更靠前，因此最终为紫色。

在 DevTools 中你应同时看到：

```text
element.style
.inline-vs-external
```

不要把这个现象只简化成“inline = 1000”。更准确的模型是：element-attached declarations 在 Cascade 中有专门位置；KP006 会继续说明 selector Specificity 与常见记忆法的区别。

---

## 12. Step 7：Encapsulation Context Expert 实验

本课最深的一组实验使用 Declarative Shadow DOM。

### 12.1 Normal Context

Shadow 内：

```css
:host {
  color: #b45309;
}
```

外层文档：

```css
.context-normal {
  color: #1d4ed8;
}
```

两边都是 Author Normal，但属于不同 encapsulation contexts。

规范规则：

```text
normal declaration：outer context wins
```

因此 normal 卡片最终应表现为外层蓝色。

### 12.2 Important Context

Shadow 内：

```css
:host {
  color: #166534 !important;
}
```

外层文档：

```css
.context-important {
  color: #1d4ed8 !important;
}
```

两边都是 Author Important。

规范对 important 的 context 顺序反转：

```text
important declaration：inner context wins
```

因此 Shadow 内绿色获胜。

### 为什么规范这样设计

这让组件能够形成：

```text
内部 normal styles
→ 作为默认值，允许外部消费者覆盖

内部 important constraints
→ 用于真正必须保护的内部约束
```

这不是鼓励组件大量使用 `!important`，而是解释 Encapsulation Context 的设计语义。

### DevTools 证据

展开 ShadowRoot，检查 host 的 Computed `color`。

当前稳定浏览器已经支持 Declarative Shadow DOM；如果 `<template shadowrootmode="open">` 没有变成 ShadowRoot，应先升级浏览器，而不是修改课程 CSS。

---

## 13. 完整自动检查

`verify.mjs` 会验证：

```text
两条相同 source-order rule 仍存在
important 实验仍存在
inline normal 条件仍存在
Declarative Shadow DOM 仍存在
context-important 仍带 !important
UA stylesheet 观察提示仍存在
```

执行：

```bash
npm run check
npm run dev
```

预期：

```text
✓ KP005 origin, importance, source-order, inline, and encapsulation-context experiments are complete.
```

---

## 14. Cascade 排序心智模型

```text
候选 declaration
      │
      ▼
1. Relevance
      │
      ▼
2. Origin + Importance
      │
      ▼
3. Layer / Context / element-attached position
      │
      ▼
4. Specificity            ← KP006
      │
      ▼
5. Scoping Proximity      ← KP007
      │
      ▼
6. Order of appearance
      │
      ▼
winning declaration
```

不同资料可能把 Layer、inline、context 的细节分组表达得略有差异，但核心原则不变：

> **只有前一层没有决出胜负，后一层才有资格参与。**

---

## 15. Failure Lab：`!important` 战争

临时把：

```css
.importance-demo {
  color: #be123c;
}
```

改为：

```css
.importance-demo {
  color: #be123c !important;
}
```

现在双方都 important，才继续比较后续条件。

当前两条 selector 完全相同，因此 Source Order 让后面的红色获胜。

接下来最危险的做法是继续不断添加新的 `!important`。

正确的生产排查顺序应该是：

```text
为什么需要覆盖？
→ 是否属于不同 Cascade Layer？
→ 基础 selector 是否权重过高？
→ 组件是否缺少明确 override API？
→ 能否删除旧规则而不是叠新规则？
```

KP007 会用 Cascade Layer 系统解决这类问题。

---

## 16. Wrong Way

### Wrong Way 1：所有冲突先算 Specificity

如果 Origin / Importance 已决胜，Specificity 根本不会参与。

### Wrong Way 2：认为后写的一定赢

Source Order 是靠后的 tie-breaker，不是最高规则。

### Wrong Way 3：把 `!important` 叫作超高 Specificity

这是概念错误，会导致后续读 Layer / User Origin 时完全混乱。

### Wrong Way 4：页面作者试图压制所有用户 important 样式

User / UA important 的高优先级与用户控制权、可访问性约束有关，不应被作者视为“敌人”。

---

## 17. Production Boundary

建议团队把 CSS 冲突调试顺序固化：

```text
1. rule 是否 relevant / selector 是否命中
2. 哪个 origin
3. normal 还是 important
4. 哪个 layer / context
5. 是否 inline
6. specificity
7. scope proximity
8. source order
```

禁止把下面这些作为默认修复策略：

```text
“让 selector 再长一点”
“加一个 ID”
“再加一个 !important”
```

---

## 18. 本课只记住 3 件事

1. **Cascade 先比较 Origin / Importance，Specificity 不是第一关。**
2. **Source Order 只有在前面条件打平后才决定结果。**
3. **Encapsulation Context 对 normal 与 important 的上下文优先方向相反。**

---

## 19. Challenge

1. 调换两条 `.source-order-demo` 的顺序并验证颜色。
2. 给第二条 `.importance-demo` 也加 `!important`，预测结果。
3. 在 DevTools 中记录一条 `user agent stylesheet`。
4. 把 Shadow 内外两边都改成 normal，验证 outer context。
5. 把 Shadow 内外两边都改成 important，验证 inner context。

每个实验必须记录：

```text
前提是否打平
→ 哪一步第一次产生差异
→ 谁被淘汰
→ 最终 winner
```

---

## 20. Mastery Check

- UA / User / Author Origin 分别是谁提供的？
- 为什么 normal Author 可以覆盖 normal User？
- 为什么 User important 又可以覆盖 Author important？
- `!important` 是否属于 Specificity？
- 为什么两条同 selector normal rules 后写者赢？
- 为什么 inline normal 能覆盖普通 Author normal selector rule？
- Encapsulation Context 中 normal 与 important 的方向为什么不同？
- Source Order 在什么时候根本不会执行？

---

## 21. 参考资料

- MDN：Introduction to the CSS cascade — <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction>
- MDN：`!important` — <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/important>
- W3C：CSS Cascading and Inheritance Level 5 — <https://www.w3.org/TR/css-cascade-5/>
- MDN：Using Shadow DOM — <https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM>

---

## 22. 最终源码说明

最终源码故意保留：

- 两条重复 `.source-order-demo`；
- important vs normal；
- inline vs external；
- Shadow normal / important context。

它们都是受控实验条件，不是需要“去重”的坏代码。
