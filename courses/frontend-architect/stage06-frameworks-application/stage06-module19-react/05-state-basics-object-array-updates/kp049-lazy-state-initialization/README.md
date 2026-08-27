# RE-KP049：惰性初始化

> [返回 Chapter 05](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 `useState(expensiveCall())` 与 `useState(expensiveCall)`。
2. 理解把函数作为 initializer 传给 `useState` 的目的。
3. 知道 initializer 只用于初始化 State，而不是每次 Render 都重新作为初始值执行。
4. 能判断什么时候初始化成本值得使用惰性初始化。
5. 知道 StrictMode 开发环境可能额外调用 initializer 来检查纯度，这不等于“每次 Render 都初始化”。
6. 知道 initializer 必须保持纯净。

> **本节核心代码**：`const [catalog] = useState(createInitialCatalog)`。
>
> **实验辅助代码**：初始化日志、搜索输入和 2000 条模拟数据用于制造可观察的初始化成本；真实业务不应为了“显得高级”而人为制造昂贵初始化。

## 理论讲解

### 1. 直接调用函数会发生什么

如果写：

```jsx
const [items] = useState(createInitialCatalog());
```

JavaScript 在调用 `useState` 之前，就必须先执行：

```js
createInitialCatalog()
```

因此组件函数每次执行时，这个函数调用表达式都会先被求值。

即使 React 后续只采用第一次初始化结果，计算成本已经发生了。

### 2. 传函数引用是另一种语义

写：

```jsx
const [items] = useState(createInitialCatalog);
```

这里没有主动调用它，而是把函数本身交给 React。

React 将它视为：

```text
Initializer Function
```

在初始化 State 时调用它，并使用返回值作为初始 State。

### 3. 两种写法不要混淆

```jsx
useState(createInitialCatalog())
```

含义：

```text
现在先执行函数
把执行结果传给 useState
```

而：

```jsx
useState(createInitialCatalog)
```

含义：

```text
把 initializer 函数交给 React
由 React 在初始化时调用
```

### 4. 什么时候需要惰性初始化

初始值只是：

```jsx
useState(0)
useState('')
useState(false)
```

不需要为了形式统一改成函数。

惰性初始化适合：

- 从较大的本地数据计算初始结构。
- 解析一次较重的序列化内容。
- 生成较大的初始数组。
- 其他真正有可测初始化成本的纯计算。

### 5. initializer 必须是纯函数

不要在 initializer 中：

```text
发送请求
修改全局变量作为业务动作
操作 DOM
写入外部系统
```

initializer 应该只根据可用输入计算并返回初始值。

### 6. StrictMode 为什么可能看到两次日志

开发环境使用 `StrictMode` 时，React 可能额外调用 initializer，以帮助发现不纯函数。

所以你可能看到：

```text
createInitialCatalog called
createInitialCatalog called
```

这不代表：

```text
以后每次输入、每次 Render 都会重新初始化两次
```

正确理解是：

```text
开发期纯度检查
≠
每次 Render 的正常初始化流程
```

### 7. 惰性初始化和函数式更新不是一回事

它们都把函数传给 React，但职责不同：

```text
useState(initializer)
→ 计算初始 State

setState(updater)
→ 根据 previous State 计算 next State
```

不要因为“都是函数”就把两者混成一个概念。

---

## 动手编码：从 0 到 1

### 第 0 步：先写一个初始化函数

```jsx
function createInitialCatalog() {
  console.log('createInitialCatalog called');

  return Array.from({ length: 2000 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`
  }));
}
```

### 第 1 步：先写错误成本模型

临时写：

```jsx
const [catalog] = useState(createInitialCatalog());
```

再加入另一个会让组件重新 Render 的输入：

```jsx
const [query, setQuery] = useState('');
```

输入字符并观察 Console。

`createInitialCatalog()` 表达式会在组件执行时被再次求值。

### 第 2 步：改为 initializer function

改成：

```jsx
const [catalog] = useState(createInitialCatalog);
```

现在把函数本身交给 React。

### 第 3 步：加入搜索框制造重新 Render

```jsx
<input
  value={query}
  onChange={event => setQuery(event.target.value)}
/>
```

不断输入，组件会重新 Render，但初始化函数不会因为普通后续 Render 被当作初始值重新执行。

### 第 4 步：只展示前五条结果

```jsx
const visibleItems = catalog
  .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
  .slice(0, 5);
```

避免为了本课一次渲染 2000 个 DOM 节点。

### 第 5 步：观察 StrictMode

最终源码使用 `StrictMode`。

开发环境首次挂载时，如果 Console 看到 initializer 被调用两次，不要误判。

重点继续输入搜索词，观察它不会在每次普通 Render 时再次承担初始化工作。

### 第 6 步：比较 initializer 和 updater

回忆上一课：

```js
setCount(previousCount => previousCount + 1);
```

上一课函数是 updater。

本课：

```js
useState(createInitialCatalog);
```

这里函数是 initializer。

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：把 `createInitialCatalog` 函数本身传给 `useState`。
- **实验辅助代码**：2000 条模拟商品、Console 日志和搜索框用于观察初始化边界。

## 运行案例

```bash
npm run dev -- ./05-state-basics-object-array-updates/kp049-lazy-state-initialization --config ./vite.config.js
```

打开浏览器 Console 配合观察。

## 效果验证

1. 能准确解释 `useState(fn())` 与 `useState(fn)` 的执行差异。
2. 输入搜索词会触发 Render，但不会让 initializer 在每次普通 Render 中重新承担初始计算。
3. 能解释 StrictMode 下开发期可能出现两次 initializer 日志的原因。
4. 能区分 initializer function 和 updater function。
5. 能判断简单常量 State 没有必要强行使用惰性初始化。

完成后继续 **RE-KP050：避免把可推导值存入 State**。
