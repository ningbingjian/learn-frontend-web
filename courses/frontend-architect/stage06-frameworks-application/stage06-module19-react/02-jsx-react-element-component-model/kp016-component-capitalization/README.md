# RE-KP016：组件名称与大写规则

> [返回 Chapter 02](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么自定义 React 组件名称必须以大写字母开头。
2. 区分 `<button>` 这种宿主标签与 `<Button>` 这种组件标签。
3. 从 React Element 的 `type` 观察小写标签和大写组件的转换差异。
4. 避免把自定义组件写成小写标签导致 React 按宿主元素处理。
5. 理解这不是代码风格偏好，而是 JSX 解析语义的一部分。

> **本节核心代码**：`<button>` 与 `<Button>` 的 `element.type` 对照。
>
> **实验辅助代码**：Console 输出只用于观察 JSX 产生的 Element 类型。

## 理论讲解

### 1. JSX 标签开头大小写会影响它代表什么

React 的基础规则：

```text
小写开头
→ 内置/宿主标签

大写开头
→ 自定义 React Component
```

例如 `<button>Save</button>` 表示 Web 宿主标签，而 `<Button />` 表示变量 `Button` 指向的组件类型。

### 2. 小写标签的 Element type 是字符串

```jsx
const hostElement = <button>Save</button>;
```

观察：

```js
hostElement.type
```

结果是字符串 `'button'`。

React DOM Renderer 看到这个字符串以后，会把它映射到浏览器按钮元素。

### 3. 大写组件的 Element type 是变量引用

定义：

```jsx
function Button() {
  return <button>Save</button>;
}
```

再写：

```jsx
const componentElement = <Button />;
```

观察：

```js
componentElement.type === Button
```

结果为 `true`。

所以 JSX 并不是把所有标签文本都转换成字符串。

### 4. 为什么 `function button() {}` 不能配合 `<button />` 表示组件

即使 JavaScript 中存在一个名为 `button` 的函数，JSX `<button />` 仍然按宿主标签解析，而不是去调用这个变量。

如果要表示组件，就应该命名为：

```jsx
function Button() {
  // ...
}
```

并使用 `<Button />`。

### 5. 大写规则和组件变量有关

例如：

```jsx
const Card = ProductCard;
```

然后 `<Card />` 可以表示组件，因为 JSX 看到的是大写标识符 `Card`。

### 6. Web 中的小写标签最终交给 React DOM

在 Web React 中，`div/button/input` 等字符串类型最终由 React DOM 映射到浏览器 DOM；`Button/ProductCard/App` 等自定义组件会先执行组件逻辑，得到更深一层 React Element 描述。

### 7. 不要把大写规则理解成“HTML 要大写”

HTML 宿主标签仍然是小写：`<div />`、`<button />`、`<section />`。

大写的是你自己的 JavaScript 组件标识符。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

创建 `<button>` 和 `<Button>`，然后直接比较它们生成的 React Element `type`。

### 第 1 步：定义自定义组件

创建 `src/main.jsx`：

```jsx
function Button() {
  return <button type="button">Component Button</button>;
}
```

**本步目标**：得到一个大写组件类型。

### 第 2 步：创建宿主 Element

加入：

```jsx
const hostElement = <button type="button">Host Button</button>;
console.log(hostElement.type);
```

预期输出 `button`。

### 第 3 步：创建组件 Element

加入：

```jsx
const componentElement = <Button />;
console.log(componentElement.type);
console.log(componentElement.type === Button);
```

预期第二个判断为 `true`。

### 第 4 步：把两种 Element 都渲染

```jsx
function App() {
  return (
    <main>
      {hostElement}
      {componentElement}
    </main>
  );
}
```

最终页面会出现两个按钮，但它们在 React Element 层的 `type` 完全不同。

### 第 5 步：把区别显示出来

最终案例显示：

```text
<button> → type = "button"
<Button> → type = Button function
```

这一步把“大写规则”从记忆规则变成可观察事实。

### 第 6 步：完成案例并对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **核心代码**：`<button>`、`<Button>`、`element.type`。
- **实验辅助代码**：Console 与解释文字。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./02-jsx-react-element-component-model/kp016-component-capitalization --config ./vite.config.js
```

构建：

```bash
npm run build -- ./02-jsx-react-element-component-model/kp016-component-capitalization --config ./vite.config.js
```

## 效果验证

请确认：

1. `<button>` 的 React Element `type` 是字符串 `'button'`。
2. `<Button>` 的 React Element `type` 指向 `Button` 函数。
3. `componentElement.type === Button` 为 `true`。
4. 能解释为什么自定义组件必须以大写开头。
5. 不会把这个规则误解为“HTML 标签也要大写”。
6. 能说明 React DOM 为什么能处理字符串宿主类型。

完成后继续学习 **RE-KP017：返回单根节点与 Fragment**。
