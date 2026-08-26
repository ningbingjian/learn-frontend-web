# KP037：`em` 与 `strong`

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 `em` 的“语气强调”和 `strong` 的“重要、严重或紧迫”。
2. 根据句子含义选择标签，而不是因为默认斜体或粗体来选择标签。
3. 理解嵌套 `em` 可以表达更强的强调层次，并知道不应为了视觉效果机械嵌套。
4. 能用 CSS 改变外观，同时保持 HTML 语义不变。

> **本节核心代码是 `<em>` 与 `<strong>`。**  
> CSS 和 JavaScript 只用于证明“语义与默认视觉样式不是一回事”，属于实验辅助代码。

## 理论讲解

### 1. `em`：语气强调

`em` 表示 stress emphasis，也就是一句话中需要特别加重语气的部分。

例如：

```html
<p>我说的是 <em>今天</em> 提交，不是明天。</p>
```

强调词换掉，句子的重点也会变化：

```html
<p><em>我</em>说的是今天提交。</p>
<p>我说的是<em>今天</em>提交。</p>
```

所以 `em` 不是“斜体标签”。浏览器通常把它显示成斜体，只是默认样式。

### 2. `strong`：重要、严重或紧迫

`strong` 表示内容具有较高的重要性、严重性或紧迫性：

```html
<p><strong>提交前必须备份数据库。</strong></p>
```

它常适合：

- 关键警告。
- 必须执行的操作。
- 非常重要的结论。
- 严重风险提示。

`strong` 也不是“粗体标签”。如果只是想让文字变粗，应优先由 CSS 决定视觉表现。

### 3. `em` 与 `strong` 的区别

可以用一句话记忆：

```text
em     → 这句话应该怎么“重读”
strong → 这段内容本身有多“重要”
```

例如：

```html
<p>请在 <em>今天</em> 完成部署。</p>
<p><strong>生产环境禁止直接删除数据。</strong></p>
```

前者强调“今天”这个语气焦点；后者强调规则本身的重要性。

### 4. 嵌套与语义强度

`em` 可以嵌套，用来表达更高层次的强调：

```html
<p>这次真的 <em>非常 <em>非常</em> 重要</em>。</p>
```

但嵌套应该来自真实语义，而不是为了让字体“更斜”。

`strong` 也可以出现在本身已经重要的上下文中，但同样应以内容含义为依据。

### 5. 语义与样式分离

下面的 CSS 完全可以把默认视觉效果改掉：

```css
em {
  font-style: normal;
  text-decoration: underline;
}

strong {
  font-weight: normal;
  border: 1px solid currentColor;
}
```

改完之后，HTML 中的 `em` 仍然是强调，`strong` 仍然是重要内容。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建最小页面

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP037：em 与 strong</title>
</head>
<body>
  <h1>强调与重要性</h1>
</body>
</html>
```

### 第 1 步：加入普通文本

```html
<p>我说的是今天提交，不是明天。</p>
```

先观察没有语义标记时的句子。

### 第 2 步：用 `em` 标记语气焦点

改成：

```html
<p>我说的是 <em>今天</em> 提交，不是明天。</p>
```

本步核心是：`em` 表示“今天”需要被重读。

### 第 3 步：加入 `strong`

```html
<p><strong>生产环境禁止直接删除数据。</strong></p>
```

这里不是改变语气，而是表达规则本身具有较高重要性。

### 第 4 步：观察嵌套 `em`

加入：

```html
<p>这次真的 <em>非常 <em>非常</em> 重要</em>。</p>
```

重点不是视觉上“斜了几层”，而是理解嵌套能表达强调层次。

### 第 5 步：故意覆盖默认样式

加入：

```html
<style>
  em {
    font-style: normal;
    text-decoration: underline;
  }

  strong {
    font-weight: normal;
    border: 1px solid currentColor;
    padding: 0 0.2em;
  }
</style>
```

现在 `em` 不再显示为默认斜体，`strong` 也不再显示为默认粗体。

这证明：

```text
语义由 HTML 决定
视觉由 CSS 决定
```

### 第 6 步：读取元素验证结构

加入辅助输出：

```html
<pre id="result"></pre>
<script>
  const items = [...document.querySelectorAll('em, strong')]
    .map(element => `${element.tagName.toLowerCase()} -> ${element.textContent}`);

  document.querySelector('#result').textContent = items.join('\n');
</script>
```

JavaScript 只是帮助你观察 DOM，不是本节核心。

### 第 7 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`em` 表示语气强调，`strong` 表示重要、严重或紧迫。
- **实验辅助代码**：CSS 用于覆盖默认外观，JavaScript 用于列出语义元素。

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

- `em` 的默认斜体被 CSS 改掉后，它仍然是 `em`。
- `strong` 的默认粗体被 CSS 改掉后，它仍然是 `strong`。
- 能解释“今天”为什么适合 `em`。
- 能解释生产环境警告为什么适合 `strong`。
- 不会再把 `em` 简单理解为斜体、把 `strong` 简单理解为粗体。
