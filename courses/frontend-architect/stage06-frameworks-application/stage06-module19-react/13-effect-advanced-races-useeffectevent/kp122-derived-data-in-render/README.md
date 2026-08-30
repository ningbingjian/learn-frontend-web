# RE-KP122：在 Render 中计算派生值

> [返回 Chapter 13](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 判断一个值是否可以完全由当前 Props / State 推导出来。
2. 理解“派生值”通常不应该再保存成独立 State。
3. 避免用 `useEffect + setState` 同步本来可以直接计算的值。
4. 理解 Render 中的纯计算会随着输入自然得到最新结果。
5. 能解释为什么减少冗余 State 会降低状态不一致风险。

> **本节核心代码**：从 `items` 和 `discountRate` 直接计算 `itemCount`、`subtotal`、`discount`、`total`。  
> **实验辅助代码**：加减商品数量、切换折扣率的按钮只用于制造不同 Render 输入。

## 理论讲解

### 1. 什么是派生值

如果一个值可以由当前已有数据完整计算出来，它就是派生值。

例如购物车已有：

```jsx
const [items, setItems] = useState([...]);
const [discountRate, setDiscountRate] = useState(0.1);
```

那么下面这些值都可以直接计算：

```jsx
const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
const subtotal = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);
const discount = subtotal * discountRate;
const total = subtotal - discount;
```

它们不需要再分别成为 State。

### 2. 为什么不应该用 Effect 同步派生 State

下面是一种常见但多余的写法：

```jsx
const [total, setTotal] = useState(0);

useEffect(() => {
  setTotal(calculateTotal(items, discountRate));
}, [items, discountRate]);
```

问题包括：

1. `items` / `discountRate` 已经是真实数据源，`total` 又复制了一份结果。
2. Render 会先使用旧 `total`，随后 Effect 再 `setTotal`，带来额外 Render。
3. 如果依赖漏写，`total` 可能与真实输入不同步。
4. 状态结构变复杂，但没有增加任何新的业务事实。

### 3. Render 本身就是计算当前 UI 的地方

函数组件每次 Render 都会重新执行组件函数。

所以：

```jsx
const total = subtotal - discount;
```

天然会根据这一轮 Render 的 `subtotal` 和 `discount` 得到当前结果。

不需要额外“监听”它们。

### 4. State 应保存事实，而不是保存所有计算结果

更稳定的模型是：

```text
State:
items
 discountRate

Derived during Render:
itemCount
subtotal
discount
total
```

如果修改商品数量，React 重新 Render，所有派生值自然重新计算。

### 5. 什么时候计算可能需要优化

“应该在 Render 中计算”不等于“所有计算成本都可以忽略”。

如果某个纯计算真的很昂贵，后续可以考虑：

```jsx
useMemo(...)
```

但 `useMemo` 是性能优化，不应该用来把普通派生数据重新变成 State。

本节只建立最重要的默认原则：**先直接计算，确认有性能问题后再优化。**

## 动手编码：从 0 到 1

### 第 0 步：准备最小购物车 State

```jsx
const [items, setItems] = useState(initialItems);
const [discountRate, setDiscountRate] = useState(0.1);
```

此时只保存真正会被用户操作改变的业务输入。

### 第 1 步：计算商品总数量

```jsx
const itemCount = items.reduce(
  (sum, item) => sum + item.quantity,
  0,
);
```

这不是新的业务事实，因此不创建 `itemCount` State。

### 第 2 步：计算小计

```jsx
const subtotal = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);
```

### 第 3 步：继续派生折扣和最终金额

```jsx
const discount = subtotal * discountRate;
const total = subtotal - discount;
```

整个计算链都发生在 Render 中。

### 第 4 步：让用户修改真实 State

```jsx
function changeQuantity(id, delta) {
  setItems(currentItems =>
    currentItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item,
    ),
  );
}
```

修改 `items` 后，新的 Render 会重新得到所有派生值。

### 第 5 步：验证不需要 Effect

最终源码中没有：

```jsx
useEffect(() => {
  setTotal(...);
}, [...]);
```

也没有：

```jsx
const [total, setTotal] = useState(...);
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Render 中根据 `items` / `discountRate` 直接派生汇总数据。
- **实验辅助代码**：商品数量按钮、折扣按钮用于改变输入并观察派生结果自动更新。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./13-effect-advanced-races-useeffectevent/kp122-derived-data-in-render --config ./vite.config.js
```

## 效果验证

1. 点击任意商品的 `+1` / `-1`，数量、小计、折扣和总价同时得到最新结果。
2. 切换 10% / 20% 折扣，总价直接随当前 State 重新计算。
3. 源码没有保存 `subtotal`、`discount`、`total` 等冗余 State。
4. 源码没有为了同步这些派生值使用 Effect。
5. 能解释“State 保存事实，Render 计算派生结果”为什么更不容易失去同步。

完成后继续 **RE-KP123：在事件中处理用户动作**。
