# KP023：站点图标（favicon）

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `link rel="icon"` 为页面声明 favicon。
2. 理解 `href`、`type`、`sizes` 的作用边界。
3. 知道 SVG、PNG、ICO 在站点图标中的常见取舍。
4. 理解浏览器标签页图标、系统快捷方式图标和 Apple Touch Icon 不是完全同一件事。
5. 能设计一个“现代格式优先 + 老环境回退”的图标策略。

> **本节核心代码是 `<link rel="icon">`。**  
> 页面中的 JavaScript 只负责读取 `<head>` 中的图标声明，属于实验辅助代码。

## 理论讲解

### 1. favicon 的标准声明

最常见写法：

```html
<link rel="icon" href="./favicon.svg" type="image/svg+xml">
```

浏览器会把这个资源作为当前页面的站点图标候选。

### 2. `type` 与 `sizes`

`type` 用来提示资源 MIME 类型：

```html
<link rel="icon" href="./favicon.svg" type="image/svg+xml">
<link rel="icon" href="./favicon-32.png" type="image/png" sizes="32x32">
```

`sizes` 表达位图图标对应的尺寸。对于可缩放 SVG，常见写法是：

```html
sizes="any"
```

但实际项目中是否写 `sizes="any"`，还要结合目标浏览器兼容性验证。

### 3. SVG、PNG、ICO 的常见分工

- SVG：可缩放、体积小，适合现代浏览器。
- PNG：像素尺寸明确，适合特定尺寸图标或系统图标。
- ICO：历史兼容性较好，很多站点仍保留 `/favicon.ico` 作为回退。

生产环境常见策略不是“只能选一个”，而是按目标平台准备多个候选。

### 4. 多设备并不只看 favicon

普通浏览器标签页主要读取 favicon。

移动设备保存到主屏幕时，还可能关注：

```html
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

PWA 又会使用 Web App Manifest 中的 `icons`。

因此“站点图标”是一个资源集合，而不是只准备一张图片就结束。

### 5. 回退思路

可以采用：

```text
现代浏览器：SVG favicon
特定尺寸：PNG
历史兼容：/favicon.ico
Apple 主屏幕：apple-touch-icon
PWA：manifest icons
```

不要假设每个平台都会读取同一条声明。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建最小页面

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP023：站点图标</title>
</head>
<body>
  <h1>站点图标实验</h1>
</body>
</html>
```

此时页面还没有显式 favicon 声明。

### 第 1 步：创建一个 SVG 图标资源

创建 `favicon.svg`：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#111827"/>
  <text x="32" y="42" text-anchor="middle" font-size="34" fill="white">H</text>
</svg>
```

本步目标是准备一个浏览器可以请求的独立图标文件。

### 第 2 步：在 `head` 中声明 favicon

加入：

```html
<link rel="icon" href="./favicon.svg" type="image/svg+xml" sizes="any">
```

为什么放在 `head`：它属于文档元信息和资源声明，不是页面正文内容。

刷新后应观察浏览器标签页图标发生变化。不同浏览器可能存在 favicon 缓存，需要强制刷新或重新打开页面。

### 第 3 步：理解生产环境中的回退

案例只提供 SVG 文件，是为了保持仓库源码可直接阅读。

真实项目可以继续补充：

```html
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

以及根路径下的 `/favicon.ico`。

### 第 4 步：读取页面中的图标声明

为了验证 `<head>` 中的不可见信息，在 `body` 中加入：

```html
<pre id="result"></pre>
<script>
  const icons = [...document.querySelectorAll('link[rel~="icon"]')];
  document.querySelector('#result').textContent = icons.map(icon => [
    'rel=' + icon.rel,
    'type=' + (icon.type || '(未声明)'),
    'sizes=' + (icon.sizes.value || '(未声明)'),
    'href=' + icon.href
  ].join(' | ')).join('\n');
</script>
```

这里的 JavaScript 只是帮助观察浏览器实际解析出的声明。

### 第 5 步：验证路径解析

注意源码写的是：

```html
href="./favicon.svg"
```

但 JavaScript 读取 `icon.href` 时会得到解析后的绝对 URL。

这说明浏览器会基于当前文档 URL 解析相对地址。

### 第 6 步：完成案例并对照最终源码

最终源码：

- [`index.html`](./index.html)
- [`favicon.svg`](./favicon.svg)

本节总结：

- **本节核心代码**：`<link rel="icon" ...>`。
- **实验辅助代码**：DOM 查询和输出，只用于验证声明结果。

## 运行案例

建议在当前目录运行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

使用 HTTP 服务比直接双击文件更接近真实站点环境。

## 效果验证

你应该能够确认：

- 浏览器能够请求 `favicon.svg`。
- 页面存在一条 `rel="icon"` 声明。
- `type` 为 `image/svg+xml`。
- `sizes` 为 `any`。
- 页面输出中的 `href` 被解析成绝对地址。
- 能解释为什么真实项目可能同时准备 SVG、PNG、ICO 和 Apple Touch Icon。
