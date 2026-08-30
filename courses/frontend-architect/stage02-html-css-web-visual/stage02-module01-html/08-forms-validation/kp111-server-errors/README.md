# KP111：服务端错误

> [返回 HTML 模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解浏览器客户端校验只能改善体验，服务端才拥有最终业务校验权。
2. 把服务端返回的字段错误重新映射到对应控件。
3. 在服务端拒绝提交时保留用户已经填写的数据。
4. 区分字段级错误与无法定位到单一字段的通用错误。
5. 为网络失败或服务器异常提供明确的重试流程。

> **本节核心代码**：服务端结果模型、字段错误映射、通用错误区域、输入保留和重试按钮。  
> **实验辅助代码**：`fakeServer()` 用于在纯静态页面模拟 422 字段错误、500/网络错误与成功响应。

## 理论讲解

### 1. 服务端必须重新验证所有关键规则

即使 HTML 已经写了：

```html
<input type="email" required>
```

服务端仍然必须验证：

```text
字段是否存在
格式是否符合业务要求
用户是否有权限
用户名是否已占用
优惠码是否有效
库存是否仍然存在
价格是否被篡改
```

客户端请求可以被绕过、修改和伪造。

所以正确原则是：

```text
客户端校验 = 体验优化
服务端校验 = 最终事实
```

### 2. 服务端错误通常分成字段错误与通用错误

字段级错误适合返回类似：

```json
{
  "fieldErrors": {
    "username": "用户名已被占用",
    "email": "该邮箱域名不可用于注册"
  }
}
```

这些错误能明确映射到具体字段。

而下面这种情况通常不是单一字段能解释：

```text
服务暂时不可用
请求超时
登录状态过期
数据库异常
未知服务器错误
```

这类错误应显示在表单级通用错误区域。

### 3. 字段错误要映射回输入控件

例如响应：

```js
fieldErrors.username = '用户名已被占用';
```

页面应找到：

```html
<input name="username">
```

并显示错误：

```html
<p id="username-error">用户名已被占用</p>
```

同时设置：

```html
aria-invalid="true"
```

用户修改字段后，可以清除该条旧服务器错误，等待下一次服务端重新判断。

### 4. 服务端拒绝后不要清空用户输入

非常差的体验是：

```text
填写 10 个字段
→ 提交
→ 服务端说用户名已占用
→ 页面把整个表单清空
```

正常情况下应该保留用户已经输入的内容，只要求修正失败字段。

因此不要在失败时调用：

```js
form.reset();
```

### 5. 通用错误需要明确重试路径

网络异常时应该告诉用户：

```text
提交暂时失败，你填写的数据仍保留，可以重试。
```

并提供明确按钮：

```html
<button type="button">重试提交</button>
```

本节使用：

```js
form.requestSubmit();
```

重新走正常提交链路，而不是复制另一套提交代码。

### 6. 重试时不要重复制造副作用

生产系统中的“重试”还需要考虑幂等性：

- 支付是否会重复扣款；
- 订单是否会重复创建；
- 接口是否接受幂等键；
- 客户端是否知道第一次请求其实已经成功。

本节只模拟普通注册表单，不深入接口幂等实现，但必须知道“所有请求都可以无脑重试”是错误认知。

### 7. 前端不应该把服务端错误字符串当作永久业务协议

更稳定的接口通常会提供：

```json
{
  "code": "USERNAME_TAKEN",
  "field": "username",
  "message": "用户名已被占用"
}
```

前端可以基于结构化字段进行映射，而不是解析一段自然语言字符串。

本节为了教学简化响应对象，但仍保持“字段错误对象 + 通用错误”的结构。

## 动手编码：从 0 到 1

### 第 0 步：准备客户端可校验表单

```html
<form id="form">
  <input name="username" required minlength="3">
  <input name="email" type="email" required>
  <button type="submit">注册</button>
</form>
```

**本步目标**：先让浏览器处理明显的缺失与格式错误。  
**为什么这样写**：无需把所有客户端规则都重新写一遍 JS。  
**运行后观察**：明显无效值无法进入请求逻辑。

### 第 1 步：定义服务端字段错误区域

```html
<p id="username-error" hidden></p>
<p id="email-error" hidden></p>
```

字段通过：

```html
aria-describedby="username-error"
```

关联错误节点。

**本步目标**：准备服务端错误回填位置。  
**为什么这样写**：服务器知道哪个字段失败后，前端必须能准确反馈。  
**运行后观察**：初始错误区域为空。

### 第 2 步：增加表单级通用错误

```html
<div id="form-error" role="alert" hidden>
  <p id="form-error-message"></p>
  <button type="button" id="retry">重试提交</button>
</div>
```

**本步目标**：处理无法映射到单一字段的错误。  
**为什么这样写**：网络失败不是“用户名字段错误”。  
**运行后观察**：只有通用失败时才显示这个区域。

### 第 3 步：模拟服务端最终规则

```js
async function fakeServer(data) {
  await delay(500);

  if (data.username.toLowerCase() === 'taken') {
    return {
      ok: false,
      fieldErrors: { username: '用户名已被占用。' }
    };
  }

  return { ok: true };
}
```

**本步目标**：制造 HTML 属性无法判断的业务错误。  
**为什么这样写**：用户名唯一性天然依赖服务端状态。  
**运行后观察**：输入 `taken` 会得到服务端字段错误。

### 第 4 步：把 fieldErrors 映射回控件

```js
function showFieldError(name, message) {
  const input = form.elements.namedItem(name);
  const error = document.querySelector(`#${name}-error`);

  input.setAttribute('aria-invalid', 'true');
  error.textContent = message;
  error.hidden = false;
}
```

**本步目标**：把后端结构化错误映射回表单。  
**为什么这样写**：用户需要在发生问题的位置看到反馈。  
**运行后观察**：字段旁出现服务器返回的信息。

### 第 5 步：保留输入，并在修改时清除旧服务器错误

```js
input.addEventListener('input', () => {
  clearFieldError(input.name);
});
```

失败时不要：

```js
form.reset();
```

**本步目标**：让用户只修正有问题的字段。  
**为什么这样写**：服务器拒绝不代表用户其它输入全部无效。  
**运行后观察**：提交 `taken` 失败后，邮箱等字段仍然保留。

### 第 6 步：处理无法定位字段的异常

```js
catch (error) {
  showFormError('服务暂时不可用，你填写的数据仍保留，可以重试。');
}
```

**本步目标**：建立通用错误路径。  
**为什么这样写**：服务器异常不能错误归因给某个 input。  
**运行后观察**：输入实验值 `server-error` 后出现表单级错误和重试按钮。

### 第 7 步：用 requestSubmit 复用正常提交链路

```js
retry.addEventListener('click', () => {
  form.requestSubmit();
});
```

**本步目标**：重试不复制整段提交实现。  
**为什么这样写**：`requestSubmit()` 会重新经过正常表单提交和约束验证。  
**运行后观察**：修改错误值后点击重试即可再次提交。

### 第 8 步：对照最终源码

最终源码：[`index.html`](./index.html)。

- **本节核心代码**：服务端最终验证、fieldErrors 映射、通用错误、数据保留与重试入口。
- **实验辅助代码**：fakeServer、延迟和状态日志。

## 运行案例

直接打开 `index.html` 即可运行，或：

```bash
cd courses/frontend-architect/stage02-html-css-web-visual/stage02-module01-html/08-forms-validation/kp111-server-errors
python3 -m http.server 8080
```

实验值：

```text
username = taken
→ 模拟“用户名已被占用”

email = demo@blocked.example
→ 模拟“邮箱域名不允许注册”

username = server-error
→ 模拟服务器/网络异常

其它合法值
→ 模拟注册成功
```

## 效果验证

1. 客户端明显无效输入会先被浏览器约束拦截。
2. `username=taken` 时服务端错误回填到 username 字段。
3. `demo@blocked.example` 时错误回填到 email 字段。
4. 服务端字段错误发生后，其它字段值保持不变。
5. 修改失败字段后旧服务器错误会清除。
6. `username=server-error` 时出现表单级通用错误与重试按钮。
7. 重试使用 `requestSubmit()` 重新走正常提交链路。
8. 能解释为什么客户端通过校验以后，服务端仍然必须重新验证。
9. 能区分字段错误、通用错误和接口幂等问题。

完成本节后，第八章 **表单结构、控件与校验** 的 23 个知识点全部完成。
