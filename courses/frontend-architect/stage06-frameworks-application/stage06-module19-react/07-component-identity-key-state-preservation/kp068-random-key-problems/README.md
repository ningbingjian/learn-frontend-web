# RE-KP068：随机 key 的问题

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` |
| 学习深度 | Must |
| 前置课程 | RE-KP066 / 067：稳定 key 与 index key |
| 本课主问题 | 为什么父组件只是无关地重新 Render，一行 `key={Math.random()}` 就能让输入内容和焦点消失？ |
| Learning Artifact | random key Editor vs stable key Editor 并排实验 |
| 暂时不用理解 | DOM Diff 具体实现 |

## 先预测

```jsx
<DraftEditor key={Math.random()} />
```

输入 `hello` 后，只更新父组件的一个无关计数器。输入内容会保留吗？

## 动手实验：从 0 到 1

### Step 0：DraftEditor 保存本地 State

```jsx
const [draft, setDraft] = useState('');
```

### Step 1：父组件加入无关更新

父 count 改变只用于触发一次新的 Render。

### Step 2：故意使用 random key

```jsx
<DraftEditor key={Math.random()} />
```

**观察**：父组件每 Render 一次，key 都不同，旧 Editor 被当成离开，新 Editor 重新挂载，draft 清空。

### Step 3：并排放稳定版本

```jsx
<DraftEditor key="stable-editor" />
```

同样的父级更新不会重置稳定 Editor。

### Step 4：把随机 ID 用在正确时机

```js
const task = {
  id: crypto.randomUUID(),
  title: 'Learn React'
};
```

如果 ID 在**创建实体时生成并保存**，之后 `key={task.id}` 就是稳定的。问题不是 UUID API，而是每次 Render 重新生成 Identity。

[查看最终源码](./src/main.jsx)

## 图解

```text
Render #1 key=0.18 → Editor A
Render #2 key=0.73 → Editor B (A unmount)
Render #3 key=0.41 → Editor C (B unmount)

每次都是新身份 → State / focus / DOM lifecycle 重启
```

## 理论收束

Key 的要求不仅是“唯一”，还要“稳定”。`Math.random()`、`Date.now()`、Render 时调用 `crypto.randomUUID()` 都会让同一实体每次 Render 获得新 Identity。

## Wrong Way

```jsx
<Component key={Math.random()} />
```

用随机 key “强制刷新”会掩盖真正的 State 建模问题，并引发 remount 成本和用户状态丢失。

## Production Boundary

业务确实需要重置时使用有语义的 key，如 `user.id` / `document.id`；不要用随机值表达“我不知道为什么没刷新”。

## 本课只记住 3 件事

1. key 必须稳定。
2. Render 时随机 key = 每次新组件 Identity。
3. UUID 可以用，但应在实体创建阶段生成并持久保存。

## Challenge

在输入框聚焦后触发父组件 Render，观察 random key 版本的 focus 是否也丢失。

## Mastery Check

- **Must**：能解释 random key 为什么导致 remount。
- **Should**：能区分“随机 ID API”与“Render 时随机生成 key”。
- **Expert**：能识别随机 key 掩盖的上层 State/Identity 设计问题。
