# RE-KP081：useReducer 基础

> [返回 Chapter 09](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | 多个 setter 开始围绕同一业务状态打架时，怎样把“发生什么”和“如何更新”拆开？ |
| Learning Artifact | `useState` 更新 → `useReducer` + dispatch 的最小迁移 |

## 先预测

一个任务编辑器同时有 `add / edit / delete`。如果每个 Handler 都直接复制数组并改 State，规则增加后哪里最容易重复？

## 动手：从 0 到 1

### Step 0：保留现有 State
先确认 UI 正常，问题不是“useState 不能用”，而是 Transition 逻辑开始分散。

### Step 1：写 reducer
```jsx
function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [...tasks, action.task];
  }
  return tasks;
}
```

### Step 2：接入 useReducer
```jsx
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

### Step 3：Handler 只报告事件
```jsx
dispatch({ type: 'added', task });
```

**观察**：UI 行为没变，但 State Transition 被集中到 reducer。

[查看最终源码](./src/main.jsx)

## 心智模型
```text
User Event → dispatch(action) → reducer(state, action) → next state → render
```

## 理论收束
`useReducer` 返回当前 State 和 `dispatch`。Reducer 根据当前 State 与 Action 计算 next State；dispatch 不直接告诉 React“数组怎么拷贝”，而是报告发生的 Action。

## Wrong Way
- 为只有一个简单 boolean 的组件强行引入 reducer。
- 在 reducer 里直接改旧 State。
- 把网络请求写进 reducer。

## Production Boundary
当多个 Handler 修改同一复杂对象、状态转换需要集中测试/审查时 reducer 很有价值；简单独立状态继续用 `useState` 更清晰。

## 本课只记住 3 件事
1. dispatch 描述事件。
2. reducer 计算 next State。
3. useReducer 是状态转换组织方式，不是更高级的 useState。

## Challenge
加入 `deleted` Action，不改 UI 组件内部的数组更新细节。

## Mastery Check
- **Must**：会写最小 reducer + dispatch。
- **Should**：能判断是否值得迁移。
- **Expert**：能设计可测试的 Transition 边界。
