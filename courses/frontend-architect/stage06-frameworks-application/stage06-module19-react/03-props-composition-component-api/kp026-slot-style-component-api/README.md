# RE-KP026：插槽式组件 API

> [返回 Chapter 03](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 React 没有特殊的“slot 关键字”，但可以用 `children` 和 React node Props 表达插槽式 API。
2. 区分单一 `children` 内容区和多个具名内容区。
3. 会设计 `header`、`actions`、`footer` 等语义清晰的内容 Props。
4. 理解“插槽”应表达布局区域，而不是把所有实现细节都暴露成 Props。
5. 能判断什么时候使用 `children`，什么时候需要具名 React node Props。

> **本节核心代码**：`Panel({ header, actions, children, footer })` 通过多个 React node Props 暴露清晰的内容区域。
>
> **实验辅助代码**：示例订单数据、CSS 类名与静态文案只用于观察 API，不是本节核心。

## 理论讲解

### 1. 什么叫“插槽式组件 API”

假设一个卡片固定负责外壳，但里面存在多个可替换区域：

```text
┌──────────────────────┐
│ header      actions  │
├──────────────────────┤
│                      │
│      children        │
│                      │
├──────────────────────┤
│ footer               │
└──────────────────────┘
```

如果组件只接受一个 `children`：

```jsx
<Panel>
  <OrderSummary />
</Panel>
```

它只能自然表达一个主要内容区。

当调用者还需要控制标题区、操作区、底部区时，可以让组件接收多个 React node Props：

```jsx
<Panel
  header={<h2>订单 #A1024</h2>}
  actions={<button>导出</button>}
  footer={<small>最后更新：10:30</small>}
>
  <OrderSummary />
</Panel>
```

这些 Prop 就像“具名插槽”。

### 2. React 没有专门的 Slot 语法

React 中：

```jsx
header={<h2>...</h2>}
```

本质仍然只是：

```text
Prop 名称：header
Prop 值：一个 React node
```

所以“插槽式 API”是组件 API 设计思想，不是 React 的特殊语法机制。

这点很重要，因为你不需要寻找：

```text
React.slot()
<slot />
```

这样的 API。

### 3. `children` 是默认内容区

对于最主要、最自然的内容区域，优先保留：

```jsx
{children}
```

例如：

```jsx
function Panel({ children }) {
  return <section>{children}</section>;
}
```

调用端读起来像普通嵌套结构：

```jsx
<Panel>
  <OrderSummary />
</Panel>
```

因此不要为了“统一”把所有内容都改成：

```jsx
<Panel content={<OrderSummary />} />
```

### 4. 多区域时再引入具名内容 Props

例如：

```jsx
function Panel({ header, actions, children, footer }) {
  return (
    <section>
      <header>
        <div>{header}</div>
        <div>{actions}</div>
      </header>
      <div>{children}</div>
      <footer>{footer}</footer>
    </section>
  );
}
```

调用者现在负责“放什么内容”，`Panel` 负责“这些内容放在哪里”。

这形成清晰分工：

```text
Panel
负责结构与布局区域

调用方
负责具体标题、操作、正文和底部内容
```

### 5. 具名插槽比神秘数组更可读

不要设计成：

```jsx
<Panel
  regions={[
    <h2>订单</h2>,
    <button>导出</button>,
    <OrderSummary />,
    <small>更新时间</small>,
  ]}
/>
```

调用者必须记住：

```text
0 = header
1 = actions
2 = body
3 = footer
```

而：

```jsx
header={...}
actions={...}
footer={...}
```

本身就带语义。

### 6. 插槽不是越多越好

如果组件出现：

```text
headerLeft
headerCenter
headerRight
toolbarLeft
toolbarRight
bodyTop
bodyBottom
footerLeft
footerRight
```

可能说明组件承担了太多布局职责。

这时应该反问：

```text
这是一个可复用组件？
还是把整个页面布局塞成了一个超级组件？
```

插槽 API 仍然要保持最小、稳定、语义化。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要做一个订单信息面板，固定布局包含：

```text
header
右侧 actions
正文 children
footer
```

目标不是实现复杂业务，而是验证多个 React node Props 如何形成“具名内容区”。

### 第 1 步：创建最小页面入口

创建：

```text
kp026-slot-style-component-api/
├── index.html
└── src/
    └── main.jsx
```

`index.html` 只提供 React Root：

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

### 第 2 步：先写只有 `children` 的 Panel

在 `src/main.jsx` 中：

```jsx
function Panel({ children }) {
  return <section>{children}</section>;
}
```

调用：

```jsx
<Panel>
  <p>订单金额：¥499</p>
</Panel>
```

此时只有一个默认内容区。

### 第 3 步：加入 `header`

改成：

```jsx
function Panel({ header, children }) {
  return (
    <section>
      <header>{header}</header>
      <div>{children}</div>
    </section>
  );
}
```

调用端可以写：

```jsx
<Panel header={<h2>订单 #A1024</h2>}>
  <p>订单金额：¥499</p>
</Panel>
```

现在标题内容由调用方决定，但标题位置仍由 `Panel` 决定。

### 第 4 步：加入 `actions`

继续扩展：

```jsx
function Panel({ header, actions, children }) {
  return (
    <section>
      <header>
        <div>{header}</div>
        <div>{actions}</div>
      </header>
      <div>{children}</div>
    </section>
  );
}
```

调用：

```jsx
actions={<button type="button">导出订单</button>}
```

注意：`actions` 接收的是 UI 内容，不是“按钮文本配置”。

### 第 5 步：加入可选 `footer`

最终增加：

```jsx
{footer && <footer>{footer}</footer>}
```

这样调用者可以选择是否提供底部内容。

### 第 6 步：把不同区域组合成完整调用

最终使用：

```jsx
<Panel
  header={<h2>订单 #A1024</h2>}
  actions={<button type="button">导出订单</button>}
  footer={<small>数据更新时间：10:30</small>}
>
  <OrderSummary />
</Panel>
```

现在可以直接从 JSX 读出 API 语义：

```text
header 放标题
actions 放操作
children 放主体
footer 放底部信息
```

### 第 7 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

本节最后只需要分清两层：

- **本节核心代码**：`header`、`actions`、`children`、`footer` 这些 React node Props，以及 `Panel` 对布局位置的控制。
- **实验辅助代码**：订单金额、状态、时间和样式仅用于让不同区域可观察。

## 运行案例

进入 React 模块根目录：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

首次运行先安装依赖：

```bash
npm install
```

启动本节：

```bash
npm run dev -- ./03-props-composition-component-api/kp026-slot-style-component-api --config ./vite.config.js
```

生产构建：

```bash
npm run build -- ./03-props-composition-component-api/kp026-slot-style-component-api --config ./vite.config.js
```

## 效果验证

请确认：

1. `children` 仍然负责主体内容。
2. `header`、`actions`、`footer` 可以分别接收 JSX。
3. 删除 `footer` Prop 后，组件仍然正常显示。
4. `Panel` 不需要知道标题是 `h2`、操作是按钮还是其他组件。
5. 能解释为什么这种设计叫“插槽式 API”，但 React 本身没有特殊 Slot 语法。
6. 能说明为什么不应该无限增加具名插槽直到组件变成整页布局容器。

完成后继续 **RE-KP027：Render Prop 模式的历史与适用场景**。
