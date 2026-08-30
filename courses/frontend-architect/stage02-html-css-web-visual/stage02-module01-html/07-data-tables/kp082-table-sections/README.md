# KP082：`thead`、`tbody`、`tfoot`

> 本节学习把表格中的“表头区域、主体数据、汇总区域”分成明确的行组，并通过 DOM 观察浏览器自动插入 `tbody` 的行为。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从-0-到-1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 分清 `thead`、`tbody`、`tfoot` 三类表格行组的职责。
2. 为订单表建立清晰的头部、主体和汇总结构。
3. 解释为什么源码里直接写 `tr`，DOM 中却可能出现 `tbody`。
4. 使用 `table.tHead`、`table.tBodies`、`table.tFoot` 检查分组。
5. 用结构选择器对不同表格区域做样式或脚本处理。

## 理论讲解

### 1. 三种行组分别表示什么

```text
thead → 表格头部行组
tbody → 表格主体行组
tfoot → 表格尾部 / 汇总行组
```

它们的价值不是“自动变颜色”，而是把一张表的不同职责显式分组。

例如订单报表：

- `thead`：列名称；
- `tbody`：每条订单数据；
- `tfoot`：合计。

### 2. 分组后更容易维护

明确分组后，可以写出更稳定的选择器：

```css
thead { ... }
tbody tr { ... }
tfoot { ... }
```

脚本也可以直接使用表格 DOM API：

```js
table.tHead
table.tBodies
table.tFoot
```

这比依赖“第一个 `tr` 是头、最后一个 `tr` 是合计”更清晰。

### 3. 浏览器为什么会自动插入 `tbody`

下面的源码没有显式写 `tbody`：

```html
<table id="implicit-body">
  <tr>
    <td>A001</td>
    <td>299</td>
  </tr>
</table>
```

当 HTML 解析器解析这种表格源码时，会把这些主体行放进一个隐式的 `tbody`。

因此你在 DevTools Elements 中通常会看到：

```html
<table id="implicit-body">
  <tbody>
    <tr>...</tr>
  </tbody>
</table>
```

这也是为什么调试 HTML 时不能只盯着源文件，还要看**解析后的 DOM**。

> 注意：这里说的是 HTML 源码解析过程。通过 DOM API 动态插入节点时，行为需要按相应 DOM API 自己的规则理解。

### 4. 本节会提前看到 `th`

为了让表头示例符合真实表格习惯，案例会在 `thead` 里使用 `th`。本节只把它当作“表头单元格”预览，`th` 与 `scope` 的完整语义在 KP085 专门学习。

## 动手编码：从 0 到 1

### 第 0 步：创建最小文档

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>KP082 - 表格行组</title>
</head>
<body>
</body>
</html>
```

**目标：** 先建立可独立运行的文档。

**观察：** 页面为空，但 HTML 可以正常解析。

### 第 1 步：写一个没有分组的订单表

```html
<table>
  <tr>
    <td>订单号</td>
    <td>金额</td>
  </tr>
  <tr>
    <td>A001</td>
    <td>299 元</td>
  </tr>
</table>
```

**为什么这样写：** 先看到“所有行都堆在一起”的基础状态。

**观察：** 视觉上能显示，但源码没有表达哪些行是头、哪些行是主体。

### 第 2 步：加入 `thead`

```html
<thead>
  <tr>
    <th>订单号</th>
    <th>金额</th>
  </tr>
</thead>
```

**为什么这样写：** 把列标题所在的行组明确标记出来。

**观察：** DOM 中出现 `THEAD`。

### 第 3 步：加入 `tbody`

```html
<tbody>
  <tr>
    <td>A001</td>
    <td>299 元</td>
  </tr>
  <tr>
    <td>A002</td>
    <td>159 元</td>
  </tr>
</tbody>
```

**为什么这样写：** 真实业务数据被放进主体行组。

**观察：** `table.tBodies.length` 现在至少为 1。

### 第 4 步：加入 `tfoot`

```html
<tfoot>
  <tr>
    <td>合计</td>
    <td>458 元</td>
  </tr>
</tfoot>
```

**为什么这样写：** 合计不再与普通订单记录混在同一个职责层级。

**观察：** DOM 中出现 `TFOOT`。

### 第 5 步：加入自动 `tbody` 实验

再写第二张表，故意不写 `tbody`：

```html
<table id="implicit-body">
  <tr>
    <td>B001</td>
    <td>99 元</td>
  </tr>
</table>
```

然后打印它的直接子元素：

```js
const implicit = document.querySelector('#implicit-body');
const childTags = [...implicit.children].map(element => element.tagName);
```

**为什么这样写：** 用实际 DOM 验证解析器修正后的结构。

**观察：** `childTags` 中会出现 `TBODY`，即使源码没有手写它。

### 第 6 步：检查显式分组 API

```js
const table = document.querySelector('#orders');

console.log(table.tHead);
console.log(table.tBodies.length);
console.log(table.tFoot);
```

**为什么这样写：** 表格 DOM 已经为这些结构提供了专门访问入口。

### 第 7 步：完成案例

最终源码：[`index.html`](./index.html)

**本节核心代码：**

- `<thead>`；
- `<tbody>`；
- `<tfoot>`；
- 理解 HTML 解析器可能自动生成 `tbody`。

**实验辅助代码：**

- `th` 只是为了让表头示例更真实，完整语义留到 KP085；
- CSS 用于突出不同区域；
- JS 用于打印解析后的 DOM 行组。

## 运行案例

可直接打开 `index.html`，或者在目录中执行：

```bash
python3 -m http.server 8000
```

## 效果验证

1. 第一张表能看到表头、两条订单和合计。
2. DevTools 中第一张表明确包含 `thead`、`tbody`、`tfoot`。
3. 页面检查结果显示 `tBodies.length === 1`。
4. 第二张表源码没有 `tbody`，但 DevTools DOM 中出现 `tbody`。
5. 你能解释为什么结构分组比“第几行”式脚本更稳定。
