# RE-KP089：Context 默认值

> [返回 Chapter 09](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `createContext(defaultValue)` 中默认值的真正触发条件。
2. 知道只有“上方没有匹配 Provider”时才使用 defaultValue。
3. 理解 Provider 显式提供 `null` 或 `undefined` 时，不会自动退回 defaultValue。
4. 知道 defaultValue 是静态 fallback，不会随着某个 Provider 的状态自动改变。
5. 能判断什么时候使用自然默认值，什么时候使用 `null` 并做 Provider 缺失校验。

> **本节核心代码**：对比无 Provider、`value={null}`、`value={undefined}` 三种读取结果。
>
> **实验辅助代码**：`AccountLabel` 使用 `String(value)` 只是为了让 `null/undefined` 在页面上清晰可见。

## 理论讲解

### 1. 默认值只在没有 Provider 时生效

```jsx
const AccountContext = createContext('anonymous');
```

如果组件树是：

```text
AccountLabel
```

并且它上方没有 AccountContext Provider：

```text
useContext(AccountContext)
→ 'anonymous'
```

### 2. Provider 提供 `null` 不会 fallback

```jsx
<AccountContext value={null}>
  <AccountLabel />
</AccountContext>
```

读取结果是：

```text
null
```

而不是：

```text
anonymous
```

因为 React 已经找到了匹配 Provider。

### 3. Provider 提供 `undefined` 同样不会 fallback

```jsx
<AccountContext value={undefined}>
```

Consumer 读取到：

```text
undefined
```

默认值不是 JavaScript 的：

```js
value ?? defaultValue
```

逻辑。

它的判断条件是：

```text
有没有匹配 Provider
```

而不是：

```text
Provider value 是否为空
```

### 4. defaultValue 是静态的

```jsx
createContext('anonymous')
```

这个 fallback 在 Context 创建时确定。

动态数据应该通过：

```jsx
<AccountContext value={currentAccount}>
```

提供，而不是试图“修改 Context 默认值”。

### 5. `null` 作为默认值的常见设计

当业务要求 Consumer 必须位于 Provider 下方时，可以：

```jsx
const AccountContext = createContext(null);
```

随后读取时做保护：

```jsx
const account = useContext(AccountContext);

if (account === null) {
  throw new Error('AccountContext provider is missing');
}
```

这样可以更早暴露组件边界使用错误。

本节只建立设计直觉，自定义 Context Hook 会在后续架构实践中继续深化。

## 动手编码：从 0 到 1

### 第 0 步：创建带默认值的 Context

```jsx
const AccountContext = createContext('anonymous');
```

### 第 1 步：创建读取组件

```jsx
function AccountLabel({ label }) {
  const account = useContext(AccountContext);
  return <p>{label}：{String(account)}</p>;
}
```

### 第 2 步：不放 Provider

```jsx
<AccountLabel label="无 Provider" />
```

结果：

```text
anonymous
```

### 第 3 步：Provider 提供 null

```jsx
<AccountContext value={null}>
  <AccountLabel label="value=null" />
</AccountContext>
```

结果：

```text
null
```

### 第 4 步：Provider 提供 undefined

```jsx
<AccountContext value={undefined}>
  <AccountLabel label="value=undefined" />
</AccountContext>
```

结果：

```text
undefined
```

### 第 5 步：总结判断规则

```text
没有 Provider      → defaultValue
有 Provider=null    → null
有 Provider=undefined → undefined
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：默认 fallback 与显式 Provider value 的差异。
- **实验辅助代码**：`String()` 仅用于可视化特殊值。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./09-reducer-context/kp089-context-default-value --config ./vite.config.js
```

## 效果验证

1. 无 Provider 时显示 `anonymous`。
2. `value={null}` 时显示 `null`。
3. `value={undefined}` 时显示 `undefined`。
4. 能解释 defaultValue 为什么不是 `??` 语义。
5. 能解释动态 Context 数据为什么必须通过 Provider value 提供。

完成后继续 **RE-KP090：Context 更新与重新渲染**。
