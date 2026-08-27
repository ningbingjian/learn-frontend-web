# RE-KP029：数据组件与展示组件的现代取舍

> [返回 Chapter 03](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 了解 Container / Presentational（数据组件 / 展示组件）模式的历史动机。
2. 理解 Hooks 出现后“不允许展示组件碰逻辑”已经不适合作为机械规则。
3. 会按照数据获取、数据适配、领域职责、视觉复用等真实变化原因设计边界。
4. 能区分“为了测试/复用而提取纯展示组件”和“无意义地复制一套 Page/View 文件”。
5. 能设计一个 `DashboardPage → DashboardView` 的简单边界并说明为什么这样拆。

> **本节核心代码**：`DashboardPage` 负责把领域数据转换为页面所需 ViewModel，`DashboardView` 只接收已准备好的展示输入。
>
> **实验辅助代码**：静态 Dashboard 数据替代真实请求，避免提前引入 Effect、服务端状态与请求库。

## 理论讲解

### 1. 历史上的 Container / Presentational 模式

React 早期常见一种分层：

```text
Container Component
负责：数据、订阅、状态、业务连接
       ↓ Props
Presentational Component
负责：根据 Props 渲染 UI
```

它解决过真实问题：

```text
把“数据从哪里来”与“页面长什么样”分开
提高展示组件复用性
降低部分测试成本
```

因此这个模式不是错误历史。

### 2. 为什么现代 React 不应机械套用

Hooks 让函数组件可以直接组合：

```text
状态逻辑
订阅逻辑
数据逻辑
自定义 Hook
```

之后，不再需要为了“这个组件里有逻辑”就强制创建：

```text
UserPageContainer.jsx
UserPageView.jsx
```

每一页都一式两份。

现代判断更应该是：

> 这两部分是否真的有不同的变化原因、复用需求或测试边界？

### 3. 数据边界仍然有价值

例如一个页面拿到后台数据：

```js
{
  account_name: 'Acme',
  total_orders: 128,
  pending_orders: 7,
}
```

而展示层希望得到：

```js
{
  title: 'Acme Dashboard',
  items: [
    ['总订单', 128],
    ['待处理', 7],
  ],
}
```

把这段数据适配集中在页面/适配层，可以让展示组件不依赖后端字段命名。

### 4. “展示组件”不等于“完全没有逻辑”

一个展示组件可以合法拥有：

```text
条件渲染
格式化
局部派生值
小型交互
```

关键不是“有没有 JavaScript 逻辑”，而是：

```text
它是否仍然围绕同一个 UI 职责？
```

不要把“纯展示”误解成“只能写 HTML”。

### 5. 什么时候值得拆出 View

典型理由：

```text
同一 UI 需要多种数据来源
展示部分需要独立 Storybook / 视觉测试
后台 DTO 很不稳定，希望隔离
页面连接逻辑复杂，UI 需要保持简单
```

如果这些理由都不存在，一个组件直接完成数据和 UI 也可能更简单。

### 6. 自定义 Hook 与这种分层的关系

后面学 Hooks 后，常见结构可能变成：

```text
useDashboardData()
      ↓
DashboardPage
      ↓
DashboardView（可选）
```

也可能直接：

```text
DashboardPage
  内部调用 Hook
  直接渲染 UI
```

两种都可以。

所以本课不是教你新的硬规则，而是学习取舍依据。

## 动手编码：从 0 到 1

### 第 0 步：明确实验边界

本课不发真实网络请求。

我们用静态对象模拟“数据层已经返回的结果”，只观察：

```text
领域数据
  ↓ 适配
ViewModel
  ↓
展示组件
```

### 第 1 步：准备原始数据

```js
const dashboardData = {
  account_name: 'Acme',
  total_orders: 128,
  pending_orders: 7,
};
```

这里故意使用类似后端 DTO 的下划线字段。

### 第 2 步：先让 UI 直接依赖 DTO

可以先写：

```jsx
function Dashboard({ data }) {
  return (
    <section>
      <h2>{data.account_name}</h2>
      <p>{data.total_orders}</p>
      <p>{data.pending_orders}</p>
    </section>
  );
}
```

这个版本简单，但展示层已经知道后端字段结构。

### 第 3 步：提取数据适配函数

加入：

```js
function toDashboardViewModel(data) {
  return {
    title: `${data.account_name} Dashboard`,
    metrics: [
      { label: '总订单', value: data.total_orders },
      { label: '待处理', value: data.pending_orders },
    ],
  };
}
```

现在 DTO 与 UI 输入之间有明确转换。

### 第 4 步：创建 `DashboardView`

```jsx
function DashboardView({ title, metrics }) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {metrics.map((metric) => (
          <li key={metric.label}>
            {metric.label}: {metric.value}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

`DashboardView` 不需要知道：

```text
account_name
total_orders
pending_orders
```

### 第 5 步：让 `DashboardPage` 负责连接

```jsx
function DashboardPage({ data }) {
  const viewModel = toDashboardViewModel(data);
  return <DashboardView {...viewModel} />;
}
```

这个组件承担：

```text
接受领域/后端数据
      ↓
转换为页面模型
      ↓
交给 View
```

### 第 6 步：判断这次拆分是否值得

本案例的理由是：

```text
故意制造清晰的数据适配边界
```

真实项目中如果页面非常简单，没有复用和隔离需求，可以不拆。

不要把：

```text
Page + View
```

变成所有组件都必须遵守的模板。

### 第 7 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

本节总结：

- **本节核心代码**：`toDashboardViewModel()`、`DashboardPage`、`DashboardView` 三者的数据边界与职责。
- **实验辅助代码**：静态 `dashboardData` 用于代替真实数据请求，避免提前进入 Effect/服务端状态课程。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./03-props-composition-component-api/kp029-data-presentational-components --config ./vite.config.js
```

构建验证：

```bash
npm run build -- ./03-props-composition-component-api/kp029-data-presentational-components --config ./vite.config.js
```

## 效果验证

请确认：

1. `DashboardView` 不直接读取 `account_name` 等 DTO 字段。
2. 后端字段变化时，理论上可以优先在适配边界处理。
3. 能解释 Container / Presentational 模式最初解决什么问题。
4. 能说明 Hooks 出现后为什么不应机械要求所有组件二分。
5. 能给出至少两个“值得拆 View”的真实理由。
6. 能说明一个非常简单页面为什么完全可以不拆成 Page + View。

完成后继续 **RE-KP030：避免 Boolean Props 爆炸**。
