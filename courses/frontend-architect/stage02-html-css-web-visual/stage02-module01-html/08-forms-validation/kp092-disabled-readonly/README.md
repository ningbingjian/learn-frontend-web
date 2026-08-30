# KP092：disabled 与 readonly

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 区分 `disabled` 与 `readonly` 在编辑、焦点和表单提交上的差异。
2. 解释为什么 disabled 控件通常不会进入 `FormData`，而 readonly 文本控件仍会提交。
3. 知道 `readonly` 只适用于部分文本型表单控件，不能把它当成所有控件的“只读模式”。
4. 理解禁用/只读是前端交互约束，不是服务端授权机制。

## 理论讲解

### 1. `disabled`：控件被禁用

```html
<input name="plan" value="enterprise" disabled>
```

典型效果：

- 用户不能编辑。
- 通常不能通过正常键盘 Tab 顺序获得焦点。
- 不参与约束校验。
- **不会作为成功控件进入表单提交数据**。

这最后一点尤其重要：如果服务器必须收到某个值，就不要因为“页面上看得见”而假设 disabled 字段一定会提交。

### 2. `readonly`：值可读但不可编辑

```html
<input name="account" value="A-100" readonly>
```

典型效果：

- 用户不能修改文本值。
- 控件通常仍可以获得焦点、选择和复制文本。
- 仍然可以进入表单提交数据。

所以 readonly 更接近“这个值参与表单，但当前不允许直接改”。

### 3. readonly 不是所有控件都支持

`readonly` 主要适用于文本型 `<input>` 与 `<textarea>` 等控件。

例如 `<select readonly>` 并不会得到一个标准的“只读 select”语义。对于选择控件，需要重新考虑交互模型，而不是随手加一个无效属性。

### 4. `disabled` 可以由 fieldset 批量施加

```html
<fieldset disabled>
  ...
</fieldset>
```

它可以让一组后代控件整体禁用，但 `<legend>` 内有特殊规则。批量禁用很实用，也意味着调试提交数据时要检查祖先 `fieldset`，不能只盯着控件自身有没有 `disabled` 属性。

### 5. `aria-disabled` 不等于原生 disabled

`aria-disabled="true"` 主要向辅助技术表达“不可用”状态，它不会自动：

- 阻止点击。
- 阻止键盘操作。
- 排除表单提交。

不要用 ARIA 属性代替已经存在的原生 HTML 行为。

### 6. disabled/readonly 不是安全边界

用户可以修改前端 DOM、直接构造 HTTP 请求或调用 API。

因此：

> “这个字段不能改”最终必须由服务端权限与业务校验保证。

前端属性只负责用户体验和浏览器默认行为。

## 动手编码：从 0 到 1

### 第 1 步：创建普通字段

```html
<form id="account-form">
  <label>
    显示名称
    <input name="displayName" value="Alice">
  </label>
</form>
```

**为什么这样写**：先有一个正常可编辑、可提交字段作为对照组。

**运行后观察**：它可以输入，也会进入 FormData。

### 第 2 步：加入 readonly 字段

```html
<label>
  账号编号
  <input id="account" name="account" value="A-100" readonly>
</label>
```

**为什么这样写**：账号编号参与提交，但不希望用户直接编辑。

**运行后观察**：鼠标点击或 Tab 可以让它获得焦点，但无法像普通文本框一样编辑；检查 FormData 时仍能看到 `account=A-100`。

### 第 3 步：加入 disabled 字段

```html
<label>
  当前套餐
  <input id="plan" name="plan" value="enterprise" disabled>
</label>
```

**为什么这样写**：用它验证 disabled 控件不会提交。

**运行后观察**：控件不可编辑，FormData 中也没有 `plan`。

### 第 4 步：再比较 textarea 与 select

```html
<textarea name="note" readonly>只读备注仍会提交</textarea>

<select name="region" disabled>
  <option value="cn" selected>中国区</option>
</select>
```

**为什么这样写**：readonly textarea 和 disabled select 能把两套规则展示得更清楚。

**运行后观察**：`note` 在 FormData 中，`region` 不在。

### 第 5 步：用 FormData 检查真实提交集合

```js
const data = new FormData(form);
```

并输出：

```js
[...data.entries()]
```

**为什么这样写**：不要凭视觉状态猜测表单会提交什么，直接检查成功控件集合。

### 本节核心代码

- `disabled`
- `readonly`
- `FormData`
- readonly 文本控件与 disabled 控件的提交差异

### 实验辅助代码

- “检查 FormData”按钮。
- “切换 readonly / disabled”按钮。
- 状态输出面板。

最终源码：[`index.html`](./index.html)

## 运行案例

打开 `index.html` 后：

1. 点击“检查 FormData”。
2. 确认 `account`、`note` 存在，`plan`、`region` 不存在。
3. 点击“切换 account readonly”后尝试编辑账号。
4. 点击“切换 plan disabled”后再次检查 FormData。

## 效果验证

你应该能够验证：

- [ ] readonly 的 `account` 会进入 FormData。
- [ ] disabled 的 `plan` 不会进入 FormData。
- [ ] readonly textarea 仍会提交。
- [ ] disabled select 不会提交。
- [ ] 移除 `disabled` 后，`plan` 会重新成为成功控件。
- [ ] 能解释为什么这些前端属性不能替代服务端权限校验。
