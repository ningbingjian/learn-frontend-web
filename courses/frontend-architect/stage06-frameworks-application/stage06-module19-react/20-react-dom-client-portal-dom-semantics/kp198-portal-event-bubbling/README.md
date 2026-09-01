# RE-KP198：Portal 中事件冒泡

> [返回 Chapter 20](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

1. 理解 Portal 事件按照 React Tree 冒泡，而不是按照物理 DOM Tree 决定 React parent。
2. 通过计数器观察 Portal button 点击触发 React parent `onClick`。
3. 理解 `event.stopPropagation()` 仍可阻止这条 React 冒泡链。
4. 避免因为 Portal DOM 在外部就错误假设事件与原组件完全断开。

## 理论讲解

上一课已经证明 Portal child：

```text
DOM 在 #portal-root
React parent 仍在 #root 中的组件树
```

因此 React 事件也遵循 React Tree。

例如：

```jsx
<section onClick={handleParent}>
  {createPortal(
    <button onClick={handlePortal}>Portal Button</button>,
    portalTarget,
  )}
</section>
```

物理 DOM 中 button 不在 section 里面，但点击 button 时，React 的 `section onClick` 仍会收到冒泡事件。

这不是浏览器 DOM `section.contains(button)` 的结果，而是 React Tree 关系的结果。

## 动手编码：从 0 到 1

### 第 1 步：准备两个计数器

```js
const [parentClicks, setParentClicks] = useState(0);
const [portalClicks, setPortalClicks] = useState(0);
```

### 第 2 步：给 React Parent 注册 onClick

```jsx
<section onClick={() => setParentClicks(value => value + 1)}>
```

### 第 3 步：把 Button Portal 到外部 DOM

```jsx
createPortal(
  <button onClick={handlePortalClick}>点击 Portal Button</button>,
  portalTarget,
)
```

### 第 4 步：先不阻止冒泡

点击一次 Portal Button。

**预期观察**：

```text
portalClicks +1
parentClicks +1
```

尽管 DOM 上 button 不在 section 下。

### 第 5 步：打开 stopPropagation

```js
if (stopBubble) event.stopPropagation();
```

再次点击 Portal Button。

**预期观察**：portalClicks 增长，但 parentClicks 不再增长。

## 运行案例

```bash
npm run dev
```

先连续点击 Portal Button，再勾选“Portal 内 stopPropagation”重复实验。

## 效果验证

- 默认情况下 Portal click 会触发 React parent 的事件处理器。
- 开启 `stopPropagation` 后 React 冒泡链被阻止。
- DOM 物理位置不是判断 Portal React 事件 parent 的依据。

**本节核心代码**：Portal events bubble according to the React Tree。

**实验辅助代码**：两个计数器与 checkbox 只用于把冒泡链可视化。
