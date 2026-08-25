# KP001：HTML 标准声明

> 节点：`node-02-01-01-01-01-01-01-01`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [完整源码讲解](#完整源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 正确写出 HTML5 的标准文档类型声明：`<!doctype html>`。
2. 知道 DOCTYPE 应该放在完整 HTML 文档的什么位置。
3. 能通过 `document.compatMode` 判断浏览器当前使用标准模式还是怪异模式。
4. 知道 `document.doctype` 在 DOM 中对应 `DocumentType` 节点。
5. 能亲手从一个空文件开始，逐步完成本节的验证案例。

> **本节真正需要掌握的核心代码只有 `<!doctype html>`。**  
> 案例中的 JavaScript 只是为了把浏览器内部状态显示出来，属于“实验辅助代码”。本节不要求你掌握这些 JavaScript API 的完整用法。

## 理论讲解

### 1. 标准声明语法

现代 HTML 文档使用下面的声明：

```html
<!doctype html>
```

它叫做 **文档类型声明（Document Type Declaration）**，不是普通 HTML 标签，因此没有结束标签。

HTML 解析对大小写比较宽容，例如下面的写法浏览器通常也能识别：

```html
<!DOCTYPE html>
```

但现代项目通常统一使用简短的小写形式：

```html
<!doctype html>
```

### 2. 声明应该放在哪里

DOCTYPE 应位于完整 HTML 文档的最前部，也就是 `html` 根元素之前：

```html
<!doctype html>
<html lang="zh-CN">
  ...
</html>
```

组件模板、局部 HTML 片段不需要重复写 DOCTYPE。真正返回给浏览器的完整 HTML 文档只需要声明一次。

### 3. DOCTYPE 和浏览器文档模式

浏览器解析页面时，会根据文档入口决定采用哪种兼容模式。

现代标准声明通常会让浏览器进入 **Standards Mode（标准模式）**。

可以通过下面的浏览器 API 查看当前模式：

```js
document.compatMode
```

常见结果：

```text
CSS1Compat
```

表示标准模式。

如果完整 HTML 文档缺少正确的 DOCTYPE，浏览器可能进入 **Quirks Mode（怪异模式）**：

```text
BackCompat
```

所以：

> 页面“能够显示”并不能证明 HTML 文档入口是正确的。

### 4. DOCTYPE 在 DOM 中是什么

浏览器会把 DOCTYPE 表示为一个 `DocumentType` 节点。

可以观察：

```js
document.doctype
```

标准 HTML 文档中：

```js
document.doctype.name
```

通常得到：

```text
html
```

节点类型则可以观察：

```js
document.doctype.constructor.name
```

结果通常为：

```text
DocumentType
```

---

# 动手编码：从 0 到 1 完成案例

这一部分不要先打开最终 `index.html` 抄答案。

建议你新建一个空的 `index.html`，按照下面的步骤自己敲一遍。每完成一步就运行一次，观察结果为什么发生变化。

## 第 0 步：明确我们要验证什么

本节要亲手验证三个问题：

1. 不写 DOCTYPE 时，浏览器采用什么模式？
2. 加上 `<!doctype html>` 后，浏览器模式会不会变化？
3. DOCTYPE 在 DOM 中到底是什么节点？

最终我们会做出一个页面，把这些结果直接显示出来。

## 第 1 步：创建一个暂时没有 DOCTYPE 的 HTML 文档

新建：

```text
index.html
```

先写下面的代码，**暂时不要写 `<!doctype html>`**：

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

保存后，用浏览器打开页面。

你会发现：

> 页面依然可以正常显示。

这正是本节第一个容易产生的误区：

```text
页面能显示
   ≠
文档入口一定正确
```

所以接下来不能只看页面外观，而要观察浏览器内部采用的文档模式。

## 第 2 步：第一次观察 `document.compatMode`

打开浏览器开发者工具，在 Console 中输入：

```js
document.compatMode
```

在没有 DOCTYPE 的这个实验页面中，你通常会看到：

```text
BackCompat
```

它表示浏览器当前处于怪异模式。

此时先记住这个结果：

```text
没有 DOCTYPE
      ↓
BackCompat
```

> `document.compatMode` 是本节的**实验辅助 API**。你现在只需要知道它能帮助我们观察文档模式，不需要深入学习 JavaScript DOM API。

## 第 3 步：在第一行加入标准声明

现在回到 `index.html`。

在整个文件最前面加入：

```html
<!doctype html>
```

文件变成：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP001：HTML 标准声明</title>
</head>
<body>
  <h1>HTML 标准声明</h1>
  <p>现在已经加入标准 DOCTYPE。</p>
</body>
</html>
```

保存并刷新浏览器。

再次在 Console 中输入：

```js
document.compatMode
```

现在应该看到：

```text
CSS1Compat
```

于是我们第一次通过自己写代码得到完整对照：

```text
没有 <!doctype html>
        ↓
   BackCompat

加入 <!doctype html>
        ↓
   CSS1Compat
```

到这里，本节最核心的知识点其实已经验证完成了。

## 第 4 步：把观察结果显示到页面上

一直打开 Console 不够直观，所以接下来把结果直接显示到页面正文中。

先在 `body` 中加入：

```html
<pre id="result"></pre>
```

此时 `body` 可以写成：

```html
<body>
  <h1>HTML 标准声明</h1>
  <p>下面的数据直接来自当前文档。</p>

  <pre id="result"></pre>
</body>
```

`pre` 用来显示我们稍后生成的文本结果。

接着，在 `</body>` 前加入：

```html
<script>
  document.querySelector('#result').textContent =
    'document.compatMode = ' + document.compatMode;
</script>
```

刷新页面后，你应该直接看到：

```text
document.compatMode = CSS1Compat
```

### 这一段 JavaScript 需要现在学会吗？

不需要。

本节只要知道它做了两件事：

```text
document.compatMode
        ↓
读取浏览器当前文档模式
        ↓
document.querySelector(...).textContent
        ↓
把结果显示到页面上
```

它只是帮助我们“看见”实验结果。

## 第 5 步：继续观察 DOCTYPE 的名称

我们已经知道当前是标准模式，现在进一步确认浏览器真的识别到了 DOCTYPE。

先观察：

```js
document.doctype.name
```

为了同时显示多行结果，把之前的脚本改成数组：

```html
<script>
  const lines = [
    'document.compatMode = ' + document.compatMode,
    'document.doctype.name = ' + document.doctype.name
  ];

  document.querySelector('#result').textContent = lines.join('\n');
</script>
```

刷新后应该看到：

```text
document.compatMode = CSS1Compat
document.doctype.name = html
```

现在已经验证了：

```text
<!doctype html>
      ↓
浏览器识别到 DocumentType
      ↓
name = html
```

## 第 6 步：观察 DOCTYPE 的 DOM 节点类型

继续往 `lines` 数组中加入第三项：

```js
'doctype 节点类型 = ' + document.doctype.constructor.name
```

脚本变成：

```html
<script>
  const lines = [
    'document.compatMode = ' + document.compatMode,
    'document.doctype.name = ' + document.doctype.name,
    'doctype 节点类型 = ' + document.doctype.constructor.name
  ];

  document.querySelector('#result').textContent = lines.join('\n');
</script>
```

页面现在应该显示：

```text
document.compatMode = CSS1Compat
document.doctype.name = html
doctype 节点类型 = DocumentType
```

到这里，我们已经从空文件一步一步得到了完整实验。

## 第 7 步：让实验在删除 DOCTYPE 后也不会报错

现在还有一个小问题。

如果为了做对照实验再次删除：

```html
<!doctype html>
```

那么：

```js
document.doctype
```

可能为 `null`。

如果继续直接读取：

```js
document.doctype.name
```

脚本就会报错。

为了让案例能够同时观察“存在 DOCTYPE”和“不存在 DOCTYPE”两种状态，我们给实验辅助代码增加保护：

```js
document.doctype?.name ?? '不存在'
```

以及：

```js
document.doctype?.constructor.name ?? '不存在'
```

于是最终脚本为：

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

> `?.` 和 `??` 属于 JavaScript 语法。本节不要求掌握它们。这里使用它们只是为了让实验在删除 DOCTYPE 时仍然能够正常显示结果。

## 第 8 步：完成最终案例

把前面的代码组合起来，最终就得到了仓库中的 [`index.html`](./index.html)。

你不是从最终答案开始，而是经历了：

```text
空文件
  ↓
最小 HTML 文档
  ↓
观察 BackCompat
  ↓
加入 <!doctype html>
  ↓
观察 CSS1Compat
  ↓
把结果显示到页面
  ↓
观察 doctype.name
  ↓
观察 DocumentType
  ↓
增加删除 DOCTYPE 时的容错
  ↓
完整案例
```

这条过程比单纯记住 `<!doctype html>` 更重要，因为你已经亲手验证了它为什么存在。

---

# 完整源码讲解

最终源码位于 [`index.html`](./index.html)。

核心结构可以分成两部分。

## 1. 本节核心代码

```html
<!doctype html>
```

它位于整个 HTML 文档的第一行，用于让现代浏览器按照标准模式解析完整页面。

这是本节真正要求掌握、记住并能够独立写出的代码。

## 2. 实验辅助代码

页面中的：

```html
<pre id="result"></pre>
```

负责提供结果展示区域。

JavaScript：

```js
const lines = [
  'document.compatMode = ' + document.compatMode,
  'document.doctype.name = ' + (document.doctype?.name ?? '不存在'),
  'doctype 节点类型 = ' + (document.doctype?.constructor.name ?? '不存在')
];
```

分别读取：

1. 当前文档模式。
2. DOCTYPE 名称。
3. DOCTYPE 的 DOM 节点类型。

最后：

```js
document.querySelector('#result').textContent = lines.join('\n');
```

只是把三项结果显示到页面中。

> 阅读这个案例时，要始终区分“HTML 知识点本身”和“为了验证知识点而写的辅助代码”。不要因为案例中出现 JavaScript，就把本节学习重点转移到 JavaScript API 上。

## 3. 为什么最终源码保留容错写法

最终源码使用：

```js
document.doctype?.name ?? '不存在'
```

是因为本案例需要让你主动删除第一行 DOCTYPE 做对照实验。

删除声明以后，页面仍然应该能够告诉你：

```text
document.compatMode = BackCompat
document.doctype.name = 不存在
doctype 节点类型 = 不存在
```

因此这里的 JavaScript 是为“实验设计”服务的，而不是本节新的核心知识点。

## 运行案例

### 方式一：直接打开

直接使用浏览器打开 [`index.html`](./index.html)。

### 方式二：通过本地服务器运行

在当前目录执行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

### 推荐实验顺序

第一次运行时保留：

```html
<!doctype html>
```

记录页面结果。

然后删除第一行、保存并刷新。

最后恢复第一行，再刷新一次。

不要只看最终结果，要比较这三次操作之间发生了什么变化。

## 效果验证

### 保留 DOCTYPE 时

应该观察到：

```text
document.compatMode = CSS1Compat
document.doctype.name = html
doctype 节点类型 = DocumentType
```

### 删除 DOCTYPE 后

应该观察到类似：

```text
document.compatMode = BackCompat
document.doctype.name = 不存在
doctype 节点类型 = 不存在
```

### 你最终应该能够解释

看到下面的代码：

```html
<!doctype html>
```

不要只回答“这是 HTML5 固定写法”。

你应该能够解释完整因果链：

```text
DOCTYPE 位于完整 HTML 文档入口
          ↓
浏览器在解析初期识别文档类型
          ↓
现代标准声明让页面使用标准模式
          ↓
document.compatMode 为 CSS1Compat
          ↓
DOCTYPE 在 DOM 中表现为 DocumentType 节点
```

如果你能够不看答案解释清楚这条链路，本节才算真正完成。
