# RE-KP135：useId 与 SSR 一致性

> [返回 Chapter 14](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 SSR + Hydration 为什么要求服务端与客户端生成匹配的 ID。
2. 理解 `useId` 的设计能够在服务器与客户端组件树一致时生成可匹配的标识。
3. 知道多个 React root 使用 SSR 时，服务端 API 与 `hydrateRoot` 必须使用相同的 `identifierPrefix`。
4. 理解组件树不一致会让 `useId` 失去匹配基础，并可能造成 hydration mismatch。
5. 能运行一个 `renderToString → hydrateRoot` 的最小教学实验。

> **本节核心代码**：相同 `<HydratedForm />` 树在 `renderToString` 与 `hydrateRoot` 两侧使用相同 `identifierPrefix`。  
> **实验辅助代码**：为了让单个 Vite lesson 可直接运行，本课在浏览器中调用 `renderToString` 模拟“服务器生成 HTML”步骤；真实项目应在服务器运行 server renderer。

## 理论讲解

### 1. Hydration 的前提是输出匹配

SSR 的基本流程：

```text
Server React tree
→ HTML
→ Browser receives HTML
→ Client React tree
→ hydrateRoot
```

Hydration 不是重新随意生成另一套 DOM，而是让客户端 React 接管已有服务端 HTML。

所以客户端第一次输出必须与服务端 HTML 兼容。

### 2. 为什么全局自增 ID 很危险

例如：

```js
let nextId = 0;
function getId() {
  nextId += 1;
  return nextId;
}
```

服务端生成组件的顺序与客户端 hydration 激活顺序并不应该成为 ID 正确性的依赖。

`useId` 会结合 React 组件树中的路径信息来生成 ID，因此在 server/client 树一致时能建立稳定对应关系。

### 3. 树必须一致

如果服务端渲染：

```jsx
<Form />
```

客户端却因为环境条件额外插入一个组件：

```jsx
<Banner />
<Form />
```

组件路径发生变化，不能期待 `useId` 神奇地修复整个 hydration mismatch。

正确要求仍然是：**首次 server/client tree 要匹配。**

### 4. identifierPrefix 解决多 root 冲突

多个独立 React app 出现在同一页面时，可以配置：

```jsx
renderToString(<App />, {
  identifierPrefix: 'account-',
});
```

客户端必须对应：

```jsx
hydrateRoot(root, <App />, {
  identifierPrefix: 'account-',
});
```

同一 SSR root 两边 prefix 不一致，会破坏 ID 匹配。

### 5. 本课为什么在浏览器里调用 renderToString

`renderToString` 属于 server rendering API。真实 SSR 应运行在 Node / server runtime。

本课为了保持每个知识点可从模块里的 Vite 命令直接启动，在浏览器中调用它生成一段 HTML，再立即交给 `hydrateRoot`。

这只是**模拟 server phase 的教学装置**，不是生产架构建议。

## 动手编码：从 0 到 1

### 第 0 步：准备支持 useId 的表单

```jsx
function HydratedForm() {
  const id = useId();
  // ...
}
```

### 第 1 步：加入可交互 State

```jsx
const [submits, setSubmits] = useState(0);
```

Hydration 后点击按钮会改变它，用来证明客户端已经接管 HTML。

### 第 2 步：模拟服务端生成 HTML

```jsx
const serverHtml = renderToString(<HydratedForm />, {
  identifierPrefix: 'kp135-',
});
```

### 第 3 步：把 HTML 放进 root

```jsx
root.innerHTML = serverHtml;
```

此时只是静态服务端 HTML。

### 第 4 步：使用相同 prefix hydrate

```jsx
hydrateRoot(root, <HydratedForm />, {
  identifierPrefix: 'kp135-',
});
```

### 第 5 步：验证交互

点击“提交计数 +1”。如果 State 正常变化，说明 React 已经接管这份 HTML。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：相同 tree + 相同 `identifierPrefix` 的 server/hydration 对称关系。
- **实验辅助代码**：浏览器中的 `renderToString` 只模拟 server step。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./14-hooks-complete-api-low-level-integration/kp135-useid-ssr-consistency --config ./vite.config.js
```

## 效果验证

1. 页面上方能看到模拟的服务端 HTML 字符串。
2. 表单中的 ID 包含 `kp135-` 前缀。
3. Hydration 后点击按钮，提交计数会变化。
4. 控制台不应出现因为 ID prefix 不一致导致的 hydration mismatch。
5. 能说明 `useId` 不能弥补 server/client 组件树不一致的问题。

完成后继续 **RE-KP136：useSyncExternalStore**。
