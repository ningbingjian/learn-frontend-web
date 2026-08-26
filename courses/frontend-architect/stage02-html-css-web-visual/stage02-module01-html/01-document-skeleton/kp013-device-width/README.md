# KP013：viewport 与设备宽度

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 正确编写 viewport 元信息。
2. 理解 `width=device-width` 的作用。
3. 理解移动浏览器为什么历史上会使用一个比设备屏幕更宽的默认布局视口。
4. 能在 DevTools 设备模拟中比较“有 viewport”与“无 viewport”的差异。

> **本节核心代码是 `<meta name="viewport" content="width=device-width">`。**  
> 页面中的宽度读取 JavaScript 只是为了观察运行结果。

## 理论讲解

### 1. viewport 元信息

移动端页面通常需要在 `head` 中声明：

```html
<meta name="viewport" content="width=device-width">
```

它告诉移动浏览器：

> 页面布局宽度应该与设备可用的 CSS 像素宽度建立直接关系。

### 2. `width=device-width`

这里的 `device-width` 不是“物理像素数量”。

现代高密度屏幕常常一个 CSS 像素对应多个设备像素。浏览器布局主要使用 CSS 像素。

因此不要把：

```text
设备物理分辨率
```

和：

```text
CSS viewport 宽度
```

混为一谈。

### 3. 为什么移动浏览器需要它

早期很多网站按桌面宽度设计。为了让旧网站在手机上还能完整显示，移动浏览器曾经会采用一个较宽的“虚拟布局宽度”，然后整体缩小页面。

结果就是：

- 页面看起来像桌面站被缩成很小。
- 字体很小。
- 响应式 CSS 获取到的宽度不符合开发者预期。

`width=device-width` 告诉浏览器不要用这种桌面式的默认布局宽度来解释现代响应式页面。

### 4. 它不是响应式设计的全部

viewport 声明只解决布局视口基准问题。

真正的响应式页面还需要 CSS 中的：

- 流式布局。
- 媒体查询。
- 弹性尺寸。
- 合理的图片和组件策略。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建最小页面

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP013：viewport 与设备宽度</title>
</head>
<body>
  <h1>设备宽度实验</h1>
</body>
</html>
```

### 第 1 步：加入 viewport 核心声明

在 `meta charset` 后加入：

```html
<meta name="viewport" content="width=device-width">
```

本节最重要的代码就是这一行。

### 第 2 步：加入观察区域

```html
<pre id="result"></pre>
```

### 第 3 步：读取几个容易混淆的宽度

加入辅助脚本：

```html
<script>
  function render() {
    document.querySelector('#result').textContent = [
      'window.innerWidth = ' + window.innerWidth,
      'documentElement.clientWidth = ' + document.documentElement.clientWidth,
      'screen.width = ' + screen.width,
      'devicePixelRatio = ' + window.devicePixelRatio
    ].join('\n');
  }

  render();
  window.addEventListener('resize', render);
</script>
```

这些 API 不是 viewport meta 的组成部分，它们只是帮助你观察页面环境。

### 第 4 步：打开 DevTools 设备模拟

在 Chrome DevTools 中：

1. 打开 Device Toolbar。
2. 选择一台手机或设置自定义宽度。
3. 改变模拟设备宽度。
4. 观察 `innerWidth` 和 `clientWidth`。

### 第 5 步：临时删除 viewport 声明做对照

临时删除：

```html
<meta name="viewport" content="width=device-width">
```

然后在移动设备模拟中刷新页面。

重点观察：

- 页面布局宽度是否明显变大。
- 页面是否被整体缩小。
- 显示的宽度数据是否发生变化。

完成实验后恢复 viewport 声明。

### 第 6 步：完成案例

最终源码以 [`index.html`](./index.html) 为准。

本节总结：

- **本节核心代码**：`<meta name="viewport" content="width=device-width">`。
- **实验辅助代码**：`innerWidth`、`clientWidth`、`screen.width`、`devicePixelRatio` 的输出。

## 运行案例

推荐通过本地 HTTP 服务打开：

```bash
python3 -m http.server 8080
```

访问 `http://localhost:8080/index.html`，并配合 DevTools Device Toolbar 观察。

## 效果验证

你应该能够确认：

- viewport 声明位于 `head` 中。
- `width=device-width` 处理的是 CSS 布局视口基准，不等于物理像素宽度。
- 在移动设备模拟中，删除 viewport 声明会产生明显不同的布局解释。
- 能解释为什么 viewport 声明是现代响应式页面的基础，但不是响应式设计的全部。
