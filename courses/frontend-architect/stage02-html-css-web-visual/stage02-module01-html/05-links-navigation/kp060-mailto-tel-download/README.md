# KP060：`mailto`、`tel` 与 `download`

> 所属章节：05 · 超链接与导航
>
> 本知识点目标：掌握邮件、电话协议链接和下载链接的基本语法，理解文件名只是下载建议，并认识不同平台与浏览器的行为边界。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. `mailto:` 邮件链接](#1-mailto-邮件链接)
  - [2. `tel:` 电话链接](#2-tel-电话链接)
  - [3. `download` 下载建议](#3-download-下载建议)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

完成本节后，你应该能够：

1. 使用 `mailto:` 构造邮件链接。
2. 对邮件主题和正文等参数进行 URL 编码。
3. 使用 `tel:` 表达电话号码链接。
4. 使用 `download` 为同源文件提供下载文件名建议。
5. 理解协议链接依赖操作系统和用户配置，网页无法保证一定存在对应处理程序。
6. 理解 `download` 不是强制安全边界，浏览器、来源和响应头都可能影响最终行为。

## 理论讲解

### 1. `mailto:` 邮件链接

最简单的邮件链接：

```html
<a href="mailto:hello@example.com">发送邮件</a>
```

点击后，浏览器会尝试交给系统或浏览器配置的邮件处理程序。

这不等于网页“自己发送邮件”。网页只是发起一个协议导航请求，最终是否打开：

- 本地邮件客户端；
- Web Mail；
- 系统选择器；
- 或根本没有可用处理程序；

取决于用户环境。

`mailto:` 还可以带查询参数：

```text
mailto:hello@example.com?subject=HTML%20课程咨询&body=你好
```

实际工程里不要手写复杂编码，应该对动态参数使用：

```js
encodeURIComponent(value)
```

例如：

```js
const subject = encodeURIComponent('HTML 课程咨询');
const body = encodeURIComponent('你好，我想了解课程。');
const url = `mailto:hello@example.com?subject=${subject}&body=${body}`;
```

> 邮件地址和正文可能包含隐私信息。不要把敏感数据无意写入公开页面 URL、日志或分析系统。

### 2. `tel:` 电话链接

电话号码可以写成：

```html
<a href="tel:+15551234567">拨打示例电话</a>
```

移动设备通常更容易识别并交给拨号器处理；桌面设备可能：

- 打开通话应用；
- 询问使用哪个程序；
- 没有任何可用处理程序。

因此：

> `tel:` 表达“这是一个电话号码动作”，但不保证所有平台点击后都出现相同界面。

机器值建议尽量使用明确的国际格式，而展示文本可以更适合当地用户阅读。

例如：

```html
<a href="tel:+15551234567">+1 (555) 123-4567</a>
```

### 3. `download` 下载建议

普通链接：

```html
<a href="./sample.txt">打开 sample.txt</a>
```

增加 `download`：

```html
<a href="./sample.txt" download>下载 sample.txt</a>
```

还可以提供文件名建议：

```html
<a href="./sample.txt" download="frontend-link-notes.txt">
  下载学习笔记
</a>
```

这里：

```text
frontend-link-notes.txt
```

是**建议文件名**。

最终文件名可能被浏览器调整，例如：

- 替换非法文件名字符；
- 根据响应头决定名称；
- 根据平台规则处理扩展名。

另外，`download` 对跨来源资源存在限制，浏览器可能忽略它；同源文件最适合用于基础实验。

`download` 也不能绕过服务器权限、身份验证、浏览器安全策略或 HTTP 响应头。

## 动手编码：从 0 到 1

本节最终源码：

- [`index.html`](./index.html)
- [`sample.txt`](./sample.txt)

### 第 1 步：创建最小 HTML 页面

**目标**：建立协议链接实验页。

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KP060 - mailto tel download</title>
</head>
<body>
  <h1>协议与下载链接</h1>
</body>
</html>
```

**为什么这样写**：先准备最小运行环境，再分别增加三类链接。

**运行后观察**：只有页面标题。

### 第 2 步：增加邮件链接

**目标**：表达邮件操作。

```html
<a href="mailto:hello@example.com?subject=HTML%20课程咨询">
  发送课程咨询邮件
</a>
```

**为什么这样写**：`mailto:` 是 URI scheme，点击后交给用户环境中的邮件处理程序。

**运行后观察**：不同系统可能打开不同应用；没有配置邮件程序时行为可能不同。

### 第 3 步：增加电话链接

**目标**：表达拨号操作。

```html
<a href="tel:+15551234567">
  拨打示例电话：+1 (555) 123-4567
</a>
```

**为什么这样写**：机器值保持紧凑，显示文本保持可读。

**运行后观察**：手机和桌面设备可能出现不同处理方式。

### 第 4 步：创建真实下载文件

**目标**：让 `download` 有真实同源资源可以下载。

创建：

```text
sample.txt
```

文件内容：

```text
HTML link demo
This file is used by KP060 to verify the download attribute.
```

然后加入：

```html
<a href="./sample.txt" download="frontend-link-notes.txt">
  下载学习笔记
</a>
```

**为什么这样写**：同源本地文件最适合验证 `download` 基本行为和文件名建议。

**运行后观察**：浏览器通常会触发下载，并使用建议文件名或经过平台调整后的文件名。

### 第 5 步：输出链接元数据

**目标**：观察协议和 `download` 属性。

```js
const links = document.querySelectorAll('a[data-demo]');

for (const link of links) {
  console.log({
    href: link.getAttribute('href'),
    protocol: new URL(link.href).protocol,
    download: link.getAttribute('download')
  });
}
```

最终案例把结果打印在页面中。

**为什么这样写**：实验代码只负责读属性，不改变链接行为。

## 运行案例

推荐在当前模块根目录执行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/05-links-navigation/kp060-mailto-tel-download/index.html
```

使用 HTTP Server 可以确保 `sample.txt` 与页面处于同一 origin，便于验证 `download`。

## 效果验证

完成案例后检查：

1. 邮件链接的协议是 `mailto:`。
2. 邮件主题经过 URL 编码。
3. 电话链接的协议是 `tel:`。
4. `download` 链接指向真实存在的 `sample.txt`。
5. DOM 中能读取 `download="frontend-link-notes.txt"`。
6. 点击下载链接后，浏览器执行下载或按平台规则处理。
7. 能解释为什么邮件和电话链接不能保证所有设备出现完全相同的应用界面。

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<a href="mailto:hello@example.com">发送邮件</a>
<a href="tel:+15551234567">拨打电话</a>
<a href="./sample.txt" download="frontend-link-notes.txt">下载文件</a>
```

### 实验辅助代码

案例中的 JavaScript 只用于打印：

- raw `href`；
- URL protocol；
- `download` 属性值。

`sample.txt` 是为了真实验证下载行为的实验资源。