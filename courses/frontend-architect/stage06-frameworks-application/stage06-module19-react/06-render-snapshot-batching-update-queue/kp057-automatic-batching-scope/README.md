# RE-KP057：React 18+ 自动批处理的范围

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 说清 React 18 之前和 React 18+ 自动批处理范围的主要差异。
2. 理解 `createRoot` 下 timeout、Promise 等异步边界中的更新也会自动 batching。
3. 知道 batching 的目标是减少不必要的中间 Render。
4. 理解 batching 不意味着“所有时间里的所有更新永远合并”。
5. 知道多个独立用户事件仍然是独立事件边界。
6. 能使用 Render 日志观察异步更新的 batching 现象。

> **本节核心代码**：`setTimeout` / Promise 回调里连续更新两个 State，在 `createRoot` 下由 React 自动批处理。  
> **实验辅助代码**：`console.count('App render')` 只用于观察 Render 次数，本节故意不包 `StrictMode`，避免开发期额外 Render 干扰观察。

## 理论讲解

### 1. 什么叫自动批处理范围

Batching 是：

```text
多个 State 更新
↓
React 先收集
↓
尽量用一次 Render 处理
```

RE-KP053 已经学习了 React 事件处理器内的 batching。

本节的问题是：

```text
如果更新发生在 setTimeout、Promise、原生事件等边界里呢？
```

### 2. React 18 之前的历史差异

React 18 之前，React 默认主要对 React 事件处理器里的更新做 batching。

例如旧模型里：

```jsx
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);
```

两次更新可能触发两个 Render。

这也是很多旧文章会强调：

```text
React event 内会 batch
异步回调里不会自动 batch
```

但这已经不是现代 `createRoot` 应用的完整结论。

### 3. React 18+ 与 `createRoot`

从 React 18 开始，使用现代 Root：

```jsx
createRoot(root).render(<App />);
```

自动 batching 范围扩展到了更多来源，例如：

```text
React 事件
setTimeout
Promise
原生事件处理器
其他常见异步回调
```

因此：

```jsx
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 300);
```

通常会在回调结束后一起处理，而不是每个 setter 都立即 Render 一次。

### 4. Promise 里的更新也是同样思路

例如：

```jsx
Promise.resolve().then(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
});
```

现代 React Root 下，这两次更新也会自动 batching。

### 5. batching 不等于“永远只 Render 一次”

不要把规则扩大成：

```text
只要时间足够接近，React 就永远合并
```

例如两个独立 click：

```text
用户第一次点击
用户第二次点击
```

是两个有意义的用户事件。

React 不会简单把所有事件无限制合并。

### 6. 为什么这很重要

如果仍按 React 17 的旧模型理解现代项目，你可能会：

- 错估 Render 次数。
- 写不必要的手动 batching 代码。
- 把某些性能现象解释错。
- 在调试时误以为 timeout 中每个 setter 都立即提交 DOM。

### 7. 本节为什么不用 StrictMode

课程其他案例经常使用：

```jsx
<StrictMode>
  <App />
</StrictMode>
```

但 StrictMode 开发环境可能额外调用 Render 来检查纯度。

本节要观察：

```text
一次异步回调里的两个 State 更新
到底对应多少次 Render
```

所以最终实验故意不套 StrictMode，让 Console 更容易观察。

这只是实验设计，不代表真实项目必须关闭 StrictMode。

## 动手编码：从 0 到 1

### 第 0 步：准备两个独立 State

```jsx
const [count, setCount] = useState(0);
const [enabled, setEnabled] = useState(false);
```

### 第 1 步：在组件 Render 时打印日志

```jsx
console.count('App render');
```

这属于实验辅助代码。

### 第 2 步：加入 setTimeout 更新

```jsx
function updateInTimeout() {
  setTimeout(() => {
    setCount(c => c + 1);
    setEnabled(value => !value);
  }, 300);
}
```

打开 Console 后点击按钮。

重点观察：

```text
回调里的两次 State 更新会被一起处理
```

### 第 3 步：加入 Promise 更新

```jsx
function updateInPromise() {
  Promise.resolve().then(() => {
    setCount(c => c + 1);
    setEnabled(value => !value);
  });
}
```

再次观察 Render 日志。

### 第 4 步：确认项目使用 createRoot

```jsx
createRoot(document.getElementById('root')).render(<App />);
```

这是现代 React Root。

### 第 5 步：不要把本节规则扩大到多个独立用户事件

连续点两次按钮，本质还是两次用户动作。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：timeout / Promise 中的多 State 自动 batching。
- **实验辅助代码**：`console.count` 只服务于 Render 次数观察。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp057-automatic-batching-scope --config ./vite.config.js
```

## 效果验证

1. 打开浏览器 Console。
2. 点击 timeout 按钮，等待回调执行。
3. 观察 `count` 和 `enabled` 一起变化，并检查 Render 日志。
4. 点击 Promise 按钮，重复观察。
5. 能解释 React 18+ 的自动 batching 为什么比 React 17 范围更广。
6. 能说明 `createRoot` 是本节现代行为的重要前提。

完成后继续 **RE-KP058：flushSync 打破批处理的适用边界**。
