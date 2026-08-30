# KP097：`checkbox` 与 `radio`

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 用 checkbox 表达独立开关或多选集合。
2. 用同名 radio 表达互斥单选。
3. 理解 `checked` 控件的成功提交规则。
4. 理解 `value` 缺失时的默认值 `on`。
5. 用 `FormData.getAll()` 读取同名 checkbox 的多个值。

## 理论讲解

### 1. checkbox 是独立布尔状态或多选项

单个 checkbox：

```html
<input type="checkbox" name="subscribe" value="yes">
```

可以表达：

> 是否订阅邮件？

多个同名 checkbox：

```html
<input type="checkbox" name="skill" value="html">
<input type="checkbox" name="skill" value="css">
```

可以表达：

> 会哪些技能？

每个选项彼此独立，可以同时选中多个。

### 2. radio 是同组互斥选择

```html
<input type="radio" name="plan" value="basic">
<input type="radio" name="plan" value="pro">
```

同一个 `name` 会把 radio 放进同一个互斥组。

用户选择一个选项时，同组其它 radio 自动取消选中。

因此 radio 分组的关键不是 DOM 是否放在一起，而是共享相同的 `name`。

### 3. 未选中的 checkbox / radio 不会提交

这是表单开发非常关键的规则。

```html
<input type="checkbox" name="newsletter" value="yes">
```

如果没有勾选，`FormData` 中通常根本没有 `newsletter` 这个键，而不是：

```text
newsletter=false
```

服务端必须明确处理“字段缺失”的情况。

### 4. 不写 `value` 时默认是 `on`

```html
<input type="checkbox" name="agree">
```

选中后提交值通常是：

```text
agree=on
```

`on` 对业务几乎没有描述能力，所以生产代码最好显式给出有意义的 `value`。

### 5. `checked` 属性和 `checked` 属性值

HTML 中：

```html
<input type="checkbox" checked>
```

`checked` 表示初始默认状态。

JavaScript 中：

```js
input.checked
```

表示当前交互状态。

用户点击后，当前 `checked` property 会变化，但 HTML 源码中的初始属性不一定同步变化。

### 6. 多值字段应该保留多值

```js
formData.getAll('skill')
```

适合读取：

```text
['html', 'css']
```

直接 `Object.fromEntries(formData)` 会在同名键场景丢失前面的值，因此实验中会同时展示 `entries()` 与 `getAll()`。

### 7. radio 通常应有明确的分组问题

从可访问性和理解成本看，一组 radio 不应只是散落的输入框。

后续 KP106 会进一步学习 `fieldset` / `legend`。本节案例已经用它们提供清晰的组标题，但重点仍是 checkbox / radio 的值与提交行为。

## 动手编码：从 0 到 1

### 第 1 步：建立表单

创建最小 HTML 页面和：

```html
<form id="demo-form"></form>
```

### 第 2 步：添加单个 checkbox

```html
<label>
  <input type="checkbox" name="newsletter" value="yes">
  订阅前端周报
</label>
```

**运行后观察**：不勾选时，FormData 中不存在该键；勾选后才出现。

### 第 3 步：添加同名多选 checkbox

```html
<label><input type="checkbox" name="skill" value="html"> HTML</label>
<label><input type="checkbox" name="skill" value="css"> CSS</label>
<label><input type="checkbox" name="skill" value="javascript"> JavaScript</label>
```

### 第 4 步：添加同名 radio

```html
<label><input type="radio" name="plan" value="free" checked> Free</label>
<label><input type="radio" name="plan" value="pro"> Pro</label>
```

**运行后观察**：同组只能保留一个选中值。

### 第 5 步：故意加入一个没有 value 的 checkbox

```html
<input type="checkbox" name="defaultValueDemo" checked>
```

用于观察默认提交值 `on`。

### 第 6 步：输出 FormData

```js
const data = new FormData(form);

result.textContent = JSON.stringify({
  entries: [...data.entries()],
  skills: data.getAll('skill')
}, null, 2);
```

最终源码：[`index.html`](./index.html)

**本节核心代码**：checkbox / radio 的 `name`、`value`、`checked` 和成功控件规则。

**实验辅助代码**：用于实时显示 `FormData` 与当前 checked 状态的 JavaScript / CSS。

## 运行案例

直接打开 `index.html`，尝试：

1. 不勾选“订阅前端周报”。
2. 同时勾选 HTML 与 CSS。
3. 在 Free / Pro 间切换。
4. 观察没有 `value` 的 checkbox 提交什么。

## 效果验证

你应该能够验证：

- [ ] 未选中的 checkbox 不进入 FormData。
- [ ] 多个同名 checkbox 可以同时提交多个值。
- [ ] 同名 radio 互斥。
- [ ] radio 最终只提交选中的那个值。
- [ ] checkbox 不写 `value` 时选中后会出现默认值 `on`。
- [ ] `FormData.getAll()` 能完整读取同名多值字段。
