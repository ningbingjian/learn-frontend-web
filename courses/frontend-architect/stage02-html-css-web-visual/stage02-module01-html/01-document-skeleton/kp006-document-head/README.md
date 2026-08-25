# KP006：`head` 与机器可读信息

> 节点：`node-02-01-01-01-01-02-01-02`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 `head` 是文档元信息和资源声明的容器，而不是页面顶部的可见区域。
2. 认识 `title`、`meta` 等常见 `head` 子元素。
3. 区分浏览器标签页信息和 `body` 中的可见正文。
4. 能通过修改 `title`、description 等内容观察各自影响的位置。

> **本节核心代码是 `head` 中的 `meta`、`title` 等元信息。**  
> 遍历 `document.head.children`、读取 `document.title` 等 JavaScript 只是实验辅助代码。

## 理论讲解

### 1. `head` 是元信息容器

`head` 保存描述文档或控制资源加载的信息，例如：

```html
<head>
  <meta charset="utf-8">
  <meta name="description" content="页面摘要">
  <title>页面标题</title>
</head>
```

这些内容通常不会直接作为正文显示在页面里。

### 2. 常见子元素

常见内容包括：

- `title`
- `meta`
- `link`
- `style`
- `base`
- 满足内容模型要求的 `script`、`noscript`、`template`

### 3. `head` 不是页面页眉

Logo、导航、通知条、页面标题等可见内容属于 `body`，通常使用 `header` 等元素表达。

如果把普通正文元素错误写进 `head`，HTML 解析器可能自动结束 `head`，导致最终 DOM 与源码缩进不同。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：明确观察目标

本节同时观察三个位置：

```text
浏览器标签页
页面正文
浏览器解析后的 head 内容
```

这样才能真正理解 `head` 和“页面顶部可见区域”的区别。

### 第 1 步：写最小文档

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP006：head 元信息</title>
</head>
<body>
  <h1>页面正文位于 body</h1>
  <p>标签页标题来自 head 中的 title。</p>
</body>
</html>
```

运行后先观察：

- `h1` 和段落出现在页面正文。
- `title` 出现在浏览器标签页，而不是正文中。

### 第 2 步：加入 viewport

在 `meta charset` 后加入：

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

它属于机器可读配置，不会直接产生正文。

### 第 3 步：加入 description

继续加入：

```html
<meta name="description" content="演示 head 中的机器可读信息">
```

刷新后，正文仍然不会自动显示这段 description。

### 第 4 步：准备观察区域

在正文中加入：

```html
<h2>head 的实际内容</h2>
<pre id="result"></pre>
```

### 第 5 步：读取 `head` 子元素

在 `body` 末尾加入：

```html
<script>
  const tags = Array.from(
    document.head.children,
    element => element.tagName.toLowerCase()
  );
</script>
```

> 这是实验辅助代码，只用于把浏览器解析到的 `head` 子元素名称收集起来。

### 第 6 步：读取 title 和 description

继续加入：

```js
const description =
  document.querySelector('meta[name="description"]').content;

document.querySelector('#result').textContent = [
  'document.title：' + document.title,
  'head 子元素：' + tags.join(', '),
  'description：' + description
].join('\n');
```

刷新后应同时看到：

- 标签页标题来自 `title`。
- 正文仍只显示 `body` 中的内容。
- 辅助输出列出 `head` 中的 `meta`、`title` 等元素。

### 第 7 步：修改元信息做对照

临时把：

```html
<title>KP006：head 元信息</title>
```

改成：

```html
<title>新的标签页标题</title>
```

再修改 description 的 `content`，刷新后分别观察标签页和辅助输出。

实验结束后恢复仓库原值。

### 第 8 步：完成案例并对照最终源码

恢复后，你的代码应与仓库最终 [`index.html`](./index.html) 一致。

本节总结：

- **核心代码**：`head` 中的 `meta charset`、viewport、description 和 `title`。
- **实验辅助代码**：`document.head.children`、`document.title` 和 DOM 查询，只用于验证元信息确实位于 `head`。

最终源码以 [`index.html`](./index.html) 为准，README 不再重复粘贴整份源码。

## 运行案例

直接打开 [`index.html`](./index.html)，同时观察标签页和正文。

或在当前目录运行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

## 效果验证

你应该能够确认：

- 标签页标题来自 `head` 中的 `title`。
- `meta` 不会作为正文直接显示。
- 页面正文位于 `body`。
- 辅助输出能列出 `head` 子元素并读到 description。
- 修改 `title` 或 description 后，对应结果同步变化。
