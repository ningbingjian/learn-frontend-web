# RE-KP160：输入框与昂贵列表的分离

> [返回 Chapter 16](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 会把高优先级输入值与低优先级昂贵结果拆成不同数据流。
2. 理解输入框必须始终由即时 `query` 控制。
3. 理解昂贵子树可以由 `deferredQuery` 驱动。
4. 知道 stale content 可以继续显示，而不是每次都清空为 loading。
5. 理解 memoization 与 defer 是不同职责：前者避免相同 Props 的重复 Render，后者负责更新优先级。

> **本节核心代码**：`query → input` 与 `deferredQuery → ExpensiveList` 的职责分离。  
> **实验辅助代码**：`memo`、12000 条数据和 checksum 循环用于稳定放大昂贵子树成本，不是 `useDeferredValue` 必须条件。

## 理论讲解

### 1. 不要让受控输入读取 deferred value

错误方向：

```jsx
<input value={deferredQuery} />
```

用户输入属于 Urgent Update，应该读取：

```jsx
<input value={query} />
```

### 2. 昂贵结果读取 deferredQuery

```jsx
const deferredQuery = useDeferredValue(query);

<ExpensiveList query={deferredQuery} />
```

输入框先响应，结果区域允许稍后追赶。

### 3. stale content 是一种 UX 策略

旧结果并不一定要立即消失。

可以：

```jsx
const isStale = query !== deferredQuery;
```

然后淡化旧结果：

```jsx
<div style={{ opacity: isStale ? 0.6 : 1 }}>
```

用户仍能看到上一版结果，同时知道新结果正在计算。

### 4. 为什么实验里使用 memo

如果父组件每次按键都同步重新执行非常昂贵的子组件，即使传给子组件的是旧 deferred value，当前这次父 Render 仍可能花很多时间。

本实验使用：

```jsx
const ExpensiveList = memo(function ExpensiveList({ query }) {
  // ...
});
```

当 `deferredQuery` 尚未变化时，辅助避免相同 Props 的昂贵子树重复执行，让“输入先更新、结果后追赶”的效果更明显。

**但要注意：**

- `memo` 不是 deferred scheduling；
- `useDeferredValue` 也不是 memoization；
- 二者解决不同问题。

### 5. 不要为了性能而伪造全局状态

这仍然只是本地搜索页：

```jsx
const [query, setQuery] = useState('');
```

不需要为了“昂贵列表”就上外部 Store。

## 动手编码：从 0 到 1

### 第 0 步：准备即时输入 State

```jsx
const [query, setQuery] = useState('');
```

### 第 1 步：创建昂贵列表组件

```jsx
function ExpensiveList({ query }) {
  // 大量过滤/渲染工作
}
```

先理解：如果它直接读取最新 query，每次按键都可能推动昂贵计算。

### 第 2 步：创建 deferredQuery

```jsx
const deferredQuery = useDeferredValue(query);
```

### 第 3 步：拆开两条数据流

```jsx
<input value={query} ... />
<ExpensiveList query={deferredQuery} />
```

这是本节最重要的结构。

### 第 4 步：加入 stale 提示

```jsx
const isStale = query !== deferredQuery;
```

旧列表追赶时降低透明度。

### 第 5 步：加入实验辅助 memo

```jsx
const ExpensiveList = memo(function ExpensiveList({ query }) {
  // ...
});
```

它只是帮助稳定观察差异。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：即时输入与 deferred expensive child 分离。
- **实验辅助代码**：`memo`、大量数组项、checksum 循环。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./16-concurrent-rendering-transition-deferred-value/kp160-input-expensive-list-separation --config ./vite.config.js
```

## 效果验证

1. 输入框由最新 `query` 控制。
2. 昂贵列表由 `deferredQuery` 控制。
3. 快速输入时可以看到列表短暂展示旧 query 对应内容。
4. 停止输入后列表最终追上。
5. 能解释 `memo` 与 `useDeferredValue` 的职责区别。
6. 能解释为什么不能把受控输入本身改成 deferred value。

完成后进入 **Chapter 17：Suspense、Lazy、use 与资源读取**。
