# KP003：Standards Mode

> 节点：`node-02-01-01-01-01-01-02-01`  
> [返回模块索引](../../README.md) · [打开源码](./index.html)

## 文档目录

- [理论讲解](#理论讲解)
- [源码讲解](#源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 理论讲解

### 1. `CSS1Compat` 标志

标准模式表示浏览器没有启用早期网页依赖的怪异兼容行为。可以直接读取：

```js
document.compatMode; // "CSS1Compat"
```

### 2. `content-box` 尺寸

默认盒模型是 `content-box`。当元素声明 `width: 200px`、左右内边距各 `20px`、左右边框各 `10px` 时，`width` 只计算内容区，最终边框盒宽度为：

```text
200 + 20 × 2 + 10 × 2 = 260px
```

### 3. `border-box` 与实际测量

设置 `box-sizing: border-box` 后，声明宽度包含内容、内边距和边框，因此最终边框盒仍为 `200px`。`getBoundingClientRect().width` 可以读取真实布局宽度，用于验证手算结果。

## 源码讲解

[`index.html`](./index.html) 使用两张 CSS 声明基本相同的盒子。第一张保留默认 `content-box`，第二张增加 `box-sizing: border-box`。

脚本先读取 `document.compatMode`，再分别调用 `getBoundingClientRect().width`，把文档模式和两个真实尺寸直接显示在页面中。

## 运行案例

使用浏览器打开 [`index.html`](./index.html)。先手算两张盒子的宽度，再查看页面输出。随后可以修改 `width`、`padding` 或 `border`，保存并刷新重新验证。

通过本地服务器运行时，在当前目录执行 `python3 -m http.server 8080`，访问 `http://localhost:8080/index.html`。

## 效果验证

页面应显示：

- 文档模式为 `CSS1Compat`。
- `content-box` 的实际边框盒宽度为 `260px`。
- `border-box` 的实际边框盒宽度为 `200px`。

修改尺寸后，手算值应与浏览器输出保持一致。
