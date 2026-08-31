# RE-KP179：表单 Action 与渐进增强

> [返回 Chapter 18](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 Progressive Enhancement 的目标是“JS 未加载也有基础能力”。
2. 区分原生 URL form、客户端 function Action、Server Function Action。
3. 理解 Server Function 为什么能参与无 JS 表单提交。
4. 知道 `useActionState` 的 `permalink` 主要服务 RSC/Server Function 渐进增强。
5. 不在纯 Vite 客户端项目里伪造不存在的 Server Function 能力。

## 理论讲解

### 1. 原生 HTML Form 天生支持渐进增强

```html
<form action="/search" method="get">
```

浏览器自己就知道如何提交，不依赖 React JavaScript。

### 2. 客户端 function Action 仍然需要 JavaScript

```jsx
<form action={clientAction}>
```

如果这个函数只存在于浏览器 bundle，它当然需要 JS 才能运行。

### 3. Server Function 是另一条路径

在支持 React Server Components / Server Functions 的框架中：

```jsx
<form action={serverAction}>
```

Server Function 可以让浏览器在 hydration 前也把请求提交到服务器。

这才是“function Action + 无 JS”真正成立的前提。

### 4. permalink 的角色

`useActionState(action, initialState, permalink)` 的第三个参数用于动态页面的 Progressive Enhancement。

在 JavaScript 尚未加载时，浏览器可以导航到稳定 permalink，并让服务器返回包含同一 Form / Action / permalink 的页面，从而携带 Action 结果继续渲染。

纯 Vite SPA 没有 Server Function，因此本课只解释这条协议，不伪造服务端。

## 动手编码：从 0 到 1

### 第 1 步：做一个原生 GET Form

```jsx
<form action="" method="get">
  <input name="q" defaultValue={initialQuery} />
  <button type="submit">原生搜索</button>
</form>
```

提交会由浏览器导航并把 `q` 写入 URL query string。

### 第 2 步：做一个客户端 function Action

```jsx
async function subscribeAction(formData) {
  const email = formData.get('email');
  await delay(500);
  setMessage(`已在客户端 Action 中订阅：${email}`);
}
```

### 第 3 步：并排展示能力边界

页面明确标注：

```text
Native URL Form  -> 浏览器能力，可无 JS
Client Action     -> 浏览器 JS 函数，需要 JS
Server Function   -> 需要 RSC/Framework，本课不伪造
```

最终源码：[src/main.jsx](./src/main.jsx)

**本节核心代码**：原生 URL action 与客户端 function action 的能力对照。

**实验辅助代码**：读取 `window.location.search` 只是为了展示原生 GET form 的导航结果。

## 运行案例

1. 在原生搜索框输入内容并提交，观察地址栏出现 `?q=...`。
2. 在客户端订阅 Form 中提交邮箱，观察页面内异步结果。
3. 对比两种机制是否依赖客户端函数执行。

## 效果验证

- 能解释为什么 Client Action 本身不是无 JS 方案。
- 能解释 Server Function / framework 在渐进增强中的责任。
- 能说清 `permalink` 为什么不是普通 SPA 路由参数。
