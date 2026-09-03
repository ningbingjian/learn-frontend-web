# KP004：Shorthand、Longhand、注释、At-rule 与语法边界

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP004 |
| 深度 | Must |
| Pattern | BUILD-LAB + BROWSER-MECHANISM-LAB + FAILURE-LAB |
| 主问题 | Shorthand 到底写进了哪些 Longhand？At-rule 与普通 Rule 的语法边界在哪里？ |
| 运行要求 | Node.js 20+，现代浏览器 |

---

## 1. 本课最终要做出什么

你会完成一个 **Shorthand / Longhand / At-rule Laboratory**。页面包含四组可观察实验：

1. `margin` 四值 shorthand 如何展开为 `margin-top/right/bottom/left`。
2. 后写 longhand 如何只覆盖 shorthand 展开的某一个子属性。
3. `background` shorthand 如何把没有显式写出的子属性重置，制造一个真实 Failure Lab。
4. `@media`、`@supports` 与 CSS 注释如何与普通 ruleset 共存。

本课结束后，你必须能把下面两句话说清楚：

> Shorthand 不是“少写几个字符”的宏替换，而是一次性给一组 longhand 指定值。

> At-rule 不是 `property: value` declaration；它以 `@` 开头，用来表达条件、导入、分层、字体、动画等更高一级的规则结构。

---

## 2. 本课解决什么问题

初学 CSS 很容易写出：

```css
.card {
  background-image: linear-gradient(...);
  background: white;
}
```

然后困惑：

```text
“我只是想改背景颜色，为什么前面的渐变没了？”
```

根因不是浏览器“覆盖错了”，而是 `background` 是 shorthand。它会同时设置一组 background longhand；没有在 shorthand 中写出的部分也会按 shorthand 规则被重置。

同样地，下面这些都不是普通 declaration：

```css
@media ...
@supports ...
@font-face ...
@keyframes ...
@layer ...
```

如果不先建立语法层级，后续看大型 CSS 文件时会把“规则容器”和“属性声明”混在一起。

---

## 3. 前置知识与本课边界

### 前置知识

你应该已经完成：

- KP001：知道 CSS 与 HTML / DOM 的职责边界。
- KP002：知道 External Stylesheet 如何进入页面。
- KP003：能指出 Rule、Selector、Declaration、Property、Value。

### 本课完整拥有

- shorthand 与 longhand 的关系；
- 常见 1～4 值展开方向；
- shorthand 对未指定子属性的重置风险；
- shorthand 与 longhand 的源顺序关系；
- CSS 注释；
- At-rule 的基础语法身份；
- `@media` / `@supports` 的最小可观察实验。

### 本课暂不展开

- `@layer` 的级联顺序：KP007。
- `@scope`：KP007。
- `@font-face`：04.09 Typography。
- `@keyframes`：04.11 Animation。
- Media Query 完整体系：04.07。

这里第一次出现这些名字时，只建立“它们属于 At-rule”的语言模型。

---

## 4. 本课项目与证据

最终页面：

```text
实验 A  margin shorthand 展开
实验 B  background shorthand reset
实验 C  @media / @supports
实验 D  comment / syntax boundary
```

首选证据：

```text
Elements → Styles
Elements → Computed
Sources → styles.css
调整 viewport 宽度
npm run check
```

---

## 5. 起始状态

本课是独立 Lesson：

```text
本课不复制 KP003 源码。
本课从新的最小目录开始。
```

最终文件：

```text
kp004-shorthand-longhand-at-rules/
├── README.md
├── index.html
├── package.json
├── server.mjs
├── styles.css
└── verify.mjs
```

---

## 6. Step 0：建立独立运行环境

创建 `package.json`：

```json
{
  "name": "css-kp004-shorthand-longhand",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node server.mjs",
    "check": "node verify.mjs"
  }
}
```

创建 `server.mjs`：

```js
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
    const requested = pathname === "/" ? "index.html" : pathname.slice(1);
    const safePath = normalize(requested).replace(/^(\.\.(\/|\\|$))+/, "");
    const filePath = join(root, safePath);
    const body = await readFile(filePath);

    response.writeHead(200, {
      "Content-Type": types[extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not Found");
  }
}).listen(port, () => {
  console.log(`CSS lesson server: http://localhost:${port}`);
});
```

它只是实验辅助代码，不是本课 CSS 知识点。

---

## 7. Step 1：创建实验 HTML

创建 `index.html`，建立四个区域：

```html
<main class="page-shell">
  <section class="lab-section" aria-labelledby="spacing-title">
    <h2 id="spacing-title">实验 A：margin 简写会展开成四个方向</h2>
    <div class="spacing-frame">
      <div class="spacing-demo">margin: 8px 16px 24px 32px</div>
      <div class="spacing-demo spacing-demo--override">同一简写 + margin-left: 48px</div>
    </div>
  </section>

  <section class="lab-section" aria-labelledby="background-title">
    <h2 id="background-title">实验 B：后写 background 简写会重置 background-image</h2>
    <div class="background-grid">
      <article class="background-demo background-demo--kept">保留渐变</article>
      <article class="background-demo background-demo--reset">渐变被重置</article>
    </div>
  </section>

  <section class="lab-section at-rule-demo" aria-labelledby="at-rule-title">
    <h2 id="at-rule-title">实验 C：@media 与 @supports 是 At-rule</h2>
    <div class="rule-grid">
      <article class="rule-card">@media</article>
      <article class="rule-card"><p class="supports-status">@supports：</p></article>
    </div>
  </section>
