# KP001：CSS 是什么——第一次让结构拥有可控外观

## 0. 课程信息

| 项目 | 内容 |
| --- | --- |
| Stage | Stage 04：CSS 完整体系 |
| Module | 04.01：CSS 语言、样式表与级联体系 |
| Lesson | KP001 |
| 深度 | Must |
| Pattern | BUILD-LAB + BROWSER-MECHANISM-LAB |
| 主问题 | CSS 在一个 Web 页面中究竟负责什么？ |
| 运行要求 | Node.js 20+，现代浏览器 |

---

## 1. 本课最终要做出什么

你会从一个普通 HTML 文档开始，完成一个“Architect Workbench 状态卡片”。

最终页面包含：

- 一个 Stage 标识。
- 一个有语义标题的项目状态卡片。
- 一段说明文字。
- 一个可用键盘聚焦的链接。
- 一个用于记录实验结论的证据区。

本课最重要的产物不是卡片本身，而是下面这个可验证结论：

> 保持 HTML 和 DOM 不变，只启用或停用 CSS，页面的内容与语义仍在，但视觉呈现会发生明显变化。

---

## 2. 本课解决什么问题

初学 CSS 时，最容易形成两个错误认识：

1. CSS 只是“把页面变漂亮”。
2. 页面最终看起来是什么样，就应该直接在 HTML 中写成什么样。

这两个认识都不完整。

CSS 的核心职责是：

```text
选择文档中的目标
+
为目标声明呈现规则
+
让浏览器根据级联、继承、布局和绘制机制得到最终视觉结果
```

HTML 主要描述内容是什么、结构怎样组织；CSS 主要描述这些结构如何呈现。两者会共同影响页面，但不能互相代替。

---

## 3. 前置知识与本课边界

### 3.1 前置知识

你应当已经知道：

- HTML 文档的基本结构。
- `main`、`article`、`section`、`h1`、`p`、`a` 的基本语义。
- 如何打开浏览器 DevTools。
- 如何在终端中进入目录并运行 npm script。

### 3.2 本课会讲

- HTML、DOM、CSS 与页面呈现的职责关系。
- 第一条 Selector、Declaration、Property 和 Value 的直觉。
- 外部样式表最小接入方式。
- Styles 与 Computed 面板的第一次观察。

### 3.3 本课暂时不展开

- Specificity 的精确计算。
- 继承与级联完整顺序。
- Box Model 计算。
- Flex 和 Grid 布局算法。
- 浏览器 Style → Layout → Paint → Composite 的完整流水线。

这些内容会在后续唯一 Owner Module 中完整学习。

---

## 4. 本课项目与实验介绍

项目名称：

```text
First Styled Status Card
```

实验采用“同一份 HTML、两种视觉状态”的方式：

```text
HTML 已存在、CSS 被停用
              ↓
浏览器仍然展示标题、段落、链接和列表
              ↓
启用同一份 CSS
              ↓
DOM 不变，但间距、字体、背景、边框和交互状态发生变化
```

这能证明 CSS 不是内容本身，而是浏览器呈现系统中的独立输入。

---

## 5. 起始状态

本课不继承上一课业务源码，从新的最小项目开始。

仓库中的 Lesson 目录保存了最终源码。为了完整跟做，你可以：

1. 在当前目录直接按步骤重新创建或替换文件；或者
2. 另外创建一个空练习目录，按相同路径和内容输入。

本课路径：

```text
learn-frontend-web-course/
└── stage-04-css/
    └── 04.01-css-language-and-stylesheets/
        └── kp001-what-is-css/
```

进入目录：

```bash
cd learn-frontend-web-course/stage-04-css/04.01-css-language-and-stylesheets/kp001-what-is-css
```

---

## 6. 最终会有哪些文件

```text
kp001-what-is-css/
├── README.md      # 当前施工教程
├── index.html     # 本课语义结构
├── styles.css     # 本课核心 CSS
├── package.json   # 无第三方依赖的运行命令
├── server.mjs     # 实验辅助 HTTP Server
└── verify.mjs     # 自动检查关键实验条件
```

### 核心代码

- `index.html`
- `styles.css`

### 实验辅助代码

- `server.mjs`：只负责通过本地 HTTP 提供两个核心文件。
- `verify.mjs`：只验证课程要求的结构和关键规则是否存在。

辅助代码不是本课 CSS 主知识点。

---

# 7. Step 0：准备一个不依赖第三方包的本地项目

