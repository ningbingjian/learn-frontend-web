# RE-KP141：Render Phase

> [返回 Chapter 15](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 React 一次更新可拆成 Trigger → Render → Commit。
2. 理解 Render Phase 的核心工作是调用组件并计算下一版 UI 描述。
3. 区分“组件函数被调用”和“浏览器 DOM 已经修改”。
4. 理解父组件 Render 时，默认会继续 Render 它返回的子组件树。
5. 建立 Render 必须可重复、可中断、无副作用的前置认知。

> **本节核心代码**：组件函数内的 `console.log('[render] ...')` 与 JSX 计算。  
> **实验辅助代码**：父组件的 unrelated counter 用于触发额外 Render。

## 理论讲解

### 1. Trigger → Render → Commit

React 官方用三个步骤描述一次 UI 更新：

```text
1. Trigger a render
2. Render components
3. Commit to the DOM
```

本节只聚焦第 2 步。

### 2. Render 在 React 中意味着“调用组件”

对于 Function Component：

```jsx
function ProductCard({ product }) {
  return <article>{product.name}</article>;
}
```

Render Phase 会调用：

```js
ProductCard(props)
```

并根据返回 JSX 继续计算下一版树。

### 3. Render 不等于 DOM mutation

Render 期间 React 在回答：

```text
下一版 UI 应该是什么？
```

而不是直接执行：

```text
把 DOM 改成什么？
```

真正的 DOM mutation 属于 Commit Phase。

### 4. Render 会沿组件树展开

如果：

```jsx
<App>
  <Dashboard>
    <Summary />
  </Dashboard>
</App>
```

当 `App` 需要重新 Render 时，React 会调用它，并继续处理返回的子组件。默认情况下，上层组件更新会导致嵌套组件参与 Render；性能优化属于后续话题。

### 5. Render 输出应该只依赖当前输入

组件 Render 可以读取：

- props；
- state；
- context。

它们应被视为当前这次计算的只读输入。

## 动手编码：从 0 到 1

### 第 0 步：创建纯展示组件

```jsx
function Summary({ count }) {
  return <p>Count: {count}</p>;
}
```

### 第 1 步：在函数顶部记录 Render

```jsx
console.log('[render] Summary', count);
```

这只是教学观察，不要把业务副作用放在 Render 中。

### 第 2 步：父组件加入 State

```jsx
const [count, setCount] = useState(0);
const [note, setNote] = useState('');
```

### 第 3 步：观察不同更新

点击 count 按钮会重新计算 `App` 与 `Summary`。

输入 note 也会触发 `App` Render；默认情况下 `Summary` 同样会被重新调用，即使它的 `count` 没变。

### 第 4 步：注意 Console 与页面时机不同

Console 中的 `[render]` 表示组件函数参与了计算，不等同于 DOM 已经 Commit。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Function Component 调用与 JSX 计算。
- **实验辅助代码**：Console Trace 与 unrelated State。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./15-render-reconciliation-commit/kp141-render-phase --config ./vite.config.js
```

## 效果验证

1. 打开 Console，可以看到组件 Render 记录。
2. 修改 `count`，组件重新计算新 JSX。
3. 修改无关 `note`，仍可以观察到默认子树 Render。
4. 能解释为什么 `[render]` 日志出现不代表 DOM 在那一行已经修改。

完成后继续 **RE-KP142：Commit Phase**。
