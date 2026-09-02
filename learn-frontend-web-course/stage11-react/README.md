# Stage 11：React 完整体系

> 版本：v1.1-draft  
> 基线日期：2026-09-02  
> React 基线：React 19.2.x Stable；正式课程编写时使用当时最新稳定补丁并重新核验官方文档、安全公告和生态兼容性。  
> 上级总纲：[`../README.md`](../README.md)  
> 教学规范：[`../FRONTEND_TEACHING_GUIDE.md`](../FRONTEND_TEACHING_GUIDE.md)

---

# 1. 阶段定位

Stage 11 是课程中唯一完整的 React Stage。

React 不再拆成“基础 / 高级 / SSR / 源码”等多个 Stage，而是在这一 Stage 中，从第一次理解 React、第一次创建项目，一路学习到企业应用、并发、服务端 React、性能、Compiler、Fiber 源码、Library、Legacy、迁移和大型架构。

完整能力链：

```text
第一次接触 React
↓
从空目录建立 React 项目
↓
理解 JSX / Element / Component / Props
↓
掌握 Event / State / Form / Render
↓
掌握 State Architecture / Reducer / Context
↓
掌握 Ref / Effect / Custom Hook
↓
掌握 Router / Server State / API Boundary
↓
掌握 Actions / Optimistic / Suspense / Concurrency / Activity
↓
掌握 Profiler / Performance / Compiler
↓
掌握 React DOM / Error / A11Y / Security
↓
掌握 SSR / Hydration / Streaming / Static Rendering
↓
掌握 RSC / Server Functions / Cache Boundary
↓
调试 Fiber / Reconciler / Hooks / Lane / Scheduler 源码
↓
建设 React Library / Headless UI / 大型应用架构
↓
维护 Legacy React / Migration / Upgrade Governance
↓
能够长期负责大型 React 技术体系
```

---

# 2. Stage 11 固定结构

Stage 11 后续只使用三级课程结构：

```text
Stage
└── Module
    └── Lesson
```

不再额外创建 Failure Lab、Source Lab、Performance Lab、Module Review 等课程层级。

故障复现、性能分析、源码 Debug、综合项目、架构复盘都直接设计成普通 Lesson，并按正常学习顺序放进对应 Module。

每个 Module 必须一次学透。Lesson 拆分遵循：

1. 一个 Lesson 只解决一个主要问题或建立一个主要因果关系。
2. Lesson 可以是基础使用、机制实验、故障复现、源码调试、性能分析或综合项目，但结构上全部统一叫 Lesson。
3. 每个 Lesson 只能从零状态开始，或明确复制上一课最终源码继续演进。
4. 每个 Lesson 最终源码必须可以独立安装、运行、测试和验证。
5. 当前 Lesson 用到的核心知识必须已经学过，禁止偷用未来 Module 技术。
6. Module 的 Must / Should / Expert 深度通过多个 Lesson 在本 Module 内一次闭环，不能未来再补“高级篇 / 源码篇”。
7. Lesson ID 使用稳定语义 ID；即使后续调整 Module 顺序，引用关系也尽量不被破坏。

下面先把 `Module 11.01 ～ 11.08` 完整拆成 Lesson，用来确定 Stage 11 后续统一粒度。

---

# 3. Module / Lesson 学习顺序

# Module 11.01：React 是什么、为什么需要 React

本 Module 不急着写 Hook，而是先建立 React 的问题域。完成后必须知道 React 为什么存在、它负责什么、不负责什么，以及它与浏览器 DOM 的关系。

### Lesson RE-INTRO-001：网页交互为什么会越来越难维护

从一个最小原生 DOM 交互开始，观察“状态、事件、DOM 修改”如何逐渐形成多处手工同步，理解 UI 状态复杂度真正从哪里产生。

### Lesson RE-INTRO-002：命令式 UI 与声明式 UI 到底差在哪里

用同一个 Counter / Filter UI 分别实现命令式 DOM 版本和声明式描述版本，建立“告诉浏览器怎么改”和“描述当前 UI 应该是什么”的差异。

### Lesson RE-INTRO-003：UI = f(State) 是什么意思

从输入状态映射到 UI 输出，理解相同 State 为什么应该产生相同 UI，以及这个思想为什么要求 Render 保持纯净。

### Lesson RE-INTRO-004：React 到底负责什么、不负责什么

区分 React Core、React DOM、Router、Server State、Build Tool、Full-stack Framework，避免把整个 React 生态误认为一个库。

### Lesson RE-INTRO-005：React Tree 与 DOM Tree 为什么不是一回事

通过一个最小组件树比较 React Component Tree、React Element Tree 和最终 DOM Tree，为后续 Portal、Fiber、SSR、RSC 做概念准备。

### Lesson RE-INTRO-006：React Library 与 React Framework 的边界

理解 React 为什么被称为 UI Library，Next.js / React Router Framework 等为什么承担更多路由、数据、构建和服务端职责。

### Lesson RE-INTRO-007：Client Rendering、SSR、RSC 先建立全局地图

只建立运行位置和数据流概念，不提前学习具体 API：浏览器执行什么、服务器执行什么、HTML 从哪里来、RSC 为什么不是 SSR 的别名。

### Lesson RE-INTRO-008：React 与 Vue / Angular / Svelte 的范式差异初识

从状态更新、模板/JSX、响应式方式、编译与运行时职责做高层比较，目的不是现在做技术选型，而是知道 React 的设计取舍。

### Lesson RE-INTRO-009：综合实现——同一个交互页面的 DOM 与 React 两种思路

完成一个小型筛选列表的双版本实现，只比较状态与 UI 同步方式；不提前使用 State Manager、Router、Query 等未来知识。

