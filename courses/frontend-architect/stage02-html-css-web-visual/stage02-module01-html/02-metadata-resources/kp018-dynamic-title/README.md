# KP018：动态标题

> [返回模块索引](../../README.md) · [打开最终源码](./index.html)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1 完成案例](#动手编码从-0-到-1-完成案例)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `document.title` 读取和修改当前文档标题。
2. 让 SPA 的标题与当前路由状态保持同步。
3. 在标题前增加未读数量等临时状态。
4. 状态结束后恢复正确的页面标题，而不是恢复错误的旧值。

> **本节核心代码是 `document.title` 与标题状态同步逻辑。**  
> `location.hash`、按钮和未读计数只是为了模拟真实 SPA 场景。

## 理论讲解

### 1. `document.title`

读取：

```js
console.log(document.title);
```

修改：

```js
document.title = '订单列表 - 管理后台';
```

浏览器标签页会随之更新。

### 2. 路由状态需要同步到标题

SPA 页面地址变化时，HTML 文件本身通常不会重新加载，因此静态 `<title>` 不足以覆盖所有页面状态。

例如：

```text
#/dashboard -> 数据看板 - Admin
#/orders    -> 订单管理 - Admin
```

路由发生变化时，应重新计算标题。

### 3. 未读状态不要覆盖基础标题模型

常见需求：

```text
(3) 消息中心 - Admin
```

不要只记录“最初加载时”的一个标题然后反复覆盖，因为用户可能已经切换路由。

更稳妥的模型是：

```text
当前路由标题 + 当前未读数量 -> 最终 document.title
```

状态变化时重新计算最终标题。

### 4. 恢复标题

当未读数归零时，应恢复“当前路由对应标题”：

```text
(3) 订单管理 - Admin
        ↓ 未读清零
订单管理 - Admin
```

而不是错误恢复到最开始的“数据看板 - Admin”。

---

## 动手编码：从 0 到 1 完成案例

### 第 0 步：先写静态标题

```html
<head>
  <meta charset="utf-8">
  <title>数据看板 - Admin</title>
</head>
```

### 第 1 步：准备两个模拟路由

在正文加入：

```html
<nav>
  <a href="#dashboard">数据看板</a>
  <a href="#orders">订单管理</a>
</nav>
```

这里使用 hash 只是为了不引入真正的前端路由框架。

### 第 2 步：建立路由标题表

```js
const routeTitles = {
  dashboard: '数据看板 - Admin',
  orders: '订单管理 - Admin'
};
```

### 第 3 步：读取当前路由

```js
function getRoute() {
  return location.hash.slice(1) || 'dashboard';
}
```

### 第 4 步：统一生成最终标题

```js
let unread = 0;

function renderTitle() {
  const route = getRoute();
  const baseTitle = routeTitles[route] || 'Admin';
  document.title = unread > 0
    ? `(${unread}) ${baseTitle}`
    : baseTitle;
}
```

不要在多个事件处理函数里随意拼接标题，尽量让标题只有一个计算入口。

### 第 5 步：监听路由变化

```js
window.addEventListener('hashchange', renderTitle);
```

点击两个链接时，标签页标题会跟随路由切换。

### 第 6 步：模拟未读状态

加入按钮：

```html
<button id="add">增加未读</button>
<button id="clear">清空未读</button>
```

再加入：

```js
document.querySelector('#add').addEventListener('click', () => {
  unread += 1;
  renderTitle();
});

document.querySelector('#clear').addEventListener('click', () => {
  unread = 0;
  renderTitle();
});
```

### 第 7 步：验证恢复逻辑

按这个顺序操作：

1. 进入“数据看板”。
2. 增加两条未读。
3. 切换到“订单管理”。
4. 清空未读。

最终标题应该是：

```text
订单管理 - Admin
```

而不是最初的“数据看板 - Admin”。

### 第 8 步：完成案例并对照最终源码

最终代码应与仓库 [`index.html`](./index.html) 一致。

本节总结：

- **本节核心代码**：`document.title` 和统一的 `renderTitle()`。
- **实验辅助代码**：hash 路由、两个按钮和未读计数，用于模拟 SPA 状态变化。

## 运行案例

直接打开 [`index.html`](./index.html)，或者执行：

```bash
python3 -m http.server 8080
```

## 效果验证

你应该能够确认：

- 切换 hash 后标题同步变化。
- 增加未读后标题出现 `(n)` 前缀。
- 清空未读后恢复当前路由标题。
- 能解释为什么动态标题应该由当前状态统一计算。
