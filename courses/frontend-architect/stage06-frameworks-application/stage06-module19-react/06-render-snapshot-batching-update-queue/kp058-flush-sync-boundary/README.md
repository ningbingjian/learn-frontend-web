# RE-KP058：flushSync 打破批处理的适用边界

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `flushSync` 的作用：强制 React 同步应用 callback 中必要的更新。
2. 知道它主要服务于浏览器 API、第三方 UI 库等必须立即读取最新 DOM 的集成场景。
3. 能解释普通 setter 后立即读 DOM 为什么可能还是旧内容。
4. 会从 `react-dom` 导入 `flushSync`。
5. 知道 `flushSync` 可能显著影响性能，不能作为普通更新的默认写法。
6. 理解 `flushSync` 仍是 Escape Hatch，不改变 React 默认 batching 的推荐方向。

> **本节核心代码**：`flushSync(() => setCount(...))` 后立即读取 DOM。  
> **实验辅助代码**：`document.getElementById()` 与读取结果文本只用于模拟第三方集成读取 DOM。

## 理论讲解

### 1. 为什么普通 setState 后 DOM 不一定立刻变

写：

```jsx
setCount(count + 1);
```

表示请求一次更新。

在当前事件处理器继续执行时：

```text
当前 Render 的 State Snapshot 没有变
DOM 也不要求已经同步提交
```

所以紧接着：

```js
const text = document.getElementById('count-value').textContent;
```

可能读到更新前的 DOM。

### 2. 大多数业务代码根本不应该依赖“立刻读新 DOM”

普通 React 业务应该优先：

```text
更新 State
↓
让 React 完成 Render / Commit
↓
下一轮 UI 自然反映新状态
```

而不是每次 setter 后都手工查询 DOM。

### 3. 哪些场景可能真的需要同步 DOM

典型方向是：

- 浏览器 API 要求回调结束前 DOM 已经更新。
- 第三方非 React UI 库在同一个同步流程里读取 DOM。
- 某些打印、测量或滚动集成必须马上看到更新后的节点。

这时可以考虑：

```jsx
flushSync(() => {
  setCount(count + 1);
});
```

当 `flushSync` 返回时，React 会保证 callback 中必要的 DOM 更新已经同步应用。

### 4. flushSync 从哪里导入

```jsx
import { flushSync } from 'react-dom';
```

不是：

```jsx
import { flushSync } from 'react';
```

也不是从 `react-dom/client` 导入。

### 5. flushSync 为什么必须慎用

React 官方明确提醒：

```text
flushSync 可能显著伤害性能
```

它会打破 React 原本可以 batching / 调度的空间。

而且它可能：

- 同步 flush 其他必要的 pending update。
- 让 Suspense fallback 重新出现。
- 运行某些 pending Effect 以及其中的更新。

因此不要把它理解成：

```text
更强、更高级的 setState
```

### 6. 正确心智模型

默认：

```text
让 React batching 和调度
```

只有明确的外部集成约束要求：

```text
“这个同步函数返回前，DOM 必须已经是新值”
```

才考虑 `flushSync`。

## 动手编码：从 0 到 1

### 第 0 步：准备计数 DOM

```jsx
<p id="count-value">当前 count：{count}</p>
```

### 第 1 步：普通更新后立即读 DOM

```jsx
function updateNormally() {
  setCount(count + 1);

  const text = document.getElementById('count-value').textContent;
  setLastRead(`普通更新后立即读取：${text}`);
}
```

你会看到：

```text
页面最终 count 已经 +1
但 lastRead 记录的却可能还是旧 DOM
```

### 第 2 步：导入 flushSync

```jsx
import { flushSync } from 'react-dom';
```

### 第 3 步：强制同步应用更新

```jsx
function updateWithFlushSync() {
  flushSync(() => {
    setCount(count + 1);
  });

  const text = document.getElementById('count-value').textContent;
  setLastRead(`flushSync 后立即读取：${text}`);
}
```

此时读取结果应该已经对应新 DOM。

### 第 4 步：对比两个按钮

不断交替点击：

```text
普通更新
flushSync 更新
```

观察 `lastRead`。

### 第 5 步：明确实验边界

`document.getElementById` 在这里是为了模拟外部系统立即读 DOM。

真实 React 业务不应为了读取普通 UI 状态就绕过 React 数据流。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`flushSync` 的同步 DOM 边界。
- **实验辅助代码**：DOM 查询与读取结果展示。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./06-render-snapshot-batching-update-queue/kp058-flush-sync-boundary --config ./vite.config.js
```

## 效果验证

1. 点击“普通更新并立即读 DOM”。
2. 页面 count 最终增加，但读取记录可显示更新前的 DOM。
3. 点击“flushSync 更新并立即读 DOM”。
4. 读取记录应反映同步后的新 DOM。
5. 能解释为什么不应该为了普通 UI 更新到处使用 `flushSync`。

完成后继续 **RE-KP059：异步回调中的快照理解**。
