# RE-KP001：React 解决的问题与声明式 UI

> [返回 Chapter 01](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 用自己的话说明 React 主要解决哪一类 UI 开发问题。
2. 区分命令式 UI 更新和声明式 UI 描述的核心差异。
3. 建立 `状态 → 组件描述 → 界面` 的第一层 React 心智模型。
4. 理解 React 的重点不是“少写几行 DOM API”，而是让 UI 始终由当前状态推导出来。
5. 能亲手运行一个最小 React 页面，并通过一次状态切换观察多个 UI 片段如何保持一致。

> **本节核心思想**：不要把“界面应该怎么一步步改”作为主要代码模型，而是描述“当前状态下界面应该是什么样子”。
>
> **实验辅助代码**：`useState`、`createRoot`、事件处理器、Vite 配置和 CSS 只用于把声明式思想做成可观察案例。它们都会在后续知识点单独学习，本节不要求一次掌握其全部细节。

## 理论讲解

### 1. React 首先解决的是 UI 与状态的一致性问题

一个页面很少只有静态文字。真实业务通常同时存在很多状态：

```text
是否登录
订单状态
接口是否加载中
按钮是否可点击
弹窗是否打开
当前筛选条件
服务是否在线
```

假设我们有一个“支付服务状态卡片”，状态只有一个：

```text
online = true / false
```

但是这个状态会同时影响很多界面位置：

```text
online
  ├── 状态文字：Online / Offline
  ├── 标题：可接受请求 / 服务不可用
  ├── 描述文字
  ├── 卡片样式
  └── 按钮文字
```

真正困难的地方不是把其中任意一个文本改掉，而是：

> 当状态变化时，所有受影响的 UI 是否还能保持一致？

页面越复杂，手动维护这种同步关系越容易漏掉某个地方。

### 2. 命令式 UI：告诉浏览器“下一步怎么改”

使用原生 DOM API 时，经常会写成类似这样：

```js
statusText.textContent = online ? 'Online' : 'Offline';
title.textContent = online
  ? 'Service is accepting requests'
  : 'Service is unavailable';
card.className = online
  ? 'status-card is-online'
  : 'status-card is-offline';
button.textContent = online
  ? 'Switch to offline'
  : 'Switch to online';
```

这类代码的思考方式是：

```text
状态发生变化
    ↓
找到第一个 DOM
    ↓
修改文字
    ↓
找到第二个 DOM
    ↓
修改 class
    ↓
再修改按钮
    ↓
确保没有漏掉任何同步操作
```

这就是一种典型的 **命令式（Imperative）** 思路：告诉系统“请按这些步骤修改界面”。

命令式代码并不是错误代码。浏览器底层最终仍然需要执行具体 DOM 更新。问题在于，当业务状态和 UI 分支越来越多时，开发者需要亲自维护大量“从状态到 DOM 修改步骤”的同步关系。

### 3. 声明式 UI：描述“当前状态下界面应该是什么”

React 更鼓励下面的思考方式：

```jsx
<section className={online ? 'status-card is-online' : 'status-card is-offline'}>
  <strong>{online ? 'Online' : 'Offline'}</strong>
  <h1>
    {online
      ? 'Service is accepting requests'
      : 'Service is unavailable'}
  </h1>
  <button>
    Switch to {online ? 'offline' : 'online'}
  </button>
</section>
```

这里最重要的不是 JSX 语法本身，而是所有界面描述都直接依赖同一个状态：

```text
online
   ↓
组件根据 online 描述当前 UI
   ↓
React 让真实界面与这个描述保持一致
```

因此可以先记住一个非常重要的直觉公式：

```text
UI = f(state)
```

它不是严格的 React API，而是帮助你理解声明式 UI 的心智模型：

> 给定当前状态，组件应该能够描述当前界面。

### 4. 声明式不等于“没有 DOM 更新”

React 并没有让 DOM 消失。

浏览器真正显示页面时依然需要 DOM。区别只是职责发生了变化：

```text
开发者主要负责
状态 + UI 描述

React / Renderer 负责
把描述落实到具体宿主界面
```

本节只建立这个直觉。React、React DOM 和 Renderer 的精确职责会在 **RE-KP002** 单独学习。

### 5. React 的价值不只是“少写 querySelector”

如果只把 React 理解成：

```text
不用 document.querySelector 了
```

会低估 React。

更重要的变化是代码组织方式：

```text
命令式
我现在应该把哪些 DOM 改成什么？

声明式
当前业务状态是什么？
这个状态对应的 UI 应该是什么？
```

这让我们更容易把复杂界面拆成组件，并围绕状态变化推导 UI，而不是把大量 DOM 操作散落在事件处理和网络回调中。

### 6. React 不会替你解决所有应用问题

React 聚焦 UI 组合和更新模型。真实应用还需要：

```text
路由
服务端数据请求
缓存
全局状态
复杂表单
权限
构建发布
测试
```

这些能力有些来自 React 自身，有些来自框架或生态库，有些属于整个前端工程体系。

所以本节不要得到另一个错误结论：

> “用了 React，前端应用的所有问题就都被解决了。”

本课程会先把 React 本身学清楚，再在 Module 21 学习路由、状态库、服务端状态、请求缓存和复杂表单。

## 动手编码：从 0 到 1

不要先复制最终 [`src/main.jsx`](./src/main.jsx)。建议按照下面步骤自己创建文件，并在每一步明确当前代码想验证什么。

### 第 0 步：明确实验目标

本节只验证一个核心问题：

> 当一个状态同时影响多个 UI 位置时，React 能否让我们围绕“状态描述界面”，而不是手动逐个修改 DOM？

最终案例会有一个 `online` 状态，它同时影响：

```text
状态标签
卡片样式
标题
说明文字
按钮文字
```

### 第 1 步：准备共享 React 学习环境

进入 React 模块根目录：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

第一次学习本模块时执行：

```bash
npm install
```

本模块使用共享 `package.json` 提供 React、React DOM、Vite 和 React Vite Plugin。

**为什么共享依赖？**

后面会有大量 React 原子知识点。如果每个 KP 都复制一套 `package.json` 和 `node_modules`，课程仓库会产生大量重复依赖。共享工具链更接近真实项目，也更容易统一升级。

> 这些工程配置属于实验辅助设施，不是 RE-KP001 的核心知识。

### 第 2 步：创建最小 HTML 容器

在当前知识点目录创建：

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
    <title>RE-KP001：声明式 UI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

本节先把：

```html
<div id="root"></div>
```

理解为 React 页面挂载的位置即可。

`createRoot` 如何工作会在后续 React DOM 课程中继续学习。

### 第 3 步：创建一个最小 React 组件

创建：

```text
src/
└── main.jsx
```

先写一个只有静态内容的组件：

```jsx
function ServiceStatusCard() {
  return (
    <section>
      <strong>Online</strong>
      <h1>Service is accepting requests</h1>
    </section>
  );
}
```

**本步目标**不是学习完整 JSX 语法，而是先看到：

```text
组件函数
   ↓
返回一份 UI 描述
```

组件和 JSX 会在后续知识点继续拆开学习。

### 第 4 步：临时加入一个可变化状态

为了让实验真正发生状态变化，我们使用一个后面才会系统学习的 Hook：

```jsx
const [online, setOnline] = useState(true);
```

当前只需要把它理解成：

```text
online
当前服务是否在线

setOnline
实验中用来改变 online
```

不要在本节展开 Hook 原理。

### 第 5 步：让多个 UI 位置都由同一个状态推导

把组件改成：

```jsx
function ServiceStatusCard() {
  const [online, setOnline] = useState(true);

  return (
    <section className={online ? 'status-card is-online' : 'status-card is-offline'}>
      <strong>{online ? 'Online' : 'Offline'}</strong>
      <h1>
        {online
          ? 'Service is accepting requests'
          : 'Service is unavailable'}
      </h1>
      <p>
        {online
          ? 'Orders can continue to submit payment requests.'
          : 'New payment requests should be paused until recovery.'}
      </p>
      <button type="button">
        Switch to {online ? 'offline' : 'online'}
      </button>
    </section>
  );
}
```

现在重点观察依赖关系：

```text
online
  ↓
className
status text
title
description
button text
```

我们没有写五段“找到 DOM 再修改”的同步逻辑，而是描述同一个 `online` 状态下 UI 应该是什么。

### 第 6 步：让按钮真正切换状态

给按钮加入：

```jsx
onClick={() => setOnline((current) => !current)}
```

本节不深入学习事件系统和 State 更新队列，只把它当作实验开关。

点击按钮以后，`online` 改变，组件会重新得到一份基于新状态的 UI 描述。

你应该看到状态标签、颜色、标题、说明和按钮文字一起变化。

### 第 7 步：加入挂载代码和实验样式

为了让组件真正显示到浏览器，需要：

```jsx
createRoot(document.getElementById('root')).render(...)
```

为了让在线和离线状态更容易观察，还会引入：

```jsx
import './styles.css';
```

这两部分都是实验辅助代码：

- `createRoot`：后续 React DOM 章节专门学习。
- CSS：只负责让状态差异更明显。

### 第 8 步：运行并验证声明式更新

在 React 模块根目录执行：

```bash
npm run dev -- ./01-react-foundations/kp001-react-declarative-ui --config ./vite.config.js
```

打开终端提示的本地地址。

连续点击按钮，重点不要只看“按钮能不能用”，而是观察：

```text
一个 online 状态变化
        ↓
多个 UI 位置同时得到新的描述
        ↓
页面仍保持一致
```

### 第 9 步：完成案例并对照最终源码

最终源码直接查看 [`src/main.jsx`](./src/main.jsx)，样式见 [`src/styles.css`](./src/styles.css)。README 不重复粘贴整份最终文件。

本节最后只需要分清两层：

- **核心代码 / 核心思想**：围绕同一个 `online` 状态声明当前 UI，让多个界面片段由状态推导。
- **实验辅助代码**：`useState`、`setOnline`、`createRoot`、`StrictMode`、Vite 配置、点击事件和 CSS。它们负责让实验跑起来，会在后续课程逐项深入。

## 运行案例

进入 React 模块根目录：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

首次运行安装共享依赖：

```bash
npm install
```

启动 RE-KP001：

```bash
npm run dev -- ./01-react-foundations/kp001-react-declarative-ui --config ./vite.config.js
```

生产构建验证：

```bash
npm run build -- ./01-react-foundations/kp001-react-declarative-ui --config ./vite.config.js
```

预期结果：

1. 页面显示 `Payment API` 状态卡片。
2. 初始状态为 `Online`。
3. 点击按钮后切换为 `Offline`。
4. 状态标签、卡片样式、标题、说明和按钮文字一起变化。
5. 再次点击能够恢复在线状态。

## 效果验证

请亲手完成下面六项验证：

1. 能指出案例中唯一的核心业务状态是 `online`。
2. 能列出至少三个由 `online` 推导出来的 UI 位置。
3. 点击切换后，不需要自己调用 `querySelector`、修改 `textContent` 或手动同步 class。
4. 临时把 `online` 初始值改成 `false` 后刷新页面，整个页面应直接以离线状态开始，而不是逐条执行“改成离线”的 DOM 修补代码。
5. 能用自己的话解释 `UI = f(state)` 想表达什么。
6. 能说明 `useState` 和 `createRoot` 为什么在本节属于实验辅助代码，而不是 RE-KP001 的学习终点。

完成后继续进入 **RE-KP002：React、React DOM 与 Renderer 的职责边界**。
