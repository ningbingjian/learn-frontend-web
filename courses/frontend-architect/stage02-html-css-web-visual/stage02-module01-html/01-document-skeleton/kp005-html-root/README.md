# KP005：`html` 根元素

> 节点：`node-02-01-01-01-01-02-01-01`  
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

1. 知道 `html` 是完整 HTML 文档的根元素。
2. 正确使用 `lang` 声明文档主语言，并知道局部内容可以覆盖语言。
3. 理解 `dir="ltr"`、`dir="rtl"` 与 `dir="auto"` 的作用。
4. 知道方向未知的独立文本可以使用 `bdi` 做双向文本隔离。
5. 能通过 `document.documentElement` 验证根元素的真实属性。

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

它可以帮助读屏发音、翻译工具、搜索引擎以及断词算法理解页面内容。

如果页面中有局部英文，可以单独覆盖：

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

### 第 1 步：先写最小文档骨架

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

当前最值得关注的是：

```html
<html lang="zh-CN" dir="ltr">
```

它同时声明了页面主语言和整体书写方向。

### 第 2 步：加入主语言和局部语言内容

在 `h1` 后加入：

```html
<p>这是一段中文正文。</p>
<p lang="en">This paragraph declares English locally.</p>
```

第一段继承根元素的 `zh-CN`；第二段通过自己的 `lang="en"` 覆盖语言。

### 第 3 步：加入方向未知的独立文本

继续加入：

```html
<p>订单号：<bdi>INV-2026-001</bdi></p>
```

`bdi` 的重点不是改变订单号内容，而是把它的双向文本方向与周围内容隔离。

### 第 4 步：准备根元素验证区域

加入：

```html
<h2>当前根元素属性</h2>
<pre id="result"></pre>
```

接下来用辅助代码把浏览器实际解析到的根元素信息显示出来。

### 第 5 步：取得真实根元素

在 `body` 末尾加入：

```html
<script>
  const root = document.documentElement;
</script>
```

> **实验辅助代码**：`document.documentElement` 就是浏览器解析后的 `<html>` 元素。

### 第 6 步：输出语言和方向

把脚本补充为：

```js
const root = document.documentElement;

document.querySelector('#result').textContent = [
  '标签名：' + root.tagName,
  'lang：' + root.lang,
  'dir：' + root.dir,
  '计算方向：' + getComputedStyle(root).direction
].join('\n');
```

刷新后应看到类似：

```text
标签名：HTML
lang：zh-CN
dir：ltr
计算方向：ltr
```

### 第 7 步：改成 RTL 做对照

临时把根元素改成：

```html
<html lang="ar" dir="rtl">
```

刷新页面，观察：

- 页面整体方向发生变化。
- 输出中的 `lang` 变成 `ar`。
- `dir` 与计算方向变成 `rtl`。
- 局部英文段落仍保留自己的 `lang="en"`。

最后恢复：

```html
<html lang="zh-CN" dir="ltr">
```

---

## 完整源码讲解

仓库最终 [`index.html`](./index.html) 为：

```html
<!doctype html>
<!--
  KP005：html 根元素

  html 是整个文档的根元素。
  - lang 表示文档主语言。
  - dir 表示文档整体书写方向。
  - 局部外语可以在局部元素上单独声明 lang。
  - 方向未知的独立文本可以使用 bdi 隔离。
-->
<html lang="zh-CN" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>KP005：html 根元素</title>
</head>
<body>
  <h1>文档语言与方向</h1>

  <p>这是一段中文正文。</p>
  <p lang="en">This paragraph declares English locally.</p>
  <p>订单号：<bdi>INV-2026-001</bdi></p>

  <h2>当前根元素属性</h2>
  <pre id="result"></pre>

  <script>
    const root = document.documentElement;

    document.querySelector('#result').textContent = [
      '标签名：' + root.tagName,
      'lang：' + root.lang,
      'dir：' + root.dir,
      '计算方向：' + getComputedStyle(root).direction
    ].join('\n');
  </script>
</body>
</html>
```

可以把源码理解成两层：

- **核心 HTML**：根元素属性、局部 `lang`、`bdi`。
- **实验辅助代码**：读取根元素并显示解析结果。

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

## 课后练习

1. 把根元素改成 `dir="rtl"`，但保留 `lang="zh-CN"`，观察语言和方向是不是两个独立概念。
2. 给另一段文本加入 `lang="ja"`，在开发者工具中检查最终属性。
3. 删除订单号外面的 `bdi`，思考在复杂 RTL 文本中可能出现什么问题。
