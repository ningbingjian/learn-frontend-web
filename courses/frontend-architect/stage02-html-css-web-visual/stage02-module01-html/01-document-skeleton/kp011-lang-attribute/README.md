# KP011：`lang` 页面语言声明

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `<html lang="...">` 声明页面主语言。
2. 理解 `lang` 会向后代元素继承，并能在局部内容上覆盖。
3. 能正确选择 `zh-CN`、`en`、`ja` 等语言标签，而不是把国家代码误当语言代码。
4. 理解 `lang` 对读屏、拼写检查、翻译和语言相关排版的价值。

> **本节核心代码是 HTML 的 `lang` 属性。**  
> JavaScript 只用于读取最终生效的语言，属于实验辅助代码。

## 理论讲解

### 1. 页面主语言

推荐把页面主语言写在根元素上：

```html
<html lang="zh-CN">
```

它表达的是：当前 HTML 文档默认使用简体中文（中国大陆地区习惯）。

`lang` 不是“页面来自哪个国家”，而是描述内容所使用的自然语言。

### 2. 局部语言覆盖

`lang` 会继承，因此不必给每个元素重复声明。

当页面里出现另一种语言时，只在局部覆盖：

```html
<p lang="en">Hello, HTML.</p>
<p lang="ja">こんにちは。</p>
```

这样浏览器和辅助技术能知道这一小段内容需要按另一种语言处理。

### 3. 语言标签

常见写法：

```text
zh-CN   简体中文（中国大陆）
zh-TW   繁体中文（台湾地区）
en      英语
ja      日语
fr-CA   加拿大法语
```

语言标签遵循 BCP 47 的结构。常见错误是写成：

```html
<html lang="CN">
```

`CN` 是国家/地区代码，不是合法的页面主语言表达。

### 4. 对辅助技术的影响

正确的 `lang` 可以帮助：

- 屏幕阅读器选择更合适的发音规则。
- 浏览器进行语言相关的拼写检查。
- 翻译工具判断源语言。
- 某些语言相关的排版和断词能力选择正确规则。

因此它不是装饰属性，而是文档语义的一部分。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建最小 HTML 文件

创建 `index.html`：

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>KP011：lang 页面语言声明</title>
</head>
<body>
  <h1>页面语言实验</h1>
</body>
</html>
```

此时页面可以运行，但根元素还没有明确声明语言。

### 第 1 步：声明页面主语言

把根元素改成：

```html
<html lang="zh-CN">
```

本步核心只有这一处修改。

运行后页面外观通常不会发生明显变化，因为 `lang` 首先解决的是语义问题，不是视觉样式问题。

### 第 2 步：加入继承页面主语言的中文内容

在 `body` 中加入：

```html
<p id="zh-text">这段内容继承页面的 zh-CN。</p>
```

这个 `p` 自己没有 `lang`，因此使用祖先 `<html>` 的 `zh-CN`。

### 第 3 步：加入英文局部覆盖

继续加入：

```html
<p id="en-text" lang="en">Hello, semantic HTML.</p>
```

这里明确把这一段的语言覆盖为英语。

### 第 4 步：加入日文局部覆盖

继续加入：

```html
<p id="ja-text" lang="ja">こんにちは、HTML。</p>
```

现在一个中文页面中同时存在中文、英文和日文语义。

### 第 5 步：读取最终语言验证继承

为了把继承关系直观看出来，加入辅助输出：

```html
<pre id="result"></pre>
<script>
  const ids = ['zh-text', 'en-text', 'ja-text'];
  const lines = ids.map(id => {
    const element = document.querySelector('#' + id);
    return id + ' -> ' + element.closest('[lang]').lang;
  });

  document.querySelector('#result').textContent = lines.join('\n');
</script>
```

这段 JavaScript 只是实验辅助代码，不是 `lang` 的必需写法。

### 第 6 步：观察覆盖关系

页面应输出类似：

```text
zh-text -> zh-CN
en-text -> en
ja-text -> ja
```

这说明：

- 中文段落向上找到根元素的 `zh-CN`。
- 英文段落使用自己的 `en`。
- 日文段落使用自己的 `ja`。

### 第 7 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`<html lang="zh-CN">` 和局部元素上的 `lang="en"`、`lang="ja"`。
- **实验辅助代码**：`closest('[lang]')` 和结果输出，用于观察语言继承关系。

## 运行案例

可以直接用浏览器打开 [`index.html`](./index.html)。

也可以在当前目录执行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

## 效果验证

你应该能够确认：

- 根元素声明了 `lang="zh-CN"`。
- 未声明 `lang` 的中文段落继承根元素语言。
- 英文段落局部覆盖为 `en`。
- 日文段落局部覆盖为 `ja`。
- 能解释为什么 `lang` 主要解决语义和辅助技术问题，而不是视觉样式问题。
