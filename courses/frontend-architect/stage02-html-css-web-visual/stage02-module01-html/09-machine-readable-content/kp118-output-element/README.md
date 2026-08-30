# KP118：`output` 元素

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 使用 `<output>` 表达计算结果或用户操作结果。
2. 使用 `for` 关联参与计算的控件 ID。
3. 理解 `<output>` 是 form-associated 元素，但它的值不会作为普通成功控件提交。
4. 使用 `name` 让 output 出现在 `form.elements` 中。
5. 通过 `.value` 更新结果并用 FormData 验证提交边界。

## 理论讲解

### 1. `output` 表达“计算结果”

例如数量 × 单价：

```html
<output id="total" for="price quantity">¥0.00</output>
```

相比普通 `<span>`，`output` 明确告诉浏览器和辅助技术：这里是某个计算或操作的结果。

### 2. `for` 是参与计算元素的 ID 列表

```html
<output for="price quantity">...</output>
```

`for` 是空格分隔的 ID 列表，表达这些控件影响了结果。

注意：它不是 JavaScript 自动计算机制；真正的计算仍需要脚本或其它逻辑完成。

### 3. `form` 可以显式指定表单归属

当 output 不在 form 内，也可以：

```html
<output form="order-form" for="price quantity">...</output>
```

本节为了观察简单，把 output 放在表单内部。

### 4. `name` 使 output 出现在 `form.elements`

```html
<output name="total" ...></output>
```

可以通过：

```js
form.elements.total
```

找到它。

但这是“表单归属”，不代表值会作为提交字段进入请求。

### 5. output 的值不会随表单提交

这是非常容易误解的边界。

即使写：

```html
<output name="total">...</output>
```

`new FormData(form)` 里也不会自动出现 `total`。

如果服务端确实需要总价，应根据可信输入重新计算，而不是相信前端计算结果。

### 6. `.value` 用来修改当前结果

```js
output.value = '¥59.80';
```

`output` 还支持 `defaultValue`，表单 reset 时可以恢复默认结果。

## 动手编码：从 0 到 1

### 第 0 步：创建订单表单

```html
<form id="order-form">
  <input id="price" name="price" type="number" value="19.9">
  <input id="quantity" name="quantity" type="number" value="2">
</form>
```

### 第 1 步：加入 output

```html
<output id="total" name="total" for="price quantity">¥39.80</output>
```

**本步目标**：用语义元素表示计算结果。

### 第 2 步：绑定输入变化

```js
function updateTotal() {
  const totalValue = price.valueAsNumber * quantity.valueAsNumber;
  total.value = `¥${totalValue.toFixed(2)}`;
}
```

### 第 3 步：观察表单归属

```js
console.log(form.elements.total === total);
```

结果应为 `true`。

### 第 4 步：验证 output 不进入 FormData

```js
const data = new FormData(form);
console.log(data.has('total'));
```

结果应为 `false`。

**为什么重要**：form-associated 与“会被提交”不是同一个概念。

### 第 5 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：`output[for][name]`、`.value`、表单归属。
- **实验辅助代码**：价格计算和 FormData 输出用于验证行为。

## 运行案例

直接浏览器打开 `index.html`。

## 效果验证

1. 修改单价或数量时总价实时更新。
2. output 的 `for` 同时关联两个输入 ID。
3. `form.elements.total` 可以找到 output。
4. `FormData` 包含 `price`、`quantity`，但不包含 `total`。
5. 能解释为什么后端总价仍应重新计算。
6. 能区分“表单归属”和“提交字段”。

完成后继续 **KP119：动态宣布**。
