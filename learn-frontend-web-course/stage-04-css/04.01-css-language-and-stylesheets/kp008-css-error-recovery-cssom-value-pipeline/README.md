# KP008：CSS 错误恢复、Styles、Computed、CSSOM 与 Value Processing Pipeline

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP008 |
| 深度 | Should / Expert |
| Pattern | FAILURE-LAB + BROWSER-MECHANISM-LAB |
| 主问题 | “CSS 没生效”到底可能在哪个阶段失败，DevTools 与 CSSOM 分别能证明什么？ |
| 运行要求 | Node.js 20+，现代浏览器 |

---

## 1. 本课最终要做出什么

你会完成一个 **CSS Error Recovery & Value Pipeline Inspector**。

页面故意同时包含：

```text
合法 declaration
无效 property value
未知 property
无效 selector
var() 的 computed-value-time 失效
百分比 width
CSSOM Inspector
```

最终建立诊断链：

```text
资源有没有加载？
↓
源码有没有被 parser 接受？
↓
selector rule 有没有进入 CSSOM？
↓
declaration 有没有被保留？
↓
cascade 赢的是谁？
↓
specified / computed 阶段发生了什么？
↓
layout 得到 used value 是什么？
↓
getComputedStyle() 返回的 resolved value 是什么？
```

---

## 2. 为什么这课不能只讲 Specificity

真实排障中会出现：

```text
Styles 里根本找不到规则
Styles 里有规则，但某条 declaration 消失
声明看起来合法，Computed 却不是预期值
CSSStyleRule 中还是 50%，getComputedStyle() 却变成 px
```

这些故障可能发生在：

```text
Network
Parser
Selector Parsing
Declaration Parsing
Cascade
Computed-value Time
Layout / Used Value
Rendering
```

不能全部用 `!important` 处理。

---

## 3. 两个关键术语

### CSSOM

```text
document.styleSheets
→ CSSStyleSheet
→ cssRules
→ CSSStyleRule
→ CSSStyleDeclaration
```

### Property Value Processing

```text
Declared Values
↓
Cascaded Value
↓
Specified Value
↓
Computed Value
↓
Used Value
↓
Actual Value
```

JavaScript 常见 `Resolved Value`；`getComputedStyle()` 返回 resolved value，它不保证对所有 property 都严格等同于规范定义的纯 computed value。

---

## 4. 起始状态

本课从零创建：

```text
kp008-css-error-recovery-cssom-value-pipeline/
├── README.md
├── index.html
├── styles.css
├── app.js
├── package.json
├── server.mjs
└── verify.mjs
```

`app.js` 只负责收集 CSSOM 证据，不是业务逻辑。

---

## 5. Step 0：自动检查与启动

```bash
npm run check
npm run dev
```

访问：

```text
http://localhost:4173
```

自动检查只能证明关键实验条件和 JS 语法存在，不能替代浏览器 parser / CSSOM / layout 观察。

---

## 6. Step 1：无效 Property Value

```css
.invalid-value-demo {
  color: #0f766e;
  color: definitely-not-a-color;
}
```

第二条 Property 合法但 Value 不合法。

浏览器应局部恢复：

```text
第一条合法 color 保留
第二条无效 declaration 被忽略
后续 CSS 继续解析
```

这说明“页面仍有样式”不能证明所有 declarations 都成功。

---

## 7. Step 2：未知 Property

```css
.unknown-property-demo {
  color: #1d4ed8;
  definitely-not-a-property: 42;
}
```

合法 `color` 继续生效；未知 property 不会作为有效声明结果保留。

使用：

```js
rule.style.cssText
```

观察 CSSOM serialization。

关键结论：

> Raw CSS Source 与 parser 之后的 CSSOM 不是完全相同的东西。

---

## 8. Step 3：Invalid Selector Rule

故意写：

```css
.invalid-selector::definitely-not-a-pseudo {
  color: #be123c;
}
```

Selector 本身无效，浏览器无法建立可匹配的 Style Rule，因此整条 rule 会被丢弃。

`app.js` 检查：

