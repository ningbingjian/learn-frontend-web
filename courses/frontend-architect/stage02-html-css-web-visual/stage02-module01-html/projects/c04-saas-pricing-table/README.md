# C04：SaaS 套餐比较表

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 项目目标

这个项目把表格章节的知识组合成一个真实 SaaS 套餐比较页。重点不是“画出横线竖线”，而是让每个数据单元格都能追溯到正确的行标题和列标题。

完成后你应该能够：

1. 判断套餐比较属于二维数据，应该使用 `table` 而不是 Grid/Flex 拼出来的卡片集合。
2. 使用 `caption` 给表格提供明确主题。
3. 用 `thead/tbody/tfoot` 划分表格区域。
4. 使用 `colgroup/col` 表达列级结构和视觉提示。
5. 在简单区域使用 `scope`，在复杂表头中使用 `id/headers` 显式关联。
6. 理解 `rowspan/colspan` 对逻辑网格的影响。
7. 在小屏上通过横向滚动保留原生 table 语义。
8. 在动态切换月付/年付价格时，不破坏表头关系。

## 业务场景

页面比较三个套餐：

- Starter：个人和小团队；
- Pro：成长型团队；
- Enterprise：大型组织。

比较项包含价格、成员数、存储、审计日志和支持等级。

## 覆盖知识点

重点覆盖 KP081～KP088：

- `table/tr/td`；
- `thead/tbody/tfoot`；
- `caption`；
- `colgroup/col`；
- `th/scope`；
- `headers/id`；
- `rowspan/colspan`；
- 小屏响应式表格。

同时复用 KP097 的 radio 作为计费周期切换控件。

## 动手编码：从 0 到 1

### 第 1 步：先确认这是表格数据

如果用户的问题是：

> “Pro 套餐的存储空间是多少？”

答案需要同时沿着“Pro 列”和“存储空间行”定位，这就是典型二维关系，应使用 `table`。

### 第 2 步：添加 caption 和基础表头

```html
<table>
  <caption>CloudDesk 套餐功能与价格比较</caption>
  <thead>...</thead>
  <tbody>...</tbody>
</table>
```

`caption` 是表格自身的标题，不要只在表格前放一个视觉上很大的 `h2` 就结束。

### 第 3 步：构造复杂列标题

第一行把三个套餐归到“套餐方案”组：

```html
<tr>
  <th rowspan="2" scope="col">比较项目</th>
  <th id="plan-group" colspan="3">套餐方案</th>
</tr>
```

第二行再放 Starter / Pro / Enterprise。这里不依赖 `scope="colgroup"` 猜测跨三列关系，而是在下一步通过 `id/headers` 显式建立复杂关联。

### 第 4 步：给数据格建立显式关联

对复杂表头，用：

```html
<th id="feature-storage" scope="row">存储空间</th>
<td headers="feature-storage plan-group plan-pro">2 TB</td>
```

这样数据格显式关联：

- 行标题 `feature-storage`；
- 套餐组标题 `plan-group`；
- 具体套餐标题 `plan-pro`。

上下文不再依靠“肉眼看位置”猜出来。

### 第 5 步：用 colgroup 提供列级视觉提示

```html
<colgroup>
  <col class="feature-column">
  <col>
  <col class="recommended-column">
  <col>
</colgroup>
```

本项目用它突出 Pro 列，但不会把 `col` 当成万能 CSS 容器。

### 第 6 步：加入月付/年付动态价格

页面使用 radio 切换计费周期。JavaScript 只修改价格文本和机器值，不改变 `table/th/td/headers` 结构。

### 第 7 步：添加小屏滚动容器

```html
<div class="table-scroll" tabindex="0" aria-label="套餐比较表，可横向滚动">
  <table>...</table>
</div>
```

不要在小屏直接把每个 `tr/td` 改成没有表格语义的卡片。

### 第 8 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **项目核心 HTML**：caption、thead/tbody/tfoot、colgroup、scope、headers/id、rowspan/colspan。
- **实验辅助代码**：价格切换 JavaScript、小屏滚动 CSS、当前滚动状态提示。

## 运行案例

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html
python3 -m http.server 8080
```

访问：

```text
http://localhost:8080/projects/c04-saas-pricing-table/
```

## 效果验证

1. 表格存在可读的 `caption`。
2. “套餐方案”通过 `colspan=3` 覆盖三个套餐列。
3. “比较项目”通过 `rowspan=2` 跨越两行表头。
4. 数据格 `headers` 同时指向行标题、套餐组标题和具体套餐标题。
5. DevTools 中所有 `headers` ID 都能找到真实 `th`。
6. 切换年付后只改变价格值，不改变表头关联。
7. 缩到 600px 以下后出现横向滚动，第一列仍保持可见。
8. 表格仍然是原生 `table`，没有为了响应式重写成 div 卡片。
