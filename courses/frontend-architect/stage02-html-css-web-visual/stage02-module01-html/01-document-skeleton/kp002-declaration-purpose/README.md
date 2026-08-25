# KP002：DOCTYPE 的声明用途

> 节点：`node-02-01-01-01-01-01-01-02`  
> [返回模块索引](../../README.md) · [打开源码](./index.html)

## 文档目录

- [理论讲解](#理论讲解)
- [源码讲解](#源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 理论讲解

### 1. 选择文档模式

DOCTYPE 的核心用途是告诉浏览器采用哪种文档模式。标准声明通常得到 `CSS1Compat`；缺少声明或使用某些遗留声明可能得到 `BackCompat`。

### 2. 它不是版本开关

`<!doctype html>` 不表示页面自动支持全部现代 HTML、CSS 或 JavaScript 功能，也不需要随着框架版本更新。浏览器能力取决于浏览器实现，而不是 DOCTYPE 中的版本号。

### 3. 功能应单独检测

不同能力使用各自的检测方式：

```js
CSS.supports('display', 'grid');
'HTMLDialogElement' in window;
```

第一行检查 CSS Grid，第二行检查 Dialog API。它们和 `document.compatMode` 属于不同维度。

## 源码讲解

[`index.html`](./index.html) 同时输出三项结果：文档模式、CSS Grid 支持和 Dialog API 支持。删除 DOCTYPE 只改变实验中的文档模式，不会改变当前浏览器已经实现的功能。

源码把三种检测并排展示，目的是防止把“页面使用标准模式”和“浏览器支持某项能力”混为一谈。

## 运行案例

使用浏览器打开 [`index.html`](./index.html)，记录三个结果。删除文件第一行 `<!doctype html>`，保存并刷新，再次记录结果；实验完成后恢复第一行。

也可以在当前目录运行 `python3 -m http.server 8080`，访问 `http://localhost:8080/index.html`。

## 效果验证

保留声明时，文档模式应为 `CSS1Compat`。删除声明后，文档模式应变为 `BackCompat`。

在同一浏览器中，两次实验的 CSS Grid 和 Dialog API 检测结果应保持一致。这证明 DOCTYPE 负责文档模式，而不是启用浏览器功能。
