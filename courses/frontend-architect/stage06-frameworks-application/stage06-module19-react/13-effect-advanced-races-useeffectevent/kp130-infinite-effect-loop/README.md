# RE-KP130：无限 Effect 循环诊断

> [返回 Chapter 13](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 记住 Effect 无限循环成立的两个必要条件。
2. 会从“Effect 是否更新 State”和“该更新是否改变 Effect 依赖”两条链路定位循环。
3. 会先判断这个 Effect 是否根本不需要存在。
4. 知道非渲染数据可以考虑 Ref，而不是用 State 制造循环。
5. 能使用 Console / `Object.is` 辅助诊断不断变化的依赖。

> **本节核心代码**：受控实验展示 `Effect → setState → Render → dependency change → Effect` 回路；修复版本将明确用户动作放回 Event Handler。  
> **实验辅助代码**：为了避免真的卡死浏览器，错误模式最多自动增加到 5 次；这个上限不是生产修复方案。

## 理论讲解

### 1. 无限循环需要两个条件同时成立

React 官方对 Effect 无限循环的诊断可以归纳为：

1. Effect 更新了某个 State；
2. 这个 State 更新触发 Render，并让 Effect 的某个依赖再次变化。

形成：

```text
Effect
→ setState
→ Render
→ dependency changes
→ Effect
→ ...
```

### 2. 最直接的危险代码

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
}, [count]);
```

`count` 是依赖，而 Effect 每次又修改 `count`，回路闭合。

如果没有终止条件，就会持续执行。

### 3. 第一问不是“怎么补依赖数组”

先问：

```text
这个 Effect 在同步什么外部系统？
```

如果答案是“没有，只是想修改应用内部 State”，那么很可能应该移除 Effect。

例如用户点击按钮增加计数：

```jsx
<button onClick={() => setCount(value => value + 1)}>
```

这是 Event，而不是 Effect。

### 4. 如果确实需要 Effect，定位变化依赖

可以在 Render 中打印：

```jsx
console.log([roomId, options]);
```

保存两次输出后逐项比较：

```js
Object.is(previous[0], next[0]);
Object.is(previous[1], next[1]);
```

对象/函数每次 Render 新建，常常是“看起来值一样但依赖一直变”的原因。

### 5. 不参与 UI 的值不要强行放 State

如果某个数据只用于记录计时器 ID、请求序号、上一次值等，并不参与渲染，可以考虑 Ref。

Ref 修改不会触发 Render，因此不会因为单纯记录辅助数据而形成 State 更新回路。

### 6. 常见错误修复

不要只做：

```text
删掉 dependency
关闭 linter
加 didRun Ref 跳过 Effect
```

这些做法经常只是隐藏同步模型的问题。

## 动手编码：从 0 到 1

### 第 0 步：准备两个计数器

一个用于“受控复现错误模式”，另一个用于“事件驱动修复”。

### 第 1 步：写出危险回路

```jsx
useEffect(() => {
  setLoopCount(loopCount + 1);
}, [loopCount]);
```

这段如果不限制就会无限循环。

### 第 2 步：为课程实验加安全上限

```jsx
if (loopCount < 5) {
  setLoopCount(loopCount + 1);
}
```

这个 guard **只为了让实验可运行**，不是推荐的业务修复。

### 第 3 步：观察回路

点击“启动受控实验”，观察计数连续增长到 5。

每一次增长都经过完整的 Effect → State → Render → Effect 回路。

### 第 4 步：写出正确事件版本

```jsx
function handleIncrement() {
  setSafeCount(value => value + 1);
}
```

用户点一次，State 更新一次，不需要 Effect 中转。

### 第 5 步：建立诊断清单

遇到循环时依次问：

```text
1. Effect 是否 setState？
2. 这个 State 是否直接/间接改变 dependency？
3. 是否存在外部系统？
4. 能否在 Render 或 Event 中完成？
5. 依赖是否是每次新建的对象/函数？
```

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：安全复现闭环与 Event Handler 修复。
- **实验辅助代码**：最大 5 次限制用于防止教学案例锁死页面。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./13-effect-advanced-races-useeffectevent/kp130-infinite-effect-loop --config ./vite.config.js
```

## 效果验证

1. 启动受控实验后，`loopCount` 会连续增长到 5，而不是只增长一次。
2. 能画出每次增长中的 Effect → setState → Render → dependency change 回路。
3. Safe Counter 只有点击按钮时才更新。
4. 能说明实验中的 `count < 5` 只是安全阀，不是正式修复。
5. 能说出无限循环的两个必要条件。

完成后进入 **Chapter 14：RE-KP131：useLayoutEffect**。
