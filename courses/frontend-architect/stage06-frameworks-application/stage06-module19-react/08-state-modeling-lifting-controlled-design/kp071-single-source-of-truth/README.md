# RE-KP071：Single Source of Truth

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `ARCHITECTURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 同一个业务事实存两份 State，为什么迟早会不同步？ |
| Learning Artifact | 重复 State 故障 → 单一 Owner 重构 |

## 先制造问题

假设 `temperatureC` 和 `temperatureF` 都作为独立 State 保存，并尝试互相同步。用户编辑一边、校验失败或更新路径遗漏时，两份事实很容易分叉。

## 动手重构

### Step 0：先保留两份可写 State

观察：任何一边都可以修改，系统必须额外保证另一边跟着变。

### Step 1：提出问题

真正的业务事实其实只有“一次温度输入”，华氏/摄氏只是不同 View。为什么要存两份？

### Step 2：保留一个 Source

把共同事实保存在唯一 Owner 中，另一个值在 Render 中派生。

```text
source state
   ↓ calculate
view A   view B
```

### Step 3：验证

任意编辑入口最终都修改同一个 Source；两个 View 不再需要互相同步。

[查看最终源码](./src/main.jsx)

## 理论收束

Single Source of Truth 不是“全应用只能有一个 State”，而是**同一个业务事实应尽量只有一个权威可写来源**。其他表示可以通过 Props / Render 派生。

## Wrong Way

- 把可推导值再存一份 State。
- 用 Effect 在两份 State 之间来回同步。
- 把“单一事实来源”误解成所有状态都塞进全局 Store。

## Production Boundary

金额、筛选条件、选中实体、表单规范值等都先找权威 Source；缓存/草稿可以存在，但必须明确它是否仍是“事实”还是派生/暂存数据。

## 本课只记住 3 件事

1. 同一事实尽量只有一个可写 Source。
2. 能推导的 View 优先在 Render 计算。
3. Single Source ≠ Single Global Store。

## Challenge

找一个你写过的组件，列出哪些 State 实际可以从其他 State/Props 推导。

## Mastery Check

- **Must**：能识别重复事实 State。
- **Should**：能重构为 Owner + Derived View。
- **Expert**：能区分权威数据、缓存、草稿与派生数据。
