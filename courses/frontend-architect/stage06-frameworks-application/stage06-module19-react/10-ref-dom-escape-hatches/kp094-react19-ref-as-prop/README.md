# RE-KP094：React 19 ref as prop

> [返回 Chapter 10](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 React 19 中函数组件可以直接接收 `ref` prop。
2. 能写出 `function MyInput({ ref })` 并把它继续传给 DOM Node。
3. 理解 React 18 及更早版本通常需要 `forwardRef` 完成同一能力。
4. 知道当前 React 19 文档已经把 `forwardRef` 标为不再需要，并计划未来弃用。
5. 能区分“Ref 透传 DOM”与“自定义 Imperative Handle”。
6. 知道 ref as prop 针对函数组件；Class Component 的 ref 仍然指向实例。

> **本节核心代码**：`function SearchInput({ ref, placeholder }) { return <input ref={ref} ... />; }`。
>
> **实验辅助代码**：父组件按钮调用 `searchRef.current?.focus()` 用于验证 ref 已成功穿过函数组件边界。

## 理论讲解

### 1. React 18 时代为什么常见 `forwardRef`

历史代码经常写：

```jsx
const MyInput = forwardRef(function MyInput(props, ref) {
  return <input {...props} ref={ref} />;
});
```

因为普通函数组件不能直接把特殊 `ref` 接收到参数里。

### 2. React 19 简化了函数组件 Ref

React 19 可以直接：

```jsx
function MyInput({ ref }) {
  return <input ref={ref} />;
}
```

父组件：

```jsx
const inputRef = useRef(null);

<MyInput ref={inputRef} />
```

### 3. 数据流是什么

```text
Parent useRef
    ↓ ref prop
Function Component
    ↓ ref attribute
DOM Node
    ↓
parentRef.current
```

### 4. 这并不意味着 Ref 应该到处传

Ref 仍然属于 Escape Hatch。

如果父组件只是想让子组件显示不同文本：

```jsx
<MyInput label="Search" />
```

应该继续使用 Props。

只有当父组件确实需要：

```text
focus
scroll
select
imperative integration
```

等能力时，Ref 才合理。

### 5. `forwardRef` 现在怎么理解

学习现代 React 19 时：

```text
新函数组件 -> 优先 ref as prop
维护 React 18 老代码 -> 仍需认识 forwardRef
```

当前 React 官方文档明确说明 React 19 中 `forwardRef` 已不再必要，并会在未来版本进一步弃用。

### 6. 不要把 DOM Ref 和 Imperative Handle 混在一起

本节只做：

```jsx
<input ref={ref} />
```

这会把真实 DOM Node 暴露给父组件。

RE-KP097 会进一步学习：

```text
不要暴露完整 DOM
只暴露最小命令式 API
```

## 动手编码：从 0 到 1

### 第 1 步：父组件创建 Ref

```jsx
const searchRef = useRef(null);
```

### 第 2 步：定义普通函数组件

```jsx
function SearchInput({ ref, placeholder }) {
  return <input ref={ref} placeholder={placeholder} />;
}
```

没有：

```jsx
forwardRef(...)
```

### 第 3 步：像普通 JSX 属性一样传入

```jsx
<SearchInput ref={searchRef} placeholder="搜索课程" />
```

### 第 4 步：父组件访问 DOM

```jsx
function handleFocus() {
  searchRef.current?.focus();
}
```

### 第 5 步：验证函数组件边界已经打通

如果点击按钮后输入框获得焦点，说明：

```text
Parent Ref -> Function Component ref prop -> DOM
```

链路成立。

最终源码：

- [src/main.jsx](./src/main.jsx)

## 运行案例

```bash
npm run dev -- --host 0.0.0.0
```

点击“Focus Search”。

预期：

- 父组件没有查询 DOM。
- `SearchInput` 没使用 `forwardRef`。
- Input 获得焦点。

## 效果验证

你应该能够从现代 React 19 的视角回答：

```text
为什么新函数组件不再必须 forwardRef？
```

以及：

```text
Ref 仍然是 Escape Hatch
ref as prop 只是让跨组件传 Ref 更直接
```
