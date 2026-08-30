# RE-KP125：Ignore Flag 与请求取消

> [返回 Chapter 13](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用 Effect cleanup 标记上一轮异步工作已经过期。
2. 使用局部 `ignore` flag 阻止 stale response 写入 State。
3. 理解每一轮 Effect 都拥有自己独立的局部 `ignore` 变量。
4. 明确“忽略结果”和“真正取消网络请求”不是同一件事。
5. 能修复 RE-KP124 中 Alice 慢响应覆盖 Bob 新结果的竞态。

> **本节核心代码**：Effect 内部创建 `let ignore = false`，cleanup 中设置为 `true`，异步结果只有在 `!ignore` 时才能写 State。  
> **实验辅助代码**：继续使用 Alice 慢、Bob 快的固定延迟，以便和上一课做一一对照。

## 理论讲解

### 1. Cleanup 不只能释放订阅，也能让旧异步结果失效

上一课的问题是：

```text
Alice 请求先发出
Bob 请求后发出
Bob 先返回
Alice 后返回并覆盖 Bob
```

当 `person` 从 Alice 变成 Bob 时，React 会在新的 Effect setup 前执行旧 Effect 的 cleanup。

这给了我们一个机会：

```jsx
let ignore = false;

return () => {
  ignore = true;
};
```

于是 Alice 那一轮 Effect 可以被标记为已经过期。

### 2. 每一轮 Effect 都有独立闭包

代码：

```jsx
useEffect(() => {
  let ignore = false;

  fetchBio(person).then(result => {
    if (!ignore) {
      setBio(result);
    }
  });

  return () => {
    ignore = true;
  };
}, [person]);
```

当 Alice Effect 运行时：

```text
Alice closure → ignore = false
```

切换 Bob 后：

```text
Alice cleanup → Alice ignore = true
Bob closure   → Bob ignore = false
```

所以 Alice 后续即使 resolve，也不会再更新 State。

### 3. Ignore Flag 不是网络层取消

这是非常重要的边界。

如果底层 Promise 已经开始：

```jsx
fetchBio('Alice')
```

cleanup 中执行：

```jsx
ignore = true;
```

并不会让请求从网络上消失。

它只表示：

```text
这个结果已经不再允许影响当前 React UI。
```

因此更准确的说法是：

```text
逻辑取消 / 忽略过期结果
```

而不是：

```text
真正终止 HTTP 请求
```

下一课才会使用 AbortController。

### 4. 为什么 ignore flag 仍然很重要

即使某些请求无法真正中止，或者异步工作不是 `fetch`，ignore flag 仍然可以保证：

```text
过期工作不会更新当前 State
```

它适用于：

- 不支持 AbortSignal 的旧 API。
- 自定义 Promise。
- SDK 回调。
- 多阶段异步逻辑中最终结果的有效性判断。

### 5. Cleanup 的语义不是“组件卸载才执行”

当依赖变化时，cleanup 也会执行。

这里正是利用：

```text
Alice cleanup
→ Alice result 失效
→ Bob setup
```

来治理竞态。

## 动手编码：从 0 到 1

### 第 0 步：复用上一课的请求实验

仍然保持：

```jsx
Alice = 1200ms
Bob = 300ms
```

这样修复前后可以直接比较。

### 第 1 步：在 Effect 中创建局部 ignore

```jsx
useEffect(() => {
  let ignore = false;
  // ...
}, [person]);
```

不要把 `ignore` 放到组件外层共享。

### 第 2 步：结果写入前检查有效性

```jsx
fetchBio(person).then(result => {
  if (!ignore) {
    setBio(result);
  }
});
```

### 第 3 步：cleanup 标记本轮工作过期

```jsx
return () => {
  ignore = true;
};
```

当 person 改变，上一轮 cleanup 会先运行。

### 第 4 步：重新运行 Alice → Bob 实验

```jsx
function runRace() {
  setPerson('Alice');
  setTimeout(() => setPerson('Bob'), 100);
}
```

Bob 仍会先返回。

Alice 也仍会在 1200ms 后 resolve，但它的 `ignore` 已经是 `true`。

### 第 5 步：记录被忽略的旧结果

实验源码会把：

```text
忽略过期结果：Alice ...
```

写入 Console，帮助观察“请求仍完成，但结果不再写 State”。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：cleanup 驱动的局部 `ignore` flag。
- **实验辅助代码**：固定延迟与 Console 输出只用于证明旧请求仍完成但已失效。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./13-effect-advanced-races-useeffectevent/kp125-ignore-flag-request-cleanup --config ./vite.config.js
```

## 效果验证

1. 点击“运行修复后的竞态实验”。
2. 当前 person 最终是 Bob。
3. Bob 响应先返回并显示在 UI。
4. Alice 稍后仍会 resolve，但 Console 会显示它被忽略。
5. UI 不再被 Alice 的旧响应覆盖。
6. 能解释 ignore flag 为什么不是底层请求取消。

完成后继续 **RE-KP126：AbortController 与 Effect**。
