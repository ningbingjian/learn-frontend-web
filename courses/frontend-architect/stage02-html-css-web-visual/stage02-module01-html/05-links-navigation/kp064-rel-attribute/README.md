# KP064：`rel` 属性

> 所属章节：05 · 超链接与导航
>
> 本知识点目标：理解链接 `rel` 如何声明当前文档与目标资源之间的关系，重点掌握 `noopener`、`noreferrer` 的安全 / 隐私边界，并区分常见关系类型的职责。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. rel 是链接关系，不是打开方式](#1-rel-是链接关系不是打开方式)
  - [2. noopener 隔离 window.opener](#2-noopener-隔离-windowopener)
  - [3. noreferrer 控制 Referer 信息](#3-noreferrer-控制-referer-信息)
  - [4. 其他 rel 类型不要混成安全属性](#4-其他-rel-类型不要混成安全属性)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [本节核心代码与实验辅助代码](#本节核心代码与实验辅助代码)

## 学习目标

完成本节后，你应该能够：

1. 解释 `rel` 表达的是“当前文档与目标资源之间的关系”。
2. 理解 `noopener` 解决的是 `window.opener` 脚本关系边界。
3. 理解 `noreferrer` 解决的是 Referer 信息泄露 / 传递边界。
4. 知道 `noreferrer` 通常也带来 opener 隔离效果，但它比 `noopener` 多影响一层来源信息。
5. 区分 `external`、`nofollow`、`ugc`、`sponsored` 等关系类型与浏览器安全隔离的不同职责。
6. 根据业务是否需要来源统计，选择 `noopener` 或 `noreferrer`，而不是机械地全部写上。

## 理论讲解

### 1. rel 是链接关系，不是打开方式

一个链接可以写成：

```html
<a href="https://example.com" target="_blank" rel="noopener">
  打开外部网站
</a>
```

这里三个属性职责不同：

| 属性 | 职责 |
|---|---|
| `href` | 导航到哪里 |
| `target` | 在哪个浏览上下文打开 |
| `rel` | 当前文档与目标之间是什么关系 / 采用什么关系语义 |

因此：

```html
rel="noopener"
```

不是“新窗口属性”。

如果没有 `target="_blank"`，`rel="noopener"` 仍然是一个链接关系声明；只是当导航不产生新的辅助浏览上下文时，`window.opener` 风险通常没有可观察空间。

`rel` 可以包含多个以空格分隔的 token：

```html
<a rel="noopener external" ...>...</a>
```

每个 token 表达自己的关系语义。

### 2. noopener 隔离 window.opener

当一个页面打开另一个浏览上下文时，新页面在某些场景下可能通过：

```js
window.opener
```

拿到打开它的页面引用。

如果双方允许脚本交互，这意味着目标页可能影响来源页，例如：

```js
window.opener.location = 'https://example.test/fake-login';
```

这类风险常被称为 reverse tabnabbing 相关风险。

`noopener` 的目的就是切断这条 opener 关系：

```html
<a href="./receiver.html" target="demoWindow" rel="noopener">
  使用 noopener 打开
</a>
```

目标页中：

```js
window.opener
```

应该为 `null`。

现代浏览器通常已经为 `target="_blank"` 提供隐式 opener 隔离，但工程代码仍经常显式写 `rel="noopener"`：

- 安全意图更明确；
- 对旧环境更友好；
- 代码审查时更容易理解链接的安全边界。

本节实验为了看出差异，会使用**命名 target** 创建对照，而不是只比较 `_blank`。

### 3. noreferrer 控制 Referer 信息

当浏览器从页面 A 导航到页面 B 时，B 通常可以通过 HTTP `Referer` 请求头或页面中的：

```js
document.referrer
```

知道导航来自哪里。

例如：

```html
<a href="./receiver.html" target="referrerWindow">
  普通链接
</a>
```

在同源实验中，目标页通常能看到来源 URL。

如果写：

```html
<a
  href="./receiver.html"
  target="privateWindow"
  rel="noreferrer"
>
  不发送 referrer
</a>
```

目标页的：

```js
document.referrer
```

通常为空字符串。

`noreferrer` 还会带来 opener 隔离效果，因此它通常比 `noopener` 更“重”：

- `noopener`：重点隔离脚本 opener 关系；
- `noreferrer`：额外阻止来源信息传递，并同时隔离 opener。

这也是为什么不要无脑给所有外链加 `noreferrer`。

如果业务依赖：

- 来源分析；
- 推广归因；
- 跳转链路统计；
- 合作方 referrer 校验；

那么 `noreferrer` 会改变这些数据。

### 4. 其他 rel 类型不要混成安全属性

`rel` 还有很多关系 token。

#### `external`

```html
<a href="https://example.com" rel="external">外部网站</a>
```

表示目标资源位于当前站点之外或属于外部资源关系。

它**不会自动打开新窗口**。

#### `nofollow`

```html
<a href="https://example.com" rel="nofollow">第三方链接</a>
```

主要给搜索引擎等消费者提供关系提示。

它不是浏览器脚本安全隔离机制，不能替代 `noopener`。

#### `ugc`

```html
<a href="..." rel="ugc">用户发布的链接</a>
```

用于表示 user generated content（用户生成内容）场景中的链接关系。

#### `sponsored`

```html
<a href="..." rel="sponsored">赞助链接</a>
```

用于标识广告、赞助或付费关系。

这些 token 可以按需要组合：

```html
<a
  href="https://example.com"
  target="_blank"
  rel="noopener sponsored"
>
  赞助合作页面
</a>
```

关键是：**每个 token 都应该因为真实关系而存在，而不是把所有 rel 值当成“安全套餐”复制粘贴。**

## 动手编码：从 0 到 1

本节最终源码：

- [`index.html`](./index.html)
- [`receiver.html`](./receiver.html)

### 第 1 步：建立最小实验页

**目标**：先得到一个可以放置对照链接的页面。

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KP064 - rel 属性</title>
</head>
<body>
  <h1>rel 链接关系实验</h1>
</body>
</html>
```

**为什么这样写**：先固定页面骨架，后续所有差异只来自 `rel`。

**运行后观察**：页面只有主标题。

### 第 2 步：添加不带 rel 的命名窗口对照

**目标**：创建一个可以观察 `window.opener` 的基础对照。

```html
<a href="./receiver.html?case=plain" target="plainRelWindow">
  普通命名窗口
</a>
```

**为什么这样写**：现代 `_blank` 通常已经隐式隔离 opener，因此本实验使用普通命名 target 来更清晰地观察 `noopener` 的差异。

**运行后观察**：目标页会打印 `window.opener` 是否存在。

### 第 3 步：加入 noopener

**目标**：验证 opener 关系被切断。

```html
<a
  href="./receiver.html?case=noopener"
  target="noopenerRelWindow"
  rel="noopener"
>
  noopener
</a>
```

**为什么这样写**：只增加 `rel="noopener"`，目标 URL 仍是同一个 receiver 页面。

**运行后观察**：receiver 页面中应显示：

```text
window.opener 是否存在：false
```

### 第 4 步：加入 noreferrer

**目标**：观察 Referer / `document.referrer` 的变化。

```html
<a
  href="./receiver.html?case=noreferrer"
  target="noreferrerRelWindow"
  rel="noreferrer"
>
  noreferrer
</a>
```

**为什么这样写**：把来源信息传递和 opener 隔离放在一个真实导航实验里观察。

**运行后观察**：目标页通常会显示：

```text
document.referrer：(empty)
window.opener 是否存在：false
```

### 第 5 步：创建 receiver 页面

**目标**：把安全 / 隐私边界直接显示出来。

```html
<pre id="result"></pre>

<script>
  const params = new URLSearchParams(location.search);

  document.querySelector('#result').textContent = [
    `case：${params.get('case')}`,
    `document.referrer：${document.referrer || '(empty)'}`,
    `window.opener 是否存在：${Boolean(window.opener)}`
  ].join('\n');
</script>
```

**为什么这样写**：`window.opener` 和 `document.referrer` 分别对应两种不同的信息 / 权限边界。

**运行后观察**：三个链接的输出应该有明显差异。

### 第 6 步：加入关系类型示例

**目标**：理解 rel 不只是安全 token。

```html
<a href="https://example.com" rel="external">外部资源</a>
<a href="https://example.com" rel="nofollow">nofollow 示例</a>
<a href="https://example.com" rel="ugc">UGC 示例</a>
<a href="https://example.com" rel="sponsored">赞助关系示例</a>
```

**为什么这样写**：这些 token 表达的是不同关系，不应该和 `noopener` / `noreferrer` 混为一谈。

**运行后观察**：它们不会因为 rel 值本身就自动变成新窗口链接。

### 第 7 步：打印 rel token

**目标**：从 DOM 中观察 rel 的 token 集合。

```html
<pre id="relations"></pre>

<script>
  const rows = [...document.querySelectorAll('a[data-rel-demo]')].map(link =>
    `${link.textContent.trim()} → rel=[${[...link.relList].join(', ')}]`
  );

  document.querySelector('#relations').textContent = rows.join('\n');
</script>
```

**为什么这样写**：`relList` 能帮助理解一个 `rel` 属性实际上可以包含多个独立 token。

**运行后观察**：页面会列出每个链接的关系 token。

## 运行案例

建议通过本地 HTTP Server 运行。

本节尤其推荐 HTTP 环境，因为 `document.referrer`、导航和本地文件策略在 `file://` 环境下可能与真实网站不同。

测试顺序：

1. 点击“普通命名窗口”；
2. 记录 `document.referrer` 和 `window.opener`；
3. 点击 `noopener`；
4. 点击 `noreferrer`；
5. 对比三个 receiver 页面的输出。

> 浏览器安全策略可能继续收紧某些导航关系，因此实验输出应以当前浏览器实际结果为准；核心判断是理解每个 rel token 想建立或切断什么关系，而不是死记某个浏览器版本的偶然表现。

## 效果验证

完成案例后检查：

1. 能解释 `target` 与 `rel` 分别解决什么问题。
2. `noopener` 目标页中 `window.opener` 应不可用。
3. `noreferrer` 目标页中 `document.referrer` 通常为空。
4. `noreferrer` 场景中 opener 同样应被隔离。
5. `external` 不会自动新开窗口。
6. `nofollow`、`ugc`、`sponsored` 不是 `noopener` 的替代品。
7. 能解释为什么需要来源分析时不应无脑使用 `noreferrer`。
8. 页面辅助输出能列出每个链接的 `relList` token。

## 本节核心代码与实验辅助代码

### 本节核心代码

```html
<a href="..." target="..." rel="noopener">...</a>
<a href="..." target="..." rel="noreferrer">...</a>
<a href="..." rel="external">...</a>
<a href="..." rel="nofollow ugc">...</a>
```

核心知识是：

- `noopener`：opener 脚本关系边界；
- `noreferrer`：来源信息边界，并同时带来 opener 隔离；
- 其他 rel token：表达不同类型的链接关系。

### 实验辅助代码

- `receiver.html` 用于显示实验结果；
- `document.referrer` 用于观察来源信息；
- `window.opener` 用于观察 opener 关系；
- `relList` 用于列出 rel token；
- CSS 只负责实验页面可读性。

这些辅助代码都不是 `<a rel="...">` 的必要组成部分。