# KP002：DOCTYPE 的声明用途

> 节点：`node-02-01-01-01-01-01-01-02`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 说明 DOCTYPE 的核心职责是选择文档模式。
2. 区分“文档模式”和“浏览器功能支持”。
3. 知道 `<!doctype html>` 不是 HTML、CSS 或 JavaScript 的版本开关。
4. 通过对照实验验证：删除 DOCTYPE 会改变 `document.compatMode`，但不会改变浏览器已经实现的 Grid 或 Dialog API。

> **本节核心代码仍然是 `<!doctype html>`。**  
> `document.compatMode`、`CSS.supports()`、`HTMLDialogElement` 和 DOM 查询只是实验辅助代码。

## 理论讲解

### 1. DOCTYPE 负责选择文档模式

现代 HTML 完整文档通常以：

```html
<!doctype html>
```

开头。标准声明通常让浏览器进入 Standards Mode：

```js
document.compatMode === 'CSS1Compat'
```

缺少可识别 DOCTYPE 时通常进入 Quirks Mode：

```js
document.compatMode === 'BackCompat'
```

### 2. DOCTYPE 不是版本开关

`<!doctype html>` 不表示“开启 HTML5 的全部功能”，也不会启用某个 CSS 或 JavaScript 版本。

浏览器是否支持 Grid、Dialog、ES Module 等能力，取决于浏览器自身实现。

### 3. 功能支持要单独检测

例如：

```js
CSS.supports('display', 'grid')
```

是在检测 CSS Grid。

```js
'HTMLDialogElement' in window
```

是在检测 Dialog API。

它们与：

```js
document.compatMode
```

属于不同维度。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：明确实验目标

我们要验证：

> DOCTYPE 决定文档模式，但不会决定浏览器是否实现某项现代功能。

最终页面同时观察：

1. 文档模式。
2. CSS Grid 支持情况。
3. Dialog API 支持情况。

### 第 1 步：创建标准 HTML 页面

创建 `index.html`：

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

第一行提供标准模式基线。

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

此时只是准备展示区域。

### 第 3 步：先读取文档模式

在 `body` 末尾加入：

```html
<script>
  document.querySelector('#mode').textContent = document.compatMode;
</script>
```

刷新后应看到：

```text
文档模式：CSS1Compat
```

### 第 4 步：加入 CSS Grid 检测

继续加入：

```js
document.querySelector('#grid').textContent =
  CSS.supports('display', 'grid') ? '支持' : '不支持';
```

现代浏览器通常显示：

```text
CSS Grid：支持
```

### 第 5 步：加入 Dialog API 检测

继续加入：

```js
document.querySelector('#dialog').textContent =
  'HTMLDialogElement' in window ? '支持' : '不支持';
```

现在页面已经同时展示三个维度。

### 第 6 步：删除 DOCTYPE 做对照

临时删除第一行：

```html
<!doctype html>
```

保存并刷新。

预期变化：

```text
文档模式：CSS1Compat → BackCompat
CSS Grid：保持原检测结果
Dialog API：保持原检测结果
```

这证明 DOCTYPE 与浏览器具体功能支持不是同一个开关。

### 第 7 步：恢复标准写法并完成案例

恢复：

```html
<!doctype html>
```

到这里，代码应与仓库最终 [`index.html`](./index.html) 一致。

本节总结：

- **核心代码**：`<!doctype html>`，负责标准文档模式入口。
- **实验辅助代码**：`document.compatMode`、`CSS.supports()`、`HTMLDialogElement` 检测和 DOM 输出，用于证明“文档模式”和“功能支持”是两个维度。

最终源码直接查看 [`index.html`](./index.html)，README 不再重复粘贴整份文件。

## 运行案例

直接打开 [`index.html`](./index.html)，或在当前目录执行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

先记录三个结果，再删除 DOCTYPE 刷新，最后恢复标准声明。

## 效果验证

你应该能够确认：

- 保留 DOCTYPE 时 `document.compatMode` 为 `CSS1Compat`。
- 删除 DOCTYPE 后 `document.compatMode` 为 `BackCompat`。
- Grid 和 Dialog API 的检测结果不会因为删除 DOCTYPE 而变化。
- 能解释为什么 DOCTYPE 不是“开启现代浏览器功能”的开关。
