# RE-KP010：Fast Refresh 的作用与状态保留边界

> [返回 Chapter 01](../README.md) · [返回 React 模块索引](../../README.md) · [打开组件源码](./src/App.jsx) · [打开入口源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 Vite HMR 与 React Fast Refresh。
2. 理解 Fast Refresh 的目标是快速更新组件代码，并在安全时尽量保留本地 State。
3. 知道状态保留不是绝对承诺，而受 Refresh Boundary、组件身份和修改类型影响。
4. 知道 `@vitejs/plugin-react` 在开发环境中负责 React Fast Refresh 集成。
5. 理解为什么组件文件保持一致的组件导出边界更有利于 Fast Refresh。
6. 知道出现 refresh invalidation 或整页 reload 时应该先检查文件导出结构，而不是把它当成 React State 本身的 Bug。

> **本节核心代码**：`src/App.jsx` 中的 `useState` 计数器，以及“先改变 State → 修改组件源码 → 保存 → 观察 State 是否保留”的实验过程。
>
> **实验辅助代码**：Vite HMR 通道、`@vitejs/plugin-react` 与 `src/main.jsx` 负责让 Refresh 实验成立，本节不深入其实现源码。

## 理论讲解

### 1. HMR 和 Fast Refresh 不是同一个词

Vite 提供 **HMR（Hot Module Replacement）** 基础设施：

```text
某个模块文件变化
      ↓
开发服务器把更新发送给浏览器
      ↓
尽量只更新相关模块
而不是整页 reload
```

React Fast Refresh 则是 React 层的开发体验：

```text
HMR 收到组件模块更新
      ↓
React Refresh 判断组件边界
      ↓
替换组件实现
      ↓
在安全时尽量保留本地 State
```

所以关系更接近：

```text
Vite HMR
基础热更新能力
   +
React Fast Refresh
理解 React 组件身份与 Hook 签名
```

### 2. 为什么普通 HMR 不足以理解 React State

一个通用模块系统只知道：

```text
这个 JavaScript 模块变了
```

它不天然知道：

```text
哪个导出是 React 组件？
修改后还是不是同一个组件身份？
Hook 结构是否还能安全保留？
本地 State 是否应该延续？
```

Fast Refresh 就是在这一层增加 React 专用判断。

### 3. 本课程为什么把 `App` 单独放一个文件

当前结构：

```text
src/
├── App.jsx
└── main.jsx
```

其中：

```text
App.jsx
只导出 React 组件

main.jsx
负责 createRoot 和入口挂载
```

`@vitejs/plugin-react` 当前文档明确建议：为了让 React Refresh 正确工作，组件文件应保持一致的组件导出。若出现不兼容的导出变化，模块会被 invalidated，并把 HMR 更新继续向上游传播。

因此这是一个很实用的文件边界习惯。

### 4. Fast Refresh 为什么能保留 count

本例：

```jsx
const [count, setCount] = useState(0);
```

先把 `count` 加到 3，再只修改：

```jsx
<h1>Fast Refresh 状态保留实验</h1>
```

例如改成：

```jsx
<h1>Fast Refresh 已更新标题</h1>
```

保存后，如果 Refresh Boundary 仍然有效，组件实现会更新，而当前 `count` 通常可以继续保持 3。

这就是 Fast Refresh 最直观的价值：

> 调 UI 时不需要每次都从头重新操作到当前状态。

### 5. 状态为什么有时会重置

不要把 Fast Refresh 学成：

```text
只要保存文件，State 永远不丢
```

以下变化都可能扩大刷新范围或导致状态无法继续保留：

- Refresh Boundary 失效。
- 文件导出从组件边界变成不兼容结构。
- 组件身份发生根本变化。
- Hook 结构变化使旧状态无法安全对应。
- HMR 最终退化为整页 reload。

此外，即使没有 Fast Refresh，React 自身也会根据“组件类型 + 在树中的位置”决定 State 是否保存。这个正式规则会在 Chapter 07 系统学习。

### 6. Fast Refresh 是开发能力，不是生产运行机制

生产构建不会靠 Fast Refresh 工作。

它的目标只是：

```text
开发者修改源码
      ↓
减少等待和重复操作
      ↓
更快验证 UI 变化
```

因此排查线上问题时，不应该把 Fast Refresh 当成生产架构的一部分。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要亲手观察：

```text
count 先变成 3
      ↓
修改 App.jsx 的静态文字
      ↓
保存
      ↓
页面立即更新
      ↓
count 尽量保持 3
```

### 第 1 步：创建入口文件

`src/main.jsx`：

```jsx
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
```

### 第 2 步：创建纯组件文件

`src/App.jsx`：

```jsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Fast Refresh 状态保留实验</h1>
      <p>当前 count: {count}</p>
      <button onClick={() => setCount((value) => value + 1)}>
        count + 1
      </button>
    </main>
  );
}
```

为什么把入口与组件拆开？

因为这让 `App.jsx` 成为更清晰的 React Refresh Boundary。

### 第 3 步：启动开发服务器

```bash
npm run dev -- ./01-react-foundations/kp010-fast-refresh --config ./vite.config.js
```

### 第 4 步：先制造一个有价值的本地 State

点击按钮三次，让页面变成：

```text
count: 3
```

### 第 5 步：只修改静态标题

保持页面开着，把 `App.jsx` 中：

```jsx
<h1>Fast Refresh 状态保留实验</h1>
```

改成另一个标题并保存。

应该观察到：

```text
标题几乎立即更新
count 通常仍然是 3
没有手工刷新浏览器
```

### 第 6 步：比较手工整页刷新

现在按浏览器刷新按钮。

页面重新加载后：

```text
count → 0
```

这个对照非常重要：

```text
Fast Refresh
尝试保留组件开发状态

Full Reload
整个页面重新初始化
```

### 第 7 步：认识 Boundary 失效信号

以后如果终端出现类似：

```text
Could not Fast Refresh
export is incompatible
hmr invalidate
```

优先检查：

```text
组件文件是否混入了会破坏 refresh boundary 的导出？
文件职责是否应该拆分？
```

不要直接归因于 `useState`。

### 第 8 步：对照最终源码

- [`src/App.jsx`](./src/App.jsx)
- [`src/main.jsx`](./src/main.jsx)

本节最后区分：

- **核心代码/实验**：带 `count` State 的组件在源代码更新前后是否能保留状态。
- **实验辅助代码**：Vite HMR、React 插件和 Root 入口只负责提供开发热更新环境。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./01-react-foundations/kp010-fast-refresh --config ./vite.config.js
```

然后按顺序执行：

```text
count + 1 三次
→ 修改 App.jsx 标题
→ 保存
→ 检查 count
→ 浏览器整页刷新
→ 再检查 count
```

## 效果验证

你应该能够解释：

1. Vite HMR 与 React Fast Refresh 的分工。
2. 为什么 Fast Refresh 需要识别 React 组件边界。
3. 为什么编辑静态 JSX 时 State 往往能保留。
4. 为什么整页刷新后 State 会重新初始化。
5. 为什么组件文件混合不兼容导出可能导致 refresh invalidation。
6. 为什么 Fast Refresh 只属于开发体验，不属于生产运行机制。
