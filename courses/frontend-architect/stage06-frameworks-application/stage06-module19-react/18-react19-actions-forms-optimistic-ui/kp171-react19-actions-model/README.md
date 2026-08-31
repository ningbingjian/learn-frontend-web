# RE-KP171：React 19 Actions 模型

> [返回 Chapter 18](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录
- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 React 19 Action 主要服务于“异步数据 mutation + UI 协调”。
2. 理解 Action 与 Transition 的关系。
3. 知道 React 19 围绕 Actions 提供 pending、optimistic、form、error 等能力。
4. 区分紧急输入更新与非阻塞数据 mutation。
5. 不把 Action 误解成 Redux Action 或普通事件对象。

> **本节核心代码**：`startAction(async () => { ... })` 所描述的数据变更流程。  
> **实验辅助代码**：`savePreference()` 的定时器只用于模拟网络请求。

## 理论讲解

### 1. Action 要解决什么

典型 mutation：

```text
用户提交
→ 请求服务器
→ pending
→ 更新结果
→ 失败时处理错误
→ 可能先显示 optimistic UI
```

React 19 把这种异步数据变更流程称为 Actions 的主要使用场景。

### 2. Action 与普通输入更新不是一回事

文本输入应立即更新：

```jsx
setDraft(event.target.value);
```

保存结果则可以放进 Action。

这样用户在请求期间仍可以得到响应式输入体验。

### 3. Action 是可组合的协议

围绕 Action，React 19 提供：

```text
useTransition
useActionState
useOptimistic
<form action={fn}>
useFormStatus
Error Boundary
```

后续课程逐个展开。

### 4. React 19 async Action 与 await

`useTransition` 可以接收 async Action。当前 React 官方仍说明：`await` 之后直接调用普通 state setter 时，需要再包一层 `startTransition` 才能继续标记为 Transition。

### 5. Action 不是 Redux Action

这里的 Action 是执行行为的函数，不是：

```js
{ type: 'SAVE', payload: ... }
```

## 动手编码：从 0 到 1

### 第 0 步：准备输入和结果 State

```jsx
const [draft, setDraft] = useState('compact');
const [saved, setSaved] = useState('COMPACT');
```

目标：分清“正在输入的值”和“已保存的值”。

### 第 1 步：引入 useTransition

```jsx
const [isPending, startAction] = useTransition();
```

观察：pending 不再需要手写一套 `setLoading(true/false)`。

### 第 2 步：模拟异步 mutation

```jsx
const savedValue = await savePreference(nextValue);
```

这里只是模拟网络层。

### 第 3 步：把异步流程放进 Action

```jsx
startAction(async () => {
  const savedValue = await savePreference(nextValue);
  startTransition(() => setSaved(savedValue));
});
```

### 第 4 步：用 pending 驱动 UI

```jsx
<button disabled={isPending}>
  {isPending ? '保存中…' : '保存'}
</button>
```

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：async Action 与保存结果更新。
- **实验辅助代码**：900ms 延迟让 pending 更容易观察。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./18-react19-actions-forms-optimistic-ui/kp171-react19-actions-model --config ./vite.config.js
```

## 效果验证

1. 输入框即时响应。
2. 点击保存后按钮进入 pending。
3. 请求完成后已保存值更新。
4. 能解释 Actions 为什么围绕 mutation 而不是所有 state update 设计。

完成后继续 **RE-KP172：异步 Transition 与 Action**。
