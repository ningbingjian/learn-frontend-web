# RE-KP006：Create React App 已弃用及迁移方向

> [返回 Chapter 01](../README.md) · [返回 React 模块索引](../../README.md) · [打开最终源码](./src/main.jsx)

## 文档目录

- [学习目标](#学习目标)
- [理论讲解](#理论讲解)
- [动手编码：从 0 到 1](#动手编码从-0-到-1)
- [运行案例](#运行案例)
- [效果验证](#效果验证)

## 学习目标

学完本节后，你应该能够：

1. 知道 Create React App（CRA）曾经解决过什么问题。
2. 知道 React 官方在 2025-02-14 正式弃用 CRA 作为新应用的推荐创建方式。
3. 区分“deprecated”“maintenance mode”“完全不能运行”三个不同概念。
4. 能根据项目目标在 Framework 与 Build Tool 两条迁移方向中做第一层选择。
5. 知道为什么本课程不再使用 `create-react-app` 创建 React 学习项目。

> **本节核心知识**：CRA 已弃用于新应用；现有 CRA 项目不会因此瞬间失效；新项目应优先选择推荐 Framework，或在不需要 Framework 时使用 Vite、Parcel、Rsbuild 等 Build Tool。
>
> **实验辅助代码**：本节 React 页面只是用于展示“旧项目 / 新项目 / 学习项目”三类场景的推荐方向，不提前教学框架路由、SSR 或 Vite 细节。

## 理论讲解

### 1. Create React App 当年为什么重要

2016 年左右，要从零建立 React 工程并不轻松。

开发者通常需要自己组合：

```text
JSX 转换
开发服务器
打包
Lint
热更新
测试配置
生产构建
```

对于刚开始学习 React 的人来说，这些工具链细节会挡在 React 本身之前。

CRA 的价值，就是把一组常见配置统一起来：

```text
npx create-react-app my-app
        ↓
生成一套可直接开发的 React 工程
```

它解决的是当时的“没有清晰默认建项方式”问题。

所以学习历史时不要把 CRA 简单理解为：

> 一个过时而且从来没有价值的工具。

它曾经非常重要，只是 React 应用开发方式后来继续演进了。

### 2. CRA 在 2025-02-14 被正式弃用

React 官方在 **2025-02-14** 发布《Sunsetting Create React App》，明确表示：

```text
Create React App is deprecated for new apps
```

也就是说：

```text
新建 React 应用
不再推荐使用 CRA
```

React 官方给出了两大迁移方向：

```text
方向 A：推荐 Framework

方向 B：如果 Framework 不合适，使用 Build Tool
        例如 Vite / Parcel / Rsbuild
```

本课程属于“系统学习 React Core”的场景，因此使用 Build Tool 路线来建立最小、透明的 React 学习工程。

### 3. Deprecated 不等于“今天全部坏掉”

这是最容易误解的一点。

CRA 被弃用以后，并不是：

```text
所有 CRA 项目马上无法启动
npm 会删除所有 CRA 包
旧项目必须今天重写
```

React 官方说明 CRA 会继续以 **maintenance mode** 运行，而且还发布过兼容 React 19 的版本。

所以应当区分：

```text
Deprecated
不再推荐用于新项目，未来发展方向已经改变

Maintenance Mode
主要做必要维护，不再作为积极演进的主路线

Broken / Removed
工具无法继续工作或已经被移除
```

CRA 当前属于前两者，不应该直接说成第三种。

### 4. React 为什么不再把 CRA 当成新应用答案

CRA 的模型主要是：

```text
给你一个客户端 React SPA 工具链
```

但现代 React 应用经常还要解决：

```text
Routing
Data Fetching
Code Splitting
SSR
Streaming
Server Components
Server Functions
部署边界
缓存
错误恢复
```

如果继续让 CRA 承担这些问题，它最终需要逐渐变成一个完整 Framework。

而生态中已经有专门解决这些问题的 Framework，所以 React 官方不再继续把 CRA 演进成那条路线。

### 5. 新项目应该怎么选

第一层判断可以先这样做：

```text
我要做完整应用
需要路由、服务端能力、数据加载等完整方案
        ↓
优先评估 React 推荐 Framework

我在学习 React Core
或者项目明确不需要完整 Framework
        ↓
使用 Build Tool 构建自己的 React 工程
```

注意，这不是：

```text
Framework 一定比 Vite 好
Vite 一定比 Framework 简单
```

而是职责不同。

在 RE-KP003 已经学习过：

```text
React = UI Library
Vite = Build Tool
Framework = 更完整的应用组织方案
```

RE-KP006 只是把这个边界落实到“现在还要不要用 CRA”这个现实问题上。

### 6. 本课程为什么选择 Vite

课程目标是把 React Core 本身学清楚。

如果一上来直接进入完整 Framework，初学者很容易把这些能力混在一起：

```text
React 能力
Framework 能力
Build Tool 能力
```

使用 Vite 可以让最小项目结构保持可见：

```text
index.html
src/main.jsx
React
React DOM
Vite
```

我们可以先理解：

```text
React 是怎么进入页面的
React DOM 做什么
JSX 怎么被工具链处理
开发服务器从哪里来
```

再进入更高层 Framework。

这也是为什么下一节 RE-KP007 会正式手写一个最小 Vite + React 工程。

### 7. 旧 CRA 项目迁移时不要“一键重写”

真实公司里仍然会遇到 CRA 老项目。

迁移时应该先盘点：

```text
React 版本
react-scripts 版本
环境变量
public 目录
代理配置
绝对路径 alias
测试体系
自定义 Webpack 行为
Service Worker
部署路径
浏览器兼容要求
```

然后再决定：

```text
迁移到 Framework
或者
迁移到 Vite / 其他 Build Tool
```

旧项目迁移会在 **Chapter 30：Legacy React、版本升级与迁移** 的 RE-KP307 再系统学习。

本节只建立方向，不要求现在就迁移真实大型项目。

## 动手编码：从 0 到 1

本节做一个“React 项目创建决策器”认知案例。

页面会展示三个场景：

```text
新完整应用
React Core 学习项目
现有 CRA 老项目
```

然后分别给出第一步建议。

### 第 0 步：明确实验目标

我们验证：

1. 新项目是否还应该默认选择 CRA。
2. Framework 与 Build Tool 是不是同一类东西。
3. 老 CRA 项目是否等于“马上不能用”。

### 第 1 步：准备共享环境

进入 React 模块：

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
```

首次运行：

```bash
npm install
```

### 第 2 步：创建最小页面入口

创建：

```text
kp006-cra-deprecation/
├── index.html
└── src/
    └── main.jsx
```

`index.html` 仍然只放：

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

### 第 3 步：先定义项目场景

在 `src/main.jsx` 中写：

```jsx
const scenarios = [
  {
    name: 'New production app',
    recommendation: 'Evaluate a recommended React Framework first',
  },
  {
    name: 'React Core learning app',
    recommendation: 'Use a Build Tool such as Vite',
  },
  {
    name: 'Existing CRA app',
    recommendation: 'Keep it running, audit dependencies, plan migration',
  },
];
```

这里已经把三类情况分开。

### 第 4 步：把 CRA 状态写清楚

增加：

```jsx
const craStatus = {
  deprecatedForNewApps: true,
  maintenanceMode: true,
  instantlyBroken: false,
};
```

为什么专门写 `instantlyBroken: false`？

因为这就是最容易出现的错误认知。

### 第 5 步：渲染状态卡片

```jsx
function App() {
  return (
    <main>
      <h1>Create React App 状态</h1>
      <p>Deprecated for new apps: {String(craStatus.deprecatedForNewApps)}</p>
      <p>Maintenance mode: {String(craStatus.maintenanceMode)}</p>
      <p>Instantly broken: {String(craStatus.instantlyBroken)}</p>
    </main>
  );
}
```

运行后应看到：

```text
Deprecated for new apps: true
Maintenance mode: true
Instantly broken: false
```

### 第 6 步：渲染三类项目建议

增加：

```jsx
<ul>
  {scenarios.map((item) => (
    <li key={item.name}>
      <strong>{item.name}</strong>
      <p>{item.recommendation}</p>
    </li>
  ))}
</ul>
```

现在页面表达的不只是：

```text
CRA deprecated
```

而是：

```text
那接下来应该怎么办？
```

### 第 7 步：运行案例

执行：

```bash
npm run dev -- ./01-react-foundations/kp006-cra-deprecation --config ./vite.config.js
```

检查三类场景是否都给出了不同的下一步。

### 第 8 步：对照最终源码

最终源码：[`src/main.jsx`](./src/main.jsx)

本节最后只需要分清：

- **核心知识**：CRA 已弃用于新应用；仍处于 maintenance mode；新应用应评估 Framework 或现代 Build Tool；旧项目应评估迁移而不是恐慌重写。
- **实验辅助代码**：JSX、数组渲染、`createRoot` 和 Vite 只是展示工具。

## 运行案例

```bash
cd courses/frontend-architect/stage06-frameworks-application/stage06-module19-react
npm install
npm run dev -- ./01-react-foundations/kp006-cra-deprecation --config ./vite.config.js
```

## 效果验证

学完后请确认自己能够解释：

1. CRA 当年解决了什么问题？
2. CRA 是什么时候被官方弃用于新应用的？
3. Deprecated 为什么不等于 Broken？
4. 新完整应用为什么优先评估 Framework？
5. 学习 React Core 为什么适合使用 Vite 这种 Build Tool？
6. 已经在线运行多年的 CRA 项目应该马上推倒重写吗？
7. CRA 迁移为什么要先盘点工程约束？

最终你应该形成下面的选择模型：

```text
新完整应用
  ↓
Framework first

学习 React / 明确不需要 Framework
  ↓
Build Tool（如 Vite）

已有 CRA 项目
  ↓
继续维护 + 评估迁移
```
