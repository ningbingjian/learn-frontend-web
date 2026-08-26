# KP034：组件标题与可复用上下文

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解可复用组件的标题级别取决于它被放到页面的什么位置。
2. 避免在组件内部永久写死错误的标题层级。
3. 理解“组件视觉样式固定”和“标题语义层级可配置”可以同时成立。
4. 能设计一个由外部上下文决定标题标签的简单组件方案。

> **本节核心知识是组件标题的上下文依赖。**  
> JavaScript 用于模拟组件渲染和动态选择 `h2/h3`，属于实验辅助代码。

## 理论讲解

### 1. 同一个组件可能出现在不同层级

假设有一个“相关推荐”组件。

在文章详情页中，它可能是文章下的一级分区：

```text
h1 文章标题
└─ h2 相关推荐
```

但如果它被放进“更多内容”分区：

```text
h1 文章标题
└─ h2 更多内容
   └─ h3 相关推荐
```

同一个组件的视觉样式可以完全一样，但标题语义级别不同。

### 2. 组件内部直接写死 `h2` 的问题

例如组件模板固定为：

```html
<section>
  <h2>相关推荐</h2>
</section>
```

如果未来把它嵌进一个 `h2` 分区内部，就可能出现：

```text
h2 更多内容
h2 相关推荐
```

原本想表达父子关系，却变成同级关系。

### 3. 标题级别应该由使用上下文决定

组件可以把“标题内容”和“标题级别”分开：

```text
组件内容：相关推荐
组件层级：由外部页面决定
```

在 React / Vue 等框架中，也常见传入：

```text
headingLevel = 2
headingLevel = 3
```

然后组件再渲染对应标题元素。

### 4. 不要用 CSS 解决语义问题

下面只能改变视觉：

```css
.component-title {
  font-size: 18px;
}
```

它不能把 `h2` 的语义自动变成 `h3`。

所以：

- CSS 决定长什么样。
- HTML 标签决定结构语义。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面主结构

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP034：组件标题</title>
</head>
<body>
  <h1>文章详情</h1>
</body>
</html>
```

### 第 1 步：创建两个组件挂载位置

```html
<section>
  <h2>正文扩展</h2>
  <div id="nested-component"></div>
</section>

<div id="top-component"></div>
```

### 第 2 步：写一个最小组件函数

```html
<script>
  function renderRelated(container, level) {
    const section = document.createElement('section');
    const heading = document.createElement('h' + level);
    heading.className = 'component-title';
    heading.textContent = '相关推荐';
    section.append(heading);
    container.append(section);
  }
</script>
```

### 第 3 步：在页面一级位置使用 h2

```js
renderRelated(document.querySelector('#top-component'), 2);
```

得到：

```text
h1 文章详情
└─ h2 相关推荐
```

### 第 4 步：在 h2 分区内部使用 h3

```js
renderRelated(document.querySelector('#nested-component'), 3);
```

得到：

```text
h1 文章详情
└─ h2 正文扩展
   └─ h3 相关推荐
```

### 第 5 步：统一视觉样式

加入：

```html
<style>
  .component-title {
    font-size: 18px;
  }
</style>
```

两个组件标题看起来一样大，但语义层级不同。

### 第 6 步：输出最终标题结构

```html
<pre id="result"></pre>
<script>
  const titles = document.querySelectorAll('h1, h2, h3');
  document.querySelector('#result').textContent = Array.from(
    titles,
    item => item.tagName + '：' + item.textContent
  ).join('\n');
</script>
```

### 第 7 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心知识**：组件标题级别由外部内容结构决定。
- **实验辅助代码**：`renderRelated()` 和 DOM 创建 API，用于模拟框架组件的可配置标题。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- 页面顶层“相关推荐”使用 `h2`。
- “正文扩展”内部的“相关推荐”使用 `h3`。
- 两个标题视觉字号相同。
- 能解释为什么组件不应该仅根据视觉稿永久写死标题级别。
