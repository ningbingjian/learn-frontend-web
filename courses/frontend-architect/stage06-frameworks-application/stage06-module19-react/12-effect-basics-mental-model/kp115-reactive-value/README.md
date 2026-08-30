# RE-KP115：Reactive Value

> [返回 Chapter 12](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 Props、State 和组件函数体内声明的值为什么属于 Reactive Value。
2. 知道从 Props / State 派生出来的普通变量同样可能是 Reactive Value。
3. 能区分模块级稳定常量与 Render-scope Reactive Value。
4. 会从 Effect 实际读取的值反推依赖数组。
5. 避免只把“看起来像 State 的值”当依赖，而漏掉派生变量。

> **本节核心代码**：`roomId` 是 prop，`region` 是 State，`serverHost` 是 Render 中派生值，它们会随 Render 改变；模块级 `protocol` 不会因 Render 改变。  
> **实验辅助代码**：浏览器标题用于观察当前连接描述。

## 理论讲解

### 1. 什么是 Reactive Value

在 Effect 语境中，Reactive Value 指：

> 可能因为组件重新 Render 而得到不同结果、并被 Effect 读取的值。

典型包括：

- Props；
- State；
- 组件函数体内声明的变量；
- 从 Props / State 计算出的值；
- 组件函数体内声明并被 Effect 使用的函数。

### 2. Props 是 Reactive Value

```jsx
function ConnectionPreview({ roomId }) {
  // roomId may change
}
```

父组件重新传入不同 `roomId`，子组件 Render 会得到新值。

### 3. State 是 Reactive Value

```jsx
const [region, setRegion] = useState('us-east');
```

调用 setter 后，下次 Render 的 `region` 可以不同。

### 4. 普通变量也可能是 Reactive Value

例如：

```jsx
const serverHost = hostByRegion[region];
```

`serverHost` 不是 State，也不是 Prop，但它在组件 Render 中根据 `region` 计算。

所以 `region` 改变后，`serverHost` 也可能改变。

如果 Effect 读取 `serverHost`，它就是 Effect 的 Reactive Value。

### 5. 模块级常量通常不是 Reactive Value

```jsx
const protocol = 'wss';
```

它定义在组件外，不会因为组件 Render 得到另一个值。

因此本节 Effect 可以读取它，却不需要把它放进依赖数组。

### 6. 依赖由代码决定，不是由开发者偏好决定

Effect：

```jsx
useEffect(() => {
  const connectionUrl = `${protocol}://${serverHost}/${roomId}`;
  document.title = connectionUrl;
}, [roomId, serverHost]);
```

这里：

- `roomId`：Reactive → 依赖；
- `serverHost`：Reactive → 依赖；
- `protocol`：模块级稳定值 → 不需要依赖。

## 动手编码：从 0 到 1

### 第 0 步：准备模块级稳定常量

```jsx
const protocol = 'wss';
```

### 第 1 步：让 roomId 从 Props 进入

```jsx
function ConnectionPreview({ roomId }) {
  // ...
}
```

### 第 2 步：加入 region State

```jsx
const [region, setRegion] = useState('us-east');
```

### 第 3 步：在 Render 中派生 serverHost

```jsx
const serverHost = hostByRegion[region];
```

它虽然是普通 `const`，仍随 `region` 变化。

### 第 4 步：Effect 使用 Reactive Value

```jsx
useEffect(() => {
  document.title = `${protocol}://${serverHost}/${roomId}`;
}, [roomId, serverHost]);
```

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：识别 `roomId` / `serverHost` 为 Reactive Value，并正确列入依赖。
- **实验辅助代码**：`document.title` 仅用于观察同步结果。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./12-effect-basics-mental-model/kp115-reactive-value --config ./vite.config.js
```

## 效果验证

1. 切换父组件 `roomId` 后，标题连接地址跟着变化。
2. 切换 `region` 后，派生的 `serverHost` 改变，标题也重新同步。
3. 能解释为什么 `serverHost` 虽然不是 State，仍然是 Reactive Value。
4. 能解释为什么模块级 `protocol` 不需要加入依赖数组。
5. 能从 Effect 代码中逐项指出哪些读取值是 Reactive Value。

完成后继续 **RE-KP116：Cleanup Function**。
