# KP045：`ul` 无序列表

> 所属章节：04 · 列表、区块和页面地标
>
> 本知识点目标：理解无序集合的语义、`li` 的职责，以及嵌套列表如何表达父子层级。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. `ul` 表达什么](#1-ul-表达什么)
  - [2. `li` 是列表项](#2-li-是列表项)
  - [3. 嵌套列表应该放在哪里](#3-嵌套列表应该放在哪里)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

完成本节后，你应该能够：

1. 判断一组内容是否适合使用 `<ul>`。
2. 理解 `<ul>` 与普通多个 `<p>` 的语义区别。
3. 正确使用 `<li>` 表达列表项。
4. 正确书写嵌套无序列表。
5. 通过开发者工具观察列表的 DOM 层级，而不是只看项目符号样式。

## 理论讲解

### 1. `ul` 表达什么

`<ul>` 是 **unordered list**，表示“一组彼此相关、但顺序不是核心含义”的项目。

典型场景：

- 商品特点；
- 功能清单；
- 注意事项；
- 标签集合；
- 菜单中的同级选项。

例如：

```html
<ul>
  <li>支持离线阅读</li>
  <li>支持深色模式</li>
  <li>支持多端同步</li>
</ul>
```

这里三项换一个排列顺序，整体语义通常不会发生本质变化，因此适合无序列表。

> “无序”不是“浏览器不能排序”，而是“顺序本身不是内容语义的关键部分”。

### 2. `li` 是列表项

`<li>` 是 **list item**。

在 `<ul>` 中，每一个同级项目都应该由 `<li>` 表达：

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

不推荐把普通 `<div>` 直接当作列表项：

```html
<ul>
  <div>HTML</div>
  <div>CSS</div>
</ul>
```

即使浏览器可能仍然显示内容，这也没有按照列表内容模型来表达结构。

列表语义的价值不只是默认圆点，还包括：

- 浏览器知道这是一个列表；
- 辅助技术能够识别列表和项目数量；
- CSS、JavaScript 可以基于明确结构选择元素；
- 后续维护者更容易理解内容关系。

### 3. 嵌套列表应该放在哪里

子列表应该属于某一个父列表项，因此通常放在对应 `<li>` 内部：

```html
<ul>
  <li>
    前端
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
</ul>
```

结构可以理解为：

```text
前端
├── HTML
└── CSS
```

而不是把第二层 `<ul>` 和父 `<li>` 并列放置。

嵌套列表常见于：

- 分类目录；
- 文件树；
- 多级菜单；
- 课程章节结构。

## 动手编码：从 0 到 1

本节最终源码：[`index.html`](./index.html)

### 第 1 步：创建最小 HTML 文件

**目标**：先得到一个能独立打开的页面。

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KP045 - ul 无序列表</title>
</head>
<body>
  <h1>课程能力清单</h1>
</body>
</html>
```

**为什么这样写**：先建立稳定的文档骨架，列表结构在下一步加入。

**运行后观察**：页面只显示一个主标题。

### 第 2 步：加入第一层无序列表

**目标**：表达一组顺序不重要的能力项。

```html
<ul id="skills">
  <li>语义化 HTML</li>
  <li>响应式 CSS</li>
  <li>现代 JavaScript</li>
</ul>
```

**为什么这样写**：这三项是同级能力集合，调整顺序不会改变流程，因此使用 `<ul>`。

**运行后观察**：浏览器默认会为三个 `<li>` 显示项目符号。

### 第 3 步：给某个列表项加入子列表

**目标**：表达“现代 JavaScript”下面还有子能力。

```html
<li>
  现代 JavaScript
  <ul>
    <li>模块化</li>
    <li>异步编程</li>
    <li>DOM 操作</li>
  </ul>
</li>
```

**为什么这样写**：子列表属于“现代 JavaScript”这个父项，所以嵌套在它的 `<li>` 内部。

**运行后观察**：第二层列表会有进一步缩进，DOM 中也形成明确父子关系。

### 第 4 步：增加实验辅助信息

**目标**：让 DOM 结构可观察。

```html
<pre id="result"></pre>

<script>
  const skills = document.querySelector('#skills');
  const directItems = skills.querySelectorAll(':scope > li');
  const nestedLists = skills.querySelectorAll('ul');

  document.querySelector('#result').textContent =
    `第一层 li 数量：${directItems.length}\n嵌套 ul 数量：${nestedLists.length}`;
</script>
```

**为什么这样写**：JavaScript 只负责观察结构，不是 `<ul>` 知识点本身。

**运行后观察**：应显示第一层项目数量和嵌套列表数量。

## 运行案例

直接用浏览器打开：

```text
04-lists-landmarks/kp045-unordered-list/index.html
```

也可以通过任意静态 HTTP Server 运行。

## 效果验证

完成案例后检查：

1. 页面存在一个 `#skills` 无序列表。
2. 第一层共有 3 个 `<li>`。
3. “现代 JavaScript”内部存在第二层 `<ul>`。
4. 子列表位于对应父 `<li>` 内部。
5. 删除 CSS 后列表语义仍然存在。
6. 控制台或页面辅助结果能够验证 DOM 层级。

可以在控制台执行：

```js
document.querySelectorAll('#skills > li').length
```

预期结果：

```text
3
```

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<ul>
  <li>...</li>
</ul>
```

以及正确的嵌套结构：

```html
<li>
  父项目
  <ul>
    <li>子项目</li>
  </ul>
</li>
```

### 实验辅助代码

案例中的 CSS 只负责可读性，JavaScript 只负责统计第一层 `<li>` 与嵌套 `<ul>` 数量。

它们都不是 `<ul>` 的必要组成部分。