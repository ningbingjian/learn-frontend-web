# KP120：`details` 与 `summary` 内容模型

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `<details>` 与 `<summary>` 创建原生披露组件。
2. 理解 `open` 是布尔属性：存在即打开，缺失即关闭。
3. 理解 `<summary>` 是用户操作入口，浏览器提供鼠标与键盘交互。
4. 使用 `toggle` 事件观察打开和关闭状态。
5. 知道原生披露组件与普通 `div + click` 方案的语义差异。

> **本节核心代码**：`details`、`summary`、`open`。  
> **实验辅助代码**：`toggle` 事件日志和 DOM 属性输出。

## 理论讲解

### 1. `details` 表达“可展开的补充内容”

最小结构：

```html
<details>
  <summary>查看系统要求</summary>
  <p>需要现代浏览器。</p>
</details>
```

`summary` 是披露控件的可见标题。其余内容在关闭时被折叠，打开后显示。

不要只写一个普通 `div` 再手工绑定点击事件来模拟同一件事；原生元素已经提供了语义、状态和键盘行为。

### 2. `open` 是布尔属性

```html
<details open>
  ...
</details>
```

表示初始打开。

布尔属性的规则是“是否存在”，因此：

```html
<details open="false">
```

仍然会被视为打开。要关闭，应该移除整个 `open` 属性。

DOM 中可以读取：

```js
details.open
```

它返回真正的布尔值。

### 3. 原生键盘交互

浏览器会把 `<summary>` 作为可操作入口。用户可通过键盘聚焦并激活它，不需要开发者再手工模拟按钮行为。

如果产品只是简单披露，不要给 `summary` 再叠加不必要的 `role="button"` 或自制键盘事件。

### 4. `toggle` 事件

打开或关闭 `<details>` 后会触发：

```js
details.addEventListener('toggle', () => {
  console.log(details.open);
});
```

注意：短时间连续切换时，浏览器可能合并多个 `toggle` 事件。因此它适合观察最终状态，不适合拿来假设每一次中间状态都一定收到独立事件。

## 动手编码：从 0 到 1

### 第 0 步：创建最小页面

新建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KP120 details 内容模型</title>
</head>
<body>
  <h1>课程说明</h1>
</body>
</html>
```

**本步目标**：准备标准 HTML 文档。  
**为什么这样写**：先排除文档骨架对实验的干扰。  
**运行后观察**：页面只有标题。

### 第 1 步：加入原生披露结构

```html
<details id="requirements">
  <summary>查看系统要求</summary>
  <ul>
    <li>现代浏览器</li>
    <li>启用 JavaScript 仅用于观察日志</li>
  </ul>
</details>
```

**本步目标**：建立 `details → summary + 内容` 的结构。  
**为什么这样写**：披露标题和隐藏内容职责清晰。  
**运行后观察**：可点击标题展开/折叠内容。

### 第 2 步：加入一个默认打开案例

```html
<details id="schedule" open>
  <summary>本周安排</summary>
  <p>周一学习 details，周二做复盘。</p>
</details>
```

**本步目标**：观察 `open` 的初始状态。  
**为什么这样写**：`open` 直接表达状态，不需要额外 class。  
**运行后观察**：第二个区域加载时已经打开。

### 第 3 步：记录 DOM 状态

```js
for (const item of document.querySelectorAll('details')) {
  item.addEventListener('toggle', () => {
    log.textContent = `${item.id}: open=${item.open}`;
  });
}
```

**本步目标**：把视觉状态与 DOM 属性对应起来。  
**为什么这样写**：帮助区分布尔 HTML 属性和 JS 布尔属性。  
**运行后观察**：每次展开/关闭后日志更新。

### 第 4 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：`<details>`、`<summary>`、`open`。
- **实验辅助代码**：基础 CSS 和 `toggle` 日志。

## 运行案例

直接用浏览器打开 `index.html` 即可；也可在模块目录启动静态服务器：

```bash
python3 -m http.server 8080
```

## 效果验证

1. 使用鼠标可以展开和折叠两个 `details`。
2. 使用键盘聚焦 `summary` 后可以激活披露。
3. `schedule` 初始为打开状态。
4. 切换后日志中的 `.open` 为真正的 `true/false`。
5. 能解释为什么 `open="false"` 仍然是打开状态。
6. 能解释为什么简单披露优先考虑原生元素，而不是从 `div` 重做交互。
