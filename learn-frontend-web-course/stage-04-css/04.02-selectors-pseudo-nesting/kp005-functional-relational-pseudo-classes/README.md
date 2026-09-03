# KP005：`:is()`、`:where()`、`:not()` 与 `:has()`

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo 与 Native Nesting |
| Lesson | KP005 |
| 深度 | Should / Expert |
| 主问题 | Functional / Relational Pseudo-class 怎样影响匹配、方向与 Specificity？ |
| 学习者技术边界 | 静态 HTML + CSS + DevTools；不通过脚本切换状态 |

> 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. 四个 Pseudo-class 的职责

```text
:is()     多个可选条件，减少重复
:where()  与 :is() 类似，但自身 Specificity 为零
:not()    排除满足参数的候选
:has()    让 Subject 根据关联元素是否存在而匹配
```

它们不是同一类“语法糖”。每一个都改变 Selector 的表达方式和维护边界。

---

## 2. 核心文件与运行

学习者只修改：

```text
index.html
styles.css
```

运行：

```bash
npm run check
npm run dev
```

`server.mjs`、`verify.mjs` 是黑盒工具。

---

## 3. `:is()`

```css
:is(.message.info, .message.warning, .message.success) {
  background: #eff6ff;
}
```

它等价于把三个完整条件组合为一个 Selector 参数列表，减少重复声明。

### Specificity 边界

```css
.specificity-is :is(.message, #never-used) {
  color: red;
}
```

即使 `#never-used` 在当前页面没有匹配，它仍可能抬高 `:is()` 的 Specificity。

因此后面的普通 class 规则不一定能覆盖。

在 Styles 中展开两条声明，按 04.01 的 Specificity 模型解释胜负。

---

## 4. `:where()`

```css
.specificity-where :where(.message, #never-used) {
  color: red;
}
```

`:where()` 自身贡献零 Specificity。

这使它适合：

```text
低权重基线
可覆盖默认样式
组件内部宽松约束
```

对比页面中的 `:is()` 与 `:where()` 区域，观察相同参数列表为何产生不同覆盖结果。

---

## 5. `:not()`

```css
.action:not(.archived, [aria-disabled="true"]) {}
```

Subject 仍然是 `.action`。

参数表示需要排除的条件：

```text
是 action
并且
不是 archived
并且
没有 aria-disabled=true
```

`:not()` 不会“删除元素”，只改变 Match Set。

### Boundary

当排除条件越来越多时，优先审查状态模型是否过于隐式。明确的状态属性有时比巨大的 `:not()` 更容易维护。

---

## 6. `:has()`

```css
.panel:has(.status-error) {}
```

Subject 是 `.panel`。

参数描述：

```text
以当前 panel 为锚点
检查其关系范围内是否存在 .status-error
```

页面提供两个静态面板：

```text
健康面板：包含 .status-ok
异常面板：包含 .status-error
```

无需点击按钮或编写 DOM 脚本，也能完整证明父元素关系匹配。

---

## 7. CSS 自己的兼容边界

本课使用：

```css
@supports selector(.panel:has(.status-error)) {
  .panel:has(.status-error) {
    /* progressive enhancement */
  }
}
```

这是 CSS 条件规则。

Stage 04 不要求通过 JavaScript Web Platform API 检测 Selector 支持。

---

## 8. Previous Sibling Pattern

```css
.step:has(+ .step.current) {}
```

Subject 是每一个 `.step`。

相对 Selector `+ .step.current` 检查：

```text
当前 step 后面紧邻的兄弟
是否是 current step
```

因此它可以选中 current 之前的相邻步骤。

这是理解 `:has()` 方向的好例子：Selector 仍匹配当前 Subject，而参数从 Subject 出发描述关系。

---

## 9. Failure Lab：方向写反

```css
.status-error:has(.panel) {}
```

这条规则把 `.status-error` 当 Subject，并检查它内部是否有 `.panel`。

实际 HTML 恰好相反：

```text
.panel
└── .status-error
```

所以不会命中父面板。

修复：

```css
.panel:has(.status-error) {}
```

诊断步骤：

1. 先标记 Subject。
2. 从 Subject 出发画关系箭头。
3. 对照真实 DOM。
4. 在 Styles 中确认修复前后规则是否匹配。

---

## 10. Static State Design

过去版本用脚本把 `.status-ok` 改成 `.status-error`。

现在页面同时提供两个静态状态，原因是：

```text
CSS 只负责根据已有状态匹配
状态怎样由应用逻辑产生
属于后续 JavaScript / DOM Stage
```

学习者仍可手动修改 class 并刷新，验证 Match Set 会变化。

---

## 11. Performance 与 Governance Boundary

- 不因为 `:has()` 强大就替代所有组件状态。
- 关系需求真实存在时才使用 Relational Selector。
- `:where()` 适合低权重基线，但要写清覆盖意图。
- `:is()` 参数中混入 ID 前评估 Specificity Debt。
- 复杂参数列表需要兼容与可读性审查。
- 浏览器 Selector Engine 与 Style Invalidation 深入后置 Stage 09 / 24。

---

## 12. Challenge

只修改 HTML / CSS：

1. 增加第三个面板，内部包含 warning 状态。
2. 用 `:is()` 合并 error 与 warning 的公共样式。
3. 用 `:where()` 建立可覆盖基线。
4. 用 `:not()` 排除 archived 操作。
5. 用 `:has()` 选择包含 warning 的父面板。
6. 故意把 Subject 写反，再用 DOM Tree + Styles 定位。

---

## 13. Mastery Check

1. `:is()` 与 `:where()` 最大的 Specificity 差异是什么？
2. `:not()` 的 Subject 是参数中的元素吗？
3. `.panel:has(.error)` 最终匹配谁？
4. `.step:has(+ .step.current)` 为什么能选中前一个兄弟？
5. 判断 `:has()` 方向时应该先标记什么？
6. 为什么静态状态足以教学本课 CSS 机制？
