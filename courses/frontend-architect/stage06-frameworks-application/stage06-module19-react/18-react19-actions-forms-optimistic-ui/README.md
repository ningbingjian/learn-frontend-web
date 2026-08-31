# Chapter 18：React 19 Actions、Forms 与乐观 UI

> [返回 React 模块索引](../README.md)

本 Chapter 系统学习 React 19 的 Actions 模型，以及它如何把异步数据变更、Transition、表单提交、pending 状态、乐观 UI 与错误处理连接起来。重点不是把所有请求都重写成 Action，而是理解：当一次用户操作会触发数据 mutation 时，Action 提供了一套可组合的异步状态协调协议。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP171 | React 19 Actions 模型 | 1. Mutation 2. Async Action 3. Coordination | [文档](./kp171-react19-actions-model/README.md) · [源码](./kp171-react19-actions-model/src/main.jsx) | 已完成 |
| RE-KP172 | 异步 Transition 与 Action | 1. Async Action 2. await action 3. Composition | [文档](./kp172-async-transition-action/README.md) · [源码](./kp172-async-transition-action/src/main.jsx) | 已完成 |
| RE-KP173 | useActionState | 1. Previous State 2. Dispatch Action 3. Result State | [文档](./kp173-use-action-state/README.md) · [源码](./kp173-use-action-state/src/main.jsx) | 已完成 |
| RE-KP174 | pending 状态 | 1. isPending 2. Disable 3. Feedback | [文档](./kp174-action-pending-state/README.md) · [源码](./kp174-action-pending-state/src/main.jsx) | 已完成 |
| RE-KP175 | useOptimistic | 1. Optimistic State 2. Action 3. Temporary UI | [文档](./kp175-use-optimistic/README.md) · [源码](./kp175-use-optimistic/src/main.jsx) | 已完成 |
| RE-KP176 | 乐观更新与回滚 | 1. Failure 2. Rollback 3. Reconciliation | [文档](./kp176-optimistic-rollback/README.md) · [源码](./kp176-optimistic-rollback/src/main.jsx) | 已完成 |
| RE-KP177 | react-dom useFormStatus | 1. Parent Form 2. pending 3. Form Data | [文档](./kp177-use-form-status/README.md) · [源码](./kp177-use-form-status/src/main.jsx) | 已完成 |
| RE-KP178 | form action 函数 | 1. action Prop 2. FormData 3. Transition | [文档](./kp178-form-action-function/README.md) · [源码](./kp178-form-action-function/src/main.jsx) | 已完成 |
| RE-KP179 | 表单 Action 与渐进增强 | 1. Progressive Enhancement 2. permalink 3. Server Function | [文档](./kp179-form-action-progressive-enhancement/README.md) · [源码](./kp179-form-action-progressive-enhancement/src/main.jsx) | 已完成 |
| RE-KP180 | Action 错误处理 | 1. Return Error 2. Throw Error 3. Boundary | [文档](./kp180-action-error-handling/README.md) · [源码](./kp180-action-error-handling/src/main.jsx) | 已完成 |

## 当前进度

- Chapter 18：**10 / 10**
- Chapter 18 已完成 ✅
- 下一知识点：**RE-KP181：Fragment**
