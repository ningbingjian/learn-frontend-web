# KP007：Native CSS Nesting、`&` 与 Selector Context

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo 与 Native Nesting |
| Lesson | KP007 |
| 深度 | Should / Expert |
| 主问题 | 嵌套源码最终组合成什么 Selector，`&` 为什么不是字符串拼接？ |
| `:scope` 边界 | 只解释概念；scoped DOM query 延后 Stage 07 |
| 学习者技术边界 | HTML + CSS + DevTools |

> 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. Native Nesting 解决什么

没有 Nesting：

```css
.component-card {}
.component-card .component-card__meta {}
.component-card > .component-card__title {}
.component-card[data-state="active"] {}
.component-card:hover {}
```

Native CSS Nesting 可以把相关规则放在父规则上下文中：

```css
.component-card {
  .component-card__meta {}
  & > .component-card__title {}
  &[data-state="active"] {}
  &:hover {}
}
```

但浏览器最终仍按组合后的 Selector 匹配元素。Nesting 不会创建组件隔离。

---

## 2. 核心文件与运行

学习者修改：

```text
index.html
styles.css
```

运行：

```bash
npm run check
npm run dev
```

`server.mjs` 与 `verify.mjs` 是黑盒维护工具。

---

## 3. 隐式后代 Nesting

```css
.component-card {
  .component-card__meta {
    color: #475569;
  }
}
```

可以读作：

```css
.component-card .component-card__meta
```

嵌套子规则没有显式 `&` 时，常见情况形成后代关系。

### DevTools

1. 选中 `.component-card__meta`。
2. 在 Styles 中观察浏览器展示的 Selector。
3. 对照源文件中的嵌套结构。
4. 把 meta 移出 card，刷新确认规则不再匹配。

---

## 4. 显式 `&`

### 当前元素状态

```css
.component-card {
  &:hover {}
  &[data-state="active"] {}
}
```

组合为：

```css
.component-card:hover {}
.component-card[data-state="active"] {}
```

### 直接子元素

```css
.component-card {
  & > .component-card__title {}
}
```

组合为：

```css
.component-card > .component-card__title {}
```

`&` 代表当前父 Selector Context，不是一个可以任意拼接的文本变量。

---

## 5. Ancestor Context

```css
.component-card {
  .theme-dark & {
    color: white;
  }
}
```

组合为：

```css
.theme-dark .component-card
```

这表示当前 card 位于 `.theme-dark` 后代中。

### Boundary

祖先上下文能表达主题或环境，但也会增加外部耦合。不要让组件依赖大量页面级祖先类。

---

## 6. Parent Selector List Specificity

```css
#never-used,
.specificity-parent {
  & .specificity-child {
    color: red;
  }
}
```

Nesting 与 `:is()` 的 Specificity 心智模型相关：父 Selector List 中更高 Specificity 的成员可能影响组合结果，即使该成员没有匹配当前元素。

页面后面还有普通 class 规则。使用 Styles 比较，解释为什么后者未必获胜。

治理建议：

- 父列表不要随意混入 ID。
- Nesting 不能替代 Specificity 设计。
- 为了代码缩进整齐而合并完全不同权重的父 Selector，可能制造债务。

---

## 7. Failure Lab：`&__element`

Sass 中常见：

```scss
.block {
  &__element {}
}
```

预处理器会做字符串拼接。

Native CSS 中：

```css
.bem-card {
  &__label {}
}
```

不会把它当成 `.bem-card__label` 的字符串拼接。

正确做法：

```css
.bem-card {
  .bem-card__label {}
}
```

或直接：

```css
.bem-card__label {}
```

Native Nesting 是 Selector 组合，不是类名生成器。

---

## 8. Nesting 不等于 Scope

```text
源码写在父规则内部
≠
样式只存在于一个封闭组件
```

组合后的 Selector 仍在普通文档样式系统中参与 Cascade。

真正的样式封装、Shadow DOM 与 Web Components 后置 Stage 13。

`@scope` At-rule 与 Scoping Proximity 已在 04.01 学习。

---

## 9. `:scope` 的边界

`:scope` Pseudo-class 表示当前参考根。

它常见于 scoped DOM query，例如以某 Element 为查询根的场景。但查询 API 属于 Stage 07。

当前课只需掌握：

```text
:scope  是 Pseudo-class，表示参考根
@scope  是 At-rule，限制 CSS 规则作用范围并参与 Scoping Proximity
```

本课不要求编写 DOM 查询，也不把 query 结果作为验收。

---

## 10. Evidence Contract

```text
读取 Nested Source
→ 手工写出组合后的 Selector
→ 在 Elements 中确认 DOM 关系
→ 在 Styles 中确认浏览器匹配的规则
→ 手动改变 class / attribute / ancestor
→ 刷新回归
```

---

## 11. Production Boundary

- Nesting 深度建议控制在 2～3 层。
- 不把页面 DOM 路径搬进组件内部。
- 不把不同权重的父 Selector 随意放进同一列表。
- `&` 只表示 Selector Context，不进行字符串拼接。
- Nesting 不提供隔离。
- `:scope` 与 `@scope` 必须区分。
- 兼容策略应在项目 Browser Baseline 中明确。

---

## 12. Challenge

1. 把一组平铺 Selector 改成 Native Nesting。
2. 对每条嵌套规则写出组合结果。
3. 增加 `data-state="warning"` 状态。
4. 增加一个祖先主题上下文。
5. 故意写 `&__icon`。
6. 用完整 class 修复。
7. 检查嵌套深度和 Specificity 是否可接受。

---

## 13. Mastery Check

1. 隐式后代 Nesting 通常组合成什么？
2. `&:hover` 与 `& > child` 怎样展开？
3. `.theme-dark &` 的 Subject 是谁？
4. Parent Selector List 为什么可能抬高嵌套规则权重？
5. Native CSS 为什么不能照搬 Sass 的 `&__element`？
6. Nesting 是否提供组件隔离？
7. `:scope` 与 `@scope` 有什么根本差异？
8. 为什么 scoped DOM query 不在本课动手实现？
