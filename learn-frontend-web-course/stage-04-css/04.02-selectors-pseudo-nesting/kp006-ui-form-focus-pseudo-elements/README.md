# KP006：UI State、Form、Focus Pseudo-class 与 Pseudo-element

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo、Nesting 与 `:scope` |
| Lesson | KP006 |
| 深度 | Must / Should |
| Pattern | A11Y-LAB + FAILURE-LAB + BROWSER-MECHANISM-LAB |
| 主问题 | 怎样用真实 UI 状态匹配元素，并区分 pseudo-class 与 pseudo-element？ |
| 运行要求 | Node.js 20+，现代浏览器，键盘 |

---

## 1. 本课最终要做出什么

本课实现一个 **UI / Form / Focus / Pseudo-element Laboratory**：

- 鼠标 `:hover` / `:active` 状态。
- 键盘 `:focus-visible` 状态。
- 容器 `:focus-within` 状态。
- 表单 `:required` / `:valid` / `:invalid`。
- `:checked`、`:disabled`、`:read-only`。
- `::before` / `::after` 装饰。
- `::marker` 列表标记。
- `::selection` 文本选择高亮。
- `getComputedStyle(element, "::before")` 证据。
- 表单提交和焦点事件证据。

这不是“伪类和伪元素 API 列表”，而是一条状态链：

```text
用户或文档状态变化
→ pseudo-class match set 改变
→ selector 命中不同元素
→ Cascade 得到样式

originating element
→ pseudo-element 表示渲染树中的抽象目标
→ 可以被样式化
→ 但不是普通 DOM Element
```

---

## 2. Pseudo-class 与 Pseudo-element

### Pseudo-class

```css
button:hover {}
input:invalid {}
.card:focus-within {}
```

它们选择的是：

```text
真实元素
+
该元素当前满足某种状态或关系
```

### Pseudo-element

```css
.status::before {}
li::marker {}
::selection {}
```

它们选择的是：

```text
与 originating element 关联的抽象渲染目标
```

通常使用双冒号。

关键差异：

```text
pseudo-class
→ 改变真实元素是否匹配

pseudo-element
→ 表示真实 DOM 之外或其内部特定部分的样式目标
```

---

## 3. 本课边界

### 完整拥有

- `:hover`
- `:active`
- `:focus`
- `:focus-visible`
- `:focus-within`
- `:enabled`
- `:disabled`
- `:checked`
- `:required`
- `:optional`
- `:valid`
- `:invalid`
- `:read-only`
- `:read-write`
- `:placeholder-shown`
- `::before`
- `::after`
- `::marker`
- `::selection`
- 基础 `::placeholder`
- Focus Indicator A11Y Failure Lab
- Generated Content 语义边界

### 不展开

- 完整 Form Constraint Validation API：Stage 07。
- Screen Reader 测试体系：Stage 14。
- Advanced Highlight API：Stage 22 / UI Engineering。
- Pseudo-element 内部 box generation 与 paint 细节：Stage 09。
- View Transition Pseudo-elements：04.11 / Stage 18。

---

## 4. 项目结构

```text
kp006-ui-form-focus-pseudo-elements/
├── README.md
├── index.html
├── styles.css
├── app.js
├── package.json
├── server.mjs
└── verify.mjs
```

---

## 5. Step 0：运行基线

```bash
npm run check
npm run dev
```

打开：

```text
http://localhost:4173
```

准备两种输入方式：

```text
鼠标
键盘 Tab / Shift + Tab
```

仅使用鼠标观察不足以完成本课验收。

---

## 6. Step 1：hover 与 active

```css
.demo-link:hover,
.demo-button:hover {
  background: #eef2ff;
}

.demo-link:active,
.demo-button:active {
  transform: translateY(1px);
}
```

含义：

```text
:hover
→ 指针设备当前指向元素

:active
→ 元素处于激活过程，例如鼠标按下尚未释放
```

### Failure Lab：把 hover 当成唯一交互反馈

只写：

```css
.button:hover {}
```

会漏掉：

- 键盘用户。
- 触摸设备。
- 某些辅助技术。
- 没有 hover 能力的环境。

Hover 只能是交互反馈的一部分，不能是唯一可发现性来源。

---

## 7. Step 2：focus 与 focus-visible

本课样式：

```css
.demo-link:focus,
button:focus,
input:focus {
  outline: 2px solid transparent;
}

.demo-link:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 3px;
}
```

心智模型：

```text
:focus
→ 元素当前获得焦点

:focus-visible
→ UA 根据交互方式和平台启发式判断
→ 当前焦点应显示明显指示器
```

请先鼠标点击按钮，再使用 Tab 聚焦按钮，对比视觉。

### 为什么不能直接写