## 7.1 当前状态

当前目录可以是空目录，也可以是仓库中已经包含最终文件的 Lesson 目录。

## 7.2 本步目标

建立统一运行命令：

```bash
npm run dev
npm run check
```

## 7.3 创建 `package.json`

文件路径：

```text
kp001-what-is-css/package.json
```

完整内容：

```json
{
  "name": "stage-04-kp001-what-is-css",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node server.mjs",
    "check": "node verify.mjs"
  }
}
```

这里没有 `dependencies` 和 `devDependencies`，所以不需要执行 `npm install`。

## 7.4 创建 `server.mjs`

文件路径：

```text
kp001-what-is-css/server.mjs
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
  console.log(`KP001 is running at http://localhost:${port}`);
});
```

### 这段辅助代码的职责

- Node.js 创建一个仅用于本机实验的 HTTP Server。
- `/` 和 `/index.html` 返回 HTML。
- `/styles.css` 返回 CSS，并声明正确的 `Content-Type`。
- 其他路径返回 404，避免把整个目录任意暴露出去。

现在还不能看到页面，因为核心 HTML 和 CSS 尚未创建。

---

# 8. Step 1：先只建立 HTML 语义结构

## 8.1 当前问题

我们需要先得到一份没有课程自定义 CSS 的页面，作为视觉基线。

## 8.2 创建 `index.html`

文件路径：

```text
kp001-what-is-css/index.html
```

先输入下面这份 **暂不接入 CSS** 的完整内容：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Stage 04 KP001：通过一个最小页面理解 CSS 与 HTML 的职责关系。"
    />
    <title>KP001｜CSS 是什么</title>
  </head>
  <body>
    <main class="lesson-shell">
      <p class="eyebrow">Stage 04 · Module 04.01 · KP001</p>

      <article class="status-card" aria-labelledby="project-title">
        <p class="status-card__label">Deployment status</p>
        <h1 id="project-title" class="status-card__title">Architect Workbench</h1>
        <p class="status-card__summary">
          HTML 提供标题、段落和链接的语义结构；CSS 决定这些结构怎样排版和呈现。
        </p>
        <a class="status-card__action" href="#evidence">查看本页证据</a>
      </article>

      <section id="evidence" class="evidence" aria-labelledby="evidence-title">
        <h2 id="evidence-title">本页证明什么</h2>
        <ol>
          <li>删除 CSS 后，HTML 内容和语义仍然存在。</li>
          <li>恢复 CSS 后，同一份 DOM 获得间距、颜色、边框和布局。</li>
          <li>CSS 改变呈现方式，不应该代替正确的 HTML 语义。</li>
        </ol>
      </section>
    </main>
  </body>
</html>
```

## 8.3 为什么 HTML 里已经有 class

`class` 是 HTML 属性。它本身不会自动产生卡片视觉效果。

这里先给元素稳定的类名，是为了让 CSS 稍后能够选择这些元素。此时：

```text
class 存在
≠
CSS 已经存在
≠
浏览器自动知道你想要什么视觉效果
```

## 8.4 第一次运行

现在可以运行。

在当前 Lesson 目录执行：

```bash
npm run dev
```

终端应显示：

```text
KP001 is running at http://localhost:4173
```

浏览器打开：

```text
http://localhost:4173
```

### 预期观察

- 页面有标题、段落、链接和有序列表。
- 标题默认较大、链接默认带颜色和下划线。
- 页面没有课程设计的卡片、背景、间距和按钮外观。

### 为什么仍然有一点样式

即使没有作者 CSS，浏览器仍然会使用自己的默认样式表，例如：

- `h1` 默认字号和粗体。
- `ol` 默认缩进和序号。
- `a` 默认颜色和下划线。
- `body` 默认 margin。

这种来源通常称为 **User Agent Stylesheet**。完整 Origin 与级联顺序会在本 Module 后续课程讲解。

---

# 9. Step 2：创建第一份外部 CSS

## 9.1 当前问题

HTML 已经表达了内容结构，但页面缺少项目需要的视觉层次。

## 9.2 创建 `styles.css`

文件路径：

```text
kp001-what-is-css/styles.css
```

完整内容：

