# RE-KP091：useRef 保存非渲染数据

> [返回 Chapter 10](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `useRef(initialValue)` 创建跨 Render 保持稳定的 Ref 对象。
2. 理解 Ref 数据存放在 `.current` 中，可以手动修改。
3. 知道修改 `ref.current` 不会触发组件重新渲染。
4. 能判断“需要保存，但不影响 UI”的数据适合 Ref。
5. 理解计时器 ID、外部实例句柄、前一次非渲染信息等常见 Ref 场景。
6. 知道不要在普通 Render 过程中随意读写 `ref.current`，初始化例外除外。

> **本节核心代码**：`const intervalRef = useRef(null)`，在事件处理器中保存/清理 interval ID。
>
> **实验辅助代码**：`seconds` 仍然使用 State，因为它直接决定页面显示；这正好形成 Ref 与 State 的第一层对照。

## 理论讲解

### 1. Ref 是什么

最小写法：

```jsx
const intervalRef = useRef(null);
```

得到一个对象：

```js
{
  current: null
}
```

后续 Render：

```text
useRef 返回同一个 Ref 对象
```

这和组件函数里的普通局部变量不同。

### 2. `.current` 可以修改

```jsx
intervalRef.current = intervalId;
```

Ref 是一个 mutable container。

但关键区别是：

```text
修改 ref.current
不会请求 React 重新 Render
```

React 不会因为 Ref 改变自动刷新 UI。

### 3. 什么数据适合 Ref

满足两个条件时优先考虑 Ref：

```text
1. 需要跨 Render 保存
2. 这个值变化不应该直接改变 UI
```

例如：

```text
setInterval 返回的 ID
第三方库实例
WebSocket / observer 等外部句柄
某些命令式对象引用
```

### 4. 什么数据不应该放 Ref

页面需要显示：

```text
计数器数字
加载状态
当前选项
错误消息
```

这类数据变化应该让 UI 更新，因此通常属于 State。

如果写：

```jsx
countRef.current += 1;
```

然后 JSX：

```jsx
<p>{countRef.current}</p>
```

你会发现修改 Ref 后 UI 不会自动更新。

### 5. Ref 与普通变量的区别

普通变量：

```jsx
let intervalId = null;
```

组件重新 Render 时函数再次执行，这个局部变量会重新创建。

Ref：

```jsx
const intervalRef = useRef(null);
```

React 在后续 Render 中返回同一个 Ref 对象。

所以 Ref 可以跨 Render 保存命令式信息。

### 6. 不要把 Ref 当成“绕开 State 的后门”

不要为了减少 Render 就把本来属于 UI 的数据塞入 Ref。

正确问题是：

```text
这个值变化后，用户应该看到不同 UI 吗？
```

如果答案是：

```text
是
```

优先考虑 State。

如果答案是：

```text
否，但我需要跨 Render 记住它
```

Ref 才是候选。

### 7. Render 期间读写 Ref 的边界

React 官方建议不要在普通 Render 过程中随意读写：

```jsx
ref.current
```

因为 Render 应保持可预测、纯净。

Ref 的典型读写位置是：

```text
事件处理器
Effect
Ref callback
其他命令式集成逻辑
```

本节只使用事件处理器。

## 动手编码：从 0 到 1

### 第 0 步：建立 Stopwatch

先准备真正需要显示的 State：

```jsx
const [seconds, setSeconds] = useState(0);
```

`seconds` 变化会影响 UI，因此必须是 State。

### 第 1 步：为 interval ID 创建 Ref

```jsx
const intervalRef = useRef(null);
```

interval ID 本身不需要显示。

### 第 2 步：开始计时

```jsx
function handleStart() {
  if (intervalRef.current !== null) return;

  intervalRef.current = window.setInterval(() => {
    setSeconds(value => value + 1);
  }, 1000);
}
```

这里发生两种不同的数据变化：

```text
intervalRef.current → 保存计时器 ID，不触发 Render
seconds             → 每秒更新 UI，触发 Render
```

### 第 3 步：停止计时

```jsx
function handleStop() {
  if (intervalRef.current === null) return;

  window.clearInterval(intervalRef.current);
  intervalRef.current = null;
}
```

即使组件已经经历很多次 Render，仍能从同一个 Ref 对象取出正确的 interval ID。

### 第 4 步：重置显示值

```jsx
function handleReset() {
  setSeconds(0);
}
```

为什么不用：

```jsx
secondsRef.current = 0;
```

因为用户需要看到数字立刻变回 0。

### 第 5 步：观察职责分工

```text
State
seconds
→ 直接驱动 JSX

Ref
intervalRef.current
→ 只服务于命令式计时器控制
```

### 第 6 步：思考卸载清理

当前实验提供“停止”按钮手动清理。

如果真实组件可能在计时器运行时被卸载，则还需要在 Effect cleanup 中清理 interval。

Effect 生命周期会在 Chapter 12 正式学习，本节不提前展开。

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`useRef(null)` 保存 interval ID。
- **实验辅助代码**：`seconds` State 和计时器用于证明“Ref 保存控制信息，State 驱动 UI”。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./10-ref-dom-escape-hatches/kp091-useref-non-render-data --config ./vite.config.js
```

## 效果验证

1. 点击开始后秒数持续增加。
2. 多次点击开始不会重复创建多个 interval。
3. 点击停止后，跨多次 Render 保存的 interval ID 仍能正确清理。
4. 点击重置后 UI 立即显示 0，因为 `seconds` 使用 State。
5. 能解释为什么 interval ID 属于 Ref，而 seconds 属于 State。

完成后继续 **RE-KP092：Ref 与 State 的区别**。
