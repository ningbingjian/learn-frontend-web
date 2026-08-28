# KP058：根相对地址与文档相对地址

> 所属章节：05 · 超链接与导航
>
> 本知识点目标：理解 `/` 根相对路径、`./` 与 `../` 文档相对路径，以及子路径部署时不同写法会带来的影响。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. 根相对路径](#1-根相对路径)
  - [2. 文档相对路径](#2-文档相对路径)
  - [3. 子路径部署为什么容易出问题](#3-子路径部署为什么容易出问题)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

完成本节后，你应该能够：

1. 解释 `/assets/app.css` 为什么从站点 origin 根路径开始解析。
2. 解释 `./detail.html` 为什么从当前文档目录开始解析。
3. 使用 `../` 返回上一级目录。
4. 判断根相对路径和文档相对路径在子路径部署中的差异。
5. 使用浏览器 URL 解析结果验证自己的判断。

## 理论讲解

### 1. 根相对路径

根相对路径通常以 `/` 开头：

```html
<a href="/products/list.html">商品列表</a>
```

这里的 `/` 表示当前 **origin 的路径根**。

假设当前页面是：

```text
https://learn.example.com/course/html/index.html
```

那么：

```text
/products/list.html
```

会解析为：

```text
https://learn.example.com/products/list.html
```

它不会保留 `/course/html/` 这一段目录。

因此要特别注意：

> 浏览器中的 `/` 是 URL origin 的路径根，不是你电脑磁盘的“项目根目录”概念。

如果网站部署在：

```text
https://example.com/my-app/
```

代码却写：

```html
<a href="/settings">设置</a>
```

最终目标是：

```text
https://example.com/settings
```

而不是：

```text
https://example.com/my-app/settings
```

这就是子路径部署中常见的路径问题之一。

### 2. 文档相对路径

文档相对路径从当前文档所在位置进行解析。

#### `./`：当前目录

```html
<a href="./index.html">当前目录中的 index.html</a>
```

如果当前页面是：

```text
https://example.com/course/kp058/page.html
```

它会解析到：

```text
https://example.com/course/kp058/index.html
```

#### `../`：上一级目录

```html
<a href="../kp057-absolute-relative-url/index.html">
  上一个知识点
</a>
```

浏览器会先从当前目录返回一级，再继续拼接剩余路径。

还可以连续返回多级：

```text
../../assets/logo.svg
```

但层级过深时可读性会下降，工程中通常会配合构建工具、路由器或统一资源基准管理。

### 3. 子路径部署为什么容易出问题

假设应用部署在：

```text
https://example.com/docs/app/
```

页面位于：

```text
https://example.com/docs/app/help/index.html
```

两种链接：

```html
<a href="/about.html">根相对</a>
<a href="./about.html">文档相对</a>
```

会分别解析为：

```text
https://example.com/about.html
https://example.com/docs/app/help/about.html
```

所以不要只问“哪个写法更好”，而要先问：

- 资源真正位于 origin 根目录吗？
- 页面是否可能部署到 `/docs/`、`/app/` 等子路径？
- 项目是否由框架或构建工具提供 base path 配置？

根相对路径很适合“明确从站点根开始”的资源；文档相对路径更贴近当前文件结构。

## 动手编码：从 0 到 1

本节最终源码：[`index.html`](./index.html)

### 第 1 步：创建最小页面

**目标**：建立一个用于路径解析实验的页面。

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KP058 - 根相对与文档相对</title>
</head>
<body>
  <h1>路径解析实验</h1>
</body>
</html>
```

**为什么这样写**：路径必须结合当前页面的真实 URL 才能理解。

**运行后观察**：页面只有主标题。

### 第 2 步：加入根相对链接

**目标**：观察 `/` 如何跳过当前目录层级。

```html
<a data-demo href="/05-links-navigation/kp058-root-document-relative-url/index.html?type=root#demo">
  根相对地址
</a>
```

**为什么这样写**：本案例推荐从模块根目录启动 HTTP Server，所以 `/05-links-navigation/...` 能明确从服务器根开始解析。

**运行后观察**：解析后的 URL 从 `http://localhost:8080/` 后直接进入 `05-links-navigation/...`。

### 第 3 步：加入 `./` 与 `../`

**目标**：观察当前目录与父目录解析。

```html
<a data-demo href="./index.html?type=current#demo">
  当前目录相对地址
</a>

<a data-demo href="../kp057-absolute-relative-url/index.html">
  返回上一个知识点
</a>
```

**为什么这样写**：两个链接分别代表“当前目录”和“上一级目录后再进入另一个目录”。

**运行后观察**：三个链接最终都被浏览器解析成绝对 URL，但路径部分不同。

### 第 4 步：打印 raw 与 resolved URL

**目标**：避免仅靠肉眼猜测路径。

```html
<pre id="result"></pre>

<script>
  const lines = [...document.querySelectorAll('a[data-demo]')].flatMap((link) => [
    link.textContent.trim(),
    `raw: ${link.getAttribute('href')}`,
    `resolved: ${link.href}`,
    ''
  ]);

  document.querySelector('#result').textContent = lines.join('\n');
</script>
```

**为什么这样写**：`getAttribute()` 保留作者写法，`link.href` 展示浏览器解析后的完整地址。

**运行后观察**：可以直接对照 `/`、`./`、`../` 三种形式。

## 运行案例

本节建议不要使用 `file://` 直接双击运行，因为根相对路径最适合在 HTTP origin 中观察。

进入：

```text
courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html
```

执行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/05-links-navigation/kp058-root-document-relative-url/index.html
```

## 效果验证

完成案例后检查：

1. `/05-links-navigation/...` 从 `localhost:8080` 的路径根开始。
2. `./index.html` 保留当前知识点目录。
3. `../kp057-...` 先回到 `05-links-navigation/`，再进入 KP057 目录。
4. 三种写法的 raw href 保持原字符串。
5. 三种写法的 `link.href` 都变成完整 URL。
6. 如果把应用整体放入额外子路径，能解释为什么根相对路径可能越过这个子路径。

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<a href="/from-origin-root">根相对</a>
<a href="./same-directory.html">当前目录</a>
<a href="../parent-directory.html">父目录</a>
```

### 实验辅助代码

JavaScript 只负责打印：

- `getAttribute('href')`；
- `link.href`；
- 当前 `location.href`。

这些代码用于验证浏览器解析规则，不属于链接路径语法本身。