```css
:root {
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: #172033;
  background: #eef3f8;
}

* {
  box-sizing: border-box;
}

body {
  min-block-size: 100vh;
  margin: 0;
}

.lesson-shell {
  inline-size: min(100% - 2rem, 52rem);
  margin-inline: auto;
  padding-block: 4rem;
}

.eyebrow {
  margin: 0 0 1rem;
  color: #355070;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status-card {
  padding: 2rem;
  border: 1px solid #c8d5e5;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 1.25rem 3rem rgb(29 55 90 / 0.12);
}

.status-card__label {
  display: inline-block;
  margin: 0 0 1rem;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  color: #0d5132;
  background: #dff7ea;
  font-size: 0.8125rem;
  font-weight: 700;
}

.status-card__title {
  margin: 0;
  color: #101828;
  font-size: clamp(2rem, 7vw, 4rem);
  line-height: 1.05;
}

.status-card__summary {
  max-inline-size: 42rem;
  margin-block: 1.25rem 1.5rem;
  color: #475467;
  font-size: 1.125rem;
  line-height: 1.75;
}

.status-card__action {
  display: inline-block;
  padding: 0.75rem 1rem;
  border-radius: 0.65rem;
  color: #ffffff;
  background: #2457d6;
  font-weight: 700;
  text-decoration: none;
}

.status-card__action:hover {
  background: #1943ad;
}

.status-card__action:focus-visible {
  outline: 3px solid #f6bd60;
  outline-offset: 4px;
}

.evidence {
  margin-block-start: 2rem;
  padding: 1.5rem 2rem;
  border-inline-start: 0.35rem solid #2457d6;
  background: #f8fafc;
}

.evidence h2 {
  margin-block-start: 0;
}

.evidence li + li {
  margin-block-start: 0.75rem;
}
```

## 9.3 当前能否看到变化

还不能。

原因不是 CSS 代码一定写错，而是 HTML 还没有声明要加载这份文件。

这建立了第一个重要关系：

```text
磁盘上存在 styles.css
≠
当前 HTML 文档已经使用 styles.css
```

---

# 10. Step 3：让 HTML 加载外部样式表

## 10.1 修改 `index.html`

文件路径：

```text
kp001-what-is-css/index.html
```

找到：

```html
<title>KP001｜CSS 是什么</title>
```

在它的下一行加入：

```html
<link rel="stylesheet" href="./styles.css" />
```

最终 `head` 中相关部分应为：

```html
<title>KP001｜CSS 是什么</title>
<link rel="stylesheet" href="./styles.css" />
```

## 10.2 为什么写在 `head`

`link` 告诉浏览器当前文档与外部资源之间的关系：

- `rel="stylesheet"`：这是一份样式表。
- `href="./styles.css"`：资源地址是当前目录中的 `styles.css`。

放在 `head` 中，浏览器可以在构建和呈现页面的早期发现样式资源。

## 10.3 再次运行和观察

如果 Server 仍在运行，保存文件后刷新浏览器即可；否则重新执行：

```bash
npm run dev
```

打开：

```text
http://localhost:4173
```

### 预期观察

- 整个页面有浅色背景。
- 内容区域居中并限制最大宽度。
- `article` 成为有白色背景、边框、圆角和阴影的卡片。
- 链接看起来像按钮，并且 Tab 聚焦时有清晰轮廓。
- HTML 文本内容没有因为接入 CSS 而改变。

### 结果解释

浏览器读取 HTML 时发现 `link`，再请求并解析 `styles.css`。规则匹配到具有相应 class 的元素，然后参与最终样式计算。

此时可以先建立下面的简化模型：

```text
HTML 源码 ──解析──> DOM
CSS 源码  ──解析──> CSSOM
DOM + CSSOM ──匹配与计算──> 元素最终样式
```

这个模型是当前阶段的最小心智模型。浏览器实际渲染流水线比它更复杂，Stage 09 会深入。

---

# 11. Step 4：停用 CSS，但不修改 HTML

## 11.1 本步目标

使用真实浏览器证据验证“CSS 与内容结构是两个输入”。

## 11.2 操作

1. 打开 DevTools。
2. 进入 **Elements**。
3. 在 DOM 中选中：

```html
<link rel="stylesheet" href="./styles.css">
```

4. 双击 `rel` 的值，把 `stylesheet` 临时改成：

```text
not-stylesheet
```

也可以直接在 DevTools 中删除这一行；刷新后源码会恢复。

## 11.3 预期观察

- 页面立即回到接近 Step 1 的浏览器默认样式。
- 标题、段落、链接、列表仍在。
- Elements 中的 `main`、`article`、`section` 等结构仍在。
- Accessibility 语义不应由卡片阴影或背景色决定。

## 11.4 恢复

