# RE-KP102：Hooks 不能放在普通条件和循环中

> [返回 Chapter 11](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 识别条件分支、循环、事件回调中的非法 Hook 调用。
2. 理解 Hook 调用顺序为什么需要在 Render 之间保持稳定。
3. 正确处理“条件 UI 但 Hook 必须顶层调用”。
4. 正确处理“列表每一项都需要 State”的场景。
5. 理解 early return 应放在 Hook 调用之后，而不是让某些 Render 跳过 Hook。

> **本节核心代码**：`FeaturePanel` 先顶层调用 `useState` 再 early return；列表通过 `CounterRow` 组件让每个实例合法拥有自己的 Hook。
>
> **实验辅助代码**：功能开关和三条列表数据只用于观察调用结构。

## 理论讲解

### 1. 条件里调用 Hook 为什么危险

错误：

```jsx
if (enabled) {
  const [count, setCount] = useState(0);
}
```

当 `enabled` 从 `true` 变 `false`，这次 Render 会少执行一个 Hook。

普通 Hook 依赖稳定的调用结构来对应当前组件的 Hook State。

### 2. early return 也可能破坏规则

错误：

```jsx
function Panel({ enabled }) {
  if (!enabled) return null;

  const [count] = useState(0);
}
```

有些 Render 调用 `useState`，有些 Render 不调用。

正确：

```jsx
function Panel({ enabled }) {
  const [count] = useState(0);

  if (!enabled) return null;
}
```

### 3. 循环里也不能直接调用普通 Hook

错误：

```jsx
items.map(item => {
  const [selected] = useState(false);
  return ...;
});
```

列表长度变化会导致调用次数变化。

### 4. 列表项需要 State 怎么办

把每一项变成组件：

```jsx
function CounterRow({ label }) {
  const [count, setCount] = useState(0);
  // ...
}
```

然后：

```jsx
items.map(item => <CounterRow key={item} label={item} />)
```

现在每个 `CounterRow` 都有自己的稳定组件生命周期和 Hook 调用序列。

### 5. 事件处理器里也不能创建 Hook

错误：

```jsx
<button onClick={() => {
  const [clicked] = useState(false);
}}>
```

Hook 只能在 React Render 组件/Custom Hook 的合法位置调用，而不是用户点击后临时创建。

## 动手编码：从 0 到 1

### 第 1 步：先调用 Hook，再决定是否 early return

```jsx
function FeaturePanel({ enabled }) {
  const [visits, setVisits] = useState(0);

  if (!enabled) {
    return <p>功能已关闭</p>;
  }
}
```

### 第 2 步：验证条件 UI 不等于条件 Hook

父组件切换：

```jsx
setEnabled(value => !value)
```

无论 enabled 是什么，`FeaturePanel` 的 Hook 调用结构都稳定。

### 第 3 步：把循环中的状态需求下沉到组件

```jsx
function CounterRow({ label }) {
  const [count, setCount] = useState(0);
}
```

### 第 4 步：循环只负责创建组件 Element

```jsx
items.map(item => (
  <CounterRow key={item} label={item} />
))
```

最终源码：[`src/main.jsx`](./src/main.jsx)

### 本节核心代码

- Hook 在 early return 之前顶层调用
- 列表项状态通过子组件承载

### 实验辅助代码

- `enabled` 开关
- 静态 `items` 数组

## 运行案例

执行：

```bash
pnpm dev
```

验证：

1. 给 Alpha/Beta/Gamma 分别点击不同次数。
2. 切换 FeaturePanel 开关。
3. 观察代码始终合法运行，列表项 State 各自独立。

## 效果验证

你应该能够指出以下位置为什么不合法：

- `if` 中的普通 Hook。
- `for/map` 回调中的普通 Hook。
- event handler 中的普通 Hook。
- early return 之后才出现、导致部分 Render 跳过的 Hook。
