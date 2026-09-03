# KP005：`:is()`、`:where()`、`:not()` 与 `:has()`——函数式和关系选择

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo、Nesting 与 `:scope` |
| Lesson | KP005 |
| 深度 | Should / Expert |
| Pattern | BROWSER-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | 函数式 pseudo-class 怎样改变匹配集合、关系方向和 specificity？ |
| 运行要求 | Node.js 20+，支持 Selectors Level 4 主流能力的现代浏览器 |

---

## 1. 本课最终要做出什么

你会完成一个 **Functional / Relational Pseudo-class Laboratory**：

- 使用 `:is()` 合并重复 selector。
- 使用 `:where()` 添加过滤条件但保持零 specificity。
- 使用 `:not()` 排除归档和禁用操作。
- 使用 `:has()` 根据后代或相邻兄弟状态匹配候选元素。
- 动态切换子节点状态，观察 `:has()` 匹配实时变化。
- 故意写反 `:has()` 的关系方向，证明它不会“向上返回父节点”。

页面会输出每条 selector 的：

```text
匹配数量
匹配对象
:has() selector support
```

---

## 2. 本课解决什么问题

### 重复 selector

```css
.message.info,
.message.warning,
.message.success {
  padding: 16px;
}
```

可以用：

```css
:is(.message.info, .message.warning, .message.success) {
  padding: 16px;
}
```

但 `:is()` 不只是缩短代码，它还会影响 specificity。

### 低 specificity 过滤

```css
:where(.message, #never-used) {}
```

无论参数中出现 class 还是 ID，`:where()` 的 specificity 都是零。

### 排除集合

```css
.action:not(.archived, [aria-disabled="true"]) {}
```

表示：

```text
匹配 .action
且不匹配 .archived
且不匹配 [aria-disabled="true"]
```

### 关系选择

```css
.panel:has(.status-error) {}
```

候选元素是 `.panel`。

浏览器检查：

```text
这个 panel 是否存在匹配 .status-error 的后代？
```

命中后，最终被选择的仍然是 `.panel`。

---

## 3. 边界

### 本课完整拥有

- `:is(<forgiving-selector-list>)`
- `:where(<forgiving-selector-list>)`
- `:not(<complex-real-selector-list>)`
- `:has()` 的关系心智模型
- `:is()` / `:not()` / `:has()` 的 specificity 参数影响
- `:where()` 零 specificity
- Relative Selector 与 anchor element
- `:has(+ sibling)` 前一兄弟关系
- `:has()` 方向错误 Failure Lab
- 关系选择与状态 class 的取舍

### 本课不展开

- `@scope` at-rule：04.01。
- `:scope` pseudo-class：KP007。
- Native Nesting：KP007。
- 完整 Selector Engine 与 style invalidation 性能：Stage 09 / Stage 24。
- JavaScript DOM Traversal API：Stage 07。

---

## 4. 项目结构

```text
kp005-functional-relational-pseudo-classes/
├── README.md
├── index.html
├── styles.css
├── app.js
├── package.json
├── server.mjs
└── verify.mjs
```

---

## 5. Step 0：创建和运行

```bash
npm run check
npm run dev
```

打开：

```text
http://localhost:4173
```

先在 Console 验证浏览器是否支持：

```js
CSS.supports("selector(:has(*))")
```

预期在当前主流现代浏览器中为：

```text
true
```

课程仍要求理解渐进增强边界：如果目标环境不支持某个 selector，不应假设整套 UI 必须依赖它才能操作。

---

## 6. Step 1：使用 `:is()` 合并重复表达

HTML：

```html
<div class="message-grid">
  <article class="message info">Info message</article>
  <article class="message warning">Warning message</article>
  <article class="message success">Success message</article>
</div>
```

CSS：

```css
:is(.message.info, .message.warning, .message.success) {
  padding: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
}
```

匹配逻辑：

```text
候选元素匹配参数列表中的任意一个 selector
→ :is() 成功
```

Console：

```js
document.querySelectorAll(
  ":is(.message.info, .message.warning, .message.success)"
)
```

预期 `length === 3`。

### Forgiving Selector List

`:is()` 和 `:where()` 使用 forgiving selector list。

核心差异：

```text
普通 selector list
→ 其中一项 invalid，整条 selector list invalid

:is() / :where() 参数
→ 丢弃 invalid 项
→ 其余有效项仍可参与匹配
```

