# KP044：`ruby`、`bdi`、`bdo`——注音与双向文本控制

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `<ruby>`、`<rt>` 和 `<rp>` 为汉字、日文等内容添加注音或解释标注。
2. 理解 `<bdi>` 的作用是隔离一段方向未知或方向独立的文本，避免它影响周围内容。
3. 理解 `<bdo>` 的作用是强制覆盖文本方向，并配合 `dir="ltr"` 或 `dir="rtl"` 使用。
4. 区分“自然方向隔离”和“强制方向覆盖”，避免把 `bdo` 当作普通排版工具滥用。
5. 能处理用户名、评论、排行榜等包含阿拉伯语或希伯来语的动态文本场景。

> **本节核心是 HTML 的 `<ruby>`、`<rt>`、`<rp>`、`<bdi>` 与 `<bdo>`。**  
> JavaScript 仅用于读取计算后的方向并展示实验结果，属于辅助代码。

---

## 理论讲解

### 1. `<ruby>` 用于注音和旁注

`ruby` 适合“正文字符 + 辅助注音/解释”这种结构。

例如：

```html
<ruby>
  漢
  <rt>hàn</rt>
</ruby>
```

这里：

- `漢` 是正文字符。
- `<rt>` 中的 `hàn` 是 ruby text，也就是注音或旁注。

### 2. `<rp>` 为旧环境提供回退括号

可以写成：

```html
<ruby>
  漢
  <rp>(</rp>
  <rt>hàn</rt>
  <rp>)</rp>
</ruby>
```

支持 ruby 的浏览器通常不会显示 `rp`；不支持时，可能以括号形式帮助用户理解注音关系。

现代浏览器对 ruby 支持已经很好，但了解 `rp` 有助于理解它的完整内容模型。

### 3. `bdi` 解决“方向未知内容污染周围文本”

`bdi` 是 Bidirectional Isolation 的缩写。

典型场景是：页面整体为中文或英文，但用户名来自用户输入，可能是阿拉伯语或希伯来语。

例如：

```html
<p>第 1 名：<bdi dir="auto">علي</bdi> - 98 分</p>
```

这里 `dir="auto"` 让浏览器根据文本内容判断基础方向，而 `bdi` 会把这段方向上下文隔离起来。

如果不隔离，RTL 文本附近的冒号、括号、数字、标点有时会出现令人困惑的视觉排列。

### 4. `bdi` 适合动态数据

常见场景：

- 用户名
- 评论作者
- 聊天昵称
- 排行榜名称
- 来自第三方接口的文本
- 不确定语言方向的搜索结果

例如：

```html
<li><bdi dir="auto">Alice</bdi>：120 分</li>
<li><bdi dir="auto">محمد</bdi>：118 分</li>
<li><bdi dir="auto">דניאל</bdi>：115 分</li>
```

业务代码不需要提前知道每个名字究竟是 LTR 还是 RTL。

### 5. `bdo` 是“覆盖方向”，不是“自动判断”

`bdo` 是 Bidirectional Override 的缩写。

它要求明确指定 `dir`：

```html
<bdo dir="rtl">ABC 123</bdo>
```

这表示：**强制浏览器按照 RTL 方向呈现这段文本。**

如果写：

```html
<bdo dir="ltr">...</bdo>
```

则强制按 LTR 方向处理。

### 6. `bdi` 与 `bdo` 的核心区别

| 元素 | 目的 | 是否强制方向 | 常见场景 |
|---|---|---:|---|
| `bdi` | 隔离方向上下文 | 否 | 动态用户名、评论、未知语言文本 |
| `bdo` | 覆盖双向算法结果 | 是 | 明确需要强制展示方向的特殊内容 |

可以记成：

```text
bdi = isolate
bdo = override
```

### 7. 不要用 `bdo` 修复普通布局问题

如果只是：

- 右对齐
- 左对齐
- 组件放在页面右侧
- Flex 布局顺序

应该用 CSS 解决，而不是 `bdo`。

例如右对齐：

```css
.text {
  text-align: right;
}
```

`bdo` 改的是文本方向算法，不是普通视觉布局。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面骨架

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP044：ruby、bdi、bdo</title>
</head>
<body>
  <h1>注音与双向文本实验</h1>
</body>
</html>
```

### 第 1 步：加入最简单的 ruby

加入：

```html
<p>
  <ruby>
    漢
    <rt>hàn</rt>
  </ruby>
</p>
```

观察注音出现在正文字符附近。

### 第 2 步：加入完整的 `rp` 回退结构

继续加入：

```html
<p>
  <ruby>
    語
    <rp>(</rp>
    <rt>yǔ</rt>
    <rp>)</rp>
  </ruby>
</p>
```

本步重点是理解 `rp` 与 `rt` 的角色，而不是依赖它产生视觉效果。

### 第 3 步：构造混合方向排行榜

加入：

```html
<ol>
  <li><bdi dir="auto">Alice</bdi>：120 分</li>
  <li><bdi dir="auto">محمد</bdi>：118 分</li>
  <li><bdi dir="auto">דניאל</bdi>：115 分</li>
</ol>
```

这里名字都当作独立的方向单元处理。

### 第 4 步：比较没有隔离和有隔离的动态文本

加入：

```html
<p>未隔离：用户 محمد - 42 条消息</p>
<p>已隔离：用户 <bdi dir="auto">محمد</bdi> - 42 条消息</p>
```

在不同浏览器和字体环境中，视觉差异可能大小不同，但语义上后者更明确、更稳健。

### 第 5 步：演示 `bdo` 强制覆盖方向

加入：

```html
<p>
  原始文本：ABC 123
</p>

<p>
  强制 RTL：<bdo dir="rtl">ABC 123</bdo>
</p>
```

这不是“自动识别”，而是开发者明确要求覆盖文本方向。

### 第 6 步：读取浏览器计算结果

加入辅助输出：

```html
<pre id="result"></pre>

<script>
  const isolated = [...document.querySelectorAll('bdi')];
  const override = document.querySelector('bdo');

  document.querySelector('#result').textContent = [
    ...isolated.map(item =>
      `${item.textContent} -> direction: ${getComputedStyle(item).direction}`
    ),
    `bdo -> dir=${override.dir}, text=${override.textContent}`
  ].join('\n');
</script>
```

JavaScript 只是为了把方向状态打印出来。

### 第 7 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节核心代码：

```html
<ruby>漢<rt>hàn</rt></ruby>
<bdi dir="auto">محمد</bdi>
<bdo dir="rtl">ABC 123</bdo>
```

实验辅助代码：

```js
getComputedStyle(element).direction
```

---

## 运行案例

直接用浏览器打开 [`index.html`](./index.html)，或启动本地 HTTP 服务：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

---

## 效果验证

你应该能够确认：

- `ruby + rt` 可以表达正文字符与注音之间的结构关系。
- `rp` 是 ruby 的回退辅助内容，不是主要注音文本。
- 英文、阿拉伯文、希伯来文用户名都可以放入 `<bdi dir="auto">` 中独立判断方向。
- `bdi` 是隔离，不会主动强制某一种方向。
- `<bdo dir="rtl">ABC 123</bdo>` 会强制覆盖文本方向。
- 能解释 `bdi` 与 `bdo` 的区别，并知道普通对齐、布局问题应该使用 CSS，而不是 `bdo`。