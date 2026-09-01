# RE-KP098：最小 Imperative Handle

> [返回 Chapter 10](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` |
| 学习深度 | Should |
| 本课主问题 | 既然可以暴露命令式 API，为什么还要坚持“最小 Handle”？ |
| Learning Artifact | Big Handle → Capability-oriented Handle API Review |

## 先判断

下面哪个更稳定？
```js
{ node, setValue, setStyle, focus, scroll, reset, internalState }
```
还是：
```js
{ focus, reset }
```

## 动手收缩 API

### Step 0：列父组件真实需求
只写业务必须命令式触发的能力。

### Step 1：删除实现细节
不暴露 DOM、内部 State setter、内部 className。

### Step 2：让方法表达 Capability
例如 `focusSearch()` 比 `getInputNode()` 更能隐藏实现。

### Step 3：替换内部 DOM
若 Handle 不变，父级无需修改，证明边界有效。

[查看最终源码](./src/main.jsx)

## 理论收束
Imperative Handle 是组件公共 API。API 越大，父子耦合越强。最小 Capability Surface 可以保留实现替换空间，也更容易测试和版本演进。

## Wrong Way
- 暴露 entire DOM “以后可能用”。
- 把内部 State setter 当公开命令。
- 同时提供可冲突的声明式和命令式控制通道。

## Production Boundary
组件库尤其应把 Handle 当公共契约管理；普通业务组件若能通过 Props 完成，就不需要 Handle。

## 本课只记住 3 件事
1. Handle 是公开 API。
2. 只暴露必要 Capability。
3. 封装目标是允许内部实现变化。

## Challenge
为视频播放器组件设计不超过 4 个命令式方法，并解释为什么不暴露 `<video>` DOM。

## Mastery Check
- **Must**：能缩小 Handle。
- **Should**：会按 Capability 命名 API。
- **Expert**：能评审长期稳定的组件命令式契约。
