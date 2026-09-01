# C01：城市新闻专题页

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 项目目标

这个项目把前四章中最容易“单点会写、组合就乱”的内容串成一个真实新闻专题页。完成后你应该能够：

1. 从标准 HTML 文档骨架开始搭建页面。
2. 用 `header`、`nav`、`main`、`article`、`section`、`aside`、`footer` 表达内容归属。
3. 维持清晰的 `h1 → h2 → h3` 标题层级。
4. 在正文中正确组合 `p`、`time`、`figure`、`figcaption`、`blockquote`、`abbr` 等语义元素。
5. 用跳转链接和片段链接提升键盘导航体验。
6. 区分“语义结构”和“视觉布局”：CSS 可以改变位置，但不应该破坏 HTML 结构。

## 最终页面需求

页面主题为“海川市低碳交通专题”，包含：

- 站点页眉和主导航；
- 跳过导航链接；
- 一个专题主标题；
- 一篇主新闻；
- 数据摘要区；
- 市民声音引用；
- 相关报道列表；
- 补充说明侧栏；
- 页脚信息。

## 覆盖知识点

主要覆盖：

- KP001～KP016：文档骨架、UTF-8、`lang`、viewport；
- KP031～KP044：标题、段落、文本级语义、引用；
- KP045～KP056：列表、`header/footer/main/nav/aside/article/section`；
- KP059：页面片段导航；
- KP067～KP068：`figure/figcaption`；
- KP112：`time`。

## 结构设计

页面结构先用文本表示：

```text
body
├── skip link
├── header
│   └── nav
├── main
│   ├── header（专题标题）
│   ├── article（主新闻）
│   │   ├── header
│   │   ├── figure
│   │   ├── section（数据）
│   │   └── section（市民声音）
│   ├── section（相关报道）
│   └── aside（背景说明）
└── footer
```

先确定归属，再写 CSS。不要先画几个 `div` 再事后补语义。

## 动手编码：从 0 到 1

### 第 1 步：建立最小文档骨架

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>海川市低碳交通专题</title>
  </head>
  <body>
  </body>
</html>
```

本步先保证标准模式、编码、语言和移动端视口正确。

### 第 2 步：建立站点级结构

加入：

```html
<a class="skip-link" href="#main-content">跳到主要内容</a>
<header>...</header>
<main id="main-content">...</main>
<footer>...</footer>
```

跳过导航链接的目标是 `main`，而不是任意视觉容器。

### 第 3 步：加入主导航

用 `nav` 包含一组站内片段链接：

```html
<nav aria-label="专题导航">
  <ul>
    <li><a href="#lead-story">头条</a></li>
    <li><a href="#data">数据</a></li>
    <li><a href="#related">相关报道</a></li>
  </ul>
</nav>
```

`nav` 表达导航区域，`ul` 表达同级链接集合，两者职责不同。

### 第 4 步：用 article 表达可独立阅读的主新闻

```html
<article id="lead-story">
  <header>
    <h2>地铁新线开通，中心城区绿色出行占比突破 70%</h2>
    <p>发布于 <time datetime="2026-09-01T08:30:00+08:00">2026 年 9 月 1 日 08:30</time></p>
  </header>
  ...
</article>
```

页面 `h1` 是专题主题，文章 `h2` 是专题中的独立内容标题。

### 第 5 步：加入图文、数据和引用

图像与图注组成独立内容单元：

```html
<figure>
  <svg role="img" aria-labelledby="map-title map-desc">...</svg>
  <figcaption>图 1：三条轨道交通线路覆盖示意。</figcaption>
</figure>
```

数据区用带标题的 `section`，引用使用：

```html
<blockquote>
  <p>以前开车要四十分钟，现在地铁加步行二十五分钟就能到。</p>
</blockquote>
```

### 第 6 步：加入相关报道与补充信息

相关报道是同级集合，用 `ul`；背景资料不是主叙事的一部分，用 `aside`。

### 第 7 步：最后添加 CSS

CSS 只负责视觉：

- 桌面端主内容 + 侧栏两列；
- 小屏自动改为单列；
- 跳过导航链接获得焦点时显示；
- 标题、卡片、引用增加可读性。

不要为了网格布局把 `article/section/aside` 改成没有语义的 `div`。

### 第 8 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **项目核心 HTML**：文档骨架、标题层级、页面地标、文章/分区、列表、引用、时间和图注。
- **展示辅助代码**：CSS、内联 SVG，以及用于显示当前结构摘要的少量 JavaScript。

## 运行案例

可以直接双击 `index.html`，也可以从模块目录启动静态服务器：

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/projects/c01-city-news/
```

## 效果验证

完成后逐项检查：

1. Tab 第一次可以聚焦“跳到主要内容”。
2. 激活后焦点/位置进入主内容区域。
3. 页面只有一个专题主 `h1`，文章和子主题按 `h2/h3` 组织。
4. 主新闻是 `article`，数据/引用是它内部的 `section`。
5. 背景说明使用 `aside`，不是因为它“画在右边”。
6. 导航区域使用 `nav`，链接集合使用 `ul`。
7. 新闻发布时间包含机器可读的 `datetime`。
8. 缩窄浏览器窗口后布局变为单列，但 HTML 语义不改变。
9. 浏览器开发者工具中可以清楚看到地标和标题层级。

完成这个项目后，你应该能从“页面看起来像新闻”提升到“HTML 本身就是一篇结构清楚的新闻文档”。
