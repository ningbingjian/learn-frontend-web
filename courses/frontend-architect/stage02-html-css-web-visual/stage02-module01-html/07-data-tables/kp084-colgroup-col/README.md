# KP084：`colgroup`、`col`

> 本节从“行”切换到“列”的视角，学习如何声明列分组、用 `span` 表示连续多列，以及理解列元素可设置 CSS 的范围是有限的。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从-0-到-1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 使用 `colgroup` 描述一组表格列。
2. 使用 `col` 描述单列或连续多列。
3. 理解 `col span="2"` 表示一个列声明覆盖两个连续逻辑列。
4. 说明为什么 `col` 不能像普通容器一样承载单元格内容。
5. 理解列上的 CSS 可用范围有限，文字对齐等样式通常仍需要作用到单元格。

## 理论讲解

### 1. `colgroup` 是列结构声明

前面的知识点主要从行来理解表格：

```text
tr → 一行
```

`colgroup` / `col` 则从列来描述表格：

```html
<colgroup>
  <col>
  <col>
  <col>
</colgroup>
```

它们不包含可见文本，而是描述这些列的结构与部分展示属性。

### 2. `col` 是空元素

`col` 不写结束标签，也不能把 `td` 放进去：

```html
<col>
```

错误思路是：

```html
<col>
  <td>...</td>
</col>
```

真实单元格仍然属于 `tr`。

### 3. `span` 表示连续多列

```html
<colgroup>
  <col class="dimension-column">
  <col span="2" class="metric-column">
</colgroup>
```

这表示：

```text
第 1 列      → dimension-column
第 2～3 列   → metric-column
```

它不会制造新的数据格，只是一个列声明覆盖多个逻辑列。

### 4. 列样式能力是有限的

表格列不是普通盒子。CSS 对列生效的属性范围有限，常见可用方向包括：

- 列宽；
- 背景；
- 在特定表格边框模型下的边框相关效果；
- `visibility` 等列级效果。

不要假设把下面所有样式写到 `col` 上都会像写到 `td` 上一样工作：

```css
col {
  text-align: right;
  font-weight: bold;
}
```

如果目标是控制单元格文字对齐，通常应该直接选择对应 `th` / `td`。

## 动手编码：从 0 到 1

### 第 0 步：建立三列表格

```html
<table id="sales-table">
  <caption>渠道销售数据</caption>
  <thead>
    <tr><th>渠道</th><th>订单量</th><th>收入</th></tr>
  </thead>
  <tbody>
    <tr><td>官网</td><td>1280</td><td>38 万元</td></tr>
    <tr><td>小程序</td><td>960</td><td>27 万元</td></tr>
  </tbody>
</table>
```

**目标：** 先有真实的三列数据，再对列本身进行描述。

### 第 1 步：增加 `colgroup`

`caption` 后、行组前加入：

```html
<colgroup>
</colgroup>
```

**为什么这样写：** `colgroup` 描述整张表的列结构，而不是某一行。

### 第 2 步：声明第一列

```html
<colgroup>
  <col class="dimension-column">
</colgroup>
```

**为什么这样写：** 第一列是“渠道”维度列，与后面的数值列职责不同。

### 第 3 步：用 `span` 一次声明两列

```html
<colgroup>
  <col class="dimension-column">
  <col span="2" class="metric-column">
</colgroup>
```

**为什么这样写：** 订单量和收入是连续的两个指标列，可以由一个 `col span="2"` 共同表示。

**观察：** DOM 中只有两个 `COL` 元素，但它们合计代表 3 个逻辑列。

### 第 4 步：给列设置宽度和背景

```css
.dimension-column {
  width: 10rem;
  background: #f6f6f6;
}

.metric-column {
  width: 8rem;
  background: #fbfbfb;
}
```

**为什么这样写：** 这些是列级样式的典型用途。

### 第 5 步：文字对齐仍然作用到单元格

```css
th:nth-child(n + 2),
td:nth-child(n + 2) {
  text-align: right;
}
```

**为什么这样写：** 不把 `col` 当成普通容器；需要控制单元格文本时直接选择单元格。

### 第 6 步：用脚本计算列声明覆盖数

```js
const columns = [...document.querySelectorAll('#sales-table col')];
const representedCount = columns.reduce((total, column) => {
  return total + column.span;
}, 0);
```

**观察：** 两个 `col` 元素最终应表示 3 列。

### 第 7 步：完成案例

最终源码：[`index.html`](./index.html)

**本节核心代码：**

- `<colgroup>`；
- `<col>`；
- `span`；
- 列结构与行 / 单元格结构的区别。

**实验辅助代码：**

- 背景、宽度和文字对齐 CSS 用来观察样式边界；
- JS 只用于统计 `col.span` 覆盖的逻辑列数。

## 运行案例

直接打开 `index.html`，或执行：

```bash
python3 -m http.server 8000
```

## 效果验证

1. DevTools 能看到一个 `colgroup` 和两个 `col`。
2. 第二个 `col` 的 `span` 为 2。
3. 页面检查结果显示“2 个 col 元素，表示 3 个逻辑列”。
4. 第一列与后两列可以有不同列级背景 / 宽度。
5. 数值文字的右对齐来自单元格选择器，而不是依赖 `col` 传递普通文字样式。
