# KP021：社交分享标题与摘要

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用常见 Open Graph 字段描述分享标题和摘要。
2. 让页面 `title`、description 与社交元信息表达同一个页面主题。
3. 理解社交平台可能存在自己的字段、回退和缓存策略。
4. 避免把同一个页面在搜索、标签页和分享卡片中描述成三个完全不同的主题。

> **本节核心代码是页面基础元信息和 `og:title`、`og:description`。**  
> JavaScript 只用于把多组元信息并排打印出来。

## 理论讲解

### 1. 常见社交字段

Open Graph 常见写法：

```html
<meta property="og:title" content="HTML 元信息指南">
<meta
  property="og:description"
  content="从 title 到社交分享卡片，理解网页 head 中的关键元信息。"
>
```

这些字段不会自动变成正文内容，主要提供给支持相应协议的分享抓取器或平台。

### 2. 与页面标题、摘要保持一致

基础元信息可能是：

```html
<title>HTML 元信息指南 - Frontend Lab</title>
<meta
  name="description"
  content="从 title 到社交分享卡片，理解网页 head 中的关键元信息。"
>
```

社交卡片可以稍作适配，但主题应一致：

```text
页面：HTML 元信息指南
分享：HTML 元信息指南
```

而不是页面讲 HTML，分享标题却写成完全不同的内容。

### 3. 为什么字段可能不完全相同

不同展示位置空间和语境不同：

- 标签页标题可能带站点名。
- 搜索摘要更强调页面内容概括。
- 社交卡片标题可以更适合分享场景。

“一致”指的是信息目标一致，不要求所有字符串逐字相同。

### 4. 平台回退策略

不同平台可能：

- 读取 Open Graph。
- 读取自己的平台专用字段。
- 缺少字段时尝试回退到其他页面元信息。
- 重新抓取或缓存已有结果。

因此不要假设所有平台都有完全相同的回退顺序。真实发布前应使用目标平台提供的分享调试工具验证。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：准备基础元信息

```html
<title>HTML 元信息指南 - Frontend Lab</title>
<meta
  name="description"
  content="从 title 到社交分享卡片，理解网页 head 中的关键元信息。"
>
```

### 第 1 步：加入 `og:title`

```html
<meta
  property="og:title"
  content="HTML 元信息指南"
>
```

### 第 2 步：加入 `og:description`

```html
<meta
  property="og:description"
  content="从 title 到社交分享卡片，理解网页 head 中的关键元信息。"
>
```

### 第 3 步：加入诊断区域

```html
<pre id="result"></pre>
```

### 第 4 步：读取四个字段

```js
function getMeta(selector) {
  return document.querySelector(selector)?.content || '(缺失)';
}
```

输出：

```js
[
  'title：' + document.title,
  'description：' + getMeta('meta[name="description"]'),
  'og:title：' + getMeta('meta[property="og:title"]'),
  'og:description：' + getMeta('meta[property="og:description"]')
]
```

### 第 5 步：检查主题一致性

阅读四行结果，确认它们都围绕“HTML 元信息指南”，只是文案长度和用途略有差异。

### 第 6 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`title`、description、`og:title`、`og:description`。
- **实验辅助代码**：`getMeta()` 和诊断输出，用于并排检查不同元信息。

## 运行案例

直接打开 [`index.html`](./index.html)，或者执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- 基础 title 与社交 title 主题一致。
- description 与 `og:description` 都能准确概括页面。
- 页面正文不会自动显示这些 meta。
- 能解释为什么不能依赖一个固定的平台回退顺序。
