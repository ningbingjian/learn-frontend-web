# RE-KP090：Context 更新与重新渲染

> [返回 Chapter 09](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useContext` 会订阅 Context 更新。
2. 知道 Provider value 改变时，读取该 Context 的组件会重新渲染。
3. 理解 React 使用 `Object.is` 比较前后 Context value。
4. 知道 `memo` 不能阻止 Context Consumer 接收新的 Context 值。
5. 理解对象/函数作为 Provider value 时，引用身份可能带来额外更新。
6. 能区分“父组件普通重渲染”和“Context value 身份变化导致的 Consumer 更新”。

> **本节核心代码**：`memo` 包裹的 Consumer 仍通过 `useContext(SettingsContext)` 响应 Provider value 变化。
>
> **实验辅助代码**：故意内联创建 `{ theme }` 对象，用 Console 展示 object identity 对 Context 更新的影响；本节不提前引入 `useMemo` 优化。

## 理论讲解

### 1. `useContext` 会订阅更新

```jsx
const settings = useContext(SettingsContext);
```

不是：

```text
读取一次后永久保存
```

而是：

```text
当前 Render 读取最近 Provider value
Provider value 变化
        ↓
Consumer 重新 Render
        ↓
读取新 value
```

### 2. React 如何判断 Context value 变化

React 使用类似：

```js
Object.is(previousValue, nextValue)
```

的比较。

原始值：

```text
'dark' → 'dark'  通常相等
'dark' → 'light' 不相等
```

对象则要看引用：

```js
{ theme: 'dark' } !== { theme: 'dark' }
```

即使字段内容看起来一样，两个新对象仍是不同引用。

### 3. `memo` 不能屏蔽 Context 更新

假设：

```jsx
const ThemeBadge = memo(function ThemeBadge() {
  const settings = useContext(SettingsContext);
  // ...
});
```

当 Context value 变化时，React 仍会让这个组件拿到新的 Context。

`memo` 主要处理的是 Props 层面的重复渲染优化，不会让 Consumer 永远停留在旧 Context。

### 4. 为什么对象 Provider value 要关注身份

例如：

```jsx
<SettingsContext value={{ theme }}>
```

父组件每次 Render 都会创建：

```js
{ theme }
```

的新对象。

即使 `theme` 没变，只要父组件因为其他 State 重渲染：

```text
new object
→ Object.is(old, new) === false
→ Consumer 收到新的 Context value
```

### 5. 不要为了优化过早复杂化

Context value 是小型原始值：

```jsx
<ThemeContext value={theme}>
```

通常直观且足够。

对象/函数 value 在大型树中确实可能需要稳定引用，但优化应建立在真实性能问题之上。

后续 `useMemo` / `useCallback` 与性能章节会系统处理。

### 6. Context 更新的边界

只有读取这个 Context 的组件需要响应它：

```text
Provider
├─ StaticHeader        不读 Context
└─ ThemeBadge          useContext → 响应更新
```

Context 不是“整个 App 一变化就全部强制重绘”的黑盒。

## 动手编码：从 0 到 1

### 第 0 步：创建 SettingsContext

```jsx
const SettingsContext = createContext({ theme: 'light' });
```

### 第 1 步：创建 memo Consumer

```jsx
const ThemeBadge = memo(function ThemeBadge() {
  const settings = useContext(SettingsContext);
  console.log('ThemeBadge render:', settings.theme);

  return <p>主题：{settings.theme}</p>;
});
```

### 第 2 步：父组件准备两个 State

```jsx
const [theme, setTheme] = useState('light');
const [parentCount, setParentCount] = useState(0);
```

`theme` 是 Context 数据；`parentCount` 只是无关父级 State。

### 第 3 步：故意使用对象字面量 value

```jsx
<SettingsContext value={{ theme }}>
  <ThemeBadge />
</SettingsContext>
```

### 第 4 步：切换主题

```jsx
setTheme(current => current === 'light' ? 'dark' : 'light');
```

Consumer 必须重新渲染，因为真实 Context 数据变化。

### 第 5 步：只更新 parentCount

```jsx
setParentCount(count => count + 1);
```

虽然 `theme` 没变，但：

```jsx
{ theme }
```

被重新创建，因此 Consumer 仍会拿到不同引用的 Context value。

### 第 6 步：理解 `memo` 结果

即使 `ThemeBadge` 被 `memo` 包裹：

```text
Context value identity changed
→ Consumer 仍会 Render
```

这正是本节需要观察的现象。

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：Context 订阅、`Object.is` 身份比较、`memo` 边界。
- **实验辅助代码**：故意创建新对象与 Console 日志用于暴露 identity 行为。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./09-reducer-context/kp090-context-update-rerender --config ./vite.config.js
```

## 效果验证

1. 点击“切换主题”后 Consumer 显示最新主题。
2. `ThemeBadge` 被 `memo` 包裹仍能接收 Context 更新。
3. 点击“父级无关更新”时，Console 仍可观察 ThemeBadge Render。
4. 能解释原因是 Provider value 新对象引用，而不是 theme 字段发生变化。
5. 能解释 Context value 的 `Object.is` 比较边界。

完成后 Chapter 09 收官，继续 **RE-KP091：useRef 保存非渲染数据**。
