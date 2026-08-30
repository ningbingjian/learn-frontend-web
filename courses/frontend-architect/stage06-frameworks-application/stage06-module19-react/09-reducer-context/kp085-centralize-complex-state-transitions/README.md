# RE-KP085：复杂状态迁移集中管理

> [返回 Chapter 09](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解复杂 Reducer 的核心价值是集中状态迁移规则，而不是减少代码行数。
2. 会把业务不变量放到统一 Reducer 中维护。
3. 会让事件处理器只 dispatch “发生了什么”。
4. 能阻止非法状态转换，例如订单提交后继续修改数量。
5. 会从 Reducer 中派生稳定、可读的状态转换表。
6. 知道复杂状态逻辑可以单独测试 Reducer，而不必先操作完整 UI。

> **本节核心代码**：`orderReducer` 集中维护 editing / submitted 状态下允许的订单变化。  
> **实验辅助代码**：固定价格与优惠码按钮用于触发不同状态转换。

## 理论讲解

### 1. 真正复杂的地方通常是“迁移规则”

一个订单可能包含：

```text
quantity
shipping
coupon
status
error
```

如果每个事件处理器都自己修改这些字段：

```text
handleQuantityChange
handleShippingChange
handleCoupon
handleSubmit
handleReset
```

久而久之很容易出现：

```text
某个 Handler 忘记检查 status
某个 Handler 更新 coupon 却忘记清 error
提交后仍能继续修改订单
```

### 2. Reducer 可以成为状态迁移的唯一入口

事件处理器只报告：

```jsx
dispatch({ type: 'quantity_changed', quantity: 3 });
```

Reducer 统一判断：

```jsx
if (state.status !== 'editing') {
  return state;
}
```

这样所有数量变化都共享同一条约束。

### 3. 不变量应该集中维护

例如数量必须：

```text
1 <= quantity <= 5
```

可以在 Reducer 中统一：

```jsx
const quantity = Math.max(1, Math.min(5, action.quantity));
```

而不是要求每个按钮、输入框都记住这个规则。

### 4. 状态转换比字段赋值更重要

订单流程：

```text
editing
  ↓ submit
submitted
  ↓ edit_again
editing
```

当状态是 `submitted` 时：

```text
quantity_changed → 忽略
shipping_selected → 忽略
coupon_applied → 忽略
```

这些规则集中在 Reducer 后更容易审查。

### 5. Reducer 让事件处理器更接近用户意图

事件处理器：

```jsx
function handleSubmit() {
  dispatch({ type: 'submitted' });
}
```

而不是：

```jsx
setStatus('submitted');
setError('');
setLocked(true);
```

Reducer 决定一次 `submitted` Action 到底意味着哪些 State 字段一起变化。

### 6. 集中并不意味着全部状态都塞进 Reducer

例如按钮 hover、临时 tooltip 等纯局部 UI State，如果与订单领域迁移无关，可以继续放在局部组件。

Reducer 应围绕：

```text
一组真正相关、需要共同维护不变量的状态
```

## 动手编码：从 0 到 1

### 第 0 步：定义领域 State

```jsx
const initialOrder = {
  status: 'editing',
  quantity: 1,
  shipping: 'standard',
  coupon: null,
  error: '',
};
```

### 第 1 步：先限制可编辑阶段

```jsx
function isLocked(state) {
  return state.status !== 'editing';
}
```

Reducer 的编辑类分支统一检查这个条件。

### 第 2 步：集中数量不变量

```jsx
case 'quantity_changed': {
  if (state.status !== 'editing') return state;

  return {
    ...state,
    quantity: Math.max(1, Math.min(5, action.quantity)),
  };
}
```

### 第 3 步：集中优惠码规则

```jsx
case 'coupon_applied':
```

Reducer 根据 `action.code` 决定：

```text
SAVE10 → coupon='SAVE10', error=''
其他   → coupon=null, error='优惠码无效'
```

### 第 4 步：提交时整体迁移

```jsx
case 'submitted':
  return {
    ...state,
    status: 'submitted',
    error: '',
  };
```

### 第 5 步：提交后阻止编辑

所有编辑 Action 在 `submitted` 阶段都直接返回当前 State。

UI 也把编辑控件 `disabled`，但真正的领域防线仍在 Reducer。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：集中维护状态迁移与不变量的 `orderReducer`。
- **实验辅助代码**：固定商品价格与优惠码快捷按钮用于触发规则。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./09-reducer-context/kp085-centralize-complex-state-transitions --config ./vite.config.js
```

## 效果验证

1. 数量永远被限制在 1～5。
2. 无效优惠码会统一产生错误信息。
3. 提交后数量、配送和优惠码编辑被锁定。
4. 点击“继续编辑”后恢复 `editing`，领域数据保留。
5. 所有关键业务规则都集中在 Reducer，而不是散落在多个 Handler。
6. 能根据 Action 列表画出订单的状态迁移图。

完成后继续 **RE-KP086：createContext**。
