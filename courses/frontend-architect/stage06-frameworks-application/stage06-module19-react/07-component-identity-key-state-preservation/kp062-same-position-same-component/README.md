# RE-KP062：相同位置相同组件保留状态

> [返回 Chapter 07](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 React 会把 State 与组件在渲染树中的位置关联起来。
2. 理解“相同位置 + 相同组件类型”通常会延续同一组件身份。
3. 知道父组件重新 Render、Props 变化，并不自动意味着子组件 State 被重置。
4. 能区分“Props 变了”和“组件身份变了”。
5. 能通过实际案例验证样式 Props 改变时内部计数仍然保留。

> **本节核心代码**：同一个 `<Counter />` 保持在父组件中的同一位置，只改变 `fancy` Prop。
>
> **实验辅助代码**：样式 class 和说明文字只用于让 Props 变化可见。

## 理论讲解

### 1. State 不是跟着 JSX 文本走

你可能会直觉认为：

```jsx
<Counter />
```

“里面自己保存了 State”。

更准确的模型是：

```text
React Render Tree 中某个位置
        +
该位置上的组件类型
        ↓
对应一份组件身份和 State
```

因此父组件重新执行，不等于 React 每次都创建全新的 Counter State。

### 2. Props 变化不等于组件身份变化

例如：

```jsx
<Counter fancy={false} />
```

变成：

```jsx
<Counter fancy={true} />
```

只要它仍然处于父组件中的同一位置，并且组件类型仍然是 `Counter`，React 通常会继续使用原来的 State。

可以先记住：

```text
Props 可以变化
State 可以保留
```

### 3. 本节实验为什么只改变样式

我们故意让 `Counter` 接收：

```jsx
fancy
```

然后切换 CSS class。

这样可以把问题缩小到：

```text
父组件重新 Render
Prop 发生变化
组件位置没变
组件类型没变
```

如果计数没有归零，就能清楚看到 State 被保留。

### 4. 不要把“同一位置”理解成源代码行号

这里的 Position 是 React 渲染树中的结构位置，不是：

```text
main.jsx 第 27 行
```

真正重要的是重新 Render 前后，React 在父节点的对应位置看到的元素身份是否可以继续匹配。

## 动手编码：从 0 到 1

### 第 0 步：创建 Counter

```jsx
function Counter() {
  const [score, setScore] = useState(0);

  return (
    <button onClick={() => setScore(score + 1)}>
      score: {score}
    </button>
  );
}
```

### 第 1 步：增加可变化的 Prop

```jsx
function Counter({ fancy }) {
  // ...
  return <section className={fancy ? 'fancy' : 'plain'}>...</section>;
}
```

### 第 2 步：父组件控制 fancy

```jsx
const [isFancy, setIsFancy] = useState(false);
```

渲染：

```jsx
<Counter fancy={isFancy} />
```

### 第 3 步：增加切换按钮

```jsx
<button onClick={() => setIsFancy(!isFancy)}>
  切换样式
</button>
```

### 第 4 步：观察 State 是否重置

先把 score 点到 3，再切换样式。

预期：

```text
样式变化
score 仍然是 3
```

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：同一位置、同一类型的 `Counter` 在 Prop 更新后保留 State。
- **实验辅助代码**：className 只负责让 Prop 变化可视化。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./07-component-identity-key-state-preservation/kp062-same-position-same-component --config ./vite.config.js
```

## 效果验证

1. 连续点击 `+1` 把 score 增大。
2. 切换 Fancy / Plain 样式。
3. score 不应因为 Prop 改变而归零。
4. 再次切换样式，State 仍然延续。
5. 能解释：这里保留 State 的关键不是“Props 没变”，而是组件身份没有被替换。

完成后继续 **RE-KP063：组件类型变化导致状态重置**。
