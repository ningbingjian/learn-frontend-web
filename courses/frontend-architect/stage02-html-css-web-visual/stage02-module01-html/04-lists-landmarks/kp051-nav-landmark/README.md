# KP051：`nav` 导航地标

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [`nav` 表达主要导航集合](#nav-表达主要导航集合)
  - [页面可以有多个 `nav`](#页面可以有多个-nav)
  - [多个导航如何命名](#多个导航如何命名)
  - [普通链接组不一定需要 `nav`](#普通链接组不一定需要-nav)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 理解 `nav` 表示“重要导航链接集合”，而不是“只要有链接就套一层 `nav`”。
2. 在同一页面中合理使用多个 `nav`。
3. 使用 `aria-label` 或 `aria-labelledby` 为多个导航提供可区分的名称。
4. 区分主要导航、目录导航和普通辅助链接组。
5. 通过 DOM 和可访问性工具验证页面中的导航地标。

## 理论讲解

### `nav` 表达主要导航集合

`<nav>` 用来包裹页面中重要的导航链接集合，例如：

- 全站主导航；
- 当前文档目录；
- 分区导航；
- 分页导航；
- 面包屑导航。

最常见的结构是：

```html
<nav aria-label="主导航">
  <ul>
    <li><a href="#home">首页</a></li>
    <li><a href="#courses">课程</a></li>
  </ul>
</nav>
```

`nav` 关心的是“导航语义”，内部并不强制必须使用 `ul`。使用列表只是因为很多导航本身就是一组同类链接，列表语义通常很合适。

### 页面可以有多个 `nav`

一个真实页面经常同时存在：

- 顶部主导航；
- 文章目录；
- 面包屑；
- 分页导航。

因此页面中出现多个 `<nav>` 是正常的。

真正的问题不是“能不能有多个”，而是：

> 用户能否知道每个导航分别是做什么的？

### 多个导航如何命名

当页面存在多个导航地标时，应该给它们提供可区分的可访问名称。

方式一：使用 `aria-label`：

```html
<nav aria-label="主导航">...</nav>
<nav aria-label="本文目录">...</nav>
```

方式二：让可见标题提供名称：

```html
<h2 id="toc-title">本文目录</h2>
<nav aria-labelledby="toc-title">...</nav>
```

第二种方式的优势是：

- 屏幕上的视觉标题；
- 辅助技术中的导航名称；

使用的是同一份文本，不容易出现两套文案不一致。

### 普通链接组不一定需要 `nav`

例如页脚中只有：

```html
<p>
  <a href="/privacy">隐私政策</a>
  <a href="/terms">服务条款</a>
</p>
```

如果这些链接并不是页面的重要导航系统，就不需要为了“它们是链接”强行改成 `<nav>`。

一个简单判断方法：

> 如果用户使用读屏软件的“导航地标列表”，你是否希望这个链接组出现在里面？

如果答案是否定的，通常没必要使用 `nav`。

## 动手编码：从 0 到 1

### 第 1 步：创建最小页面

**本步目标**：先准备页面标题和主要内容。

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>KP051 nav 导航地标</title>
</head>
<body>
  <h1>课程中心</h1>
</body>
</html>
```

此时页面还没有导航地标。

### 第 2 步：加入主导航

**本步目标**：用 `nav` 表达全站主要导航。

```html
<nav aria-label="主导航">
  <ul>
    <li><a href="#frontend">前端</a></li>
    <li><a href="#backend">后端</a></li>
    <li><a href="#ai">AI</a></li>
  </ul>
</nav>
```

这里的 `aria-label="主导航"` 让辅助技术能够识别这个导航的用途。

### 第 3 步：加入第二个导航

**本步目标**：验证页面可以存在多个不同职责的 `nav`。

```html
<h2 id="toc-title">本文目录</h2>
<nav aria-labelledby="toc-title">
  <a href="#overview">概览</a>
  <a href="#examples">案例</a>
</nav>
```

注意这里使用的是 `aria-labelledby`，名称直接来自可见的 `h2`。

### 第 4 步：保留普通链接组

**本步目标**：观察并不是每组链接都需要 `nav`。

```html
<footer>
  <p>
    <a href="#privacy">隐私政策</a>
    <a href="#terms">服务条款</a>
  </p>
</footer>
```

这组链接在本案例里只是辅助信息，因此保留普通结构。

### 第 5 步：增加观察脚本

**本步目标**：把页面中的 `nav` 数量、名称和链接数量输出出来。

```html
<pre id="output"></pre>
<script>
  const navs = [...document.querySelectorAll('nav')];
  const lines = navs.map((nav, index) => {
    const labelledby = nav.getAttribute('aria-labelledby');
    const label = nav.getAttribute('aria-label')
      || (labelledby ? document.getElementById(labelledby)?.textContent : '')
      || '未命名';

    return `nav ${index + 1}: ${label}, links=${nav.querySelectorAll('a').length}`;
  });

  document.querySelector('#output').textContent = lines.join('\n');
</script>
```

这段 JavaScript 只是实验辅助代码；本节核心仍然是 `nav` 的 HTML 语义与命名策略。

### 最终源码

- [查看最终 `index.html`](./index.html)

**本节核心代码**：

- `<nav>`；
- `aria-label`；
- `aria-labelledby`；
- 导航中的链接集合。

**实验辅助代码**：

- `querySelectorAll('nav')`；
- 输出导航数量、名称和链接数量的 JavaScript。

## 运行案例

推荐使用本地 HTTP 服务：

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/04-lists-landmarks/kp051-nav-landmark
python3 -m http.server 8000
```

访问：

```text
http://localhost:8000/
```

## 效果验证

### 验证 1：主导航存在

页面顶部应该存在一个包含“前端 / 后端 / AI”的导航区域。

### 验证 2：第二个导航名称来自标题

“本文目录”导航通过 `aria-labelledby="toc-title"` 使用可见标题作为名称。

### 验证 3：普通页脚链接没有变成 `nav`

页脚链接仍然只是普通链接组，说明 `nav` 不应滥用。

### 验证 4：查看输出

输出应类似：

```text
nav 1: 主导航, links=3
nav 2: 本文目录, links=2
```

### 验证 5：检查可访问性树

在浏览器 DevTools 的 Accessibility 面板中查看页面，应该能够区分两个 navigation 地标及其名称。

本节最终需要记住：

> `nav` 的价值不是给链接加一层容器，而是让“重要导航系统”成为明确的语义地标。