不要把这个结论扩展成“所有函数式 pseudo-class 都 forgiving”。

---

## 7. Step 2：观察 `:is()` 的 specificity 陷阱

本课故意写：

```css
.specificity-is :is(.message, #never-used) {
  color: #be123c;
}

.specificity-is .message.override {
  color: #047857;
}
```

虽然页面中不存在 `#never-used`，但 `:is()` 的 specificity 由参数列表中最具体的 selector 决定。

因此第一条包含 ID 级 specificity。

预期：

```text
文字仍然是第一条规则的红色
后写的 .message.override 没有获胜
```

这是一种常见 Specificity Debt：

```text
把一个高 specificity selector 放入 :is()
→ 整个 :is() 所在 selector 的覆盖成本升高
```

### Wrong Way

```css
:is(.button, #app) {}
```

只为了“顺便支持 #app”而混入 ID，可能让普通 `.button` 匹配也携带不必要的高 specificity。

---

## 8. Step 3：使用 `:where()` 明确低权重意图

```css
.specificity-where :where(.message, #never-used) {
  color: #be123c;
}

.specificity-where .message.override {
  color: #047857;
}
```

`:where()`：

```text
匹配能力与 :is() 相似
但它本身和参数对 specificity 的贡献恒为 0
```

因此后面的 `.message.override` 可以自然覆盖。

适用场景：

- Reset。
- Base Style。
- Design System 默认值。
- 容器过滤。
- 希望业务方容易覆盖的组件基线。

示例：

```css
:where(.prose h1, .prose h2, .prose h3) {
  line-height: 1.2;
}
```

---

## 9. Step 4：使用 `:not()` 排除不应参与的对象

```css
.action:not(.archived, [aria-disabled="true"]) {
  border-color: #2563eb;
  color: #1d4ed8;
  font-weight: 750;
}
```

匹配：

```text
.action
AND NOT .archived
AND NOT [aria-disabled="true"]
```

Console：

```js
document.querySelectorAll(
  ".action:not(.archived, [aria-disabled='true'])"
)
```

预期只匹配 Deploy。

### 注意

`:not()` 不会“删除元素”。

它只是在 selector matching 阶段排除候选元素。

### 反例

```css
div:not(span) {}
```

所有 `div` 本来就不是 `span`，这条 selector 只是增加复杂度和 specificity，没有增加有效信息。

---

## 10. Step 5：建立 `:has()` anchor 心智模型

```css
.panel:has(.status-error) {
  border-color: #dc2626;
  background: #fef2f2;
}
```

分解：

```text
.panel
→ anchor / subject candidate

:has(.status-error)
→ 以当前 panel 为锚点
→ 检查相对 selector 是否存在匹配

最终选中的仍然是 panel
```

这常被口语化称为“父选择器”，但更准确的心智模型是：

```text
关系 pseudo-class
候选元素根据相关元素的存在与关系决定是否匹配
```

`:has()` 不局限于后代关系。

---

## 11. Step 6：使用相邻兄弟关系选择前一项

```css
.step:has(+ .step.current) {
  background: #dbeafe;
  outline: 2px solid #2563eb;
}
```

它表示：

```text
候选 .step
→ 它后面紧邻的兄弟是否是 .step.current？
```

因此可以选择当前步骤的前一步。

对比：

```css
.step.current + .step {}
```

后者选择的是当前步骤后面的一个兄弟。

关系方向完全不同。

---

## 12. Step 7：Failure Lab——把 `:has()` 当成向上查询

错误规则：

```css
.status-error:has(.panel) {
  text-decoration: line-through;
}
```

开发者可能错误地理解为：

> 选择拥有这个 `.status-error` 的 `.panel`。

真实含义：

```text
候选是 .status-error
→ 检查其内部或指定相对关系中是否存在 .panel
```

当前 `.status-error` 内部没有 `.panel`，所以匹配 0 个。

正确表达：

```css
.panel:has(.status-error) {}
```

先写最终想要选择的主体，再在 `:has()` 中写关系条件。

诊断口诀：

```text
:has() 左边是谁
最终被选择的就是谁
```

---

## 13. Step 8：动态状态变化

按钮逻辑会在 Health panel 中切换：

```text
.status-ok
↔
.status-error
```

当状态变为 error：

```text
.panel:has(.status-error) 开始匹配
```

