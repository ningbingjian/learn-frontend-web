# KP053：`article` 独立内容

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [`article` 的独立语义](#article-的独立语义)
  - [可分发与可复用判断](#可分发与可复用判断)
  - [标题与作者信息](#标题与作者信息)
  - [`article` 不等于普通卡片](#article-不等于普通卡片)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 理解 `article` 表示可以相对独立成立的内容单元。
2. 使用“可单独分发 / 可单独复用”判断是否适合 `article`。
3. 为文章提供清晰标题，并合理放置作者、发布时间等元数据。
4. 区分 `article` 与纯视觉卡片容器。
5. 通过 DOM 观察多个文章单元的边界。

## 理论讲解

### `article` 的独立语义

`<article>` 适合表示一块在脱离当前页面后，仍然能够独立理解的内容。

常见例子：

- 新闻文章；
- 博客文章；
- 论坛帖子；
- 用户评论；
- 独立产品评测；
- 可单独订阅或聚合的内容项。

### 可分发与可复用判断

判断一个内容块是否适合 `article`，可以问：

> 如果把它单独放进 RSS、搜索结果、聚合页或另一个页面，它是否仍然是一个完整内容单元？

如果答案是“是”，那么 `article` 通常很合适。

例如：

```html
<article>
  <h2>理解 CSS Grid</h2>
  <p>Grid 是二维布局系统...</p>
</article>
```

即使把这个节点独立抽出来，它仍然有自己的主题和正文。

### 标题与作者信息

`article` 最好有可识别标题：

```html
<article>
  <h2>理解 CSS Grid</h2>
  <p>作者：李雷</p>
  <p>正文...</p>
</article>
```

作者信息不是 `article` 的强制要求，但对于新闻、博客、评论等场景通常很重要。

常见做法是放入 `header` 或 `footer`：

```html
<article>
  <header>
    <h2>理解 CSS Grid</h2>
    <p>作者：李雷</p>
  </header>
  <p>正文...</p>
</article>
```

### `article` 不等于普通卡片

很多 UI 都长得像卡片，但并不因此自动成为 `article`。

例如一个只有按钮和统计数字的仪表盘卡片：

```html
<div class="card">
  <strong>今日订单</strong>
  <span>128</span>
</div>
```

它只是视觉组件，并不一定是可独立分发的内容。

因此：

> 先看内容是否独立成立，再决定是否用 `article`；不要先看 UI 是否像卡片。

## 动手编码：从 0 到 1

### 第 1 步：创建页面主题

```html
<main>
  <h1>前端文章精选</h1>
</main>
```

### 第 2 步：加入第一篇独立文章

```html
<article>
  <header>
    <h2>理解 CSS Grid</h2>
    <p>作者：李雷</p>
  </header>
  <p>Grid 是一个二维布局系统。</p>
</article>
```

这个内容块拥有独立标题和正文，可以单独被阅读。

### 第 3 步：加入第二篇文章

```html
<article>
  <header>
    <h2>理解 Flexbox</h2>
    <p>作者：韩梅梅</p>
  </header>
  <p>Flexbox 更擅长一维方向的布局。</p>
</article>
```

此时两个 `article` 是两个平级独立内容单元。

### 第 4 步：加入普通视觉卡片作对照

```html
<div class="metric-card">
  <strong>本周新增文章</strong>
  <span>12</span>
</div>
```

这里故意不使用 `article`，因为它只是一个统计组件。

### 第 5 步：增加观察脚本

```html
<pre id="output"></pre>
<script>
  const lines = [...document.querySelectorAll('article')].map((article, index) => {
    const heading = article.querySelector('h1, h2, h3, h4, h5, h6');
    return `article ${index + 1}: ${heading?.textContent || '无标题'}`;
  });
  document.querySelector('#output').textContent = lines.join('\n');
</script>
```

### 最终源码

- [查看最终 `index.html`](./index.html)

**本节核心代码**：

- `<article>`；
- 文章内部的 `header`；
- 文章标题和作者信息。

**实验辅助代码**：

- 普通 `.metric-card` 对照；
- JavaScript 统计 `article` 和标题。

## 运行案例

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/04-lists-landmarks/kp053-independent-content
python3 -m http.server 8000
```

访问 `http://localhost:8000/`。

## 效果验证

### 验证 1：两个独立内容单元

页面中应该有两篇拥有独立标题和正文的文章。

### 验证 2：统计卡片没有使用 `article`

“本周新增文章 12”只是 UI 统计块，因此使用普通 `div`。

### 验证 3：查看输出

输出应类似：

```text
article 1: 理解 CSS Grid
article 2: 理解 Flexbox
```

### 验证 4：尝试单独复制一篇文章

把任意一个 `article` 单独复制到一个新页面中，它依然拥有明确主题和内容，这正是独立性的体现。

本节最终需要记住：

> `article` 判断的核心是内容是否能够独立成立，而不是它看起来是否像一张卡片。
