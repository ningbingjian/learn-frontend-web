# RE-KP159：延迟值与防抖的区别

> [返回 Chapter 16](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 区分 React 调度层面的 deferred render 与时间层面的 debounce。
2. 理解 `useDeferredValue` 没有固定毫秒窗口。
3. 理解 debounce 会主动等待一段静默时间再执行工作。
4. 会根据“降低渲染优先级”还是“减少请求/事件次数”选择方案。
5. 能理解二者可以同时出现，因为它们解决不同问题。

> **本节核心代码**：`useDeferredValue(query)` 与 `setTimeout(..., 600)` 的并排对照。  
> **实验辅助代码**：三个值直接显示在页面，只用于观察更新时间线。

## 理论讲解

### 1. useDeferredValue 解决的是渲染优先级

```jsx
const deferredQuery = useDeferredValue(query);
```

它表达：

> query 是最新业务值，但某部分 UI 可以晚一点追上。

它不会规定：

```text
必须 600ms 后更新
```

### 2. debounce 解决的是固定时间窗口

经典 debounce：

```jsx
useEffect(() => {
  const id = setTimeout(() => setDebouncedQuery(query), 600);
  return () => clearTimeout(id);
}, [query]);
```

如果 600ms 内再次输入，上一个定时器被取消并重新计时。

因此 debounce 常用于：

- 搜索请求；
- 自动保存；
- 高频 resize/scroll 后的业务动作；
- 希望明确减少执行次数的场景。

### 3. Deferred 不会自动减少网络请求

如果你仍然对每次 `query` 变化发请求：

```jsx
fetch(`/search?q=${query}`)
```

仅仅调用 `useDeferredValue(query)` 并不会自动替你减少请求数量。

### 4. Debounce 也不会让 React Render 可中断

即使请求做了 debounce，如果页面每次输入仍同步执行非常昂贵的 Render，输入仍可能卡顿。

所以二者职责不同：

| 目标 | 更匹配的工具 |
|---|---|
| 让昂贵 UI 晚一点追赶 | `useDeferredValue` |
| 等用户停下来再发请求 | debounce |
| 固定 600ms 才执行 | debounce |
| 利用 React 调度优先级 | `useDeferredValue` |

### 5. 可以组合使用

真实搜索页可能同时需要：

```text
query              → 输入框立即显示
deferredQuery      → 昂贵列表后台追赶
debouncedQuery     → 600ms 后发网络请求
```

这不是重复设计，而是三个不同职责。

## 动手编码：从 0 到 1

### 第 0 步：创建即时 query

```jsx
const [query, setQuery] = useState('');
```

绑定受控输入框。

### 第 1 步：加入 deferredQuery

```jsx
const deferredQuery = useDeferredValue(query);
```

观察：它没有任何毫秒参数。

### 第 2 步：加入 debouncedQuery

```jsx
const [debouncedQuery, setDebouncedQuery] = useState(query);
```

### 第 3 步：加入 600ms timer

```jsx
useEffect(() => {
  const timeoutId = window.setTimeout(() => {
    setDebouncedQuery(query);
  }, 600);

  return () => window.clearTimeout(timeoutId);
}, [query]);
```

快速输入时，debouncedQuery 会一直等待到最后一次输入后的 600ms。

### 第 4 步：把三条时间线同时显示

```jsx
<li>即时 query：{query}</li>
<li>deferredQuery：{deferredQuery}</li>
<li>600ms debouncedQuery：{debouncedQuery}</li>
```

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：React scheduling 与 timer debounce 的职责对照。
- **实验辅助代码**：直接显示三个字符串只为了观察差异。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./16-concurrent-rendering-transition-deferred-value/kp159-deferred-vs-debounce --config ./vite.config.js
```

## 效果验证

1. `query` 每次按键立即变化。
2. `debouncedQuery` 必须等最后一次输入后约 600ms。
3. `deferredQuery` 没有固定 600ms 承诺。
4. 能解释 deferred 不会自动减少请求次数。
5. 能解释 debounce 不会自动获得 React 并发渲染语义。
6. 能给出“昂贵 UI + 网络搜索”同时组合两者的设计理由。

完成后继续 **RE-KP160：输入框与昂贵列表的分离**。
