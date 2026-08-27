# RE-KP037：事件与 Effect 的职责区别

> [返回 Chapter 04](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 根据“为什么这段逻辑要执行”区分 Event Handler 与 Effect。
2. 理解 Event Handler 由某次具体交互触发，不会因为相关值后来变化就自动重跑。
3. 理解 Effect 用于组件显示后与外部系统保持同步，并会根据依赖的响应式值重新同步。
4. 能判断“用户点击购买”应该放事件里，而“页面标题跟随当前选择”更适合用 Effect 同步。
5. 知道 Effect 的依赖、清理、竞态等细节将在后续 Effect 专章系统学习。

> **本节核心代码**：同一组件中用 Event Handler 表达“用户刚刚做了什么”，用 `useEffect` 表达“当前状态需要与外部系统同步什么”。  
> **实验辅助代码**：`document.title` 是一个简单外部系统，用来直观展示同步概念。

## 理论讲解

### 1. 最关键的问题：为什么要执行

不要先问：

```text
这段代码能不能放 useEffect？
```

先问：

```text
这段逻辑为什么应该发生？
```

如果答案是：

> 因为用户刚刚点击了“购买”。

通常属于 Event Handler。

如果答案是：

> 因为组件当前显示的是这个商品，需要让浏览器标题与它保持同步。

通常属于 Effect。

### 2. Event Handler 是交互驱动

例如：

```jsx
function handleBuy() {
  console.log(`buy requested: ${product}`);
}
```

只有真正点击：

```jsx
<button onClick={handleBuy}>购买</button>
```

这次业务动作才应该发生。

如果用户只是切换主题、父组件重新渲染，购买动作不应该自动重复。

### 3. Effect 是同步驱动

例如浏览器标题应该始终反映当前商品：

```jsx
useEffect(() => {
  document.title = `当前商品：${product}`;
}, [product]);
```

当 `product` 改变时，需要重新同步外部系统：

```text
React State = Keyboard
document.title = 当前商品：Keyboard

product 改为 Monitor
      ↓
Effect 重新同步
      ↓
document.title = 当前商品：Monitor
```

### 4. Event 不“响应式重跑”

事件处理器可以读取 State：

```jsx
function handleBuy() {
  console.log(product);
}
```

但当 `product` 改变时，React 不会因为这个值变化就自动执行一次 `handleBuy()`。

只有用户再次点击，Handler 才会执行。

### 5. Effect 的代码是为同步而存在

Effect 更适合连接：

```text
浏览器 API
网络连接
第三方 Widget
订阅
计时器
其他 React 之外的系统
```

但不要理解成：

```text
凡是异步代码都必须放 Effect
```

用户点击按钮后发起一个请求，仍然可能天然属于事件逻辑，因为它是由这次点击造成的。

### 6. 常见错误：把用户动作搬进 Effect

例如：

```jsx
useEffect(() => {
  if (shouldBuy) {
    buyProduct();
  }
}, [shouldBuy]);
```

如果“购买”的真实原因是用户点击按钮，这种绕一层 State 再用 Effect 触发业务动作，会让因果关系变得不直观。

更直接的是：

```jsx
function handleBuy() {
  buyProduct();
}
```

### 7. 本节不展开 Effect 生命周期

后续会专门学习：

```text
依赖数组
Cleanup
StrictMode 下重新执行
竞态
AbortController
useEffectEvent
```

这一课只建立选择原则：

```text
具体用户动作
→ Event Handler

因组件当前状态需要和外部系统保持同步
→ Effect
```

## 动手编码：从 0 到 1

### 第 0 步：创建当前商品 State

```jsx
const [product, setProduct] = useState('Keyboard');
```

### 第 1 步：切换商品属于用户事件

```jsx
function handleProductChange(event) {
  setProduct(event.target.value);
}
```

### 第 2 步：购买也是用户事件

```jsx
function handleBuy() {
  console.log(`buy requested: ${product}`);
}
```

切换商品不会自动执行购买；必须点击按钮。

### 第 3 步：让浏览器标题和当前商品同步

```jsx
useEffect(() => {
  document.title = `当前商品：${product}`;
}, [product]);
```

### 第 4 步：加入最小 Cleanup

保存进入 Effect 前的标题：

```jsx
useEffect(() => {
  const previousTitle = document.title;
  document.title = `当前商品：${product}`;

  return () => {
    document.title = previousTitle;
  };
}, [product]);
```

本节不深入 Cleanup，只知道 Effect 可以负责解除自己建立的外部同步。

### 第 5 步：观察两种触发机制

切换商品：

```text
Event Handler 更新 product
        ↓
Effect 因 product 变化重新同步 document.title
```

点击购买：

```text
Event Handler 直接记录购买动作
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`handleBuy` 与 `useEffect(document.title...)` 的职责对照。
- **实验辅助代码**：商品选择器和 Console 用于制造可观察行为。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./04-events-and-interactions/kp037-events-vs-effects --config ./vite.config.js
```

## 效果验证

1. 切换商品后页面标题自动同步。
2. 切换商品不会自动输出“购买”日志。
3. 只有点击购买按钮时才执行购买 Handler。
4. 能解释 Event Handler 为什么是“交互驱动”，Effect 为什么是“同步驱动”。
5. 能说明异步本身不是判断 Event / Effect 的唯一标准。

完成后继续 **RE-KP038：Synthetic Event 的现代认知**。
