# RE-KP187：Profiler 回调指标

> [返回 Chapter 19](../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

1. 读懂 Profiler `onRender` 的核心参数。
2. 区分 `actualDuration` 与 `baseDuration`。
3. 理解 `phase` 的 mount/update/nested-update 语义。
4. 理解 `startTime` 与 `commitTime` 是调度/commit 观察数据，而非业务时间戳。

## 理论讲解

`onRender` 的常用签名：

```jsx
function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
) {}
```

### 1. actualDuration

本次更新中，Profiler 子树实际用于渲染的时间估计。已经跳过的工作不会像完整重渲染那样全部计入。

### 2. baseDuration

React 对“如果整个子树都需要渲染一次”成本的基准估计，来自树中最近一次各组件渲染耗时的累积。

不要简单理解成：

```text
baseDuration - actualDuration = memo 节省的绝对真实时间
```

它是用于比较和趋势分析的估计指标。

### 3. Phase

常见 phase：

- `mount`：Profiler 子树首次挂载。
- `update`：后续更新。
- `nested-update`：在 commit 相关流程里触发了嵌套更新的情况。

### 4. 时间指标

`startTime` 表示本次 render 开始工作的时间；`commitTime` 表示这次更新 commit 的时间。多个 Profiler 若属于同一次 commit，可以用 commitTime 关联测量样本。

## 动手编码：从 0 到 1

### 第 1 步：创建 ExpensivePanel

让 count 改变时触发可测量 CPU 工作。

### 第 2 步：实现完整 onRender

把 6 个核心参数格式化成页面表格。

### 第 3 步：避免测量反馈循环

表格放在 Profiler 外部，并通过 ref 更新。不要在 `onRender` 中 set 一个会再次驱动被测树 Render 的 State。

### 第 4 步：比较 mount 与 update

首次加载记录 mount；点击更新按钮记录 update。

### 第 5 步：最终源码

[打开本节最终源码](./src/main.jsx)

- **本节核心代码**：`onRender` 各指标读取与解释。
- **实验辅助代码**：CPU workload、DOM ref 表格。

## 运行案例

```bash
npm run dev
```

## 效果验证

- 能看到 actualDuration/baseDuration。
- phase 首次为 mount，更新后为 update。
- startTime 与 commitTime 随 commit 刷新。
- Profiler 证据应结合 React DevTools Profiler 与真实用户性能指标一起判断。
