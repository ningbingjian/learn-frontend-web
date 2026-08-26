# KP019：Meta Description

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `<meta name="description">` 为页面提供摘要。
2. 编写与页面真实内容一致、能够独立理解的摘要。
3. 理解不同页面通常应有各自的 description。
4. 理解搜索结果摘要可能参考它，但搜索引擎可以根据查询重新生成展示文本。

> **本节核心代码是 description meta。**  
> JavaScript 只是为了把 `head` 中不可见的值显示在页面上。

## 理论讲解

### 1. 声明方式

```html
<meta
  name="description"
  content="通过可运行案例学习 HTML title、description、canonical 和社交分享元信息。"
>
```

它通常位于 `head` 中，不会像正文段落一样直接显示在页面上。

### 2. 摘要内容怎么写

好的 description 应该：

- 准确描述当前页面。
- 让用户只看摘要也能大致理解页面内容。
- 避免堆砌关键词。
- 避免使用与页面内容无关的营销描述。

不要把“固定多少字符”当成 HTML 规则。搜索产品的截断方式会变化，重点是摘要本身清晰、真实。

### 3. 页面唯一性

如果一个网站有：

```text
/products/keyboard
/products/mouse
/products/monitor
```

三个页面都使用完全相同的 description，会降低摘要区分度。

更合理的是每个页面根据自身主题生成对应摘要。

### 4. 搜索展示不是强制契约

`meta description` 是页面提供的摘要信息之一，但它不等于：

```text
我写什么 -> 搜索结果一定逐字展示什么
```

搜索引擎可能根据用户查询和页面正文选择另一段更匹配的文本。

因此不要把它理解为一个“强制控制搜索结果”的标签。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：建立普通页面

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>HTML 元信息指南</title>
</head>
<body>
  <h1>HTML 元信息指南</h1>
</body>
</html>
```

### 第 1 步：加入 description

在 `head` 中加入：

```html
<meta
  name="description"
  content="通过可运行案例学习 HTML title、description、canonical 和社交分享元信息。"
>
```

页面视觉上通常不会发生变化。

### 第 2 步：加入诊断区域

```html
<pre id="result"></pre>
```

### 第 3 步：读取 description

```html
<script>
  const description = document.querySelector(
    'meta[name="description"]'
  );

  document.querySelector('#result').textContent =
    description.content;
</script>
```

这一步只是验证浏览器确实解析到了我们声明的元信息。

### 第 4 步：尝试修改摘要

临时把摘要改成：

```text
详情页面
```

然后问自己：

- 脱离页面正文后还能知道这是什么详情吗？
- 用户能否区分它和其他页面？

再恢复成最终版本。

### 第 5 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`<meta name="description" content="...">`。
- **实验辅助代码**：`querySelector()` 读取 meta，只用于让不可见元信息可观察。

## 运行案例

直接打开 [`index.html`](./index.html)，或者执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- `head` 中存在唯一的 description meta。
- 页面正文能打印出它的 `content`。
- description 与当前页面主题一致。
- 能解释为什么搜索结果不保证逐字使用该摘要。
