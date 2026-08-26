# RE-KP017：返回单根节点与 Fragment

> [返回 Chapter 02](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 理解为什么一个组件 `return` 需要返回一个 JavaScript 值。
2. 知道 JSX 中多个并列节点需要被一个父级表达式包起来。
3. 会使用 `<>...</>` Fragment 简写分组多个节点而不增加 DOM 包装。
4. 知道显式 `<Fragment>` 可以传 `key`，而简写 Fragment 不能传 `key`。
5. 能通过浏览器 DOM 检查确认 Fragment 不会额外生成包装元素。

> **本节核心代码**：`<>...</>`、`<Fragment key="...">...</Fragment>` 与 DOM 子节点数量观察。
>
> **实验辅助代码**：`requestAnimationFrame` 只用于在渲染完成后检查 DOM 结构。

## 理论讲解

### 1. “单根”首先是 JavaScript 返回值问题

函数一次 `return` 返回一个值。JSX 也是 JavaScript 表达式，因此下面写法不能直接作为一个返回表达式：

```jsx
return (
  <h1>Title</h1>
  <p>Description</p>
);
```

这里并不是一个合法的单一 JSX 表达式。

### 2. 最简单的办法：增加真实父元素

可以写：

```jsx
return (
  <div>
    <h1>Title</h1>
    <p>Description</p>
  </div>
);
```

这样返回值是一个 `<div>` Element，两个节点成为它的 children。

### 3. 真实包装元素会进入 DOM

如果只是为了满足 JSX 分组而加 `<div>`，最终 DOM 也会多一层。这可能影响 CSS Grid/Flex、语义化 HTML、DOM 层级与选择器。

所以 React 提供 Fragment。

### 4. Fragment：分组，但不增加宿主 DOM

常用简写：

```jsx
<>
  <h1>Title</h1>
  <p>Description</p>
</>
```

React 可以把它作为一组 children 处理，但 React DOM 不会因为 Fragment 再创建一个额外 HTML wrapper。

最终 DOM 可以直接是：

```html
<h1>Title</h1>
<p>Description</p>
```

### 5. 显式 Fragment

也可以：

```jsx
import { Fragment } from 'react';

return (
  <Fragment>
    <h1>Title</h1>
    <p>Description</p>
  </Fragment>
);
```

多数普通场景使用 `<>...</>` 更简洁。

### 6. 为什么有时必须写 `<Fragment>`

如果需要 `key`：

```jsx
<Fragment key={item.id}>
  <dt>{item.term}</dt>
  <dd>{item.description}</dd>
</Fragment>
```

简写 `<>...</>` 不能接收 `key`。

列表与 key 会在 Chapter 07 详细学习，本节只知道这个语法差异。

### 7. Fragment 不是一个 DOM 标签

不要期待用 CSS 直接选择 `Fragment`，因为最终 DOM 中不存在一个叫 Fragment 的包装节点。

### 8. 当前稳定课程不把 Fragment ref 当基础能力

React 当前文档中 Fragment ref 属于 Canary 范围。本课程稳定基线仍然以 React 19.2.x Stable 为主，所以 RE-KP017 不把 Fragment ref 当成稳定基础 API 教学内容。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

最终 `#root` 下直接出现三个宿主节点：

```text
H1
P
BUTTON
```

中间没有额外 wrapper。

### 第 1 步：先理解错误的“多个并列返回值”思路

不要把下面内容保存为最终源码：

```jsx
function Toolbar() {
  return (
    <h1>Toolbar</h1>
    <p>Fragment demo</p>
  );
}
```

它不是合法的单一 JSX 返回表达式。

### 第 2 步：先用真实 div 包起来

暂时写：

```jsx
function Toolbar() {
  return (
    <div>
      <h1>Toolbar</h1>
      <p>Fragment demo</p>
    </div>
  );
}
```

运行后检查 DOM，会看到多出的 `<div>`。

### 第 3 步：改成 Fragment 简写

把 `div` 改成：

```jsx
function Toolbar() {
  return (
    <>
      <h1>Toolbar</h1>
      <p>Fragment demo</p>
      <button type="button">Save</button>
    </>
  );
}
```

现在 React 仍然拿到一个合法返回值，但 DOM 不再多出 wrapper。

### 第 4 步：观察真实 DOM

渲染：

```jsx
createRoot(document.getElementById('root')).render(<Toolbar />);
```

然后下一帧：

```jsx
const root = document.getElementById('root');
console.log(root.children.length);
console.log([...root.children].map((node) => node.tagName));
```

预期：

```text
3
['H1', 'P', 'BUTTON']
```

### 第 5 步：观察显式 Fragment 的 key

另外创建一份不挂载的 Element：

```jsx
const keyedFragment = (
  <Fragment key="toolbar-group">
    <span>A</span>
    <span>B</span>
  </Fragment>
);
```

打印 `keyedFragment.key`，可以观察显式 Fragment 能携带 key。

### 第 6 步：完成案例并对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

- **核心代码**：Fragment 简写、显式 `Fragment`、无额外 DOM wrapper。
- **实验辅助代码**：DOM children 统计与 Console。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm run dev -- ./02-jsx-react-element-component-model/kp017-single-root-fragment --config ./vite.config.js
```

构建：

```bash
npm run build -- ./02-jsx-react-element-component-model/kp017-single-root-fragment --config ./vite.config.js
```

## 效果验证

请确认：

1. 组件可以用 Fragment 分组多个并列 JSX 节点。
2. `#root` 的直接子元素是 `H1/P/BUTTON`，没有额外 `DIV`。
3. 能解释为什么“单根”不是要求一定增加真实 HTML 标签。
4. 知道 `<>...</>` 是 Fragment 常用简写。
5. 知道需要 `key` 时使用显式 `<Fragment key={...}>`。
6. 知道 Fragment 本身不是 DOM Node。

完成后继续学习 **RE-KP018：JSX 表达式插值**。
