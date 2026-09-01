# RE-KP194：root.unmount

> [返回 Chapter 20](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

1. 理解 `root.unmount()` 会卸载整个 React Tree，而不只是把页面“清空”。
2. 理解 unmount 会触发组件 cleanup，并让 React 停止管理该 DOM container。
3. 知道同一个 Root 一旦 unmount，就不能再次 `root.render()`。
4. 区分“旧 Root 不能复用”与“同一个 DOM container 可以创建新 Root”。

## 理论讲解

`createRoot(container)` 返回的 Root 负责管理 `container` 内的一棵 React Tree。调用：

```js
root.unmount();
```

会同时发生三件重要的事：

- 整棵 React Tree 被卸载。
- Effect cleanup、订阅清理等卸载逻辑执行。
- React 与这个 Root 的管理关系被永久解除。

因此下面不是“重新挂载”：

```js
root.unmount();
root.render(<App />); // 错误
```

旧 Root 已经结束生命周期。如果确实需要再次在相同 DOM container 中启动 React，需要重新 `createRoot(container)`。

典型场景不是普通 SPA 页面切换，而是 React 被嵌入 jQuery、旧框架或微前端宿主中，宿主可能主动移除某块 DOM。这时应先通知 React unmount，让订阅、Timer、事件等资源正确释放。

## 动手编码：从 0 到 1

### 第 1 步：准备 Root 外部控制按钮

`root.unmount()` 后 React UI 本身会消失，所以本课把三个实验按钮放在 `#root` 外：

```html
<button id="unmount-root">卸载 Root</button>
<button id="try-render">对已卸载 Root 再 render</button>
<button id="create-new-root">在同一 DOM 容器创建新 Root</button>
<div id="root"></div>
```

**为什么**：即使 React Tree 已卸载，我们仍然需要一个非 React 控件继续观察 Root API。

### 第 2 步：创建带 cleanup 的组件

```jsx
useEffect(() => {
  const timerId = setInterval(() => setSeconds(value => value + 1), 1000);
  return () => clearInterval(timerId);
}, [label]);
```

**预期观察**：组件挂载后计时增长；unmount 后计时器 cleanup 执行。

### 第 3 步：卸载整个 Root

```js
firstRoot.unmount();
```

**预期观察**：`#root` 内的 React UI 消失，Console 打印 cleanup。

### 第 4 步：故意复用已卸载 Root

```js
try {
  firstRoot.render(<Demo label="illegal reuse" />);
} catch (error) {
  // 展示 Cannot update an unmounted root
}
```

**为什么**：直接验证 Root 对象本身已经结束生命周期。

### 第 5 步：在相同 container 创建新 Root

```js
replacementRoot = createRoot(container);
replacementRoot.render(<Demo label="replacement root" />);
```

**预期观察**：相同 DOM 节点重新显示 React UI，但这是一个新的 Root，而不是旧 Root 恢复。

## 运行案例

在 React Module 19 根目录运行：

```bash
npm run dev
```

打开本课 `index.html` 后依次点击：

1. “卸载 Root”。
2. “对已卸载 Root 再 render”。
3. “在同一 DOM 容器创建新 Root”。

## 效果验证

你应该看到：

- unmount 后组件 UI 消失并执行 Effect cleanup。
- 对 `firstRoot` 再次调用 `render` 抛错。
- 对相同 container 调用新的 `createRoot` 可以重新启动 React。

**本节核心代码**：`root.unmount()`、已卸载 Root 不可再次 `render`。

**实验辅助代码**：Root 外的三个原生按钮和 Timer 仅用于让生命周期变化可观察。
