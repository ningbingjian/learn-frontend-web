# KP003：Rule、Selector、Declaration、Property 与 Value

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP003 |
| 深度 | Must |
| Pattern | BROWSER-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | 一段 CSS 源码由哪些语言单位组成，浏览器遇到无效声明时会怎样处理？ |
| 运行要求 | Node.js 20+，现代浏览器 |

---

## 1. 本课最终要做出什么

你会完成一个 **CSS Anatomy Laboratory** 页面，通过三个实验对象理解：

1. 一条普通 Ruleset。
2. 一个属性选择器规则。
3. 一组包含故意无效 Value 的声明。

页面还会显示术语对照：

```text
Selector
Property
Value
Declaration
Declaration Block
Qualified Rule / Ruleset
```

最后，你会在 DevTools 中验证浏览器如何忽略一条无效声明，同时保留前一个有效声明和其余有效属性。

---

## 2. 本课解决什么问题

初学者经常把下面所有内容都叫“样式”：

```css
.anatomy-card {
  padding: 1.5rem;
  background: #ffffff;
}
```

这样在简单页面中还能交流，但当需要 Debug、阅读规范、使用 CSSOM 或讨论编译器时，会出现定位不准确的问题：

- 到底是 Selector 没匹配？
- Property 名写错了？
- Value 对当前 Property 无效？
- 整个 Declaration 被忽略了？
- 还是整个 Rule 没有进入 CSSOM？

本课建立准确语言单位，让以后每个故障都能被明确描述。

---

## 3. 前置知识与本课边界

### 3.1 前置知识

- 已完成 KP001 与 KP002。
- 会通过 External Stylesheet 加载 CSS。
- 会使用 Elements、Styles、Computed 和 Network。

### 3.2 本课会讲

- Selector、Declaration Block、Declaration、Property、Value。
- 普通 Qualified Rule / Ruleset 的结构。
- Selector List 的最小认知。
- Attribute Selector 的第一次可观察使用。
- 无效 Value 的局部错误恢复。
- CSSOM 中无效声明被移除的可观察结果。

### 3.3 本课暂时不展开

- Selector 的完整语法和匹配算法。
- Shorthand 展开。
- At-rule 完整体系。
- Tokenization 与 CSS Syntax 规范细节。
- Cascade 与继承排序。

这些会在后续课程逐步闭环。

---

## 4. 核心术语预览

观察：

```css
.anatomy-card {
  padding: 1.5rem;
  background: #ffffff;
}
```

可以拆成：

```text
.anatomy-card                 Selector
{ ... }                       Declaration Block
padding: 1.5rem;              Declaration
padding                       Property
1.5rem                        Value
.anatomy-card { ... }         Qualified Rule / 常称 Ruleset
```

注意：日常工程交流里经常使用“CSS rule”或“ruleset”。更深入阅读规范时，会遇到 qualified rule、at-rule、style rule 等更精确分类。当前先准确识别普通样式规则的组成。

---

## 5. 起始状态

本课从零建立，不依赖 KP002 的运行目录。

路径：

```text
learn-frontend-web-course/
└── stage-04-css/
    └── 04.01-css-language-and-stylesheets/
        └── kp003-rules-declarations-properties-values/
```

进入：

```bash
cd learn-frontend-web-course/stage-04-css/04.01-css-language-and-stylesheets/kp003-rules-declarations-properties-values
```

---

## 6. 最终文件

```text
kp003-rules-declarations-properties-values/
├── README.md
├── index.html
├── styles.css
├── package.json
├── server.mjs
└── verify.mjs
```

核心代码：`index.html`、`styles.css`。  
实验辅助：`package.json`、`server.mjs`、`verify.mjs`。

---

# 7. Step 0：建立独立运行环境

## 7.1 创建 `package.json`

```text
kp003-rules-declarations-properties-values/package.json
```

```json
{
  "name": "stage-04-kp003-css-anatomy",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node server.mjs",
    "check": "node verify.mjs"
  }
}
```

## 7.2 创建 `server.mjs`

```text
kp003-rules-declarations-properties-values/server.mjs
```

