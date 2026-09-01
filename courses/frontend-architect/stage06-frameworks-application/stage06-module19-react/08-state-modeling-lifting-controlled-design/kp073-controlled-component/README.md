# RE-KP073：受控组件

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `ARCHITECTURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 怎样让父组件成为状态 Owner，而子组件只负责展示和上报用户意图？ |
| Learning Artifact | Local State 组件 → value/onChange 受控 API |

## 先预测

如果子组件自己维护 `value`，父组件能否可靠地一键重置、同步两个实例、记录所有变化？

## 动手重构

### Step 0：识别子组件内部的可控状态

先观察组件为何难以由父级协调。

### Step 1：删除这份局部业务 State

改为接收：

```jsx
<Component value={value} onChange={setValue} />
```

### Step 2：用户动作只上报意图

子组件调用 `onChange(nextValue)`，真正的 State 更新发生在 Owner。

### Step 3：验证外部控制

父级可以重置、同步、校验或组合多个实例。

[查看最终源码](./src/main.jsx)

## 心智模型

```text
Parent State (source of truth)
      ↓ value
Controlled Child
      ↑ onChange(next)
```

## 理论收束

Controlled Component 是一种 API Ownership 设计：重要状态由外部 Props 驱动，组件通过 callback 报告交互。它不是“组件没有 State”，组件仍可拥有与外部事实无关的局部状态。

## Wrong Way

- 同时用 Prop 和内部 State 保存同一个 value。
- 子组件修改外部对象却不调用明确 callback。
- 为了“受控”把 hover/focus 等所有瞬时 UI 状态都提升出去。

## Production Boundary

表单组件、Tabs、Dialog open、Selection 等需要外部协调时常用受控 API；通用组件库尤其需要清晰的 value/onChange 契约。

## 本课只记住 3 件事

1. 受控 = 关键状态由外部 Owner 驱动。
2. 子组件上报意图，不维护第二份事实。
3. 受控不等于完全无本地 State。

## Challenge

给组件加入父级“重置”按钮，验证不需要 ref 就能控制子组件。

## Mastery Check

- **Must**：会设计 value/onChange。
- **Should**：能划分受控业务状态和局部 UI 状态。
- **Expert**：能设计兼容组件库的受控 API 契约。
