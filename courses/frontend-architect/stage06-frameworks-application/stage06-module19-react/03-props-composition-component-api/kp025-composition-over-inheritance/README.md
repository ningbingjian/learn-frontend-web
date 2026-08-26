# RE-KP025：组件组合优于继承

> [返回 Chapter 03](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 React UI 复用通常通过组件组合，而不是组件继承层级完成。
2. 使用通用 Wrapper + 业务组件组合出不同页面。
3. 区分“复用 UI 结构”与“复用普通 JavaScript 逻辑”。
4. 识别为了共享几个 UI 片段而创建 BaseComponent 继承树的问题。
5. 为后续插槽式 API、Render Prop 和自定义 Hook 建立组合思维。

> **本节核心代码**：`Frame` 作为通用结构，由 `AdminPanel`、`CustomerPanel` 通过 Props 和 children 组合使用。
>
> **实验辅助代码**：两种业务面板只是为了证明不需要继承同一个“业务基类组件”。

## 理论讲解

### 1. React 的复用基础是“组件可以嵌套组件”

例如：

```jsx
<Frame title="Admin">
  <AdminTools />
</Frame>
```

和：

```jsx
<Frame title="Customer">
  <OrderHistory />
</Frame>
```

共同结构来自 `Frame`，差异通过 Props 和 children 注入。

### 2. 不需要为了共享 UI 建立继承树

传统 OOP 直觉可能会写成：

```text
BasePanel
   ↑
AdminPanel
   ↑
SuperAdminPanel
```

但 UI 需求经常是正交组合：

```text
标题
操作区
正文
侧栏
页脚
权限内容
```

这些能力不一定天然形成稳定的“is-a”继承关系。

### 3. 组合让变化发生在调用处

`Frame` 可以只提供：

```text
标题区域
内容区域
页脚区域
```

业务组件决定：

```text
里面到底放订单、报表还是按钮
```

因此增加一个新业务面板时，通常不需要修改 `Frame` 或新增继承层级。

### 4. 逻辑复用也不必依赖组件继承

如果要复用普通计算逻辑，可以使用：

```text
普通 JavaScript 函数
模块
```

后面还会学习：

```text
自定义 Hook
```

所以不要把“组件继承”当成所有复用问题的统一答案。

### 5. 组合不是“永远只有 children”

组合可以通过：

```text
children
React node Props
普通数据 Props
组件本身
```

共同完成。

下一节 RE-KP026 会进一步把这种思路扩展成多区域的“插槽式组件 API”。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要共享一个页面框架，但让 Admin 和 Customer 拥有完全不同的内容。

### 第 1 步：创建通用 Frame

```jsx
function Frame({ title, children, footer }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
      <footer>{footer}</footer>
    </section>
  );
}
```

**本步目标**：Frame 只定义稳定公共结构。

### 第 2 步：创建 AdminPanel

```jsx
function AdminPanel() {
  return (
    <Frame title="Admin" footer="Admin workspace">
      <button type="button">Manage users</button>
    </Frame>
  );
}
```

### 第 3 步：创建 CustomerPanel

```jsx
function CustomerPanel() {
  return (
    <Frame title="Customer" footer="Customer workspace">
      <p>Recent order: #1024</p>
    </Frame>
  );
}
```

### 第 4 步：同时渲染两种面板

```jsx
<AdminPanel />
<CustomerPanel />
```

**预期观察**：公共骨架一致，但业务内容完全不同。

### 第 5 步：思考为什么不需要 BasePanel

我们复用的其实是：

```text
Frame 的 UI 结构
```

而不是：

```text
AdminPanel is-a BasePanel
CustomerPanel is-a BasePanel
```

组合更贴合这里的真实关系。

### 第 6 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Wrapper + children/React node Props 的组合。
- **实验辅助代码**：Admin/Customer 文案只用于制造两个不同业务分支。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./03-props-composition-component-api/kp025-composition-over-inheritance --config ./vite.config.js
```

## 效果验证

请确认：

1. `AdminPanel` 没有继承 `Frame`。
2. `CustomerPanel` 也没有继承 `Frame`。
3. 两者通过组合获得相同公共结构。
4. 新增第三种业务面板时，可以继续组合 `Frame`。
5. 你能解释 UI 组合为什么通常比组件继承树更灵活。
