# KP016：viewport 调试方式

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 DevTools Device Toolbar 调试常见移动 viewport 问题。
2. 理解设备模拟不能完全替代真实设备验证。
3. 建立一套固定的 viewport 数据读取方法。
4. 能按“声明 → 模拟环境 → 数据 → 真机”顺序定位移动端宽高、缩放和键盘问题。

## 理论讲解

### 1. 先检查 HTML 声明

移动端显示异常时，第一步不是改 CSS，而是先确认：

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

如果 viewport 基准都不对，后续看到的响应式宽度可能从一开始就是错的。

### 2. DevTools 设备模拟适合做什么

Device Toolbar 很适合快速检查：

- 不同 CSS viewport 宽度。
- 横竖屏切换。
- 响应式断点。
- 页面是否出现横向溢出。
- viewport meta 有无造成明显差异。

但“显示成某款手机尺寸”不代表已经完全等价于真实设备。

### 3. 为什么必须真机验证

真实移动设备还涉及：

- 浏览器地址栏收起/展开。
- 软键盘。
- pinch zoom。
- 安全区域。
- 不同浏览器内核和 WebView 行为。
- 真实触摸交互。

所以调试流程应该是：

```text
桌面快速定位
    ↓
DevTools 设备模拟
    ↓
读取实际 viewport 数据
    ↓
真实设备最终验证
```

### 4. 常用 viewport 数据

排查时可以统一记录：

```text
window.innerWidth / innerHeight
document.documentElement.clientWidth / clientHeight
visualViewport.width / height / scale
devicePixelRatio
screen.width / screen.height
screen.orientation.type
```

不要只截一张页面图；把数据一起记录，问题会更容易复现。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建标准页面

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KP016：viewport 调试方式</title>
</head>
<body>
  <h1>Viewport 调试面板</h1>
</body>
</html>
```

### 第 1 步：加入输入框

```html
<input type="text" placeholder="真机上点击以调起键盘">
```

用于验证软键盘场景。

### 第 2 步：加入实时输出区域

```html
<pre id="result"></pre>
```

### 第 3 步：读取布局数据

```js
'inner = ' + window.innerWidth + ' x ' + window.innerHeight
'client = ' + document.documentElement.clientWidth + ' x ' + document.documentElement.clientHeight
```

### 第 4 步：读取视觉视口数据

```js
const viewport = window.visualViewport;

'visual = ' + viewport.width + ' x ' + viewport.height
'scale = ' + viewport.scale
```

需要先判断浏览器是否支持 `visualViewport`。

### 第 5 步：加入屏幕与像素比数据

```js
'screen = ' + screen.width + ' x ' + screen.height
'devicePixelRatio = ' + window.devicePixelRatio
'orientation = ' + (screen.orientation?.type ?? '未知')
```

### 第 6 步：监听变化

```js
render();
window.addEventListener('resize', render);
window.addEventListener('orientationchange', render);
window.visualViewport?.addEventListener('resize', render);
window.visualViewport?.addEventListener('scroll', render);
```

这样横竖屏、窗口改变、视觉视口改变时会自动更新。

### 第 7 步：按固定清单调试

遇到 viewport 问题时依次检查：

```text
1. viewport meta 是否正确？
2. 当前模拟设备 CSS 宽高是多少？
3. innerWidth/clientWidth 是多少？
4. visualViewport 是否变化？
5. scale 是否不是 1？
6. 是否只在软键盘出现后异常？
7. 真机是否能复现？
```

这比“反复改 CSS 看运气”更可靠。

### 第 8 步：完成案例

最终源码查看 [`index.html`](./index.html)。

本节总结：

- **本节核心能力**：建立稳定的 viewport 调试流程，并会读取关键数据。
- **实验辅助代码**：实时调试面板和事件监听，用于把浏览器状态显示出来。

## 运行案例

执行：

```bash
python3 -m http.server 8080
```

访问 `http://localhost:8080/index.html`。

建议依次测试：

1. 普通桌面窗口 resize。
2. Chrome Device Toolbar 多个宽度。
3. 横竖屏切换。
4. 真实手机打开页面。
5. 真机聚焦输入框调起软键盘。
6. 真机 pinch zoom。

## 效果验证

你应该能够确认：

- 调试面板能实时显示布局视口、视觉视口、屏幕尺寸和 DPR。
- 调整窗口或设备模拟尺寸时数据会刷新。
- 在支持环境中能看到 Visual Viewport 的 width、height、scale。
- 能解释为什么 DevTools 模拟只是第一轮验证，移动端复杂问题仍需要真机。
- 能按固定步骤定位 viewport 问题，而不是直接从 CSS 猜原因。
