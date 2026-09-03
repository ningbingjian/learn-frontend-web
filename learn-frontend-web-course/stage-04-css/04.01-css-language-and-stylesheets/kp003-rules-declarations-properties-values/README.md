# KP003：Rule、Selector、Declaration、Property 与 Value

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP003 |
| 深度 | Must |
| 主问题 | 一段 CSS 源码到底由哪些语言单位组成，浏览器怎样局部忽略错误？ |
| 学习者技术边界 | 只使用 HTML、CSS 与 DevTools，不编写 JavaScript |

> Stage 04 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. 本课最终要建立什么

完成本课后，你应该能够准确指出：

```text
Rule / Ruleset
Selector
Selector List
Declaration Block
Declaration
Property
Value
```

并能区分三类常见问题：

```text
Selector 没有匹配
Declaration 的 Property 不存在
Declaration 的 Value 对当前 Property 无效
```

CSS 的错误恢复不是“浏览器随便猜”。浏览器会按语法边界保留仍然有效的部分，并忽略无法使用的部分。

---

## 2. 学习者核心文件

本课真正需要理解和修改的只有：

```text
index.html
styles.css
```

仓库同时提供：

```text
server.mjs
verify.mjs
package.json
```

后三项只是课程运行与完整性检查工具。执行命令即可，不要求阅读或理解其 JavaScript 实现。

---

## 3. 启动课程

进入当前目录：

```bash
npm run check
npm run dev
```

访问：

```text
http://localhost:4173
```

第一次打开页面时，先不要改代码。观察页面中不同卡片、状态标记和故意损坏的声明。

---

## 4. Rule 的结构

最小规则：

```css
.notice {
  color: #0f172a;
  background: #e2e8f0;
}
```

拆解：

```text
.notice
→ Selector

{ ... }
→ Declaration Block

color: #0f172a;
→ Declaration

color
→ Property

#0f172a
→ Value
```

整个结构通常称为一条 Rule 或 Ruleset。

### 重要边界

Selector 决定“哪些元素进入这条规则”。

Declaration 决定“如果匹配成功，尝试给这些元素提供什么属性值”。

最终值是否获胜，还要经过后续的 Cascade。不能把“选择器匹配”与“声明最终生效”混成同一件事。

---

## 5. Selector List

多个 Selector 可以共享一个 Declaration Block：

```css
.notice,
.warning,
.success {
  border-radius: 0.75rem;
}
```

逗号表示 Selector List，不表示后代关系。

阅读方式：

```text
.notice 匹配的元素
或 .warning 匹配的元素
或 .success 匹配的元素
```

### Failure Lab：列表中的非法 Selector

本课源码保留了一组故意错误的 Selector List。打开 DevTools：

1. 在 Elements 中选择对应目标元素。
2. 查看 Styles。
3. 确认整条含非法 Selector 的规则没有成为 Matched Rule。
4. 删除非法 Selector，刷新。
5. 再次确认规则出现。

普通 Selector List 中，一个无法解析的成员可能使整条规则无效。后续 04.02 会完整学习 Selector 解析边界。

---

## 6. 一个元素可以匹配多条 Rule

同一个元素可能同时匹配：

```css
article {}
.card {}
[data-state="active"] {}
```

这不表示浏览器只选择其中一条。实际过程是：

```text
收集所有匹配规则
→ 收集相关声明
→ 进入 Cascade
→ 为每个 Property 分别确定结果
```

因此 DevTools Styles 面板中看到多条匹配规则是正常现象。

---

## 7. 无效 Property 与无效 Value

### 7.1 不认识的 Property

```css
.card {
  definitely-not-a-property: 10px;
  color: #0f172a;
}
```

浏览器会忽略不认识的声明，但仍可保留同一 Declaration Block 中有效的 `color`。

### 7.2 Property 存在，但 Value 无效

```css
.card {
  color: definitely-not-a-color;
  background: #f8fafc;
}
```

`color` 的值无效，不代表整个规则都消失。有效的 `background` 仍然可以使用。

### DevTools 证据

1. 在 Elements 中选中目标元素。
2. 在 Styles 中定位规则。
3. 观察无效声明是否被标记或未参与结果。
4. 打开 Computed，搜索 `color`。
5. 展开属性来源，确认最终颜色来自其他有效声明、继承或初始值。

这里不使用 CSSOM JavaScript API。CSSOM 编程接口属于 Stage 09。

---

## 8. 错误恢复的最小心智模型

```text
样式表资源是否加载
↓
当前 Rule 是否能解析
↓
Selector 是否能解析并匹配
↓
Declaration 是否能解析
↓
Property 是否受支持
↓
Value 是否对该 Property 有效
↓
进入 Cascade
```

不要把所有“样式没生效”都归结为 Specificity。

---

## 9. 实验：一次只改一个变量

### 实验 A：改 Selector

把一个目标元素的 class 改掉，刷新页面，再在 Styles 中确认原规则不再匹配。

### 实验 B：改 Property

把正确 Property 改成一个不存在的名称，观察同一规则中其他声明仍然工作。

### 实验 C：改 Value

保留 Property，只把 Value 改成非法值，观察该声明被忽略。

### 实验 D：修复非法 Selector List

只删除列表中的非法成员，再确认整条规则恢复。

每次只改一个变量，才能知道现象由谁引起。

---

## 10. Production Boundary

生产代码中遇到 CSS 没生效，建议按下面顺序排查：

```text
1. HTML 目标是否存在
2. Stylesheet 是否加载
3. Rule 是否解析
4. Selector 是否匹配
5. Declaration 是否有效
6. 是否被 Cascade 覆盖
7. 最终 Computed Value 是什么
8. 布局或绘制阶段是否又限制了结果
```

当前课只负责前五步的语言基础。Cascade 在本 Module 后续课程完成，布局由后续 Module 完成。

---

## 11. Challenge

不增加 JavaScript，只修改 `index.html` 与 `styles.css`：

1. 新增一个同时匹配 Type、Class 与 Attribute Selector 的元素。
2. 给它写三条不同 Rule。
3. 故意让其中一个 Value 无效。
4. 在 DevTools 中记录：
   - 哪些 Rule 匹配；
   - 哪个声明无效；
   - Computed 中最终采用了什么值。
5. 修复错误并再次验证。

---

## 12. Mastery Check

你应该能够回答：

1. Selector 与 Declaration Block 分别负责什么？
2. Property 与 Value 的边界是什么？
3. 一个元素为什么可以同时出现多条 Matched Rule？
4. 一条无效声明为什么不一定破坏同一 Rule 的其他声明？
5. 普通 Selector List 中出现非法成员可能发生什么？
6. Styles 与 Computed 面板分别提供什么证据？
7. 为什么当前课不使用 JavaScript 访问 Stylesheet 对象？

最后一题的答案是：它属于后续 Web Platform / CSSOM 编程接口，不是学习 CSS 语言本身的前置条件。
