# RE-KP158：useDeferredValue

> [返回 Chapter 16](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useDeferredValue(value)` 返回的是一个可以暂时落后于最新 `value` 的值。
2. 理解更新时 React 会先尝试用旧 deferred value 完成更紧急的 UI，再在后台追赶新值。
3. 会用 `value !== deferredValue` 判断页面当前是否在展示 stale content。
4. 理解 deferred update 是调度语义，不是固定毫秒延迟。
5. 知道 Transition 中已经被延迟的更新不会再额外产生 deferred render。

> **本节核心代码**：`const deferredQuery = useDeferredValue(query)` 与 `query !== deferredQuery`。  
> **实验辅助代码**：`PRODUCTS` 与 `SlowResults` 只是制造较重的结果区域，帮助观察 deferred UI。

## 理论讲解

### 1. 即时值与延迟值是两条 UI 时间线

输入框必须立即响应：

```jsx
const [query, setQuery] = useState('');
```

而昂贵结果可以允许稍微落后：

```jsx
const deferredQuery = useDeferredValue(query);
```

于是一次输入可能短暂出现：

```text
query         = "react"
deferredQuery = "rea"
```

这不是数据错误，而是 React 有意保留旧结果，让更紧急的交互先完成。

### 2. 更新时会先保留旧值，再后台追赶

当前 React 的行为可以用两步理解：

```text
Render A：query 已更新，deferredQuery 暂时仍是旧值
Render B：后台尝试让 deferredQuery 追上 query
```

如果后台 Render 被更紧急更新打断，React 可以放弃旧的后台工作，直接追赶更新后的目标。

### 3. stale UI 应该有视觉提示

可以计算：

```jsx
const isStale = query !== deferredQuery;
```

然后降低旧内容透明度，或展示“更新中”的轻提示。

不要把 stale content 伪装成绝对最新内容。

### 4. useDeferredValue 不是 debounce

它没有：

```text
300ms
500ms
1000ms
```

这样的固定等待时间。

React 根据调度机会决定后台 Render 什么时候完成。下一课会专门对比 debounce。

### 5. initialValue 是可选能力

当前 API 形态是：

```jsx
useDeferredValue(value, initialValue?)
```

如果传入 `initialValue`，初次 Render 可以先使用该值；如果省略，初次 Render 没有旧值可延迟，因此 deferred value 与 value 相同。

本课先使用最常见的一参数形式。

## 动手编码：从 0 到 1

### 第 0 步：准备最小搜索框

目标：先只有即时 State。

```jsx
function SearchPage() {
  const [query, setQuery] = useState('');

  return <input value={query} onChange={event => setQuery(event.target.value)} />;
}
```

观察：输入值立即变化。

### 第 1 步：创建 deferredQuery

```jsx
const deferredQuery = useDeferredValue(query);
```

为什么：结果区域可以读取延迟值，而输入框继续读取即时值。

### 第 2 步：让昂贵区域读取 deferredQuery

```jsx
<SlowResults query={deferredQuery} />
```

不要写成：

```jsx
<SlowResults query={query} />
```

否则结果区域仍被最新输入直接驱动。

### 第 3 步：识别 stale 状态

```jsx
const isStale = query !== deferredQuery;
```

运行时快速输入，可以看到两个值短暂不同。

### 第 4 步：给旧内容加提示

```jsx
<section style={{ opacity: isStale ? 0.55 : 1 }} aria-busy={isStale}>
```

这样用户知道当前结果正在追赶。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：即时 `query`、延迟 `deferredQuery`、`isStale`。
- **实验辅助代码**：6000 条产品数据和列表过滤，只用于制造可观察的 Render 成本。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./16-concurrent-rendering-transition-deferred-value/kp158-use-deferred-value --config ./vite.config.js
```

## 效果验证

1. 输入框始终读取最新 `query`。
2. 快速输入时，`deferredQuery` 可以短暂落后。
3. `query !== deferredQuery` 时结果区域降低透明度。
4. 最终没有新输入后，deferred value 会追上即时值。
5. 能解释为什么它不是固定 500ms 的定时器。
6. 能说明本课昂贵列表只是辅助实验，不是 `useDeferredValue` 的 API 要求。

完成后继续 **RE-KP159：延迟值与防抖的区别**。
