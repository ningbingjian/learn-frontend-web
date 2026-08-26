# KP012：`dir` 文本方向

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `dir="ltr"`、`dir="rtl"` 和 `dir="auto"` 的区别。
2. 理解文本方向会从祖先元素继承。
3. 能在以中文为主的页面中正确嵌入阿拉伯语等 RTL 内容。
4. 知道什么时候应该用 HTML 的 `dir` 表达语义，而不是只靠 CSS 改变视觉方向。

> **本节核心代码是 HTML `dir` 属性。**  
> JavaScript 只用于读取浏览器计算后的方向，属于实验辅助代码。

## 理论讲解

### 1. `ltr`

`ltr` 表示从左向右：

```html
<p dir="ltr">Hello</p>
```

中文、英文等页面通常使用左到右方向。

### 2. `rtl`

`rtl` 表示从右向左：

```html
<p dir="rtl" lang="ar">مرحبا بالعالم</p>
```

阿拉伯语、希伯来语等内容常见这种书写方向。

### 3. `auto`

当内容可能来自用户输入、事先不知道主要方向时，可以使用：

```html
<p dir="auto">مرحبا HTML</p>
```

浏览器会根据内容中的第一个强方向字符判断基础方向。

`auto` 不是“跟随系统语言”，而是根据文本内容推断。

### 4. 方向继承

`dir` 会影响后代元素，因此可以在一个区域上统一声明：

```html
<section dir="rtl">
  ...
</section>
```

后代元素除非自己覆盖，否则继承该方向。

### 5. 为什么不用 CSS 代替语义

CSS 的 `direction` 可以改变布局表现，但文档本身的方向语义更适合由 `dir` 表达。

如果内容本身就是 RTL 文本，应优先把方向写进 HTML：

```html
<p dir="rtl" lang="ar">...</p>
```

而不是只为了“看起来靠右”去写 `dir="rtl"`。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面骨架

```html
<!doctype html>
<html lang="zh-CN" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>KP012：dir 文本方向</title>
</head>
<body>
  <h1>文本方向实验</h1>
</body>
</html>
```

这里在根元素声明 `dir="ltr"`，表示页面默认方向为左到右。

### 第 1 步：加入默认方向内容

```html
<p id="default-text">中文页面默认从左向右。</p>
```

它自己没有 `dir`，会继承根元素的 `ltr`。

### 第 2 步：加入 RTL 区域

```html
<section dir="rtl" lang="ar">
  <p id="rtl-text">مرحبا بالعالم</p>
</section>
```

`section` 的后代会继承 `rtl`。

### 第 3 步：加入 `auto`

```html
<p id="auto-rtl" dir="auto">مرحبا HTML 2026</p>
<p id="auto-ltr" dir="auto">HTML مرحبا 2026</p>
```

两行只交换开头的强方向字符，观察浏览器如何判断基础方向。

### 第 4 步：读取计算方向

加入辅助代码：

```html
<pre id="result"></pre>
<script>
  const ids = ['default-text', 'rtl-text', 'auto-rtl', 'auto-ltr'];
  const lines = ids.map(id => {
    const element = document.querySelector('#' + id);
    return id + ' -> ' + getComputedStyle(element).direction;
  });

  document.querySelector('#result').textContent = lines.join('\n');
</script>
```

这里的 `getComputedStyle()` 只用于观察浏览器最终采用的方向。

### 第 5 步：验证继承

预期：

```text
default-text -> ltr
rtl-text -> rtl
auto-rtl -> rtl
auto-ltr -> ltr
```

### 第 6 步：完成案例

最终代码与 [`index.html`](./index.html) 保持一致。

本节总结：

- **本节核心代码**：根元素 `dir="ltr"`、局部 `dir="rtl"`、未知内容上的 `dir="auto"`。
- **实验辅助代码**：`getComputedStyle(...).direction`，用于观察最终方向。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080/index.html`。

## 效果验证

你应该能够确认：

- 页面默认方向是 `ltr`。
- RTL 区域内的段落继承 `rtl`。
- `dir="auto"` 会根据内容判断基础方向。
- 方向语义与“单纯把文字靠右显示”不是一回事。
