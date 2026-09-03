# KP008：CSS 错误恢复、DevTools 与 Value Processing Pipeline

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP008 |
| 深度 | Should / Expert |
| 主问题 | CSS 在哪个阶段失败，为什么“前一条正确声明”有时也不会成为最终回退？ |
| 学习者技术边界 | HTML + CSS + DevTools；CSSOM 编程接口延后到 Stage 09 |

> 边界规则：[STAGE_BOUNDARY.md](../../STAGE_BOUNDARY.md)

---

## 1. 本课最终要建立什么

你将区分：

```text
Stylesheet 资源失败
Rule / Selector 解析失败
Declaration 解析失败
Property 不受支持
Value 对 Property 无效
Cascade 后在 Computed-value Time 失效
Used Value 受布局环境影响
Actual Rendering 受设备和实现影响
```

并建立值处理主线：

```text
Declared
→ Cascaded
→ Specified
→ Computed
→ Used
→ Actual
```

---

## 2. 核心文件与工具边界

学习者只修改：

```text
index.html
styles.css
```

仓库中的 `package.json`、`server.mjs` 和 `verify.mjs` 是黑盒课程工具，只执行：

```bash
npm run check
npm run dev
```

本课不要求创建 `app.js`，也不使用 CSSOM JavaScript API。

---

## 3. 实验 A：无效 Declaration 的局部影响

```css
.invalid-value-demo {
  color: definitely-not-a-color;
  background: #dbeafe;
  border: 2px solid #2563eb;
}
```

预期：

- `color` 声明无效；
- `background` 有效；
- `border` 有效；
- 整条 Rule 不会因为一个 Value 无效而全部消失。

### 观察方法

1. 在 Elements 中选中目标段落。
2. 在 Styles 中定位 `.invalid-value-demo`。
3. 观察无效 `color` 的状态。
4. 打开 Computed，搜索 `color`、`background-color` 与 `border`。
5. 记录每个最终值的来源。

---

## 4. 实验 B：未知 Property

```css
.unknown-property-demo {
  definitely-not-a-property: 12px;
  color: #166534;
}
```

浏览器不认识第一个 Property，因此忽略该 Declaration，但后面的 `color` 仍可使用。

```text
Property 不受支持
≠ Selector 没匹配
≠ 整个 Stylesheet 失败
```

---

## 5. 实验 C：非法 Selector 的失败范围

```css
.invalid-selector-target,
:totally-invalid-pseudo {
  color: #be123c;
}
```

这是普通 Selector List。非法成员会使整个列表无法作为有效规则使用。

后面存在恢复规则：

```css
.invalid-selector-target {
  color: #1d4ed8;
}
```

在 Styles 中确认：

- 故意损坏的规则没有成为有效 Matched Rule；
- 恢复规则正常出现；
- 后续规则不会因为前一条出错而停止解析。

---

## 6. Value Processing Pipeline

### 6.1 Declared Value

源码中出现并能被解析为某 Property 候选的值。

### 6.2 Cascaded Value

匹配声明经过 Origin、Importance、Layer、Specificity、Scope 和 Source Order 后胜出的值。

### 6.3 Specified Value

如果没有 Cascaded Value，浏览器还会考虑继承或初始值。

### 6.4 Computed Value

浏览器把相对表达继续解析，但不一定已经得到最终像素尺寸。

### 6.5 Used Value

布局需要一个真正可使用的值。例如子元素百分比宽度需要结合 Containing Block。

### 6.6 Actual Value

最终呈现还可能受像素取整、字体、设备与实现约束影响。

Stage 09 会深入浏览器内部；本阶段只建立 CSS 规范心智模型。

---

## 7. Invalid at Computed-value Time

```css
.computed-invalid {
  --accent: 20px;
  color: #b45309;
  color: var(--accent);
}
```

关键过程：

1. `var(--accent)` 在语法层面可以被解析。
2. Cascade 让后出现的 `color` 获胜。
3. 变量替换后得到 `20px`。
4. `20px` 不是合法的 `color`。
5. 失败发生在 Computed-value Time。

不能简单认为浏览器一定回到前一条 `color`。前一条已经在 Cascade 中输掉。

### DevTools 实验

1. 查看 `.computed-invalid` 的 Styles。
2. 搜索 Computed `color`。
3. 把 `--accent: 20px` 改为合法颜色。
4. 观察最终值变化。
5. 再删除变量，比较“变量缺失”和“变量值类型不合法”。

---

## 8. `var()` Fallback 的边界

```css
.computed-fallback {
  color: var(--missing-accent, #0369a1);
}
```

Fallback 不等同于“只要目标 Property 不接受替换结果，就自动使用 fallback”。要区分：

```text
变量缺失
变量自身无效
替换后对目标 Property 无效
```

---

## 9. CSSOM 的正确位置

CSSOM 概念有助于理解浏览器不会直接“照着文本画”。

但 Stylesheet 对象、Rule 集合和通过 JavaScript读取 Computed Style 等编程接口属于 Stage 09。

Stage 04 使用 DevTools Styles / Computed 获取证据，不要求先学 JavaScript。

---

## 10. Failure Lab

1. 把无效 Value 当成整个 Rule 失败。
2. 把非法 Selector 与非法 Declaration 混为一谈。
3. 期待 Computed-value Time 自动回到前一条声明。
4. 用 JavaScript API 代替 CSS 学习。

第四项的修复原则是：如果删除编程 API 后仍能用 DevTools完整证明本课，就不应把 API 作为学习前置。

---

## 11. Challenge

只修改 HTML 与 CSS：

1. 创建一条包含三个 Declaration 的 Rule。
2. 让其中一个 Property 不存在。
3. 让另一个 Value 无效。
4. 保留第三个有效声明。
5. 在 Styles / Computed 中记录失败范围。
6. 创建一个自定义属性，在替换后让目标 Property 无效。
7. 修复变量值，再验证最终结果。

---

## 12. Mastery Check

1. 无效 Selector 和无效 Value 的失败范围有什么差异？
2. Declared、Cascaded、Specified、Computed、Used、Actual 的顺序是什么？
3. 百分比宽度为什么常要到布局环境中才能得到 Used Value？
4. Invalid at Computed-value Time 为什么不等于回到前一条声明？
5. `var()` fallback 能解决哪些情况？
6. 为什么 Stage 04 讲 CSSOM 概念，却不调用 CSSOM JavaScript API？
