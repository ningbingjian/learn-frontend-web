# Chapter 09：Reducer 与 Context

> [返回 React 模块索引](../README.md)

本 Chapter 回答两个连续问题：**当 State Transition 越来越复杂时，怎样集中描述“发生了什么”；当这份状态需要跨深层组件共享时，怎样建立清晰的数据边界？**

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 复杂 State 如何从零散 setter 演进为 Action + Reducer？共享数据何时适合 Context？ |
| 主教学模式 | `BUILD-LAB` + `ARCHITECTURE-LAB` |
| 辅助模式 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| Learning Artifact | reducer 队列实验、Action 日志、Context Provider/Consumer 树图 |
| Wrong Way | reducer 内副作用、Action 直接携带“怎么改”、Context 当全局 Store 万能药 |
| Module DoD | 能把复杂更新建模成 State + Action + Pure Reducer，并说明 Context 的 Provider 边界和更新传播 |

## 课程索引

| 编号 | 知识点 | 教学状态 |
|---|---|---|
| RE-KP081 | useReducer 基础 | 已重构 · v1.0 |
| RE-KP082 | Action 建模 | 已重构 · v1.0 |
| RE-KP083 | Pure Reducer | 已重构 · v1.0 |
| RE-KP084 | useReducer vs useState | 已重构 · v1.0 |
| RE-KP085 | 集中复杂状态转换 | 已重构 · v1.0 |
| RE-KP086 | createContext | 已重构 · v1.0 |
| RE-KP087 | useContext | 已完成 · 待重构 |
| RE-KP088 | 现代 Context Provider | 已完成 · 待重构 |
| RE-KP089 | Context 默认值 | 已完成 · 待重构 |
| RE-KP090 | Context 更新与重新渲染 | 已完成 · 待重构 |

## 当前进度

- 知识点完成度：**10 / 10**
- 新教学规范重构：**6 / 10**
- 下一重构范围：**RE-KP087～092**
