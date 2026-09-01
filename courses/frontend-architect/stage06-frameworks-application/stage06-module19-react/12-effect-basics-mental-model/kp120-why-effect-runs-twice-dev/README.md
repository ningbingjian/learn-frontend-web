# RE-KP120：为什么开发环境看起来执行两次

> [返回 Chapter 12](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息
| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 本课主问题 | Console 里“执行两次”到底是 StrictMode、真实依赖变化，还是代码自己造成的循环？ |
| Learning Artifact | 三类重复执行原因诊断表 |

## 动手诊断
### Step 0：记录 setup/cleanup 和依赖值
不要只 `console.log('effect')`。
### Step 1：识别 StrictMode 压力测试
首次开发挂载出现 setup→cleanup→setup。
### Step 2：识别真实依赖变化
用户切 roomId 会产生正常 cleanup/setup。
### Step 3：识别无限循环
Effect setState 导致依赖再次变化，会持续发生，不是“只两次”。

[查看最终源码](./src/main.jsx)

## 理论收束
“Effect 跑两次”只是表面症状。诊断必须看执行环境、cleanup、依赖值和触发链，而不是背一句 StrictMode。

## Wrong Way
- 所有重复都怪 StrictMode。
- 关开发模式验证。
- 不记录依赖值就猜原因。

## Production Boundary
生产事故排查同样要区分真实状态变化与开发工具行为。

## 本课只记住 3 件事
1. 重复执行有多种原因。
2. 看 setup/cleanup/依赖时间轴。
3. StrictMode 不是万能解释。

## Challenge
给三段日志判断分别属于压力测试、依赖变化还是循环。

## Mastery Check
- **Must**：会区分常见原因。
- **Should**：能设计诊断日志。
- **Expert**：能定位复杂 Effect 触发链。
