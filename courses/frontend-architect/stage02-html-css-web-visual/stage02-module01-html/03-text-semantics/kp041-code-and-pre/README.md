# KP041：`code` 与 `pre`

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `code` 标记代码片段。
2. 使用 `pre` 保留空格和换行。
3. 理解多行代码常用 `<pre><code>...</code></pre>` 组合。
4. 正确转义代码示例中的 `<`、`>` 和 `&`，并处理长代码横向滚动。

> **本节核心代码是 `<code>`、`<pre>` 以及 HTML 转义。**  
> CSS 只用于改善长代码展示，不属于代码语义本身。

## 理论讲解

### 1. `code`：代码语义

行内代码：

```html
<p>使用 <code>document.querySelector()</code> 查询元素。</p>
```

`code` 告诉浏览器和读者：这段文本代表计算机代码。

它不负责保留复杂缩进。

### 2. `pre`：预格式化文本

`pre` 会保留源码中的空白和换行：

```html
<pre>第一行
    第二行保留缩进
第三行</pre>
```

因此它不仅可以用于代码，也可以用于其他依赖原始空白格式的文本。

### 3. 多行代码组合

代码既需要“代码语义”，又需要“保留格式”时：

```html
<pre><code>const message = 'hello';
console.log(message);</code></pre>
```

两个元素职责不同：

```text
code → 这是什么内容？代码
pre  → 空白怎么处理？按源码保留
```

### 4. HTML 代码需要转义

如果你想在页面上展示：

```html
<h1>Hello</h1>
```

不能直接把它作为普通文本写进 `code`，否则浏览器会把它解析成真正标签。

应该写：

```html
<code>&lt;h1&gt;Hello&lt;/h1&gt;</code>
```

常见转义：

```text
<  → &lt;
>  → &gt;
&  → &amp;
```

### 5. 长代码处理

HTML 语义不负责“代码超出屏幕怎么办”。

常见 CSS：

```css
pre {
  overflow-x: auto;
}
```

这样保留代码格式的同时，小屏可以横向滚动。

### 6. `code` 不等于语法高亮

浏览器不会因为使用 `code` 自动给关键字上色。

语法高亮属于 CSS / JavaScript 工具层面的增强，不是 `code` 元素本身的能力。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面骨架

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP041：code 与 pre</title>
</head>
<body>
  <h1>代码与预格式化文本</h1>
</body>
</html>
```

### 第 1 步：加入行内代码

```html
<p>使用 <code>document.querySelector()</code> 查询元素。</p>
```

### 第 2 步：加入多行代码

```html
<pre><code>const message = 'hello';
console.log(message);</code></pre>
```

刷新页面，换行和缩进会保留下来。

### 第 3 步：展示 HTML 标签

加入：

```html
<pre><code>&lt;h1&gt;Hello&lt;/h1&gt;</code></pre>
```

页面应该显示真正的 `<h1>Hello</h1>` 字符串，而不是生成标题节点。

### 第 4 步：验证空白保留

加入：

```html
<pre id="spacing">第一行
    第二行保留四个空格
第三行</pre>
```

和普通 `p` 对比，`pre` 会保留原始排版。

### 第 5 步：处理长代码

加入：

```html
<style>
  pre {
    max-width: 32rem;
    overflow-x: auto;
    border: 1px solid currentColor;
    padding: 0.75rem;
  }
</style>
```

这属于展示辅助样式。

### 第 6 步：读取文本验证转义结果

加入：

```html
<pre id="result"></pre>
<script>
  const htmlExample = document.querySelector('#html-example code').textContent;
  document.querySelector('#result').textContent = '实际文本：' + htmlExample;
</script>
```

如果输出 `<h1>Hello</h1>`，说明实体在解析后成为文本，而不是元素。

### 第 7 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`code` 表示代码，`pre` 保留格式，HTML 示例需要正确转义。
- **实验辅助代码**：CSS 负责横向滚动，JavaScript 用来读取最终文本。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- 行内 API 名称由 `code` 表达。
- 多行代码使用 `pre + code`。
- `pre` 保留换行和连续空格。
- HTML 标签示例显示为文本，没有被浏览器解析成真实标题。
- 长代码由 CSS 处理滚动，而不是改变 HTML 语义。
