# RE-KP128：函数依赖导致重复执行

> [返回 Chapter 13](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解组件函数每次 Render 都会重新创建函数对象。
2. 理解为什么把 Render 中新建的函数放进 Effect 依赖可能导致无关 Render 也重新同步。
3. 会优先把只供 Effect 使用的 helper 移到 Effect 内部。
4. 知道 `useCallback` 是工具，但不是修复所有函数依赖问题的第一反应。
5. 能用 Console 对比错误结构和推荐结构的重连次数。

> **本节核心代码**：`BadChatRoom` 依赖 Render 中创建的 `createOptions`；`GoodChatRoom` 把 `createOptions` 移进 Effect，只依赖 `roomId`。  
> **实验辅助代码**：输入框 `message` 仅用于触发与连接配置无关的 Render，帮助观察重连。

## 理论讲解

### 1. JavaScript 函数也是引用值

下面的函数虽然代码文本相同：

```js
function createOptions() {
  return { roomId };
}
```

但组件每次 Render 都会重新执行，因此每次都会得到新的函数对象。

所以：

```js
Object.is(previousCreateOptions, nextCreateOptions)
```

通常是 `false`。

### 2. 函数成为 Effect 依赖后的问题

如果 Effect 写成：

```jsx
function createOptions() {
  return { roomId };
}

useEffect(() => {
  const options = createOptions();
  const connection = createConnection(options);
  connection.connect();
  return () => connection.disconnect();
}, [createOptions]);
```

输入与连接无关的 `message` 也会触发 Render，继而创建新的 `createOptions`，导致 Effect cleanup + setup。

业务上就表现为：**仅仅打字，聊天室却反复断开重连。**

### 3. 优先调整代码结构

如果 `createOptions` 只在 Effect 中使用，最直接的修复是把它移进去：

```jsx
useEffect(() => {
  function createOptions() {
    return { roomId };
  }

  const connection = createConnection(createOptions());
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

这样依赖就回到真正决定连接身份的 `roomId`。

### 4. 为什么不是先用 useCallback

你当然可以：

```jsx
const createOptions = useCallback(() => ({ roomId }), [roomId]);
```

但如果 helper 根本没有必要暴露在 Effect 外，`useCallback` 只是额外引入了一层 memoization 契约。

推荐顺序：

```text
先问：函数能否移到 Effect 内？
→ 能：移动代码，依赖原始 Reactive Value
→ 不能：再判断是否真的需要 useCallback
```

### 5. 不要通过 suppress linter 修复

错误方式：

```jsx
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

这只是让代码与真实依赖失去同步关系。

## 动手编码：从 0 到 1

### 第 0 步：准备 mock connection

创建一个只负责打印 connect / disconnect 的辅助函数：

```jsx
function createConnection(label, options) {
  return {
    connect() {
      console.log(`[${label}] connect`, options);
    },
    disconnect() {
      console.log(`[${label}] disconnect`, options);
    },
  };
}
```

### 第 1 步：写出 BadChatRoom

在 Render 中定义：

```jsx
function createOptions() {
  return { serverUrl, roomId };
}
```

Effect 依赖：

```jsx
[createOptions]
```

### 第 2 步：加入 message State

```jsx
const [message, setMessage] = useState('');
```

输入文字只改变 `message`，并没有改变 `roomId`。

### 第 3 步：观察错误重连

打开 Console，在 Bad 区域输入字符。

每个字符都会看到新的 disconnect / connect。

### 第 4 步：写出 GoodChatRoom

把 `createOptions` 移入 Effect：

```jsx
useEffect(() => {
  function createOptions() {
    return { serverUrl, roomId };
  }

  const connection = createConnection('good', createOptions());
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

### 第 5 步：再次输入

现在只改变 message 时不会重新连接；真正切换 roomId 才会 cleanup + setup。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：函数引用作为依赖的错误结构，以及将 helper 移入 Effect 的修复。
- **实验辅助代码**：两个输入框与 Console 日志只负责制造无关 Render 和观察结果。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./13-effect-advanced-races-useeffectevent/kp128-function-dependency-rerun --config ./vite.config.js
```

## 效果验证

1. BadChatRoom 中输入任意字符都会触发连接重新 setup。
2. GoodChatRoom 中输入字符不会触发连接重新 setup。
3. 切换 `roomId` 时两个组件都会正确重新同步。
4. 能解释问题来自函数引用身份，而不是函数内部返回值看起来一样。
5. 能说明为什么“移动函数到 Effect 内”通常比先用 `useCallback` 更直接。

完成后继续 **RE-KP129：useEffectEvent**。
