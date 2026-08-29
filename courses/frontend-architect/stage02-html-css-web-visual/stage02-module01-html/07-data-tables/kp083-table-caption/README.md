# KP083：`caption`

> 本节学习给一张数据表格提供自己的标题，并理解表格标题与页面周围的标题、段落并不是同一职责。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从-0-到-1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 使用 `caption` 为表格提供明确标题。
2. 说明 `caption` 与页面 `h1` / `h2` / 普通段落的职责区别。
3. 理解 `caption` 与所属 `table` 是结构绑定关系。
4. 使用 `table.caption` 检查表格标题。
5. 理解视觉位置变化不会改变 `caption` 与表格的语义关系。

## 理论讲解

### 1. `caption` 是表格自己的标题

基本结构：

```html
<table>
  <caption>2026 Q2 各渠道订单量与收入</caption>
  ...
</table>
```

`caption` 描述的是**这张表本身是什么数据**。

如果页面里有很多张表，清晰的 `caption` 能帮助用户快速判断当前表格的主题。

### 2. `caption` 通常为表格提供可访问名称

在常见浏览器与辅助技术映射中，`caption` 会作为表格的重要可访问标题 / 名称来源。

因此：

```html
<caption>数据</caption>
```

虽然语法没错，但信息量太低。

更好的标题应该能脱离视觉布局仍然说明表格内容：

```html
<caption>2026 Q2 各渠道订单量与收入</caption>
```

### 3. 它和页面标题不是互相替代

页面可能这样组织：

```html
<h1>季度经营数据</h1>
<p>本页汇总销售和渠道数据。</p>

<table>
  <caption>2026 Q2 各渠道订单量与收入</caption>
  ...
</table>
```

职责分别是：

```text
h1 / h2  → 页面或章节结构
p        → 周围正文说明
caption  → 具体这张 table 的标题
```

不能因为前面已经有一个 `h2`，就默认表格不需要自己的清晰标题。

### 4. `caption` 的结构位置与视觉位置

在 HTML 结构中，`caption` 应放在 `table` 内，并作为表格内容中很靠前的标题元素。

CSS 可以改变它的视觉位置：

```css
caption {
  caption-side: bottom;
}
```

这只改变绘制位置，不会把它从所属 `table` 的语义关系中移走。

## 动手编码：从 0 到 1

### 第 0 步：创建一个普通页面

```html
<main>
  <h1>季度经营数据</h1>
  <p>本页汇总各渠道订单情况。</p>
</main>
```

**目标：** 先建立页面层级，而不是一上来就把所有文字塞进表格。

### 第 1 步：加入数据表格

```html
<table id="channel-table">
  <thead>
    <tr>
      <th>渠道</th>
      <th>订单量</th>
      <th>收入</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>官网</td><td>1280</td><td>38 万元</td></tr>
    <tr><td>小程序</td><td>960</td><td>27 万元</td></tr>
  </tbody>
</table>
```

**为什么这样写：** 先让数据本身形成表格。

### 第 2 步：给表格加入 `caption`

把它放在表格内容开始位置：

```html
<table id="channel-table">
  <caption>2026 Q2 各渠道订单量与收入</caption>
  ...
</table>
```

**为什么这样写：** 用户现在不需要通过上下文猜测这张表在统计什么。

**观察：** 浏览器默认会把 caption 显示在表格附近。

### 第 3 步：验证 `table.caption`

```js
const table = document.querySelector('#channel-table');
const caption = table.caption;

console.log(caption.textContent.trim());
```

**为什么这样写：** `HTMLTableElement` 提供了专门的 `caption` 属性，证明这不是一个与表格偶然挨在一起的普通段落。

### 第 4 步：改变视觉位置

```css
caption {
  caption-side: bottom;
  padding-top: 0.5rem;
}
```

**为什么这样写：** 故意把标题画到表格底部，观察“视觉位置”与“结构关系”是两件事。

**观察：** 标题显示到底部，但 `table.caption` 仍然能拿到同一个元素。

### 第 5 步：完成案例

最终源码：[`index.html`](./index.html)

**本节核心代码：**

- `<caption>`；
- `caption` 与所属 `table` 的结构关系；
- 表格标题与页面标题、正文说明的职责区分。

**实验辅助代码：**

- `caption-side: bottom` 用来验证视觉位置不决定语义；
- JS 用来打印 `table.caption`，不是表格标题生效的必要条件。

## 运行案例

可直接打开 `index.html`，也可以运行：

```bash
python3 -m http.server 8000
```

## 效果验证

1. 页面主标题是“季度经营数据”。
2. 表格自己的标题是“2026 Q2 各渠道订单量与收入”。
3. `caption` 即使通过 CSS 显示在表格底部，仍然属于该 `table`。
4. 页面检查区域能正确打印 `table.caption` 文本。
5. 你能够解释为什么周围的 `h1` 不能简单等同于 `caption`。
