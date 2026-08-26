# RE-KP003：React Library 与 React Framework 的区别

> [返回 Chapter 01](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 解释为什么 React 官方把 React 定义成 Library，而不是完整应用 Framework。
2. 区分 React Core、Framework、Build Tool 三层职责。
3. 知道 React 本身并不规定完整的路由、页面数据加载、SSR/SSG、构建和部署方案。
4. 理解“使用 React”与“使用 React Framework”不是同一句话。
5. 能针对常见能力判断主要责任属于 React、框架/生态还是工具链。

> **本节核心思想**：React 负责构建和组合 UI，但完整应用还需要路由、数据加载、渲染策略、构建与部署等更高层能力。
>
> **实验辅助代码**：本节的职责表格、数组数据、`createRoot` 和 Vite 只用于可视化分类，不是本节要深入学习的 React API。

## 理论讲解

### 1. React 官方怎么定位自己

React 官网当前直接把 React 描述为：

```text
The library for web and native user interfaces
```

也就是：

> 用于 Web 和 Native 用户界面的 Library。

React 非常擅长解决：

```text
组件
组合
Props
State
Hooks
React Element
渲染更新
Suspense 等 React 能力
```

但是一个生产级应用通常还要解决：

```text
URL 路由
页面级数据加载
鉴权
SSR / SSG
Server Components 集成
构建
资源优化
部署
错误页面
代码分割策略
```

这些并不全部由 React Core 单独规定。

### 2. Library 与 Framework 的区别不要死背定义

“Library”和“Framework”没有一条可以覆盖所有项目的绝对边界。

课程里先用一个实用判断方式：

```text
Library
提供一组能力，由应用自己决定如何组合

Framework
在 Library 之上进一步提供应用结构、约定和集成方案
```

React 给你的是强大的 UI 组合能力。

Framework 通常继续回答：

```text
页面怎么组织？
URL 怎么映射到页面？
数据在哪里加载？
服务端和客户端怎么协作？
怎么构建？
怎么部署？
```

### 3. React 本身不直接规定完整路由方案

React 可以渲染：

```jsx
<Dashboard />
```

但仅凭 React Core，并没有自动得到：

```text
/dashboard
/orders/:id
/settings
```

如何映射到组件树。

路由属于完整应用能力。

它可以由：

```text
React Router
Next.js Router
其他 Router / Framework
```

提供。

所以不要说：

```text
React 的路由 API 是 React Router
```

更准确的是：

```text
React Router 是围绕 React 构建的路由方案
但它不是 react 包本身的 Hook/API
```

### 4. 数据请求也不等于 React Framework

浏览器原生有：

```js
fetch(...)
```

React 组件当然可以调用它。

但真正的应用数据层还会涉及：

```text
路由级预取
缓存
并发请求
错误状态
重新验证
服务端加载
SSR 数据注入
请求瀑布治理
```

因此“会在 `useEffect` 里 fetch”并不等于已经拥有完整的数据加载架构。

后续 Module 21 会专门学习服务端状态和请求层。

### 5. React 官方为什么推荐新完整应用使用 Framework

React 官方当前建议：

> 如果要创建新的完整 React 应用或网站，优先从推荐 Framework 开始。

原因不是“没有 Framework 就不能运行 React”。

恰恰相反，React 可以渐进接入已有页面，也可以从 Vite 等 Build Tool 开始自己搭应用。

Framework 的价值在于它把很多常见应用问题提前集成：

```text
React Core
   ↓
路由
数据加载
SSR / SSG / RSC
代码分割
构建约定
部署集成
   ↓
完整应用框架
```

如果不用 Framework，这些问题就需要团队自己选型、组合和维护。

### 6. Framework 不等于“必须有服务器”

这是另一个常见误区：

```text
Framework = SSR = 必须 Node Server
```

并不成立。

现代 React Framework 可以支持不同渲染策略：

```text
CSR
SPA
SSG
SSR
按路由混合
```

有些应用最终仍然可以部署到 CDN 或静态托管。

所以 Framework 的关键不是“有没有服务器”，而是它提供了更完整的应用级约定和集成能力。

### 7. Vite 是什么位置

当前课程使用 Vite 启动 React 案例。

但：

```text
Vite ≠ React
Vite ≠ 完整 React Framework
```

Vite 首先是 **Build Tool / Dev Tool**。

它主要帮助我们处理：

```text
开发服务器
模块加载
JSX 转换集成
Fast Refresh 集成
生产构建
```

如果你使用：

```text
React + Vite
```

你仍然需要自己决定很多应用问题，例如路由、数据请求架构和目录约定。

### 8. 三层模型

本课程后面会反复使用下面这张图：

```text
React Core / Library
组件、状态、Hooks、渲染模型
          ↓
Application Framework / Ecosystem
路由、数据加载、SSR、RSC 集成、应用约定
          ↓
Toolchain / Runtime / Deployment
Vite、Bundler、Node、CDN、部署平台等
```

实际产品里三层会互相集成，但学习时先分清责任，能避免很多概念混乱。

### 9. 当前课程为什么暂时不用 Framework

我们现在处于 React Core 学习阶段。

如果一开始就使用一个功能非常完整的 Framework，很多行为会同时发生：

```text
文件路由
数据加载
服务端渲染
代码分割
缓存
React 渲染
```

初学者很难判断某个行为到底来自 React 还是 Framework。

所以本模块前半段采用：

```text
React + React DOM + Vite
```

先把 React 本体学清楚。

后面再进入更高层的应用框架与生态。

## 动手编码：从 0 到 1

本节不引入 Next.js 或 React Router，因为实验目标就是先用一个 React 页面把职责边界分类清楚。

### 第 0 步：明确实验目标

我们会把常见前端能力分成三类：

```text
React Core
Framework / Ecosystem
Toolchain
```

最后页面会显示一张职责表。

### 第 1 步：进入共享环境

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

首次运行：

```bash
npm install
```

### 第 2 步：准备 HTML Root

创建 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RE-KP003：Library 与 Framework</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 第 3 步：先准备能力清单

在 `src/main.jsx` 中写：

```js
const capabilities = [
  ['组件组合', 'React Core'],
  ['本地状态', 'React Core'],
  ['URL 路由', 'Framework / Ecosystem'],
  ['SSR / SSG 集成', 'Framework'],
  ['开发服务器', 'Toolchain'],
];
```

这一步的重点不是数组语法，而是主动判断责任边界。

### 第 4 步：创建职责表组件

使用 React 把每一项渲染成表格：

```jsx
function App() {
  return (
    <main>
      <h1>React 是 UI Library，不是完整应用 Framework</h1>
      <table>{/* ... */}</table>
    </main>
  );
}
```

### 第 5 步：给每一行加解释

不要只写分类标签，还要说明原因：

```text
组件组合
React Core
React 自身直接提供组件模型

URL 路由
Framework / Ecosystem
React Core 不规定 URL 到页面的完整映射方案
```

学习技术边界不能只靠记产品名，要能解释“为什么”。

### 第 6 步：运行并逐项反问

打开页面后，对每一行问：

```text
如果只安装 react + react-dom，这个能力会自动完整存在吗？
```

这个问题能帮助你快速识别 React Core 与应用框架能力。

### 第 7 步：对照最终源码

最终源码查看 [`src/main.jsx`](./src/main.jsx)。

本节最后区分：

- **核心知识**：React Library、Application Framework、Build Tool 三层职责。
- **实验辅助代码**：表格、JSX、`createRoot`、Vite。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

```bash
npm run dev -- ./01-react-foundations/kp003-library-vs-framework --config ./vite.config.js
```

练习：

```bash
npm run dev -- ./01-react-foundations/kp003-library-vs-framework/exercise --config ./vite.config.js
```

## 效果验证

完成本节后，请确认自己能解释：

1. 为什么 React 官网称 React 为 Library。
2. 为什么 React 不直接规定完整路由和部署方案。
3. 为什么 Vite 是 Build Tool 而不是 React Framework。
4. 为什么使用 Framework 不代表应用必须 SSR 或必须有常驻服务器。
5. 为什么 React 课程前半段先用 React + Vite，而不是直接把 Framework 行为一起引入。
6. Next.js 等 Framework 是在 React 能力之上继续解决应用级问题，而不是“替代 React”。

完成后继续学习 **RE-KP004：React 19.2.x 稳定线与 Canary/Experimental 渠道**。
