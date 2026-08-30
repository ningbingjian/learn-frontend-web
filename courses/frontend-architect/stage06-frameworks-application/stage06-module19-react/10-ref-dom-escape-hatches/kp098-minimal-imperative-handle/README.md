# RE-KP098：Imperative Handle 最小化

> [返回 Chapter 10](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useImperativeHandle` 的价值不是“暴露得越多越方便”。
2. 区分适合 Props 的声明式能力与适合 Ref 的命令式能力。
3. 只向父组件暴露必要方法，而不是整个 DOM Node。
4. 知道 focus、scroll、select 这类行为更适合命令式 Handle。
5. 知道 open/closed、selected、highlighted 这类 UI 状态优先通过 Props 表达。

> **本节核心代码**：`useImperativeHandle(ref, () => ({ focusEditor() {} }), [])`。
>
> **实验辅助代码**：`highlighted` State 用来和命令式 `focusEditor()` 并排对比，说明“状态用 Prop，动作才考虑 Ref”。

## 理论讲解

### 1. Ref 是 Escape Hatch，不是第二套 Props

如果组件可以写成：

```jsx
<EditableCard highlighted={highlighted} />
```

就不要再设计：

```js
cardRef.current.setHighlighted(true)
cardRef.current.setHighlighted(false)
```

因为 `highlighted` 本质是组件下一次应该呈现什么 UI，这正是 Props / State 擅长表达的内容。

### 2. 什么行为更适合 Imperative Handle

典型命令式行为包括：

- 聚焦输入框。
- 选中文本。
- 滚动到某个节点。
- 触发只能通过浏览器 DOM API 完成的动作。

它们描述的是：

```text
现在立刻对某个真实对象执行动作
```

而不是：

```text
下一次 UI 应该长什么样
```

### 3. 为什么不要暴露整个 DOM

如果直接：

```jsx
<input ref={ref} />
```

父组件会拿到完整 DOM Node。

父组件因此可以：

```js
ref.current.style.display = 'none'
ref.current.value = '...'
ref.current.remove()
```

这会扩大组件边界之外能够做的事情。

更好的公共组件 API 是只暴露真正允许调用的动作。

### 4. 最小 Handle 也是封装

本节只暴露：

```js
{
  focusEditor()
}
```

父组件不知道内部究竟是 `<input>`、`<textarea>` 还是第三方编辑器。

将来内部实现变化时，父组件仍然只依赖：

```js
focusEditor()
```

这就是封装价值。

## 动手编码：从 0 到 1

### 第 1 步：建立内部真实 DOM Ref

```jsx
const inputRef = useRef(null);
```

**本步目标**：内部组件自己持有 DOM Node。

运行后暂时没有可见变化。

### 第 2 步：只暴露一个允许调用的方法

```jsx
useImperativeHandle(ref, () => ({
  focusEditor() {
    inputRef.current?.focus();
  },
}), []);
```

**为什么这样写**：父组件只需要“聚焦编辑器”，不需要访问整个 DOM。

### 第 3 步：把 UI 状态保留为声明式 Prop

```jsx
function EditableCard({ ref, highlighted }) {
  // ...
}
```

并渲染：

```jsx
<p>高亮状态：{highlighted ? '开启' : '关闭'}</p>
```

**观察点**：没有 `setHighlighted()` 命令式方法。

### 第 4 步：父组件分别使用 Ref 和 State

```jsx
const cardRef = useRef(null);
const [highlighted, setHighlighted] = useState(false);
```

聚焦：

```jsx
cardRef.current?.focusEditor();
```

切换高亮：

```jsx
setHighlighted(value => !value);
```

最终源码：[`src/main.jsx`](./src/main.jsx)

### 本节核心代码

- `useImperativeHandle`
- 最小 `focusEditor()` Handle
- `highlighted` 继续通过 Prop 驱动

### 实验辅助代码

- 两个按钮只是为了分别触发命令式动作与声明式状态变化。

## 运行案例

从 React 模块目录执行：

```bash
pnpm dev
```

然后访问本知识点目录对应的 Vite 页面。

操作顺序：

1. 点击“聚焦编辑框”。
2. 观察输入框获得焦点。
3. 点击“用 Prop 切换高亮”。
4. 观察文本中的高亮状态变化。

## 效果验证

你应该能够回答：

1. 为什么 `highlighted` 不应该做成 `ref.current.setHighlighted()`？
2. 为什么只暴露 `focusEditor()` 比直接暴露整个 DOM 更安全？
3. 哪些动作适合 Imperative Handle？
4. 如果某个行为可以自然通过 Prop 表达，应该优先选哪种方式？
