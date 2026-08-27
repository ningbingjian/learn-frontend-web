# KP039：`blockquote` 与 `q`

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分块级引用 `blockquote` 与行内引用 `q`。
2. 正确使用 `cite` 属性记录引用来源 URL。
3. 理解 `cite` 属性通常不会自动显示为可见来源说明。
4. 知道浏览器通常会为 `q` 自动生成引号，不应机械手写重复引号。

> **本节核心代码是 `<blockquote>`、`<q>` 以及它们的 `cite` 属性。**  
> JavaScript 只用于把不可见的 `cite` 属性读取出来，属于实验辅助代码。

## 理论讲解

### 1. `blockquote`：独立成块的引用

当引用内容本身形成一个独立段落或较长区块时，可以使用：

```html
<blockquote cite="https://example.com/article">
  <p>语义化 HTML 描述内容是什么，而不是只描述它长什么样。</p>
</blockquote>
```

`blockquote` 表示其中内容来自其他来源的较长引用。

### 2. `q`：句子中的行内引用

如果引用只是正文中的短语或短句：

```html
<p>老师提醒我们：<q cite="https://example.com/notes">先写语义，再考虑样式。</q></p>
```

`q` 不会像 `blockquote` 一样单独形成大区块。

### 3. `cite` 属性

两种元素都可以通过 `cite` 属性记录引用来源：

```html
<q cite="https://example.com/source">...</q>
```

需要注意：

- 属性值应是来源 URL。
- 它主要是机器可读的引用来源信息。
- 浏览器通常不会自动把这个 URL 显示给用户。

因此真实页面如果需要读者看到来源，还应该提供可见文字或链接。

### 4. `q` 的引号显示

浏览器通常会根据语言环境给 `q` 自动添加合适的引号。

推荐：

```html
<p>他说：<q>这是引用内容。</q></p>
```

而不是：

```html
<p>他说：“<q>这是引用内容。</q>”</p>
```

否则可能出现重复引号。

### 5. 引用元素不是“缩进工具”

不要因为浏览器默认给 `blockquote` 缩进，就拿它做普通布局。

如果内容不是引用，只是想缩进：

```css
.notice {
  margin-left: 2rem;
}
```

应该用 CSS，而不是伪造引用语义。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP039：blockquote 与 q</title>
</head>
<body>
  <h1>块级引用与行内引用</h1>
</body>
</html>
```

### 第 1 步：加入长引用

```html
<blockquote cite="https://example.com/html-semantics">
  <p>语义化 HTML 描述内容是什么，而不是只描述它长什么样。</p>
</blockquote>
```

观察它独立成块。

### 第 2 步：加入行内引用

```html
<p>
  评审时常听到一句话：
  <q cite="https://example.com/review-notes">先写语义，再考虑样式。</q>
</p>
```

观察 `q` 仍然位于当前段落中。

### 第 3 步：不要手写额外引号

确认源码中 `q` 外面没有再套中文引号。

浏览器通常会负责引号的呈现。

### 第 4 步：提供可见来源

加入：

```html
<p>来源：HTML 语义学习示例</p>
```

这样用户可以看到来源说明。

注意：这个可见文字和 `cite` 属性承担的角色不同。

### 第 5 步：读取 `cite` 属性

加入辅助输出：

```html
<pre id="result"></pre>
<script>
  const items = [...document.querySelectorAll('blockquote, q')]
    .map(element => `${element.tagName.toLowerCase()} cite -> ${element.cite}`);

  document.querySelector('#result').textContent = items.join('\n');
</script>
```

你会看到两个来源 URL，但页面不会因为有 `cite` 属性就自动显示它们。

### 第 6 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：长引用用 `blockquote`，短行内引用用 `q`，来源 URL 放在 `cite` 属性。
- **实验辅助代码**：JavaScript 用来把浏览器默认不展示的 `cite` 属性打印出来。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- 长引用使用 `blockquote`。
- 行内引用使用 `q`。
- `q` 通常由浏览器自动显示引号。
- `cite` 属性存在，但不会自动生成可见来源文字。
- 不会为了缩进效果滥用 `blockquote`。
