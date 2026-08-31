# RE-KP178：form action 函数

> [返回 Chapter 18](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 掌握 `<form action={actionFunction}>` 的 React 19 写法。
2. 理解 Action 函数会收到 `FormData`。
3. 理解 function Action 会在 Action/Transition 语义下执行。
4. 知道不需要自己写 `onSubmit + preventDefault` 才能读取表单。
5. 理解 Action 成功后非受控字段会自动 reset。

## 理论讲解

### 1. React 19 的 form action 可以是函数

传统 HTML：

```html
<form action="/tasks" method="post">
```

React 19 还支持：

```jsx
<form action={addTask}>
```

### 2. FormData 自动传入

```jsx
async function addTask(formData) {
  const title = formData.get('title');
}
```

不需要先获取 submit event。

### 3. 与 onSubmit 的区别

`onSubmit` 仍然完全合法，但 function Action 会直接进入 React 的 Action 协调模型，可以与 pending、`useActionState`、`useOptimistic`、Error Boundary 等能力组合。

### 4. 成功后自动 reset 非受控字段

如果 Action 成功完成，Form 中的 uncontrolled input 会被自动重置。

这也是本课使用 uncontrolled input 的原因。

## 动手编码：从 0 到 1

### 第 1 步：准备任务 State

```jsx
const [tasks, setTasks] = useState([]);
```

### 第 2 步：定义 Action 函数

```jsx
async function addTask(formData) {
  const title = String(formData.get('title') ?? '').trim();
  if (!title) return;

  await delay(600);
  setTasks(current => [
    ...current,
    { id: Date.now(), title },
  ]);
}
```

### 第 3 步：把函数传给 form action

```jsx
<form action={addTask}>
  <input name="title" placeholder="学习 React Actions" />
  <button type="submit">添加任务</button>
</form>
```

### 第 4 步：观察自动 reset

成功提交后：

- 新任务进入列表。
- 非受控 `title` 输入框自动清空。

最终源码：[src/main.jsx](./src/main.jsx)

**本节核心代码**：function form Action、`FormData`、成功后的表单 reset。

**实验辅助代码**：`delay()` 仅用于模拟服务端 mutation 延迟。

## 运行案例

输入任务并点击“添加任务”。等待完成后观察列表新增，以及 input 自动恢复为空。

## 效果验证

- 没有手写 `preventDefault()`。
- Action 直接收到 `FormData`。
- 成功后 uncontrolled field 自动 reset。
