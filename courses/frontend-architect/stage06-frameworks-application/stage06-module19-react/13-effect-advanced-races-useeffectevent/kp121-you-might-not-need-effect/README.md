# RE-KP121：You Might Not Need an Effect

> [返回 Chapter 13](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 把 Effect 视为 Escape Hatch，而不是默认数据流工具。
2. 识别“根据 props/state 计算显示数据”通常不需要 Effect。
3. 识别“因为用户点击而发生的动作”通常应放在 Event Handler。
4. 理解 `Effect + setState` 保存派生值会产生额外 Render。
5. 能通过删除不必要 Effect 简化组件。

> **本节核心代码**：`visibleProducts` 直接在 Render 中由 `products + query + showInStockOnly` 计算。  
> **实验辅助代码**：商品数据和筛选控件用于对比“派生值”与“外部同步”。

## 理论讲解

### 1. Effect 是 Escape Hatch

Effect 适用于：

```text
React ↔ 浏览器 API
React ↔ 网络连接
React ↔ 第三方组件
React ↔ 订阅 / Timer / Observer
```

如果没有外部系统，应该先怀疑是否根本不需要 Effect。

### 2. 派生数据不要 Effect + State

反例：

```jsx
const [visibleProducts, setVisibleProducts] = useState([]);

useEffect(() => {
  setVisibleProducts(filterProducts(products, query));
}, [products, query]);
```

这里 `visibleProducts` 完全可以由当前 Render 的输入计算。

Effect 版本会经历：

```text
Render old visibleProducts
→ Commit
→ Effect
→ setVisibleProducts
→ Render again
```

### 3. 直接在 Render 中计算

推荐：

```jsx
const visibleProducts = products.filter(...);
```

当输入变化时，组件本来就会重新 Render，所以计算自然得到最新结果。

### 4. 用户动作也通常不需要 Effect

如果逻辑发生的原因是：

```text
用户点击购买
用户提交表单
用户按下保存
```

把逻辑放在对应 Event Handler 中通常更准确。

Effect 只能知道“状态变化了”，却可能丢失“用户具体做了什么”的语义。

### 5. 删除 Effect 的收益

通常包括：

```text
更少 State
更少 Render pass
更少依赖数组
更少同步 Bug
更清楚的因果关系
```

### 6. 不是说 Effect 不重要

如果真的存在外部系统，Effect 仍然是正确工具。

关键问题不是：

```text
我能不能用 Effect？
```

而是：

```text
这段逻辑为什么需要在组件显示/响应式值变化后与 React 外部同步？
```

## 动手编码：从 0 到 1

### 第 0 步：准备商品数据

模块级常量：

```jsx
const products = [...];
```

它不是 Reactive Value。

### 第 1 步：创建筛选条件 State

```jsx
const [query, setQuery] = useState('');
const [showInStockOnly, setShowInStockOnly] = useState(false);
```

### 第 2 步：不要创建 visibleProducts State

不写：

```jsx
const [visibleProducts, setVisibleProducts] = useState([]);
```

### 第 3 步：Render 中直接派生

```jsx
const visibleProducts = products.filter(product => {
  const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
  const matchesStock = !showInStockOnly || product.inStock;
  return matchesQuery && matchesStock;
});
```

### 第 4 步：渲染结果

输入变化会触发 Render，筛选结果自然重新计算。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Render 中派生 `visibleProducts`。
- **实验辅助代码**：静态 products 与输入控件。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./13-effect-advanced-races-useeffectevent/kp121-you-might-not-need-effect --config ./vite.config.js
```

## 效果验证

1. 输入搜索词，列表立即根据当前 Render 输入变化。
2. 切换“仅库存”后结果正确。
3. 源码没有 `useEffect`。
4. 源码没有重复的 `visibleProducts` State。
5. 能解释为什么这里删除 Effect 比优化 Effect 更正确。
6. 能列出至少三个真正需要 Effect 的外部同步场景。

完成后继续 **RE-KP122：在 Render 中计算派生值**。