---

# Module 11.02：从空目录建立 React + TypeScript 项目

本 Module 必须从空目录开始，不允许直接 `create-vite` 一条命令把所有文件生成完以后再解释。目标是亲手建立一个 React 项目的最小运行链路，再逐步引入 Vite 和 TypeScript。

### Lesson RE-BOOT-001：React 项目启动前到底需要哪些东西

检查 Node.js、pnpm、浏览器和编辑器，解释 Node 为什么只是在开发/构建阶段运行，React 页面最终为什么仍然在浏览器中执行。

### Lesson RE-BOOT-002：从空目录创建 package.json

手工创建最小 `package.json`，理解 package、依赖、脚本、版本范围和项目元数据，不依赖脚手架隐藏这些概念。

### Lesson RE-BOOT-003：安装 react 与 react-dom

区分 `react` 与 `react-dom` 的职责，并通过 `node_modules`、lockfile 和 package.json 的变化理解依赖真正安装到了哪里。

### Lesson RE-BOOT-004：第一次创建 index.html

手工创建最小 HTML 容器，理解 `<div id="root">` 只是普通 DOM 节点，此时页面中还没有 React。

### Lesson RE-BOOT-005：第一次创建 JavaScript 入口文件

创建浏览器模块入口，理解 `<script type="module">`、ES Module、浏览器加载入口文件的过程。

### Lesson RE-BOOT-006：第一次调用 createRoot

在入口文件中导入 React DOM Client，找到 `#root` DOM Container，创建 React Root，并解释 DOM Container 与 React Root 的区别。

### Lesson RE-BOOT-007：第一次调用 root.render

把最小 React Element 渲染到 Root，验证 React 已经真正接管指定 DOM 容器，并观察最终生成的 DOM。

### Lesson RE-BOOT-008：第一次创建 App Component

把 UI 从入口文件拆成 `App` Function Component，建立入口文件、Root Component 和普通 Component 的职责边界。

### Lesson RE-BOOT-009：为什么项目需要 JSX 转换

故意让浏览器直接面对 JSX，观察为什么原生浏览器不能直接执行 JSX，再引出 Build Transform 的必要性。

### Lesson RE-BOOT-010：手工加入 Vite

安装并配置 Vite，理解 Dev Server、入口 HTML、模块转换和开发服务器之间的关系，而不是把 Vite 当成“React 自带工具”。

### Lesson RE-BOOT-011：理解 dev / build / preview scripts

亲手配置并运行 scripts，明确开发服务器、生产构建、生产产物预览三种运行模式的区别。

### Lesson RE-BOOT-012：把项目升级为 TypeScript

加入 TypeScript、React 类型声明、`tsconfig` 和 `.tsx` 文件，理解 TypeScript 在构建链中的位置以及类型为什么不会进入浏览器运行时。

### Lesson RE-BOOT-013：理解 tsconfig 中与 React 直接相关的关键配置

聚焦 JSX、module、target、strict、moduleResolution 等真正会影响 React 项目的配置，不把 tsconfig 变成参数背诵课。

### Lesson RE-BOOT-014：第一次体验 HMR

修改组件并观察页面局部刷新，区分普通浏览器刷新、Vite HMR 和 React Fast Refresh 的职责。

### Lesson RE-BOOT-015：第一次 production build

执行生产构建，查看 dist、HTML、JS/CSS 产物和资源引用，理解源码和生产资源之间发生了什么变化。

### Lesson RE-BOOT-016：理解 Source Map 的作用

在开发工具中从生产/转换后代码映射回 TSX 源码，为以后 React 源码 Debug、线上错误定位建立基础。

### Lesson RE-BOOT-017：完整追踪 React 项目启动链路

从浏览器请求 URL 开始，逐步解释 `index.html → module script → main.tsx → createRoot → root.render → App → React Tree → DOM`，要求能够脱离脚手架完整复述。

### Lesson RE-BOOT-018：从零重新搭一次最小 React 项目

删除项目后重新创建一遍，不看最终源码完成依赖、HTML、入口、Root、Component、Vite、TypeScript、build，作为本 Module 的综合验证。

---

# Module 11.03：React Root 与应用启动生命周期

本 Module 把 Root 从“照着文档写 createRoot”提升到完整运行边界：一个 Root 管什么、什么时候创建、什么时候销毁、多个 Root 如何共存，以及 Hydration Root 与 Client Root 为什么不同。

### Lesson RE-ROOT-001：DOM Container 与 React Root 是两个什么对象

通过运行时打印和 DevTools 观察，明确 DOM Element、React Root 和 Component Tree 三者的关系。

### Lesson RE-ROOT-002：createRoot 创建了什么运行边界

理解 Root 不是单纯的 render 函数包装器，而是 React 调度、错误处理、标识和后续更新的根边界。

### Lesson RE-ROOT-003：重复 root.render 会发生什么

在同一个 Root 上连续 render 不同 Element Tree，观察 DOM 如何复用、Component State 如何保留或重置，为 Reconciliation 建立前置直觉。

### Lesson RE-ROOT-004：root.unmount 为什么不是删除 innerHTML

比较 React unmount 和手工清空 DOM，观察 Effect/Ref/组件生命周期清理的差异，为后续资源释放做准备。

### Lesson RE-ROOT-005：一个页面可以有多个 React Root 吗

在传统 HTML 页面中挂载两个独立 Root，理解多个 React Island、共享状态困难和嵌入 Legacy Page 的实际使用场景。

### Lesson RE-ROOT-006：React 如何逐步嵌入历史系统

