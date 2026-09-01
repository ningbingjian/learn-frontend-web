# RE-KP059：异步回调中的快照理解

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `BROWSER-MECHANISM-LAB` |
| 学习深度 | Must |
| 前置课程 | RE-KP051 / 052：Snapshot 与 Closure |
| 本课主问题 | 为什么两秒后才执行的 callback，仍然可能读到两秒前的 State？ |
| Learning Artifact | `setTimeout` 时间轴 + 页面中“当前值 / 回调看到的值”对照 |
| 暂时不用理解 | Ref / `useEffectEvent` 的最新值模式 |

## 这节课只需要搞懂什么

1. callback 的执行时间和它闭包捕获哪个 Render 的值是两件事。
2. 新 Render 不会改写旧 Render 已经创建好的函数闭包。
3. 旧 Snapshot 有时正是需求，不应把“旧值”本身当 Bug。

## 先预测

当 `count = 0` 时安排：

```jsx
setTimeout(() => {
  console.log(count);
}, 2000);
```

然后两秒内把页面点到 `count = 3`。两秒后打印什么？先写答案和理由。

## 动手实验：从 0 到 1

### Step 0：准备 count

```jsx
const [count, setCount] = useState(0);
```

### Step 1：让页面可以继续变化

```jsx
<button onClick={() => setCount(c => c + 1)}>count + 1</button>
```

### Step 2：在当前 Render 中安排延迟读取

```jsx
function readLater() {
  const scheduledCount = count;
  setTimeout(() => {
    setMessage(`回调看到：${scheduledCount}`);
  }, 2000);
}
```

`scheduledCount` 只是让“本次 Render 捕获了什么”更容易观察。

### Step 3：制造时间差

操作：

```text
count = 0
↓ 点击“2 秒后读取”
↓ 马上把 count 点到 3
↓ 等两秒
```

**观察**：当前页面是 3，旧 callback 仍显示 0。

**立即解释**：callback 是 `count=0` 那次 Render 创建的 JavaScript 函数；后续 Render 会创建新的函数环境，但不会回头改写旧 Closure。

### Step 4：在 count=3 时重新安排

新 callback 来自新的 Render，因此会捕获 3。

[查看最终源码](./src/main.jsx)

## 图解：时间流逝 ≠ 闭包自动更新

```text
Render A: count=0
  └─ callback A captures 0
        │
        ├─ Render B: count=1
        ├─ Render C: count=2
        ├─ Render D: count=3
        │
        └─ 2s later callback A runs → still 0
```

## 理论收束

异步 API 不是根因。真正模型是：**函数在某次 Render 中被创建 → JavaScript Closure 捕获那次 Render 可见的值 → 函数可以在未来才执行。** timeout、Promise、订阅、网络请求回调都可能出现同类现象。

## Wrong Way

- 认为“过了两秒变量自然会变成最新值”。
- 认为所有旧 Snapshot 都是 React Bug。
- 为了拿最新值直接把所有 State 都塞进 Ref，而没有先确认业务到底需要“点击时值”还是“执行时值”。

## Production Boundary

订单提交参数、点击时筛选条件等场景常常应该保留“发生动作那一刻”的 Snapshot；只有业务要求执行时最新值时，才需要别的更新/读取策略。

## 本课只记住 3 件事

1. callback 执行得晚，不代表捕获的值更新了。
2. 每次 Render 都可以创建自己的 callback 和 Closure。
3. 旧 Snapshot 是否错误取决于业务语义。

## Challenge

用 Promise + `setTimeout` 组合制造同样现象，并画出 callback 创建时刻和执行时刻。

## Mastery Check

- **Must**：能画出旧 callback 的 Render 时间轴。
- **Should**：能判断业务需要 captured value 还是 latest value。
- **Expert**：能把该模型迁移到 Effect、订阅和请求回调诊断。
