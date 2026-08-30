# RE-KP081：useReducer 基础

> [返回 Chapter 09](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 会从 React 导入并调用 `useReducer`。
2. 理解 `useReducer(reducer, initialArg)` 返回当前 State 与 `dispatch`。
3. 知道 `dispatch(action)` 不直接写最终 State，而是把 Action 交给 Reducer。
4. 能描述 `dispatch → reducer(state, action) → nextState → render` 的更新链路。
5. 会写最小可运行 Reducer。

> **本节核心代码**：`const [state, dispatch] = useReducer(counterReducer, initialState)`。  
> **实验辅助代码**：计数器按钮只用于观察 Reducer 更新链路。

## 理论讲解

### 1. useReducer 解决的是什么问题

`useState` 让组件保存 State：

```jsx
const [count, setCount] = useState(0);
```

`useReducer` 同样管理组件 State，但把“如何从旧 State 得到新 State”的逻辑放到一个 Reducer 函数中：

```jsx
const [state, dispatch] = useReducer(counterReducer, initialState);
```

这里得到两个值：

```text
state    当前 State
dispatch 提交 Action 的函数
```

### 2. Reducer 的最小函数签名

Reducer 接收：

```text
当前 State
Action
```

返回：

```text
下一份 State
```

例如：

```jsx
function counterReducer(state, action) {
  if (action.type === 'incremented') {
    return { count: state.count + 1 };
  }

  return state;
}
```

### 3. dispatch 不是 setter

使用 `useState` 时：

```jsx
setCount(count + 1);
```

使用 Reducer 时，事件处理器更像是在报告：

```jsx
dispatch({ type: 'incremented' });
```

然后 React 使用你提供的 Reducer 计算下一份 State。

核心链路：

```text
用户点击
  ↓
dispatch(action)
  ↓
reducer(currentState, action)
  ↓
return nextState
  ↓
React 使用 nextState 再次 Render
```

### 4. Reducer 不等于全局状态管理

`useReducer` 仍然是组件 Hook：

```text
State 仍然属于调用 useReducer 的组件位置
```

它不是 Redux，也不会自动让整棵组件树都能访问 State。

Context 会在 RE-KP086 之后单独学习。

### 5. 什么时候暂时不需要 Reducer

如果只有：

```jsx
const [open, setOpen] = useState(false);
```

直接使用 `useState` 往往更清楚。

本节先理解机制，不把 Reducer 当成“更高级所以都要用”。

## 动手编码：从 0 到 1

### 第 0 步：准备静态计数器

```jsx
function Counter() {
  return <p>当前计数：0</p>;
}
```

### 第 1 步：定义初始 State

```jsx
const initialState = {
  count: 0,
};
```

### 第 2 步：定义 Reducer

```jsx
function counterReducer(state, action) {
  switch (action.type) {
    case 'incremented':
      return { count: state.count + 1 };
    case 'decremented':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}
```

### 第 3 步：调用 useReducer

```jsx
const [state, dispatch] = useReducer(counterReducer, initialState);
```

### 第 4 步：从 State 渲染 UI

```jsx
<p>当前计数：{state.count}</p>
```

### 第 5 步：从事件中 dispatch

```jsx
<button onClick={() => dispatch({ type: 'incremented' })}>+1</button>
```

现在事件处理器不直接计算下一份 State，而是描述发生了什么。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Reducer、`useReducer`、`dispatch` 的最小闭环。
- **实验辅助代码**：加减与重置按钮用于观察不同 Action。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./09-reducer-context/kp081-usereducer-basics --config ./vite.config.js
```

## 效果验证

1. `+1` 会 dispatch `incremented`。
2. `-1` 会 dispatch `decremented`。
3. 重置会回到初始 State。
4. 能解释为什么事件处理器没有直接调用 `setState`。
5. 能口述 `dispatch → reducer → nextState → render`。

完成后继续 **RE-KP082：Action 建模**。
