# RE-KP043：State 更新触发重新渲染

> [返回 Chapter 05](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解调用 State setter 会请求 React 进行一次新的渲染。
2. 知道“重新渲染”首先意味着 React 再次调用组件函数，而不是简单地把旧 JSX 文本原地改掉。
3. 能通过 Console 日志观察组件函数再次执行。
4. 能描述 `事件 → setter → render → 新 UI 描述 → 页面更新` 的最小链路。
5. 知道完整的 Batching、Render Snapshot、Update Queue 会在 Chapter 06 深入。

> **本节核心代码**：`setCount(count + 1)` 触发后续 Render，新的 Render 读取新的 `count` 并返回新的 UI 描述。  
> **实验辅助代码**：Render 阶段的 `console.log()` 只用于观察组件再次执行，不推荐把业务副作用放在 Render 中。

## 理论讲解

### 1. setter 不只是“修改一个 JavaScript 变量”

```jsx
setCount(count + 1);
```

它告诉 React：

```text
这个组件的 State 有下一值了
      ↓
需要重新计算 UI
```

所以 React 后续会再次调用组件函数。

### 2. Render 的第一层直觉

组件：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <p>{count}</p>;
}
```

第一次 Render：

```text
count = 0
→ 返回描述 0 的 UI
```

点击以后：

```text
setCount(1)
→ React 再次调用 Counter
→ 新 Render 读取 count = 1
→ 返回描述 1 的 UI
```

### 3. 为什么页面会更新

链路可以先写成：

```text
用户点击
   ↓
Event Handler
   ↓
setCount(...)
   ↓
React 安排新的 Render
   ↓
组件函数再次执行
   ↓
返回新的 React Element
   ↓
React 更新必要的 DOM
```

Reconciliation / Commit 的细节会在 Chapter 15 系统学习。

### 4. Render 日志只用于观察

本节在组件函数里写：

```js
console.log('[render] count =', count);
```

目的是证明组件函数会再次执行。

不要把：

```text
请求
写 localStorage
操作 DOM
发送埋点
```

这类业务副作用塞进 Render。

### 5. 暂时不要提前混入更新队列细节

你现在只需要记住：

```text
setter
→ 请求下一次 Render
```

至于：

- 为什么当前 Handler 里的变量不会马上变。
- 多次 `setCount` 为什么可能合并。
- 函数式 updater 如何排队。

会在 Chapter 06 专门学习。

## 动手编码：从 0 到 1

### 第 0 步：建立计数器

```jsx
const [count, setCount] = useState(0);
```

### 第 1 步：在 Render 中加入观察日志

```js
console.log('[render] count =', count);
```

首次打开页面会看到一次或开发环境相关的 Render 日志。

### 第 2 步：按钮中调用 setter

```jsx
<button onClick={() => setCount(count + 1)}>+1</button>
```

### 第 3 步：点击并观察

每次点击以后：

```text
页面 count 改变
Console 出现新的 Render 日志
```

说明组件函数为了新 State 再次执行。

### 第 4 步：不要在 Render 日志里做业务动作

临时把日志想象成“发请求”，就能意识到为什么 Render 必须保持纯净。

本节只观察，不做副作用。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：setter 与后续 Render 的关系。
- **实验辅助代码**：`console.log` 只是 Render 探针。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./05-state-basics-object-array-updates/kp043-state-update-rerender --config ./vite.config.js
```

打开 Console 后点击 `+1`。

## 效果验证

1. 页面计数每次点击后更新。
2. Console 能观察到新的 Render 日志。
3. 能解释 setter 为什么和普通变量赋值不同。
4. 能画出 Event → setter → Render → UI 的最小链路。
5. 知道 Batching / Snapshot / Update Queue 还没有在本节展开。

完成后继续 **RE-KP044：State 不可直接修改**。
