# RE-KP014：React Element、Component 与 DOM Node 的区别

> [返回 Chapter 02](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 准确区分 Component、React Element 与 DOM Node。
2. 解释 `<Welcome name="Ada" />` 得到的不是浏览器 DOM 节点，而是 React Element 描述。
3. 知道函数组件本身是组件类型，React Element 是一次 UI 描述，DOM Node 是浏览器真实对象。
4. 能通过 `typeof`、Element 的 `type/props` 与 `document.getElementById()` 亲手观察三者差异。
5. 建立 `Component → React Element → Renderer → DOM Node` 的基本链路。

> **本节核心代码**：`Welcome`、`<Welcome />` 与 `document.getElementById(...)` 三种值的对照。
>
> **实验辅助代码**：`console.log`、`requestAnimationFrame` 和说明卡片只用于观察对象身份。

## 理论讲解

### 1. 三个词为什么容易混在一起

React 代码经常同时出现：

```jsx
function Welcome() {
  return <h1>Hello</h1>;
}

const element = <Welcome />;
```

浏览器最终又会出现：

```html
<h1>Hello</h1>
```

如果只看最终页面，很容易把它们都叫“组件”。

但它们处于不同层：

```text
Welcome
Component / 组件类型
        ↓
<Welcome />
React Element / UI 描述
        ↓
React DOM Renderer
        ↓
HTMLHeadingElement
真实 DOM Node
```

### 2. Component：告诉 React “如何得到一份 UI 描述”

本节使用函数组件：

```jsx
function Welcome({ name }) {
  return <h2 id="welcome-title">Hello, {name}</h2>;
}
```

变量 `Welcome` 本身是 JavaScript function，同时可以被 React 当作组件类型。

它不是 DOM，也不是某一次具体渲染结果。

### 3. React Element：一次 UI 描述对象

写：

```jsx
const element = <Welcome name="Ada" />;
```

现代 JSX 转换后会得到一份 React Element 描述。

可以观察：

```js
element.type
element.props
```

其中：

```text
element.type  → Welcome
element.props → { name: 'Ada' }
```

这表示：“请渲染一个 Welcome，输入 props 为 name=Ada。”

它仍然不是 `<h2>` DOM 节点。

### 4. DOM Node：浏览器真实存在的宿主对象

只有 React DOM 完成渲染之后，浏览器 DOM 树中才会出现：

```html
<h2 id="welcome-title">Hello, Ada</h2>
```

然后才能通过：

```js
document.getElementById('welcome-title')
```

拿到真实 DOM Node。

DOM Node 有浏览器 API，例如：

```js
domNode.textContent
domNode.getBoundingClientRect()
domNode.addEventListener(...)
```

React Element 不提供这些 DOM 方法。

### 5. 为什么 React Element 和 DOM Node 必须分开

React 的声明式模型依赖这种分层：

```text
应用代码
描述“我要什么 UI”
        ↓
React Element
        ↓
Renderer 决定如何落实
        ↓
DOM
```

同一套组件与 Element 心智模型也因此不必绑定成“只能是 DOM”。

### 6. 同一个 Component 可以产生很多 Element

例如：

```jsx
<Welcome name="Ada" />
<Welcome name="Lin" />
<Welcome name="Grace" />
```

组件类型只有一个 `Welcome`，但可以得到多份不同的 Element 描述，之后又可能对应不同 DOM 节点。

### 7. 不要把 JSX Element 和 DOM 查询结果混用

下面两个值职责完全不同：

```jsx
const element = <Welcome name="Ada" />;
const domNode = document.getElementById('welcome-title');
```

前者用于交给 React 渲染，后者用于必要时访问浏览器宿主对象。

大多数业务 UI 应优先通过 React 的声明式模型更新，而不是拿到 DOM 后持续手工修改。

## 动手编码：从 0 到 1

### 第 0 步：明确实验目标

最终我们要同时观察：

```text
Component
React Element
DOM Node
```

并确认它们不是同一个对象。

### 第 1 步：创建最小页面入口

创建 `index.html`：

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

此时 `#root` 是浏览器真实 DOM 容器。

### 第 2 步：定义函数组件

创建 `src/main.jsx`：

```jsx
function Welcome({ name }) {
  return <h2 id="welcome-title">Hello, {name}</h2>;
}
```

**本步目标**：得到组件定义。

**为什么这样写**：函数负责根据输入返回 UI 描述。

**运行后观察**：仅定义函数时页面不会自动出现 `<h2>`。

### 第 3 步：创建 React Element

加入：

```jsx
const welcomeElement = <Welcome name="Ada" />;
```

打印：

```jsx
console.log('Component:', Welcome);
console.log('React Element:', welcomeElement);
console.log('Element type:', welcomeElement.type);
console.log('Element props:', welcomeElement.props);
```

**观察**：`Welcome` 是 function，`welcomeElement` 是 React Element 对象，`welcomeElement.type` 指向 `Welcome`。

### 第 4 步：把 Element 交给 React DOM

加入：

```jsx
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <main>{welcomeElement}</main>
);
```

现在 React DOM 才开始把描述落实到 Web DOM。

### 第 5 步：渲染完成后读取真实 DOM Node

加入：

```jsx
requestAnimationFrame(() => {
  const domNode = document.getElementById('welcome-title');
  console.log('DOM Node:', domNode);
  console.log('DOM nodeName:', domNode?.nodeName);
});
```

**为什么下一帧再观察**：我们要在 React 已经提交 DOM 后再查询。本节不深入 Commit Phase，它会在 Chapter 15 专门学习。

### 第 6 步：把三层关系显示在页面

最终案例同时显示：

```text
Component: Welcome function
Element: type=Welcome, props.name=Ada
DOM Node: H2
```

Console 和页面可以互相验证。

### 第 7 步：完成案例并对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)。

本节最后只需要分清：

- **核心代码**：`Welcome`、`<Welcome name="Ada" />`、`document.getElementById(...)`。
- **实验辅助代码**：日志、说明列表和 `requestAnimationFrame`。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./02-jsx-react-element-component-model/kp014-element-component-dom-node --config ./vite.config.js
```

生产构建：

```bash
npm run build -- ./02-jsx-react-element-component-model/kp014-element-component-dom-node --config ./vite.config.js
```

## 效果验证

请确认：

1. `typeof Welcome === 'function'`。
2. `<Welcome name="Ada" />` 创建的是 React Element，而不是 `HTMLElement`。
3. `welcomeElement.type === Welcome`。
4. `welcomeElement.props.name === 'Ada'`。
5. React DOM 渲染后，`document.getElementById('welcome-title')` 能得到真实 `H2` DOM Node。
6. 能画出 `Component → React Element → React DOM Renderer → DOM Node`。

完成后继续学习 **RE-KP015：函数组件的最小模型**。
