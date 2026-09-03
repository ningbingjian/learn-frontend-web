# KP002：CSS 怎样进入页面——Inline、Internal 与 External

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP002 |
| 深度 | Must |
| Pattern | BUILD-LAB + NETWORK-LAB + FAILURE-LAB |
| 主问题 | 浏览器通过哪些路径获得 CSS，它们的作用域、网络行为和维护边界有什么不同？ |
| 运行要求 | Node.js 20+，现代浏览器 |

---

## 1. 本课最终要做出什么

你会完成一个 CSS 接入方式对比页：

```text
Inline CSS 卡片
Internal CSS 卡片
External CSS 卡片
加载顺序实验卡片
```

页面会同时保留三种 CSS 接入方式，目的是让你可以直接在 Elements、Styles、Network 和源码中对照。

本课最终要证明：

1. Inline CSS 写在元素的 `style` 属性中。
2. Internal CSS 写在当前 HTML 文档的 `style` 元素中。
3. External CSS 通过 `link` 引用独立文件，并产生独立网络请求。
4. 当两个同来源、同重要性、同优先级的规则发生冲突时，后出现的声明可能覆盖前面的声明。
5. “接入方式不同”不等于“应该随意混用”。生产项目需要明确边界。

---

## 2. 本课解决什么问题

KP001 已经使用外部样式表完成第一张卡片，但只看到了一种写法。

真实项目中经常会遇到：

```html
<div style="color: red"></div>

<style>
  .message {
    color: red;
  }
</style>

<link rel="stylesheet" href="./styles.css" />
```

它们都能把 CSS 引入当前页面，但并不等价：

- 存放位置不同。
- 复用范围不同。
- 是否产生额外资源请求不同。
- 调试来源不同。
- 覆盖和维护成本不同。

本课不靠背诵优缺点，而是让三个路径同时运行并留下证据。

---

## 3. 前置知识与本课边界

### 3.1 前置知识

- 已完成 KP001。
- 理解 HTML 与 CSS 的基本职责分离。
- 会运行本地 Server，并打开 Network 和 Styles 面板。

### 3.2 本课会讲

- Inline、Internal、External CSS 的准确位置。
- `style` 属性、`style` 元素、`link` 元素的职责。
- 外部样式表请求和 `Content-Type`。
- 同等条件下的 Source Order 直觉。
- 样式文件路径错误的完整诊断流程。

### 3.3 本课暂时不讲

- 完整 Cascade 排序。
- Inline Style 与 `!important` 的全部组合。
- Cascade Layer。
- CSS Module、CSS-in-JS、Utility CSS 等工程方案。

Source Order 在本课只建立可观察直觉，完整级联模型由 KP005～KP007 负责。

---

## 4. 本课项目与实验设计

项目名称：

```text
Stylesheet Attachment Laboratory
```

四个实验对象：

### 对象 A：Inline CSS

```html
<article class="method-card" style="border-color: #6d28d9">
```

### 对象 B：Internal CSS

```html
<style>
  .method-card--internal {
    border-color: #c2410c;
  }
</style>
```

### 对象 C：External CSS

```html
<link rel="stylesheet" href="./styles.css" />
```

```css
.method-card--external {
  border-color: #0369a1;
}
```

### 对象 D：加载顺序

外部文件先声明：

```css
.load-order-card {
  background: #eff6ff;
}
```

HTML 中后出现的 Internal CSS 再声明：

```css
.load-order-card {
  background: #fff7ed;
}
```

两条规则使用相同选择器。最终背景应是后者的橙色。

---

## 5. 起始状态

本课从零状态建立，不运行时依赖 KP001。

当前路径：

```text
learn-frontend-web-course/
└── stage-04-css/
    └── 04.01-css-language-and-stylesheets/
        └── kp002-attach-stylesheet/
```

进入目录：

```bash
cd learn-frontend-web-course/stage-04-css/04.01-css-language-and-stylesheets/kp002-attach-stylesheet
```

最终源码已经保存在当前目录；跟做时可以逐步创建或替换。

---

## 6. 最终文件

```text
kp002-attach-stylesheet/
├── README.md
├── index.html
├── styles.css
├── package.json
├── server.mjs
└── verify.mjs
```

核心文件：`index.html`、`styles.css`。  
辅助文件：`package.json`、`server.mjs`、`verify.mjs`。

---

# 7. Step 0：建立独立运行基线

## 7.1 创建 `package.json`

路径：

```text
kp002-attach-stylesheet/package.json
```

完整内容：

```json
{
  "name": "stage-04-kp002-attach-stylesheet",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node server.mjs",
    "check": "node verify.mjs"
  }
}
```

