# KP024：`theme-color` 主题颜色

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `<meta name="theme-color">` 声明浏览器 UI 的建议主题色。
2. 理解 `content` 和 `media` 的作用。
3. 使用 `prefers-color-scheme` 为明暗主题分别声明颜色。
4. 理解 `theme-color` 是浏览器提示，不等于页面 CSS 背景色。
5. 为不支持或部分支持该能力的环境准备合理回退。

> **本节核心代码是 `meta[name="theme-color"]`。**  
> CSS 和 JavaScript 用于制造明暗主题对照和读取声明，属于实验辅助代码。

## 理论讲解

### 1. 基础语法

```html
<meta name="theme-color" content="#ffffff">
```

它告诉浏览器：页面希望浏览器自身某些 UI 区域使用这个颜色。

不同浏览器、操作系统、安装模式对它的使用位置不同，因此不要把它理解成“强制修改浏览器顶部颜色”。

### 2. 它和 CSS 不是一回事

页面背景色仍由 CSS 控制：

```css
body {
  background: #ffffff;
}
```

而 `theme-color` 是元信息：

```html
<meta name="theme-color" content="#ffffff">
```

两者可以相同，也可以不同。但设计系统通常会让它们保持协调，避免浏览器 UI 与页面视觉割裂。

### 3. 明暗主题媒体条件

可以声明多条：

```html
<meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)">
```

浏览器可以根据当前配色偏好选择匹配的候选。

### 4. 支持差异与回退

`theme-color` 的表现依赖浏览器。

因此正确策略是：

```text
页面本身：CSS 必须独立完成明暗主题
浏览器 UI：theme-color 作为增强
不支持环境：页面功能仍然正常
```

这就是渐进增强思路。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：建立页面骨架

创建：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP024：theme-color</title>
</head>
<body>
  <h1>theme-color 实验</h1>
</body>
</html>
```

### 第 1 步：加入明亮主题颜色

在 `head` 中加入：

```html
<meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)">
```

目标：为浅色模式提供主题色候选。

### 第 2 步：加入深色主题颜色

继续加入：

```html
<meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)">
```

现在页面有两条候选声明。

### 第 3 步：让页面 CSS 也响应明暗主题

加入：

```html
<style>
  body {
    background: #f8fafc;
    color: #0f172a;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background: #0f172a;
      color: #f8fafc;
    }
  }
</style>
```

注意：这段 CSS 控制的是网页内容，不是 `theme-color` 本身。

### 第 4 步：读取当前配色偏好

加入辅助代码：

```js
const dark = matchMedia('(prefers-color-scheme: dark)').matches;
```

然后找出匹配当前模式的 meta：

```js
const metas = [...document.querySelectorAll('meta[name="theme-color"]')];
const selected = metas.find(meta => matchMedia(meta.media).matches);
```

### 第 5 步：输出验证结果

```js
document.querySelector('#result').textContent = [
  '当前模式：' + (dark ? 'dark' : 'light'),
  '匹配主题色：' + (selected?.content || '(未找到)')
].join('\n');
```

切换系统或浏览器的明暗模式后刷新页面，观察内容背景和输出结果。

### 第 6 步：理解“不支持也不能坏”

即使浏览器忽略 `theme-color`：

- 页面 CSS 仍然可以正常显示。
- 文本内容仍可访问。
- 业务功能不受影响。

这就是这类元信息应有的使用边界。

### 第 7 步：完成案例并对照最终源码

最终源码查看 [`index.html`](./index.html)。

本节总结：

- **本节核心代码**：两条带 `media` 的 `theme-color` 声明。
- **实验辅助代码**：CSS 明暗主题和 `matchMedia()` 检测。

## 运行案例

直接打开 `index.html` 即可；也可以执行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/index.html
```

## 效果验证

你应该能够确认：

- `<head>` 中存在浅色和深色两条 `theme-color`。
- 两条声明使用不同 `media` 条件。
- 页面 CSS 会随系统配色变化。
- 输出能够显示当前模式与匹配主题色。
- 能解释为什么 `theme-color` 只是增强能力，不能代替 CSS 主题系统。
