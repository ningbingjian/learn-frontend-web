# RE-KP042：State 是组件私有记忆

> [返回 Chapter 05](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 State 属于某个具体组件实例，而不是属于“组件函数名字”这个全局定义。
2. 知道同一个组件渲染两次时，可以拥有两份彼此独立的 State。
3. 会用两个 Counter 实例验证 State 的独立性。
4. 区分“共享组件定义”和“共享 State”。
5. 为后续 State Identity / Key 章节建立第一层直觉。

> **本节核心代码**：同一个 `<Counter />` 组件渲染两次，每个实例内部各自调用 `useState(0)`。  
> **实验辅助代码**：`label` Prop 只用于区分两个组件实例。

## 理论讲解

### 1. 同一个函数可以产生多个组件实例

定义一次：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  // ...
}
```

但可以渲染：

```jsx
<Counter />
<Counter />
```

这不是“两个标签共用同一个 count”。

React 会为它们各自维护 State。

### 2. State 是私有记忆

可以先建立：

```text
Counter A
  └─ count A

Counter B
  └─ count B
```

点击 A：

```text
count A 改变
count B 保持不变
```

### 3. 组件定义共享，State 不共享

共享的是：

```text
Counter 这段函数代码
```

不共享的是：

```text
每个组件实例对应的 State
```

这和面向对象里“同一个 class 创建多个对象，各有实例字段”的直觉有一点相似，但 React 的身份规则最终由组件树位置、类型和 key 决定，Chapter 07 会再深入。

### 4. Props 与 State 的职责继续分开

本例给两个 Counter 传：

```jsx
<Counter label="A" />
<Counter label="B" />
```

`label` 是父组件输入。

`count` 是 Counter 自己的内部记忆。

因此：

```text
Props
→ 外部输入

State
→ 组件自己的记忆
```

## 动手编码：从 0 到 1

### 第 0 步：创建 Counter

```jsx
function Counter({ label }) {
  return <button>{label}</button>;
}
```

### 第 1 步：Counter 内声明 State

```jsx
const [count, setCount] = useState(0);
```

### 第 2 步：点击当前 Counter 只更新自己

```jsx
<button onClick={() => setCount(count + 1)}>
  {label}: {count}
</button>
```

### 第 3 步：App 渲染两个实例

```jsx
<Counter label="Counter A" />
<Counter label="Counter B" />
```

### 第 4 步：分别点击

先点 A 三次，再点 B 一次。

预期：

```text
Counter A: 3
Counter B: 1
```

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：两个 Counter 实例各自持有 `useState`。
- **实验辅助代码**：`label` 只是为了在页面上辨认实例。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./05-state-basics-object-array-updates/kp042-state-private-memory --config ./vite.config.js
```

## 效果验证

1. 两个 Counter 初始都为 `0`。
2. 点击 A 不会修改 B。
3. 点击 B 不会修改 A。
4. 能解释为什么“同一个组件定义”不代表“共用同一份 State”。
5. 能区分父组件传入的 `label` Props 与 Counter 自己的 `count` State。

完成后继续 **RE-KP043：State 更新触发重新渲染**。
