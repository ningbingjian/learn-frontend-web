# RE-KP092：Ref 与 State 的区别

> [返回 Chapter 10](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释 Ref 与 State 都能跨 Render 保留数据，但更新语义不同。
2. 知道修改 `ref.current` 不会触发重新渲染，而 State Setter 会请求新的 Render。
3. 能判断一个值是否参与视觉输出，从而选择 Ref 或 State。
4. 知道 Ref 是可变对象，不应拿它替代真正驱动 UI 的 State。
5. 知道一般不要在 Render 过程中读取或写入 `ref.current`。
6. 能识别计时器 ID、DOM 节点、第三方实例等典型 Ref 场景。

> **本节核心代码**：`const silentCountRef = useRef(0)` 与 `const [visibleCount, setVisibleCount] = useState(0)` 的对照。
>
> **实验辅助代码**：Console 日志只用于观察 Ref 已经变化但组件没有因为 Ref 更新而重新 Render。

## 理论讲解

### 1. Ref 与 State 的共同点

两者都可以让组件在多次 Render 之间保留信息：

```text
State -> React 保存
Ref   -> React 保存同一个 ref 对象
```

因此它们都不是普通局部变量。

### 2. 最大区别：更新后是否需要重新 Render

State：

```jsx
setCount(count + 1);
```

表达的是：

```text
这个变化会影响界面
请 React 计算下一次 UI
```

Ref：

```jsx
countRef.current += 1;
```

只是修改普通 JavaScript 对象属性：

```text
值变了
但 React 不会因此重新 Render
```

### 3. 选择标准不是“哪个写起来简单”

应该问：

```text
如果这个值改变，界面现在就应该变化吗？
```

如果答案是“是”，通常是 State。

如果答案是“否，只需要跨 Render 记住它”，Ref 更合适。

### 4. 典型 State

例如：

- 当前选中的 Tab。
- 输入框受控值。
- loading / error / success 状态。
- 当前展开项。
- 会显示在页面上的计数。

### 5. 典型 Ref

例如：

- `setInterval` / `setTimeout` 返回的 ID。
- DOM Node。
- ResizeObserver / WebSocket / 第三方实例引用。
- 上一次请求句柄。
- 不参与 UI 的可变数据。

### 6. 不要用 Ref 绕开 React 更新

下面这种设计通常有问题：

```jsx
const scoreRef = useRef(0);

return <p>{scoreRef.current}</p>;
```

如果 `scoreRef.current` 改变，却没有其他 State 更新触发 Render，页面不会及时反映新值。

这说明：

```text
只要 UI 依赖这个值，它通常就应该是 State。
```

### 7. Render 期间不要随意读写 Ref

React 官方建议不要在 Render 中读取或写入 `ref.current`，因为 React 不追踪它的变化，会破坏 Render 的可预测性。

Ref 更适合：

```text
Event Handler
Effect
DOM / 外部系统回调
```

中的命令式读写。

## 动手编码：从 0 到 1

### 第 1 步：准备一个 State

目标：先建立会驱动 UI 的计数器。

```jsx
const [visibleCount, setVisibleCount] = useState(0);
```

页面显示：

```jsx
<p>UI Count：{visibleCount}</p>
```

点击按钮后：

```jsx
setVisibleCount(count => count + 1);
```

你应该看到页面马上更新。

### 第 2 步：准备一个 Ref

```jsx
const silentCountRef = useRef(0);
```

它跨 Render 保留同一个对象。

### 第 3 步：只修改 Ref

```jsx
function handleSilentIncrement() {
  silentCountRef.current += 1;
  console.log('silent ref:', silentCountRef.current);
}
```

这里不调用任何 Setter。

### 第 4 步：观察差异

点击“Ref +1”时：

- Console 中 Ref 数值增加。
- 页面中的 State 数值不变化。
- 组件不会因为这次 Ref 更新请求新的 Render。

点击“State +1”时：

- State 改变。
- React 重新 Render。
- 页面更新。

### 第 5 步：不要为了展示 Ref 再把它塞进 JSX

本实验故意不写：

```jsx
<p>{silentCountRef.current}</p>
```

因为那会给学习者错误暗示：Ref 可以正常承担响应式 UI 数据。

最终源码：

- [src/main.jsx](./src/main.jsx)

## 运行案例

在 React 模块目录执行：

```bash
npm run dev -- --host 0.0.0.0
```

然后打开本知识点对应的 `index.html`。

操作：

1. 打开浏览器 Console。
2. 连续点击“Ref +1”。
3. 观察 Console 数值递增，但页面没有因为 Ref 更新而变化。
4. 点击“State +1”。
5. 观察页面 UI Count 更新。

## 效果验证

完成实验后，你应该能够回答：

- 为什么 Ref 和 State 都能跨 Render 保留数据？
- 为什么 `ref.current += 1` 不会重新 Render？
- 什么数据必须用 State？
- 什么数据更适合 Ref？
- 为什么不应把会驱动 UI 的值藏在 Ref 里？

本节结论：

```text
UI 依赖 -> State
跨 Render 保存但不驱动 UI -> Ref
```
