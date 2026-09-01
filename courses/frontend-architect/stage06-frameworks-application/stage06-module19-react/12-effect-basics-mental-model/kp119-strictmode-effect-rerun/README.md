# RE-KP119：StrictMode 下 Effect 重新执行

> [返回 Chapter 12](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 开发环境为什么故意多做一次 setup→cleanup→setup？ |
| Learning Artifact | 缺 Cleanup 连接泄漏 vs 正确 Cleanup 对照 |

## 先制造问题
只有 `connect()` 没有 `disconnect()`，如果 React 额外做一次 setup，会发生什么？

## 动手实验
### Step 0：缺 cleanup
在 root StrictMode 开发环境观察重复有效连接。
### Step 1：加入 cleanup
```jsx
return () => disconnect();
```
### Step 2：重新加载
观察额外 `setup→cleanup→setup` 后最终外部状态仍只有一个有效资源。

[查看最终源码](./src/main.jsx)

## 理论收束
StrictMode 的额外 Effect setup/cleanup 是开发期压力测试，帮助发现缺失清理。正确 Effect 应让用户无法区分 production 单次 setup 与开发压力测试后的最终状态。

## Wrong Way
- 删除 StrictMode 来“修”双连接。
- 在 Effect 内用 ref 标记“只执行一次”绕过检查。
- 把开发检查当 production 会永久执行两次。

## Production Boundary
如果压力测试暴露异常，修同步协议，不要屏蔽测试。

## 本课只记住 3 件事
1. StrictMode 故意压力测试 Effect。
2. cleanup 正确才能通过测试。
3. 这是 development-only 检查。

## Challenge
用事件监听器复现缺 cleanup 问题并修复。

## Mastery Check
- **Must**：能解释额外 setup/cleanup。
- **Should**：能定位缺 cleanup。
- **Expert**：能设计可重复连接/断开的外部同步层。
