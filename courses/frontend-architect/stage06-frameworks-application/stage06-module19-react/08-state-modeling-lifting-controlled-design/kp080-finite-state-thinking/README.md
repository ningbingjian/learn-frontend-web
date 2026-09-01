# RE-KP080：有限状态思维

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` + `FAILURE-LAB` |
| 学习深度 | Should |
| 本课主问题 | 多个 boolean State 为什么容易产生“业务上不可能”的组合？ |
| Learning Artifact | Boolean explosion → explicit status 重构 |

## 先制造非法状态

```jsx
const [isLoading, setLoading] = useState(false);
const [isSuccess, setSuccess] = useState(false);
const [isError, setError] = useState(false);
```

理论上可能得到 `isLoading=true && isSuccess=true && isError=true`。业务允许吗？

## 动手重构

### Step 0：列出真正合法状态

```text
idle → loading → success
              ↘ error
```

### Step 1：用一个显式状态表示互斥事实

```jsx
const [status, setStatus] = useState('idle');
```

### Step 2：把 UI 由 status 派生

`isLoading = status === 'loading'`，不再单独存。

### Step 3：定义允许 Transition

让事件表示 `submit/succeed/fail/retry`，减少任意 setter 组合。

[查看最终源码](./src/main.jsx)

## 理论收束

Finite State Thinking 的目标是**让非法组合难以表达**。它不等于必须引入状态机库；先把合法状态和 Transition 写清楚，就已经能显著改善建模。

## Wrong Way

- 每增加一个页面状态就加 boolean。
- 保存可以从 status 推导的重复 State。
- 把所有 setter 暴露给任意组件随意组合。

## Production Boundary

请求流程、支付、上传、Wizard、审批等互斥状态明显的业务尤其适合显式状态模型；复杂后再考虑 reducer/状态机工具。

## 本课只记住 3 件事

1. 多 boolean 容易产生非法组合。
2. 显式 status 能表达合法状态集合。
3. 设计 State 时同时设计 Transition。

## Challenge

给上传流程设计 `idle/validating/uploading/success/error/cancelled`，列出允许的 Transition。

## Mastery Check

- **Must**：能发现 boolean explosion。
- **Should**：能重构为显式 status。
- **Expert**：能从业务状态图演进到 reducer / state machine。
