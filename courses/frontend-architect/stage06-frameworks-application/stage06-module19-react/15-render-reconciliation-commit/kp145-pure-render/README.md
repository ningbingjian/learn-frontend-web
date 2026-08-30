# RE-KP145：Pure Render

> [返回 Chapter 15](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 用“Same Input → Same Output”理解 React 的 Pure Render 要求。
2. 理解 Render 期间不能修改组件调用之前就存在的对象或变量。
3. 区分“修改外部已有对象”和“修改本次 Render 刚创建的局部对象”。
4. 理解 props、state、context 在 Render 中都应视为只读输入。
5. 会把副作用移动到 Event Handler 或 Effect 等正确边界。

> **本节核心代码**：从只读 `products` 派生新的 `visibleItems`，不修改输入对象。  
> **实验辅助代码**：分类按钮仅用于改变合法输入并验证相同输入产生稳定输出。

## 理论讲解

### 1. React 把组件当成纯函数

纯函数有两个关键特征：

```text
1. Same inputs → Same output
2. 不修改调用之前已经存在的外部状态
```

在 React 中输入主要包括：

- props；
- state；
- context。

### 2. Render 中不要修改外部对象

错误示例：

```js
const visibleProducts = [];

function ProductList({ products }) {
  visibleProducts.push(...products);
  return ...;
}
```

组件每次执行都会污染之前存在的数组。

### 3. 不要修改 Props

错误：

```js
products.sort(...);
```

如果 `products` 来自 Props，这会直接修改父级传入对象。

更安全：

```js
const sorted = [...products].sort(...);
```

### 4. Local Mutation 是允许的

如果数组是在本次 Render 内新创建：

```js
const rows = [];
for (const product of products) {
  rows.push(<li key={product.id}>{product.name}</li>);
}
```

这是局部 mutation，没有影响组件函数调用之前存在的对象，因此是安全的。

### 5. Side Effect 不属于 Render

例如：

```js
localStorage.setItem(...)
fetch(...)
analytics.track(...)
document.title = ...
```

这些都改变外部世界，不应该因为组件函数“恰好被调用”就执行。

明确交互放 Event Handler；响应式外部同步才考虑 Effect。

### 6. Purity 给 React 带来的能力

Pure Render 使得 React 可以更安全地：

- 重复调用组件；
- 中止过时 Render；
- 重启 Render；
- 缓存或跳过部分纯计算；
- 在服务端执行组件。

## 动手编码：从 0 到 1

### 第 0 步：准备只读数据

```js
const products = [
  { id: 1, name: 'Keyboard', category: 'hardware' },
  { id: 2, name: 'Mouse', category: 'hardware' },
  { id: 3, name: 'Guide', category: 'book' },
];
```

### 第 1 步：根据输入派生数据

```js
const visibleProducts = category === 'all'
  ? products
  : products.filter(product => product.category === category);
```

不额外保存同步 State。

### 第 2 步：创建当前 Render 的局部 rows

```jsx
const rows = [];
for (const product of visibleProducts) {
  rows.push(<li key={product.id}>{product.name}</li>);
}
```

这个局部数组每次 Render 都重新创建，可以安全 `push`。

### 第 3 步：不要修改 products

不调用：

```js
products.splice(...)
products.sort(...)
```

输入保持只读。

### 第 4 步：通过 State 改变真正输入

```jsx
const [category, setCategory] = useState('all');
```

按钮改变 State，React 用新输入重新调用组件。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：只读输入 + Render 派生 + Local Mutation。
- **实验辅助代码**：分类切换按钮。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./15-render-reconciliation-commit/kp145-pure-render --config ./vite.config.js
```

## 效果验证

1. 切换分类，列表始终由当前 `category` 与 `products` 纯计算得到。
2. `products` 本身从未被修改。
3. `rows.push()` 是安全的，因为 `rows` 是当前 Render 新建的局部数组。
4. 在 StrictMode 下重复 Render 仍不会累积重复数据。
5. 能解释为什么 Pure Render 是后续 Reconciliation / Concurrent Rendering 的基础。

完成后继续 **RE-KP146：Reconciliation 基本目标**。