## 7.2 创建 `server.mjs`

路径：

```text
kp002-attach-stylesheet/server.mjs
```

完整内容：

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
  console.log(`KP002 is running at http://localhost:${port}`);
});
```

当前暂时不能运行，因为 `index.html` 和 `styles.css` 尚未创建。

---

# 8. Step 1：建立 External CSS 基线

## 8.1 创建 `index.html`

路径：

```text
kp002-attach-stylesheet/index.html
```

先输入下面这份只包含 External CSS 接入的版本：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Stage 04 KP002：比较 Inline、Internal 和 External 三种 CSS 接入方式。"
    />
    <title>KP002｜CSS 怎样进入页面</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main class="lesson-shell">
      <p class="eyebrow">Stage 04 · Module 04.01 · KP002</p>
      <h1>CSS 怎样进入页面</h1>
      <p class="intro">先建立 External CSS 基线。</p>

      <section class="method-grid" aria-label="CSS 接入方式对比">
        <article class="method-card method-card--external">
          <p class="method-card__kind">External CSS</p>
          <h2>由 link 元素请求独立 CSS 文件</h2>
          <code>&lt;link rel="stylesheet" href="./styles.css"&gt;</code>
        </article>
      </section>
    </main>
  </body>
</html>
```

## 8.2 创建 `styles.css`

路径：

```text
kp002-attach-stylesheet/styles.css
```

先输入 External CSS 基线：

```css
:root {
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: #172033;
  background: #f3f6fa;
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
  max-inline-size: 48rem;
  margin-block: 1rem 2rem;
  color: #475467;
  font-size: 1.125rem;
  line-height: 1.7;
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}

.method-card {
  padding: 1.5rem;
  border: 0.25rem solid #94a3b8;
  border-radius: 1rem;
  background: #ffffff;
}

.method-card--external {
  border-color: #0369a1;
}

.method-card__kind {
  margin-block: 0 0.75rem;
  color: #475467;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.method-card h2 {
  margin-block: 0 1rem;
  font-size: 1.2rem;
  line-height: 1.4;
}

.method-card code {
  display: block;
  overflow-wrap: anywhere;
  color: #344054;
  font-size: 0.875rem;
}
```

## 8.3 第一次运行

```bash
npm run dev
```

打开：

```text
http://localhost:4173
```

页面应显示一张蓝色边框卡片。

## 8.4 Network 证据

1. 打开 DevTools → Network。
2. 勾选 Disable cache。
3. 刷新页面。
4. 在类型筛选中选择 CSS，或者搜索 `styles.css`。

预期看到独立请求：

```text
styles.css    200    stylesheet
```

查看 Response Headers，应看到本地 Server 返回：

```text
Content-Type: text/css; charset=utf-8
```

这个证据说明 External CSS 是一个由 `href` 定位、由浏览器单独获取的资源。

---

# 9. Step 2：加入 Inline CSS

## 9.1 当前问题

External CSS 已经能复用规则，但有些源码会直接在元素上出现 `style` 属性。我们需要观察它到底在哪里。

## 9.2 修改 `index.html`

找到：

```html
<section class="method-grid" aria-label="CSS 接入方式对比">
```

在 External 卡片之前加入：

```html
<article class="method-card" style="border-color: #6d28d9">
  <p class="method-card__kind">Inline CSS</p>
  <h2>写在 style 属性中</h2>
  <code>style="border-color: #6d28d9"</code>
</article>
```

保存并刷新。

### 预期观察

- 新卡片复用了 External CSS 中 `.method-card` 的 padding、背景和圆角。
- 紫色边框来自当前元素的 `style` 属性。
- Network 中不会因为这条 Inline CSS 新增一个 CSS 请求。

## 9.3 Styles 证据

在 Elements 中选中 Inline 卡片。

Styles 面板顶部应出现类似：

```css
element.style {
  border-color: #6d28d9;
}
```

`element.style` 表示声明来自当前元素的 `style` 属性，而不是外部文件中的普通规则。

## 9.4 当前边界

Inline CSS 并不是“语法非法”。它在一些运行时计算、邮件模板或框架输出中可能出现。

问题在于大规模手写 Inline CSS 时：

- 规则难复用。
- 状态和伪类难组织。
- 统一主题难修改。
- 覆盖和审查成本上升。

因此，能使用不等于应该把它作为默认架构。

---

# 10. Step 3：加入 Internal CSS

## 10.1 修改 `index.html` 的 `head`

找到：

```html
<link rel="stylesheet" href="./styles.css" />
```

在其后加入：

