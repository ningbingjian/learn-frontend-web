# RE-KP033：事件冒泡

> [返回 Chapter 04](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释事件从目标元素向祖先元素传播的“冒泡”现象。
2. 区分 `event.target` 与 `event.currentTarget`。
3. 亲手观察子按钮点击后父级 `onClick` 也被调用。
4. 知道 React 中大多数常见事件会传播，但 `onScroll` 是常见例外。
5. 理解冒泡是事件传播机制，不等于组件层级中的函数自动调用。

> **本节核心代码**：父子元素同时注册 `onClick`，观察事件从 Target 向上冒泡。  
> **实验辅助代码**：Console 顺序日志与 `target/currentTarget` 输出用于观察传播路径。

## 理论讲解

### 1. 什么是冒泡

页面结构：

```jsx
<div onClick={handlePanelClick}>
  <button onClick={handleButtonClick}>导出</button>
</div>
```

点击按钮时，通常会发生：

```text
button 的 onClick
       ↓
div 的 onClick
```

也就是事件从实际发生位置向祖先元素传播。

### 2. `target` 和 `currentTarget`

在父级 Handler 中：

```js
function handlePanelClick(event) {
  console.log(event.target);
  console.log(event.currentTarget);
}
```

如果你点击的是内部按钮：

```text
event.target
→ 真正触发事件的按钮

event.currentTarget
→ 当前正在执行 Handler 的父级 div
```

这两个概念在事件委托和复杂交互中非常重要。

### 3. 冒泡为什么有用

父容器可以统一处理一组子元素的交互：

```text
Toolbar
 ├─ PlayButton
 ├─ UploadButton
 └─ ShareButton
```

父层可以观察其内部发生的点击，而不必给每个深层节点都重复同一种逻辑。

### 4. 冒泡也会带来“为什么父级也执行了”的疑问

常见情况：

```jsx
<div onClick={openCard}>
  <button onClick={deleteItem}>删除</button>
</div>
```

点击删除按钮后：

```text
先删除
又触发 openCard
```

这并不是 React 随机多调用一次，而是事件继续向父层冒泡。

如何阻止会在 RE-KP035 学习。

### 5. `onScroll` 是常见例外

不要背成“React 所有事件都会冒泡”。

React 官方文档特别指出：

```text
onScroll
```

只在你绑定它的 JSX 元素上工作，不按普通方式向上冒泡。

现阶段先把它记成事件传播规则中的常见例外即可。

## 动手编码：从 0 到 1

### 第 0 步：建立父子结构

```jsx
<div>
  <button>导出报表</button>
</div>
```

### 第 1 步：给按钮注册 Handler

```jsx
function handleButtonClick(event) {
  console.log('1. button handler');
  console.log('target:', event.target.tagName);
}
```

### 第 2 步：给父层注册 Handler

```jsx
function handlePanelClick(event) {
  console.log('2. panel handler');
  console.log('target:', event.target.tagName);
  console.log('currentTarget:', event.currentTarget.tagName);
}
```

### 第 3 步：同时绑定

```jsx
<div onClick={handlePanelClick}>
  <button onClick={handleButtonClick}>导出报表</button>
</div>
```

### 第 4 步：点击按钮观察顺序

Console 应先看到按钮 Handler，再看到父级 Handler。

### 第 5 步：点击父层空白区域

这次：

```text
target === currentTarget
```

因为事件就是直接发生在父层元素上。

### 第 6 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **本节核心代码**：父子 `onClick` 与事件传播。
- **实验辅助代码**：标签名日志用于观察 `target/currentTarget`。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./04-events-and-interactions/kp033-event-bubbling --config ./vite.config.js
```

## 效果验证

1. 点击按钮时，按钮 Handler 先执行。
2. 同一次点击随后会进入父层 Handler。
3. 父层 Handler 中 `target` 仍然可以指向按钮。
4. `currentTarget` 指向当前绑定 Handler 的父层元素。
5. 能说明 `onScroll` 为什么不能简单套用“所有事件都会冒泡”的结论。

完成后继续 **RE-KP034：事件捕获**。
