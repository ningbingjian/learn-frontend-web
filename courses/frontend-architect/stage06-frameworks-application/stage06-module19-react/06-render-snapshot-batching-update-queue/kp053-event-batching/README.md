# RE-KP053：同一事件中的自动批处理

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | **Must** |
| 前置课程 | RE-KP051～052：Snapshot 与 Handler Closure |
| 本课主问题 | 一个点击 Handler 里调用两个 setter，React 会不会把两个中间 UI 分别提交到页面？ |
| Learning Artifact | 双 State 保存实验 + Handler Console |
| 本课暂时不用理解 | Promise / timer 自动批处理范围、`flushSync`、Concurrent Scheduler |

## 文档目录

- [这节课只需要搞懂什么](#这节课只需要搞懂什么)
- [前置状态](#前置状态)
- [本课主问题](#本课主问题)
- [先预测](#先预测)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [图解与心智模型](#图解与心智模型)
- [理论收束](#理论收束)
- [Wrong Way 与边界](#wrong-way-与边界)
- [Production Boundary](#production-boundary)
- [本课只记住 3 件事](#本课只记住-3-件事)
- [Challenge](#challenge)
- [Mastery Check](#mastery-check)

## 这节课只需要搞懂什么

1. 同一个 React 事件 Handler 中可以请求多个 State 更新。
2. React 会等 Handler 的同步代码执行完，再处理这一批更新。
3. Batching 的目的之一是避免把“半完成 UI”暴露给用户。

## 前置状态

你已经知道：

```text
setter ≠ 立即修改当前 Snapshot
```

现在我们把问题从“一个 setter”升级到“一次用户动作里有多个 setter”。

## 本课主问题

一次“保存”同时要做两件事：

```text
保存次数 +1
状态改成 已保存
```

如果代码是：

```jsx
setSaveCount(saveCount + 1);
setStatus('已保存');
```

React 会不会这样：

```text
先提交：次数更新 / 状态没更新
再提交：次数更新 / 状态更新
```

## 先预测

假设初始页面：

```text
保存次数：0
状态：未保存
```

你觉得点击后用户会看到：

A：

```text
0 / 未保存
→ 1 / 未保存
→ 1 / 已保存
```

还是 B：

```text
0 / 未保存
→ 1 / 已保存
```

先写答案，再做实验。

## 动手编码：从 0 到 1

### Step 0：准备两个独立 State

```jsx
const [saveCount, setSaveCount] = useState(0);
const [status, setStatus] = useState('未保存');
```

页面：

```jsx
<p>保存次数：{saveCount}</p>
<p>状态：{status}</p>
```

**观察**：初始是完整一致的 0 / 未保存。

---

### Step 1：只更新保存次数

先写：

```jsx
function handleSave() {
  setSaveCount(saveCount + 1);
}
```

运行后点击：

```text
保存次数：1
状态：未保存
```

这证明单独 setter 正常工作。

---

### Step 2：同一个 Handler 再加入第二个更新

改成：

```jsx
function handleSave() {
  setSaveCount(saveCount + 1);
  setStatus('已保存');
}
```

再次运行。

**实际观察**：点击完成后页面直接得到：

```text
保存次数：1
状态：已保存
```

你不会稳定看到 setter 之间的“半完成页面”。

此时才给这个行为命名：**Batching（批处理）**。

---

### Step 3：把 Handler 执行边界打印出来

最终源码增加：

```jsx
console.log('1. Handler 开始');

setSaveCount(saveCount + 1);
setStatus('已保存');

console.log('2. Handler 结束');
```

Console 会先完整执行：

```text
1. Handler 开始
2. Handler 结束
```

然后 React 根据这一批更新形成下一次 UI。

### 立即解释

可以先理解成服务员记单：

```text
用户一次点击
↓
更新请求 A
更新请求 B
↓
Handler 同步代码结束
↓
React 处理这一批更新
↓
提交完整下一 UI
```

---

### Step 4：把 Snapshot 和 Batching 放在一起

在 Handler 里即使写：

```jsx
console.log(saveCount);
setSaveCount(saveCount + 1);
setStatus('已保存');
console.log(saveCount);
```

当前 Handler 中两次 `saveCount` 仍来自同一 Snapshot。

所以两个概念不是互相替代：

```text
Snapshot：解释当前函数为什么看到固定值
Batching：解释多个更新什么时候一起被处理
```

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp053-event-batching --config ./vite.config.js
```

最终源码：[`src/main.jsx`](./src/main.jsx)

## 图解与心智模型

```text
Click
  ↓
handleSave() 开始
  ↓
setSaveCount(...)
  ↓
setStatus(...)
  ↓
handleSave() 结束
  ↓
React 处理这一批更新
  ↓
下一次 Render / Commit
  ↓
次数和状态一起呈现为新的完整 UI
```

## 理论收束

### 一句话

> React 会把同一事件处理器中的多个 State 更新作为一批处理，而不是每调用一次 setter 就把中间页面立刻提交给用户。

### 为什么有价值

如果一次动作同时改：

```text
isSaving
saveCount
message
```

默认 batching 可以减少不必要的中间提交，也避免用户看到“只更新了一半”的瞬间状态。

### 代码变化 → 理论

| 代码 / 观察 | 对应理论 |
|---|---|
| 一个 Handler 调多个 setter | 一次交互中的多个更新请求 |
| Handler 完成后 UI 一起变化 | Batching |
| Handler 中旧变量仍固定 | State Snapshot |

## Wrong Way 与边界

### Wrong Way 1：看到两个 setter 就认定一定 Render 两次

setter 调用次数和页面实际提交次数不是一一对应关系。

### Wrong Way 2：把所有 batching 都讲成“异步”

更精确：React 在安全边界内收集并处理一批更新。

### 边界：本节只学最基础事件场景

React 18+ 在 Promise、timer 等场景有更广泛的 automatic batching，单独留给 RE-KP057。

### StrictMode 注意

开发 StrictMode 可能额外调用组件 Render 来检查纯度，所以不要机械用 `console.count('render')` 当本节唯一证据。

## Production Boundary

生产组件经常一次交互修改多个 State。默认情况下应让 React 自己批处理，不要为了“立刻看到 DOM”主动破坏这个模型。

只有极少数第三方 / 浏览器 API 集成需要同步 DOM 边界，后续 RE-KP058 / RE-KP199 会专门学习 `flushSync`。

## 本课只记住 3 件事

1. **一个 Handler 可以请求多个 State 更新。**
2. **React 会在 Handler 同步代码执行完后处理这一批更新。**
3. **Batching 和 Snapshot 是两个配合工作的模型。**

## Challenge

再增加一个 State：

```jsx
const [message, setMessage] = useState('等待操作');
```

一次点击同时更新 `saveCount`、`status`、`message`。

先预测页面是否会稳定显示任何“只改了其中一个”的中间状态，再运行验证。

## Mastery Check

### Must

- 能解释 batching 的基本含义。
- 能解释为什么 setter 数量不等于 UI 提交次数。

### Should

- 能同时使用 Snapshot + Batching 推理 Handler。
- 知道本课和 RE-KP057 自动批处理范围的边界。

### Expert

- 能解释为什么强制同步 DOM 更新应当是少数集成场景，而不是普通业务默认模式。

## 最终源码与代码边界

- **本节核心代码**：同一个 `handleSave` 中两个 State setter。
- **实验辅助代码**：Handler 起止 Console 日志。
- **最终源码**：[`src/main.jsx`](./src/main.jsx)

完成后继续 **RE-KP054：多次 setState 的结果**。
