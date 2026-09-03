# KP006：UI State、Form、Focus Pseudo-class 与 Pseudo-element

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo 与 Native Nesting |
| Lesson | KP006 |
| 深度 | Must / Should |
| 主问题 | 浏览器原生交互与表单状态怎样被 CSS 匹配，Pseudo-element 为什么不是业务内容容器？ |
| 学习者技术边界 | HTML + CSS + 浏览器原生行为 + DevTools |

> 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. 不需要 JavaScript 的状态实验

浏览器自身就会产生：

```text
:hover
:active
:focus
:focus-visible
:focus-within
:required
:valid
:invalid
:checked
:disabled
:read-only
```

学习者只需要：

```text
移动鼠标
按住按钮
使用 Tab
填写表单
勾选复选框
提交表单
```

过去版本通过事件监听和 Form API 输出状态。现在全部改为原生交互与 DevTools 观察。

---

## 2. 核心文件与运行

修改：

```text
index.html
styles.css
```

运行：

```bash
npm run check
npm run dev
```

`server.mjs` 与 `verify.mjs` 是黑盒工具。

---

## 3. `:hover` 与 `:active`

```css
.interactive-target:hover {}
.interactive-target:active {}
```

`:hover` 表示指针悬停条件。

`:active` 通常表示元素正在被激活的短暂阶段，例如鼠标按下尚未释放。

### Boundary

触屏、键盘和辅助技术不一定产生相同 Hover 行为，因此 Hover 不能成为唯一反馈。

---

## 4. `:focus` 与 `:focus-visible`

```css
.interactive-target:focus {}
.interactive-target:focus-visible {}
```

`:focus` 匹配当前获得焦点的元素。

`:focus-visible` 让浏览器根据输入方式与启发规则决定是否需要明显焦点指示。

实验：

1. 鼠标点击链接。
2. 再使用 Tab 移动焦点。
3. 比较 outline。
4. 在 DevTools 中临时强制 `:focus` / `:focus-visible` 状态。
5. 确认焦点指示不是只靠颜色变化。

---

## 5. `:focus-within`

```css
.focus-card:focus-within {}
```

当容器本身或任意后代获得焦点时，容器匹配。

这适合：

```text
表单分组
搜索区域
复合控件
编辑面板
```

它不是事件冒泡，也不要求事件监听。

---

## 6. Form State

### Required

```css
input:required {}
```

来自 HTML `required` 语义。

### Valid / Invalid

```css
input:valid {}
input:invalid {}
```

浏览器根据控件类型、约束和当前值判断。

输入一个错误邮箱，再输入合法邮箱，直接观察边框与 Styles。

### Checked

```css
input:checked {}
```

勾选复选框即可产生状态。

### Disabled

```css
button:disabled {}
```

必须有真实 HTML `disabled` 属性。

页面还提供一个 `aria-disabled="true"` 的普通元素，用于说明：

```text
视觉上像 disabled
≠
浏览器原生 disabled 行为
```

### Read-only

```css
input:read-only {}
```

与 `disabled` 的可聚焦、提交和交互语义不同。完整表单行为在 Stage 07 深入。

---

## 7. Pseudo-class 与 Pseudo-element

Pseudo-class：

```text
选择真实元素的状态或关系
```

Pseudo-element：

```text
样式化元素的抽象部分或生成一个样式化目标
```

示例：

```css
.decorated-status::before {}
.decorated-status::after {}
.marker-list li::marker {}
::selection {}
```

在 Elements / Styles 中查看浏览器展示的 pseudo 节点与对应规则，但不要把它理解为普通 HTML Element。

---

## 8. Generated Content Boundary

装饰内容可以使用：

```css
.status::before {
  content: "● ";
}
```

关键业务信息不应该只存在于：

```css
.delete::before {
  content: "删除项目";
}
```

原因：

- HTML 语义中没有真实文字。
- 复制与查找可能不一致。
- 辅助技术处理存在边界。
- 关闭 CSS 后信息消失。
- 内容与样式职责混乱。

页面中的正确示例把关键文字保留在 `<span>` 中，Pseudo-element 只增加“提示”装饰。

---

## 9. Failure Lab

### Failure 1：Hover-only

只有鼠标悬停时才出现必要操作或信息。

### Failure 2：无替代移除 Focus Outline

```css
.focus-removed:focus {
  outline: none;
}
```

如果没有新的高可见焦点样式，键盘用户会失去位置感。

### Failure 3：CSS 模拟 Disabled

改变颜色和透明度不会自动阻止交互，也不会建立原生语义。

### Failure 4：Generated-content-only Label

关键文字只写在 `content` 中，CSS 关闭后内容消失。

### Failure 5：为观察状态提前使用 Event/Form API

所有核心状态都可通过浏览器原生交互证明，因此本课不要求 JavaScript。

---

## 10. Evidence Contract

```text
键盘 Tab / Shift+Tab
鼠标 Hover / Active
原生表单校验
复选框 Checked
Elements / Styles 强制状态
Computed 面板
关闭 CSS 后检查关键信息是否仍存在
```

---

## 11. Challenge

1. 为链接和按钮设计不同的 hover / active / focus-visible。
2. 增加一个 required URL 输入框。
3. 观察空值、非法 URL、合法 URL 的状态。
4. 创建 checkbox + label。
5. 用 `:focus-within` 高亮整个分组。
6. 创建纯装饰 `::before`。
7. 确保关闭 CSS 后所有关键业务文字仍然存在。

---

## 12. Mastery Check

1. Hover 为什么不能作为唯一交互反馈？
2. `:focus` 与 `:focus-visible` 的用途有什么差异？
3. `:focus-within` 是事件冒泡吗？
4. `aria-disabled` 与 HTML `disabled` 是否等价？
5. Pseudo-element 是普通 DOM Element 吗？
6. 哪些内容适合 Generated Content，哪些不适合？
7. 为什么不需要事件脚本也能完成本课？