```css
*:focus {
  outline: none;
}
```

这会删除浏览器默认焦点指示器，却没有提供替代。

结果可能是：

```text
键盘用户知道焦点在移动
但看不到移动到哪里
```

正确要求：

```text
可以定制
不能无替代地移除
```

---

## 8. Step 3：focus-within

```css
.focus-card:focus-within {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgb(37 99 235 / 16%);
}
```

候选是 `.focus-card`。

只要它自己或其后代拥有焦点，就会匹配。

适合：

- 表单组。
- 搜索框容器。
- 组合组件。
- 菜单区域。
- 编辑器边界。

Console：

```js
document.querySelectorAll(".focus-card:focus-within")
```

Tab 进入 Email 输入框时，预期数量由 0 变为 1。

---

## 9. Step 4：disabled 与 enabled

```css
button:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}
```

`:disabled` 是语义状态，不是视觉判断。

下面的元素：

```html
<button type="button" disabled>禁用操作</button>
```

会匹配。

但：

```css
button {
  pointer-events: none;
}
```

不会自动让它匹配 `:disabled`。

CSS 属性不能替代 HTML 的禁用语义。

---

## 10. Step 5：checked

HTML：

```html
<div class="check-row">
  <input id="agree" name="agree" type="checkbox">
  <label for="agree">我已经阅读发布规则</label>
</div>
```

CSS：

```css
input:checked + label {
  color: #166534;
  font-weight: 750;
}
```

分解：

```text
input:checked
→ 选中状态的 input

+
→ 紧邻下一个兄弟

label
→ 最终选择 label
```

这是 pseudo-class 与 combinator 的组合。

---

## 11. Step 6：required、valid 与 invalid

HTML：

```html
<input
  id="email"
  name="email"
  type="email"
  required
  placeholder="name@example.com"
>
```

CSS：

```css
input:required {
  border-left-width: 6px;
}

input:invalid:not(:placeholder-shown) {
  border-color: #dc2626;
  background: #fef2f2;
}

input:valid:not(:placeholder-shown) {
  border-color: #16a34a;
  background: #f0fdf4;
}
```

为什么组合 `:not(:placeholder-shown)`：

```text
避免空输入框初始加载时立刻用强烈错误色轰炸用户
```

但它不是完整表单 UX 方案。

生产环境还要决定：

- 何时显示错误。
- 是否使用 `:user-invalid`。
- 错误文本在哪里。
- `aria-describedby` 如何关联。
- 服务端错误怎样合并。
- 提交失败后焦点怎样移动。

本课只建立 selector 状态基础。

---

## 12. Step 7：read-only

```css
input:read-only {
  color: #475569;
  background: #f1f5f9;
}
```

HTML：

```html
<input value="production" readonly>
```

注意：

```text
readonly
≠
disabled
```

常见差异：

- readonly 控件通常仍可聚焦和提交。
- disabled 控件通常不能交互，也不会作为成功控件提交。
- 两者匹配不同 pseudo-class。

表单行为的完整规范归 Stage 03 / Stage 07。

---

## 13. Step 8：使用 `::before` 与 `::after`

```css
.decorated-status::before {
  content: attr(data-decoration);
  margin-right: 0.55em;
  color: #16a34a;
}

.decorated-status::after {
  content: " decorative";
  margin-left: 0.55em;
  color: #64748b;
  font-size: 0.85em;
}
```

当 `content` 的 computed value 不是 `none` 时，`::before` 和 `::after` 可以生成 box。

它们与 originating element 相关联，但不是：

```text
document.querySelector() 可以返回的普通 Element
```

错误尝试：

```js
document.querySelector(".decorated-status::before")
```

这不是有效的普通 DOM 元素查询模型。

可以读取样式证据：

```js
getComputedStyle(
  document.querySelector(".decorated-status"),
  "::before"
).content
```

---

## 14. Generated Content 的 A11Y 边界

不要把关键业务信息只放在：

```css
.button::before {
  content: "删除";
}
```

原因：

- Generated content 与 Accessibility Tree 的暴露存在环境差异。
- 复制、翻译、搜索、测试和内容管理困难。
- CSS 被禁用时信息丢失。
- `content` 不是业务内容管理层。

本课中的圆点和 “decorative” 只承担装饰作用，真实状态文本仍存在于 HTML：

```html
Release status: ready
```

原则：

```text
内容和语义放 HTML
装饰和非关键提示可用 pseudo-element
```

---

## 15. Step 9：`::marker`

```css
.milestones li::marker {
  color: #3156a6;
  font-weight: 800;
}
```

`::marker` 表示 list item 自动生成的 marker box。

它不是普通 `li` 内容本身。

注意：

```text
::marker 可用属性集合不是“所有 CSS 属性”
```

