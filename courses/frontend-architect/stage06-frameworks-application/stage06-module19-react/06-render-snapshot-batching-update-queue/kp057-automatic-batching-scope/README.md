# RE-KP057：React 18+ 自动批处理的范围

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 前置课程 | RE-KP053：同一事件中的自动批处理 |
| 本课主问题 | 为什么 `setTimeout` / Promise 里的多个 setter 在现代 React 中也常常只形成一批更新？ |
| Learning Artifact | `console.count` Render 观察 + timeout / Promise Demo |
| 暂时不用理解 | Scheduler、Lane、Fiber 调度源码 |

## 这节课只需要搞懂什么

1. React 18+ 配合 `createRoot` 扩大了自动 batching 的来源范围。
2. batching 的目标是减少没有意义的中间 Render，不是“永远只 Render 一次”。
3. 不要继续用 React 17 时代“只有 React 事件才 batch”的旧模型解释现代应用。

## 前置状态

RE-KP053 已证明：一个 React 事件处理器中可以连续请求多个更新，React 会先收集再统一处理。现在把更新搬到 `setTimeout` / Promise，看看这个模型是否还成立。

## 先预测

假设 timeout 回调中执行：

```jsx
setCount(c => c + 1);
setEnabled(value => !value);
```

先写下你的判断：

- 会看到几次组件 Render？
- `count` 和 `enabled` 会不会出现稳定的“只更新一个”的中间页面？
- 如果把 timeout 换成 Promise，结论会不会变？

## 动手实验：从 0 到 1

### Step 0：准备两个 State

```jsx
const [count, setCount] = useState(0);
const [enabled, setEnabled] = useState(false);
```

当前状态非常普通，没有 batching 结论。

### Step 1：先加入 Render 观察器

```jsx
console.count('App render');
```

这是**实验辅助代码**，不是业务写法。本课故意不包 `StrictMode`，避免开发期额外调用干扰计数。

### Step 2：把两个更新放进 timeout

```jsx
setTimeout(() => {
  setCount(c => c + 1);
  setEnabled(value => !value);
}, 300);
```

运行后观察 Console 和页面。

**现象**：回调中的两个更新会在现代 Root 下自动 batching；页面直接进入完整下一状态。

**立即解释**：React 18+ 的自动 batching 不再局限于 React 合成事件处理器。

### Step 3：换成 Promise

```jsx
Promise.resolve().then(() => {
  setCount(c => c + 1);
  setEnabled(value => !value);
});
```

再次观察。核心现象仍然是多个更新被作为一批处理。

### Step 4：确认现代 Root

```jsx
createRoot(document.getElementById('root')).render(<App />);
```

这里的 `createRoot` 是当前课程讨论现代自动 batching 行为的重要前提。

### Step 5：制造两个独立用户事件

连续点击两次按钮。不要把“自动 batching”误解成“时间靠近的所有用户动作都无限合并”。两个 click 仍然是两个有意义的事件边界。

[查看最终源码](./src/main.jsx)

## 图解：范围扩大了，不是边界消失了

```text
React 17 常见默认认知
React event → batch
Promise / timeout → 不一定 batch

React 18+ createRoot
React event ─┐
timeout ──────┼→ automatic batching
Promise ──────┤
native event ─┘

独立用户事件仍有自己的语义边界
```

## 理论收束

**Automatic Batching** 可以理解成：React 把同一个逻辑边界内的多次 State 更新先收集，再计算和提交下一版 UI，从而避免没有必要的中间 Render。它不改变 Snapshot 语义，也不表示所有更新永远被合并。

## Wrong Way

- 继续背“异步回调一定不会 batching”的 React 17 旧结论。
- 为了证明 batching 在 `StrictMode` 开发环境机械数函数调用次数，却没有控制实验变量。
- 把 batching 解释成“setter 没执行”。Setter 已经登记更新，只是 React 统一处理。

## Production Boundary

正常业务应依赖 React 默认 batching，而不是主动拆开更新。只有与外部系统有严格同步 DOM 契约时才考虑下一课的 `flushSync`。

## 本课只记住 3 件事

1. React 18+ `createRoot` 扩大了自动 batching 范围。
2. timeout / Promise 中的多个更新也可以自动合并处理。
3. batching 有边界，不是“所有时间上的更新永远合并”。

## Challenge

增加一个 `queueMicrotask` 回调，在其中连续更新两个 State；先预测，再用同样的观察方法验证。

## Mastery Check

- **Must**：能解释 timeout / Promise 中为什么也会 batching。
- **Should**：能设计不受 StrictMode 干扰的 Render 次数实验。
- **Expert**：能解释为什么“batching 来源范围”和“更新优先级/并发调度”是两个不同层次的问题。
