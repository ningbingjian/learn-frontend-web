# KP050：`main` 主内容地标

> 所属章节：04 · 列表、区块和页面地标
>
> 本知识点目标：理解 `main` 表达页面主内容，掌握“一个可见主区”的原则，并区分 `main`、`body` 与普通分区容器。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. `main` 表达页面的主内容](#1-main-表达页面的主内容)
  - [2. 页面通常只有一个可见 `main`](#2-页面通常只有一个可见-main)
  - [3. `body` 与 `main` 的区别](#3-body-与-main-的区别)
  - [4. `main` 与普通分区的区别](#4-main-与普通分区的区别)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

完成本节后，你应该能够：

1. 使用 `<main>` 标记当前页面的主内容。
2. 理解为什么重复的站点导航、Logo、版权信息通常不属于 `main`。
3. 区分 `<body>` 与 `<main>`。
4. 理解页面通常应只有一个可见的 `<main>`。
5. 知道 `main` 是主内容语义，不是普通布局容器。
6. 通过 DOM 和可访问性工具验证主内容地标。

## 理论讲解

### 1. `main` 表达页面的主内容

`<main>` 表示文档中与当前页面主要主题直接相关的内容。

例如文章详情页：

```html
<body>
  <header>站点导航</header>

  <main>
    <article>
      <h1>文章标题</h1>
      <p>文章正文...</p>
    </article>
  </main>

  <footer>版权信息</footer>
</body>
```

页面级导航和版权通常在不同页面重复出现，而 `<main>` 中的内容是当前页面的核心。

### 2. 页面通常只有一个可见 `main`

一个页面在同一时刻应该只有一个主内容区域。

最常见写法：

```html
<main>
  ...当前页面的主内容...
</main>
```

不要这样：

```html
<main>商品信息</main>
<main>相关推荐</main>
```

“相关推荐”不是第二个主内容区，它通常只是主内容中的一个章节，或者是其他相关区域。

HTML 对多个 `main` 的特殊场景有约束：如果文档中存在多个 `main`，除一个之外的其他 `main` 应通过 `hidden` 隐藏。普通业务页面应优先保持一个可见 `main`，这样结构最清楚。

### 3. `body` 与 `main` 的区别

`<body>` 是整个文档正文容器。

它包含：

- 页面级页眉；
- 导航；
- 主内容；
- 页面级页脚；
- 其他正文节点。

`<main>` 只是 `body` 中负责“主内容”的那一部分。

可以理解为：

```text
body
├── header
├── nav
├── main   ← 当前页面主内容
└── footer
```

因此不能把 `body` 和 `main` 当成同义词。

### 4. `main` 与普通分区的区别

`main` 回答的是：

> 页面最主要的内容在哪里？

而普通章节结构回答的是：

> 主内容内部有哪些主题块？

例如：

```html
<main>
  <h1>课程详情</h1>
  <section>
    <h2>课程简介</h2>
  </section>
  <section>
    <h2>课程目录</h2>
  </section>
</main>
```

一个 `main` 内可以包含多个章节。

`main` 本身不是为了加宽度、居中或做 Grid；这些都应该交给 CSS。

## 动手编码：从 0 到 1

本节最终源码：[`index.html`](./index.html)

### 第 1 步：创建页面级 header 与 footer

```html
<header>
  <p>Frontend Learning Lab</p>
</header>

<footer>
  <p>© Frontend Learning Lab</p>
</footer>
```

**目标**：先建立页面中会重复出现的站点级内容。

### 第 2 步：在中间加入唯一可见 main

```html
<main id="main-content">
  <h1>HTML 语义课程</h1>
  <p>这里是当前页面最主要的课程内容。</p>
</main>
```

**为什么这样写**：课程详情是当前页面的主要主题。

**运行后观察**：DOM 中 `main` 位于站点 header 和 footer 之间。

### 第 3 步：在 main 内划分章节

```html
<section>
  <h2>课程简介</h2>
  <p>学习 HTML 的内容结构和语义。</p>
</section>

<section>
  <h2>学习目标</h2>
  <p>能够根据内容角色选择正确元素。</p>
</section>
```

**为什么这样写**：这两个是主内容内部的主题块，不应该变成第二个、第三个 `main`。

### 第 4 步：加入跳转到主内容的链接

```html
<a href="#main-content">跳到主要内容</a>
```

**目标**：展示 `main` 常见的可访问性用途之一。

**为什么这样写**：键盘用户可以直接跳过重复导航进入当前页面核心内容。

### 第 5 步：检查可见 main 数量

```js
const mains = [...document.querySelectorAll('main')];
const visibleMains = mains.filter(main => !main.hidden);
```

**运行后观察**：当前案例应该输出 `1`。

## 运行案例

打开：

```text
04-lists-landmarks/kp050-main-landmark/index.html
```

## 效果验证

检查：

1. `body` 中包含站点级 header、main、footer。
2. 当前页面只有一个可见 `main`。
3. 页面主要课程内容位于 `main` 内。
4. `main` 内有多个普通章节，而不是多个 `main`。
5. 点击“跳到主要内容”后 URL 出现 `#main-content` 并定位到主区。
6. 去掉 CSS 不影响主内容语义。

控制台执行：

```js
document.querySelectorAll('main').length
```

预期结果：

```text
1
```

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<body>
  <header>...</header>
  <main id="main-content">...</main>
  <footer>...</footer>
</body>
```

### 实验辅助代码

跳转链接用于演示快速进入主内容；CSS 用于排版；JavaScript 只负责统计可见 `main` 数量。

真正的知识点是 `<main>` 对页面主内容的语义标记。