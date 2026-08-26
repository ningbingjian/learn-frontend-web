# RE-KP023：children 组合

> [返回 Chapter 03](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解嵌套 JSX 会作为 `children` 传给组件。
2. 使用 `children` 设计 Wrapper / Container 组件。
3. 区分“容器负责外观”与“调用方负责内容”。
4. 知道同一个容器可以组合完全不同的内部 JSX。
5. 避免为了每一种内容都复制一个新的卡片组件。

> **本节核心代码**：`Card({ title, children })` 不理解内部业务内容，只负责公共容器。
>
> **实验辅助代码**：订单卡片与状态卡片只是两组不同 children 示例。

## 理论讲解

### 1. 嵌套 JSX 自动成为 children

调用：

```jsx
<Card>
  <p>Hello</p>
</Card>
```

组件：

```jsx
function Card({ children }) {
  return <section>{children}</section>;
}
```

可以把它理解为：

```text
调用方拥有内部内容
      ↓
内容作为 children 传入
      ↓
Card 决定内容放在哪个容器里
```

### 2. children 让容器不必理解业务细节

一个通用 Card 不应该被迫知道：

```text
这是订单吗？
这是用户吗？
这是报表吗？
有几个按钮？
有几行描述？
```

它只需要负责：

```text
边框
标题区域
内容容器
公共语义结构
```

### 3. 组合比“为每种内容加 Prop”更自然

如果 Card API 逐渐变成：

```text
title
subtitle
body
buttonText
showBadge
badgeText
footerText
```

往往说明组件开始试图控制调用方的全部内容。

`children` 可以把“内容是什么”的决定权交还给调用方。

### 4. children 不等于必须完全无结构

你仍然可以同时拥有普通 Props：

```jsx
<Card title="Order">
  ...
</Card>
```

这里：

```text
title
属于 Card 明确拥有的 API

children
属于调用方自由组合的内容区域
```

这是一种非常常见的组件 API 设计。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

用一个 `Card` 同时承载两种完全不同的业务内容。

### 第 1 步：创建最小 Card

```jsx
function Card({ children }) {
  return <section>{children}</section>;
}
```

**观察**：Card 没有任何业务字段。

### 第 2 步：加入 Card 自己真正拥有的 title

```jsx
function Card({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
```

### 第 3 步：组合订单内容

```jsx
<Card title="Order #1024">
  <p>Mechanical Keyboard</p>
  <strong>¥499</strong>
</Card>
```

### 第 4 步：用同一个 Card 组合系统状态

```jsx
<Card title="Service status">
  <p>Billing API</p>
  <button type="button">Retry</button>
</Card>
```

**预期观察**：两个 Card 的内部结构不同，但容器组件完全没有改代码。

### 第 5 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`children` 让容器和内容职责分离。
- **实验辅助代码**：订单/状态文案只用于证明同一容器可以组合不同 JSX。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./03-props-composition-component-api/kp023-children-composition --config ./vite.config.js
```

## 效果验证

请确认：

1. `Card` 不知道订单字段。
2. `Card` 也不知道状态卡片的按钮结构。
3. 两种内容都通过 `children` 进入同一容器。
4. 新增第三种内容时，不需要修改 `Card` 的核心结构。
5. 你能说明 children 组合如何降低容器与业务内容的耦合。
