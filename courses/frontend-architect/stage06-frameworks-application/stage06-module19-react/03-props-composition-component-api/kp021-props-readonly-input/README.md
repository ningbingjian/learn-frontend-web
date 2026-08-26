# RE-KP021：Props 作为只读输入

> [返回 Chapter 03](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 说明 Props 是父组件传给子组件的输入。
2. 理解每次 Render 收到的是当前时刻的一份 Props Snapshot。
3. 知道组件不应该直接修改 Props 或 Props 中已经存在的对象。
4. 知道需要不同数据时应计算新值或由上层传入新 Props。
5. 区分“读取 Props”与“修改外部输入对象”。

> **本节核心代码**：`ProductCard({ product, currency })` 只读取输入，并通过局部计算得到展示值。
>
> **实验辅助代码**：基础商品与促销商品两个对象用于制造两份不同 Props Snapshot。

## 理论讲解

### 1. Props 是组件的输入

父组件：

```jsx
<ProductCard product={product} currency="¥" />
```

子组件：

```jsx
function ProductCard({ product, currency }) {
  // ...
}
```

可以先建立：

```text
Parent
  ↓ 传入 Props
Child Component
  ↓ 根据输入计算 JSX
React Element
```

### 2. Props 是只读 Snapshot

React 当前规则明确要求：

> Props 和 State 都应该被当作不可变快照。

这里的“快照”不是说 JavaScript 对象一定被深度冻结，而是组件模型要求：

```text
本次 render 收到什么
       ↓
就基于这份输入计算输出
       ↓
不要在 render 中修改这份外部输入
```

### 3. 不要修改 Props

错误思路：

```jsx
function ProductCard({ product }) {
  product.price = product.price * 0.9;
  return <p>{product.price}</p>;
}
```

问题在于 `product` 可能还被父组件、兄弟组件或其他逻辑共享。

修改它会把一个“读输入”的组件变成对外部世界产生副作用的组件。

### 4. 需要派生值时，创建局部结果

更合理：

```jsx
const formattedPrice = `${currency}${product.price.toFixed(2)}`;
```

如果要形成新的业务对象：

```jsx
const saleProduct = {
  ...product,
  price: product.price * 0.9,
};
```

这是创建新值，而不是改写已有输入。

### 5. Props 改变来自新的 Render

父组件可以先传：

```jsx
<ProductCard product={baseProduct} />
```

也可以传：

```jsx
<ProductCard product={saleProduct} />
```

子组件分别得到两份不同输入。

正确心智模型不是：

```text
子组件把旧 props 改成新 props
```

而是：

```text
父层提供新的输入
   ↓
React 再次 render
   ↓
子组件收到新的 props snapshot
```

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们用同一个 `ProductCard` 渲染两份商品数据，验证组件只读取 Props，不修改输入。

### 第 1 步：创建最小组件

写：

```jsx
function ProductCard({ product, currency }) {
  return <p>{product.name}</p>;
}
```

**本步目标**：让组件只依赖外部输入。

**预期观察**：传不同 `product` 时，页面显示不同名称。

### 第 2 步：加入局部派生值

增加：

```jsx
const formattedPrice = `${currency}${product.price.toFixed(2)}`;
```

再渲染：

```jsx
<strong>{formattedPrice}</strong>
```

**为什么这样写？**

只是读取 `product.price` 并计算字符串，没有改变原对象。

### 第 3 步：在父组件创建基础商品

```jsx
const baseProduct = {
  name: 'Mechanical Keyboard',
  price: 499,
};
```

### 第 4 步：创建新的促销对象

```jsx
const saleProduct = {
  ...baseProduct,
  price: 399,
};
```

**本步观察**：`baseProduct.price` 仍是 `499`，促销值存在另一个对象里。

### 第 5 步：分别传给同一个组件

```jsx
<ProductCard label="Base" product={baseProduct} currency="¥" />
<ProductCard label="Sale" product={saleProduct} currency="¥" />
```

现在同一个组件根据两份 Props Snapshot 得到不同 UI。

### 第 6 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Props 只读、局部派生值、新对象代替修改旧对象。
- **实验辅助代码**：两份商品样本和日志展示只是为了观察输入没有被修改。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./03-props-composition-component-api/kp021-props-readonly-input --config ./vite.config.js
```

## 效果验证

请确认：

1. `ProductCard` 没有修改任何传入对象。
2. 基础价显示 `¥499.00`。
3. 促销价显示 `¥399.00`。
4. `baseProduct.price` 仍然是 `499`。
5. 你能解释为什么 Props 应被视为只读 Snapshot。
