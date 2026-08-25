# KP004：Quirks Mode

> 节点：`node-02-01-01-01-01-01-02-02`  
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

1. 知道 `BackCompat` 是判断怪异模式的可靠信号。
2. 理解缺少可识别 DOCTYPE 是进入 Quirks Mode 的常见原因。
3. 遇到旧页面布局异常时，知道先检查文档模式，而不是只凭视觉现象猜测。
4. 能通过“无 DOCTYPE → 加入 DOCTYPE”的对照实验验证模式变化。

> **本节核心动作是故意不写 `<!doctype html>`，再把它加回来比较。**  
> `document.compatMode` 和盒子宽度测量属于实验辅助代码。

## 理论讲解

### 1. `BackCompat` 标志

怪异模式是浏览器为了兼容早期网页保留的文档模式。

判断当前页面是否进入怪异模式，应直接读取：

```js
document.compatMode
```

怪异模式通常返回：

```text
BackCompat
```

### 2. 常见触发原因

完整 HTML 文档缺少可识别的 DOCTYPE，是最常见的触发原因之一。

页面通常仍然能显示，所以：

> “页面能打开”不能证明页面处于标准模式。

### 3. 诊断比猜外观可靠

不同浏览器今天仍保留哪些具体怪异布局行为可能存在差异，因此不要只根据“某个盒子看起来变宽了”判断模式。

更可靠的诊断顺序是：

```text
检查 document.compatMode
        ↓
检查 document.doctype
        ↓
确认模式
        ↓
再分析具体布局差异
```

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：明确这个案例为什么不能先写 DOCTYPE

KP001～KP003 都从标准声明开始，但这一节恰好相反。

我们要主动制造 Quirks Mode，所以最终案例**故意没有**：

```html
<!doctype html>
```

这是本案例最关键的设计。

### 第 1 步：创建一个没有 DOCTYPE 的页面

创建 `index.html`，直接从 `html` 开始：

```html
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP004：Quirks Mode</title>
</head>
<body>
  <h1>故意进入怪异模式的页面</h1>
</body>
</html>
```

注意第一行不是 DOCTYPE。

页面依然可以打开，这正好说明：

```text
能显示 ≠ 文档入口正确
```

### 第 2 步：增加文档模式显示位置

在 `h1` 后加入：

```html
<p>document.compatMode：<strong id="mode"></strong></p>
```

然后在 `body` 末尾加入：

```html
<script>
  document.querySelector('#mode').textContent = document.compatMode;
</script>
```

> **实验辅助代码**：这里只是把浏览器的模式标志显示出来。

刷新页面，应该看到：

```text
BackCompat
```

到这里已经足以证明页面处于怪异模式。

### 第 3 步：增加一个布局观察对象

在 `head` 中加入：

```html
<style>
  .box {
    width: 200px;
    padding: 20px;
    border: 10px solid;
  }
</style>
```

正文加入：

```html
<div class="box" id="box">
  width: 200px；padding: 20px；border: 10px
</div>
<p>实际边框盒宽度：<strong id="width"></strong></p>
```

这个盒子只是为了让我们有一个可以观察的布局对象。

### 第 4 步：读取盒子的实际宽度

把脚本扩展为：

```js
document.querySelector('#mode').textContent = document.compatMode;
document.querySelector('#width').textContent =
  document.querySelector('#box').getBoundingClientRect().width + 'px';
```

记录此时页面显示的宽度。

> 不要把某一个宽度数字当成“Quirks Mode 的唯一证据”。不同浏览器的具体兼容行为可能不同，最可靠的证据仍然是 `BackCompat`。

### 第 5 步：加入标准 DOCTYPE 做对照

现在在文件最前面临时加入：

```html
<!doctype html>
```

保存并刷新。

最重要的变化应是：

```text
BackCompat
   ↓
CSS1Compat
```

这证明文档模式发生了改变。

### 第 6 步：恢复故意的错误入口

因为本知识点的最终案例就是为了演示怪异模式，所以实验结束后再次删除：

```html
<!doctype html>
```

最终文件应保持 `BackCompat` 实验状态，与仓库 [`index.html`](./index.html) 一致。

---

## 完整源码讲解

仓库最终源码故意不包含 DOCTYPE：

```html
<!--
  KP004：Quirks Mode

  这个文件故意没有 <!doctype html>。
  因此现代浏览器通常会让 document.compatMode 返回 BackCompat。

  学习完成后，请复制本文件：
  1. 在副本第一行添加 <!doctype html>。
  2. 刷新两份文件。
  3. 比较 compatMode 和盒子宽度。
-->
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP004：Quirks Mode</title>

  <style>
    .box {
      width: 200px;
      padding: 20px;
      border: 10px solid;
    }
  </style>
</head>
<body>
  <h1>故意进入怪异模式的页面</h1>
  <p>document.compatMode：<strong id="mode"></strong></p>

  <div class="box" id="box">
    width: 200px；padding: 20px；border: 10px
  </div>
  <p>实际边框盒宽度：<strong id="width"></strong></p>

  <script>
    document.querySelector('#mode').textContent = document.compatMode;
    document.querySelector('#width').textContent =
      document.querySelector('#box').getBoundingClientRect().width + 'px';
  </script>
</body>
</html>
```

结构分成三部分：

- **故意缺少 DOCTYPE**：制造 Quirks Mode。
- **盒子**：提供可观察的布局对象。
- **辅助脚本**：输出模式和实际宽度。

## 运行案例

直接打开 [`index.html`](./index.html)，或运行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

建议复制一份文件作为对照，在副本第一行加入标准 DOCTYPE，这样可以同时观察两份页面。

## 效果验证

原始案例中：

- `document.compatMode` 应为 `BackCompat`。
- 文件顶部没有 `<!doctype html>`。

加入标准声明后：

- `document.compatMode` 应变为 `CSS1Compat`。
- 即使盒子宽度在当前浏览器里没有明显变化，也不能否认模式已经改变。
