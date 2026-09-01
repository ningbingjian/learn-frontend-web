# RE-KP082：Action 建模

> [返回 Chapter 09](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | Action 应该描述“用户做了什么”，还是描述“把 State 改成什么”？ |
| Learning Artifact | 命令式 Action → 事件语义 Action 对照 |

## 先判断

下面哪个更能表达业务？

```js
{ type: 'set_tasks', tasks: nextTasks }
{ type: 'task_added', task: newTask }
```

## 动手重构

### Step 0：识别命令式 Action
如果 Action 已经计算好最终 State，Reducer 只是“搬运结果”，业务规则仍散落在 Handler。

### Step 1：改成事件语义
```js
dispatch({ type: 'task_added', task })
dispatch({ type: 'task_deleted', id })
```

### Step 2：Reducer 根据事件决定更新
这样日志可以读成“发生过什么”，测试也能直接构造 Action。

### Step 3：验证 Payload 只携带必要事实
不要把整个页面对象都塞进每个 Action。

[查看最终源码](./src/main.jsx)

## 理论收束
Action 是普通对象，常用 `type` 区分事件。好的 Action 更接近领域事件/用户意图，而不是重复 setter 的实现细节。

## Wrong Way
- `type: 'setState'` 包打天下。
- Action type 使用 UI 控件名称而非业务事件。
- Payload 携带可由 reducer/state 推导的冗余数据。

## Production Boundary
复杂表单、编辑器、流程状态尤其受益于稳定 Action Vocabulary；它也是日志、回放、测试和后续状态机思维的基础。

## 本课只记住 3 件事
1. Action 描述发生的事件。
2. Reducer 决定如何更新。
3. Action Vocabulary 是状态模型的一部分。

## Challenge
为“购物车数量调整”设计 3 个 Action，避免 `set_cart`。

## Mastery Check
- **Must**：能写语义清晰的 type/payload。
- **Should**：能识别实现泄漏型 Action。
- **Expert**：能维护跨团队稳定的 Action Vocabulary。
