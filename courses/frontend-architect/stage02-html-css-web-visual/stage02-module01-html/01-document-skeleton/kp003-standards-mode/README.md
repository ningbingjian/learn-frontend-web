# KP003：Standards Mode

> 节点：`node-02-01-01-01-01-01-02-01`  
> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [完整源码讲解](#完整源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)
- [课后练习](#课后练习)

## 学习目标

学完本节后，你应该能够：

1. 知道 `CSS1Compat` 表示当前文档处于标准模式。
2. 理解默认 `content-box` 中 `width` 只表示内容区宽度。
3. 理解 `border-box` 中声明宽度已经包含 padding 和 border。
4. 能先手算盒子尺寸，再使用浏览器实际测量结果验证。

> **本节核心知识是 Standards Mode 下的标准盒模型行为。**  
> `document.compatMode` 与 `getBoundingClientRect()` 是实验辅助代码，只负责把文档模式和实际尺寸显示出来。

## 理论讲解

### 1. `CSS1Compat` 标志

使用标准 DOCTYPE：

```html
<!doctype html>
```

现代浏览器通常进入 Standards Mode，可以读取：

```js
document.compatMode // "CSS1Compat"
```

标准模式表示浏览器按现代标准规则处理布局，而不是启用早期网页依赖的怪异兼容行为。

### 2. 默认 `content-box`

假设一个盒子：

```css
width: 200px;
padding: 20px;
border: 10px solid;
```

默认 `box-sizing` 是 `content-box`，所以 `200px` 只计算内容区。

最终边框盒宽度：

```text
200 + 20 × 2 + 10 × 2 = 260px
```

### 3. `border-box`

如果再加：

```css
box-sizing: border-box;
```

此时 `width: 200px` 已经包含内容、padding 和 border，因此最终边框盒宽度仍然是：

```text
200px
```

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：先手算，不急着写测量代码

本次实验要比较两个盒子：

```text
content-box → 预计 260px
border-box  → 预计 200px
```

先记住这个预测，后面再让浏览器给答案。

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

第一行保证我们从标准模式开始实验。

### 第 2 步：先写公共盒子样式

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

这一步只建立默认 `content-box` 条件。

### 第 3 步：加入第一个盒子

在 `body` 中加入：

```html
<h2>content-box</h2>
<div class="box" id="content-box">width: 200px</div>
<p id="content-result"></p>
```

现在先观察视觉效果，并再次手算：

```text
200 + 40 + 20 = 260px
```

### 第 4 步：加入第二个 `border-box`

在样式中追加：

```css
.border-box {
  box-sizing: border-box;
}
```

再在正文中加入：

```html
<h2>border-box</h2>
<div class="box border-box" id="border-box">width: 200px</div>
<p id="border-result"></p>
```

此时两个盒子都声明 `width: 200px`，但尺寸含义已经不同。

### 第 5 步：显示当前文档模式

在 `body` 末尾加入：

```html
<script>
  document.querySelector('#mode').textContent = document.compatMode;
</script>
```

> **实验辅助代码**：这一步只是在页面上证明当前为 `CSS1Compat`。

刷新后应看到：

```text
文档模式：CSS1Compat
```

### 第 6 步：测量两个盒子的真实宽度

把脚本扩展为：

```js
const contentWidth =
  document.querySelector('#content-box').getBoundingClientRect().width;
const borderWidth =
  document.querySelector('#border-box').getBoundingClientRect().width;

 document.querySelector('#mode').textContent = document.compatMode;
```

然后输出结果：

```js
document.querySelector('#content-result').textContent =
  '实际边框盒宽度：' + contentWidth + 'px';
document.querySelector('#border-result').textContent =
  '实际边框盒宽度：' + borderWidth + 'px';
```

刷新页面，你应该得到：

```text
content-box：260px
border-box：200px
```

这一步完成了：

```text
先预测
  ↓
浏览器布局
  ↓
实际测量
  ↓
验证预测
```

### 第 7 步：修改参数再次验证

例如把：

```css
padding: 20px;
```

临时改成：

```css
padding: 30px;
```

先重新手算，再刷新页面验证。

实验结束后恢复 `20px`，使文件与仓库最终源码一致。

---

## 完整源码讲解

仓库最终 [`index.html`](./index.html) 为：

```html
<!doctype html>
<!--
  KP003：Standards Mode

  当前文件有标准 DOCTYPE，因此 document.compatMode 应为 CSS1Compat。

  两个盒子都声明 width: 200px：
  - content-box 的 200px 只计算内容区，外部宽度还要加 padding 和 border。
  - border-box 的 200px 已经包含 padding 和 border。
-->
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP003：Standards Mode</title>

  <style>
    .box {
      width: 200px;
      padding: 20px;
      border: 10px solid;
      margin-bottom: 12px;
    }

    .border-box {
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <h1>标准模式下的盒模型证据</h1>
  <p>文档模式：<strong id="mode"></strong></p>

  <h2>content-box</h2>
  <div class="box" id="content-box">width: 200px</div>
  <p id="content-result"></p>

  <h2>border-box</h2>
  <div class="box border-box" id="border-box">width: 200px</div>
  <p id="border-result"></p>

  <script>
    const contentWidth =
      document.querySelector('#content-box').getBoundingClientRect().width;
    const borderWidth =
      document.querySelector('#border-box').getBoundingClientRect().width;

    document.querySelector('#mode').textContent = document.compatMode;
    document.querySelector('#content-result').textContent =
      '实际边框盒宽度：' + contentWidth + 'px';
    document.querySelector('#border-result').textContent =
      '实际边框盒宽度：' + borderWidth + 'px';
  </script>
</body>
</html>
```

其中真正要理解的是 `.box` 与 `.border-box` 的尺寸语义；脚本只负责测量和展示。

## 运行案例

直接用浏览器打开 [`index.html`](./index.html)，或在当前目录运行：

```bash
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/index.html
```

建议先遮住页面结果，自己手算后再对照。

## 效果验证

最终应观察到：

- `document.compatMode = CSS1Compat`。
- `content-box` 实际边框盒宽度为 `260px`。
- `border-box` 实际边框盒宽度为 `200px`。
- 修改 width、padding 或 border 后，你能先算出新结果，再由浏览器验证。

## 课后练习

1. 把 `width` 改成 `300px`，分别计算两个盒子的最终宽度。
2. 把 border 改成 `5px`，不要先运行，先写出你的预测。
3. 用一句话解释：为什么两个盒子都写 `width: 200px`，实际外部宽度却不同？