```js
const invalidSelectorRetained = rules.some((rule) =>
  rule.selectorText?.includes("definitely-not-a-pseudo"),
);
```

预期：

```text
false
```

区分：

```text
selector 无效
→ 整条 rule 无法成立

某个 declaration 无效
→ 同一 ruleset 其他合法 declarations 仍可保留
```

---

## 9. Step 4：Invalid at Computed-value Time

```css
.computed-parent {
  font-size: 30px;
}

.computed-child {
  --lesson-size: tomato;
  font-size: var(--lesson-size);
}
```

Custom Property 中 `tomato` 作为 token sequence 可以存在，但替换到 `font-size` 后变成无效值。

问题不是 parser 立刻发现，而是在更晚的 computed-value 阶段暴露。

`font-size` 是 inherited property，本实验中最终子元素应回到父级 30px 语义。

这类问题容易误判，因为 Styles 中你可能仍看到 `font-size: var(--lesson-size)`。

正确证据链：

```text
Styles
→ Custom Property
→ Computed
→ getComputedStyle()
```

---

## 10. Step 5：Declared Value 与 Resolved Value

```css
.width-container { width: 480px; }
.width-target { width: 50%; }
```

读取 Style Rule：

```js
widthRule.style.getPropertyValue("width")
```

预期仍是：

```text
50%
```

读取元素：

```js
getComputedStyle(widthTarget).width
```

对 width 这类历史属性，浏览器通常返回布局后的 resolved value；本实验通常约为：

```text
240px
```

不要由此推出“getComputedStyle 永远返回 used value”。准确说法是它返回 resolved value，不同 property 的 resolved value 可能对应 computed 或 used value。

---

## 11. Step 6：CSSStyleSheet 与 cssRules

```js
const stylesheet = [...document.styleSheets].find((sheet) =>
  sheet.href?.endsWith("/styles.css"),
);
```

当前实验同源，可以读取：

```js
stylesheet.cssRules
```

其中可能是：

```text
CSSStyleRule
CSSMediaRule
CSSLayerBlockRule
...
```

它不是原始源码字符串数组。

本课递归收集 Style Rule，只为了观察 parser 实际保留的规则。

---

## 12. Step 7：CSSStyleDeclaration 与 Computed Style 的层次差异

```js
widthRule.style.getPropertyValue("width")
```

回答：

```text
某条 CSSStyleRule 里声明了什么？
```

而：

```js
getComputedStyle(element).width
```

回答：

```text
当前元素在全部级联和布局语境下解析成什么 resolved value？
```

两者不能混用。

---

## 13. Styles / Computed / CSSOM 各看什么

### Styles

```text
哪些 selector 匹配？
哪些 declarations 被覆盖？
来自哪个文件 / 哪一行？
来自哪个 Layer？
```

### Computed

```text
当前 property 最终值是什么？
继承链是什么？
```

### CSSOM

```text
Parser 保留哪些 rules？
规则声明序列化成什么？
```

三个证据层不能互相替代。

---

## 14. Value Processing：Declared → Actual

### Declared Values

元素/property 的候选有效声明集合。

### Cascaded Value

经过 Origin / Importance / Context / Layer / Specificity / Scope / Order 后胜出的值。

### Specified Value

结合 Cascade、Inheritance、Initial Value 后，为每个元素的每个 property 得到指定值。

### Computed Value

继续处理相对关系、变量替换和规范计算；某些 `var()` 错误在这里暴露。

### Used Value

需要 Layout 环境才能确定的值，例如百分比 width 对 containing block 的实际尺寸。

### Actual Value

Used Value 经过设备和实现限制后的最终近似表现。

### Resolved Value

CSSOM 为 Web Compatibility 暴露的 API 概念；`getComputedStyle()` 返回它。

---

## 15. Failure Lab：只看 Styles

如果 Styles 中存在：

```css
font-size: var(--lesson-size);
```

不能证明最终 computed value 有效。

Parser 接受不等于 computed-value time 一定有效。

---

## 16. Failure Lab：只看 Computed

只看到最终 `rgb(...)`，无法解释：

