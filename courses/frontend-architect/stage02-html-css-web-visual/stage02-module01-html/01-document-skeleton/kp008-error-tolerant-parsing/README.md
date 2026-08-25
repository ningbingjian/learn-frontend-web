# KP008：HTML 容错解析

> 节点：`node-02-01-01-01-01-02-02-02`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [完整源码讲解](#完整源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [课后练习](#课后练习)

## 学习目标

学完本节后，你应该能够：

1. 理解浏览器解析 HTML 时会进行错误恢复，而不是机械照搬源码缩进生成 DOM。
2. 知道 `p` 遇到不允许的区块内容时可能被解析器隐式结束。
3. 区分“查看源代码”与开发者工具 Elements 面板看到的内容。
4. 遇到结构问题时，知道 CSS 和 JavaScript 实际操作的是解析后的 DOM。
5. 能通过故意错误嵌套，验证源码结构和最终 DOM 可能不同。

> **本节核心知识是 HTML 解析器的容错与自动纠错。**  
> `contains()`、`parentElement` 和 DOM 子元素统计只是实验辅助代码。

## 理论讲解

### 1. 浏览器会自动纠错

HTML 解析不是简单地：

```text
源码缩进
  ↓
原样变成 DOM
```

浏览器会根据解析状态、元素内容模型和错误恢复规则，对错误结构进行补充、关闭或移动。

因此：

> 源码看起来是父子关系，不代表解析后的 DOM 一定还是父子关系。

### 2. `p` 的隐式结束

例如下面的结构是故意错误的：

```html
<p id="intro">
  商品介绍
  <div id="card">商品卡片</div>
</p>
```

`p` 不能把这样的 `div` 当成普通段落内容继续包裹。解析器遇到 `div` 时会先结束 `p`。

所以最终 DOM 中：

```text
intro.contains(card) === false
```

### 3. 源码与 DOM 要分开看

常见的两个观察入口：

```text
View Source / 查看源代码
    → 服务器返回的 HTML 文本

Elements / DOM API
    → 浏览器解析后的真实 DOM 树
```

CSS 选择器和 JavaScript 查询都基于后者。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：先知道我们要故意写错

这一节不是从“正确 HTML”开始，而是要主动制造一个非法嵌套：

```text
p
└── div   ← 故意写错
```

然后观察浏览器究竟怎么修复它。

### 第 1 步：建立正常页面骨架

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP008：HTML 容错解析</title>
</head>
<body>
  <h1>错误嵌套实验</h1>
</body>
</html>
```

### 第 2 步：故意把 `div` 写进 `p`

在 `h1` 后加入：

```html
<p id="intro">
  商品介绍
  <div id="card">商品卡片</div>
  售后说明
</p>
```

先不要运行脚本，先看源码缩进并回答：

> `card` 看起来是不是 `intro` 的子元素？

从纯文本缩进上看，答案似乎是“是”。

### 第 3 步：先用 Elements 面板看真实 DOM

保存并打开页面，然后打开开发者工具 Elements 面板。

重点展开 `body`，找到：

```text
#intro
#card
```

你会发现最终 DOM 与源码缩进并不一样。

这一步非常重要，因为它先让你**直接看到浏览器的纠错结果**，而不是马上依赖 JavaScript 输出。

### 第 4 步：准备程序化验证区域

在错误结构后加入：

```html
<h2>解析结果</h2>
<pre id="result"></pre>
```

### 第 5 步：取得两个节点

在 `body` 末尾加入：

```html
<script>
  const intro = document.querySelector('#intro');
  const card = document.querySelector('#card');
</script>
```

> **实验辅助代码**：这里仅用于查询浏览器解析后的真实节点。

### 第 6 步：验证是否仍是父子关系

继续加入：

```js
document.querySelector('#result').textContent = [
  'intro 是否包含 card：' + intro.contains(card),
  'card 的实际父元素：' + card.parentElement.tagName.toLowerCase()
].join('\n');
```

刷新后应看到：

```text
intro 是否包含 card：false
card 的实际父元素：body
```

这直接推翻了“源码缩进就是 DOM”的假设。

### 第 7 步：列出 `body` 的真实直接子元素

再加入：

```js
const bodyChildren = Array.from(
  document.body.children,
  element => element.tagName.toLowerCase()
);
```

并把输出改为：

```js
document.querySelector('#result').textContent = [
  'intro 是否包含 card：' + intro.contains(card),
  'card 的实际父元素：' + card.parentElement.tagName.toLowerCase(),
  'body 直接子元素：' + bodyChildren.join(', ')
].join('\n');
```

现在你可以从三个角度同时确认解析器改变了树结构。

### 第 8 步：把结构改正确

把错误结构临时改成合法结构，例如：

```html
<p id="intro">商品介绍</p>
<div id="card">商品卡片</div>
<p>售后说明</p>
```

刷新并再看 Elements 面板。

现在源码表达的结构与浏览器最终 DOM 应更容易保持一致。

实验完成后，为了保留本节的“错误嵌套实验”，把文件恢复为仓库最终版本。

---

## 完整源码讲解

仓库最终 [`index.html`](./index.html) 故意保留错误嵌套：

```html
<!doctype html>
<!--
  KP008：HTML 容错解析

  下面故意把 div 写进 p。
  HTML 解析器会在 div 前隐式结束 p，所以解析后的 DOM 与源码缩进不同。

  学习动作：
  1. 先阅读源码，预测 card 是否在 intro 内。
  2. 打开页面查看脚本输出。
  3. 在开发者工具 Elements 面板查看真实 DOM。
  4. 把结构改成两个 p 中间放 div，再次验证。
-->
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP008：HTML 容错解析</title>
</head>
<body>
  <h1>错误嵌套实验</h1>

  <p id="intro">
    商品介绍
    <div id="card">商品卡片</div>
    售后说明
  </p>

  <h2>解析结果</h2>
  <pre id="result"></pre>

  <script>
    const intro = document.querySelector('#intro');
    const card = document.querySelector('#card');
    const bodyChildren = Array.from(
      document.body.children,
      element => element.tagName.toLowerCase()
    );

    document.querySelector('#result').textContent = [
      'intro 是否包含 card：' + intro.contains(card),
      'card 的实际父元素：' + card.parentElement.tagName.toLowerCase(),
      'body 直接子元素：' + bodyChildren.join(', ')
    ].join('\n');
  </script>
</body>
</html>
```

这个案例最重要的不是 JavaScript，而是故意错误的：

```html
<p>
  <div>...</div>
</p>
```

脚本只是把解析器的纠错结果量化展示出来。

## 运行案例

直接打开 [`index.html`](./index.html)，建议同时打开开发者工具 Elements 面板。

或执行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

## 效果验证

错误结构中应观察到：

- `intro.contains(card)` 为 `false`。
- `card` 的实际父元素为 `body`。
- Elements 面板结构与源码缩进不同。
- 改成合法的 `p + div + p` 后，结构不再依赖同样的自动纠错。

## 课后练习

1. 在不运行脚本的情况下，只通过 Elements 面板描述浏览器最终生成的结构。
2. 尝试把其他区块元素写进 `p`，观察解析结果。
3. 解释为什么排查“CSS 选择器明明写对了却选不中元素”时，有必要先看真实 DOM。
