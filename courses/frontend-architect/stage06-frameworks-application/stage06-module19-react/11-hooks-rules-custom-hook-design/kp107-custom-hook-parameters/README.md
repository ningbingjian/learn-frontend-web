# RE-KP107：Custom Hook 参数设计

> [返回 Chapter 11](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` + `BUILD-LAB` |
| 学习深度 | Should |
| 本课主问题 | Hook 参数应该暴露底层实现细节，还是表达调用者真正需要配置的语义？ |
| Learning Artifact | positional 参数 → options object API 重构 |

## 先观察坏 API
```js
useChat(roomId, true, 5000, false)
```
第三个 `5000` 是什么？调用点无法自解释。

## 动手重构
### Step 0：列出真正变化维度
如 `roomId/serverUrl/reconnectDelay`。
### Step 1：少量稳定参数可直接传
```js
useChatRoom(roomId)
```
### Step 2：参数增多时用 options object
```js
useChatRoom({ roomId, serverUrl, reconnectDelay })
```
### Step 3：不要让调用者知道内部 Hook 组合
API 不应暴露 `useEffect` 依赖数组、内部 ref 等实现。

[查看最终源码](./src/main.jsx)

## 理论收束
Custom Hook 是抽象边界。参数是它对外的声明式输入，应围绕领域语义、稳定性和默认值设计。

## Wrong Way
- 长串 boolean/position 参数。
- 参数直接暴露内部 State setter。
- 每次 Render 创建大对象参数后又不理解依赖影响。

## Production Boundary
公共 Hook 参数应像组件 Props 一样做 API Review；稳定名称比“少写几个字符”更重要。

## 本课只记住 3 件事
1. 参数表达语义输入。
2. 多可选项优先 options object。
3. 不泄漏内部 Hook 实现。

## Challenge
把 `useRequest(url, true, 3, 1000)` 重构成可读 API。

## Mastery Check
- **Must**：会设计基础 Hook 参数。
- **Should**：会用 options 管理演进。
- **Expert**：能控制 Hook API 兼容性。
