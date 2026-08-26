# RE-KP002：React、React DOM 与 Renderer 的职责边界

> [返回 Chapter 01](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 说明 `react` 与 `react-dom` 为什么是两个不同的包。
2. 知道 React 核心负责组件与 UI 描述等平台无关能力，而 React DOM 负责 Web DOM 宿主环境集成。
3. 能解释 Renderer（渲染器）在 React 架构中的位置。
4. 能从 `React Element → Renderer → DOM` 描述一个最小 Web 渲染链路。
5. 能亲手使用 `createElement` 和 `createRoot` 验证“描述 UI”和“挂载到浏览器 DOM”是两个步骤。

> **本节核心代码**：`createElement(...)` 与 `createRoot(...).render(...)` 的职责对照。
>
> **实验辅助代码**：`React.version`、`console.log`、Vite、HTML 容器和示例文案只用于观察职责边界，本节不要求深入它们的内部实现。

## 理论讲解

### 1. 为什么 React 项目里会同时出现 `react` 和 `react-dom`

最小 Web React 应用经常看到两类导入：

```js
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
```

它们不是重复包。

可以先建立第一层分工：

```text
react
负责表达 React 的组件、元素、状态等核心编程模型

react-dom
负责把 React 与浏览器 DOM 宿主环境连接起来
```

如果把两者全部理解成“React 包”，后面学习 SSR、Hydration、React Native、Server Components 时很容易混淆能力到底来自哪一层。

### 2. `react`：先描述“我要什么 UI”

`react` 包提供很多平台无关的 React API，例如：

```text
createElement
useState
useReducer
useContext
useRef
Suspense
```

本节只使用：

```js
createElement(type, props, ...children)
```

例如：

```js
const title = createElement('h1', null, 'Hello React');
```

这一步得到的是一个 **React Element 描述**。

此时我们还没有告诉浏览器：

```text
把它放到哪个 DOM 节点？
什么时候挂载？
如何更新真实 DOM？
```

也就是说：

```text
createElement
    ↓
得到 UI 描述
    ↓
不等于已经创建并插入真实 DOM
```

React Element 的完整模型会在 RE-KP013 单独学习，本节只用它来观察职责边界。

### 3. `react-dom/client`：把 React 树连接到浏览器 DOM

浏览器页面里通常先准备一个真实 DOM 容器：

```html
<div id="root"></div>
```

然后：

```js
const container = document.getElementById('root');
const root = createRoot(container);
root.render(element);
```

这里的关键 API：

```js
createRoot
```

来自：

```js
react-dom/client
```

它负责 Web 客户端根节点这一层的集成。

因此可以形成非常重要的对照：

```text
createElement(...)
来自 react
负责构造 React UI 描述

createRoot(...)
来自 react-dom/client
负责把 React 树连接到浏览器 DOM
```

### 4. Renderer 是什么

**Renderer（渲染器）** 可以先理解成：

> 把 React 的 UI 更新模型落到某一种具体宿主平台的实现层。

在 Web 中，宿主对象主要是：

```text
DOM Element
Text Node
Document
```

所以 React DOM 是面向 Web 的官方 Renderer 家族。

但 React 的组件模型并不是只能描述 Web 页面。

不同宿主可以有不同的具体对象：

```text
React 组件树
     ↓
Renderer
     ├── Web → DOM
     └── Native → 原生平台视图
```

这也是为什么 React 官网把 React 描述为用于 **Web 和 Native UI** 的库，而不是把 React 本身定义成“DOM 库”。

### 5. Renderer 不等于简单的“把 JSX 转成 HTML”

一个常见误解是：

```text
JSX
 ↓
React
 ↓
直接变成 HTML 字符串
```

这过于简单。

在客户端运行时，更接近下面的心智模型：

```text
组件 / React Element 描述
          ↓
React 更新与协调过程
          ↓
目标 Renderer
          ↓
宿主环境更新
          ↓
Web 中体现为 DOM 变化
```

后面我们会分别学习 Render、Reconciliation、Commit、Fiber 等机制。本节只需要知道 Renderer 是“平台落地层”。

### 6. `react-dom` 也不只有客户端 `createRoot`

React DOM 家族还涉及：

```text
react-dom/client
客户端 Root、Hydration

react-dom
Portal、flushSync 等 Web API

react-dom/server
服务端流式渲染

react-dom/static
静态预渲染相关 API
```

这些会在后面的 React DOM、SSR 和 Hydration Chapter 展开。

本节不要提前记 API，只要建立：

> `react` 与具体 Web 宿主集成不是同一层。

### 7. 最小职责链

把本节压缩成一张图：

```text
React 核心
组件 / Element / 状态模型
        ↓
Renderer 接收 React 的更新结果
        ↓
React DOM（Web Renderer）
        ↓
浏览器 DOM
        ↓
用户看到页面
```

## 动手编码：从 0 到 1

不要先复制最终 [`src/main.jsx`](./src/main.jsx)。本节刻意不用复杂组件和 Hook，只观察两个包的职责。

### 第 0 步：明确实验目标

我们要验证三件事：

1. `react` 可以先创建 React Element。
2. 创建 Element 时还没有完成浏览器 DOM 挂载。
3. `react-dom/client` 的 `createRoot` 才把 React 树连接到真实 DOM 容器。

### 第 1 步：进入共享 React 环境

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

首次学习本模块执行：

```bash
npm install
```

### 第 2 步：创建 HTML 宿主容器

创建当前知识点的：

```text
index.html
```

写入：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RE-KP002：React 与 Renderer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

这里的 `#root` 是浏览器真实 DOM 节点。

### 第 3 步：只从 `react` 创建 UI 描述

创建：

```text
src/main.jsx
```

先写：

```js
import { createElement } from 'react';

const element = createElement('h1', null, 'React describes the UI');

console.log(element);
```

运行时打开 Console，你能看到一个 React Element 对象。

但仅有这一段时，`#root` 里并不会因为 `createElement` 就自动出现 `<h1>`。

### 第 4 步：拿到浏览器 DOM 容器

继续加入：

```js
const container = document.getElementById('root');
```

现在代码中同时存在两类对象：

```text
element
React UI 描述

container
浏览器真实 DOM 节点
```

不要把它们当成同一种对象。

### 第 5 步：引入 Web 客户端 Renderer 入口

加入：

```js
import { createRoot } from 'react-dom/client';
```

注意导入来源已经从：

```text
react
```

变成：

```text
react-dom/client
```

这就是本节最关键的包边界。

### 第 6 步：创建 React DOM Root

继续：

```js
const root = createRoot(container);
```

可以先把它理解成：

```text
真实 DOM 容器
     ↓
createRoot
     ↓
建立 React 与这个 Web DOM 区域的连接
```

### 第 7 步：真正把 React 描述交给 Renderer

加入：

```js
root.render(element);
```

此时页面才会出现：

```text
React describes the UI
```

完整链路已经变成：

```text
createElement
     ↓
React Element
     ↓
createRoot(container)
     ↓
root.render(element)
     ↓
DOM 更新
```

### 第 8 步：把职责直接显示在页面中

把单一标题扩展成一组元素，分别显示：

```text
react → 描述 UI
react-dom/client → 连接 Web DOM
Renderer → 平台落地层
```

最终源码直接查看 [`src/main.jsx`](./src/main.jsx)。

本节最后只需分清：

- **核心代码**：`createElement(...)`、`createRoot(...)`、`root.render(...)` 以及它们来自不同包的事实。
- **实验辅助代码**：`React.version`、Console、示例列表、HTML 容器和 Vite。

## 运行案例

进入 React 模块根目录：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

首次执行：

```bash
npm install
```

启动本节：

```bash
npm run dev -- ./01-react-foundations/kp002-react-reactdom-renderer --config ./vite.config.js
```

打开终端中 Vite 给出的本地地址。

练习：

```bash
npm run dev -- ./01-react-foundations/kp002-react-reactdom-renderer/exercise --config ./vite.config.js
```

## 效果验证

请亲手确认：

1. `createElement` 从 `react` 导入。
2. `createRoot` 从 `react-dom/client` 导入。
3. 仅创建 React Element 并不等于已经挂载真实 DOM。
4. `root.render(element)` 后浏览器才显示对应 UI。
5. 你能用一句话解释 Renderer：把 React 更新模型落到具体宿主平台。
6. 你不会再把 React、React DOM、Renderer 三个词当成完全相同的概念。

完成后继续学习 **RE-KP003：React Library 与 React Framework 的区别**。
