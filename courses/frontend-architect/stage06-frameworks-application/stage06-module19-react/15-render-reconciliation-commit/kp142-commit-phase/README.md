# RE-KP142：Commit Phase

> [返回 Chapter 15](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 Commit Phase 是 React 把 Render 计算结果应用到宿主环境的阶段。
2. 理解初次 Commit 与后续更新都发生在 Render 之后。
3. 理解 React 只对实际变化的 DOM 部分执行必要操作。
4. 会使用 DOM Ref + `useLayoutEffect` 在 Commit 后观察已更新 DOM。
5. 区分“Render 计算发生”与“DOM mutation 发生”。

> **本节核心代码**：Render 日志 + `useLayoutEffect` 中读取已经 Commit 的 DOM 文本。  
> **实验辅助代码**：按钮和 `note` 输入用于制造有 DOM 变化与无关变化两种更新。

## 理论讲解

### 1. Commit 在 Render 之后

React 先计算：

```text
Next UI
```

然后才在 Commit Phase 修改 DOM，使浏览器中的 Host Tree 与最新 Render 结果一致。

### 2. 初次 Render 的 Commit

首次挂载时，React 创建需要的 DOM 节点并插入容器。

### 3. Re-render 的 Commit

后续更新不会无脑重建全部 DOM。React 根据前后两版输出计算差异，然后应用必要的最小 DOM 操作。

例如：

```jsx
<h2>Count: {count}</h2>
```

如果只改变文本，通常不需要替换整个 `<h2>` 节点。

### 4. useLayoutEffect 能观察 Commit 后 DOM

`useLayoutEffect` 在 DOM mutation 完成后、浏览器 Paint 前执行，因此适合教学观察：

```jsx
useLayoutEffect(() => {
  console.log(nodeRef.current.textContent);
});
```

这里读到的是已经 Commit 的 DOM。

### 5. Commit 不代表每个节点都变化

组件可以重新 Render，但如果输出对某个 DOM 节点没有实际差异，React 可以不修改它。

这也是：

```text
Render != DOM Mutation
```

的重要原因。

## 动手编码：从 0 到 1

### 第 0 步：创建计数 DOM

```jsx
<h2 ref={valueRef}>Count: {count}</h2>
```

### 第 1 步：记录 Render

```jsx
console.log('[render] count =', count);
```

### 第 2 步：Commit 后读取 DOM

```jsx
useLayoutEffect(() => {
  console.log('[commit] DOM =', valueRef.current.textContent);
});
```

### 第 3 步：改变 count

点击按钮后可以观察：

```text
render log
→ DOM mutation
→ layout effect commit log
```

### 第 4 步：加入 unrelated note

改变 note 会让组件 Render，但 `Count` 文本不变。React 没必要因此替换 `h2`。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Commit 后 DOM 观察。
- **实验辅助代码**：Console Trace 与无关 State。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./15-render-reconciliation-commit/kp142-commit-phase --config ./vite.config.js
```

## 效果验证

1. Console 中 Render 日志先于 Layout Effect 的 Commit 日志。
2. Commit 日志能够读取最新 DOM 文本。
3. 修改无关 State 时组件仍可 Render，但 `Count` DOM 内容无需变化。
4. 能解释为什么 React Render 一次不等于重建整个 DOM。

完成后继续 **RE-KP143：Render 不等于 DOM 已更新**。
