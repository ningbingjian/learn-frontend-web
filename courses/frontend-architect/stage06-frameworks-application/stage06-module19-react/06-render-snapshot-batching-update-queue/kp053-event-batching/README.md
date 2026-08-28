# RE-KP053：同一事件中的自动批处理

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 React 会批处理同一个事件处理器中的多个 State 更新。
2. 理解 React 通常会等事件处理器中的代码执行完，再处理这一批更新。
3. 知道 batching 的目标是避免同一个交互中出现不必要的中间 Render。
4. 能区分“调用多个 setter”和“产生多个独立页面更新”不是一回事。
5. 知道本节只讨论同一 React 事件处理器内的基础 batching。
6. 不把 React 18+ Promise / timer 等更广泛自动批处理范围提前混进本节。

> **本节核心代码**：一个 `onClick` 中连续调用两个不同 State setter，页面只观察到完整结果。
>
> **实验辅助代码**：`console.log` 用于展示 Handler 的执行边界，不用 Render 次数作为主要证据，避免 StrictMode 开发期额外调用造成误解。

## 理论讲解

### 1. 一个事件里可以更新多个 State

例如：

```jsx
const [count, setCount] = useState(0);
const [status, setStatus] = useState('idle');

function handleSave() {
  setCount(count + 1);
  setStatus('saved');
}
```

一次点击触发了两个 setter。

直觉上可能会想象：

```text
setCount
→ Render 一次
→ setStatus
→ 再 Render 一次
```

但 React 会对同一个事件处理器里的更新做 batching。

### 2. Batching 是什么

可以先理解成：

```text
事件处理器开始
  ↓
收集 State 更新 A
收集 State 更新 B
收集 State 更新 C
  ↓
事件处理器结束
  ↓
React 处理这一批更新
  ↓
得到下一次 UI
```

React 不需要在 Handler 中每调用一次 setter 就立刻把中间 UI 提交到页面。

### 3. 为什么要等 Handler 执行完

假设一次“保存”操作需要同时更新：

```text
保存次数
保存状态
提示文字
```

如果每个 setter 都立即产生可见中间 UI，用户可能短暂看到不一致状态。

批处理让一个用户动作对应更完整的一次更新结果。

### 4. Batching 不会改变当前 Snapshot

即使多个 setter 被收集：

```jsx
function handleSave() {
  console.log(count);
  setCount(count + 1);
  setStatus('saved');
  console.log(count);
}
```

当前 Handler 中两次 `count` 仍来自同一个 Snapshot。

所以：

```text
Snapshot
和
Batching
```

是互相配合的两个概念。

### 5. 不要用“异步”一个词包打天下

初学时常说：

```text
setState 是异步的
```

这个说法太粗糙。

更可预测的模型是：

```text
当前 Render 的 State 是 Snapshot
setter 请求下一次更新
同一事件中的多个更新会被批处理
```

这样后面遇到连续更新时更容易推理。

### 6. 本节为什么不讲 Promise / setTimeout

React 18+ 自动批处理的范围比“同一个 React 事件”更广。

但课程把这个范围单独放在：

```text
RE-KP057：React 18+ 自动批处理的范围
```

本节先把最基础、最稳定的事件 batching 模型学清楚。

### 7. StrictMode 下不要机械数 Render 日志

课程示例使用 `StrictMode`。

开发环境里 StrictMode 可能额外调用组件函数来帮助发现不纯 Render。

因此本课不把：

```text
console.count('render')
```

当作 batching 的唯一判断依据。

核心观察是：一次 Handler 中多个更新被作为一批处理，页面不会展示 setter 之间的临时 UI。

## 动手编码：从 0 到 1

### 第 0 步：准备两个独立 State

```jsx
const [saveCount, setSaveCount] = useState(0);
const [status, setStatus] = useState('未保存');
```

### 第 1 步：创建保存 Handler

```jsx
function handleSave() {
  // 稍后放多个 setter
}
```

### 第 2 步：记录 Handler 边界

```jsx
console.log('1. Handler 开始');
```

### 第 3 步：连续请求两个 State 更新

```jsx
setSaveCount(saveCount + 1);
setStatus('已保存');
```

### 第 4 步：记录 Handler 结束

```jsx
console.log('2. Handler 结束');
```

### 第 5 步：观察 UI

点击一次后页面直接得到：

```text
保存次数：+1
状态：已保存
```

不会先稳定展示“次数更新了但状态还没更新”的中间页面。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：同一 Handler 中多个 setter。
- **实验辅助代码**：Handler 起止日志用于强调 React 会等本次事件代码执行后再处理这一批更新。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp053-event-batching --config ./vite.config.js
```

## 效果验证

1. 点击一次会同时更新保存次数和状态。
2. 页面不会稳定出现两个 setter 之间的中间 UI。
3. Console 中先完整执行 Handler 的同步代码。
4. 能解释 batching 是“收集并统一处理一批更新”，不是“setter 没执行”。
5. 能说明本节范围只到同一事件，异步边界留到 RE-KP057。

完成后继续 **RE-KP054：多次 setState 的结果**。
