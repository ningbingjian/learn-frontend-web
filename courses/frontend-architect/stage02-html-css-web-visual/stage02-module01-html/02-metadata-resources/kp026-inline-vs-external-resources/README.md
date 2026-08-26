# KP026：内联资源与外联资源

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分内联 CSS / JavaScript 与外部 CSS / JavaScript。
2. 从复用、缓存、请求成本和维护边界判断应该采用哪种方式。
3. 理解“减少请求数”不等于“所有资源都应该内联”。
4. 理解 CSP 对内联脚本和内联样式的约束。
5. 使用浏览器 Resource Timing 观察外部资源请求，而不是把实验代码误认为资源加载本身。

> **本节核心知识是内联与外联资源的工程取舍。**  
> `performance.getEntriesByType('resource')` 只用于实验观察，不是加载资源的必要代码。

## 理论讲解

### 1. 什么叫内联资源

直接写在 HTML 文档中的 CSS：

```html
<style>
  .notice { font-weight: 700; }
</style>
```

直接写在 HTML 文档中的 JavaScript：

```html
<script>
  console.log('inline');
</script>
```

它们不需要再通过独立 URL 请求文件。

### 2. 什么叫外联资源

CSS：

```html
<link rel="stylesheet" href="./styles.css">
```

JavaScript：

```html
<script src="./app.js" defer></script>
```

资源拥有自己的 URL，可以独立缓存、复用和部署。

### 3. 内联的优势与代价

优势：

- 很小的关键代码可以和 HTML 一起到达。
- 不增加一个独立资源请求。
- 对一次性、页面专属的小片段比较直接。

代价：

- 不容易跨页面复用。
- HTML 体积会变大。
- 修改 HTML 会让内联资源随文档缓存一起失效。
- CSP 往往需要 nonce、hash 或其他明确策略才能允许内联代码。

### 4. 外联的优势与代价

优势：

- 多页面复用容易。
- 浏览器可以独立缓存。
- 文件职责清晰，更适合大型工程的构建、压缩和代码分割。
- CSP 通常更容易围绕来源建立规则。

代价：

- 需要额外资源发现和请求。
- 如果资源很小、网络链路差，额外请求仍有成本。
- 错误的拆分会制造大量碎片资源。

### 5. HTTP/2、HTTP/3 之后仍需做取舍

现代协议降低了多个请求的部分成本，但并没有让请求“免费”。

工程决策应综合：

```text
资源大小
+ 是否跨页面复用
+ 缓存寿命
+ 是否属于关键渲染路径
+ CSP 策略
+ 构建与维护成本
```

而不是只看“请求数量”一个指标。

### 6. CSP 边界

严格 CSP 中，类似：

```html
<script>alert('inline')</script>
```

可能被阻止，除非策略显式允许对应 nonce/hash 等。

所以大型生产项目通常不会无限制依赖内联脚本。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面骨架

先创建：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP026：内联与外联资源</title>
</head>
<body>
  <h1>内联与外联资源实验</h1>
</body>
</html>
```

### 第 1 步：创建外部 CSS

创建 `styles.css`：

```css
.external-card {
  border: 1px solid #cbd5e1;
  padding: 16px;
}
```

再在 `head` 中加入：

```html
<link rel="stylesheet" href="./styles.css">
```

本步目标：让样式成为拥有独立 URL 的外部资源。

### 第 2 步：加入一个页面专属的内联样式

继续在 `head` 中加入：

```html
<style>
  .inline-note {
    font-style: italic;
  }
</style>
```

这个规则直接属于当前 HTML 文档，不产生独立 CSS 请求。

### 第 3 步：创建外部 JavaScript

创建 `app.js`：

```js
document.querySelector('#external-status').textContent =
  '外部 app.js 已执行';
```

并在 `head` 中声明：

```html
<script src="./app.js" defer></script>
```

使用 `defer` 是为了让脚本等 HTML 解析完成后再访问正文节点。

### 第 4 步：加入内联 JavaScript

在 `body` 尾部加入：

```html
<script>
  document.querySelector('#inline-status').textContent =
    '内联 script 已执行';
</script>
```

此时页面同时包含：

- 外部 CSS
- 内联 CSS
- 外部 JS
- 内联 JS

### 第 5 步：观察哪些资源产生独立请求

继续加入辅助代码：

```js
window.addEventListener('load', () => {
  const resources = performance
    .getEntriesByType('resource')
    .map(entry => new URL(entry.name).pathname.split('/').pop());

  document.querySelector('#resources').textContent =
    resources.join('\n');
});
```

预期可以看到 `styles.css`、`app.js` 等外部资源。

内联 `<style>` 和内联 `<script>` 没有独立 URL，因此不会以独立网络资源的方式出现。

### 第 6 步：理解实验边界

Resource Timing 只能帮助我们观察“哪些资源拥有独立请求记录”。

它不能直接回答：

- 哪种方案一定更快。
- 哪种缓存策略一定更好。
- 生产环境 CSP 应该怎么配置。

这些都需要结合真实应用和网络条件分析。

### 第 7 步：完成案例并对照最终源码

最终源码：

- [`index.html`](./index.html)
- [`styles.css`](./styles.css)
- [`app.js`](./app.js)

本节总结：

- **本节核心代码**：内联 `<style>/<script>` 与外联 `<link>/<script src>` 的对照。
- **实验辅助代码**：Resource Timing 输出。

## 运行案例

必须通过 HTTP 服务运行，才能更自然地观察资源请求：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

同时打开 DevTools 的 Network 面板验证。

## 效果验证

你应该能够确认：

- 外部 `styles.css` 正常加载并应用。
- 外部 `app.js` 正常执行。
- 内联 CSS 和内联 JS 同样生效。
- Resource Timing 中能看到拥有独立 URL 的外部资源。
- 能从复用、缓存、请求、CSP 和维护五个维度解释内联与外联的取舍。
