# RE-KP152：Urgent Update 与 Non-urgent Update

> [返回 Chapter 16](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 区分需要立即反馈的 Urgent Update 与允许后台准备的 Non-urgent Update。
2. 理解“优先级”是 UX 语义，而不是简单按代码先后顺序分类。
3. 解释为什么受控输入通常属于 Urgent Update。
4. 识别搜索结果、图表、页面切换等可能属于 Non-urgent Update 的场景。
5. 理解本节源码仍是同步基线，下一节才用 `startTransition` 改造。

> **本节核心代码**：同一次输入事件分别更新 `inputValue` 和 `listQuery`，但暂时都按普通同步更新处理，用于建立优先级问题。  
> **实验辅助代码**：`expensiveIncludes()` 人为增加列表 Render 成本，只用于让输入卡顿更容易观察。

## 理论讲解

### 1. Urgent Update：用户正在直接操作的反馈

典型 Urgent Update：

- 输入框字符回显；
- 按钮按下状态；
- 拖拽位置；
- 焦点与直接交互反馈。

用户输入一个字符时，希望输入框立刻显示该字符。任何明显延迟都会被感知为“页面卡了”。

### 2. Non-urgent Update：结果重要，但可以稍后完成

例如用户搜索商品时：

```text
键盘输入回显      → Urgent
搜索结果列表刷新  → 可以 Non-urgent
```

结果列表当然也重要，但通常不值得为了立刻完成昂贵列表 Render 而阻塞键盘输入。

### 3. 为什么不能只看是不是同一个事件

本节 `handleChange` 中两次更新都来自同一个 `onChange`：

```jsx
setInputValue(nextValue);
setListQuery(nextValue);
```

但两份 State 的 UX 优先级并不相同。

所以判断标准不是：

```text
是不是同一个事件触发？
```

而是：

```text
用户是否需要立刻看到这项更新？
```

### 4. Transition 不能拿来控制文本输入

React 的 Transition 更新不能用于控制文本输入。受控输入值应该保持普通更新；真正适合降为后台工作的，是昂贵结果区域对应的 State。

下一节会改成：

```text
setInputValue(nextValue)       // Urgent
startTransition(() => {
  setListQuery(nextValue)      // Non-urgent
})
```

### 5. Non-urgent 不等于“不重要”

Transition 不是把更新“丢掉”。它表达的是：

> 如果当前有更紧急的交互，React 可以优先处理紧急工作，并重新开始尚未提交的 Transition Render。

## 动手编码：从 0 到 1

### 第 0 步：准备受控输入

```jsx
const [inputValue, setInputValue] = useState('');
```

```jsx
<input value={inputValue} onChange={handleChange} />
```

目标：先保证字符回显由 React State 控制。

### 第 1 步：增加列表查询 State

```jsx
const [listQuery, setListQuery] = useState('');
```

它描述昂贵列表应该使用哪个查询条件。

### 第 2 步：在一次输入中同时更新两份 State

```jsx
function handleChange(event) {
  const nextValue = event.target.value;
  setInputValue(nextValue);
  setListQuery(nextValue);
}
```

运行后可以观察：逻辑简单，但两份更新目前没有优先级差异。

### 第 3 步：加入昂贵列表

最终源码使用：

```jsx
<SlowProductList query={listQuery} />
```

并通过 CPU 循环放大列表 Render 成本。

**为什么这样写？** 本节要先稳定复现“输入与昂贵 UI 同步绑定”的问题，下一节才有清晰的对照。

### 第 4 步：建立优先级标签

页面同时显示：

```text
输入值（Urgent）
列表查询（可视为 Non-urgent）
```

这一步不改变 React 调度，只建立正确分类。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`inputValue` 与 `listQuery` 的职责拆分，以及同一事件中两种 UX 优先级的识别。
- **实验辅助代码**：1500 条模拟商品和 CPU 循环只负责制造可观察的 Render 压力。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./16-concurrent-rendering-transition-deferred-value/kp152-urgent-vs-non-urgent-update --config ./vite.config.js
```

## 效果验证

1. 连续快速输入时，可以感觉昂贵列表 Render 影响输入响应。
2. 能指出 `inputValue` 为什么属于 Urgent Update。
3. 能指出 `listQuery` 为什么有条件成为 Non-urgent Update。
4. 能解释 Non-urgent 不代表更新可以被永久忽略。
5. 能解释为什么不能直接把受控输入的 `setInputValue` 放进 Transition。

完成后继续 **RE-KP153：startTransition**。
