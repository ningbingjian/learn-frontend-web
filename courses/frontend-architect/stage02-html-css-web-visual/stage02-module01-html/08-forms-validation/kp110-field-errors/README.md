# KP110：字段错误

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 把错误信息和对应表单字段建立明确关联。
2. 使用 `aria-invalid` 与 `aria-describedby` 表达字段当前错误状态和说明。
3. 设计“何时显示错误、何时清除错误”的交互时机。
4. 在提交失败时生成错误汇总，并把焦点移动到第一个错误字段。
5. 理解错误 UI 应建立在真实验证结果上，而不是只做红色边框。

> **本节核心代码**：字段旁错误节点、`aria-invalid`、`aria-describedby`、错误汇总与第一个错误字段聚焦。  
> **实验辅助代码**：自定义客户端验证函数、错误列表生成和焦点日志。

## 理论讲解

### 1. 字段错误必须回答两个问题

一个好的字段错误至少要让用户知道：

```text
哪个字段错了？
为什么错？
```

只把输入框变红：

```css
input.error { border-color: red; }
```

并不能完整表达错误。

用户可能：

- 看不到颜色差异；
- 使用读屏软件；
- 不知道红框具体代表什么；
- 不知道如何修复。

### 2. 可见错误文本应该靠近字段

例如：

```html
<label for="email">邮箱</label>
<input
  id="email"
  name="email"
  aria-describedby="email-help email-error"
>
<p id="email-help">用于接收课程通知。</p>
<p id="email-error" hidden></p>
```

当出错时，把错误内容写入 `email-error`：

```text
请输入有效的邮箱地址。
```

帮助文本与错误文本可以同时存在。

### 3. `aria-invalid` 表示当前值无效

当字段失败时：

```html
<input aria-invalid="true">
```

恢复有效后应清除：

```js
input.removeAttribute('aria-invalid');
```

不要在用户还没操作、还没提交时就把所有必填空字段标成错误。

### 4. 错误显示时机需要设计

常见策略：

```text
第一次提交前：允许用户正常填写，不到处报错
第一次提交失败后：显示当前错误
用户继续修改：重新检查该字段，满足规则后及时清除
```

这比“用户每输入一个字符就立刻显示所有错误”更温和。

本节案例用一个 `attemptedSubmit` 状态记录用户是否已经尝试提交。

### 5. 长表单需要错误汇总

字段旁错误负责局部解释，页面顶部的错误汇总负责整体导航：

```html
<div id="error-summary" role="alert" hidden>
  <h2>请修正以下 2 个问题</h2>
  <ul>...</ul>
</div>
```

汇总项最好能够指向对应控件：

```html
<a href="#email">邮箱：请输入有效地址</a>
```

错误汇总不是字段旁错误的替代品，两者解决不同问题。

### 6. 提交失败后焦点应该有明确去向

本节采用：

```js
firstInvalid.focus();
```

也就是把焦点移动到第一个错误字段。

这样键盘用户可以立即开始修正。

另一种常见设计是先把焦点放到错误汇总，再让用户通过链接跳转字段。长表单、公共服务表单常会采用这种策略。

关键不是唯一固定做法，而是：**提交失败后不要让焦点毫无反馈地停在提交按钮上。**

### 7. `novalidate` 只用于接管错误展示，不代表不要验证

本节表单使用：

```html
<form novalidate>
```

原因是我们要自己展示字段错误与汇总。

这意味着浏览器不会在正常提交时自动弹原生气泡，但 HTML 的 `required`、`type="email"` 等规则仍可通过 ValidityState 读取。

如果你关闭原生交互式校验，就必须自己把错误体验做好。

## 动手编码：从 0 到 1

### 第 0 步：准备最小表单

```html
<form id="form" novalidate>
  <label for="name">姓名</label>
  <input id="name" name="name" required minlength="2">

  <label for="email">邮箱</label>
  <input id="email" name="email" type="email" required>

  <button type="submit">提交</button>
</form>
```

