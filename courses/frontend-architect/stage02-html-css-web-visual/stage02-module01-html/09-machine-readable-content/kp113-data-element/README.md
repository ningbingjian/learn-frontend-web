# KP113：`data` 元素

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `<data>` 用于把可见文本与机器可读值关联起来。
2. 使用 `value` 保存稳定商品编号、状态码或枚举值。
3. 区分展示文案与业务值，避免后端逻辑依赖本地化文本。
4. 知道日期时间内容应使用 `<time>` 而不是 `<data>`。
5. 能通过 `HTMLDataElement.value` 观察机器值。

## 理论讲解

### 1. 展示文本和业务值经常不是同一个东西

商品名称可能展示：

```text
专业版
```

业务系统却需要稳定值：

```text
plan_pro
```

可以写成：

```html
<data value="plan_pro">专业版</data>
```

### 2. `value` 应尽量稳定

如果页面切换英文：

```html
<data value="plan_pro">Pro Plan</data>
```

可见文本变了，但机器值不必跟着变化。

这对商品 ID、枚举码、内部分类码很有价值。

### 3. `data` 不是隐藏字段

`<data>` 是正常可见内容的一部分：

```html
<data value="SKU-2026-001">城市通勤背包</data>
```

它不是 `<input type="hidden">`，也不会自动参与表单提交。

### 4. 日期时间应该交给 `<time>`

错误方向：

```html
<data value="2026-08-30">8 月 30 日</data>
```

如果内容本质是日期，更合适的是：

```html
<time datetime="2026-08-30">8 月 30 日</time>
```

`time` 对日期时间的语义更明确。

### 5. 常见适用场景

- 商品编号；
- SKU；
- 枚举状态；
- 内部分类码；
- 展示名称与数据库 ID 的映射。

## 动手编码：从 0 到 1

### 第 0 步：准备页面

```html
<!doctype html>
<html lang="zh-CN">
<body>
  <h1>data 元素实验</h1>
</body>
</html>
```

**本步目标**：准备最小页面。

### 第 1 步：关联商品名称与 SKU

```html
<p>
  商品：
  <data id="product" value="SKU-2026-001">城市通勤背包</data>
</p>
```

**为什么这样写**：页面显示适合用户理解的名称，程序读取稳定 SKU。  
**观察结果**：视觉上只看到商品名。

### 第 2 步：关联套餐文案与枚举值

```html
<data id="plan" value="plan_pro">专业版</data>
```

以后即使把“专业版”改成“Pro”，`plan_pro` 仍可保持不变。

### 第 3 步：加入状态枚举

```html
<data id="status" value="paid">已支付</data>
```

**为什么这样写**：避免脚本通过“已支付”这种本地化文案判断状态。

### 第 4 步：读取 `value`

```js
const product = document.querySelector('#product');
console.log(product.textContent.trim(), product.value);
```

**观察结果**：同一元素同时提供可见文本和机器值。

### 第 5 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：`<data value="稳定业务值">展示文本</data>`。
- **实验辅助代码**：JavaScript 仅用于把 `.value` 打印出来观察。

## 运行案例

直接浏览器打开 `index.html`，或启动静态服务器：

```bash
python3 -m http.server 8080
```

## 效果验证

1. 页面能看到商品、套餐和订单状态三个示例。
2. 展示文本与 `value` 明确不同。
3. 修改展示文本不会要求同步修改业务枚举值。
4. JavaScript 可以读取 `.value`。
5. 能解释 `<data>` 为什么不是隐藏表单字段。
6. 能解释日期时间为什么应该使用 `<time>`。

完成后继续 **KP114：`ins` 与 `del`**。
