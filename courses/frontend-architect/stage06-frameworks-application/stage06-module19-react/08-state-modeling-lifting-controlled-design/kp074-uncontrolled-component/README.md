# RE-KP074：非受控组件

> [返回 Chapter 08](../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `ARCHITECTURE-LAB` |
| 学习深度 | Must |
| 本课主问题 | 一个组件什么时候应该自己拥有 State，而不是要求父级控制每一次变化？ |
| Learning Artifact | default/initial value + Local State Demo |

## 先预测

父级只需要设置“初始值”，之后用户在组件内部独立操作。此时每次变化都提升到父级，是能力还是额外耦合？

## 动手实验

### Step 0：组件内部保存 State

```jsx
const [value, setValue] = useState(initialValue);
```

### Step 1：父级只提供初始配置

父级不持有当前每一步 value。

### Step 2：验证自治边界

用户连续操作只影响组件局部 State；父级普通 rerender 不会自动把 initialValue 当作“新当前值”覆盖进去。

[查看最终源码](./src/main.jsx)

## 理论收束

Uncontrolled Component 表示某份状态主要由组件自己拥有。外部可能提供 initial/default 配置，但不逐次驱动当前值。它与 DOM 原生 `defaultValue` 的具体 API 不是完全同义，核心仍是 Ownership。

## Wrong Way

- 把 `initialValue` 当成持续同步 Prop。
- 组件既声称 uncontrolled，又要求父级处理所有 change 才能正常工作。
- 因为“局部简单”就忽略外部协调需求。

## Production Boundary

简单折叠面板、局部草稿、无需跨组件协调的交互可以自治；一旦业务需要统一重置/校验/联动，就要重新评估是否受控。

## 本课只记住 3 件事

1. 非受控组件自己拥有关键 State。
2. initial/default 值只定义起点，不自动持续同步。
3. Controlled/Uncontrolled 是 Ownership Trade-off。

## Challenge

增加一个父级 `initialValue` 改变按钮，观察现有 Local State 是否自动变化，并解释为什么。

## Mastery Check

- **Must**：能解释 uncontrolled 的 State Owner。
- **Should**：能区分 initial value 与 controlled value。
- **Expert**：能为组件库设计 controlled/uncontrolled 双模式边界。
