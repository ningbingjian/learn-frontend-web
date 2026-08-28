# KP052：`aside` 间接相关内容

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [`aside` 的核心语义](#aside-的核心语义)
  - [页面级 `aside`](#页面级-aside)
  - [文章级 `aside`](#文章级-aside)
  - [`aside` 与主内容的独立性](#aside-与主内容的独立性)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 理解 `aside` 表示与周围内容“间接相关”的补充内容。
2. 区分页面级 `aside` 与文章内部 `aside`。
3. 判断推荐阅读、作者资料、术语补充等内容是否适合使用 `aside`。
4. 避免把 `aside` 简单理解成“视觉上位于右侧的栏”。
5. 通过 DOM 观察 `aside` 与其上下文的归属关系。

## 理论讲解

### `aside` 的核心语义

`<aside>` 表示：

> 与当前内容相关，但不是理解当前内容主线所必需的补充内容。

常见场景包括：

- 相关阅读；
- 术语补充；
- 作者简介；
- 广告；
- 与正文相关但可以独立移除的侧注。

### 页面级 `aside`

当 `aside` 直接处在页面较高层级时，它通常与整个页面相关。

例如：

```html
<main>...</main>
<aside aria-labelledby="recommend-title">
  <h2 id="recommend-title">推荐阅读</h2>
  ...
</aside>
```

这里的推荐阅读不是某一段文章专属，而是整个页面范围的辅助内容。

### 文章级 `aside`

`aside` 也可以出现在 `article` 内部：

```html
<article>
  <h2>CSS 盒模型</h2>
  <p>正文...</p>

  <aside>
    <h3>术语补充</h3>
    <p>content box 是内容区域。</p>
  </aside>
</article>
```

此时它与最近的文章内容相关。

### `aside` 与主内容的独立性

判断是否适合 `aside`，可以问：

> 如果把这部分拿掉，正文主线还能否完整成立？

如果可以，而且它仍然与周围内容有明显关联，`aside` 往往是合理选择。

需要特别注意：

- `aside` 不等于“右侧栏”；
- CSS 完全可以把 `aside` 放在左侧、右侧、底部甚至正文中间；
- 视觉位置不能决定 HTML 语义。

## 动手编码：从 0 到 1

### 第 1 步：创建主文章

**本步目标**：先建立页面主线内容。

```html
<main>
  <article id="lesson">
    <h1>理解 CSS 盒模型</h1>
    <p>每个元素都可以看成一个盒子。</p>
  </article>
</main>
```

此时页面只有主内容。

### 第 2 步：加入文章级 `aside`

**本步目标**：添加与文章相关、但不是正文主线必需的术语补充。

```html
<article id="lesson">
  <h1>理解 CSS 盒模型</h1>
  <p>每个元素都可以看成一个盒子。</p>

  <aside aria-labelledby="term-title">
    <h2 id="term-title">术语补充</h2>
    <p>content box 指内容区域。</p>
  </aside>
</article>
```

这里的 `aside` 属于文章上下文。

### 第 3 步：加入页面级 `aside`

**本步目标**：增加与整个页面相关的推荐阅读。

```html
<aside aria-labelledby="recommend-title">
  <h2 id="recommend-title">推荐阅读</h2>
  <ul>
    <li><a href="#">CSS display</a></li>
    <li><a href="#">CSS position</a></li>
  </ul>
</aside>
```

这个 `aside` 放在 `main` 之后，与整个页面而不是某篇文章局部内容对应。

### 第 4 步：增加观察脚本

**本步目标**：输出每个 `aside` 最近的 `article` 和是否位于 `main` 中。

```html
<pre id="output"></pre>
<script>
  const lines = [...document.querySelectorAll('aside')].map((aside, index) => {
    const article = aside.closest('article');
    const inMain = Boolean(aside.closest('main'));
    return `aside ${index + 1}: article=${article?.id || 'none'}, inMain=${inMain}`;
  });

  document.querySelector('#output').textContent = lines.join('\n');
</script>
```

JavaScript 只负责观察 DOM 归属，不是 `aside` 语义本身。

### 最终源码

- [查看最终 `index.html`](./index.html)

**本节核心代码**：

- `<aside>`；
- 页面级与文章级嵌套关系；
- `aria-labelledby` 和可见标题。

**实验辅助代码**：

- `closest('article')`；
- `closest('main')`；
- DOM 状态输出。

## 运行案例

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/04-lists-landmarks/kp052-aside
python3 -m http.server 8000
```

访问：

```text
http://localhost:8000/
```

## 效果验证

### 验证 1：文章级补充内容

“术语补充”应该位于文章内部，并与 `#lesson` 文章关联。

### 验证 2：页面级推荐内容

“推荐阅读”位于 `main` 之后，不属于文章内部。

### 验证 3：观察 DOM 输出

输出应类似：

```text
aside 1: article=lesson, inMain=true
aside 2: article=none, inMain=false
```

### 验证 4：改变视觉位置

尝试使用 CSS 把页面级 `aside` 放到左侧或底部，HTML 语义并不会改变。

本节最终需要记住：

> `aside` 表达的是“补充关系”，不是“右边那一栏”。
