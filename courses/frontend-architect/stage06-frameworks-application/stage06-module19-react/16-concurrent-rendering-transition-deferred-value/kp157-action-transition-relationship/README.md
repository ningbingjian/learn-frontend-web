# RE-KP157：Action 与 Transition 的关系

> [返回 Chapter 16](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 React 文档中 Action 与 Transition 是相关但不同的概念。
2. 知道传给 `startTransition` 的函数被称为 Action。
3. 理解 Action 可以同步，也可以异步。
4. 理解 `isPending` 跟踪的是 Transition 中 Action 的进行过程。
5. 知道自定义 async Transition 对请求完成乱序仍需要自行治理。

> **本节核心代码**：命名 `submitAction` 并把它传给 `startTransition(submitAction)`，明确函数与调度过程的概念边界。  
> **实验辅助代码**：`saveDisplayName()` 只模拟异步保存。

## 理论讲解

### 1. Action 是什么

React 当前文档把传给 `startTransition` 的函数称为 Action：

```jsx
startTransition(submitAction);
```

这里：

```text
submitAction → Action
```

Action 描述“要做什么工作”。

### 2. Transition 是什么

`startTransition(...)` 启动的是 Transition 过程。

可以理解为：

```text
Action = 工作函数
Transition = React 用非阻塞语义协调这组 Action / State Update 的过程
```

不要把两者当成同义词。

### 3. Action 可以包含异步工作

本节：

```jsx
async function submitAction() {
  const serverName = await saveDisplayName(submittedName);
  // ...
}
```

React 19 支持 async Action，并且 `isPending` 可以覆盖异步过程。

### 4. await 后 State Update 仍受当前限制

因此 Action 内写：

```jsx
startTransition(() => {
  setSavedName(serverName);
});
```

这是 RE-KP156 已经讲过的 async scope 限制。

### 5. Action 命名是 API 设计信号

React 文档建议按约定使用 `action` 或 `Action` 后缀，例如：

```text
submitAction
saveAction
action prop
```

这告诉调用方：这个函数可能被放进 Transition，并且可能是 async。

### 6. Transition 不自动解决所有异步竞态

如果用户连续发起多个自定义 async Transition，请求可能乱序完成。React 官方明确指出，直接用 Transition 自己构建异步状态流程时，请求 ordering 可能仍要开发者处理。

后续 React 19 的 `useActionState`、Form Actions 等更高层抽象会进一步处理常见 Action 场景。

## 动手编码：从 0 到 1

### 第 0 步：准备两个 State

```jsx
const [draftName, setDraftName] = useState('Ada');
const [savedName, setSavedName] = useState('Ada');
```

### 第 1 步：定义一个有名字的 Action

```jsx
async function submitAction() {
  const submittedName = draftName.trim();
  if (!submittedName) return;

  const serverName = await saveDisplayName(submittedName);
}
```

### 第 2 步：把 Action 交给 startTransition

```jsx
<button onClick={() => startTransition(submitAction)}>
```

这行代码把两个概念直接摆在一起：

```text
submitAction → 工作
startTransition → 调度语义
```

### 第 3 步：正确处理 await 后更新

```jsx
startTransition(() => {
  setSavedName(serverName);
});
```

### 第 4 步：使用 isPending

```jsx
{isPending ? '提交 Action 中…' : '提交'}
```

`isPending` 不属于 `submitAction` 自己维护，而由 Transition 提供。

### 第 5 步：保持草稿输入 Urgent

```jsx
onChange={event => setDraftName(event.target.value)}
```

用户在 Action pending 时仍应理解输入与后台保存是不同职责。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`submitAction` 与 `startTransition(submitAction)` 的概念对应关系。
- **实验辅助代码**：异步 Promise 只用于模拟远端保存。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./16-concurrent-rendering-transition-deferred-value/kp157-action-transition-relationship --config ./vite.config.js
```

## 效果验证

1. 能指出源码中的哪个函数是 Action。
2. 能指出哪一行启动 Transition。
3. 能解释 Action 为什么可以是 async。
4. 能解释 `isPending` 为什么属于 Transition 观察能力。
5. 能说明自定义 async Transition 并不会天然解决多个请求的完成顺序问题。

完成后继续 **RE-KP158：useDeferredValue**。
