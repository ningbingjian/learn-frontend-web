# RE-KP092：Ref vs State

> [返回 Chapter 10](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `ARCHITECTURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 同样都能“存值”，为什么 UI 数据必须用 State，而不是 Ref？ |
| Learning Artifact | State Counter / Ref Counter 并排实验 |

## 先预测

两个按钮分别执行：
```jsx
setCount(c => c + 1)
ref.current += 1
```
哪个会让页面立即显示新数字？

## 动手实验

### Step 0：State 版本
更新后 React 请求 Render，JSX 使用新值。

### Step 1：Ref 版本
修改 `.current`，页面不会因为这一步自动 Render。

### Step 2：故意用 Ref 驱动 JSX
你会看到 UI 可能停在旧画面，直到其它原因触发 Render。

### Step 3：形成选择规则
```text
值改变必须更新 UI → State
值只供事件/外部系统保存 → Ref
```

[查看最终源码](./src/main.jsx)

## 理论收束
State 参与 React Render 数据流；Ref 是 Escape Hatch。Ref 的可变性并不是“更快的 State”，它只是绕过了更新通知。

## Wrong Way
- 用 Ref 修复所有 rerender 性能问题。
- 同一事实同时存 State 和 Ref 却没有明确权威来源。
- 通过手动 force render 让 Ref 模拟 State。

## Production Boundary
性能问题应先分析组件边界和渲染成本；不要把 State 改 Ref 作为通用优化。

## 本课只记住 3 件事
1. State 变化驱动 UI。
2. Ref 变化不会自动刷新 UI。
3. 选择看“是否参与渲染事实”。

## Challenge
列出 WebSocket 实例、输入框 value、请求 ID、Modal open 四个值该用 State 还是 Ref。

## Mastery Check
- **Must**：能正确选择 State/Ref。
- **Should**：能识别“双份事实”。
- **Expert**：能拒绝把 Ref 当性能捷径。