以已有 HTML / jQuery 风格页面为背景，只让 React 接管一个区域，理解渐进迁移而不是“一次性重写”的工程边界。

### Lesson RE-ROOT-007：createRoot 与 hydrateRoot 为什么不能混用

通过已有 Server HTML 的最小例子建立 Client Render 与 Hydration 的区别；此处只建立 Root 级概念，完整 Hydration 在后续 Module 深入。

### Lesson RE-ROOT-008：identifierPrefix 为什么存在

用多个 Root + `useId` 场景解释 ID 冲突问题，为 SSR、多 Root 和可访问性建立前置知识。

### Lesson RE-ROOT-009：Root Error Callback 能观察哪些错误

认识 `onCaughtError`、`onUncaughtError`、`onRecoverableError` 等 Root 级错误观察入口及其生产可观测价值，不在这里展开完整 Error Boundary。

### Lesson RE-ROOT-010：Root 创建、更新、卸载的完整生命周期

用时间线把 Container、Root、首次 Render、后续 Render、Unmount 串起来，并输出一张 Root 生命周期图。

---

# Module 11.04：JSX 一次学透

JSX 不作为“HTML 写进 JS”简单带过，而是一直学习到 JSX Transform、Element Object、类型检查和常见错误边界。

### Lesson RE-JSX-001：JSX 为什么存在

先用函数调用/对象描述 UI，再引入 JSX，理解 JSX 解决的是 UI 描述可读性问题，而不是浏览器新语法。

### Lesson RE-JSX-002：JSX 与 HTML 到底有哪些不同

系统理解 className、htmlFor、camelCase、boolean attribute、style object、事件属性等差异，以及差异背后的 JavaScript/DOM 属性模型。

### Lesson RE-JSX-003：在 JSX 中嵌入 JavaScript Expression

掌握 `{}` 的真正语义，区分 Expression 与 Statement，解释为什么某些 JavaScript 不能直接写进 JSX children。

### Lesson RE-JSX-004：JSX Attribute 与 Props 如何连接

从 JSX Attribute 跟踪到 React Element props，对字符串、表达式、boolean、对象和 spread 的结果逐个观察。

### Lesson RE-JSX-005：JSX Children 到底是什么

覆盖文本、Element、数组、null、boolean、Fragment、Component Children，并观察最终 React Node 结构。

### Lesson RE-JSX-006：Fragment 为什么存在

比较额外 DOM Wrapper、Fragment 和数组返回，理解 React Tree 组织与真实 DOM 结构的差异。

### Lesson RE-JSX-007：Spread Props 为什么方便又危险

学习 `{...props}` 的覆盖顺序、未知属性传播和 API 边界污染问题，建立组件公共 API 的早期规范意识。

### Lesson RE-JSX-008：JSX Transform 到底把代码变成什么

查看 Vite/Babel/SWC 转换结果，理解 `jsx/jsxs` 调用以及为什么现代 JSX 不再要求每个文件显式 `import React`。

### Lesson RE-JSX-009：React Element Object 长什么样

在开发环境打印 JSX 结果，观察 type、props、key 等信息，强调它只是描述对象而不是 DOM Node。

### Lesson RE-JSX-010：为什么不能把任意对象直接渲染成 Child

主动制造 invalid React child 错误，理解 React Node 可接受值范围和数据到 UI 的显式转换责任。

### Lesson RE-JSX-011：JSX 与 TypeScript 如何协作

理解 TSX、Intrinsic Elements、Component Props 类型检查和常见类型报错，为后续组件 API 奠定基础。

### Lesson RE-JSX-012：从 JSX 源码到浏览器 DOM 的完整链路

从 `.tsx` 源码一路观察 Transform、React Element、Render、DOM，要求能解释每一层对象发生了什么。

---

# Module 11.05：React Element、React Node、Component、DOM Node

本 Module 专门消除 React 初学和进阶阶段最常见的概念混淆，并为 Fiber 源码学习建立统一词汇。

### Lesson RE-MODEL-001：Function 与 Component Definition 有什么区别

理解不是所有函数都是 React Component，Component Definition 需要满足什么调用约定和返回约束。

### Lesson RE-MODEL-002：`App`、`App()`、`<App />` 分别是什么

通过类型、返回值、调用方式和 Hooks 行为比较三者，解释为什么业务代码不应该把 Function Component 当普通函数直接调用。

### Lesson RE-MODEL-003：React Element 到底是什么

创建多个 Element，观察 element 的不可变描述属性，理解“Element 是 UI 描述，不是组件实例”。

### Lesson RE-MODEL-004：React Node 的范围比 React Element 大在哪里

系统整理 string、number、Element、Fragment、Portal、array、null 等可渲染节点，解决 children API 设计时的类型困惑。

### Lesson RE-MODEL-005：Component Tree 与 Element Tree 如何形成

从函数组件返回值递归展开，理解组件层级与 Element 描述之间不是简单的一对一 DOM 映射。

### Lesson RE-MODEL-006：DOM Node 是什么时候才真正出现的

在 Render 前后观察浏览器 DOM，理解 React 描述阶段与 Host DOM Mutation 阶段的分离。

### Lesson RE-MODEL-007：Fiber 现在先认识到什么程度

只建立 Fiber 是 React 内部工作单元/运行时节点的概念，明确 Fiber ≠ Element ≠ Component ≠ DOM；源码细节留到后续 Fiber Module。

### Lesson RE-MODEL-008：画出一次最小 React 页面中的全部对象关系

对一个三组件页面输出 Function、Element、Tree、Fiber（概念级）、DOM 的关系图，作为后续所有 React 机制讨论的统一语言。

