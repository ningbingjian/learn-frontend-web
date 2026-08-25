# KP003：Standards Mode

> 节点：`node-02-01-01-01-01-01-02-01`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 `CSS1Compat` 表示当前文档处于标准模式。
2. 理解默认 `content-box` 中 `width` 只表示内容区宽度。
3. 理解 `border-box` 中声明宽度已经包含 padding 和 border。
4. 能先手算盒子尺寸，再用浏览器真实测量验证。

> **本节核心知识是 Standards Mode 下的标准盒模型行为。**  
> `document.compatMode` 与 `getBoundingClientRect()` 只是实验辅助代码。

## 理论讲解

### 1. `CSS1Compat` 标志

使用标准 DOCTYPE：

```html
<!doctype html>
```

现代浏览器通常进入 Standards Mode：

```js
document.compatMode // "CSS1Compat"
```

### 2. 默认 `content-box`

假设元素声明：

```css
width: 200px;
padding: 20px;
border: 10px solid;
```

默认 `box-sizing` 是 `content-box`，所以 `width: 200px` 只计算内容区。

最终边框盒宽度：

```text
200 + 20 × 2 + 10 × 2 = 260px
```

### 3. `border-box`

如果再加：

```css
box-sizing: border-box;
```

`width: 200px` 已经包含内容、padding 和 border，因此最终边框盒宽度仍是：

```text
200px
```

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：先预测结果

本实验比较两个盒子：

```text
content-box → 预计 260px
border-box  → 预计 200px
```

先手算，再让浏览器验证。

### 第 1 步：创建标准模式页面

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP003：Standards Mode</title>
</head>
<body>
  <h1>标准模式下的盒模型证据</h1>
  <p>文档模式：<strong id="mode"></strong></p>
</body>
</html>
```

第一行保证实验从标准模式开始。

### 第 2 步：加入公共盒子样式

在 `head` 中加入：

```html
<style>
  .box {
    width: 200px;
    padding: 20px;
    border: 10px solid;
    margin-bottom: 12px;
  }
</style>
```

### 第 3 步：加入 `content-box`

正文加入：

```html
<h2>content-box</h2>
<div class="box" id="content-box">width: 200px</div>
<p id="content-result"></p>
```

再次手算：

```text
200 + 40 + 20 = 260px
```

### 第 4 步：加入 `border-box`

样式中追加：

```css
.border-box {
  box-sizing: border-box;
}
```

正文再加入：

```html
<h2>border-box</h2>
<div class="box border-box" id="border-box">width: 200px</div>
<p id="border-result"></p>
```

### 第 5 步：显示当前文档模式

在 `body` 末尾加入：

```html
<script>
  document.querySelector('#mode').textContent = document.compatMode;
</script>
```

刷新后应看到：

```text
文档模式：CSS1Compat
```

### 第 6 步：测量真实宽度

扩展脚本：

```js
const contentWidth =
  document.querySelector('#content-box').getBoundingClientRect().width;
const borderWidth =
  document.querySelector('#border-box').getBoundingClientRect().width;

document.querySelector('#mode').textContent = document.compatMode;
document.querySelector('#content-result').textContent =
  '实际边框盒宽度：' + contentWidth + 'px';
document.querySelector('#border-result').textContent =
  '实际边框盒宽度：' + borderWidth + 'px';
```

刷新后应得到：

```text
content-box：260px
border-box：200px
```

### 第 7 步：修改参数再次验证

临时把：

```css
padding: 20px;
```

改成：

```css
padding: 30px;
```

先手算，再刷新验证。实验结束后恢复 `20px`。

### 第 8 步：完成案例并对照最终源码

恢复原值后，你的代码应与仓库最终 [`index.html`](./index.html) 一致。

本节总结：

- **核心代码**：标准 DOCTYPE、`.box` 的盒模型声明、`.border-box { box-sizing: border-box; }`。
- **实验辅助代码**：`document.compatMode` 与 `getBoundingClientRect()`，只负责证明当前模式和实际尺寸。

最终源码以 [`index.html`](./index.html) 为准，不在 README 中重复整份粘贴。

## 运行案例

直接打开 [`index.html`](./index.html)，或执行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

建议先自己手算，再查看页面输出。

## 效果验证

最终应观察到：

- `document.compatMode = CSS1Compat`。
- `content-box` 实际边框盒宽度为 `260px`。
- `border-box` 实际边框盒宽度为 `200px`。
- 修改 width、padding 或 border 后，能够先计算再由浏览器验证。
