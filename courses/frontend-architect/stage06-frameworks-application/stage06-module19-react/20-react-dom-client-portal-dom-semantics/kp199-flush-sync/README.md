# RE-KP199：flushSync

> [返回 Chapter 20](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

1. 理解 `flushSync(callback)` 会强制 React 同步 flush callback 中的更新。
2. 观察普通事件中的 State Update 与“下一行立刻读取 DOM”之间的时序差异。
3. 理解 `flushSync` 主要面向第三方库、浏览器 API 等同步 DOM 集成边界。
4. 知道 `flushSync` 可能伤害性能、触发 pending Effects 或让 Suspense fallback 重新出现，应作为最后手段。

## 理论讲解

React 通常会批处理更新，因此：

```js
setCount(value => value + 1);
console.log(domNode.textContent);
```

在同一个事件处理函数里，下一行读取到的 DOM 不一定已经反映本次 State Update。

极少数第三方/浏览器集成要求：

```text
在 callback 返回之前
DOM 必须已经是最新状态
```

这时可以：

```js
flushSync(() => {
  setCount(value => value + 1);
});

// 到这里 DOM 已更新
```

但 `flushSync` 不是“让 React 更快”的优化手段。它会强制同步工作，频繁使用可能明显伤害并发调度和性能。

## 动手编码：从 0 到 1

### 第 1 步：给 Count DOM 一个 Ref

```js
const countRef = useRef(null);
```

```jsx
<p ref={countRef}>Count：{count}</p>
```

### 第 2 步：普通更新后立即读 DOM

```js
const before = countRef.current.textContent;
setCount(value => value + 1);
const immediatelyAfter = countRef.current.textContent;
```

**预期观察**：同一个 click handler 中，`immediatelyAfter` 仍可能是更新前文本；事件结束后 React 才把新 Count commit 到 DOM。

### 第 3 步：导入 flushSync

```js
import { flushSync } from 'react-dom';
```

### 第 4 步：把必须同步完成的更新包起来

```js
flushSync(() => {
  setCount(value => value + 1);
});
```

### 第 5 步：flushSync 返回后立即读取 DOM

```js
const immediatelyAfter = countRef.current.textContent;
```

**预期观察**：这里已经看到新的 Count。

### 第 6 步：建立工程使用边界

适合考虑 `flushSync` 的问题通常长这样：

```text
React State Update
   ↓
第三方/浏览器 API 立刻读取 DOM
   ↓
它要求当前 callback 结束前 DOM 已同步更新
```

如果只是普通 React UI 更新，不应为了“保险”到处加 `flushSync`。

## 运行案例

```bash
npm run dev
```

交替点击两个按钮，对比页面 log 中“同一事件内立刻读取”的文本。

## 效果验证

- 普通更新保持 React 默认批处理语义。
- `flushSync` 返回后 DOM 已同步反映 callback 内的更新。
- 两种方式最终都能得到正确 UI；区别是第三方同步读取的时机保证。

**本节核心代码**：`flushSync(() => setCount(...))`。

**实验辅助代码**：DOM Ref 和 log 只负责观察“下一行代码读取 DOM”时的时序差异。