---

# Module 11.06：Function Component、Pure Render 与 StrictMode

本 Module 从“会写函数组件”深入到 React 正确性规则。后续 State、Effect、Concurrency、Compiler 和 Fiber 都依赖这里建立的纯 Render 模型。

### Lesson RE-COMP-001：第一个真正可复用的 Function Component

从单文件 App 拆出独立组件，明确组件命名、文件职责、参数和返回 UI 描述的基本形式。

### Lesson RE-COMP-002：Component Function 什么时候会重新执行

通过父组件更新、Props 更新和 State 更新观察函数重新调用，纠正“组件对象被修改”的错误心智模型。

### Lesson RE-COMP-003：Render 到底是什么意思

区分 Component Render、React Render Phase 和浏览器 Paint，避免把“React render”简单理解为“屏幕刷新”。

### Lesson RE-COMP-004：Pure Render 为什么是 React 的硬规则

通过相同输入产生不同结果的故障示例，解释纯函数、幂等、可重试 Render 与 Concurrent Rendering 的关系。

### Lesson RE-COMP-005：在 Render 中修改外部变量会发生什么

主动制造全局变量累加、DOM 修改等副作用，观察重复 Render 后错误行为，并解释副作用为什么必须离开 Render。

### Lesson RE-COMP-006：为什么不能在 Render 中直接调用会变化的随机/时间数据

使用 Date、Math.random 制造不稳定 UI，为 Hydration Mismatch、Memoization 和 Compiler 规则建立前置理解。

### Lesson RE-COMP-007：StrictMode 到底在验证什么

观察开发环境中的额外 Render / Effect 检查，理解 StrictMode 是发现不纯逻辑和清理缺失的工具，不是“React 的 Bug”。

### Lesson RE-COMP-008：Nested Component Definition 为什么会导致状态重置

在组件内部定义另一个组件并触发父更新，观察 Component Type Identity 变化，为后续 State Preservation 深入做准备。

### Lesson RE-COMP-009：Mutation 为什么经常让 React 推理失效

从 Props/Object Mutation 的小例子观察不可预测行为，引出不可变数据和 Compiler/Concurrent React 对正确代码结构的要求。

### Lesson RE-COMP-010：Rules of React 的统一心智模型

把 Pure Render、Hook Rules、不可变输入、Effect 边界等规则放在同一张图里解释“React 为什么需要这些约束”。

---

# Module 11.07：Props、Children 与单向数据流

本 Module 不止讲“父传子”，还覆盖组件 API 设计、Composition、回调、不可变输入、TypeScript Props 和常见 API 失控问题。

### Lesson RE-PROPS-001：第一个 Props

从硬编码组件演进为可配置组件，理解 Component Definition 与每次 Element 创建时传入的 Props 数据。

### Lesson RE-PROPS-002：Props Destructuring、Default Value 与 Optional Props

学习默认值真正发生的位置、undefined 与缺省值行为，并用 TypeScript 明确 required / optional 合同。

### Lesson RE-PROPS-003：Object / Array Props 为什么仍然是引用

观察父组件每次创建新对象对 Props Identity 的影响，为后续 Memoization 和 Render Performance 建立前置知识。

### Lesson RE-PROPS-004：Function Props 如何让 Child 请求 Parent 执行动作

理解 Callback Props 不是“子改父”，而是父组件把能力通过函数传给子组件；建立事件上行的正确数据流模型。

### Lesson RE-PROPS-005：Children 到底是不是一个特殊 Props

比较显式 `children` 与普通 Props，理解文本、Element、多个 Children 和嵌套结构。

### Lesson RE-PROPS-006：Composition 为什么通常优于大量配置 Props

从一个布尔 Props 爆炸组件重构为 Composition，学习 slots-like composition、wrapper、layout 和 content injection。

### Lesson RE-PROPS-007：Props 是只读的意味着什么

主动修改 Props / nested object，讨论 JavaScript 引用可变性与 React 单向数据流之间的边界。

### Lesson RE-PROPS-008：TypeScript 如何设计可靠 Props API

覆盖 union、discriminated union、children 类型、event callback、generic props 的基础设计，重点避免 impossible props combination。

### Lesson RE-PROPS-009：Controlled API 的概念从哪里来

通过“父拥有值 + 子接收 value/onChange”建立 Controlled Component 前置模型，为 Form、Headless Component 做准备。

### Lesson RE-PROPS-010：Prop Drilling 是问题本身还是架构信号

通过多层传递例子分析何时保持显式 Props 更好、何时应 Composition、Context 或重新划分 Ownership，不提前直接把 Context 当答案。

### Lesson RE-PROPS-011：组件公共 API 如何避免不断膨胀

从 ProductCard 的真实需求演进中分析 boolean prop、mode prop、render prop、children composition 的取舍，为大型组件 API 设计建立早期经验。

### Lesson RE-PROPS-012：综合重构——从硬编码卡片到可组合组件族

把多个重复卡片重构为 ProductCard / ProductImage / ProductMeta / Action Area 等可组合结构，仅使用已经学过的 JSX、Component、Props 和 Children。

---

# Module 11.08：Conditional Rendering、List、Key 与 Identity

本 Module 从条件显示和列表渲染一路进入 Key、Identity、Reconciliation 前置模型，并在末尾自然完成第一个 React 综合项目。

### Lesson RE-LIST-001：条件 UI 的第一种写法——if 与提前 return

学习基于数据决定完整 UI 分支，理解 return null 和不渲染之间的关系。

### Lesson RE-LIST-002：三元表达式适合什么条件 UI

比较 if 与 ternary 的可读性边界，避免为了“短”把复杂业务逻辑塞进 JSX。

