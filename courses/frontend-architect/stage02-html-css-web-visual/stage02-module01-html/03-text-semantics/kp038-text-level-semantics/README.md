# KP038：`b`、`i`、`mark`、`small`

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `b`、`i`、`mark`、`small` 各自的文本级语义。
2. 不再把 `b` 当成“粗体标签”、把 `i` 当成“斜体标签”。
3. 能区分“视觉提醒”“不同语气/术语”“上下文相关高亮”“附属说明”。
4. 知道纯视觉需求应该优先由 CSS 负责。

> **本节核心代码是四个文本级语义元素。**  
> CSS 只用于改变默认外观，帮助验证“默认样式不等于元素语义”。

## 理论讲解

### 1. `b`：吸引注意，但不增加重要性

`b` 适合让某段文字在语义上被“特别注意”，但它并不表示 `strong` 那种重要性。

例如商品名称或关键词：

```html
<p>本次测试使用 <b>Chrome DevTools</b> 观察 DOM。</p>
```

如果只是“这个字要粗一点”，没有任何语义原因，更适合用 CSS。

### 2. `i`：不同语气、术语或另一种表达声音

`i` 可以用于：

- 技术术语。
- 外语词语。
- 分类学名称。
- 与正文不同的语气或声音。

例如：

```html
<p>浏览器会创建一棵 <i>DOM tree</i>。</p>
```

它的默认斜体同样只是浏览器样式。

### 3. `mark`：与当前上下文相关的高亮

`mark` 表示内容因为当前任务或上下文而具有相关性。

典型场景是搜索结果：

```html
<p>搜索“HTML”：学习 <mark>HTML</mark> 语义化结构。</p>
```

这里不是说 HTML “更重要”，而是因为用户正在搜索它，所以被标记出来。

### 4. `small`：附属说明或细则

`small` 适合：

- 版权说明。
- 法律细则。
- 条款补充。
- 免责声明等 side comments。

例如：

```html
<small>示例仅用于学习，不代表生产配置建议。</small>
```

它不意味着“所有小字号文本都应该用 small”。纯字号仍应交给 CSS。

### 5. 和 `em`、`strong` 的边界

可以这样对照：

```text
em     → 语气强调
strong → 重要 / 严重 / 紧迫
b      → 吸引注意，但不提升重要等级
i      → 不同语气、术语或另一种表达声音
mark   → 与当前上下文相关
small  → 附属说明或细则
```

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面骨架

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP038：文本级语义</title>
</head>
<body>
  <h1>b、i、mark、small</h1>
</body>
</html>
```

### 第 1 步：加入 `b`

```html
<p>本次测试使用 <b>Chrome DevTools</b> 观察 DOM。</p>
```

这里的 `b` 表示需要吸引读者注意的产品名称，不表示紧急警告。

### 第 2 步：加入 `i`

```html
<p>浏览器会创建一棵 <i>DOM tree</i>。</p>
```

`DOM tree` 被当作术语表达。

### 第 3 步：加入 `mark`

```html
<p>搜索“HTML”：学习 <mark>HTML</mark> 语义化结构。</p>
```

假设用户搜索关键词 HTML，这个词因当前搜索上下文而高亮。

### 第 4 步：加入 `small`

```html
<p><small>示例仅用于学习，不代表生产配置建议。</small></p>
```

它表达的是附属说明。

### 第 5 步：覆盖默认视觉样式

加入：

```html
<style>
  b { font-weight: normal; text-decoration: underline; }
  i { font-style: normal; }
  mark { background: none; border-bottom: 2px solid currentColor; }
  small { font-size: 1em; }
</style>
```

你会看到默认粗体、斜体、黄色背景和小字号都被改变了。

但 DOM 中的元素身份完全没有变化。

### 第 6 步：输出元素类型

加入辅助代码：

```html
<pre id="result"></pre>
<script>
  const result = [...document.querySelectorAll('b, i, mark, small')]
    .map(element => `${element.tagName.toLowerCase()} -> ${element.textContent}`)
    .join('\n');

  document.querySelector('#result').textContent = result;
</script>
```

### 第 7 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`b`、`i`、`mark`、`small` 的语义选择。
- **实验辅助代码**：CSS 用于抹掉默认视觉特征，JavaScript 用于读取 DOM。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

## 效果验证

你应该能够确认：

- `b` 即使不再粗体，仍然是 `b`。
- `i` 即使不再斜体，仍然是 `i`。
- `mark` 的核心是上下文相关性，不是黄色背景。
- `small` 的核心是附属说明，不是字号小。
- 能根据内容含义而不是默认样式选择标签。
