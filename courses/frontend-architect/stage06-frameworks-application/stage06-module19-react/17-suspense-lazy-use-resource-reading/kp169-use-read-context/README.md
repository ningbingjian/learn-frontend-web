# RE-KP169：use 读取 Context

> [返回 Chapter 17](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `use(Context)` 读取 Context Value。
2. 理解它和 `useContext(Context)` 一样从最近的 Provider 读取值。
3. 理解 `use` 与普通 Hook 的调用规则不同，因此可以在条件分支中读取 Context。
4. 理解没有 Provider 时返回 `createContext(defaultValue)` 的默认值。
5. 知道 `use(Context)` 仍然必须在 React Component 或 Custom Hook 内调用。

> **本节核心代码**：`const theme = use(ThemeContext)` 与最近 Provider 查找。  
> **实验辅助代码**：三个 Panel 只用于观察 default / parent / nested provider 的差异。

## 理论讲解

### 1. use 可以读取 Context

```jsx
const theme = use(ThemeContext);
```

React 会沿组件树向上寻找最近的：

```jsx
<ThemeContext value="...">
```

并返回它的 value。

### 2. 最近 Provider 决定结果

假设：

```jsx
<ThemeContext value="dark">
  <PanelA />
  <ThemeContext value="contrast">
    <PanelB />
  </ThemeContext>
</ThemeContext>
```

那么：

```text
PanelA → dark
PanelB → contrast
```

因为 `PanelB` 更靠近 nested Provider。

### 3. 没有 Provider 时使用 defaultValue

```jsx
const ThemeContext = createContext('light');
```

组件树上方没有 Provider 时：

```jsx
use(ThemeContext) === 'light'
```

默认值通常用于合理 fallback 或测试，而不是会自动变化的状态。

### 4. use 与 useContext 的规则不同

`useContext` 属于普通 Hook：

```text
必须在组件顶层调用
```

`use` 不是 Hook，因此可以出现在条件或循环中：

```jsx
if (shouldReadTheme) {
  const theme = use(ThemeContext);
  // ...
}
```

本课只先观察 Context 读取；下一课 RE-KP170 会正式总结 `use` 的特殊调用规则。

### 5. use 仍然有 React 调用边界

虽然 `use` 可以条件调用，但不能随便在普通 JS 函数里调用。

它仍然必须位于：

- React Component。
- Custom Hook。

### 6. use(Context) 不会绕过 Provider 结构

它并不是全局变量读取器。

Context Value 仍由 React Tree 中最近 Provider 决定，因此 Provider 的边界设计仍然非常重要。

## 动手编码：从 0 到 1

### 第 1 步：创建 Context

```jsx
const ThemeContext = createContext('light');
```

### 第 2 步：创建读取组件

```jsx
function ThemeBadge() {
  const theme = use(ThemeContext);
  return <strong>{theme}</strong>;
}
```

### 第 3 步：增加条件读取

```jsx
function ThemeBadge({ enabled }) {
  if (!enabled) {
    return <span>Theme read disabled</span>;
  }

  const theme = use(ThemeContext);
  return <strong>{theme}</strong>;
}
```

普通 Hook 不能这样写，但 `use` 可以。

### 第 4 步：观察默认值

把一个 `ThemeBadge` 放在任何 Provider 外：

```jsx
<ThemeBadge enabled />
```

结果应为 `light`。

### 第 5 步：观察最近 Provider

```jsx
<ThemeContext value="dark">
  <ThemeBadge enabled />
  <ThemeContext value="contrast">
    <ThemeBadge enabled />
  </ThemeContext>
</ThemeContext>
```

分别得到 `dark` 与 `contrast`。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`use(ThemeContext)`、closest Provider、conditional read。
- **实验辅助代码**：Panel 标签与开关按钮。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./17-suspense-lazy-use-resource-reading/kp169-use-read-context --config ./vite.config.js
```

## 效果验证

1. Provider 外的 ThemeBadge 显示 `light`。
2. dark Provider 内显示 `dark`。
3. nested contrast Provider 内显示 `contrast`。
4. 关闭读取开关后，该分支不调用 `use(ThemeContext)` 也能正常工作。
5. 能解释 `use(Context)` 为什么仍然遵守最近 Provider。
6. 能说明 `use` 可以条件调用，但仍必须在 Component / Hook 内。

完成后继续 **RE-KP170：use 可以条件调用的特殊规则**。