### Lesson RE-LIST-003：`&&` 条件渲染有哪些陷阱

主动制造 `0 && <Component />` 等问题，理解 JavaScript 表达式结果和 React Node 渲染规则之间的关系。

### Lesson RE-LIST-004：数组为什么可以直接成为 React Children

从数组 of Elements 到 JSX 列表，理解 React 如何接收一组 sibling children。

### Lesson RE-LIST-005：使用 map 从数据得到 Element 列表

建立“数据集合 → UI 描述集合”的声明式模型，并保持数据转换和 JSX 表达清晰。

### Lesson RE-LIST-006：为什么 React 要求 Key

从没有 Key 的警告入手，不先背规则，而是通过更新列表观察 React 为什么需要 sibling identity。

### Lesson RE-LIST-007：什么才是 Stable Key

比较 database id、业务 id、index、random key，理解稳定性、唯一范围和可预测 identity。

### Lesson RE-LIST-008：Index Key 在什么情况下真的会出问题

制造插入、删除、排序场景，并在行内加入可观察状态，看到状态为什么会对应错数据。

### Lesson RE-LIST-009：Random Key 为什么会让组件每次都重新开始

每次 Render 生成新 Key，观察 DOM/Component State 被重新创建，理解 Key 不只是消除 warning。

### Lesson RE-LIST-010：Key 与 Component Identity / State Preservation 的连接

把 Key 放到组件级切换场景，提前建立“type + position + key”决定 identity 的模型，完整机制留到 Module 11.13。

### Lesson RE-LIST-011：列表删除、插入、重排时 React 在比较什么

在不进入 Fiber 源码的前提下建立 Child Reconciliation 的高层模型，为后续 Reconciler Module 埋下清晰连接点。

### Lesson RE-LIST-012：复杂条件与列表代码应该放在 JSX 里还是外面

从可读性、可测试性和重复计算角度重构一个复杂商品列表，学习派生变量和渲染表达式的边界。

### Lesson RE-LIST-013：综合项目——React Product Catalog 需求与知识边界

确定商品目录需求、页面结构和验收标准，并明确项目只允许使用当前已经学习的 Component、JSX、Props、Children、Conditional、List、Key、CSS。

### Lesson RE-LIST-014：综合项目——设计 Product Catalog 的 Component Tree

从业务页面反推 ProductCatalog、CategorySection、ProductCard 等组件职责，画 Component Tree 和 Props Flow，不提前引入 State Manager、Router、Query、Effect。

### Lesson RE-LIST-015：综合项目——实现分类、缺货状态和商品列表

完成真实静态数据驱动的目录 UI，综合使用 Props、Composition、条件渲染和 List。

### Lesson RE-LIST-016：综合项目——主动制造错误 Key Bug

把正确 Key 改成 index/random，制造排序/重建问题，记录实际 UI / DOM 行为并解释根因。

### Lesson RE-LIST-017：综合项目——重构组件 API 与数据模型

检查 Props 是否过度、Component 边界是否合理、是否存在重复派生数据，完成第一次 React 组件设计重构。

### Lesson RE-LIST-018：综合项目——从源码到生产构建完整验收

从空目录重新复刻关键链路，运行开发模式和 production build，检查 Console、DOM、构建结果，并完整解释当前项目中 React 从数据到 DOM 的路径。

---

# Module 11.09：React Event System

完整学习 Event Handler、Function Reference、SyntheticEvent、nativeEvent、Capture/Bubble、target/currentTarget、preventDefault、stopPropagation、Keyboard、Pointer、Input、Composition、Event Delegation 和 Event Priority 前置模型。

---

# Module 11.10：State 与 useState 一次学透

完整学习 State 为什么存在、普通变量为什么不能驱动 UI、Hook、useState、Lazy Initialization、Setter、Object.is、Object/Array State、Immutable Update、Same-value Update、State 生命周期和 Hook Storage 心智模型。

---

# Module 11.11：Render Snapshot、Update Queue 与 Batching

通过连续 setState 实验学习 Render Snapshot、Closure、Update Queue、Replace Update、Functional Updater、Batching、Scheduling、Event Boundary、Async Callback 和 Stale State。

---

# Module 11.12：Object / Array State 与不可变更新

学习 Reference、Shallow Copy、Nested Update、Normalization、Immutable、Mutation、Immer 类方案的取舍以及 State Shape 对维护和 Render 的影响。

---

# Module 11.13：Component Identity 与 State Preservation

学习 Tree Position、Component Type、Key、Same/Different Position、State Preserve/Reset、Conditional Tree、Tabs、Form、Modal、Hidden UI，并为 Activity 建立前置模型。

---

# Module 11.14：State Modeling 与 Ownership

学习 Minimal、Derived、Redundant、Duplicate、Impossible、Normalized、Local、Shared、URL、Server、Persistent State，State Ownership、Lift State、Controlled State 和 Single Source of Truth。

---

# Module 11.15：React Form 完整体系

学习 input、textarea、select、checkbox、radio、file、Controlled/Uncontrolled、value/defaultValue、checked/defaultChecked、IME、Selection、同步/异步 Validation、Server Error、Dynamic Field、Field Array、Draft、Autosave、大型表单性能和 A11Y。

---

# Module 11.16：useReducer 与复杂状态

学习 Reducer、State、Action、Dispatch、Pure Reducer、Initializer、Action Modeling、Domain Event、Reducer Composition、Undo/Redo、Reducer Test 和 State Machine 思想。

---

# Module 11.17：Context 一次学透

