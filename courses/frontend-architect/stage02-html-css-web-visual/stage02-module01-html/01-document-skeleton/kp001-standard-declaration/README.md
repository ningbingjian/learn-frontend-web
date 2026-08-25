# KP001：HTML 标准声明

> 节点：`node-02-01-01-01-01-01-01-01`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 正确写出 HTML 标准声明 `<!doctype html>`。
2. 知道 DOCTYPE 应位于完整 HTML 文档最前面。
3. 能通过 `document.compatMode` 判断标准模式和怪异模式。
4. 知道 DOCTYPE 在 DOM 中对应 `DocumentType` 节点。
5. 能从空文件开始亲手完成本节验证案例。

> **本节核心代码只有 `<!doctype html>`。**  
> `document.compatMode`、`document.doctype` 和 DOM 查询都属于实验辅助代码，本节不要求掌握这些 JavaScript API 的完整用法。

## 理论讲解

### 1. 标准声明语法

现代 HTML 文档使用：

```html
<!doctype html>
```

它是文档类型声明，不是普通 HTML 标签，因此没有结束标签。浏览器对大小写较宽容，但项目中通常统一使用简短的小写形式。

### 2. 声明应该放在哪里

DOCTYPE 应位于完整 HTML 文档最前部：

```html
<!doctype html>
<html lang="zh-CN">
  ...
</html>
```

组件模板和 HTML 片段不需要重复声明；真正返回给浏览器的完整文档只声明一次。

### 3. DOCTYPE 与文档模式

标准声明通常让现代浏览器进入 Standards Mode：

```js
document.compatMode // "CSS1Compat"
```

缺少可识别 DOCTYPE 时，页面仍可能显示，但通常进入 Quirks Mode：

```js
document.compatMode // "BackCompat"
```

所以：

> 页面“能够显示”不能证明文档入口正确。

### 4. DOCTYPE 在 DOM 中是什么

浏览器会把声明表示为 `DocumentType` 节点：

```js
document.doctype.name             // "html"
document.doctype.constructor.name // "DocumentType"
```

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：明确实验目标

本节要验证三个问题：

1. 不写 DOCTYPE 时浏览器采用什么模式？
2. 加上标准声明后模式是否变化？
3. 浏览器如何在 DOM 中表示 DOCTYPE？

### 第 1 步：创建一个暂时没有 DOCTYPE 的页面

新建 `index.html`：

```html
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP001：HTML 标准声明</title>
</head>
<body>
  <h1>HTML 标准声明</h1>
  <p>先观察没有 DOCTYPE 时的文档模式。</p>
</body>
</html>
```

保存并打开页面。你会发现页面仍然能显示，但这并不能说明文档处于标准模式。

### 第 2 步：第一次观察文档模式

打开开发者工具 Console，输入：

```js
document.compatMode
```

没有 DOCTYPE 时通常得到：

```text
BackCompat
```

记住第一组因果关系：

```text
没有 DOCTYPE
      ↓
BackCompat
```

### 第 3 步：加入标准声明

在文件第一行加入：

```html
<!doctype html>
```

保存并刷新，再执行：

```js
document.compatMode
```

此时应得到：

```text
CSS1Compat
```

现在已经完成最核心的对照：

```text
无 DOCTYPE  → BackCompat
有 DOCTYPE  → CSS1Compat
```

### 第 4 步：把结果显示到页面

在正文中加入：

```html
<pre id="result"></pre>
```

在 `</body>` 前加入：

```html
<script>
  document.querySelector('#result').textContent =
    'document.compatMode = ' + document.compatMode;
</script>
```

刷新后，页面会直接显示当前模式。

> 这段 JavaScript 只是帮助我们“看见”浏览器内部状态。

### 第 5 步：继续观察 DOCTYPE 名称

把脚本改成：

```html
<script>
  const lines = [
    'document.compatMode = ' + document.compatMode,
    'document.doctype.name = ' + document.doctype.name
  ];

  document.querySelector('#result').textContent = lines.join('\n');
</script>
```

刷新后应看到：

```text
document.compatMode = CSS1Compat
document.doctype.name = html
```

### 第 6 步：观察 DOM 节点类型

再加入一项：

```js
'doctype 节点类型 = ' + document.doctype.constructor.name
```

结果应包含：

```text
doctype 节点类型 = DocumentType
```

### 第 7 步：让删除 DOCTYPE 后也能正常观察

删除 DOCTYPE 后，`document.doctype` 会变成 `null`。为了让实验不会报错，把读取方式改成：

```js
document.doctype?.name ?? '不存在'
document.doctype?.constructor.name ?? '不存在'
```

最终脚本为：

```html
<script>
  const lines = [
    'document.compatMode = ' + document.compatMode,
    'document.doctype.name = ' + (document.doctype?.name ?? '不存在'),
    'doctype 节点类型 = ' + (document.doctype?.constructor.name ?? '不存在')
  ];

  document.querySelector('#result').textContent = lines.join('\n');
</script>
```

> `?.` 和 `??` 仍然只是实验辅助语法，不是本节重点。

### 第 8 步：完成案例并对照最终源码

到这里，你已经从空文件完成了整个实验。最终代码应与仓库中的 [`index.html`](./index.html) 一致。

本节最后只需要记住两层：

- **核心代码**：`<!doctype html>`，决定现代页面进入标准模式。
- **实验辅助代码**：`document.compatMode`、`document.doctype` 和结果展示逻辑，用来验证核心结论。

不需要在 README 中再重复复制一遍最终源码；真正的最终版本以 [`index.html`](./index.html) 为准。

## 运行案例

### 方式一：直接打开

直接使用浏览器打开 [`index.html`](./index.html)。

### 方式二：本地服务器

在当前目录执行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

推荐顺序：保留 DOCTYPE 运行一次 → 删除第一行刷新 → 恢复第一行再次刷新。

## 效果验证

保留 DOCTYPE 时应看到：

```text
document.compatMode = CSS1Compat
document.doctype.name = html
doctype 节点类型 = DocumentType
```

删除 DOCTYPE 后应看到类似：

```text
document.compatMode = BackCompat
document.doctype.name = 不存在
doctype 节点类型 = 不存在
```

最终应能够解释：

```text
<!doctype html>
      ↓
浏览器识别标准文档入口
      ↓
Standards Mode
      ↓
document.compatMode = CSS1Compat
```
