# RE-KP031：React 事件处理器

> [返回 Chapter 04](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 React 通过 JSX 事件 Props（如 `onClick`）接收事件处理函数。
2. 会在组件内部声明一个 Handler Function 并交给宿主元素。
3. 理解 React 会在实际交互发生时调用事件处理器。
4. 会读取事件对象中的 `type`、`currentTarget` 等基础信息。
5. 知道事件处理器可以执行副作用，而 Render 本身应该保持纯净。
6. 知道交互元素应优先使用语义化 HTML，例如点击行为优先使用 `<button>`。

> **本节核心代码**：`<button onClick={handleClick}>` 与 `function handleClick(event) { ... }` 建立 React 交互的第一层模型。
>
> **实验辅助代码**：`alert()`、`console.log()` 与静态文案只用于观察事件发生，不引入 State。

## 理论讲解

### 1. React 事件处理器是什么

页面不只有静态 UI，还要响应：

```text
点击
输入
提交
聚焦
悬停
键盘
```

React 允许在 JSX 中给元素传入事件 Prop：

```jsx
<button onClick={handleClick}>确认</button>
```

这里：

```text
onClick
是 JSX 中的事件 Prop

handleClick
是我们定义的 JavaScript 函数
```

### 2. 处理器通常定义在组件内部

例如：

```jsx
function ConfirmButton() {
  function handleClick() {
    alert('Confirmed');
  }

  return (
    <button type="button" onClick={handleClick}>
      确认
    </button>
  );
}
```

这样事件处理器可以读取当前组件可见的 Props 和局部变量。

### 3. 事件 Prop 使用 camelCase

React JSX 中写：

```jsx
onClick
onChange
onSubmit
onMouseEnter
```

而不是 HTML 字符串事件属性：

```html
onclick="..."
```

React 的 JSX 事件 API 接收函数值。

### 4. React 在交互发生时调用函数

正确模型：

```text
Render
  ↓
把 handleClick 交给 onClick
  ↓
浏览器中用户点击
  ↓
React 调用 handleClick
```

本节先使用：

```jsx
onClick={handleClick}
```

下一节 RE-KP032 会专门拆开：

```text
传递函数
vs
立即调用函数
```

为什么差别巨大。

### 5. 事件处理器会收到事件对象

可以写：

```jsx
function handleClick(event) {
  console.log(event.type);
  console.log(event.currentTarget);
}
```

第一层先记住：

```text
event.type
当前事件类型

event.currentTarget
当前这个处理器绑定到的元素
```

事件传播、`target`、Synthetic Event 等会在后面几课展开。

### 6. Event Handler 可以有副作用

React Render 应保持纯净：

```text
相同输入
→ 只计算 UI
```

而事件处理器只有在用户动作发生后才执行，因此适合做：

```text
日志
请求
通知
状态更新（后面学习）
调用外部 API
```

React 官方也明确把事件处理器视为执行副作用的合适位置。

### 7. 使用正确的 HTML 元素

如果行为是“按钮点击”，优先：

```jsx
<button onClick={handleClick}>...</button>
```

不要仅仅为了样式写：

```jsx
<div onClick={handleClick}>...</div>
```

原生 `<button>` 自带键盘、焦点和可访问性语义，样式可以交给 CSS 调整。

### 8. 自定义组件也可以接收事件函数 Prop

例如：

```jsx
function ActionButton({ onAction, children }) {
  return (
    <button type="button" onClick={onAction}>
      {children}
    </button>
  );
}
```

调用：

```jsx
<ActionButton onAction={handleExport}>
  导出
</ActionButton>
```

自定义组件 Prop 可以按业务语义命名，例如 `onAction`、`onExport`。

最终真正落到浏览器 `<button>` 时仍使用 `onClick`。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们不使用 State，只验证事件链路：

```text
定义函数
  ↓
传给 onClick
  ↓
用户点击
  ↓
React 调用函数
  ↓
读取 event
```

### 第 1 步：创建最小页面入口

创建：

```text
kp031-react-event-handlers/
├── index.html
└── src/
    └── main.jsx
```

`index.html`：

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

### 第 2 步：先写一个没有事件的按钮

```jsx
function App() {
  return (
    <button type="button">
      确认操作
    </button>
  );
}
```

此时点击不会执行我们的 JavaScript 逻辑。

### 第 3 步：定义 `handleClick`

在组件内部加入：

```jsx
function handleClick(event) {
  console.log('event type:', event.type);
  console.log('current target:', event.currentTarget);
  alert('操作已确认');
}
```

函数已经存在，但还没有和按钮连接。

### 第 4 步：把函数传给 `onClick`

改成：

```jsx
<button type="button" onClick={handleClick}>
  确认操作
</button>
```

刷新页面后，函数仍然不会自动弹窗。

只有点击时才执行。

### 第 5 步：观察 Event Object

点击按钮后打开 Console，观察：

```text
event type: click
current target: <button ...>
```

这里不要急着展开传播模型，只确认 React 把事件对象传进了 Handler。

### 第 6 步：加入一个自定义 `ActionButton`

```jsx
function ActionButton({ onAction, children }) {
  return (
    <button type="button" onClick={onAction}>
      {children}
    </button>
  );
}
```

调用：

```jsx
<ActionButton onAction={handleExport}>
  导出订单
</ActionButton>
```

这验证：

```text
业务组件 API
onAction
   ↓
宿主 button
onClick
```

### 第 7 步：保持事件处理器而不是直接修改 DOM

本节不使用：

```js
document.querySelector(...).onclick = ...
```

我们通过 JSX 描述事件关系：

```jsx
onClick={handler}
```

这是 React 组件模型的一部分。

### 第 8 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

本节总结：

- **本节核心代码**：事件函数、`onClick={handler}`、事件对象，以及自定义事件 Prop 到宿主 `onClick` 的传递。
- **实验辅助代码**：`alert` 和 Console 只是让事件调用时机可见；State 更新会在 RE-KP036 再学习。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./04-events-and-interactions/kp031-react-event-handlers --config ./vite.config.js
```

构建验证：

```bash
npm run build -- ./04-events-and-interactions/kp031-react-event-handlers --config ./vite.config.js
```

## 效果验证

请确认：

1. 页面首次 Render 时不会自动弹出“操作已确认”。
2. 点击“确认操作”后才执行 `handleClick`。
3. Console 能看到 `event.type === 'click'`。
4. `event.currentTarget` 指向绑定当前处理器的按钮。
5. 自定义 `ActionButton` 可以使用 `onAction` 作为业务 Prop，再传给原生按钮 `onClick`。
6. 能解释为什么事件处理器适合副作用，而 Render 不应该随意执行副作用。
7. 能说明为什么点击行为应该优先用语义化 `<button>`。

完成后继续 **RE-KP032：传递函数与调用函数的区别**。
