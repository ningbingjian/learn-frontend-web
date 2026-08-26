# RE-KP020：JSX children 的基本模型

> [返回 Chapter 02](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 说明 JSX 标签内部的内容为什么会成为 `children`。
2. 区分文本、数字、React Element、数组与空节点等常见 React children。
3. 知道 `null`、`undefined`、布尔值通常形成“空洞”，而数字 `0` 会正常渲染。
4. 知道普通 JavaScript 对象不能直接作为 React child 渲染。
5. 建立“children 是 React node，而不是单纯字符串”的第一层心智模型。

> **本节核心代码**：在同一个容器里组合文本、数字、Element、数组和条件空节点。
>
> **实验辅助代码**：`map()`、`showTip` 和 `createRoot` 只用于制造可观察案例，不是本节的新知识重点。

## 理论讲解

### 1. 标签内部内容会进入 `children`

写：

```jsx
<Panel>
  <strong>Hello</strong>
</Panel>
```

可以先理解成：

```text
Panel
  ↓
收到一个名为 children 的输入
  ↓
children 里包含 <strong>Hello</strong>
```

内置 DOM 标签也有同样的嵌套内容概念：

```jsx
<div>text</div>
```

这里 `text` 就是 `<div>` 的 child。

### 2. children 不只可以是 Element

React 能处理的常见 child 包括：

```text
字符串
数字
React Element
数组 / 一组 React node
null
undefined
boolean
```

例如：

```jsx
<section>
  Plain text
  {42}
  <strong>Element</strong>
</section>
```

这三种都会形成可渲染内容。

### 3. 空节点与数字 0 要分开

下面这些通常不会产生可见内容：

```jsx
{null}
{undefined}
{false}
{true}
```

但：

```jsx
{0}
```

会真的显示 `0`。

这也是后面学习条件渲染时很重要的边界。

例如：

```jsx
{messageCount && <p>New messages</p>}
```

如果 `messageCount` 恰好是 `0`，表达式结果就是数字 `0`，React 会把它渲染出来。

### 4. 数组可以成为 children

例如：

```jsx
{items.map((item) => (
  <span key={item}>{item}</span>
))}
```

`map()` 返回的是一个数组，这个数组中的 React Element 可以成为 children。

列表 `key` 的完整规则会在 Chapter 07 学习，本节只知道数组 children 是合法形态。

### 5. 普通对象不是可直接渲染 child

下面这种思路不成立：

```jsx
const user = { name: 'Ada' };

<div>{user}</div>
```

React 不知道你希望这个对象显示成什么字符串或结构。

应该明确选择：

```jsx
<div>{user.name}</div>
```

或者把对象转换成你真正想显示的 UI。

### 6. 不要假设 `children` 一定是数组

写：

```jsx
<Card>hello</Card>
```

和：

```jsx
<Card>
  <span>A</span>
  <span>B</span>
</Card>
```

`children` 的内部形态可能不同。

如果以后要系统地遍历、计数或转换 children，应学习 React 的 `Children` API；本节不提前展开，只建立：

> `children` 是 React 提供的一种不透明 UI 输入，不要把它简单当作固定数组。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

我们要在一个 `Panel` 中同时放入：

```text
文本
数字
React Element
数组 Element
false / null
```

然后观察浏览器到底显示哪些内容。

### 第 1 步：创建最小入口

创建：

```text
index.html
src/main.jsx
```

`index.html` 只提供：

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

**为什么这样写？**

因为本节只关心 children，Vite 和挂载流程沿用前面课程。

**运行后观察什么？**

当前还没有组件内容，页面为空。

### 第 2 步：创建一个只负责渲染 children 的容器

在 `src/main.jsx` 中：

```jsx
function Panel({ children }) {
  return <section>{children}</section>;
}
```

**本步目标**：看到 `children` 是组件收到的一个输入。

**为什么这样写？**

`Panel` 不理解内容业务，它只决定“内容放在哪里”。

### 第 3 步：先加入文本和数字

写：

```jsx
<Panel>
  Plain text
  {42}
  {0}
</Panel>
```

**预期观察**：三个值都会出现在页面中，尤其要确认数字 `0` 没有消失。

### 第 4 步：加入 React Element

继续加入：

```jsx
<strong>React Element child</strong>
```

现在 children 不再只是原始值，还包含 UI 描述对象。

### 第 5 步：加入数组 children

准备：

```jsx
const topics = ['text', 'element', 'array'];
```

再写：

```jsx
{topics.map((topic) => (
  <span key={topic}>{topic}</span>
))}
```

**预期观察**：数组中的三个 Element 都被渲染出来。

### 第 6 步：加入空节点

准备：

```jsx
const showTip = false;
```

在 JSX 中加入：

```jsx
{showTip && <em>Visible only when true</em>}
{null}
{undefined}
```

**预期观察**：这些位置没有可见内容。

### 第 7 步：完成案例并对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

本节总结：

- **本节核心代码**：`{children}` 以及不同 React node 作为 children 的组合。
- **实验辅助代码**：数组 `topics`、`map()`、`showTip`、`createRoot` 只是为了让差异可观察。

## 运行案例

进入 React 模块根目录：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
```

启动：

```bash
npm run dev -- ./02-jsx-react-element-component-model/kp020-jsx-children-model --config ./vite.config.js
```

## 效果验证

请亲手确认：

1. 文本 child 会显示。
2. 数字 `42` 和 `0` 都会显示。
3. React Element 会正常显示。
4. `map()` 生成的一组 Element 可以作为 children。
5. `false`、`null`、`undefined` 不产生可见内容。
6. 你能解释为什么 `{0}` 与 `{false}` 的显示结果不同。
7. 你不会再把 `children` 简化理解成“一个字符串属性”。

完成后进入 **Chapter 03：Props、组合与组件 API**。
