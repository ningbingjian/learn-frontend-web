# RE-KP112：Effect 与 Render 的区别

> [返回 Chapter 12](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分 Render 阶段的纯计算和 Effect 阶段的外部同步。
2. 能把可从 Props / State 直接计算出的派生值留在 Render 中。
3. 识别“用 Effect + State 同步派生数据”的冗余模式。
4. 理解 Render 可以重复执行，因此 Render 中不应产生外部副作用。
5. 会把同一需求拆成“React 内部计算”和“React 外部同步”两部分。

> **本节核心代码**：`visibleProducts` 在 Render 中直接计算；只有 `document.title` 使用 Effect 同步。  
> **实验辅助代码**：产品数组和搜索框只是用来观察两类逻辑的职责差异。

## 理论讲解

### 1. Render 的任务：根据输入计算 UI

Render 的理想模型是纯函数：

```text
Props + State
    ↓
  Render
    ↓
   JSX
```

例如：

```jsx
const visibleProducts = products.filter(product =>
  product.name.toLowerCase().includes(query.toLowerCase()),
);
```

这是 React 内部数据的派生计算，不需要 Effect。

### 2. 常见反模式：用 Effect 保存派生值

不推荐：

```jsx
const [visibleProducts, setVisibleProducts] = useState([]);

useEffect(() => {
  setVisibleProducts(filterProducts(products, query));
}, [products, query]);
```

问题是：

1. Render 已经拿到了 `products` 和 `query`；
2. 第一次 Render 后才运行 Effect；
3. Effect 又 setState；
4. 产生第二次 Render；
5. 还多维护了一份可推导 State。

### 3. Effect 的任务：同步 React 之外

如果要把当前搜索状态同步到浏览器标题：

```jsx
useEffect(() => {
  document.title = `找到 ${visibleCount} 项：${query || '全部'}`;
}, [query, visibleCount]);
```

这里才需要 Effect，因为 `document.title` 不属于 JSX 纯计算结果。

### 4. 一个组件里可以同时存在 Render 逻辑和 Effect

正确结构：

```text
query
  ├─ Render → visibleProducts → JSX
  └─ Effect → document.title
```

不是“用了 Effect 就说明组件不纯”，而是：

- 组件 Render 本身保持纯计算；
- 外部同步明确隔离到 Effect。

### 5. 先问“有没有外部系统”

判断是否需要 Effect 时，可以先问：

> 如果删除这个 Effect，我只是少算了一个 React 内部值，还是失去了与浏览器 / 网络 / 第三方系统的同步？

如果只是少算一个派生值，通常应该先考虑 Render 计算。

## 动手编码：从 0 到 1

### 第 0 步：准备产品数据

```jsx
const products = [
  { id: 1, name: 'React Handbook' },
  { id: 2, name: 'JavaScript Guide' },
  { id: 3, name: 'CSS Architecture' },
];
```

### 第 1 步：保存唯一事实 query

```jsx
const [query, setQuery] = useState('');
```

`query` 是用户输入事实，应该存 State。

### 第 2 步：在 Render 中派生过滤结果

```jsx
const visibleProducts = products.filter(product =>
  product.name.toLowerCase().includes(query.toLowerCase()),
);
```

不要额外创建 `visibleProducts` State。

### 第 3 步：直接渲染派生结果

```jsx
<ul>
  {visibleProducts.map(product => (
    <li key={product.id}>{product.name}</li>
  ))}
</ul>
```

### 第 4 步：识别真正的外部系统需求

现在增加浏览器标题同步：

```jsx
const visibleCount = visibleProducts.length;

useEffect(() => {
  document.title = `找到 ${visibleCount} 项：${query || '全部'}`;
}, [query, visibleCount]);
```

这部分才是 Effect。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Render 中派生 `visibleProducts`，Effect 只同步 `document.title`。
- **实验辅助代码**：产品列表和输入框只是观察载体。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./12-effect-basics-mental-model/kp112-effect-vs-render --config ./vite.config.js
```

## 效果验证

1. 输入 `react` 后，列表立即由 Render 计算出匹配项。
2. 代码中没有保存 `visibleProducts` 的额外 State。
3. 浏览器标题会同步当前查询和结果数量。
4. 能指出“过滤列表”为什么属于 Render，而“修改 document.title”为什么属于 Effect。
5. 能解释为什么用 Effect + setState 维护派生值通常会多一次 Render。

完成后继续 **RE-KP113：Effect 与 Event 的区别**。
