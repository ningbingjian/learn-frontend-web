# RE-KP116：Cleanup Function

> [返回 Chapter 12](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 本课主问题 | Effect 建立连接/订阅后为什么必须能“撤销刚才做的事”？ |
| Learning Artifact | listener/connection 泄漏 → cleanup 修复 |

## 先制造泄漏
Effect 每次 setup 都 `addEventListener/connect`，依赖变化时旧资源不撤销。多切几次会发生什么？

## 动手实验
### Step 0：只有 setup
记录有效 listener/connection 数逐步增长。
### Step 1：返回 cleanup
```jsx
useEffect(() => {
  const connection = connect(roomId);
  return () => connection.disconnect();
}, [roomId]);
```
### Step 2：切换依赖
观察顺序：先 cleanup 旧资源，再 setup 新资源。
### Step 3：卸载
观察最后一次 cleanup。

[查看最终源码](./src/main.jsx)

## 理论收束
Cleanup 不是“组件销毁专用回调”。它负责撤销对应 setup，既用于重新同步前，也用于最终卸载。理想上用户不能区分一次 setup 与 setup→cleanup→setup 后的外部状态。

## Wrong Way
- setup 注册两个资源，cleanup 只撤一个。
- cleanup 依赖已经变化后的新值去删除旧资源。
- 没 setup 资源却到处写 cleanup 模板。

## Production Boundary
Subscription、timer、observer、connection、第三方实例都要明确资源生命周期。

## 本课只记住 3 件事
1. Cleanup 撤销 setup。
2. 依赖变化前也会 cleanup。
3. setup/cleanup 要对称。

## Challenge
实现 timer setup/cleanup，切换 interval 参数时验证旧 timer 消失。

## Mastery Check
- **Must**：会返回 cleanup。
- **Should**：能验证资源不泄漏。
- **Expert**：能设计幂等、对称的同步协议。
