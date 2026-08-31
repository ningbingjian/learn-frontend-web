# RE-KP161：Suspense Boundary

> [返回 Chapter 17](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 `<Suspense>` 是“等待内容准备好”的 UI Boundary。
2. 理解子树 suspend 时最近的父 Suspense Boundary 负责显示 fallback。
3. 理解 Boundary 外部 UI 不需要和内部资源一起等待。
4. 知道普通 `useEffect + fetch` 不会自动触发 Suspense。
5. 知道生产项目应优先使用 Suspense-enabled framework、`lazy` 或 `use` 等正式集成方式，而不是手写资源协议。

> **本节核心代码**：`<Suspense fallback={...}>...</Suspense>` 的 Boundary 结构。  
> **实验辅助代码**：`createTeachingResource()` 手工模拟一个会 suspend 的缓存资源，只用于让本课在纯 Vite 客户端工程中独立运行；它不是推荐的数据层实现。

## 理论讲解

### 1. Suspense 描述的是 UI 边界

最小结构：

```jsx
<Suspense fallback={<Loading />}>
  <Profile />
</Suspense>
```

含义不是“永远先显示 Loading”，而是：

> 如果这棵子树本次 Render 还无法完成，最近的 Suspense Boundary 有一套备用 UI。

### 2. 最近的父 Boundary 接住 suspension

组件树：

```text
App
└─ Suspense
   └─ Profile
```

如果 `Profile` suspend，负责展示 fallback 的是它向上遇到的最近一个 Suspense。

### 3. Boundary 外部 UI 不必等待

```jsx
<h1>页面标题</h1>
<Suspense fallback={<Loading />}>
  <Profile />
</Suspense>
```

标题在 Boundary 外，所以 Profile 没准备好时标题仍可显示。

### 4. 什么会真正激活 Suspense

当前 React 官方列出的典型来源包括：

- `lazy` 加载组件代码；
- `use(Promise)` 读取缓存 Promise；
- Suspense-enabled framework 的数据读取；
- 流式 SSR 中尚未到达的 Boundary 内容；
- 某些 React 管理的样式资源。

普通写法：

```jsx
useEffect(() => {
  fetch('/api/profile');
}, []);
```

不会因为“正在请求”就自动让最近 Suspense 显示 fallback。

### 5. 为什么本课有 createTeachingResource

`lazy` 会在 RE-KP165 单独学习，`use(Promise)` 会在 RE-KP168 单独学习。

为了不提前抢课，本节用一个教学 helper 模拟“资源读取还没准备好”的状态。它会复用同一个 pending Promise，让 Suspense 能观察到等待状态。

**不要把这个 helper 当生产数据请求方案。**

## 动手编码：从 0 到 1

### 第 0 步：先写普通组件

```jsx
function Profile() {
  return <p>资料已就绪</p>;
}
```

此时没有 suspend，也就没有 fallback。

### 第 1 步：加入 Suspense Boundary

```jsx
<Suspense fallback={<p>资料加载中…</p>}>
  <Profile />
</Suspense>
```

仅有 Boundary 仍不会自动 loading，必须有子树真正 suspend。

### 第 2 步：准备教学资源

模块级创建：

```jsx
const profileResource = createTeachingResource('高级前端架构师学习者', 1500);
```

它必须在 Render 外创建，保证重试时复用同一资源。

### 第 3 步：在 Profile 读取资源

```jsx
const profile = profileResource.read();
```

pending 时教学资源让本次 Render suspend；完成后 React 重试。

### 第 4 步：把稳定 UI 放 Boundary 外

```jsx
<h1>Suspense Boundary</h1>
<p>这行在 Boundary 外，始终可以显示。</p>
```

观察 Boundary 粒度。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Suspense Boundary 与最近父边界的职责。
- **实验辅助代码**：手写 resource 只模拟 suspension；后续会改用正式 `lazy` / `use` API。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./17-suspense-lazy-use-resource-reading/kp161-suspense-boundary --config ./vite.config.js
```

刷新页面即可重新观察加载序列。

## 效果验证

1. 页面标题立即显示。
2. Profile 未准备好时显示 `资料加载中…`。
3. 大约 1.5 秒后 fallback 被真实 Profile 替换。
4. 能解释为什么 Boundary 自己不会创造 loading 状态。
5. 能解释为什么 Effect 中 fetch 不会自动触发 Suspense。
6. 能指出 `createTeachingResource` 是实验辅助，不是生产 API。

完成后继续 **RE-KP162：fallback**。
