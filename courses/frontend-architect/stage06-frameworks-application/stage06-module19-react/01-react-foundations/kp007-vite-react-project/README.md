# RE-KP007：使用 Vite 建立最小 React 学习工程

> [返回 Chapter 01](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx) · [打开样式](./src/styles.css) · [打开练习](./exercise/README.md)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 说明 Vite 在 React 工程里扮演什么角色，以及它为什么不是 React Framework。
2. 识别一个最小 Vite + React 项目中的 `index.html`、`src/main.jsx`、`package.json` 和 `vite.config.js`。
3. 理解 `@vitejs/plugin-react` 是 Vite 与 React 的官方集成层之一，而不是 React Core 本身。
4. 能从空目录手工建立一个最小 React 页面，并用 Vite 启动开发服务器。
5. 能区分 `vite dev`、`vite build` 和 `vite preview` 三个阶段。
6. 知道当前 Vite 8 的 Node.js 版本要求，遇到版本报错时先检查运行环境，而不是盲目重装依赖。

> **本节核心代码**：`index.html` 的模块入口、`src/main.jsx` 中 `createRoot(...).render(...)`、模块根目录的 Vite scripts 与 `vite.config.js` 中 React 插件配置。
>
> **实验辅助代码**：页面卡片样式和展示文字只是为了验证工程真正运行起来，不是本节重点。

## 理论讲解

### 1. Vite 在 React 工程中负责什么

先回顾 RE-KP003：

```text
React
UI Library

Vite
Build Tool

Framework
更完整的应用组织与运行方案
```

Vite 主要解决前端开发工具链问题，例如：

```text
开发服务器
模块解析
JSX / 资源处理
React 插件集成
HMR / Fast Refresh 基础设施
生产构建
静态资源产物
```

它不会因为你使用 React 就自动替你设计：

```text
路由架构
权限模型
服务端数据策略
SSR 业务方案
数据库
认证系统
```

所以 Vite 是现代 React 学习工程非常合适的工具，但不能把它说成“React 的完整应用框架”。

### 2. 当前课程使用 Vite 8

截至本课程当前基线（2026-08），Vite 官方站点处于 **8.2.x** 主线。

Vite 8 有一个需要特别注意的运行环境要求：

```text
Node.js 20.19+
或者
Node.js 22.12+
```

因此如果执行：

```bash
npm run dev
```

出现 Node 版本不满足要求的错误，第一步应该检查：

```bash
node -v
```

而不是先：

```text
删 node_modules
删 lock 文件
换 npm
重装 React
```

这是一种非常重要的工程排错习惯：

> 先读清楚错误属于运行环境、依赖解析、源码还是业务逻辑，再采取动作。

### 3. `npm create vite@latest` 做了什么

Vite 官方提供脚手架：

```bash
npm create vite@latest
```

React 模板可以直接：

```bash
npm create vite@latest my-react-app -- --template react
```

当前 Vite 还提供：

```text
react
react-ts
react-compiler
react-compiler-ts
```

等模板。

但是本课程不会直接让脚手架把所有文件生成出来，然后让你只看结果。

原因是 RE-KP007 的目标就是：

> 亲手知道最小 React 工程到底由哪些文件组成。

所以这节采用“手工搭建”，而不是“脚手架一键生成”。

### 4. 最小工程结构

本课程当前 React 模块共享工具链：

```text
stage06-module19-react/
├── package.json
├── vite.config.js
├── .gitignore
└── 01-react-foundations/
    └── kp007-vite-react-project/
        ├── index.html
        └── src/
            ├── main.jsx
            └── styles.css
```

这里要分清两层：

```text
模块级共享配置
package.json
vite.config.js
node_modules

知识点自己的运行入口
index.html
src/main.jsx
src/styles.css
```

为什么不让每个 RE-KP 都拥有自己的 `package.json`？

因为后面有 350 个 React 原子知识点。

如果每个目录都复制依赖：

```text
350 × package.json
350 × node_modules
350 × Vite config
```

