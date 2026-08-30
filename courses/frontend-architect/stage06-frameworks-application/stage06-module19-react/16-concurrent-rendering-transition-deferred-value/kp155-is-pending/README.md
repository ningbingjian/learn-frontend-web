# RE-KP155：isPending

> [返回 Chapter 16](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 理解 `isPending` 表示当前 Transition 是否仍在进行。
2. 会用 pending 状态提供用户反馈，而不是自己额外维护 `isLoading`。
3. 理解 pending UI 可以继续保留旧内容，而不是立刻清空页面。
4. 知道 `isPending` 从调用 `startTransition` 开始变为 `true`，直到相关 Action 完成并最终状态显示。
5. 理解本节出现的异步嵌套 `startTransition` 只是保持案例正确，细节在 RE-KP156 专讲。

> **本节核心代码**：直接使用 `useTransition` 提供的 `isPending` 驱动按钮文案、`aria-busy` 与旧内容视觉反馈。  
> **实验辅助代码**：`wait(900)` 只用于让 pending 状态肉眼可见。

## 理论讲解

### 1. isPending 不是业务 State

不需要自己写：

```jsx
const [isLoading, setIsLoading] = useState(false);
```

对于 Transition 自身的进行状态，React 已经提供：

```jsx
const [isPending, startTransition] = useTransition();
```

### 2. pending 不等于“页面必须被禁用”

本节按钮在请求期间禁用，是为了避免这个最小实验重复提交；真实产品应根据业务决定哪些交互可以继续。

更重要的 UX 是：

```text
保留已显示内容
+ 告诉用户后台正在更新
```

而不是每次都立刻替换为全屏 Loading。

### 3. isPending 覆盖 Action 的异步过程

React 19 的 `useTransition` 支持异步 Action。调用：

```jsx
startTransition(async () => {
  await wait(900);
  // ...
});
```

期间 `isPending` 可以保持为 `true`，直到 Action 完成并最终状态显示。

### 4. 为什么源码 await 后又 startTransition 一次

源码写成：

```jsx
startTransition(async () => {
  await wait(900);

  startTransition(() => {
    setReportVersion(version => version + 1);
  });
});
```

这是当前 React 的已知限制：`await` 之后的 State Update 需要再次放进 `startTransition`，才能继续被标记为 Transition。

本节只把它作为正确代码使用，RE-KP156 会专门拆解原因和错误写法。

### 5. 可访问性也应反映 pending

页面使用：

```jsx
<main aria-busy={isPending}>
```

让“正在更新”不只依赖视觉样式。

## 动手编码：从 0 到 1

### 第 0 步：准备报告 State

```jsx
const [reportVersion, setReportVersion] = useState(1);
```

### 第 1 步：取得 isPending

```jsx
const [isPending, startTransition] = useTransition();
```

### 第 2 步：启动一个可观察的异步 Transition

```jsx
startTransition(async () => {
  await wait(900);

  startTransition(() => {
    setReportVersion(version => version + 1);
  });
});
```

### 第 3 步：把 pending 反馈给按钮

```jsx
<button disabled={isPending}>
  {isPending ? '正在刷新报告…' : '刷新报告'}
</button>
```

### 第 4 步：保留旧内容但降低强调

```jsx
<section style={{ opacity: isPending ? 0.6 : 1 }}>
```

目标：用户仍然能看到当前报告，而不是突然出现空白区域。

### 第 5 步：添加 aria-busy

```jsx
<main aria-busy={isPending}>
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`isPending` 驱动 pending UI。
- **实验辅助代码**：Promise 延迟仅用于拉长观察窗口。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./16-concurrent-rendering-transition-deferred-value/kp155-is-pending --config ./vite.config.js
```

## 效果验证

1. 点击刷新后 `isPending` 变为 `true`。
2. 按钮文案变成“正在刷新报告…”。
3. 旧报告仍然显示，只降低 opacity。
4. 完成后版本号增加，`isPending` 回到 `false`。
5. 能解释 `isPending` 与自己维护业务 `isLoading` 的区别。

完成后继续 **RE-KP156：Transition 中的异步更新**。
