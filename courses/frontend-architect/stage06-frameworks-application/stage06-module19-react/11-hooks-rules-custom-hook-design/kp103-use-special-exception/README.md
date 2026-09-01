# RE-KP103：`use` 的特殊例外

> [返回 Chapter 11](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` |
| 学习深度 | Should |
| 本课主问题 | 为什么 React 的 `use(resource)` 可以在条件/循环中调用，却不能把这个例外推广到 `useState/useEffect`？ |
| Learning Artifact | 条件 `use(Context/Promise)` 与普通 Hook 规则对照 |

## 先预测
`use` 名字也以 use 开头，它是否遵循完全相同的调用限制？

## 动手对照
### Step 0：普通 Hook 保持顶层
保留 RE-KP101/102 模型。
### Step 1：条件读取资源
根据课程示例在允许的控制流中调用 `use(resource)`，观察它作为特殊 API 的规则。
### Step 2：保持其它限制
`use` 仍必须在 Component/Hook 中使用，也不能随意放 `try/catch` 包住 Promise 读取等不支持结构。

[查看最终源码](./src/main.jsx)

## 理论收束
`use` 是 React 19 的特殊资源读取 API，官方 Rules of Hooks 明确允许它在条件和循环中使用。这是 API 特例，不意味着 Hook 顺序规则失效。

## Wrong Way
- 因为 `use` 可条件调用，就条件调用 useState。
- 把任何 `useXxx` 自定义 Hook 当成同样特例。
- 忽略 Suspense/Promise 资源的上层边界。

## Production Boundary
使用现代资源读取时按具体 API 文档设计；规则判断不能只看函数名是否以 `use` 开头。

## 本课只记住 3 件事
1. `use` 是特殊例外。
2. 普通 Hook 规则仍然成立。
3. 特例只适用于官方 `use` API。

## Challenge
写一段包含条件 `use(Context)` 与顶层 `useState` 的合法结构，并解释差异。

## Mastery Check
- **Must**：知道 `use` 例外存在。
- **Should**：能说明例外边界。
- **Expert**：能区分资源读取语义与 Hook State 顺序模型。
