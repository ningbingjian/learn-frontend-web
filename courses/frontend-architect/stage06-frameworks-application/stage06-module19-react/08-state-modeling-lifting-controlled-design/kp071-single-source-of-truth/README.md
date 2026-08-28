# RE-KP071：Single Source of Truth

> [返回 Chapter 08](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 正确解释 React 中“Single Source of Truth”的含义。
2. 理解它不是“整个应用只能有一个 State 对象”。
3. 知道每一份独立状态都应该有一个明确 owner。
4. 能识别同一事实被复制到多个 State 中造成的同步风险。
5. 会从一个真实 State 推导多个 UI 视图，而不是继续复制 State。
6. 能区分“业务事实”与“由业务事实计算出来的展示值”。

> **本节核心代码**：只保存 `selectedId`，通过 `products.find(...)` 推导当前商品，并让详情、摘要等多个视图共享同一个事实来源。  
> **实验辅助代码**：静态商品数组与价格格式化只用于制造多个消费者，不是本节核心。

## 理论讲解

### 1. Single Source of Truth 不是“全局只有一个 State”

React 应用里可以有很多 State：

```text
搜索框文字
当前展开面板
购物车数量
登录用户
某个局部弹窗是否打开
```

Single Source of Truth 的意思是：

```text
对于每一份独立的信息
明确选择一个组件作为 owner
```

不是：

```text
所有状态都必须放 App 顶层
所有状态都必须放 Redux
所有状态都必须合并成一个对象
```

### 2. 重复保存同一事实为什么危险

假设商品选择同时保存：

```jsx
const [selectedId, setSelectedId] = useState(1);
const [selectedName, setSelectedName] = useState('Keyboard');
const [selectedPrice, setSelectedPrice] = useState(99);
```

这三个 State 描述的其实是同一事实：

```text
当前选择的是哪一个商品
```

每次切换都必须同时更新三份数据。

只要漏掉一个：

```text
selectedId = 2
selectedName = "Mouse"
selectedPrice = 99  ← 旧值
```

UI 就进入矛盾状态。

### 3. 更好的模型：只保存最小事实

如果商品数据已经存在：

```js
const products = [
  { id: 1, name: 'Keyboard', price: 99 },
  { id: 2, name: 'Mouse', price: 49 }
];
```

State 只需要：

```jsx
const [selectedId, setSelectedId] = useState(1);
```

Render 时推导：

```js
const selectedProduct = products.find(
  product => product.id === selectedId
);
```

于是：

```text
selectedId
   ↓
selectedProduct
   ↓
name / price / summary / details
```

只有一个真正可变的事实来源。

### 4. Derived Value 不需要成为第二份 State

例如：

```js
const summary = `${selectedProduct.name} - $${selectedProduct.price}`;
```

`summary` 是纯推导值。

只要 `selectedId` 变化，下一次 Render 会重新计算。

这和 RE-KP050“避免冗余 State”属于同一原则，但本节更关注：

```text
谁拥有这份状态
多个组件如何共同依赖这份状态
```

### 5. 一个 owner，可以有很多消费者

State owner：

```text
ProductExplorer
```

消费者可以是：

```text
ProductList
ProductDetails
CheckoutSummary
```

它们都不需要各自复制 `selectedProduct` State。

父组件把：

```text
当前值
事件回调
```

通过 Props 传下去即可。

### 6. 状态应该尽量靠近真正需要它的组件

Single Source of Truth 不等于“越高越好”。

如果只有一个叶子组件需要：

```text
hover 状态
临时输入草稿
局部展开状态
```

它完全可以留在局部。

只有当多个组件必须协调同一事实时，才需要考虑把 owner 放到共同可见的位置。

下一节“状态提升”会专门实践这一点。

## 动手编码：从 0 到 1

### 第 0 步：准备商品数据

```js
const products = [
  { id: 1, name: 'Keyboard', price: 99 },
  { id: 2, name: 'Mouse', price: 49 },
  { id: 3, name: 'Monitor', price: 299 }
];
```

### 第 1 步：只保存 `selectedId`

```jsx
const [selectedId, setSelectedId] = useState(products[0].id);
```

本节不保存：

```text
selectedName
selectedPrice
selectedSummary
```

### 第 2 步：Render 中推导商品

```js
const selectedProduct = products.find(
  product => product.id === selectedId
);
```

**为什么这样写**：商品对象可以由 `selectedId + products` 唯一确定。

### 第 3 步：让列表只负责触发选择

```jsx
function ProductList({ products, selectedId, onSelect }) {
  return products.map(product => (
    <button key={product.id} onClick={() => onSelect(product.id)}>
      {product.name}
    </button>
  ));
}
```

`ProductList` 不拥有“当前选择”这份 State。

### 第 4 步：让详情和摘要消费同一个对象

```jsx
<ProductDetails product={selectedProduct} />
<CheckoutSummary product={selectedProduct} />
```

两个视图永远来自同一个 `selectedProduct`。

### 第 5 步：验证不会发生同步漂移

快速切换商品。

观察：

```text
列表选中项
详情名称/价格
结算摘要
```

永远保持一致。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：最小事实 `selectedId` + Render 推导 + 多消费者共享。
- **实验辅助代码**：商品静态数组与展示文案。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./08-state-modeling-lifting-controlled-design/kp071-single-source-of-truth --config ./vite.config.js
```

## 效果验证

1. 任意切换商品。
2. 详情与摘要始终同步。
3. 源码中只有 `selectedId` 是选择相关 State。
4. 能解释为什么 `selectedProduct` 不需要再次存 State。
5. 能说清 Single Source of Truth 是“每份状态一个明确 owner”，不是“整个应用只有一个状态仓库”。

完成后继续 **RE-KP072：状态提升**。