恢复 ok：

```text
匹配消失
```

证据区通过：

```js
document.querySelectorAll(".panel:has(.status-error)")
```

输出当前匹配数量。

这证明 `:has()` 基于当前 DOM 和状态动态参与 selector matching。

---

## 14. Specificity 收束

简化规则：

```text
:is()
→ 取参数中最高 specificity

:not()
→ 取参数中最高 specificity

:has()
→ 取参数中最高 specificity

:where()
→ 恒为 0
```

外部 selector 仍继续累加。

例如：

```css
.panel:has(#critical)
```

包含：

```text
.panel 的 class specificity
+
#critical 的 ID specificity
```

需要低权重时，可以组合：

```css
.panel:has(:where(.status-error, .status-warning)) {}
```

但不要为了技巧而技巧；先保证 selector 表达清晰。

---

## 15. 完整运行与验收

```bash
npm run check
npm run dev
```

验收：

- 三个 message 被 `:is()` 共同匹配。
- `:is(.message, #never-used)` 演示高 specificity 陷阱。
- `:where()` 默认样式可被 `.message.override` 覆盖。
- `:not()` 只匹配可用 action。
- Release panel 因 error 子节点被 `:has()` 匹配。
- Health panel 可动态进入和退出匹配集合。
- `:has(+ .step.current)` 命中当前步骤前一项。
- 错误方向 selector 匹配数量为 0。

---

## 16. Wrong Way

### Wrong Way 1：把 `:has()` 用于所有父子样式

如果给父元素增加稳定状态类更直接：

```html
<section class="panel panel--error">
```

就不必强行：

```css
.panel:has(.deep .nested .error-icon) {}
```

### Wrong Way 2：在 `:is()` 中混入不必要 ID

会提高所有匹配分支的覆盖成本。

### Wrong Way 3：用 `:not()` 枚举所有未来状态

```css
.button:not(.loading, .disabled, .hidden, .archived, .pending) {}
```

状态继续增加后容易遗漏。更稳定的模型可能是明确 `.button[data-interactive="true"]`。

### Wrong Way 4：只看视觉，不验证 match set

`:has()` 可能匹配成功但被 Cascade 覆盖，也可能没有匹配却由其他规则产生相同视觉。

必须使用 `querySelectorAll()` 或 DevTools Matched Rules。

---

## 17. Production Boundary

优先使用 `:has()` 的条件：

- 需求本质就是关系。
- HTML 语义不能直接表达该视觉状态。
- 不需要为了 CSS 再复制一份 JavaScript 状态。
- 目标浏览器支持满足产品约束。
- Selector 范围可控且可以测试。

优先使用状态 class / attribute 的条件：

- 状态由业务数据或权限决定。
- 需要跨组件、跨渲染边界传递。
- 需要稳定 API。
- 需要兼容更老环境。
- 复杂 `:has()` 会与深层 DOM 强耦合。

---

## 18. 本课只记住 3 件事

1. `:is()`、`:not()`、`:has()` 会从参数得到 specificity，`:where()` 始终为零。
2. `:has()` 左侧是最终候选元素，参数描述相对于它的关系。
3. 关系选择是工具，不应代替稳定的业务状态模型和组件边界。

---

## 19. Challenge

实现：

```text
表单组中存在 invalid 字段时突出整个组
当前步骤的前一步标记为 completed-candidate
卡片中不存在图片时采用 text-only 布局
```

要求：

- 至少使用一次 `:has()`。
- 至少使用一次 `:where()` 降低默认样式 specificity。
- 输出每条 selector 的匹配集合。
- 写出不用 `:has()` 的替代方案和 Trade-off。

---

## 20. Mastery Check

- 为什么 `:is(.card, #never)` 可能产生 ID 级 specificity？
- `:where()` 为什么适合 Base Style？
- `:not()` 是删除节点还是排除匹配？
- `.panel:has(.error)` 最终选择谁？
- `.step:has(+ .current)` 与 `.current + .step` 各自选择谁？
- 什么时候应该改用状态 class？

---

## 21. 标准依据

- W3C Selectors Level 4：`:is()`、`:not()`、`:where()`、`:has()`。
- 普通 selector list 与 forgiving selector list 的错误处理边界。
- 课程中的每个结论均要求通过 `querySelectorAll()`、DevTools 或真实状态变化验证。
