# RE-KP052：事件处理器闭包与快照

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BUILD-LAB` + `BROWSER-MECHANISM-LAB` |
| 学习深度 | **Must** |
| 前置课程 | RE-KP051：每次 Render 都得到状态快照 |
| 本课主问题 | 事件发生在 Render 之后，Handler 为什么仍能读取那次 Render 的 State？ |
| Learning Artifact | 可运行 Handler + Console 闭包观察 |
| 本课暂时不用理解 | 异步回调、Stale Closure、Updater Queue |

## 文档目录

- [这节课只需要搞懂什么](#这节课只需要搞懂什么)
- [前置状态](#前置状态)
- [本课主问题](#本课主问题)
- [先预测](#先预测)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [图解与心智模型](#图解与心智模型)
- [理论收束](#理论收束)
- [Wrong Way 与边界](#wrong-way-与边界)
- [Production Boundary](#production-boundary)
- [本课只记住 3 件事](#本课只记住-3-件事)
- [Challenge](#challenge)
- [Mastery Check](#mastery-check)

## 这节课只需要搞懂什么

1. Handler 是某一次组件 Render 执行期间创建的普通 JavaScript 函数。
2. JavaScript Closure 让它能访问那次 Render 中的 `number`。
3. 新 Render 会创建基于新 Snapshot 的新 Handler。

## 前置状态

上一课已经观察到：

```jsx
setNumber(number + 1);
console.log(number);
```

setter 后的 `number` 仍属于当前 Render Snapshot。

现在问题变成：**用户点击发生在组件函数执行之后，为什么 Handler 还能读到 `number`？**

## 本课主问题

组件函数早就返回 JSX 了：

```jsx
function App() {
  const [number, setNumber] = useState(0);

  function handleIncrease() {
    console.log(number);
  }

  return <button onClick={handleIncrease}>增加</button>;
}
```

用户可能几秒后才点击按钮。

那时 `App()` 这次调用已经结束，`handleIncrease` 为什么还能访问 `number`？

## 先预测

假设：

```text
Render #1：number = 0
```

点击 Handler 内：

```jsx
console.log(number);
setNumber(number + 1);
console.log(number);
```

预测两个日志：

```text
第一次：?
第二次：?
```

然后再想一个问题：页面更新为 1 后**下一次点击**会打印多少？

## 动手编码：从 0 到 1

### Step 0：在组件函数里定义 Handler

```jsx
function App() {
  const [number, setNumber] = useState(0);

  function handleIncrease() {
    console.log(number);
  }

  return <button onClick={handleIncrease}>增加</button>;
}
```

**当前问题**：Handler 并不是 React 特殊对象，它只是 JavaScript 函数。

它能读 `number`，首先是因为 JavaScript 允许函数访问外层词法作用域。

这时先给普通 JS 能力命名：**Closure（闭包）**。

---

### Step 1：记录 Handler 开始时看到的值

加入：

```jsx
console.log('Handler 开始时捕获的 number：', number);
```

第一次从 0 点击：

```text
Handler 开始时捕获的 number：0
```

现在可以把关系写成：

```text
Render #1
number = 0
   ↓ 创建
handleIncrease #1
   ↓ Closure
可以读取 number = 0
```

---

### Step 2：请求下一次 State

继续：

```jsx
const nextNumber = number + 1;
setNumber(nextNumber);
```

页面最后会变成 1。

但我们还没验证当前这个 Handler 的闭包有没有变化。

---

### Step 3：setter 后再次读取闭包变量

最终 Handler：

```jsx
function handleIncrease() {
  console.log('Handler 开始时捕获的 number：', number);

  const nextNumber = number + 1;
  setNumber(nextNumber);

  console.log('调用 setter 后，闭包里的 number：', number);
  console.log('本次 Handler 计算出的 nextNumber：', nextNumber);
}
```

第一次点击实际观察：

```text
Handler 开始时捕获的 number：0
调用 setter 后，闭包里的 number：0
本次 Handler 计算出的 nextNumber：1
```

### 立即解释

React Snapshot 和 JavaScript Closure 在这里组合：

```text
React：这次 Render 给 number = 0
JavaScript：这次 Render 创建的 Handler 闭包访问这个 number
```

setter 不会把这个已经创建好的闭包里的 Snapshot 原地改掉。

---

### Step 4：再点击一次，观察“新 Handler”

第一次更新完成后：

```text
Render #2：number = 1
```

组件函数再次执行，也再次创建 `handleIncrease`。

第二次点击会看到：

```text
Handler 开始时捕获的 number：1
调用 setter 后，闭包里的 number：1
nextNumber：2
```

因此更准确的模型是：

```text
Render #1 → Handler #1 → 看 0
Render #2 → Handler #2 → 看 1
Render #3 → Handler #3 → 看 2
```

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp052-event-handler-closure-snapshot --config ./vite.config.js
```

