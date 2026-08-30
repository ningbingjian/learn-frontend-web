# KP089：form 的 action 与 method

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

完成本节后，你应该能够：

1. 说明 `action` 决定表单提交到哪里，以及省略时的基本行为。
2. 区分 GET 把成功控件编码进查询参数、POST 把表单数据放入请求体的核心差异。
3. 根据“查询/读取”和“创建/修改”这类业务意图选择 GET 或 POST，而不是按数据多少随意选择。
4. 使用 `FormData` 与 `URLSearchParams` 在浏览器中观察一次提交最终会形成什么数据。

## 理论讲解

### 1. `action`：提交目标地址

`<form>` 的 `action` 指定提交目标 URL：

```html
<form action="/search">
  ...
</form>
```

浏览器会按照当前文档 URL 解析相对地址。若省略 `action`，表单通常提交到当前文档地址。

需要区分两个概念：

- `action`：**发到哪里**。
- `method`：**用什么 HTTP 方法表达这次提交**。

`action` 并不决定数据位于 URL 还是请求体中，这由 `method` 主导。

### 2. GET：表单数据进入查询参数

典型 GET 表单：

```html
<form action="/search" method="get">
  <input name="keyword" value="html">
</form>
```

提交后可形成类似：

```text
/search?keyword=html
```

GET 适合搜索、筛选、分页等**读取型、可链接、可收藏**的状态。查询条件出现在 URL 中，因此不要把密码、令牌等敏感值放进 GET 查询串。

GET 不是“只能传少量参数”的同义词；真正的选择依据首先是 HTTP 语义、可重放性和是否希望 URL 表达当前查询状态。

### 3. POST：表单数据进入请求体

典型 POST 表单：

```html
<form action="/orders" method="post">
  <input name="productId" value="A100">
</form>
```

POST 常用于创建、提交、触发状态变化等操作。表单字段一般进入请求体，而不是拼到 URL 查询串。

但要注意：

> POST 不等于加密。

是否能防止链路窃听取决于 HTTPS，而不是 `method="post"` 本身。

### 4. 只有“成功控件”才会形成提交数据

浏览器不是把整个 DOM 都提交给服务器。表单提交关注的是具备提交资格的控件，例如：

- 控件通常需要有 `name`。
- 被 `disabled` 的控件不会提交。
- 未选中的 checkbox / radio 通常不会提交。

这些细节会在 KP091、KP092 继续拆开学习。

### 5. `method="dialog"` 不是普通网络提交

HTML 还支持对话框场景中的 `method="dialog"`。它用于关闭 `<dialog>` 并设置 `returnValue`，不等同于 GET / POST 网络提交。本课程会在 KP126 专门处理，不在本节混讲。

## 动手编码：从 0 到 1

本节做两个表单：一个模拟搜索 GET，一个模拟创建订单 POST。为了不真的跳页，我们拦截 `submit`，把浏览器将要提交的数据展示出来。

### 第 1 步：创建最小页面

新建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>KP089 action 与 method</title>
</head>
<body>
  <h1>观察 form 的 action 与 method</h1>
</body>
</html>
```

**为什么这样写**：先保证页面可独立运行，再逐步加入表单。

**运行后观察**：浏览器能正常打开页面并显示标题。

### 第 2 步：加入 GET 搜索表单

```html
<form id="search-form" action="/search" method="get">
  <label>
    关键词
    <input name="keyword" value="semantic html">
  </label>
  <button type="submit">搜索</button>
</form>
```

**为什么这样写**：搜索是典型读取操作，适合让查询条件进入 URL。

**运行后观察**：Elements 面板中能看到 `action="/search"` 和 `method="get"`。

### 第 3 步：加入 POST 创建表单

```html
<form id="order-form" action="/orders" method="post">
  <label>
    商品编号
    <input name="productId" value="A100">
  </label>
  <label>
    数量
    <input name="quantity" type="number" value="2">
  </label>
  <button type="submit">创建订单</button>
</form>
```

**为什么这样写**：创建订单会改变服务器状态，用 POST 比 GET 更符合动作语义。

**运行后观察**：两个表单的目标地址和 method 已经不同。

### 第 4 步：拦截提交并观察最终数据

```js
function observeSubmission(form) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    const data = new FormData(form);
    const pairs = [...data.entries()];
    const action = new URL(form.action, location.href);

    if (form.method === 'get') {
      action.search = new URLSearchParams(data).toString();
    }

    document.querySelector('#result').textContent = [
      `method: ${form.method.toUpperCase()}`,
      `action: ${action.href}`,
      `FormData: ${JSON.stringify(pairs)}`,
      form.method === 'post' ? 'POST 数据将进入请求体，而不是由本案例真的发送。' : ''
    ].filter(Boolean).join('\n');
  });
}
```

然后调用：

```js
observeSubmission(document.querySelector('#search-form'));
observeSubmission(document.querySelector('#order-form'));
```

**为什么这样写**：`FormData` 让我们观察成功控件；`URLSearchParams` 则直观演示 GET 查询串。

**运行后观察**：点击“搜索”能看到带查询参数的 URL；点击“创建订单”能看到 POST 的 action 和字段列表，但页面不会真的发送请求。

### 本节核心代码

- `<form action="..." method="get|post">`
- 具备 `name` 的表单控件
- GET 与 POST 的语义选择

### 实验辅助代码

- `event.preventDefault()`：避免案例真正跳转。
- `FormData`：观察成功控件。
- `URLSearchParams`：把 GET 数据展示成查询串。
- 输出面板：只用于学习观察，不是 `form` 的必要组成。

最终源码：[`index.html`](./index.html)

## 运行案例

直接用浏览器打开 `index.html`，依次点击：

1. “搜索”按钮。
2. “创建订单”按钮。

如果浏览器对 `file://` 下的相对 URL 展示形式与你预期不同，可以使用任意静态 HTTP Server 打开目录；GET/POST 的数据构造规则不受影响。

## 效果验证

你应该能够验证：

- [ ] GET 表单最终预览 URL 中包含 `?keyword=...`。
- [ ] POST 表单的 URL 不因为本节数据预览而被拼接查询串。
- [ ] 两个表单都能从 `FormData` 中读到具备 `name` 的字段。
- [ ] 能解释 `action` 与 `method` 分别解决“发到哪里”和“怎么提交”的问题。
- [ ] 能解释 POST 本身并不提供加密能力，敏感数据仍需要 HTTPS。