学习 createContext、Provider、最近 Provider、Default Value、Value Identity、Update Propagation、Context Splitting、Dependency Injection、Context + Reducer、性能和滥用边界。

---

# Module 11.18：React State Architecture

比较 useState、useReducer、Context、Redux Toolkit、Zustand、Jotai、State Machine、URL State、External Store 和 Server Cache，建立 State Type → Ownership → Lifecycle → Storage Position 的选择模型。

---

# Module 11.19：Ref 一次学透

学习 useRef、ref.current、State vs Ref、DOM Ref、Callback Ref、Timer、Previous Value、Focus、Measurement、Scroll、Selection、Third-party Widget 和 Ref Lifecycle。

---

# Module 11.20：Imperative API 与 useImperativeHandle

学习 Imperative Escape Hatch、Ref Exposure、Minimal Imperative API、Modal、Editor、Video、Canvas、Chart、Map，以及什么情况下不应该暴露 Imperative API。

---

# Module 11.21：useEffect 一次学透

完整学习 Effect 为什么存在、External Synchronization、setup/cleanup、dependency、Object.is、StrictMode、Subscription、Timer、WebSocket、Third-party Library、Network Request、AbortController、Stale Closure、Race、Infinite Effect、Object/Function Dependency、Unmount、Passive Effect、Render/Commit 与 Fiber Effect 模型。

---

# Module 11.22：Removing Effects

学习 Derived State、Calculate During Render、Event Logic、Reset with Key、External Store、Query Cache、State Machine 和 Effect Anti-pattern，形成“看到 Effect 先问能否删除”的判断习惯。

---

# Module 11.23：useEffectEvent

学习 Reactive Logic、Non-reactive Logic、Latest Props/State、Effect 内事件、Timer、Connection、Listener、Dependency Semantics，以及为什么不能用它逃避合法依赖。

---

# Module 11.24：useLayoutEffect / useInsertionEffect

学习 Commit Timing、Browser Layout、Paint、DOM Measurement、Visual Flicker、Tooltip、Synchronous Update、CSS-in-JS 和 Performance Cost。

---

# Module 11.25：Custom Hook 一次学透

学习 Logic Reuse、Naming、Hook Composition、State Isolation、Lifecycle、Dependency、Return API、Tuple vs Object、Error、SSR、Testability、useDebugValue、Library Hook 和 Versioning。

---

# Module 11.26：useSyncExternalStore

学习 External Mutable Store、subscribe、getSnapshot、getServerSnapshot、Tearing、Concurrency、SSR、Browser Online State、LocalStorage Store 和第三方状态库契约。

---

# Module 11.27：Router 完整体系

以 React Router 为代表学习 URL、History、Route Tree、Layout、Nested Route、Dynamic Params、Search Params、Navigation、Deep Link、Error Route、Lazy Route、Scroll Restore、Permission Route 和 URL State。

---

# Module 11.28：Data Router 与 Route Architecture

学习 Loader、Action、Pending、Redirect、Error、Revalidation、Route Data、Nested Loading、Mutation、Route-level Code Split 和 Auth Boundary。

---

# Module 11.29：Server State 完整模型

严格区分 Client State 与 Server State，学习 Cache、Stale、GC、Query Key、Dedup、Retry、Refetch、Invalidation、Mutation、Pagination、Infinite Data、Prefetch、Offline 和 Optimistic Update。

---

# Module 11.30：TanStack Query 生产级使用

学习 Query Key Design、staleTime、GC、Query Function、Cancellation、Mutation、Invalidation、Optimistic、Prefetch、SSR、Hydration、Persistence、Offline、DevTools 和 Architecture Boundary。

---

# Module 11.31：API Client 与 React 数据边界

学习 Fetch Abstraction、Abort、Runtime Validation、DTO、Domain Model、Error Model、Trace ID、Authentication、Retry、Pagination、Schema 和 OpenAPI Client。

---

# Module 11.32：React Actions

学习 Action、form action、Async Action、Pending、Validation、Error、Transition Integration 和 Progressive Enhancement。

---

# Module 11.33：useActionState / useFormStatus

学习 Action State、Previous State、Pending、Form Context、Server Error、Queued Action 和 Form UX。

---

# Module 11.34：useOptimistic

学习 Optimistic State、Pending、Commit、Rollback、Server Reject、Concurrent Optimistic Operations、Ordering、Duplicate Submission 和 Idempotency。

---

# Module 11.35：Concurrent Rendering Mental Model

彻底理解 Concurrency ≠ Parallelism、Interruptible Rendering、Restart、Urgent/Non-urgent、Commit Atomicity、Background Rendering、Purity、Scheduler 和 Lane 前置模型。

---

# Module 11.36：Transition

学习 startTransition、useTransition、Pending、Interruption、Actions、Async Transition、Navigation、Ordering、Input Restriction 和 Fallback Control。

---

# Module 11.37：useDeferredValue

学习 Deferred Render、Stale UI、Search、Expensive Tree、Suspense、Transition vs Deferred、Debounce vs Deferred 和 Performance Measurement。

---

# Module 11.38：Suspense 一次学透

学习 Suspend、Boundary、Fallback、Nested Boundary、Reveal、Error、Retry、Lazy、Data、Router、Streaming、Transition、Waterfall 和 Boundary Architecture。

---

# Module 11.39：use()

学习 Promise、Context Resource、Suspense、Rejection、Error Boundary、Conditional use 和 Server-created Promise → Client Consumption。

---

# Module 11.40：Activity

学习 visible/hidden、State Preservation、Effect Lifecycle、Background Priority、Prerender、Tabs、Likely Navigation、Suspense Integration 和 Performance Cost。

---

