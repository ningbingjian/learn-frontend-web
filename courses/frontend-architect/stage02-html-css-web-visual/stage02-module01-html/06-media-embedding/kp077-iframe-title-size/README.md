# KP077：iframe 标题与尺寸

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 使用 `title` 为 `iframe` 提供清晰、可区分的可访问名称。
2. 区分父页面 `iframe[title]` 与被嵌入文档自己的 `<title>`。
3. 理解 `width`、`height` 属性与 CSS 响应式尺寸的职责边界。
4. 使用固定比例容器或 `aspect-ratio` 保持嵌入区域稳定，减少加载前后的布局跳动。
5. 在开发者工具中检查 iframe 的声明尺寸、最终渲染尺寸和嵌入文档地址。

## 理论讲解

### 1. `iframe[title]` 是父页面对嵌入内容的说明

`iframe` 会把另一个浏览上下文嵌入当前页面。对只看视觉内容的用户来说，地图、视频、报表可能一眼就能分辨；但辅助技术需要一个名称来说明这个嵌入区域“是什么”。

因此应给 iframe 提供具体的 `title`：

```html
<iframe
  src="./embedded-page.html"
  title="订单趋势报表"
></iframe>
```

不要只写：

```html
<iframe title="iframe"></iframe>
```

也不要在同一页的多个 iframe 上全部写成“嵌入内容”。名称应帮助用户区分每个嵌入区域的目的。

### 2. `iframe[title]` 与子文档 `<title>` 不是一回事

父页面：

```html
<iframe title="订单趋势报表" src="./embedded-page.html"></iframe>
```

子页面 `embedded-page.html`：

```html
<title>报表演示页</title>
```

两者分别服务于不同上下文：

- `iframe[title]`：父页面中这个嵌入区域的名称。
- 子文档 `<title>`：子文档作为一个 HTML 文档自己的标题。

它们可以相关，但不要求逐字相同。

### 3. `width` 与 `height` 给出 iframe 的声明尺寸

HTML 可以直接声明：

```html
<iframe width="800" height="450"></iframe>
```

这里的值表示 CSS 像素尺寸。它们给浏览器一个明确的初始尺寸，也让没有额外 CSS 时的页面结构更可预测。

但是现代页面通常还需要响应式布局，所以 CSS 可以覆盖最终渲染尺寸。

### 4. 响应式 iframe 不等于删掉所有尺寸信息

常见做法是把 iframe 放进一个有明确比例的容器：

```css
.frame-shell {
  width: min(100%, 800px);
  aspect-ratio: 16 / 9;
}

.frame-shell iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
```

这时：

- 容器负责响应式宽度和纵横比。
- iframe 填满容器。
- 页面在嵌入内容加载前就知道应该预留多大区域。

### 5. 布局稳定的关键是“加载前就能确定区域”

如果 iframe 的高度要等内部内容、脚本或后续计算完成才确定，周围正文可能被推开。

对于视频、地图、固定比例可视化等内容，优先在父页面提前确定尺寸或比例。

对于高度真正由子页面动态决定的复杂组件，则通常需要经过可信的跨窗口通信传递高度，并在父页面设置边界；不要默认让任意 iframe 消息直接控制页面布局。

## 动手编码：从 0 到 1

### 第 1 步：建立最小父页面

新建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KP077 iframe 标题与尺寸</title>
</head>
<body>
  <h1>iframe 标题与尺寸</h1>
</body>
</html>
```

**本步目标**：先保证父页面独立可运行。

**为什么这样写**：iframe 的语义和尺寸都发生在父页面中，先建立清晰的宿主文档。

**运行后观察**：页面只有一级标题，没有嵌入内容。

### 第 2 步：创建真实的被嵌入文档

新建 `embedded-page.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>报表演示页</title>
</head>
<body>
  <h1>订单趋势</h1>
  <p>这是 iframe 内部的独立 HTML 文档。</p>
</body>
</html>
```

**本步目标**：让 iframe 指向仓库里的真实页面，而不是空地址。

**为什么这样写**：这样可以同时观察父页面 `iframe[title]` 和子文档 `<title>` 的区别。

**运行后观察**：单独打开 `embedded-page.html` 时，它可以作为一个独立文档工作。

### 第 3 步：增加带标题和声明尺寸的 iframe

在父页面中加入：

```html
<iframe
  id="report-frame"
  src="./embedded-page.html"
  title="订单趋势报表"
  width="800"
  height="450"
></iframe>
```

**本步目标**：同时提供可访问名称和明确尺寸。

**为什么这样写**：`title` 描述嵌入目的，`width` / `height` 提供声明尺寸。

**运行后观察**：父页面中出现一个 800×450 的嵌入区域，并加载订单趋势页面。

### 第 4 步：把固定尺寸改造成响应式 16:9 区域

增加容器：

```html
<div class="frame-shell">
  <iframe
    id="report-frame"
    src="./embedded-page.html"
    title="订单趋势报表"
    width="800"
    height="450"
  ></iframe>
</div>
```

加入 CSS：

```css
.frame-shell {
  width: min(100%, 800px);
  aspect-ratio: 16 / 9;
}

.frame-shell iframe {
  width: 100%;
  height: 100%;
  border: 1px solid currentColor;
}
```

**本步目标**：让 iframe 在窄屏上缩小，同时保持稳定比例。

**为什么这样写**：响应式尺寸由父容器控制，iframe 只负责填满区域。

**运行后观察**：缩窄浏览器时 iframe 宽度跟随可用空间变化，高度按 16:9 同步变化。

### 第 5 步：增加尺寸观察面板

最终案例用 JavaScript 输出：

- `title` 属性
- `src` 属性
- HTML 声明的 `width` / `height`
- iframe 的 `clientWidth` / `clientHeight`

核心思路：

```js
const frame = document.querySelector('#report-frame');

const declaredWidth = frame.getAttribute('width');
const renderedWidth = frame.clientWidth;
```

**本步目标**：明确“HTML 声明值”和“最终布局值”不是同一个概念。

**为什么这样写**：`getAttribute()` 读取源码声明，`clientWidth` / `clientHeight` 读取最终布局结果。

**运行后观察**：窄屏时，HTML 仍声明 `800 × 450`，但最终渲染尺寸会更小。

### 最终源码

- [父页面 `index.html`](./index.html)
- [嵌入页 `embedded-page.html`](./embedded-page.html)

**本节核心代码**：`iframe` 的 `title`、`src`、`width`、`height`，以及父容器的响应式比例策略。

**实验辅助代码**：尺寸观察面板和 JavaScript 输出，只用于帮助理解声明值与渲染值的差异，不是 iframe 语义本身。

## 运行案例

推荐在本知识点目录启动静态服务器：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000/
```

也可以直接打开 `index.html` 观察基础效果；使用本地 HTTP 服务更接近真实站点运行环境。

## 效果验证

完成后逐项检查：

1. iframe 是否有具体且可区分的 `title="订单趋势报表"`。
2. 子页面自己的 `<title>` 是否仍为“报表演示页”。
3. HTML 声明尺寸是否显示为 `800 × 450`。
4. 窄屏下最终渲染尺寸是否小于声明尺寸。
5. 调整窗口宽度时是否保持 16:9 区域。
6. iframe 加载前后，周围页面是否没有明显的尺寸突变。
7. 是否能够解释：`iframe[title]` 解决的是嵌入区域命名，而不是视觉标题展示。