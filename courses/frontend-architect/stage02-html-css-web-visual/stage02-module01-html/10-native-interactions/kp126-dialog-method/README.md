# KP126：`form method="dialog"` 与 `returnValue`

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 在 `<dialog>` 内使用 `<form method="dialog">`。
2. 理解这种提交不会按普通 GET/POST 流程导航或发送表单数据，而是关闭对话框。
3. 使用提交按钮的 `value` 表达用户选择。
4. 在 `close` 事件中读取 `dialog.returnValue`。
5. 区分“对话框选择结果”和“真正提交到服务器的业务表单”。

> **本节核心代码**：`form method="dialog"`、提交按钮 `value`、`dialog.returnValue`。  
> **实验辅助代码**：打开按钮、`close` 事件和结果输出。

## 理论讲解

### 1. `method="dialog"` 是对话框专用提交模式

```html
<dialog id="plan-dialog">
  <form method="dialog">
    ...
  </form>
</dialog>
```

用户提交这个表单时，浏览器关闭所属 dialog，而不是像普通 `method="get"` / `method="post"` 那样发起页面导航请求。

因此它适合：

- 选择确认/取消；
- 选择一个本地选项后关闭弹窗；
- 把一次对话框交互的结果返回给页面脚本。

如果数据必须真正保存到服务器，仍要在关闭前后由应用代码执行真实请求，不能把 `method="dialog"` 当成后端提交方式。

### 2. 提交按钮的 `value` 会成为 `returnValue`

```html
<button value="cancel">取消</button>
<button value="confirm">确认</button>
```

关闭后：

```js
dialog.returnValue
```

会反映触发提交的按钮值。

这比从按钮文字“猜”用户选了什么更稳定；`value` 应使用稳定业务值。

### 3. 表单字段与对话框结果是两件事

对话框中可以有 `<select>`、`<input>` 等控件。`method="dialog"` 负责关闭 dialog；页面脚本仍可在关闭前或关闭后读取这些控件的当前值。

不要误解为浏览器会自动把整个表单发送给服务器。

### 4. 监听 `close` 获取最终结果

```js
dialog.addEventListener('close', () => {
  console.log(dialog.returnValue);
});
```

`close` 表示对话框已经实际关闭，适合统一处理最终选择。

## 动手编码：从 0 到 1

### 第 0 步：创建一个 modal dialog

```html
<button id="open">选择套餐</button>
<dialog id="plan-dialog">...</dialog>
```

**本步目标**：准备对话框容器。  
**为什么这样写**：对话框的打开和内部表单职责分开。  
**运行后观察**：dialog 默认隐藏。

### 第 1 步：加入 `method="dialog"`

```html
<form method="dialog">
  <label for="plan">套餐</label>
  <select id="plan" name="plan">
    <option value="basic">基础版</option>
    <option value="pro">专业版</option>
  </select>
</form>
```

**本步目标**：建立对话框专用表单。  
**为什么这样写**：提交动作应该结束当前对话。  
**运行后观察**：还需要提交按钮才能选择结果。

### 第 2 步：给按钮稳定 value

```html
<button value="cancel">取消</button>
<button value="confirm">确认</button>
```

**本步目标**：把用户意图编码成结果值。  
**为什么这样写**：逻辑不依赖按钮可见文字。  
**运行后观察**：点击任意按钮都会关闭 dialog。

### 第 3 步：读取 `returnValue`

```js
dialog.addEventListener('close', () => {
  result.textContent = `returnValue=${dialog.returnValue}`;
});
```

**本步目标**：统一处理关闭结果。  
**为什么这样写**：关闭事件发生时最终值已经确定。  
**运行后观察**：结果显示 `cancel` 或 `confirm`。

### 第 4 步：同时读取用户选择

```js
const plan = document.querySelector('#plan').value;
```

**本步目标**：区分“动作结果”和“字段值”。  
**为什么这样写**：两者承担不同业务意义。  
**运行后观察**：确认后可同时看到 `returnValue` 和套餐值。

### 第 5 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：`method="dialog"`、按钮 `value`、`returnValue`。
- **实验辅助代码**：`showModal()`、结果文字和样式。

## 运行案例

直接打开 `index.html`。

## 效果验证

1. 点击“选择套餐”打开 modal dialog。
2. 点击取消后关闭，`returnValue` 为 `cancel`。
3. 点击确认后关闭，`returnValue` 为 `confirm`。
4. 更换套餐后确认，页面仍能读取所选套餐值。
5. Network 面板不会因为 `method="dialog"` 自动产生普通 GET/POST 表单导航请求。
6. 能解释为什么真正保存数据仍需应用的服务器请求逻辑。
