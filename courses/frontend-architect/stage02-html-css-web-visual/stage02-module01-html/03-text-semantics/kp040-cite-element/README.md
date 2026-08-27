# KP040：`cite` 元素

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `cite` 元素标记作品标题。
2. 区分 `cite` 元素和 `blockquote/q` 上的 `cite` 属性。
3. 知道作者姓名通常不应仅因为是“引用来源”就放进 `cite` 元素。
4. 能把可见作品标题与引用结构组合起来。

> **本节核心代码是 `<cite>` 元素。**  
> JavaScript 只用于对比 `cite` 元素和 `cite` 属性，属于实验辅助代码。

## 理论讲解

### 1. `cite` 元素表示作品标题

`cite` 用于引用创作作品的标题，例如：

- 书籍。
- 文章。
- 论文。
- 电影。
- 歌曲。
- 网站或其他创作作品。

例如：

```html
<p>推荐阅读 <cite>HTML Living Standard</cite>。</p>
```

### 2. `cite` 不是“作者标签”

不要写：

```html
<p>作者：<cite>张三</cite></p>
```

如果“张三”只是一个人的姓名，普通文本通常已经足够。

`cite` 的重点是作品标题，而不是人名。

### 3. `cite` 元素与 `cite` 属性完全不同

元素：

```html
<cite>HTML Living Standard</cite>
```

它是用户能够看到的页面内容。

属性：

```html
<blockquote cite="https://html.spec.whatwg.org/">
  ...
</blockquote>
```

它是元素上的来源 URL 元数据。

可以记成：

```text
<cite>...</cite> → 可见作品标题
cite="URL"      → 引用来源地址
```

### 4. 与引用结构组合

常见组合：

```html
<blockquote cite="https://example.com/article">
  <p>引用内容……</p>
</blockquote>
<p>—— <cite>某篇文章</cite></p>
```

这样机器可以读取来源 URL，用户也能看到作品标题。

### 5. 默认斜体不是语义

浏览器通常把 `cite` 显示成斜体。

但仍然可以：

```css
cite {
  font-style: normal;
}
```

它依旧是作品标题语义。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建最小页面

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP040：cite 元素</title>
</head>
<body>
  <h1>作品标题语义</h1>
</body>
</html>
```

### 第 1 步：标记作品标题

加入：

```html
<p>推荐阅读 <cite>HTML Living Standard</cite>。</p>
```

`cite` 包裹的是作品标题。

### 第 2 步：加入普通作者姓名

```html
<p>示例作者：张三</p>
```

不要因为“作者”与引用有关就强行使用 `cite`。

### 第 3 步：加入引用区块和 `cite` 属性

```html
<blockquote cite="https://html.spec.whatwg.org/">
  <p>HTML 是描述 Web 文档结构和语义的标记语言。</p>
</blockquote>
```

现在页面里同时出现了：

- `<cite>` 元素。
- `cite="..."` 属性。

它们名称相同，但职责不同。

### 第 4 步：给引用增加可见作品标题

```html
<p>—— <cite>HTML Living Standard</cite></p>
```

### 第 5 步：改变默认样式

```html
<style>
  cite {
    font-style: normal;
    text-decoration: underline;
  }
</style>
```

证明斜体只是默认表现。

### 第 6 步：用脚本对比元素和属性

```html
<pre id="result"></pre>
<script>
  const workTitles = [...document.querySelectorAll('cite')]
    .map(element => element.textContent);
  const sourceUrl = document.querySelector('blockquote').cite;

  document.querySelector('#result').textContent = [
    'cite 元素：' + workTitles.join(' / '),
    'cite 属性：' + sourceUrl
  ].join('\n');
</script>
```

### 第 7 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`cite` 元素用于作品标题。
- **实验辅助代码**：blockquote 的 `cite` 属性用于形成对照；CSS 和 JS 用于观察差异。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- 页面中的作品标题使用 `<cite>`。
- 作者姓名“张三”没有被错误包进 `<cite>`。
- `blockquote` 的 `cite` 属性保存的是 URL。
- 能说清 `cite` 元素与 `cite` 属性的区别。
