# RE-KP024：通过 JSX 传递内容而不是配置对象

> [返回 Chapter 03](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 Props 不只能传字符串和数字，也可以传 React node / JSX。
2. 理解“内容本身就是 UI”时，直接传 JSX 往往比巨型配置对象更自然。
3. 区分数据配置与 UI 内容两个不同职责。
4. 避免让组件 API 演变成大量 `showXxx`、`xxxText`、`xxxType` 配置字段。
5. 知道 JSX 方案不是绝对替代配置对象，而是根据职责选择。

> **本节核心代码**：`Notice({ icon, children, actions })` 接收 JSX 内容，而不是通过十几个字段重建 UI。
>
> **实验辅助代码**：warning 图标和按钮只用于展示 React node Props 的灵活性。

## 理论讲解

### 1. Props 可以直接携带 JSX

例如：

```jsx
<Notice
  icon={<span>⚠️</span>}
  actions={<button type="button">Retry</button>}
>
  <p>Connection failed.</p>
</Notice>
```

这里：

```text
icon
children
actions
```

都可以是 React node。

### 2. 为什么这比巨型配置对象更自然

另一种设计可能是：

```jsx
<Notice
  iconType="warning"
  title="Connection failed"
  description="Please retry"
  showButton
  buttonText="Retry"
  buttonType="primary"
/>
```

随着 UI 变复杂，配置字段会不断增长：

```text
showSecondaryButton
secondaryButtonText
showDescription
linkText
linkHref
iconSize
...
```

组件开始重新发明一套“描述 JSX 的配置语言”。

### 3. UI 内容适合直接用 JSX 表达

如果调用方真正想控制的是：

```text
一块内容区域
一个图标区域
一个操作区域
```

直接传 JSX 可以保留：

```text
结构
语义标签
交互
其他组件
条件渲染
```

### 4. 数据仍然应该是数据

不要走向另一个极端。

如果组件真正需要的是：

```text
userId
pageSize
sortDirection
status
```

这些仍然是普通业务数据 Props。

判断方式可以是：

```text
这个输入描述的是业务数据？
  → 普通数据 Prop

这个输入本身就是一块 UI 内容？
  → 考虑 JSX / React node Prop
```

### 5. JSX 内容让调用方拥有更多表达权

调用方可以传：

```jsx
<strong>Retry now</strong>
```

也可以传：

```jsx
<div>
  <button>Retry</button>
  <a href="/help">Help</a>
</div>
```

`Notice` 不需要为每种可能结构新增一个配置字段。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们设计一个通知组件，但不让它知道所有内部 UI 细节。

### 第 1 步：先写最小 Notice

```jsx
function Notice({ children }) {
  return <section>{children}</section>;
}
```

### 第 2 步：增加一个 icon 区域

```jsx
function Notice({ icon, children }) {
  return (
    <section>
      <div>{icon}</div>
      <div>{children}</div>
    </section>
  );
}
```

**本步重点**：`icon` 不是 `iconName` 字符串，而是完整 React node。

### 第 3 步：增加 actions 区域

```jsx
function Notice({ icon, children, actions }) {
  // ...
}
```

调用时直接传：

```jsx
actions={<button type="button">Retry</button>}
```

### 第 4 步：把正文也交给 JSX

```jsx
<Notice ...>
  <h2>Connection failed</h2>
  <p>The billing service did not respond.</p>
</Notice>
```

### 第 5 步：思考配置对象什么时候仍然合理

如果只是传：

```jsx
severity="warning"
```

这是合理的数据配置。

如果开始出现：

```text
showButton
buttonText
buttonIcon
buttonHref
secondaryButton...
```

就要重新考虑是否应该直接开放 UI 插入点。

### 第 6 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：React node Props 和 JSX 内容插入点。
- **实验辅助代码**：具体 warning 文案、图标和 Retry 按钮只是演示内容。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./03-props-composition-component-api/kp024-jsx-content-over-config --config ./vite.config.js
```

## 效果验证

你应该能够解释：

1. 为什么 `icon` 可以直接传 JSX。
2. 为什么 `actions` 不需要被拆成多个按钮配置字段。
3. 为什么 `severity="warning"` 仍然是合理的数据 Prop。
4. 什么情况下配置对象会变成“重新发明 JSX”。
5. JSX 内容与普通业务数据应该如何分工。
