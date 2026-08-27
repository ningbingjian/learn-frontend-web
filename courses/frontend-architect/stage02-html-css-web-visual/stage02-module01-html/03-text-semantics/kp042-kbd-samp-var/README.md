# KP042：`kbd`、`samp`、`var`

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `kbd` 表示用户输入。
2. 使用 `samp` 表示程序或系统输出示例。
3. 使用 `var` 表示变量、参数或占位符。
4. 能在操作文档、终端示例和公式中组合这些元素。

> **本节核心代码是 `<kbd>`、`<samp>`、`<var>`。**  
> CSS 只用于让不同语义元素视觉上更容易观察。

## 理论讲解

### 1. `kbd`：用户输入

`kbd` 表示用户需要输入的内容，不只局限于物理键盘。

例如快捷键：

```html
<p>按 <kbd>Command</kbd> + <kbd>S</kbd> 保存文件。</p>
```

也可以表示需要输入的命令：

```html
<p>输入 <kbd>npm run dev</kbd> 启动开发环境。</p>
```

### 2. `samp`：程序或系统输出

`samp` 表示计算机程序产生的示例输出：

```html
<p>终端输出：<samp>Server running at http://localhost:3000</samp></p>
```

它和 `code` 不同：

```text
code → 代码本身
samp → 程序运行后的示例输出
```

### 3. `var`：变量或占位符

`var` 可以表示：

- 数学变量。
- 编程语境中的变量名。
- 文档中需要替换的占位符。

例如：

```html
<p>面积公式：<var>S</var> = <var>w</var> × <var>h</var></p>
```

命令文档：

```html
<p>运行 <code>git checkout &lt;<var>branch</var>&gt;</code></p>
```

### 4. 三者组合

一个完整终端说明可以写成：

```html
<p>输入：<kbd>node app.js</kbd></p>
<p>输出：<samp>server started</samp></p>
```

如果命令里存在可替换值：

```html
<p>输入：<kbd>git checkout &lt;<var>branch</var>&gt;</kbd></p>
```

这样文档不仅“长得像终端”，其内容角色也被明确表达。

### 5. 默认字体不是语义

浏览器可能给这些元素使用等宽或斜体等默认样式。

可以完全通过 CSS 改掉，但语义仍然保留。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP042：kbd samp var</title>
</head>
<body>
  <h1>用户输入、程序输出与变量</h1>
</body>
</html>
```

### 第 1 步：加入快捷键

```html
<p>按 <kbd>Command</kbd> + <kbd>S</kbd> 保存文件。</p>
```

`kbd` 明确告诉读者这是用户要操作的输入。

### 第 2 步：加入终端命令

```html
<p>输入：<kbd>npm run dev</kbd></p>
```

### 第 3 步：加入程序输出

```html
<p>输出：<samp>Server running at http://localhost:3000</samp></p>
```

现在输入和输出使用不同语义元素。

### 第 4 步：加入变量

```html
<p>面积公式：<var>S</var> = <var>w</var> × <var>h</var></p>
```

### 第 5 步：在命令中加入占位变量

```html
<p>切换分支：<kbd>git checkout &lt;<var>branch</var>&gt;</kbd></p>
```

这里 `<branch>` 不是固定文本，而是由用户替换的变量位置。

### 第 6 步：增加观察样式

```html
<style>
  kbd, samp, var {
    border: 1px solid currentColor;
    padding: 0.1em 0.3em;
  }
</style>
```

这个样式只是为了看清元素边界。

### 第 7 步：打印元素角色

加入：

```html
<pre id="result"></pre>
<script>
  const items = [...document.querySelectorAll('kbd, samp, var')]
    .map(element => `${element.tagName.toLowerCase()} -> ${element.textContent}`);

  document.querySelector('#result').textContent = items.join('\n');
</script>
```

### 第 8 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：用户输入用 `kbd`，程序输出用 `samp`，变量和占位符用 `var`。
- **实验辅助代码**：CSS 和 JavaScript 只用于观察元素边界与类型。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- 快捷键与命令使用 `kbd`。
- 程序返回文字使用 `samp`。
- 公式和命令占位符使用 `var`。
- 能区分 `code` 与 `samp`：一个是代码，一个是程序输出。
- 能用三种元素写出语义清晰的操作文档。
