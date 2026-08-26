# RE-KP034：事件捕获

> [返回 Chapter 04](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解事件传播不只有冒泡阶段，还有捕获阶段。
2. 会使用 `onClickCapture`。
3. 能描述一次点击的基本顺序：Capture → Target → Bubble。
4. 知道捕获阶段适合少量全局观察、路由或分析类场景，不应成为普通业务交互的默认写法。
5. 理解 `onClickCapture` 与普通 `onClick` 的职责差异。

> **本节核心代码**：`onClickCapture` 与普通 `onClick` 的执行顺序。  
> **实验辅助代码**：Console 序号日志用于直接观察三阶段顺序。

## 理论讲解

### 1. 事件传播的三阶段直觉

点击嵌套按钮时，可以先建立：

```text
1. Capture：从外向内
2. Target：目标元素 Handler
3. Bubble：从内向外
```

React 中捕获版本通常在事件名后加：

```text
Capture
```

例如：

```jsx
onClickCapture={handleCapture}
```

### 2. 捕获为什么比目标 Handler 更早执行

结构：

```jsx
<div onClickCapture={handleCapture} onClick={handleBubble}>
  <button onClick={handleButtonClick}>运行</button>
</div>
```

点击按钮时，预期顺序：

```text
parent capture
button click
parent bubble
```

也就是说外层可以在目标元素真正进入普通 `onClick` 之前先观察到事件。

### 3. 捕获适合什么场景

React 官方文档给出的典型方向包括：

```text
路由
分析统计
需要观察子树交互的底层基础设施
```

普通业务按钮一般不需要为了“高级”就使用 Capture。

### 4. Capture 和 Bubble 是传播方向，不是两个事件

它们是同一次用户交互的不同传播阶段。

不要理解成：

```text
用户点击一次
React 创建两个完全无关的 click
```

更准确是：

```text
一次 click
在传播过程中经过不同阶段
```

### 5. 和 stopPropagation 的关系

`stopPropagation()` 会影响后续传播，但捕获阶段本身发生得更早。

RE-KP035 会通过具体案例学习停止传播，本节只先看正常完整路径。

## 动手编码：从 0 到 1

### 第 0 步：准备嵌套结构

```jsx
<section>
  <button>执行任务</button>
</section>
```

### 第 1 步：外层加入捕获 Handler

```jsx
function handleCapture() {
  console.log('1. parent capture');
}
```

绑定：

```jsx
<section onClickCapture={handleCapture}>
```

### 第 2 步：按钮加入普通 Handler

```jsx
function handleButtonClick() {
  console.log('2. button click');
}
```

### 第 3 步：父层再加入普通冒泡 Handler

```jsx
function handleBubble() {
  console.log('3. parent bubble');
}
```

### 第 4 步：一次点击观察三阶段

点击按钮，Console 应按：

```text
1. parent capture
2. button click
3. parent bubble
```

### 第 5 步：再加入第二层容器做扩展实验

可以临时套一个外层 `onClickCapture`，观察捕获阶段如何从更外层逐步向目标靠近。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：`onClickCapture` / `onClick`。
- **实验辅助代码**：序号日志只用于展示执行顺序。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./04-events-and-interactions/kp034-event-capture --config ./vite.config.js
```

## 效果验证

1. 捕获 Handler 最先执行。
2. 目标按钮普通 `onClick` 第二个执行。
3. 父层普通 `onClick` 最后在冒泡阶段执行。
4. 能解释 `onClickCapture` 为什么不应该成为所有按钮逻辑的默认位置。
5. 能画出 Capture → Target → Bubble 的最小传播图。

完成后继续 **RE-KP035：stopPropagation 与 preventDefault**。
