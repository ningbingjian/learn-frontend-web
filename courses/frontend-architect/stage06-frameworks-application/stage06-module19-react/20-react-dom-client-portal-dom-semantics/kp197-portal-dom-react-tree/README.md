# RE-KP197：Portal 的 DOM 位置与 React 树位置

> [返回 Chapter 20](../README.md) · [打开最终源码](./src/main.jsx)

## 学习目标

1. 区分 Portal 的物理 DOM parent 与逻辑 React parent。
2. 理解 Portal 只改变 DOM placement，不会把 child 从原 React Tree “拆出去”。
3. 验证 Portal child 仍能读取原 React Tree 上方的 Context。
4. 为下一课“Portal 事件按 React Tree 冒泡”建立基础。

## 理论讲解

Portal 最重要的心智模型不是“传送之后变成另一棵 React Tree”，而是：

```text
React Tree：仍然是原组件的 child
DOM Tree：可以落到完全不同的 DOM node
```

官方文档明确说明 Portal 只改变 DOM 的物理位置。Context、React 事件关系等仍然遵循 React Tree。

本课使用：

```jsx
<ThemeContext value="ocean">
  {createPortal(<PortalCard />, portalTarget)}
</ThemeContext>
```

虽然 `PortalCard` DOM 出现在 `#portal-root`，它仍然可以：

```js
useContext(ThemeContext)
```

得到 `ocean`。

## 动手编码：从 0 到 1

### 第 1 步：创建 Context

```js
const ThemeContext = createContext('default');
```

### 第 2 步：让 Portal child 读取 Context

```jsx
function PortalCard() {
  const theme = useContext(ThemeContext);
  return <p>读取到 Context：{theme}</p>;
}
```

### 第 3 步：在 Provider 下创建 Portal

```jsx
<ThemeContext value="ocean">
  {createPortal(<PortalCard />, portalTarget)}
</ThemeContext>
```

**预期观察**：Portal 中显示 `ocean`，而不是 default。

### 第 4 步：用 DOM API 验证物理位置

```js
rootContainer.contains(card);
portalTarget.contains(card);
```

结果应为：

```text
#root.contains(card)        = false
#portal-root.contains(card) = true
```

### 第 5 步：组合两个结论

```text
DOM：PortalCard 不在 #root
React：PortalCard 仍在 ThemeContext Provider 下
```

这就是 Portal 的双重位置模型。

## 运行案例

```bash
npm run dev
```

打开 Portal，页面会直接显示 DOM `contains()` 结果和 Context 值。

## 效果验证

- Portal Card 的 DOM 不属于 `#root`。
- Portal Card 的 DOM 属于 `#portal-root`。
- Portal Card 仍读取到 React parent 提供的 `ocean` Context。

**本节核心代码**：Portal 的 DOM placement 与 React Tree membership 是两个不同维度。

**实验辅助代码**：`useEffect + contains()` 只负责把 DOM 物理关系直接显示在页面上。
