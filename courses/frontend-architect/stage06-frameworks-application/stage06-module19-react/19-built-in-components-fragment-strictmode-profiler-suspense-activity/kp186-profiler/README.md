# RE-KP186：Profiler

> [返回 Chapter 19](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 使用 `<Profiler>` 对指定 React 子树做程序化性能测量。
2. 理解 `id` 标识测量区域。
3. 理解 `onRender` 在被测树 commit 时接收测量结果。
4. 知道 Profiler 有测量开销，普通 production build 默认关闭 profiling。

## 理论讲解

### 1. Measure

Profiler 是 React 内置组件：

```jsx
<Profiler id="SearchResults" onRender={handleRender}>
  <SearchResults query={query} />
</Profiler>
```

它不保证代码变快；它负责给你“哪里贵、一次 commit 花了多少渲染时间”的证据。

### 2. Tree Scope

Profiler 只测它包裹的 React 子树。可以在不同区域放多个 Profiler，用不同 `id` 区分测量结果。

### 3. onRender

`onRender` 会在被测树完成 commit 后调用。本课先只读取 `id/phase/actualDuration`，下一课再系统拆解全部关键指标。

## 动手编码：从 0 到 1

### 第 1 步：创建一个有计算成本的列表

`SearchResults` 根据 query 生成过滤结果，并做一段纯 CPU 计算用于制造可观察成本。

### 第 2 步：包 Profiler

```jsx
<Profiler id="SearchResults" onRender={handleRender}>
```

### 第 3 步：记录测量

`handleRender` 把最新 phase 与 duration 写进 Profiler 外部的 `<output>`。

> 直接写 DOM 只是实验观察器，避免用 React State 记录 Profiler 自己的结果而形成额外测量反馈循环。

### 第 4 步：更新 query

输入不同内容，观察每次 commit 的 `actualDuration`。

### 第 5 步：最终源码

[打开本节最终源码](./src/main.jsx)

- **本节核心代码**：`<Profiler id onRender>`。
- **实验辅助代码**：CPU workload、output ref。

## 运行案例

```bash
npm run dev
```

## 效果验证

- 首次出现 `phase=mount`。
- 后续输入通常出现 `phase=update`。
- duration 是测量值，不是性能目标本身。
- 真正优化前应先测量，不要看到一次数字就过早 memoize。