```text
来自哪条 rule？
有没有被覆盖的 declaration？
是不是继承？
是不是 Layer 结果？
```

要回到 Styles 追来源。

---

## 17. Failure Lab：认为 CSSOM 等于 Raw Source

CSSOM 可能：

```text
丢弃无效内容
标准化序列化
改变空格与表示
```

所以：

```text
raw source
≠
CSSOM serialization
```

---

## 18. 完整排障树

以后看到“CSS 不生效”：

```text
1. Network：请求 200？MIME 正确？
2. Parser / CSSOM：stylesheet / rule 是否存在？
3. Selector：是否匹配？是否无效？
4. Declaration：property / value 是否有效？
5. Cascade：Origin / Importance / Context / Layer / Specificity / Scope / Order？
6. Computed-value Time：var() / 相对值是否失效？
7. Layout / Rendering：Used Value 为什么是当前结果？
```

先定位失败阶段，再改代码。

---

## 19. 性能边界

`getComputedStyle()` 不是免费的日志 API。浏览器需要保证 Style 数据足够新，布局相关读取还可能触发同步 Style/Layout 工作。

生产代码避免：

```text
写 DOM
→ 读 layout/computed
→ 再写
→ 再读
```

完整 Layout Thrashing 放到性能课程。

---

## 20. 安全边界：跨源 Stylesheet

当前 `index.html / styles.css / app.js` 都来自 `localhost:4173`，可读取 `cssRules`。

跨 Origin Stylesheet 即使能正常显示，也可能因为 CSSOM 安全边界无法被脚本读取 `cssRules`。

不要把这个限制误判为 Parser 故障。

---

## 21. 完整运行与验收

```bash
npm run check
npm run dev
```

自动检查：

```text
✓ KP008 parse recovery, CSSOM, computed-time invalidation, and value-pipeline evidence are complete.
```

CSSOM 面板应看到类似：

```text
width declared in CSSStyleRule: 50%
width resolved by getComputedStyle(): 240px
invalid selector retained in CSSOM: false
computed-child inherited/resolved font-size: 30px
```

实际像素可能受浏览器布局/缩放影响，但关系应一致。

---

## 22. 本课只记住 3 件事

1. **CSS 故障可能发生在 Network、Parser、Cascade、Computed-value Time 或 Layout 等不同阶段。**
2. **Raw Source、CSSOM、CSSStyleRule 声明和 `getComputedStyle()` 的 resolved value 是不同层次。**
3. **`getComputedStyle()` 返回 resolved value，不能机械等同于所有属性的规范 computed value。**

---

## 23. Challenge

### A：Custom Property 链

建立 `--a → --b → --c`，让最终值不能用于 `width`，预测失败阶段和最终结果。

### B：动态插入 Rule

使用：

```js
document.styleSheets[0].insertRule(".runtime-rule { color: rebeccapurple; }");
```

观察 `cssRules / Styles / Computed` 变化。

### C：删除 Rule

使用 `deleteRule()`，记录 CSSOM 改变、DOM 不变但最终样式变化。

---

## 24. Mastery Check

1. 无效 selector 与无效 declaration 的错误恢复范围有何不同？
2. 为什么 `var()` 可能在 parser 阶段没失败，最终 property 仍失效？
3. `document.styleSheets` 是什么？
4. `cssRules` 与原始 CSS 文件有何不同？
5. `CSSStyleRule.style.width` 和 `getComputedStyle().width` 有何不同？
6. Declared / Cascaded / Specified / Computed / Used / Actual 分别解决什么问题？
7. Resolved Value 为什么存在？
8. 为什么跨源 stylesheet 能显示但 `cssRules` 可能不能读？

---

## 25. 最终源码

```text
README.md
index.html
styles.css
app.js
package.json
server.mjs
verify.mjs
```

当前 Lesson 独立运行，不依赖 KP007。

---

## 26. 参考规范

- MDN：CSS Property Value Processing
- MDN：`getComputedStyle()`
- CSSOM Specification
- CSS Cascading and Inheritance
- CSS Custom Properties

本课重点是把规范术语与真实 DevTools / CSSOM 证据建立对应关系。
