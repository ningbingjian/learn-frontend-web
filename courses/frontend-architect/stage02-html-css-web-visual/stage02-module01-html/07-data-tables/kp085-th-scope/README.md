# KP085：`th` 与 `scope`

> 本节把“单元格里显示粗体文字”升级为真正的表头关系：哪些标题负责一列，哪些标题负责一行。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从-0-到-1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 分清 `th` 与 `td` 的语义职责。
2. 使用 `scope="col"` 标记列标题。
3. 使用 `scope="row"` 标记行标题。
4. 解释为什么 `th` 的默认粗体 / 居中不是它的核心价值。
5. 为简单规则表格建立清晰的行列标题关系。

## 理论讲解

### 1. `th` 表示表头单元格

```text
td → 数据值
th → 表头 / 标题单元格
```

例如：

```html
<tr>
  <th>产品</th>
  <th>销量</th>
</tr>
```

浏览器通常会把 `th` 默认显示成粗体或居中，但那只是浏览器样式。

即使写：

```css
th {
  font-weight: normal;
  text-align: left;
}
```

它仍然是表头单元格。

### 2. `scope="col"`：负责这一列

```html
<th scope="col">销量</th>
```

意思是“这个 `th` 是一列的标题”。

在简单表格中，辅助技术可以利用这种关系，让用户在进入某个数据格时获得对应列标题上下文。

### 3. `scope="row"`：负责这一行

```html
<th scope="row">键盘</th>
```

表示“键盘”是这一行数据的标题，而不是一个普通数据值。

于是：

```text
键盘 × Q1销量
键盘 × Q2销量
```

中的“键盘”可以被理解为当前数据格的行上下文。

### 4. 简单表格优先使用清晰的 `scope`

如果表格就是普通的一层列标题 + 一层行标题，`scope="row"` / `scope="col"` 通常已经很清楚。

下一节 KP086 才会处理多级复杂表头，用 `headers` + `id` 明确列出一个数据格对应多个表头。

## 动手编码：从 0 到 1

### 第 0 步：先写纯数据表格

```html
<table id="sales-table">
  <tr>
    <td>产品</td>
    <td>Q1 销量</td>
    <td>Q2 销量</td>
  </tr>
  <tr>
    <td>键盘</td>
    <td>120</td>
    <td>150</td>
  </tr>
</table>
```

**问题：** 浏览器只能看到这些是单元格，但“产品 / Q1 / 键盘”都还是普通 `td`。

### 第 1 步：把列标题改为 `th`

```html
<thead>
  <tr>
    <th scope="col">产品</th>
    <th scope="col">Q1 销量</th>
    <th scope="col">Q2 销量</th>
  </tr>
</thead>
```

**为什么这样写：** 三个标题分别负责对应的列。

### 第 2 步：把每行第一格改为行标题

```html
<tbody>
  <tr>
    <th scope="row">键盘</th>
    <td>120</td>
    <td>150</td>
  </tr>
  <tr>
    <th scope="row">鼠标</th>
    <td>200</td>
    <td>240</td>
  </tr>
</tbody>
```

**为什么这样写：** “键盘”和“鼠标”命名的是整行记录。

### 第 3 步：抹掉 `th` 的默认视觉特征

```css
th {
  font-weight: normal;
  text-align: left;
}
```

**为什么这样写：** 用实验强制自己记住：

```text
th ≠ 粗体标签
th = 表头语义
```

### 第 4 步：打印所有 `th.scope`

```js
const headers = [...document.querySelectorAll('#sales-table th')];

const report = headers.map(header => {
  return `${header.textContent.trim()} → scope=${header.scope}`;
});
```

**观察：** 页面会打印哪些是 `col`，哪些是 `row`。

### 第 5 步：做一个教学版行列关联检查

案例脚本会按照规则网格，把每个 `td` 的 `cellIndex` 对应到表头行的列标题，再找到当前行的 `th[scope="row"]`。

例如：

```text
120 → 行标题“键盘”，列标题“Q1 销量”
```

这段 JS 只是为了把关系可视化，不是在重新实现浏览器或读屏软件的完整表格算法。

### 第 6 步：完成案例

最终源码：[`index.html`](./index.html)

**本节核心代码：**

- `<th>`；
- `scope="col"`；
- `scope="row"`。

**实验辅助代码：**

- CSS 重置 `th` 默认样式，用来证明语义不等于粗体；
- JS 打印关联结果，只是教学可视化。

## 运行案例

直接打开 `index.html` 或运行：

```bash
python3 -m http.server 8000
```

## 效果验证

1. DevTools 中第一行三个 `th` 都是 `scope="col"`。
2. “键盘”“鼠标”都是 `scope="row"`。
3. 即使 `th` 被 CSS 改成普通字重和左对齐，它们仍然是 `TH`。
4. 页面教学检查能输出每个数据值的行标题和列标题。
5. 你能解释简单规则表格为什么优先使用清晰 `scope`。
