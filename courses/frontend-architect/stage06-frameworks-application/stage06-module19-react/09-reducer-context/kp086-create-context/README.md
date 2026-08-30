# RE-KP086：createContext

> [返回 Chapter 09](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `createContext(defaultValue)` 的职责是创建一个 Context 对象。
2. 知道 Context 对象本身不是业务数据容器，而是“哪一类值要被提供/读取”的身份标识。
3. 理解 `defaultValue` 只在上方找不到对应 Provider 时作为 fallback。
4. 知道 Context 应在组件外部创建，避免每次 Render 生成新的 Context 身份。
5. 区分“创建 Context”和“读取 Context”：后者由 `useContext` 完成。

> **本节核心代码**：`const CurrencyContext = createContext('CNY')`。
>
> **实验辅助代码**：`CurrencyLabel` 只用来观察没有 Provider 时的 fallback；Provider 与订阅更新分别留到 RE-KP087～090。

## 理论讲解

### 1. `createContext` 创建的是什么

最小写法：

```jsx
import { createContext } from 'react';

const CurrencyContext = createContext('CNY');
```

这里创建的是一个 Context 对象。

可以把它理解为：

```text
CurrencyContext
    ↓
“货币上下文”这一类信息的身份标识
```

它不是：

```text
一个全局变量仓库
一个事件总线
一个 Redux store
一个自动会变的对象
```

### 2. 为什么通常在组件外创建

推荐：

```jsx
const CurrencyContext = createContext('CNY');

function App() {
  // ...
}
```

而不是：

```jsx
function App() {
  const CurrencyContext = createContext('CNY');
  // ...
}
```

Context 的提供者与读取者必须引用**同一个 Context 对象**。

如果每次 Render 都重新调用 `createContext`，就会不断创建新对象，让 Provider 和 Consumer 的身份关系变得错误且难以维护。

### 3. `defaultValue` 是静态 fallback

```jsx
const CurrencyContext = createContext('CNY');
```

如果某个读取者上方没有匹配 Provider：

```text
读取结果 → CNY
```

这个 `defaultValue` 更像：

```text
最后兜底值
测试时的安全默认值
没有 Provider 时的固定值
```

而不是：

```text
可以被 setState 修改的 Context 当前值
```

### 4. Context 对象本身不持有“当前业务数据”

更准确的结构是：

```text
createContext(defaultValue)
        ↓
创建 Context 身份
        ↓
Provider 提供 value
        ↓
useContext 读取最近 Provider 的 value
```

所以不要把：

```jsx
const ThemeContext = createContext('light');
```

理解成：

```text
ThemeContext 里面永久装着 'light'
```

真正运行时读取到什么值，取决于调用位置上方最近的 Provider。

### 5. 默认值什么时候有意义

有意义的默认值：

```jsx
createContext('light')
createContext('CNY')
```

如果业务上不存在自然默认值，常见写法是：

```jsx
createContext(null)
```

然后在自定义 Hook 或 Consumer 中检查是否缺失 Provider。

这一设计会在后续 Context 工程实践继续深化。

## 动手编码：从 0 到 1

### 第 0 步：准备最小组件

```jsx
function CurrencyLabel() {
  return <p>当前货币：</p>;
}
```

### 第 1 步：导入 `createContext` 和 `useContext`

虽然本节重点是创建 Context，但为了观察 fallback，需要暂时使用 `useContext`：

```jsx
import { createContext, useContext } from 'react';
```

RE-KP087 会正式深入 `useContext`。

### 第 2 步：创建 Context

```jsx
const CurrencyContext = createContext('CNY');
```

它必须放在组件外部。

### 第 3 步：读取默认值

```jsx
function CurrencyLabel() {
  const currency = useContext(CurrencyContext);

  return <p>当前货币：{currency}</p>;
}
```

### 第 4 步：故意不写 Provider

```jsx
function App() {
  return <CurrencyLabel />;
}
```

这时上方没有 Provider，所以会使用：

```text
CNY
```

### 第 5 步：建立正确心智模型

当前实验只验证：

```text
createContext('CNY')
        ↓
没有 Provider
        ↓
useContext 读取 fallback CNY
```

不要因此误以为 Context 只能使用默认值。动态 Provider 从下一课正式开始。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：组件外的 `createContext('CNY')`。
- **实验辅助代码**：`CurrencyLabel` 只为了观察默认 fallback。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./09-reducer-context/kp086-create-context --config ./vite.config.js
```

## 效果验证

1. 页面显示“当前货币：CNY”。
2. 页面中没有任何 Provider，也能读取 fallback。
3. 能解释 Context 对象为什么不是“全局值容器”。
4. 能解释为什么 `createContext` 应放在组件外部。
5. 能明确 `defaultValue` 是静态兜底，不是动态 State。

完成后继续 **RE-KP087：useContext**。
