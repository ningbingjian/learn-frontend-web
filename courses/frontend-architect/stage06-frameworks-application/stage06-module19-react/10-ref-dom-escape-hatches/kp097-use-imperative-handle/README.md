# RE-KP097：useImperativeHandle

> [返回 Chapter 10](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解 `useImperativeHandle` 用于自定义父组件通过 Ref 获得的 Handle。
2. 知道 React 19 中组件可以直接从 `ref` prop 接收父级 Ref。
3. 能把内部 DOM Node 保存在私有 Ref 中。
4. 能只向父组件暴露少量命令式方法，而不是整个 DOM 节点。
5. 理解 `createHandle` 与依赖数组的基本作用。
6. 知道 `useImperativeHandle` 是少量 Escape Hatch，不应该替代声明式 Props。

> **本节核心代码**：`useImperativeHandle(ref, () => ({ focus, selectAll }), [])`。
>
> **实验辅助代码**：父组件两个按钮只用于调用公开 Handle，证明父组件拿不到内部完整 Input DOM。

## 理论讲解

### 1. 直接透传 Ref 会暴露整个 DOM

例如：

```jsx
function SearchInput({ ref }) {
  return <input ref={ref} />;
}
```

父组件最终拿到：

```text
HTMLInputElement
```

于是父组件可以：

```js
ref.current.focus();
ref.current.style...
ref.current.value...
```

这暴露了很多内部实现细节。

### 2. 有时只想公开几个能力

组件 API 可能只需要：

```text
focus()
selectAll()
```

父组件不应该知道内部到底是不是一个 `<input>`。

### 3. `useImperativeHandle` 的作用

```jsx
useImperativeHandle(ref, () => ({
  focus() {},
  selectAll() {},
}), []);
```

它告诉 React：

```text
父组件通过这个 ref
只能得到我定义的 Handle
```

### 4. 内部 DOM 仍然用自己的 Ref

```jsx
const inputRef = useRef(null);
```

组件内部：

```jsx
<input ref={inputRef} />
```

外部 Ref 和内部 DOM Ref 被分开。

### 5. 封装边界更清晰

外部看到：

```js
{
  focus(),
  selectAll()
}
```

内部可以未来改成：

```text
input
textarea
contenteditable
第三方编辑器
```

只要 Handle 契约不变，父组件调用方式就不需要变化。

### 6. 依赖数组

基本形式：

```jsx
useImperativeHandle(ref, createHandle, dependencies);
```

如果 Handle 实现依赖某些 reactive value，就要正确声明依赖。

本节 Handle 只访问稳定的内部 Ref，所以使用：

```jsx
[]
```

### 7. 不要过度使用

如果需求可以写成：

```jsx
<Modal isOpen={isOpen} />
```

就不要为了控制 Modal 暴露：

```js
modalRef.current.open()
modalRef.current.close()
```

React 官方也强调：可以用 Props 表达的行为优先声明式 Props。

## 动手编码：从 0 到 1

### 第 1 步：父组件创建 Handle Ref

```jsx
const searchFieldRef = useRef(null);
```

### 第 2 步：子组件接收 React 19 ref prop

```jsx
function SearchField({ ref }) {
```

### 第 3 步：创建内部 DOM Ref

```jsx
const inputRef = useRef(null);
```

### 第 4 步：暴露最小 Handle

```jsx
useImperativeHandle(ref, () => ({
  focus() {
    inputRef.current?.focus();
  },
  selectAll() {
    inputRef.current?.focus();
    inputRef.current?.select();
  },
}), []);
```

### 第 5 步：父组件只调用公开方法

```jsx
searchFieldRef.current?.focus();
searchFieldRef.current?.selectAll();
```

父组件没有：

```text
input DOM node
```

只有组件愿意公开的 API。

最终源码：

- [src/main.jsx](./src/main.jsx)

## 运行案例

```bash
npm run dev -- --host 0.0.0.0
```

操作：

1. 点击“Focus”。
2. Input 获得焦点。
3. 点击“Select All”。
4. Input 文本被整体选中。

## 效果验证

你应该建立以下心智模型：

```text
Parent Ref
    ↓
Custom Imperative Handle
    ↓ only small API
Private DOM Ref
    ↓
DOM Node
```

本节关键不是“会用 Hook”，而是：

```text
命令式能力也应该有封装边界
```
