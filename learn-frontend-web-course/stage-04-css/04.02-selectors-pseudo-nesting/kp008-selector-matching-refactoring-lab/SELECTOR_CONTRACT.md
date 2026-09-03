# SELECTOR CONTRACT

## 1. Selector Depth Budget

默认不超过两层关系：

```text
.component
.component > .part
.component .part
```

超过三层必须说明真实结构契约和替代方案。

## 2. Specificity Budget

组件规则默认：

```text
Class / Attribute / Pseudo-class 级别
```

不默认使用 ID。`:is()` 参数引入 ID 时必须评审。低权重基线优先 `:where()`。

## 3. State Modeling

业务状态优先明确表达：

```html
data-state="current"
data-status="error"
aria-disabled="true"
```

不得依赖“第二个元素”“最后一行”等结构位置承担长期身份。

## 4. Attribute Contract

离散状态使用 exact match。`*=`、`^=`、`$=` 只用于确有字符串结构的值。

## 5. Relational Selector

使用 `:has()` 前必须写出：

```text
Subject
Anchor
Relationship
Expected Match Set
Fallback / Baseline
```

## 6. Nesting Contract

- Native Nesting 不是字符串预处理。
- 不使用 Sass 风格 `&__element`。
- 嵌套不提供组件隔离。
- 深度建议不超过 2～3 层。
- 每条嵌套规则都能还原为完整 Selector。

## 7. A11Y

- Hover 不得成为唯一反馈。
- Focus Indicator 不得无替代删除。
- Generated Content 不承担必要业务信息。
- Disabled 状态应由正确 HTML 语义承担。

## 8. Evidence Requirement

Stage 04 的 Selector 证据使用：

```text
Elements DOM Tree
Styles Matched Rules
Computed
静态 Broken / Fixed 对照
手动修改 HTML / CSS 后刷新
```

不要求 JavaScript、DOM Query API 或动态证据面板。

## 9. Future-stage Boundary

- DOM Query / Event / Form API：Stage 07。
- CSSOM 编程接口：Stage 09。
- Shadow DOM / Web Components：Stage 13。
- 测试工程：Stage 17。
- CI/CD：Stage 26。
