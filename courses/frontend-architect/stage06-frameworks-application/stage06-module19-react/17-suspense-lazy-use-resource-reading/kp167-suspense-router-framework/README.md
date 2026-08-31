# RE-KP167：Suspense 与路由框架的关系

> [返回 Chapter 17](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 Suspense 与 Router / Framework 是协作关系，而不是互相替代。
2. 理解 Suspense-enabled Router 为什么通常把导航更新包装为 Transition。
3. 理解路由框架可以把代码加载、数据加载、缓存和 Suspense Boundary 组织成一条链路。
4. 区分“React 提供 Suspense 原语”和“Framework 提供完整数据/路由约定”。
5. 知道 Effect 中普通 fetch 不会因为外面包了 Suspense 就自动变成 Suspense-enabled 数据加载。

> **本节核心代码**：`useTransition()` 包装导航更新，Suspense Boundary 协调路由内容准备。  
> **实验辅助代码**：本课的 mini router 与 `createResource()` 只是教学模型，不是生产 Router。

## 理论讲解

### 1. React Suspense 只提供协调原语

React 可以表达：

```jsx
<Suspense fallback={<Loading />}>
  <Page />
</Suspense>
```

但 React 本身并没有替你定义：

- URL 如何匹配页面。
- 路由参数如何解析。
- 页面数据如何缓存。
- 导航时何时预加载。
- 服务端如何 Streaming。
- Error Boundary 怎么按路由层级组织。

这些通常由 Router / Framework 提供。

### 2. Suspense-enabled Framework 会提供可挂起的数据读取方式

一个 Suspense-enabled Framework 通常维护 Promise cache 或类似资源层，让组件在 Render 时读取资源并触发最近的 Suspense Boundary。

这和：

```jsx
useEffect(() => {
  fetch(...)
}, [])
```

不是一回事。

普通 Effect fetch 发生在 Commit 后，不会让当前 Render 自动 suspend。

### 3. 为什么路由导航适合 Transition

路由导航通常不是文本输入这类必须立刻同步展示的 Urgent Update。

如果新页面需要挂起，而旧页面已经显示，Transition 可以帮助 React 避免粗暴地把已经可见的 UI 立刻替换成一个大 fallback。

因此 React 文档明确指出：Suspense-enabled Router 通常应默认把导航更新包装进 Transition。

### 4. Router 可以把代码和数据加载放进同一 UX 边界

一个现代路由框架可能同时处理：

```text
route match
→ lazy route code
→ route data
→ Promise cache
→ Suspense boundary
→ Transition navigation
→ streaming / hydration
```

开发者不必手写每一层协议。

### 5. 本课为什么不用第三方 Router

本模块目前没有引入额外 Router 依赖。

为了只学习 React 原理，本课用：

```text
page State + navigate() + useTransition + Suspense
```

模拟最小路由行为。

真实项目应使用项目选定的 Router / Framework 能力，而不是复制本课 mini router。

## 动手编码：从 0 到 1

### 第 1 步：用 State 表达当前页面

```jsx
const [page, setPage] = useState('home');
```

### 第 2 步：让导航更新进入 Transition

```jsx
const [isPending, startTransition] = useTransition();

function navigate(nextPage) {
  startTransition(() => {
    setPage(nextPage);
  });
}
```

这表达“导航可以作为非紧急更新协调”。

### 第 3 步：为路由内容提供 Suspense Boundary

```jsx
<Suspense fallback={<p>Route loading…</p>}>
  {page === 'home' ? <HomePage /> : <ArtistPage />}
</Suspense>
```

### 第 4 步：让 ArtistPage 真正 suspend

本课用缓存的教学 resource：

```jsx
function ArtistPage() {
  const artist = getArtistResource().read();
  return <h2>{artist}</h2>;
}
```

`getArtistResource()` 会复用同一资源，不在每次 Render 创建新的 Promise。

### 第 5 步：用 isPending 显示导航正在进行

```jsx
<p>{isPending ? 'Navigation pending…' : 'Navigation idle'}</p>
```

当新页面暂时无法完成时，用户仍能获得导航反馈。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Transition navigation + Suspense route boundary。
- **实验辅助代码**：mini router、教学 resource、延时 Promise。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./17-suspense-lazy-use-resource-reading/kp167-suspense-router-framework --config ./vite.config.js
```

## 效果验证

1. 初始显示 Home 页面。
2. 点击 Artist 后，导航进入 Transition。
3. Artist 资源未准备好时可以观察 `isPending` 导航反馈。
4. 资源准备好后显示 Artist 页面。
5. 能解释为什么真实 Router / Framework 要负责缓存、预加载和数据协议，而不是只靠 Suspense Component。
6. 能说明普通 `useEffect + fetch` 为什么不会自动触发 Suspense。

完成后继续 **RE-KP168：use 读取 Promise**。
