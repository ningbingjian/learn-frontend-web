# KP004：Quirks Mode

> 节点：`node-02-01-01-01-01-01-02-02`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 `BackCompat` 是判断怪异模式的可靠信号。
2. 理解缺少可识别 DOCTYPE 是进入 Quirks Mode 的常见原因。
3. 遇到旧页面布局异常时，知道先检查文档模式。
4. 能通过“无 DOCTYPE → 加入 DOCTYPE”的对照实验验证模式变化。

> **本节核心动作是故意不写 `<!doctype html>`，再把它加回来比较。**  
> `document.compatMode` 和盒子宽度测量属于实验辅助代码。

## 理论讲解

### 1. `BackCompat` 标志

怪异模式是浏览器为兼容早期网页保留的文档模式。

判断当前页面是否进入怪异模式，应直接读取：

```js
document.compatMode
```

怪异模式通常返回：

```text
BackCompat
```

### 2. 常见触发原因

完整 HTML 文档缺少可识别 DOCTYPE，是最常见的触发原因之一。

页面通常仍然能显示，所以：

> 页面能打开，不代表页面处于标准模式。

### 3. 诊断比猜外观可靠

不同浏览器保留的具体怪异布局行为可能存在差异，所以不要只凭某个盒子的外观判断模式。

更可靠的顺序是：

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

### 第 0 步：明确为什么不能先写 DOCTYPE

这一节要主动制造 Quirks Mode，所以最终案例故意没有：

```html
<!doctype html>
```

### 第 1 步：创建没有 DOCTYPE 的页面

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

页面依然可以打开，这正好说明：

```text
能显示 ≠ 文档入口正确
```

### 第 2 步：显示文档模式

在正文中加入：

```html
<p>document.compatMode：<strong id="mode"></strong></p>
```

在 `body` 末尾加入：

```html
<script>
  document.querySelector('#mode').textContent = document.compatMode;
</script>
```

刷新后应看到：

```text
BackCompat
```

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

盒子只是观察对象，不是判断 Quirks Mode 的唯一证据。

### 第 4 步：读取实际宽度

扩展脚本：

```js
document.querySelector('#mode').textContent = document.compatMode;
document.querySelector('#width').textContent =
  document.querySelector('#box').getBoundingClientRect().width + 'px';
```

记录当前宽度。

### 第 5 步：加入标准 DOCTYPE 做对照

临时在第一行加入：

```html
<!doctype html>
```

保存并刷新，最重要的变化应是：

```text
BackCompat
   ↓
CSS1Compat
```

### 第 6 步：恢复故意的错误入口

本知识点最终案例就是为了演示怪异模式，所以实验结束后再次删除：

```html
<!doctype html>
```

### 第 7 步：完成案例并对照最终源码

最终代码应与仓库中的 [`index.html`](./index.html) 一致。

本节总结：

- **核心代码/条件**：故意缺少 DOCTYPE，用来进入并观察 Quirks Mode。
- **实验辅助代码**：`document.compatMode` 与宽度测量，用来验证模式和观察布局。

最终源码直接查看 [`index.html`](./index.html)，README 不再重复粘贴整份文件。

## 运行案例

直接打开 [`index.html`](./index.html)，或运行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

建议复制一份文件作为对照，在副本第一行加入标准 DOCTYPE，同时观察两份页面。

## 效果验证

原始案例中：

- `document.compatMode` 应为 `BackCompat`。
- 文件顶部没有 `<!doctype html>`。

加入标准声明后：

- `document.compatMode` 应变为 `CSS1Compat`。
- 即使盒子宽度在当前浏览器里变化不明显，也应以 `compatMode` 作为模式证据。
