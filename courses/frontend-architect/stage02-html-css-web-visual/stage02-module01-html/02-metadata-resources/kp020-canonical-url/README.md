# KP020：Canonical 规范 URL

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `<link rel="canonical">` 声明页面首选 URL。
2. 理解 canonical 解决的是多个 URL 指向相同或高度相似内容时的首选地址问题。
3. 正确处理常见参数页和重复内容场景。
4. 区分 canonical 与 HTTP 重定向。

> **本节核心代码是 `rel="canonical"`。**  
> JavaScript 仅用于打印当前地址和 canonical 地址进行对照。

## 理论讲解

### 1. 基本声明

```html
<link
  rel="canonical"
  href="https://example.com/guides/html-metadata"
>
```

常见实践是使用明确的绝对 URL，避免首选地址在不同上下文中被误解析。

### 2. 为什么需要规范 URL

同一篇内容可能通过多个地址访问：

```text
/guides/html-metadata
/guides/html-metadata?utm_source=newsletter
/guides/html-metadata?ref=home
```

如果这些参数不改变主体内容，可以把无参数地址声明为首选版本。

### 3. 不是所有参数都应该忽略

下面两个地址可能代表真正不同的内容：

```text
/products?category=keyboard
/products?category=monitor
```

如果页面主题确实不同，就不能机械地把它们全部 canonical 到同一个 URL。

判断依据不是“有没有参数”，而是内容是否实质等价。

### 4. canonical 不是重定向

```text
canonical：告诉消费者首选哪个 URL
redirect：让浏览器/客户端真正跳转到另一个 URL
```

加入 canonical 后，用户仍然停留在当前地址。

### 5. 自引用 canonical

正式内容页经常也会给自己声明 canonical：

```html
<link rel="canonical" href="https://example.com/guides/html-metadata">
```

这样可以让首选地址规则更明确。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：建立页面

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>HTML 元信息指南</title>
</head>
<body>
  <h1>HTML 元信息指南</h1>
</body>
</html>
```

### 第 1 步：加入 canonical

在 `head` 中加入：

```html
<link
  rel="canonical"
  href="https://example.com/guides/html-metadata"
>
```

本地打开页面不会发生跳转，这是预期行为。

### 第 2 步：打印两个地址

正文加入：

```html
<pre id="result"></pre>
```

再加入：

```js
const canonical = document.querySelector(
  'link[rel="canonical"]'
);

const lines = [
  '当前地址：' + location.href,
  'canonical：' + canonical.href
];
```

### 第 3 步：带参数访问

使用本地服务器时，可以访问：

```text
http://localhost:8080/index.html?utm_source=test
```

你会看到当前地址包含参数，但 canonical 仍然是声明的首选地址。

### 第 4 步：理解这个实验的边界

示例使用 `example.com` 只是为了演示一个稳定的绝对规范地址。

真实项目应该替换成自己的生产域名和真实首选 URL。

### 第 5 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`<link rel="canonical" href="...">`。
- **实验辅助代码**：打印 `location.href` 和 `canonical.href`，用于对照当前地址与首选地址。

## 运行案例

建议执行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html?utm_source=test
```

## 效果验证

你应该能够确认：

- 页面存在 canonical link。
- 当前 URL 和 canonical URL 可以不同。
- 页面不会因为 canonical 自动跳转。
- 能判断“跟踪参数”和“真正改变内容的参数”为什么不能一刀切处理。
