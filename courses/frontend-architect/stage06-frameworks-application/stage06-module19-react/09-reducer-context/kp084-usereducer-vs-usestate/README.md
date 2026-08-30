# RE-KP084：Reducer 与 useState 的选择

> [返回 Chapter 09](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useState` 与 `useReducer` 都可以管理组件本地 State。
2. 知道 Reducer 不是 `useState` 的“升级版替代品”。
3. 会根据状态数量、迁移关系、事件处理器复杂度选择工具。
4. 知道简单、独立、局部值通常优先 `useState`。
5. 知道多字段经常一起变化、状态迁移规则复杂时可以考虑 Reducer。
6. 理解同一个组件或功能树可以混合使用两者。

> **本节核心代码**：并排比较一个简单 `useState` Toggle 与一个有关联迁移的 `useReducer` OrderEditor。  
> **实验辅助代码**：示例订单价格只用于让两种 API 的复杂度差异可见。

## 理论讲解

### 1. 两者能力上都能完成本地 State 管理

简单状态：

```jsx
const [open, setOpen] = useState(false);
```

Reducer：

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

很多场景两者都能实现。

真正的选择依据通常是：

```text
哪一种让状态变化更容易理解、修改和调试
```

### 2. 适合 useState 的信号

常见信号：

- 一个或少数几个独立值。
- 更新逻辑短而直接。
- 事件处理器读起来已经很清晰。
- 状态之间没有复杂约束。

例如：

```jsx
const [open, setOpen] = useState(false);
```

没必要为了“统一架构”强行定义：

```text
panel_opened
panel_closed
panel_toggled
```

### 3. 适合考虑 Reducer 的信号

常见信号：

- 多个 State 经常一起变化。
- 一个交互会触发多个字段变化。
- 状态迁移规则散落在多个事件处理器。
- 经常因为忘记同步某个字段出现 Bug。
- 希望把状态逻辑作为纯函数单独阅读或测试。

### 4. Reducer 的成本也是真实存在的

Reducer 通常意味着更多结构：

```text
Action
Reducer
switch/case
Dispatch
```

如果状态本来就很简单，这些结构反而增加阅读成本。

所以：

```text
复杂度足够时再引入 Reducer
```

而不是：

```text
项目大，所以所有 State 都用 Reducer
```

### 5. 可以混合使用

例如一个复杂订单组件：

```text
订单领域状态 → useReducer
本地 hover/open → useState
```

这并不冲突。

State Owner 与工具选择是两个不同问题。

## 动手编码：从 0 到 1

### 第 0 步：写一个简单 Toggle

```jsx
function SimplePanel() {
  const [open, setOpen] = useState(false);
  // ...
}
```

这里只需要一份 Boolean。

### 第 1 步：观察 useState 是否已经足够

事件逻辑：

```jsx
setOpen(current => !current);
```

没有复杂迁移，不需要额外 Reducer。

### 第 2 步：准备一个关联订单 State

```jsx
const initialOrder = {
  quantity: 1,
  shipping: 'standard',
};
```

### 第 3 步：定义订单 Reducer

```jsx
function orderReducer(state, action) {
  switch (action.type) {
    case 'quantity_incremented':
      return { ...state, quantity: state.quantity + 1 };
    case 'shipping_selected':
      return { ...state, shipping: action.shipping };
  }
}
```

### 第 4 步：让事件只 dispatch 意图

```jsx
dispatch({ type: 'shipping_selected', shipping: 'express' });
```

### 第 5 步：并排观察两种方案

页面同时展示：

```text
SimplePanel → useState
OrderEditor → useReducer
```

重点不是比较“哪个更高级”，而是比较“哪个更匹配当前问题复杂度”。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：简单 State 与关联状态分别采用合适工具。
- **实验辅助代码**：订单费用派生值用于观察 Reducer State 更新结果。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./09-reducer-context/kp084-usereducer-vs-usestate --config ./vite.config.js
```

## 效果验证

1. SimplePanel 只用 `useState`，代码保持直接。
2. OrderEditor 用 Reducer 集中数量与配送方式更新。
3. 两者都属于组件本地 State。
4. 能说出至少三个“考虑 Reducer”的信号。
5. 能解释为什么 Reducer 不应该因为“看起来架构化”就无条件使用。

完成后继续 **RE-KP085：复杂状态迁移集中管理**。