```html
<style>
  .method-card--internal {
    border-color: #c2410c;
  }
</style>
```

## 10.2 修改卡片区域

在 Inline 卡片之后、External 卡片之前加入：

```html
<article class="method-card method-card--internal">
  <p class="method-card__kind">Internal CSS</p>
  <h2>写在当前 HTML 的 style 元素中</h2>
  <code>&lt;style&gt; ... &lt;/style&gt;</code>
</article>
```

保存并刷新。

### 预期观察

- Internal 卡片使用橙色边框。
- 它仍复用了 External CSS 的 `.method-card` 公共规则。
- Network 中仍只有一个外部 `styles.css` 请求。
- Internal 规则可以在 Styles 面板中定位到当前 HTML 文档。

## 10.3 Internal CSS 的边界

Internal CSS 的作用范围是当前文档。它适用于：

- 独立实验页面。
- 极小的单文件 Demo。
- 特定文档的少量关键样式。
- 某些服务端直接输出的独立页面。

当多个页面需要复用和缓存同一批样式时，External Stylesheet 通常更容易维护。

---

# 11. Step 4：建立相同选择器的 Source Order 实验

## 11.1 修改 `styles.css`

在文件末尾加入：

```css
.load-order-card {
  margin-block-start: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #bfdbfe;
  border-radius: 1rem;
  background: #eff6ff;
}

.load-order-card h2 {
  margin-block-start: 0;
}
```

External CSS 此时把背景声明为浅蓝色：

```css
background: #eff6ff;
```

## 11.2 修改 Internal CSS

在已有 `style` 元素中，紧接 `.method-card--internal` 规则后加入：

```css
.load-order-card {
  background: #fff7ed;
}
```

完整 `style` 元素应为：

```html
<style>
  .method-card--internal {
    border-color: #c2410c;
  }

  .load-order-card {
    background: #fff7ed;
  }
</style>
```

## 11.3 在 `main` 末尾加入实验卡片

放在 `section.method-grid` 后面：

```html
<section class="load-order-card" aria-labelledby="order-title">
  <h2 id="order-title">加载顺序实验</h2>
  <p>
    外部样式表先把背景设置成蓝色；后出现的 Internal CSS 使用相同选择器将它覆盖成橙色。
  </p>
</section>
```

## 11.4 运行与观察

刷新浏览器。

预期：加载顺序卡片背景是浅橙色，而不是浅蓝色。

## 11.5 Styles 证据

选中 `.load-order-card`。

Styles 面板应该同时显示两条 `.load-order-card`：

- `styles.css` 中的 `background: #eff6ff` 被划掉。
- `index.html` 后出现的 `background: #fff7ed` 生效。

本实验刻意保证两条规则：

- 来源都是 Author。
- 都不是 `!important`。
- 选择器完全相同。
- 属性完全相同。

因此，当前冲突由后出现的声明获胜。

这只是完整 Cascade 的一部分。不要把“后写的一定赢”当作通用规则；更高重要性、不同 Origin、Layer、Specificity 等都可能改变结果。

---

# 12. Step 5：补齐最终页面内容

将 `index.html` 替换为当前 Lesson 目录中的完整最终源码，或确认它与下面结构一致：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Stage 04 KP002：比较 Inline、Internal 和 External 三种 CSS 接入方式。"
    />
    <title>KP002｜CSS 怎样进入页面</title>

    <link rel="stylesheet" href="./styles.css" />

    <style>
      .method-card--internal {
        border-color: #c2410c;
      }

      .load-order-card {
        background: #fff7ed;
      }
    </style>
  </head>
  <body>
    <main class="lesson-shell">
      <p class="eyebrow">Stage 04 · Module 04.01 · KP002</p>
      <h1>CSS 怎样进入页面</h1>
      <p class="intro">
        三张卡片使用三种接入路径；第四张卡片用于观察相同优先级下的加载顺序。
      </p>

      <section class="method-grid" aria-label="CSS 接入方式对比">
        <article class="method-card" style="border-color: #6d28d9">
          <p class="method-card__kind">Inline CSS</p>
          <h2>写在 style 属性中</h2>
          <code>style="border-color: #6d28d9"</code>
        </article>

        <article class="method-card method-card--internal">
          <p class="method-card__kind">Internal CSS</p>
          <h2>写在当前 HTML 的 style 元素中</h2>
          <code>&lt;style&gt; ... &lt;/style&gt;</code>
        </article>

        <article class="method-card method-card--external">
          <p class="method-card__kind">External CSS</p>
          <h2>由 link 元素请求独立 CSS 文件</h2>
          <code>&lt;link rel="stylesheet" href="./styles.css"&gt;</code>
        </article>
      </section>

      <section class="load-order-card" aria-labelledby="order-title">
        <h2 id="order-title">加载顺序实验</h2>
        <p>
          外部样式表先把背景设置成蓝色；后出现的 Internal CSS 使用相同选择器将它覆盖成橙色。
        </p>
      </section>
    </main>
  </body>
