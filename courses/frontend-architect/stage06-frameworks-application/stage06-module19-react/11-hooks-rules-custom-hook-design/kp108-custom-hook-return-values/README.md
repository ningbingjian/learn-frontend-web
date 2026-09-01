# RE-KP108：Custom Hook 返回值设计

> [返回 Chapter 11](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` |
| 学习深度 | Should |
| 本课主问题 | Hook 应返回内部所有 State/Setter，还是只暴露消费者需要的状态与操作？ |
| Learning Artifact | internal fields → public capability return 重构 |

## 先判断
```js
return { state, setState, timerRef, abortRef, internalStatus }
```
这是灵活，还是把实现全部泄漏？

## 动手收敛
### Step 0：列消费者问题
页面真正需要 `status/data/retry` 还是需要知道内部 AbortController？
### Step 1：返回可读状态
```js
return { data, status, retry }
```
### Step 2：隐藏实现细节
Ref、内部 setter、缓存结构留在 Hook 内部。
### Step 3：验证内部重构
替换内部实现，调用者不改代码，说明 API 边界有效。

[查看最终源码](./src/main.jsx)

## 理论收束
Hook 返回值是公共 API，应表达状态与 Capability，而不是内部数据结构镜像。

## Wrong Way
- 返回所有 setter 让调用者绕过规则。
- 返回值名称模糊如 `result1/result2`。
- 内部每次改动都迫使所有消费者修改。

## Production Boundary
团队共享 Hook 应写清状态语义、操作契约和错误模型；把返回结构当正式接口维护。

## 本课只记住 3 件事
1. Return 是 Hook 公共 API。
2. 暴露状态与能力，不暴露实现。
3. 好接口允许内部重构。

## Challenge
为 `useUpload()` 设计一个不超过 5 个字段的返回对象。

## Mastery Check
- **Must**：能返回清晰状态/方法。
- **Should**：能隐藏内部 setter/ref。
- **Expert**：能维护跨版本 Hook API。
