# KP007：`body` 与页面主体

> 节点：`node-02-01-01-01-01-02-02-01`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道一个 HTML Document 只有一个可靠的 `body`。
2. 区分 `body` 与 `main`：前者是整个文档主体，后者是主要内容地标。
3. 理解 SPA、微前端或独立组件应该使用普通元素作为挂载点，而不是创建新的 `body`。
4. 能通过 DOM 结果验证页面最终只有一个 `body`。

> **本节核心代码是 `body`、`main` 以及普通业务挂载节点。**  
> 统计 `body` / `main` 数量和列出子元素的 JavaScript 属于实验辅助代码。

## 理论讲解

### 1. 单一文档主体

`body` 表示 HTML 文档主体：

```html
<body>
  ...页面内容...
</body>
```

一个 Document 只有一个可靠的 `body`，可以通过：

```js
document.body
```

取得它。

### 2. `body` 与 `main`

两者不是同一个概念：

```text
body
├── header
├── main
├── footer
└── 其他页面内容
```

`body` 包含整个页面主体；`main` 只表达页面最主要的任务或内容区域。

### 3. 业务挂载点

SPA、微前端或组件应用应该挂载到普通元素：

```html
<main>
  <div id="order-app"></div>
</main>
```

而不是再写一个新的 `body`。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：明确最终结构

我们要做一个常见页面骨架：

```text
body
├── header
├── main
│   ├── order-app
│   └── help-app
├── footer
└── 结构验证区域
```

无论页面里有多少区域或子应用，仍然只有一个 `body`。

### 第 1 步：创建唯一的 `body`

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP007：body 页面主体</title>
</head>
<body>
  <h1>订单管理</h1>
</body>
</html>
```

### 第 2 步：加入页面级结构

把 `body` 内容调整为：

```html
<header>
  <p>站点名称</p>
</header>

<main>
  <h1>订单管理</h1>
</main>

<footer>
  <p>版权信息</p>
</footer>
```

现在可以清楚看到 `header`、`main`、`footer` 都属于同一个 `body`。

### 第 3 步：加入两个业务挂载点

在 `main` 中加入：

```html
<div id="order-app">
  订单应用挂载点
</div>

<div id="help-app">
  帮助应用挂载点
</div>
```

正确思路是：

```text
一个 Document
   ↓
一个 body
   ↓
body 内可以有多个应用挂载节点
```

### 第 4 步：准备结构输出区域

在 `footer` 后加入：

```html
<h2>当前文档结构</h2>
<pre id="result"></pre>
```

### 第 5 步：统计实际 `body` 和 `main`

在 `body` 末尾加入：

```html
<script>
  document.querySelector('#result').textContent = [
    'body 数量：' + document.querySelectorAll('body').length,
    'main 数量：' + document.querySelectorAll('main').length
  ].join('\n');
</script>
```

刷新后应看到：

```text
body 数量：1
main 数量：1
```

### 第 6 步：列出 `body` 的直接子元素

把脚本扩展为：

```js
const directChildren = Array.from(
  document.body.children,
  element => element.tagName.toLowerCase()
);

document.querySelector('#result').textContent = [
  'body 数量：' + document.querySelectorAll('body').length,
  'main 数量：' + document.querySelectorAll('main').length,
  'body 直接子元素：' + directChildren.join(', ')
].join('\n');
```

现在可以直接看到浏览器解析后的一级结构。

### 第 7 步：故意尝试第二个 `body`

建议复制一份文件，在副本中尝试：

```html
<body>
  ...
</body>

<body>
  第二个主体？
</body>
```

打开 Elements 面板查看浏览器最终 DOM。不要只看源码文本。

实验结束后回到正确版本：只保留一个 `body`。

### 第 8 步：完成案例并对照最终源码

恢复后，你的代码应与仓库最终 [`index.html`](./index.html) 一致。

本节总结：

- **核心代码**：唯一的 `body`、其中的 `header` / `main` / `footer`，以及普通业务挂载节点。
- **实验辅助代码**：DOM 数量统计和子元素列表，只用于证明浏览器最终结构。

最终源码直接查看 [`index.html`](./index.html)，README 不再重复整份源码。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

## 效果验证

最终应确认：

- `body` 数量为 `1`。
- `main` 数量为 `1`。
- `order-app` 和 `help-app` 都位于同一个 `main` 中。
- 即使源码中故意再写第二个 `body`，浏览器也不会生成两个正常独立的页面主体。
