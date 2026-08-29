# KP086：`headers` 与 `id`

> 本节处理简单 `scope` 不够直观的多级表头：让一个数据格显式关联行标题、季度分组标题和指标标题。

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从-0-到-1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 给复杂表头单元格分配唯一 `id`。
2. 使用 `headers` 让一个 `td` 显式关联多个 `th`。
3. 解释 `headers` 是由空格分隔的 ID 引用列表。
4. 使用 JS 解析并检查 `headers` 中引用的表头文本。
5. 知道什么时候简单 `scope` 已经够用，什么时候复杂矩阵才值得使用 `headers` / `id`。

## 理论讲解

### 1. 为什么复杂表格需要更明确的关联

简单表格只有一层列标题：

```text
产品 | Q1销量 | Q2销量
```

`scope="row"` + `scope="col"` 已经很好理解。

复杂表格可能有多层标题：

```text
              第一季度          第二季度
产品        销量   收入        销量   收入
键盘        120   3万         150   4万
```

此时“120”这个格子至少同时属于：

```text
键盘
第一季度
销量
```

`headers` 可以把这些关联直接写出来。

### 2. 先给 `th` 唯一 `id`

例如：

```html
<th id="q1">第一季度</th>
<th id="q1-sales">销量</th>
<th id="keyboard">键盘</th>
```

这里的 `id` 遵守普通 HTML `id` 规则：在文档中应该唯一。

### 3. 数据格使用 `headers`

```html
<td headers="keyboard q1 q1-sales">120</td>
```

可以理解为：

```text
120 的表头 = keyboard + q1 + q1-sales
```

`headers` 的值是**空格分隔的 ID 列表**，每个 ID 应该能指向对应的表头单元格。

### 4. 不要给所有简单表格机械加入 `headers`

如果一个普通三列表格已经可以用：

```html
<th scope="col">...</th>
<th scope="row">...</th>
```

表达清楚，就没有必要人为维护大量 ID。

可以按下面原则理解：

```text
规则简单 → scope 优先
多层复杂 → headers / id 可以显式消歧
```

### 5. 关于本节提前出现的 `colspan`

为了构造“季度 → 销量 / 收入”的多级表头，案例会提前使用：

```html
<th colspan="2">第一季度</th>
```

本节只把它当作构造多级表头所需的结构。`rowspan` / `colspan` 如何改变网格坐标，会在下一节 KP087 专门拆解。

### 6. 如何验证读屏关系

验证复杂表格不能只看页面视觉效果。

建议至少做两层检查：

1. DevTools / JS：确认 `headers` 引用的每个 ID 都真实存在。
2. 浏览器辅助功能树或实际读屏软件：在数据格之间移动，确认能获得期望的标题上下文。

不同浏览器 / 辅助技术组合可能呈现略有差异，因此不要只用一段 JS 就宣称完成了完整无障碍验证。

## 动手编码：从 0 到 1

### 第 0 步：先建立二维数据目标

我们要表示：

```text
              第一季度          第二季度
产品        销量   收入        销量   收入
键盘        120   3万元        150   4万元
鼠标        200   2万元        240   3万元
```

先明确真实数据关系，再决定 HTML。

### 第 1 步：创建季度分组表头

```html
<thead>
  <tr>
    <th id="product" rowspan="2">产品</th>
    <th id="q1" colspan="2">第一季度</th>
    <th id="q2" colspan="2">第二季度</th>
  </tr>
  <tr>
    <th id="q1-sales" headers="q1">销量</th>
    <th id="q1-revenue" headers="q1">收入</th>
    <th id="q2-sales" headers="q2">销量</th>
    <th id="q2-revenue" headers="q2">收入</th>
  </tr>
</thead>
```

**为什么这样写：** 每个季度是一级标题，销量 / 收入是二级标题。

### 第 2 步：给行标题加唯一 ID

```html
<th id="keyboard" scope="row">键盘</th>
```

第二行：

```html
<th id="mouse" scope="row">鼠标</th>
```

**为什么这样写：** 后面的每个数据格都需要显式引用自己所属的产品行。

### 第 3 步：给数据格写完整 `headers`

键盘第一季度销量：

```html
<td headers="keyboard q1 q1-sales">120</td>
```

键盘第二季度收入：

```html
<td headers="keyboard q2 q2-revenue">4 万元</td>
```

**为什么这样写：** 每个数据格显式列出“行标题 + 分组标题 + 指标标题”。

### 第 4 步：让脚本解析 ID 引用

```js
function resolveHeaders(cell) {
  return cell.headers
    .trim()
    .split(/\s+/)
    .map(id => document.getElementById(id)?.textContent.trim());
}
```

**为什么这样写：** 把隐藏在属性里的关系打印成人能直接读懂的文字。

**观察：** `120` 应解析为“键盘 → 第一季度 → 销量”。

### 第 5 步：检查失效 ID

完整案例还会检查：

```js
const missing = ids.filter(id => !document.getElementById(id));
```

**为什么这样写：** 复杂表格最常见维护错误之一，就是重构表头 ID 后忘了同步 `headers`。

### 第 6 步：完成案例

最终源码：[`index.html`](./index.html)

**本节核心代码：**

- 表头 `id`；
- 数据格 `headers`；
- 一个数据格关联多个表头的显式关系。

**实验辅助代码：**

- `rowspan` / `colspan` 只是为了构造多级表头，下一节才深入；
- JS 用于验证 ID 是否存在、把关联文本打印出来；
- CSS 只负责可见边框。

## 运行案例

直接打开 `index.html`，或运行：

```bash
python3 -m http.server 8000
```

如果要做完整无障碍检查，再配合浏览器 Accessibility 面板或实际读屏软件。

## 效果验证

1. 每个复杂表头 `th` 都有唯一 ID。
2. 每个数据 `td` 都包含由空格分隔的 `headers` 引用。
3. `120` 的解析结果包含“键盘 / 第一季度 / 销量”。
4. `4 万元` 的解析结果包含“键盘 / 第二季度 / 收入”。
5. 页面检查结果没有“缺失 ID”。
6. 你能说明简单表格为什么不应该机械堆满 `headers`。
7. 你知道 JS 检查不能替代真实辅助技术验证。