</main>
```

仓库中的最终 `index.html` 已补齐标题、说明文字和语义结构；你从零复刻时应按最终文件完整创建。

### 第一次运行

在当前目录：

```bash
npm run dev
```

打开：

```text
http://localhost:4173
```

如果此时还没有 `styles.css`，Network 中会看到它 404。这个基线说明 HTML 已存在，但 CSS 资源尚未成功进入页面。

---

## 8. Step 2：建立页面基础样式

创建 `styles.css`，先加入页面外壳：

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #172033;
  background: #f4f7fb;
}

.page-shell {
  width: min(1080px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0 72px;
}

.hero,
.lab-section {
  background: #ffffff;
  border: 1px solid #d9e1ec;
  border-radius: 18px;
}
```

刷新后，Network 中 `styles.css` 应返回 `200`，响应类型应是：

```text
text/css; charset=utf-8
```

---

## 9. Step 3：观察 Shorthand 展开与 Longhand 覆盖

加入：

```css
.spacing-demo {
  margin: 8px 16px 24px 32px;
  padding: 16px;
  border: 2px solid #6c8bd5;
  background: #e7efff;
}

.spacing-demo--override {
  margin-left: 48px;
}
```

四个值顺序：

```text
top    = 8px
right  = 16px
bottom = 24px
left   = 32px
```

第二个元素随后出现 `margin-left: 48px`，因此只把 left 从 `32px` 改成 `48px`。

### DevTools 证据

选择 `.spacing-demo`：

```text
Elements
→ Computed
→ 搜索 margin
→ 展开
```

记录：

```text
margin-top
margin-right
margin-bottom
margin-left
```

再选择 `.spacing-demo--override`，确认只有 `margin-left` 不同。

### 四种展开模型

```text
1 个值：四边相同
2 个值：上下 | 左右
3 个值：上 | 左右 | 下
4 个值：上 | 右 | 下 | 左
```

注意：后写 Longhand 能否覆盖，仍取决于完整 Cascade；这里只让其它条件保持相同，隔离观察 shorthand/longhand。

---

## 10. Step 4：制造 Shorthand Reset Failure

加入：

```css
.background-demo--kept {
  background-color: #fff7ed;
  background-image: linear-gradient(135deg, rgb(255 237 213 / 85%), rgb(219 234 254 / 85%));
}

.background-demo--reset {
  background-image: linear-gradient(135deg, #dbeafe, #ede9fe);
  background: #fff7ed;
}
```

你可能直觉认为：

```text
background: #fff7ed
≈ background-color: #fff7ed
```

这是错误模型。

`background` 会处理一组 longhand，例如：

```text
background-image
background-position
background-size
background-repeat
background-origin
background-clip
background-attachment
background-color
```

后写 shorthand 没给出 `background-image`，它会被重置，因此第二张卡片最终的：

```text
Computed → background-image = none
```

### 修复实验

临时把：

```css
background: #fff7ed;
```

改成：

```css
background-color: #fff7ed;
```

刷新后渐变应恢复。

完成观察后恢复最终 Failure Lab 源码。

---

## 11. Step 5：认识 CSS 注释与 At-rule

文件顶部加入：

```css
/* KP004_COMMENT_MARKER: 注释用于记录意图，不会成为声明。 */
```

CSS 注释不会成为 Property、Value 或 Declaration。

然后加入：

```css
@supports (display: grid) {
  .supports-status::after {
    content: " Grid supported";
    color: #166534;
  }
}

@media (min-width: 720px) {
  .rule-grid,
  .background-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

`@supports` 表达一个 feature condition；`@media` 表达一个环境条件。它们是 At-rule，不是 `property: value` declaration。

拖动浏览器宽度跨过 `720px`：

```text
< 720px：一列
≥ 720px：两列
```

本课只用它证明 At-rule 的语言身份，响应式策略由 04.07 完整教学。

---

## 12. 完整运行与自动检查

创建 `verify.mjs`：

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /Shorthand \/ Longhand \/ At-rule Laboratory/);
assert.match(css, /KP004_COMMENT_MARKER/);
assert.match(css, /margin:\s*8px 16px 24px 32px/);
assert.match(css, /margin-left:\s*48px/);
assert.match(css, /background-image:[^;]+;\s*background:\s*#fff7ed/s);
assert.match(css, /@supports\s*\(display:\s*grid\)/);
assert.match(css, /@media\s*\(min-width:\s*720px\)/);

console.log("✓ KP004 shorthand, longhand, comment, at-rule, and reset experiments are complete.");
```

