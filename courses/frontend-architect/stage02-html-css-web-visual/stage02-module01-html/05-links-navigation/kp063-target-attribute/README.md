# KP063：`target` 属性

> 所属章节：05 · 超链接与导航
>
> 本知识点目标：理解 `target` 如何选择链接的浏览上下文，掌握 `_self`、`_blank`、命名浏览上下文，以及链接如何定向到 iframe 或可复用窗口。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. target 控制的不是 URL，而是浏览上下文](#1-target-控制的不是-url而是浏览上下文)
  - [2. `_self` 与 `_blank`](#2-_self-与-_blank)
  - [3. 命名浏览上下文可以复用](#3-命名浏览上下文可以复用)
  - [4. iframe 也可以成为 target 目标](#4-iframe-也可以成为-target-目标)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

完成本节后，你应该能够：

1. 解释 `target` 决定的是“在哪个浏览上下文中打开链接”。
2. 区分默认导航、`target="_self"` 与 `target="_blank"`。
3. 使用自定义名称复用同一个浏览上下文，而不是每次都新开标签页。
4. 使用 iframe 的 `name` 把链接结果加载到指定 iframe。
5. 理解 `target` 的上下文选择与 `rel` 的安全关系是两个不同维度。

## 理论讲解

### 1. target 控制的不是 URL，而是浏览上下文

链接最基础的结构是：

```html
<a href="./target-page.html">打开目标页</a>
```

`href` 决定“去哪里”，`target` 决定“在哪里打开”。

例如：

```html
<a href="./target-page.html" target="_blank">打开目标页</a>
```

这里：

- `href` 仍然是目标 URL；
- `target="_blank"` 只是改变导航使用的浏览上下文。

所谓 **浏览上下文（browsing context）**，可以简单理解为“能够承载一个文档并进行导航的环境”，例如：

- 当前标签页；
- 新标签页或新窗口；
- 某个 iframe；
- 已经存在、带有特定名称的窗口。

所以不要把 `target` 理解成“新窗口属性”。它真正解决的问题是：**这次导航应该交给哪个浏览上下文。**

### 2. `_self` 与 `_blank`

#### `_self`

```html
<a href="./target-page.html" target="_self">当前上下文打开</a>
```

`_self` 表示在当前浏览上下文中导航。

如果没有写 `target`，普通链接默认行为通常就等价于在当前上下文打开：

```html
<a href="./target-page.html">默认打开</a>
```

因此一般不需要给所有普通链接机械地补上 `_self`。

#### `_blank`

```html
<a href="./target-page.html" target="_blank" rel="noopener">新标签页打开</a>
```

`_blank` 请求使用一个新的顶层浏览上下文，用户通常会看到新标签页或新窗口，具体表现由浏览器、用户设置和平台决定。

这里显式写了：

```html
rel="noopener"
```

它属于下一节 KP064 的安全关系知识。本节把它作为新窗口链接的工程安全基线使用，但 `target` 本身仍只负责“导航到哪里打开”。

现代浏览器通常已经对 `target="_blank"` 提供 opener 隔离保护；工程代码仍常显式声明 `rel="noopener"`，让安全意图更清晰，并兼顾旧环境。

### 3. 命名浏览上下文可以复用

`target` 不只能写以下划线开头的特殊关键字，也可以写一个自定义名称：

```html
<a href="./target-page.html?report=1" target="reportWindow">打开报表 1</a>
<a href="./target-page.html?report=2" target="reportWindow">打开报表 2</a>
```

两个链接都使用：

```text
reportWindow
```

如果第一个链接已经创建了这个命名浏览上下文，第二次导航通常会复用它，而不是继续无限新开标签页。

这种模式适合：

- 后台系统固定的预览窗口；
- 报表查看窗口；
- 帮助文档窗口；
- 希望“只保留一个外部辅助窗口”的桌面式 Web 应用。

但也要考虑用户体验：

- 用户可能不知道旧窗口内容被替换了；
- 窗口可能被放在屏幕背后；
- 移动端对多窗口行为支持和表现不同。

所以命名窗口是工具，不应该为了“少开一个标签”而无条件使用。

### 4. iframe 也可以成为 target 目标

iframe 可以通过 `name` 声明自己的浏览上下文名称：

```html
<iframe name="previewFrame" title="链接预览区域"></iframe>
```

然后链接可以写：

```html
<a href="./target-page.html?frame=1" target="previewFrame">
  在预览区打开
</a>
```

此时浏览器会把目标页面加载进这个 iframe。

关键点是：

```text
target="previewFrame"
```

匹配的是 iframe 的：

```text
name="previewFrame"
```

不是 `id`。

这说明 `target` 的本质确实是“寻找一个浏览上下文名称”。

此外还有 `_parent`、`_top` 等特殊关键字，主要用于嵌套浏览上下文。本节不把它们作为核心案例，后续涉及 iframe 时再结合嵌套场景理解更清楚。

## 动手编码：从 0 到 1

本节最终源码：

- [`index.html`](./index.html)
- [`target-page.html`](./target-page.html)

### 第 1 步：创建最小页面

**目标**：先建立一个可运行页面。

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KP063 - target 属性</title>
</head>
<body>
  <h1>target 浏览上下文实验</h1>
</body>
</html>
```

**为什么这样写**：先把文档骨架固定下来，后面只关注链接导航行为。

**运行后观察**：页面只有一个主标题。

### 第 2 步：加入 `_self` 和 `_blank`

**目标**：观察当前上下文与新上下文的区别。

```html
<a href="./target-page.html?mode=self" target="_self">当前页打开</a>

<a href="./target-page.html?mode=blank" target="_blank" rel="noopener">
  新标签页打开
</a>
```

**为什么这样写**：两个链接访问同一个目标文件，只改变 `target`，最容易看出差异来自浏览上下文而不是 URL。

**运行后观察**：

- `_self` 会离开当前实验页；
- `_blank` 通常打开新标签页或窗口。

点击 `_self` 后可以使用浏览器“后退”返回实验页面。

### 第 3 步：创建可复用命名窗口

**目标**：验证自定义 target 名称可以复用浏览上下文。

```html
<a href="./target-page.html?report=first" target="reportWindow">
  报表 A
</a>

<a href="./target-page.html?report=second" target="reportWindow">
  报表 B
</a>
```

**为什么这样写**：两个链接使用完全相同的 `target="reportWindow"`。

**运行后观察**：先打开报表 A，再打开报表 B，第二次通常会复用同一个命名窗口 / 标签页。

### 第 4 步：把 iframe 变成目标上下文

**目标**：验证链接不仅能指向顶层窗口，还能指向 iframe。

```html
<a href="./target-page.html?frame=preview" target="previewFrame">
  加载到 iframe
</a>

<iframe
  name="previewFrame"
  title="链接预览区域"
  srcdoc="<p>等待 target 链接加载内容…</p>"
></iframe>
```

**为什么这样写**：iframe 的 `name` 与链接的 `target` 对应，浏览器可以据此找到目标浏览上下文。

**运行后观察**：点击链接后，页面本身不跳走，`target-page.html` 会出现在 iframe 中。

### 第 5 步：在目标页观察上下文

**目标**：让“当前是顶层页面还是 iframe”“窗口叫什么名字”变得可见。

`target-page.html` 中加入：

```html
<pre id="result"></pre>

<script>
  const params = new URLSearchParams(location.search);

  document.querySelector('#result').textContent = [
    `query：${params.toString() || '(none)'}`,
    `window.name：${window.name || '(empty)'}`,
    `是否顶层上下文：${window.top === window}`
  ].join('\n');
</script>
```

**为什么这样写**：这是实验观察代码，用于证明同一个目标文件会因为 `target` 不同而运行在不同浏览上下文中。

**运行后观察**：

- iframe 场景中“是否顶层上下文”为 `false`；
- 命名窗口场景通常可以看到相应的 `window.name`。

### 第 6 步：列出所有链接的 target

**目标**：把 HTML 属性和浏览器 DOM 属性做一次对照。

```html
<pre id="links"></pre>

<script>
  const rows = [...document.querySelectorAll('a[data-demo]')].map(link =>
    `${link.textContent.trim()} → target=${link.target || '(默认 _self)'}`
  );

  document.querySelector('#links').textContent = rows.join('\n');
</script>
```

**为什么这样写**：JavaScript 只负责观察属性，不参与链接的 target 行为。

**运行后观察**：页面会列出每个实验链接对应的 target。

## 运行案例

推荐通过 HTTP Server 运行整个模块，例如在仓库根目录启动静态服务，再访问本知识点的 `index.html`。

如果直接使用 `file://` 打开，基础 target 行为通常也能观察，但不同浏览器对本地文件、iframe 与窗口行为可能有额外限制，因此 HTTP 环境更接近真实 Web 应用。

重点按顺序测试：

1. `_blank` 新上下文；
2. `reportWindow` 命名窗口复用；
3. `previewFrame` iframe 定向。

## 效果验证

完成案例后检查：

1. 不写 target 的普通链接默认在当前上下文导航。
2. `target="_self"` 明确指向当前上下文。
3. `target="_blank"` 通常创建新标签页或窗口。
4. 两个 `target="reportWindow"` 链接能够复用同名浏览上下文。
5. `target="previewFrame"` 能把内容加载到 `name="previewFrame"` 的 iframe。
6. iframe 中的目标页显示“是否顶层上下文：false”。
7. 能解释 `href` 与 `target` 的职责完全不同。

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<a href="./target-page.html" target="_self">当前页</a>
<a href="./target-page.html" target="_blank" rel="noopener">新页面</a>
<a href="./target-page.html" target="reportWindow">命名窗口</a>

<iframe name="previewFrame" title="链接预览区域"></iframe>
<a href="./target-page.html" target="previewFrame">加载进 iframe</a>
```

真正属于本节知识点的是：

- `_self`；
- `_blank`；
- 自定义浏览上下文名称；
- iframe `name` 与链接 `target` 的对应关系。

### 实验辅助代码

- 页面 CSS 只负责布局和可读性；
- `URLSearchParams` 用于显示当前实验参数；
- `window.name`、`window.top === window` 用于观察浏览上下文；
- DOM 扫描脚本用于打印 target 属性。

这些辅助代码不是 `target` 的必要组成部分。