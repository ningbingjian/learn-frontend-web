# RE-KP036：事件处理器中的状态更新

> [返回 Chapter 04](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解用户交互发生后，可以在事件处理器中调用 State Setter。
2. 知道 Setter 的作用是请求 React 使用新状态重新渲染，而不是手工修改 DOM。
3. 会用 `onClick` 与 `onChange` 驱动最小交互状态。
4. 理解事件处理器是“由具体用户动作触发”的逻辑位置。
5. 知道 Batching、Snapshot、Updater Queue 等更深机制将在后续章节专门学习。

> **本节核心代码**：事件 Handler 中调用 `setCount(...)` / `setStatus(...)`，让 UI 由新 State 重新推导。  
> **实验辅助代码**：计数器和状态文案只是最小交互载体。

## 理论讲解

### 1. State 更新经常从事件开始

用户点击：

```text
加入购物车
```

页面需要更新：

```text
购物车数量
按钮提示
价格摘要
```

React 的思路不是在 Handler 中逐个找 DOM 修改，而是：

```text
用户事件
   ↓
Handler
   ↓
更新 State
   ↓
React 再次 Render
   ↓
UI 根据新 State 得到新描述
```

### 2. 最小示例

```jsx
const [count, setCount] = useState(0);

function handleAdd() {
  setCount(count + 1);
}
```

然后：

```jsx
<button onClick={handleAdd}>加入购物车</button>
<p>数量：{count}</p>
```

点击按钮时 Handler 才会执行 State 更新。

### 3. Setter 不是 DOM API

不要写成：

```js
document.querySelector('#count').textContent = count + 1;
```

React 组件已经可以描述：

```jsx
<p>数量：{count}</p>
```

所以 Handler 只负责改变业务状态，React 负责让真实界面和描述一致。

### 4. 事件里可以根据事件对象更新 State

例如：

```jsx
function handleStatusChange(event) {
  setStatus(event.target.value);
}
```

配合：

```jsx
<select value={status} onChange={handleStatusChange}>
```

这形成：

```text
浏览器交互值
      ↓
React Event Object
      ↓
Handler
      ↓
State
      ↓
UI
```

### 5. 为什么本节不展开多次 setState

例如：

```js
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

它涉及：

```text
State Snapshot
Batching
Update Queue
Updater Function
```

这些会在 Chapter 06 系统学习。

本节只要掌握：

> 事件处理器是发起交互状态更新的自然位置。

### 6. Handler 中能不能做别的事情

当然可以。

用户点击“购买”时，可以在 Handler 中：

```text
更新状态
提交请求
记录由这次点击直接产生的动作
```

关键判断是：

> 这段逻辑是不是因为“用户刚刚做了这个动作”才应该发生？

如果是，通常优先从事件处理器思考。

这会在下一课与 Effect 正面对比。

## 动手编码：从 0 到 1

### 第 0 步：准备 `useState`

```jsx
import { StrictMode, useState } from 'react';
```

### 第 1 步：创建数量 State

```jsx
const [count, setCount] = useState(0);
```

### 第 2 步：在点击 Handler 中更新数量

```jsx
function handleAdd() {
  setCount(count + 1);
}
```

### 第 3 步：让 UI 直接读取 State

```jsx
<p>购物车数量：{count}</p>
<button onClick={handleAdd}>加入购物车</button>
```

不要手工修改 `<p>` DOM。

### 第 4 步：再加入一个 Select 状态

```jsx
const [status, setStatus] = useState('pending');
```

### 第 5 步：通过 `onChange` 更新

```jsx
function handleStatusChange(event) {
  setStatus(event.target.value);
}
```

### 第 6 步：观察 UI 随 State 改变

按钮和下拉框都只负责触发状态更新，页面文字由当前 State 重新计算。

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：事件 Handler 中调用 State Setter。
- **实验辅助代码**：购物车和订单状态只是业务化观察样本。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./04-events-and-interactions/kp036-state-update-in-events --config ./vite.config.js
```

## 效果验证

1. 点击按钮后数量 UI 更新。
2. 修改 Select 后状态文字更新。
3. 代码没有通过 `querySelector` 手工同步显示文本。
4. 能解释“事件 → setState → Render → UI”的链路。
5. 知道本节没有展开 Batching 与更新队列，避免提前混淆。

完成后继续 **RE-KP037：事件与 Effect 的职责区别**。
