# KP109：ValidityState

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 读取控件的 `ValidityState`，识别具体失败原因。
2. 区分 `checkValidity()` 与 `reportValidity()`。
3. 使用 `setCustomValidity()` 增加浏览器不知道的客户端规则。
4. 正确清除 `customError`，避免控件永久无效。
5. 理解 ValidityState 是客户端状态模型，服务端仍拥有最终判定权。

> **本节核心代码**：`input.validity`、`checkValidity()`、`reportValidity()`、`setCustomValidity()`。  
> **实验辅助代码**：状态面板、按钮和事件日志。

## 理论讲解

### 1. `validity` 是浏览器计算出的约束状态

表单控件有：

```js
input.validity
```

它返回一个 `ValidityState` 对象。

常见属性包括：

```text
valueMissing
 typeMismatch
 patternMismatch
 tooLong
 tooShort
 rangeUnderflow
 rangeOverflow
 stepMismatch
 badInput
 customError
 valid
```

不要只看：

```js
input.validity.valid
```

在排查问题时，更重要的是知道“为什么无效”。

### 2. `checkValidity()`：检查并返回 Boolean

```js
const ok = form.checkValidity();
```

结果：

```text
true  → 当前通过约束
false → 至少有一个参与校验的控件失败
```

它会触发无效控件的 `invalid` 事件，但不会像 `reportValidity()` 那样以“主动向用户展示浏览器错误 UI”为目标。

因此它常用于程序判断。

### 3. `reportValidity()`：检查并请求浏览器展示错误

```js
form.reportValidity();
```

它同样返回 Boolean，但如果无效，浏览器通常会把原生验证消息展示给用户并引导到失败控件。

适合用户明确执行了“检查/提交”动作以后调用。

不要在每次 `input` 事件中反复 `reportValidity()`，否则体验会非常打扰。

### 4. `setCustomValidity()`：增加自定义失败原因

例如用户名不能包含单词 `admin`：

```js
username.setCustomValidity('用户名不能包含 admin');
```

此时：

```js
username.validity.customError === true
username.validity.valid === false
```

### 5. 自定义错误必须显式清除

这是最容易踩坑的地方：

```js
username.setCustomValidity('用户名不能包含 admin');
```

以后即使用户修改成正常值，浏览器也不会自动猜测你的业务规则已经满足。

必须：

```js
username.setCustomValidity('');
```

所以典型代码是：

```js
function applyCustomRule() {
  username.setCustomValidity('');

  if (username.value.toLowerCase().includes('admin')) {
    username.setCustomValidity('用户名不能包含 admin');
  }
}
```

### 6. `validationMessage` 是浏览器当前消息

```js
input.validationMessage
```

可以观察当前浏览器准备展示的错误信息。

原生消息语言和具体文案可能因浏览器与系统语言不同，不要把某一条浏览器文案当作跨平台固定字符串。

### 7. `willValidate` 表示控件是否参与约束验证

```js
input.willValidate
```

某些控件不会参与 Constraint Validation，例如常见的：

- `disabled` 控件
- `type="hidden"`

实验时可以把这个状态一并输出。

## 动手编码：从 0 到 1

### 第 0 步：准备有约束的字段

```html
<form id="form">
  <input id="email" type="email" required>
  <input id="age" type="number" min="18" max="60">
</form>
```

**本步目标**：制造多种原生约束。  
**为什么这样写**：可以分别观察 valueMissing、typeMismatch、rangeUnderflow 等状态。  
**运行后观察**：不同输入会产生不同失败原因。

### 第 1 步：读取 ValidityState

```js
function snapshot(input) {
  return {
    valid: input.validity.valid,
    valueMissing: input.validity.valueMissing,
    typeMismatch: input.validity.typeMismatch,
    rangeUnderflow: input.validity.rangeUnderflow,
    rangeOverflow: input.validity.rangeOverflow,
    customError: input.validity.customError,
    willValidate: input.willValidate,
    validationMessage: input.validationMessage
  };
}
```

**本步目标**：把状态对象变成可观察数据。  
**为什么这样写**：学习 ValidityState 不能只停留在“红框”。  
**运行后观察**：面板能看到具体布尔值。

### 第 2 步：加入 checkValidity 按钮

```js
const result = form.checkValidity();
```

**本步目标**：用 API 程序化检查。  
**为什么这样写**：有时应用需要先决定是否进入下一步逻辑。  
**运行后观察**：按钮输出 true/false，并且无效控件会触发 invalid。

### 第 3 步：加入 reportValidity 按钮

```js
const result = form.reportValidity();
```

**本步目标**：请求浏览器向用户报告错误。  
**为什么这样写**：它更接近“现在请告诉用户哪里错了”。  
**运行后观察**：无效时通常出现浏览器原生验证提示。

### 第 4 步：增加自定义用户名规则

HTML：

```html
<input id="username" required minlength="3">
```

JS：

```js
function applyCustomRule() {
  username.setCustomValidity('');

  if (username.value.toLowerCase().includes('admin')) {
    username.setCustomValidity('用户名不能包含 admin');
  }
}
```

**本步目标**：补充 HTML 属性无法直接表达的客户端规则。  
**为什么这样写**：自定义规则应进入浏览器同一套 validity 状态。  
**运行后观察**：输入 `admin-user` 后 `customError=true`。

### 第 5 步：在 input 时先清除再重新计算

```js
username.addEventListener('input', () => {
  applyCustomRule();
  render();
});
```

**本步目标**：防止错误永久残留。  
**为什么这样写**：浏览器不知道你的自定义业务条件什么时候恢复有效。  
**运行后观察**：把 `admin-user` 改成 `nick` 后 customError 重新变为 false。

### 第 6 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：ValidityState、check/report、setCustomValidity。
- **实验辅助代码**：状态序列化与日志显示。

## 运行案例

直接打开 `index.html` 即可运行，或：

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/08-forms-validation/kp109-validity-state
python3 -m http.server 8080
```

## 效果验证

1. 邮箱为空时可观察 `valueMissing=true`。
2. 输入非邮箱字符串时可观察 `typeMismatch=true`。
3. 年龄输入 16 时可观察 `rangeUnderflow=true`。
4. `checkValidity()` 返回 false 时能看到 invalid 事件日志。
5. `reportValidity()` 无效时会请求浏览器显示原生错误 UI。
6. 用户名含 `admin` 时 `customError=true`。
7. 删除 `admin` 后自定义错误会被清除。
8. 能解释为什么忘记 `setCustomValidity('')` 会导致控件一直无效。

完成后继续 **KP110：字段错误**。
