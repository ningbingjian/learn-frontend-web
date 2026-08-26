# KP017：`title` 文档标题

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 在 `head` 中正确声明 `<title>`。
2. 区分文档标题与页面中的 `h1`。
3. 理解标题在浏览器标签页、历史记录和书签中的作用。
4. 编写能准确描述当前页面主题的标题。

> **本节核心代码是 `<title>` 元素。**  
> JavaScript 只用于读取标题并展示观察结果，属于实验辅助代码。

## 理论讲解

### 1. 元素语法与位置

最常见写法：

```html
<head>
  <meta charset="utf-8">
  <title>HTML 元信息学习 - Frontend Lab</title>
</head>
```

`title` 属于文档元信息，应放在 `head` 中。一个正常 HTML 文档应提供能够描述页面主题的标题。

### 2. `title` 与 `h1` 不是一回事

```html
<title>订单详情 - 管理后台</title>
<h1>订单 #A1024</h1>
```

- `title` 描述浏览上下文中的整个文档。
- `h1` 是页面正文中的一级标题。
- 两者可以相关，但不要求逐字相同。

例如同一个商品页，标签页标题可以包含站点名，而正文 `h1` 只展示商品名称。

### 3. 标签页、历史记录和书签

浏览器通常会把文档标题用于：

- 标签页名称。
- 浏览历史中的页面名称。
- 创建书签时的默认名称。
- 窗口或任务切换界面的页面标识。

因此标题过于模糊时，用户同时打开多个页面会很难区分。

### 4. 标题内容组织

推荐让最重要的信息尽量靠前：

```text
HTML 元信息学习 - Frontend Lab
订单 #A1024 - 管理后台
张三的个人资料 - 用户中心
```

避免所有页面都只写：

```text
首页
详情
管理系统
```

标题应该能在脱离正文后仍然帮助用户识别页面。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建最小文档

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
</head>
<body>
  <h1>HTML 元信息学习</h1>
</body>
</html>
```

此时页面正文已经有标题，但文档元信息还不完整。

### 第 1 步：加入 `<title>`

在 `head` 中加入：

```html
<title>HTML 元信息学习 - Frontend Lab</title>
```

刷新页面，观察浏览器标签页文字。

### 第 2 步：保留正文 `h1`

正文继续使用：

```html
<h1>HTML 元信息学习</h1>
```

现在可以直接比较：

```text
文档 title：HTML 元信息学习 - Frontend Lab
页面 h1：HTML 元信息学习
```

### 第 3 步：加入实验结果区域

加入：

```html
<pre id="result"></pre>
```

### 第 4 步：读取标题

在 `body` 末尾加入：

```html
<script>
  const heading = document.querySelector('h1').textContent;

  document.querySelector('#result').textContent = [
    'document.title：' + document.title,
    '页面 h1：' + heading
  ].join('\n');
</script>
```

这里的 JavaScript 只是为了把不可直接出现在正文里的标题值打印出来。

### 第 5 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`<title>HTML 元信息学习 - Frontend Lab</title>`。
- **实验辅助代码**：读取 `document.title` 和 `h1`，用于比较文档标题与正文标题。

## 运行案例

直接打开 [`index.html`](./index.html)，或者在当前目录执行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

## 效果验证

你应该能够确认：

- 标签页显示 `HTML 元信息学习 - Frontend Lab`。
- 页面正文显示 `HTML 元信息学习`。
- `document.title` 与 `<title>` 内容一致。
- 能解释为什么 `title` 和 `h1` 不需要逐字相同。
