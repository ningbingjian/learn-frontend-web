# RE-KP085：集中复杂状态转换

> [返回 Chapter 09](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` + `FAILURE-LAB` |
| 学习深度 | Should |
| 本课主问题 | 当“同一规则”散落在多个 Handler 时，怎样让非法 Transition 更难出现？ |
| Learning Artifact | 分散 setter → reducer transition table 重构 |

## 先制造复杂度

假设保存流程有 `idle/editing/saving/success/error`，多个按钮分别 setStatus/setError/setDraft。规则一多，很容易出现保存中还能重复提交等非法组合。

## 动手重构

### Step 0：列合法事件
`edit_started / save_started / save_succeeded / save_failed / reset`。

### Step 1：把转换集中到 reducer
Reducer 根据当前 State + Action 决定 next State。

### Step 2：显式拒绝/忽略非法事件
例如 `saving` 时收到第二个 `save_started`，可以保持原 State 或按模型处理。

### Step 3：画 Transition Table
```text
editing + save_started → saving
saving  + save_succeeded → success
saving  + save_failed → error
```

[查看最终源码](./src/main.jsx)

## 理论收束
Reducer 不只是“把 setState 搬到函数里”，而是让状态转换成为一个可审查的模型。复杂业务可以进一步演进到显式状态机，但 reducer 已能建立重要边界。

## Wrong Way
- Reducer 内仍然大量 if 针对 UI 控件名。
- Action 绕过 reducer 直接改部分 State。
- 一个 reducer 管整个应用所有不相关领域。

## Production Boundary
订单、上传、审批、编辑器等复杂流程适合集中 Transition；按领域拆 reducer，避免巨型全局 reducer。

## 本课只记住 3 件事
1. 集中的是 Transition Rule。
2. Action + State 可形成 Transition Table。
3. Reducer 也需要领域边界。

## Challenge
为 `idle/loading/success/error` 写完整合法 Action 表。

## Mastery Check
- **Must**：能集中多个相关 setter。
- **Should**：能识别非法 Transition。
- **Expert**：能从 reducer 演进到状态机建模。
