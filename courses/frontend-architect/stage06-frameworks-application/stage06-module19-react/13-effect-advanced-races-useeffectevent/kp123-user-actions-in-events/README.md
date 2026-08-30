# RE-KP123：在事件中处理用户动作

> [返回 Chapter 13](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分“因为组件被显示而发生”与“因为用户做了某个动作而发生”。
2. 理解明确的用户动作应该优先放在 Event Handler 中。
3. 避免创建 `shouldSubmit` / `shouldBuy` State，再用 Effect 监听它执行动作。
4. 理解 Event Handler 可以直接执行异步业务流程。
5. 能解释为什么购买、发送、保存等操作不应该由渲染本身间接触发。

> **本节核心代码**：在 `handlePurchase` 点击事件中直接执行购买流程。  
> **实验辅助代码**：`submitPurchase()` 用延迟 Promise 模拟后端请求。

## 理论讲解

### 1. Effect 和 Event 的触发原因不同

Effect 的语义是：

```text
组件当前出现在屏幕上，并且需要和外部系统保持同步。
```

Event Handler 的语义是：

```text
用户刚刚做了一个明确动作。
```

例如：

- 用户点击“购买” → Event。
- 用户点击“发送消息” → Event。
- 用户点击“保存草稿” → Event。
- 组件显示期间保持 WebSocket 连接 → Effect。

### 2. 常见反模式：用 State 间接触发用户动作

下面的结构会把一次明确点击绕成响应式流程：

```jsx
const [shouldPurchase, setShouldPurchase] = useState(false);

useEffect(() => {
  if (shouldPurchase) {
    submitPurchase();
  }
}, [shouldPurchase]);
```

按钮只是：

```jsx
<button onClick={() => setShouldPurchase(true)}>
  购买
</button>
```

问题是：

1. 购买动作本来已经知道是谁触发的。
2. 又额外创建了一份控制 State。
3. Effect 变成了应用业务流程调度器。
4. 开发期重挂载、状态恢复或未来逻辑变化都更容易让语义变模糊。

### 3. 直接在事件里表达业务意图

更直接的代码是：

```jsx
async function handlePurchase() {
  setStatus('submitting');
  await submitPurchase(orderId);
  setStatus('success');
}
```

按钮：

```jsx
<button onClick={handlePurchase}>确认购买</button>
```

这段代码表达了非常清楚的因果关系：

```text
用户点击
→ 发起购买
→ 更新提交状态
```

### 4. Event Handler 可以执行副作用

“Render 必须纯净”不代表整个 React 应用都不能执行副作用。

事件处理器本身就是执行用户动作相关副作用的正确位置之一，例如：

```text
网络请求
localStorage 写入
打印
下载
通知
```

关键问题不是“是不是副作用”，而是：**这个行为是由什么触发的？**

### 5. 判断口诀

可以问自己：

> “如果用户没有做这个动作，仅仅因为组件重新显示，我还应该执行它吗？”

如果答案是否定的，例如购买、提交表单、发送消息，那么它通常属于 Event Handler。

## 动手编码：从 0 到 1

### 第 0 步：准备订单数据

```jsx
const orderId = 'ORDER-2026-001';
const amount = 499;
```

### 第 1 步：准备提交状态

```jsx
const [status, setStatus] = useState('idle');
const [message, setMessage] = useState('尚未提交');
```

这里的 State 只负责 UI 状态，不负责“触发购买”。

### 第 2 步：写模拟请求函数

```jsx
function submitPurchase(orderId, amount) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ orderId, amount }), 700);
  });
}
```

这是实验辅助代码，用来模拟真实 API。

### 第 3 步：在事件中直接执行购买

```jsx
async function handlePurchase() {
  setStatus('submitting');
  const result = await submitPurchase(orderId, amount);
  setStatus('success');
  setMessage(`购买成功：${result.orderId}`);
}
```

### 第 4 步：按钮直接绑定事件

```jsx
<button onClick={handlePurchase}>
  确认购买
</button>
```

不创建：

```jsx
shouldPurchase
shouldSubmit
pendingAction
```

之类只为驱动 Effect 的 State。

### 第 5 步：验证组件重新 Render 不会重复购买

修改备注输入框会引发 Render，但不会执行 `submitPurchase()`。

只有真正点击按钮才会执行购买。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`handlePurchase` 直接承载用户动作流程。
- **实验辅助代码**：模拟购买 Promise 和备注输入框用于观察“Render ≠ 用户动作”。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./13-effect-advanced-races-useeffectevent/kp123-user-actions-in-events --config ./vite.config.js
```

## 效果验证

1. 在备注输入框中连续输入文字，只会重新 Render，不会自动购买。
2. 点击“确认购买”后才进入提交状态。
3. 模拟请求完成后显示购买成功。
4. 源码没有通过 `shouldPurchase` State + Effect 间接触发购买。
5. 能解释为什么“明确用户动作”应该优先留在 Event Handler。

完成后继续 **RE-KP124：Effect 中的数据请求竞态**。