```js
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const port = Number(process.env.PORT ?? 4173);
const routes = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
]);

const server = createServer(async (request, response) => {
  const route = routes.get(request.url ?? "/");

  if (!route) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not Found");
    return;
  }

  try {
    const [fileName, contentType] = route;
    const content = await readFile(new URL(fileName, import.meta.url));
    response.writeHead(200, { "Content-Type": contentType });
    response.end(content);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`Server Error: ${error.message}`);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`KP003 is running at http://localhost:${port}`);
});
```

当前还不能运行，因为页面文件尚未创建。

---

# 8. Step 1：创建用于匹配规则的 HTML

## 8.1 创建 `index.html`

路径：

```text
kp003-rules-declarations-properties-values/index.html
```

先输入下面的完整结构：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Stage 04 KP003：通过可观察实验理解 CSS Rule、Selector、Declaration、Property 与 Value。"
    />
    <title>KP003｜CSS 规则的组成</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main class="lesson-shell">
      <p class="eyebrow">Stage 04 · Module 04.01 · KP003</p>
      <h1>拆开一条 CSS 规则</h1>
      <p class="intro">
        下面的组件分别用于观察选择器、声明块、多条声明、选择器列表和无效值恢复。
      </p>

      <section class="anatomy-grid" aria-label="CSS 规则结构实验">
        <article class="anatomy-card">
          <p class="anatomy-card__label">Ruleset</p>
          <h2 class="anatomy-card__title">.anatomy-card { ... }</h2>
          <p class="anatomy-card__note">
            选择器决定匹配对象；花括号中的声明块决定要修改哪些 CSS 属性。
          </p>
        </article>

        <article class="anatomy-card" data-state="warning">
          <p class="anatomy-card__label">Attribute selector</p>
          <h2 class="anatomy-card__title">[data-state="warning"]</h2>
          <p class="anatomy-card__note">同一个 HTML 结构可以因状态属性匹配到另一条规则。</p>
        </article>

        <article class="invalid-value-demo">
          <p class="anatomy-card__label">Invalid value recovery</p>
          <h2>浏览器保留前一个有效颜色</h2>
          <p>
            CSS 中先声明有效的 <code>color</code>，再故意声明无效值；无效声明被忽略。
          </p>
        </article>
      </section>

      <section class="terminology" aria-labelledby="terminology-title">
        <h2 id="terminology-title">语言单位</h2>
        <dl>
          <div>
            <dt>Selector</dt>
            <dd><code>.anatomy-card</code></dd>
          </div>
          <div>
            <dt>Property</dt>
            <dd><code>padding</code></dd>
          </div>
          <div>
            <dt>Value</dt>
            <dd><code>1.5rem</code></dd>
          </div>
          <div>
            <dt>Declaration</dt>
            <dd><code>padding: 1.5rem;</code></dd>
          </div>
        </dl>
      </section>
    </main>
  </body>
</html>
```

## 8.2 观察当前匹配入口

HTML 中已经出现：

```text
class="anatomy-card"
class="anatomy-card__title"
data-state="warning"
class="invalid-value-demo"
```

它们只是 Selector 未来可以使用的匹配入口。没有 CSS 时，它们不会自动产生课程设计的外观。

---

# 9. Step 2：建立页面基础规则

## 9.1 创建 `styles.css`

路径：

```text
kp003-rules-declarations-properties-values/styles.css
```

先输入基础部分：

```css
:root {
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: #172033;
  background: #f2f5f9;
}

* {
  box-sizing: border-box;
}

body {
  min-block-size: 100vh;
  margin: 0;
}

.lesson-shell {
  inline-size: min(100% - 2rem, 68rem);
  margin-inline: auto;
  padding-block: 3.5rem;
}

.eyebrow {
  margin: 0;
  color: #355070;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin-block: 0.75rem 0;
  font-size: clamp(2rem, 6vw, 3.75rem);
  line-height: 1.1;
}

.intro {
  max-inline-size: 50rem;
  margin-block: 1rem 2rem;
  color: #475467;
  font-size: 1.1rem;
  line-height: 1.7;
}

.anatomy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;
}
```

