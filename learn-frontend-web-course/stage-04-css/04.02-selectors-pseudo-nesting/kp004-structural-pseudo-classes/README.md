# KP004：Structural Pseudo-class——按兄弟集合与过滤集合编号

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo 与 Native Nesting |
| Lesson | KP004 |
| 深度 | Must / Should |
| 主问题 | `:nth-child()`、`:nth-of-type()` 与 `of S` 到底按哪个集合编号？ |
| 学习者技术边界 | 静态 HTML + CSS + DevTools；不通过脚本插入节点 |

> 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. 本课实验设计

页面包含：

```text
实验 A：混合类型兄弟，比较 child index 与 type index
实验 B：两个静态队列，比较结构变化前后第二个 eligible
实验 C：only-child
```

过去版本通过 JavaScript 在队首插入节点。现在改成状态 A / 状态 B 同屏，CSS 机制与观察结果完全保留，同时不要求提前学习 DOM API。

---

## 2. 核心文件与运行

学习者修改：

```text
index.html
styles.css
```

黑盒工具：

```text
server.mjs
verify.mjs
package.json
```

运行：

```bash
npm run check
npm run dev
```

---

## 3. `:nth-child()` 的集合

```css
article:nth-child(2)
```

要求候选元素同时满足：

```text
它是 article
并且
它位于父元素全部元素子节点的第 2 位
```

它不是“第二个 article”。

页面中第一个 article 恰好位于所有元素子节点的第二位，因此匹配。

---

## 4. `:nth-of-type()` 的集合

```css
article:nth-of-type(2)
```

它只在同类型 `article` 兄弟中编号。

页面中第二个 article 位于父元素所有子元素的第四位，但仍是 `article` 类型集合中的第二位。

### DevTools 证据

1. 展开 `.mixed-children`。
2. 逐个确认元素类型与顺序。
3. 选择两个 article。
4. 在 Styles 中分别查看哪条结构规则匹配。
5. 手动把 `aside` 移动到其他位置，再刷新比较。

---

## 5. `An+B`

常见形式：

```css
:nth-child(odd)
:nth-child(even)
:nth-child(2n + 1)
:nth-child(3n)
:nth-child(-n + 3)
```

`n` 从 0 开始取非负整数。

例如：

```text
2n + 1
→ 1、3、5、7……
```

要先明确 Selector 的候选集合，再套入索引公式。

---

## 6. `of S`：先过滤，再编号

```css
.deployment-queue > :nth-child(2 of .eligible)
```

处理顺序：

```text
取得同父元素的元素兄弟
→ 用 .eligible 过滤
→ 对过滤后的集合从 1 编号
→ 选择第 2 个
```

状态 A：

```text
eligible 集合：A、C、D
第二个：C
```

状态 B：

```text
eligible 集合：New、A、C、D
第二个：A
```

这两个状态完全由静态 HTML 表达。你也可以手动复制一行到队首并刷新。

---

## 7. 对比 `.eligible:nth-child(2)`

```css
.eligible:nth-child(2)
```

含义：

```text
候选元素必须是所有元素子节点的第 2 个
并且具有 eligible
```

它与：

```css
:nth-child(2 of .eligible)
```

不是同一件事。

本课用 dotted outline 特意展示前者，使用背景色展示后者。

---

## 8. First、Last 与 Only

```css
:first-child {}
:last-child {}
:only-child {}
```

它们基于元素兄弟关系。

`only-child` 表示当前元素没有其他元素兄弟，不是说父元素中连文本节点或注释都不能存在。

---

## 9. Failure Lab

### Failure 1：把 `nth-child` 当成 `nth-of-type`

先写出编号集合，再判断。

### Failure 2：把筛选后编号写成“第 2 位且 eligible”

对照 `of S` 与普通 Compound Selector。

### Failure 3：用位置表达业务身份

```text
第二个按钮就是删除
第三行就是管理员
```

DOM 插入、排序或权限差异都会破坏这种假设。业务身份应使用稳定 class、attribute 或语义结构。

### Failure 4：为证明动态变化而提前引入 JavaScript

CSS 机制可以通过两个静态状态或手动编辑 HTML 完整证明，因此不应把 DOM 编程作为前置。

---

## 10. Evidence Contract

```text
Elements：确认真实兄弟集合
Styles：确认结构规则是否匹配
静态状态 A / B：证明结构变化导致索引变化
手动调整 HTML：进行额外回归
```

---

## 11. Challenge

1. 在两个队列中分别增加一个 blocked 项。
2. 预测 `:nth-child(2 of .eligible)` 是否变化。
3. 把第二个 eligible 改为 blocked。
4. 刷新并用 Styles 验证。
5. 创建 `:nth-child(-n + 3 of .eligible)`。
6. 记录过滤集合与最终命中项。

---

## 12. Mastery Check

1. `nth-child` 的编号集合是什么？
2. `nth-of-type` 的编号集合是什么？
3. `of S` 在编号前还是编号后过滤？
4. `.eligible:nth-child(2)` 与 `:nth-child(2 of .eligible)` 有何差异？
5. 为什么结构位置不应承担稳定业务身份？
6. 静态前后状态为什么足以证明结构匹配会随 DOM 改变？
