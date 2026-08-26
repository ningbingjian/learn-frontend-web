# KP014：`initial-scale` 初始缩放

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 正确使用 `initial-scale=1`。
2. 理解初始缩放比例与 CSS 像素之间的关系。
3. 区分页面“初始缩放”与用户后续主动缩放。
4. 理解为什么不应该为了固定视觉效果随意禁止用户缩放。

> **本节核心代码是 viewport 中的 `initial-scale=1`。**  
> `VisualViewport.scale` 等读取代码属于实验辅助代码。

## 理论讲解

### 1. 标准组合

移动端最常见的 viewport 声明是：

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

其中：

- `width=device-width` 处理布局视口基准。
- `initial-scale=1` 指定页面首次加载时的初始缩放比例。

### 2. `initial-scale=1` 的含义

它表示页面初次呈现时，浏览器采用 1:1 的 CSS 像素缩放关系作为起点。

它并不意味着：

- 一个 CSS 像素就是一个物理屏幕像素。
- 用户永远不能缩放。
- `devicePixelRatio` 必须等于 1。

这些概念需要分开理解。

### 3. 初始缩放和用户缩放

`initial-scale` 只描述初始状态。

用户之后可以通过双指缩放等方式改变视觉视口。

这也是为什么后续学习 Visual Viewport 时，`visualViewport.scale` 可能发生变化。

### 4. 不要随意禁止缩放

历史代码中可能看到：

```html
maximum-scale=1
user-scalable=no
```

这类写法可能削弱低视力用户放大页面的能力。

除非有非常特殊且经过可访问性评估的产品场景，否则不要把“禁止用户缩放”当成移动端模板的一部分。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建页面

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP014：initial-scale 初始缩放</title>
</head>
<body>
  <h1>初始缩放实验</h1>
</body>
</html>
```

### 第 1 步：加入设备宽度

先写：

```html
<meta name="viewport" content="width=device-width">
```

这是上一节的基础。

### 第 2 步：加入 `initial-scale=1`

改成：

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

这是本节核心代码。

### 第 3 步：加入观察区域

```html
<pre id="result"></pre>
```

### 第 4 步：读取缩放相关数据

加入辅助脚本：

```html
<script>
  function render() {
    const viewport = window.visualViewport;

    document.querySelector('#result').textContent = [
      'devicePixelRatio = ' + window.devicePixelRatio,
      'visualViewport.scale = ' + (viewport ? viewport.scale : '不支持'),
      'visualViewport.width = ' + (viewport ? viewport.width.toFixed(2) : '不支持')
    ].join('\n');
  }

  render();
  window.visualViewport?.addEventListener('resize', render);
</script>
```

### 第 5 步：在真机或移动模拟环境观察

首次加载时重点观察：

```text
visualViewport.scale
```

然后在支持手势缩放的真实移动设备上放大页面，再观察数值变化。

注意：桌面浏览器的普通页面缩放与移动端 pinch zoom 的行为不完全等价，所以最终验证应以真实移动浏览器为准。

### 第 6 步：检查可访问性边界

确认最终源码中没有：

```text
user-scalable=no
maximum-scale=1
```

本案例保留用户放大页面的能力。

### 第 7 步：完成案例

最终源码查看 [`index.html`](./index.html)。

本节总结：

- **本节核心代码**：`initial-scale=1`。
- **实验辅助代码**：读取 `devicePixelRatio` 和 `VisualViewport` 数据。

## 运行案例

执行：

```bash
python3 -m http.server 8080
```

访问 `http://localhost:8080/index.html`。推荐同时使用移动设备模拟和真实手机验证。

## 效果验证

你应该能够确认：

- viewport 中包含 `width=device-width, initial-scale=1`。
- 能解释 `initial-scale=1` 不等于物理像素比例为 1。
- 能区分初始缩放和用户后续缩放。
- 最终代码没有通过 `user-scalable=no` 或 `maximum-scale=1` 禁止用户缩放。
