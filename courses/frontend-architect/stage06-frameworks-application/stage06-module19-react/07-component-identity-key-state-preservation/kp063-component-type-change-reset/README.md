# RE-KP063：组件类型变化导致状态重置

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解同一树位置上的组件类型变化会改变组件身份。
2. 理解旧组件被移除后，它对应的 State 也随之丢弃。
3. 能解释为什么从 `<Counter />` 切到 `<Message />` 再切回来时计数会归零。
4. 区分“重新 Render”与“组件被卸载后重新挂载”。
5. 为后续 `key` 主动重置 State 建立身份模型。

> **本节核心代码**：同一个条件分支位置在 `Counter` 和 `Message` 两种组件类型之间切换。
>
> **实验辅助代码**：切换按钮只用于制造类型变化。

## 理论讲解

### 1. 相同位置还不够

RE-KP062 学到：

```text
同一位置 + 同一组件类型
通常保留 State
```

现在把第二个条件改掉：

```text
同一位置 + 不同组件类型
```

React 会把它们视为不同身份。

### 2. 类型变化意味着旧子树被替换

假设第一次是：

```jsx
<Counter />
```

下一次同一位置变成：

```jsx
<Message />
```

React 不会把 Counter 的 State “转交”给 Message。

更合理的模型是：

```text
Counter identity 被移除
Counter state 被丢弃
Message identity 建立
```

之后再切回 Counter：

```text
创建新的 Counter identity
使用新的初始 State
```

### 3. 为什么这是必要的

不同组件类型的内部 State 结构可能完全不同。

例如：

```text
Counter: score
Message: text
Editor: draft + selection
```

如果 React 试图跨类型复用 State，结果会不可预测。

## 动手编码：从 0 到 1

### 第 0 步：准备 Counter

```jsx
function Counter() {
  const [score, setScore] = useState(0);
  return <button onClick={() => setScore(score + 1)}>{score}</button>;
}
```

### 第 1 步：准备另一种组件类型

```jsx
function Message() {
  return <p>这里现在是 Message。</p>;
}
```

### 第 2 步：在同一位置条件切换

```jsx
{showCounter ? <Counter /> : <Message />}
```

### 第 3 步：完成实验

1. Counter 加到 3。
2. 切换到 Message。
3. 再切回 Counter。

预期：

```text
score 重新从 0 开始
```

### 第 4 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：同一位置上组件 Type 变化会更换身份。
- **实验辅助代码**：`showCounter` 仅用于控制实验分支。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./07-component-identity-key-state-preservation/kp063-component-type-change-reset --config ./vite.config.js
```

## 效果验证

- Counter 增加后的 State 能正常显示。
- 切成 Message 后 Counter 消失。
- 再切回 Counter 时 State 从初始值开始。
- 能解释这不是“React 随机丢 State”，而是组件身份发生了类型级变化。

完成后继续 **RE-KP064：key 不只是列表警告**。
