# RE-KP114：Effect 依赖数组

> [返回 Chapter 12](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解依赖数组描述 Effect 读取的 Reactive Value，而不是任意选择运行时机。
2. 能区分省略依赖数组、空数组和显式依赖数组三种形式。
3. 知道 React 使用 `Object.is` 比较前后依赖值。
4. 会让 Effect 只因真正读取的 Reactive Value 变化而重新同步。
5. 避免为了“只跑一次”而删除实际依赖。

> **本节核心代码**：Effect 读取 `roomId` 与 `serverUrl`，因此依赖数组写成 `[roomId, serverUrl]`。  
> **实验辅助代码**：`draft` State 用来验证无关 State 改变不会要求该 Effect 重新同步。

## 理论讲解

### 1. 三种依赖数组形式

省略：

```jsx
useEffect(() => {
  // ...
});
```

表示组件每次 Commit 后都重新运行 Effect。

空数组：

```jsx
useEffect(() => {
  // ...
}, []);
```

表示 Effect 没有读取会随 Render 改变的 Reactive Value。

显式依赖：

```jsx
useEffect(() => {
  // use roomId
}, [roomId]);
```

表示当 `roomId` 与上一次不同，需要重新同步。

### 2. 依赖数组不是“生命周期模式选择器”

错误思路：

```text
我想只执行一次
→ 写 []
```

正确思路：

```text
Effect 代码读取了哪些 Reactive Value？
→ 这些值决定依赖
```

### 3. React 使用 Object.is 比较依赖

对于：

```jsx
[roomId, serverUrl]
```

React 会把每一项与上一次对应项通过 `Object.is` 比较。

如果都相同，就不需要因为依赖变化重新同步。

### 4. 无关 State 不应该被硬塞进依赖

本节还有：

```jsx
const [draft, setDraft] = useState('');
```

但 Effect 根本没读取 `draft`：

```jsx
useEffect(() => {
  document.title = `${serverUrl} / ${roomId}`;
}, [roomId, serverUrl]);
```

因此 `draft` 不是这个 Effect 的依赖。

### 5. 不要通过压制依赖制造 stale closure

如果 Effect 读取了：

```jsx
serverUrl
```

却故意写：

```jsx
[roomId]
```

那么 Effect 可能继续使用旧的 `serverUrl`。

正确做法是改变代码结构，而不是欺骗依赖规则。

## 动手编码：从 0 到 1

### 第 0 步：准备两个同步输入

```jsx
const [roomId, setRoomId] = useState('general');
const [serverUrl, setServerUrl] = useState('https://chat.example.com');
```

### 第 1 步：Effect 同时读取两个值

```jsx
useEffect(() => {
  document.title = `${serverUrl} / ${roomId}`;
}, [roomId, serverUrl]);
```

### 第 2 步：加入无关 draft State

```jsx
const [draft, setDraft] = useState('');
```

它只用于页面输入，不被 Effect 读取。

### 第 3 步：验证依赖边界

修改：

- `roomId` → 需要重新同步标题；
- `serverUrl` → 需要重新同步标题；
- `draft` → 只重新 Render 页面，不改变 Effect 的依赖语义。

### 第 4 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`[roomId, serverUrl]` 与 Effect 读取值严格对应。
- **实验辅助代码**：`draft` 用来制造无关 Render。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./12-effect-basics-mental-model/kp114-effect-dependency-array --config ./vite.config.js
```

## 效果验证

1. 修改房间或服务器地址后，浏览器标题同步变化。
2. 修改草稿文本不会改变标题内容。
3. 能解释省略依赖数组、`[]`、`[deps]` 的语义差异。
4. 能说出 React 使用 `Object.is` 比较依赖。
5. 能解释为什么“我想只跑一次”不是删除真实依赖的理由。

完成后继续 **RE-KP115：Reactive Value**。
