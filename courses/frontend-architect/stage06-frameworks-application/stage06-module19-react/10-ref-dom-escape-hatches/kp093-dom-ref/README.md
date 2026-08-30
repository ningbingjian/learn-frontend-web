# RE-KP093：DOM Ref

> [返回 Chapter 10](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 使用 `useRef(null)` 创建 DOM Ref。
2. 使用 JSX `ref` 属性让 React 把真实 DOM 节点写入 `ref.current`。
3. 在事件处理器中调用 DOM 的命令式 API，例如 `focus()` 和 `select()`。
4. 理解 DOM Ref 在节点挂载后才有真实 DOM，节点移除后会被清空。
5. 知道 DOM Ref 是 Escape Hatch，不应该替代正常 Props / State 数据流。
6. 能区分“访问 DOM”与“直接手工维护 React UI”。

> **本节核心代码**：`<input ref={inputRef} />` 与 `inputRef.current?.focus()`。
>
> **实验辅助代码**：Focus / Select 两个按钮只是为了观察浏览器 DOM 命令式 API。

## 理论讲解

### 1. React 平时不需要你手工查 DOM

大多数 UI 应该通过 JSX 描述：

```jsx
return <button disabled={isSaving}>保存</button>;
```

而不是：

```js
document.querySelector('button').disabled = true;
```

因为 React 应该负责根据 State / Props 更新 UI。

### 2. 但某些行为天然是命令式的

例如：

- 聚焦输入框。
- 滚动到某个 DOM 节点。
- 选中文本。
- 测量几何尺寸。
- 调用第三方 DOM 库。

这些场景就需要真实 DOM Node。

### 3. `ref` 属性让 React 提供 DOM Node

```jsx
const inputRef = useRef(null);

<input ref={inputRef} />
```

React 在 Commit 后会把对应 `<input>` DOM 节点放进：

```js
inputRef.current
```

### 4. DOM Ref 不是 Render 数据

不要在 Render 中依赖：

```js
inputRef.current
```

来决定 JSX。

因为在第一次 Render 时 DOM 还没有 Commit，通常仍然是 `null`。

### 5. 什么时候读取最自然

典型位置是用户交互：

```jsx
function handleFocus() {
  inputRef.current?.focus();
}
```

此时节点已经在页面中。

### 6. Optional Chaining 很实用

```js
inputRef.current?.focus();
```

避免节点尚未存在时直接访问导致异常。

### 7. DOM Ref 不意味着可以随便手改 React 管理的 DOM

例如直接：

```js
inputRef.current.value = 'new value';
```

如果这个 Input 又由 React State 受控，就容易与 React 数据流冲突。

本节只使用：

```text
focus()
select()
```

这类命令式行为。

## 动手编码：从 0 到 1

### 第 1 步：创建空 Ref

```jsx
const inputRef = useRef(null);
```

初始值为 `null`，因为现在还没有 DOM 节点。

### 第 2 步：把 Ref 绑定到 Input

```jsx
<input ref={inputRef} defaultValue="React Ref" />
```

React Commit 后：

```text
inputRef.current -> HTMLInputElement
```

### 第 3 步：实现 Focus

```jsx
function handleFocus() {
  inputRef.current?.focus();
}
```

### 第 4 步：实现 Select

```jsx
function handleSelect() {
  inputRef.current?.focus();
  inputRef.current?.select();
}
```

### 第 5 步：通过按钮调用

```jsx
<button onClick={handleFocus}>Focus</button>
<button onClick={handleSelect}>Select All</button>
```

父组件不需要 `document.querySelector`，React 帮我们保存 DOM Node。

最终源码：

- [src/main.jsx](./src/main.jsx)

## 运行案例

启动 Vite：

```bash
npm run dev -- --host 0.0.0.0
```

操作：

1. 点击“Focus Input”。
2. 观察光标进入输入框。
3. 点击“Select All”。
4. 观察输入框内容被整体选中。

## 效果验证

你应该能够解释：

```text
Render -> JSX ref 描述关系
Commit -> React 将 DOM Node 放进 ref.current
Event -> 通过 ref.current 调用 DOM 命令式 API
```

并理解：

```text
DOM Ref 是 Escape Hatch
不是新的 State 管理方式
```
