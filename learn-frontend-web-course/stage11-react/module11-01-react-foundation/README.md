# Module 11.01：React Problem Domain、Project Bootstrap 与 Root Lifecycle

> [↑ Stage 11 总纲](../README.md) · [Module 11.02：JSX 与 React Object Model →](../module11-02-jsx-object-model/README.md)

本 Module 不急着写 Hook，而是先建立 React 的问题域。完成后必须知道 React 为什么存在、它负责什么、不负责什么，以及它与浏览器 DOM 的关系。

<!-- LESSON_NAV:START -->
<details>
<summary><strong>Lesson 导航（37 课）</strong></summary>

- [RE-INTRO-001：网页交互为什么会越来越难维护](#lesson-re-intro-001)
- [RE-INTRO-002：命令式 UI 与声明式 UI 到底差在哪里](#lesson-re-intro-002)
- [RE-INTRO-003：UI = f(State) 是什么意思](#lesson-re-intro-003)
- [RE-INTRO-004：React 到底负责什么、不负责什么](#lesson-re-intro-004)
- [RE-INTRO-005：React Tree 与 DOM Tree 为什么不是一回事](#lesson-re-intro-005)
- [RE-INTRO-006：React Library 与 React Framework 的边界](#lesson-re-intro-006)
- [RE-INTRO-007：Client Rendering、SSR、RSC 先建立全局地图](#lesson-re-intro-007)
- [RE-INTRO-008：React 与 Vue / Angular / Svelte 的范式差异初识](#lesson-re-intro-008)
- [RE-INTRO-009：综合实现——同一个交互页面的 DOM 与 React 两种思路](#lesson-re-intro-009)
- [RE-BOOT-001：React 项目启动前到底需要哪些东西](#lesson-re-boot-001)
- [RE-BOOT-002：从空目录创建 package.json](#lesson-re-boot-002)
- [RE-BOOT-003：安装 react 与 react-dom](#lesson-re-boot-003)
- [RE-BOOT-004：第一次创建 index.html](#lesson-re-boot-004)
- [RE-BOOT-005：第一次创建 JavaScript 入口文件](#lesson-re-boot-005)
- [RE-BOOT-006：第一次调用 createRoot](#lesson-re-boot-006)
- [RE-BOOT-007：第一次调用 root.render](#lesson-re-boot-007)
- [RE-BOOT-008：第一次创建 App Component](#lesson-re-boot-008)
- [RE-BOOT-009：为什么项目需要 JSX 转换](#lesson-re-boot-009)
- [RE-BOOT-010：手工加入 Vite](#lesson-re-boot-010)
- [RE-BOOT-011：理解 dev / build / preview scripts](#lesson-re-boot-011)
- [RE-BOOT-012：把项目升级为 TypeScript](#lesson-re-boot-012)
- [RE-BOOT-013：理解 tsconfig 中与 React 直接相关的关键配置](#lesson-re-boot-013)
- [RE-BOOT-014：第一次体验 HMR](#lesson-re-boot-014)
- [RE-BOOT-015：第一次 production build](#lesson-re-boot-015)
- [RE-BOOT-016：理解 Source Map 的作用](#lesson-re-boot-016)
- [RE-BOOT-017：完整追踪 React 项目启动链路](#lesson-re-boot-017)
- [RE-BOOT-018：从零重新搭一次最小 React 项目](#lesson-re-boot-018)
- [RE-ROOT-001：DOM Container 与 React Root 是两个什么对象](#lesson-re-root-001)
- [RE-ROOT-002：createRoot 创建了什么运行边界](#lesson-re-root-002)
- [RE-ROOT-003：重复 root.render 会发生什么](#lesson-re-root-003)
- [RE-ROOT-004：root.unmount 为什么不是删除 innerHTML](#lesson-re-root-004)
- [RE-ROOT-005：一个页面可以有多个 React Root 吗](#lesson-re-root-005)
- [RE-ROOT-006：React 如何逐步嵌入历史系统](#lesson-re-root-006)
- [RE-ROOT-007：createRoot 与 hydrateRoot 为什么不能混用](#lesson-re-root-007)
- [RE-ROOT-008：identifierPrefix 为什么存在](#lesson-re-root-008)
- [RE-ROOT-009：Root Error Callback 能观察哪些错误](#lesson-re-root-009)
- [RE-ROOT-010：Root 创建、更新、卸载的完整生命周期](#lesson-re-root-010)

</details>
<!-- LESSON_NAV:END -->

<a id="lesson-re-intro-001"></a>
### Lesson RE-INTRO-001：网页交互为什么会越来越难维护

从一个最小原生 DOM 交互开始，观察“状态、事件、DOM 修改”如何逐渐形成多处手工同步，理解 UI 状态复杂度真正从哪里产生。

<a id="lesson-re-intro-002"></a>
### Lesson RE-INTRO-002：命令式 UI 与声明式 UI 到底差在哪里

用同一个 Counter / Filter UI 分别实现命令式 DOM 版本和声明式描述版本，建立“告诉浏览器怎么改”和“描述当前 UI 应该是什么”的差异。

<a id="lesson-re-intro-003"></a>
### Lesson RE-INTRO-003：UI = f(State) 是什么意思

从输入状态映射到 UI 输出，理解相同 State 为什么应该产生相同 UI，以及这个思想为什么要求 Render 保持纯净。

<a id="lesson-re-intro-004"></a>
### Lesson RE-INTRO-004：React 到底负责什么、不负责什么

区分 React Core、React DOM、Router、Server State、Build Tool、Full-stack Framework，避免把整个 React 生态误认为一个库。

<a id="lesson-re-intro-005"></a>
### Lesson RE-INTRO-005：React Tree 与 DOM Tree 为什么不是一回事

通过一个最小组件树比较 React Component Tree、React Element Tree 和最终 DOM Tree，为后续 Portal、Fiber、SSR、RSC 做概念准备。

<a id="lesson-re-intro-006"></a>
### Lesson RE-INTRO-006：React Library 与 React Framework 的边界

理解 React 为什么被称为 UI Library，Next.js / React Router Framework 等为什么承担更多路由、数据、构建和服务端职责。

<a id="lesson-re-intro-007"></a>
### Lesson RE-INTRO-007：Client Rendering、SSR、RSC 先建立全局地图

只建立运行位置和数据流概念，不提前学习具体 API：浏览器执行什么、服务器执行什么、HTML 从哪里来、RSC 为什么不是 SSR 的别名。

<a id="lesson-re-intro-008"></a>
### Lesson RE-INTRO-008：React 与 Vue / Angular / Svelte 的范式差异初识

从状态更新、模板/JSX、响应式方式、编译与运行时职责做高层比较，目的不是现在做技术选型，而是知道 React 的设计取舍。

<a id="lesson-re-intro-009"></a>
### Lesson RE-INTRO-009：综合实现——同一个交互页面的 DOM 与 React 两种思路

完成一个小型筛选列表的双版本实现，只比较状态与 UI 同步方式；不提前使用 State Manager、Router、Query 等未来知识。

---

本 Module 必须从空目录开始，不允许直接 `create-vite` 一条命令把所有文件生成完以后再解释。目标是亲手建立一个 React 项目的最小运行链路，再逐步引入 Vite 和 TypeScript。

<a id="lesson-re-boot-001"></a>
### Lesson RE-BOOT-001：React 项目启动前到底需要哪些东西

检查 Node.js、pnpm、浏览器和编辑器，解释 Node 为什么只是在开发/构建阶段运行，React 页面最终为什么仍然在浏览器中执行。

<a id="lesson-re-boot-002"></a>
### Lesson RE-BOOT-002：从空目录创建 package.json

手工创建最小 `package.json`，理解 package、依赖、脚本、版本范围和项目元数据，不依赖脚手架隐藏这些概念。

<a id="lesson-re-boot-003"></a>
### Lesson RE-BOOT-003：安装 react 与 react-dom

区分 `react` 与 `react-dom` 的职责，并通过 `node_modules`、lockfile 和 package.json 的变化理解依赖真正安装到了哪里。

<a id="lesson-re-boot-004"></a>
### Lesson RE-BOOT-004：第一次创建 index.html

手工创建最小 HTML 容器，理解 `<div id="root">` 只是普通 DOM 节点，此时页面中还没有 React。

<a id="lesson-re-boot-005"></a>
### Lesson RE-BOOT-005：第一次创建 JavaScript 入口文件

创建浏览器模块入口，理解 `<script type="module">`、ES Module、浏览器加载入口文件的过程。

<a id="lesson-re-boot-006"></a>
### Lesson RE-BOOT-006：第一次调用 createRoot

在入口文件中导入 React DOM Client，找到 `#root` DOM Container，创建 React Root，并解释 DOM Container 与 React Root 的区别。

<a id="lesson-re-boot-007"></a>
### Lesson RE-BOOT-007：第一次调用 root.render

把最小 React Element 渲染到 Root，验证 React 已经真正接管指定 DOM 容器，并观察最终生成的 DOM。

<a id="lesson-re-boot-008"></a>
### Lesson RE-BOOT-008：第一次创建 App Component

把 UI 从入口文件拆成 `App` Function Component，建立入口文件、Root Component 和普通 Component 的职责边界。

<a id="lesson-re-boot-009"></a>
### Lesson RE-BOOT-009：为什么项目需要 JSX 转换

故意让浏览器直接面对 JSX，观察为什么原生浏览器不能直接执行 JSX，再引出 Build Transform 的必要性。

<a id="lesson-re-boot-010"></a>
### Lesson RE-BOOT-010：手工加入 Vite

安装并配置 Vite，理解 Dev Server、入口 HTML、模块转换和开发服务器之间的关系，而不是把 Vite 当成“React 自带工具”。

<a id="lesson-re-boot-011"></a>
### Lesson RE-BOOT-011：理解 dev / build / preview scripts

亲手配置并运行 scripts，明确开发服务器、生产构建、生产产物预览三种运行模式的区别。

<a id="lesson-re-boot-012"></a>
### Lesson RE-BOOT-012：把项目升级为 TypeScript

加入 TypeScript、React 类型声明、`tsconfig` 和 `.tsx` 文件，理解 TypeScript 在构建链中的位置以及类型为什么不会进入浏览器运行时。

<a id="lesson-re-boot-013"></a>
### Lesson RE-BOOT-013：理解 tsconfig 中与 React 直接相关的关键配置

聚焦 JSX、module、target、strict、moduleResolution 等真正会影响 React 项目的配置，不把 tsconfig 变成参数背诵课。

<a id="lesson-re-boot-014"></a>
### Lesson RE-BOOT-014：第一次体验 HMR

修改组件并观察页面局部刷新，区分普通浏览器刷新、Vite HMR 和 React Fast Refresh 的职责。

<a id="lesson-re-boot-015"></a>
### Lesson RE-BOOT-015：第一次 production build

执行生产构建，查看 dist、HTML、JS/CSS 产物和资源引用，理解源码和生产资源之间发生了什么变化。

<a id="lesson-re-boot-016"></a>
### Lesson RE-BOOT-016：理解 Source Map 的作用

在开发工具中从生产/转换后代码映射回 TSX 源码，为以后 React 源码 Debug、线上错误定位建立基础。

<a id="lesson-re-boot-017"></a>
### Lesson RE-BOOT-017：完整追踪 React 项目启动链路

从浏览器请求 URL 开始，逐步解释 `index.html → module script → main.tsx → createRoot → root.render → App → React Tree → DOM`，要求能够脱离脚手架完整复述。

<a id="lesson-re-boot-018"></a>
### Lesson RE-BOOT-018：从零重新搭一次最小 React 项目

删除项目后重新创建一遍，不看最终源码完成依赖、HTML、入口、Root、Component、Vite、TypeScript、build，作为本 Module 的综合验证。

---

本 Module 把 Root 从“照着文档写 createRoot”提升到完整运行边界：一个 Root 管什么、什么时候创建、什么时候销毁、多个 Root 如何共存，以及 Hydration Root 与 Client Root 为什么不同。

<a id="lesson-re-root-001"></a>
### Lesson RE-ROOT-001：DOM Container 与 React Root 是两个什么对象

通过运行时打印和 DevTools 观察，明确 DOM Element、React Root 和 Component Tree 三者的关系。

<a id="lesson-re-root-002"></a>
### Lesson RE-ROOT-002：createRoot 创建了什么运行边界

理解 Root 不是单纯的 render 函数包装器，而是 React 调度、错误处理、标识和后续更新的根边界。

<a id="lesson-re-root-003"></a>
### Lesson RE-ROOT-003：重复 root.render 会发生什么

在同一个 Root 上连续 render 不同 Element Tree，观察 DOM 如何复用、Component State 如何保留或重置，为 Reconciliation 建立前置直觉。

<a id="lesson-re-root-004"></a>
### Lesson RE-ROOT-004：root.unmount 为什么不是删除 innerHTML

比较 React unmount 和手工清空 DOM，观察 Effect/Ref/组件生命周期清理的差异，为后续资源释放做准备。

<a id="lesson-re-root-005"></a>
### Lesson RE-ROOT-005：一个页面可以有多个 React Root 吗

在传统 HTML 页面中挂载两个独立 Root，理解多个 React Island、共享状态困难和嵌入 Legacy Page 的实际使用场景。

<a id="lesson-re-root-006"></a>
### Lesson RE-ROOT-006：React 如何逐步嵌入历史系统

以已有 HTML / jQuery 风格页面为背景，只让 React 接管一个区域，理解渐进迁移而不是“一次性重写”的工程边界。

<a id="lesson-re-root-007"></a>
### Lesson RE-ROOT-007：createRoot 与 hydrateRoot 为什么不能混用

通过已有 Server HTML 的最小例子建立 Client Render 与 Hydration 的区别；此处只建立 Root 级概念，完整 Hydration 在后续 Module 深入。

<a id="lesson-re-root-008"></a>
### Lesson RE-ROOT-008：identifierPrefix 为什么存在

用多个 Root + `useId` 场景解释 ID 冲突问题，为 SSR、多 Root 和可访问性建立前置知识。

<a id="lesson-re-root-009"></a>
### Lesson RE-ROOT-009：Root Error Callback 能观察哪些错误

认识 `onCaughtError`、`onUncaughtError`、`onRecoverableError` 等 Root 级错误观察入口及其生产可观测价值，不在这里展开完整 Error Boundary。

<a id="lesson-re-root-010"></a>
### Lesson RE-ROOT-010：Root 创建、更新、卸载的完整生命周期

用时间线把 Container、Root、首次 Render、后续 Render、Unmount 串起来，并输出一张 Root 生命周期图。

---

---

> [↑ Stage 11 总纲](../README.md) · [Module 11.02：JSX 与 React Object Model →](../module11-02-jsx-object-model/README.md)
