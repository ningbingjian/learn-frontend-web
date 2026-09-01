# Chapter 12：Effect 基础与外部同步心智模型

> [返回 React 模块索引](../README.md)

本 Chapter 用可观察的连接/订阅实验建立统一 Effect 模型：Render 计算 UI，Event 处理具体动作，Effect 让组件与外部系统保持同步。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 什么代码真的需要 Effect？依赖与 Cleanup 为什么是同步协议的一部分？ |
| 主模式 | `BROWSER-MECHANISM-LAB` + `FAILURE-LAB` |
| Learning Artifact | setup/cleanup 日志、依赖切换、StrictMode 压力测试 |
| Wrong Way | 派生数据/用户动作放 Effect、漏依赖、漏 Cleanup |
| Module DoD | 能预测 setup/cleanup 时机并解释 StrictMode 为什么暴露错误 |

## 课程索引

| 范围 | 教学状态 |
|---|---|
| RE-KP111～120 | 已重构 · v1.0 |

## 当前进度
- 知识点完成度：**10 / 10**
- 新教学规范重构：**10 / 10，已完成**
- 下一重构范围：**Chapter 13**
