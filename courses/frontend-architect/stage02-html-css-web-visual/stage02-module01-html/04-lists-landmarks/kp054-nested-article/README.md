# KP054：嵌套 `article`

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [为什么 `article` 可以嵌套](#为什么-article-可以嵌套)
  - [评论与回复结构](#评论与回复结构)
  - [父子文章关系](#父子文章关系)
  - [标题层级与归属](#标题层级与归属)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 理解 `article` 可以嵌套，并表达父内容与子内容之间的关联。
2. 使用嵌套 `article` 表达帖子、评论和回复。
3. 保持父文章、评论和回复的标题层级清晰。
4. 使用 DOM 判断一个 `article` 的嵌套深度与最近父 `article`。
5. 避免把普通布局嵌套误写成文章嵌套。

## 理论讲解

### 为什么 `article` 可以嵌套

一个独立内容单元内部，还可能包含另一个独立但与父内容相关的内容单元。

典型例子：

- 博客文章包含用户评论；
- 论坛帖子包含回复；
- 评论又包含子回复。

因此可以写：

```html
<article class="post">
  <h2>原始帖子</h2>

  <article class="comment">
    <h3>用户评论</h3>
  </article>
</article>
```

### 评论与回复结构

评论本身通常可以独立识别：

- 有作者；
- 有时间；
- 有评论正文；
- 可以被单独引用或链接。

所以使用 `article` 很自然。

回复也可以继续嵌套：

```html
<article class="comment">
  <h3>张三的评论</h3>

  <article class="reply">
    <h4>李四的回复</h4>
  </article>
</article>
```

### 父子文章关系

嵌套关系本身就在表达上下文：

- 外层 `article`：原始文章；
- 内层 `article`：针对外层内容产生的相关独立内容。

如果两个内容彼此完全独立，就通常应该作为兄弟 `article`，而不是为了视觉缩进而嵌套。

### 标题层级与归属

为了让页面结构更清晰，本案例使用：

- 页面主标题：`h1`；
- 主帖子：`h2`；
- 评论：`h3`；
- 评论回复：`h4`。

HTML 并不会根据 `article` 嵌套自动替你调整标题级别，因此标题层级仍然需要开发者主动设计。

## 动手编码：从 0 到 1

### 第 1 步：创建主帖子

```html
<main>
  <h1>技术讨论区</h1>

  <article id="post">
    <h2>你更喜欢 Grid 还是 Flexbox？</h2>
    <p>我通常根据二维或一维布局需求来选择。</p>
  </article>
</main>
```

### 第 2 步：加入评论 `article`

```html
<article id="post">
  <h2>你更喜欢 Grid 还是 Flexbox？</h2>
  <p>帖子正文...</p>

  <article id="comment-1">
    <h3>张三的评论</h3>
    <p>复杂页面我更偏向 Grid。</p>
  </article>
</article>
```

`comment-1` 是独立评论，但语义上属于主帖。

### 第 3 步：给评论加入回复

```html
<article id="comment-1">
  <h3>张三的评论</h3>
  <p>复杂页面我更偏向 Grid。</p>

  <article id="reply-1">
    <h4>李四的回复</h4>
    <p>我也会用 Grid 做大结构。</p>
  </article>
</article>
```

### 第 4 步：加入第二条评论

第二条评论应该与第一条评论同级，而不是错误地嵌套到第一条评论里面。

```html
<article id="comment-2">
  <h3>王五的评论</h3>
  <p>组件内部我更常用 Flexbox。</p>
</article>
```

### 第 5 步：增加嵌套深度观察

```html
<pre id="output"></pre>
<script>
  const articles = [...document.querySelectorAll('article')];
  const lines = articles.map((article) => {
    let depth = 0;
    let parent = article.parentElement?.closest('article');
    let cursor = parent;

    while (cursor) {
      depth += 1;
      cursor = cursor.parentElement?.closest('article');
    }

    return `${article.id}: depth=${depth}, parent=${parent?.id || 'none'}`;
  });

  document.querySelector('#output').textContent = lines.join('\n');
</script>
```

### 最终源码

- [查看最终 `index.html`](./index.html)

**本节核心代码**：

- 嵌套 `<article>`；
- 帖子、评论、回复的父子结构；
- `h2 / h3 / h4` 标题层级。

**实验辅助代码**：

- 计算嵌套深度的 JavaScript；
- CSS 缩进样式。

## 运行案例

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/04-lists-landmarks/kp054-nested-article
python3 -m http.server 8000
```

访问 `http://localhost:8000/`。

## 效果验证

### 验证 1：主帖深度为 0

主帖没有父 `article`。

### 验证 2：评论深度为 1

两条评论都应该直接属于主帖。

### 验证 3：回复深度为 2

`reply-1` 应该属于 `comment-1`，并且比评论多一层。

### 验证 4：标题层级清晰

页面结构应该是 `h1 → h2 → h3 → h4`，而不是依赖 CSS 字号猜测父子关系。

本节最终需要记住：

> 嵌套 `article` 表达的是“独立内容之间的上下文归属”，不是视觉缩进。
