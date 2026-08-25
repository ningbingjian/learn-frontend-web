# KP002：DOCTYPE 的声明用途

> 节点：`node-02-01-01-01-01-01-01-02`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [完整源码讲解](#完整源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 说明 DOCTYPE 的核心职责是选择文档模式。
2. 区分“文档模式”和“浏览器是否支持某项 CSS / HTML / JavaScript 能力”。
3. 知道 `<!doctype html>` 不是 HTML、CSS 或 JavaScript 的版本开关。
4. 通过对照实验验证：删除 DOCTYPE 会影响 `document.compatMode`，但不会让浏览器突然失去已经实现的 Grid 或 Dialog API。

> **本节核心代码是 `<!doctype html>`。**  
> `document.compatMode`、`CSS.supports()`、`HTMLDialogElement` 和 DOM 查询只是实验辅助代码，用来观察浏览器状态，本节不要求掌握这些 JavaScript API 的完整用法。

## 理论讲解

### 1. DOCTYPE 负责选择文档模式

现代 HTML 完整文档通常以：

```html
<!doctype html>
```

开头。它最重要的作用，是让现代浏览器按标准模式解析和布局页面。

标准模式下：

```js
document.compatMode === 'CSS1Compat'
```

如果完整页面缺少可识别的 DOCTYPE，浏览器通常会进入怪异模式：

```js
document.compatMode === 'BackCompat'
```

### 2. DOCTYPE 不是版本开关

下面的声明：

```html
<!doctype html>
```

不表示“开启 HTML5 的所有功能”，也不会启用某个 CSS 或 JavaScript 版本。

浏览器是否支持 Grid、Dialog、ES Module 等能力，取决于浏览器自身实现，而不是 DOCTYPE 中有什么版本号。

### 3. 功能支持要单独检测

例如：

```js
CSS.supports('display', 'grid')
```

是在问浏览器：**你支持 CSS Grid 吗？**

而：

```js
'HTMLDialogElement' in window
```

是在问浏览器：**你实现了 Dialog API 吗？**

这两个问题与：

```js
document.compatMode
```

不是同一个维度。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：明确实验目标

我们要验证一句话：

> **DOCTYPE 决定文档模式，但不会决定浏览器是否实现某项现代功能。**

因此最终页面要同时观察三项数据：

1. 当前文档模式。
2. CSS Grid 是否受支持。
3. Dialog API 是否存在。

然后删除 DOCTYPE，再比较三项结果。

### 第 1 步：先建立标准 HTML 页面

创建 `index.html`，先写：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP002：DOCTYPE 的声明用途</title>
</head>
<body>
  <h1>文档模式与特性支持是不同维度</h1>
</body>
</html>
```

**为什么先这样写？**

因为实验必须先有一个标准模式基线。第一行 `<!doctype html>` 就是当前知识点真正要掌握的内容。

此时页面应该能够正常打开。

### 第 2 步：准备三个观察位置

在 `h1` 后加入：

```html
<ul>
  <li>文档模式：<strong id="mode"></strong></li>
  <li>CSS Grid：<strong id="grid"></strong></li>
  <li>Dialog API：<strong id="dialog"></strong></li>
</ul>

<p>练习：删除 DOCTYPE 后刷新，再比较三个结果。</p>
```

现在只是准备显示结果的位置，还没有读取浏览器状态。

### 第 3 步：先读取文档模式

在 `body` 末尾加入：

```html
<script>
  document.querySelector('#mode').textContent = document.compatMode;
</script>
```

> **实验辅助代码**：这里的 DOM 查询和 `document.compatMode` 只是为了把浏览器内部状态显示出来。

保存并刷新，你应该先看到：

```text
文档模式：CSS1Compat
```

到这里已经证明当前页面处于标准模式。

### 第 4 步：加入 CSS Grid 检测

继续在同一个 `script` 中加入：

```js
document.querySelector('#grid').textContent =
  CSS.supports('display', 'grid') ? '支持' : '不支持';
```

刷新后，现代浏览器通常会显示：

```text
CSS Grid：支持
```

注意：这个结果表示浏览器能力，不表示文档模式。

### 第 5 步：加入 Dialog API 检测

继续加入：

```js
document.querySelector('#dialog').textContent =
  'HTMLDialogElement' in window ? '支持' : '不支持';
```

现在页面已经能同时展示三种结果。

### 第 6 步：删除 DOCTYPE 做对照实验

把第一行：

```html
<!doctype html>
```

临时删除，保存并刷新。

重点比较：

```text
文档模式
CSS Grid
Dialog API
```

你应该观察到：

- 文档模式从 `CSS1Compat` 变成 `BackCompat`。
- Grid 支持结果保持不变。
- Dialog API 支持结果保持不变。

这就是本节最重要的证据：

```text
DOCTYPE
  ↓
影响文档模式

浏览器自身实现
  ↓
决定具体功能是否可用
```

### 第 7 步：恢复标准写法

实验结束后，把第一行恢复为：

```html
<!doctype html>
```

最终应回到标准模式。

---

## 完整源码讲解

仓库中的最终 [`index.html`](./index.html) 保留了课程说明注释，完整源码如下：

```html
<!doctype html>
<!--
  KP002：DOCTYPE 的声明用途

  DOCTYPE 负责选择文档模式。
  它不会启用某个 CSS 或 JavaScript 版本。

  请比较下面三个结果：
  - compatMode：文档模式
  - CSS.supports：CSS 特性支持
  - API 是否存在：JavaScript/HTML 能力支持
-->
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP002：DOCTYPE 的声明用途</title>
</head>
<body>
  <h1>文档模式与特性支持是不同维度</h1>

  <ul>
    <li>文档模式：<strong id="mode"></strong></li>
    <li>CSS Grid：<strong id="grid"></strong></li>
    <li>Dialog API：<strong id="dialog"></strong></li>
  </ul>

  <p>练习：删除 DOCTYPE 后刷新，再比较三个结果。</p>

  <script>
    document.querySelector('#mode').textContent = document.compatMode;
    document.querySelector('#grid').textContent =
      CSS.supports('display', 'grid') ? '支持' : '不支持';
    document.querySelector('#dialog').textContent =
      'HTMLDialogElement' in window ? '支持' : '不支持';
  </script>
</body>
</html>
```

整体可以拆成两层：

- **核心 HTML**：第一行 DOCTYPE，决定标准模式入口。
- **实验辅助层**：三个状态检测，把“文档模式”和“功能支持”并排显示出来。

## 运行案例

最简单的方式是直接使用浏览器打开 [`index.html`](./index.html)。

也可以在当前目录启动本地服务器：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

先记录保留 DOCTYPE 时的三个结果，再删除第一行并刷新，最后恢复标准声明。

## 效果验证

你应该能够验证：

- 保留 `<!doctype html>` 时，`document.compatMode` 为 `CSS1Compat`。
- 删除 DOCTYPE 后，`document.compatMode` 为 `BackCompat`。
- 同一个浏览器中，Grid 和 Dialog API 的检测结果不会因为删除 DOCTYPE 而改变。
- 能解释为什么“标准模式”和“浏览器功能支持”不能混为一谈。
