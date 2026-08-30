# RE-KP087：useContext

> [返回 Chapter 09](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `useContext(SomeContext)` 读取 Context。
2. 理解 React 会向组件树上方查找最近的匹配 Provider。
3. 知道 Context 可以跨过不关心该数据的中间组件。
4. 理解 `useContext` 不只是“读一次”，而是对 Context 的响应式订阅。
5. 知道 Provider 必须位于调用 `useContext` 的组件上方，而不是同一个组件返回树的下方。

> **本节核心代码**：`const theme = useContext(ThemeContext)`。
>
> **实验辅助代码**：`Page → Toolbar → SaveButton` 的多层结构用于证明中间层不需要转发 `theme` Prop。

## 理论讲解

### 1. `useContext` 解决什么问题

不用 Context 时：

```text
App(theme)
  ↓ props
Page(theme)
  ↓ props
Toolbar(theme)
  ↓ props
SaveButton(theme)
```

如果 `Page` 和 `Toolbar` 根本不关心 theme，这就是典型的机械转发。

Context 可以改成：

```text
App
└─ ThemeContext Provider
   └─ Page
      └─ Toolbar
         └─ SaveButton
             └─ useContext(ThemeContext)
```

中间组件不再需要知道 theme。

### 2. `useContext` 总是读取最近 Provider

```jsx
const theme = useContext(ThemeContext);
```

React 会：

```text
从当前组件位置向上查找
        ↓
找到最近的 ThemeContext Provider
        ↓
返回它的 value
```

如果一个 Provider 内部又套一个同类型 Provider：

```text
外层 dark
  └─ 内层 light
       └─ Button
```

`Button` 读取：

```text
light
```

因为内层更近。

### 3. Provider 必须在调用者上方

错误直觉：

```jsx
function App() {
  const theme = useContext(ThemeContext);

  return (
    <ThemeContext value="dark">
      ...
    </ThemeContext>
  );
}
```

这个 Provider 是 `App` 返回出来的**下方子树**，不能反过来影响已经在 `App` 执行期间发生的 `useContext` 调用。

必须是：

```text
Provider
  ↓
Consumer Component
    ↓
useContext
```

### 4. `useContext` 是订阅，不是快照复制

Provider 的值以后变了：

```jsx
<ThemeContext value={theme}>
```

使用：

```jsx
useContext(ThemeContext)
```

的组件会拿到最新值并重新渲染。

RE-KP090 会专门验证 Context 更新传播。

### 5. Context 不是 Props 的全面替代品

局部、明确、只跨一两层的数据：

```jsx
<Card title={title} />
```

通常继续使用 Props 更直接。

Context 更适合：

```text
主题
当前用户
语言/区域
较深层共享配置
与子树相关的共享状态/dispatch
```

先用明确的组件边界和 Props，再在确实需要跨层共享时使用 Context。

## 动手编码：从 0 到 1

### 第 0 步：创建 ThemeContext

```jsx
const ThemeContext = createContext('light');
```

### 第 1 步：建立三层组件

```jsx
function Page() {
  return <Toolbar />;
}

function Toolbar() {
  return <SaveButton />;
}
```

这里中间两层不需要 `theme`。

### 第 2 步：最深层调用 `useContext`

```jsx
function SaveButton() {
  const theme = useContext(ThemeContext);

  return <button>保存（{theme}）</button>;
}
```

### 第 3 步：在上方提供值

React 19 中可以写：

```jsx
<ThemeContext value="dark">
  <Page />
</ThemeContext>
```

这里先直接使用；RE-KP088 会专门讲这套现代 Provider 语法与旧 `.Provider` 的差异。

### 第 4 步：加入更近的 Provider

```jsx
<ThemeContext value="dark">
  <Page />
  <ThemeContext value="light">
    <SaveButton />
  </ThemeContext>
</ThemeContext>
```

现在两个按钮会分别读取：

```text
dark
light
```

### 第 5 步：观察中间层 Props

`Page` 和 `Toolbar`：

```jsx
function Page() {
  return <Toolbar />;
}
```

完全没有 theme 参数。

这就是 Context 在跨层读取上的核心价值。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`useContext(ThemeContext)` 与最近 Provider 查找。
- **实验辅助代码**：多层组件只用于展示不需要 Props Drilling。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./09-reducer-context/kp087-use-context --config ./vite.config.js
```

## 效果验证

1. 深层 SaveButton 能直接读取上方 dark。
2. 内层 Provider 中的按钮读取 light。
3. `Page` / `Toolbar` 不需要转发 theme Prop。
4. 能解释为什么 Provider 必须位于 Consumer 上方。
5. 能解释“最近 Provider”规则。

完成后继续 **RE-KP088：Provider 的现代写法**。
