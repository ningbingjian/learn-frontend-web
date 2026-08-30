# RE-KP083：Reducer 必须保持纯净

> [返回 Chapter 09](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 Reducer 必须是纯函数。
2. 知道 Reducer 不能直接修改传入的 State。
3. 会使用对象/数组不可变更新返回下一份 State。
4. 知道请求、计时器、日志上报等副作用不应该放在 Reducer 中。
5. 理解 StrictMode 开发环境可能额外调用 Reducer 来帮助发现不纯逻辑。
6. 能判断“生成 ID”应该发生在事件处理器还是 Reducer 内。

> **本节核心代码**：`cartReducer(state, action)` 只根据输入计算并返回下一份 State。  
> **实验辅助代码**：商品按钮和 `nextId` 只用于制造 Action；`nextId++` 发生在事件处理器中，而不是 Reducer 内。

## 理论讲解

### 1. 什么叫纯 Reducer

Reducer 的核心形式是：

```js
nextState = reducer(state, action)
```

纯函数要求：

```text
相同 state + 相同 action
        ↓
得到等价 nextState
```

它不应该偷偷依赖或修改外部世界。

### 2. 不要直接修改 State

错误示例：

```jsx
function reducer(items, action) {
  items.push(action.item);
  return items;
}
```

这里直接修改了传入数组。

正确方向：

```jsx
return [
  ...items,
  action.item,
];
```

对象同样应该通过 spread、`map`、`filter` 等方式创建下一份结构。

### 3. Reducer 中不要执行副作用

不应该放入 Reducer：

```text
fetch(...)
setTimeout(...)
localStorage.setItem(...)
document.title = ...
发送埋点
随机生成业务 ID
```

Reducer 的职责是：

```text
根据 State + Action 计算 nextState
```

### 4. 副作用放在哪里

用户点击按钮时，可以在事件处理器中：

```jsx
const id = nextId++;

dispatch({
  type: 'item_added',
  id,
  name: 'Keyboard',
});
```

然后 Reducer 只消费已经准备好的 Action：

```jsx
case 'item_added':
  return [
    ...items,
    { id: action.id, name: action.name, quantity: 1 },
  ];
```

这样 Reducer 不需要自己生成随机数据。

### 5. 为什么 StrictMode 会帮助发现问题

在开发环境 StrictMode 下，React 可能额外调用 Reducer 来检查纯度。

如果 Reducer 直接：

```js
state.items.push(...)
```

额外执行更容易让重复修改暴露出来。

纯 Reducer 即使被调用额外一次，其计算逻辑也不会产生额外外部副作用。

### 6. Pure 不等于“必须返回同一个引用”

Reducer 通常应该在数据变化时返回新结构：

```jsx
return state.map(...);
```

纯函数关注的是：

```text
不修改输入
不产生副作用
同样输入得到等价结果
```

不是要求对象引用必须相同。

## 动手编码：从 0 到 1

### 第 0 步：准备初始购物车

```jsx
const initialCart = [];
```

### 第 1 步：定义纯 Reducer

```jsx
function cartReducer(cart, action) {
  switch (action.type) {
    case 'item_added':
      return [
        ...cart,
        {
          id: action.id,
          name: action.name,
          quantity: 1,
        },
      ];
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}
```

### 第 2 步：不要在 Reducer 内生成 ID

不要写：

```jsx
id: nextId++
```

放在 Reducer 返回值内部。

### 第 3 步：在事件处理器准备 Action

```jsx
function handleAdd(name) {
  dispatch({
    type: 'item_added',
    id: nextId++,
    name,
  });
}
```

### 第 4 步：更新数量也返回新数组/对象

```jsx
case 'quantity_incremented':
  return cart.map(item =>
    item.id === action.id
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  );
```

### 第 5 步：清空时返回新合法 State

```jsx
case 'cart_cleared':
  return [];
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：纯 `cartReducer` 与不可变更新。
- **实验辅助代码**：`nextId` 以及添加商品按钮属于事件侧实验代码。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./09-reducer-context/kp083-pure-reducer --config ./vite.config.js
```

## 效果验证

1. 添加商品不会直接修改旧购物车数组。
2. 增加数量会创建新的数组和被修改商品对象。
3. Reducer 中没有请求、计时器、DOM 或 ID 生成副作用。
4. 在 StrictMode 下操作不会因为 Reducer 纯度问题制造重复商品。
5. 能解释为什么 Action 的 ID 应在事件处理器准备好后再 dispatch。

完成后继续 **RE-KP084：Reducer 与 useState 的选择**。
