# RE-KP027：Render Prop 模式的历史与适用场景

> [返回 Chapter 03](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 准确定义 Render Prop：一个“值是函数，并由组件调用来决定部分 UI”的普通 Prop。
2. 理解 Render Prop 为什么曾经广泛用于复用状态/行为逻辑。
3. 知道 Hooks 出现后，很多业务逻辑复用场景不再必须使用 Render Prop。
4. 知道 Render Prop 仍适合“组件掌握数据/上下文，但调用者决定怎么渲染”的 API。
5. 能避免把每个普通函数 Prop 都误称为 Render Prop。

> **本节核心代码**：`ProductList({ items, renderItem })` 在内部调用 `renderItem(item, index)`，由父组件决定每一项的 UI。
>
> **实验辅助代码**：商品数组、价格格式和列表标签只用于展示模式本身。

## 理论讲解

### 1. Render Prop 到底是什么

React 官方当前仍然使用“render prop”这个术语。

最小形态：

```jsx
function List({ items, renderItem }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}
```

调用：

```jsx
<List
  items={products}
  renderItem={(product) => <strong>{product.name}</strong>}
/>
```

`renderItem` 没有特殊 React 类型：

```text
它只是一个普通 Prop
      ↓
Prop 的值恰好是函数
      ↓
组件在渲染期间调用它
      ↓
函数返回 React node
```

### 2. 为什么叫 Render Prop

因为它回答的是：

> “这一块 UI 应该怎么渲染？”

普通行为回调可能是：

```jsx
onSave={() => saveOrder()}
```

它的目的主要是“发生某件事时执行行为”。

Render Prop 更接近：

```jsx
renderItem={(item) => <ProductRow product={item} />}
```

它返回 UI。

### 3. 历史上为什么 Render Prop 很重要

Hooks 出现以前，函数组件很难像今天这样抽取带状态的复用逻辑。

生态里常见：

```text
Higher-Order Component
Render Prop
```

用来共享：

```text
鼠标位置
窗口尺寸
订阅结果
表单状态
数据加载状态
```

例如组件内部掌握某个状态，再通过函数把状态暴露给调用者，让调用者决定 UI。

### 4. Hooks 之后为什么它没消失

Hooks 解决的是很多“组件逻辑复用”问题，但 Render Prop 解决的并不只有逻辑复用。

例如一个列表组件内部负责：

```text
遍历顺序
索引
数据来源
列表骨架
```

调用者只想决定：

```text
每一行长什么样
```

这时：

```jsx
renderItem={(item, index) => ...}
```

仍然是很直接的组件 API。

React 当前文档也会把 render prop 作为 `Children` 操作、`cloneElement` 等某些脆弱模式的替代方案之一。

### 5. Render Prop 与 `children` Function

有些 API 写成：

```jsx
<DataSource>
  {(data) => <Dashboard data={data} />}
</DataSource>
```

这里 `children` 本身是函数。

它在思想上也属于 Render Prop 风格，只是函数放在 `children` 里。

但不要默认把 `children` 当函数调用：普通 `children` 通常就是 React node。只有组件 API 明确约定 `children` 是函数时才这样做。

### 6. Render Prop 的代价

如果层层嵌套：

```jsx
<A render={(a) => (
  <B render={(b) => (
    <C render={(c) => (...) } />
  )} />
)} />
```

会形成明显的嵌套和可读性问题。

所以现代项目一般不会为了“模式”而主动把所有逻辑都改成 Render Prop。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们做一个 `ProductList`：

```text
ProductList 负责：
- 遍历商品
- 提供 item + index
- 列表结构

调用者负责：
- 每个商品具体渲染成什么
```

### 第 1 步：先创建固定渲染列表

创建 `src/main.jsx`：

```jsx
function ProductList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

这个版本的问题是：`ProductList` 同时决定了数据遍历和具体内容。

### 第 2 步：新增 `renderItem`

改成：

```jsx
function ProductList({ items, renderItem }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}
```

现在 `ProductList` 不再知道一行里面必须出现什么字段。

### 第 3 步：第一次传入 Render Prop

调用：

```jsx
<ProductList
  items={products}
  renderItem={(product, index) => (
    <span>{index + 1}. {product.name}</span>
  )}
/>
```

此时：

```text
ProductList
提供 item/index

renderItem
决定 UI
```

### 第 4 步：换一种渲染方式验证 API

再渲染一次：

```jsx
<ProductList
  items={products}
  renderItem={(product) => (
    <strong>{product.name} · ¥{product.price}</strong>
  )}
/>
```

`ProductList` 源码不需要修改。

### 第 5 步：对比行为回调

把：

```text
renderItem
```

和未来会学的：

```text
onClick
onSave
```

区分开：

```text
renderItem → 返回 UI
onClick    → 响应交互执行行为
```

### 第 6 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

本节总结：

- **本节核心代码**：函数 Prop `renderItem`，以及组件内部调用它并把局部数据传给调用者。
- **实验辅助代码**：商品数组、两个不同列表展示只是为了证明“数据控制”和“渲染控制”可以分开。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./03-props-composition-component-api/kp027-render-prop-pattern --config ./vite.config.js
```

构建验证：

```bash
npm run build -- ./03-props-composition-component-api/kp027-render-prop-pattern --config ./vite.config.js
```

## 效果验证

完成后请确认：

1. `renderItem` 是普通函数 Prop，不是特殊 React API。
2. `ProductList` 可以保持不变，而父组件提供两套完全不同的行 UI。
3. 能解释为什么它叫 Render Prop，而普通 `onSave` 不一定叫 Render Prop。
4. 能说明 Hooks 出现后 Render Prop 为什么减少，但没有失效。
5. 能说明 Render Prop 层层嵌套会带来什么可读性问题。
6. 知道只有 API 明确约定时，才应该把 `children` 当函数调用。

完成后继续 **RE-KP028：组件拆分的职责边界**。
