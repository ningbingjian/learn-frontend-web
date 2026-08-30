# RE-KP103：use 是规则中的特殊例外

> [返回 Chapter 11](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 `use(resource)` 是 React API，但官方明确它**不是 Hook**。
2. 理解 `use` 为什么可以出现在条件语句和循环中。
3. 知道 `use` 仍然必须从 Component 或 Hook 内调用。
4. 知道 `use` 不能放进 `try/catch`。
5. 能用 `use(Context)` 条件读取 Context，而不把这条例外错误推广到 `useState` 等普通 Hook。

> **本节核心代码**：`if (!visible) return ...; const theme = use(ThemeContext);`。
>
> **实验辅助代码**：`visible` 和 `theme` State 只是为了制造条件读取 Context 的可观察场景。

## 理论讲解

### 1. `use` 名字以 use 开头，但不是 Hook

React 官方文档明确区分：

```text
use(resource) 是 React API
不是普通 Hook
```

因此它不遵守“普通 Hook 必须无条件顶层调用”的全部限制。

### 2. `use` 可以在条件中调用

本节源码：

```jsx
function ThemePreview({ visible }) {
  if (!visible) {
    return <p>主题预览已隐藏</p>;
  }

  const theme = use(ThemeContext);
  return <p>当前主题：{theme}</p>;
}
```

当 `visible=false` 时，本次 Render 不调用 `use`。

当 `visible=true` 时才调用。

这是 `use` 的合法用法。

### 3. 这条例外不能套到 `useState`

下面仍然错误：

```jsx
if (visible) {
  const [count, setCount] = useState(0);
}
```

因为 `useState` 是普通 Hook。

### 4. `use` 也可以出现在循环中

官方规则允许类似：

```jsx
for (const resource of resources) {
  results.push(use(resource));
}
```

但课程目前不引入 Promise/Suspense 资源细节，后续 Suspense Chapter 再展开。

### 5. `use` 仍然不是“随便哪里都能调用”

仍然必须满足：

```text
调用发生在 Component 或 Hook 内
```

不能在普通模块顶层或任意普通函数中乱用。

### 6. `use` 不能放在 try/catch

错误：

```jsx
try {
  const value = use(resource);
} catch (error) {
  // ...
}
```

`use(Promise)` 会与 Suspense / Error Boundary 机制协作，不应该用普通 `try/catch` 包住。

本节只建立规则认知，异常边界与 Suspense 在后续章节再深入。

### 7. `use(Context)` 与 `useContext` 的一个重要差别

`useContext` 必须遵守普通 Hook 顶层规则。

而：

```jsx
use(ThemeContext)
```

可以条件调用。

二者读取 Context 时都寻找调用组件上方最近的 Provider，但调用规则不同。

## 动手编码：从 0 到 1

### 第 1 步：创建 Context

```jsx
const ThemeContext = createContext('light');
```

### 第 2 步：建立条件组件

```jsx
function ThemePreview({ visible }) {
  if (!visible) {
    return <p>主题预览已隐藏</p>;
  }
}
```

### 第 3 步：early return 之后调用 `use`

```jsx
const theme = use(ThemeContext);
```

如果这里换成 `useState`，就会违反 Hooks 规则；但 `use` 是官方特殊 API。

### 第 4 步：用 React 19 Provider 提供主题

```jsx
<ThemeContext value={theme}>
  <ThemePreview visible={visible} />
</ThemeContext>
```

### 第 5 步：切换预览与主题

```jsx
setVisible(value => !value)
setTheme(value => value === 'dark' ? 'light' : 'dark')
```

最终源码：[`src/main.jsx`](./src/main.jsx)

### 本节核心代码

- 条件调用 `use(ThemeContext)`
- `use` 与普通 Hook 规则的边界

### 实验辅助代码

- Theme Provider
- `visible` / `theme` 两份 UI State

## 运行案例

执行：

```bash
pnpm dev
```

验证：

1. 默认预览隐藏。
2. 点击“切换预览”，组件开始执行 `use(ThemeContext)` 并显示主题。
3. 切换主题，预览读取新的 Context value。
4. 再隐藏预览，本次 Render 不再执行 `use`，仍是合法代码。

## 效果验证

你应该能够解释：

1. `use` 是不是 Hook？
2. 为什么它可以条件调用？
3. 为什么 `useState` 不能照抄这种写法？
4. `use` 还有哪些限制没有被取消？
