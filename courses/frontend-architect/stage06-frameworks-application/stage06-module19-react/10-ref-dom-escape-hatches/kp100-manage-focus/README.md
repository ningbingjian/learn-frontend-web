# RE-KP100：管理焦点

> [返回 Chapter 10](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `A11Y-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | React 应用什么时候应该主动移动键盘焦点，怎样避免焦点丢失或跳到用户意外的位置？ |
| Learning Artifact | Input/Dialog focus Ref + 键盘验证 |

## 先观察
打开一个搜索面板后，视觉上输入框出现了，但键盘用户的焦点仍停在旧按钮。用户能直接输入吗？

## 动手实验
### Step 0：获取输入框 Ref
```jsx
const inputRef = useRef(null);
```
### Step 1：明确用户动作边界
在点击“打开搜索”后调用 `inputRef.current?.focus()`，验证键盘光标进入输入框。
### Step 2：关闭/恢复
对于 Dialog 等模式 UI，考虑关闭后把焦点还给触发按钮。
### Step 3：用键盘验证
只用 Tab/Enter/Escape 完成流程，不只看鼠标结果。

[查看最终源码](./src/main.jsx)

## 理论收束
Focus 是浏览器/可访问性状态，不是 React 视觉样式。Ref 提供必要命令式控制，但焦点移动必须服务于明确用户流程。

## Wrong Way
- 每次 Render 自动 focus，抢走用户焦点。
- 只用 CSS `:focus`，却没有真实 DOM focus。
- Dialog 打开后把键盘用户留在背景区域。

## Production Boundary
搜索、表单错误、Dialog、菜单等需要焦点管理；优先原生语义和成熟无障碍组件模式。

## 本课只记住 3 件事
1. Focus 是真实交互状态。
2. Ref 可在明确时机调用 focus。
3. 焦点管理必须用键盘实际验收。

## Challenge
实现“打开 Dialog → 聚焦首个输入 → 关闭 → 焦点返回触发按钮”。

## Mastery Check
- **Must**：会用 Ref focus。
- **Should**：能设计 focus restore。
- **Expert**：能评审焦点陷阱与可访问性流程。
