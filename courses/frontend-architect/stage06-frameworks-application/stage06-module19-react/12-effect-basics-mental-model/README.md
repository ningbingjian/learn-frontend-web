# Chapter 12：Effect 基础与外部同步心智模型

> [返回 React 模块索引](../README.md)

本 Chapter 不把 `useEffect` 当“组件渲染后随便执行代码”的容器，而是通过真实外部系统实验建立核心模型：**Render 负责计算 UI；Event 负责具体用户动作；Effect 负责让组件在屏幕上存在期间与外部系统保持同步。**

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 什么代码真的需要 Effect？依赖和 Cleanup 为什么是同步协议的一部分？ |
| 主模式 | `BROWSER-MECHANISM-LAB` + `FAILURE-LAB` |
| 辅助模式 | `BUILD-LAB` |
| Learning Artifact | 连接/订阅日志、dependency change、cleanup 计数、StrictMode 压力测试 |
| Wrong Way | 派生数据放 Effect、用户动作放 Effect、漏依赖、漏 Cleanup |
| Module DoD | 能从“外部系统同步”判断是否需要 Effect，并预测 setup/cleanup 时机 |

## 课程索引

| 编号 | 知识点 | 教学状态 |
|---|---|---|
| RE-KP111 | useEffect 的真正用途：同步外部系统 | 已重构 · v1.0 |
| RE-KP112 | Effect vs Render | 已重构 · v1.0 |
| RE-KP113 | Effect vs Event | 已重构 · v1.0 |
| RE-KP114 | Dependency Array | 已重构 · v1.0 |
| RE-KP115 | Reactive Value | 已重构 · v1.0 |
| RE-KP116 | Cleanup Function | 已重构 · v1.0 |
| RE-KP117～120 | Effect 生命周期 / StrictMode | 已完成 · 待重构 |

## 当前进度
- 知识点完成度：**10 / 10**
- 新教学规范重构：**6 / 10**
- 下一重构范围：**RE-KP117～122**
