# RE-KP170：use 可以条件调用的特殊规则

> [返回 Chapter 17](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么 `use(resource)` 虽然名字以 `use` 开头，却不是普通 Hook。
2. 正确在条件和循环中调用 `use`。
3. 记住 `use` 仍然必须在 Function Component 或 Custom Hook 内调用。
4. 记住 `use` 不能放在 `try/catch` 中。
5. 区分“`use` 的特殊例外”和普通 Hooks 的顶层调用规则。

> **本节核心代码**：条件分支与循环中的 `use(ThemeContext)`。  
> **实验辅助代码**：主题切换按钮和 `sections` 数组只用于制造不同调用路径。

## 理论讲解

### 1. `use` 不是普通 Hook

React 官方明确说明：`use(resource)` **不是 Hook**。因此它不遵守普通 Hook 的“只能在顶层调用”这一条限制。

普通 Hook：

```jsx
const [count, setCount] = useState(0);
```

不能放进普通 `if` / `for`。

而 `use` 可以：

```jsx
if (showTheme) {
  const theme = use(ThemeContext);
}
```

也可以出现在循环里。

### 2. 特殊例外不等于没有边界

`use` 仍然只能从：

```text
Function Component
Custom Hook
```

内部调用。

不能在任意普通 JavaScript 函数、模块顶层或事件处理器中随便调用。

### 3. 为什么不能包在 try/catch 中

`use(Promise)` 会通过 React 内部的 suspension / error 机制和 Suspense、Error Boundary 协作。

因此不要写：

```jsx
try {
  const value = use(promise);
} catch (error) {
  // ❌
}
```

Promise reject 应交给 Error Boundary，而不是在调用 `use` 的地方用 `try/catch` 截获 React 内部控制流。

### 4. 条件调用不意味着绕过资源读取

可以根据业务条件决定是否读取资源：

```jsx
if (showTheme) {
  const theme = use(ThemeContext);
}
```

但不要根据 Promise 自己的内部状态去绕过 `use(promise)`。

### 5. 和普通 Hook 规则放在一起记

```text
useState / useEffect / useContext
→ Component / Hook 顶层

use(resource)
→ Component / Hook 内
→ 可以 if / loop
→ 不能 try/catch
```

## 动手编码：从 0 到 1

### 第 0 步：准备最小组件

```jsx
function ThemeReport() {
  return <p>Theme</p>;
}
```

目标：先有一个普通 Function Component。

运行后只会看到静态文字。

### 第 1 步：创建 Context

```jsx
const ThemeContext = createContext('light');
```

目标：准备一个可以被 `use` 读取的资源。

### 第 2 步：在条件中调用 use

```jsx
if (showTheme) {
  const theme = use(ThemeContext);
  conditionalResult = `条件读取：${theme}`;
}
```

为什么合法：`use` 不是普通 Hook。

切换 `showTheme` 后，可以观察调用路径变化。

### 第 3 步：在循环中调用 use

```jsx
for (const section of sections) {
  if (section.enabled) {
    const theme = use(ThemeContext);
    loopResults.push(`${section.name} → ${theme}`);
  }
}
```

目标：验证循环也是官方允许的调用位置。

### 第 4 步：保持普通 Hook 在顶层

```jsx
const [theme, setTheme] = useState('dark');
```

`useState` 仍放在 `App` 顶层。不要因为 `use` 可以条件调用，就错误推导所有 Hook 都可以。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：条件/循环中的 `use(ThemeContext)`。
- **实验辅助代码**：按钮和展示列表用于观察不同路径。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./17-suspense-lazy-use-resource-reading/kp170-use-conditional-call-rule --config ./vite.config.js
```

## 效果验证

1. 条件读取关闭时，该分支不会读取 Context。
2. 打开后会显示当前主题。
3. 循环只对 `enabled=true` 的项执行 `use(ThemeContext)`。
4. 切换 Provider 值后，所有实际读取 Context 的位置都会更新。
5. 能解释 `use` 为什么是规则例外，但仍不是“随处可调用”的普通函数。

完成后进入 **Chapter 18：React 19 Actions、Forms 与乐观 UI**。
