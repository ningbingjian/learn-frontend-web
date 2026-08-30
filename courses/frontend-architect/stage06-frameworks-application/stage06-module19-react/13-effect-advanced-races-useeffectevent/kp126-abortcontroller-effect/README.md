# RE-KP126：AbortController 与 Effect

> [返回 Chapter 13](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `AbortController` / `AbortSignal` 的基本协作模型。
2. 在 Effect setup 中为本轮请求创建独立 controller。
3. 在 cleanup 中调用 `controller.abort()` 中止旧请求。
4. 正确识别并忽略 `AbortError`，而不是把主动取消当业务失败。
5. 区分“ignore stale result”和“真正让可取消异步操作停止工作”。

> **本节核心代码**：Effect 创建 `AbortController`，把 `signal` 传给请求，cleanup 调用 `abort()`。  
> **实验辅助代码**：`fetchBio()` 是一个支持 AbortSignal 的本地模拟请求，保证课程无需真实网络也能稳定复现取消行为。

## 理论讲解

### 1. AbortController 的基本模型

创建：

```jsx
const controller = new AbortController();
```

得到：

```jsx
controller.signal
```

把 signal 传给支持取消的异步 API：

```jsx
fetch(url, { signal: controller.signal });
```

需要取消时：

```jsx
controller.abort();
```

### 2. Effect 的每轮请求应该有自己的 Controller

推荐：

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetchSomething({ signal: controller.signal });

  return () => {
    controller.abort();
  };
}, [dependency]);
```

不要把所有请求共用一个长期 controller，否则一次 abort 可能影响错误的工作。

### 3. Cleanup 正好对应“旧同步已经结束”

当 person 从 Alice 变成 Bob：

```text
Alice cleanup
→ Alice controller.abort()
→ Bob setup
→ Bob 创建新 controller
```

这和 Effect 生命周期天然匹配。

### 4. Abort 与 Ignore 的差异

Ignore flag：

```text
旧任务可以继续运行
但结果不再影响 UI
```

AbortController：

```text
如果底层 API 支持 AbortSignal
旧任务可以被真正通知停止
```

二者解决的侧重点不同。

工程中有时还会同时使用：

```text
AbortController：减少无用工作
Ignore / version check：保证最终写入仍然有效
```

因为并不是所有异步步骤都一定能被 abort。

### 5. AbortError 不是普通失败

真实 `fetch` 被 abort 后通常会 reject。

应该区分：

```jsx
if (error.name === 'AbortError') {
  return;
}
```

主动取消通常不应该向用户显示“请求失败”。

## 动手编码：从 0 到 1

### 第 0 步：准备支持 signal 的模拟请求

函数签名：

```jsx
function fetchBio(person, { signal }) {
  // ...
}
```

它会监听：

```jsx
signal.addEventListener('abort', handleAbort, { once: true });
```

### 第 1 步：Effect 每轮创建 controller

```jsx
const controller = new AbortController();
```

### 第 2 步：把 signal 传给请求

```jsx
fetchBio(person, { signal: controller.signal })
```

真实浏览器 `fetch` 也是相同模式：

```jsx
fetch(url, { signal: controller.signal })
```

### 第 3 步：cleanup 中 abort

```jsx
return () => {
  controller.abort();
};
```

### 第 4 步：区分 AbortError

```jsx
.catch(error => {
  if (error.name === 'AbortError') {
    console.log('旧请求已取消');
    return;
  }

  setBio(`请求失败：${error.message}`);
});
```

### 第 5 步：重新运行 Alice → Bob

Alice 先启动。

100ms 后切换 Bob 时，Alice cleanup 会立即 abort Alice 的模拟请求。

Bob 使用新的 controller，300ms 后正常完成。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`AbortController → signal → cleanup abort()`。
- **实验辅助代码**：本地可取消 Promise 模拟真实 `fetch` 的 AbortSignal 行为。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./13-effect-advanced-races-useeffectevent/kp126-abortcontroller-effect --config ./vite.config.js
```

## 效果验证

1. 点击“运行 AbortController 实验”。
2. Alice 请求先开始。
3. 切换 Bob 时，Console 显示 Alice 请求被 abort。
4. Alice 不会再等待完整 1200ms 后写入结果。
5. Bob 正常完成并成为最终 UI 数据。
6. 能解释 AbortController 与 ignore flag 的差异。

完成后继续 **RE-KP127：对象依赖导致重复执行**。
