# KP005：Origin、Importance 与 Source Order

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP005 |
| 深度 | Must / Should |
| 主问题 | 多条声明冲突时，为什么不能一上来只比较 Specificity？ |
| 学习者技术边界 | 静态 HTML + CSS + DevTools；不使用 Shadow DOM 或 JavaScript |

> 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. 本课最终要掌握什么

本课建立级联前半段的判断顺序：

```text
声明是否匹配
→ Origin
→ Importance
→ 当前级联上下文
→ 后续再比较 Layer / Specificity / Scope / Source Order
```

当前实验集中观察：

```text
User-Agent Origin
Author Origin
Normal / Important
Inline Author Style
Source Order
```

---

## 2. 学习者核心文件

只需要理解：

```text
index.html
styles.css
```

`server.mjs`、`verify.mjs` 和 `package.json` 是已经提供的黑盒运行工具。执行命令即可，不属于本课知识点。

启动：

```bash
npm run check
npm run dev
```

访问：

```text
http://localhost:4173
```

---

## 3. 为什么不能先算 Specificity

假设：

```css
.notice {
  color: green !important;
}

#page .notice {
  color: red;
}
```

即使第二条 Selector 的 Specificity 更高，第一条仍先进入 important 层级。

正确思路：

```text
先分 Origin / Importance
→ 只在同一可比较层级内继续比较
```

---

## 4. 实验 A：Source Order

源码中有两条同名规则：

```css
.source-order-demo {
  color: #b45309;
}

.source-order-demo {
  color: #1d4ed8;
}
```

它们的 Origin、Importance、Selector 与 Specificity 都相同，因此后出现者获胜。

### DevTools 证据

1. 选中 `.source-order-demo`。
2. 在 Styles 中找到两条规则。
3. 确认第一条 `color` 被划掉。
4. 把两条规则交换位置。
5. 刷新，再观察结果反转。

---

## 5. 实验 B：Important 与 Normal

```css
.importance-demo {
  color: #166534 !important;
}

.importance-demo {
  color: #be123c;
}
```

后面的 normal 声明不会因为“更晚”就压过 important 声明。

判断顺序不是“最后一条永远赢”，而是 Importance 不同就先由 important 获胜。

---

## 6. 实验 C：User-Agent 与 Author Origin

浏览器会为按钮、标题、输入框等提供默认样式。

页面中比较：

```html
<button>仅使用浏览器默认样式</button>
<button class="author-button">使用 Author 样式</button>
```

操作：

1. 选中第一个按钮。
2. 在 Styles 中找到 `user agent stylesheet`。
3. 选中第二个按钮。
4. 找到 `styles.css` 中 `.author-button` 的声明。
5. 观察 Author Origin 如何覆盖普通 User-Agent 样式。

---

## 7. 实验 D：Inline Author Style

```html
<p class="inline-vs-external" style="color: #7c3aed;">
```

外部 CSS：

```css
.inline-vs-external {
  color: #15803d;
}
```

在 normal Author 声明中，元素附着的 inline style 具有特殊位置，因此紫色获胜。

接着比较：

```css
.important-vs-inline {
  color: #0f766e !important;
}
```

它可以压过 inline normal。

结论：inline 不是一个独立 Origin，inline normal 也不是无条件最高。

---

## 8. 关于 Encapsulation Context

CSS 级联规范还定义了封装上下文相关的顺序，Shadow DOM 会让这个问题变得可观察。

但 Shadow DOM / Web Components 的完整 Owner 是 Stage 13。

所以本课只保留边界说明：

```text
知道存在
≠
现在创建组件实验
```

本课不使用 Declarative Shadow DOM、`shadowrootmode`、`:host` 或 Custom Elements。

---

## 9. 诊断顺序

```text
1. Stylesheet 是否加载
2. Selector 是否匹配
3. Declaration 是否有效
4. Origin 是否相同
5. Importance 是否相同
6. 是否存在 Layer / Context 差异
7. Specificity
8. Scope Proximity
9. Source Order
```

Source Order 是接近最后的比较项，不是第一项。

---

## 10. Failure Lab

### Failure 1：用更深 Selector 对抗 `!important`

如果对手在更高 Importance 层级，增加 Specificity 没有解决根因。

### Failure 2：把 inline 当作绝对最高

inline normal 仍会输给适用的 important 声明。

### Failure 3：提前引入 Shadow DOM

为了讲一个级联概念而要求初学者创建 Shadow DOM，会把 Stage 13 能力泄漏到 Stage 04。本课已删除该实验。

---

## 11. Challenge

只修改 HTML 与 CSS：

1. 新增一段带 inline normal 的文字。
2. 写一条外部 Author normal。
3. 再写一条外部 Author important。
4. 每一步都在 Styles 中记录匹配规则、被划掉声明、最终值和获胜原因。
5. 删除 `!important`，再观察比较顺序怎样变化。

---

## 12. Mastery Check

1. User-Agent 和 Author 分别是什么？
2. `!important` 为什么会改变比较层级？
3. Source Order 什么时候才有决定权？
4. inline style 属于什么 Origin？
5. 为什么更高 Specificity 不一定能压过 important？
6. 为什么本课不再使用 Shadow DOM 实验？
