# RE-KP168：use 读取 Promise

> [返回 Chapter 17](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `use(promise)` 在 Render 中读取 Promise 的 resolved value。
2. 理解 pending Promise 会让当前组件 suspend，并交给最近 Suspense Boundary。
3. 理解 rejected Promise 会向最近 Error Boundary 传播。
4. 理解传给 `use` 的 Promise 必须稳定缓存，不能每次 Render 创建新 Promise。
5. 区分 `use(Promise)` 与 Effect 中异步请求的运行时边界。

> **本节核心代码**：`const profile = use(profilePromise)` 与模块级 Promise cache。  
> **实验辅助代码**：`setTimeout()` 只用于模拟请求延迟。

## 理论讲解

### 1. use 可以直接读取 Promise

```jsx
const value = use(promise);
```

如果 Promise 已 fulfilled：

```text
use 返回 resolved value
```

如果 Promise 仍 pending：

```text
当前组件 suspend
最近 Suspense Boundary 显示 fallback
```

如果 Promise rejected：

```text
错误继续向最近 Error Boundary 传播
```

### 2. Client Component 中 Promise 必须稳定

错误：

```jsx
function Profile() {
  const profile = use(fetch('/profile'));
}
```

每次 Render 都创建新 Promise，可能导致重复 suspension 和警告。

应使用：

- Framework cache。
- Server Component 传下来的稳定 Promise。
- 数据库 / Router / Suspense data layer 提供的 cache。
- 教学或库层显式 Promise cache。

### 3. 本课使用最小 Promise cache

```jsx
const profileCache = new Map();

function getProfilePromise(id) {
  if (!profileCache.has(id)) {
    profileCache.set(id, loadProfile(id));
  }
  return profileCache.get(id);
}
```

相同 `id` 在重新 Render 时得到同一个 Promise 实例。

### 4. use(Promise) 与 Effect fetch 的区别

`use(Promise)`：

```text
在 Render 中读取资源
pending → suspend
```

`useEffect + fetch`：

```text
Render / Commit 之后再启动 Effect
不会让刚刚那次 Render 自动 suspend
```

### 5. use 不能放进 try/catch

React 内部使用 suspension/error 机制协调 `use`。

不要：

```jsx
try {
  const value = use(promise);
} catch {
  // ...
}
```

Promise rejection 应由 Error Boundary 处理。

### 6. Server Component 通常优先 await

在 Server Component 里，如果你自己创建 Promise，通常优先：

```js
const data = await loadData();
```

而 Client Component 无法直接 `await` Render，于是可以通过 `use(promise)` 解包稳定 Promise。

## 动手编码：从 0 到 1

### 第 1 步：创建数据加载函数

```jsx
function loadProfile(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve(PROFILES[id]), 1000);
  });
}
```

### 第 2 步：增加 Promise cache

```jsx
const profileCache = new Map();

function getProfilePromise(id) {
  if (!profileCache.has(id)) {
    profileCache.set(id, loadProfile(id));
  }
  return profileCache.get(id);
}
```

### 第 3 步：在 Profile 中使用 use

```jsx
function Profile({ profilePromise }) {
  const profile = use(profilePromise);
  return <h2>{profile.name}</h2>;
}
```

### 第 4 步：把组件放进 Suspense Boundary

```jsx
<Suspense fallback={<p>Profile loading…</p>}>
  <Profile profilePromise={getProfilePromise(userId)} />
</Suspense>
```

### 第 5 步：切换 cache key

```jsx
<button onClick={() => setUserId('grace')}>Grace</button>
```

新的 ID 会创建新的 cached Promise，并让 Profile 再次 suspend。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`use(profilePromise)`、cached Promise、Suspense。
- **实验辅助代码**：静态 Profile 数据和模拟延迟。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./17-suspense-lazy-use-resource-reading/kp168-use-read-promise --config ./vite.config.js
```

## 效果验证

1. 初次打开页面会显示 Suspense fallback。
2. Promise resolve 后显示 Ada Profile。
3. 点击 Grace 会读取另一个 cached Promise，并再次显示 fallback。
4. 切回已经加载过的 Ada 时通常能同步读取缓存结果。
5. 能解释为什么不能在 Render 中直接不断创建新的 Promise。
6. 能区分 `use(Promise)` 与 `useEffect + fetch`。

完成后继续 **RE-KP169：use 读取 Context**。