# Module 11.41：React DevTools Profiler 与 Performance Track

学习 Render、Commit、Flamegraph、Ranked、Render Cause、React Performance Track、Browser Performance、CPU Throttle 和 User Timing。

---

# Module 11.42：React Render Performance

学习 Render Propagation、State Locality、Props Identity、Context Diffusion、Selector、Virtualization、Component Split、Expensive Computation、Long Task 和 INP。

---

# Module 11.43：Memoization

学习 memo、useMemo、useCallback、Equality、Dependency、Wrong Optimization、Memo Cost 和什么时候不该 Memoize。

---

# Module 11.44：React Compiler

学习 Compiler 为什么存在、Automatic Memoization、Rules of React、Build Integration、Compilation Result、Diagnostics、Bailout、`"use memo"`、`"use no memo"`、Incremental Adoption、Library Compilation、Manual Memo Compatibility、Migration 和 Benchmark。

---

# Module 11.45：React DOM Integration

学习 DOM Props、Attribute/Property、HTML/SVG、Controlled Native Element、Custom Element、Browser API Boundary 和 flushSync 的风险与使用边界。

---

# Module 11.46：Portal

学习 React Tree ≠ DOM Tree，覆盖 Modal、Overlay、Tooltip、Context、Event Bubble、Focus、Stacking Context 和 A11Y。

---

# Module 11.47：Resource Loading / Metadata

学习 preconnect、preload、preinit、Module Preload、Stylesheet、Script、Font、Title、Meta 与 SSR/Streaming 的关系。

---

# Module 11.48：React Error Model

学习 Render Error、Event Error、Async Error、Resource Error、Error Boundary、Nested Boundary、Reset、Root Error Callback、Suspense Interaction 和 Production Error UI。

---

# Module 11.49：React-specific Accessibility

聚焦 React 特有的 Focus Management、Portal、Modal、Suspense Loading、Route Navigation、Dynamic Content、Live Region、Virtual List、useId 和 SSR ID Consistency。

---

# Module 11.50：React-specific Security

聚焦 React Escaping、XSS、dangerouslySetInnerHTML、Sanitizer、Markdown、Rich Text、URL Security、SSR Injection、Hydration Payload、RSC Data Leak、Server Function Authorization 和 Client Permission ≠ Authorization。

---

# Module 11.51：React Debugging & Failure Model

把 Wrong Key、Infinite Render、Infinite Effect、Stale Closure、Race、Context Storm、Chunk Load Failure、Hydration Mismatch、Suspense Waterfall、Memory Leak 和 Server Function Failure 分别设计成正常 Lesson，形成完整 React 故障诊断能力。

---

# Module 11.52：React Testing Integration

只学习 React-specific 测试整合：Component Behavior、User-centric Test、Hook Boundary、Context、Router、Query、Suspense、Error Boundary、Async UI 和 Fake Timer；完整质量体系归后续 Testing Stage 统一深化。

---

# Module 11.53：SSR Mental Model

不依赖 Next.js 黑盒，学习 react-dom/server、Server Render、HTML、Node/Web Stream、Shell、Error、Abort、SEO 和 TTFB。

---

# Module 11.54：Hydration 一次学透

学习 Existing HTML、hydrateRoot、DOM Identity、Event Attachment、Client State、Mismatch、Date/Random、Locale、Browser-only API、useId、Recoverable Error 和 Performance Debug。

---

# Module 11.55：Streaming SSR

学习 Suspense Boundary、Shell、Chunk、Reveal、Bootstrap、Backpressure、Abort、Proxy Buffering、Crawler 和 Failure。

---

# Module 11.56：Static Rendering / Prerender / Resume

学习 prerender、Static HTML、Hydration、CDN、Partial Prerender、Postponed State、Resume、Cache 和 Deployment Boundary。

---

# Module 11.57：RSC Mental Model

彻底区分 Client Component、Server Component、SSR、RSC 和 Server Function，理解 Server Component 的运行位置、Bundle/Data Boundary、Build-time 与 Request-time 行为。

---

# Module 11.58：Server / Client Boundary

学习 `"use client"`、Module Graph、Serialization、Props Boundary、Browser API、Context、Event、Bundle 和 Boundary Placement。

---

# Module 11.59：Server Functions

学习 `"use server"`、Client Reference、Server Execution、Arguments、Result、Action、Validation、Authorization、Error 和 Mutation。

---

# Module 11.60：RSC + Suspense + use()

建立 Server → Promise/Data → RSC Stream → Client → use() → Suspense 的完整模型。

---

# Module 11.61：RSC Data / Cache Architecture

学习 DB Access、Service Layer、Cache、Auth、Tenant、Invalidation、N+1、Waterfall、Serialization、Data Leak 和 Observability。

---

# Module 11.62：React 源码研究方法

学习固定 React Version/Commit、Build、Test、Fixture、Minimal Reproduction、Source Map、Breakpoint、Call Stack、Object Snapshot、Hypothesis 和 Verification。

---

# Module 11.63：Fiber 一次学透

学习 Fiber 存在原因、Fiber Node、child/sibling/return/alternate、flags、lanes、memoizedProps、memoizedState、updateQueue、current 和 workInProgress。

---

# Module 11.64：Reconciler

学习 Element → Fiber、beginWork、completeWork、Child Reconciliation、Key、Placement、Delete、Reuse、Bailout 和 Diff。

---

# Module 11.65：Render / Commit Pipeline

深入 Schedule → Render → beginWork → completeWork → Commit，并继续拆 Mutation、Layout、Ref 和 Passive Effect。

---

# Module 11.66：Hooks Internals