刷新页面，或把 `rel` 改回：

```text
stylesheet
```

## 11.5 这个实验证明了什么

```text
CSS 可以改变呈现
但不能替代内容和语义
```

因此，不能为了得到“大标题”就把普通文本随便写成 `h1`，也不能为了得到按钮外观就忽略链接和按钮真正的交互语义。

---

# 12. Step 5：用 Styles 与 Computed 面板收集证据

## 12.1 观察 Styles

1. 在 Elements 中选中：

```html
<article class="status-card">
```

2. 查看 **Styles** 面板。
3. 找到 `.status-card` 规则。

你应该看到它来自：

```text
styles.css
```

并包含：

```css
padding: 2rem;
border: 1px solid #c8d5e5;
border-radius: 1rem;
background: #ffffff;
box-shadow: 0 1.25rem 3rem rgb(29 55 90 / 0.12);
```

Styles 面板偏向回答：

> 哪些规则匹配了当前元素，它们来自哪里，哪些声明被覆盖或无效？

## 12.2 观察 Computed

切换到 **Computed**，搜索：

```text
background-color
```

你应该看到最终值接近：

```text
rgb(255, 255, 255)
```

为什么源码写的是 `#ffffff`，Computed 却可能显示 `rgb(...)`？

因为源码中的写法和浏览器内部用于展示的计算值格式可以不同。当前只需要知道：

```text
作者写入的声明
经过浏览器解析与计算
得到 Computed Style 中的最终计算结果
```

完整值阶段会在本 Module 后续课程学习。

## 12.3 修改一个声明

在 Styles 面板中找到：

```css
background: #ffffff;
```

把值临时改成：

```css
background: #fff4d6;
```

### 预期观察

- 卡片背景立即变化。
- 源文件 `styles.css` 并没有被永久保存。
- 刷新后恢复源码状态。

DevTools 临时编辑适合验证假设，但不是最终修改源码的替代品。

---

# 13. Step 6：加入自动检查

## 13.1 创建 `verify.mjs`

文件路径：

```text
kp001-what-is-css/verify.mjs
```

完整内容：

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const css = await readFile(new URL("styles.css", import.meta.url), "utf8");

