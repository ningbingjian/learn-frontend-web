# RE-KP080：有限状态思维

> [返回 Chapter 08](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解“有限状态思维”不是必须引入状态机库，而是先明确 UI 的合法状态集合。
2. 识别多个 Boolean State 之间可能出现的矛盾组合。
3. 会把互斥 Boolean 重构为单一 `status` State。
4. 能用“状态 + 允许的转换”描述交互流程。
5. 理解 State 结构本身可以消除一部分 Bug，而不只是靠 `if` 修补。

> **本节核心代码**：`status` 只允许 `'typing' | 'sending' | 'sent'` 三种业务状态。  
> **实验辅助代码**：`wait()` 只用于模拟提交延迟，不是状态建模本身。

## 理论讲解

### 1. 为什么多个 Boolean 容易制造“不可能状态”

假设表单使用：

```jsx
const [isSending, setIsSending] = useState(false);
const [isSent, setIsSent] = useState(false);
```

两个 Boolean 理论上有四种组合：

```text
false / false
true  / false
false / true
true  / true
```

但业务可能只允许前三种中的三个语义：

```text
typing
sending
sent
```

其中：

```text
isSending === true
isSent === true
```

通常没有合理业务含义。

也就是说，State 结构允许表达了一个本来不应该存在的组合。

### 2. 用一个 status 表达互斥状态

可以改成：

```jsx
const [status, setStatus] = useState('typing');
```

并约定合法值只有：

```text
typing
sending
sent
```

现在就不再需要同步维护两份互相依赖的 Boolean。

### 3. 状态转换比“改几个变量”更重要

用户提交时，不应该只想：

```text
把 isSending 改成 true
```

而应该描述：

```text
typing → sending
```

请求完成后：

```text
sending → sent
```

重新填写：

```text
sent → typing
```

这种思维会直接为下一 Chapter 的 Reducer / Action 建模打基础。

### 4. 状态值应该表达业务事实

推荐：

```js
status === 'sending'
```

而不是维护大量可以互相矛盾的字段：

```js
isSending
isSent
isEditing
isDone
```

不是所有 Boolean 都有问题。真正的问题是：**多个 State 如果描述同一件互斥事实，就容易互相矛盾。**

### 5. 派生 Boolean 不必再存一份 State

有了：

```jsx
const [status, setStatus] = useState('typing');
```

可以直接计算：

```jsx
const isSending = status === 'sending';
```

而不是再写：

```jsx
const [isSending, setIsSending] = useState(false);
```

这延续了 RE-KP050 的原则：能从现有 State 推导出的值不要重复存储。

## 动手编码：从 0 到 1

### 第 0 步：准备最小表单

```jsx
function FeedbackForm() {
  return (
    <form>
      <textarea />
      <button>发送</button>
    </form>
  );
}
```

### 第 1 步：加入文本 State

```jsx
const [text, setText] = useState('');
```

并绑定：

```jsx
<textarea
  value={text}
  onChange={event => setText(event.target.value)}
/>
```

### 第 2 步：用一个 status 表达流程

```jsx
const [status, setStatus] = useState('typing');
```

不要拆成两个互斥 Boolean。

### 第 3 步：实现合法转换

提交开始：

```jsx
setStatus('sending');
```

模拟请求结束：

```jsx
setStatus('sent');
```

### 第 4 步：从 status 推导 UI

```jsx
const isSending = status === 'sending';
```

按钮可以写成：

```jsx
<button disabled={isSending}>发送</button>
```

### 第 5 步：完成 sent 分支

当：

```jsx
status === 'sent'
```

显示完成信息和“再写一条”按钮，并通过：

```jsx
setStatus('typing');
setText('');
```

回到合法初始状态。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`status` 的有限取值与 `typing → sending → sent` 转换。
- **实验辅助代码**：模拟 Promise 延迟与展示文字用于观察状态转换。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./08-state-modeling-lifting-controlled-design/kp080-finite-state-thinking --config ./vite.config.js
```

## 效果验证

1. 初始状态为 `typing`。
2. 点击发送后进入 `sending`，按钮暂时不可用。
3. 模拟请求完成后进入 `sent`。
4. 代码中不存在 `isSending` 与 `isSent` 两份需要同步维护的 State。
5. 能解释为什么一个有限 `status` 比多个互斥 Boolean 更难产生矛盾状态。
6. 能画出 `typing → sending → sent → typing` 的状态转换图。

完成后继续 **RE-KP081：useReducer 基础**。
