# RE-KP030：避免 Boolean Props 爆炸

> [返回 Chapter 03](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解多个互斥 Boolean Props 为什么会快速扩大组件状态空间。
2. 能用 `2^n` 的直觉估算 n 个独立布尔值带来的组合数量。
3. 能识别 `primary + danger + success` 这类互相冲突的 API。
4. 会把互斥状态重构为 `variant`、`size` 等语义化枚举式 Prop。
5. 知道并不是所有 Boolean Prop 都有问题，真正正交的开关仍然适合 Boolean。

> **本节核心代码**：把 `primary/danger/success` 改为 `variant="primary | danger | success"`，把互斥状态从多个 Boolean 收敛为一个语义维度。
>
> **实验辅助代码**：按钮文本、简单 className 和 `disabled` 示例用于观察 API，不涉及 CSS 系统设计。

## 理论讲解

### 1. Boolean Props 为什么容易失控

假设组件 API：

```jsx
<Button primary danger success compact />
```

如果有 4 个 Boolean：

```text
每个值有 true / false 两种
4 个 Boolean
→ 2^4 = 16 种组合
```

但其中很多组合没有业务意义：

```text
primary=true + danger=true
success=true + danger=true
primary=true + success=true
```

调用者会问：

> 同时为 true 时，到底谁优先？

### 2. 问题不是 Boolean 本身，而是“互斥语义被拆散”

比如按钮视觉类型实际上是一个维度：

```text
variant
  ├─ primary
  ├─ danger
  └─ success
```

如果却设计成：

```text
primary: boolean
danger: boolean
success: boolean
```

就把一个三选一问题错误表达成三个独立开关。

### 3. 用一个语义 Prop 收敛状态空间

更清楚：

```jsx
<Button variant="primary" />
<Button variant="danger" />
<Button variant="success" />
```

调用者无法同时写出两个 variant 值。

状态空间从：

```text
3 个 Boolean → 8 种理论组合
```

收敛成：

```text
variant → 3 个合法值
```

### 4. 不同维度可以分开

按钮还有尺寸：

```text
size = small | medium | large
```

可以设计：

```jsx
<Button variant="danger" size="small" />
```

因为：

```text
variant
和
size
```

是两个正交维度。

### 5. Boolean Prop 仍然有合理场景

例如：

```jsx
<Button disabled />
```

`disabled` 表示明确的二元状态：

```text
可用 / 不可用
```

它通常不会与 `variant` 互斥。

所以不要得到错误结论：

> “组件 API 里禁止 Boolean Props。”

更准确的是：

> 不要用多个 Boolean 来表达一个本来互斥的状态维度。

### 6. Boolean 爆炸会扩散到实现内部

错误 API 最后常变成：

```js
if (danger) { ... }
else if (success) { ... }
else if (primary) { ... }
```

然后还要处理：

```text
两个同时 true 怎么办？
三个同时 true 怎么办？
```

好的 API 可以在入口处直接消除非法组合。

## 动手编码：从 0 到 1

### 第 0 步：先写一个容易爆炸的 API

想象：

```jsx
function ActionButton({ primary, danger, success, children }) {
  // ...
}
```

调用端甚至可以：

```jsx
<ActionButton primary danger>
  删除
</ActionButton>
```

语义发生冲突。

### 第 1 步：识别真正的状态维度

这三个 Boolean 实际都在回答：

```text
按钮是什么视觉/语义类型？
```

因此把它们合成：

```js
variant
```

### 第 2 步：定义一个默认 `variant`

```jsx
function ActionButton({ variant = 'primary', children }) {
  return (
    <button className={`button button-${variant}`}>
      {children}
    </button>
  );
}
```

调用：

```jsx
<ActionButton variant="danger">删除订单</ActionButton>
```

### 第 3 步：加入第二个正交维度 `size`

```jsx
function ActionButton({
  variant = 'primary',
  size = 'medium',
  children,
}) {
  // ...
}
```

className：

```js
`button button-${variant} button-${size}`
```

### 第 4 步：保留合理的 Boolean `disabled`

```jsx
function ActionButton({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
}) {
  return (
    <button
      type="button"
      className={`button button-${variant} button-${size}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

这里 `disabled` 的确是一个独立二元开关。

### 第 5 步：同时渲染几种合法组合

```jsx
<ActionButton>保存</ActionButton>
<ActionButton variant="danger">删除</ActionButton>
<ActionButton variant="success" size="small">已完成</ActionButton>
<ActionButton disabled>处理中</ActionButton>
```

现在每个调用都容易解释。

### 第 6 步：检查 API 是否还有冲突维度

问：

```text
是否还有两个 Props 在表达同一件事？
是否存在“同时为 true 时谁优先”？
能否用一个更语义化的 Prop 表达？
```

### 第 7 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

本节总结：

- **本节核心代码**：`variant`、`size` 将互斥/正交维度显式建模，以及保留真正独立的 `disabled` Boolean。
- **实验辅助代码**：className 字符串没有配套复杂 CSS，只用于展示 API 结构。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./03-props-composition-component-api/kp030-boolean-props-explosion --config ./vite.config.js
```

构建验证：

```bash
npm run build -- ./03-props-composition-component-api/kp030-boolean-props-explosion --config ./vite.config.js
```

## 效果验证

请确认：

1. 3 个互斥 Boolean 理论上有 8 种组合。
2. `variant` API 不再允许调用者同时表达 `primary + danger`。
3. `variant` 和 `size` 可以组合，因为它们属于不同维度。
4. `disabled` 保留为 Boolean 并不违背本节原则。
5. 能解释为什么“Boolean Props 爆炸”首先是建模问题，而不只是代码风格问题。
6. 能指出自己项目中一个适合从多个 Boolean 重构为单一状态/variant 的例子。

完成后 Chapter 03 收官，继续 **RE-KP031：React 事件处理器**。
