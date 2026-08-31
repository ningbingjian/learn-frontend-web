# RE-KP183：StrictMode

> [返回 Chapter 19](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 `<StrictMode>` 是开发期检查边界，不渲染额外 DOM。
2. 知道 StrictMode 可以包整个应用，也可以只包一部分树。
3. 识别当前开发期检查：额外 Render、Effect 检查、ref callback 检查和废弃 API 检查。
4. 理解这些额外检查不会成为普通 production build 的运行语义。

## 理论讲解

### 1. Development Checks

StrictMode 的目标是尽早暴露本来就存在的 Bug，而不是改变业务逻辑。当前 React 会在开发环境对边界内的代码执行额外检查，例如再次调用应保持纯净的函数、重新运行 Effect setup/cleanup、重新运行 callback ref setup/cleanup。

### 2. Scope

StrictMode 可以放在 root：

```jsx
<StrictMode>
  <App />
</StrictMode>
```

也可以只包某个子树。本课把 Header 放在边界外，把 CheckedArea 放在边界内，通过 Console 对比调用情况。

> 注意：当 StrictMode 只包局部子树而不是 root 时，React 不会启用那些在真实 production 父子生命周期里无法成立的初始 Effect 组合。本课只用 Render log 观察 scope，不用局部边界推导 Effect 首次挂载行为。

### 3. No Production Cost

StrictMode 的额外开发检查只用于开发环境。不要把“开发时多调用一次”写成生产业务逻辑假设，也不要通过关闭 StrictMode 来掩盖不纯 Render 或缺失 cleanup。

## 动手编码：从 0 到 1

### 第 1 步：创建两个区域

写 `Header` 和 `CheckedArea`，两者都在组件函数顶部 `console.log()`。

### 第 2 步：只包 CheckedArea

```jsx
<Header />
<StrictMode>
  <CheckedArea />
</StrictMode>
```

**目标**：直接看到 StrictMode 的作用范围是 React 子树，不是全局开关。

### 第 3 步：增加一次 State 更新

在 CheckedArea 中加入计数按钮。

**观察**：开发环境中 CheckedArea 的 render log 会出现额外调用；Header 不因为它位于 StrictMode 外就自动进入同样的检查范围。

### 第 4 步：检查 DOM

Elements 面板不会出现 `<StrictMode>` 节点。

### 第 5 步：最终源码

[打开本节最终源码](./src/main.jsx)

- **本节核心代码**：局部 `<StrictMode>` 边界。
- **实验辅助代码**：Console render log 与计数按钮。

## 运行案例

```bash
npm run dev
```

打开本课 `index.html`，同时打开 Console。

## 效果验证

- 页面 DOM 没有 StrictMode wrapper。
- CheckedArea 位于检查边界内。
- 额外调用只用于开发期发现问题。
- 不应该让业务正确性依赖“组件只执行一次”。
