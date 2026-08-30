# RE-KP144：组件函数为什么可以重复执行

> [返回 Chapter 15](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 React 可能多次调用组件函数，而组件必须保持正确。
2. 理解 StrictMode 在开发环境中的额外调用是检测不纯 Render 的工具，而非生产语义。
3. 理解 Pure Render 让 React 可以放弃、重试或重新计算 Render。
4. 识别“组件函数调用一次就永久产生一次业务副作用”的错误假设。
5. 会把用户动作放 Event Handler，把外部同步放 Effect，而不是 Render。

> **本节核心代码**：纯 `PriceSummary` 可以被重复调用而不改变外部世界。  
> **实验辅助代码**：`StrictMode` 与 Console Log 用于观察开发环境中的重复调用。

## 理论讲解

### 1. 组件不是“一次性生命周期函数”

不要把 Function Component 理解成：

```text
页面出现一次 → 函数只运行一次
```

State、Props、Context 更新都可能再次触发 Render。

### 2. StrictMode 会在开发环境额外调用组件

React StrictMode 会在开发模式下额外调用组件函数，帮助暴露不纯计算。

因此下面这种写法非常危险：

```js
let renderCount = 0;

function BadComponent() {
  renderCount += 1;
  // ...
}
```

它修改了 Render 之前就存在的外部变量。

### 3. Pure Function 为什么经得起重复执行

纯组件具备：

```text
Same inputs → Same JSX
No external mutation during render
```

所以调用一次、两次，甚至重新计算后丢弃结果，都不会改变外部系统。

### 4. React 需要这种自由

保持 Render 纯净可以让 React：

- 在开发期重复调用检查问题；
- 在性能优化中跳过或缓存纯计算；
- 当某次 Render 过时时重新开始计算；
- 在不同运行环境执行组件，例如服务器。

### 5. 副作用放到正确边界

明确点击导致的操作：

```jsx
<button onClick={handleBuy}>购买</button>
```

外部系统同步：

```jsx
useEffect(() => {
  // sync external system
}, [dependency]);
```

都比在组件函数顶部直接执行副作用可靠。

## 动手编码：从 0 到 1

### 第 0 步：创建纯 PriceSummary

```jsx
function PriceSummary({ price, quantity }) {
  const total = price * quantity;
  return <p>Total: ${total}</p>;
}
```

### 第 1 步：加入观察日志

```js
console.log('[render] PriceSummary', { price, quantity });
```

Console 是调试观察，不是业务 mutation。

### 第 2 步：用 StrictMode 包裹根组件

```jsx
<StrictMode>
  <App />
</StrictMode>
```

开发环境中可以观察额外 Render 调用。

### 第 3 步：改变 quantity

每次更新 quantity，组件都会使用新输入重新计算 total。

### 第 4 步：加入 unrelated note

即使产品数据没变，上层更新也可能使组件函数再次执行。

正确性不应依赖“它不会再被调用”。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：重复执行仍正确的纯组件。
- **实验辅助代码**：StrictMode / Console / unrelated State。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./15-render-reconciliation-commit/kp144-component-function-repeatable --config ./vite.config.js
```

## 效果验证

1. 开发环境 Console 中可观察重复 Render 调用。
2. 无论组件函数执行多少次，页面总价只由当前 `price * quantity` 决定。
3. 输入 unrelated note 不会制造业务副作用。
4. 能解释为什么“重复调用组件函数”要求 Render 保持纯净。

完成后继续 **RE-KP145：Pure Render**。