## 9.2 第一次运行

```bash
npm run dev
```

打开：

```text
http://localhost:4173
```

### 预期观察

- 页面基础排版生效。
- 三个 `article` 还没有完整卡片样式。
- `.anatomy-grid` 已经改变三个子元素的布局关系。

本课不深入 Grid 算法，只把它作为实验辅助布局。Grid 的唯一完整 Owner 是 04.06。

---

# 10. Step 3：写出第一条完整 Ruleset

在 `styles.css` 末尾加入：

```css
.anatomy-card {
  padding: 1.5rem;
  border: 0.2rem solid #6b7f99;
  border-radius: 1rem;
  color: #172033;
  background: #ffffff;
}
```

## 10.1 精确拆解

### Selector

```css
.anatomy-card
```

职责：匹配 class 列表中包含 `anatomy-card` 的元素。

### Declaration Block

```css
{
  padding: 1.5rem;
  border: 0.2rem solid #6b7f99;
  border-radius: 1rem;
  color: #172033;
  background: #ffffff;
}
```

职责：承载这条规则中的声明列表。

### 一条 Declaration

```css
padding: 1.5rem;
```

### Property

```css
padding
```

Property 表示要设置的 CSS 特性。

### Value

```css
1.5rem
```

Value 是提供给当前 Property 的值表达式。

### 分号

```css
;
```

分号结束当前声明。在声明块最后一条声明后有时可以省略，但课程和生产代码默认保留，便于继续添加、生成 Diff 和减少错误。

## 10.2 刷新观察

第一和第二张 `article.anatomy-card` 都会获得相同卡片样式，因为它们都匹配 `.anatomy-card`。

第三张卡片的 class 是 `invalid-value-demo`，尚未匹配这条规则。

这证明：

```text
Rule 存在
+ Selector 匹配元素
→ Declaration 才有机会影响该元素
```

“有机会”是因为后续还可能发生级联冲突、继承和值计算。

---

# 11. Step 4：使用 Selector List 共享声明块

## 11.1 当前问题

第三张卡片也需要相同的基础盒子外观。如果复制一整份声明块，会产生重复。

## 11.2 修改规则

把：

```css
.anatomy-card {
```

替换为：

```css
.anatomy-card,
.invalid-value-demo {
```

完整规则变成：

```css
.anatomy-card,
.invalid-value-demo {
  padding: 1.5rem;
  border: 0.2rem solid #6b7f99;
  border-radius: 1rem;
  color: #172033;
  background: #ffffff;
}
```

## 11.3 运行结果

保存并刷新。

第三张卡片也获得基础样式。

这里的逗号组成 **Selector List**：

```text
Selector A,
Selector B
→ 共享同一个 Declaration Block
```

### 当前边界

复杂 Selector List 如果其中某个选择器语法整体无效，可能影响整组规则的解析。`:is()` 和 `:where()` 等现代选择器有自己的 forgiving 行为与优先级规则，04.02 会完整展开。

---

# 12. Step 5：给规则增加内部文本声明

在 `styles.css` 继续加入：

```css
.anatomy-card__label {
  margin-block: 0 0.75rem;
  color: #475467;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.anatomy-card__title,
.invalid-value-demo h2 {
  margin-block: 0 1rem;
  font-size: 1.25rem;
}

.anatomy-card__note,
.invalid-value-demo p {
  margin-block-end: 0;
  line-height: 1.65;
}
```

### 新的可观察关系

- `.anatomy-card__label` 只匹配对应 class。
- `.anatomy-card__title, .invalid-value-demo h2` 是 Selector List。
- `.invalid-value-demo h2` 使用后代关系，表示在 `.invalid-value-demo` 内部的 `h2`。

复杂选择器的匹配机制不是本课主问题，当前只识别它们仍然位于 Selector 位置。

---

# 13. Step 6：使用属性选择器表达状态

在 `styles.css` 加入：

```css
[data-state="warning"] {
  border-color: #d97706;
  background: #fffbeb;
}
```

## 13.1 为什么能匹配第二张卡片

HTML 中第二张卡片包含：

