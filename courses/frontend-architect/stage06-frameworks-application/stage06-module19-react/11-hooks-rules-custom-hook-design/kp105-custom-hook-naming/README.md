# RE-KP105：Custom Hook 命名

> [返回 Chapter 11](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `FAILURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 为什么调用其他 Hook 的复用函数必须以 `use` 开头，而不是随便命名成普通 util？ |
| Learning Artifact | `trackOnline()` → `useOnlineStatus()` 命名重构 + lint 认知 |

## 先预测
一个函数内部调用 `useState/useEffect`，却命名 `getOnlineStatus()`。读代码的人和 lint 怎么知道它受 Hooks Rules 约束？

## 动手重构
### Step 0：识别普通函数与 Hook 的边界
普通 helper 只是计算；Custom Hook 可以调用其他 Hook，并参与 React 生命周期。
### Step 1：使用 `use` 前缀
```jsx
function useOnlineStatus() {
  // useState / useEffect
}
```
### Step 2：让调用点暴露语义
```jsx
const online = useOnlineStatus();
```
一眼能看出这段逻辑受 Hooks Rules 约束。
### Step 3：验证 lint/阅读体验
不要仅为了命名漂亮；`use` 前缀是工具与团队共同依赖的约定。

[查看最终源码](./src/main.jsx)

## 理论收束
Custom Hook 名称必须以 `use` 开头，后面通常描述其抽象能力。不是所有以 use 开头的函数都自动合理；它应真正封装 Hook-based reusable logic。

## Wrong Way
- 内部调用 Hook 却不以 use 命名。
- 无 Hook 的普通 util 为“显得 React”强行 use 前缀。
- `useData/useUtils` 过度宽泛，隐藏真实职责。

## Production Boundary
公共 Hook 名称是 API，应表达领域能力：`useOnlineStatus`、`useChatRoom` 比 `useCommon` 更稳定。

## 本课只记住 3 件事
1. Custom Hook 用 `use` 前缀。
2. 命名暴露 Hooks Rules 语义。
3. 名称应表达一项具体可复用能力。

## Challenge
为“监听窗口尺寸”“保存草稿”“订阅聊天房间”各设计一个 Hook 名称。

## Mastery Check
- **Must**：会正确命名 Custom Hook。
- **Should**：能区分 Hook 与普通 helper。
- **Expert**：能为团队维护清晰 Hook API 词汇。
