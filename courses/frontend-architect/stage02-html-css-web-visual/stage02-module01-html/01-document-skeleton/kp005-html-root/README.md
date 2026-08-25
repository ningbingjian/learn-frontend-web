# KP005：`html` 根元素

> 节点：`node-02-01-01-01-01-02-01-01`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 `html` 是完整 HTML 文档的根元素。
2. 正确使用 `lang` 声明文档主语言，并知道局部内容可以覆盖语言。
3. 理解 `dir="ltr"`、`dir="rtl"` 与 `dir="auto"` 的作用。
4. 知道方向未知的独立文本可以使用 `bdi` 做双向文本隔离。
5. 能通过 `document.documentElement` 验证根元素属性。

> **本节核心代码是 `html`、`lang`、`dir` 与局部语言/方向声明。**  
> `document.documentElement` 和 `getComputedStyle()` 只是实验辅助代码。

## 理论讲解

### 1. 文档根元素

完整 HTML 文档只有一个 `html` 根元素：

```html
<html>
  <head>...</head>
  <body>...</body>
</html>
```

浏览器中的：

```js
document.documentElement
```

就是这个根元素。

### 2. 文档主语言

推荐在根元素上声明页面主语言：

```html
<html lang="zh-CN">
```

它可以帮助读屏发音、翻译工具、搜索引擎和断词算法理解内容。

局部外语内容可以单独覆盖：

```html
<p lang="en">This is English.</p>
```

### 3. 书写方向与局部隔离

根元素还可以声明书写方向：

```html
<html lang="zh-CN" dir="ltr">
```

常见值：

- `ltr`：从左到右。
- `rtl`：从右到左。
- `auto`：让浏览器根据文本判断。

方向未知的独立文本可以使用：

```html
<bdi>INV-2026-001</bdi>
```

避免它影响周围双向文本排版。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：明确案例目标

我们要构建一个页面，同时验证：

```text
html 是根元素
lang 表示主语言
dir 表示整体方向
局部元素可以覆盖语言
bdi 可以隔离独立文本
```

### 第 1 步：写最小文档骨架

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>KP005：html 根元素</title>
</head>
<body>
  <h1>文档语言与方向</h1>
</body>
</html>
```

当前核心是：

```html
<html lang="zh-CN" dir="ltr">
```

它同时声明页面主语言和整体书写方向。

### 第 2 步：加入主语言和局部语言内容

在 `h1` 后加入：

```html
<p>这是一段中文正文。</p>
<p lang="en">This paragraph declares English locally.</p>
```

第一段继承 `zh-CN`；第二段通过 `lang="en"` 覆盖语言。

### 第 3 步：加入独立方向文本

继续加入：

```html
<p>订单号：<bdi>INV-2026-001</bdi></p>
```

`bdi` 用来隔离这段独立文本的双向方向影响。

### 第 4 步：准备验证区域

加入：

```html
<h2>当前根元素属性</h2>
<pre id="result"></pre>
```

### 第 5 步：取得真实根元素

在 `body` 末尾加入：

```html
<script>
  const root = document.documentElement;
</script>
```

> 这是实验辅助代码，只用于读取浏览器解析后的 `<html>` 元素。

### 第 6 步：输出语言和方向

补充为：

```js
const root = document.documentElement;

document.querySelector('#result').textContent = [
  '标签名：' + root.tagName,
  'lang：' + root.lang,
  'dir：' + root.dir,
  '计算方向：' + getComputedStyle(root).direction
].join('\n');
```

刷新后应看到：

```text
标签名：HTML
lang：zh-CN
dir：ltr
计算方向：ltr
```

### 第 7 步：改成 RTL 做对照

临时改成：

```html
<html lang="ar" dir="rtl">
```

刷新后观察：

- 页面整体方向变化。
- `lang` 变成 `ar`。
- `dir` 与计算方向变成 `rtl`。
- 局部英文段落仍保留自己的 `lang="en"`。

最后恢复：

```html
<html lang="zh-CN" dir="ltr">
```

### 第 8 步：完成案例并对照最终源码

恢复后，你的代码应与仓库最终 [`index.html`](./index.html) 一致。

本节总结：

- **核心代码**：根元素 `<html>`、`lang`、`dir`、局部 `lang` 与 `bdi`。
- **实验辅助代码**：`document.documentElement` 和 `getComputedStyle()`，只用于验证解析结果。

最终源码直接查看 [`index.html`](./index.html)，README 不再重复整份源码。

## 运行案例

直接打开 [`index.html`](./index.html)，或运行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

## 效果验证

初始页面应显示：

- 根元素标签名为 `HTML`。
- `lang` 为 `zh-CN`。
- `dir` 为 `ltr`。
- 计算方向为 `ltr`。

修改为 `lang="ar" dir="rtl"` 后，页面整体方向和输出应同步变化。