</html>
```

最终 `styles.css` 应与当前目录源码一致，包含公共页面样式、三个卡片样式和加载顺序基线。

---

# 13. Step 6：制造外部样式表路径故障

## 13.1 正常基线

先确认：

- 页面正常显示。
- Network 中 `styles.css` 返回 200。
- 三张卡片和加载顺序实验都可见。

## 13.2 只改变一个故障条件

在 `index.html` 中把：

```html
<link rel="stylesheet" href="./styles.css" />
```

临时改成：

```html
<link rel="stylesheet" href="./style.css" />
```

注意：这里只删除了文件名中的一个 `s`。

## 13.3 运行症状

刷新页面。

预期：

- 大部分布局和公共卡片外观消失。
- Inline 的紫色边框声明仍在，但由于公共 border 宽度和样式来自外部 CSS，它不再形成原来的完整卡片边框。
- Internal CSS 中的两条规则仍被解析，但只声明了局部属性，无法恢复完整页面。
- Network 中出现 `style.css` 404。

## 13.4 根因证据

Network 里找到失败请求：

```text
style.css    404
```

查看 Request URL，确认浏览器请求的是不存在的路径。

Elements 中查看 `link`，确认 `href` 与真实文件名不一致。

## 13.5 修复与回归

恢复：

```html
<link rel="stylesheet" href="./styles.css" />
```

刷新后确认：

- CSS 请求恢复 200。
- 页面恢复。
- Styles 能再次定位到 `styles.css`。

### 诊断结论

这是资源路径故障，不是 Specificity 故障。增加 `!important` 完全无效，因为浏览器根本没有拿到那份外部 CSS。

---

# 14. Step 7：加入自动检查

创建：

```text
kp002-attach-stylesheet/verify.mjs
```

完整内容：

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /<link\s+rel="stylesheet"\s+href="\.\/styles\.css"\s*\/?>/);
assert.match(html, /<style>[\s\S]*\.method-card--internal/);
assert.match(html, /style="border-color:\s*#6d28d9"/);
assert.match(html, /\.load-order-card\s*\{[\s\S]*background:\s*#fff7ed/);
assert.match(css, /\.method-card--external\s*\{/);
assert.match(css, /\.load-order-card\s*\{[\s\S]*background:\s*#eff6ff/);

console.log("✓ KP002 contains Inline, Internal, External and load-order evidence.");
```

运行：

```bash
npm run check
```

预期：

```text
✓ KP002 contains Inline, Internal, External and load-order evidence.
```

---

# 15. 三种接入方式对比

| 维度 | Inline | Internal | External |
| --- | --- | --- | --- |
| 位置 | 元素 `style` 属性 | 当前 HTML 的 `style` 元素 | 独立 `.css` 文件 |
| 当前文档复用 | 很弱 | 可以 | 可以 |
| 跨页面复用 | 不适合作为默认方式 | 通常不方便 | 适合 |
| 独立网络请求 | 否 | 否 | 是 |
| 浏览器缓存独立资源 | 否 | 否 | 可以 |
| 伪类 / 媒体查询组织 | 很受限 | 可以 | 可以 |
| 调试来源 | `element.style` | 当前 HTML | CSS 文件与行号 |
| 常见使用 | 极少量动态值、特殊输出 | 单文件实验、文档局部规则 | 常规项目主样式 |

这个表不是绝对禁令。架构判断需要结合：

- 页面数量。
- 是否需要复用和缓存。
- 样式是否由运行时生成。
- 是否存在 CSP 等安全约束。
- 构建工具和框架如何处理样式。

这些生产边界会在后续 Stage 深入。

---

# 16. 图解：三条路径如何到达浏览器

```text
Inline
HTML element style attribute
            │
            └──────────────┐
                           │
Internal                   ▼
HTML <style> ───────> CSS 解析与规则集合
                           │
External                   │
<link href>                │
    │                      │
    ├── HTTP request       │
    ▼                      │
styles.css ────────────────┘
                           │
                           ▼
                    匹配、级联与最终样式
```

External CSS 多了一段资源发现和请求过程，但它也获得了独立文件、跨页面复用和缓存等工程能力。

---

# 17. 理论收束

