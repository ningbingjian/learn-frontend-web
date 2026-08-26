# RE-KP028：组件拆分的职责边界

> [返回 Chapter 03](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用“职责”和“领域概念”而不是单纯代码行数判断是否拆组件。
2. 识别重复 UI、独立业务概念、复杂分支和独立演进作为拆分信号。
3. 知道组件过大和组件过碎都会降低维护性。
4. 能区分“提取一个有名字的职责”与“为了拆而拆”。
5. 能为一个订单卡片设计清晰的组件边界。

> **本节核心代码**：`OrderHeader`、`CustomerSummary`、`PriceSummary` 按业务职责拆分，由 `OrderCard` 负责组合。
>
> **实验辅助代码**：订单静态对象和展示文本只用于观察拆分后的依赖方向。

## 理论讲解

### 1. 组件拆分不是“超过 100 行就拆”

常见误区：

```text
20 行 = 小组件 = 好
200 行 = 大组件 = 坏
```

代码行数可以提醒你检查，但不是最稳定的判断标准。

更重要的问题是：

```text
这个组件现在承担了几个不同职责？
这些部分是否会独立变化？
它们是否有清晰的领域名称？
```

### 2. 什么是好的拆分信号

#### 信号 A：出现可命名的领域概念

例如订单页面里有：

```text
订单头部
客户摘要
价格摘要
```

这些名字本身就能形成组件：

```jsx
<OrderHeader />
<CustomerSummary />
<PriceSummary />
```

#### 信号 B：某一块拥有独立输入

例如：

```text
CustomerSummary 只需要 customer
PriceSummary    只需要 pricing
```

这说明它们可以拥有更窄的 Props API。

#### 信号 C：某一块会被重复使用

重复并不是唯一理由，但真实重复经常说明存在可复用职责。

#### 信号 D：某一块拥有复杂的分支或交互

如果一个局部区域未来会独立增加状态、事件或测试，它通常值得拥有组件边界。

### 3. 什么叫过度拆分

下面这种拆法未必提高可读性：

```jsx
function OrderId({ value }) {
  return <span>{value}</span>;
}

function OrderIdWrapper({ value }) {
  return <OrderId value={value} />;
}
```

如果没有独立职责、复用、语义或行为，只增加一层跳转，可能属于过度拆分。

### 4. 好的组件边界会缩小输入

拆分前：

```jsx
<OrderCard order={order} />
```

内部所有代码都能碰完整 `order`。

拆分后：

```jsx
<OrderHeader id={order.id} status={order.status} />
<CustomerSummary customer={order.customer} />
<PriceSummary pricing={order.pricing} />
```

每个子组件只看到它需要的数据。

这会让职责边界更清楚。

### 5. 父组件负责组合，不等于父组件“没用”

拆完后 `OrderCard` 可能只剩：

```jsx
function OrderCard({ order }) {
  return (
    <article>
      <OrderHeader ... />
      <CustomerSummary ... />
      <PriceSummary ... />
    </article>
  );
}
```

它仍然有重要职责：

> 决定这些业务部分如何组合成一个完整订单卡片。

### 6. 不要按技术层机械拆分

例如：

```text
AllTexts.jsx
AllButtons.jsx
AllLists.jsx
```

通常不如围绕业务语义：

```text
OrderHeader
CustomerSummary
PriceSummary
```

更容易理解。

React 组件最终服务的是 UI 和业务职责，不是为了把每种 HTML 标签分别放进不同文件。

## 动手编码：从 0 到 1

### 第 0 步：准备订单数据

我们使用：

```js
const order = {
  id: 'A1024',
  status: '待发货',
  customer: { name: 'Ada', level: 'Gold' },
  pricing: { subtotal: 499, shipping: 0 },
};
```

### 第 1 步：先写一个单体 `OrderCard`

最初全部放进去：

```jsx
function OrderCard({ order }) {
  return (
    <article>
      <h2>订单 {order.id}</h2>
      <p>{order.status}</p>
      <p>{order.customer.name}</p>
      <p>{order.customer.level}</p>
      <p>小计：¥{order.pricing.subtotal}</p>
      <p>运费：¥{order.pricing.shipping}</p>
    </article>
  );
}
```

这段不算“错误”，但已经能看出三个业务区域。

### 第 2 步：提取 `OrderHeader`

```jsx
function OrderHeader({ id, status }) {
  return (
    <header>
      <h2>订单 {id}</h2>
      <p>{status}</p>
    </header>
  );
}
```

它只处理订单标识和状态。

### 第 3 步：提取 `CustomerSummary`

```jsx
function CustomerSummary({ customer }) {
  return (
    <section>
      <h3>客户</h3>
      <p>{customer.name} · {customer.level}</p>
    </section>
  );
}
```

这个组件不需要知道价格。

### 第 4 步：提取 `PriceSummary`

```jsx
function PriceSummary({ pricing }) {
  const total = pricing.subtotal + pricing.shipping;

  return (
    <section>
      <h3>金额</h3>
      <p>合计：¥{total}</p>
    </section>
  );
}
```

金额计算和显示集中在价格职责中。

### 第 5 步：让 `OrderCard` 回到组合职责

最终：

```jsx
function OrderCard({ order }) {
  return (
    <article>
      <OrderHeader id={order.id} status={order.status} />
      <CustomerSummary customer={order.customer} />
      <PriceSummary pricing={order.pricing} />
    </article>
  );
}
```

现在结构一眼就能读成：

```text
一个订单卡片
  ├─ 订单头部
  ├─ 客户摘要
  └─ 价格摘要
```

### 第 6 步：检查是否拆得过碎

问自己：

```text
是否存在只包一行 span、没有任何语义的组件？
是否每个子组件都有清晰名字？
是否输入比原来更窄？
父组件是否更容易读懂？
```

如果只是增加跳转而没有清晰职责，就不要继续拆。

### 第 7 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

本节总结：

- **本节核心代码**：按 `OrderHeader / CustomerSummary / PriceSummary` 的业务职责拆分，以及 `OrderCard` 的组合关系。
- **实验辅助代码**：静态订单数据和简单总价计算只是为了让职责边界可观察。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./03-props-composition-component-api/kp028-component-splitting-boundary --config ./vite.config.js
```

构建验证：

```bash
npm run build -- ./03-props-composition-component-api/kp028-component-splitting-boundary --config ./vite.config.js
```

## 效果验证

请确认：

1. `OrderHeader` 不需要访问 customer/pricing。
2. `CustomerSummary` 不需要访问订单金额。
3. `PriceSummary` 只接收 pricing。
4. `OrderCard` 的主要职责变成“组合”。
5. 能说出至少三个拆分信号，而不是只回答“代码太长”。
6. 能举例说明什么叫过度拆分。

完成后继续 **RE-KP029：数据组件与展示组件的现代取舍**。