会产生巨大重复。

课程使用共享工具链，可以让每个知识点仍然独立运行，同时保持仓库可维护。

### 5. `index.html` 为什么是入口

Vite 与一些旧工具链有一个很直观的区别：

```text
index.html 是工程入口的一部分
```

例如：

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

其中：

```text
<div id="root"></div>
```

给 React DOM 提供浏览器宿主节点。

而：

```html
<script type="module" src="/src/main.jsx"></script>
```

告诉浏览器/Vite 当前模块入口在哪里。

可以先建立：

```text
index.html
    ↓
src/main.jsx
    ↓
React createRoot
    ↓
App UI
```

### 6. `src/main.jsx` 做什么

最小 React 入口通常包含：

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return <h1>Hello React</h1>;
}

createRoot(document.getElementById('root')).render(<App />);
```

这里只需要把它看成三步：

```text
1. 准备 React 组件描述
2. 找到浏览器 root
3. 通过 React DOM 渲染到页面
```

`createRoot` 的完整 API 会在 Chapter 20 深入学习。

### 7. `@vitejs/plugin-react` 的角色

模块级 `vite.config.js`：

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

这里的：

```js
react()
```

不是 React Core Hook，也不是 React 组件。

它属于 Vite 插件配置。

第一层理解：

```text
Vite Core
   +
@vitejs/plugin-react
   ↓
提供 React 项目所需要的开发集成
```

在 Vite 8 中，React Refresh 等转换链路已经继续演进，具体底层实现不是 RE-KP007 的重点。

本节只需要知道：

> React 插件属于 Build Tool 集成层。

### 8. `dev`、`build`、`preview` 有什么区别

模块 `package.json` 中有：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

分别对应：

```text
npm run dev
开发服务器
关注快速开发反馈

npm run build
生产构建
生成 dist 产物

npm run preview
本地预览生产构建结果
不是开发服务器的替代品
```

下一节 RE-KP008 会进一步学习开发模式与生产模式差异。

RE-KP007 只先把三条命令跑通。

### 9. 为什么本课手写，而真实项目可以用脚手架

学习阶段：

```text
手写最小结构
      ↓
知道每个文件为什么存在
```

真实新项目：

```text
可以使用 create-vite
      ↓
减少重复初始化工作
```

两者并不矛盾。

课程不是要求你以后每次都手写 `index.html`，而是确保：

> 当脚手架坏了、配置需要修改、目录需要拆分时，你不是只会重新执行脚手架。

## 动手编码：从 0 到 1

这一次我们真的从空知识点目录开始，完成一个最小 Vite + React 工程。

### 第 0 步：先检查 Node.js

执行：

```bash
node -v
```

Vite 8 当前要求：

```text
Node.js 20.19+
或 22.12+
```

如果版本不满足，先切换 Node 版本。

不要在运行环境不满足时继续猜 React 代码问题。

### 第 1 步：进入共享 React 模块

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

首次学习本模块：

```bash
npm install
```

这会安装模块共享的：

```text
react
react-dom
vite
@vitejs/plugin-react
```

### 第 2 步：创建知识点目录

目录：

```text
01-react-foundations/
└── kp007-vite-react-project/
```

在里面创建：

```text
index.html
src/
```

### 第 3 步：编写 `index.html`

创建：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RE-KP007：Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

本步核心观察：

```text
index.html
明确写出了 React JavaScript 模块入口
```

### 第 4 步：创建最小 `src/main.jsx`

创建：

```text
src/main.jsx
```

先写：

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return <h1>Hello Vite + React</h1>;
}

createRoot(document.getElementById('root')).render(<App />);
```

现在已经具备：

```text
React 组件
React DOM root
render
```

### 第 5 步：第一次启动开发服务器

在 React 模块根目录执行：

```bash
npm run dev -- ./01-react-foundations/kp007-vite-react-project --config ./vite.config.js
```

为什么命令里要传当前知识点目录？

