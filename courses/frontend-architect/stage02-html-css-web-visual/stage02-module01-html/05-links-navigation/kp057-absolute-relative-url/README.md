# KP057：绝对地址与相对地址

> 所属章节：05 · 超链接与导航
>
> 本知识点目标：理解 URL 的基本组成、绝对地址与相对地址的区别，以及浏览器如何基于当前文档地址解析相对引用。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. URL 的基本组成](#1-url-的基本组成)
  - [2. 绝对地址](#2-绝对地址)
  - [3. 相对地址与解析基准](#3-相对地址与解析基准)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

完成本节后，你应该能够：

1. 识别 URL 中的协议、主机、端口、路径、查询参数和片段。
2. 判断一个 `href` 是绝对地址还是相对引用。
3. 理解绝对地址不会依赖当前页面路径进行补全。
4. 理解相对地址会基于文档的 base URL 解析成最终绝对 URL。
5. 区分 HTML 源码里的原始 `href` 与 DOM 中解析后的 `a.href`。

## 理论讲解

### 1. URL 的基本组成

一个常见的 HTTP URL 可以写成：

```text
https://example.com:8443/guides/html?lang=zh#links
```

可以拆成：

| 部分 | 示例 | 作用 |
|---|---|---|
| scheme | `https` | 使用什么协议访问资源 |
| host | `example.com` | 目标主机 |
| port | `8443` | 可选端口 |
| path | `/guides/html` | 主机中的资源路径 |
| query | `?lang=zh` | 查询参数 |
| fragment | `#links` | 页面内片段标识 |

在大多数普通网页链接中，最常见的是：

```text
https://域名/路径?查询参数#片段
```

并不是每个 URL 都必须同时拥有 query 和 fragment。

### 2. 绝对地址

绝对 URL 已经提供了足够的信息来确定目标资源，例如：

```html
<a href="https://example.com/docs/url?mode=full#parts">
  查看 URL 文档
</a>
```

这里的 `href` 明确给出了：

- 协议：`https:`；
- 主机：`example.com`；
- 路径：`/docs/url`；
- 查询参数：`mode=full`；
- 片段：`parts`。

无论当前页面位于：

```text
https://site-a.example/course/index.html
```

还是：

```text
https://site-b.example/admin/report.html
```

这个链接的目标仍然是：

```text
https://example.com/docs/url?mode=full#parts
```

因此绝对 URL 常用于：

- 跨站链接；
- 明确指向某个完整公网地址；
- API、CDN、第三方服务地址。

### 3. 相对地址与解析基准

相对引用没有写完整协议和主机，例如：

```html
<a href="./index.html?source=relative#demo">
  当前目录中的页面
</a>
```

浏览器会用当前文档的 **base URL** 补全它。

假设当前页面地址是：

```text
https://learn.example.com/html/kp057/index.html
```

那么：

```text
./index.html?source=relative#demo
```

会解析为：

```text
https://learn.example.com/html/kp057/index.html?source=relative#demo
```

JavaScript 中也可以显式观察解析过程：

```js
new URL('./index.html?source=relative#demo', document.baseURI).href
```

HTML 源码中的原始值和 DOM 属性值得区分：

```js
link.getAttribute('href')
```

返回作者写下的原始字符串；而：

```js
link.href
```

通常返回浏览器解析完成后的绝对 URL。

> 如果页面使用了 `<base href="...">`，相对 URL 的解析基准会受到它影响。`<base>` 属于更专门的文档级 URL 基准配置，本节只需要先建立“相对地址必须依赖解析基准”这个概念。

## 动手编码：从 0 到 1

本节最终源码：[`index.html`](./index.html)

### 第 1 步：创建最小可运行页面

**目标**：先建立一个普通 HTML 文档。

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KP057 - 绝对地址与相对地址</title>
</head>
<body>
  <h1>绝对地址与相对地址</h1>
</body>
</html>
```

**为什么这样写**：URL 的解析必须发生在某个具体文档上下文中，所以先准备文档本身。

**运行后观察**：页面只有标题。

### 第 2 步：加入一个绝对 URL

**目标**：观察不依赖当前文档路径的完整地址。

```html
<a id="absolute-link"
   href="https://example.com/docs/url?mode=full#parts">
  绝对 URL 示例
</a>
```

**为什么这样写**：`href` 已经包含协议、主机和完整路径，不需要浏览器根据当前目录补路径。

**运行后观察**：把鼠标悬停到链接上，浏览器状态栏会显示完整地址。

### 第 3 步：加入一个相对 URL

**目标**：让浏览器基于当前文档地址完成解析。

```html
<a id="relative-link"
   href="./index.html?source=relative#demo">
  相对 URL 示例
</a>
```

**为什么这样写**：`./` 表示从当前文档所在目录开始解析。

**运行后观察**：浏览器最终显示的目标地址会包含当前页面的协议、主机和目录。

### 第 4 步：把原始值与解析结果打印出来

**目标**：直接看到 `getAttribute('href')` 与 `a.href` 的区别。

```html
<pre id="result"></pre>

<script>
  const links = document.querySelectorAll('a[data-demo]');
  const lines = [...links].flatMap((link) => [
    link.textContent.trim(),
    `raw href: ${link.getAttribute('href')}`,
    `resolved href: ${link.href}`,
    ''
  ]);

  document.querySelector('#result').textContent = lines.join('\n');
</script>
```

最终案例会给两个链接加上 `data-demo` 属性，便于统一观察。

**为什么这样写**：JavaScript 只负责展示浏览器已经完成的 URL 解析结果，不参与链接语义本身。

**运行后观察**：

- 绝对链接的 raw href 和 resolved href 基本一致；
- 相对链接的 raw href 仍然是 `./...`；
- 相对链接的 resolved href 已经变成完整绝对地址。

## 运行案例

可以直接打开 `index.html` 观察基础行为；为了更接近真实网站环境，推荐通过 HTTP Server 运行。

在 `stage02-module01-html` 目录执行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/05-links-navigation/kp057-absolute-relative-url/index.html
```

## 效果验证

完成案例后检查：

1. 页面同时存在绝对地址和相对地址。
2. `document.baseURI` 能显示当前解析基准。
3. 绝对链接的 `href` 不依赖当前目录补全。
4. 相对链接的 `getAttribute('href')` 保留原始 `./...`。
5. 相对链接的 DOM `href` 属性已经被解析为完整 URL。
6. 修改当前页面访问路径后，相对地址的最终解析结果会随基准变化。

可以在控制台执行：

```js
document.querySelector('#relative-link').getAttribute('href')
```

以及：

```js
document.querySelector('#relative-link').href
```

对比两者结果。

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<a href="https://example.com/docs/url">绝对 URL</a>
<a href="./index.html">相对 URL</a>
```

核心知识是浏览器如何解释 `href` 中的 URL 引用。

### 实验辅助代码

案例中的：

- CSS 只负责排版；
- `document.baseURI` 用于显示当前解析基准；
- `getAttribute('href')`、`a.href` 和 `new URL()` 用于观察解析结果。

这些 JavaScript 都是实验辅助代码，不是绝对地址或相对地址语义本身。