学习 Hook Linked List、Dispatcher、Mount/Update、useState、useReducer、Queue、Pending、Base State、Effect、Dependency 和 Rules Enforcement。

---

# Module 11.67：Update Queue

从 setState → Update → Queue → Lane → Render 跑通状态更新源码路径。

---

# Module 11.68：Lane 与 Scheduler

学习 Priority、Lane、Pending、Suspended、Ping、Entangle、Transition Lane、Sync、Interrupt、Starvation 和 Scheduler。

---

# Module 11.69：Suspense / Activity Internals

学习 Suspension、Boundary、Retry、Ping、Fallback、Hidden Tree、Activity 和 Transition 的内部连接关系。

---

# Module 11.70：Server Renderer / Hydration / RSC Internals

专家级学习 Segment、Boundary、Stream、Hydration、Event Replay、RSC Payload、Client/Server Reference 和 Framework/Bundler Integration。

---

# Module 11.71：React Library Authoring

学习 Public API、Entry、Exports、Types、ESM、Peer Dependency、React Singleton、Tree Shaking、SSR、RSC、Compiler、Source Map、Package Testing 和 Versioning。

---

# Module 11.72：React Headless Component Architecture

学习 State、Behavior、DOM、A11Y、Style Separation、Controlled API、Composition、Portal、Focus 和 Adapter；Design System 的组织级治理留到 UI Engineering Stage 深化。

---

# Module 11.73：Large-scale React Application Architecture

学习 Feature、Domain、Layer、Module、Public API、Dependency、DTO、Domain Model、ViewModel、Infrastructure、Route Owner、State Owner、Async Boundary、Error Boundary 和 Architecture Fitness Function。

---

# Module 11.74：React 在 Microfrontend 中的边界

只学习 React-specific 问题：Multiple Roots、Shared React、Singleton、Context Boundary、Router Boundary、React Version Conflict 和 Error Isolation；完整 Microfrontend Architecture 在后续架构 Stage 统一学习。

---

# Module 11.75：Legacy React

必须能够维护 React 15/16/17/18、Class Component、Lifecycle、Legacy Context、HOC、Render Props、Old Redux、Old Router、CRA、Legacy Webpack 和 Enzyme。

---

# Module 11.76：React Migration

学习 Class→Function、Legacy Context→Context、Old Root→createRoot、Old Hydrate→hydrateRoot、Old SSR→Streaming、React 18→19、Manual Memo→Compiler、SPA→SSR/RSC、Codemod、Feature Flag、Canary 和 Rollback。

---

# Module 11.77：React Upgrade Governance

学习 Stable/Canary/Experimental、SemVer、Security Advisory、Dependency Compatibility、Compiler Compatibility、Framework Compatibility、Pilot、Upgrade Matrix、Rollback 和 Exception。

---

# Module 11.78：React Architecture Review 与最终综合项目

本 Module 最终把整个 Stage 11 串起来，并把 React Enterprise Platform 拆成正常 Lesson；不再单独创建“项目层级”。

后续拆 Lesson 时至少覆盖：大型 React 系统的 State / Effect / Component API / Context / Router / Server State / Suspense Boundary / Transition / SSR/RSC Boundary / Server Function Authorization / Render / Bundle / Memory / Compiler / Error Isolation / Migration Strategy 评审；以及 React Enterprise Platform 的需求、架构、分阶段实现、故障制造、性能证据、源码 Debug、迁移方案和最终答辩。

最终项目至少综合：React 19.2.x + TypeScript、Complex State、Router、Complex Form、Server State、Actions、Optimistic UI、Suspense、Transition、Deferred Value、Activity、Error Boundary、React-specific A11Y、Profiler、Compiler、SSR、Streaming、Hydration、RSC、Server Functions、React Library、Observability Integration、Security Boundary 和 Legacy/Migration Plan。

---

# 4. Stage 11 阶段验收

完成 Stage 11 后，学习者必须能够：

1. 从空目录建立 React + TypeScript 项目并解释完整启动链路；
2. 不混淆 JSX、React Element、React Node、Component、React Tree、Fiber 和 DOM Node；
3. 解释 State、Snapshot、Update Queue、Batching、Identity 和 Reconciliation；
4. 设计复杂 State / Form / Router / Server State 边界；
5. 判断 Effect 是否真正必要，并复现、定位和修复 Effect 常见故障；
6. 使用 Suspense、Transition、Activity、Actions 和 Optimistic UI 构建高交互应用；
7. 使用 Profiler、Browser Performance、Heap 等证据分析 React 性能；
8. 配置并验证 React Compiler；
9. 不依赖 Next.js 黑盒解释 SSR、Hydration、Streaming、Static Rendering；
10. 准确解释 RSC、Client Component、Server Function 和序列化/安全边界；
11. 用源码断点跟踪一次 State Update 到 DOM Commit；
12. 解释 Fiber、Reconciler、Hooks、Lane、Scheduler、Suspense 的核心内部模型；
13. 发布或设计可消费 React Library / Headless Component；
14. 维护 Legacy React，并设计 React 18→19 或 SPA→SSR/RSC 的迁移方案；
15. 对大型 React 系统进行状态、性能、安全、服务端边界和升级治理评审。

---

# 5. 当前拆分进度

当前已完整拆分：

```text
Module 11.01 → Lesson
Module 11.02 → Lesson
Module 11.03 → Lesson
Module 11.04 → Lesson
Module 11.05 → Lesson
Module 11.06 → Lesson
Module 11.07 → Lesson
Module 11.08 → Lesson（包含第一个综合项目）
```

后续从 `Module 11.09：React Event System` 继续按照完全相同的粒度向下拆。
