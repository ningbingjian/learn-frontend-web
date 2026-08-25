# KP009：UTF-8 编码声明

> 节点：`node-02-01-01-01-02-01-01-01`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分“字符”和“字节”。
2. 正确在 HTML `head` 中尽早声明 `<meta charset="utf-8">`。
3. 理解 UTF-8 声明与文件本身真正使用 UTF-8 保存是两件相关但不同的事。
4. 知道 HTTP 响应头中的 charset 也可能参与浏览器解码。
5. 能通过多语言文本和字节观察建立“字符 → UTF-8 字节”的直觉。

> **本节核心代码是 `<meta charset="utf-8">`，核心原则是文件、声明和响应编码保持一致。**  
> `TextEncoder`、`Array.from()` 和十六进制转换都属于实验辅助 JavaScript。

## 理论讲解

### 1. 字符与字节

人看到的是字符，例如：

```text
中
文
😀
€
```

文件和网络真正保存、传输的是字节。

```text
字符
  ↓ 编码
字节
  ↓ 解码
字符
```

### 2. HTML 中声明 UTF-8

现代 HTML 推荐尽早在 `head` 中写：

```html
<meta charset="utf-8">
```

这行代码只是告诉浏览器“应该按 UTF-8 理解文本”，不会自动把错误编码保存的文件转换成 UTF-8。

正确链路应尽量保持：

```text
文件实际编码：UTF-8
HTML 声明：UTF-8
HTTP charset：UTF-8（如果提供）
```

### 3. UTF-8 可以表示多语言文本

UTF-8 可以统一表示中文、拉丁扩展字符、货币符号、Emoji、阿拉伯文等大量 Unicode 字符。

浏览器中的 `TextEncoder` 可以把字符串转换成 UTF-8 字节，适合用于本节实验观察。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：确认文件真实编码

在开始写 HTML 前，先确认编辑器/IDE 把文件保存为 UTF-8。

因为：

```html
<meta charset="utf-8">
```

只是声明，不能修复已经以其他编码写入的错误字节。

### 第 1 步：创建带 UTF-8 声明的最小页面

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP009：UTF-8 编码</title>
</head>
<body>
  <h1>UTF-8 字符样本</h1>
</body>
</html>
```

当前真正需要记住的是：

```html
<meta charset="utf-8">
```

### 第 2 步：加入多语言字符样本

在 `h1` 后加入：

```html
<ul>
  <li>中文：前端架构师</li>
  <li>拉丁扩展：café</li>
  <li>货币符号：€ ¥</li>
  <li>Emoji：😀 👍🏽</li>
  <li>阿拉伯文：مرحبا</li>
</ul>
```

保存并刷新。如果文件真实编码和页面声明一致，这些字符应正常显示。

### 第 3 步：准备字节观察区域

继续加入：

```html
<h2>“中文”的 UTF-8 字节</h2>
<pre id="result"></pre>
```

### 第 4 步：把“中文”编码成字节

在 `body` 末尾加入：

```html
<script>
  const text = '中文';
  const bytes = new TextEncoder().encode(text);
</script>
```

> `TextEncoder` 是实验辅助代码，只用于获得可观察的 UTF-8 字节。

### 第 5 步：把字节转成十六进制

继续加入：

```js
const hex = Array.from(
  bytes,
  value => value.toString(16).padStart(2, '0')
);
```

这一步只是为了让字节更容易阅读和对照。

### 第 6 步：同时显示字符和字节

继续加入：

```js
document.querySelector('#result').textContent =
  text + ' → ' + hex.join(' ');
```

刷新后应看到：

```text
中文 → e4 b8 ad e6 96 87
```

现在已经建立：

```text
字符：中文
       ↓
UTF-8 字节：e4 b8 ad e6 96 87
```

### 第 7 步：更换字符串做实验

临时把：

```js
const text = '中文';
```

改成：

```js
const text = 'café';
```

或：

```js
const text = '😀';
```

观察字符和字节如何一起变化，然后恢复 `'中文'`。

### 第 8 步：通过 HTTP 运行

在当前目录执行：

```bash
python3 -m http.server 8080
```

通过 Network 面板观察响应头，建立完整链路：

```text
文件字节
  ↓
HTTP 响应
  ↓
HTML charset 声明
  ↓
浏览器解码
  ↓
页面字符
```

### 第 9 步：完成案例并对照最终源码

恢复原始字符串后，你的代码应与仓库最终 [`index.html`](./index.html) 一致。

本节总结：

- **核心代码/原则**：`<meta charset="utf-8">`，并保证文件真实编码、HTML 声明和 HTTP charset 一致。
- **实验辅助代码**：`TextEncoder` 与十六进制转换，只用于观察字符对应的 UTF-8 字节。

最终源码直接查看 [`index.html`](./index.html)，README 不再重复整份源码。

## 运行案例

可以直接浏览器打开 [`index.html`](./index.html)。

更推荐通过本地 HTTP 服务运行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

这样还可以同时查看 Network 中的响应头。

## 效果验证

应确认：

- 中文、`café`、货币符号、Emoji 和阿拉伯文正常显示。
- “中文”的 UTF-8 字节为 `e4 b8 ad e6 96 87`。
- 修改 `text` 后，输出字节随字符串变化。
- 能解释为什么仅写 `<meta charset="utf-8">` 不能把错误编码文件自动修好。
