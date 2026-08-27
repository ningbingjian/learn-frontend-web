# KP043：`abbr` 与 `dfn`——缩写和术语定义

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `<abbr>` 表达缩写或首字母缩略词。
2. 理解 `title` 可以提供完整形式，但不能把浏览器悬浮提示当作唯一解释方式。
3. 使用 `<dfn>` 标记“术语第一次被正式定义的位置”。
4. 正确组合 `<dfn>` 与 `<abbr>`，同时表达“这是缩写”和“这里正在定义这个术语”。
5. 区分“定义术语”与“后文再次提到术语”这两种场景。

> **本节核心是 HTML 的 `<abbr>` 与 `<dfn>` 语义。**  
> JavaScript 仅用于读取元素属性和统计定义位置，属于实验辅助代码。

---

## 理论讲解

### 1. `<abbr>` 表示什么

`abbr` 用来标记缩写或首字母缩略词，例如：

```html
<abbr title="Application Programming Interface">API</abbr>
```

它表达的是：页面里显示 `API`，它的完整形式是 `Application Programming Interface`。

常见示例还有：

```html
<abbr title="HyperText Markup Language">HTML</abbr>
<abbr title="Cascading Style Sheets">CSS</abbr>
```

### 2. `title` 不是必须，也不能成为唯一说明

很多浏览器会在鼠标悬浮时显示 `title`，但这不意味着：

```html
<abbr title="Application Programming Interface">API</abbr>
```

就足以让所有用户理解 `API`。

原因包括：

- 触屏设备没有稳定的 hover 行为。
- 键盘用户不一定能获得同样的提示体验。
- 辅助技术对 `title` 的呈现方式并不完全一致。
- 用户可能需要在正文中直接看到解释。

因此，在真正需要解释缩写时，更稳妥的写法是把完整含义写进正文：

```html
<p>
  <abbr title="Application Programming Interface">API</abbr>
  （应用程序编程接口）用于定义软件之间的交互方式。
</p>
```

### 3. `<dfn>` 表示“定义实例”

`dfn` 不是“让文本变斜体”的标签。

它表示：**这里是当前文档中某个术语被正式定义的位置。**

例如：

```html
<p>
  <dfn id="semantic-html">语义化 HTML</dfn>
  是根据内容含义选择元素，而不是只根据视觉效果选择标签。
</p>
```

这里的“语义化 HTML”就是被定义的术语。

后面再次提到这个词时，不需要继续包 `dfn`：

```html
<p>学习语义化 HTML 可以改善页面结构与可访问性。</p>
```

### 4. `dfn` 与 `abbr` 可以组合

如果被定义的术语本身就是一个缩写，可以这样写：

```html
<p>
  <dfn id="api">
    <abbr title="Application Programming Interface">API</abbr>
  </dfn>
  （应用程序编程接口）是一组供软件之间交互使用的规则。
</p>
```

此时：

- `abbr`：说明 `API` 是一个缩写。
- `title`：提供英文完整形式。
- `dfn`：说明这个位置正在正式定义 `API`。
- 正文中的中文解释：让用户不依赖悬浮提示也能理解。

### 5. 定义位置可以作为链接目标

给 `dfn` 设置 `id` 后，后文可以回链：

```html
<a href="#api">回到 API 的定义</a>
```

这对于技术文档、术语表、规范文档很有价值。

### 6. 不要为了样式滥用

不要因为浏览器可能把 `dfn` 或 `abbr` 显示成特殊样式，就用它们来“做斜体”或“做下划线”。

如果只是视觉需要，应使用 CSS：

```css
.term {
  font-style: italic;
}
```

HTML 元素首先表达内容含义。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建最小页面

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP043：abbr 与 dfn</title>
</head>
<body>
  <h1>缩写与术语定义实验</h1>
</body>
</html>
```

### 第 1 步：加入普通缩写

加入：

```html
<p>
  我们使用
  <abbr title="HyperText Markup Language">HTML</abbr>
  描述页面结构。
</p>
```

此时 `HTML` 被明确标记为缩写。

### 第 2 步：在正文中提供完整解释

继续加入：

```html
<p>
  <abbr title="Cascading Style Sheets">CSS</abbr>
  （层叠样式表）负责页面表现层。
</p>
```

这里故意把中文解释直接放在正文中，说明 `title` 不是唯一信息来源。

### 第 3 步：正式定义一个术语

加入：

```html
<p>
  <dfn id="semantic-html">语义化 HTML</dfn>
  是根据内容含义选择 HTML 元素，而不是只根据视觉样式选择标签。
</p>
```

此时 `dfn` 明确指出“语义化 HTML”的定义位置。

### 第 4 步：组合 `dfn` 与 `abbr`

继续加入：

```html
<p>
  <dfn id="api">
    <abbr title="Application Programming Interface">API</abbr>
  </dfn>
  （应用程序编程接口）是一组供软件之间交互使用的规则。
</p>
```

这里同时表达了两层语义。

### 第 5 步：从后文链接回定义

加入：

```html
<p>
  后文再次提到 API 时，不需要再次使用 dfn。
  <a href="#api">查看 API 的首次定义</a>
</p>
```

点击链接后，浏览器会定位到定义实例。

### 第 6 步：增加实验辅助输出

为了观察元素属性，加入：

```html
<pre id="result"></pre>

<script>
  const abbreviations = [...document.querySelectorAll('abbr')];
  const definitions = [...document.querySelectorAll('dfn')];

  document.querySelector('#result').textContent = [
    `abbr 数量：${abbreviations.length}`,
    ...abbreviations.map(item => `${item.textContent} -> ${item.title}`),
    `dfn 数量：${definitions.length}`,
    ...definitions.map(item => `定义：${item.textContent.trim()} #${item.id}`)
  ].join('\n');
</script>
```

这段 JavaScript 仅用于把不可见属性和定义位置打印出来。

### 第 7 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节核心代码：

```html
<abbr title="...">...</abbr>
<dfn id="...">...</dfn>
<dfn><abbr title="...">...</abbr></dfn>
```

实验辅助代码：

```js
document.querySelectorAll('abbr')
document.querySelectorAll('dfn')
```

---

## 运行案例

直接用浏览器打开 [`index.html`](./index.html)，或在当前目录启动本地服务器：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

---

## 效果验证

你应该能够确认：

- `HTML`、`CSS`、`API` 使用了 `<abbr>`。
- `title` 中可以读取缩写的完整形式。
- 页面正文仍然直接给出了关键缩写的解释，而不是只依赖悬浮提示。
- “语义化 HTML”和 `API` 的首次正式定义使用了 `<dfn>`。
- 后文再次提到 `API` 时没有重复使用 `<dfn>`。
- 点击“查看 API 的首次定义”可以跳转到 `#api`。
- 能解释 `abbr` 负责“缩写”，`dfn` 负责“定义实例”，两者职责不同但可以组合。