**本步目标**：保留 HTML 原生约束，但自己管理展示。  
**为什么这样写**：字段规则和错误 UI 是两个层次。  
**运行后观察**：由于 `novalidate`，浏览器不会自动弹原生错误提示。

### 第 1 步：给每个字段增加帮助与错误节点

```html
<input
  id="email"
  name="email"
  type="email"
  required
  aria-describedby="email-help email-error"
>
<p id="email-help">用于接收课程通知。</p>
<p id="email-error" hidden></p>
```

**本步目标**：建立字段与说明节点的 ID 关系。  
**为什么这样写**：错误不应只是视觉装饰。  
**运行后观察**：还没有错误时，错误段落隐藏。

### 第 2 步：编写字段验证函数

```js
function messageFor(input) {
  if (input.validity.valueMissing) {
    return '此字段不能为空。';
  }

  if (input.validity.typeMismatch) {
    return '请输入有效格式。';
  }

  if (input.validity.tooShort) {
    return `至少输入 ${input.minLength} 个字符。`;
  }

  return '';
}
```

**本步目标**：把 ValidityState 转换成用户可理解文本。  
**为什么这样写**：错误展示应来源于真实验证状态。  
**运行后观察**：不同错误原因得到不同消息。

### 第 3 步：显示和清除字段错误

显示：

```js
input.setAttribute('aria-invalid', 'true');
error.hidden = false;
error.textContent = message;
```

清除：

```js
input.removeAttribute('aria-invalid');
error.hidden = true;
error.textContent = '';
```

**本步目标**：让 DOM 状态与验证结果同步。  
**为什么这样写**：错误解决后不能继续残留旧提示。  
**运行后观察**：修正字段后错误会消失。

### 第 4 步：第一次提交失败后才进入持续校验

```js
let attemptedSubmit = false;

form.addEventListener('submit', event => {
  event.preventDefault();
  attemptedSubmit = true;
  validateForm();
});
```

输入时：

```js
input.addEventListener('input', () => {
  if (attemptedSubmit) validateField(input);
});
```

**本步目标**：避免页面初始就充满错误。  
**为什么这样写**：错误出现和清除时机本身属于交互设计。  
**运行后观察**：未提交前正常输入；第一次失败后，修正字段会实时清错。

### 第 5 步：生成错误汇总

```js
summaryList.replaceChildren(...items);
summary.hidden = errors.length === 0;
```

每一项建立跳转链接：

```html
<a href="#email">邮箱：请输入有效的邮箱地址。</a>
```

**本步目标**：让用户知道一共有哪些问题。  
**为什么这样写**：长表单不能要求用户自己从上到下寻找红框。  
**运行后观察**：顶部出现错误数量和字段链接。

### 第 6 步：聚焦第一个错误字段

```js
if (errors.length > 0) {
  errors[0].input.focus();
}
```

**本步目标**：提交失败以后给键盘焦点明确去向。  
**为什么这样写**：用户可以立即开始修复第一个问题。  
**运行后观察**：提交两个无效字段后焦点移动到第一个字段。

### 第 7 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：字段错误关联、aria-invalid、错误汇总、第一个错误聚焦。
- **实验辅助代码**：ValidityState 消息映射和日志输出。

## 运行案例

直接打开 `index.html` 即可运行，或：

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/08-forms-validation/kp110-field-errors
python3 -m http.server 8080
```

## 效果验证

1. 页面初始不会把所有空字段直接标红。
2. 提交无效表单后，每个失败字段旁出现明确错误文本。
3. 失败控件出现 `aria-invalid="true"`。
4. 顶部汇总列出全部字段错误。
5. 错误汇总链接可以跳到对应字段。
6. 焦点自动移动到第一个错误字段。
7. 修正字段后，该字段错误及时清除。
8. 能解释为什么错误汇总不能替代字段旁错误。

完成后继续 **KP111：服务端错误**。