```html
<article class="anatomy-card" data-state="warning">
```

Selector：

```css
[data-state="warning"]
```

匹配属性 `data-state` 的值等于 `warning` 的元素。

保存刷新后，第二张卡片应变为警告色，但仍保留 `.anatomy-card` 提供的 padding、圆角等其他声明。

这说明一个元素可以同时匹配多条规则。最终结果可能来自多条规则的声明组合，而不是只从“一个 class 对应一个样式对象”得到。

---

# 14. Step 7：制造无效 Value，并观察局部错误恢复

## 14.1 建立正常基线

先加入第三张卡片的有效规则：

```css
.invalid-value-demo {
  color: #0f5132;
  border-color: #0f766e;
  background: #ecfdf5;
}
```

刷新，确认第三张卡片文字呈绿色。

## 14.2 只改变一个故障条件

在有效 `color` 后面加入一条故意无效的声明：

```css
.invalid-value-demo {
  color: #0f5132;
  color: definitely-not-a-color; /* 故意无效：用于观察浏览器错误恢复 */
  border-color: #0f766e;
  background: #ecfdf5;
}
```

## 14.3 预测

先不要刷新，选择一个答案：

A. 整份 `styles.css` 都失效。  
B. 整个 `.invalid-value-demo` 规则都失效。  
C. 只有无效 `color` 声明被忽略，其余声明保留。  
D. 无效字符串被当作自定义颜色名使用。

## 14.4 运行与观察

刷新页面。

正确结果是 C：

- 文字仍使用前一个有效的 `#0f5132`。
- `border-color` 和 `background` 仍然生效。
- 整个页面和其他规则没有崩溃。

这体现 CSS 的错误恢复特性：浏览器通常会尽可能忽略无法理解的局部内容，并继续处理后续有效内容。

## 14.5 Styles 面板证据

在 Elements 中选中 `.invalid-value-demo`。

在 Styles 中观察：

- 有效 `color: #0f5132` 仍能贡献结果。
- 无效 `color: definitely-not-a-color` 可能显示警告或被标记为无效。
- 后续 `border-color` 与 `background` 正常存在。

不同浏览器 DevTools 的无效声明显示方式可能略有不同，但最终 Computed Color 必须是有效颜色。

---

# 15. Step 8：通过 CSSOM 观察浏览器保留了什么

## 15.1 打开 Console

在当前页面 DevTools Console 中执行：

```js
[...document.styleSheets[0].cssRules].map((rule) => rule.cssText)
```

### 这条命令的职责

- `document.styleSheets[0]`：取得当前文档中的第一份样式表。
- `.cssRules`：读取浏览器已经解析进入 CSSOM 的规则列表。
- `[...value]`：把类数组集合转换为数组。
- `.map(...)`：提取每条规则序列化后的 `cssText`。

JavaScript 语法不是本课主问题；当前只把 Console 当作观察 CSSOM 的工具。

## 15.2 查找实验规则

在结果中找到 `.invalid-value-demo`。

浏览器序列化的 `cssText` 中通常不会保留无效的：

```css
color: definitely-not-a-color;
```

但会保留有效的：

```css
color: rgb(...);
border-color: rgb(...);
background: rgb(...);
```

颜色格式可能被规范化为 `rgb(...)`。这说明 CSSOM 是浏览器解析后的对象模型，不是源码字符的原样备份。

## 15.3 更精确地查找规则

执行：

```js
[...document.styleSheets[0].cssRules].find(
  (rule) => rule.selectorText === ".invalid-value-demo",
)?.style.cssText
```

预期结果包含有效声明，不包含故意无效的 Value。

---

# 16. Step 9：完成术语区样式

在 `styles.css` 末尾加入：

```css
.terminology {
  margin-block-start: 1.5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background: #172033;
  color: #ffffff;
}

.terminology h2 {
  margin-block-start: 0;
}

.terminology dl {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  margin-block-end: 0;
}

.terminology dl div {
  padding: 1rem;
  border: 1px solid rgb(255 255 255 / 0.24);
  border-radius: 0.75rem;
}

.terminology dt {
  margin-block-end: 0.5rem;
  color: #b9d5ff;
  font-weight: 800;
}

.terminology dd {
  margin: 0;
}
```

