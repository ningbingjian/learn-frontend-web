# RE-KP111：useEffect 的真正用途——同步外部系统

> [返回 Chapter 12](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | 组件为什么需要 Effect？哪些事情 React Render 自己做不了？ |
| Learning Artifact | Chat connection setup/cleanup 日志 |

## 先观察需求
组件显示 `roomId` 很容易；但当页面显示房间 A 时要连接 A，切 B 时要断 A 连 B，组件离开时要断开——这已经涉及 React 外部的连接系统。

## 动手：从 0 到 1
### Step 0：只 Render UI
```jsx
<p>房间：{roomId}</p>
```
页面文字正确，但没有真实连接。
### Step 1：在 Effect 中同步连接
```jsx
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```
### Step 2：切换 roomId
观察旧连接 cleanup，新连接 setup。
### Step 3：卸载组件
观察最终 disconnect。

[查看最终源码](./src/main.jsx)

## 心智模型
```text
React state/props → desired external state
        ↓ Effect
External system synchronized
```

## 理论收束
Effect 用于把 React 组件与网络连接、DOM API、媒体、订阅、第三方 widget 等**外部系统**同步。没有外部系统时，应先怀疑 Effect 是否必要。

## Wrong Way
- 把 `fullName = first + last` 放 Effect。
- 把按钮点击提交订单放 Effect。
- 把 Effect 当“生命周期万能容器”。

## Production Boundary
订阅、连接、浏览器 API、第三方系统是核心场景；数据派生和用户动作通常有更直接位置。

## 本课只记住 3 件事
1. Effect 是外部同步工具。
2. setup/cleanup 是同一协议。
3. 没外部系统先别写 Effect。

## Challenge
把连接例子换成 `window.addEventListener`，保持 setup/cleanup 对称。

## Mastery Check
- **Must**：能判断是否需要 Effect。
- **Should**：能画 React↔External System 同步图。
- **Expert**：能在 Code Review 中删除不必要 Effect。
