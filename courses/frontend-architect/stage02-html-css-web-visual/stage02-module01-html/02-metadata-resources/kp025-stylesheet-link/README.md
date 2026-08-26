# KP025：`link rel="stylesheet"` 外部样式表

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `<link rel="stylesheet" href="...">` 加载外部 CSS。
2. 理解 `rel`、`href`、`media` 的职责。
3. 理解普通样式表为什么可能阻塞首次渲染。
4. 理解多个样式表的顺序与层叠关系。
5. 使用 `media="print"` 为打印场景加载专用样式。

> **本节核心代码是外部 stylesheet 的 HTML 声明。**  
> `styles.css` 和 `print.css` 是真实案例资源；JavaScript 仅用于读取加载结果。

## 理论讲解

### 1. 基础语法

```html
<link rel="stylesheet" href="./styles.css">
```

- `rel="stylesheet"`：说明链接资源与当前文档的关系是样式表。
- `href`：CSS 文件地址。

浏览器发现这条声明后会请求、解析并应用 CSS。

### 2. `media` 条件

```html
<link rel="stylesheet" href="./print.css" media="print">
```

它表示这个样式表主要用于打印媒体。

浏览器通常仍会发现资源，但是否以及何时以高优先级加载、应用，取决于媒体匹配和浏览器实现。

### 3. 加载顺序与层叠

如果两个相同优先级的规则都命中：

```html
<link rel="stylesheet" href="./base.css">
<link rel="stylesheet" href="./theme.css">
```

后出现的规则可能因为源码顺序在层叠中胜出。

但实际 CSS 决策还同时受：

- origin
- layer
- specificity
- scope
- source order

影响，不能简单理解成“后面的永远覆盖前面的”。

### 4. 为什么普通样式表会影响首次渲染

浏览器在渲染页面前，需要知道元素最终应该长什么样。

因此位于 `head` 的普通 stylesheet 通常属于渲染关键资源。CSS 下载过慢会延迟首次可见内容。

这也是为什么生产环境会关注：

- CSS 体积
- 请求数量
- 缓存
- 关键 CSS
- 未使用 CSS

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：先写无样式页面

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP025：stylesheet</title>
</head>
<body>
  <main class="card">
    <h1>外部样式表实验</h1>
    <p>这段内容将由 styles.css 控制。</p>
  </main>
</body>
</html>
```

直接运行时只是浏览器默认样式。

### 第 1 步：创建外部 CSS

创建 `styles.css`：

```css
body {
  font-family: system-ui, sans-serif;
  background: #f3f4f6;
}

.card {
  max-width: 560px;
  margin: 48px auto;
  padding: 24px;
  background: white;
  border: 1px solid #d1d5db;
}
```

### 第 2 步：在 `head` 中链接样式表

加入：

```html
<link rel="stylesheet" href="./styles.css">
```

刷新后应观察页面从默认样式变为卡片布局。

### 第 3 步：添加打印样式

创建 `print.css`：

```css
body {
  background: white;
}

.card {
  border: 0;
  margin: 0;
  max-width: none;
}
```

然后在 HTML 中加入：

```html
<link rel="stylesheet" href="./print.css" media="print">
```

### 第 4 步：使用打印预览验证 `media`

打开浏览器打印预览。

你应该看到：

- 屏幕状态保留灰色背景和卡片边框。
- 打印状态移除背景和卡片边框。

这说明同一文档可以根据媒体环境启用不同资源规则。

### 第 5 步：读取 stylesheet 状态

加入实验辅助代码：

```js
const links = [...document.querySelectorAll('link[rel="stylesheet"]')];
```

输出 `href` 和 `media`，确认浏览器确实解析出了两条外部 stylesheet。

### 第 6 步：完成案例并对照最终源码

最终源码：

- [`index.html`](./index.html)
- [`styles.css`](./styles.css)
- [`print.css`](./print.css)

本节总结：

- **本节核心代码**：两条 `<link rel="stylesheet">`。
- **真实资源代码**：`styles.css`、`print.css`。
- **实验辅助代码**：页面中的 DOM 查询和输出。

## 运行案例

推荐：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

再打开浏览器打印预览验证 `media="print"`。

## 效果验证

你应该能够确认：

- `styles.css` 正常影响屏幕页面。
- `print.css` 声明了 `media="print"`。
- 打印预览和屏幕显示存在明确差异。
- 页面输出能看到两个 stylesheet 的绝对 URL 和媒体条件。
- 能解释为什么普通 CSS 往往位于关键渲染路径上。
