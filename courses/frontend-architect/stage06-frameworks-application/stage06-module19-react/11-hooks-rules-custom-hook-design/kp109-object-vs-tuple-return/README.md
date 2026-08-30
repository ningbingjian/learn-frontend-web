# RE-KP109：对象返回与 Tuple 返回的选择

> [返回 Chapter 11](../README.md)

## 目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 Tuple 和 Object 都是合法的 Custom Hook 返回形式。
2. 根据 API 规模、语义和未来演进空间做选择。
3. 避免把“React 内置 Hook 多用数组”误解成“所有 Custom Hook 都必须返回 Tuple”。

## 理论讲解

### 1. Tuple 适合短小、位置稳定的 API

```jsx
const [on, toggle] = useToggle(false);
```

优点：

- 紧凑
- 可自由重命名
- 两三个固定返回项时很自然

缺点：返回项一多，位置语义变弱。

### 2. Object 适合语义丰富、可能扩展的 API

```jsx
const { count, increment, decrement, reset } = useCounter();
```

优点：

- 字段自解释
- 调用者可只解构需要的字段
- 增加新字段通常不会破坏现有解构

### 3. 选择标准

优先 Tuple：

- 返回值很少
- 角色稳定且大家熟悉
- 需要调用者自由命名

优先 Object：

- 返回值较多
- 字段语义重要
- API 预计会扩展

## 动手编码：从 0 到 1

### 第 1 步：Tuple Hook

```jsx
function useToggle(initialValue = false) {
  const [on, setOn] = useState(initialValue);
  return [on, () => setOn(value => !value)];
}
```

### 第 2 步：Object Hook

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  return {
    count,
    increment: () => setCount(value => value + 1),
    decrement: () => setCount(value => value - 1),
    reset: () => setCount(initialValue),
  };
}
```

### 第 3 步：并排使用

观察调用点可读性差异，而不是寻找“唯一正确答案”。

### 最终源码

- [src/main.jsx](./src/main.jsx)

本节核心代码：Tuple 与 Object 两种返回契约。

实验辅助代码：两个小 Demo 用于并排比较调用体验。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- --open /11-hooks-rules-custom-hook-design/kp109-object-vs-tuple-return/
```

## 效果验证

- 能解释为什么 `useToggle` 适合 Tuple。
- 能解释为什么扩展型 `useCounter` 更适合 Object。
- 能根据 API 演进需求做选择，而不是机械模仿内置 Hook。
