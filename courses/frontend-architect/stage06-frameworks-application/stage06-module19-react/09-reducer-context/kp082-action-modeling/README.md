# RE-KP082：Action 建模

> [返回 Chapter 09](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 Action 是传给 `dispatch` 的普通 JavaScript 值，常见约定是对象。
2. 会使用 `type` 描述“发生了什么”。
3. 会给 Action 携带 Reducer 计算下一状态所需的最小数据。
4. 区分“描述事件”与“直接描述最终 State 实现细节”。
5. 能让 Action 日志具备可读的业务语义。

> **本节核心代码**：`dispatch({ type: 'task_added', id, text })` 这类描述用户动作的 Action。  
> **实验辅助代码**：任务输入框和静态初始任务只用于观察 Action 形状。

## 理论讲解

### 1. Action 本质上只是 dispatch 的参数

React 不强制 Action 必须是对象。

但现代 React 教学与工程实践中，常见写法是：

```jsx
dispatch({
  type: 'task_added',
  id: 3,
  text: 'Read reducer docs',
});
```

这里：

```text
type  表示发生了什么
其他字段  提供完成状态转换所需的数据
```

### 2. Action 名称应该描述“发生了什么”

推荐：

```text
task_added
task_toggled
task_removed
```

相比：

```text
set_tasks
update_state
change_data
```

前者更容易从日志还原用户交互。

### 3. Action 不要塞进整套实现细节

例如删除任务只需要：

```jsx
dispatch({
  type: 'task_removed',
  id: task.id,
});
```

不需要由事件处理器先算出整个新数组再传给 Reducer：

```jsx
// 不利于集中状态逻辑
const nextTasks = tasks.filter(...);
dispatch({ type: 'replace_tasks', tasks: nextTasks });
```

否则 Reducer 只是一个“转发 setter”，失去了集中状态迁移的价值。

### 4. 一个 Action 通常对应一次有意义的交互

如果用户点击一次“删除”：

```jsx
dispatch({ type: 'task_removed', id });
```

通常比连续 dispatch 多个底层字段修改更容易理解。

Action 粒度应该接近“发生了什么”，而不是“底层每个字段怎么改”。

### 5. Action type 是局部协议

`'task_added'` 并不是 React 内置关键字。

它只是这个 Reducer 与调用者之间约定的协议：

```text
事件处理器生产 Action
Reducer 消费 Action
```

## 动手编码：从 0 到 1

### 第 0 步：准备任务列表

```jsx
const initialTasks = [
  { id: 1, text: 'Learn dispatch', done: false },
];
```

### 第 1 步：先定义三个用户动作

我们要支持：

```text
添加任务
切换完成状态
删除任务
```

对应 Action type：

```text
task_added
task_toggled
task_removed
```

### 第 2 步：添加任务 Action

```jsx
dispatch({
  type: 'task_added',
  id: nextId++,
  text: draft,
});
```

### 第 3 步：切换任务 Action

```jsx
dispatch({
  type: 'task_toggled',
  id: task.id,
});
```

### 第 4 步：删除任务 Action

```jsx
dispatch({
  type: 'task_removed',
  id: task.id,
});
```

### 第 5 步：Reducer 根据 type 计算下一状态

```jsx
switch (action.type) {
  case 'task_added':
    // return next tasks
  case 'task_toggled':
    // return next tasks
  case 'task_removed':
    // return next tasks
}
```

事件处理器不再负责列表的具体不可变更新算法。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：三个语义化 Action 与 Reducer 分支。
- **实验辅助代码**：`draft` 仍用 `useState` 管理，说明一个组件可以同时使用 `useState` 与 `useReducer`。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./09-reducer-context/kp082-action-modeling --config ./vite.config.js
```

## 效果验证

1. 添加任务时 Action 只携带新增所需的 `id/text`。
2. 切换和删除任务只需要对应任务 `id`。
3. 事件处理器中没有 `map/filter` 等任务列表更新算法。
4. 阅读 Action type 就能大致还原用户做了什么。
5. 能解释为什么 Action 不应只是模糊的 `update_state`。

完成后继续 **RE-KP083：Reducer 必须保持纯净**。
