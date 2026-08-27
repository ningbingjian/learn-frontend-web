# RE-KP032：传递函数与调用函数的区别

> [返回 Chapter 04](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 `onClick={handleClick}` 与 `onClick={handleClick()}`。
2. 理解事件 Prop 需要的是“一个以后再调用的函数”，而不是函数调用结果。
3. 会使用 `onClick={() => doSomething(id)}` 传参。
4. 知道把函数在 Render 阶段直接调用，可能造成副作用提前发生甚至渲染循环。
5. 能判断什么时候传函数引用，什么时候使用内联函数包装。

> **本节核心代码**：`onClick={handleClick}`、`onClick={() => handleSelect(id)}`。  
> **实验辅助代码**：`console.log`、示例按钮和静态商品 ID 只用于观察调用时机。

## 理论讲解

### 1. React 事件 Prop 要接收函数

正确写法：

```jsx
<button onClick={handleClick}>保存</button>
```

这里 `handleClick` 没有括号。

可以先把它理解成：

```text
把函数本身交给 React
        ↓
用户点击
        ↓
React 再调用这个函数
```

### 2. `handleClick()` 是立即调用

如果写：

```jsx
<button onClick={handleClick()}>保存</button>
```

JavaScript 会先执行：

```js
handleClick()
```

然后把它的返回值交给 `onClick`。

于是实际过程变成：

```text
组件 Render
   ↓
handleClick() 立刻执行
   ↓
返回值交给 onClick
```

如果 `handleClick()` 返回 `undefined`，那按钮真正得到的并不是一个可调用的事件处理函数。

### 3. 为什么这种错误有时很严重

假设函数里面更新 State：

```js
function handleClick() {
  setCount(count + 1);
}
```

如果 Render 时写：

```jsx
<button onClick={handleClick()} />
```

就可能形成：

```text
Render
 ↓
调用 handleClick()
 ↓
setState
 ↓
再次 Render
 ↓
再次调用 handleClick()
```

从而造成不断重新渲染。

这一课只建立调用时机直觉；更新队列会在后续章节深入。

### 4. 需要传参数怎么办

不能直接写：

```jsx
onClick={handleSelect(productId)}
```

因为这仍然是立即调用。

可以包装成一个新的函数：

```jsx
onClick={() => handleSelect(productId)}
```

现在 React 得到的是：

```js
() => handleSelect(productId)
```

这个函数会在点击时才执行。

### 5. 函数引用 vs 内联函数

两种常见正确写法：

```jsx
<button onClick={handleSave}>保存</button>
```

```jsx
<button onClick={() => handleSelect('A1024')}>选择订单</button>
```

选择标准很简单：

```text
不需要额外参数
→ 直接传函数引用

需要组合额外逻辑 / 参数
→ 用内联函数包装
```

本节不要提前把“内联函数会不会影响性能”扩大成默认优化问题。性能是否值得优化应该先测量。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们用两个按钮验证：

```text
直接传函数
vs
用箭头函数延迟调用并传参
```

### 第 1 步：准备 React 入口

在 `src/main.jsx` 中导入：

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
```

### 第 2 步：定义一个无参数 Handler

```jsx
function handleSave() {
  console.log('save clicked');
}
```

### 第 3 步：把函数本身交给 `onClick`

```jsx
<button onClick={handleSave}>保存</button>
```

刷新页面时不应该输出 `save clicked`；只有点击按钮时才输出。

### 第 4 步：定义一个需要参数的函数

```jsx
function handleSelect(orderId) {
  console.log(`selected: ${orderId}`);
}
```

### 第 5 步：使用箭头函数包装参数

```jsx
<button onClick={() => handleSelect('A1024')}>
  选择 A1024
</button>
```

### 第 6 步：对比错误写法

不要真正保留下面代码，只在文档中理解：

```jsx
onClick={handleSelect('A1024')}
```

这会在 Render 时调用。

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：函数引用与箭头函数包装。
- **实验辅助代码**：Console 输出只用于确认函数什么时候执行。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./04-events-and-interactions/kp032-pass-vs-call-function --config ./vite.config.js
```

打开浏览器 Console，分别点击两个按钮。

## 效果验证

你应该能够确认：

1. 页面刚加载时不会执行 `handleSave`。
2. 点击“保存”后才输出日志。
3. `() => handleSelect('A1024')` 可以在点击时再传入参数。
4. 能解释为什么 `onClick={handleClick()}` 不是“把 Handler 交给 React”。
5. 能说明“传函数”与“调用函数”的本质差异。

完成后继续 **RE-KP033：事件冒泡**。
