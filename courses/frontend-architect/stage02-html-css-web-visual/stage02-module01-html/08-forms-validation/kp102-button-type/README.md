# KP102：按钮类型 `submit`、`button` 与 `reset`

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
  - [1. submit 提交表单](#1-submit-提交表单)
  - [2. button 只执行普通操作](#2-button-只执行普通操作)
  - [3. reset 恢复默认状态](#3-reset-恢复默认状态)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 区分 `<button type="submit">`、`type="button"`、`type="reset"`。
2. 解释为什么表单内按钮应显式写 `type`。
3. 理解缺省 `type` 在表单中的“意外提交”风险。
4. 理解 reset 是恢复默认状态，而不是简单把所有字段清空。

## 理论讲解

### 1. `submit` 提交表单

```html
<button type="submit">保存</button>
```

它会触发表单提交流程，包括原生约束校验以及 `submit` 事件。

在现代浏览器的 `SubmitEvent` 中，可以通过 `event.submitter` 知道是哪一个提交按钮触发了提交。

### 2. `button` 只执行普通操作

```html
<button type="button">预览</button>
```

`type="button"` 不会主动提交表单，适合：

- 展开额外选项；
- 打开预览；
- 触发计算；
- 调用 JavaScript 完成局部交互。

一个常见错误是：

```html
<form>
  <button>打开帮助</button>
</form>
```

表单中的 `<button>` 如果省略 `type`，默认行为是 submit。原本只是想打开帮助，却可能意外提交整个表单。

因此业务项目中建议显式写出按钮类型。

### 3. `reset` 恢复默认状态

```html
<button type="reset">重置</button>
```

reset 会把表单控件恢复到初始默认状态。

例如：

```html
<input name="name" value="默认姓名">
```

用户改成“新姓名”后点击 reset，会恢复成“默认姓名”，而不是变成空字符串。

同理，checkbox/radio 会恢复 `defaultChecked` 状态。

注意：reset 主要处理表单控件默认状态。你自己维护的任意 JavaScript 业务状态不会自动全部重置，必要时仍要在 `reset` 事件中同步处理。

## 动手编码：从 0 到 1

### 第 1 步：创建最小表单

```html
<form id="demo-form">
  <label>
    项目名称
    <input name="project" value="HTML 学习计划">
  </label>
</form>
```

**目标：** 准备一个有默认值、可观察 reset 效果的字段。

**运行后观察：** 输入框初始不是空值。

### 第 2 步：加入显式 submit

```html
<button type="submit" id="save">保存</button>
```

**目标：** 创建明确的提交按钮。

**为什么这样写：** `type="submit"` 直接表达按钮职责。

**运行后观察：** 点击时会触发表单 submit 流程。

### 第 3 步：加入普通按钮

```html
<button type="button" id="preview">预览</button>
```

**目标：** 创建不会提交表单的局部交互按钮。

**运行后观察：** 点击“预览”不会触发 submit。

### 第 4 步：加入 reset

```html
<button type="reset">恢复默认值</button>
```

先修改项目名称，再点击 reset。

**运行后观察：** 输入框恢复成初始的“HTML 学习计划”。

### 第 5 步：加入一个故意省略 type 的反例

```html
<button id="implicit">省略 type 的按钮</button>
```

在 JavaScript 中查看：

```js
console.log(document.querySelector('#implicit').type);
```

**运行后观察：** 浏览器将其解释为 `submit`。

### 第 6 步：用事件日志验证

```js
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event.submitter?.id);
});
```

**目标：** 不真正离开页面，同时看到哪个按钮触发了提交。

### 最终源码

- [查看本节最终源码 `index.html`](./index.html)

**本节核心代码：** 三种 `button` type 以及省略 type 的反例。

**实验辅助代码：** JavaScript 用于拦截真实导航并记录 `submitter` / reset / 普通按钮点击，不是按钮类型语义本身的必需代码。

## 运行案例

直接打开 `index.html` 即可。

建议按顺序操作：

1. 修改项目名称。
2. 点击“预览”。
3. 点击“保存”。
4. 点击“省略 type 的按钮”。
5. 点击“恢复默认值”。

## 效果验证

你应该能确认：

- `type="submit"` 触发表单提交。
- `type="button"` 不会主动提交。
- 表单中的 `<button>` 省略 type 会表现为 submit。
- `type="reset"` 恢复控件初始状态，而不是统一清空。
- 显式写 `type` 能减少维护时的意外行为。
