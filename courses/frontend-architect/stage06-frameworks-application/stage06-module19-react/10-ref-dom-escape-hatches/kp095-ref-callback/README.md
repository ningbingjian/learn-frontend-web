# RE-KP095：Ref Callback

> [返回 Chapter 10](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 学习深度 | Should |
| 本课主问题 | 当你需要在节点 attach/detach 时执行逻辑，而不只是保存一个 `.current`，怎么办？ |
| Learning Artifact | callback ref attach/detach 日志 |

## 先预测

```jsx
<div ref={node => console.log(node)} />
```
节点挂载和移除时 callback 会收到什么？

## 动手实验

### Step 0：写 callback ref
```jsx
function setNode(node) {
  console.log('ref node:', node);
}
```

### Step 1：条件挂载节点
切换 `show`，观察 callback 与节点生命周期对应。

### Step 2：用 callback 管理集合/注册表
当列表节点需要登记到 Map 时，callback ref 比单个 object ref 更灵活。

[查看最终源码](./src/main.jsx)

## 理论收束
Callback Ref 是 React 在 DOM/组件实例附加到 ref 时调用的函数。它适合节点生命周期逻辑和动态集合；React 19 的 cleanup return 会在下一课单独处理。

## Wrong Way
- 每次 Render 创建复杂 inline callback，导致无意义 ref detach/attach 干扰实验。
- callback 内执行与节点无关的大量副作用。
- 把 callback ref 当普通事件处理器。

## Production Boundary
动态列表测量、注册第三方实例、节点集合管理常用 callback ref。

## 本课只记住 3 件事
1. Ref 可以是函数。
2. Callback 与节点 attach/detach 生命周期相关。
3. 动态节点集合时比单 object ref 灵活。

## Challenge
用 Map 保存多个列表项 DOM，点击按钮读取某一项。

## Mastery Check
- **Must**：理解 callback ref 参数。
- **Should**：会管理节点集合。
- **Expert**：能避免 ref callback identity 造成额外生命周期噪音。
