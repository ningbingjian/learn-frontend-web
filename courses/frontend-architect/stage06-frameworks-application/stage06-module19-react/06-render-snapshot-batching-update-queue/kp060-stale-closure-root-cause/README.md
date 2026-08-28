# RE-KP060：Stale Closure 的根源

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用“Render Snapshot + JavaScript Closure”解释 stale closure。
2. 识别异步回调里 `setCount(count + 1)` 可能覆盖新状态的问题。
3. 理解 updater function 为什么能解决“基于最新 pending state 更新”这一类问题。
4. 知道 updater function 不是让整个闭包 magically 变成最新值。
5. 知道以后还会通过 Ref、Effect Event 等工具解决其他“需要最新值”的场景。

> **本节核心代码**：对比 delayed `setCount(count + 1)` 和 delayed `setCount(current => current + 1)`。  
> **实验辅助代码**：`+10` 按钮用于在延迟期间制造更新，方便暴露 stale closure。

## 理论讲解

### 1. stale closure 到底是什么

“Stale” 可以理解成：

```text
过期的、旧的
```

“Closure” 是 JavaScript 闭包。

React 中常见 stale closure 的根源是：

```text
某次 Render 创建函数
↓
函数闭包捕获那次 Render 的 State / Props
↓
函数未来才执行
↓
业务却错误地把旧值当成最新值
```

### 2. 一个典型 Bug

当前：

```text
count = 0
```

安排：

```jsx
setTimeout(() => {
  setCount(count + 1);
}, 2000);
```

这里 callback 捕获：

```text
count = 0
```

然后两秒内用户把页面更新到：

```text
count = 10
```

定时器最终执行：

```jsx
setCount(0 + 1);
```

结果页面突然变成：

```text
1
```

这就是一个真正会破坏业务状态的 stale closure Bug。

### 3. 为什么 updater function 可以修这类问题

如果真正需求是：

```text
“回调执行时，在当时最新 State 基础上 +1”
```

应该写：

```jsx
setCount(current => current + 1);
```

React 执行 updater 时，会把队列处理到该更新时的 pending state 传入 `current`。

所以即使 callback 自己是旧 Render 创建的，更新逻辑也不再依赖闭包里的旧 `count`。

### 4. updater 并不会刷新整个闭包

非常重要：

```jsx
setTimeout(() => {
  console.log(count);
  setCount(current => current + 1);
}, 2000);
```

其中：

```text
console.log(count)
```

仍然可能打印旧 Snapshot。

只有 updater 参数：

```text
current
```

来自 React 的更新队列。

因此不能说：

```text
“用了函数式更新以后闭包就变新了”
```

### 5. stale closure 不只发生在 setTimeout

还常见于：

```text
Promise
async/await
订阅回调
Effect 中的回调
定时器
第三方库注册的 callback
```

后续 Ref、Effect、`useEffectEvent` 等章节会继续学习其他解决方式。

### 6. 判断修法之前先问需求

如果业务真正想要的是：

```text
点击那一刻的值
```

旧 Snapshot 正确。

如果业务想要的是：

```text
执行那一刻基于最新状态继续更新
```

则 updater function 往往是正确工具。

如果业务想要：

```text
异步 callback 中读取某个真正最新的非渲染值
```

则要考虑后续 Ref 等模式。

不要把所有 stale closure 都机械地换成 updater。

## 动手编码：从 0 到 1

### 第 0 步：准备 count

```jsx
const [count, setCount] = useState(0);
```

### 第 1 步：加入 +10

```jsx
<button onClick={() => setCount(current => current + 10)}>
  立即 +10
</button>
```

### 第 2 步：制造 stale delayed update

```jsx
function scheduleStaleIncrement() {
  setTimeout(() => {
    setCount(count + 1);
  }, 2000);
}
```

实验：

```text
count=0
安排 stale +1
马上点击 +10
两秒后 count 可能从 10 被覆盖成 1
```

### 第 3 步：加入安全 updater 版本

```jsx
function scheduleUpdaterIncrement() {
  setTimeout(() => {
    setCount(current => current + 1);
  }, 2000);
}
```

实验：

```text
count=0
安排 updater +1
马上点击 +10
两秒后最终应为 11
```

### 第 4 步：理解两种需求不同

旧值版本不是语法错误。

它只是实现了：

```text
用“安排任务那一刻”的 count 计算未来值
```

而 updater 实现：

```text
用“执行更新时队列中的 pending state”继续计算
```

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：旧 closure replacement update vs updater function。
- **实验辅助代码**：重置和 +10 按钮用来快速制造冲突。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp060-stale-closure-root-cause --config ./vite.config.js
```

## 效果验证

1. 重置为 0。
2. 安排 stale +1，然后立即 +10。
3. 两秒后观察旧 closure 是否把值改成 1。
4. 再重置为 0。
5. 安排 updater +1，然后立即 +10。
6. 两秒后应得到 11。
7. 能解释 updater 为什么修复“基于最新 State 更新”，但不会让旧 closure 里所有变量自动刷新。

完成后 Chapter 06 收官，继续 **RE-KP061：组件树中的位置决定身份**。
