# RE-KP065：使用 key 主动重置状态

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `FAILURE-LAB` |
| 学习深度 | Must |
| 前置课程 | RE-KP064：key 的身份意义 |
| 本课主问题 | 切换联系人时，怎样让旧联系人的本地草稿不泄漏到新联系人？ |
| Learning Artifact | ContactEditor 草稿错位 → `key={contact.id}` 修复 |
| 暂时不用理解 | Effect 同步 State 的更复杂边界 |

## 先制造问题

`ContactEditor` 用：

```jsx
const [draft, setDraft] = useState(contact.name);
```

Alice 草稿改成 `Alice Cooper` 后切 Bob。如果组件身份不变，你希望看到 Bob 还是 Alice Cooper？

## 动手实验：从 0 到 1

### Step 0：先让编辑器保存局部草稿

```jsx
function ContactEditor({ contact }) {
  const [draft, setDraft] = useState(contact.name);
}
```

### Step 1：切换业务实体

父组件从 Alice 切 Bob。理解关键点：`useState(initialValue)` 的 initialValue 不是每次 Props 变都重新覆盖已有 State。

### Step 2：把业务身份映射成 UI 身份

```jsx
<ContactEditor key={contact.id} contact={contact} />
```

### Step 3：验证 reset

Alice 编辑 → 切 Bob → 草稿变 Bob；切回 Alice → 新 Alice Editor 从 Alice 初始化。

**立即解释**：key 改变不是“清空一个字段”，而是告诉 React 这是新的组件 Identity，所以整个局部 State 生命周期重新开始。

[查看最终源码](./src/main.jsx)

## 图解

```text
contact.id=alice
Editor Identity alice → draft Alice Cooper
        ↓ switch
contact.id=bob
Editor Identity bob   → new State from Bob
```

## 理论收束

当局部 State 的生命周期应该和某个业务实体绑定时，实体 ID 常常是天然 key。它比“先保留旧 State，再写 Effect 修正”更直接地表达身份边界。

## Wrong Way

- 为了每次刷新都写 `key={Math.random()}`。
- 本来应该保留整个组件身份，只因为一个字段变化就强制 remount。
- 用 Effect 无条件复制 Props 到 State，制造双数据源。

## Production Boundary

适合联系人编辑器、聊天窗口、用户配置表单等“切实体就应该重新开始本地草稿”的场景。若业务需要在切换后保留编辑状态，则不应改变 key。

## 本课只记住 3 件事

1. State Preserve 不总是正确。
2. 业务 Entity ID 可以定义组件 Identity。
3. key reset 重置的是整个组件局部 State 生命周期。

## Challenge

加入 `emailDraft` 第二个 State，验证 key 改变会让两个本地字段一起重置。

## Mastery Check

- **Must**：会用实体 key 重置表单 State。
- **Should**：能比较 key reset 与 Effect 同步的职责。
- **Expert**：能设计“业务实体生命周期 ↔ UI State 生命周期”的映射。
