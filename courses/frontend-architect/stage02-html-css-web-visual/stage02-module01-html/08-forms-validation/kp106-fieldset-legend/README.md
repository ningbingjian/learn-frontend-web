# KP106：`fieldset` 与 `legend`

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. fieldset 分组相关字段](#1-fieldset-分组相关字段)
  - [2. legend 提供分组标题](#2-legend-提供分组标题)
  - [3. disabled fieldset 批量禁用](#3-disabled-fieldset-批量禁用)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 使用 `<fieldset>` 把一组有共同语义的字段组织起来。
2. 使用 `<legend>` 为字段组提供标题。
3. 为 radio 组建立“组标题 + 单项 label”的清晰结构。
4. 使用 `fieldset[disabled]` 批量禁用后代控件，并观察 FormData 行为。

## 理论讲解

### 1. `fieldset` 分组相关字段

当多个字段共同回答一个问题时，可以使用 fieldset：

```html
<fieldset>
  ...相关控件...
</fieldset>
```

典型场景：

- 一组 radio；
- 收货地址字段组；
- 联系方式字段组；
- 一批可以整体启用/禁用的配置项。

fieldset 是语义分组，不是单纯为了画边框。边框完全可以通过 CSS 改掉，分组语义仍然存在。

### 2. `legend` 提供分组标题

```html
<fieldset>
  <legend>付款方式</legend>
  ...
</fieldset>
```

对 radio 来说：

```text
legend → 整个问题：付款方式是什么？
label  → 每个答案：支付宝 / 微信 / 银行卡
```

这比给每个 radio 重复一整句问题更清晰。

### 3. `disabled fieldset` 批量禁用

```html
<fieldset disabled>
  <legend>备用收货地址</legend>
  <input name="city">
  <input name="street">
</fieldset>
```

被 disabled fieldset 影响的后代控件：

- 通常无法交互和聚焦；
- 不会作为成功控件进入 FormData；
- 会匹配 CSS `:disabled`。

一个值得观察的细节：后代 `<input>` 自己未必带 `disabled` 属性，因此：

```js
input.disabled
```

可能仍为 `false`，但：

```js
input.matches(':disabled')
```

会是 `true`，因为禁用状态来自祖先 fieldset。

另外，HTML 对 disabled fieldset 的第一个 legend 内后代有特殊例外规则。实际业务中不要把可编辑表单控件塞进 legend 来规避批量禁用；legend 应主要承担分组标题职责。

## 动手编码：从 0 到 1

### 第 1 步：创建 radio 控件

```html
<label><input type="radio" name="payment" value="alipay"> 支付宝</label>
<label><input type="radio" name="payment" value="wechat"> 微信</label>
```

**问题：** 两个选项有自己的 label，但还缺少整个组选项共同回答的问题。

### 第 2 步：用 fieldset + legend 分组

```html
<fieldset>
  <legend>付款方式</legend>
  ...radio...
</fieldset>
```

**运行后观察：** 视觉和语义结构都形成了一个明确的字段组。

### 第 3 步：创建第二个字段组

```html
<fieldset id="shipping" disabled>
  <legend>备用收货地址</legend>
  <input name="city" value="上海">
  <input name="street" value="示例路 100 号">
</fieldset>
```

**目标：** 演示批量禁用。

### 第 4 步：用 FormData 验证 disabled 字段不提交

```js
const data = new FormData(form);
console.log([...data.entries()]);
```

**运行后观察：** `city`、`street` 不出现在 FormData 中。

### 第 5 步：对比属性与有效禁用状态

```js
console.log(city.disabled);
console.log(city.matches(':disabled'));
```

**运行后观察：** 自身 `.disabled` 可以是 false，但 `:disabled` 为 true。

### 第 6 步：切换 fieldset.disabled

```js
fieldset.disabled = !fieldset.disabled;
```

再次查看 FormData。

**运行后观察：** fieldset 启用后，城市和街道字段重新进入表单数据。

### 最终源码

- [查看本节最终源码 `index.html`](./index.html)

**本节核心代码：** `fieldset`、`legend`、radio 分组以及 `fieldset[disabled]`。

**实验辅助代码：** JavaScript 用于切换 disabled、检查 `:disabled` 和输出 FormData，不是 fieldset/legend 语义本身的必需代码。

## 运行案例

直接打开 `index.html`：

1. 选择付款方式。
2. 观察备用地址默认不可编辑。
3. 点击“检查当前状态”。
4. 点击“切换备用地址 fieldset.disabled”。
5. 再次检查 FormData。

## 效果验证

你应该能确认：

- fieldset 用于组织一组相关字段。
- legend 为整个字段组提供标题。
- radio 每个选项仍需要自己的 label。
- disabled fieldset 可以批量让后代控件失效。
- 被 fieldset 禁用的控件不会进入 FormData。
- `.disabled` 与最终匹配 `:disabled` 的有效状态可能不同，应理解祖先 fieldset 的影响。
