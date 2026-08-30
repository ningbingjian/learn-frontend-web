# RE-KP138：getServerSnapshot 与 SSR

> [返回 Chapter 14](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useSyncExternalStore` 的第三个参数 `getServerSnapshot` 的职责。
2. 知道它会用于服务端生成 HTML，以及客户端 hydration 的初始读取。
3. 理解服务端 snapshot 与 hydration 初始 snapshot 必须一致。
4. 理解 hydration 完成后 React 可以继续读取真正的客户端 `getSnapshot()`。
5. 知道真实 SSR 通常需要把服务端预加载的 store 数据序列化并传给客户端。

> **本节核心代码**：`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` 在模拟 server render 与 hydration 两侧共享同一个 `SERVER_SNAPSHOT`。  
> **实验辅助代码**：为了让 lesson 直接由 Vite 启动，本课再次在浏览器里调用 `renderToString` 模拟 server phase；真实项目应在服务器进程生成 HTML 与初始 store 数据。

## 理论讲解

### 1. 为什么 External Store SSR 需要第三个函数

客户端可以直接读取：

```jsx
getSnapshot()
```

但服务端没有浏览器运行环境，有些 store 甚至根本不存在。

`useSyncExternalStore` 因此允许：

```jsx
useSyncExternalStore(
  subscribe,
  getSnapshot,
  getServerSnapshot,
);
```

### 2. getServerSnapshot 在两个阶段使用

它的关键用途是：

```text
Server render
→ getServerSnapshot

Client hydration initial render
→ getServerSnapshot
```

也就是说，Hydration 的第一步仍然使用与服务端一致的初始数据。

### 3. 为什么必须一致

假设服务端输出：

```text
status = "server-ready"
```

客户端 hydration 第一次却立即输出：

```text
status = "browser-live"
```

已有 HTML 与客户端首次输出就不同，可能造成 hydration mismatch。

所以需要：

```text
server getServerSnapshot === hydration getServerSnapshot
```

### 4. Hydration 之后可以切回真实客户端 snapshot

Hydration 完成后，React 会继续使用：

```jsx
getSnapshot()
```

如果它与 server snapshot 不同，React 可以在客户端做后续正常更新。

这不是 hydration mismatch，因为第一阶段已经匹配了服务端 HTML。

### 5. 真实项目如何共享服务端数据

如果服务端的初始 store 来自数据库/API，常见做法是：

```text
server reads data
→ render HTML with server snapshot
→ serialize snapshot into HTML/script payload
→ browser reads same payload
→ getServerSnapshot returns same initial data during hydration
```

之后再切换到 live client store。

### 6. 没有合理 server snapshot 怎么办

如果无法提供一致的服务端初始值，可以根据架构选择不在服务端渲染依赖该 store 的部分，而不是伪造一个会导致不一致的值。

## 动手编码：从 0 到 1

### 第 0 步：定义 server snapshot

```jsx
const SERVER_SNAPSHOT = Object.freeze({
  status: 'ssr-bootstrap',
  version: 0,
});
```

### 第 1 步：定义 client snapshot

```jsx
let clientSnapshot = Object.freeze({
  status: 'client-live',
  version: 1,
});
```

### 第 2 步：提供三函数 contract

```jsx
const snapshot = useSyncExternalStore(
  subscribe,
  getSnapshot,
  getServerSnapshot,
);
```

### 第 3 步：模拟服务端 render

```jsx
const serverHtml = renderToString(<StatusPanel />);
```

服务端 HTML 会使用 `SERVER_SNAPSHOT`。

### 第 4 步：Hydration 复用同一个 getServerSnapshot

```jsx
root.innerHTML = serverHtml;
hydrateRoot(root, <StatusPanel />);
```

Hydration 初始输出与 server HTML 一致。

### 第 5 步：观察 live store 接管

Hydration 后，组件会继续读取 client `getSnapshot`。按钮还能进一步更新 external store。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：server snapshot / hydration snapshot 的一致性 contract。
- **实验辅助代码**：浏览器内 server renderer 只为课程演示完整链路。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./14-hooks-complete-api-low-level-integration/kp138-get-server-snapshot-ssr --config ./vite.config.js
```

## 效果验证

1. 上方 Server HTML 字符串包含 `ssr-bootstrap`。
2. Hydration 不会因为初始 external store 值不一致产生 mismatch。
3. Hydration 后页面可以切换到客户端 live snapshot。
4. 点击 update external store 后版本继续变化。
5. 能解释为什么服务端预加载数据通常需要序列化给客户端。

完成后继续 **RE-KP139：useDebugValue**。
