# Chapter 05：State 基础、对象与数组更新

> [返回 React 模块索引](../README.md)

本 Chapter 正式进入 React State。先建立 `useState`、组件私有记忆和重新渲染三条基础链路，再学习为什么 State 不能直接修改，以及对象、数组、嵌套结构、函数式更新、惰性初始化和派生值应该如何建模。

| 编号 | 知识点 | 包含内容 | 文档与源码 | 状态 |
|---|---|---|---|---|
| RE-KP041 | useState 基础 | 1. import Hook 2. State Value 3. Setter 4. 初始化 | [文档](./kp041-usestate-basics/README.md) · [源码](./kp041-usestate-basics/src/main.jsx) | 已完成 |
| RE-KP042 | State 是组件私有记忆 | 1. 组件实例 2. 独立 State 3. 同组件多实例 | [文档](./kp042-state-private-memory/README.md) · [源码](./kp042-state-private-memory/src/main.jsx) | 已完成 |
| RE-KP043 | State 更新触发重新渲染 | 1. Setter 2. 请求更新 3. 再次 Render 4. UI 更新 | [文档](./kp043-state-update-rerender/README.md) · [源码](./kp043-state-update-rerender/src/main.jsx) | 已完成 |
| RE-KP044 | State 不可直接修改 | 1. 只读快照 2. Setter 3. 直接赋值问题 | [文档](./kp044-state-immutability/README.md) · [源码](./kp044-state-immutability/src/main.jsx) | 已完成 |
| RE-KP045 | 对象状态不可变更新 | 1. Object State 2. Spread 3. 替换对象 | [文档](./kp045-object-state-updates/README.md) · [源码](./kp045-object-state-updates/src/main.jsx) | 已完成 |
| RE-KP046 | 数组状态不可变更新 | 1. Array State 2. map/filter/spread 3. 避免原地修改 | [文档](./kp046-array-state-updates/README.md) · [源码](./kp046-array-state-updates/src/main.jsx) | 已完成 |
| RE-KP047 | 嵌套状态更新与结构设计 | 1. Nested State 2. 多层复制 3. 扁平化思维 | [文档](./kp047-nested-state-design/README.md) · [源码](./kp047-nested-state-design/src/main.jsx) | 已完成 |
| RE-KP048 | 函数式更新 | 1. Updater Function 2. Previous State 3. 连续更新 | [文档](./kp048-functional-state-updates/README.md) · [源码](./kp048-functional-state-updates/src/main.jsx) | 已完成 |
| RE-KP049 | 惰性初始化 | 1. Initializer Function 2. 首次初始化 3. 成本边界 | [文档](./kp049-lazy-state-initialization/README.md) · [源码](./kp049-lazy-state-initialization/src/main.jsx) | 已完成 |
| RE-KP050 | 避免把可推导值存入 State | 1. Derived Value 2. Single Source 3. 冗余 State | `kp050-avoid-redundant-state/` | 待生成 |

## 当前进度

- Chapter 05：**9 / 10**
- 下一知识点：**RE-KP050：避免把可推导值存入 State**
