# KP004：Quirks Mode

> 节点：`node-02-01-01-01-01-01-02-02`  
> [返回模块索引](../../README.md) · [打开源码](./index.html)

## 文档目录

- [理论讲解](#理论讲解)
- [源码讲解](#源码讲解)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 理论讲解

### 1. `BackCompat` 标志

怪异模式是浏览器为兼容早期网页保留的文档模式。判断当前页面是否进入怪异模式，应读取：

```js
document.compatMode; // "BackCompat"
```

### 2. 常见触发原因

完整 HTML 文档缺少可识别的 DOCTYPE 是最常见原因。浏览器仍会解析并显示页面，但会启用部分历史兼容规则。

### 3. 诊断与对照

遇到旧页面布局异常时，应先检查 `document.compatMode` 和 `document.doctype`，再处理具体布局。补上标准声明后，需要重新验证依赖旧行为的页面，而不是继续用更多覆盖样式隐藏问题。

## 源码讲解

[`index.html`](./index.html) 故意不写 DOCTYPE，因此文件直接从注释和 `<html>` 开始。页面脚本读取 `document.compatMode`，并测量一个固定尺寸盒子的实际宽度。

盒子尺寸只是一个观察对象。最可靠的模式证据始终是 `BackCompat`；不同浏览器当前保留的具体怪异行为不应仅凭外观猜测。

## 运行案例

使用浏览器打开 [`index.html`](./index.html)，记录文档模式和盒子宽度。复制文件或直接在第一行加入 `<!doctype html>`，保存并刷新，再比较结果。

通过本地服务器运行时，在当前目录执行 `python3 -m http.server 8080`，访问 `http://localhost:8080/index.html`。

## 效果验证

原始文件应显示 `document.compatMode = BackCompat`。加入标准声明后，应显示 `CSS1Compat`。

盒子宽度必须以页面的实际输出为准；即使当前浏览器中宽度没有变化，文档模式变化仍然已经由 `compatMode` 明确证明。
