# KP081：`table`、`tr`、`td`

> 本节只解决一个问题：什么时候应该使用数据表格，以及如何用 `table`、`tr`、`td` 建立最基础的规则网格。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从-0-到-1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 判断一组内容到底是“二维数据关系”还是普通页面布局。
2. 说明 `table`、`tr`、`td` 各自承担的结构职责。
3. 从空 HTML 文件开始写出一个规则的三列数据表格。
4. 通过 DOM API 检查每一行实际包含多少个单元格。
5. 理解“看起来像表格”与“语义上是表格”不是一回事。

## 理论讲解

### 1. 什么场景应该使用数据表格

`table` 适合表达**行和列之间存在稳定关系的数据**。

例如：

- 商品 × 价格 × 库存；
- 城市 × 请求量 × 成功率；
- 日期 × 收入 × 成本；
- 学生 × 科目 × 分数。

判断方法不是“页面上要不要画横线和竖线”，而是：

> 用户是否需要沿着某一行或某一列比较数据？

如果答案是“需要”，它通常就是表格数据。

反过来，页面的两栏布局、卡片宫格、导航菜单即使视觉上很整齐，也不应该为了排版而使用 `table`。

### 2. `table`、`tr`、`td` 的职责

最小数据表格由三层组成：

```html
<table>
  <tr>
    <td>键盘</td>
    <td>299</td>
    <td>有货</td>
  </tr>
</table>
```

可以这样记：

```text
table → 整张表
tr    → table row，一行
td    → table data cell，一个数据单元格
```

`td` 不是普通盒子，它表示这个值位于某一个表格坐标中。

### 3. 什么是规则网格

如果一个表格有三列，那么最容易理解的基础结构是每一行都包含三个逻辑单元格：

```text
第 1 行：3 个单元格
第 2 行：3 个单元格
第 3 行：3 个单元格
```

后续 KP087 会学习 `rowspan`、`colspan`。在没有跨行跨列之前，先保持规则网格最容易观察结构。

### 4. 本节暂时没有表头

真实业务表格通常还需要：

- `caption` 表格标题；
- `th` 表头单元格；
- `scope` 或 `headers` 建立表头关系。

这些会在 KP083～KP086 专门学习。本节故意只保留 `table` / `tr` / `td`，先把最基本的网格关系看清楚。

## 动手编码：从 0 到 1

### 第 0 步：创建最小 HTML 文件

新建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KP081 - table、tr、td</title>
</head>
<body>
</body>
</html>
```

**为什么这样写：** 先得到一个可以独立运行的 HTML 文档，再逐步增加表格结构。

**运行后观察：** 页面暂时为空，但浏览器可以正常解析文档。

### 第 1 步：加入表格容器

在 `body` 中加入：

```html
<main>
  <h1>商品库存</h1>
  <table id="inventory-table"></table>
</main>
```

**为什么这样写：** `table` 先声明“这里是一组二维表格数据”，但现在还没有行和单元格。

**运行后观察：** 页面有标题，空表格本身没有可见数据。

### 第 2 步：加入第一行

```html
<table id="inventory-table">
  <tr>
    <td>键盘</td>
    <td>299 元</td>
    <td>有货</td>
  </tr>
</table>
```

**为什么这样写：** 一个 `tr` 建立一条记录，三个 `td` 建立三个数据坐标。

**运行后观察：** 浏览器会显示“键盘 299 元 有货”。默认样式很朴素，但结构已经存在。

### 第 3 步：补成三行规则网格

```html
<table id="inventory-table">
  <tr>
    <td>键盘</td>
    <td>299 元</td>
    <td>有货</td>
  </tr>
  <tr>
    <td>鼠标</td>
    <td>159 元</td>
    <td>有货</td>
  </tr>
  <tr>
    <td>显示器</td>
    <td>1299 元</td>
    <td>缺货</td>
  </tr>
</table>
```

**为什么这样写：** 三行都保持三个逻辑单元格，便于观察规则网格。

**运行后观察：** 三条商品记录会按行排列，每条记录都有三个数据格。

### 第 4 步：只用 CSS 增强可见边界

```css
table {
  border-collapse: collapse;
}

td {
  border: 1px solid #888;
  padding: 0.5rem 0.75rem;
}
```

**为什么这样写：** 边框只是帮助观察，表格语义并不来自 CSS。

**运行后观察：** 单元格边界变清晰，但 HTML 结构没有变化。

### 第 5 步：加入 DOM 检查代码

在表格后放一个输出区域：

```html
<h2>DOM 检查</h2>
<pre id="inspection"></pre>
```

再加入：

```js
const rows = [...document.querySelectorAll('#inventory-table tr')];
const report = rows.map((row, index) => {
  return `第 ${index + 1} 行：${row.cells.length} 个单元格`;
});

document.querySelector('#inspection').textContent = report.join('\n');
```

**为什么这样写：** `HTMLTableRowElement.cells` 可以直接告诉我们一行里实际有多少个表格单元格。

**运行后观察：** 输出应该连续显示三次“3 个单元格”。

### 第 6 步：完成案例

最终源码：[`index.html`](./index.html)

**本节核心代码：**

- `<table>`；
- `<tr>`；
- `<td>`；
- 每行保持相同逻辑列数的基础网格。

**实验辅助代码：**

- CSS 边框和间距，只为了看清单元格；
- `row.cells.length` 检查脚本，只为了把 DOM 结构打印出来。

不要把辅助 CSS / JS 误认为建立表格语义所必需的代码。

## 运行案例

直接双击 `index.html` 就可以运行。

也可以在当前目录启动静态服务器：

```bash
python3 -m http.server 8000
```

然后访问当前知识点目录对应的 `index.html`。

## 效果验证

打开页面并确认：

1. 页面显示三条商品记录。
2. 每条记录都由三个 `td` 组成。
3. DevTools Elements 中可以看到 `table → tr → td` 的网格结构。
4. “DOM 检查”显示三行都是 3 个单元格。
5. 删除 CSS 后表格仍然保持表格 DOM 结构，只是视觉边界变弱。
6. 你能够解释为什么页面卡片布局不应该仅为了排版而改成 `table`。
