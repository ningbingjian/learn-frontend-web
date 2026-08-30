# KP090：form 的 enctype

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 说明 POST 表单默认的 `application/x-www-form-urlencoded` 编码方式。
2. 解释为什么文件上传通常必须使用 `multipart/form-data`。
3. 理解 multipart 的 boundary 由浏览器生成，不应在使用 `FormData` 时手写 `Content-Type` boundary。
4. 根据表单内容选择合适的 `enctype`，而不是把所有 POST 表单都机械改成 multipart。

## 理论讲解

### 1. `enctype` 解决“请求体怎么编码”

`method` 主要描述提交方法，而 `enctype` 描述表单请求体的编码方式。

常见组合：

```html
<form method="post" enctype="application/x-www-form-urlencoded">
```

和：

```html
<form method="post" enctype="multipart/form-data">
```

`enctype` 对普通 GET 查询并不是本节的核心，因为 GET 表单数据最终进入 URL 查询串。

### 2. 默认：`application/x-www-form-urlencoded`

普通文本字段 POST 时，默认编码类似查询字符串：

```text
name=Alice&city=Shanghai
```

空格、中文和特殊符号会进行 URL 编码。

它结构简单，适合大量普通文本表单。

### 3. 文件上传：`multipart/form-data`

文件不是普通短文本。使用文件控件时通常需要：

```html
<form method="post" enctype="multipart/form-data">
  <input type="file" name="avatar">
</form>
```

multipart 会把每个字段作为一个 part，并通过 boundary 分隔。文件可以保留文件名、类型和二进制内容，而不会被当作普通 URL 编码字符串处理。

### 4. 不要手写 multipart boundary

JavaScript 用 `FormData` 发请求时，常见正确写法：

```js
fetch('/upload', {
  method: 'POST',
  body: new FormData(form)
});
```

不要为了“补全请求头”手写：

```js
headers: {
  'Content-Type': 'multipart/form-data'
}
```

因为这样缺少浏览器为当前请求生成的 boundary，服务器可能无法正确解析。

### 5. `text/plain` 很少用于结构化业务提交

HTML 还允许 `text/plain`。它便于人工观察，但缺少稳定的结构化编码能力，通常不作为 Web 应用和 API 的常规表单协议。

### 6. `formenctype` 可以由提交按钮覆盖

单个 submit 按钮可以通过 `formenctype` 覆盖表单默认编码。它适合“同一个表单，不同提交动作”的特殊场景，但不应成为日常复杂化表单的理由。

## 动手编码：从 0 到 1

我们构造一个“个人资料上传”表单，并在浏览器内生成两种 `Request`，只观察浏览器自动给出的 Content-Type，不真正访问服务器。

### 第 1 步：创建 POST 表单

```html
<form id="profile-form" action="/profile" method="post">
  <label>
    昵称
    <input name="nickname" value="Alice">
  </label>
  <button type="button" id="inspect-urlencoded">观察默认编码</button>
</form>
```

**为什么这样写**：先从只有文本字段的普通 POST 开始。

**运行后观察**：表单没有显式 `enctype` 时，DOM 属性 `form.enctype` 会反映默认编码。

### 第 2 步：观察 URL encoded 请求

```js
const form = document.querySelector('#profile-form');
const params = new URLSearchParams(new FormData(form));
const request = new Request(form.action, {
  method: 'POST',
  body: params
});
```

读取：

```js
request.headers.get('content-type')
```

**为什么这样写**：`URLSearchParams` 能模拟文本字段的 urlencoded 请求体。

**运行后观察**：Content-Type 会包含 `application/x-www-form-urlencoded`。

### 第 3 步：加入文件控件并切换 multipart

```html
<input type="file" name="avatar" id="avatar">
```

把表单改成：

```html
<form
  id="profile-form"
  action="/profile"
  method="post"
  enctype="multipart/form-data"
>
```

**为什么这样写**：文件上传是 multipart 的典型场景。

**运行后观察**：选择文件后，`FormData` 中的 `avatar` 是 `File` 对象，而不是只有文件路径文本。

### 第 4 步：让浏览器自动生成 multipart boundary

```js
const request = new Request(form.action, {
  method: 'POST',
  body: new FormData(form)
});
```

输出：

```js
request.headers.get('content-type')
```

**为什么这样写**：浏览器会自动生成 `multipart/form-data; boundary=...`。

**运行后观察**：每次创建 Request 时 boundary 具体字符串可以不同，因此业务代码不应硬编码它。

### 本节核心代码

- `enctype="application/x-www-form-urlencoded"`
- `enctype="multipart/form-data"`
- `<input type="file" name="...">`
- `FormData`

### 实验辅助代码

- `Request`：只用来观察浏览器自动生成的请求头。
- `URLSearchParams`：帮助对比 urlencoded 编码。
- 输出面板：展示字段和值类型，不会真正上传文件。

最终源码：[`index.html`](./index.html)

## 运行案例

打开 `index.html`：

1. 先不选文件，点击“观察 URL encoded”。
2. 选择任意本地文件。
3. 点击“观察 multipart/form-data”。

本案例不会向网络发送文件；`Request` 只在内存中构造。

## 效果验证

你应该能够验证：

- [ ] URL encoded 预览的 Content-Type 包含 `application/x-www-form-urlencoded`。
- [ ] multipart 预览的 Content-Type 带有浏览器生成的 `boundary=...`。
- [ ] 选择文件后，`FormData` 中的文件字段能显示文件名和 MIME 类型。
- [ ] 能解释为什么不能只写 `Content-Type: multipart/form-data` 却遗漏 boundary。
- [ ] 能说明普通文本表单不必为了“更高级”而统一改成 multipart。
