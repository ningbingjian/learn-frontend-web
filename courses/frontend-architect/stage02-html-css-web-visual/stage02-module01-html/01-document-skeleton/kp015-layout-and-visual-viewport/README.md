# KP015：布局视口与视觉视口

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 Layout Viewport 和 Visual Viewport。
2. 理解 pinch zoom、移动软键盘等为什么主要影响视觉视口。
3. 使用常见 API 读取布局视口和视觉视口数据。
4. 理解为什么移动端浮层、键盘避让等场景不能只看一个宽高值。

## 理论讲解

### 1. Layout Viewport

布局视口是浏览器进行页面布局时的重要参考区域。

常见观察方式：

```js
document.documentElement.clientWidth
window.innerWidth
```

在很多普通场景下二者非常接近，但不要把所有浏览器和滚动条场景都假设成完全一致。

### 2. Visual Viewport

视觉视口表示用户当前真正看到的那部分页面区域。

现代浏览器提供：

```js
window.visualViewport
```

常见属性：

```text
width
height
scale
offsetLeft
offsetTop
```

### 3. 页面缩放时的差异

当移动端用户 pinch zoom：

- 页面布局不一定重新按放大后的可见区域重新布局。
- Visual Viewport 会变小。
- `visualViewport.scale` 会变化。

因此“页面排版参考多宽”和“用户现在看到多宽”是两个不同问题。

### 4. 软键盘的影响

移动端输入框获得焦点后，虚拟键盘可能占据屏幕的一部分。

此时 Visual Viewport 高度可能发生变化。

所以底部工具条、聊天输入框、浮层定位等场景，需要理解视觉视口变化，而不能只依赖初始屏幕高度。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：创建带标准 viewport 的页面

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KP015：布局视口与视觉视口</title>
</head>
<body>
  <h1>双视口实验</h1>
</body>
</html>
```

### 第 1 步：加入输入框

```html
<label>
  点击输入框调起移动键盘：
  <input type="text" placeholder="在手机上测试">
</label>
```

它用于在真实移动设备上观察软键盘对视觉视口的影响。

### 第 2 步：加入数据区域

```html
<pre id="result"></pre>
```

### 第 3 步：读取布局视口

```js
const layoutWidth = document.documentElement.clientWidth;
const layoutHeight = document.documentElement.clientHeight;
```

### 第 4 步：读取视觉视口

```js
const viewport = window.visualViewport;
const visualWidth = viewport?.width;
const visualHeight = viewport?.height;
const scale = viewport?.scale;
```

### 第 5 步：完整输出

```js
function render() {
  const viewport = window.visualViewport;

  document.querySelector('#result').textContent = [
    'Layout Viewport:',
    '  width  = ' + document.documentElement.clientWidth,
    '  height = ' + document.documentElement.clientHeight,
    '',
    'Visual Viewport:',
    '  width  = ' + (viewport ? viewport.width.toFixed(2) : '不支持'),
    '  height = ' + (viewport ? viewport.height.toFixed(2) : '不支持'),
    '  scale  = ' + (viewport ? viewport.scale : '不支持'),
    '  offsetTop = ' + (viewport ? viewport.offsetTop.toFixed(2) : '不支持')
  ].join('\n');
}
```

### 第 6 步：监听变化

```js
render();
window.addEventListener('resize', render);
window.visualViewport?.addEventListener('resize', render);
window.visualViewport?.addEventListener('scroll', render);
```

现在改变窗口、缩放页面或调起移动键盘时，结果会自动刷新。

### 第 7 步：完成案例

最终源码查看 [`index.html`](./index.html)。

本节总结：

- **本节核心代码**：布局视口与 `window.visualViewport` 的数据读取和概念对照。
- **实验辅助代码**：输入框和事件监听，用于主动制造 viewport 变化。

## 运行案例

执行：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080/index.html`。

推荐完成三组实验：

1. 调整桌面窗口宽高。
2. 在移动设备上 pinch zoom。
3. 在移动设备上聚焦输入框调起软键盘。

## 效果验证

你应该能够确认：

- 页面能同时显示 Layout Viewport 与 Visual Viewport 数据。
- 在普通未缩放状态下，两者可能很接近。
- pinch zoom 时 Visual Viewport 的宽高和 scale 会发生变化。
- 移动软键盘可能改变 Visual Viewport 高度。
- 能说明“布局区域”和“当前实际可见区域”为什么不能视为同一个概念。
