# Chapter 09：Reducer 与 Context

> [返回 React 模块索引](../README.md)

本 Chapter 回答两个连续问题：复杂 State Transition 怎样集中描述，以及深层组件怎样共享同一份横切数据。

## Module Teaching Contract

| 项目 | 约定 |
|---|---|
| 模块主线问题 | 如何用 Action + Reducer 集中复杂转换，并用 Context 建立清晰共享边界？ |
| 主教学模式 | `BUILD-LAB` + `ARCHITECTURE-LAB` |
| 辅助模式 | `FAILURE-LAB` + `BROWSER-MECHANISM-LAB` |
| Learning Artifact | Reducer/Action 日志、Provider/Consumer 树、Context 更新观察 |
| Wrong Way | reducer 副作用、Context 万能化、误解默认值、忽略 Provider value 更新传播 |
| Module DoD | 能建模 reducer，并说明 nearest Provider、default value 与 consumer rerender |

## 课程索引

| 编号 | 知识点 | 教学状态 |
|---|---|---|
| RE-KP081 | useReducer 基础 | 已重构 · v1.0 |
| RE-KP082 | Action 建模 | 已重构 · v1.0 |
| RE-KP083 | Pure Reducer | 已重构 · v1.0 |
| RE-KP084 | useReducer vs useState | 已重构 · v1.0 |
| RE-KP085 | 集中复杂状态转换 | 已重构 · v1.0 |
| RE-KP086 | createContext | 已重构 · v1.0 |
| RE-KP087 | useContext | 已重构 · v1.0 |
| RE-KP088 | 现代 Context Provider | 已重构 · v1.0 |
| RE-KP089 | Context 默认值 | 已重构 · v1.0 |
| RE-KP090 | Context 更新与重新渲染 | 已重构 · v1.0 |

## 当前进度

- 知识点完成度：**10 / 10**
- 新教学规范重构：**10 / 10，已完成**
- 下一重构范围：**Chapter 10**
