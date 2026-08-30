# RE-KP101：Hooks 只能在组件或自定义 Hook 顶层调用

> [返回 Chapter 11](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 说出普通 Hook 可以在哪两类 React 函数中调用。
2. 理解“顶层调用”指不能藏进普通嵌套函数或控制流。
3. 区分 Function Component、Custom Hook 与普通 JavaScript Function。
4. 知道 Custom Hook 自己也必须遵守 Hooks 规则。
5. 能把可复用状态逻辑提取到以 `use` 开头的 Custom Hook。

> **本节核心代码**：`useCounter()` 顶层调用 `useState`，`CounterCard` 顶层调用 `useCounter`。
>
> **实验辅助代码**：两个 `CounterCard` 实例用于证明 Custom Hook 复用的是逻辑，每个组件实例仍拥有独立 State。

## 理论讲解

### 1. Hook 不是普通工具函数

例如：

```jsx
useState()
useReducer()
useRef()
useContext()
```

它们虽然表现为 JavaScript 函数，但 React 会把这些调用与当前组件 Render 的内部状态关联起来。

所以它们有调用位置约束。

### 2. 普通 Hook 只能从 React Function 调用

官方规则允许：

```text
Function Component 顶层
Custom Hook 顶层
```

例如：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
}
```

以及：

```jsx
function useCounter() {
  const [count, setCount] = useState(0);
}
```

### 3. 什么叫“顶层”

顶层不是指文件最外层。

错误：

```jsx
const [count] = useState(0); // 模块顶层，错误
```

正确的“顶层”是 React 正在执行某个组件或 Custom Hook 时，其函数主体的稳定调用位置。

### 4. 普通函数为什么不行

错误：

```jsx
function createCounter() {
  const [count] = useState(0);
  return count;
}
```

它只是普通函数，React 无法把这种任意调用安全地当作组件 Hook 调用链的一部分。

如果它确实封装 Hook 逻辑，应设计为 Custom Hook：

```jsx
function useCounter() {
  const [count] = useState(0);
  return count;
}
```

### 5. Custom Hook 复用的是状态逻辑

本节渲染两个：

```jsx
<CounterCard title="A" />
<CounterCard title="B" />
```

二者都调用同一个 `useCounter()`。

但 A 加一不会让 B 一起加一。

原因是：

```text
共享 Hook 函数定义
≠
共享某一个 State 实例
```

每个组件实例都有自己的 Hook State。

## 动手编码：从 0 到 1

### 第 1 步：创建 Custom Hook

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
}
```

`useState` 位于 Custom Hook 顶层。

### 第 2 步：返回数据和动作

```jsx
return {
  count,
  increment() {
    setCount(value => value + 1);
  },
};
```

### 第 3 步：组件顶层调用 Custom Hook

```jsx
function CounterCard({ initialValue }) {
  const counter = useCounter(initialValue);
  // ...
}
```

没有把它放入点击事件、条件分支或普通嵌套函数。

### 第 4 步：渲染两个实例

```jsx
<CounterCard title="计数器 A" initialValue={0} />
<CounterCard title="计数器 B" initialValue={10} />
```

最终源码：[`src/main.jsx`](./src/main.jsx)

### 本节核心代码

- Function Component 顶层调用 Custom Hook
- Custom Hook 顶层调用 `useState`

### 实验辅助代码

- 两个实例用于验证 State 独立性。

## 运行案例

执行：

```bash
pnpm dev
```

然后分别点击 A、B 的 `+1`。

你会发现两个计数器互不影响。

## 效果验证

你应该能够回答：

1. 普通 Hook 可以从哪两类函数调用？
2. “顶层调用”是不是指 JavaScript 文件最外层？
3. 为什么普通工具函数里不能随意调用 `useState`？
4. 两个组件调用同一个 Custom Hook，为什么不会共享同一份 State？