因为模块共享一套 Vite 工具链，但每个 KP 都有自己的 `index.html`。

Vite 的 root 指向当前知识点以后，它就能把：

```text
kp007-vite-react-project/index.html
```

作为当前实验入口。

### 第 6 步：确认页面已经由 React 渲染

浏览器中应该看到：

```text
Hello Vite + React
```

此时链路已经成立：

```text
Vite dev server
      ↓
index.html
      ↓
src/main.jsx
      ↓
createRoot
      ↓
App
      ↓
Browser DOM
```

### 第 7 步：加入样式文件

创建：

```text
src/styles.css
```

然后在 `main.jsx`：

```jsx
import './styles.css';
```

这一步用于观察：

> Vite 不只处理 JavaScript 模块，也会把 CSS 等前端资源放进开发和构建链路。

### 第 8 步：把页面扩成工程状态卡片

将 `App` 改成：

```jsx
function App() {
  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">RE-KP007</p>
        <h1>Vite + React 最小工程已运行</h1>
        <ul>
          <li>index.html：页面入口</li>
          <li>src/main.jsx：React 入口</li>
          <li>vite.config.js：React 插件</li>
          <li>package.json：dev / build / preview</li>
        </ul>
      </section>
    </main>
  );
}
```

### 第 9 步：执行生产构建

执行：

```bash
npm run build -- ./01-react-foundations/kp007-vite-react-project --config ./vite.config.js
```

预期在当前知识点目录产生：

```text
dist/
```

`dist/` 已被模块 `.gitignore` 忽略，不提交到课程仓库。

### 第 10 步：预览生产产物

构建完成后执行：

```bash
npm run preview -- ./01-react-foundations/kp007-vite-react-project --config ./vite.config.js
```

此时你预览的是生产构建结果，而不是开发服务器的源码服务模式。

### 第 11 步：理解脚手架等价入口

真实新项目可以用：

```bash
npm create vite@latest my-react-app -- --template react
```

但现在你已经知道脚手架最终要帮你准备的核心结构是什么。

### 第 12 步：对照最终源码

最终源码：

- [`index.html`](./index.html)
- [`src/main.jsx`](./src/main.jsx)
- [`src/styles.css`](./src/styles.css)
- [模块共享 `vite.config.js`](../../vite.config.js)
- [模块共享 `package.json`](../../package.json)

本节最后只需要分清：

- **核心代码**：HTML 模块入口、React `main.jsx`、Vite React 插件、dev/build/preview 命令。
- **实验辅助代码**：卡片文案和 CSS 只是为了确认项目已正确运行。

## 运行案例

检查 Node：

```bash
node -v
```

进入模块并安装：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
```

开发：

```bash
npm run dev -- ./01-react-foundations/kp007-vite-react-project --config ./vite.config.js
```

构建：

```bash
npm run build -- ./01-react-foundations/kp007-vite-react-project --config ./vite.config.js
```

预览：

```bash
npm run preview -- ./01-react-foundations/kp007-vite-react-project --config ./vite.config.js
```

练习：

```bash
npm run dev -- ./01-react-foundations/kp007-vite-react-project/exercise --config ./vite.config.js
```

## 效果验证

学完后，请亲手验证：

1. `node -v` 满足 Vite 8 的最低要求。
2. 删除 `src/main.jsx` 的 script 引用后，React 页面无法正常进入当前入口。
3. 恢复入口后，`npm run dev -- ...` 能看到页面。
4. 修改 `main.jsx` 后开发服务器可以快速反馈变更。
5. `npm run build -- ...` 能产生 `dist/`。
6. `npm run preview -- ...` 可以预览构建产物。
7. 能说清 `index.html`、`main.jsx`、`vite.config.js`、`package.json` 各自负责什么。
8. 能解释为什么 Vite 是 Build Tool，而不是 React Core 或完整 React Framework。

最终你应该能脱离脚手架写出最小结构：

```text
my-react-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    └── main.jsx
```

并能够把它真正运行起来。