刷新后，术语区应形成深色对照面板。

---

# 17. Step 10：加入自动检查

创建：

```text
kp003-rules-declarations-properties-values/verify.mjs
```

完整内容：

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /class="anatomy-card"/);
assert.match(html, /data-state="warning"/);
assert.match(css, /\.anatomy-card,\s*\n\.invalid-value-demo\s*\{/);
assert.match(css, /\[data-state="warning"\]\s*\{/);
assert.match(css, /color:\s*#0f5132;\s*\n\s*color:\s*definitely-not-a-color/);
assert.match(html, /<dt>Selector<\/dt>/);
assert.match(html, /<dt>Declaration<\/dt>/);

console.log("✓ KP003 rule anatomy and invalid-value experiment are complete.");
```

运行：

```bash
npm run check
```

预期：

```text
✓ KP003 rule anatomy and invalid-value experiment are complete.
```

自动检查故意要求无效声明仍存在，因为它是当前 Lesson 的实验条件，不是遗漏修复的 Bug。

---

# 18. 完整运行与验收

执行：

```bash
npm run check
npm run dev
```

访问：

```text
http://localhost:4173
```

必须完成：

- [ ] 三张实验卡片正常显示。
- [ ] 前两张卡片同时匹配 `.anatomy-card`。
- [ ] 第二张卡片因 `[data-state="warning"]` 获得警告视觉。
- [ ] 第三张卡片的无效 `color` 没有让整个 Rule 或 Stylesheet 失效。
- [ ] Computed Color 仍是有效绿色。
- [ ] CSSOM 中实验规则不包含无效声明。
- [ ] 能准确指出 Selector、Declaration Block、Declaration、Property、Value。
- [ ] 自动检查通过。

---

# 19. 图解：浏览器怎样处理一条普通规则

```text
CSS 源码字符
    │
    ▼
词法与语法解析
    │
    ├── 无法理解的局部内容 ──> 按错误恢复规则忽略
    │
    ▼
Rule / Declaration 进入 CSSOM
    │
    ▼
Selector 尝试匹配 DOM 元素
    │
    ├── 不匹配 ──> 不影响当前元素
    │
    ▼
匹配声明参与 Cascade、Inheritance 与 Value Processing
    │
    ▼
Computed / Used / Actual Result
```

本课重点是前半段：语言单位、匹配入口和无效 Value 的局部恢复。完整值处理将在后续课程展开。

---

# 20. 理论收束

## 20.1 Rule 不等于 Declaration

错误说法：

> `padding: 1.5rem;` 是一条完整 CSS Rule。

更准确地说，它是一条 Declaration。普通样式 Rule 还需要 Selector 和 Declaration Block。

## 20.2 Property 不等于 HTML Attribute

```html
<div data-state="warning">
```

这里的 `data-state` 是 HTML Attribute。

```css
background: #fffbeb;
```

这里的 `background` 是 CSS Property。

属性选择器可以读取 HTML Attribute 进行匹配，但二者不属于同一种语言对象。

## 20.3 Value 必须符合 Property 接受的语法

```css
color: #0f5132;
```

`#0f5132` 是 `color` 可接受的颜色值。

```css
color: definitely-not-a-color;
```

这不是浏览器可识别的颜色值，因此声明无效。

同一个 token 序列对不同 Property 是否有效，取决于该 Property 定义的值语法。例如某个关键字可能对一个 Property 有意义，对另一个 Property 无效。

## 20.4 CSS 错误恢复不等于可以随便写错

CSS 的容错能让旧浏览器忽略不认识的新特性，也能避免一个局部错误破坏整页。

但它也导致一个特点：

```text
很多错误不会抛出阻止运行的异常
而是静默地“不生效”
```

因此 CSS Debug 必须依赖 Styles、Computed、CSSOM、兼容信息和可复现实验，而不是等待 Console 抛异常。

---

# 21. Wrong Way 与故障分类

## 21.1 Selector 没匹配，却一直修改 Value

症状：规则看起来正确，但 Styles 中根本没有出现。

优先检查：

- class 是否拼写一致。
- Attribute 是否存在和值是否匹配。
- Selector 是否指向了错误层级。

## 21.2 Property 拼错

例如：

```css
.anatomy-card {
  backgroud: #ffffff;
}
```

`backgroud` 不是有效 Property。浏览器会忽略这条声明。

## 21.3 Value 对当前 Property 无效

例如：

```css
.anatomy-card {
  color: 20px;
}
```

`20px` 是长度，但 `color` 需要颜色语法。

## 21.4 整个 Selector 语法无效

如果 Selector 无法解析，包含它的规则可能不会进入可用规则集合。不要把 Selector 语法错误和 Declaration Value 错误混成一个问题。

## 21.5 删除故意无效声明导致实验失去证据

本 Lesson 最终源码保留：

```css
color: definitely-not-a-color;
```

这是受控 Failure Lab。代码注释、README 和 `verify.mjs` 都明确说明了意图，因此不应被普通“清理无效 CSS”操作误删。

---

# 22. DevTools 诊断顺序

遇到“某个样式没有生效”，按以下顺序缩小范围：

```text
1. 外部 CSS 是否成功加载
2. Stylesheet 是否被浏览器接受
3. Rule 是否成功解析
4. Selector 是否匹配当前元素
5. Declaration 的 Property 和 Value 是否有效
6. Declaration 是否在 Cascade 中被覆盖
7. Computed Value 是否符合预期
8. Used / Actual Result 是否又受布局、字体、设备影响
```

本课覆盖 3～5 的基础；后续课程会完成 6～8。

---

# 23. Production Boundary

生产项目通常还需要：

- Stylelint 检查未知 Property、重复声明和可疑 Value。
- 构建工具验证 CSS 语法。
- 浏览器兼容数据判断新 Value 是否可用。
- `@supports` 为新特性建立能力检测。
- Visual Regression 发现“没有报错但视觉改变”的问题。
- CSS Minifier 保证压缩后语义不变。
- Source Map 帮助从构建产物定位回源文件。

这些工具能减少错误，但不能代替开发者理解 CSS 如何解析和恢复。

---

# 24. 本课只记住 3 件事

1. 普通 CSS Rule 由 Selector 和 Declaration Block 组成；Declaration 又由 Property 和 Value 组成。
2. 浏览器会忽略局部无效声明并继续处理其他有效 CSS，因此错误经常表现为“静默不生效”。
3. Debug 必须区分资源、解析、匹配、声明有效性和级联冲突，不能把所有问题都叫“优先级问题”。

---

# 25. Challenge

## 任务一：Property 错误实验

新增一个 `.unknown-property-demo`：

- 先写一条有效背景。
- 再写一条拼错的背景 Property。
- 在 Styles 和 CSSOM 中记录结果。

## 任务二：Selector 错误实验

新增一条故意无效 Selector，但必须放在独立规则中，避免影响现有实验。

记录：

- Styles 中是否出现。
- CSSOM 中是否出现。
- 后续有效规则是否继续生效。

## 约束

- 每次只改变一个故障条件。
- 不允许只写结论，必须记录真实证据。
- 最终页面仍要可阅读。

---

# 26. Mastery Check

1. `.anatomy-card` 在一条 CSS Rule 中属于什么？
2. `padding: 1.5rem;` 整体叫什么？
3. `padding` 与 `1.5rem` 分别叫什么？
4. Declaration Block 的边界是什么？
5. 一个元素能否同时匹配多条 Rule？本课哪个实验证明了这一点？
6. 为什么无效 `color` 没有让整个 CSS 文件失效？
7. CSSOM 与 CSS 源码文本为什么可能不完全相同？
8. Property 拼写错误、Value 无效、Selector 不匹配分别应在哪一步定位？
9. 为什么 CSS 容错既有价值，也增加了 Debug 难度？
10. Selector List 与 Declaration Block 是什么关系？

能独立完成术语拆解、无效 Value 实验和 CSSOM 验证，才算完成本课。