assert.match(html, /<link\s+rel="stylesheet"\s+href="\.\/styles\.css"\s*\/?>/);
assert.match(html, /class="status-card"/);
assert.match(html, /<main\s+class="lesson-shell">/);
assert.match(css, /\.status-card\s*\{/);
assert.match(css, /padding:\s*2rem/);
assert.match(css, /background:\s*#ffffff/);
assert.match(css, /\.status-card__action:focus-visible/);

console.log("✓ KP001 structure and CSS evidence are complete.");
```

## 13.2 运行检查

停止 Server 不是必须的。另开一个终端，在当前目录执行：

```bash
npm run check
```

预期输出：

```text
✓ KP001 structure and CSS evidence are complete.
```

这个脚本只检查关键实验条件存在，不等于完整 HTML/CSS 规范校验，也不替代浏览器视觉和 DevTools 验证。

---

# 14. 完整运行与验收

依次执行：

```bash
npm run check
npm run dev
```

访问：

```text
http://localhost:4173
```

必须完成以下人工验收：

- [ ] 页面可以正常加载。
- [ ] Network 中 `index.html` 与 `styles.css` 都返回 200。
- [ ] 删除或停用 `link` 后，内容仍完整存在。
- [ ] 恢复 `link` 后，卡片视觉恢复。
- [ ] Styles 能定位 `.status-card` 来源。
- [ ] Computed 能找到最终背景色。
- [ ] 使用 Tab 可以聚焦“查看本页证据”链接。
- [ ] 聚焦时有清晰可见的 outline。

---

# 15. 图解：本课心智模型

```text
index.html
│
├── 文档语义
├── 元素关系
├── class / id 等匹配入口
└── <link rel="stylesheet" href="./styles.css">
                                  │
                                  ▼
                             styles.css
                                  │
                                  ├── Selector
                                  ├── Declaration
                                  ├── Property
                                  └── Value

HTML ──> DOM ──────────┐
                       ├──> 样式匹配与计算 ──> 页面呈现
CSS  ──> CSSOM ────────┘
```

不要把这张图误解成完整浏览器渲染架构。它只保留当前课需要的因果关系。

---

# 16. 理论收束

## 16.1 CSS 是什么

CSS 是 Cascading Style Sheets，中文通常译为“层叠样式表”。

当前先拆成两部分理解：

- **Style Sheets**：一组描述呈现规则的样式表。
- **Cascading**：当多个声明同时影响同一目标时，浏览器需要确定最终结果。

本课只建立样式表概念；完整级联会在后续课程展开。

## 16.2 CSS 不只是颜色

CSS 可以影响：

- 字体与文本排版。
- 盒模型与尺寸。
- Normal Flow、Flex、Grid 等布局。
- 定位和层叠。
- 响应式适配。
- 颜色、背景、滤镜和遮罩。
- 变换、过渡和动画。
- 打印、交互状态和部分可访问呈现。

## 16.3 CSS 也不应拥有一切

下面这些职责不能简单交给 CSS：

- 文档内容和语义。
- 用户操作后的业务状态。
- 数据请求和持久化。
- 权限判断。
- 服务端业务规则。

例如，使用 CSS 隐藏一个“管理员按钮”不等于权限控制；用户仍可能通过其他方式调用接口。安全体系由后续 Stage 完整教学。

---

# 17. Wrong Way 与故障排查

## 17.1 文件存在，但页面没有任何变化

按顺序检查：

1. `index.html` 是否真的包含 `link`。
2. `rel` 是否准确写成 `stylesheet`。
3. `href` 是否准确指向 `./styles.css`。
4. Network 中 CSS 请求是否为 200。
5. Console 是否有资源或 MIME 错误。
6. Selector 是否匹配真实 class。
7. 声明是否被覆盖或值无效。

不要一上来增加 `!important`。样式未生效的原因可能根本不是优先级。

## 17.2 只在 HTML 中堆 style 属性

Inline Style 能产生效果，但如果把整个页面都写成：

```html
<article style="padding: 32px; background: white; border-radius: 16px">
```

长期会出现：

- 相同视觉规则大量重复。
- 统一主题和响应式修改困难。
- 状态样式和伪类组织困难。
- 覆盖策略逐渐失控。

KP002 会正式比较三种接入方式的边界。

## 17.3 用视觉元素代替语义元素

错误思路：

> 只要把一个 `div` 做得像按钮，它就是按钮。

正确判断应先问：

- 它是导航到另一个位置，还是执行动作？
- 是否支持键盘？
- 是否有正确的语义和可访问名称？

CSS 只负责呈现，不会自动把错误的 HTML 语义修正为正确控件。

---

# 18. Production Boundary

真实项目中还需要考虑：

- CSS 是否阻塞首次呈现。
- 样式表是否过大或包含大量未使用规则。
- 自定义字体是否造成布局偏移。
- 新 CSS 特性是否需要兼容降级。
- 颜色和交互状态是否满足 A11Y。
- 全局规则是否污染其他页面。
- 主题、Token 和组件覆盖是否可治理。

这些问题不会在第一课全部解决，但本阶段会逐步闭环。

---

# 19. 本课只记住 3 件事

1. HTML 描述内容与语义结构，CSS 描述这些结构的呈现规则。
2. `styles.css` 存在不代表页面已经使用它；HTML 必须通过正确方式加载。
3. 判断 CSS 是否生效，要看 Network、Styles、Computed 和真实 DOM 证据，不要只靠肉眼猜。

---

# 20. Challenge

不要复制最终答案，独立完成下面的修改：

## 需求

为页面增加一个“Environment”信息区，显示：

- Runtime：Browser
- Stage：04
- Module：04.01

## 限制

- 使用语义正确的 HTML。
- 不使用 Inline Style。
- 新增 CSS 不能修改现有卡片的 class。
- 键盘聚焦样式不能被删除。

## 验收

- 停用 CSS 后，信息仍按合理阅读顺序存在。
- 启用 CSS 后，信息区有独立视觉层次。
- 能在 Styles 中指出每条新增声明来自哪里。

---

# 21. Mastery Check

能够不看答案回答：

1. 为什么没有作者 CSS 时，`h1` 仍然看起来较大？
2. `class="status-card"` 为什么不会自动产生卡片外观？
3. `link` 中 `rel` 与 `href` 分别负责什么？
4. Styles 面板和 Computed 面板分别更适合回答什么问题？
5. 为什么不能把“视觉上像按钮”当作“语义上就是按钮”？
6. 停用 CSS 后 DOM 为什么仍然存在？
7. `styles.css` 写完但页面不变时，第一批证据应该去哪里找？

全部能够解释并完成实验，才算真正完成本课。
