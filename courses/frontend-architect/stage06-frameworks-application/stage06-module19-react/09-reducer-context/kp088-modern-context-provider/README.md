# RE-KP088：Provider 的现代写法

> [返回 Chapter 09](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 React 19 推荐的 `<SomeContext value={...}>` Provider 写法。
2. 识别旧项目中的 `<SomeContext.Provider value={...}>`。
3. 知道 `.Provider` 在 React 19 仍是兼容写法，但属于 React 19 之前的 Provider 形式。
4. 理解 Provider 的职责是定义一段子树的 Context value 边界。
5. 能通过嵌套 Provider 对局部子树覆盖 Context 值。

> **本节核心代码**：`<LocaleContext value={locale}>...</LocaleContext>`。
>
> **实验辅助代码**：语言切换和内层固定 `en-US` 区域用于观察 Provider Boundary。

## 理论讲解

### 1. React 19 的现代 Provider 语法

当前推荐：

```jsx
<ThemeContext value={theme}>
  <Page />
</ThemeContext>
```

这里直接把 Context 对象作为组件渲染。

### 2. React 19 之前常见写法

老项目里经常看到：

```jsx
<ThemeContext.Provider value={theme}>
  <Page />
</ThemeContext.Provider>
```

在 React 19 中这仍然是兼容认知，但新代码可以优先使用：

```jsx
<ThemeContext value={theme}>
```

所以维护老项目时不要误判 `.Provider` 已经“不能运行”。

### 3. Provider 是子树边界

```jsx
<LocaleContext value="zh-CN">
  <Header />
  <Main />
</LocaleContext>
```

它表达：

```text
Header / Main 及其后代
读取 LocaleContext 时
默认看到 zh-CN
```

Provider 不会影响：

```text
它上方的组件
它外部的兄弟子树
```

### 4. 内层 Provider 可以覆盖外层

```jsx
<LocaleContext value="zh-CN">
  <Page />
  <LocaleContext value="en-US">
    <LegacyWidget />
  </LocaleContext>
</LocaleContext>
```

结果：

```text
Page         → zh-CN
LegacyWidget → en-US
```

这不是修改外层值，而是在更小的子树建立一个更近的 Provider。

### 5. `value` 可以来自 State

```jsx
const [locale, setLocale] = useState('zh-CN');

<LocaleContext value={locale}>
```

Context 自己不负责保存动态状态。

真正的 owner 仍然是：

```text
useState / useReducer
```

Provider 只是把这个 value 暴露给后代读取。

### 6. Context 与状态管理不要混为一谈

可以记成：

```text
useState / useReducer
负责：存储与更新状态

Context Provider
负责：把某个值跨层提供给子树
```

两者经常组合，但职责不同。

## 动手编码：从 0 到 1

### 第 0 步：创建 LocaleContext

```jsx
const LocaleContext = createContext('zh-CN');
```

### 第 1 步：创建 Consumer

```jsx
function LocaleBadge({ label }) {
  const locale = useContext(LocaleContext);
  return <p>{label}：{locale}</p>;
}
```

### 第 2 步：父组件保存动态 locale

```jsx
const [locale, setLocale] = useState('zh-CN');
```

### 第 3 步：使用 React 19 Provider

```jsx
<LocaleContext value={locale}>
  <LocaleBadge label="主应用" />
</LocaleContext>
```

### 第 4 步：提供切换按钮

```jsx
<button
  onClick={() =>
    setLocale(current => current === 'zh-CN' ? 'ja-JP' : 'zh-CN')
  }
>
  切换主语言
</button>
```

### 第 5 步：加入内层 Provider

```jsx
<LocaleContext value="en-US">
  <LocaleBadge label="固定英语区域" />
</LocaleContext>
```

无论外层怎么切换，这个区域都继续读取：

```text
en-US
```

### 第 6 步：对照旧语法

老项目等价形式：

```jsx
<LocaleContext.Provider value={locale}>
  ...
</LocaleContext.Provider>
```

本课程 React 19.2 基线后续优先采用现代写法。

### 第 7 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：React 19 `<LocaleContext value={...}>`。
- **实验辅助代码**：动态 locale 与局部 override 用于观察 Provider 边界。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./09-reducer-context/kp088-modern-context-provider --config ./vite.config.js
```

## 效果验证

1. 点击按钮后主应用 locale 在 `zh-CN / ja-JP` 切换。
2. 内层固定区域始终显示 `en-US`。
3. 能识别 React 19 新 Provider 语法。
4. 能识别旧 `.Provider` 语法且知道它的版本背景。
5. 能解释 Provider 为什么只是“提供边界”，不是状态 owner。

完成后继续 **RE-KP089：Context 默认值**。
