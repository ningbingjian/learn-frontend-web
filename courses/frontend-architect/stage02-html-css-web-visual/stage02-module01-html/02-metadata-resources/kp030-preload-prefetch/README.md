# KP030：`preload` 与 `prefetch`

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `preload` 用于当前页面明确需要的重要资源。
2. 理解 `prefetch` 面向未来导航或后续可能使用的资源，通常优先级更低。
3. 正确使用 `as` 告诉浏览器预加载资源的类型。
4. 理解 preload 资源必须真正被页面消费，否则可能造成无效下载。
5. 能解释错误的 URL、`as`、CORS 配置为什么可能导致重复下载。
6. 能通过 DevTools Network 面板检查资源的 Initiator、Priority、缓存与实际使用情况。

> **本节核心代码是 `<link rel="preload">` 与 `<link rel="prefetch">`。**  
> `critical.css` 和 `next-page.html` 是为了让资源提示拥有真实目标文件，不是新的 HTML 核心知识点。

## 理论讲解

### 1. `preload`：当前页面马上会用

典型写法：

```html
<link rel="preload" href="./critical.css" as="style">
<link rel="stylesheet" href="./critical.css">
```

这里的含义是：

> 浏览器，请尽早获取 `critical.css`，当前页面很快就会使用它。

随后普通 stylesheet 声明会真正消费这个资源。

### 2. `prefetch`：未来可能会用

典型写法：

```html
<link rel="prefetch" href="./next-page.html" as="document">
```

它表达的是：

> 当前页面不急着用，但用户下一步有可能访问这个资源，可以在空闲时提前获取。

因此它不应该抢占当前首屏关键资源的带宽。

### 3. `as` 为什么重要

`as` 告诉浏览器资源的用途，例如：

```text
style
script
font
image
fetch
document
```

它会影响：

- 请求优先级；
- Content Security Policy 匹配；
- Accept 请求头；
- 缓存复用；
- CORS 处理。

所以不要为了“语法完整”随便写一个 `as`。

### 4. preload 必须被真正使用

错误思路：

```html
<link rel="preload" href="huge.css" as="style">
```

但页面后面完全没有使用 `huge.css`。

这样可能产生：

```text
提前占用带宽
   ↓
资源下载完成
   ↓
页面根本没消费
   ↓
性能反而变差
```

因此 preload 是一种高承诺提示。

### 5. 重复下载风险

要让预加载结果被后续请求复用，多个条件需要匹配，例如：

- URL 一致；
- 资源用途一致；
- CORS 模式一致；
- 字体等跨域资源的 `crossorigin` 配置一致。

如果配置不匹配，浏览器可能认为这是两个不同请求，从而重新下载。

### 6. `preload` 与 `prefetch` 的选择

可以先用一个简单判断：

```text
当前页面确定需要？
  ├─ 是，而且希望更早下载 → preload
  └─ 否
       ↓
未来页面可能需要？
  ├─ 是 → prefetch
  └─ 否 → 不要添加资源提示
```

### 7. 与 KP029 的关系

KP029 是：

```text
提前准备“来源连接”
```

KP030 是：

```text
提前获取“具体资源”
```

因此：

```text
preconnect != preload
```

一个针对 origin，一个针对具体 URL。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建最小页面

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP030：preload 与 prefetch</title>
</head>
<body>
  <h1>资源优先级提示实验</h1>
</body>
</html>
```

### 第 1 步：准备当前页真正会使用的 CSS

创建 `critical.css`：

```css
body {
  font-family: system-ui, sans-serif;
  max-width: 760px;
  margin: 40px auto;
  line-height: 1.7;
}

.notice {
  padding: 16px;
  border: 1px solid currentColor;
}
```

这份资源稍后会被当前页面真正使用。

### 第 2 步：给 CSS 增加 preload

在 `head` 中加入：

```html
<link rel="preload" href="./critical.css" as="style">
```

这一步只负责提前获取，不负责把 CSS 应用到页面。

### 第 3 步：真正消费预加载的 CSS

紧接着加入：

```html
<link rel="stylesheet" href="./critical.css">
```

现在流程是：

```text
preload 提前获取
      ↓
stylesheet 真正使用
```

### 第 4 步：准备未来页面

创建 `next-page.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP030：未来页面</title>
</head>
<body>
  <h1>这是可能下一步访问的页面</h1>
</body>
</html>
```

### 第 5 步：加入 prefetch

在主页 `head` 中加入：

```html
<link rel="prefetch" href="./next-page.html" as="document">
```

这表示浏览器可以在合适的时候低优先级准备未来页面。

### 第 6 步：加入正常导航链接

在 `body` 中加入：

```html
<p class="notice">
  当前页使用了预加载的 critical.css。
</p>

<p>
  <a href="./next-page.html">打开未来页面</a>
</p>
```

注意：`prefetch` 不等于导航。真正发生页面跳转的仍然是普通 `<a>`。

### 第 7 步：打印资源提示

为了确认 `<head>` 里的配置，在页面中加入：

```html
<pre id="result"></pre>

<script>
  const hints = [...document.querySelectorAll(
    'link[rel="preload"], link[rel="prefetch"]'
  )];

  document.querySelector('#result').textContent = hints
    .map(link => `${link.rel} -> ${link.getAttribute('href')} -> as=${link.as}`)
    .join('\n');
</script>
```

JavaScript 只用于辅助观察，不是 preload / prefetch 的必需代码。

### 第 8 步：使用 Network 面板验证

通过 HTTP 服务运行页面：

1. 打开 DevTools → Network。
2. 勾选 Disable cache 做首次加载实验。
3. 刷新 `index.html`。
4. 查找 `critical.css`。
5. 观察它被 preload 提前发现，随后被 stylesheet 使用。
6. 查找 `next-page.html`，观察浏览器是否执行 prefetch。
7. 点击“打开未来页面”，观察缓存和再次请求行为。

不同浏览器可能根据带宽、省流量模式、缓存状态决定是否真正执行 prefetch，所以重点是理解其语义与优先级，而不是要求每次实验都出现完全相同的时序。

### 第 9 步：制造一个错误实验

临时把：

```html
<link rel="preload" href="./critical.css" as="style">
```

改成错误类型，例如：

```html
<link rel="preload" href="./critical.css" as="script">
```

重新观察 Network 和 Console。

这个实验用于证明：

> `as` 不是注释，而是资源加载语义的一部分。

实验完成后恢复 `as="style"`。

### 第 10 步：完成案例并对照最终源码

最终源码包括：

```text
kp030-preload-prefetch/
├── README.md
├── index.html
├── critical.css
└── next-page.html
```

本节总结：

- **本节核心代码**：`rel="preload"`、`rel="prefetch"`、`as`。
- **实验辅助文件**：`critical.css` 和 `next-page.html`，用于制造真实的当前页与未来页资源。
- **实验辅助 JavaScript**：读取 `<head>` 配置并显示结果。

## 运行案例

本节必须优先通过 HTTP 服务运行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

不要只依赖 `file://` 双击方式判断 preload / prefetch 的网络行为。

## 效果验证

你应该能够确认：

- `critical.css` 通过 `preload as="style"` 提前声明。
- 同一个 `critical.css` 随后通过 stylesheet 真正应用到页面。
- `next-page.html` 使用 `prefetch as="document"` 声明为未来资源。
- 页面仍然使用普通 `<a>` 完成真实导航。
- 能解释 preload 为什么必须谨慎使用。
- 能解释 `as` 配置错误为什么可能造成请求无法复用或行为异常。
- 能明确区分 `preconnect`、`preload` 和 `prefetch` 三类资源提示。
