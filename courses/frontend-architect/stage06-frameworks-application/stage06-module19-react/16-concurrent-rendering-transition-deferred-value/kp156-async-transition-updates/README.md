# RE-KP156：Transition 中的异步更新

> [返回 Chapter 16](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 React 19 可以把 async function 传给 `startTransition`。
2. 理解 `await` 之前与之后的 Transition 标记边界。
3. 掌握当前版本中 `await` 后再次调用 `startTransition` 的写法。
4. 保持受控输入更新为普通 Urgent Update。
5. 能解释为什么这是当前已知限制，而不是推荐的永久嵌套模式。

> **本节核心代码**：外层 async Action 包含异步请求，`await` 后的 `setSavedPrice` 再放入内层 `startTransition`。  
> **实验辅助代码**：`savePrice()` 用 `setTimeout` 模拟服务端保存。

## 理论讲解

### 1. React 19 支持 async Action

可以写：

```jsx
startTransition(async () => {
  const result = await saveSomething();
  // ...
});
```

这使 Transition 不只覆盖同步 Render，还可以表达异步业务流程。

### 2. 关键限制：await 后 React 当前会丢失 Transition scope

容易写错：

```jsx
startTransition(async () => {
  const serverPrice = await savePrice(nextPrice);
  setSavedPrice(serverPrice); // 当前不会自动被标记为 Transition
});
```

React 官方把这列为当前限制。

### 3. 当前正确写法：await 后再包一次

```jsx
startTransition(async () => {
  const serverPrice = await savePrice(nextPrice);

  startTransition(() => {
    setSavedPrice(serverPrice);
  });
});
```

外层负责异步 Action 的 pending 生命周期，内层重新标记 `await` 后的 State Update。

### 4. 这不是 setTimeout 技巧

`savePrice()` 使用 `setTimeout` 只是模拟网络延迟。

真正知识点是：

```text
startTransition(async Action)
        ↓
      await
        ↓
再次 startTransition(setState)
```

### 5. 输入仍然不能做 Transition

```jsx
onChange={event => setDraftPrice(event.target.value)}
```

草稿输入需要立即回显，因此仍是 Urgent Update。

## 动手编码：从 0 到 1

### 第 0 步：准备草稿与已保存 State

```jsx
const [draftPrice, setDraftPrice] = useState('99');
const [savedPrice, setSavedPrice] = useState(99);
```

### 第 1 步：准备模拟异步保存

```jsx
function savePrice(price) {
  return new Promise(resolve => {
    setTimeout(() => resolve(price), 800);
  });
}
```

### 第 2 步：启动 async Action

```jsx
startTransition(async () => {
  const serverPrice = await savePrice(nextPrice);
});
```

此时 Transition 可以跟踪异步 Action 的 pending 过程。

### 第 3 步：识别错误写法

不要假设：

```jsx
setSavedPrice(serverPrice);
```

在 `await` 后仍会自动继承 Transition 标记。

### 第 4 步：重新标记 await 后更新

```jsx
startTransition(() => {
  setSavedPrice(serverPrice);
});
```

### 第 5 步：用 isPending 展示整个流程

```jsx
<button disabled={isPending}>
  {isPending ? '保存中…' : '保存'}
</button>
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：async Action + `await` 后嵌套 `startTransition`。
- **实验辅助代码**：本地 Promise 只模拟服务器响应。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./16-concurrent-rendering-transition-deferred-value/kp156-async-transition-updates --config ./vite.config.js
```

## 效果验证

1. 修改草稿价格时输入立即回显。
2. 点击保存后 `isPending` 为 true。
3. 约 800ms 后已保存价格更新。
4. 能写出当前版本 `await` 后再次 `startTransition` 的正确模式。
5. 能说明该嵌套来自当前 async context 限制，而不是为了“多一层更高级”。

完成后继续 **RE-KP157：Action 与 Transition 的关系**。
