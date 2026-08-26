# RE-KP015：函数组件的最小模型

> [返回 Chapter 02](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解函数组件首先是 JavaScript 函数，但它被 React 按组件规则调用。
2. 知道组件接收 props，并返回 React 可以渲染的内容。
3. 区分“定义组件”“创建组件 Element”“React 执行组件函数”三个动作。
4. 知道业务渲染中应该写 `<Greeting />`，而不是把组件函数当普通函数手工调用。
5. 为后续 Hooks、Render Phase 与组件身份建立正确基础。

> **本节核心代码**：`function Greeting({ name }) { return ... }` 与 `<Greeting name="Ada" />`。
>
> **实验辅助代码**：Console 日志只用于观察组件函数何时执行。

## 理论讲解

### 1. 函数组件首先是一段 JavaScript 函数定义

最小函数组件：

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

从 JavaScript 角度，`Greeting` 是 function，`name` 来自函数参数中的 props，`return` 返回一个值。

从 React 角度：当 React 渲染 `<Greeting />` 时，会按组件规则执行它，并使用返回结果继续构建 UI。

### 2. 定义组件不会自动执行组件

写下：

```jsx
function Greeting() {
  console.log('Greeting executed');
  return <h1>Hello</h1>;
}
```

只是在定义函数。

真正出现 `<Greeting />` 并被 React 渲染时，组件函数才会进入 React 的渲染过程。

### 3. `<Greeting />` 不是“马上等价于手工 Greeting()”

JSX：

```jsx
<Greeting name="Ada" />
```

首先表达：

```text
type = Greeting
props = { name: 'Ada' }
```

React 看到这个组件类型以后，再决定何时执行组件函数。

这层关系很重要，因为 React 需要管理组件身份、Hooks 调用顺序、状态、并发渲染、错误处理和调试信息。

### 4. 为什么不应该手工调用组件函数

简单组件手工执行：

```js
Greeting({ name: 'Ada' });
```

可能看起来也能得到一个 Element，但业务渲染中不要这样使用组件。

正确方式：

```jsx
<Greeting name="Ada" />
```

尤其组件开始使用 Hooks 后，手工调用会破坏组件边界和 Hooks 规则。

### 5. props 是组件输入

例如：

```jsx
<Greeting name="Ada" />
<Greeting name="Lin" />
```

同一个组件类型可以接收不同 props。

可以先形成：

```text
Component + Props
       ↓
组件执行
       ↓
返回 React Node / Element 描述
```

Props 的只读语义会在 Chapter 03 专门学习。

### 6. 函数组件返回的不是 DOM 修改命令

组件通常不需要写 `document.createElement()` 或 `textContent = ...`，而是返回 JSX 描述。

这延续了 RE-KP001 的声明式模型：输入经过组件得到当前 UI 描述。

### 7. 组件执行不等于 DOM 已经更新

组件函数执行属于 React Render 过程的一部分。

浏览器 DOM 真正更新还需要后面的 Commit。

现在只记住：`组件函数执行 ≠ DOM 一定已经更新`。Render / Commit 会在 Chapter 15 系统学习。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要验证：组件是函数、React 渲染 `<Greeting />` 时会执行组件、同一个组件可以接收不同 props，并且不把手工函数调用当成正常组件渲染方式。

### 第 1 步：创建最小组件

创建 `src/main.jsx`：

```jsx
function Greeting({ name }) {
  return <h2>Hello, {name}</h2>;
}
```

**本步目标**：只定义组件。

**运行后观察**：仅定义函数时浏览器没有任何 UI。

### 第 2 步：给组件加入执行日志

改成：

```jsx
function Greeting({ name }) {
  console.log(`Greeting rendered with name=${name}`);
  return <h2>Hello, {name}</h2>;
}
```

日志用于观察 React 何时执行组件。

### 第 3 步：创建组件 Element

在父组件里写：

```jsx
function App() {
  return (
    <main>
      <Greeting name="Ada" />
      <Greeting name="Lin" />
    </main>
  );
}
```

两个 `<Greeting />` 使用同一个组件类型，但 props 不同。

### 第 4 步：挂载应用

加入：

```jsx
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);
```

刷新后会看到两行问候，Console 也能观察到组件函数执行。

### 第 5 步：验证组件类型仍然是普通函数

加入：

```js
console.log(typeof Greeting);
```

应得到 `function`。

### 第 6 步：理解为什么仍然由 React 调用

不要把最终源码改成：

```js
const result = Greeting({ name: 'Ada' });
```

即使当前无 Hook 的简单函数可能返回 Element，这也不是正常组件渲染 API。应该继续使用 `<Greeting name="Ada" />` 让 React 管理组件调用。

### 第 7 步：完成案例并对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **核心代码**：`Greeting` 函数组件、props 参数、返回 JSX、`<Greeting />`。
- **实验辅助代码**：Console 日志和两组测试数据。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./02-jsx-react-element-component-model/kp015-function-component-model --config ./vite.config.js
```

构建：

```bash
npm run build -- ./02-jsx-react-element-component-model/kp015-function-component-model --config ./vite.config.js
```

## 效果验证

请确认：

1. `Greeting` 本身的 `typeof` 是 `function`。
2. 两个 `<Greeting />` 复用了同一个组件类型。
3. props 不同会让组件返回不同 UI 描述。
4. 能解释“JS 函数”与“React 按组件规则调用函数”之间的区别。
5. 知道正常组件渲染应该写 `<Greeting />`，而不是手工调用 `Greeting()`。
6. 知道组件函数执行和真实 DOM Commit 不是同一件事。

完成后继续学习 **RE-KP016：组件名称与大写规则**。