课程只使用颜色和字体权重等稳定能力。

---

## 16. Step 10：`::selection`

```css
::selection {
  color: #111827;
  background: #fde68a;
}
```

拖动选择文本后观察。

`::selection` 表示用户选择的文档片段，是 Highlight Pseudo-element。

A11Y 要求：

- 前景和背景保持足够对比。
- 不要让选择文本变得不可读。
- 不要把选择样式作为唯一业务反馈。

---

## 17. Step 11：状态证据输出

`app.js` 监听：

```js
["focusin", "focusout", "input", "change"]
```

输出：

- `document.activeElement`
- `form.checkValidity()`
- 各 pseudo-class 当前匹配数量
- `::before` 的 computed content

关键代码：

```js
getComputedStyle(decorated, "::before").content
```

表单提交时：

```js
event.preventDefault();
form.reportValidity();
```

页面不会刷新，浏览器仍会显示原生约束验证反馈。

---

## 18. 完整运行与验收

```bash
npm run check
npm run dev
```

必须完成：

1. 鼠标 hover / active。
2. Tab 触发 `:focus-visible`。
3. 焦点进入表单后 `.focus-card:focus-within` 匹配。
4. 勾选 checkbox 后 label 样式变化。
5. 输入非法 Email 后 `:invalid` 变化。
6. 输入合法 Email 后 `:valid` 变化。
7. readonly 与 disabled 视觉和状态不同。
8. 选择文本观察 `::selection`。
9. 验证 `document.querySelector(".decorated-status::before")` 不是正确 DOM 查询方式。
10. 在证据区读取 `::before` computed content。

---

## 19. Wrong Way

### Wrong Way 1：删除 focus outline

```css
:focus {
  outline: none;
}
```

没有替代焦点样式时禁止这样做。

### Wrong Way 2：只使用 hover

触摸和键盘路径会缺少反馈。

### Wrong Way 3：用 class 模拟 disabled，却不提供语义

```html
<button class="disabled">Delete</button>
```

如果仍能获得焦点、点击和提交，这不是 disabled。

### Wrong Way 4：用 pseudo-element 承载必要标签

必要文本、错误信息和按钮名称应进入 HTML 与 Accessibility Tree。

### Wrong Way 5：只使用颜色表示 invalid

还需要错误文本、关联关系和焦点管理。

---

## 20. Production Boundary

Pseudo-class 适合读取平台真实状态：

- 焦点。
- Hover / Active。
- 表单约束状态。
- Disabled / Checked。
- URL target。
- Open / Modal 等平台状态。

状态 class / attribute 适合业务状态：

- 权限。
- 异步 loading。
- 后端审核结果。
- 自定义工作流状态。
- 跨组件状态机。

Pseudo-element 适合：

- 非关键装饰。
- Marker。
- Selection highlight。
- 特定渲染片段。

不适合：

- 必要业务内容。
- 必须被表单、搜索、复制和辅助技术稳定读取的信息。
- 替代真实可交互控件。

---

## 21. 本课只记住 3 件事

1. Pseudo-class 选择处于某种状态的真实元素；Pseudo-element 表示关联的抽象渲染目标。
2. 焦点指示器不能无替代地移除，`:focus-visible` 与 `:focus-within` 是键盘体验的重要工具。
3. Generated content 默认只承担装饰，关键内容和语义必须存在于 HTML。

---

## 22. Challenge

实现一个可访问的注册表单：

- 输入组使用 `:focus-within`。
- 必填项有非颜色提示。
- 交互后才突出 invalid。
- Checkbox 使用 `:checked + label`。
- Disabled submit 使用真实 `disabled`。
- 每个标题前使用装饰性 `::before`。
- 错误文本必须真实存在于 DOM。

提交：

- Keyboard Walkthrough。
- Matched Selector Evidence。
- Accessibility Tree 截图说明。
- Wrong Way 与修复对比。

---

## 23. Mastery Check

- `:focus` 与 `:focus-visible` 有什么关系？
- 父容器何时匹配 `:focus-within`？
- `pointer-events: none` 会让按钮匹配 `:disabled` 吗？
- `readonly` 和 `disabled` 是否相同？
- `::before` 是否可以被 `querySelector()` 当成 Element 返回？
- 为什么不能只用 generated content 提供按钮名称？
- `::selection` 选择的是普通 DOM 元素吗？

---

## 24. 标准依据

- W3C Selectors Level 4：UI State、Input State、Focus 与 Form Pseudo-classes。
- W3C CSS Pseudo-Elements Level 4：Generated Content、Marker 与 Highlight Pseudo-elements。
- HTML 约束验证和控件语义由 Stage 03 / Stage 07 继续完整教学。
