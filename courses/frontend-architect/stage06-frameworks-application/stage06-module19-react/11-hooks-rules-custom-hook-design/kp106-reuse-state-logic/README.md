# RE-KP106：自定义 Hook 复用状态逻辑而非状态本身

> [返回 Chapter 11](../README.md)

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 Custom Hook 共享的是状态逻辑，不是同一份 State 数据。
2. 能通过多个 Hook 调用实例验证 State 相互独立。
3. 理解什么时候应该用 Context/状态提升，而不是误以为提取 Custom Hook 就能共享数据。

## 理论讲解

### 1. 每次 Hook 调用都是一次独立执行

如果 `useCounter()` 内部调用 `useState`，那么两个组件分别调用 `useCounter()` 时，会得到两套独立 State。

### 2. 共享逻辑 ≠ 共享状态

Custom Hook 可以复用：

- 初始化逻辑
- 更新规则
- 事件处理逻辑
- Effect 订阅逻辑

但不会自动把多个组件绑到同一份状态上。

### 3. 真正共享状态需要共同 owner

如果两个组件必须看到同一个值，应考虑：

- 状态提升到最近公共父组件
- Context
- 外部 Store

而不是只把 `useState` 包进一个 Custom Hook。

## 动手编码：从 0 到 1

### 第 1 步：写 `useCounter`

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  return {
    count,
    increment: () => setCount(value => value + 1),
    reset: () => setCount(initialValue),
  };
}
```

### 第 2 步：两个组件分别调用

```jsx
<CounterPanel label="A" />
<CounterPanel label="B" />
```

每个 `CounterPanel` 内部都调用一次 `useCounter(0)`。

### 第 3 步：分别点击按钮

观察：A 增加不会改变 B。

这证明 Custom Hook 复用了“如何计数”的逻辑，而不是让 A/B 共享同一个 count。

### 最终源码

- [src/main.jsx](./src/main.jsx)

本节核心代码：两个独立 `useCounter()` 调用。

实验辅助代码：两个 Panel 的 label 用于区分观察结果。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- --open /11-hooks-rules-custom-hook-design/kp106-reuse-state-logic/
```

## 效果验证

- 两个计数器的更新互不影响。
- 能解释“逻辑复用”和“状态共享”的区别。
- 知道需要共享同一份数据时应寻找共同 owner。
