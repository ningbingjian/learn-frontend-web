# KP002：Attribute Selector——Presence、Value、Token 与字符串匹配

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.02：Selector、关系匹配、Pseudo 与 Native Nesting |
| Lesson | KP002 |
| 深度 | Must / Should |
| 主问题 | 怎样根据元素真实属性匹配，而不把任意字符串包含关系误当成业务状态？ |
| 学习者技术边界 | HTML + CSS + DevTools |

> 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. 学习目标

本课覆盖：

```text
[attr]
[attr="value"]
[attr~="token"]
[attr|="prefix"]
[attr^="prefix"]
[attr$="suffix"]
[attr*="substring"]
[attr="value" i]
```

重点不是背符号，而是为每一种匹配方式建立清晰的数据契约。

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

## 3. Presence Match

```css
[data-state] {
  border-style: solid;
}
```

它只检查属性是否存在，不关心具体值。

下面两个元素都匹配：

```html
<div data-state="active"></div>
<div data-state=""></div>
```

没有 `data-state` 的元素不匹配。

---

## 4. Exact Value Match

```css
[data-state="active"] {
  background: #dcfce7;
}
```

适合表达离散状态：

```text
active
disabled
loading
error
```

它比字符串包含匹配更符合业务语义。

### DevTools 实验

1. 选中 `data-state="active"` 的卡片。
2. 在 Styles 中确认 exact selector 匹配。
3. 把属性改为 `inactive`。
4. 刷新，确认规则退出 Matched Rules。

---

## 5. Token Match `~=`

```css
[data-tags~="urgent"] {}
```

`~=` 按空格分隔的 token 集合匹配。

```html
<div data-tags="urgent finance"></div>
```

会匹配 `urgent`。

但：

```html
<div data-tags="urgent-finance"></div>
```

不会把 `urgent` 当成独立 token。

适用场景是属性本身被设计为 token list，而不是任意文本。

---

## 6. Hyphen Match `|=`

```css
[lang|="zh"] {}
```

匹配：

```text
zh
zh-CN
zh-Hans
```

但不会把任意包含 `zh` 的字符串都选中。

它常用于语言标签一类连字符层级值。

---

## 7. Prefix、Suffix 与 Substring

```css
[data-code^="prod-"] {}
[data-file$=".pdf"] {}
[data-user*="admin"] {}
```

分别表示：

```text
以某字符串开头
以某字符串结尾
任意位置包含某字符串
```

### Failure Lab：Substring Over-match

```css
[data-user*="admin"] {}
```

可能同时匹配：

```text
admin
super-admin
not-an-admin-example
```

如果业务真正想表达角色，应优先：

```html
data-role="admin"
```

以及：

```css
[data-role="admin"] {}
```

不要把模糊文本搜索当成状态模型。

---

## 8. Case Modifier

```css
[data-env="prod" i] {}
```

`i` 表示 ASCII case-insensitive matching，因此可以匹配：

```text
prod
PROD
Prod
```

是否应该忽略大小写取决于属性契约，不能因为“方便”就统一加 `i`。

---

## 9. Attribute 与 Class 的选择

### 适合 Attribute

- HTML 原生属性已经表达语义。
- 组件有明确状态值。
- 状态值会被测试、样式和语义共同使用。

例如：

```html
<section data-state="loading">
```

### 适合 Class

- 只是样式分组。
- 不需要表达离散数据状态。
- 现有架构已经建立稳定命名契约。

关键不是“Attribute 更现代”，而是属性是否代表真实状态。

---

## 10. Evidence Contract

本课不使用脚本输出 Match Count。

验证方式：

```text
选中目标元素
→ 查看其真实属性
→ 在 Styles 中确认哪条 Attribute Selector 匹配
→ 手动改变属性值
→ 刷新
→ 再次确认
```

对于 `*=` 的过度匹配，页面中已经同时放置多个相近属性值，直接逐个查看 Matched Rules。

---

## 11. Production Boundary

- `*=`、`^=`、`$=` 适合字符串结构，不适合模糊表达权限。
- 状态属性应有有限、文档化的值集合。
- 大小写敏感性必须由数据契约决定。
- `data-*` 不自动等于“正确状态模型”。
- CSS 只能根据已有属性匹配；状态怎样产生属于后续应用逻辑。

---

## 12. Challenge

1. 创建 `data-state="pending"`、`active`、`failed` 三个静态卡片。
2. 使用 exact selector 分别样式化。
3. 新增一个 token list 属性并用 `~=` 匹配。
4. 故意使用 `*=` 造成误匹配。
5. 改成精确属性契约。
6. 用 DevTools 记录重构前后的 Matched Rules。

---

## 13. Mastery Check

1. `[attr]` 与 `[attr=""]` 有什么差异？
2. `~=` 为什么不是普通 substring？
3. `|=` 适合哪类值？
4. `*=` 最常见的生产风险是什么？
5. `i` 修饰符改变了什么？
6. 什么情况下状态属性比模糊字符串匹配更可靠？
