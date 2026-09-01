# RE-KP077：状态放置原则

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `ARCHITECTURE-LAB` + `BUILD-LAB` |
| 学习深度 | Must |
| 本课主问题 | 一份 State 应该留在叶子、提升到父级，还是进入更大范围？ |
| Learning Artifact | State Consumer Map + Closest Common Owner 重构 |

## 先画 Consumer，不先选 Store

列出谁读取、谁修改、谁需要协调这份 State。

## 动手推导

### Step 0：State 只被一个组件使用

优先 Local。不要为了“以后可能用”提前提升。

### Step 1：两个兄弟需要同一事实

放到最近共同父级。

### Step 2：整个子树都需要横切数据

再评估 Context / 外部 Store，而不是一步跳到全局。

### Step 3：验证 Locality

State 越靠近真正消费者，通常越容易理解生命周期和影响范围。

[查看最终源码](./src/main.jsx)

## 心智模型

```text
Who reads?
Who writes?
Who coordinates?
     ↓
smallest owner that covers them
```

## Wrong Way

- 所有 State 放页面根组件。
- 所有 State 放 Redux/Zustand。
- 为了避免 Props 就改变真实 Ownership。

## Production Boundary

状态位置是架构决策：影响重用、测试、rerender 边界、持久化和生命周期。先从最小作用域开始，需求扩大再提升。

## 本课只记住 3 件事

1. State 放在能覆盖消费者的最小 Owner。
2. Locality 是默认优势。
3. 全局状态是最后扩大作用域的结果，不是起点。

## Challenge

给“搜索词、登录用户、Modal open、列表选中项”分别选择 Owner，并说明理由。

## Mastery Check

- **Must**：会用 closest common parent。
- **Should**：能区分局部/页面/横切状态。
- **Expert**：能把 State Placement 与性能/生命周期一起评估。
