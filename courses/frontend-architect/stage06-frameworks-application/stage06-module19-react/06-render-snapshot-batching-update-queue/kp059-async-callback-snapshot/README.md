# RE-KP059：异步回调中的快照理解

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `setTimeout` / Promise 回调会闭包捕获创建它们的那次 Render 的值。
2. 区分“回调实际执行时间”和“回调读取的 State Snapshot”。
3. 能解释为什么延迟两秒执行的函数仍可能看到两秒前的 State。
4. 不再用“时间过去了，所以闭包里的变量自动变新”理解 React State。
5. 为下一节 stale closure 建立直接前置模型。

> **本节核心代码**：在事件处理器里创建 `setTimeout`，两秒后读取本次 Render 捕获的 `count`。  
> **实验辅助代码**：消息 State 只用于把异步回调看到的值显示到页面。

## 理论讲解

### 1. 异步回调不会自动拥有“未来 State”

假设当前：

```text
count = 0
```

点击“2 秒后读取”时：

```jsx
setTimeout(() => {
  console.log(count);
}, 2000);
```

这个 callback 是当前 Render 的代码创建的。

它闭包捕获的 `count` 是：

```text
当前 Render 的 count
```

### 2. 两秒内页面可以继续更新

如果定时器还没触发时，你把 count 点到：

```text
3
```

页面确实已经发生新的 Render。

但是旧 callback 仍然属于：

```text
count = 0 那次 Render
```

两秒后它仍可能输出：

```text
0
```

### 3. 关键不是 setTimeout，而是闭包

同类情况还可能发生在：

```text
Promise 回调
async/await 后续代码
订阅回调
事件监听器
定时器
网络请求完成回调
```

真正的共同点是：

```text
回调函数在某次 Render 中被创建
↓
闭包捕获那次 Render 的值
↓
未来某个时间才执行
```

### 4. 时间轴怎么画

```text
Render A
count = 0
创建 callback A
     │
     ├── 用户继续点击 +1
     │
Render B: count = 1
Render C: count = 2
Render D: count = 3
     │
     └── 两秒后 callback A 执行
         callback A 仍看到 Render A 的 count = 0
```

这就是 Snapshot + Closure 共同作用的结果。

### 5. 这不一定是 Bug

有时你就是想知道：

```text
“用户点击安排这个任务时，值是多少？”
```

那捕获旧 Snapshot 反而完全正确。

例如：

```text
提交订单时的商品价格
发起请求时的筛选条件
点击确认时的表单内容
```

因此旧值本身不是错误。

错误发生在：

```text
你以为回调读的是最新值
但它实际读的是旧 Render 的值
```

### 6. 和下一节 stale closure 的关系

本节只证明：

```text
异步回调可以稳定地持有旧 Snapshot
```

下一节会进一步讨论：

```text
什么时候这种旧 Snapshot 会造成业务 Bug
以及如何根据需求修复
```

## 动手编码：从 0 到 1

### 第 0 步：准备 count

```jsx
const [count, setCount] = useState(0);
```

### 第 1 步：加入立即更新按钮

```jsx
<button onClick={() => setCount(c => c + 1)}>count + 1</button>
```

### 第 2 步：加入延迟读取

```jsx
function readLater() {
  const scheduledCount = count;

  setTimeout(() => {
    setMessage(`回调看到：${scheduledCount}`);
  }, 2000);
}
```

这里故意把本次 Render 的值保存成：

```text
scheduledCount
```

让实验更容易理解。

### 第 3 步：制造时间差

操作：

```text
1. count = 0 时点击“2 秒后读取”
2. 马上连续点击 +1，把 count 改到 3
3. 等待两秒
```

页面最终会同时看到：

```text
当前 count：3
回调看到：0
```

### 第 4 步：重新安排一次任务

当 count 已经是 3 时再次点击“2 秒后读取”。

新 callback 属于新的 Render，因此会捕获：

```text
3
```

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：异步 callback 捕获本次 Render Snapshot。
- **实验辅助代码**：`message` 仅用于显示观察结果。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp059-async-callback-snapshot --config ./vite.config.js
```

## 效果验证

1. count 为 0 时安排延迟读取。
2. 两秒内把 count 改成 3。
3. 定时器触发后仍显示当时捕获的 0。
4. 在 count=3 的新 Render 中再安排任务，新的回调应捕获 3。
5. 能画出 Render A → Render B → callback A 的时间轴。

完成后继续 **RE-KP060：Stale Closure 的根源**。
