# RE-KP048：函数式更新

> [返回 Chapter 05](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分“直接传下一状态”和“传 updater function”两种 setter 用法。
2. 理解 updater function 接收前一个待处理 State，并返回下一 State。
3. 在下一状态依赖前一状态时正确使用 `prev => next`。
4. 会用 updater function 表达连续多次更新。
5. 知道 updater 必须保持纯净，不能在里面做副作用或 mutation。

> **本节核心代码**：`setCount(previousCount => previousCount + 1)`。
>
> **实验辅助代码**：`+3` 按钮只是为了让连续 updater 的价值变得可观察；Batching、Snapshot 和 Update Queue 会在 Chapter 06 专门深入。

## 理论讲解

### 1. setter 可以接收一个值

最常见：

```js
setCount(count + 1);
```

这里先根据当前 Render 里的 `count` 算出一个值，再把这个值交给 setter。

### 2. setter 也可以接收一个函数

另一种写法：

```js
setCount(previousCount => previousCount + 1);
```

这个函数叫：

```text
Updater Function
```

React 会把“前一个状态”交给 updater，updater 返回下一状态。

### 3. 什么时候优先用 updater

当下一状态明确依赖前一状态时：

```text
下一计数 = 前一计数 + 1
```

updater 可以直接表达这个关系：

```js
setCount(count => count + 1);
```

尤其是在同一个交互里连续更新时更重要。

### 4. 连续三次更新

可以写：

```js
setCount(count => count + 1);
setCount(count => count + 1);
setCount(count => count + 1);
```

每个 updater 都表达：

```text
拿到前一次待处理结果
        ↓
再 +1
```

最终可以稳定表达 `+3`。

### 5. 为什么参数名可以叫任何东西

下面都可以：

```js
setCount(c => c + 1);
setCount(prev => prev + 1);
setCount(previousCount => previousCount + 1);
```

参数名只是 JavaScript 变量名。

推荐使用能表达语义的名字。

### 6. Updater 必须是纯函数

不要：

```js
setItems(items => {
  items.push(newItem);
  sendAnalytics();
  return items;
});
```

updater 应该只做：

```text
输入 previousState
      ↓
计算
      ↓
返回 nextState
```

副作用应该放在事件处理器或合适的 Effect 中，而不是 updater 内。

### 7. 不要在本节提前背更新队列内部细节

目前只需要掌握：

```text
下一状态依赖前一状态
→ 可以把 updater 交给 setter
```

至于为什么同一次事件中的多次更新会形成队列、React 如何批处理，会在 Chapter 06 系统学习。

---

## 动手编码：从 0 到 1

### 第 0 步：创建计数 State

```jsx
const [count, setCount] = useState(0);
```

### 第 1 步：实现普通 +1

```jsx
function incrementOnce() {
  setCount(count + 1);
}
```

这个例子可以正常工作。

### 第 2 步：改写为 updater

```jsx
function incrementOnceWithUpdater() {
  setCount(previousCount => previousCount + 1);
}
```

结果同样是 +1。

### 第 3 步：实现 +3

```jsx
function incrementThree() {
  setCount(previousCount => previousCount + 1);
  setCount(previousCount => previousCount + 1);
  setCount(previousCount => previousCount + 1);
}
```

点击一次，最终值增加 3。

### 第 4 步：理解每一行表达的语义

不是：

```text
三行都读取当前变量 count
```

而是每个 updater 都告诉 React：

```text
给我前一个待处理状态
我返回它 +1
```

### 第 5 步：给 updater 换一个参数名

临时改成：

```js
setCount(c => c + 1);
```

确认行为不变。

### 第 6 步：不要在 updater 里打印业务日志或请求网络

例如不要把：

```js
fetch('/api/log')
```

放进 updater。

本节保持 updater 纯净。

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`previousCount => previousCount + 1`。
- **实验辅助代码**：`+3` 按钮用于验证连续 updater。

## 运行案例

```bash
npm run dev -- ./05-state-basics-object-array-updates/kp048-functional-state-updates --config ./vite.config.js
```

## 效果验证

1. 点击“+1”增加 1。
2. 点击“+3（updater）”一次增加 3。
3. 能解释 updater 参数代表什么。
4. 能判断“下一状态依赖前一状态”是使用 updater 的典型信号。
5. 能解释为什么 updater 中不应做 mutation 和副作用。

完成后继续 **RE-KP049：惰性初始化**。
