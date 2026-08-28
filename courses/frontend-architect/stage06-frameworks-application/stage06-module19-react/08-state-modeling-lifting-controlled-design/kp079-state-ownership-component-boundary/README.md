# RE-KP079：状态归属与组件边界

> [返回 Chapter 08](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 State owner 应与能维护业务不变量的组件边界匹配。
2. 区分“领域事实 owner”与“纯展示/输入组件”。
3. 会让子组件通过 callback 提交变化意图，而不是各自复制领域 State。
4. 会把派生结果留在 Render 中计算，避免重复事实。
5. 能判断组件拆分是否正在破坏状态一致性。

> **本节核心代码**：`OrderWorkspace` 独占订单事实，`QuantityEditor` / `ShippingSelector` 受控，`OrderSummary` 只派生展示。  
> **实验辅助代码**：固定价格和运费规则用于观察领域 owner 如何维护不变量。

## 理论讲解

### 1. State owner 不只是“放得离消费者近”

还要问：

```text
谁有能力维护这份事实的业务规则？
```

例如订单里：

```text
quantity >= 1
shippingMethod ∈ 合法选项
总价由 quantity + shippingMethod 推导
```

如果数量、配送方式分别被不同子组件各自保存一份，父级很难保证整个订单一致。

### 2. 领域 owner

可以让：

```text
OrderWorkspace
├─ quantity
├─ shippingMethod
├─ QuantityEditor
├─ ShippingSelector
└─ OrderSummary
```

`OrderWorkspace` 是订单这组事实的 owner。

### 3. 子组件负责输入，不一定拥有事实

例如：

```jsx
<QuantityEditor
  value={order.quantity}
  onChange={handleQuantityChange}
/>
```

子组件负责：

```text
展示输入
收集用户意图
```

父级负责：

```text
校验
更新领域 State
维护不变量
```

### 4. 派生值不要再存一份

总价：

```js
const total =
  unitPrice * order.quantity +
  shippingPrice;
```

它可以由现有 State 直接计算，就不应该再维护：

```text
order.total
```

否则 quantity 改了但 total 忘记同步，就出现矛盾 State。

### 5. 组件边界应该帮助约束状态

好的组件边界：

```text
领域 owner 维护事实
输入组件报告意图
展示组件读取事实
派生值即时计算
```

坏的边界往往表现为：

```text
多个子组件各存一份相同领域事实
然后用 Effect / callback 互相同步
```

## 动手编码：从 0 到 1

### 第 0 步：建立订单事实

```jsx
const [order, setOrder] = useState({
  quantity: 1,
  shippingMethod: 'standard',
});
```

**本步目标**：建立领域 owner。  
**为什么这样写**：数量和配送方式共同属于订单。  
**运行后观察**：订单事实只有一份。

### 第 1 步：建立受控数量编辑器

```jsx
function QuantityEditor({ value, onChange }) {
  // ...
}
```

**本步目标**：让子组件不复制 quantity State。  
**为什么这样写**：领域事实由 OrderWorkspace 维护。  
**运行后观察**：输入变化通过 callback 回到父级。

### 第 2 步：父级维护数量不变量

```jsx
function handleQuantityChange(nextQuantity) {
  const safeQuantity = Math.max(1, nextQuantity);
  setOrder({ ...order, quantity: safeQuantity });
}
```

**本步目标**：把规则放在 owner。  
**为什么这样写**：所有修改入口共享同一约束。  
**运行后观察**：数量不会低于 1。

### 第 3 步：加入配送方式选择

```jsx
<ShippingSelector
  value={order.shippingMethod}
  onChange={handleShippingChange}
/>
```

**本步目标**：第二个子组件消费同一领域 State。  
**为什么这样写**：两个输入仍由同一订单 owner 统一管理。  
**运行后观察**：配送方式变化会更新父级订单。

### 第 4 步：Render 中派生总价

```jsx
const shippingPrice = order.shippingMethod === 'express' ? 30 : 0;
const total = unitPrice * order.quantity + shippingPrice;
```

**本步目标**：避免冗余 State。  
**为什么这样写**：总价完全可以从已有事实推导。  
**运行后观察**：数量/配送变化后总价自动一致。

### 第 5 步：加入纯展示 Summary

```jsx
<OrderSummary order={order} total={total} />
```

**本步目标**：让展示组件不成为第二 owner。  
**为什么这样写**：Summary 只读取，不维护业务事实。  
**运行后观察**：所有 UI 始终来自同一订单事实。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：领域 State owner、受控子组件、父级不变量和派生值。
- **实验辅助代码**：固定单价与运费规则。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./08-state-modeling-lifting-controlled-design/kp079-state-ownership-component-boundary --config ./vite.config.js
```

## 效果验证

1. quantity / shippingMethod 只在 OrderWorkspace 中保存。
2. 两个输入组件都通过 Props + callback 工作。
3. quantity 不会低于 1。
4. total 不作为 State 保存，但始终正确更新。
5. 能解释为什么组件边界应围绕状态不变量和 owner 设计。

完成后继续 **RE-KP080：有限状态思维**。