执行：

```bash
npm run check
npm run dev
```

预期：

```text
✓ KP004 shorthand, longhand, comment, at-rule, and reset experiments are complete.
```

自动脚本只保证实验条件没有被误删；真实行为必须继续用浏览器 Styles / Computed 验证。

---

## 13. 语言层级心智模型

```text
stylesheet
│
├── qualified rule
│   ├── selector
│   └── declaration block
│       ├── longhand declaration
│       └── shorthand declaration
│            └── 同时为多个 longhand 指定值
│
├── @media
│    └── condition + nested rules
│
├── @supports
│    └── condition + nested rules
│
└── comment
     └── 不参与 cascade value
```

---

## 14. Wrong Way / Failure

### Wrong Way 1：把 Shorthand 当成只修改显式写出的部分

```css
.card {
  background-image: url(...);
  background: white;
}
```

后面的 shorthand 会重置其它 background longhand。

### Wrong Way 2：同一属性组无规律混用 shorthand / longhand

```css
margin: ...;
margin-left: ...;
margin: ...;
```

最后一个 shorthand 可能再次重置前面的 longhand。

### Wrong Way 3：把 `@media` 叫作 CSS 属性

`@media` 是 At-rule；属性是 declaration 中 `property: value` 的左侧部分。

---

## 15. 更深原理

Shorthand 的核心不是源码字符替换，而是 **specified value 语义**。

浏览器解析：

```css
background: #fff7ed;
```

会对它所控制的 longhand 形成对应指定结果。某个 longhand 没在 shorthand 文本里出现，不等于“保留它之前的值”。

这也是为什么大型项目重构 `background`、`font`、`animation`、`border` 等 shorthand 时必须先检查它们控制的子属性集合。

---

## 16. Performance / Compatibility / A11Y

- shorthand 与 longhand 首先是正确性和维护性选择，不要为了少几个字符做危险压缩。
- `@supports` 适合 Progressive Enhancement，但不能替代真实兼容矩阵。
- 本课的响应式变化只改变排列，不改变 DOM 阅读顺序。
- 关闭 CSS 后，页面语义内容仍完整可读。

---

## 17. Production Boundary

生产建议：

```text
明确一个 shorthand 管理哪些 longhand
→ Code Review 检查 shorthand 后置重置
→ 同一组件保持可预测的属性组写法
→ 现代能力提供 @supports / 自然降级
→ 注释记录非显然的约束和故障原因
```

不要制定“整个项目禁止 shorthand”的机械规则。问题不是 shorthand 本身，而是不知道它会设置什么。

---

## 18. 本课只记住 3 件事

1. **Shorthand 会一次设置一组 Longhand，省略的部分也可能被重置。**
2. **后写 Longhand 可以只覆盖其中一项，但仍受完整 Cascade 控制。**
3. **`@media`、`@supports` 等是 At-rule，不是普通 Property Declaration。**

---

## 19. Challenge

不看答案完成：

1. 创建 `.padding-demo`，分别用 1、2、3、4 个值展示 padding 展开。
2. 先写 `border-left-color`，再写 `border` shorthand，预测最终左边框颜色。
3. 新增 `@media (prefers-reduced-motion: reduce)`，只改变一个纯视觉效果。
4. 在 DevTools Computed 中记录至少 6 个 shorthand 展开的 longhand。

每个实验写：

```text
预测
→ 修改
→ 观察
→ Computed 证据
→ 结论
```

---

## 20. Mastery Check

- `margin: 8px 16px 24px 32px` 分别对应哪四边？
- 为什么后写 `margin-left` 不会改变其它三边？
- 为什么 `background: white` 可能让旧背景图消失？
- CSS comment 是否进入 declaration？
- At-rule 与 qualified rule 的结构差异是什么？
- 为什么不能把 `@media` 简单叫成“CSS 属性”？

---

## 21. 参考资料

- MDN：Shorthand properties — <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Shorthand_properties>
- MDN：CSS At-rules — <https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule>
- MDN：`@supports` — <https://developer.mozilla.org/en-US/docs/Web/CSS/@supports>
- MDN：`@media` — <https://developer.mozilla.org/en-US/docs/Web/CSS/@media>

---

## 22. 最终源码说明

当前目录中的 `index.html`、`styles.css`、`package.json`、`server.mjs`、`verify.mjs` 是完整独立成果。

其中 `.background-demo--reset` 的 shorthand reset 是**故意保留的 Failure Lab 条件**，不是待修复 bug。
