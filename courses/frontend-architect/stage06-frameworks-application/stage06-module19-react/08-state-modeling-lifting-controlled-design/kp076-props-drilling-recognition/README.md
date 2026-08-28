# RE-KP076：Props Drilling 的识别

> [返回 Chapter 08](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 识别 Props Drilling 的典型结构。
2. 区分“正常 Props 传递”和“中间组件只负责机械转发”。
3. 知道 Props Drilling 本身不是语法错误，也不意味着必须立即使用 Context。
4. 会先尝试调整组件边界、使用 `children`/JSX 组合缩短数据链路。
5. 为后续 Context 学习建立正确的问题意识。

> **本节核心代码**：`App → Dashboard → Toolbar → ActionGroup → ExportButton` 的逐层转发对比组合式 API。  
> **实验辅助代码**：`currentUser` 和导出按钮只是用于构造可观察的数据流。

## 理论讲解

### 1. 什么是 Props Drilling

假设只有最深层 `ExportButton` 真正使用 `canExport`：

```text
App
 ↓ user
Dashboard
 ↓ user
Toolbar
 ↓ user
ActionGroup
 ↓ canExport
ExportButton
```

中间的：

```text
Dashboard
Toolbar
ActionGroup
```

可能完全不使用这个值，只是继续向下传。

这就是典型的 Props Drilling 信号。

### 2. Props 传三层不自动等于坏设计

Props 的优点是：

- 数据流显式；
- 容易追踪来源；
- 组件依赖写在 API 上。

所以：

```text
“传得深”
≠
“必须重构”
```

真正值得关注的是：

```text
大量中间层不消费该数据
但被迫在 API 中重复声明和转发
```

### 3. 先看能否调整组件边界

如果 `Toolbar` 根本不需要知道 `user`，可以让调用者直接提供它要显示的操作区域：

```jsx
<Toolbar
  actions={<ExportButton canExport={currentUser.canExport} />}
/>
```

这样：

```text
App
 ├─ knows user
 ├─ creates ExportButton
 └─ Toolbar only knows actions
```

中间组件不再被业务数据污染。

### 4. Context 不是第一反应

Context 很适合：

- 主题；
- 当前用户；
- 路由；
- 很多深层组件都需要的共享信息。

但仅仅因为“某个 Prop 传了几层”就立刻改 Context，可能会隐藏原本清晰的数据依赖。

本课只学习识别和结构重构，Context 会在后续 Chapter 09 正式学习。

### 5. Props Drilling 也是组件边界反馈

如果多个中间组件只转发同一批 Props，可能说明：

- 组件拆分层级不合理；
- 某个布局组件应该接收 `children` / React node；
- 数据 owner 离真正消费者太远；
- 或确实需要 Context。

因此它首先是一个**架构信号**。

## 动手编码：从 0 到 1

### 第 0 步：建立最深层消费者

```jsx
function ExportButton({ canExport }) {
  return (
    <button disabled={!canExport}>
      导出报表
    </button>
  );
}
```

**本步目标**：明确谁真正需要数据。  
**为什么这样写**：先从最终消费点向上分析。  
**运行后观察**：`canExport` 决定按钮是否可用。

### 第 1 步：加入一个中间层

```jsx
function ActionGroup({ user }) {
  return <ExportButton canExport={user.canExport} />;
}
```

**本步目标**：开始制造传递链。  
**为什么这样写**：`ActionGroup` 自己并不使用权限。  
**运行后观察**：它只是转发数据。

### 第 2 步：继续增加 Toolbar 和 Dashboard

```jsx
function Toolbar({ user }) {
  return <ActionGroup user={user} />;
}

function Dashboard({ user }) {
  return <Toolbar user={user} />;
}
```

**本步目标**：形成完整 drilling 路径。  
**为什么这样写**：观察 API 如何被“转发职责”污染。  
**运行后观察**：每层都必须知道 `user`，但只有最深层真正消费。

### 第 3 步：画出数据路径

```text
App → Dashboard → Toolbar → ActionGroup → ExportButton
```

**本步目标**：先识别，再重构。  
**为什么这样写**：不要靠“感觉 Props 很多”判断问题。  
**运行后观察**：中间三层只做传递。

### 第 4 步：用组合缩短链路

建立：

```jsx
function ComposedToolbar({ actions }) {
  return <nav>{actions}</nav>;
}
```

调用：

```jsx
<ComposedToolbar
  actions={<ExportButton canExport={currentUser.canExport} />}
/>
```

**本步目标**：让布局组件只知道布局 API。  
**为什么这样写**：数据在真正知道它的地方直接进入最终消费者。  
**运行后观察**：`ComposedToolbar` 不需要 `user` Prop。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Drilling 链路与 React node 组合对照。
- **实验辅助代码**：用户权限和静态页面结构。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./08-state-modeling-lifting-controlled-design/kp076-props-drilling-recognition --config ./vite.config.js
```

## 效果验证

1. 能指出哪个组件真正消费 `canExport`。
2. 能指出哪些中间组件只是机械转发。
3. 能解释为什么 Props Drilling 不等于立即使用 Context。
4. 能通过组合让 Toolbar 不再依赖 `user`。
5. 能把 Props Drilling 当成组件边界/数据 owner 的反馈信号。

完成后继续 **RE-KP077：状态放置原则**。
