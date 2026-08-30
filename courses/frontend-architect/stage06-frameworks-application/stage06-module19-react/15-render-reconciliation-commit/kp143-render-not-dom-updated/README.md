# RE-KP143：Render 不等于 DOM 已更新

> [返回 Chapter 15](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解调用 `setState` 是请求 React 安排更新，不是同步修改 DOM。
2. 观察事件处理器里 `setState` 后立刻读取 DOM 仍可能得到旧内容。
3. 理解 State Snapshot、Render 与 Commit 三者之间的边界。
4. 会在 Commit 后的合适时机观察最新 DOM。
5. 避免写出依赖“setState 后 DOM 已同步更新”的命令式代码。

> **本节核心代码**：事件处理器内 `setCount` 后立即读取 DOM，与 `useLayoutEffect` Commit 后读取形成对照。  
> **实验辅助代码**：`lastImmediateRead` 用于把事件时刻读到的旧 DOM 显示到页面上。

## 理论讲解

### 1. setState 不直接改 DOM

执行：

```jsx
setCount(count + 1);
```

含义更接近：

```text
请求 React 使用新的 State 再进行一次更新
```

而不是：

```text
现在立刻把页面里的 Count DOM 改掉
```

### 2. 事件处理器拥有当前 Render 的 Snapshot

事件代码运行时，`count` 来自触发该事件的那一次 Render。

因此：

```jsx
console.log(count);
setCount(count + 1);
console.log(count);
```

两次通常还是同一个 snapshot 值。

### 3. DOM 也要等 Commit

事件处理器中的：

```js
valueRef.current.textContent
```

在 React Commit 新结果之前仍代表旧 DOM。

### 4. Commit 后才能保证 React DOM 对应新输出

如果确实需要在 DOM Commit 后立即观察，可以使用适合布局场景的 `useLayoutEffect`。

但一般业务逻辑不应依赖手动读取 DOM，而应直接依赖 React State。

### 5. 先问“为什么要读 DOM”

如果只是想知道新 count：

```js
const nextCount = count + 1;
```

直接用数据即可，不需要从 DOM 反向读取。

DOM Ref 应用于聚焦、测量、第三方库集成等必要的 Escape Hatch。

## 动手编码：从 0 到 1

### 第 0 步：准备 DOM Ref

```jsx
const valueRef = useRef(null);
<h2 ref={valueRef}>Count: {count}</h2>
```

### 第 1 步：事件中请求 State 更新

```jsx
function handleClick() {
  setCount(value => value + 1);
}
```

### 第 2 步：紧接着读取 DOM

```jsx
const immediateText = valueRef.current.textContent;
```

它仍然是当前 Commit 的旧文本。

### 第 3 步：保存这次观察结果

```jsx
setLastImmediateRead(immediateText);
```

这样可以在下一次 Commit 后看到事件时刻到底读到了什么。

### 第 4 步：Layout Effect 中读取新 DOM

```jsx
useLayoutEffect(() => {
  console.log('[after commit]', valueRef.current.textContent);
}, [count]);
```

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Event 时刻旧 DOM vs Commit 后新 DOM。
- **实验辅助代码**：`lastImmediateRead` 只用于可视化观察。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./15-render-reconciliation-commit/kp143-render-not-dom-updated --config ./vite.config.js
```

## 效果验证

1. 初始页面显示 `Count: 0`。
2. 点击按钮时，事件里立即读取仍得到旧 DOM `Count: 0`。
3. Commit 后页面显示 `Count: 1`。
4. Console 的 Layout Effect 能读到新 DOM。
5. 能解释为什么 setState 之后不应假设 DOM 已同步更新。

完成后继续 **RE-KP144：组件函数为什么可以重复执行**。
