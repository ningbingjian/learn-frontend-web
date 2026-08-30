# RE-KP099：测量 DOM

> [返回 Chapter 10](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 DOM Ref 获得真实 DOM Node。
2. 使用 `getBoundingClientRect()` 读取几何信息。
3. 理解“读取 DOM”与“驱动 React UI”是两个不同阶段。
4. 知道事件发生后主动测量是一种简单、清晰的时机选择。
5. 知道需要在 Commit 后自动测量时会涉及更严格的 Timing，后续再学习 `useLayoutEffect`。

> **本节核心代码**：`cardRef.current.getBoundingClientRect()`。
>
> **实验辅助代码**：`wide` State 改变卡片宽度，`width` State 只负责把最近一次测量结果显示到 UI。

## 理论讲解

### 1. React Element 不等于 DOM Node

JSX：

```jsx
<section>...</section>
```

描述的是 UI。

而 `getBoundingClientRect()` 属于浏览器真实 DOM API，只能作用于真实 DOM Node。

所以需要：

```jsx
const cardRef = useRef(null);
<section ref={cardRef}>...</section>
```

### 2. DOM 测量属于 Escape Hatch

正常布局应尽量交给 CSS。

只有当业务真的需要运行时几何数据时，例如：

- 浮层定位。
- 拖拽边界。
- 动画起点。
- 虚拟滚动。
- 与第三方 DOM 库集成。

才需要主动读取 DOM 几何。

### 3. `getBoundingClientRect()` 返回什么

它可以提供：

```text
width / height
x / y
top / right / bottom / left
```

这些值描述的是浏览器当前已经布局完成后的矩形。

### 4. 为什么本节用点击按钮来测量

本节写：

```jsx
function measureCard() {
  const rect = cardRef.current?.getBoundingClientRect();
}
```

并在事件中调用。

这样可以先把核心边界学清：

```text
事件发生
→ 读取当前真实 DOM
→ 得到几何数据
```

而不提前进入 Effect / Layout Effect 的生命周期细节。

### 5. 测量结果如果要显示，应进入 State

DOM API 返回的是普通 JavaScript 数值。

如果页面要显示：

```text
最近一次宽度：240px
```

这个值就参与视觉输出，所以应该：

```jsx
setWidth(Math.round(rect.width));
```

Ref 负责找到 DOM，State 负责驱动 UI。

## 动手编码：从 0 到 1

### 第 1 步：创建 DOM Ref

```jsx
const cardRef = useRef(null);
```

### 第 2 步：挂到目标 DOM

```jsx
<section ref={cardRef}>这是待测量区域</section>
```

Commit 之后，`cardRef.current` 指向真实 `<section>`。

### 第 3 步：读取矩形

```jsx
const rect = cardRef.current?.getBoundingClientRect();
```

为了防止节点暂时不存在，使用可选链。

### 第 4 步：把测量值显示出来

```jsx
if (rect) {
  setWidth(Math.round(rect.width));
}
```

### 第 5 步：制造尺寸变化

```jsx
style={{ width: wide ? 420 : 240 }}
```

先切换宽度，再重新点击测量按钮。

最终源码：[`src/main.jsx`](./src/main.jsx)

### 本节核心代码

- `ref={cardRef}`
- `getBoundingClientRect()`
- 测量结果进入 State

### 实验辅助代码

- `wide` 只是为了制造两种宽度。
- 内联样式只为让几何变化容易观察。

## 运行案例

执行：

```bash
pnpm dev
```

然后：

1. 点击“读取当前 DOM 宽度”。
2. 记录显示的宽度。
3. 点击“切换区域宽度”。
4. 再次测量。
5. 观察数值变化。

## 效果验证

你应该能够解释：

1. 为什么不能对 JSX Element 直接调用 `getBoundingClientRect()`？
2. Ref 在测量流程中负责什么？
3. 为什么测量结果要显示时还需要 State？
4. 为什么本节没有提前使用 `useLayoutEffect`？
