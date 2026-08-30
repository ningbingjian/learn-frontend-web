# KP108：required、minlength、maxlength、pattern

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `required` 声明必填约束。
2. 使用 `minlength`、`maxlength` 声明文本长度边界。
3. 使用 `pattern` 声明字符串格式约束。
4. 理解这些属性属于浏览器原生 Constraint Validation，而不是服务器最终校验。
5. 理解“属性存在”与“什么时候显示错误”是两个不同问题。

> **本节核心代码**：`required`、`minlength`、`maxlength`、`pattern`。  
> **实验辅助代码**：`checkValidity()`、ValidityState 输出和 submit/invalid 日志。

## 理论讲解

### 1. `required`：值不能为空

```html
<input name="username" required>
```

对于支持约束验证的控件，如果值缺失：

```js
input.validity.valueMissing === true
```

浏览器在正常表单提交时会阻止无效提交，并可以显示自己的错误 UI。

`required` 是客户端体验约束，不是安全边界。请求仍然可能被脚本、接口工具或恶意客户端直接构造，所以服务端必须重新检查。

### 2. `minlength` 与 `maxlength`：文本长度边界

```html
<input minlength="3" maxlength="12">
```

它表达：

```text
至少 3 个字符
最多 12 个字符
```

对应 ValidityState 中的：

```text
tooShort
tooLong
```

浏览器通常会在用户输入时直接限制 `maxlength` 能继续输入的长度，因此“通过键盘输入制造 tooLong”在不同环境下并不容易。

不要为了实验而误以为 `maxlength` 一定会先接受超长值再报错。

### 3. `pattern`：约束字符串格式

例如课程兑换码必须是：

```text
ABC-2026
```

可以写：

```html
<input pattern="[A-Z]{3}-[0-9]{4}">
```

如果非空值不满足模式：

```js
input.validity.patternMismatch === true
```

`pattern` 用来描述完整字段的格式约束，不适合承担复杂业务规则。

例如“用户名必须未被别人占用”无法只靠正则判断，必须由服务端验证。

### 4. `pattern` 与 `required` 是不同约束

只有：

```html
<input pattern="[A-Z]{3}">
```

时，空字符串通常不会因为 pattern 本身产生 `patternMismatch`。

如果业务要求既不能为空又必须符合格式，应组合：

```html
<input required pattern="[A-Z]{3}">
```

### 5. 原生校验不是“输入一个字符就一定弹错误”

约束状态可以随值变化，但浏览器是否立刻显示原生气泡、何时展示样式，取决于：

- 用户交互
- 提交流程
- `checkValidity()` / `reportValidity()`
- 浏览器实现

因此应区分：

```text
控件当前 valid / invalid
```

和：

```text
什么时候向用户显示错误
```

这是后面 KP109、KP110 的重点。

### 6. `novalidate` 会跳过表单提交时的原生阻止

```html
<form novalidate>
```

会关闭正常提交时的浏览器交互式约束验证。

这并不会让 `required` 等属性从 DOM 消失，也不代表数据变成可信。

只有当应用确实需要自己完整管理错误体验时，才应有意识地使用 `novalidate`。

## 动手编码：从 0 到 1

### 第 0 步：创建最小表单

```html
<form id="profile-form">
  <button type="submit">提交</button>
</form>
```

**本步目标**：先准备原生提交入口。  
**为什么这样写**：Constraint Validation 最典型的触发点就是提交。  
**运行后观察**：空表单可以直接提交。

### 第 1 步：加入 `required`

```html
<label>
  用户名
  <input id="username" name="username" required>
</label>
```

**本步目标**：声明必填。  
**为什么这样写**：业务要求应尽量先用原生约束表达。  
**运行后观察**：留空提交时浏览器阻止提交。

### 第 2 步：加入长度限制

```html
<input
  id="username"
  name="username"
  required
  minlength="3"
  maxlength="12"
>
```

**本步目标**：约束用户名长度。  
**为什么这样写**：长度规则不需要先写自定义 JS。  
**运行后观察**：短于 3 个字符时处于无效状态；输入通常无法超过 12 个字符。

### 第 3 步：加入兑换码 pattern

```html
<label>
  兑换码
  <input
    id="code"
    name="code"
    required
    pattern="[A-Z]{3}-[0-9]{4}"
    placeholder="ABC-2026"
  >
</label>
```

**本步目标**：同时表达必填和格式。  
**为什么这样写**：空值与格式错误应该由不同约束分别表达。  
**运行后观察**：`ABC-2026` 有效，`abc-2026` 产生 patternMismatch。

### 第 4 步：用 JS 观察状态，不替代核心约束

```js
function inspect(input) {
  return {
    valid: input.validity.valid,
    valueMissing: input.validity.valueMissing,
    tooShort: input.validity.tooShort,
    tooLong: input.validity.tooLong,
    patternMismatch: input.validity.patternMismatch
  };
}
```

**本步目标**：把浏览器已经计算出的状态显示出来。  
**为什么这样写**：实验 JS 是观察工具，约束仍来自 HTML 属性。  
**运行后观察**：修改输入后状态随值变化。

### 第 5 步：观察 submit 与 invalid

```js
form.addEventListener('submit', event => {
  event.preventDefault();
  output.textContent = '表单通过原生约束，可以进入提交逻辑。';
});
```

同时监听：

```js
form.addEventListener('invalid', event => {
  // 观察哪个控件失败
}, true);
```

**本步目标**：理解无效表单不会进入正常 submit 流程。  
**为什么这样写**：浏览器会先执行约束验证。  
**运行后观察**：无效时触发 invalid，有效时才进入 submit handler。

### 第 6 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：四个原生约束属性。
- **实验辅助代码**：ValidityState JSON 输出与事件日志。

## 运行案例

直接打开 `index.html` 即可。

也可以：

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/08-forms-validation/kp108-constraint-validation-attributes
python3 -m http.server 8080
```

## 效果验证

1. 用户名为空时 `valueMissing=true`。
2. 用户名少于 3 个字符时可观察到长度无效状态。
3. 用户名通常无法通过键盘输入超过 `maxlength=12`。
4. 兑换码输入 `abc-2026` 时 `patternMismatch=true`。
5. 输入 `ABC-2026` 且用户名有效后，表单可以进入 submit handler。
6. 能解释为什么 `pattern` 不能验证“用户名是否已被占用”。
7. 能解释客户端原生校验和服务端最终校验的职责区别。

完成后继续 **KP109：ValidityState**。
