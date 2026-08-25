# KP006：`head` 与机器可读信息

> 节点：`node-02-01-01-01-01-02-01-02`  
> [返回模块索引](../../README.md) · [打开源码](./index.html)

## 文档目录

- [理论讲解](#理论讲解)
- [源码讲解](#源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 理论讲解

### 1. 元信息容器

`head` 保存描述文档或控制资源加载的信息。它不是页面顶部的视觉区域，通常不会直接产生正文内容。

### 2. 常见子元素

常见内容包括 `title`、`meta`、`link`、`style`、`base`，以及满足内容模型要求的 `script`、`noscript` 和 `template`。

```html
<head>
  <meta charset="utf-8">
  <meta name="description" content="页面摘要">
  <title>页面标题</title>
</head>
```

### 3. 与可见页面顶部的区别

Logo、导航、通知条和页面页眉属于可见内容，应放入 `body`，通常使用 `header` 等元素。把正文元素写入 `head` 可能触发解析器自动结束 `head`，导致最终 DOM 与源码缩进不同。

## 源码讲解

[`index.html`](./index.html) 在 `head` 中声明字符编码、viewport、description 和标题；可见的 `h1` 与段落则位于 `body`。

脚本遍历 `document.head.children`，同时读取 `document.title` 和 description，使标签页信息、机器可读信息与正文位置能够直接对照。

## 运行案例

使用浏览器打开 [`index.html`](./index.html)，同时观察浏览器标签页、页面正文和脚本输出。修改 `title` 与 description 后保存并刷新。

如需通过本地服务器访问，在当前目录执行 `python3 -m http.server 8080`，打开 `http://localhost:8080/index.html`。

## 效果验证

- 标签页标题应来自 `head` 中的 `title`。
- 页面正文只显示 `body` 中的内容。
- 输出的 `head` 子元素应包含 `meta` 和 `title`。
- 修改 title 或 description 后，相应输出应同步更新。
