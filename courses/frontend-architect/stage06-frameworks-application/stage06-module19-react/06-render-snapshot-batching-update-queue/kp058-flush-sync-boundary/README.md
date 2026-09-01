# RE-KP058：flushSync 打破批处理的适用边界

> [返回 Chapter 06](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 课程元信息

| 项目 | 内容 |
|---|---|
| 课程类型 | `FAILURE-LAB` + `BUILD-LAB` |
| 学习深度 | Should |
| 前置课程 | RE-KP057：React 18+ 自动批处理范围 |
| 本课主问题 | 为什么 `setState` 后立刻读取 DOM 可能还是旧内容？什么时候才值得强制同步提交？ |
| Learning Artifact | 普通更新 vs `flushSync` 后的同步 DOM 读取结果 |
| 暂时不用理解 | Suspense 内部调度、Commit 源码 |

## 这节课只需要搞懂什么

1. 普通 setter 不承诺当前同步函数下一行已经拿到新 DOM。
2. `flushSync` 是给浏览器 / 第三方系统同步集成用的 Escape Hatch。
3. 它可能伤害性能，不能当作“更强的 setState”。

## 本课主问题：先制造失败

页面显示：

```jsx
<p id="count-value">当前 count：{count}</p>
```

如果执行：

```jsx
setCount(count + 1);
const text = document.getElementById('count-value').textContent;
```

你觉得 `text` 一定已经是新值吗？先不要看答案。

## 动手实验：从 0 到 1

### Step 0：普通更新

先只写：

```jsx
setCount(count + 1);
```

React 会正常更新页面。

### Step 1：更新后立即读取 DOM

```jsx
setCount(count + 1);
const text = document.getElementById('count-value').textContent;
```

**观察**：页面最终会 +1，但同步读取记录可能还是旧 DOM。

**立即解释**：setter 请求下一版 UI；React 不承诺当前事件处理器下一行已经完成 Commit。

### Step 2：引入真正的外部同步约束

假设第三方库要求：

> “这个函数返回之前，DOM 必须已经更新，我马上就要测量它。”

这时才有理由引入：

```jsx
import { flushSync } from 'react-dom';
```

### Step 3：强制同步 flush

```jsx
flushSync(() => {
  setCount(count + 1);
});

const text = document.getElementById('count-value').textContent;
```

**观察**：`flushSync` 返回后再读 DOM，应看到对应的新内容。

### Step 4：交替点击两个按钮

反复比较“普通更新”和“flushSync 更新”，把差异和调用时机对应起来。

[查看最终源码](./src/main.jsx)

## 图解

```text
默认更新
setState
  ↓
React 保留 batching / 调度空间
  ↓
之后 Render + Commit

外部同步集成
flushSync(callback)
  ↓
callback 中登记更新
  ↓
同步完成必要 DOM 更新
  ↓
返回给第三方代码
```

## 理论收束

`flushSync(callback)` 来自 `react-dom`。它告诉 React：为了这个明确的同步集成边界，请在返回前完成 callback 中必要的更新。它可能同步 flush 其他必要工作、运行 pending Effect，甚至影响 Suspense fallback，因此是 Escape Hatch。

## Wrong Way

```jsx
function handleClick() {
  flushSync(() => setA(...));
  flushSync(() => setB(...));
  flushSync(() => setC(...));
}
```

如果只是普通 React UI，这种写法是在主动破坏 React 的 batching 和调度空间。

## Production Boundary

适合：打印、同步 DOM 测量、必须在某个浏览器 API 回调结束前完成 DOM 的第三方集成。普通业务状态流不要使用。

## 本课只记住 3 件事

1. setter 后下一行不等于 DOM 已 Commit。
2. `flushSync` 用于明确同步 DOM 契约。
3. 默认让 React batching；`flushSync` 是少数边界工具。

## Challenge

把 DOM 读取换成 `getBoundingClientRect()`，模拟一个必须马上测量尺寸的第三方库，并分别验证普通更新与 `flushSync`。

## Mastery Check

- **Must**：知道为什么普通 setter 后不能假设 DOM 已更新。
- **Should**：能判断一个第三方集成是否真的需要 `flushSync`。
- **Expert**：能在架构评审中拒绝把 `flushSync` 当通用性能修复手段。
