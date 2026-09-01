# RE-KP096：React 19 Ref Cleanup

> [返回 Chapter 10](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Should |
| 本课主问题 | Callback Ref 注册资源后，React 19 怎样让 setup/cleanup 写在同一个地方？ |
| Learning Artifact | Ref setup → cleanup lifecycle 日志 |

## 先制造泄漏风险
Callback 获得 node 后注册 ResizeObserver/第三方监听，如果节点移除时忘记 unregister 会怎样？

## 动手实验

### Step 0：在 ref callback setup
```jsx
ref={node => {
  if (!node) return;
  const observer = new ResizeObserver(...);
  observer.observe(node);
```

### Step 1：返回 cleanup
```jsx
  return () => observer.disconnect();
}}
```

### Step 2：切换节点挂载
观察 setup/cleanup 日志成对出现。

[查看最终源码](./src/main.jsx)

## 理论收束
React 19 支持 ref callback 返回 cleanup 函数。它让与该节点绑定的命令式资源生命周期就近表达，类似“setup 对应 cleanup”的通用资源管理思想。

## Wrong Way
- 注册监听但没有 cleanup。
- cleanup 操作另一个已变化节点。
- 把 Ref cleanup 和 Effect cleanup 混为同一 API。

## Production Boundary
Observer、第三方 widget、节点级事件/实例注册非常适合 callback ref cleanup。

## 本课只记住 3 件事
1. React 19 ref callback 可返回 cleanup。
2. 节点资源要 setup/cleanup 对称。
3. Ref cleanup 管节点引用生命周期。

## Challenge
把 Observer 换成原生 `addEventListener/removeEventListener` 验证对称清理。

## Mastery Check
- **Must**：认识 ref cleanup。
- **Should**：能把节点资源正确清理。
- **Expert**：能选择 Ref cleanup 与 Effect cleanup 的职责边界。