最终源码：[`src/main.jsx`](./src/main.jsx)

## 图解与心智模型

```text
               React State
                   │
          ┌────────┴────────┐
          │                 │
     Render #1          Render #2
     number = 0         number = 1
          │                 │
          ↓                 ↓
   Handler #1         Handler #2
   Closure → 0        Closure → 1
```

注意：这里不是 React “缓存旧函数”。

真正的根因是：

```text
每次 Render 有自己的值
+
每次 Render 创建的函数有自己的词法环境
```

## 理论收束

### 一句话

> Event Handler 是 Render 时创建的 JavaScript 函数，它通过 Closure 读取该 Render 可见的 Props / State。

### Snapshot 和 Closure 的分工

| 问题 | 谁负责解释 |
|---|---|
| 为什么这次 Render 的 `number` 是固定的 | React State Snapshot |
| 为什么 Handler 之后还能访问 `number` | JavaScript Closure |
| 为什么下一次点击能看到新值 | 新 Render 创建了基于新 Snapshot 的 Handler |

### 不要和 updater 参数混淆

```jsx
setNumber(previousNumber => previousNumber + 1);
```

这里的 `previousNumber` 是 React 处理 Update Queue 时传给 updater 的 pending state。

它不是“Handler 闭包里的 `number` 换了一个名字”。

## Wrong Way 与边界

### Wrong Way 1：把 Closure 当 React 专属机制

Closure 是 JavaScript 语言能力，React 只是大量依赖函数和词法作用域，所以它在 React 中非常重要。

### Wrong Way 2：认为 Handler 永远拿第一次 Render 的值

正常情况下，新 Render 会创建新 Handler，后续交互会使用新 Render 的逻辑。

真正的 “Stale Closure” 要到异步 / 长生命周期回调中才会暴露，RE-KP059～060 专门处理。

## Production Boundary

理解这节课后，后面看到下面问题时不要只说“React 有缓存”：

- timer 为什么读到旧 State；
- async callback 为什么看到旧 Props；
- Effect 为什么需要完整依赖；
- event listener 为什么可能 stale。

先问：**这个函数是哪一次 Render 创建的？它闭包里有哪些 Reactive Values？**

## 本课只记住 3 件事

1. **Handler 是 Render 时创建的普通 JavaScript 函数。**
2. **Closure 让它访问创建时那次 Render 的 Snapshot。**
3. **新 Render 会产生基于新值的新函数环境。**

## Challenge

在 Handler 中加入：

```jsx
const label = `render-value:${number}`;
console.log(label);
setNumber(number + 1);
console.log(label);
```

预测两个 `label` 是否一样。

再解释：为什么一个普通局部字符串也体现了“本次 Render 的计算结果不会被 setter 原地改变”。

## Mastery Check

### Must

- 能解释 Handler 为什么可以读取 State。
- 能解释 setter 前后闭包里的 `number` 为什么相同。

### Should

- 能区分 Closure Snapshot 与 updater pending state。
- 能画出 `Render #1 → Handler #1`、`Render #2 → Handler #2`。

### Expert

- 能用这个模型分析异步回调、Effect Dependency 与 Stale Closure，而不是把问题归因于“React 缓存旧值”。

## 最终源码与代码边界

- **本节核心代码**：Handler 闭包读取 `number`。
- **实验辅助代码**：Console 与 `nextNumber` 用于暴露闭包中的 Snapshot。
- **最终源码**：[`src/main.jsx`](./src/main.jsx)

完成后继续 **RE-KP053：同一事件中的自动批处理**。
