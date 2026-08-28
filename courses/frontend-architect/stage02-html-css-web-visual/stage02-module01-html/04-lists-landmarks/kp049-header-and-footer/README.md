# KP049：`header` 与 `footer`

> 所属章节：04 · 列表、区块和页面地标
>
> 本知识点目标：理解页面级与分区级 `header/footer`，以及它们的语义取决于所在上下文，而不是固定等于网站最顶部和最底部。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. `header` 是引导性内容](#1-header-是引导性内容)
  - [2. `footer` 是收尾与归属信息](#2-footer-是收尾与归属信息)
  - [3. 页面级与分区级的区别](#3-页面级与分区级的区别)
  - [4. `header/footer` 不是固定坐标](#4-headerfooter-不是固定坐标)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

完成本节后，你应该能够：

1. 使用页面级 `<header>` 表达页面或站点引导信息。
2. 使用文章级 `<header>` 表达文章自身标题、作者、时间等引导内容。
3. 使用页面级 `<footer>` 表达整页版权、站点链接等信息。
4. 使用文章级 `<footer>` 表达文章作者、标签、更新时间等收尾信息。
5. 理解同一个页面可以存在多个 `header/footer`。
6. 不再把 `header/footer` 当成纯粹的“顶部盒子”和“底部盒子”。

## 理论讲解

### 1. `header` 是引导性内容

`<header>` 表示其上下文中的介绍性或导航性内容。

页面级常见内容：

- 站点名称或 Logo；
- 页面标题；
- 主导航入口；
- 搜索入口。

文章级常见内容：

- 文章标题；
- 作者；
- 发布时间；
- 分类标签。

### 2. `footer` 是收尾与归属信息

`<footer>` 通常包含与当前上下文相关的收尾信息。

页面级常见内容：

- 版权信息；
- 隐私政策；
- 联系方式；
- 站点辅助链接。

文章级常见内容：

- 作者信息；
- 更新时间；
- 文章标签；
- 许可信息。

### 3. 页面级与分区级的区别

例如：

```html
<body>
  <header>站点页眉</header>

  <main>
    <article>
      <header>文章页眉</header>
      <p>正文</p>
      <footer>文章页脚</footer>
    </article>
  </main>

  <footer>站点页脚</footer>
</body>
```

这里一共有两个 `<header>` 和两个 `<footer>`，但语义并不冲突。

关键问题是：

> 这个 header/footer 属于谁？

### 4. `header/footer` 不是固定坐标

`header` 并不自动固定在页面顶部。

`footer` 也不会自动贴在视口底部。

这些视觉行为都由 CSS 决定，例如：

```css
position: sticky;
```

属于布局技术，不是元素语义。

因此：

```html
<div class="top-bar">...</div>
```

可能只是一个视觉顶部工具条；而：

```html
<article>
  <header>...</header>
</article>
```

即使它在页面中部，仍然是有效的文章引导内容。

## 动手编码：从 0 到 1

本节最终源码：[`index.html`](./index.html)

### 第 1 步：写页面级 header

```html
<header id="site-header">
  <p>Frontend Learning Lab</p>
  <nav aria-label="主导航">
    <a href="#article">文章</a>
  </nav>
</header>
```

**目标**：表达整个页面的站点级引导区域。

**为什么这样写**：站点名称和主导航属于整个页面，而不是某一篇文章。

### 第 2 步：加入文章及文章级 header

```html
<article id="article">
  <header class="article-header">
    <h1>语义化 HTML 为什么重要</h1>
    <p>作者：Frontend Team</p>
  </header>
</article>
```

**目标**：让文章自己拥有标题和作者信息。

**运行后观察**：页面现在有两个 `header`，分别属于不同上下文。

### 第 3 步：加入文章 footer

```html
<footer class="article-footer">
  <p>最后更新：2026-08-27</p>
</footer>
```

**目标**：表达文章自己的收尾信息。

### 第 4 步：加入页面级 footer

```html
<footer id="site-footer">
  <p>© Frontend Learning Lab</p>
</footer>
```

**目标**：表达整页范围的版权信息。

### 第 5 步：用 JavaScript 标出归属

```js
const siteHeader = document.querySelector('#site-header');
const articleHeader = document.querySelector('.article-header');
```

页面会输出两个节点最近的关键父级，方便观察“同名元素、不同上下文”。

## 运行案例

打开：

```text
04-lists-landmarks/kp049-header-and-footer/index.html
```

## 效果验证

检查：

1. 页面级 `header` 位于 `body` 下。
2. `article` 内还有独立 `header`。
3. `article` 内存在文章级 `footer`。
4. 页面末尾存在站点级 `footer`。
5. 页面拥有多个 `header/footer`，但每一个归属清楚。
6. 去掉 CSS 后，语义关系仍然保留。

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<header>...</header>
<article>
  <header>...</header>
  ...
  <footer>...</footer>
</article>
<footer>...</footer>
```

### 实验辅助代码

CSS 只负责把不同区域画出边界；JavaScript 只负责输出元素数量和父级信息。