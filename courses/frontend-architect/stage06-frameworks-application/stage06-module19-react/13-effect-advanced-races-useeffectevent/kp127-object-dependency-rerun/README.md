# RE-KP127：对象依赖导致重复执行

> [返回 Chapter 13](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解对象字面量在每次 Render 中都会创建新的引用身份。
2. 理解 Effect 依赖使用 `Object.is` 比较前后值。
3. 识别 `[options]` 这类对象依赖为什么会导致无关 Render 也重新同步。
4. 会优先把只供 Effect 使用的对象移入 Effect 内部。
5. 避免一看到对象依赖就机械使用 `useMemo`。

> **本节核心代码**：并排比较“Render 中创建 `options` + `[options]`”与“Effect 内创建 `options` + `[roomId]`”。  
> **实验辅助代码**：连接对象只在 Console 输出 connect/disconnect，用于观察重同步次数。

## 理论讲解

### 1. 两个内容相同的对象不一定相等

JavaScript 中：

```js
Object.is(
  { roomId: 'general' },
  { roomId: 'general' },
); // false
```

因为它们是两个不同对象引用。

### 2. Render 中的对象字面量每次都会重新创建

```jsx
function ChatRoom({ roomId }) {
  const options = {
    serverUrl: 'https://localhost:1234',
    roomId,
  };

  // ...
}
```

每次 Render 都会得到新的 `options` 对象。

即使里面的字符串完全没变化，引用身份也变了。

### 3. Effect 依赖比较的是值身份

如果写：

```jsx
useEffect(() => {
  const connection = createConnection(options);
  connection.connect();
  return () => connection.disconnect();
}, [options]);
```

那么组件因为无关 `message` State 重新 Render 时：

```text
old options !== new options
```

React 会认为依赖变化，从而：

```text
disconnect
connect
```

### 4. 更好的第一选择：把对象移入 Effect

如果 `options` 只服务于这个 Effect，可以写：

```jsx
useEffect(() => {
  const options = {
    serverUrl: 'https://localhost:1234',
    roomId,
  };

  const connection = createConnection(options);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

现在 Effect 真正响应的是原始 Reactive Value：

```text
roomId
```

### 5. 为什么不优先 useMemo

可以使用：

```jsx
const options = useMemo(() => ({ ... }), [roomId]);
```

来减少对象身份变化。

但如果对象根本没必要存在于 Effect 外部，直接把它移入 Effect 通常更简单，也更接近“依赖应匹配实际同步输入”的目标。

`useMemo` 是性能优化工具，不应成为修复依赖结构的第一反应。

## 动手编码：从 0 到 1

### 第 0 步：创建模拟连接

```jsx
function createConnection(label, options) {
  return {
    connect() {
      console.log(...);
    },
    disconnect() {
      console.log(...);
    },
  };
}
```

Console 只是实验观察工具。

### 第 1 步：写不稳定对象版本

```jsx
const options = {
  serverUrl: 'https://localhost:1234',
  roomId,
};
```

然后：

```jsx
useEffect(() => {
  const connection = createConnection('unstable', options);
  connection.connect();
  return () => connection.disconnect();
}, [options]);
```

### 第 2 步：加入与连接无关的 message State

```jsx
const [message, setMessage] = useState('');
```

输入每个字符都会导致 Render。

由于新 Render 创建新 `options`，连接也被重建。

### 第 3 步：写固定版本

固定版本不在 Render 中创建 `options`：

```jsx
useEffect(() => {
  const options = {
    serverUrl: 'https://localhost:1234',
    roomId,
  };

  const connection = createConnection('fixed', options);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

### 第 4 步：并排渲染两个版本

两个组件都使用同一个 `roomId="general"`，并都有独立消息输入框。

### 第 5 步：观察 Console

在“不稳定对象依赖”输入框中输入：

```text
abc
```

会看到不断 disconnect / connect。

在“固定依赖”输入框输入相同内容，连接不会因为 message 改变而重建。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：对象引用身份导致 `[options]` 变化，以及把对象移入 Effect 后只依赖 `[roomId]`。
- **实验辅助代码**：Console connection 日志用于观察 Effect 是否重新同步。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./13-effect-advanced-races-useeffectevent/kp127-object-dependency-rerun --config ./vite.config.js
```

## 效果验证

1. 打开浏览器 Console。
2. 在左侧“不稳定对象依赖”输入框逐字输入，观察连接不断重建。
3. 在右侧“固定依赖”输入框输入，连接保持不变。
4. 两个版本的 `roomId` 都没有变化。
5. 能解释为什么对象内容相同但引用身份仍可能不同。
6. 能说明为什么把只供 Effect 使用的对象移入 Effect 往往比 `useMemo` 更直接。

完成后继续 **RE-KP128：函数依赖导致重复执行**。
