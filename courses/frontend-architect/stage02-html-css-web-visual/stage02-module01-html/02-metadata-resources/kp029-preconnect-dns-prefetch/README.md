# KP029：`preconnect` 与 `dns-prefetch`

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 DNS 查询、TCP/TLS 建连与真正的资源请求。
2. 理解 `dns-prefetch` 只提前做域名解析，而 `preconnect` 会进一步尝试建立连接。
3. 知道 `preconnect` 适合少量确定会访问的重要第三方来源，不能无限添加。
4. 理解跨域资源场景下 `crossorigin` 的作用边界。
5. 能用浏览器 Network / Timing 面板判断预连接是否真的有价值。

> **本节核心代码是 `<link rel="dns-prefetch">` 与 `<link rel="preconnect">`。**  
> 页面中的 JavaScript 只用于把 `<head>` 里的提示读取出来，属于实验辅助代码。

## 理论讲解

### 1. 浏览器访问第三方资源前要经历什么

一个典型 HTTPS 资源首次访问时，通常至少会经历：

```text
DNS 查询
  ↓
TCP 建连
  ↓
TLS 握手
  ↓
HTTP 请求
  ↓
资源响应
```

如果页面已经确定稍后会访问某个重要第三方来源，可以让浏览器提前完成其中一部分工作。

### 2. `dns-prefetch`

基本写法：

```html
<link rel="dns-prefetch" href="//example.com">
```

它表达的是：

> 页面后面可能访问 `example.com`，可以提前解析这个域名。

它主要针对 DNS 阶段，不代表已经建立 TCP/TLS 连接。

### 3. `preconnect`

基本写法：

```html
<link rel="preconnect" href="https://example.com">
```

它比 `dns-prefetch` 更积极，浏览器可以提前进行：

```text
DNS
+ TCP
+ TLS（HTTPS）
```

但它仍然不是资源下载指令。

### 4. `crossorigin`

某些跨域资源连接需要使用 CORS 模式，例如跨域字体来源：

```html
<link rel="preconnect"
      href="https://fonts.example.com"
      crossorigin>
```

关键点不是“所有 preconnect 都必须加”，而是预连接时使用的凭据模式应尽量与后续真实资源请求匹配。

### 5. 连接预算

不要对所有第三方域名都加 `preconnect`。

每一次预连接都可能消耗：

- socket；
- TLS 握手；
- CPU；
- 网络能耗；
- 浏览器连接并发资源。

所以更合理的策略是：

```text
确定很快会访问 + 对首屏重要
             ↓
        优先 preconnect

可能会访问 + 只想降低 DNS 成本
             ↓
        考虑 dns-prefetch
```

### 6. 不要把它们当成资源加载

下面这些能力不是一回事：

```text
dns-prefetch → 解析域名
preconnect   → 尝试建连
preload      → 提前下载当前页明确需要的资源
prefetch     → 低优先级获取未来可能使用的资源
```

因此本节只关注“来源连接准备”，资源下载会在 KP030 单独学习。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建最小页面

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP029：preconnect 与 dns-prefetch</title>
</head>
<body>
  <h1>来源连接提示实验</h1>
</body>
</html>
```

### 第 1 步：添加 `dns-prefetch`

在 `head` 中加入：

```html
<link rel="dns-prefetch" href="//example.com">
```

这一步只表达“提前解析域名”。

### 第 2 步：添加 `preconnect`

继续加入：

```html
<link rel="preconnect" href="https://example.com">
```

现在浏览器获得了更强的连接提示。

### 第 3 步：加入跨域连接示例

继续加入：

```html
<link rel="preconnect"
      href="https://www.w3.org"
      crossorigin>
```

这里的 `crossorigin` 用于观察带跨域模式的预连接声明，不表示页面必须真的加载 W3C 资源。

### 第 4 步：把声明显示出来

在 `body` 中加入：

```html
<pre id="result"></pre>
```

再在底部加入辅助脚本：

```html
<script>
  const links = [...document.querySelectorAll(
    'link[rel="dns-prefetch"], link[rel="preconnect"]'
  )];

  document.querySelector('#result').textContent = links
    .map(link => {
      return `${link.rel} -> ${link.href} -> crossorigin=${link.crossOrigin || 'none'}`;
    })
    .join('\n');
</script>
```

这段 JavaScript 只是为了把不可见的 `<head>` 配置打印出来。

### 第 5 步：使用 Network 面板观察

通过 HTTP 服务打开页面后：

1. 打开 DevTools。
2. 切换到 Network。
3. 清空记录后重新加载。
4. 查看 Connection / Timing 信息。
5. 对比首次加载与再次加载时的差异。

注意：浏览器是否执行资源提示受缓存、连接复用、浏览器策略和当前网络环境影响，所以不能仅凭“有没有一条明显请求”判断语法是否正确。

### 第 6 步：删除提示做对照

临时注释：

```html
<link rel="preconnect" href="https://example.com">
```

再重新加载页面做对照。

实验重点是理解：

> `preconnect` 的价值来自“后续真的会访问这个来源”，而不是标签本身制造可见页面效果。

### 第 7 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`dns-prefetch`、`preconnect`、`crossorigin`。
- **实验辅助代码**：DOM 查询和文本输出，仅用于观察声明结果。

## 运行案例

本节建议通过 HTTP 服务运行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

这样更适合配合 DevTools Network / Timing 做真实网络观察。

## 效果验证

你应该能够确认：

- 页面中存在一条 `dns-prefetch` 声明。
- 页面中存在普通 `preconnect` 声明。
- 页面中存在带 `crossorigin` 的 `preconnect` 示例。
- 能解释 `dns-prefetch` 只针对 DNS，而 `preconnect` 会进一步准备连接。
- 能解释为什么不能给几十个第三方域名全部添加 `preconnect`。
- 能说明这两个提示都不会直接下载具体业务资源。
