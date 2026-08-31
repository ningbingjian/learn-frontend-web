# RE-KP177：react-dom useFormStatus

> [返回 Chapter 18](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 知道 `useFormStatus` 来自 `react-dom`，不是 `react`。
2. 理解它读取最近父 `<form>` 的提交状态。
3. 掌握 `pending`、`data`、`method` 的常用含义。
4. 理解为什么调用 Hook 的组件必须位于 `<form>` 内部。
5. 避免“在创建 form 的同一个组件里调用 useFormStatus”的常见错误。

## 理论讲解

### 1. useFormStatus 解决什么问题

设计系统里的 Submit Button 往往不应该让父组件层层传：

```text
pending
submittedName
method
```

`useFormStatus()` 可以直接读取它所在的最近父 Form 状态。

### 2. 关键返回值

```jsx
const { pending, data, method, action } = useFormStatus();
```

本课重点观察：

- `pending`：父 Form 是否正在提交。
- `data`：当前正在提交的 `FormData`。
- `method`：提交方法。

### 3. 组件位置是关键

错误结构：

```jsx
function Form() {
  const { pending } = useFormStatus();
  return <form>...</form>;
}
```

这里 Hook 看不到“自己随后创建”的 Form。

正确结构：

```jsx
function SubmitStatus() {
  const status = useFormStatus();
  return <button>...</button>;
}

function Form() {
  return (
    <form>
      <SubmitStatus />
    </form>
  );
}
```

## 动手编码：从 0 到 1

### 第 1 步：创建异步 Form Action

```jsx
async function saveProfile(formData) {
  await delay(1000);
  console.log(formData.get('displayName'));
}
```

### 第 2 步：创建 Form 子组件

```jsx
function SubmitStatus() {
  const { pending, data, method } = useFormStatus();
  const submittedName = data?.get('displayName');

  return (
    <section aria-live="polite">
      <button disabled={pending} type="submit">
        {pending ? '保存中…' : '保存资料'}
      </button>
      {pending && <p>正在提交：{submittedName}</p>}
      <p>Method: {method.toUpperCase()}</p>
    </section>
  );
}
```

### 第 3 步：把子组件放进父 Form

```jsx
<form action={saveProfile}>
  <input name="displayName" />
  <SubmitStatus />
</form>
```

最终源码：[src/main.jsx](./src/main.jsx)

**本节核心代码**：`useFormStatus()` 与它和父 `<form>` 的结构关系。

**实验辅助代码**：`delay()` 只用于把 pending 状态拉长到肉眼可见。

## 运行案例

输入名字并提交。等待期间可以观察按钮禁用，以及 `data` 中正在提交的名字。

## 效果验证

- `pending` 在提交期间变为 `true`。
- `data.get('displayName')` 能读取本次提交值。
- Hook 位于父 Form 的子组件中。
