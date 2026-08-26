# RE-KP038：Synthetic Event 的现代认知

> [返回 Chapter 04](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 React 事件处理器接收到的是 React Event Object，也常被称为 Synthetic Event。
2. 会读取 `type`、`target`、`currentTarget`、`defaultPrevented` 等常用属性。
3. 理解 `target` 与 `currentTarget` 的区别。
4. 知道需要底层浏览器事件时可以读取 `event.nativeEvent`。
5. 知道 React DOM 现代用法中不需要依赖 `persist()` 来“保留事件对象”。
6. 知道某些 React 事件与底层原生事件不是一一同名映射，不能依赖内部映射细节写业务逻辑。

> **本节核心代码**：在 React `onClick` Handler 中读取 `event.target`、`event.currentTarget` 与 `event.nativeEvent`。  
> **实验辅助代码**：`console.table()` 和嵌套 `<strong>` 只用于让事件属性差异可观察。

## 理论讲解

### 1. React 事件对象是什么

在 JSX 中：

```jsx
<button onClick={handleClick}>点击</button>
```

Handler 可以接收：

```jsx
function handleClick(event) {
  console.log(event);
}
```

这个 `event` 是 React 提供给事件处理器的事件对象。

React 官方文档仍然会把它称为：

```text
React event object
Synthetic Event
```

它遵循常见 DOM Event 接口，同时抹平一部分浏览器差异。

### 2. `target` 与 `currentTarget`

这是最值得第一时间分清的两个属性。

假设：

```jsx
<button onClick={handleClick}>
  点击 <strong>内部文字</strong>
</button>
```

如果真正点到 `<strong>`：

```text
event.target
→ 实际触发事件的节点
→ STRONG

 event.currentTarget
→ 当前 React Handler 绑定的节点
→ BUTTON
```

所以：

```text
谁被点到？        target
谁正在处理事件？  currentTarget
```

### 3. `nativeEvent`

React 事件对象额外提供：

```js
event.nativeEvent
```

它指向底层浏览器 `Event`。

但不要反过来依赖：

```text
React onXxx 一定映射成某个固定 native event 名称
```

因为部分 React 事件并不和底层浏览器事件一一对应，具体映射不是稳定公共 API。

### 4. `persist()` 的现代认知

老 React 教程里可能会看到：

```js
event.persist()
```

现代 React DOM 中，这个方法不需要用于“让事件在异步代码中继续可读”。

因此学习 React DOM 时，不要再把“每个异步 Handler 都先 `persist()`”当成固定模板。

### 5. Synthetic 不等于“假的事件”

Synthetic Event 并不是“模拟一个和浏览器完全无关的假事件”。

更合理的理解是：

```text
浏览器真实交互
      ↓
React 事件系统
      ↓
React Event Object
      ↓
你的 Handler
```

需要底层事件时仍然有 `nativeEvent` 入口。

## 动手编码：从 0 到 1

### 第 0 步：准备按钮

先建立：

```jsx
<button>检查事件对象</button>
```

### 第 1 步：绑定 Handler

```jsx
function handleClick(event) {
  console.log(event);
}
```

然后：

```jsx
<button onClick={handleClick}>检查事件对象</button>
```

### 第 2 步：加入嵌套元素

把按钮内容改成：

```jsx
<button onClick={handleClick}>
  点击 <strong>内部文字</strong>
</button>
```

这样可以专门点击 `<strong>`，观察 `target` 和 `currentTarget` 是否不同。

### 第 3 步：打印关键属性

```jsx
function handleClick(event) {
  console.table({
    reactType: event.type,
    target: event.target.tagName,
    currentTarget: event.currentTarget.tagName,
    nativeType: event.nativeEvent.type,
    defaultPrevented: event.defaultPrevented,
  });
}
```

### 第 4 步：观察 `persist`

再打印：

```jsx
console.log('persist type:', typeof event.persist);
```

重点不是调用它，而是建立现代 React DOM 认知：业务代码不需要把 `persist()` 当成异步事件的必备动作。

### 第 5 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：React Event Object 的常用字段与 `nativeEvent`。
- **实验辅助代码**：嵌套 `<strong>` 和 Console 输出用于制造可观察差异。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./04-events-and-interactions/kp038-synthetic-event --config ./vite.config.js
```

打开浏览器 Console，并点击按钮内部的加粗文字。

## 效果验证

1. 能说清 React Event Object 为什么也叫 Synthetic Event。
2. 点击 `<strong>` 时能观察到 `target=STRONG`、`currentTarget=BUTTON`。
3. 能通过 `nativeEvent` 访问底层浏览器事件。
4. 不再把 `event.persist()` 当成现代 React DOM 的必备异步模板。
5. 知道 React 事件到 native event 的具体映射不应作为稳定业务 API 依赖。

完成后继续 **RE-KP039：原生 DOM 事件与 React 事件的边界**。