## 17.1 `style` 属性不是 `style` 元素

二者名称相似，但位置和模型不同：

```text
style attribute
→ 属于某个具体 HTML 元素

style element
→ 在文档中承载一组 CSS 规则
```

## 17.2 External Stylesheet 为什么需要正确 MIME

浏览器收到资源后，需要知道它是什么类型。我们的 Server 为 CSS 返回：

```text
Content-Type: text/css; charset=utf-8
```

真实生产环境如果返回错误 MIME、HTML 错误页或被安全策略阻止，样式表可能无法正常应用。判断时必须看 Network 的 Status、Response Header 和 Response Body，而不是只看文件扩展名。

## 17.3 后出现为什么只是一条局部规则

本课的加载顺序实验只在其他级联条件相同的情况下成立。

简化表达：

```text
同 Origin
+ 同 Importance
+ 同 Layer 条件
+ 同 Specificity
+ 同 Scoping 条件
→ Source Order 决定后者获胜
```

完整顺序将在后续课程通过冲突模拟器展开。

---

# 18. Wrong Way

## 18.1 看到 Inline 赢了，就认为 Inline 最强最好

“能够覆盖”不等于“可维护”。大量 Inline Style 会把视觉决策分散到每个元素上，增加复用、主题、状态和治理成本。

## 18.2 每个页面复制一份巨大的 `style` 元素

这样会造成：

- 重复传输。
- 多页面修改不一致。
- 无法独立缓存公共 CSS。
- 规则所有权难追踪。

## 18.3 样式不见了就增加 `!important`

在本课路径故障中，`!important` 不能修复 404。正确流程是先确定：

```text
资源有没有加载
→ 规则有没有解析
→ Selector 有没有匹配
→ 声明是否有效
→ 才分析 Cascade
```

---

# 19. 完整运行与验收

执行：

```bash
npm run check
npm run dev
```

访问：

```text
http://localhost:4173
```

验收：

- [ ] 三张接入方式卡片全部显示。
- [ ] Inline 卡片边框为紫色。
- [ ] Internal 卡片边框为橙色。
- [ ] External 卡片边框为蓝色。
- [ ] 加载顺序卡片最终背景为浅橙色。
- [ ] Styles 能分别看到 `element.style`、`index.html` 与 `styles.css` 来源。
- [ ] Network 中只有 External CSS 形成独立 CSS 请求。
- [ ] 路径改错后能通过 404 定位根因。
- [ ] 修复路径后完成回归。

---

# 20. Production Boundary

真实项目还需要考虑：

- Content Security Policy 是否允许 Inline Style。
- Critical CSS 是否内联以及怎样控制体积。
- 外部 CSS 如何拆包、缓存、预加载和失效。
- CSS 加载失败时页面是否仍可阅读和操作。
- SSR、Streaming 和 Hydration 期间样式如何到达客户端。
- 框架运行时生成样式是否带来性能和调试成本。

本课只建立原生 Web 平台上的三条入口，后续工程化和架构阶段再分析工具层方案。

---

# 21. 本课只记住 3 件事

1. Inline、Internal、External 都能提供 CSS，但位置、网络行为、复用和治理边界不同。
2. External CSS 必须经过正确 URL 请求和 MIME 响应；样式缺失时先查 Network。
3. “后写覆盖前写”只在其他级联条件相同时成立，不能当作完整 Cascade 规则。

---

# 22. Challenge

## 需求

增加第四种实验：给 External CSS 的 `link` 添加一个只在打印时生效的 `media` 条件，并创建 `print.css`。

## 限制

- 屏幕上不能应用打印样式。
- 打开打印预览时必须能看到明显变化。
- 必须在 Network 中确认资源是否被发现和请求。
- 不能使用 JavaScript。

## 验收材料

- 屏幕状态截图或说明。
- 打印预览状态截图或说明。
- `link` 的完整代码。
- Network 证据。
- 对 `media` 职责的一句话解释。

---

# 23. Mastery Check

1. Inline CSS、Internal CSS、External CSS 分别写在哪里？
2. 为什么只有 External CSS 通常会产生独立资源请求？
3. Styles 面板中的 `element.style` 表示什么？
4. 为什么路径 404 不能通过提高 Specificity 修复？
5. 本课加载顺序实验为什么是 Internal 的背景获胜？
6. “后写的一定赢”为什么是错误总结？
7. External CSS 相比复制多个大 `style` 元素有哪些工程优势？
8. 为什么还需要检查 Response Header 和 Response Body，而不能只看 `.css` 扩展名？

能够独立复现三种入口、故障和顺序实验，才算完成本课。
